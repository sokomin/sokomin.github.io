import { parseShopUrl, SHOP_SERVERS } from './market_shop_url.js';
import { SHOP_RECENT_DATE, shopDateRange } from './market_shop_date_range.js';
const ROOT = 'https://raw.githubusercontent.com/sokomin/sokomin_repository2026/main/market_info/';
const normalized = s => String(s).normalize('NFKC').toLocaleLowerCase('ja-JP').trim();
export function createShopSearch({ fetcher = (...args) => fetch(...args), dataRoot = ROOT } = {}) {
  const cache = new Map();
  async function json(file) {
    if (!cache.has(file)) {
      const request = (async () => {
        const response = await fetcher(dataRoot + file);
        if (!response.ok) throw Error('検索一覧を取得できません');
        const text = await response.text();
        if (text.length > 2000000) throw Error('検索一覧が大きすぎます');
        return JSON.parse(text);
      })();
      cache.set(file,request); request.catch(() => cache.delete(file));
      if (cache.size > 12) cache.delete(cache.keys().next().value);
    }
    return cache.get(file);
  }
  return {
    async search({ query, server, year = '', date = SHOP_RECENT_DATE }) {
      const term = normalized(query);
      if (!term || term.length > 200) throw Error('装備名を入力してください');
      if (!Object.hasOwn(SHOP_SERVERS,server)) throw Error('サーバーを選択してください');
      if (server === 'g' && !/^\d{4}$/.test(year)) throw Error('Gold年を入力してください');
      const index = await json('catalog.json');
      if (index.schema !== 1 || !Array.isArray(index.captures)) { cache.delete('catalog.json'); throw Error('撮影日一覧が不正です'); }
      const dates = [...new Set(index.captures.filter(c => c.server === server && /^\d{8}$/.test(c.date) && (server !== 'g' || c.date.startsWith(year))).map(c => c.date))].sort().reverse();
      const { choice, days } = shopDateRange(dates, date);
      const items = [];
      const seen = new Set();
      
      for (let offset = 0; offset < days.length; offset += 3) {
        const batch = days.slice(offset, offset + 3);
        const catalogs = await Promise.all(batch.map(async chosen => {
          const file = `${server}/${chosen}/catalog.json`, catalog = await json(file);
          if (catalog.schema !== 1 || catalog.server !== server || catalog.date !== chosen || !Array.isArray(catalog.items) || catalog.items.length > 10000) { cache.delete(file); throw Error('検索一覧の鯖・撮影日が一致しません'); }
          return catalog;
        }));
        for (const catalog of catalogs) {
          const chosen = catalog.date;
          for (const row of catalog.items) {
            if (typeof row.display_name !== 'string' || row.display_name.length > 1000 || typeof row.item_type !== 'string') throw Error('商品名が不正です');
            if (!normalized(row.display_name + ' ' + row.item_type).includes(term)) continue;
            const source = parseShopUrl(`https://sokomin.github.io/market/item-detail.html?${new URLSearchParams({server,date:chosen,key:row.item_key,id:row.id})}`);
            if (!Number.isSafeInteger(row.price?.amount) || row.price.amount < 0 || !['ingot','gold'].includes(row.price.currency) || !Number.isSafeInteger(row.quantity) || row.quantity < 1 || !Number.isInteger(row.item_id)) throw Error('商品の価格・個数が不正です');
            const gold = row.price.amount * (row.price.currency === 'ingot' ? 100000000 : 1);
            if (!Number.isSafeInteger(gold)) throw Error('商品価格が大きすぎます');

            if (typeof row.variant_key === 'string' && /^[a-f0-9]{64}$/.test(row.variant_key)) {
              const identity = JSON.stringify([row.variant_key, row.item_id, row.item_key, row.display_name, row.item_type, gold, row.quantity]);
              if (seen.has(identity)) continue;
              seen.add(identity);
            }
            items.push({ source, name:row.display_name, itemId:row.item_id, gold, quantity:row.quantity });
          }
        }
      }
      items.sort((a,b) => b.source.date.localeCompare(a.source.date) || a.name.localeCompare(b.name,'ja') || a.gold-b.gold || a.source.id.localeCompare(b.source.id));
      return { items, dates, date:choice };
    },
  };
}
