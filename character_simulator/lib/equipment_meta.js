


import { resolveEquipSlot } from './slot_resolver.js';
import { checkKuroneConstraint } from './kurone.js';
import { computeItemRequiredLv } from './req_lv.js';

const STAT_KEYS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];


export function updateEquipmentMetadata(inv, item, character, opts = {}) {

  inv.canEquip       = false;
  inv.candidateSlot  = null;
  inv.jobMismatch    = false;
  inv.mismatchReason = null;

  if (!item) return inv;

  
  if (!isJobAllowed(item, character)) {
    inv.jobMismatch    = true;
    inv.mismatchReason = 'job';
    return inv;
  }

  
  if (opts.equipAlways || inv.daybreak) {
    inv.canEquip      = true;
    inv.candidateSlot = resolveEquipSlot(item, character);
    return inv;
  }

  
  if (!checkKuroneConstraint(item, character)) {
    inv.jobMismatch    = true;
    inv.mismatchReason = 'kurone';
    return inv;
  }

  
  const reqLv = computeRequiredLv(inv, item);
  const effLv = (character.realLv || 0)
              + (character.lvRevision || 0)
              + (character.miniPetLvRevision || 0);
  if (effLv < reqLv) {
    inv.jobMismatch    = true;
    inv.mismatchReason = `lv:${effLv}/${reqLv}`;
    return inv;
  }

  
  const stRes = checkRequiredStatsDetailed(item, inv, character);
  if (stRes.result === 0) {
    inv.jobMismatch    = true;
    inv.mismatchReason = `stat:${stRes.statId}(${stRes.have}/${stRes.need})`;
    return inv;
  }
  inv.canEquip      = true;
  inv.candidateSlot = resolveEquipSlot(item, character);
  if (stRes.result === 2) {
    inv.jobMismatch    = true;
    inv.mismatchReason = 'partial';
  }
  return inv;
}



export function refreshEquipmentRequirementsFromFinalStats(entries, character, finalStats, opts = {}) {
  const sourceStats = character?.stats || {};
  const resolvedFinalStats = finalStats || sourceStats.equipped || {};
  const checkCharacter = {
    ...character,
    stats: {
      ...sourceStats,
      base: Object.assign(Object.create(null), sourceStats.base || {}),
      equipped: Object.assign(Object.create(null), resolvedFinalStats),
      maxEquipped: Object.assign(Object.create(null), resolvedFinalStats),
    },
  };

  for (const entry of entries || []) {
    if (!entry?.inv || !entry?.item) continue;
    updateEquipmentMetadata(entry.inv, entry.item, checkCharacter, opts);
  }
  return entries;
}

export function isJobAllowed(item, character) {
  if (!item || !item.req) return true;
  const t = item.req.jobType;
  if (t === 1) return character.gender === 1;
  if (t === 2) return character.gender === 2;
  if (t === 3) {
    const jobs = item.req.jobs || [];
    return jobs.includes(character.job);
  }
  return true;
}


export function computeRequiredLv(inv, item) {
  if (!item || !item.req) return 0;
  return computeItemRequiredLv(item, inv);
}


function checkRequiredStatsDetailed(item, inv, character) {
  const reqSt = (item.req && item.req.st) || {};
  if (Object.keys(reqSt).length === 0) return { result: 1 };

  let stResult = 1;
  const stats = (character.stats) || {};
  const equipped    = stats.equipped    || {};
  const maxEquipped = stats.maxEquipped || {};
  const base        = stats.base        || {};

  for (const stat of STAT_KEYS) {
    let reqST = reqSt[stat];
    if (reqST == null || reqST === 0) continue;

    
    const overrideValue = (inv.reqStatOverride && inv.reqStatOverride[stat]);
    const effectiveReq = (overrideValue != null) ? overrideValue : reqST;

    const stCurrent  = equipped[stat];
    const stEquipped = maxEquipped[stat];
    const stBase     = base[stat];

    const r = evaluateStReq(effectiveReq, stCurrent, stEquipped, stBase || 0, stResult);
    if (r === 0) {
      
      const have = (stEquipped != null) ? stEquipped : (stCurrent != null ? stCurrent : (stBase || 0));
      return { result: 0, statId: stat, need: effectiveReq, have };
    }
    if (r === 2) stResult = 2;
  }
  return { result: stResult };
}


function checkRequiredStats(item, inv, character) {
  return checkRequiredStatsDetailed(item, inv, character).result;
}


export function evaluateStReq(reqST, stCurrent, stEquipped, stBase, prevResult) {
  if (stCurrent == null && stEquipped == null) {
    if (reqST > stBase) return 0;
    return prevResult;
  }
  if (stCurrent != null && stEquipped == null) {
    
    if (reqST > stCurrent) return 0;
    return prevResult;
  }
  
  if (reqST > stEquipped) return 0;     
  if (reqST > stBase)     return 2;     
  return prevResult;                     
}
