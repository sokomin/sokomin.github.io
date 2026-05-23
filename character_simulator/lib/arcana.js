

export const TIER_LABELS = ['上位', '下位'];
export const TABLE_LABELS = { normal: '通常', pet: 'ペット・召喚獣用' };

export const ARCANA_ITEM_IDS = new Set([
  13348, 13349, 13350, 13351, 13352, 13353, 13354, 13355, 13356, 13357,
  13358, 13359, 13360, 13361, 13362, 13363, 13364, 13365, 13851,
]);

export function isArcana(itemOrId) {
  if (itemOrId == null) return false;
  if (typeof itemOrId === 'number') return ARCANA_ITEM_IDS.has(itemOrId);
  if (typeof itemOrId === 'object' && itemOrId.id != null) {
    return ARCANA_ITEM_IDS.has(Number(itemOrId.id));
  }
  return false;
}

const BASE_OP_DEFS_NORMAL = [
  { key:'magic_dmg',          label:'魔法ダメージ +%',                unit:'%', values:[25, 20],   familyId:145 },
  { key:'phys_dmg',           label:'物理ダメージ +%',                unit:'%', values:[45, 40],   familyId:21  },
  { key:'phys_crit_chance',   label:'物理クリティカル確率 +%',        unit:'%', values:[8, 6],     opId:70 },
  { key:'phys_crit_dmg',      label:'物理クリティカルダメージ +%',    unit:'%', values:[15, 13],   familyId:184 },
  { key:'double_crit_dmg',    label:'ダブルクリティカルダメージ +%',  unit:'%', values:[3, 2],     familyId:182 },
  { key:'enemy_crit_resist',  label:'敵致命打抵抗弱化 +%',            unit:'%', values:[3, 2],     statId:'enemyPhysCritResistReduce' },
  
  { key:'all_skill_lv',       label:'全スキルレベル +',               unit:'',  values:[4, 3],     statId:'skillLv' },
  { key:'def_flat',           label:'防御力 +',                       unit:'',  values:[9, 6],     familyId:25  },
  { key:'def_pct',            label:'防御力 +%',                      unit:'%', values:[30, 20],   familyId:24  },
  { key:'hp_flat',            label:'最大HP +',                       unit:'',  values:[100, 80],  familyId:27  },
  { key:'hp_pct',             label:'最大HP +%',                      unit:'%', values:[20, 15],   familyId:26  },
  { key:'atk_min',            label:'物理最小ダメ +',                 unit:'',  values:[20, 15],   familyId:22  },
  { key:'atk_max',            label:'物理最大ダメ +',                 unit:'',  values:[45, 40],   familyId:23  },
  { key:'fire_dmg',           label:'火属性ダメージ +%',              unit:'%', values:[120, 100], familyId:139 },
  { key:'water_dmg',          label:'水属性ダメージ +%',              unit:'%', values:[120, 100], familyId:140 },
  { key:'wind_dmg',           label:'風属性ダメージ +%',              unit:'%', values:[120, 100], familyId:141 },
  { key:'earth_dmg',          label:'大地属性ダメージ +%',            unit:'%', values:[120, 100], familyId:142 },
  { key:'light_dmg',          label:'光属性ダメージ +%',              unit:'%', values:[120, 100], familyId:143 },
  { key:'dark_dmg',           label:'闇属性ダメージ +%',              unit:'%', values:[120, 100], familyId:144 },
  { key:'fire_weak',          label:'ターゲット火属性弱化 +%',        unit:'%', values:[70, 50],   familyId:132 },
  { key:'water_weak',         label:'ターゲット水属性弱化 +%',        unit:'%', values:[70, 50],   familyId:133 },
  { key:'wind_weak',          label:'ターゲット風属性弱化 +%',        unit:'%', values:[70, 50],   familyId:134 },
  { key:'earth_weak',         label:'ターゲット大地属性弱化 +%',      unit:'%', values:[70, 50],   familyId:135 },
  { key:'light_weak',         label:'ターゲット光属性弱化 +%',        unit:'%', values:[70, 50],   familyId:136 },
  { key:'dark_weak',          label:'ターゲット闇属性弱化 +%',        unit:'%', values:[70, 50],   familyId:137 },
];

