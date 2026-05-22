

export const IDENTITY_MODIFIER = Object.freeze({
  hpMul:   1.0,
  atkMul:  1.0,
  defMul:  1.0,
  statMul: 1.0,
  resAdd:  Object.freeze({ fire: 0, water: 0, wind: 0, earth: 0, light: 0, dark: 0 }),
  extraNotes: '',
});

export const MAP_MONSTER_MOD_TABLE = {
  
};

export function getMapMonsterModifier(mapId) {
  const id = Number(mapId);
  const override = MAP_MONSTER_MOD_TABLE[id];
  if (!override) return IDENTITY_MODIFIER;
  return {
    hpMul:   override.hpMul   ?? 1.0,
    atkMul:  override.atkMul  ?? 1.0,
    defMul:  override.defMul  ?? 1.0,
    statMul: override.statMul ?? 1.0,
    resAdd: {
      fire:  override.resAdd?.fire  ?? 0,
      water: override.resAdd?.water ?? 0,
      wind:  override.resAdd?.wind  ?? 0,
      earth: override.resAdd?.earth ?? 0,
      light: override.resAdd?.light ?? 0,
      dark:  override.resAdd?.dark  ?? 0,
    },
    extraNotes: override.extraNotes || '',
  };
}

export function applyMapSubInfoToMonster(rawMonster, subInfo) {
  if (!rawMonster) return null;
  if (!subInfo)    return rawMonster;
  return {
    ...rawMonster,
    fireRes:  rawMonster.fireRes  - (Number(subInfo.dfi) || 0),
    waterRes: rawMonster.waterRes - (Number(subInfo.dwa) || 0),
    windRes:  rawMonster.windRes  - (Number(subInfo.dwi) || 0),
    earthRes: rawMonster.earthRes - (Number(subInfo.dea) || 0),
    lightRes: rawMonster.lightRes - (Number(subInfo.dli) || 0),
    darkRes:  rawMonster.darkRes  - (Number(subInfo.dda) || 0),
  };
}

export function applyMapMonsterModifier(rawMonster, modifier) {
  if (!rawMonster) return null;
  const m = modifier || IDENTITY_MODIFIER;
  return {
    ...rawMonster,
    defaultHp: Math.round(rawMonster.defaultHp * m.hpMul),
    atcMin:    Math.round(rawMonster.atcMin    * m.atkMul),
    atcMax:    Math.round(rawMonster.atcMax    * m.atkMul),
    def:       Math.round(rawMonster.def       * m.defMul),
    str:       Math.round(rawMonster.str * m.statMul),
    agi:       Math.round(rawMonster.agi * m.statMul),
    con:       Math.round(rawMonster.con * m.statMul),
    intl:      Math.round(rawMonster.intl * m.statMul),
    wis:       Math.round(rawMonster.wis * m.statMul),
    chs:       Math.round(rawMonster.chs * m.statMul),
    luc:       Math.round(rawMonster.luc * m.statMul),
    fireRes:   rawMonster.fireRes  + m.resAdd.fire,
    waterRes:  rawMonster.waterRes + m.resAdd.water,
    windRes:   rawMonster.windRes  + m.resAdd.wind,
    earthRes:  rawMonster.earthRes + m.resAdd.earth,
    lightRes:  rawMonster.lightRes + m.resAdd.light,
    darkRes:   rawMonster.darkRes  + m.resAdd.dark,
  };
}
