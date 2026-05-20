


import { getLoader } from './item_api.js';


export function countSetEquipped(equippedItems) {
  const loader = getLoader();
  const sets = loader && loader.master && loader.master.sets;
  if (!sets) return new Map();

  
  const setMatch = new Map();

  const entries = setEntries(sets);

  for (const { inv, item } of equippedItems) {
    if (!inv || !inv.equippedSlot) continue;
    const itemId = inv.itemId;

    
    if (item && item.setId != null) {
      const setDef = sets[item.setId];
      if (setDef && Array.isArray(setDef.itemIds) && setDef.itemIds.includes(itemId)) {
        addMatch(setMatch, item.setId, itemId);
        continue;
      }
    }

    
    for (const [setId, setDef] of entries) {
      if (!setDef || !Array.isArray(setDef.itemIds)) continue;
      if (setDef.itemIds.includes(itemId)) {
        addMatch(setMatch, setId, itemId);
        break;
      }
    }
  }

  const counts = new Map();
  for (const [setId, idSet] of setMatch) counts.set(setId, idSet.size);
  return counts;
}

function addMatch(setMatch, setId, itemId) {
  if (!setMatch.has(setId)) setMatch.set(setId, new Set());
  setMatch.get(setId).add(itemId);
}

function setEntries(sets) {
  if (Array.isArray(sets)) {
    return sets.map((v, i) => [i, v]);
  }
  return Object.entries(sets).map(([k, v]) => [Number(k), v]);
}


export function applySetBonusesToSTTemp(STTemp, setCounts, LvTemp) {
  const loader = getLoader();
  const sets = loader && loader.master && loader.master.sets;
  if (!sets) return;

  for (const [setId, count] of setCounts) {
    if (count < 2) continue;   
    const setDef = sets[setId];
    if (!setDef || !Array.isArray(setDef.bonuses)) continue;

    
    const bonusMap = setDef.bonuses[count];
    if (!bonusMap || typeof bonusMap !== 'object') continue;

    for (const key of Object.keys(bonusMap)) {
      const tri = bonusMap[key];
      if (!Array.isArray(tri) || tri.length < 2) continue;
      applySetBonusEntry(STTemp, {
        statTargetCode: tri[0],
        n:              tri[1],
        lvDiv:          (tri[2] != null) ? tri[2] : 1,
      }, LvTemp);
    }
  }
}


export function applySetBonusEntry(STTemp, entry, LvTemp) {
  const loader = getLoader();
  const resolved = loader.resolveStatTarget(entry.statTargetCode);
  if (!resolved) return;
  const { statId, layer, stats, multiplier } = resolved;
  if (statId == null && !stats) return;

  const targetIds = (stats && stats.length) ? stats : [statId];
  const mul = (multiplier != null) ? multiplier : 1;
  const lvDiv = entry.lvDiv || 1;

  for (const id of targetIds) {
    if (id == null) continue;
    let v = (entry.n || 0) * mul;
    if (layer === 'lvLinked') {
      v = Math.floor((LvTemp || 0) / lvDiv) * (entry.n || 0);
    }

    
    let targetLayer = layer;
    if (layer === 'sum' || layer === 'lvLinked' || layer === 'sumAll') {
      targetLayer = 'setBonus';
    }
    if (layer === 'displayOnly') return;

    if (!STTemp[targetLayer]) STTemp[targetLayer] = Object.create(null);
    const cur = STTemp[targetLayer][id];
    const isMax = targetLayer === 'fixedCap' || targetLayer === 'attrFixedCap';
    if (isMax) {
      STTemp[targetLayer][id] = (cur == null) ? v : Math.max(cur, v);
    } else {
      STTemp[targetLayer][id] = (cur || 0) + v;
    }
  }
}
