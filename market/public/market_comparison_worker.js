"use strict";

const servers = {
  Bridgehead: "market_public_bridgehead.js",
  Strasserad: "market_public_strasserad.js",
  Valutish: "market_public_valutish.js",
};
const serverNames = Object.keys(servers);
const limit = 100;
const topLimit = 30;
const itemFields = new Set([
  "server", "item_key", "item_name", "item_type", "display_name", "option_names", "option_effects",
  "unit", "reference_gold", "reference_text", "reference_is_trend_only", "has_recent", "recent_count", "trend_count",
]);
const dailyFields = new Set(["server", "item_key", "unit", "count", "period_order"]);
const collator = new Intl.Collator("ja", { numeric: true });
const indexes = new Map();
const failedServers = new Set();
let manifest;
let lastSearch;

// The existing public datasets register themselves on window.
self.window = self;
importScripts(`market_comparison_top.js${self.location?.search || ""}`);
const initial = self.MARKET_COMPARISON_TOP;
const nonstandardNames = new Set(initial.nonstandardNames.map(normalize));

function readManifest(reload) {
  self.MARKET_PUBLIC_MANIFEST = null;
  importScripts(reload ? `market_public_manifest.js?reload=${reload}` : "market_public_manifest.js");
  const data = self.MARKET_PUBLIC_MANIFEST;
  if (data?.schema_version !== 1 || !data.servers) throw new Error("Invalid market manifest");
  return data;
}

function project(table, fields) {
  if (Array.isArray(table)) return table;
  return self.decodeMarketColumns({
    ...table,
    columns: table.columns.filter((column) => fields.has(column.name)),
  });
}

function normalize(text) {
  return text.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
}

function readServer(server, reload) {
  const record = manifest.servers[server];
  if (record?.file !== servers[server] || !/^[a-f0-9]{64}$/.test(record.sha256)) {
    throw new Error("Invalid server data reference");
  }
  self.MARKET_PUBLIC_SERVER_DATA = {};
  try {
    if (!self.decodeMarketColumns) importScripts("progressive_market_loader.js");
    const source = `${record.file}?v=${record.sha256}`;
    importScripts(reload ? `${source}&reload=${reload}` : source);
    const data = self.MARKET_PUBLIC_SERVER_DATA[server];
    if (data?.servers?.length !== 1 || data.servers[0] !== server ||
        data.meta?.progressive_version !== (record.version || manifest.version)) {
      throw new Error("Unexpected server data version");
    }
    const items = project(data.items, itemFields);
    const daily = project(data.daily_trends, dailyFields);
    if (items.length !== record.item_count || daily.length !== record.daily_trend_count) {
      throw new Error("Incomplete server data");
    }
    const itemIndex = new Map();
    for (const row of items) {
      if (row.server !== server || !/^[a-f0-9]{12}$/.test(row.item_key) ||
          typeof row.unit !== "string" || !row.unit || typeof row.item_name !== "string") {
        throw new Error("Invalid item identity");
      }
      if (itemIndex.has(row.item_key)) throw new Error("Duplicate item identity");
      const label = row.display_name || row.item_name;
      const price = Number(row.reference_gold);
      const count = Number(row.has_recent ? row.recent_count : row.trend_count);
      itemIndex.set(row.item_key, {
        key: row.item_key,
        label,
        type: row.item_type,
        unit: row.unit,
        nonstandard: nonstandardNames.has(normalize(row.item_name)),
        search: normalize([row.item_name, label, row.option_names, row.option_effects].join(" ")),
        amount: Number.isFinite(price) && price > 0 ? price : 0,
        price: price > 0 ? row.reference_text : "",
        count: Number.isSafeInteger(count) && count > 0 ? count : 0,
        historical: Boolean(row.reference_is_trend_only),
        observed: "",
      });
    }
    let latestObserved = "";
    for (const row of daily) {
      if (row.server !== server) throw new Error("Invalid observation server");
      // Published daily rows omit the unit. Within a server their item key is unique.
      const item = itemIndex.get(row.item_key);
      if (item && (!row.unit || row.unit === item.unit) && row.count > 0 &&
          /^\d{4}-\d{2}-\d{2}$/.test(row.period_order) && row.period_order > item.observed) {
        item.observed = row.period_order;
        if (row.period_order > latestObserved) latestObserved = row.period_order;
      }
    }
    return { items: itemIndex, latestObserved };
  } finally {
    self.MARKET_PUBLIC_SERVER_DATA = {};
  }
}