const BASE_OP_DEFS_PET = [

  
  
  { key:'pet_magic_dmg',          label:'(召喚獣、ペット) 魔法ダメージ +%',          unit:'%', values:[25, 20], statId:'petMagicDamage' },
  { key:'pet_phys_dmg',           label:'(召喚獣、ペット) 物理ダメージ +%',          unit:'%', values:[45, 40], statId:'petPhysDamage' },
  { key:'pet_phys_crit_chance',   label:'(召喚獣、ペット) 物理クリティカル確率 +%',   unit:'%', values:[8, 6],   statId:'petPhysCritRate' },
  { key:'pet_phys_crit_dmg',      label:'(召喚獣、ペット) 物理クリティカルダメージ +%', unit:'%', values:[15, 13], statId:'petPhysCritDamage' },
  { key:'pet_double_crit_dmg',    label:'(召喚獣、ペット) ダブルクリティカルダメージ +%', unit:'%', values:[3, 2],   statId:'petDoubleCritDamage' },
  { key:'pet_enemy_crit_resist',  label:'(召喚獣、ペット) 敵致命打抵抗減少 +%',      unit:'%', values:[3, 2],   statId:'petEnemyCritResistReduce' },
  
  { key:'all_skill_lv',           label:'全スキルレベル +',                         unit:'',  values:[4, 3],     statId:'skillLv' },
  { key:'hp_flat',                label:'最大HP +',                               unit:'',  values:[100, 80],  familyId:27  },
  { key:'hp_pct',                 label:'最大HP +%',                              unit:'%', values:[20, 15],   familyId:26  },
  { key:'def_flat',               label:'防御力 +',                               unit:'',  values:[9, 6],     familyId:25  },
  { key:'def_pct',                label:'防御力 +%',                              unit:'%', values:[30, 20],   familyId:24  },
  { key:'fire_dmg',               label:'火属性ダメージ +%',                      unit:'%', values:[120, 100], familyId:139 },
  { key:'water_dmg',              label:'水属性ダメージ +%',                      unit:'%', values:[120, 100], familyId:140 },
  { key:'wind_dmg',               label:'風属性ダメージ +%',                      unit:'%', values:[120, 100], familyId:141 },
  { key:'earth_dmg',              label:'大地属性ダメージ +%',                    unit:'%', values:[120, 100], familyId:142 },
  { key:'light_dmg',              label:'光属性ダメージ +%',                      unit:'%', values:[120, 100], familyId:143 },
  { key:'dark_dmg',               label:'闇属性ダメージ +%',                      unit:'%', values:[120, 100], familyId:144 },
  { key:'fire_weak',              label:'ターゲット火属性弱化 +%',                unit:'%', values:[70, 50],   familyId:132 },
  { key:'water_weak',             label:'ターゲット水属性弱化 +%',                unit:'%', values:[70, 50],   familyId:133 },
  { key:'wind_weak',              label:'ターゲット風属性弱化 +%',                unit:'%', values:[70, 50],   familyId:134 },
  { key:'earth_weak',             label:'ターゲット大地属性弱化 +%',              unit:'%', values:[70, 50],   familyId:135 },
  { key:'light_weak',             label:'ターゲット光属性弱化 +%',                unit:'%', values:[70, 50],   familyId:136 },
  { key:'dark_weak',              label:'ターゲット闇属性弱化 +%',                unit:'%', values:[70, 50],   familyId:137 },
];

const TABLES = { normal: BASE_OP_DEFS_NORMAL, pet: BASE_OP_DEFS_PET };
const BY_KEY = {
  normal: Object.fromEntries(BASE_OP_DEFS_NORMAL.map((d) => [d.key, d])),
  pet:    Object.fromEntries(BASE_OP_DEFS_PET.map((d) => [d.key, d])),
};

export function getDefs(table) {
  return TABLES[table] || TABLES.normal;
}

export function getDef(table, key) {
  const map = BY_KEY[table] || BY_KEY.normal;
  return (key && map[key]) || null;
}

export function valueAtTier(def, tier) {
  if (!def || !Array.isArray(def.values)) return null;
  const t = Math.max(0, Math.min(1, Number(tier) || 0));
  return (def.values[t] != null) ? def.values[t] : null;
}

export function formatValue(def, tier) {
  if (!def) return '';
  const v = valueAtTier(def, tier);
  if (v == null) return '';
  const unit = def.unit || '';
  const sign = (v >= 0) ? '+' : '';
  return `${sign}${v}${unit}`;
}

export function formatRange(def) {
  if (!def || !Array.isArray(def.values)) return '';
  const unit = def.unit || '';
  return `+${def.values[0]} / +${def.values[1]}${unit}`;
}

export function buildBaseOpSlot(table, key, tier) {
  if (!key) return null;
  const def = getDef(table, key);
  if (!def) return null;
  const t = Math.max(0, Math.min(1, Number(tier) || 0));
  const v = valueAtTier(def, t);
  if (v == null) return null;
  const base = { arcanaKey: def.key, arcanaTier: t, arcanaTable: table, source: 'arcana.base' };
  if (def.displayOnly) {
    return { ...base, value: v, isDisplayOnly: true };
  }
  if (def.familyId != null) {
    return { ...base, familyId: def.familyId, value: v };
  }
  if (def.opId != null) {
    return { ...base, opId: def.opId, vals: [v, 0, 0, 0] };
  }
  if (def.statId) {
    return { ...base, statId: def.statId, value: v };
  }
  return { ...base, value: v, isDisplayOnly: true };
}
