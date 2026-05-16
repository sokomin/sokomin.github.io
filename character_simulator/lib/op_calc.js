// op_calc.js — OP の数値計算 + STTemp 積算
//
// 公開 API:
//   calcOpValue(opOrSlot, inv, source, LvTemp, character)
//     → { value, constant, statId, layer, stats?, multiplier, isDisplayOnly, source, ... }
//   applyOpToSTTemp(STTemp, calc, item)
//     → STTemp の該当 layer / statId に積算
//   aggregateAllOpsForItem(STTemp, inv, item, LvTemp, character)
//     → iterateAllOps + applyOpToSTTemp を接続 (1 アイテム分一気に積算)
//
// 機能:
//   - calcType 0..5 の式 (chainTo 解決済 base op を使う)
//   - statTargetCodeMap (loader.resolveStatTarget) で layer 解決
//   - sum / max / sumAll の集約
//   - 消耗品特例 (item.part === 13 → sum→consumableMax, lvLinked→consumableLvMax)
//   - 固定増強系 ULT op (= family.enhance) は 2 パスで同 item 内他 op 寄与の N% を加算

import { Op, OpPrefix, iterateAllOps, getLoader } from './item_api.js';

// =====================================================================
// Layer → 集約方法
// =====================================================================

const LAYER_AGG = {
  fixedCap:        'max',
  attrFixedCap:    'max',
  consumableMax:   'max',
  consumableLvMax: 'max',
  sum:             'sum',
  lvLinked:        'sum',
  setBonus:        'sum',
  sumAll:          'sum',
  lvCorrection:    'sum',
  displayOnly:     'skip',
};

/**
 * layer 名から集約方式 ('sum' | 'max' | 'skip') を返す。
 * stat 個別に master.statTypes.stats[statId].aggregation が指定されていればそちらを優先。
 */
export function getLayerAggregation(layer, statId) {
  const loader = getLoader();
  const stat = loader && loader.master && loader.master.statTypes
    && loader.master.statTypes.stats && loader.master.statTypes.stats[statId];
  if (stat && stat.aggregation) return stat.aggregation;
  return LAYER_AGG[layer] || 'sum';
}

// =====================================================================
// Part A: calcOpValue
// =====================================================================

/**
 * op (OpSlot or OpRef) の数値計算結果を返す。
 *
 * @param {Object} opOrSlot  iterateAllOps が yield する `op`
 *   - source='item.*' のとき OpSlot ({opId, vals, slotKind, pos})
 *   - それ以外          のとき OpRef  ({opId, revisions, source?})
 * @param {Object} inv       InventoryItem (revisions を r1/r2 source に使う)
 * @param {string} source    iterateAllOps が yield する `source` 文字列
 * @param {number} [LvTemp]  キャラ実効 Lv (Lv 連動 layer 計算に使用、省略時 0)
 */
