// stat_finalizer.js — STTemp 各レイヤー → 最終 stats
//
// 公開 API:
//   finalizeStats(STTemp, opts?)
//     → 装備込み現在値 + 素値 + 各レイヤーの内訳を返す
//
// 集約式:
//   equipped = base + sum + lvLinked + setBonus + consumableMax + consumableLvMax
//              + max(fixedCap)
//   primary stat:
//     final[stat] = base + sum + lvLinked + setBonus + consumableMax + consumableLvMax
//                 + fixedCap[<stat>FixedCap]   (= max 集約済の固定 op 値)
//   *FixedCap / 拡張ステ も別々にレイヤー保持。

import { PRIMARY_STAT_IDS } from './character.js';
import { getLoader } from './item_api.js';

/**
 * STTemp の各 layer を加算して最終 stats を作る。
 *
 * @param {Object} STTemp  sttemp.js の newSTTemp()
 * @param {{ includeMaxEquipped?: boolean }} [opts]
 * @returns {{
 *   base:        Record<string, number>,
 *   equipped:    Record<string, number>,   // 装備込み現在値 (= ST[][PT][17])
 *   layers:      Record<string, Record<string, number>>, // 全 layer 内訳 (デバッグ用)
 * }}
 */
export function finalizeStats(STTemp, opts = {}) {
  void opts;
  const base     = Object.create(null);
  const equipped = Object.create(null);

  // 全ステ ID (primary + STTemp の各 layer に登場するもの) を集める
  const allStatIds = new Set(PRIMARY_STAT_IDS);
  for (const layer of Object.keys(STTemp)) {
    for (const sid of Object.keys(STTemp[layer])) allStatIds.add(sid);
  }
  // master.statTypes.stats に登録のあるステも全部追加 (UI で参照するため)
  const loader = getLoader();
  const statMeta = loader && loader.master && loader.master.statTypes
    && loader.master.statTypes.stats;
  if (statMeta) {
    for (const sid of Object.keys(statMeta)) allStatIds.add(sid);
  }

  for (const sid of allStatIds) {
    const b   = STTemp.base[sid]            || 0;
    const sum = STTemp.sum[sid]             || 0;
    const lvL = STTemp.lvLinked[sid]        || 0;
    const set = STTemp.setBonus[sid]        || 0;
    const cMx = STTemp.consumableMax[sid]   || 0;
    const cLv = STTemp.consumableLvMax[sid] || 0;

    base[sid] = b;

    // 自然集計値 (= 装備 op の通常 sum 経路)
    const naturalTotal = b + sum + lvL + set + cMx + cLv;

    // primary stat の場合、<stat>FixedCap layer (= 「力固定 N」 op の max 集約済値) を
    // **下限 floor** として適用。 仕様: 「力固定120 なら 力を強制的に 120 で上書き、
    // 複数装備時は最も高い値を採用 (= max)」。
    // 自然値が固定値より高ければ自然値、 低ければ固定値が採用される (= MAX 合成)。
    let result = naturalTotal;
    if (PRIMARY_STAT_IDS.includes(sid)) {
      const capFloor = STTemp.fixedCap[sid + 'FixedCap'] || 0;
      if (capFloor > result) result = capFloor;
    }
    // attr_resist は attrFixedCap layer も同じ「強制下限」semantics
    const meta = statMeta && statMeta[sid];
    if (meta && meta.category === 'attr_resist') {
      const attrFloor = STTemp.attrFixedCap[sid] || 0;
      if (attrFloor > result) result = attrFloor;
    }

    equipped[sid] = result;
  }

  // 全 layer の snapshot (デバッグ用)
  const layers = {};
  for (const k of Object.keys(STTemp)) {
    layers[k] = Object.assign({}, STTemp[k]);
  }

  return { base, equipped, layers };
}
