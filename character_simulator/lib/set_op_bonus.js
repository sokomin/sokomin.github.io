

export const SET_OP_DEFS = [
  
  { rowId: 883, name: '[圧倒的な]', grade: 'rare',
    summary: 'ダブルクリティカルダメージ +3% / +10% / +25%',
    tiers: [
      { count: 3, effects: [{ statId: 'doubleCritDamage', value: 3 }] },
      { count: 6, effects: [{ statId: 'doubleCritDamage', value: 10 }] },
      { count: 9, effects: [{ statId: 'doubleCritDamage', value: 25 }] },
    ],
  },
  { rowId: 884, name: '[強打の]', grade: 'rare',
    summary: '強打ダメ +10/25/100% (9 段で強打確率+10%)',
    tiers: [
      { count: 3, effects: [
        { statId: 'physStrongDamage', value: 10 },
        { statId: 'magicStrongDamage', value: 10 },
      ]},
      { count: 6, effects: [
        { statId: 'physStrongDamage', value: 25 },
        { statId: 'magicStrongDamage', value: 25 },
      ]},
      { count: 9, effects: [
        { statId: 'physStrongDamage', value: 100 },
        { statId: 'magicStrongDamage', value: 100 },
        { statId: 'physStrongRate',    value: 10 },
        { statId: 'magicStrongRate',   value: 10 },
      ]},
    ],
  },
  { rowId: 885, name: '[熱狂的な]', grade: 'rare',
    summary: '最後に与えられた恩寵ダメ分だけ物理限界ダメージ増加 (max +300/1000/3000)',
    tiers: [
      { count: 3, effects: [{ value: 300,  displayOnly: true, reason: '物理限界ダメージ stat なし (恩寵連動・要計算機改修)' }] },
      { count: 6, effects: [{ value: 1000, displayOnly: true, reason: '物理限界ダメージ stat なし' }] },
      { count: 9, effects: [{ value: 3000, displayOnly: true, reason: '物理限界ダメージ stat なし' }] },
    ],
  },
  { rowId: 886, name: '[崩しの]', grade: 'rare',
    summary: 'ターゲット全属性抵抗 -10/30/100%',
    tiers: [
      { count: 3, effects: [{ stats: ['attrFireWeaken','attrWaterWeaken','attrWindWeaken','attrEarthWeaken','attrLightWeaken','attrDarkWeaken'], value: 10 }] },
      { count: 6, effects: [{ stats: ['attrFireWeaken','attrWaterWeaken','attrWindWeaken','attrEarthWeaken','attrLightWeaken','attrDarkWeaken'], value: 30 }] },
      { count: 9, effects: [{ stats: ['attrFireWeaken','attrWaterWeaken','attrWindWeaken','attrEarthWeaken','attrLightWeaken','attrDarkWeaken'], value: 100 }] },
    ],
  },
  { rowId: 887, name: '[超越の]', grade: 'rare',
    summary: '魔法ダメージ増加限界値 +7/25/75%',
    tiers: [
      { count: 3, effects: [{ value: 7,  displayOnly: true, reason: '魔法ダメ増加限界値 stat なし' }] },
      { count: 6, effects: [{ value: 25, displayOnly: true, reason: '魔法ダメ増加限界値 stat なし' }] },
      { count: 9, effects: [{ value: 75, displayOnly: true, reason: '魔法ダメ増加限界値 stat なし' }] },
    ],
  },
  { rowId: 888, name: '[巧みな]', grade: 'rare',
    summary: '魔法精度 +3/10/30% (閾値 2/4/6)',
    tiers: [
      { count: 2, effects: [{ value: 3,  displayOnly: true, reason: '魔法精度 stat なし' }] },
      { count: 4, effects: [{ value: 10, displayOnly: true, reason: '魔法精度 stat なし' }] },
      { count: 6, effects: [{ value: 30, displayOnly: true, reason: '魔法精度 stat なし' }] },
    ],
  },
  { rowId: 889, name: '[庇護の]', grade: 'rare',
    summary: '(召喚獣/ペット) 被ダメ -10/20/70%',
    tiers: [
      { count: 3, effects: [{ value: 10, displayOnly: true, reason: '召喚獣・ペット専用' }] },
      { count: 6, effects: [{ value: 20, displayOnly: true, reason: '召喚獣・ペット専用' }] },
      { count: 9, effects: [{ value: 70, displayOnly: true, reason: '召喚獣・ペット専用' }] },
    ],
  },
  { rowId: 890, name: '[交感の]', grade: 'rare',
    summary: '(召喚獣/ペット) 全ステ +100/500/2000',
    tiers: [
      { count: 3, effects: [{ statId: 'summonStat', value: 100  }] },
      { count: 6, effects: [{ statId: 'summonStat', value: 500  }] },
      { count: 9, effects: [{ statId: 'summonStat', value: 2000 }] },
    ],
  },
  { rowId: 891, name: '[指揮の]', grade: 'rare',
    summary: '(召喚獣/ペット) 魔法精度 +3/10/30% (閾値 2/4/6)',
    tiers: [
      { count: 2, effects: [{ value: 3,  displayOnly: true, reason: '召喚獣・ペット専用 (魔法精度 stat なし)' }] },
      { count: 4, effects: [{ value: 10, displayOnly: true, reason: '召喚獣・ペット専用' }] },
      { count: 6, effects: [{ value: 30, displayOnly: true, reason: '召喚獣・ペット専用' }] },
    ],
  },
  { rowId: 892, name: '[抵抗の]', grade: 'rare',
    summary: '魔法抵抗 +10/50/150% (6 段で魔法ダメ吸収 +10%)',
    tiers: [
      { count: 2, effects: [{ statId: 'attrMagicResist', value: 10  }] },
      { count: 4, effects: [{ statId: 'attrMagicResist', value: 50  }] },
      { count: 6, effects: [
        { statId: 'attrMagicResist', value: 150 },
        { statId: 'attrMagicAbsorb', value: 10  },
      ]},
    ],
  },
  { rowId: 893, name: '[鈍感の]', grade: 'rare',
    summary: '物理属性ダメージ +3/10/20% 吸収',
    tiers: [
      { count: 3, effects: [{ value: 3,  displayOnly: true, reason: '物理ダメ吸収 stat なし' }] },
      { count: 6, effects: [{ value: 10, displayOnly: true, reason: '物理ダメ吸収 stat なし' }] },
      { count: 9, effects: [{ value: 20, displayOnly: true, reason: '物理ダメ吸収 stat なし' }] },
    ],
  },
  { rowId: 894, name: '[再生の]', grade: 'rare',
    summary: 'HP 即回復 +100/300/1000/秒 (PVP 時 1/10)',
    tiers: [
      { count: 2, effects: [{ statId: 'hpRegen', value: 100  }] },
      { count: 4, effects: [{ statId: 'hpRegen', value: 300  }] },
      { count: 6, effects: [{ statId: 'hpRegen', value: 1000 }] },
    ],
  },
  { rowId: 895, name: '[克服の]', grade: 'rare',
    summary: '全状態異常最終抵抗 +5/50% (閾値 3/6)',
    tiers: [
      { count: 3, effects: [{ statId: 'allStatusResist', value: 5  }] },
      { count: 6, effects: [{ statId: 'allStatusResist', value: 50 }] },
    ],
  },

  { rowId: 896, name: '[狂暴の]', grade: 'general',
    summary: '物理致命打確率 +10/20/50%',
    tiers: [
      { count: 2, effects: [{ statId: 'physCritRate', value: 10 }] },
      { count: 4, effects: [{ statId: 'physCritRate', value: 20 }] },
      { count: 6, effects: [{ statId: 'physCritRate', value: 50 }] },
    ],
  },
  { rowId: 897, name: '[節制の]', grade: 'general',
    summary: '物理致命打無効 + 物理ダメ +200/1000% (閾値 3/6)',
    tiers: [
      { count: 3, effects: [
        { statId: 'physDamagePercent', value: 200, displayOnly: true,
          reason: '物理致命打無効化条件付き (= 計算機改修案件)' },
      ]},
      { count: 6, effects: [
        { statId: 'physDamagePercent', value: 1000, displayOnly: true,
          reason: '物理致命打無効化条件付き' },
      ]},
    ],
  },
  { rowId: 898, name: '[極意の]', grade: 'general',
    summary: '全属性ダメ +30/100%, 自己全属性抵抗 -100% (閾値 3/6)',
    tiers: [
      { count: 3, effects: [
        { stats: ['attrFire','attrWater','attrWind','attrEarth','attrLight','attrDark'], value: 30 },
        { stats: ['attrFireResist','attrWaterResist','attrWindResist','attrEarthResist','attrLightResist','attrDarkResist'], value: -100,
          displayOnly: true, reason: '自己属性抵抗 -% は集計層では下げられない仕様 (= 仕様確認待ち)' },
      ]},
      { count: 6, effects: [
        { stats: ['attrFire','attrWater','attrWind','attrEarth','attrLight','attrDark'], value: 100 },
        { stats: ['attrFireResist','attrWaterResist','attrWindResist','attrEarthResist','attrLightResist','attrDarkResist'], value: -100,
          displayOnly: true, reason: '自己属性抵抗 -% は仕様確認待ち' },
      ]},
    ],
  },
  { rowId: 899, name: '[渇きの]', grade: 'general',
    summary: 'CP 比率低いほど 魔法ダメ +Max 30/100% (閾値 3/6)',
    tiers: [
      { count: 3, effects: [{ value: 30,  displayOnly: true, reason: 'CP 比率連動 (動的計算)' }] },
      { count: 6, effects: [{ value: 100, displayOnly: true, reason: 'CP 比率連動 (動的計算)' }] },
    ],
  },
  { rowId: 900, name: '[信義の]', grade: 'general',
    summary: 'テイム成功確率 +10/30/100%',
    tiers: [
      { count: 2, effects: [{ value: 10,  displayOnly: true, reason: 'テイマー専用 (テイム成功率 stat なし)' }] },
      { count: 4, effects: [{ value: 30,  displayOnly: true, reason: 'テイマー専用' }] },
      { count: 6, effects: [{ value: 100, displayOnly: true, reason: 'テイマー専用 (確定テイム)' }] },
    ],
  },
  { rowId: 901, name: '[耐性の]', grade: 'general',
    summary: '被出血・毒ダメ -10/30% (閾値 3/6)',
    tiers: [

      { count: 3, effects: [
        { statId: 'poisonResist', value: 10 },
        { value: 10, displayOnly: true, reason: '被出血ダメ -% stat なし (毒抵抗のみ反映)' },
      ]},
      { count: 6, effects: [
        { statId: 'poisonResist', value: 30 },
        { value: 30, displayOnly: true, reason: '被出血ダメ -% stat なし' },
      ]},
    ],
  },
  { rowId: 902, name: '[恩寵の]', grade: 'general',
    summary: '恩寵持続 +30/100%, 4 段で 恩寵ダメ +100% (閾値 2/4)',
    tiers: [
      { count: 2, effects: [{ value: 30,  displayOnly: true, reason: '恩寵システム (持続時間 stat なし)' }] },
      { count: 4, effects: [
        { value: 100, displayOnly: true, reason: '恩寵持続 +100%' },
        { value: 100, displayOnly: true, reason: '恩寵ダメ +100% (要 ダメージ計算機改修)' },
      ]},
    ],
  },
  { rowId: 903, name: '[武装の]', grade: 'general',
    summary: '最大 HP を 3000/12000/40000 に固定',
    tiers: [

      { count: 2, effects: [{ value: 3000,  displayOnly: true, reason: '最大 HP 固定値 (= 加算ではなく上書き)' }] },
      { count: 4, effects: [{ value: 12000, displayOnly: true, reason: '最大 HP 固定値' }] },
      { count: 6, effects: [{ value: 40000, displayOnly: true, reason: '最大 HP 固定値' }] },
    ],
  },
  { rowId: 904, name: '[迅速の]', grade: 'general',
    summary: '移動速度 +50/100% (6 段で移動低下抵抗 +100%)',
    tiers: [
      { count: 3, effects: [{ statId: 'mvspd', value: 50  }] },
      { count: 6, effects: [
        { statId: 'mvspd', value: 100 },
        { value: 100, displayOnly: true, reason: '移動低下抵抗 stat なし' },
      ]},
    ],
  },
  { rowId: 905, name: '[次元の]', grade: 'general',
    summary: 'PT ボスモンスター与ダメ +20/100% (閾値 3/6)',
    tiers: [

      
      { count: 3, effects: [{ statId: 'vsBossDamage', value: 20  }] },
      { count: 6, effects: [{ statId: 'vsBossDamage', value: 100 }] },
    ],
  },
];

