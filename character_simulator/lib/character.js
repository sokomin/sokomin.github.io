


import { newStones, normalizeStones } from './stone_effects.js';

const PRIMARY_STATS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];




export function newCharacter(opts = {}) {
  const base = Object.create(null);
  for (const s of PRIMARY_STATS) base[s] = 0;
  
  const c = {
    setIndex:          opts.setIndex          ?? 0,
    realLv:            opts.realLv            ?? 1,
    lvRevision:        opts.lvRevision        ?? 0,
    miniPetLvRevision: opts.miniPetLvRevision ?? 0,
    job:               opts.job               ?? 0,
    kuroneTransTime:   opts.kuroneTransTime   ?? 0,
    gender:            opts.gender            ?? 1,
    stats: {
      base:        Object.assign(base, opts.stats?.base || {}),
      equipped:    Object.assign(Object.create(null), opts.stats?.equipped || {}),
      maxEquipped: Object.assign(Object.create(null), opts.stats?.maxEquipped || {}),
    },
    stones: opts.stones ? normalizeStones(opts.stones) : newStones(),
  };
  return c;
}


export function getEffectiveLv(c) {
  return (c.realLv || 0) + (c.lvRevision || 0) + (c.miniPetLvRevision || 0);
}


export function setBaseStat(c, statId, value) {
  c.stats.base[statId] = Number(value) || 0;
}

export const PRIMARY_STAT_IDS = PRIMARY_STATS;
