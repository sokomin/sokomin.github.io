


import { Op, OpPrefix, iterateAllOps, getLoader } from './item_api.js';



const LAYER_AGG = {
  fixedCap:        'max',
  attrFixedCap:    'max',
  consumableMax:   'max',
  consumableLvMax: 'max',
  sum:             'sum',
  lvLinked:        'sum',
  setBonus:        'sum',
  sumAll:          'sum',
  lvCorrection:    'sum',
  displayOnly:     'skip',
};


export function getLayerAggregation(layer, statId) {
  const loader = getLoader();
  const stat = loader && loader.master && loader.master.statTypes
    && loader.master.statTypes.stats && loader.master.statTypes.stats[statId];
  if (stat && stat.aggregation) return stat.aggregation;
  return LAYER_AGG[layer] || 'sum';
}




export function calcOpValue(opOrSlot, inv, source, LvTemp, character) {

  if (Array.isArray(opOrSlot.stats) && opOrSlot.stats.length && opOrSlot.familyId == null && opOrSlot.opId == null) {
    if (opOrSlot.isDisplayOnly) {
      return { value: 0, constant: 0, statId: null, stats: opOrSlot.stats, layer: 'sumAll',
               multiplier: 1, isDisplayOnly: true, source };
    }
    return {
      value:         numOrZero(opOrSlot.value),
      constant:      0,
      statId:        null,
      stats:         opOrSlot.stats,
      layer:         'sumAll',
      multiplier:    1,
      isDisplayOnly: false,
      source,
    };
  }

  

  if (opOrSlot.statId && opOrSlot.familyId == null && opOrSlot.opId == null) {
    if (opOrSlot.isDisplayOnly) {
      return { value: 0, constant: 0, statId: opOrSlot.statId, layer: 'sum',
               multiplier: 1, isDisplayOnly: true, source };
    }
    return {
      value:         numOrZero(opOrSlot.value),
      constant:      0,
      statId:        opOrSlot.statId,
      layer:         opOrSlot.statLayer || 'sum',
      multiplier:    1,
      isDisplayOnly: false,
      source,
    };
  }
  
  if (opOrSlot.isDisplayOnly && opOrSlot.familyId == null && opOrSlot.opId == null) {
    return { value: 0, constant: 0, statId: null, layer: 'sum',
             multiplier: 1, isDisplayOnly: true, source };
  }


  
  if (opOrSlot.familyId === 103) {
    const targetJob = opOrSlot.jobIdx;
    const charJob = character ? character.job : null;
    const matched = (charJob != null && targetJob != null && Number(charJob) === Number(targetJob));
    const v = matched ? numOrZero(opOrSlot.value) : 0;
    return {
      value: v,
      constant: 0,
      statId: 'skillLv',
      layer: 'sum',
      multiplier: 1,
      isDisplayOnly: false,
      source,
      
      displayValue: numOrZero(opOrSlot.value),
      isJobMatched: matched,
      targetJobIdx: targetJob,
    };
  }


  
  
  if (opOrSlot.familyId != null) {
    const family = OpPrefix.getFamily(opOrSlot.familyId);
    if (family && family.stat && (family.stat.id || (Array.isArray(family.stat.stats) && family.stat.stats.length))) {
      const layer = family.stat.layer || 'sum';
      let v;
      
      if (layer === 'lvLinked') {
        const addValue = numOrZero(opOrSlot.addValue);
        const divisor  = Math.max(1, numOrZero(opOrSlot.divisor));
        v = Math.floor((LvTemp || 0) / divisor) * addValue;
      } else {
        
        const value = numOrZero(opOrSlot.value);
        const mul   = (family.stat.mul != null) ? family.stat.mul : 1;
        v = value * mul;
      }

      const hasStatsArray = Array.isArray(family.stat.stats) && family.stat.stats.length > 0;
      return {
        value:         v,
        constant:      0,
        statId:        family.stat.id || null,
        stats:         hasStatsArray ? family.stat.stats : undefined,
        layer:         hasStatsArray ? 'sumAll' : layer,
        multiplier:    1,
        isDisplayOnly: false,
        source,
        displayValue:  v,
      };
    }
    
  }

  const base = Op.resolveBase(opOrSlot.opId);
  if (!base) {
    return { value: 0, constant: 0, statId: null, layer: 'displayOnly',
             multiplier: 1, isDisplayOnly: true, source };
  }


  

  
  if (source === 'item.base' && base.baseStat) {

    
    if (Array.isArray(base.baseStat.axes) && base.baseStat.axes.length) {
      const axes = base.baseStat.axes;
      const axisResults = [];
      for (let i = 0; i < axes.length; i++) {
        let v = 0;
        if (opOrSlot.vals && opOrSlot.vals[i] != null) {
          const vi = opOrSlot.vals[i];
          v = Array.isArray(vi) ? numOrZero(vi[1]) : numOrZero(vi);
        }
        axisResults.push({
          value:    v,
          statId:   axes[i].id,
          layer:    axes[i].layer || 'sum',
        });
      }
      return {
        value:         0,
        constant:      0,
        statId:        null,
        layer:         'sum',
        multiplier:    1,
        isDisplayOnly: false,
        source,
        axisResults,
        displayValue:  axisResults.map((a) => a.value).join('/'),
      };
    }
    
    if (base.baseStat.id) {
      
      let v = 0;
      if (opOrSlot.vals && opOrSlot.vals[0] != null) {
        const v0 = opOrSlot.vals[0];
        v = Array.isArray(v0) ? numOrZero(v0[1]) : numOrZero(v0);
      }
      return {
        value:         v,
        constant:      0,
        statId:        base.baseStat.id,
        layer:         base.baseStat.layer || 'sum',
        multiplier:    1,
        isDisplayOnly: false,
        source,
        displayValue:  v,
      };
    }

    if (Array.isArray(base.baseStat.stats) && base.baseStat.stats.length) {
      let v = 0;
      if (opOrSlot.vals && opOrSlot.vals[0] != null) {
        const v0 = opOrSlot.vals[0];
        v = Array.isArray(v0) ? numOrZero(v0[1]) : numOrZero(v0);
      }
      return {
        value:         v,
        constant:      0,
        statId:        null,
        stats:         base.baseStat.stats,
        layer:         'sumAll',
        multiplier:    1,
        isDisplayOnly: false,
        source,
        displayValue:  v,
      };
    }
  }


  

  

  

  if (base.statDependent && character && character.stats && character.stats.equipped) {
    const sd = base.statDependent;
    const stat = numOrZero(character.stats.equipped[sd.sourceStat]);
    const divisor  = Math.max(1, numOrZero(sd.divisor));
    const perStack = numOrZero(sd.perStack);
    const statCap  = numOrZero(sd.statCap);
    const effective = (statCap > 0) ? Math.min(stat, statCap) : stat;
    const stacks = Math.floor(effective / divisor);
    const v = stacks * perStack;
    return {
      value:         v,
      constant:      0,
      statId:        sd.targetStat,
      layer:         sd.layer || 'sum',
      multiplier:    1,
      isDisplayOnly: false,
      source,
      displayValue:  v,
      sourceStatValue: stat,
      stacks,
    };
  }

  
  const loader = getLoader();
  const resolved = loader.resolveStatTarget(base.statTargetCode);


  if (resolved.layer === 'lvLinked' || resolved.layer === 'consumableLvMax') {
    const isItemSlot = typeof source === 'string' && source.startsWith('item.');
    const v = computeLvLinkedValue(base, isItemSlot ? opOrSlot : null, LvTemp);
    return {
      value:         v,
      constant:      0,
      statId:        resolved.statId,
      layer:         resolved.layer,
      stats:         resolved.stats,
      multiplier:    resolved.multiplier != null ? resolved.multiplier : 1,
      isDisplayOnly: !!base.isDisplayOnly,
      source,
      
      displayValue:  v,
    };
  }


  
  
  const isItemSlot = typeof source === 'string' && source.startsWith('item.');
  let r1 = 0, r2 = 0;
  if (isItemSlot) {
    r1 = numOrZero(inv && inv.revisions && inv.revisions[0]);
    r2 = numOrZero(inv && inv.revisions && inv.revisions[1]);
  } else {
    r1 = numOrZero(opOrSlot.revisions && opOrSlot.revisions[0]);
    r2 = numOrZero(opOrSlot.revisions && opOrSlot.revisions[1]);
  }

  const baseValue = numOrZero(base.baseValue);
  const lvDivisor = base.lvDivisor || 1;


  

  
  
  const hasExplicitValue = opOrSlot.vals && opOrSlot.vals.length > 0;
  let slotMainValue = 0;
  if (hasExplicitValue) {
    const v0 = opOrSlot.vals[0];
    if (Array.isArray(v0)) {
      slotMainValue = numOrZero(v0[0]);
    } else {
      slotMainValue = numOrZero(v0);
    }
  }

  let value = 0, constant = 0;
  switch (base.calcType) {
    case 0:
      
      value = hasExplicitValue ? slotMainValue : (baseValue * r1) / lvDivisor;
      break;
    case 1:
      value = (hasExplicitValue && slotMainValue !== 0) ? slotMainValue : baseValue;
      break;
    case 2: constant = Math.floor((baseValue * r1) / Math.max(1, r2)); break; 
    case 3: constant = Math.floor((baseValue * r1) / lvDivisor);    break; 
    case 4: constant = baseValue;                                   break; 
    case 5: value    = (baseValue * r2) / lvDivisor;                break; 
    default:
      return { value: 0, constant: 0, statId: null, layer: 'displayOnly',
               multiplier: 1, isDisplayOnly: true, source };
  }

  return {
    value,
    constant,
    statId:        resolved.statId,
    layer:         resolved.layer,
    stats:         resolved.stats,
    multiplier:    resolved.multiplier != null ? resolved.multiplier : 1,
    isDisplayOnly: !!base.isDisplayOnly || resolved.layer === 'displayOnly',
    source,
    displayValue:  value + constant,
  };
}


