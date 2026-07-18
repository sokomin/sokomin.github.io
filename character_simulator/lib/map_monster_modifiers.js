

export const IDENTITY_MODIFIER = Object.freeze({
  hpMul:   1.0,
  atkMul:  1.0,
  defMul:  1.0,
  statMul: 1.0,
  damageCutPct: 0,
  resAdd:  Object.freeze({ fire: 0, water: 0, wind: 0, earth: 0, light: 0, dark: 0 }),
  extraNotes: '',
});

export const MAP_MONSTER_MOD_TABLE = {
  
};

const MODIFIER_CSV_URL = './lib/data/map_monster_modifiers.csv';
const SECRET_MODIFIER_CSV_URL = './lib/data/secret_map_monster_modifiers.csv';
let csvModifierTable = {};
let secretCsvModifierTable = {};
let csvLoadPromise = null;

export async function loadMapMonsterModifiers(url = MODIFIER_CSV_URL) {
  if (csvLoadPromise) return csvLoadPromise;
  csvLoadPromise = (async () => {
    const [res, secretRes] = await Promise.all([fetch(url), fetch(SECRET_MODIFIER_CSV_URL)]);
    if (!res.ok) throw new Error('fetch failed: ' + url + ' status=' + res.status);
    if (!secretRes.ok) throw new Error('fetch failed: ' + SECRET_MODIFIER_CSV_URL + ' status=' + secretRes.status);
    csvModifierTable = parseModifierCsv(await res.text());
    secretCsvModifierTable = parseSecretModifierCsv(await secretRes.text());
    return csvModifierTable;
  })();
  return csvLoadPromise;
}

export function getSecretMapMonsterModifier(secretKey) {
  const override = secretCsvModifierTable[String(secretKey || '')];
  return mergeWithIdentity(override);
}

export function getMapMonsterModifier(mapId) {
  const id = Number(mapId);
  const override = resolveModifier(id);
  if (!override) return IDENTITY_MODIFIER;
  return {
    hpMul:   override.hpMul   ?? 1.0,
    atkMul:  override.atkMul  ?? 1.0,
    defMul:  override.defMul  ?? 1.0,
    statMul: override.statMul ?? 1.0,
    damageCutPct: override.damageCutPct ?? 0,
    resAdd: {
      fire:  override.resAdd?.fire  ?? 0,
      water: override.resAdd?.water ?? 0,
      wind:  override.resAdd?.wind  ?? 0,
      earth: override.resAdd?.earth ?? 0,
      light: override.resAdd?.light ?? 0,
      dark:  override.resAdd?.dark  ?? 0,
    },
    extraNotes: override.extraNotes || '',
  };
}

export function applyMapSubInfoToMonster(rawMonster, subInfo) {
  if (!rawMonster) return null;
  if (!subInfo)    return rawMonster;
  return {
    ...rawMonster,
    fireRes:  rawMonster.fireRes  - (Number(subInfo.dfi) || 0),
    waterRes: rawMonster.waterRes - (Number(subInfo.dwa) || 0),
    windRes:  rawMonster.windRes  - (Number(subInfo.dwi) || 0),
    earthRes: rawMonster.earthRes - (Number(subInfo.dea) || 0),
    lightRes: rawMonster.lightRes - (Number(subInfo.dli) || 0),
    darkRes:  rawMonster.darkRes  - (Number(subInfo.dda) || 0),
  };
}

export function applyMapMonsterModifier(rawMonster, modifier) {
  if (!rawMonster) return null;
  const m = modifier || IDENTITY_MODIFIER;
  return {
    ...rawMonster,
    defaultHp: Math.round(rawMonster.defaultHp * m.hpMul),
    atcMin:    Math.round(rawMonster.atcMin    * m.atkMul),
    atcMax:    Math.round(rawMonster.atcMax    * m.atkMul),
    def:       Math.round(rawMonster.def       * m.defMul),
    str:       Math.round(rawMonster.str * m.statMul),
    agi:       Math.round(rawMonster.agi * m.statMul),
    con:       Math.round(rawMonster.con * m.statMul),
    intl:      Math.round(rawMonster.intl * m.statMul),
    wis:       Math.round(rawMonster.wis * m.statMul),
    chs:       Math.round(rawMonster.chs * m.statMul),
    luc:       Math.round(rawMonster.luc * m.statMul),
    fireRes:   rawMonster.fireRes  + m.resAdd.fire,
    waterRes:  rawMonster.waterRes + m.resAdd.water,
    windRes:   rawMonster.windRes  + m.resAdd.wind,
    earthRes:  rawMonster.earthRes + m.resAdd.earth,
    lightRes:  rawMonster.lightRes + m.resAdd.light,
    darkRes:   rawMonster.darkRes  + m.resAdd.dark,
    damageCutPct: m.damageCutPct || 0,
  };
}

