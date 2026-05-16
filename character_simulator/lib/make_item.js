// make_item.js — ItemFormState + ItemRecord から InventoryItem を生成
//
// 公開 API:
//   makeItem(state, itemRecord, opts?)        → InventoryItem
//   computeReqStatOverride(itemRecord, inv)   → reqStatOverride

import { newInventoryItem } from './inventory.js';
import { Op, iterateAllOps } from './item_api.js';
import { getLoader } from './item_api.js';

const STAT_KEYS = ['str', 'agi', 'con', 'int', 'wiz', 'chs', 'luc'];

/**
 * @typedef {Object} ItemFormState
 * @property {number} itemId
 * @property {[number|null, number|null, number|null]} [revisions]
 * @property {(number|null)[]} [ops]                      長さ 3、UI で選択された opId
 * @property {[[number,number,number],[number,number,number],[number,number,number]]} [opRevisions]
 * @property {number|null} [exRevision]
 * @property {number|null} [durability]
 * @property {boolean} [daybreak]
 * @property {boolean} [opsOff]
 * @property {boolean} [nxActive]
 */

/**
 * ItemFormState + ItemRecord から InventoryItem を構築する。
 *
 * `inventory` を渡すと add() で slotIndex を割り当てる。渡さない場合は slotIndex=-1。
 *
 * @param {ItemFormState} state
 * @param {Object} itemRecord    Item.get() で取得した ItemRecord
 * @param {{ inventory?: import('./inventory.js').Inventory }} [opts]
 * @returns {import('./inventory.js').InventoryItem | null}
 */
export function makeItem(state, itemRecord, opts = {}) {
  if (!itemRecord || itemRecord.id !== state.itemId) {
    return null;
  }
  const inv = newInventoryItem(state.itemId);

  // === Revision (axis 0/1/2) ===
  const stRev = state.revisions || [null, null, null];
  inv.revisions[0] = normalizeRev(stRev[0]);
  inv.revisions[1] = normalizeRev(stRev[1]);
  inv.revisions[2] = normalizeRev(stRev[2]);

  // ItemRecord.revisions が [[min,max], ...] のとき、未指定なら min を採用 
  if (Array.isArray(itemRecord.revisions)) {
    for (let i = 0; i < 3; i++) {
      if (inv.revisions[i] == null && Array.isArray(itemRecord.revisions[i])) {
        inv.revisions[i] = itemRecord.revisions[i][0] ?? null;
      }
    }
  }

  // === 拡張 / 耐久改良 ===
  inv.exRevision         = state.exRevision != null ? state.exRevision : null;
  inv.durabilityRevision = state.durability != null ? state.durability : null;

  // === UI 選択 op (OP1/2/3) ===
  // state.ops[k] = (prefix.csv family + パラメータ)
  //   flat 系: { familyId, value }
  //   比率上昇系: { familyId, addValue, divisor }
  // state.ops[k] が数値の場合は無効化
  const opEntries = state.ops || [null, null, null];
  if (!state.opsOff) {
    for (let k = 0; k < 3; k++) {
      const e = opEntries[k];
      if (e == null) continue;
      if (typeof e === 'object' && e.familyId != null && e.familyId >= 0) {
        const slot = { familyId: Number(e.familyId), source: 'ui.op' };
        if (e.addValue != null || e.divisor != null) {
          slot.addValue = numOrZero(e.addValue);
          slot.divisor  = numOrZero(e.divisor) || 1;
        } else {
          slot.value = numOrZero(e.value);
        }
        if (e.jobIdx != null) slot.jobIdx = Number(e.jobIdx);
        inv.ops[k] = slot;
      }
    }
  }

  // === Nx 化フラグ ===
  // itemRecord.nxAvailable=true (= "[Nx]" 変種アイテム自体) のときは、item id が
  // 既に Nx 開封済状態を表すので、state.nxActive を省略しても Nx スロット有効。
  // state.nxActive=false を明示した場合のみ強制 off にする。
  if (state.nxActive === false) {
    inv.nxActive = false;
  } else {
    inv.nxActive = !!itemRecord.nxAvailable;
  }

  // === その他付帯 ===
  inv.daybreak = !!state.daybreak;

  // === 必要ステ override ===
  inv.reqStatOverride = computeReqStatOverride(itemRecord, inv);

  // === インベントリ追加 (slotIndex 割当) ===
  if (opts.inventory) {
    return opts.inventory.add(inv);
  }
  return inv;
}