function computeLvLinkedValue(base, slot, LvTemp) {
  let divisor = 1, mainValue = 0;
  if (slot && Array.isArray(slot.vals) && slot.vals.length >= 6) {
    const v5 = Number(slot.vals[5]);
    const v4 = Number(slot.vals[4]);
    if (Number.isFinite(v5) && v5 > 0) divisor = v5;
    if (Number.isFinite(v4)) mainValue = v4;
  } else {
    if (base.valueDomain1) {
      const mn = Number(base.valueDomain1.min);
      if (Number.isFinite(mn)) mainValue = mn;
    }
    if (base.valueDomain2) {
      const mn = Number(base.valueDomain2.min);
      if (Number.isFinite(mn) && mn > 0) divisor = mn;
    }
  }
  if (mainValue === 0) return 0;
  return Math.floor((LvTemp || 0) / Math.max(1, divisor)) * mainValue;
}




export function applyOpToSTTemp(STTemp, calc, item) {
  if (!calc || calc.isDisplayOnly) return;

  
  if (Array.isArray(calc.axisResults) && calc.axisResults.length) {
    for (const a of calc.axisResults) {
      if (a.statId == null) continue;
      let l = a.layer || 'sum';
      if (item && item.part === 13) {
        if (l === 'sum')      l = 'consumableMax';
        if (l === 'lvLinked') l = 'consumableLvMax';
      }
      accumulate(STTemp, l, a.statId, numOrZero(a.value));
    }
    return;
  }

  let layer = calc.layer;
  
  if (item && item.part === 13) {
    if (layer === 'sum')      layer = 'consumableMax';
    if (layer === 'lvLinked') layer = 'consumableLvMax';
  }

  const v = (calc.value + calc.constant) * (calc.multiplier || 1);

  
  if (layer === 'sumAll' && Array.isArray(calc.stats)) {
    for (const sid of calc.stats) accumulate(STTemp, 'sum', sid, v);
    return;
  }

  if (calc.statId == null) return;
  accumulate(STTemp, layer, calc.statId, v);
}