export function calcOpValue(opOrSlot, inv, source, LvTemp, character) {
  // === family 103 専用: 職業別スキルレベル ===
  // slot 例: {familyId:103, value:2, jobIdx:11}
  //   → character.job === 11 (武道家) のとき skillLv +2、 不一致なら 0
  if (opOrSlot.familyId === 103) {
    const targetJob = opOrSlot.jobIdx;
    const charJob = character ? character.job : null;
    const matched = (charJob != null && targetJob != null && Number(charJob) === Number(targetJob));
    const v = matched ? numOrZero(opOrSlot.value) : 0;
    return {
      value: v,
      constant: 0,
      statId: 'skillLv',
      layer: 'sum',
      multiplier: 1,
      isDisplayOnly: false,
      source,
      // 表示値は実際の付与値 (= value)、 一致非一致は別途 isJobMatched で表す
      displayValue: numOrZero(opOrSlot.value),
      isJobMatched: matched,
      targetJobIdx: targetJob,
    };
  }

  // === 付与 op (prefix.csv family) 直接ルート ===
  // option_prefix.json に family.stat が明示定義されている場合は
  // base op テンプレート経由 (Op.resolveBase) を **使わない**。
  // value を所定 stat / layer に積むだけのシンプル経路。
  if (opOrSlot.familyId != null) {
    const family = OpPrefix.getFamily(opOrSlot.familyId);
    if (family && family.stat && (family.stat.id || (Array.isArray(family.stat.stats) && family.stat.stats.length))) {
      const layer = family.stat.layer || 'sum';
      let v;
      // 比率上昇系 (lvLinked layer): v = floor(LvTemp / divisor) * addValue
      if (layer === 'lvLinked') {
        const addValue = numOrZero(opOrSlot.addValue);
        const divisor  = Math.max(1, numOrZero(opOrSlot.divisor));
        v = Math.floor((LvTemp || 0) / divisor) * addValue;
      } else {
        // flat 系: value 単一値
        const value = numOrZero(opOrSlot.value);
        const mul   = (family.stat.mul != null) ? family.stat.mul : 1;
        v = value * mul;
      }
      // stats[] 指定なら sumAll (= 配列の全 stat に同値加算)
      // 例: family 74 (全属性抵抗) → stats=[attrFireResist..attrDarkResist] / layer=sum
      const hasStatsArray = Array.isArray(family.stat.stats) && family.stat.stats.length > 0;
      return {
        value:         v,
        constant:      0,
        statId:        family.stat.id || null,
        stats:         hasStatsArray ? family.stat.stats : undefined,
        layer:         hasStatsArray ? 'sumAll' : layer,
        multiplier:    1,
        isDisplayOnly: false,
        source,
        displayValue:  v,
      };
    }
    // family.stat が未定義 → 統計コード経路にフォールバック
  }

  const base = Op.resolveBase(opOrSlot.opId);
  if (!base) {
    return { value: 0, constant: 0, statId: null, layer: 'displayOnly',
             multiplier: 1, isDisplayOnly: true, source };
  }

  // === base slot 用 baseStat ルート ===
  // base slot (source='item.base') で template.baseStat が明示定義されている場合は
  // statTargetCode 経由 (= 付与 op 用解釈) を **使わず**、 baseStat に直接積む。
  // 例: opId=80 base slot → baseStat={id:'attrEarthResist', layer:'sum'}
  //     (= 大地属性抵抗 +N、 base_option_text 解釈)
  //     opId=80 op  slot → statTargetCode=80 → ... → 闇属性吸収 (option_text 解釈)
  if (source === 'item.base' && base.baseStat) {
    // 2 軸対応: baseStat.axes=[{id,layer}, ...] のとき vals[0..n] を各 axis stat に振る。
    //   例: opId=1060 base slot → axes=[{id:'limitBreakPhysFlat'},{id:'limitBreakPhysPercent'}]
    //         vals=[2, [3,5]] → flat=2, percent=5 (range なら max)
    if (Array.isArray(base.baseStat.axes) && base.baseStat.axes.length) {
      const axes = base.baseStat.axes;
      const axisResults = [];
      for (let i = 0; i < axes.length; i++) {
        let v = 0;
        if (opOrSlot.vals && opOrSlot.vals[i] != null) {
          const vi = opOrSlot.vals[i];
          v = Array.isArray(vi) ? numOrZero(vi[1]) : numOrZero(vi);
        }
        axisResults.push({
          value:    v,
          statId:   axes[i].id,
          layer:    axes[i].layer || 'sum',
        });
      }
      return {
        value:         0,
        constant:      0,
        statId:        null,
        layer:         'sum',
        multiplier:    1,
        isDisplayOnly: false,
        source,
        axisResults,
        displayValue:  axisResults.map((a) => a.value).join('/'),
      };
    }
    // 1 軸: baseStat.id
    if (base.baseStat.id) {
      // 値の決定: vals[0] が [min, max] 配列なら **max** を採用 (アイテム生成は最高補正)
      let v = 0;
      if (opOrSlot.vals && opOrSlot.vals[0] != null) {
        const v0 = opOrSlot.vals[0];
        v = Array.isArray(v0) ? numOrZero(v0[1]) : numOrZero(v0);
      }
      return {
        value:         v,
        constant:      0,
        statId:        base.baseStat.id,
        layer:         base.baseStat.layer || 'sum',
        multiplier:    1,
        isDisplayOnly: false,
        source,
        displayValue:  v,
      };
    }
    // sumAll: baseStat.stats=[...] (= vals[0] を複数 stat に同値積む)
    //   例: opId=651 vs アンデッド+悪魔 物理 → vsUndeadPhys と vsDemonPhys 両方に同値
    if (Array.isArray(base.baseStat.stats) && base.baseStat.stats.length) {
      let v = 0;
      if (opOrSlot.vals && opOrSlot.vals[0] != null) {
        const v0 = opOrSlot.vals[0];
        v = Array.isArray(v0) ? numOrZero(v0[1]) : numOrZero(v0);
      }
      return {
        value:         v,
        constant:      0,
        statId:        null,
        stats:         base.baseStat.stats,
        layer:         'sumAll',
        multiplier:    1,
        isDisplayOnly: false,
        source,
        displayValue:  v,
      };
    }
  }

  // === stat 依存 op (動的計算経路) ===
  // template.statDependent が定義されていれば、 character.stats.equipped[sourceStat] を読んで
  // 値を決定する。 stat_aggregator の while 収束で stat が確定するまで反復評価される。
  //
  // 公式: value = floor(min(stat, statCap) / divisor) × perStack
  //   - divisor, perStack, statCap は template に直接書く (item vals に依存しない)
  //   - statCap=0 / 未指定 のとき無制限 (Infinity)
  //
  // 例: opId=931 (力 2000 あたり 物理限界突破 +1%、 力 20000 で頭打ち = 最大 +10%)
  //       statDependent={sourceStat:'str', targetStat:'limitBreakPhysPercent',
  //                      divisor:2000, perStack:1, statCap:20000, layer:'sum'}
  if (base.statDependent && character && character.stats && character.stats.equipped) {
    const sd = base.statDependent;
    const stat = numOrZero(character.stats.equipped[sd.sourceStat]);
    const divisor  = Math.max(1, numOrZero(sd.divisor));
    const perStack = numOrZero(sd.perStack);
    const statCap  = numOrZero(sd.statCap);
    const effective = (statCap > 0) ? Math.min(stat, statCap) : stat;
    const stacks = Math.floor(effective / divisor);
    const v = stacks * perStack;
    return {
      value:         v,
      constant:      0,
      statId:        sd.targetStat,
      layer:         sd.layer || 'sum',
      multiplier:    1,
      isDisplayOnly: false,
      source,
      displayValue:  v,
      sourceStatValue: stat,
      stacks,
    };
  }

  // === Layer 解決を先にやって Lv 連動なら専用ルートへ ===
  const loader = getLoader();
  const resolved = loader.resolveStatTarget(base.statTargetCode);

  // === Lv 連動レイヤー: slot.vals または valueDomain から divisor/mainValue を引いて
  //     v = floor(LvTemp / divisor) * mainValue ===
  if (resolved.layer === 'lvLinked' || resolved.layer === 'consumableLvMax') {
    const isItemSlot = typeof source === 'string' && source.startsWith('item.');
    const v = computeLvLinkedValue(base, isItemSlot ? opOrSlot : null, LvTemp);
    return {
      value:         v,
      constant:      0,
      statId:        resolved.statId,
      layer:         resolved.layer,
      stats:         resolved.stats,
      multiplier:    resolved.multiplier != null ? resolved.multiplier : 1,
      isDisplayOnly: !!base.isDisplayOnly,
      source,
      // 表示用 args[0] (formatOpText で [0] プレースホルダに使える)
      displayValue:  v,
    };
  }

  // === Revision (r1 / r2) の出所決定 ===
  // ItemRecord 由来 (item.base / item.option / item.nxoption): アイテム本体の revisions を使う
  // OpRef 由来 (ui.op / nx.unlocked / custom.* / bfop / blueprint / seiren / custom.<ns>):
  //   op 個別の revisions を使う
  const isItemSlot = typeof source === 'string' && source.startsWith('item.');
  let r1 = 0, r2 = 0;
  if (isItemSlot) {
    r1 = numOrZero(inv && inv.revisions && inv.revisions[0]);
    r2 = numOrZero(inv && inv.revisions && inv.revisions[1]);
  } else {
    r1 = numOrZero(opOrSlot.revisions && opOrSlot.revisions[0]);
    r2 = numOrZero(opOrSlot.revisions && opOrSlot.revisions[1]);
  }

  const baseValue = numOrZero(base.baseValue);
  const lvDivisor = base.lvDivisor || 1;

  // op の「主値」(= vals[0]) を抽出。item.* slot だけでなく、ui.op / nx.unlocked /
  // custom.* / bfop / seiren など iterateAllOps が _normalizeOpSlot 経由で yield する
  // OpRef にも vals[] を持たせる方針に揃えた (familyId スロットを {opId, vals:[value]} に
  // 統一)。よって isItemSlot で分けず、vals が立っていれば素直にそれを採用する。
  //   - base slot : vals[0] が配列なら vals[0][0] (axis0 min) を採用
  //   - op/nxop / ui.op / bfop / seiren / custom.* : vals[0] (スカラー) を採用
  // calcType 2/3 (constant 系、revision 連動) では計算結果を優先するが、結果が 0 なら fallback。
  const hasExplicitValue = opOrSlot.vals && opOrSlot.vals.length > 0;
  let slotMainValue = 0;
  if (hasExplicitValue) {
    const v0 = opOrSlot.vals[0];
    if (Array.isArray(v0)) {
      slotMainValue = numOrZero(v0[0]);
    } else {
      slotMainValue = numOrZero(v0);
    }
  }

  let value = 0, constant = 0;
  switch (base.calcType) {
    case 0:
      // 1軸 Rev1 連動 (sum 系): 明示 vals があればそれを採用、無ければ formula
      value = hasExplicitValue ? slotMainValue : (baseValue * r1) / lvDivisor;
      break;
    case 1:
      value = (hasExplicitValue && slotMainValue !== 0) ? slotMainValue : baseValue;
      break;
    case 2: constant = Math.floor((baseValue * r1) / Math.max(1, r2)); break; // 2軸比率
    case 3: constant = Math.floor((baseValue * r1) / lvDivisor);    break; // 1軸 Constant
    case 4: constant = baseValue;                                   break; // 固定 Constant
    case 5: value    = (baseValue * r2) / lvDivisor;                break; // 1軸 Rev2 連動
    default:
      return { value: 0, constant: 0, statId: null, layer: 'displayOnly',
               multiplier: 1, isDisplayOnly: true, source };
  }

  return {
    value,
    constant,
    statId:        resolved.statId,
    layer:         resolved.layer,
    stats:         resolved.stats,
    multiplier:    resolved.multiplier != null ? resolved.multiplier : 1,
    isDisplayOnly: !!base.isDisplayOnly || resolved.layer === 'displayOnly',
    source,
    displayValue:  value + constant,
  };
}

