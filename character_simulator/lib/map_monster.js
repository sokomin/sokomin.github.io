

const BASE_MAP_DB   = 'https://sokomin.github.io/map/database/';
const BASE_REPO_DB  = 'https://sokomin.github.io/sokomin_repository/db/';

const URL_NAME_LIST       = BASE_MAP_DB  + 'mapdata.js';

const URL_MAP_SUB_INFO    = BASE_MAP_DB  + 'mapdata_sub.js';
const URL_MAP_MOB_TABLE   = BASE_REPO_DB + 'map2_2023.csv';
const URL_MONSTER_TABLE   = BASE_REPO_DB + 'monster.csv';

const EXCLUDED_MAP_IDS = new Set([9999, 27, 28, 438, 799]);

const MONSTER_IMG_BASE = 'https://sokomin.github.io/monster/design/image/monster/';

let _initPromise = null;       
let _nameList    = {};         
let _mapSubInfo  = {};         
let _mapMobRows  = [];         
let _mobById     = new Map();  

export async function loadMapMonsterIndex() {
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const [nameListText, subInfoText, mapMobCsv, monsterCsv] = await Promise.all([
      fetchText(URL_NAME_LIST),
      fetchText(URL_MAP_SUB_INFO),
      fetchText(URL_MAP_MOB_TABLE),
      fetchText(URL_MONSTER_TABLE),
    ]);
    _nameList   = evalAssignedGlobal(nameListText, 'NameList');
    _mapSubInfo = evalAssignedGlobal(subInfoText, 'MapSubInfoList');
    _mapMobRows = parseCsv(mapMobCsv);
    const monsterRows = parseCsv(monsterCsv);
    for (const row of monsterRows) {
      const mob = normalizeMonster(row);
      if (mob == null) continue;
      _mobById.set(mob.id, mob);
    }
  })();
  return _initPromise;
}

export function getMapList() {

  const ids = new Set();
  for (const k of Object.keys(_nameList   || {})) ids.add(Number(k));
  for (const k of Object.keys(_mapSubInfo || {})) ids.add(Number(k));
  const list = [];
  for (const id of ids) {
    if (EXCLUDED_MAP_IDS.has(id)) continue;
    const meta = getMapMeta(id);
    if (meta == null) continue;
    if (!meta.name) continue;  
    list.push({ id: meta.id, name: meta.name, lvmin: meta.lvmin, lvmax: meta.lvmax });
  }
  list.sort((a, b) => a.id - b.id);
  return list;
}

export function getMapMeta(mapId) {
  const id = Number(mapId);
  const n  = _nameList[id];
  const s  = _mapSubInfo[id];
  if (!n && !s) return null;
  return {
    id,
    name:  (n && n.name)  || (s && s.name) || '',
    lvmin: n ? Number(n.lvmin) : (s && Number(s.lvmin)) || 0,
    lvmax: n ? Number(n.lvmax) : (s && Number(s.lvmax)) || 0,
    img:   (n && n.img)  || '',
    subInfo: s ? {
      dfi:        Number(s.dfi)        || 0,
      dwa:        Number(s.dwa)        || 0,
      dwi:        Number(s.dwi)        || 0,
      dea:        Number(s.dea)        || 0,
      dli:        Number(s.dli)        || 0,
      dda:        Number(s.dda)        || 0,
      st_down:    Number(s.st_down)    || 0,
      lbd:        Number(s.lbd)        || 0,
      req_map_lv: Number(s.req_map_lv) || 0,
      mc:         s.mc || '',
      mc2:        Number(s.mc2) || 0,
    } : null,
  };
}

export function getMonstersForMap(mapId) {
  const id = Number(mapId);

  const result = [];
  const seen = new Set();  
  for (const row of _mapMobRows) {
    if (Number(row.mapid) !== id) continue;
    const mobid = Number(row.mobid);
    if (!Number.isFinite(mobid)) continue;
    const mob = _mobById.get(mobid);
    if (mob == null) continue;
    
    const key = mobid + ':' + row.name + ':' + row.lvmin + ':' + row.lvmax;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({
      mapMobName: row.name || '',
      lvMin:      Number(row.lvmin) || 0,
      lvMax:      Number(row.lvmax) || 0,
      width:      Number(row.width) || 0,
      height:     Number(row.height) || 0,
      monster:    mob,
    });
  }
  return result;
}

export function getMonsterById(mobid) {
  return _mobById.get(Number(mobid)) || null;
}

export function searchMaps(query) {
  const q = normalizeQuery(query);
  const list = getMapList();
  if (q === '') return list;
  return list.filter((m) => normalizeQuery(m.name).indexOf(q) !== -1);
}

