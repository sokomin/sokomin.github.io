// character.js — Character 型 + 素ステ管理
//
// 公開 API:
//   newCharacter(opts?)            // 既定キャラ生成 (素ステ全 0)
//   getEffectiveLv(c)              // realLv + lvRevision + miniPetLvRevision
//   setBaseStat(c, statId, value)  // 素ステ書き込み

const PRIMARY_STATS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];

/**
 * @typedef {Object} Character
 * @property {0|1} setIndex
 * @property {number} realLv
 * @property {number} lvRevision
 * @property {number} miniPetLvRevision
 * @property {number} job              JobA index
 * @property {number} kuroneTransTime  朱洛星変身時間 (秒)
 * @property {1|2}    gender
 * @property {{ base: Record<string, number>, equipped: Record<string, number>, maxEquipped: Record<string, number> }} stats
 */

/**
 * @param {Partial<Character>} [opts]
 * @returns {Character}
 */
export function newCharacter(opts = {}) {
  const base = Object.create(null);
  for (const s of PRIMARY_STATS) base[s] = 0;
  /** @type {Character} */
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
  };
  return c;
}

/**
 * 実効レベル (装備判定 / Lv 連動計算で使う)。
 * @param {Character} c
 * @returns {number}
 */
export function getEffectiveLv(c) {
  return (c.realLv || 0) + (c.lvRevision || 0) + (c.miniPetLvRevision || 0);
}

/**
 * 素ステ書き込み (UI から呼ぶ用)。
 * @param {Character} c
 * @param {string} statId
 * @param {number} value
 */
export function setBaseStat(c, statId, value) {
  c.stats.base[statId] = Number(value) || 0;
}

export const PRIMARY_STAT_IDS = PRIMARY_STATS;
