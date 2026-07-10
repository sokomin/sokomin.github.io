

const SCHEMA_VERSION = 'rs-character-sim-v1';

const MIB = 1024 * 1024;
export const SESSION_CAPACITY_MODEL = Object.freeze({
  inventoryEntries: 84,
  inventoryBytesPerEntry: 8 * 1024,
  creatureEntries: 54,
  creatureBytesPerEntry: 2 * 1024,
  skillJobs: 26,
  skillBytesPerJob: 8 * 1024,
  otherFeatureReserveBytes: 256 * 1024,
});
const SESSION_CALCULATED_MAX_BYTES =
  SESSION_CAPACITY_MODEL.inventoryEntries * SESSION_CAPACITY_MODEL.inventoryBytesPerEntry
  + SESSION_CAPACITY_MODEL.creatureEntries * SESSION_CAPACITY_MODEL.creatureBytesPerEntry
  + SESSION_CAPACITY_MODEL.skillJobs * SESSION_CAPACITY_MODEL.skillBytesPerJob
  + SESSION_CAPACITY_MODEL.otherFeatureReserveBytes;
export const SESSION_EXPECTED_MAX_BYTES = Math.ceil(SESSION_CALCULATED_MAX_BYTES / MIB) * MIB;
export const SESSION_UPLOAD_MAX_BYTES = SESSION_EXPECTED_MAX_BYTES * 10;

const SESSION_TOP_LEVEL_KEYS = new Set([
  'v', 'saved', 'character', 'inventory', 'settings', 'skills', 'creature',
  'titles', 'dragon', 'missionBook', 'potential', 'costume', 'transSkill',
  'bloodRecord', 'omniSkill', 'badges', 'mapMonster', 'pet', 'minipet', 'guild',
]);
const DANGEROUS_OBJECT_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const SESSION_MAX_DEPTH = 24;
const SESSION_MAX_ARRAY_LENGTH = 1024;
const SESSION_MAX_OBJECT_KEYS = 2048;
const SESSION_MAX_STRING_LENGTH = 16 * 1024;
const SESSION_MAX_NODES = 250000;

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function utf8Length(text) {
  return new TextEncoder().encode(String(text)).length;
}

function validateJsonTree(value, path, depth, budget, seen) {
  if (depth > SESSION_MAX_DEPTH) throw new Error(`${path}: nesting is too deep`);
  budget.nodes++;
  if (budget.nodes > SESSION_MAX_NODES) throw new Error('session contains too many values');

  if (value == null || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error(`${path}: number must be finite`);
    return;
  }
  if (typeof value === 'string') {
    if (value.length > SESSION_MAX_STRING_LENGTH) throw new Error(`${path}: string is too long`);
    return;
  }
  if (typeof value !== 'object') throw new Error(`${path}: unsupported value type`);
  if (seen.has(value)) throw new Error(`${path}: cyclic data is not allowed`);
  seen.add(value);

  if (Array.isArray(value)) {
    if (value.length > SESSION_MAX_ARRAY_LENGTH) throw new Error(`${path}: array is too long`);
    for (let i = 0; i < value.length; i++) validateJsonTree(value[i], `${path}[${i}]`, depth + 1, budget, seen);
  } else {
    if (!isPlainObject(value)) throw new Error(`${path}: object must be plain JSON data`);
    const keys = Object.keys(value);
    if (keys.length > SESSION_MAX_OBJECT_KEYS) throw new Error(`${path}: object has too many keys`);
    for (const key of keys) {
      if (DANGEROUS_OBJECT_KEYS.has(key)) throw new Error(`${path}: forbidden key ${key}`);
      validateJsonTree(value[key], `${path}.${key}`, depth + 1, budget, seen);
    }
  }
  seen.delete(value);
}

function assertOptionalObject(data, key) {
  if (data[key] != null && !isPlainObject(data[key])) throw new Error(`persistence: ${key} must be an object`);
}

