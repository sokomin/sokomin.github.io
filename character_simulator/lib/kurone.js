


import { getLoader } from './item_api.js';


export function getKuroneInfo(item) {
  if (!item || item.setId == null) return null;
  const loader = getLoader();
  const sets = loader && loader.master && loader.master.sets;
  if (!sets) return null;
  const setDef = sets[item.setId];
  if (!setDef || !setDef.kurone) return null;
  return setDef.kurone;
}


export function isKuroneItem(item) {
  const k = getKuroneInfo(item);
  return !!(k && k.transTime > 0);
}


export function checkKuroneConstraint(item, character) {
  const k = getKuroneInfo(item);
  if (!k || k.transTime <= 0) return true;     
  return (character && character.kuroneTransTime || 0) >= k.transTime;
}


export function checkSameKuroneConflict(item, equippedItems) {
  const k = getKuroneInfo(item);
  if (!k || k.transTime <= 0) return true;  

  for (const entry of equippedItems) {
    if (!entry) continue;
    const inv2 = entry.inv;
    const it2  = entry.item;
    if (!inv2 || !inv2.equippedSlot) continue;
    if (!it2 || it2.id === (item && item.id)) continue;
    const k2 = getKuroneInfo(it2);
    if (!k2) continue;
    if (k2.transTime > 0 && k2.transTime === k.transTime) return false;
  }
  return true;
}


export function getKuroneLabel(item) {
  const k = getKuroneInfo(item);
  if (!k) return null;
  return `[${k.element}] Lv${k.lv}`;
}