/**
 * 必要ステ override 計算。
 * - 各ステ i について、ItemRecord.req.st[stat] と reqSTType から reqSTTemp を求める
 *   (revision1/2 倍率込)。
 * - 装備に乗っている全 op を走査し、statTargetCode が fixedCap.range 内かつ
 *   statsByIndex が i と一致する op の値で「下げ可能上限 (fixST)」を更新。
 * - fixST < reqSTTemp なら override に fixST をセット。
 *
 * @param {Object} itemRecord
 * @param {import('./inventory.js').InventoryItem} inv
 * @returns {{str:number|null, agi:number|null, con:number|null, int:number|null, wiz:number|null, chs:number|null, luc:number|null}}
 */
export function computeReqStatOverride(itemRecord, inv) {
  /** @type {Record<string, number|null>} */
  const result = Object.fromEntries(STAT_KEYS.map((k) => [k, null]));

  const reqSt     = (itemRecord.req && itemRecord.req.st)     || {};
  const reqStType = (itemRecord.req && itemRecord.req.stType) || [];

  const loader = getLoader();
  const fixedCapRule =
    loader && loader.master && loader.master.statTypes &&
    loader.master.statTypes.statTargetCodeMap &&
    loader.master.statTypes.statTargetCodeMap.fixedCap;

  if (!fixedCapRule) return result;

  for (let i = 0; i < STAT_KEYS.length; i++) {
    const statId = STAT_KEYS[i];
    const reqST  = reqSt[statId];
    if (reqST == null || reqST === 0) continue;

    // 必要ステの倍率 (revision 連動)
    let reqSTTemp = reqST;
    const t = reqStType[i];
    if (t === 1) reqSTTemp *= numOrZero(inv.revisions[0]);
    if (t === 2) reqSTTemp *= numOrZero(inv.revisions[1]);

    // 装備上の全 op を走査して fixST (下げ可能上限) を求める
    // iterateAllOps の yield 形:
    //   - source='item.*' → op は ItemRecord.opSlots の slot 自体 (opId / vals / slotKind)
    //   - その他           → op は OpRef (opId / revisions)
    let fixST = null;
    for (const { op, source } of iterateAllOps(inv, itemRecord)) {
      const baseOp = Op.resolveBase(op.opId);
      if (!baseOp) continue;
      // base slot で baseStat スキーマを持つ slot は、 統計コード経路の意味と乖離するため skip
      // (例: opId=0 は統計コード 14 = 力固定上限 だが、 base 意味は「防御力」)
      if (source === 'item.base' && baseOp.baseStat) continue;
      if (!matchesFixedCapForStat(baseOp.statTargetCode, i, fixedCapRule)) continue;

      let fixSTTemp;
      if (typeof source === 'string' && source.startsWith('item.')) {
        // OpSlot.vals[3]=OPType, vals[4]=主値
        fixSTTemp = resolveFixSTByOPType(
          op.vals ? op.vals[3] : undefined,
          op.vals ? op.vals[4] : undefined,
          inv
        );
      } else {
        // UI 由来 op (ui.op / nx.unlocked / custom.* / bfop / seiren) は axis0 改良値を採用
        fixSTTemp = numOrZero(op.revisions && op.revisions[0]);
      }

      if (fixST == null || fixSTTemp > fixST) fixST = fixSTTemp;
    }

    // 0 以下の fixST は採用しない (= 「要求 0」 になる override は誤マッチの可能性が高い)
    if (fixST != null && fixST > 0 && fixST < reqSTTemp) {
      result[statId] = fixST;
    }
  }

  return result;
}

// =====================================================================
// 内部ヘルパ
// =====================================================================

function normalizeRev(v) {
  if (v == null || v === '' || Number.isNaN(Number(v))) return null;
  return Number(v);
}

function numOrZero(v) {
  if (v == null || Number.isNaN(Number(v))) return 0;
  return Number(v);
}

/**
 * fixedCap ルールで statTargetCode が statIndex 番のステに対応するか。
 *   idx = floor((code - offset) / stride) と statIndex の一致をチェック。
 */
function matchesFixedCapForStat(targetCode, statIndex, rule) {
  if (targetCode == null) return false;
  if (targetCode < rule.range[0] || targetCode > rule.range[1]) return false;
  const offset = rule.offset != null ? rule.offset : rule.range[0];
  const stride = rule.stride || 1;
  const idx = Math.floor((targetCode - offset) / stride);
  return idx === statIndex;
}

/**
 * OPType 別の値決定。
 *  - 0: 固定値 (vals[4])
 *  - 1, 4, 21, 22, 24, 31, 32: axis0 連動
 *  - 2, 23, 25: axis1 連動
 *  - その他: 0 (= 採用しない)
 */
function resolveFixSTByOPType(opType, opValue, inv) {
  switch (opType) {
    case 0: return numOrZero(opValue);
    case 1: case 4: case 21: case 22: case 24: case 31: case 32:
      return numOrZero(inv.revisions[0]);
    case 2: case 23: case 25:
      return numOrZero(inv.revisions[1]);
    default:
      return 0;
  }
}