const SET_OP_BY_ROW_ID = Object.fromEntries(SET_OP_DEFS.map((d) => [d.rowId, d]));
const SET_OP_BY_NAME   = Object.fromEntries(SET_OP_DEFS.map((d) => [d.name, d]));

export function getSetOpDef(rowId) {
  if (rowId == null) return null;
  return SET_OP_BY_ROW_ID[Number(rowId)] || null;
}

export function rowIdForSetOpName(name) {
  if (!name) return null;
  const d = SET_OP_BY_NAME[String(name)];
  return d ? d.rowId : null;
}

function resolveSetOpRowId(op) {
  if (!op) return null;
  if (op.rowId != null) {
    const rid = Number(op.rowId);
    if (SET_OP_BY_ROW_ID[rid]) return rid;
  }
  
  if (Number(op.familyId) !== 857) return null;
  
  if (op.name) {
    const d = SET_OP_BY_NAME[String(op.name)];
    if (d) return d.rowId;
  }
  return null;
}

export function countSetOpsEquipped(equippedItems) {
  const counts = new Map();
  for (const entry of equippedItems) {
    const inv = entry && entry.inv;
    if (!inv || !inv.equippedSlot) continue;
    
    if (Array.isArray(inv.ops)) {
      for (const op of inv.ops) {
        if (!op) continue;
        const rid = resolveSetOpRowId(op);
        if (rid == null) continue;
        counts.set(rid, (counts.get(rid) || 0) + 1);
      }
    }

  }
  return counts;
}

