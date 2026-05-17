

import { getLayerAggregation } from './op_calc.js';

export const CATEGORIES = [
  { key: 'neural', name: 'ニューラルストーン', unlockBy: null },
  { key: 'plane',  name: 'プレーンストーン',   unlockBy: 'neural' },
  { key: 'phase',  name: 'フェーズストーン',   unlockBy: 'plane' },
];

export const PER_LEVEL_COST = [0, 1, 2, 4, 5, 8];
export const MAX_STAGE = 30;
export const MAX_SKILL_LV = 5;

export const SKILL_EFFECTS = {
  neural: [
    { name: '健康ステータス増加',         maxLv: 5, perLv: 1000, unit: '' },
    { name: '知恵ステータス増加',         maxLv: 5, perLv: 1000, unit: '' },
    { name: '敏捷ステータス増加',         maxLv: 5, perLv: 1000, unit: '' },
    { name: 'カリスマステータス増加',     maxLv: 5, perLv: 1000, unit: '' },
    { name: '運ステータス増加',           maxLv: 5, perLv: 1000, unit: '' },
    { name: 'ポーション回復速度増加',     maxLv: 5, perLv:   40, unit: '%' },
    { name: '魔法ダメージ吸収増加',       maxLv: 5, perLv:   20, unit: '%' },
    { name: '対象の命中率補正値無視',     maxLv: 5, perLv:   20, unit: '%' },
    { name: '対象の回避率補正値無視',     maxLv: 5, perLv:   20, unit: '%' },
    { name: '物理攻撃力増加',             maxLv: 5, perLv:  100, unit: '%' },
    { name: '魔法攻撃力増加',             maxLv: 5, perLv:   20, unit: '%' },
    { name: '全ての属性攻撃力増加',       maxLv: 5, perLv:   20, unit: '%' },
    { name: 'ターゲットの全属性抵抗減少', maxLv: 5, perLv:   10, unit: '%' },
    { name: '攻撃速度増加',               maxLv: 5, perLv:   15, unit: '%' },
    { name: '移動速度増加',               maxLv: 5, perLv:    8, unit: '%' },
    { name: '最大HP増加',                 maxLv: 5, perLv:   75, unit: '%' },
    { name: '最大CP増加',                 maxLv: 5, perLv:   75, unit: '%' },
  ],
  plane: [
    { name: '力ステータス増加',             maxLv: 5, perLv: 1000, unit: '' },
    { name: '知識ステータス増加',           maxLv: 5, perLv: 1000, unit: '' },
    { name: 'ターゲットの致命打抵抗減少',   maxLv: 5, perLv:    5, unit: '%' },
    { name: '物理クリティカルダメージ増加', maxLv: 5, perLv:   20, unit: '%' },
    { name: 'ダブルクリティカルダメージ増加', maxLv: 5, perLv:  4, unit: '%' },
    { name: '魔法致命打ダメージ増加',       maxLv: 5, perLv:    3, unit: '%' },
    { name: '物理強打ダメージ増加',         maxLv: 5, perLv:   50, unit: '%' },
    { name: '魔法強打ダメージ増加',         maxLv: 5, perLv:    2, unit: '%' },
    { name: '限界突破称号の物理効果増加',   maxLv: 5, perLv: 1000, unit: '' },
    { name: '限界突破称号の魔法効果増加',   maxLv: 5, perLv: 1000, unit: '' },
    { name: '限界突破称号の効果増加',       maxLv: 5, perLv: 1000, unit: '' },
    { name: '全純粋ステータス%増加',        maxLv: 5, perLv:    1, unit: '%' },
    { name: '被ダメージ%減少',              maxLv: 5, perLv:    1, unit: '%' },
    { name: '全スキルレベル増加',           maxLv: 5, perLv:    2, unit: '' },
    { name: 'シールド制限数値増加',         maxLv: 5, perLv:  100, unit: '' },
  ],
  phase: [
    { name: '純粋ステータス％増加（力）',                                            maxLv: 5, perLv:   4, unit: '%' },
    { name: '純粋ステータス％増加（知識）',                                          maxLv: 5, perLv:   4, unit: '%' },
    { name: '限界突破称号の物理％効果増加',                                          maxLv: 5, perLv:   1, unit: '%' },
    { name: '限界突破称号の魔法％効果増加',                                          maxLv: 5, perLv:   1, unit: '%' },
    { name: '限界突破称号の％効果増加',                                              maxLv: 5, perLv: 0.6, unit: '%' },
    { name: '最終物理ダメージ増加',                                                  maxLv: 5, perLv:   3, unit: '%' },
    { name: '最終魔法ダメージ増加',                                                  maxLv: 5, perLv:   3, unit: '%' },
    { name: '最終ダメージ増加',                                                      maxLv: 5, perLv:   3, unit: '%' },
    { name: 'ターゲットの最終ダメージ補正無視',                                      maxLv: 5, perLv:   2, unit: '%' },
    { name: 'ボス討伐時のダメージ増加',                                              maxLv: 5, perLv:   3, unit: '%' },
    { name: '位相系の敵討伐時ダメージ増加',                                          maxLv: 5, perLv:   5, unit: '%' },
    { name: 'ブラッドレコード増加',                                                  maxLv: 5, perLv:  10, unit: '' },
    { name: '限界突破称号の物理ダメージ+物理効果%増加 (500/Lv + 0.3%/Lv)',           maxLv: 5, perLv: 500, unit: '' },
    { name: '限界突破称号の魔法ダメージ+魔法効果%増加 (500/Lv + 0.3%/Lv)',           maxLv: 5, perLv: 500, unit: '' },
    { name: 'PVP状態時のダメージ増加+防御力%増加 (10%/Lv + 10%/Lv)',                 maxLv: 5, perLv:  10, unit: '%' },
  ],
};

