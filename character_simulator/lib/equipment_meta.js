// equipment_meta.js — 装備の装着可否判定
//
// 公開 API:
//   updateEquipmentMetadata(inv, item, character, opts?)
//     → inv の判定結果フィールドを書き込んで返す
//   evaluateStReq(reqST, stCurrent, stEquipped, stBase, prevResult)
//     → 必要ステの 4 分岐ロジック (1=OK / 0=NG / 2=部分OK)
//   computeRequiredLv(inv, item)
//     → 必要 Lv を返す (現状 item.req.lv そのまま)
//   isJobAllowed(item, character)
//     → req.jobType 0/1/2/3 の判定
//
// 判定ステップ:
//   Step 1: 職業判定
//   Step 2: 強制装着モード (opts.equipAlways / inv.daybreak)
//   Step 3: 朱洛星制約 (kurone.js)
//   Step 4: Lv 判定
//   Step 5: 必要ステ判定 (4 分岐)

import { resolveEquipSlot } from './slot_resolver.js';
import { checkKuroneConstraint } from './kurone.js';

const STAT_KEYS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];

/**
 * 装着可否を判定して inv に結果を書き込む。
 *
 * 副作用フィールド:
 *   inv.canEquip       boolean        装着可否 (Step 1-5 全て通れば true)
 *   inv.candidateSlot  string|null    推奨スロット (canEquip 時のみ)
 *   inv.equippedSlot   string|null    後方互換: canEquip なら candidateSlot、NG なら null
 *   inv.mismatchReason string|null    NG 理由
 *   inv.jobMismatch    boolean        後方互換: !canEquip || partial
 *
 * UI 側でユーザー編集スロットを別管理するため、 inv.equippedSlot は
 * automated (= canEquip ? candidateSlot : null) として残る。
 *
 * mismatchReason 値:
 *   null         | 装着 OK
 *   'job'        | 職業不適合
 *   'kurone'     | 朱洛星変身時間不足
 *   'lv:<n>/<m>' | Lv 不足
 *   'stat:<id>'  | 必要ステ不足
 *   'partial'    | 装着可だが装備込みで初めて満たす (循環依存マーク)
 *
 * @param {Object} inv
 * @param {Object} item
 * @param {Object} character
 * @param {{ equipAlways?: boolean }} [opts]
 * @returns {Object} inv (副作用あり)
 */
export function updateEquipmentMetadata(inv, item, character, opts = {}) {
  // equippedSlot は UI クリックで制御するため、 ここでは **判定結果** のみ書き込む
  // (canEquip / candidateSlot / mismatchReason)。 equippedSlot は触らない。
  inv.canEquip       = false;
  inv.candidateSlot  = null;
  inv.jobMismatch    = false;
  inv.mismatchReason = null;

  if (!item) return inv;

  // === Step 1: 職業判定 ===
  if (!isJobAllowed(item, character)) {
    inv.jobMismatch    = true;
    inv.mismatchReason = 'job';
    return inv;
  }

  // === Step 2: 強制装着モード ===
  if (opts.equipAlways || inv.daybreak) {
    inv.canEquip      = true;
    inv.candidateSlot = resolveEquipSlot(item, character);
    return inv;
  }

  // === Step 3: 朱洛星制約 ===
  if (!checkKuroneConstraint(item, character)) {
    inv.jobMismatch    = true;
    inv.mismatchReason = 'kurone';
    return inv;
  }

  // === Step 4: Lv 判定 ===
  const reqLv = computeRequiredLv(inv, item);
  const effLv = (character.realLv || 0)
              + (character.lvRevision || 0)
              + (character.miniPetLvRevision || 0);
  if (effLv < reqLv) {
    inv.jobMismatch    = true;
    inv.mismatchReason = `lv:${effLv}/${reqLv}`;
    return inv;
  }

  // === Step 5: 必要ステ判定 ===
  const stRes = checkRequiredStatsDetailed(item, inv, character);
  if (stRes.result === 0) {
    inv.jobMismatch    = true;
    inv.mismatchReason = `stat:${stRes.statId}(${stRes.have}/${stRes.need})`;
    return inv;
  }
  inv.canEquip      = true;
  inv.candidateSlot = resolveEquipSlot(item, character);
  if (stRes.result === 2) {
    inv.jobMismatch    = true;
    inv.mismatchReason = 'partial';
  }
  return inv;
}