function accumulate(STTemp, layer, statId, v) {
  const agg = getLayerAggregation(layer, statId);
  if (agg === 'skip') return;
  if (!STTemp[layer]) STTemp[layer] = Object.create(null);
  const cur = STTemp[layer][statId];
  if (agg === 'max') {
    STTemp[layer][statId] = (cur == null) ? v : Math.max(cur, v);
  } else {
    STTemp[layer][statId] = (cur || 0) + v;
  }
}




export function aggregateAllOpsForItem(STTemp, inv, item, LvTemp, character) {
  const enhanceOps = [];
  
  const localStatTotals = Object.create(null);

  
  for (const { op, source } of iterateAllOps(inv, item)) {
    
    let enhance = null;
    if (source !== 'item.base' && op.familyId != null) {
      const family = OpPrefix.getFamily(op.familyId);
      if (family && family.enhance && family.enhance.targetStat) {
        enhance = family.enhance;
      }
    }
    if (enhance) {
      enhanceOps.push({ enhance });
      continue;  
    }

    const calc = calcOpValue(op, inv, source, LvTemp, character);
    applyOpToSTTemp(STTemp, calc, item);

    
    if (source !== 'item.base' && calc && !calc.isDisplayOnly) {
      const v = (numOrZero(calc.value) + numOrZero(calc.constant)) * (calc.multiplier || 1);
      if (Array.isArray(calc.axisResults) && calc.axisResults.length) {
        for (const a of calc.axisResults) {
          if (a.statId) localStatTotals[a.statId] = (localStatTotals[a.statId] || 0) + numOrZero(a.value);
        }
      } else if (Array.isArray(calc.stats) && calc.layer === 'sumAll') {
        for (const sid of calc.stats) localStatTotals[sid] = (localStatTotals[sid] || 0) + v;
      } else if (calc.statId) {
        localStatTotals[calc.statId] = (localStatTotals[calc.statId] || 0) + v;
      }
    }
  }


  for (const { enhance } of enhanceOps) {
    const target = enhance.targetStat;
    const pct    = numOrZero(enhance.percentMultiplier);
    const sum    = numOrZero(localStatTotals[target]);
    const v      = Math.floor(sum * pct);
    if (v === 0) continue;
    if (!STTemp.sum) STTemp.sum = Object.create(null);
    STTemp.sum[target] = (STTemp.sum[target] || 0) + v;
  }
}



function numOrZero(v) {
  if (v == null || Number.isNaN(Number(v))) return 0;
  return Number(v);
}
