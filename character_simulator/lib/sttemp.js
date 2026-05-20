

export function newSTTemp() {
  return {
    base:            Object.create(null),
    fixedCap:        Object.create(null),
    attrFixedCap:    Object.create(null),
    jobBonus:        Object.create(null),
    sum:             Object.create(null),
    lvLinked:        Object.create(null),
    setBonus:        Object.create(null),
    consumableMax:   Object.create(null),
    consumableLvMax: Object.create(null),
    lvCorrection:    Object.create(null),
  };
}

export function debugSnapshot(STTemp) {
  const out = {};
  for (const layer of Object.keys(STTemp)) {
    out[layer] = Object.assign({}, STTemp[layer]);
  }
  return out;
}
