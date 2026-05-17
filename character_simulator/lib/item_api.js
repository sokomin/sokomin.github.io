// item_api.js — シミュレータ上位 API
//
// 提供 API:
//   await Item.preload(...kindIds)         // 必要な kind chunk を先読み
//   await Item.get(itemId)                  // ItemRecord 取得 (lazy fetch)
//   Item.searchRow(itemId)                  // items_search の行を返す
//   Op.get(opId)                            // OpTemplate 取得
//   Op.resolveBase(opId)                    // chainTo 解決済の base op を返す
//   Op.resolveStatTarget(statTargetCode)    // 統計コードから layer 解決
//   iterateAllOps(inv, item)                // inv + item の全 op を yield する
//
// 設計原則:
//   - 状態を持つのは DataLoader だけ。Item / Op はそのラッパー
//   - chainTo の循環は最大 4 段で打ち切り

import { DataLoader, getSharedLoader } from './data_loader.js';

const MAX_CHAIN_DEPTH = 4;

let _loader = null;
/**
 * 共有 DataLoader を設定 / 取得する。
 * 通常はアプリ起動時に setLoader() を呼び、それ以降は Item.* / Op.* が同じインスタンスを使う。
 */
export function setLoader(loader) {
  _loader = loader;
}
export function getLoader() {
  if (!_loader) _loader = getSharedLoader();
  return _loader;
}

// =====================================================================
// Item API
// =====================================================================

export const Item = {
  /**
   * 1 つ以上の kind chunk を並列先読み (検索結果表示前に呼ぶと体感が良い)。
   * @param {...number} kindIds
   */
  async preload(...kindIds) {
    await Promise.all(kindIds.map((k) => getLoader().getItemChunk(k)));
  },

  /**
   * itemId から ItemRecord を取得 (Kind chunk を必要に応じて lazy fetch)。
   * @param {number} itemId
   * @returns {Promise<ItemRecord | null>}
   */
  async get(itemId) {
    return getLoader().getItemRecord(itemId);
  },

  /**
   * items_search の row を返す (検索結果 / 軽量プレビュー用)。
   * 戻り値: [i, m, n, t, g, rq, lv, p, s] (各フィールドは items_search の定義)
   * @param {number} itemId
   */
  searchRow(itemId) {
    return getLoader().findInSearch(itemId);
  },
};

// =====================================================================
// Op API
// =====================================================================

export const Op = {
  /**
   * op_id の OpTemplate を取得。
   * @param {number} opId
   * @returns {OpTemplate | null}
   */
  get(opId) {
    return getLoader().getOpTemplate(opId);
  },

  /**
   * chainTo を辿って base op を返す。
   * @param {number} opId
   * @returns {OpTemplate | null}
   */
  resolveBase(opId) {
    const loader = getLoader();
    let cur = loader.getOpTemplate(opId);
    if (!cur) return null;
    let depth = 0;
    let curId = opId;
    while (cur && cur.chainTo != null && cur.chainTo !== curId) {
      if (++depth > MAX_CHAIN_DEPTH) {
        console.warn(`[Op.resolveBase] chain depth exceeded for opId=${opId}`);
        break;
      }
      curId = cur.chainTo;
      cur = loader.getOpTemplate(curId);
      if (!cur) break;
    }
    return cur;
  },

  /**
   * statTargetCode から { statId, layer, stats?, multiplier? } を解決。
   * @param {number | null} statTargetCode
   */
  resolveStatTarget(statTargetCode) {
    return getLoader().resolveStatTarget(statTargetCode);
  },

  /**
   * iterateAllOps が yield する source に合わせて、適切な displayTemplate を返す。
   *
   * 同じ opId でも base op (slotKind='base') と付与 op (slotKind='op'/'nxop' 等) で
   * 意味が異なるため、 templates[opId] は両方 (displayTemplate / displayTemplateBase)
   * を保持している。
   *
   * - source = 'item.base'      → displayTemplateBase 優先
   * - それ以外                    → displayTemplate 優先
   * 該当側が空のときはもう片方にフォールバック。
   *
   * @param {number} opId
   * @param {string | undefined} source   iterateAllOps の source 文字列
   * @returns {string | null}
   */
  getDisplayTemplate(opId, source) {
    const tpl = this.get(opId);
    if (!tpl) return null;
    const base    = tpl.displayTemplateBase || '';
    const regular = tpl.displayTemplate || '';
    if (source === 'item.base') {
      return base || regular || null;
    }
    return regular || base || null;
  },
};

