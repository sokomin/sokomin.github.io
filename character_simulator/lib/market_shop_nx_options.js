const EFFECTS = [
  { statId: 'agi', pattern: /^敏捷\+([0-9]+)$/ },
  { statId: 'skillLv', pattern: /^全スキルレベル\+([0-9]+)$/ },
  { statId: 'finalAttackPercent', pattern: /^最終攻撃力増加([0-9]+)%$/ },
];
export function parseShopNxEffect(text,loader=getLoader()) {
  const normalized = String(text).normalize('NFKC').replace(/\s+/g, '');
  if(normalized==='CP+0')return{familyId:29,value:0,text:String(text)};
  for (const effect of EFFECTS) {
    const match = normalized.match(effect.pattern);
    if (!match) continue;
    const value = Number(match[1]);
    if (Number.isSafeInteger(value) && value >= 0 && value <= 1000000) return { statId: effect.statId, value, text: String(text) };
  }
  const effect=loader&&shopEffectResolver(loader)(text);
  return effect?{...effect,text:String(text)}:null;
}
export function restoreShopNx(inv, entry) {
  if (entry.shopObservedNx == null) return inv;
  const rows = entry.shopObservedNx, slots = new Set();
  if (!Array.isArray(rows) || rows.length > 4) throw Error('Nx変換効果が不正です');
  const restored = rows.map(row => {
    const effect = parseShopNxEffect(row.text);
    if (!Number.isInteger(row.slot) || row.slot < 0 || row.slot >= (inv.nxAvailableCount ?? 4) || slots.has(row.slot) || !effect || ['statId','familyId','value','addValue','divisor'].some(k=>effect[k]!==row[k])) throw Error('Nx変換効果が一致しません');
    slots.add(row.slot); return { slot: row.slot, ...effect };
  });
  inv.shopObservedNx = restored;
  inv.nxUnlockedOps ||= [null,null,null,null];
  for (const row of restored) {const{slot,text,...effect}=row;inv.nxUnlockedOps[slot] = { ...effect, source: 'nx.unlocked', _nxConverted: true };}
  return inv;
}
export function serializeShopNx(snapshot, inventory) {
  for (const entry of snapshot.inventory || []) {
    const rows = inventory.get(entry.slotIndex)?.shopObservedNx;
    if (!rows?.length) continue;
    entry.shopObservedNx = rows.map(row => ({ ...row }));
    for (const row of rows) if (entry.nxUnlockedOps) entry.nxUnlockedOps[row.slot] = null;
  }
}
export function preserveShopNx(built, original, edited = []) {
  const rows = original.shopObservedNx?.filter(row => !edited[row.slot]);
  if (rows?.length) restoreShopNx(built, { shopObservedNx: rows });
}
export function renderShopNxSelection(inv, state, slot, select, document) {
  const row = inv?.shopObservedNx?.find(row => row.slot === slot);
  if (!row || state.shopNxEdited?.[slot]) return;
  const option = document.createElement('option');
  option.value = 'shop-observed'; option.textContent = row.text;
  select.appendChild(option); select.value = option.value;
}
import { getLoader } from './item_api.js';
import { shopEffectResolver } from './market_shop_effects.js';
