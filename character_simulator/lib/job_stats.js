import { PRIMARY_STAT_IDS } from './character.js';
import { JOB_STAT_SWAP_IDS } from './abilities.js';

const ZERO_STATS = Object.freeze(Object.fromEntries(PRIMARY_STAT_IDS.map((s) => [s, 0])));

const INITIAL_ROWS = {
  0: [25, 15, 20, 5, 10, 15, 0],
  1: [25, 15, 20, 5, 10, 15, 0],
  2: [15, 25, 15, 10, 10, 10, 5],
  3: [15, 25, 15, 10, 10, 10, 5],
  4: [5, 5, 10, 25, 20, 20, 5],
  5: [5, 5, 10, 25, 20, 20, 5],
  6: [20, 10, 15, 15, 20, 10, 0],
  7: [20, 10, 15, 15, 20, 10, 0],
  8: [5, 10, 5, 20, 20, 20, 10],
  9: [5, 10, 5, 20, 20, 20, 10],
  10: [15, 25, 10, 10, 5, 15, 10],
  11: [15, 25, 10, 10, 5, 15, 10],
  12: [10, 10, 15, 15, 20, 15, 5],
  13: [10, 10, 15, 15, 20, 15, 5],
  14: [25, 15, 20, 5, 10, 15, 0],
  15: [25, 15, 20, 5, 10, 15, 0],
  16: [20, 15, 15, 15, 10, 15, 0],
  17: [20, 15, 15, 15, 10, 15, 0],
  18: [20, 10, 10, 20, 10, 10, 10],
  19: [20, 15, 15, 5, 5, 10, 20],
  20: [20, 15, 15, 5, 5, 10, 20],
  21: [15, 25, 15, 5, 10, 10, 10],
  22: [15, 25, 15, 5, 10, 10, 10],
  24: [20, 10, 10, 20, 10, 10, 10],
};

const AUTO_STAT_BY_JOB = {
  0: 'str',
  1: 'str',
  2: 'agi',
  3: 'agi',
  4: 'int',
  5: 'str',
  6: 'chs',
  7: 'chs',
  8: 'wiz',
  9: 'wiz',
  10: 'luc',
  11: 'luc',
  12: 'con',
  13: 'con',
};

const SWAP_REMAP = [3, 4, 5, 0, 1, 2, 6];

function toStats(row) {
  const out = Object.create(null);
  for (let i = 0; i < PRIMARY_STAT_IDS.length; i++) {
    out[PRIMARY_STAT_IDS[i]] = Number(row?.[i]) || 0;
  }
  return out;
}

export function getInitialStats(jobId) {
  return toStats(INITIAL_ROWS[Number(jobId)] || null);
}

export function getAutoStatId(jobId, loader = null) {
  const id = Number(jobId) || 0;
  if (AUTO_STAT_BY_JOB[id]) return AUTO_STAT_BY_JOB[id];

  const jobRow = loader?.master?.jobs?.[String(id)];
  const idx = Array.isArray(jobRow) && Number.isFinite(jobRow[8]) ? Number(jobRow[8]) : null;
  const freePerLv = Array.isArray(jobRow) && Number.isFinite(jobRow[9]) ? Number(jobRow[9]) : 5;
  if (idx == null || freePerLv === 5) return null;

  if (JOB_STAT_SWAP_IDS.has(id)) {
    const remappedIdx = SWAP_REMAP.indexOf(idx);
    return PRIMARY_STAT_IDS[remappedIdx] || null;
  }
  return PRIMARY_STAT_IDS[idx] || null;
}

export function computeBaseStatFloor(jobId, realLv, loader = null) {
  const floor = getInitialStats(jobId);
  const autoStatId = getAutoStatId(jobId, loader);
  if (autoStatId) {
    floor[autoStatId] = (floor[autoStatId] || 0) + Math.max(0, (Number(realLv) || 1) - 1);
  }
  return floor;
}

export function clampBaseStatsToFloor(stats, floor) {
  const out = Object.create(null);
  for (const s of PRIMARY_STAT_IDS) {
    const v = Number(stats?.[s]);
    const min = Number(floor?.[s] ?? ZERO_STATS[s]) || 0;
    out[s] = Math.max(min, Number.isFinite(v) ? Math.floor(v) : min);
  }
  return out;
}

export function preserveAllocatedStatsForFloorChange(stats, previousFloor, nextFloor) {
  const out = Object.create(null);
  for (const s of PRIMARY_STAT_IDS) {
    const current = Number(stats?.[s]);
    const prev = Number(previousFloor?.[s] ?? ZERO_STATS[s]) || 0;
    const next = Number(nextFloor?.[s] ?? ZERO_STATS[s]) || 0;
    const allocated = Math.max(0, (Number.isFinite(current) ? Math.floor(current) : prev) - prev);
    out[s] = next + allocated;
  }
  return out;
}

export function statTotal(stats) {
  let total = 0;
  for (const s of PRIMARY_STAT_IDS) total += Number(stats?.[s]) || 0;
  return total;
}