export function validateSessionData(data) {
  if (!isPlainObject(data)) throw new Error('persistence: invalid data (not object)');
  for (const key of Object.keys(data)) {
    if (!SESSION_TOP_LEVEL_KEYS.has(key)) throw new Error(`persistence: unknown top-level key ${key}`);
  }
  if (data.v != null && typeof data.v !== 'string') throw new Error('persistence: v must be a string');
  if (data.saved != null && typeof data.saved !== 'string') throw new Error('persistence: saved must be a string');
  assertOptionalObject(data, 'character');
  if (data.inventory != null && !Array.isArray(data.inventory)) throw new Error('persistence: inventory must be an array');
  if ((data.inventory?.length || 0) > SESSION_CAPACITY_MODEL.inventoryEntries) {
    throw new Error(`persistence: inventory exceeds ${SESSION_CAPACITY_MODEL.inventoryEntries} entries`);
  }
  for (const key of ['settings', 'skills', 'creature', 'titles', 'dragon', 'missionBook', 'potential',
    'costume', 'transSkill', 'bloodRecord', 'omniSkill', 'badges', 'mapMonster', 'pet', 'minipet', 'guild']) {
    assertOptionalObject(data, key);
  }
  if (data.skills && Object.keys(data.skills).length > 32) throw new Error('persistence: too many skill job states');
  if ((data.creature?.inventory?.length || 0) > SESSION_CAPACITY_MODEL.creatureEntries) {
    throw new Error(`persistence: creature inventory exceeds ${SESSION_CAPACITY_MODEL.creatureEntries} entries`);
  }
  if ((data.creature?.slots?.length || 0) > 4 || (data.creature?.equipped?.length || 0) > 4) {
    throw new Error('persistence: creature slots exceed 4 entries');
  }
  if ((data.pet?.slots?.length || 0) > 3) throw new Error('persistence: pet slots exceed 3 entries');
  if ((data.minipet?.slots?.length || 0) > 2) throw new Error('persistence: minipet slots exceed 2 entries');

  validateJsonTree(data, '$', 0, { nodes: 0 }, new WeakSet());
  const encoded = JSON.stringify(data);
  if (utf8Length(encoded) > SESSION_UPLOAD_MAX_BYTES) {
    throw new Error(`persistence: session exceeds ${SESSION_UPLOAD_MAX_BYTES} bytes`);
  }
  return data;
}

function cloneStones(stones) {
  if (!stones || typeof stones !== 'object') return null;
  const out = {};
  for (const k of Object.keys(stones)) {
    const s = stones[k];
    if (!s) continue;
    out[k] = {
      stage: Number(s.stage) || 0,
      skills: Array.isArray(s.skills) ? s.skills.map((v) => Number(v) || 0) : [],
    };
  }
  return out;
}

