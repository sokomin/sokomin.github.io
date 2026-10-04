

export const NATIVE_BASE_STATS = {
  0: { id: 'def' },
  74: { id: 'atkspd' },
  88: { id: 'physCritResist' },
  721: { id: 'atkMinFlat' },
  722: { id: 'atkMaxFlat' },
};

export const NATIVE_OPTION_STATS = {
  174: { id: 'physStrongRate' },
  175: { id: 'finalAttackPercent' },
  941: { id: 'physStrongCapAmplify' },
};

export const NATIVE_STAT_DEPENDENT = {
  931: { sourceStat: 'str', targetStat: 'limitBreakPhysPercent', divisor: 2000, perStack: 1, statCap: 20000 },
  932: { sourceStat: 'int', targetStat: 'limitBreakMagicPercent', divisor: 2000, perStack: 1, statCap: 20000 },
};

export function nativeOptionExtra(opId) {
  const sd = NATIVE_STAT_DEPENDENT[opId];
  return sd ? [sd.divisor, sd.perStack * 10, sd.statCap / sd.divisor, 0] : undefined;
}
