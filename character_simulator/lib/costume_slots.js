export const PRIMARY_BASE_CAP = 3;
export const PURPLE_SHARED_CAP = 2;

const PRIMARY_COLORS = ['red', 'blue', 'gold'];
const KNOWN_COLORS = new Set([...PRIMARY_COLORS, 'purple']);

export function allocateCostumeCrestSlots(slotColors) {
  const counts = { red: 0, blue: 0, gold: 0, purple: 0 };
  const baseUsed = { red: 0, blue: 0, gold: 0 };
  const violatedIndexes = [];
  let sharedUsed = 0;

  for (let index = 0; index < slotColors.length; index++) {
    const color = slotColors[index];
    if (!KNOWN_COLORS.has(color)) continue;

    counts[color]++;
    if (PRIMARY_COLORS.includes(color) && baseUsed[color] < PRIMARY_BASE_CAP) {
      baseUsed[color]++;
      continue;
    }
    if (sharedUsed < PURPLE_SHARED_CAP) sharedUsed++;
    else violatedIndexes.push(index);
  }

  const sharedRequired = counts.purple + PRIMARY_COLORS.reduce(
    (sum, color) => sum + Math.max(0, counts[color] - PRIMARY_BASE_CAP),
    0,
  );
  return { counts, sharedRequired, violatedIndexes };
}