export function getMonsterImageUrl(mob) {
  if (!mob) return '';

  
  
  let hex = Number(mob.effectId).toString(16);
  hex = ('0' + hex).slice(-3);
  return MONSTER_IMG_BASE + '0' + hex + '000' + Number(mob.effectId2) + '.png';
}

function normalizeQuery(s) {
  if (s == null) return '';
  return String(s).toLowerCase().replace(/\s+/g, '');
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('fetch failed: ' + url + ' status=' + res.status);
  return res.text();
}

function evalAssignedGlobal(scriptText, varName) {
  const fn = new Function(scriptText + ';\nreturn typeof ' + varName + ' !== "undefined" ? ' + varName + ' : null;');
  const result = fn();
  return result || {};
}

function parseCsv(text) {
  const out = [];
  if (text == null) return out;
  
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const lines = text.split(/\r?\n/);
  if (lines.length === 0) return out;
  const headers = splitCsvLine(lines[0]);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const cells = splitCsvLine(line);
    if (cells.length === 0) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = cells[j] != null ? cells[j] : '';
    }
    out.push(obj);
  }
  return out;
}

function splitCsvLine(line) {
  return line.split(',').map((s) => s.replace(/^"|"$/g, ''));
}

function normalizeMonster(row) {
  if (!row) return null;
  const idRaw = row['id'];
  if (idRaw === '' || idRaw == null) return null;
  const id = Number(idRaw);
  if (!Number.isFinite(id)) return null;
  return {
    id,
    name:        row['name'] || '',
    effectId:    Number(row['EffectId'])    || 0,
    effectId1:   Number(row['EffectId_1'])  || 0,
    effectId2:   Number(row['EffectId_2'])  || 0,
    species:     Number(row['Species'])     || 0,
    lineage:     Number(row['Lineage'])     || 0,
    statusFactor:    Number(row['StatusFactor'])    || 0,
    atcMinBonus: Number(row['AtcMinValueBonus']) || 0,
    atcMaxBonus: Number(row['AtcMaxValueBonus']) || 0,
    defBonus:    Number(row['DefenseValueBonus']) || 0,
    movSpeed:    Number(row['MovSpeed'])    || 0,
    atcSpeed:    Number(row['AtcSpeed'])    || 0,
    blocking:    Number(row['Blocking'])    || 0,
    defaultHp:   Number(row['DefaultHP'])   || 0,
    activeRange: Number(row['ActiveRange']) || 0,
    atcMin:      Number(row['AtcMinValue']) || 0,
    atcMax:      Number(row['AtcMaxValue']) || 0,
    def:         Number(row['DefenseValue']) || 0,

    str: Number(row['STR']) || 0,
    agi: Number(row['AGI']) || 0,
    con: Number(row['CON']) || 0,
    intl: Number(row['INT']) || 0,
    wis: Number(row['WIS']) || 0,
    chs: Number(row['CHS']) || 0,
    luc: Number(row['LUC']) || 0,
    
    fireRes:  Number(row['FireResistance'])  || 0,
    waterRes: Number(row['WaterResistance']) || 0,
    windRes:  Number(row['WindResistance'])  || 0,
    earthRes: Number(row['EarthResistance']) || 0,
    lightRes: Number(row['LightResistance']) || 0,
    darkRes:  Number(row['DarkResistance'])  || 0,
    
    resistance1:  Number(row['Resistance1'])  || 0,
    resistance2:  Number(row['Resistance2'])  || 0,
    resistance3:  Number(row['Resistance3'])  || 0,
    resistance4:  Number(row['Resistance4'])  || 0,
    resistance5:  Number(row['Resistance5'])  || 0,
    resistance6:  Number(row['Resistance6'])  || 0,
    resistance7:  Number(row['Resistance7'])  || 0,
    resistance8:  Number(row['Resistance8'])  || 0,
    resistance9:  Number(row['Resistance9'])  || 0,
    resistance10: Number(row['Resistance10']) || 0,
    resistance11: Number(row['Resistance11']) || 0,
    resistance12: Number(row['Resistance12']) || 0,
    resistance13: Number(row['Resistance13']) || 0,
    
    defaultExp:  Number(row['DefaultExp']) || 0,
    levelUpBonus: Number(row['LevelUpBonus']) || 0,
    conditionBonus: Number(row['ConditionBonus']) || 0,
  };
}

export const MOB_SPEC_LABEL = {
  0: 'アンデット型',
  1: '人間型',
  2: '悪魔型',
  3: '動物型',
  4: '神獣型',
  5: '位相型',
};
export const MOB_RANK_LABEL = {
  0: '一般1', 1: '一般2', 2: '一般3', 3: '一般4',
  4: 'セミボス1', 5: 'セミボス2', 6: 'セミボス3',
  7: 'ボス1', 8: 'ボス2', 9: 'ボス3',
};
