// kurone.js — 朱洛星処理
//
// 公開 API:
//   getKuroneInfo(item)             → { lv, transTime, element } | null
//   isKuroneItem(item)              → bool (setDef.kurone.transTime > 0 で判定)
//   checkKuroneConstraint(item, character)
//   checkSameKuroneConflict(item, equippedItems, character)
//   getKuroneLabel(item)            → "[ファイア] Lv1" 等
//
// 「制約あり」 判定は item.setId が指すセットの kurone.transTime > 0 をトリガとする。

import { getLoader } from './item_api.js';

/**
 * @param {Object} item   ItemRecord
 * @returns {{ lv: number, transTime: number, element: string } | null}
 */
export function getKuroneInfo(item) {
  if (!item || item.setId == null) return null;
  const loader = getLoader();
  const sets = loader && loader.master && loader.master.sets;
  if (!sets) return null;
  const setDef = sets[item.setId];
  if (!setDef || !setDef.kurone) return null;
  return setDef.kurone;
}

/**
 * 朱洛星制約のあるアイテムか。
 * setDef.kurone.transTime > 0 のとき true (装着時に変身時間チェック対象)。
 * transTime=0 のセットは UI 上「朱洛星」表示はあるが装着判定スキップ。
 */
export function isKuroneItem(item) {
  const k = getKuroneInfo(item);
  return !!(k && k.transTime > 0);
}

/**
 * 装着判定: 変身時間を満たしているか。
 * @returns {boolean}
 */
export function checkKuroneConstraint(item, character) {
  const k = getKuroneInfo(item);
  if (!k || k.transTime <= 0) return true;     // 制約なし
  return (character && character.kuroneTransTime || 0) >= k.transTime;
}

/**
 * 同じ朱洛星 (transTime 同値) のセット品が既に装着済なら衝突 → false。
 * @param {Object} item
 * @param {{inv: Object, item: Object}[]} equippedItems  既装着のアイテム群 (自身含む可)
 * @returns {boolean}
 */
export function checkSameKuroneConflict(item, equippedItems) {
  const k = getKuroneInfo(item);
  if (!k || k.transTime <= 0) return true;  // 制約なし

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

/**
 * ツールチップ用ラベル ("[ファイア] Lv1" 等)。
 */
export function getKuroneLabel(item) {
  const k = getKuroneInfo(item);
  if (!k) return null;
  return `[${k.element}] Lv${k.lv}`;
}
