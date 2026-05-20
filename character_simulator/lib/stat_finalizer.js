


import { PRIMARY_STAT_IDS } from './character.js';
import { getLoader } from './item_api.js';

function numOr0(v) { return Number(v) || 0; }


export function finalizeStats(STTemp, opts = {}) {
  void opts;
  const base     = Object.create(null);
  const equipped = Object.create(null);

  
  const allStatIds = new Set(PRIMARY_STAT_IDS);
  for (const layer of Object.keys(STTemp)) {
    for (const sid of Object.keys(STTemp[layer])) allStatIds.add(sid);
  }
  
  const loader = getLoader();
  const statMeta = loader && loader.master && loader.master.statTypes
    && loader.master.statTypes.stats;
  if (statMeta) {
    for (const sid of Object.keys(statMeta)) allStatIds.add(sid);
  }

  for (const sid of allStatIds) {
    const b   = STTemp.base[sid]            || 0;
    const sum = STTemp.sum[sid]             || 0;
    const lvL = STTemp.lvLinked[sid]        || 0;
    const set = STTemp.setBonus[sid]        || 0;
    const cMx = STTemp.consumableMax[sid]   || 0;
    const cLv = STTemp.consumableLvMax[sid] || 0;

    base[sid] = b;

    
    const naturalTotal = b + sum + lvL + set + cMx + cLv;


    
    
    let result = naturalTotal;
    if (PRIMARY_STAT_IDS.includes(sid)) {
      const capFloor = STTemp.fixedCap[sid + 'FixedCap'] || 0;
      if (capFloor > result) result = capFloor;
    }
    
    const meta = statMeta && statMeta[sid];
    if (meta && meta.category === 'attr_resist') {
      const attrFloor = STTemp.attrFixedCap[sid] || 0;
      if (attrFloor > result) result = attrFloor;
    }

    equipped[sid] = result;
  }


  

  
  const pureAll = numOr0(STTemp.sum.pureStatPercentAll);
  
  const PURE_PER_STAT_KEY = {
    str: 'pureStatPercentStr',
    agi: 'pureStatPercentAgi',
    con: 'pureStatPercentCon',
    int: 'pureStatPercentInt',
    wiz: 'pureStatPercentWiz',
    chs: 'pureStatPercentChs',
    luc: 'pureStatPercentLuc',
  };
  
  let hasAnyPerStat = false;
  for (const sid of PRIMARY_STAT_IDS) {
    if (numOr0(STTemp.sum[PURE_PER_STAT_KEY[sid]])) { hasAnyPerStat = true; break; }
  }
  if (pureAll || hasAnyPerStat) {
    for (const sid of PRIMARY_STAT_IDS) {
      const perStat = numOr0(STTemp.sum[PURE_PER_STAT_KEY[sid]]);
      const bonusPct = pureAll + perStat;
      if (bonusPct === 0) continue;
      equipped[sid] = Math.floor(equipped[sid] * (1 + bonusPct / 100));
    }
  }

  
  const layers = {};
  for (const k of Object.keys(STTemp)) {
    layers[k] = Object.assign({}, STTemp[k]);
  }

  return { base, equipped, layers };
}
