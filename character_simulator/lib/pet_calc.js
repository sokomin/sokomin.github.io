

import { applyMonsterLevel } from './monster_level_calc.js';

export const PET_CAPABLE_JOBS = Object.freeze(new Set([8, 14]));

export function isPetCapableJob(jobId) {
  return PET_CAPABLE_JOBS.has(Number(jobId));
}

export function computePetStats(mob, petLv, chStats, jobId) {
  if (!mob) return null;
  const Lv = Math.max(1, Number(petLv) || 1);

  const applicable = isPetCapableJob(jobId);
  const chStr = Number(chStats?.str) || 0;
  const chInt = Number(chStats?.int) || 0;
  const chAgi = Number(chStats?.agi) || 0;
  const chCon = Number(chStats?.con) || 0;
  const chWiz = Number(chStats?.wiz) || 0;
  const strKnow = applicable ? (chStr + chInt) : 0;
  const bonusPct     = strKnow / 30.0;
  const skillLvBonus = strKnow > 0 ? Math.floor(1 + Math.sqrt(strKnow / 3.0)) : 0;

  
  
  let boostedMob = mob;
  if (bonusPct > 0) {
    const mul = 1 + bonusPct / 100.0;
    boostedMob = {
      ...mob,
      str:  mob.str  * mul,
      agi:  mob.agi  * mul,
      con:  mob.con  * mul,
      intl: mob.intl * mul,
      wis:  mob.wis  * mul,
      chs:  mob.chs  * mul,
      luc:  mob.luc  * mul,
    };
  }
  const leveled = applyMonsterLevel(boostedMob, Lv, 0);

  

  

  

  
  
  const petOpsRaw = {
    allStat:            Number(chStats?.petAllStat)              || 0,
    maxHpPct:           Number(chStats?.petMaxHp)                || 0,
    physAtkPct:         Number(chStats?.petPhysAtk)              || 0,
    magicAtkPct:        Number(chStats?.petMagicAtk)             || 0,
    physDamPct:         Number(chStats?.petPhysDamage)           || 0,
    magicDamPct:        Number(chStats?.petMagicDamage)          || 0,
    attrAtkPct:         Number(chStats?.petAttrAtk)              || 0,
    attrAllPct:         Number(chStats?.petAttrAllBonus)         || 0,
    finalDmgPct:        Number(chStats?.petFinalDamage)          || 0,
    statusResistPct:    Number(chStats?.petStatusResist)         || 0,
    enemyCritResRedPct: Number(chStats?.petEnemyCritResistReduce) || 0,
    doubleCritDmgPct:   Number(chStats?.petDoubleCritDamage)     || 0,
    physCritRatePct:    Number(chStats?.petPhysCritRate)         || 0,
    magicCritRatePct:   Number(chStats?.petMagicCritRate)        || 0,
    magicCritDmgPct:    Number(chStats?.petMagicCritDamage)      || 0,
    magicStrongRatePct: Number(chStats?.petMagicStrongRate)      || 0,
    magicStrongDmgPct:  Number(chStats?.petMagicStrongDamage)    || 0,
    moveSpeed:          Number(chStats?.petMoveSpeed)            || 0,
    atkSpeedPct:        Number(chStats?.petAtkSpeed)             || 0,
    expBonus:           Number(chStats?.petExpBonus)             || 0,
    absorbIgnore:      (Number(chStats?.petAbsorbIgnore)         || 0) > 0,
  };

  if (petOpsRaw.allStat) {
    const v = petOpsRaw.allStat;
    leveled.str  += v;
    leveled.agi  += v;
    leveled.con  += v;
    leveled.intl += v;
    leveled.wis  += v;
    leveled.chs  += v;
    leveled.luc  += v;
  }
  if (petOpsRaw.maxHpPct) {
    leveled.defaultHp = Math.floor(leveled.defaultHp * (1 + petOpsRaw.maxHpPct / 100));
  }

  const combinedPhysPct = petOpsRaw.physAtkPct + petOpsRaw.physDamPct;
  if (combinedPhysPct) {
    const mul = 1 + combinedPhysPct / 100;
    leveled.atcMin = Math.floor(leveled.atcMin * mul);
    leveled.atcMax = Math.floor(leveled.atcMax * mul);
  }

  return {
    ...leveled,
    
    petBonusApplicable: applicable,
    petBonusPct:        bonusPct,
    petSkillLvBonus:    skillLvBonus,
    petChStrKnow:       strKnow,
    petChStr:           chStr,
    petChInt:           chInt,
    petChAgi:           chAgi,
    petChCon:           chCon,
    petChWiz:           chWiz,
    petOps:             petOpsRaw,
  };
}
