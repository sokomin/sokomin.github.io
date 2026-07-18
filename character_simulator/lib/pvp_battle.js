export const PVP_ENGINE_VERSION = 'v1（検証中）';

export const JOB_SKILL_DB = Object.freeze({
  0: 'knight', 1: 'warrior', 2: 'archer', 3: 'lancer', 4: 'wizard', 5: 'wolf',
  6: 'bishop', 7: 'angel', 8: 'beasttamer', 9: 'summoner', 10: 'thief', 11: 'budou',
  12: 'princess', 13: 'witch', 14: 'necro', 15: 'devil', 16: 'soulbringer',
  17: 'champion', 18: 'opticalist', 19: 'maid', 20: 'demonsorceress', 21: 'musket',
  22: 'alchemist', 23: 'captain', 24: 'beastman', 25: 'canonner',
});

const ATTRS = ['fire', 'water', 'wind', 'earth', 'light', 'dark'];
const EXTRAPOLATE_KEYS = new Set(['physDmgPct', 'magicDmgMin', 'magicDmgMax']);

function num(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value) {
  return clamp(value, 0, 1);
}

export function interpolateSkillLevel(skill, level) {
  const keys = (skill?.levelKeys || []).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  if (!keys.length) return null;
  const target = Math.max(keys[0], Math.round(num(level, keys[0])));
  if (skill.levels?.[target]) return skill.levels[target];
  const max = keys[keys.length - 1];
  if (target > max) {
    const prev = keys.length > 1 ? keys[keys.length - 2] : max;
    const out = { ...(skill.levels?.[max] || {}) };
    for (const key of EXTRAPOLATE_KEYS) {
      const a = skill.levels?.[prev]?.[key];
      const b = skill.levels?.[max]?.[key];
      if (typeof a === 'number' && typeof b === 'number' && max !== prev) {
        out[key] = b + ((b - a) / (max - prev)) * (target - max);
      }
    }
    return out;
  }
  let lo = keys[0];
  let hi = max;
  for (const key of keys) {
    if (key <= target) lo = key;
    if (key >= target) { hi = key; break; }
  }
  if (lo === hi) return skill.levels?.[lo] || null;
  const loRow = skill.levels?.[lo] || {};
  const hiRow = skill.levels?.[hi] || {};
  const ratio = (target - lo) / (hi - lo);
  const out = {};
  for (const key of new Set([...Object.keys(loRow), ...Object.keys(hiRow)])) {
    const a = loRow[key];
    const b = hiRow[key];
    out[key] = (typeof a === 'number' && typeof b === 'number') ? a + (b - a) * ratio : (b ?? a);
  }
  return out;
}

export function detectSkillMode(skill) {
  if (skill?.hasPhysDmgPct) return 'physical';
  if (skill?.hasMagicDmgRange) return 'magic';
  return null;
}

export function applyPvpMap(profile, map = null) {
  const stDown = Math.max(0, num(map?.st_down));
  const stResist = Math.max(0, num(profile?.defense?.fieldStatDownResistPct));
  const effectiveStatDownPct = Math.max(0, stDown - stResist);
  const statCoef = Math.max(0, 1 - effectiveStatDownPct / 100);
  const resistCap = Math.min(90, (num(map?.lbd) || 90) + Math.max(0, num(profile?.defense?.fieldAttrCapResistPct)));
  const resistDownKeys = { fire: 'dfi', water: 'dwa', wind: 'dwi', earth: 'dea', light: 'dli', dark: 'dda' };
  const resist = {};
  const wisdomBonus = Math.floor(num(profile?.defense?.wiz) / 20);
  for (const attr of ATTRS) {
    const raw = num(profile?.defense?.resist?.[attr]) + wisdomBonus - num(map?.[resistDownKeys[attr]]);
    resist[attr] = Math.min(resistCap, raw);
  }
  return { effectiveStatDownPct, statCoef, resistCap, resist };
}

