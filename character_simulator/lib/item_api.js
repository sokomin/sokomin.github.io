


import { DataLoader, getSharedLoader } from './data_loader.js';

const MAX_CHAIN_DEPTH = 4;

let _loader = null;

export function setLoader(loader) {
  _loader = loader;
}
export function getLoader() {
  if (!_loader) _loader = getSharedLoader();
  return _loader;
}



export const Item = {
  
  async preload(...kindIds) {
    await Promise.all(kindIds.map((k) => getLoader().getItemChunk(k)));
  },

  
  async get(itemId) {
    return getLoader().getItemRecord(itemId);
  },

  
  searchRow(itemId) {
    return getLoader().findInSearch(itemId);
  },
};



export const Op = {
  
  get(opId) {
    return getLoader().getOpTemplate(opId);
  },

  
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

  
  resolveStatTarget(statTargetCode) {
    return getLoader().resolveStatTarget(statTargetCode);
  },

  
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



export const OpPrefix = {
  
  getFamily(familyId) {
    const op = getLoader().optionPrefix;
    if (!op || !op.families) return null;
    return op.families[String(familyId)] || null;
  },

  
  findTier(familyId, value) {
    const f = this.getFamily(familyId);
    if (!f || !Array.isArray(f.tiers)) return null;
    
    const parsed = f.tiers.map((t) => ({ tier: t, range: _extractEffectRange(t.effect) }));
    
    for (const { tier, range } of parsed) {
      if (range && value >= range.min && value <= range.max) return tier;
    }
    
    let best = null;
    for (const { tier, range } of parsed) {
      if (!range) continue;
      if (range.max <= value && (!best || range.max > (best.range?.max ?? -Infinity))) {
        best = { tier, range };
      }
    }
    return best ? best.tier : null;
  },

  
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


function _extractEffectRange(effect) {
  if (!effect) return null;
  
  let m = effect.match(/\[(-?\d+)~(-?\d+)\]/);
  if (m) return { min: Number(m[1]), max: Number(m[2]) };
  
  m = effect.match(/[+]?(-?\d+)/);
  if (m) {
    const v = Number(m[1]);
    return { min: v, max: v };
  }
  return null;
}




export function* iterateAllOps(inv, item) {
  if (!item || !Array.isArray(item.opSlots)) return;


  const nxAuto = !!(item && item.nxAvailable);

  
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

  
  if (Array.isArray(inv.ops)) {
    for (let k = 0; k < inv.ops.length; k++) {
      if (inv.ops[k]) yield { op: _normalizeOpSlot(inv.ops[k]), source: 'ui.op', index: k };
    }
  }
  
  if (inv.nxActive && Array.isArray(inv.nxUnlockedOps)) {
    const n = Math.min(inv.nxUnlockedCount || 0, inv.nxUnlockedOps.length);
    for (let k = 0; k < n; k++) {
      if (inv.nxUnlockedOps[k]) yield { op: inv.nxUnlockedOps[k], source: 'nx.unlocked', index: k };
    }
  }
  
  if (Array.isArray(inv.customBaseOps)) {
    for (let k = 0; k < inv.customBaseOps.length; k++) {
      if (inv.customBaseOps[k]) yield { op: inv.customBaseOps[k], source: 'custom.base', index: k };
    }
  }
  
  if (inv.bfop) yield { op: inv.bfop, source: 'bfop', index: 0 };
  
  if (Array.isArray(inv.seirenOps)) {
    for (let k = 0; k < inv.seirenOps.length; k++) {
      if (inv.seirenOps[k]) yield { op: inv.seirenOps[k], source: 'seiren', index: k };
    }
  }
  
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


function _normalizeOpSlot(slot) {
  if (!slot || typeof slot !== 'object') return slot;
  if (slot.opId != null) return slot;  
  if (slot.familyId == null) return slot;

  const fam = OpPrefix.getFamily(slot.familyId);
  if (!fam || fam.opId == null) return slot;  

  const v = (typeof slot.value === 'number') ? slot.value : 0;

  return Object.assign({}, slot, {
    opId: fam.opId,
    vals: [v, 0, 0, 0],
  });
}
