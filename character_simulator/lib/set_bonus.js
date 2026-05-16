// set_bonus.js — セットボーナス展開
//
// 公開 API:
//   countSetEquipped(equippedItems)             → Map<setId, count>
//   applySetBonusesToSTTemp(STTemp, setCounts, LvTemp)
//   applySetBonusEntry(STTemp, entry, LvTemp)   → 1 つの bonus を STTemp に積算
//
// データ実態:
//   master.sets[setId].bonuses[equippedCount] は **sparse dict** で、
//   各 entry は [statTargetCode, n, lvDiv] の 3 要素配列。
//   2 個未満 (bonuses[0], [1]) は基本 null。

import { getLoader } from './item_api.js';

/**
 * 装着済アイテム群からセット ID 別の装着個数を集計。
 * @param {{inv: Object, item: Object}[]} equippedItems
 * @returns {Map<number, number>}
 */
export function countSetEquipped(equippedItems) {
  const loader = getLoader();
  const sets = loader && loader.master && loader.master.sets;
  if (!sets) return new Map();

  // setId -> Set<itemId> (重複装着でも 1 カウント扱い)
  const setMatch = new Map();

  const entries = setEntries(sets);

  for (const { inv, item } of equippedItems) {
    if (!inv || !inv.equippedSlot) continue;
    const itemId = inv.itemId;

    // item.setId が判っているならそこを先に試す (高速パス)
    if (item && item.setId != null) {
      const setDef = sets[item.setId];
      if (setDef && Array.isArray(setDef.itemIds) && setDef.itemIds.includes(itemId)) {
        addMatch(setMatch, item.setId, itemId);
        continue;
      }
    }

    // フォールバック: 全セットを線形走査
    for (const [setId, setDef] of entries) {
      if (!setDef || !Array.isArray(setDef.itemIds)) continue;
      if (setDef.itemIds.includes(itemId)) {
        addMatch(setMatch, setId, itemId);
        break;
      }
    }
  }

  const counts = new Map();
  for (const [setId, idSet] of setMatch) counts.set(setId, idSet.size);
  return counts;
}

function addMatch(setMatch, setId, itemId) {
  if (!setMatch.has(setId)) setMatch.set(setId, new Set());
  setMatch.get(setId).add(itemId);
}

function setEntries(sets) {
  if (Array.isArray(sets)) {
    return sets.map((v, i) => [i, v]);
  }
  return Object.entries(sets).map(([k, v]) => [Number(k), v]);
}

/**
 * setCounts に応じて全セットの bonus を STTemp に積算する。
 * @param {Object} STTemp
 * @param {Map<number, number>} setCounts
 * @param {number} LvTemp  Lv 連動レイヤー計算用 (キャラ実効 Lv)
 */
export function applySetBonusesToSTTemp(STTemp, setCounts, LvTemp) {
  const loader = getLoader();
  const sets = loader && loader.master && loader.master.sets;
  if (!sets) return;

  for (const [setId, count] of setCounts) {
    if (count < 2) continue;   // 2 個未満ではセット効果発動なし (06 仕様 Part A)
    const setDef = sets[setId];
    if (!setDef || !Array.isArray(setDef.bonuses)) continue;

    // bonuses[count] は sparse dict、null のときスキップ
    const bonusMap = setDef.bonuses[count];
    if (!bonusMap || typeof bonusMap !== 'object') continue;

    for (const key of Object.keys(bonusMap)) {
      const tri = bonusMap[key];
      if (!Array.isArray(tri) || tri.length < 2) continue;
      applySetBonusEntry(STTemp, {
        statTargetCode: tri[0],
        n:              tri[1],
        lvDiv:          (tri[2] != null) ? tri[2] : 1,
      }, LvTemp);
    }
  }
}

/**
 * 1 つの SetBonus を STTemp に積算。
 * 通常 sum / lvLinked / sumAll → setBonus レイヤーへ強制配置。
 * fixedCap / attrFixedCap はそのまま (max 集約)。
 *
 * @param {Object} STTemp
 * @param {{statTargetCode: number, n: number, lvDiv?: number}} entry
 * @param {number} LvTemp
 */
export function applySetBonusEntry(STTemp, entry, LvTemp) {
  const loader = getLoader();
  const resolved = loader.resolveStatTarget(entry.statTargetCode);
  if (!resolved) return;
  const { statId, layer, stats, multiplier } = resolved;
  if (statId == null && !stats) return;

  const targetIds = (stats && stats.length) ? stats : [statId];
  const mul = (multiplier != null) ? multiplier : 1;
  const lvDiv = entry.lvDiv || 1;

  for (const id of targetIds) {
    if (id == null) continue;
    let v = (entry.n || 0) * mul;
    if (layer === 'lvLinked') {
      v = Math.floor((LvTemp || 0) / lvDiv) * (entry.n || 0);
    }

    // SetBonus 固有: sum / lvLinked / sumAll は setBonus レイヤー (STTemp[6]) に集約
    let targetLayer = layer;
    if (layer === 'sum' || layer === 'lvLinked' || layer === 'sumAll') {
      targetLayer = 'setBonus';
    }
    if (layer === 'displayOnly') return;

    if (!STTemp[targetLayer]) STTemp[targetLayer] = Object.create(null);
    const cur = STTemp[targetLayer][id];
    const isMax = targetLayer === 'fixedCap' || targetLayer === 'attrFixedCap';
    if (isMax) {
      STTemp[targetLayer][id] = (cur == null) ? v : Math.max(cur, v);
    } else {
      STTemp[targetLayer][id] = (cur || 0) + v;
    }
  }
}