// =====================================================================
// OpPrefix API — 付与 op カタログ (prefix.csv 由来)
// 設計: option_prefix.json (families[<op_id>] → { tiers[] })
//
// 用途分離:
//   - slotKind = 'base'  → templates[opId] (= base op)
//   - slotKind = 'op' / 'nxop' / 'long_op' / 'long_nxop' / 'ui.op' / ...
//                        → OpPrefix.getFamily(familyId) (= 付与 op)
// 両者を **絶対に混在させない**。
// =====================================================================

export const OpPrefix = {
  /**
   * prefix.csv family を取得 (= 共通する効果カテゴリ、例: op_id=0 → "力" family)。
   * @param {number} familyId  prefix.csv の op_id 列
   * @returns {Object | null}  { opId, tiers:[...], firstTierName, firstTierEffect }
   */
  getFamily(familyId) {
    const op = getLoader().optionPrefix;
    if (!op || !op.families) return null;
    return op.families[String(familyId)] || null;
  },

  /**
   * family + value から該当 tier (Lv1/Lv2/... DX/ULT/NPC) を引く。
   * value が tier の [valueMin~valueMax] レンジに含まれる最初の tier を返す。
   * 該当しない場合は null。
   *
   * @param {number} familyId
   * @param {number} value     item.csv option_*_value0 の値
   * @returns {Object | null}  prefix.csv の単行 tier ({ id, sortid, name, effect, gradeClass, equipKinds })
   */
  findTier(familyId, value) {
    const f = this.getFamily(familyId);
    if (!f || !Array.isArray(f.tiers)) return null;
    // 効果文 "X [a~b] 増加" / "X +Y" 等から数値域を読み取り、 value が含まれる行を返す。
    const parsed = f.tiers.map((t) => ({ tier: t, range: _extractEffectRange(t.effect) }));
    // value がレンジ内に入る tier (= 単一ティア命中)
    for (const { tier, range } of parsed) {
      if (range && value >= range.min && value <= range.max) return tier;
    }
    // 完全一致が無い場合は value 以下で最大の上限を持つ tier (= 切り上げない)
    let best = null;
    for (const { tier, range } of parsed) {
      if (!range) continue;
      if (range.max <= value && (!best || range.max > (best.range?.max ?? -Infinity))) {
        best = { tier, range };
      }
    }
    return best ? best.tier : null;
  },

  /**
   * 全 family の全 tier をフラットに列挙 (検索 UI 用)。
   * @yields {{ familyId: number, tier: Object }}
   */
  *iterateAllTiers() {
    const op = getLoader().optionPrefix;
    if (!op || !op.families) return;
    for (const fk of Object.keys(op.families)) {
      const f = op.families[fk];
      const familyId = Number(fk);
      for (const tier of (f.tiers || [])) {
        yield { familyId, tier };
      }
    }
  },
};

// effect 文字列 (例: "力 [2~3] 増加", "力 250 増加", "防御力 +25")
// から { min, max } を抽出する。 解析失敗時は null。
function _extractEffectRange(effect) {
  if (!effect) return null;
  // パターン 1: "... [N~M] ..."
  let m = effect.match(/\[(-?\d+)~(-?\d+)\]/);
  if (m) return { min: Number(m[1]), max: Number(m[2]) };
  // パターン 2: "... +N" / "... N 増加" (単一値)
  m = effect.match(/[+]?(-?\d+)/);
  if (m) {
    const v = Number(m[1]);
    return { min: v, max: v };
  }
  return null;
}

// =====================================================================
// iterateAllOps
// =====================================================================

/**
 * InventoryItem に乗っている全 op を順に yield する。
 *
 * @param {InventoryItem | null} inv  装備インスタンス (null なら ItemRecord の op のみ走査)
 * @param {ItemRecord} item
 * @yields {{op: OpSlot, source: string, index: number}}
 */