function intBonus(value) {
  const v = num(value);
  if (v <= 99) return 1;
  if (v <= 131) return 1.02;
  if (v <= 173) return 1.04;
  if (v <= 229) return 1.06;
  if (v <= 303) return 1.08;
  if (v <= 401) return 1.10;
  if (v <= 530) return 1.12;
  if (v <= 701) return 1.14;
  if (v <= 927) return 1.16;
  if (v <= 1226) return 1.18;
  if (v <= 1576) return 1.20;
  if (v <= 1926) return 1.22;
  if (v <= 2276) return 1.24;
  if (v <= 2676) return 1.26;
  if (v <= 2976) return 1.28;
  if (v <= 3326) return 1.30;
  if (v <= 3676) return 1.32;
  if (v <= 4026) return 1.34;
  if (v <= 4376) return 1.36;
  if (v <= 4726) return 1.38;
  if (v <= 5126) return 1.40;
  if (v <= 5526) return 1.42;
  if (v <= 5926) return 1.44;
  if (v <= 6326) return 1.46;
  if (v <= 6726) return 1.48;
  if (v <= 7126) return 1.50;
  return 1.50 + 0.02 * Math.floor((v - 7126) / 400);
}

export function calculateSkillBase(profile, skill, baseLevel, map = null, options = {}) {
  const mode = detectSkillMode(skill);
  if (!mode) return { calculable: false, reason: 'ダメージ表記を持たないスキルです。' };
  const offense = profile?.offense || {};
  const mapState = applyPvpMap(profile, map);
  const effectiveLevel = Math.max(1, num(baseLevel, 50) + num(offense.skillBonus));
  const row = interpolateSkillLevel(skill, effectiveLevel);
  if (!row) return { calculable: false, reason: 'スキルレベルデータがありません。' };
  const hitCount = Math.max(1, num(row.attackCount, 1));

  if (mode === 'physical') {
    const weapon = num(offense.weaponMax, offense.weaponMin);
    const strength = num(offense.str) * mapState.statCoef;
    const skillPct = num(row.physDmgPct);
    let normal = (1 + weapon) * (1 + strength / 200) * ((100 + skillPct + num(offense.physDamagePct)) / 100);
    normal *= 1 + num(offense.limitBreakPhysPct) / 100;
    const cap = Math.max(1, num(options.physicalCap, 20000) + num(offense.limitBreakPhysFlat));
    normal = Math.min(normal, cap);
    normal *= 1 + num(offense.finalPhysPct) / 100;
    normal *= 1 + num(offense.bloodFieldFinalPct) / 100;
    const crit = normal * 2;
    const double = normal * 4 * (1 + num(offense.doubleCritDamagePct) / 100);
    const strong = normal * 3 * (1 + num(offense.physStrongDamagePct) / 100);
    const pStrong = clamp01(num(offense.physStrongRate) / 100);
    const pCrit = clamp01(num(offense.physCritRate) / 100) * (1 - pStrong);
    const pDouble = pCrit * clamp01(num(offense.doubleCritRate) / 100);
    const expectedPerHit = Math.max(0, (1 - pStrong - pCrit) * normal + (pCrit - pDouble) * crit + pDouble * double + pStrong * strong);
    return { calculable: true, mode, effectiveLevel, row, hitCount, expectedPerHit, normal, crit, double, strong, mapState };
  }

  const attr = ATTRS.includes(skill.magicAttr) ? skill.magicAttr : 'magic';
  const intelligence = num(offense.int) * mapState.statCoef;
  const min = num(row.magicDmgMin);
  const max = num(row.magicDmgMax);
  const baseValue = options.magicRoll === 'min' ? min : options.magicRoll === 'avg' ? (min + max) / 2 : max;
  let normal = baseValue * (1 + intBonus(intelligence) * intelligence / 200);
  normal *= (100 + num(offense.magicDamagePct) + num(offense.enhance?.[attr])) / 100;
  const cap = Math.max(1, num(options.magicCap, 20000));
  if (normal > cap) normal = cap + (normal - cap) * (num(offense.limitBreakMagicPct) / 100);
  normal += num(offense.limitBreakMagicFlat);
  normal *= 1 + num(offense.finalMagicPct) / 100;
  normal *= 1 + num(offense.bloodFieldFinalPct) / 100;
  const crit = normal * 2;
  const strong = normal * 4;
  const pStrong = clamp01(num(offense.magicStrongRate) / 100);
  const pCrit = clamp01(num(offense.magicCritRate) / 100) * (1 - pStrong);
  const expectedPerHit = Math.max(0, (1 - pStrong - pCrit) * normal + pCrit * crit + pStrong * strong);
  return { calculable: true, mode, attr, effectiveLevel, row, hitCount, expectedPerHit, normal, crit, strong, mapState };
}