/**
 * Lv 連動 op の値計算。
 *
 * formula: v = floor(LvTemp / divisor) * mainValue
 *
 *
 * @param {Object} base      Op.resolveBase 戻り値 (OpTemplate)
 * @param {Object|null} slot item.* 由来なら OpSlot、それ以外は null
 * @param {number} LvTemp    キャラ実効 Lv
 * @returns {number}
 */
function computeLvLinkedValue(base, slot, LvTemp) {
  let divisor = 1, mainValue = 0;
  if (slot && Array.isArray(slot.vals) && slot.vals.length >= 6) {
    const v5 = Number(slot.vals[5]);
    const v4 = Number(slot.vals[4]);
    if (Number.isFinite(v5) && v5 > 0) divisor = v5;
    if (Number.isFinite(v4)) mainValue = v4;
  } else {
    if (base.valueDomain1) {
      const mn = Number(base.valueDomain1.min);
      if (Number.isFinite(mn)) mainValue = mn;
    }
    if (base.valueDomain2) {
      const mn = Number(base.valueDomain2.min);
      if (Number.isFinite(mn) && mn > 0) divisor = mn;
    }
  }
  if (mainValue === 0) return 0;
  return Math.floor((LvTemp || 0) / Math.max(1, divisor)) * mainValue;
}