export function serializeSession(character, inventory, opts = {}) {
  const invArr = [];
  for (const inv of inventory.items()) {
    const entry = {
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
        
        rowId:     o.rowId     ?? null,
        
        name:      o.name      ?? null,
        
        opId:      o.opId      ?? null,
        revisions: [...(o.revisions || [0, 0, 0])],
      } : null),
      daybreak:     !!inv.daybreak,
      equippedSlot: inv.equippedSlot ?? null,
    };

    

    if (inv.seirenStage && inv.seirenStage > 0) {
      entry.seirenStage = Math.max(0, Math.min(15, Number(inv.seirenStage) || 0));
      entry.seirenOps = (inv.seirenOps || []).map((o) => o ? {
        familyId:    o.familyId    ?? null,
        value:       o.value       ?? null,
        addValue:    o.addValue    ?? null,
        divisor:     o.divisor     ?? null,
        jobIdx:      o.jobIdx      ?? null,
        rowId:       o.rowId       ?? null,
        name:        o.name        ?? null,
        displayOnly: o.displayOnly ?? null,

        seirenSel:   o.seirenSel   ?? null,
        seirenName:  o.seirenName  ?? null,
        seirenTier:  o.seirenTier  ?? null,
      } : null);
    }

    

    
    
    if (typeof inv.nxUnlockedCount === 'number' && inv.nxUnlockedCount !== 4) {
      entry.nxUnlockedCount = Math.max(0, Math.min(4, inv.nxUnlockedCount));
    }
    if (Array.isArray(inv.nxUnlockedOps) && inv.nxUnlockedOps.some((s) => s != null)) {
      entry.nxUnlockedOps = inv.nxUnlockedOps.slice(0, 4).map((s) => {
        if (!s) return null;
        
        if (s.ocName != null) {
          return {
            key:       s.nsOpenKey ?? null,
            name:      String(s.ocName),
            value:     s.ocValue ?? null,
            converter: s.ocConverter || 'normal',
          };
        }
        
        if (s.bfId) {
          return {
            id:    String(s.bfId),
            grade: (s.bfGrade === 'white') ? 'white' : 'black',
            tier:  s.bfTier || 'top',
          };
        }
        return null;
      });
    }

    
    
    if (inv.bfop && inv.bfop.bfId) {
      entry.bfop = {
        id:    String(inv.bfop.bfId),
        grade: (inv.bfop.bfGrade === 'white') ? 'white' : 'black',
        tier:  inv.bfop.bfTier || 'top',
      };
    }

    
    if (inv.ultLv != null) entry.ultLv = inv.ultLv;

    
    if (inv.incusedRingLv != null && Number(inv.incusedRingLv) !== 1) {
      entry.incusedRingLv = Math.max(1, Math.min(30, Number(inv.incusedRingLv) | 0));
    }

    if (inv.arcana && inv.arcana.key) {
      entry.arcana = {
        table: (inv.arcana.table === 'pet') ? 'pet' : 'normal',
        key:   String(inv.arcana.key),
        tier:  Math.max(0, Math.min(1, Number(inv.arcana.tier) || 0)),
      };
    }
    if (inv.nonstandard) {
      entry.nonstandard = {
        grade: String(inv.nonstandard.grade || 'ult'),
        slotCount: Math.max(0, Math.min(5, Number(inv.nonstandard.slotCount) || 0)),
        ops: Array.isArray(inv.nonstandard.ops)
          ? inv.nonstandard.ops.map((op) => op ? {
              key:  op.key  ?? null,
              name: op.name ?? null,
              tier: op.tier ?? null,
            } : null)
          : [],
        openConverter: String(inv.nonstandard.openConverter || ''),
        openOps: Array.isArray(inv.nonstandard.openOps)
          ? inv.nonstandard.openOps.map((op) => op ? {
              key:   op.key   ?? null,
              name:  op.name  ?? null,
              value: op.value ?? null,
              stage: op.stage ?? null,
            } : null)
          : [],
      };
    }

    if (inv.scroll && inv.scroll.id) {
      entry.scroll = {
        type:  inv.scroll.type ?? null,
        id:    String(inv.scroll.id),
        stage: Math.max(1, Math.min(5, Number(inv.scroll.stage) || 1)),
      };
    }
    if (Array.isArray(inv.customBaseOps) && inv.customBaseOps.some((s) => s != null)) {
      entry.customBaseOps = inv.customBaseOps.slice(0, 5).map((s) => s ? {
        source:   s.source   ?? null,
        nsName:   s.nsName   ?? null,
        nsTier:   s.nsTier   ?? null,
        nsMin:    s.nsMin    ?? null,
        nsMax:    s.nsMax    ?? null,
        ultKey:   s.ultKey   ?? null,
        
        abrKey:   s.abrKey   ?? null,
        abrTier:  s.abrTier  ?? null,
        
        arcanaKey:   s.arcanaKey   ?? null,
        arcanaTier:  s.arcanaTier  ?? null,
        arcanaTable: s.arcanaTable ?? null,
        familyId: s.familyId ?? null,
        opId:     s.opId     ?? null,
        statId:   s.statId   ?? null,
        stats:    Array.isArray(s.stats) ? [...s.stats] : null,
        value:    s.value    ?? null,
        vals:     Array.isArray(s.vals) ? [...s.vals] : null,
        addValue: s.addValue ?? null,
        divisor:  s.divisor  ?? null,
        isDisplayOnly: !!s.isDisplayOnly,
      } : null);
    }
    invArr.push(entry);
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
      stones:            cloneStones(character.stones),
    },
    inventory: invArr,
  };
}

export function deserializeSession(data) {
  validateSessionData(data);
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
    if (utf8Length(s) > SESSION_UPLOAD_MAX_BYTES) throw new Error('stored session is too large');
    const data = JSON.parse(s);
    validateSessionData(data);
    return data;
  } catch (err) {
    console.warn('[persistence] localStorage load failed:', err);
    return null;
  }
}

export function removeFromLocalStorage(key) {
  try { localStorage.removeItem(key); return true; }
  catch (err) { return false; }
}

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

export function uploadJsonFile(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > SESSION_UPLOAD_MAX_BYTES) {
      alert(`ファイルが大きすぎます。上限は ${SESSION_UPLOAD_MAX_BYTES / MIB} MiB です。`);
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const text = String(ev.target.result);
        if (utf8Length(text) > SESSION_UPLOAD_MAX_BYTES) throw new Error('session file is too large');
        const data = JSON.parse(text);
        validateSessionData(data);
        await callback(data);
      } catch (err) {
        alert('セッション読込エラー: ' + (err && err.message ? err.message : err));
      }
    };
    reader.onerror = () => alert('セッションファイルを読み込めませんでした。');
    reader.readAsText(f);
  });
  
  input.click();
}
