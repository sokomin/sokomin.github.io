// sttemp.js — STTemp レイヤー定義
//
// 構造:
//   STTemp = {
//     base:            { statId: number, ... }   // 素ステ + 職業補正反映後
//     fixedCap:        { statId: number, ... }   // 固定ステ上限 (max 集約)
//     attrFixedCap:    { statId: number, ... }   // 属性ステ上限 (max 集約)
//     jobBonus:        { statId: number, ... }   // 職業ボーナス
//     sum:             { statId: number, ... }   // 通常ステ加算
//     lvLinked:        { statId: number, ... }   // Lv 連動ステ加算
//     setBonus:        { statId: number, ... }   // セットボーナス
//     consumableMax:   { statId: number, ... }   // 消耗品 (max 集約)
//     consumableLvMax: { statId: number, ... }   // 消耗品 Lv 連動 (max 集約)
//     lvCorrection:    { statId: number, ... }   // Lv 補正 (装備 Lv 要件用)
//   }
//
// 各 layer の集約方法は op_calc.js の getLayerAggregation() で定義。

export function newSTTemp() {
  return {
    base:            Object.create(null),
    fixedCap:        Object.create(null),
    attrFixedCap:    Object.create(null),
    jobBonus:        Object.create(null),
    sum:             Object.create(null),
    lvLinked:        Object.create(null),
    setBonus:        Object.create(null),
    consumableMax:   Object.create(null),
    consumableLvMax: Object.create(null),
    lvCorrection:    Object.create(null),
  };
}

/**
 * 浅いコピー (デバッグ表示用)。
 */
export function debugSnapshot(STTemp) {
  const out = {};
  for (const layer of Object.keys(STTemp)) {
    out[layer] = Object.assign({}, STTemp[layer]);
  }
  return out;
}
