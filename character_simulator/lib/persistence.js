// persistence.js — キャラ + インベントリ状態の保存/読込
//
// 公開 API:
//   serializeSession(character, inventory, opts?)
//   deserializeSession(data)
//   saveToLocalStorage(key, data)
//   loadFromLocalStorage(key)
//   downloadJsonFile(filename, data)
//   uploadJsonFile(callback)
//
// JSON フォーマット:
//   {
//     "v":       "rs-character-sim-v1",  // バージョン (deserialize 時の互換チェック)
//     "saved":   "ISO timestamp",
//     "character": {
//       "realLv": 1250, "job": 0,
//       "lvRevision": 0, "miniPetLvRevision": 0,
//       "rebirth": 0,                    // 転生回数
//       "grace":   -1,                    // 恩寵 ID (-1=なし)
//       "base":    { str, agi, con, int, wiz, chs, luc }
//     },
//     "inventory": [
//       {
//         "slotIndex":     0,
//         "itemId":        10775,
//         "revisions":     [0, 0, 0],
//         "exRevision":    null,
//         "durabilityRevision": null,
//         "ops":           [{ familyId, value, addValue?, divisor?, jobIdx? }, null, null],
//         "daybreak":      false,
//         "equippedSlot":  "neck"          // 装着位置 (ring_N を含む)
//       },
//       ...
//     ]
//   }

const SCHEMA_VERSION = 'rs-character-sim-v1';

/**
 * 現在のキャラ + インベントリを JSON 互換オブジェクトにシリアライズ。
 * @param {Object} character    Character (readCharacter() 戻り値)
 * @param {Object} inventory    Inventory インスタンス (items() で列挙)
 * @param {{ rebirth?: number, grace?: number }} [opts]
 * @returns {Object}
 */
export function serializeSession(character, inventory, opts = {}) {
  const invArr = [];
  for (const inv of inventory.items()) {
    invArr.push({
      slotIndex:          inv.slotIndex,
      itemId:             inv.itemId,
      revisions:          [...(inv.revisions || [null, null, null])],
      exRevision:         inv.exRevision ?? null,
      durabilityRevision: inv.durabilityRevision ?? null,
      ops: (inv.ops || []).map((o) => o ? {
        familyId:  o.familyId ?? null,
        value:     o.value     ?? null,
        addValue:  o.addValue  ?? null,
        divisor:   o.divisor   ?? null,
        jobIdx:    o.jobIdx    ?? null,
        // 互換: opId/revisions を持つ古いスナップショット用にも残す
        opId:      o.opId      ?? null,
        revisions: [...(o.revisions || [0, 0, 0])],
      } : null),
      daybreak:     !!inv.daybreak,
      equippedSlot: inv.equippedSlot ?? null,
    });
  }
  return {
    v:     SCHEMA_VERSION,
    saved: new Date().toISOString(),
    character: {
      realLv:            character.realLv,
      job:               character.job,
      gender:            character.gender,
      lvRevision:        character.lvRevision || 0,
      miniPetLvRevision: character.miniPetLvRevision || 0,
      rebirth:           opts.rebirth ?? 0,
      grace:             opts.grace   ?? -1,
      kuroneTransTime:   character.kuroneTransTime || 0,
      base:              { ...(character.stats?.base || {}) },
    },
    inventory: invArr,
  };
}

/**
 * シリアライズされた JSON オブジェクトから読み込み用データを返す。
 * 呼び出し側で makeItem 等を使って実 InventoryItem に復元する。
 * @param {Object} data
 * @returns {{ character: Object, inventory: Object[], rebirth: number, grace: number }}
 */
export function deserializeSession(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('persistence: invalid data (not object)');
  }
  if (typeof data.v === 'string' && data.v !== SCHEMA_VERSION && !data.v.startsWith('2026-')) {
    console.warn('[persistence] schema version mismatch:', data.v);
  }
  return {
    character: data.character || {},
    inventory: Array.isArray(data.inventory) ? data.inventory : [],
    rebirth:   data.character?.rebirth ?? 0,
    grace:     data.character?.grace ?? -1,
  };
}

// ===================================================================
// localStorage (autosave / autoload)
// ===================================================================

export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('[persistence] localStorage save failed:', err);
    return false;
  }
}

export function loadFromLocalStorage(key) {
  try {
    const s = localStorage.getItem(key);
    if (!s) return null;
    return JSON.parse(s);
  } catch (err) {
    console.warn('[persistence] localStorage load failed:', err);
    return null;
  }
}

export function removeFromLocalStorage(key) {
  try { localStorage.removeItem(key); return true; }
  catch (err) { return false; }
}

// ===================================================================
// ファイル入出力 (.json)
// ===================================================================

/**
 * JSON データをファイルダウンロード (= ユーザーの DL フォルダに保存)。
 * @param {string} filename
 * @param {Object} data
 */
export function downloadJsonFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * ファイル選択ダイアログを開いて .json を読み込み、callback(data) を呼ぶ。
 * @param {(data: Object) => void} callback
 */
export function uploadJsonFile(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(String(ev.target.result));
        callback(data);
      } catch (err) {
        alert('JSON parse error: ' + (err && err.message ? err.message : err));
      }
    };
    reader.readAsText(f);
  });
  // input は body に attach しない (ブラウザ非依存で click() は動く)
  input.click();
}
