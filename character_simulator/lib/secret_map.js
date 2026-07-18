import { getMonsterById } from './map_monster.js';

const SECRET_MAP_DATA_URL = './lib/data/secret_maps.json';

let loadPromise = null;
let secretMaps = [];
let secretMapById = new Map();

export async function loadSecretMapIndex(url = SECRET_MAP_DATA_URL) {
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('fetch failed: ' + url + ' status=' + response.status);
    const data = await response.json();
    if (!data || !Array.isArray(data.maps)) throw new Error('invalid secret map data');
    secretMaps = data.maps.filter((map) => map && typeof map.id === 'string' && Array.isArray(map.monsters));
    secretMapById = new Map(secretMaps.map((map) => [map.id, map]));
    return secretMaps;
  })();
  return loadPromise;
}

export function getSecretMapList() {
  return secretMaps.map((map) => ({
    id: map.id,
    name: map.name,
    rmdIndex: map.rmdIndex,
    levelMin: Number(map.levelMin) || 0,
    levelMax: Number(map.levelMax) || 0,
  }));
}

export function searchSecretMaps(query) {
  const needle = normalizeQuery(query);
  if (!needle) return getSecretMapList();
  return getSecretMapList().filter((map) => normalizeQuery(map.name).includes(needle));
}

export function getSecretMapMeta(id) {
  return secretMapById.get(String(id)) || null;
}

export function getMonstersForSecretMap(id) {
  const map = getSecretMapMeta(id);
  if (!map) return [];
  const result = [];
  for (const row of map.monsters) {
    const monster = getMonsterById(row.monsterId);
    if (!monster) continue;
    result.push({
      mapMobName: row.name || monster.name,
      lvMin: Number(row.lvMin) || Number(map.levelMin) || 1,
      lvMax: Number(row.lvMax) || Number(row.lvMin) || Number(map.levelMin) || 1,
      width: 0,
      height: 0,
      monster,
    });
  }
  return result;
}

function normalizeQuery(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}
