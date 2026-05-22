


const SCHEMA_VERSION = 'rs-character-sim-v1';

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

    
    if (inv.ultLv != null) entry.ultLv = inv.ultLv;
    if (Array.isArray(inv.customBaseOps) && inv.customBaseOps.some((s) => s != null)) {
      entry.customBaseOps = inv.customBaseOps.slice(0, 3).map((s) => s ? {
        ultKey:   s.ultKey   ?? null,
        familyId: s.familyId ?? null,
        opId:     s.opId     ?? null,
        value:    s.value    ?? null,
        vals:     Array.isArray(s.vals) ? [...s.vals] : null,
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
  
  input.click();
}
