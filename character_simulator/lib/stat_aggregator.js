// stat_aggregator.js — 装備一式の STTemp 集計
//
// 公開 API:
//   aggregateForCharacter(character, equippedItems, opts?)
//     → 装備一式を STTemp に集積し、STTemp を返す
//   applyBaseStats(STTemp, character)
//     → STTemp.base に character.stats.base をコピー
//   applyJobBonus(STTemp, character)
//     → 追放天使 / リトルウィッチ等の職業ボーナス (現状 nop)

import { Item } from './item_api.js';
import { newSTTemp } from './sttemp.js';
import { aggregateAllOpsForItem } from './op_calc.js';
import { PRIMARY_STAT_IDS, getEffectiveLv } from './character.js';
import { countSetEquipped, applySetBonusesToSTTemp } from './set_bonus.js';
import { updateEquipmentMetadata } from './equipment_meta.js';
import { finalizeStats } from './stat_finalizer.js';

/**
 * @typedef {Object} EquippedItem
 * @property {Object} inv        InventoryItem
 * @property {Object} [item]     ItemRecord (省略時は Item.get で取得)
 */

/**
 * 1 キャラ分の STTemp を集計する。
 *
 * while 収束:
 *   - 各 inv に対し updateEquipmentMetadata で装着可否を判定
 *   - 装着 OK な inv の op だけ STTemp に積算
 *   - finalizeStats で character.stats.equipped を更新 → 再判定
 *   - equippedSlot 状態が変わらなくなるまで最大 maxIterations 回反復
 *   - 装備 A の op で B の必要ステを満たす循環ケースを解く
 *
 * 注意: character は内部で clone され、character.stats.equipped を一時更新する。
 *       呼び出し元の character オブジェクト自体は変更しない。
 *       各 inv の equippedSlot / jobMismatch は副作用で更新される (装備状態の確定)。
 *
 * @param {Object} character
 * @param {(EquippedItem | { inv: Object, itemId?: number })[]} equippedItems
 * @param {{ maxIterations?: number, validate?: boolean, equipAlways?: boolean }} [opts]
 * @returns {Promise<Object>} STTemp
 */
export async function aggregateForCharacter(character, equippedItems, opts = {}) {
  const validate = (opts.validate !== false);
  const maxIter  = opts.maxIterations || 5;

  // === Resolve ItemRecord (1 回だけ) ===
  const resolved = [];
  for (const entry of equippedItems) {
    const inv = entry.inv;
    if (!inv) continue;
    const item = entry.item || await Item.get(inv.itemId);
    if (!item) continue;
    resolved.push({ inv, item });
  }

  // validate=false: 装着判定を skip し、全 inv の op を積算する。
  if (!validate) {
    const LvTemp0 = getEffectiveLv(character);
    const STTemp = newSTTemp();
    applyBaseStats(STTemp, character);
    applyJobBonus(STTemp, character);
    for (const { inv, item } of resolved) {
      aggregateAllOpsForItem(STTemp, inv, item, LvTemp0, character);
    }
    const counts = countSetEquipped(resolved.filter(({ inv }) => inv.equippedSlot != null));
    applySetBonusesToSTTemp(STTemp, counts, LvTemp0);
    return STTemp;
  }

  // === while 収束 (2 段階) ===
  // character を浅くクローン (stats だけ各反復で書き換える)
  const c = cloneCharacterForLoop(character);
  const LvTemp = getEffectiveLv(c);

  // --- Pass 1: 全装着を仮定して maxEquipped (装備込み上限) を見積もる ---
  //   これにより evaluateStReq の stEquipped 分岐で「部分 OK」が判定可能になる
  //   (= 装備 A の op で B の req を満たす循環ケースを解く)
  {
    const maxT = newSTTemp();
    applyBaseStats(maxT, c);
    applyJobBonus(maxT, c);
    for (const { inv, item } of resolved) {
      aggregateAllOpsForItem(maxT, inv, item, LvTemp, c);
    }
    const counts0 = countSetEquipped(
      resolved.map(({ inv, item }) => ({ inv: { ...inv, equippedSlot: '__pending__' }, item }))
    );
    applySetBonusesToSTTemp(maxT, counts0, LvTemp);
    const maxF = finalizeStats(maxT);
    c.stats.maxEquipped = maxF.equipped;
  }

  // --- Pass 2-N: maxEquipped を見て装着判定 → 実 op 集計 → equipped 更新 → 収束 ---
  let STTemp = newSTTemp();
  let prevSig = null;

  for (let iter = 0; iter < maxIter; iter++) {
    // Step A: 全 inv の装着可否を現在の c.stats (equipped + maxEquipped) で再判定
    for (const { inv, item } of resolved) {
      updateEquipmentMetadata(inv, item, c, { equipAlways: !!opts.equipAlways });
    }

    // Step B: STTemp をゼロから再構築 (素ステ + 装着 OK な op + setBonus)
    STTemp = newSTTemp();
    applyBaseStats(STTemp, c);
    applyJobBonus(STTemp, c);
    for (const { inv, item } of resolved) {
      if (!inv.equippedSlot) continue;
      aggregateAllOpsForItem(STTemp, inv, item, LvTemp, c);
    }
    const counts = countSetEquipped(resolved.filter(({ inv }) => inv.equippedSlot != null));
    applySetBonusesToSTTemp(STTemp, counts, LvTemp);

    // Step C: finalize して character.stats.equipped を更新
    const f = finalizeStats(STTemp);
    c.stats.equipped = f.equipped;

    // Step D: 収束判定 (equippedSlot + 主要 stat 値を文字列化して比較)
    // stat-dependent op (例: opId 931/932) が stat 変化で値を変えるケースに対応するため、
    // 主要ステの値も sig に含めて反復させる。
    const slotSig = resolved.map(({ inv }) => inv.equippedSlot || '_').join(',');
    const statSig = PRIMARY_STAT_IDS.map((s) => c.stats.equipped[s] || 0).join(',');
    const sig = slotSig + '|' + statSig;
    if (sig === prevSig) break;
    prevSig = sig;
  }

  return STTemp;
}

function cloneCharacterForLoop(character) {
  return {
    ...character,
    stats: {
      base:        Object.assign(Object.create(null), character.stats?.base        || {}),
      equipped:    Object.assign(Object.create(null), character.stats?.equipped    || {}),
      maxEquipped: Object.assign(Object.create(null), character.stats?.maxEquipped || {}),
    },
  };
}

/**
 * 素ステ + (既に計算済の) job bonus を STTemp.base にコピー。
 * @param {Object} STTemp
 * @param {Object} character
 */
export function applyBaseStats(STTemp, character) {
  const base = character.stats && character.stats.base;
  if (!base) return;
  for (const s of PRIMARY_STAT_IDS) {
    STTemp.base[s] = (base[s] || 0) + (STTemp.jobBonus[s] || 0);
  }
  // 拡張ステ (HP / CP / 防御力 等) も同様にコピー
  for (const k of Object.keys(base)) {
    if (PRIMARY_STAT_IDS.includes(k)) continue;
    STTemp.base[k] = (base[k] || 0) + (STTemp.jobBonus[k] || 0);
  }
}

/**
 * 職業ボーナス。
 * 追放天使 / リトルウィッチ等の特例ボーナスを STTemp に注入する想定。
 * 現状は nop (= 必要になった時点で master.jobs[job].statBonus を参照して実装)。
 *
 * @param {Object} STTemp
 * @param {Object} character
 */
export function applyJobBonus(STTemp, character) {
  void STTemp; void character;
}
