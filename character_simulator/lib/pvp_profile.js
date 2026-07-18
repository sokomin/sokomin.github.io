export const PVP_PROFILE_SCHEMA = 'rs-pvp-profile-v1';

const JOB_NAMES = {
  0: '剣士', 1: '戦士', 2: 'アーチャー', 3: 'ランサー', 4: 'ウィザード',
  5: 'ウルフマン', 6: 'ビショップ', 7: '追放天使', 8: 'ビーストテイマー',
  9: 'サマナー', 10: 'シーフ', 11: '武道家', 12: 'プリンセス',
  13: 'リトルウィッチ', 14: 'ネクロマンサー', 15: '悪魔', 16: '霊術師',
  17: '闘士', 18: '光奏師', 19: 'メイド', 20: '黒魔術師',
  21: 'マスケッティア', 22: 'アルケミスト', 23: 'キャプテン',
  24: '獣人', 25: 'キャノニア',
};

const ATTRS = ['fire', 'water', 'wind', 'earth', 'light', 'dark'];

function finite(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function capName(attr) {
  return attr.charAt(0).toUpperCase() + attr.slice(1);
}

function attrTable(stats, suffix = '') {
  const out = {};
  for (const attr of ATTRS) out[attr] = finite(stats[`attr${capName(attr)}${suffix}`]);
  return out;
}

function weakenTable(stats) {
  const out = attrTable(stats, 'Weaken');
  const guildFlag = finite(stats.guildFlagAttrWeaken);
  for (const attr of ATTRS) out[attr] += guildFlag;
  return out;
}

export function buildPvpProfile(character, stats, abilities) {
  if (!character || !stats || !abilities) return null;
  const jobId = finite(character.job, -1);
  return {
    schema: PVP_PROFILE_SCHEMA,
    jobId,
    jobName: JOB_NAMES[jobId] || `job_${jobId}`,
    level: Math.max(1, finite(character.realLv, 1)),
    offense: {
      weaponMin: finite(abilities.atkMin),
      weaponMax: finite(abilities.atkMax),
      str: finite(stats.str, character.stats?.base?.str),
      int: finite(stats.int, character.stats?.base?.int),
      skillBonus: finite(stats.skillLv),
      physDamagePct: finite(stats.physDamagePercent),
      finalPhysPct: finite(stats.finalPhysDamage) + finite(stats.finalDamagePercent),
      bloodFieldFinalPct: finite(stats.bloodFieldFinalDmg),
      physCritRate: finite(stats.physCritRate),
      doubleCritRate: finite(stats.doubleCritRate),
      physStrongRate: finite(stats.physStrongRate),
      doubleCritDamagePct: finite(stats.doubleCritDamage),
      physStrongDamagePct: finite(stats.physStrongDamage),
      magicDamagePct: finite(stats.attrMagic),
      finalMagicPct: finite(stats.finalMagicDamage) + finite(stats.finalDamagePercent),
      magicCritRate: finite(stats.magicCritRate),
      magicStrongRate: finite(stats.magicStrongRate),
      pvpAttackPct: finite(stats.pvpDamage) + finite(stats.pvpAtkBonus),
      vsHumanPhysPct: finite(stats.vsHumanoidPhys),
      vsHumanMagicPct: finite(stats.vsHumanoidMagic) + finite(stats.vsHumanoidMagicBonus),
      attackSpeedPct: finite(stats.atkspd),
      limitBreakPhysPct: finite(stats.__withTitleLimitBreakPhysPct, stats.limitBreakPhysPercent),
      limitBreakPhysFlat: finite(stats.__withTitleLimitBreakPhysFlat, stats.limitBreakPhysFlat),
      limitBreakMagicPct: finite(stats.__withTitleLimitBreakMagicPct, stats.limitBreakMagicPercent),
      limitBreakMagicFlat: finite(stats.__withTitleLimitBreakMagicFlat, stats.limitBreakMagicFlat),
      enhance: attrTable(stats),
      weaken: weakenTable(stats),
    },
    defense: {
      maxHp: finite(abilities.hpMax),
      defense: finite(abilities.def),
      wiz: finite(stats.wiz, character.stats?.base?.wiz),
      chs: finite(stats.chs, character.stats?.base?.chs),
      pvpDefensePct: finite(stats.pvpDefense) + finite(stats.pvpDefBonus),
      humanDamageReducePct: finite(stats.fromHumanoidDmgReduce) + finite(stats.vsHumanoidPhysReceived),
      fieldStatDownResistPct: finite(stats.fieldStatDownResist),
      fieldAttrCapResistPct: finite(stats.fieldAttrCapResist),
      resist: attrTable(stats, 'Resist'),
      absorb: attrTable(stats, 'Absorb'),
    },
  };
}

export function getPvpProfile(session) {
  const profile = session?.pvpProfile;
  if (!profile || profile.schema !== PVP_PROFILE_SCHEMA) {
    throw new Error('PVPプロフィールがありません。更新後のキャラクターシミュレーターでキャラJSONを再保存してください。');
  }
  if (!Number.isFinite(Number(profile.jobId)) || !Number.isFinite(Number(profile.level))) {
    throw new Error('PVPプロフィールの職業またはレベルが不正です。');
  }
  if (!profile.offense || typeof profile.offense !== 'object' || !profile.defense || typeof profile.defense !== 'object') {
    throw new Error('PVPプロフィールの攻撃・防御データが不正です。');
  }
  return profile;
}

export function jobNameForPvp(jobId) {
  return JOB_NAMES[Number(jobId)] || `job_${jobId}`;
}
