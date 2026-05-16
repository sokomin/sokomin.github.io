// inventory.js — InventoryItem ファクトリ + Inventory ストア
//
// 公開 API:
//   newInventoryItem(itemId, overrides?)   // 初期値で InventoryItem を生成
//   class Inventory                        // CRUD: add / get / remove / findEmptySlot / size
//
// InventoryItem の op 拡張枠 (Nx 解放 / customBaseOps / bfop / blueprint / 製錬 / customOps)
// はすべて null 初期化済。 拡張時は iterateAllOps (item_api.js) の yield と
// 本ファクトリの該当行を揃える。

/**
 * @typedef {Object} OpRef
 * @property {number} opId
 * @property {[number, number, number]} revisions
 * @property {string} [source]
 */

/**
 * @typedef {Object} BlueprintRef
 * @property {number} blueprintId
 */

/**
 * @typedef {Object} InventoryItem
 * @property {number}        slotIndex
 * @property {number}        itemId
 * @property {[number|null, number|null, number|null]} revisions
 * @property {number|null}   exRevision
 * @property {number|null}   durabilityRevision
 * @property {(OpRef|null)[]} ops              長さ 3 固定 (OP1/2/3)
 * @property {boolean}       nxActive
 * @property {0|1|2|3|4}     nxUnlockedCount
 * @property {(OpRef|null)[]} nxUnlockedOps    長さ 4 固定
 * @property {(OpRef|null)[]} customBaseOps    長さ 5 固定
 * @property {OpRef|null}    bfop
 * @property {BlueprintRef|null} blueprint
 * @property {number}        seirenStage       0..20
 * @property {(OpRef|null)[]} seirenOps        長さ 5 固定
 * @property {Record<string, (OpRef|null)[]>} customOps
 * @property {boolean}       daybreak
 * @property {string|null}   equippedSlot
 * @property {boolean}       jobMismatch
 * @property {{str:number|null, agi:number|null, con:number|null, int:number|null, wiz:number|null, chs:number|null, luc:number|null}} reqStatOverride
 */

const STAT_KEYS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];

/**
 * 既定値で InventoryItem を生成。後段 (makeItem 等) が必要なフィールドを上書きする。
 * @param {number} itemId
 * @param {Partial<InventoryItem>} [overrides]
 * @returns {InventoryItem}
 */
export function newInventoryItem(itemId, overrides = {}) {
  /** @type {InventoryItem} */
  const inv = {
    slotIndex:          -1,
    itemId,
    revisions:          [null, null, null],
    exRevision:         null,
    durabilityRevision: null,

    ops:                [null, null, null],

    nxActive:           false,
    nxUnlockedCount:    0,
    nxUnlockedOps:      [null, null, null, null],

    customBaseOps:      [null, null, null, null, null],

    bfop:               null,
    blueprint:          null,

    seirenStage:        0,
    seirenOps:          [null, null, null, null, null],

    customOps:          {},

    daybreak:           false,
    equippedSlot:       null,
    jobMismatch:        false,

    reqStatOverride:    Object.fromEntries(STAT_KEYS.map((k) => [k, null])),
  };
  return Object.assign(inv, overrides);
}

/**
 * 単純なインベントリストア。slotIndex で参照、空き枠を順番に探す。
 *
 */
export class Inventory {
  /** @param {number} [maxSlots] 最大スロット数。null で無制限 */
  constructor(maxSlots = null) {
    /** @type {(InventoryItem|null)[]} */
    this._slots = [];
    this._maxSlots = maxSlots;
  }

  /**
   * inv を最初に見つかった空き枠に格納し、slotIndex をセットして返す。
   * 満杯なら null を返す。
   * @param {InventoryItem} inv
   * @returns {InventoryItem|null}
   */
  add(inv) {
    const idx = this.findEmptySlot();
    if (idx == null) return null;
    inv.slotIndex = idx;
    this._slots[idx] = inv;
    return inv;
  }

  /**
   * 空きスロットの index を返す。満杯なら null。
   * @returns {number|null}
   */
  findEmptySlot() {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] == null) return i;
    }
    if (this._maxSlots != null && this._slots.length >= this._maxSlots) return null;
    return this._slots.length;
  }

  /** @param {number} idx @returns {InventoryItem|null} */
  get(idx) {
    return this._slots[idx] || null;
  }

  /** @param {number} idx */
  remove(idx) {
    if (idx >= 0 && idx < this._slots.length) this._slots[idx] = null;
  }

  /** 現在装着中 (or 保持中) のアイテム数 */
  size() {
    let n = 0;
    for (const s of this._slots) if (s != null) n++;
    return n;
  }

  /** 全 InventoryItem を順に yield (空きはスキップ) */
  *items() {
    for (const s of this._slots) {
      if (s != null) yield s;
    }
  }
}