// =====================================================================
// Part C: applyOpToSTTemp
// =====================================================================

/**
 * calcOpValue 結果を STTemp に積算する。
 *
 * @param {Object} STTemp    sttemp.js の newSTTemp()
 * @param {Object} calc      calcOpValue 戻り値
 * @param {Object} [item]    ItemRecord (消耗品判定で part===13 を参照)
 */
export function applyOpToSTTemp(STTemp, calc, item) {
  if (!calc || calc.isDisplayOnly) return;

  // 2 軸 base slot (baseStat.axes[]): 各 axis を独立に積む
  if (Array.isArray(calc.axisResults) && calc.axisResults.length) {
    for (const a of calc.axisResults) {
      if (a.statId == null) continue;
      let l = a.layer || 'sum';
      if (item && item.part === 13) {
        if (l === 'sum')      l = 'consumableMax';
        if (l === 'lvLinked') l = 'consumableLvMax';
      }
      accumulate(STTemp, l, a.statId, numOrZero(a.value));
    }
    return;
  }

  let layer = calc.layer;
  // 消耗品 (item.part === 13) は通常 sum を max layer に置き換え
  if (item && item.part === 13) {
    if (layer === 'sum')      layer = 'consumableMax';
    if (layer === 'lvLinked') layer = 'consumableLvMax';
  }

  const v = (calc.value + calc.constant) * (calc.multiplier || 1);

  // sumAll: 全 primary stats に同値加算 (STTemp.sum へ)
  if (layer === 'sumAll' && Array.isArray(calc.stats)) {
    for (const sid of calc.stats) accumulate(STTemp, 'sum', sid, v);
    return;
  }

  if (calc.statId == null) return;
  accumulate(STTemp, layer, calc.statId, v);
}