export function applySetOpsToSTTemp(STTemp, counts) {
  if (!counts || counts.size === 0) return;
  for (const [rowId, count] of counts) {
    const def = SET_OP_BY_ROW_ID[rowId];
    if (!def) continue;
    
    let chosen = null;
    for (const tier of def.tiers) {
      if (count >= tier.count) chosen = tier;
    }
    if (!chosen) continue;
    for (const eff of chosen.effects) {
      if (eff.displayOnly) continue;
      const v = Number(eff.value) || 0;
      if (v === 0) continue;
      
      const targets = (Array.isArray(eff.stats) && eff.stats.length)
        ? eff.stats : (eff.statId ? [eff.statId] : []);
      for (const sid of targets) {
        
        if (!STTemp.setBonus) STTemp.setBonus = Object.create(null);
        STTemp.setBonus[sid] = (STTemp.setBonus[sid] || 0) + v;
      }
    }
  }
}

export function summarizeActiveSetOps(counts) {
  const out = [];
  if (!counts) return out;
  for (const [rowId, count] of counts) {
    const def = SET_OP_BY_ROW_ID[rowId];
    if (!def) continue;
    let active = null, next = null;
    for (const tier of def.tiers) {
      if (count >= tier.count) active = tier;
      else if (next == null) next = tier;
    }
    out.push({ def, count, activeTier: active, nextTier: next });
  }
  
  out.sort((a, b) => (b.count - a.count) || a.def.name.localeCompare(b.def.name));
  return out;
}