function search(query) {
  const words = query.split(" ");
  const matches = new Map();
  for (const server of serverNames) {
    for (const item of indexes.get(server)?.items.values() || []) {
      if (!words.every((word) => item.search.includes(word))) continue;
      const identity = `${item.key}|${item.unit}`;
      if (!matches.has(identity)) {
        matches.set(identity, { identity, key: item.key, name: item.label, type: item.type, unit: item.unit,
          nonstandard: item.nonstandard, count: 0, cells: {} });
      }
    }
  }
  for (const row of matches.values()) {
    for (const server of serverNames) {
      const item = indexes.get(server)?.items.get(row.key);
      if (item?.unit !== row.unit) continue;
      row.count += item.count;
      row.cells[server] = { price: item.price, amount: item.amount, historical: item.historical, observed: item.observed };
    }
    row.exact = normalize(row.name) === query;
  }
  return [...matches.values()].sort((a, b) => Number(a.nonstandard) - Number(b.nonstandard) ||
    b.count - a.count || Number(b.exact) - Number(a.exact) ||
    collator.compare(a.name, b.name) || a.identity.localeCompare(b.identity));
}

self.onmessage = ({ data: { id, query, page, retry } }) => {
  const unavailable = [];
  const normalized = normalize(query);
  const top = !normalized;
  const reload = retry ? Date.now() : 0;
  let latestObserved = "";
  try {
    // A retry checks the manifest again. Rebuild all indexes if the generation changed.
    if (!manifest || retry) {
      const current = readManifest(reload);
      if (current.version !== manifest?.version) {
        indexes.clear();
        failedServers.clear();
        lastSearch = null;
      }
      manifest = current;
    }
    if (serverNames.every((server) => initial.serverHashes[server] && initial.serverHashes[server] === manifest.servers[server]?.sha256)) {
      latestObserved = initial.latestObserved;
      if (top && initial.rows.length) {
        self.postMessage({ id, top, unavailable, latestObserved, total: initial.rows.length, rows: initial.rows, page: 1, pages: 1 });
        return;
      }
    }
    for (const server of serverNames) {
      if (indexes.has(server)) continue;
      if (!retry && failedServers.has(server)) {
        unavailable.push(server);
        continue;
      }
      try {
        indexes.set(server, readServer(server, failedServers.has(server) ? reload : 0));
        failedServers.delete(server);
        lastSearch = null;
      } catch (error) {
        failedServers.add(server);
        unavailable.push(server);
      }
    }
  } catch (error) {
    unavailable.push(...serverNames.filter((server) => !indexes.has(server)));
    if (top && initial.rows.length && !indexes.size) {
      self.postMessage({ id, top, unavailable, total: initial.rows.length, rows: initial.rows, page: 1, pages: 1,
        latestObserved: initial.latestObserved, asOf: initial.generatedDate });
      return;
    }
  }
  for (const index of indexes.values()) {
    if (index.latestObserved > latestObserved) latestObserved = index.latestObserved;
  }
  if (lastSearch?.query !== normalized) lastSearch = { query: normalized, rows: search(normalized) };
  const { rows } = lastSearch;
  if (top) {
    const leadingRows = rows.slice(0, topLimit);
    self.postMessage({ id, top, unavailable, latestObserved, total: leadingRows.length, rows: leadingRows, page: 1, pages: 1 });
    return;
  }
  const pages = Math.max(1, Math.ceil(rows.length / limit));
  const selected = Math.min(Math.max(1, page), pages);
  self.postMessage({ id, unavailable, latestObserved, total: rows.length, page: selected, pages,
    rows: rows.slice((selected - 1) * limit, selected * limit) });
};
