

const DATA_BASE = './lib/data/op_convert';
const SOURCES = {
  replica:  DATA_BASE + '/replica.json',
  normal:   DATA_BASE + '/normal.json',
  improved: DATA_BASE + '/normal.json',
  burning:  DATA_BASE + '/burning.json',
  college:  DATA_BASE + '/college.json',
};
const NAME_MAP_URL = DATA_BASE + '/op_name_mapping.json';

export const CONVERTER_LABELS = {
  replica:  'レプリカ',
  normal:   '通常',
  improved: '改',
  burning:  '灼熱',
  college:  '協会',
};

export const PROB_KEY = {
  replica:  'prob',
  normal:   'prob_normal',
  improved: 'prob_improved',
  burning:  'prob',
  college:  'prob',
};

export const CONVERTER_GRADE_REQUIRED = {
  replica:  true,
  normal:   true,
  improved: true,
  burning:  false,   
  college:  false,
};

let _data = null;     
let _nameMap = null;  

const _KIND_TO_COLLEGE_CATEGORY = {
  4: 'college_weapon', 18: 'college_weapon', 20: 'college_weapon', 21: 'college_weapon',
  22: 'college_weapon', 23: 'college_weapon', 25: 'college_weapon', 26: 'college_weapon',
  28: 'college_weapon', 32: 'college_weapon', 58: 'college_weapon', 82: 'college_weapon',
  29: 'college_weapon_pet',
  16: 'college_armor',
  17: 'college_armor',
  10: 'college_ear_cape',
  11: 'college_ear_cape',
  0:  'college_helmet',
  1:  'college_crown',
  6:  'college_belt',
  2:  'college_glove_bracelet',
  5:  'college_glove_bracelet',
  7:  'college_boots',
  8:  'college_necklace',
};

export async function loadOpConvertData() {
  if (_data && _nameMap) return { ..._data, nameMap: _nameMap };
  const [replica, normal, burning, college, nameMap] = await Promise.all([
    fetch(SOURCES.replica).then((r) => r.ok ? r.json() : Promise.reject(new Error('replica.json'))),
    fetch(SOURCES.normal).then((r) => r.ok ? r.json() : Promise.reject(new Error('normal.json'))),
    fetch(SOURCES.burning).then((r) => r.ok ? r.json() : Promise.reject(new Error('burning.json'))),
    fetch(SOURCES.college).then((r) => r.ok ? r.json() : Promise.reject(new Error('college.json'))),
    fetch(NAME_MAP_URL).then((r) => r.ok ? r.json() : Promise.reject(new Error('op_name_mapping.json'))),
  ]);
  _data = { replica, normal, burning, college };
  _nameMap = nameMap;
  return { ..._data, nameMap: _nameMap };
}

const _KIND_TO_NORMAL_CATEGORY = {
  
  4: '1', 18: '1', 20: '1', 21: '1', 22: '1', 23: '1', 25: '1',
  26: '1', 28: '1', 32: '1', 58: '1', 82: '1',
  29: '100',  
  
  17: '700',  
  16: '7',    
  8:  '2',    
  0:  '3',    
  1:  '300',  
  10: '4',    
  11: '4',    
  6:  '5',    
  2:  '6',    
  5:  '6',    
  7:  '8',    
};

const _KIND_TO_BURNING_CATEGORY = {
  
  4: 'rg1', 18: 'rg1', 20: 'rg1', 21: 'rg1', 22: 'rg1', 23: 'rg1', 25: 'rg1',
  26: 'rg1', 28: 'rg1', 29: 'rg1', 32: 'rg1', 58: 'rg1', 82: 'rg1',
  
  17: 'rg3', 
  16: 'rg2', 
  8:  'rg10', 
  0:  'rg5', 
  1:  'rg6', 
  10: 'rg4', 
  11: 'rg4', 
  6:  'rg7', 
  2:  'rg8', 
  5:  'rg8', 
  7:  'rg9', 
};

export function resolveItemCategory(itemRec, converter) {
  if (!itemRec) return null;
  const kind = Number(itemRec.kind);
  if (converter === 'burning') return _KIND_TO_BURNING_CATEGORY[kind] || null;
  if (converter === 'college') return _KIND_TO_COLLEGE_CATEGORY[kind] || null;
  return _KIND_TO_NORMAL_CATEGORY[kind] || null;
}

