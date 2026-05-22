

export const TIER_LABELS = ['高', '中', '低'];

export const AREA_BOSS_RING_ITEM_IDS = new Set([13116, 13117, 13118, 13292]);

export function isAreaBossRing(itemOrId) {
  if (itemOrId == null) return false;
  if (typeof itemOrId === 'number') return AREA_BOSS_RING_ITEM_IDS.has(itemOrId);
  if (typeof itemOrId === 'object' && itemOrId.id != null) {
    return AREA_BOSS_RING_ITEM_IDS.has(Number(itemOrId.id));
  }
  return false;
}

const RING_DENRIN_OPS = [
  
  { key:'denrin_kanden',    label:'敵に感電を与える(ダメ対比n%感電ダメ)', unit:'%', values:[5,3,1],    displayOnly:true },
  { key:'denrin_pvp_dmg',   label:'PVP状態時のダメージ増加', unit:'%', values:[5,4,3],    statId:'pvpDamage' },
  { key:'denrin_enemy_pcr', label:'敵物理致命打抵抗の低減',  unit:'%', values:[8,4,2],    statId:'enemyPhysCritResistReduce' },
  
  { key:'wiz_lv',           label:'知恵 +1/Lv',           unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:17 },
  { key:'water_dmg',        label:'水属性ダメージを強化', unit:'%',   values:[12,8,4], familyId:140 },
  { key:'water_weak',       label:'ターゲットの水抵抗を弱める', unit:'%', values:[6,4,2], familyId:133 },
  { key:'light_dmg',        label:'光属性ダメージを強化', unit:'%',   values:[12,8,4], familyId:143 },
  { key:'light_weak',       label:'ターゲットの光抵抗を弱める', unit:'%', values:[6,4,2], familyId:136 },
  { key:'atkspd',           label:'攻撃速度増加',         unit:'%',   values:[7,5,3],  familyId:41 },
  { key:'eva',              label:'物理回避率増加',       unit:'%',   values:[4,3,2],  familyId:32 },
  { key:'phys_crit_chance', label:'物理致命打発動確率増加', unit:'%', values:[9,7,5],  opId:70 },
  { key:'def_pct',          label:'防御力増加',           unit:'%',   values:[30,10,5], familyId:24 },
  { key:'hp_pct',           label:'最大HP増加',           unit:'%',   values:[20,7,4],  familyId:26 },
  { key:'cp_pct',           label:'最大CP増加',           unit:'%',   values:[15,12,9], familyId:28 },
  { key:'str_flat',         label:'力上昇',               unit:'',    values:[25,10,5], familyId:0 },
  { key:'agi_flat',         label:'敏捷上昇',             unit:'',    values:[25,10,5], familyId:1 },
  { key:'con_flat',         label:'健康上昇',             unit:'',    values:[25,10,5], familyId:2 },
  { key:'wiz_flat',         label:'知恵上昇',             unit:'',    values:[25,10,5], familyId:3 },
  { key:'int_flat',         label:'知識上昇',             unit:'',    values:[25,10,5], familyId:4 },
  { key:'chs_flat',         label:'カリスマ上昇',         unit:'',    values:[25,10,5], familyId:5 },
  { key:'luc_flat',         label:'運上昇',               unit:'',    values:[25,10,5], familyId:6 },
];

const RING_ENMA_OPS = [
  
  { key:'enma_self',        label:'自分に炎魔を与える(最大HPのn倍ダメ範囲)', unit:'倍', values:[1.0,0.7,0.5], displayOnly:true },
  { key:'enma_pvp_def',     label:'PVP状態時の防御力増加', unit:'%', values:[5,4,3],   displayOnly:true },
  { key:'enma_dmg_red',     label:'受けるダメージを軽減',  unit:'%', values:[3,2,1],   statId:'damageReducePercent' },
  
  { key:'atk_min',          label:'武器最小攻撃力増加',   unit:'',    values:[7,5,3],  familyId:22 },
  { key:'atk_max',          label:'武器最大攻撃力増加',   unit:'',    values:[10,7,5], familyId:23 },
  { key:'chs_lv',           label:'カリスマ +1/Lv',       unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:19 },
  { key:'con_lv',           label:'健康 +1/Lv',           unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:16 },
  { key:'fire_dmg',         label:'火属性ダメージを強化', unit:'%',   values:[12,8,4], familyId:139 },
  { key:'fire_weak',        label:'ターゲットの火抵抗を弱める', unit:'%', values:[6,4,2], familyId:132 },
  { key:'earth_dmg',        label:'大地属性ダメージを強化', unit:'%', values:[12,8,4], familyId:142 },
  { key:'earth_weak',       label:'ターゲットの大地抵抗を弱める', unit:'%', values:[6,4,2], familyId:135 },
  { key:'def_pct',          label:'防御力増加',           unit:'%',   values:[15,10,5], familyId:24 },
  { key:'hp_pct',           label:'最大HP増加',           unit:'%',   values:[20,7,4],  familyId:26 },
  { key:'cp_pct',           label:'最大CP増加',           unit:'%',   values:[15,12,9], familyId:28 },
  { key:'str_flat',         label:'力上昇',               unit:'',    values:[25,10,5], familyId:0 },
  { key:'agi_flat',         label:'敏捷上昇',             unit:'',    values:[25,10,5], familyId:1 },
  { key:'con_flat',         label:'健康上昇',             unit:'',    values:[25,10,5], familyId:2 },
  { key:'wiz_flat',         label:'知恵上昇',             unit:'',    values:[25,10,5], familyId:3 },
  { key:'int_flat',         label:'知識上昇',             unit:'',    values:[25,10,5], familyId:4 },
  { key:'chs_flat',         label:'カリスマ上昇',         unit:'',    values:[25,10,5], familyId:5 },
  { key:'luc_flat',         label:'運上昇',               unit:'',    values:[25,10,5], familyId:6 },
];

