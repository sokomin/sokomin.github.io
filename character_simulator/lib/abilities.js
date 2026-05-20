

import { getEffectiveLv, PRIMARY_STAT_IDS } from './character.js';

const STAT_KEYS = PRIMARY_STAT_IDS;

export const JOB_STAT_SWAP_IDS = new Set([5, 20, 22]);
export function getJobStatRemap(jobId) {
  if (JOB_STAT_SWAP_IDS.has(Number(jobId))) return [3, 4, 5, 0, 1, 2, 6];
  return [0, 1, 2, 3, 4, 5, 6];
}

function getJobConsts(loader, jobId) {
  const j = loader && loader.master && loader.master.jobs && loader.master.jobs[String(jobId)];
  const baseHp = (Array.isArray(j) && Number.isFinite(j[6])) ? j[6] : 0;
  const baseCp = (Array.isArray(j) && Number.isFinite(j[7])) ? j[7] : 0;
  return { baseHp, baseCp };
}

export function computeAbilities(character, finalStats, equippedItems, loader) {
  const jobId = Number(character.job) || 0;
  const Lv = getEffectiveLv(character);
  const { baseHp, baseCp } = getJobConsts(loader, jobId);
  const statRemap = getJobStatRemap(jobId);

  const eq = (finalStats && finalStats.equipped) || {};
  const hpStat  = numOrZero(eq[STAT_KEYS[statRemap[2]]]);  
  const cpStat  = numOrZero(eq[STAT_KEYS[statRemap[5]]]);  
  const defStat = hpStat;                                  
  
  const atkStr = numOrZero(eq[STAT_KEYS[statRemap[0]]]);
  
  const atkAgi = numOrZero(eq[STAT_KEYS[statRemap[1]]]);

  const hpFlat       = numOrZero(eq.hp);
  const hpPercent    = numOrZero(eq.hpPercent);
  const cpFlat       = numOrZero(eq.cp);
  const cpPercent    = numOrZero(eq.cpPercent);
  const defFlat      = numOrZero(eq.def);
  const defPercent   = numOrZero(eq.defPercent);
  const atkMinFlat   = numOrZero(eq.atkMinFlat);
  const atkMaxFlat   = numOrZero(eq.atkMaxFlat);

  const hpMax = Math.floor((baseHp + Lv + hpStat) * (1 + hpPercent / 100) + hpFlat);
  const cpMax = Math.floor((baseCp + Lv + cpStat) * (1 + cpPercent / 100) + cpFlat);

  let weaponName = '';
  let weaponAtkMin = 0, weaponAtkMax = 0;
  for (const { inv, item } of (equippedItems || [])) {
    if (inv && inv.equippedSlot === 'weapon' && item && item.combat) {
      weaponName = item.name || '';
      weaponAtkMin = numOrZero(item.combat.atkMin);
      weaponAtkMax = numOrZero(item.combat.atkMax);
      break;
    }
  }
  
  const atkStatValue = (jobId === 2 || jobId === 3) ? atkAgi : atkStr;
  const atkBonus = Math.floor(atkStatValue * 0.5);
  const atkMin = weaponAtkMin + atkMinFlat + atkBonus;
  const atkMax = weaponAtkMax + atkMaxFlat + atkBonus;

  
  let itemDefSum = 0;
  for (const { inv, item } of (equippedItems || [])) {
    if (!inv || !inv.equippedSlot) continue;
    if (inv.equippedSlot === 'weapon') continue;
    if (item && item.combat && Number.isFinite(item.combat.def)) {
      itemDefSum += Number(item.combat.def) || 0;
    }
  }
  const def = Math.floor(
    (itemDefSum * (1 + defPercent / 100) + defFlat) * (1 + defStat / 100)
  );

  return {
    hpMax,
    cpMax,
    atkMin,
    atkMax,
    def,
    weaponName,
  };
}

function numOrZero(v) {
  if (v == null || Number.isNaN(Number(v))) return 0;
  return Number(v);
}
