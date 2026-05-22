


import { newInventoryItem } from './inventory.js';
import { Op, iterateAllOps } from './item_api.js';
import { getLoader } from './item_api.js';

const STAT_KEYS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];




export function makeItem(state, itemRecord, opts = {}) {
  if (!itemRecord || itemRecord.id !== state.itemId) {
    return null;
  }
  const inv = newInventoryItem(state.itemId);

  
  const stRev = state.revisions || [null, null, null];
  inv.revisions[0] = normalizeRev(stRev[0]);
  inv.revisions[1] = normalizeRev(stRev[1]);
  inv.revisions[2] = normalizeRev(stRev[2]);

  
  if (Array.isArray(itemRecord.revisions)) {
    for (let i = 0; i < 3; i++) {
      if (inv.revisions[i] == null && Array.isArray(itemRecord.revisions[i])) {
        inv.revisions[i] = itemRecord.revisions[i][0] ?? null;
      }
    }
  }

  
  inv.exRevision         = state.exRevision != null ? state.exRevision : null;
  inv.durabilityRevision = state.durability != null ? state.durability : null;


  

  const opEntries = state.ops || [null, null, null];
  if (!state.opsOff) {
    for (let k = 0; k < 3; k++) {
      const e = opEntries[k];
      if (e == null) continue;
      if (typeof e === 'object' && e.familyId != null && e.familyId >= 0) {
        const slot = { familyId: Number(e.familyId), source: 'ui.op' };
        if (e.addValue != null || e.divisor != null) {
          slot.addValue = numOrZero(e.addValue);
          slot.divisor  = numOrZero(e.divisor) || 1;
        } else {
          slot.value = numOrZero(e.value);
        }
        if (e.jobIdx != null) slot.jobIdx = Number(e.jobIdx);

        
        if (e.rowId != null) slot.rowId = Number(e.rowId);
        
        if (e.name) slot.name = String(e.name);
        inv.ops[k] = slot;
      }
    }
  }


  
  
  if (state.nxActive === false) {
    inv.nxActive = false;
  } else {
    inv.nxActive = !!itemRecord.nxAvailable;
  }

  
  inv.daybreak = !!state.daybreak;

  
  inv.reqStatOverride = computeReqStatOverride(itemRecord, inv);

  
  if (opts.inventory) {
    return opts.inventory.add(inv);
  }
  return inv;
}


export function computeReqStatOverride(itemRecord, inv) {
  
  const result = Object.fromEntries(STAT_KEYS.map((k) => [k, null]));

  const reqSt     = (itemRecord.req && itemRecord.req.st)     || {};
  const reqStType = (itemRecord.req && itemRecord.req.stType) || [];

  const loader = getLoader();
  const fixedCapRule =
    loader && loader.master && loader.master.statTypes &&
    loader.master.statTypes.statTargetCodeMap &&
    loader.master.statTypes.statTargetCodeMap.fixedCap;

  if (!fixedCapRule) return result;

  for (let i = 0; i < STAT_KEYS.length; i++) {
    const statId = STAT_KEYS[i];
    const reqST  = reqSt[statId];
    if (reqST == null || reqST === 0) continue;

    
    let reqSTTemp = reqST;
    const t = reqStType[i];
    if (t === 1) reqSTTemp *= numOrZero(inv.revisions[0]);
    if (t === 2) reqSTTemp *= numOrZero(inv.revisions[1]);


    
    
    let fixST = null;
    for (const { op, source } of iterateAllOps(inv, itemRecord)) {
      const baseOp = Op.resolveBase(op.opId);
      if (!baseOp) continue;
      
      if (source === 'item.base' && baseOp.baseStat) continue;
      if (!matchesFixedCapForStat(baseOp.statTargetCode, i, fixedCapRule)) continue;

      let fixSTTemp;
      if (typeof source === 'string' && source.startsWith('item.')) {
        
        fixSTTemp = resolveFixSTByOPType(
          op.vals ? op.vals[3] : undefined,
          op.vals ? op.vals[4] : undefined,
          inv
        );
      } else {
        
        fixSTTemp = numOrZero(op.revisions && op.revisions[0]);
      }

      if (fixST == null || fixSTTemp > fixST) fixST = fixSTTemp;
    }

    
    if (fixST != null && fixST > 0 && fixST < reqSTTemp) {
      result[statId] = fixST;
    }
  }

  return result;
}



function normalizeRev(v) {
  if (v == null || v === '' || Number.isNaN(Number(v))) return null;
  return Number(v);
}

function numOrZero(v) {
  if (v == null || Number.isNaN(Number(v))) return 0;
  return Number(v);
}


function matchesFixedCapForStat(targetCode, statIndex, rule) {
  if (targetCode == null) return false;
  if (targetCode < rule.range[0] || targetCode > rule.range[1]) return false;
  const offset = rule.offset != null ? rule.offset : rule.range[0];
  const stride = rule.stride || 1;
  const idx = Math.floor((targetCode - offset) / stride);
  return idx === statIndex;
}


function resolveFixSTByOPType(opType, opValue, inv) {
  switch (opType) {
    case 0: return numOrZero(opValue);
    case 1: case 4: case 21: case 22: case 24: case 31: case 32:
      return numOrZero(inv.revisions[0]);
    case 2: case 23: case 25:
      return numOrZero(inv.revisions[1]);
    default:
      return 0;
  }
}