export function pvpLevelCoefficient(attackerLevel, defenderLevel) {
  const diff = clamp(num(attackerLevel) - num(defenderLevel), -224, 224);
  return Math.sqrt(Math.max(0, diff * (-0.00000003 * diff * diff + 0.0045) + 1));
}

export function calculatePvpHit(attacker, defender, skillBase, map = null, options = {}) {
  if (!skillBase?.calculable) return { calculable: false, reason: skillBase?.reason || '計算できません。' };
  const attack = attacker?.offense || {};
  const defense = defender?.defense || {};
  const defenderMap = applyPvpMap(defender, map);
  const humanPct = skillBase.mode === 'magic' ? num(attack.vsHumanMagicPct) : num(attack.vsHumanPhysPct);
  const pvpAttackPct = num(attack.pvpAttackPct) * num(options.pvpAttackScalePct, 100) / 100;
  const pvpDefensePct = num(defense.pvpDefensePct) * num(options.pvpDefenseScalePct, 100) / 100;
  const mapDamagePct = skillBase.mode === 'magic' ? num(options.magicDamagePct, 100) : num(options.physicalDamagePct, 100);
  let adjustedAttack = skillBase.expectedPerHit * (1 + pvpAttackPct / 100) * (1 + humanPct / 100) * (mapDamagePct / 100);
  let adjustedDefense = Math.max(0, num(defense.defense) * (1 + pvpDefensePct / 100));
  let preSqrt;
  let resistPct = 0;
  let provisional = false;
  if (skillBase.mode === 'physical') {
    preSqrt = adjustedAttack > 0 ? adjustedAttack / (1 + adjustedDefense / adjustedAttack) : 0;
  } else {
    provisional = true;
    adjustedDefense = 0;
    const attr = skillBase.attr;
    const weaken = num(attack.weaken?.[attr]);
    resistPct = clamp(num(defenderMap.resist?.[attr]) - weaken, -100, defenderMap.resistCap);
    preSqrt = adjustedAttack * Math.max(0, 1 - resistPct / 100);
  }
  const afterPvpFormula = options.useSquareRoot === false ? preSqrt : Math.sqrt(Math.max(0, preSqrt));
  const levelCoef = options.useLevelCorrection === false ? 1 : pvpLevelCoefficient(attacker?.level, defender?.level);
  const humanReduceCoef = Math.max(0, 1 - num(defense.humanDamageReducePct) / 100);
  const damageCutCoef = Math.max(0, 1 - num(options.damageCutPct) / 100);
  const perHit = afterPvpFormula * levelCoef * humanReduceCoef * damageCutCoef;
  const total = perHit * skillBase.hitCount;
  const hp = Math.max(0, num(defense.maxHp));
  return {
    calculable: true,
    engineVersion: PVP_ENGINE_VERSION,
    mode: skillBase.mode,
    provisional,
    adjustedAttack,
    adjustedDefense,
    preSqrt,
    resistPct,
    levelCoef,
    humanReduceCoef,
    damageCutCoef,
    perHit,
    hitCount: skillBase.hitCount,
    total,
    hp,
    hpLeft: hp - total,
    hitsToDefeat: perHit > 0 && hp > 0 ? Math.ceil(hp / perHit) : 0,
  };
}