export function* iterateAllOps(inv, item) {
  if (!item || !Array.isArray(item.opSlots)) return;

  // [Nx] 変種アイテム (nxAvailable=true) は item id 自体が Nx 開封済状態を表すので、
  // makeItem 呼び出し側で inv.nxActive を省略しても自動で Nx スロット有効扱いにする。
  const nxAuto = !!(item && item.nxAvailable);

  // (1) ItemRecord 由来 (base / op / nxop)
  for (let i = 0; i < item.opSlots.length; i++) {
    const slot = item.opSlots[i];
    if (slot == null) continue;
    const source =
      slot.slotKind === 'base'      ? 'item.base'
      : slot.slotKind === 'op'      ? 'item.option'
      : slot.slotKind === 'long_op' ? 'item.option'
      : slot.slotKind === 'nxop'    ? 'item.nxoption'
      : slot.slotKind === 'long_nxop' ? 'item.nxoption'
      : 'item.base';
    const isNx = source === 'item.nxoption';
    if (isNx && !(nxAuto || (inv && inv.nxActive))) continue;
    yield { op: _normalizeOpSlot(slot), source, index: i };
  }

  if (!inv) return;

  // (2) UI 選択 op (OP1/2/3)
  if (Array.isArray(inv.ops)) {
    for (let k = 0; k < inv.ops.length; k++) {
      if (inv.ops[k]) yield { op: _normalizeOpSlot(inv.ops[k]), source: 'ui.op', index: k };
    }
  }
  // (3) Nx 解放 op
  if (inv.nxActive && Array.isArray(inv.nxUnlockedOps)) {
    const n = Math.min(inv.nxUnlockedCount || 0, inv.nxUnlockedOps.length);
    for (let k = 0; k < n; k++) {
      if (inv.nxUnlockedOps[k]) yield { op: inv.nxUnlockedOps[k], source: 'nx.unlocked', index: k };
    }
  }
  // (4) 非規格 base op
  if (Array.isArray(inv.customBaseOps)) {
    for (let k = 0; k < inv.customBaseOps.length; k++) {
      if (inv.customBaseOps[k]) yield { op: inv.customBaseOps[k], source: 'custom.base', index: k };
    }
  }
  // (5) BFOP
  if (inv.bfop) yield { op: inv.bfop, source: 'bfop', index: 0 };
  // (6) 製錬 op
  if (Array.isArray(inv.seirenOps)) {
    for (let k = 0; k < inv.seirenOps.length; k++) {
      if (inv.seirenOps[k]) yield { op: inv.seirenOps[k], source: 'seiren', index: k };
    }
  }
  // (7) シミュレータ独自拡張 op
  if (inv.customOps && typeof inv.customOps === 'object') {
    for (const ns of Object.keys(inv.customOps)) {
      const arr = inv.customOps[ns];
      if (!Array.isArray(arr)) continue;
      for (let k = 0; k < arr.length; k++) {
        if (arr[k]) yield { op: _normalizeOpSlot(arr[k]), source: `custom.${ns}`, index: k };
      }
    }
  }
}

/**
 * op スロットを「opId + vals 形式」に正規化する。
 *
 * データには 2 つのスロット形式が混在する:
 *   - {slotKind:'base', opId, vals[]}                     (template 直指定)
 *   - {slotKind:'op'/'nxop', familyId, value}             (prefix.csv family 経由)
 *
 * 後者は OpPrefix.getFamily(familyId).opId で本来の opId が手に入る。
 * calcOpValue / sumOpsByCode 等の下流コードは op.opId / op.vals[0] を読むため、
 * ここで一度だけ橋渡しの shallow-copy を作る (元 slot は変更しない)。
 *
 * @param {Object} slot
 * @returns {Object} normalized op (opId / vals が必ず入る)
 */
function _normalizeOpSlot(slot) {
  if (!slot || typeof slot !== 'object') return slot;
  if (slot.opId != null) return slot;  // 既に正規形
  if (slot.familyId == null) return slot;

  const fam = OpPrefix.getFamily(slot.familyId);
  if (!fam || fam.opId == null) return slot;  // family 不明 → そのまま

  const v = (typeof slot.value === 'number') ? slot.value : 0;
  // vals[0] に value をスカラー値として置き、calcOpValue case 0 が
  // slotMainValue として使えるようにする (familyId スロットは calc=0 想定)。
  return Object.assign({}, slot, {
    opId: fam.opId,
    vals: [v, 0, 0, 0],
  });
}