export const STONE_OP_MAP = {
  neural: {
    0:  [{ statId: 'con',          perLv: 1000 }],
    1:  [{ statId: 'wiz',          perLv: 1000 }],
    2:  [{ statId: 'agi',          perLv: 1000 }],
    3:  [{ statId: 'chs',          perLv: 1000 }],
    4:  [{ statId: 'luc',          perLv: 1000 }],
    5:  [{ statId: 'potionHeal',   perLv:   40 }],

    6:  [{ stats: ['attrFireAbsorb','attrWaterAbsorb','attrWindAbsorb','attrEarthAbsorb','attrLightAbsorb','attrDarkAbsorb','attrMagicAbsorb'], perLv: 20 }],
    
    7:  [{ statId: 'ignoreAttackerHit', perLv: 20 }],
    8:  [{ statId: 'ignoreTargetEva',   perLv: 20 }],
    
    9:  [{ statId: 'physDamagePercent', perLv: 100 }],

    
    10: [{ statId: 'attrMagic', perLv: 20 }],
    
    11: [{ stats: ['attrFire','attrWater','attrWind','attrEarth','attrLight','attrDark'], perLv: 20 }],
    12: [{ stats: ['attrFireWeaken','attrWaterWeaken','attrWindWeaken','attrEarthWeaken','attrLightWeaken','attrDarkWeaken','attrMagicWeaken'], perLv: 10 }],
    13: [{ statId: 'atkspd',       perLv:   15 }],
    14: [{ statId: 'mvspd',        perLv:    8 }],
    15: [{ statId: 'hpPercent',    perLv:   75 }],
    16: [{ statId: 'cpPercent',    perLv:   75 }],
  },
  plane: {
    0:  [{ statId: 'str',          perLv: 1000 }],
    1:  [{ statId: 'int',          perLv: 1000 }],
    2:  [{ statId: 'enemyPhysCritResistReduce', perLv: 5 }],
    3:  [{ statId: 'physCritDamage',     perLv: 20 }],
    4:  [{ statId: 'doubleCritDamage',   perLv:  4 }],
    5:  [{ statId: 'magicCritDamage',    perLv:  3 }],
    6:  [{ statId: 'physStrongDamage',   perLv: 50 }],
    7:  [{ statId: 'magicStrongDamage',  perLv:  2 }],
    8:  [{ statId: 'limitBreakPhysFlat',  perLv: 1000 }],
    9:  [{ statId: 'limitBreakMagicFlat', perLv: 1000 }],
    
    10: [
      { statId: 'limitBreakPhysFlat',   perLv: 1000 },
      { statId: 'limitBreakMagicFlat',  perLv: 1000 },
    ],
    
    11: [{ statId: 'pureStatPercentAll', perLv: 1 }],
    12: [{ statId: 'damageReducePercent', perLv: 1 }],
    13: [{ statId: 'skillLv',             perLv: 2 }],
    
  },
  phase: {
    
    0: [{ statId: 'pureStatPercentStr', perLv: 4 }],
    1: [{ statId: 'pureStatPercentInt', perLv: 4 }],
    2: [{ statId: 'limitBreakPhysPercent',  perLv: 1 }],
    3: [{ statId: 'limitBreakMagicPercent', perLv: 1 }],
    
    4: [
      { statId: 'limitBreakPhysPercent',  perLv: 0.6 },
      { statId: 'limitBreakMagicPercent', perLv: 0.6 },
    ],
    5: [{ statId: 'finalPhysDamage',        perLv: 3 }],
    6: [{ statId: 'finalMagicDamage',       perLv: 3 }],
    7: [{ statId: 'finalDamagePercent',     perLv: 3 }],
    8: [{ statId: 'enemyFinalDamageReduce', perLv: 2 }],
    
    9:  [{ statId: 'vsBossDamage',         perLv: 3 }],
    10: [{ statId: 'vsPhaseEnemyDamage',   perLv: 5 }],
    11: [{ statId: 'bloodRecord',          perLv: 10 }],
    12: [
      { statId: 'limitBreakPhysFlat',     perLv: 500 },
      { statId: 'limitBreakPhysPercent',  perLv: 0.3 },
    ],
    13: [
      { statId: 'limitBreakMagicFlat',    perLv: 500 },
      { statId: 'limitBreakMagicPercent', perLv: 0.3 },
    ],
    14: [
      { statId: 'pvpDamage',  perLv: 10 },
      { statId: 'defPercent', perLv: 10 },
    ],
  },
};

