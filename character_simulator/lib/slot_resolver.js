// slot_resolver.js — kind → part マッピング + 装着スロット解決
//
// 公開 API:
//   resolveItemPart(itemOrKind)         // ItemRecord または kind から part (= partRef) を推定
//   resolveEquipSlot(item, character)   // 装着スロットキー文字列を返す ('weapon' / 'ring_0..9' / etc.)
//   PART_LABELS                         // partRef → 表示名 (デバッグ)
//
// 指 (partRef=9) は 10 個並列装着 (ring_0..ring_9) のため、 resolveEquipSlot は null を
// 返し UI 側で空き ring_* スロットを割り当てる方針。

// kind ID → partRef の最小マッピング (master.kinds の name を見て手書き)
// 値が null のものは未確定 / 装着しない系。
const KIND_TO_PART = {
  // 武器系 (part=0)
  4: 0,   // 爪
  18: 0,  // 片手剣
  20: 0,  // 両手剣
  21: 0,  // 杖
  22: 0,  // 牙
  23: 0,  // メイス
  25: 0,  // 短剣
  26: 0,  // 弓
  28: 0,  // 槍
  29: 0,  // 笛
  32: 0,  // ワンド
  58: 0,  // 双剣 (獣人専用) → 武器
  82: 0,  // 大砲 (キャノニア専用) → 武器
  // 防具系
  17: 1,  // 専用鎧 → 職専
  8: 2,   // ネックレス → 首
  15: 2,  // 十字架 → 首
  0: 3,   // ヘルメット → 頭
  1: 3,   // 冠 → 頭
  10: 4,  // イヤリング → 背・耳
  11: 4,  // マント → 背・耳
  6: 5,   // ベルト → 腰
  2: 6,   // グローブ → 手
  5: 6,   // ブレスレット → 手
  13: 6,  // 腕刺青 → 手 (暫定)
  16: 7,  // 共用鎧 → 体
  14: 7,  // 肩刺青 → 体 (暫定)
  7: 8,   // ブーツ → 足
  9: 9,   // リング → 指
  // 消耗品 / その他は part=13 等にマッピングするが、データ不足のため未指定
};

// 補助武器 (sub_weapon) として扱う kind 集合。
// 職業ごとに装着可能な sub_weapon の kind は req.jobs フィルタで自動的に絞り込まれる
// (例: 盾 kind=19 は req.jobs=[0,1] で剣士/戦士のみ装着可など)。
// 各 kind は「sub_weapon に装着される候補」なので、slot 解決でここに該当したら 'sub_weapon' を返す。
const SUB_WEAPON_KINDS = new Set([
  3,   // 投擲機
  12,  // ブローチ (= ウィザード系の補助武器)
  19,  // 盾
  27,  // 矢
  30,  // スリング
  31,  // スリング弾丸
  33,  // 鞭
  83,  // エネルギーチャージャー (キャノニア専用補助武器)
]);

export const PART_LABELS = {
  0: '武器', 1: '職専', 2: '首', 3: '頭', 4: '背・耳', 5: '腰',
  6: '手', 7: '体', 8: '足', 9: '指', 10: 'メインクエスト',
  11: '宝石', 12: 'バッジ', 13: '消耗品', 14: 'その他',
};

const PART_TO_SLOT_KEY = {
  0: 'weapon',
  1: 'job_armor',
  2: 'neck',
  3: 'head',
  4: 'back_ear',  // 男性 = 背、女性 = 耳 (item.req.jobType=1/2 でフィルタ)
  5: 'waist',
  6: 'hand',
  7: 'body',
  8: 'foot',
  // 9 (指) は呼び出し側で ring_0..9 から空きを探す
  // 10, 12, 13, 14 は装着不要 (null)
  // 11 (宝石) は装備武器の宝石スロット (未実装)
};

/**
 * ItemRecord (または kind 数値) から partRef を推定。
 * @param {Object | number} itemOrKind
 * @returns {number | null}
 */
export function resolveItemPart(itemOrKind) {
  if (itemOrKind == null) return null;
  if (typeof itemOrKind === 'number') return KIND_TO_PART[itemOrKind] ?? null;
  if (typeof itemOrKind === 'object') {
    if (itemOrKind.part != null) return itemOrKind.part;          // 将来 ETL で part が入ったら使う
    if (itemOrKind.kind != null) return KIND_TO_PART[itemOrKind.kind] ?? null;
  }
  return null;
}

/**
 * 装着スロットキーを返す。
 *   - 指 (part=9): null を返す (= UI 側で ring_0..9 の空きを探す方針)
 *   - 補助武器系 kind (3/19/27/30/31/33): 'sub_weapon'
 *     ※ 職業ごとに装着可能な kind は req.jobs フィルタで自動絞込
 *   - メインクエスト / バッジ / 消耗品 / その他: null
 *
 * @param {Object} item       ItemRecord
 * @param {Object} [character] 武器スロット番号 (職業依存) の解決用に将来使用
 * @returns {string | null}
 */
export function resolveEquipSlot(item, character) {
  void character;
  // 補助武器 kind を先に判定 (part にマップしないため)
  if (item && SUB_WEAPON_KINDS.has(Number(item.kind))) return 'sub_weapon';
  const part = resolveItemPart(item);
  if (part == null) return null;
  return PART_TO_SLOT_KEY[part] || null;
}
