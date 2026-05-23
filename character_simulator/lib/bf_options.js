

export const BF_TIERS = ['low', 'mid', 'high', 'top'];
export const BF_TIER_LABELS = {
  low:  '下級',
  mid:  '中級',
  high: '上級',
  top:  '最上級',
};
export const BF_TIER_COLORS = {
  low:  '#00b800',
  mid:  '#50a0f8',
  high: '#efce9c',
  top:  '#c88800',
};
export const BF_GRADE_LABELS = {
  black: 'ブラックファイヤー',
  white: '白い異界',
};

function tiers(lLo, lHi, mLo, mHi, hLo, hHi, tLo, tHi) {
  return {
    low:  { min: lLo, max: lHi },
    mid:  { min: mLo, max: mHi },
    high: { min: hLo, max: hHi },
    top:  { min: tLo, max: tHi },
  };
}

const B_stat   = tiers(50, 77,  78, 115, 116, 140, 141, 150);
const B_dmg    = tiers(25, 33,  34, 42,  43, 50,   51, 55);
const B_resist = tiers(5, 7,    8, 11,   12, 14,   15, 17);
const B_atkmin = tiers(3, 4,    5, 6,    7, 8,     9, 10);
const B_atkmax = tiers(5, 8,    9, 12,  13, 17,   18, 20);
const B_defflat= tiers(5, 7,    8, 10,  10, 12,   13, 15);
const B_defpct = tiers(10, 16, 17, 22,  23, 30,   31, 35);
const B_hpflat = tiers(100, 140, 141, 185, 186, 240, 241, 250);
const B_hppct  = tiers(25, 32, 33, 40,  41, 48,   49, 55);
const B_cpflat = tiers(100, 140, 141, 185, 186, 240, 241, 250);
const B_cppct  = tiers(10, 16, 17, 22,  23, 30,   31, 35);
const B_crit5  = tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_atkspd = tiers(7, 9,  10, 12,  13, 15,   16, 17);
const B_mvspd  = tiers(5, 8,   9, 12,  13, 17,   18, 20);
const B_eva    = tiers(1, 1,   2, 2,    3, 3,     4, 4);
const B_hit    = tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_drain  = tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_cpbonus= tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_cpdrain= tiers(5, 11, 12, 17,  18, 22,   23, 25);
const B_potion = tiers(50, 64, 65, 79,  80, 95,   96, 100);
const B_drop   = tiers(10, 13, 14, 17,  18, 22,   23, 25);
const B_skill  = tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_reflect= tiers(10, 13, 14, 17,  18, 22,   23, 25);
const B_mabs   = tiers(5, 7,   8, 10,  11, 13,   14, 15);
const B_convert= tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_dblcrit= tiers(1, 2,   3, 3,    4, 4,     5, 5);
const B_crdmg  = tiers(1, 2,   3, 3,    4, 4,     5, 5);

const W_stat   = tiers(100, 154, 156, 230, 232, 280, 282, 300);
const W_dmg    = tiers(50, 66,   68, 84,   86, 100,  102, 110);
const W_resist = tiers(12, 14,   15, 17,   18, 20,   21, 23);
const W_atkmin = tiers(7, 8,      9, 10,   11, 12,   13, 14);
const W_atkmax = tiers(13, 17,   18, 20,   21, 23,   24, 26);
const W_defflat= tiers(10, 12,   13, 15,   16, 18,   19, 21);
const W_defpct = tiers(23, 30,   31, 35,   36, 40,   41, 45);
const W_hpflat = tiers(200, 280, 282, 370, 372, 480, 482, 500);
const W_hppct  = tiers(41, 48,   49, 55,   56, 62,   63, 70);
const W_cpflat = tiers(200, 280, 282, 370, 372, 480, 482, 500);
const W_cppct  = tiers(23, 30,   31, 35,   36, 40,   41, 45);
const W_crit10 = tiers(2, 6,      6, 6,     8, 8,    10, 10);   
const W_atkspd = tiers(13, 15,   16, 18,   19, 21,   22, 25);
const W_mvspd  = tiers(10, 16,   18, 24,   26, 34,   36, 40);
const W_eva    = tiers(3, 3,      4, 4,     5, 5,     6, 6);
const W_hit    = tiers(4, 4,      5, 5,     6, 6,     7, 7);
const W_drain  = tiers(4, 4,      5, 5,     6, 6,     7, 7);
const W_cpbonus= tiers(4, 4,      5, 5,     6, 6,     7, 7);
const W_cpdrain= tiers(10, 22,   24, 34,   36, 44,   46, 50);
const W_potion = tiers(75, 96,   97, 118, 120, 142, 144, 150);
const W_drop   = tiers(15, 20,   21, 26,   27, 33,   34, 37);
const W_skill  = tiers(4, 4,      5, 5,     6, 6,     7, 7);
const W_reflect= tiers(15, 20,   21, 26,   27, 33,   34, 37);
const W_mabs   = tiers(10, 14,   16, 20,   22, 26,   27, 33);
const W_dblcrit= tiers(2, 4,      5, 5,     6, 6,     7, 7);
const W_crdmg  = tiers(1, 6,      6, 6,     8, 8,    10, 10);

