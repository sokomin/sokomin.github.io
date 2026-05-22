

export const BASE_OP_DEFS = [

  { key: 'phys_dmg_pct', label: '物理ダメージ +%', minLv: 1, slot: 1, familyId: 21, unit: '%',
    values: [5,10,15,20,25,30,35,40,45,53,58,66,74,82,92,100,110,120,130,142,152,164,176,188,202,212,230,250,270,300] },
  
  { key: 'phys_crit_chance', label: '物理致命打発動確率 +%', minLv: 1, slot: 1, opId: 70, unit: '%',
    values: [2,2,3,3,4,5,6,7,8,10,11,12,13,14,17,18,19,20,21,25,27,29,31,33,38,40,43,46,49,55] },
  
  { key: 'phys_crit_dmg', label: '物理致命打ダメージ +%', minLv: 1, slot: 1, familyId: 184, unit: '%',
    values: [10,11,12,13,14,15,16,17,18,20,21,22,23,24,27,29,31,33,35,39,42,45,48,51,56,60,68,77,88,100] },
  
  { key: 'fire_dmg', label: '火属性ダメージ強化 +%', minLv: 1, slot: 1, familyId: 139, unit: '%',
    values: [35,36,38,41,44,47,50,53,56,63,67,71,75,79,87,92,97,102,107,116,122,128,134,140,150,160,175,190,205,230] },
  
  { key: 'water_dmg', label: '水属性ダメージ強化 +%', minLv: 1, slot: 1, familyId: 140, unit: '%',
    values: [35,36,38,41,44,47,50,53,56,63,67,71,75,79,87,92,97,102,107,116,122,128,134,140,150,160,175,190,205,230] },
  
  { key: 'wind_dmg', label: '風属性ダメージ強化 +%', minLv: 1, slot: 1, familyId: 141, unit: '%',
    values: [35,36,38,41,44,47,50,53,56,63,67,71,75,79,87,92,97,102,107,116,122,128,134,140,150,160,175,190,205,230] },
  
  { key: 'earth_dmg', label: '大地属性ダメージ強化 +%', minLv: 1, slot: 1, familyId: 142, unit: '%',
    values: [35,36,38,41,44,47,50,53,56,63,67,71,75,79,87,92,97,102,107,116,122,128,134,140,150,160,175,190,205,230] },
  
  { key: 'light_dmg', label: '光属性ダメージ強化 +%', minLv: 1, slot: 1, familyId: 143, unit: '%',
    values: [35,36,38,41,44,47,50,53,56,63,67,71,75,79,87,92,97,102,107,116,122,128,134,140,150,160,175,190,205,230] },
  
  { key: 'dark_dmg', label: '闇属性ダメージ強化 +%', minLv: 1, slot: 1, familyId: 144, unit: '%',
    values: [35,36,38,41,44,47,50,53,56,63,67,71,75,79,87,92,97,102,107,116,122,128,134,140,150,160,175,190,205,230] },
  
  { key: 'fire_resist_weak', label: '火抵抗弱化 +%', minLv: 1, slot: 1, familyId: 132, unit: '%',
    values: [25,26,28,30,32,34,36,38,40,45,48,51,54,57,63,67,71,75,79,86,91,96,101,106,113,120,120,120,120,120] },
  
  { key: 'water_resist_weak', label: '水抵抗弱化 +%', minLv: 1, slot: 1, familyId: 133, unit: '%',
    values: [25,26,28,30,32,34,36,38,40,45,48,51,54,57,63,67,71,75,79,86,91,96,101,106,113,120,120,120,120,120] },
  
  { key: 'wind_resist_weak', label: '風抵抗弱化 +%', minLv: 1, slot: 1, familyId: 134, unit: '%',
    values: [25,26,28,30,32,34,36,38,40,45,48,51,54,57,63,67,71,75,79,86,91,96,101,106,113,120,120,120,120,120] },
  
  { key: 'earth_resist_weak', label: '大地属性弱化 +%', minLv: 1, slot: 1, familyId: 135, unit: '%',
    values: [25,26,28,30,32,34,36,38,40,45,48,51,54,57,63,67,71,75,79,86,91,96,101,106,113,120,120,120,120,120] },
  
  { key: 'light_resist_weak', label: '光属性弱化 +%', minLv: 1, slot: 1, familyId: 136, unit: '%',
    values: [25,26,28,30,32,34,36,38,40,45,48,51,54,57,63,67,71,75,79,86,91,96,101,106,113,120,120,120,120,120] },
  
  { key: 'dark_resist_weak', label: '闇属性弱化 +%', minLv: 1, slot: 1, familyId: 137, unit: '%',
    values: [25,26,28,30,32,34,36,38,40,45,48,51,54,57,63,67,71,75,79,86,91,96,101,106,113,120,120,120,120,120] },

  
  { key: 'phys_strike_chance', label: '物理強打発動確率 +%', minLv: 10, slot: 2, opId: 462, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,6,6,7,7,8,10,11,12,13,14,16,17,19,20,21,24,25,28,31,35,40] },
  
  { key: 'enemy_crit_resist_down', label: '敵致命打抵抗減少 +%', minLv: 10, slot: 2, opId: 940, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,6,6,7,7,8,10,11,12,13,14,16,17,19,20,21,24,25,28,31,35,40] },
  
  { key: 'magic_crit_chance', label: '魔法致命打発動確率 +%', minLv: 10, slot: 2, familyId: 461, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,5,5,6,6,7,8,9,10,11,12,13,14,15,16,17,19,20,22,24,26,30] },
  
  { key: 'magic_strike_chance', label: '魔法強打発動確率 +%', minLv: 10, slot: 2, familyId: 723, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,2,2,3,3,3,4,4,4,5,5,6,6,7,7,8,9,10,11,12,13,15] },

  { key: 'vs_undead_demon_phys', label: 'vs アンデッド・悪魔 物理ダメージ +%', minLv: 10, slot: 2, familyId: 651, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,25,28,31,34,37,42,46,50,54,58,64,69,74,79,84,94,100,110,122,135,150] },

  { key: 'vs_animal_god_phys', label: 'vs 動物・神獣 物理ダメージ +%', minLv: 10, slot: 2, familyId: 652, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,25,28,31,34,37,42,46,50,54,58,64,69,74,79,84,94,100,110,122,135,150] },

  { key: 'vs_human_phys', label: 'vs 人間 物理ダメージ +%', minLv: 10, slot: 2, familyId: 157, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,25,28,31,34,37,42,46,50,54,58,64,69,74,79,84,94,100,110,122,135,150] },

  { key: 'vs_undead_demon_magic', label: 'vs アンデッド・悪魔 魔法ダメージ +%', minLv: 10, slot: 2, familyId: 653, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,25,28,31,34,37,42,46,50,54,58,64,69,74,79,84,94,100,110,122,135,150] },

  { key: 'vs_animal_god_magic', label: 'vs 動物・神獣 魔法ダメージ +%', minLv: 10, slot: 2, familyId: 654, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,25,28,31,34,37,42,46,50,54,58,64,69,74,79,84,94,100,110,122,135,150] },

  { key: 'vs_human_magic', label: 'vs 人間 魔法ダメージ +%', minLv: 10, slot: 2, familyId: 729, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,25,28,31,34,37,42,46,50,54,58,64,69,74,79,84,94,100,110,122,135,150] },

  
  { key: 'double_crit_dmg', label: 'ダブルクリティカルダメージ +%', minLv: 15, slot: 3, familyId: 182, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,6,6,7,7,8,9,10,11,12,13,14,15,18,21,25,30] },
  
  { key: 'phys_strike_dmg', label: '物理強打ダメージ +%', minLv: 15, slot: 3, familyId: 755, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,11,12,13,14,15,17,18,19,20,21,24,25,28,32,37,45] },
  
  { key: 'phys_limit_dmg', label: '物理攻撃限界ダメージ増加 +', minLv: 15, slot: 3, unit: '', displayOnly: true,
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,600,700,700,800,900,1000,1100,1200,1300,1400,1500,1800,2100,2500,3000] },
  
  { key: 'magic_strike_dmg', label: '魔法強打ダメージ増加 +%', minLv: 15, slot: 3, opId: 754, unit: '%',
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,5,5,6,6,7,7,8,8,9,10,11,13,15,18] },
  
  { key: 'final_dmg', label: '最終ダメージ増加 +%', minLv: 15, slot: 3, statId: 'finalDamagePercent', unit: '%',
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20] },
  
  { key: 'magic_limit_dmg', label: '魔法攻撃限界ダメージ増加 +', minLv: 15, slot: 3, unit: '', displayOnly: true,
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,2,2,2,2,3,3,3,3,3,4,4,5,6,7,8] },
  
  { key: 'pvp_area_dmg_inc', label: 'PVPエリア 全ダメージ +%', minLv: 15, slot: 3, statId: 'pvpDamage', unit: '%',
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,15,15,16,17,18,21,23,25,27,29,33,35,38,41,45,50] },
  
  { key: 'pvp_area_dmg_red', label: 'PVPエリア 全被ダメ -%', minLv: 15, slot: 3, unit: '%', displayOnly: true,
    values: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,15,15,16,17,18,21,23,25,27,29,33,35,38,41,45,50] },
];