export function getSkillCount(catKey) {
  const list = SKILL_EFFECTS[catKey];
  return list ? list.length : 0;
}

export function newStones() {
  const stones = Object.create(null);
  for (const cat of CATEGORIES) {
    stones[cat.key] = {
      stage: 0,
      skills: Array(getSkillCount(cat.key)).fill(0),
    };
  }
  return stones;
}

export function cumulativeSkillCost(lv) {
  let s = 0;
  for (let i = 1; i <= lv; i++) s += PER_LEVEL_COST[i] || 0;
  return s;
}

export function skillPointCap(stones, catKey) {
  const stage = stones[catKey]?.stage || 0;
  return (stage <= 10) ? stage : 10 + (stage - 10) * 5;
}

export function skillPointUsed(stones, catKey) {
  const skills = stones[catKey]?.skills || [];
  return skills.reduce((a, lv) => a + cumulativeSkillCost(lv), 0);
}

export function isUnlocked(stones, cat) {
  if (!cat.unlockBy) return true;
  return (stones[cat.unlockBy]?.stage || 0) >= 10;
}

export function getSkillEffect(catKey, idx, lv) {
  const def = SKILL_EFFECTS[catKey] && SKILL_EFFECTS[catKey][idx];
  if (!def) return null;
  return { name: def.name, value: def.perLv * lv, unit: def.unit };
}

export function applyStonesToSTTemp(STTemp, stones) {
  if (!stones) return;
  if (!STTemp.sum) STTemp.sum = Object.create(null);

  for (const cat of CATEGORIES) {
    if (!isUnlocked(stones, cat)) continue;
    const state = stones[cat.key];
    if (!state || !Array.isArray(state.skills)) continue;
    const mapForCat = STONE_OP_MAP[cat.key] || {};
    state.skills.forEach((lv, idx) => {
      if (!lv) return;
      const ops = mapForCat[idx];
      if (!ops) return;
      for (const op of ops) {
        const v = op.perLv * lv;
        if (Array.isArray(op.stats)) {
          for (const sid of op.stats) accumulateStone(STTemp, sid, v);
        } else if (op.statId) {
          accumulateStone(STTemp, op.statId, v);
        }
      }
    });
  }
}

function accumulateStone(STTemp, statId, v) {
  const agg = getLayerAggregation('sum', statId);
  if (agg === 'skip') return;
  const cur = STTemp.sum[statId];
  if (agg === 'max') {
    STTemp.sum[statId] = (cur == null) ? v : Math.max(cur, v);
  } else {
    STTemp.sum[statId] = (cur || 0) + v;
  }
}

export function normalizeStones(input) {
  const out = newStones();
  if (!input || typeof input !== 'object') return out;
  for (const cat of CATEGORIES) {
    const raw = input[cat.key];
    if (!raw) continue;
    const stage = Math.max(0, Math.min(MAX_STAGE, Number(raw.stage) || 0));
    const n = getSkillCount(cat.key);
    const skills = Array.from({ length: n }, (_, i) => {
      const v = Array.isArray(raw.skills) ? Number(raw.skills[i]) : 0;
      return Math.max(0, Math.min(MAX_SKILL_LV, v || 0));
    });
    out[cat.key] = { stage, skills };
  }
  return out;
}