export const BF_OPTIONS = [
  
  { id:'str', name:'力',     familyId:0, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  { id:'agi', name:'敏捷',   familyId:1, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  { id:'int', name:'知識',   familyId:4, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  { id:'wiz', name:'知恵',   familyId:3, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  { id:'con', name:'健康',   familyId:2, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  { id:'chs', name:'カリスマ',familyId:5, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  { id:'luc', name:'運',     familyId:6, unit:'', black:B_stat, white:W_stat, whiteProb:3 },
  
  { id:'dmg_pct',     name:'ダメージ',                       familyId:21,  unit:'%', black:B_dmg,    white:W_dmg,    whiteProb:3 },
  { id:'mdmg_pct',    name:'魔法ダメージ',                   familyId:145, unit:'%', black:B_dmg,    white:W_dmg,    whiteProb:3 },
  { id:'mresist_weak',name:'ターゲットの魔法抵抗力弱化',     familyId:138, unit:'%', black:B_resist, white:W_resist, whiteProb:3 },
  
  { id:'atk_min', name:'最小攻撃力', familyId:22, unit:'', black:B_atkmin, white:W_atkmin, whiteProb:3 },
  { id:'atk_max', name:'最大攻撃力', familyId:23, unit:'', black:B_atkmax, white:W_atkmax, whiteProb:3 },
  
  { id:'def_flat',name:'防御力',      familyId:25, unit:'',  black:B_defflat, white:W_defflat, whiteProb:3 },
  { id:'def_pct', name:'防御力(%)',   familyId:24, unit:'%', black:B_defpct,  white:W_defpct,  whiteProb:3 },
  
  { id:'hp_flat', name:'HP',     familyId:27, unit:'',  black:B_hpflat, white:W_hpflat, whiteProb:3 },
  { id:'hp_pct',  name:'HP(%)',  familyId:26, unit:'%', black:B_hppct,  white:W_hppct,  whiteProb:3 },
  { id:'cp_flat', name:'CP',     familyId:29, unit:'',  black:B_cpflat, white:W_cpflat, whiteProb:3 },
  { id:'cp_pct',  name:'CP(%)',  familyId:28, unit:'%', black:B_cppct,  white:W_cppct,  whiteProb:3 },
  
  { id:'crit_rate',  name:'致命打確率増加', familyId:34,  unit:'%', black:B_crit5, white:W_crit10, whiteProb:3 },
  { id:'strong_rate',name:'強打確率増加',   familyId:462, unit:'%', black:B_crit5, white:W_crit10, whiteProb:1 },
  
  { id:'atk_spd', name:'攻撃速度', familyId:41, unit:'%', black:B_atkspd, white:W_atkspd, whiteProb:3 },
  { id:'mv_spd',  name:'移動速度', familyId:40, unit:'%', black:B_mvspd,  white:W_mvspd,  whiteProb:3 },
  
  { id:'eva', name:'回避率', familyId:32, unit:'%', black:B_eva, white:W_eva, whiteProb:1 },
  { id:'hit', name:'命中率', familyId:31, unit:'%', black:B_hit, white:W_hit, whiteProb:1 },
  
  { id:'hp_drain',  name:'敵に与えたダメージHP吸収',         familyId:50, unit:'%', black:B_drain,   white:W_drain,   whiteProb:2 },
  
  { id:'mhp_drain', name:'敵に与えた魔法ダメージHP吸収',     displayOnly:true, unit:'%', black:B_drain, white:W_drain, whiteProb:2 },
  { id:'cp_bonus',  name:'ボーナスCP獲得',                   familyId:51, unit:'%', black:B_cpbonus, white:W_cpbonus, whiteProb:3 },
  
  { id:'cp_move_red',name:'移動時減少CP',                    displayOnly:true, unit:'', black:B_cpdrain, white:W_cpdrain, whiteProb:3 },
  { id:'potion',    name:'ポーション回復速度',               familyId:42, unit:'%', black:B_potion,  white:W_potion,  whiteProb:3 },
  
  { id:'mdrop',     name:'魔法アイテムドロップ確率',         familyId:115, unit:'%', black:B_drop,  white:W_drop,  whiteProb:3 },
  { id:'skill_lv',  name:'スキルレベル',                     familyId:104, unit:'',  black:B_skill, white:W_skill, whiteProb:1 },

  { id:'reflect',    name:'被ダメージ反射',           familyId:98, unit:'%', black:B_reflect, white:W_reflect, whiteProb:3 },
  { id:'magic_abs',  name:'被魔法ダメージ吸収',       familyId:81, unit:'%', black:B_mabs,    white:W_mabs,    whiteProb:3 },
  { id:'cp_convert', name:'被ダメージCP転換',         familyId:99, unit:'%', black:B_convert, white:W_crit10,  whiteProb:3 },
  
  { id:'dbl_crit',  name:'ダブルクリティカルダメージ増加', familyId:182, unit:'%', black:B_dblcrit, white:W_dblcrit, whiteProb:1 },
  { id:'crit_dmg',  name:'クリティカルダメージ増加',       familyId:184, unit:'%', black:B_crdmg,   white:W_crdmg,   whiteProb:3 },

  

  
  {
    id:'white_final_dmg',
    name:'最終ダメージ増加',
    statId:'finalDamagePercent',
    unit:'%',
    whiteOnly:true,
    whiteProb:0.66,
    white: tiers(1, 3,  3, 3,  4, 4,  5, 5),
  },
  {
    id:'white_limit_phys',
    name:'限界突破称号の物理効果',
    statId:'limitBreakPhysPercent',
    unit:'%',
    whiteOnly:true,
    whiteProb:0.66,
    white: tiers(1, 2,  3, 3,  4, 4,  5, 5),
  },
  {
    id:'white_limit_magic',
    name:'限界突破称号の魔法効果',
    statId:'limitBreakMagicPercent',
    unit:'%',
    whiteOnly:true,
    whiteProb:0.66,
    white: tiers(2, 4,  6, 6,  8, 8,  10, 10),
  },
  {
    id:'white_magic_strong_rate',
    name:'魔法強打確率増加',
    familyId:723,
    unit:'%',
    whiteOnly:true,
    whiteProb:0.66,
    white: tiers(2, 4,  5, 5,  6, 6,  7, 7),
  },
  {
    id:'white_pet_final_dmg',
    name:'(召喚獣、ペット)最終ダメージ',
    displayOnly:true,    
    unit:'%',
    whiteOnly:true,
    whiteProb:0.70,
    white: tiers(1, 3,  3, 3,  4, 4,  5, 5),
  },
  {
    id:'white_pet_magic_strong_rate',
    name:'(召喚獣、ペット)魔法強打確率増加',
    familyId:690,
    unit:'%',
    whiteOnly:true,
    whiteProb:0.66,
    white: tiers(1, 3,  3, 3,  4, 4,  5, 5),
  },
];

const _byId = new Map(BF_OPTIONS.map((o) => [o.id, o]));

export function getBfOption(id) {
  if (!id) return null;
  return _byId.get(String(id)) || null;
}

export function getBfRange(id, grade, tier) {
  const def = getBfOption(id);
  if (!def) return null;
  
  if (def.whiteOnly && grade !== 'white') return null;
  const g = (grade === 'white') ? def.white : def.black;
  if (!g) return null;
  return g[tier] || null;
}

export function listBfOptionsForGrade(grade) {
  if (!grade) return [];
  if (grade === 'white') return BF_OPTIONS.slice();
  return BF_OPTIONS.filter((o) => !o.whiteOnly);
}

export function formatBfOption(def, grade = 'black', tier = 'top') {
  if (!def) return '';
  const r = getBfRange(def.id, grade, tier);
  if (!r) return def.name;
  const unit = def.unit || '';
  const valTxt = (r.min === r.max) ? `+${r.max}${unit}` : `+${r.min}~${r.max}${unit}`;
  const mark   = def.whiteOnly ? ' 〔白限定〕' : '';
  const probTxt = (grade === 'white' && def.whiteProb != null)
    ? ` 出現${def.whiteProb}%` : '';
  return `${def.name} ${valTxt}${mark}${probTxt}`;
}

export function buildBfopSlot(state) {
  if (!state || !state.id) return null;
  const def = getBfOption(state.id);
  if (!def) return null;
  const grade = (state.grade === 'white') ? 'white' : 'black';
  const tier  = BF_TIERS.includes(state.tier) ? state.tier : 'top';
  const range = getBfRange(def.id, grade, tier);
  if (!range) return null;
  
  const value = range.max;

  if (def.displayOnly || (def.familyId == null && !def.statId)) {
    return {
      source:   'bfop',
      bfId:     def.id,
      bfGrade:  grade,
      bfTier:   tier,
      familyId: -1,
      value,
      isDisplayOnly: true,
    };
  }
  
  if (def.statId && def.familyId == null) {
    return {
      source:   'bfop',
      bfId:     def.id,
      bfGrade:  grade,
      bfTier:   tier,
      statId:   def.statId,
      value,
    };
  }
  return {
    source:   'bfop',
    bfId:     def.id,
    bfGrade:  grade,
    bfTier:   tier,
    familyId: def.familyId,
    value,
  };
}