const BY_KEY = Object.fromEntries(BASE_OP_DEFS.map((d) => [d.key, d]));

export function getBaseOpDef(key) {
  return BY_KEY[key] || null;
}

export function valueAtLv(key, ultLv) {
  const d = BY_KEY[key];
  if (!d) return null;
  if (ultLv < 1 || ultLv > 30) return null;
  const v = d.values[ultLv - 1];
  return (v == null) ? null : v;
}

export function unlockedBaseOpCount(ultLv) {
  if (!(ultLv >= 1)) return 0;
  if (ultLv >= 15) return 3;
  if (ultLv >= 10) return 2;
  return 1;
}

export function availableOpsForLv(ultLv) {
  return BASE_OP_DEFS.filter((d) => ultLv >= d.minLv && d.values[ultLv - 1] != null);
}

export const ULT_DEEP_GREEN_ITEM_IDS = new Set([
  12933, 12934, 12935, 12936, 12937, 12938, 12939, 12940, 12941, 12942,
  12943, 12944, 12945, 12946, 12947, 12948, 12949, 12950, 13850,
]);

export function isUltDeepGreen(itemOrId) {
  if (itemOrId == null) return false;
  if (typeof itemOrId === 'number') return ULT_DEEP_GREEN_ITEM_IDS.has(itemOrId);
  if (typeof itemOrId === 'object' && itemOrId.id != null) {
    return ULT_DEEP_GREEN_ITEM_IDS.has(Number(itemOrId.id));
  }
  return false;
}

export function buildBaseOpSlots(ultLv, baseOpKeys) {
  const unlocked = unlockedBaseOpCount(ultLv);
  const out = [null, null, null];
  for (let i = 0; i < 3; i++) {
    if (i >= unlocked) continue;
    const key = baseOpKeys[i];
    if (!key) continue;
    const def = BY_KEY[key];
    if (!def) continue;
    const v = def.values[ultLv - 1];
    if (v == null) continue;
    if (def.familyId != null) {
      out[i] = { ultKey: key, familyId: def.familyId, value: v, source: 'ult.base' };
    } else if (def.opId != null) {
      out[i] = { ultKey: key, opId: def.opId, vals: [v, 0, 0, 0], source: 'ult.base' };
    } else if (def.statId) {
      out[i] = { ultKey: key, statId: def.statId, value: v, source: 'ult.base' };
    } else {
      
      out[i] = { ultKey: key, value: v, source: 'ult.base', isDisplayOnly: true };
    }
  }
  return out;
}
