


import { Item } from './item_api.js';
import { newSTTemp } from './sttemp.js';
import { aggregateAllOpsForItem } from './op_calc.js';
import { PRIMARY_STAT_IDS, getEffectiveLv } from './character.js';
import { countSetEquipped, applySetBonusesToSTTemp } from './set_bonus.js';
import { countSetOpsEquipped, applySetOpsToSTTemp } from './set_op_bonus.js';
import { updateEquipmentMetadata, isJobAllowed, refreshEquipmentRequirementsFromFinalStats } from './equipment_meta.js';
import { finalizeStats } from './stat_finalizer.js';
import { applyStonesToSTTemp } from './stone_effects.js';




export async function aggregateForCharacter(character, equippedItems, opts = {}) {
  const validate = (opts.validate !== false);
  const maxIter  = opts.maxIterations || 5;

  
  const resolved = [];
  for (const entry of equippedItems) {
    const inv = entry.inv;
    if (!inv) continue;
    const item = entry.item || await Item.get(inv.itemId);
    if (!item) continue;
    resolved.push({ inv, item });
  }

  
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

    try {
      const opCounts0 = countSetOpsEquipped(resolved.filter(({ inv }) => inv.equippedSlot != null));
      applySetOpsToSTTemp(STTemp, opCounts0);
    } catch (err) {
      console.warn('[aggregator] set OP application failed (validate=false):', err);
    }
    applyStonesToSTTemp(STTemp, character.stones);
    return STTemp;
  }


  const c = cloneCharacterForLoop(character);
  const LvTemp = getEffectiveLv(c);


  
  {
    const maxT = newSTTemp();
    applyBaseStats(maxT, c);
    applyJobBonus(maxT, c);
    for (const { inv, item } of resolved) {
      if (!isJobAllowed(item, c)) continue;
      aggregateAllOpsForItem(maxT, inv, item, LvTemp, c);
    }
    const counts0 = countSetEquipped(
      resolved.map(({ inv, item }) => ({ inv: { ...inv, equippedSlot: '__pending__' }, item }))
    );
    applySetBonusesToSTTemp(maxT, counts0, LvTemp);
    
    try {
      const opCounts0 = countSetOpsEquipped(
        resolved.map(({ inv, item }) => ({ inv: { ...inv, equippedSlot: '__pending__' }, item }))
      );
      applySetOpsToSTTemp(maxT, opCounts0);
    } catch (err) {
      console.warn('[aggregator] set OP application failed (maxEquipped pre-pass):', err);
    }
    applyStonesToSTTemp(maxT, c.stones);
    const maxF = finalizeStats(maxT);
    c.stats.maxEquipped = maxF.equipped;
  }

  
  let STTemp = newSTTemp();
  let prevSig = null;

  for (let iter = 0; iter < maxIter; iter++) {
    
    for (const { inv, item } of resolved) {
      updateEquipmentMetadata(inv, item, c, { equipAlways: !!opts.equipAlways });
    }

    
    STTemp = newSTTemp();
    applyBaseStats(STTemp, c);
    applyJobBonus(STTemp, c);
    for (const { inv, item } of resolved) {
      if (!inv.equippedSlot || !inv.canEquip) continue;
      aggregateAllOpsForItem(STTemp, inv, item, LvTemp, c);
    }
    const counts = countSetEquipped(resolved.filter(({ inv }) => inv.equippedSlot != null && inv.canEquip));
    applySetBonusesToSTTemp(STTemp, counts, LvTemp);
    
    try {
      const opCounts = countSetOpsEquipped(resolved.filter(({ inv }) => inv.equippedSlot != null && inv.canEquip));
      applySetOpsToSTTemp(STTemp, opCounts);
    } catch (err) {
      console.warn('[aggregator] set OP application failed (Pass 2):', err);
    }
    applyStonesToSTTemp(STTemp, c.stones);

    
    const f = finalizeStats(STTemp);
    c.stats.equipped = f.equipped;


    
    const slotSig = resolved.map(({ inv }) => inv.equippedSlot || '_').join(',');
    const statSig = PRIMARY_STAT_IDS.map((s) => c.stats.equipped[s] || 0).join(',');
    const sig = slotSig + '|' + statSig;
    if (sig === prevSig) break;
    prevSig = sig;
  }

  return STTemp;
}


export async function aggregateWithEquipmentRequirements(character, entries, applyBonuses, finalize = finalizeStats) {
  const c = cloneCharacterForLoop(character);
  const worn = entries.filter(({ inv, item }) => inv.equippedSlot != null && isJobAllowed(item, c));
  let active = worn;
  let previous = null;
  const limit = Math.max(8, worn.length + 3);
  for (let iteration = 0; iteration < limit; iteration++) {
    const included = new Set(active.map(({ inv }) => inv));
    for (const { inv } of worn) inv.canEquip = included.has(inv);
    const temp = await aggregateForCharacter(c, active, { validate: false });
    await applyBonuses(temp, c);
    const final = finalize(temp, c);
    refreshEquipmentRequirementsFromFinalStats(entries, c, final.equipped);
    const next = worn.filter(({ inv }) => inv.equippedSlot != null && inv.canEquip);
    const signature = worn.map(({ inv }) => next.some(e => e.inv === inv) ? '1' : '0').join('')
      + '|' + PRIMARY_STAT_IDS.map(s => final.equipped[s] || 0).join(',');
    if (signature === previous && next.length === active.length
        && next.every((entry, i) => entry === active[i])) return { temp, final };
    previous = signature;
    active = next;
    c.stats.equipped = { ...final.equipped };
    c.stats.maxEquipped = { ...final.equipped };
  }
  throw new Error('Equipment requirements did not converge');
}

function cloneCharacterForLoop(character) {
  return {
    ...character,
    stats: {
      base:        Object.assign(Object.create(null), character.stats?.base        || {}),
      equipped:    Object.assign(Object.create(null), character.stats?.equipped    || {}),
      maxEquipped: Object.assign(Object.create(null), character.stats?.maxEquipped || {}),
    },
    stones: character.stones,  
  };
}


export function applyBaseStats(STTemp, character) {
  const base = character.stats && character.stats.base;
  if (!base) return;
  for (const s of PRIMARY_STAT_IDS) {
    STTemp.base[s] = (base[s] || 0) + (STTemp.jobBonus[s] || 0);
  }
  
  for (const k of Object.keys(base)) {
    if (PRIMARY_STAT_IDS.includes(k)) continue;
    STTemp.base[k] = (base[k] || 0) + (STTemp.jobBonus[k] || 0);
  }
}


export function applyJobBonus(STTemp, character) {
  void STTemp; void character;
}
