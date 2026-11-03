const SITE = 'https://sokomin.github.io';
const DATA = 'https://raw.githubusercontent.com/sokomin/sokomin_repository2026/main/market_info/';
export const SHOP_SERVERS = { b: 'Bridgehead', s: 'Strasserad', v: 'Valutish', g: 'Gold Experience' };
export function parseShopUrl(value) {
  if (typeof value !== 'string' || !value.trim()) throw Error('相場の商品詳細URLを指定してください');
  let u;
  try { u = new URL(value.trim(), SITE); }
  catch { throw Error('相場の商品詳細URLを指定してください'); }
  if (u.origin !== SITE || u.pathname !== '/market/item-detail.html' || u.username || u.password) throw Error('相場の商品詳細URLを指定してください');
  const q = u.searchParams;
  const server = q.get('server'), date = q.get('date') === 'all' ? q.get('offerDate') : q.get('date');
  const key = q.get('key'), id = q.get('id');
  if (!SHOP_SERVERS[server] || !/^\d{8}$/.test(date || '') || !/^[a-f0-9]{12}$/.test(key || '') || !/^[a-f0-9]{24}$/.test(id || '')) throw Error('鯖・撮影日・商品が確定したURLを指定してください');
  const iso = `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
  if (new Date(iso).toISOString().slice(0,10) !== iso) throw Error('撮影日が不正です');
  return { server, date, key, id, href: `${SITE}/market/item-detail.html?${new URLSearchParams({ server, date, key, id })}`,
    dataUrl: `${DATA}${server}/${date}/items/${id}.json` };
}
export function shopSearchUrl(query, server, year) {
  const u = new URL('/market/index.html', SITE);
  if (String(query).trim()) u.searchParams.set('q', String(query).trim());
  if (SHOP_SERVERS[server] && (server !== 'g' || /^\d{4}$/.test(year || ''))) {
    u.searchParams.set('server', SHOP_SERVERS[server]);
    if (server === 'g') u.searchParams.set('season', year);
  }
  return u.href;
}
