// data_loader.js — シミュレータデータの fetch + キャッシュ
//
// 構造:
//   await loader.init()                            // master / options / manifest / items_search 一括取得
//   loader.master                                  // master.json (statTypes, sets, ...)
//   loader.options                                 // options.json (templates)
//   loader.optionPrefix                            // option_prefix.json (付与 op カタログ)
//   loader.itemsSearch                              // items_search.json (rows)
//   await loader.getItemChunk(kindId)              // items/<kind>.json (kind 単位 lazy fetch)
//   loader.getItemRecord(itemId)                   // 必要なら chunk を fetch、 キャッシュ済なら即返す
//   loader.findInSearch(itemId)                    // items_search の rows から逆引き
//
// 注意: ESModule (import/export) を前提。 <script type="module"> から読む。

const DEFAULT_BASE_URL = './data';

// categoryAdd ルール (master.statTargetCodeMap, range 35-118) は statTargetCode を
// 12 個ずつ 7 primary stats に均等割するが、 一部 code は実際の意味が異なる。
// 副集計側 (side-aggregator) で個別計算するため、 categoryAdd 経路では displayOnly に倒す。
const CATEGORY_ADD_BAD_CODES = new Set([
  40,   // 移動速度 +
  41,   // 攻撃速度 +
  153,  // 移動速度 -
  154,  // 攻撃速度 -
  207,  // 攻撃速度 + (転生比例)
]);


export class DataLoader {
  constructor(options = {}) {
    this.baseUrl  = options.baseUrl || DEFAULT_BASE_URL;
    this.master   = null;
    this.options  = null;
    this.optionPrefix = null;  // prefix.csv 由来 = 付与 op カタログ
    this.manifest = null;
    this.itemsSearch = null;
    /** kindId -> ItemChunk (lazy fetch) */
    this._chunkCache = new Map();
    /** kindId -> Promise<ItemChunk> (fetch in-flight) */
    this._chunkInFlight = new Map();
    /** itemId -> kindId (items_search から逆引き) */
    this._itemIdToKind = null;
    this._initialized = false;
  }

  /**
   * master / options / manifest / items_search / option_prefix を並列 fetch。
   * 初回起動時に一度だけ呼ぶ。
   */
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

  /**
   * items_search の rows から itemId → kindId のマップを作る。
   * (items_search のフィールドは [i, m, n, t, g, rq, lv, p, s] で、t = kind)
   */
  _buildItemIdIndex() {
    this._itemIdToKind = new Map();
    for (const row of this.itemsSearch.rows) {
      this._itemIdToKind.set(row[0], row[3]);
    }
  }

  /**
   * Kind 単位の items chunk を取得 (キャッシュ + 並列 fetch 抑止)。
   * @param {number} kindId
   * @returns {Promise<ItemChunk>}
   */
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

  /**
   * itemId を解決して ItemRecord を返す (Kind chunk を必要に応じて fetch)。
   * @param {number} itemId
   * @returns {Promise<ItemRecord | null>}
   */
  async getItemRecord(itemId) {
    if (!this._initialized) {
      throw new Error('[DataLoader] init() must be called first');
    }
    const kindId = this._itemIdToKind.get(itemId);
    if (kindId == null) return null;
    const chunk = await this.getItemChunk(kindId);
    return chunk.items[String(itemId)] || null;
  }

  /**
   * items_search の行を取得 (kindId 不問、軽量プレビュー用)。
   * @param {number} itemId
   * @returns {[number, string, string, number, number, number, number, number, string] | null}
   */
  findInSearch(itemId) {
    if (!this._initialized) return null;
    for (const row of this.itemsSearch.rows) {
      if (row[0] === itemId) return row;
    }
    return null;
  }

  /**
   * options.json のテンプレ取得 (合成は不要、辞書引きのみ)。
   * @param {number} opId
   * @returns {OpTemplate | null}
   */
  getOpTemplate(opId) {
    if (!this._initialized) return null;
    return this.options.templates[String(opId)] || null;
  }

  /**
   * master.statTypes.statTargetCodeMap から、statTargetCode を解決して
   * { statId, layer, stats?, multiplier? } を返す。
   */
  resolveStatTarget(statTargetCode) {
    if (statTargetCode == null) return { statId: null, layer: 'displayOnly' };

    // categoryAdd 経路に乗せたくない code は displayOnly に倒す (副集計側で個別計算)
    if (CATEGORY_ADD_BAD_CODES.has(statTargetCode)) {
      return { statId: null, layer: 'displayOnly' };
    }

    const map = this.master.statTypes.statTargetCodeMap;

    // 1) singletons
    if (map.singletons && map.singletons.codes) {
      const e = map.singletons.codes[String(statTargetCode)];
      if (e) {
        if (typeof e === 'string') {
          return { statId: e, layer: 'sum' };
        }
        return { statId: e.stat, layer: 'sum', multiplier: e.multiplier || 1 };
      }
    }
    // 2) allStats (codes 配列に含まれるか)
    if (map.allStats && Array.isArray(map.allStats.codes)
        && map.allStats.codes.includes(statTargetCode)) {
      return {
        statId: null,
        layer: map.allStats.layer,
        stats: map.allStats.stats,
      };
    }
    // 3) lvCorrection
    if (map.lvCorrection && statTargetCode === map.lvCorrection.code) {
      return { statId: '__lvCorrection__', layer: map.lvCorrection.layer };
    }
    // 4) range ルール (op slot 文脈)
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
    // 5) 未該当 = 表示専用
    return { statId: null, layer: 'displayOnly' };
  }

  // ----- 内部 -----

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

// 単一インスタンスを共有したい場合のヘルパ
let _singleton = null;
export function getSharedLoader(options) {
  if (!_singleton) _singleton = new DataLoader(options);
  return _singleton;
}
