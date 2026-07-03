

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
