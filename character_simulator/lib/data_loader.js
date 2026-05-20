

const DEFAULT_BASE_URL = './data';

const CATEGORY_ADD_BAD_CODES = new Set([
  40,   
  41,   
  153,  
  154,  
  207,  
]);

export class DataLoader {
  constructor(options = {}) {
    this.baseUrl  = options.baseUrl || DEFAULT_BASE_URL;
    this.master   = null;
    this.options  = null;
    this.optionPrefix = null;  
    this.manifest = null;
    this.itemsSearch = null;
    
    this._chunkCache = new Map();
    
    this._chunkInFlight = new Map();
    
    this._itemIdToKind = null;
    this._initialized = false;
  }

  async init() {
    if (this._initialized) return;
    const t0 = performance.now();
    const [master, options, manifest, itemsSearch, optionPrefix] = await Promise.all([
      this._fetchJson('master.json'),
      this._fetchJson('options.json'),
      this._fetchJson('manifest.json'),
      this._fetchJson('items_search.json'),
      this._fetchJson('option_prefix.json').catch(() => null),
    ]);
    this.master = master;
    this.options = options;
    this.optionPrefix = optionPrefix;
    this.manifest = manifest;
    this.itemsSearch = itemsSearch;
    this._buildItemIdIndex();
    this._initialized = true;
    const elapsed = Math.round(performance.now() - t0);
    const opPrefixInfo = optionPrefix
      ? `, optionPrefix=${Object.keys(optionPrefix.families).length} families`
      : '';
    console.info(`[DataLoader] init done in ${elapsed}ms (` +
      `master=${formatBytes(JSON.stringify(master).length)}, ` +
      `options=${Object.keys(options.templates).length} templates, ` +
      `items_search=${itemsSearch.rows.length} rows${opPrefixInfo})`);
  }

  _buildItemIdIndex() {
    this._itemIdToKind = new Map();
    for (const row of this.itemsSearch.rows) {
      this._itemIdToKind.set(row[0], row[3]);
    }
  }

  async getItemChunk(kindId) {
    if (this._chunkCache.has(kindId)) return this._chunkCache.get(kindId);
    if (this._chunkInFlight.has(kindId)) return this._chunkInFlight.get(kindId);
    const promise = this._fetchJson(`items/${kindId}.json`).then((chunk) => {
      this._chunkCache.set(kindId, chunk);
      this._chunkInFlight.delete(kindId);
      return chunk;
    }).catch((err) => {
      this._chunkInFlight.delete(kindId);
      throw err;
    });
    this._chunkInFlight.set(kindId, promise);
    return promise;
  }

  async getItemRecord(itemId) {
    if (!this._initialized) {
      throw new Error('[DataLoader] init() must be called first');
    }
    const kindId = this._itemIdToKind.get(itemId);
    if (kindId == null) return null;
    const chunk = await this.getItemChunk(kindId);
    return chunk.items[String(itemId)] || null;
  }

  findInSearch(itemId) {
    if (!this._initialized) return null;
    for (const row of this.itemsSearch.rows) {
      if (row[0] === itemId) return row;
    }
    return null;
  }

  getOpTemplate(opId) {
    if (!this._initialized) return null;
    return this.options.templates[String(opId)] || null;
  }

  resolveStatTarget(statTargetCode) {
    if (statTargetCode == null) return { statId: null, layer: 'displayOnly' };

    if (CATEGORY_ADD_BAD_CODES.has(statTargetCode)) {
      return { statId: null, layer: 'displayOnly' };
    }

    const map = this.master.statTypes.statTargetCodeMap;

    if (map.singletons && map.singletons.codes) {
      const e = map.singletons.codes[String(statTargetCode)];
      if (e) {
        if (typeof e === 'string') {
          return { statId: e, layer: 'sum' };
        }
        return { statId: e.stat, layer: 'sum', multiplier: e.multiplier || 1 };
      }
    }
    
    if (map.allStats && Array.isArray(map.allStats.codes)
        && map.allStats.codes.includes(statTargetCode)) {
      return {
        statId: null,
        layer: map.allStats.layer,
        stats: map.allStats.stats,
      };
    }
    
    if (map.lvCorrection && statTargetCode === map.lvCorrection.code) {
      return { statId: '__lvCorrection__', layer: map.lvCorrection.layer };
    }
    
    const rangeKeys = ['lvLinkedStat', 'fixedCap', 'categoryAdd', 'attrDamage',
                       'attrFixedCap', 'misc763'];
    for (const key of rangeKeys) {
      const rule = map[key];
      if (!rule || !Array.isArray(rule.range)) continue;
      if (statTargetCode < rule.range[0] || statTargetCode > rule.range[1]) continue;
      const offset = (rule.offset != null) ? rule.offset : rule.range[0];
      const idx = Math.floor((statTargetCode - offset) / (rule.stride || 1));
      const statId = rule.statsByIndex ? rule.statsByIndex[idx] : null;
      if (statId == null) continue;
      return { statId, layer: rule.layer };
    }
    
    return { statId: null, layer: 'displayOnly' };
  }

  async _fetchJson(path) {
    const url = `${this.baseUrl}/${path}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`[DataLoader] ${url} -> HTTP ${res.status}`);
    return res.json();
  }
}

function formatBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(1)}MB`;
}

let _singleton = null;
export function getSharedLoader(options) {
  if (!_singleton) _singleton = new DataLoader(options);
  return _singleton;
}