export function resolveItemGradeForConvert(itemRec) {
  if (!itemRec) return null;
  const g = Number(itemRec.grade);
  if (g === 9) return 'ULT';
  if (g === 8) return 'DXU';
  if (g === 7) return 'normalU';
  
  const name = String(itemRec.name || '');
  if (/ULT|UMU|ウポス/.test(name)) return 'ULT';
  if (/DX/.test(name)) return 'DXU';
  if (itemRec.nxAvailable) return 'normalU';
  return null;
}

function _findTable(data, category_id, grade, slot) {
  if (!data || !Array.isArray(data.tables)) return null;
  return data.tables.find((t) =>
    String(t.category_id) === String(category_id) &&
    (t.grade || null) === (grade || null) &&
    Number(t.slot) === Number(slot)
  ) || null;
}

export function listOptionsForSlot(converter, categoryId, grade, slot) {
  if (!_data) return [];
  const src = (converter === 'improved') ? _data.normal : _data[converter];
  if (!src) return [];
  
  const gradeForLookup = (converter === 'burning' || converter === 'college') ? null : grade;
  const tbl = _findTable(src, categoryId, gradeForLookup, slot);
  if (!tbl) return [];
  const probKey = PROB_KEY[converter];

  

  return tbl.options.map((o) => ({
    name:  o.name,
    value: o.value,
    prob:  Number(o[probKey] || 0),
  }));
}

export function resolveOpName(name) {
  if (!_nameMap || !_nameMap.mapping) return null;
  if (!name) return null;
  
  let v = _nameMap.mapping[name];
  if (v == null) {

    
    const normalized = String(name)
      .replace(/LV(\d)/g, 'Lv$1')
      .replace(/　/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    v = _nameMap.mapping[normalized];
  }
  if (v == null) return null;
  if (typeof v === 'number') return { familyId: v };
  if (typeof v === 'string') {
    
    if (v.startsWith('STAT:'))  return { statId: v.slice(5) };
    
    if (v.startsWith('OPID:'))  return { opId: Number(v.slice(5)) };
  }
  return null;
}

function parseOpConvertValue(raw) {
  if (raw == null) return { value: 0 };
  if (typeof raw === 'number') return { value: raw };
  const s = String(raw).trim();
  
  const ratioMatch = s.match(/^\+?(\d+)\s*\/\s*(\d+)/);
  if (ratioMatch) {
    return { addValue: Number(ratioMatch[1]) || 0, divisor: Number(ratioMatch[2]) || 1 };
  }
  
  const numMatch = s.match(/^([+\-]?\d+(?:\.\d+)?)/);
  if (numMatch) return { value: Number(numMatch[1]) || 0 };
  return { value: 0 };
}

export function buildOpConvertSlot(opEntry, converter) {
  if (!opEntry || !opEntry.name) return null;
  const resolved = resolveOpName(opEntry.name);
  const parsed = parseOpConvertValue(opEntry.value);
  const base = {
    source:        'nx.unlocked',
    _nxConverted:  true,
    ocConverter:   converter,
    ocName:        opEntry.name,
    ocValue:       opEntry.value,    
  };
  if (!resolved) {
    
    return {
      ...base,
      familyId:       -1,
      value:          parsed.value || 0,
      isDisplayOnly:  true,
    };
  }
  
  if (parsed.addValue != null && resolved.familyId != null) {
    return {
      ...base,
      familyId: resolved.familyId,
      addValue: parsed.addValue,
      divisor:  parsed.divisor,
    };
  }
  
  if (resolved.familyId != null) {
    return { ...base, familyId: resolved.familyId, value: parsed.value || 0 };
  }
  if (resolved.statId) {
    return { ...base, statId: resolved.statId, value: parsed.value || 0 };
  }

  if (resolved.opId != null) {
    return {
      ...base,
      opId:          resolved.opId,
      value:         parsed.value || 0,
      isDisplayOnly: true,
    };
  }
  return { ...base, familyId: -1, value: parsed.value || 0, isDisplayOnly: true };
}