function accumulate(STTemp, layer, statId, v) {
  const agg = getLayerAggregation(layer, statId);
  if (agg === 'skip') return;
  if (!STTemp[layer]) STTemp[layer] = Object.create(null);
  const cur = STTemp[layer][statId];
  if (agg === 'max') {
    STTemp[layer][statId] = (cur == null) ? v : Math.max(cur, v);
  } else {
    STTemp[layer][statId] = (cur || 0) + v;
  }
}

// =====================================================================
// 統合: aggregateAllOpsForItem
// =====================================================================

/**
 * 1 アイテム分の全 op を STTemp に積算する。
 *
 * 2-pass 設計:
 *   Pass 1: 通常 op (base + 非 enhance op) を処理し、 同 item 内 op slot (base 除く) の
 *           stat 寄与を local に蓄積。
 *   Pass 2: `family.enhance = {targetStat, percentMultiplier}` 付き op (= 固定増強系) は
 *           pass 1 で skip しておき、 ここで `local[targetStat] × percentMultiplier` を
 *           STTemp.sum に加算する。
 *
 * 仕様 (「固定増強」 系 ULT オプション):
 *   - 装備品に付与されたステ上昇効果のオプション効果の N% を強化 (通常 50%)
 *   - **装備品の基本情報部分 (= base slot) は参照しない** (op slot のみ)
 *   - **同一装備の中でのみ** 計算 (= 他の装備の op は読まない、 そのため item ループ単位で完結)
 *   - 同一の「固定増強」を 2 つ付与しても、 増強同士は重ねない (= pass 1 で skip するため
 *     自然と達成される)
 *
 * 例: ①[力比率Lv2=500] ②[力比率Lv2=500] ③[力固定増強] → 力=500+500+(1000×0.5)=1500
 *
 * @param {Object} STTemp
 * @param {Object} inv
 * @param {Object} item   ItemRecord
 * @param {number} [LvTemp]  キャラ実効 Lv (Lv 連動 op の計算に使用、省略時 0)
 */
export function aggregateAllOpsForItem(STTemp, inv, item, LvTemp, character) {
  const enhanceOps = [];
  /** @type {Record<string, number>} */
  const localStatTotals = Object.create(null);

  // === Pass 1: 通常 op ===
  for (const { op, source } of iterateAllOps(inv, item)) {
    // enhance op を識別: ui.op / item.option / item.nxoption の slot で family.enhance あり
    let enhance = null;
    if (source !== 'item.base' && op.familyId != null) {
      const family = OpPrefix.getFamily(op.familyId);
      if (family && family.enhance && family.enhance.targetStat) {
        enhance = family.enhance;
      }
    }
    if (enhance) {
      enhanceOps.push({ enhance });
      continue;  // pass 1 で skip
    }

    const calc = calcOpValue(op, inv, source, LvTemp, character);
    applyOpToSTTemp(STTemp, calc, item);

    // 同 item 内 op slot (= base 除く) の寄与を local に蓄積 (enhance op の参照用)
    if (source !== 'item.base' && calc && !calc.isDisplayOnly) {
      const v = (numOrZero(calc.value) + numOrZero(calc.constant)) * (calc.multiplier || 1);
      if (Array.isArray(calc.axisResults) && calc.axisResults.length) {
        for (const a of calc.axisResults) {
          if (a.statId) localStatTotals[a.statId] = (localStatTotals[a.statId] || 0) + numOrZero(a.value);
        }
      } else if (Array.isArray(calc.stats) && calc.layer === 'sumAll') {
        for (const sid of calc.stats) localStatTotals[sid] = (localStatTotals[sid] || 0) + v;
      } else if (calc.statId) {
        localStatTotals[calc.statId] = (localStatTotals[calc.statId] || 0) + v;
      }
    }
  }

  // === Pass 2: enhance op (固定増強系) ===
  // 増強同士は重ねない (= localStatTotals に enhance 寄与を入れない) ことが自動的に保証される
  for (const { enhance } of enhanceOps) {
    const target = enhance.targetStat;
    const pct    = numOrZero(enhance.percentMultiplier);
    const sum    = numOrZero(localStatTotals[target]);
    const v      = Math.floor(sum * pct);
    if (v === 0) continue;
    if (!STTemp.sum) STTemp.sum = Object.create(null);
    STTemp.sum[target] = (STTemp.sum[target] || 0) + v;
  }
}

// =====================================================================
// helpers
// =====================================================================

function numOrZero(v) {
  if (v == null || Number.isNaN(Number(v))) return 0;
  return Number(v);
}
