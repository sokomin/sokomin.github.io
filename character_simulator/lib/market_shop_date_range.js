export const SHOP_RECENT_DATE = 'recent';
export const SHOP_RECENT_LABEL = '直近半年';

export function shopDateRange(dates, requested = SHOP_RECENT_DATE) {
  const choice = requested || SHOP_RECENT_DATE;
  if (![SHOP_RECENT_DATE, 'latest'].includes(choice) && !dates.includes(choice)) throw Error('撮影日を選び直してください');
  if (!dates.length) return { choice, days: [] };
  if (choice === 'latest') return { choice, days: [dates[0]] };
  if (choice !== SHOP_RECENT_DATE) return { choice, days: [choice] };
  const parse = day => {
    const iso = day.replace(/(....)(..)(..)/, '$1-$2-$3');
    const value = Date.parse(iso + 'T00:00:00Z');
    if (!Number.isFinite(value) || new Date(value).toISOString().slice(0,10) !== iso) throw Error('撮影日一覧が不正です');
    return value;
  };
  const end = parse(dates[0]), start = end - 183 * 86400000;
  return { choice, days: dates.filter(day => { const time = parse(day); return time >= start && time <= end; }) };
}