/**
 * 職業判定 (jobType 0/1/2/3)。
 *   - 0: ALL (制限なし。 SoT = sokomin items_search.json の blob 由来)
 *   - 1: MALE-only (character.gender === 1)
 *   - 2: FEMALE-only (character.gender === 2)
 *   - 3: SPECIFIC (character.job in item.req.jobs)
 *
 */
export function isJobAllowed(item, character) {
  if (!item || !item.req) return true;
  const t = item.req.jobType;
  if (t === 1) return character.gender === 1;
  if (t === 2) return character.gender === 2;
  if (t === 3) {
    const jobs = item.req.jobs || [];
    return jobs.includes(character.job);
  }
  return true;
}

/**
 * 必要 Lv 計算。 item.req.lv をそのまま返す (revision 倍率 / op 補正は未対応)。
 */
export function computeRequiredLv(inv, item) {
  if (!item || !item.req) return 0;
  return Number(item.req.lv || 0);
}

/**
 * 全ステに対する必要ステ判定の総合結果 (詳細版)。
 * @returns {{result: 0|1|2, statId?: string, need?: number, have?: number}}
 */
function checkRequiredStatsDetailed(item, inv, character) {
  const reqSt = (item.req && item.req.st) || {};
  if (Object.keys(reqSt).length === 0) return { result: 1 };

  let stResult = 1;
  const stats = (character.stats) || {};
  const equipped    = stats.equipped    || {};
  const maxEquipped = stats.maxEquipped || {};
  const base        = stats.base        || {};

  for (const stat of STAT_KEYS) {
    let reqST = reqSt[stat];
    if (reqST == null || reqST === 0) continue;

    // reqStatOverride で「装備自体の op が必要ステを下げる」差し引きを反映
    const overrideValue = (inv.reqStatOverride && inv.reqStatOverride[stat]);
    const effectiveReq = (overrideValue != null) ? overrideValue : reqST;

    const stCurrent  = equipped[stat];
    const stEquipped = maxEquipped[stat];
    const stBase     = base[stat];

    const r = evaluateStReq(effectiveReq, stCurrent, stEquipped, stBase || 0, stResult);
    if (r === 0) {
      // どの値で評価して足りなかったかを記録
      const have = (stEquipped != null) ? stEquipped : (stCurrent != null ? stCurrent : (stBase || 0));
      return { result: 0, statId: stat, need: effectiveReq, have };
    }
    if (r === 2) stResult = 2;
  }
  return { result: stResult };
}

/** 後方互換: 結果コードのみ返す薄ラッパ。 */
function checkRequiredStats(item, inv, character) {
  return checkRequiredStatsDetailed(item, inv, character).result;
}

/**
 *
 * 戻り値:
 *   0 = NG (このステで装着不可)
 *   1 = OK (素値で足りる)
 *   2 = 部分 OK (装備込みで足りるが素値で NG = 循環依存マーク)
 *
 * @returns {0 | 1 | 2}
 */
export function evaluateStReq(reqST, stCurrent, stEquipped, stBase, prevResult) {
  if (stCurrent == null && stEquipped == null) {
    if (reqST > stBase) return 0;
    return prevResult;
  }
  if (stCurrent != null && stEquipped == null) {
    // 装備込み上限 (stEquipped) が未知 → 現在値で判定
    if (reqST > stCurrent) return 0;
    return prevResult;
  }
  // stEquipped (装備込み上限) が既知のとき: 上限で届くかを優先判定 (while 収束で循環依存ケースを救う)
  if (reqST > stEquipped) return 0;     // 装備込み上限でも足りない ⇒ NG
  if (reqST > stBase)     return 2;     // 装備込み上限なら足りるが素値で NG ⇒ 部分 OK (循環依存マーク)
  return prevResult;                     // 素値で足りる
}