const RING_DATEN_OPS = [
  
  { key:'daten_curse',      label:'敵に堕天を与える(CP対比n倍ダメ, 上限10万)', unit:'倍', values:[10,7,5], displayOnly:true },
  { key:'daten_mstr_dmg',   label:'魔法強打ダメージ増加', unit:'%', values:[3,2,1], statId:'magicStrongDamage' },
  { key:'daten_mcrit_dmg',  label:'魔法致命打ダメージ増加', unit:'%', values:[3,2,1], statId:'magicCritDamage' },
  { key:'daten_mstr_rate',  label:'魔法強打発動確率増加', unit:'%', values:[3,2,1], familyId:723 },
  
  { key:'magic_crit_chance', label:'魔法致命打発動確率増加', unit:'%', values:[4,2,1], familyId:461 },
  { key:'magic_dmg',         label:'魔法ダメージを強化',    unit:'%', values:[10,6,4], familyId:145 },
  { key:'magic_weak',        label:'ターゲットの魔法抵抗を弱める', unit:'%', values:[8,3,2], familyId:138 },
  { key:'str_lv',            label:'力 +1/Lv',              unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:14 },
  { key:'int_lv',            label:'知識 +1/Lv',            unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:18 },
  { key:'dark_dmg',          label:'闇属性ダメージを強化',  unit:'%', values:[12,8,4], familyId:144 },
  { key:'dark_weak',         label:'ターゲットの闇抵抗を弱める', unit:'%', values:[6,4,2], familyId:137 },
  { key:'def_pct',           label:'防御力増加',            unit:'%', values:[15,10,5], familyId:24 },
  { key:'hp_pct',            label:'最大HP増加',            unit:'%', values:[20,7,4],  familyId:26 },
  { key:'cp_pct',            label:'最大CP増加',            unit:'%', values:[15,12,9], familyId:28 },
  { key:'str_flat',          label:'力上昇',                unit:'',  values:[25,10,5], familyId:0 },
  { key:'agi_flat',          label:'敏捷上昇',              unit:'',  values:[25,10,5], familyId:1 },
  { key:'con_flat',          label:'健康上昇',              unit:'',  values:[25,10,5], familyId:2 },
  { key:'wiz_flat',          label:'知恵上昇',              unit:'',  values:[25,10,5], familyId:3 },
  { key:'int_flat',          label:'知識上昇',              unit:'',  values:[25,10,5], familyId:4 },
  { key:'chs_flat',          label:'カリスマ上昇',          unit:'',  values:[25,10,5], familyId:5 },
  { key:'luc_flat',          label:'運上昇',                unit:'',  values:[25,10,5], familyId:6 },
];

const RING_NEPPU_OPS = [
  
  { key:'neppu_shield',     label:'シールドの制限数値追加増加', unit:'', values:[20000,10000,5000], displayOnly:true },
  { key:'neppu_final',      label:'最終ダメージ増加',          unit:'%', values:[3,2,1],   statId:'finalDamagePercent' },
  { key:'neppu_double_crit',label:'物理ダブルクリティカルダメージ増加', unit:'%', values:[8,4,2], familyId:182 },
  
  { key:'all_resist',        label:'すべての属性抵抗増加',    unit:'%', values:[6,4,2],  familyId:74 },
  { key:'phys_crit_dmg',     label:'物理クリティカルダメージ増加', unit:'%', values:[3,2,1], statId:'physCritDamage' },
  { key:'agi_lv',            label:'敏捷 +1/Lv',              unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:15 },
  { key:'luc_lv',            label:'運 +1/Lv',                unit:'/Lv', divisors:[3,4,5], addValue:1, familyId:20 },
  { key:'hit',               label:'命中率増加',              unit:'',  values:[4,3,2],  familyId:31 },
  { key:'mvspd',             label:'移動速度増加',            unit:'',  values:[3,2,1],  familyId:40 },
  { key:'wind_weak',         label:'ターゲットの風抵抗を弱める', unit:'%', values:[12,8,4], familyId:134 },
  { key:'wind_dmg',          label:'風属性ダメージを強化',    unit:'%', values:[6,4,2],   familyId:141 },
  { key:'def_pct',           label:'防御力増加',              unit:'%', values:[15,10,5], familyId:24 },
  { key:'hp_pct',            label:'最大HP増加',              unit:'%', values:[10,7,4],  familyId:26 },
  { key:'cp_pct',            label:'最大CP増加',              unit:'%', values:[15,12,9], familyId:28 },
  { key:'str_flat',          label:'力上昇',                  unit:'',  values:[25,10,5], familyId:0 },
  { key:'wiz_flat',          label:'知恵上昇',                unit:'',  values:[25,10,5], familyId:3 },
  { key:'int_flat',          label:'知識上昇',                unit:'',  values:[25,10,5], familyId:4 },
  { key:'con_flat',          label:'健康上昇',                unit:'',  values:[25,10,5], familyId:2 },
  { key:'agi_flat',          label:'敏捷上昇',                unit:'',  values:[25,10,5], familyId:1 },
  { key:'chs_flat',          label:'カリスマ上昇',            unit:'',  values:[25,10,5], familyId:5 },
  { key:'luc_flat',          label:'運上昇',                  unit:'',  values:[25,10,5], familyId:6 },
];

