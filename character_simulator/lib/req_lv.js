

const LV_REDUCTION_FAMILY = 736;  

import { OpPrefix } from './item_api.js';

function applyOpAddFormula(a4, a5, a6, isUM) {
  if (a5 === 0 && a6 === 0) return a4;
  if (a6 === 0) {
    return isUM
      ? Math.floor(a4 * 3 / 4) + Math.floor(a5 * 1 / 4)
      : a4 + Math.floor(a5 * 2 / 3);
  }
  return isUM
    ? Math.floor(a4 * 3 / 4) + Math.floor(a5 * 1 / 4) + Math.floor(a6 * 1 / 20)
    : a4 + Math.floor(a5 * 2 / 3) + Math.floor(a6 * 1 / 3);
}

function resolveOpRequiredLvUp(op) {
  if (!op || op.familyId == null || op.familyId < 0) return { lvUp: 0, tier: null };
  const family = OpPrefix.getFamily(op.familyId);
  if (!family || !Array.isArray(family.tiers)) return { lvUp: 0, tier: null };

  let tier = null;

  if (op.rowId != null) {
    tier = family.tiers.find((t) => Number(t.id) === Number(op.rowId)) || null;
  }
  
  if (!tier && op.divisor != null && op.addValue != null) {
    
    tier = family.tiers.find((t) => {
      const m = String(t.effect || '').match(/\+?(\d+)\s*\/\s*Lv\s*(\d+)/);
      if (!m) return false;
      return Number(m[1]) === Number(op.addValue) && Number(m[2]) === Number(op.divisor);
    }) || null;
  }
  
  if (!tier && op.value != null) {
    tier = OpPrefix.findTier(op.familyId, op.value);
  }

  if (!tier) return { lvUp: 0, tier: null };
  const lvUp = Number(tier.requiredLvUp || 0) || 0;
  return { lvUp, tier };
}

function isUMItem(inv) {
  if (!inv || !Array.isArray(inv.ops)) return false;
  for (let i = 0; i < inv.ops.length; i++) {
    const op = inv.ops[i];
    if (!op || op.familyId == null || op.familyId < 0) continue;
    const { tier } = resolveOpRequiredLvUp(op);
    if (tier && tier.gradeClass === 'ult') return true;
  }
  return false;
}

function computeNxLvReduction(item, inv) {
  if (!item || !item.opSlots) return 0;
  const nxActive = !!((item && item.nxAvailable) || (inv && inv.nxActive));
  if (!nxActive) return 0;

  const unlockedCount = (inv && typeof inv.nxUnlockedCount === 'number')
    ? Math.max(0, Math.min(4, inv.nxUnlockedCount))
    : 4;

  let red = 0;
  let nxopIdx = 0;
  for (const slot of item.opSlots) {
    if (!slot) continue;
    if (slot.slotKind !== 'nxop' && slot.slotKind !== 'long_nxop') continue;
    const pos = (slot.pos != null) ? Number(slot.pos) : nxopIdx++;
    if (pos >= unlockedCount) continue;
    
    const overridden = inv && Array.isArray(inv.nxUnlockedOps) && inv.nxUnlockedOps[pos] != null;
    if (overridden) {
      const ovr = inv.nxUnlockedOps[pos];
      
      if (ovr.familyId === LV_REDUCTION_FAMILY) {
        red += Number(ovr.value || 0);
      } else if (ovr.ocName && /着用.*レベル.*減少|アイテム着用Lv.*減少/.test(ovr.ocName)) {
        
        red += Number(ovr.value || ovr.ocValue || 0);
      }
      continue;
    }
    
    if (slot.familyId === LV_REDUCTION_FAMILY) {
      red += Number(slot.value || 0);
    }
  }
  return red;
}

export function computeItemRequiredLv(item, inv) {
  return computeRequiredLvBreakdown(item, inv).total;
}

export function computeRequiredLvBreakdown(item, inv) {
  const baseLv = Number(item?.req?.lv || 0);
  const nxRed  = inv ? computeNxLvReduction(item, inv) : 0;
  const otherRed = 0;  
  const reducedBase = Math.max(0, baseLv - nxRed - otherRed);

  const opLvs = [];
  if (inv && Array.isArray(inv.ops)) {
    for (let i = 0; i < inv.ops.length; i++) {
      const { lvUp } = resolveOpRequiredLvUp(inv.ops[i]);
      if (lvUp > 0) opLvs.push(lvUp);
    }
  }
  opLvs.sort((a, b) => b - a);
  while (opLvs.length < 3) opLvs.push(0);
  const [a4, a5, a6] = opLvs;

  const isUM = inv ? isUMItem(inv) : false;
  const opAdd = applyOpAddFormula(a4, a5, a6, isUM);
  const total = Math.floor(reducedBase + opAdd);

  return { baseLv, nxRed, otherRed, opLvs: [a4, a5, a6], isUM, opAdd, total };
}
