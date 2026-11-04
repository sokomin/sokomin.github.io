export const ABSORPTION_ELEMENTS = ['Fire', 'Water', 'Wind', 'Earth', 'Light', 'Dark'];

export function recordSharedAbsorption(temp, stats, value, layer = 'sum') {
  if (!Array.isArray(stats) || !stats.includes('attrMagicAbsorb')) return;
  const target = temp[layer] || (temp[layer] = Object.create(null));
  for (const element of ABSORPTION_ELEMENTS) {
    const key = 'attr' + element + 'Absorb';
    if (stats.includes(key)) target[key + 'Shared'] = (target[key + 'Shared'] || 0) + value;
  }
}