const OP_TABLE = {
  13116: RING_DENRIN_OPS,
  13117: RING_DATEN_OPS,
  13118: RING_ENMA_OPS,
  13292: RING_NEPPU_OPS,
};

const RING_META = {
  13116: { boss: 'アスタロト', name: '電鱗のリング',  short: 'denrin' },
  13117: { boss: 'ゲリオ',     name: '堕天のリング',  short: 'daten'  },
  13118: { boss: 'シュラグ',   name: '炎魔のリング',  short: 'enma'   },
  13292: { boss: 'ファルコン', name: '熱風のリング',  short: 'neppu'  },
};

export function getOpsForRing(itemId) {
  return OP_TABLE[Number(itemId)] || [];
}

export function getBaseOpDef(itemId, key) {
  const list = getOpsForRing(itemId);
  return list.find((d) => d.key === key) || null;
}

export function getRingMeta(itemId) {
  return RING_META[Number(itemId)] || null;
}

export function isLvLinked(def) {
  return !!(def && Array.isArray(def.divisors));
}

export function valueAtTier(def, tier) {
  if (!def) return null;
  const t = Math.max(0, Math.min(2, Number(tier) || 0));
  if (isLvLinked(def)) {
    const d = def.divisors;
    return (d[t] != null) ? d[t] : null;
  }
  const v = def.values;
  return (Array.isArray(v) && v[t] != null) ? v[t] : null;
}

export function formatValue(def, tier) {
  if (!def) return '';
  const t = Math.max(0, Math.min(2, Number(tier) || 0));
  if (isLvLinked(def)) {
    const div = (def.divisors && def.divisors[t]) || 0;
    return `+${def.addValue || 1}/Lv${div}`;
  }
  const v = (def.values && def.values[t]);
  if (v == null) return '';
  const unit = def.unit || '';
  const sign = (v >= 0) ? '+' : '';
  return `${sign}${v}${unit}`;
}

export function formatRange(def) {
  if (!def) return '';
  if (isLvLinked(def)) {
    const ds = def.divisors;
    const v = def.addValue || 1;
    return `+${v}/Lv${ds[0]} / +${v}/Lv${ds[1]} / +${v}/Lv${ds[2]}`;
  }
  const vs = def.values || [];
  const unit = def.unit || '';
  return `+${vs[0]} / +${vs[1]} / +${vs[2]}${unit}`;
}

export function buildBaseOpSlots(itemId, slots) {
  const out = [null, null, null];
  for (let i = 0; i < 3; i++) {
    const s = slots && slots[i];
    if (!s || !s.key) continue;
    const def = getBaseOpDef(itemId, s.key);
    if (!def) continue;
    const tier = Math.max(0, Math.min(2, Number(s.tier) || 0));
    if (def.displayOnly) {
      
      const v = valueAtTier(def, tier);
      out[i] = { abrKey: def.key, abrTier: tier, value: v, source: 'abr.base', isDisplayOnly: true };
      continue;
    }
    if (isLvLinked(def)) {
      const div = valueAtTier(def, tier);
      out[i] = {
        abrKey: def.key, abrTier: tier,
        familyId: def.familyId,
        addValue: def.addValue || 1, divisor: div,
        source: 'abr.base',
      };
      continue;
    }
    const v = valueAtTier(def, tier);
    if (v == null) continue;
    if (def.familyId != null) {
      out[i] = { abrKey: def.key, abrTier: tier, familyId: def.familyId, value: v, source: 'abr.base' };
    } else if (def.opId != null) {
      out[i] = { abrKey: def.key, abrTier: tier, opId: def.opId, vals: [v, 0, 0, 0], source: 'abr.base' };
    } else if (def.statId) {
      out[i] = { abrKey: def.key, abrTier: tier, statId: def.statId, value: v, source: 'abr.base' };
    } else {
      out[i] = { abrKey: def.key, abrTier: tier, value: v, source: 'abr.base', isDisplayOnly: true };
    }
  }
  return out;
}
