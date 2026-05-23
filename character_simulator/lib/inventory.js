








const STAT_KEYS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];


export function newInventoryItem(itemId, overrides = {}) {
  
  const inv = {
    slotIndex:          -1,
    itemId,
    revisions:          [null, null, null],
    exRevision:         null,
    durabilityRevision: null,

    ops:                [null, null, null],

    nxActive:           false,

    
    nxUnlockedCount:    4,
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


export class Inventory {
  
  constructor(maxSlots = null) {
    
    this._slots = [];
    this._maxSlots = maxSlots;
  }

  
  add(inv) {
    const idx = this.findEmptySlot();
    if (idx == null) return null;
    inv.slotIndex = idx;
    this._slots[idx] = inv;
    return inv;
  }

  
  findEmptySlot() {
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i] == null) return i;
    }
    if (this._maxSlots != null && this._slots.length >= this._maxSlots) return null;
    return this._slots.length;
  }

  
  get(idx) {
    return this._slots[idx] || null;
  }

  
  remove(idx) {
    if (idx >= 0 && idx < this._slots.length) this._slots[idx] = null;
  }

  
  size() {
    let n = 0;
    for (const s of this._slots) if (s != null) n++;
    return n;
  }

  
  *items() {
    for (const s of this._slots) {
      if (s != null) yield s;
    }
  }
}