function resolveModifier(mapId, seen = new Set()) {
  if (!Number.isFinite(mapId) || seen.has(mapId)) return null;
  seen.add(mapId);
  const tableModifier = MAP_MONSTER_MOD_TABLE[mapId];
  const csvModifier = csvModifierTable[mapId];
  const inherited = Number.isFinite(csvModifier?.inheritMapId)
    ? resolveModifier(csvModifier.inheritMapId, seen)
    : null;
  return mergeModifier(inherited, mergeModifier(tableModifier, csvModifier));
}

function mergeModifier(base, csv) {
  if (!base) return csv || null;
  if (!csv) return base;
  return {
    hpMul: csv.hpMul ?? base.hpMul,
    atkMul: csv.atkMul ?? base.atkMul,
    defMul: csv.defMul ?? base.defMul,
    statMul: csv.statMul ?? base.statMul,
    damageCutPct: csv.damageCutPct ?? base.damageCutPct,
    inheritMapId: csv.inheritMapId ?? base.inheritMapId,
    resAdd: {
      fire: csv.resAdd?.fire ?? base.resAdd?.fire,
      water: csv.resAdd?.water ?? base.resAdd?.water,
      wind: csv.resAdd?.wind ?? base.resAdd?.wind,
      earth: csv.resAdd?.earth ?? base.resAdd?.earth,
      light: csv.resAdd?.light ?? base.resAdd?.light,
      dark: csv.resAdd?.dark ?? base.resAdd?.dark,
    },
    extraNotes: csv.extraNotes || base.extraNotes || '',
  };
}

function parseModifierCsv(text) {
  const out = {};
  if (text == null) return out;
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length <= 1) return out;
  const headers = splitCsvLine(lines[0]).map((h) => h.trim());
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    const row = {};
    for (let j = 0; j < headers.length; j++) row[headers[j]] = cells[j] != null ? cells[j].trim() : '';
    const mapId = Number(row.mapId);
    if (!Number.isFinite(mapId)) continue;
    out[mapId] = {
      hpMul: readOptionalNumber(row.hpMul),
      atkMul: readOptionalNumber(row.atkMul),
      defMul: readOptionalNumber(row.defMul),
      statMul: readOptionalNumber(row.statMul),
      inheritMapId: readOptionalNumber(row.inheritMapId),
      damageCutPct: readOptionalNumber(row.damageCutPct),
      resAdd: {
        fire: readOptionalNumber(row.fireResAdd),
        water: readOptionalNumber(row.waterResAdd),
        wind: readOptionalNumber(row.windResAdd),
        earth: readOptionalNumber(row.earthResAdd),
        light: readOptionalNumber(row.lightResAdd),
        dark: readOptionalNumber(row.darkResAdd),
      },
      extraNotes: row.extraNotes || '',
    };
  }
  return out;
}

function parseSecretModifierCsv(text) {
  const out = {};
  if (text == null) return out;
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length <= 1) return out;
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  for (let i = 1; i < lines.length; i++) {
    const cells = splitCsvLine(lines[i]);
    const row = {};
    for (let j = 0; j < headers.length; j++) row[headers[j]] = cells[j] != null ? cells[j].trim() : '';
    if (!row.secretKey) continue;
    out[row.secretKey] = rowToModifier(row);
  }
  return out;
}

function rowToModifier(row) {
  return {
    hpMul: readOptionalNumber(row.hpMul),
    atkMul: readOptionalNumber(row.atkMul),
    defMul: readOptionalNumber(row.defMul),
    statMul: readOptionalNumber(row.statMul),
    damageCutPct: readOptionalNumber(row.damageCutPct),
    resAdd: {
      fire: readOptionalNumber(row.fireResAdd),
      water: readOptionalNumber(row.waterResAdd),
      wind: readOptionalNumber(row.windResAdd),
      earth: readOptionalNumber(row.earthResAdd),
      light: readOptionalNumber(row.lightResAdd),
      dark: readOptionalNumber(row.darkResAdd),
    },
    extraNotes: row.extraNotes || '',
  };
}

function mergeWithIdentity(override) {
  if (!override) return IDENTITY_MODIFIER;
  return {
    hpMul: override.hpMul ?? 1.0,
    atkMul: override.atkMul ?? 1.0,
    defMul: override.defMul ?? 1.0,
    statMul: override.statMul ?? 1.0,
    damageCutPct: override.damageCutPct ?? 0,
    resAdd: {
      fire: override.resAdd?.fire ?? 0,
      water: override.resAdd?.water ?? 0,
      wind: override.resAdd?.wind ?? 0,
      earth: override.resAdd?.earth ?? 0,
      light: override.resAdd?.light ?? 0,
      dark: override.resAdd?.dark ?? 0,
    },
    extraNotes: override.extraNotes || '',
  };
}

function readOptionalNumber(v) {
  if (v == null || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function splitCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (ch === ',' && !inQuote) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}
