(function (root) {
  "use strict";

  const MANIFEST_FILE = "market_public_manifest.js";

  function decodeMarketColumns(value) {
    if (Array.isArray(value)) return value;
    if (!value || value.encoding !== "columns_v1" || !Number.isInteger(value.count) || value.count < 0) throw new Error("invalid columns");
    const rows = Array.from({ length: value.count }, () => ({}));
    const names = new Set();
    for (const column of value.columns) {
      if (names.has(column.name)) throw new Error("duplicate column");
      names.add(column.name);
      const indexes = column.indexes;
      if ((indexes && indexes.length !== rows.length) || (!indexes && column.values.length !== rows.length)) throw new Error("column count mismatch");
      const missing = new Set(column.missing || []);
      for (let i = 0; i < rows.length; i++) {
        if (missing.has(i)) continue;
        const index = indexes ? indexes[i] : i;
        if (!Number.isInteger(index) || index < 0 || index >= column.values.length) throw new Error("invalid dictionary index");
        rows[i][column.name] = column.values[index];
      }
    }
    return rows;
  }

  function decodeDataset(data) {
    for (const key of Object.keys(data)) {
      if (data[key] && data[key].encoding === "columns_v1") data[key] = decodeMarketColumns(data[key]);
    }
    return data;
  }

  function now() {
    return root.performance && typeof root.performance.now === "function"
      ? root.performance.now()
      : Date.now();
  }

  function joinUrl(baseUrl, fileName) {
    return `${String(baseUrl || "").replace(/\/$/, "")}/${fileName}`;
  }

  function cacheUrl(url, force, stamp) {
    if (!force || (root.location && root.location.protocol === "file:")) return url;
    return `${url}${url.includes("?") ? "&" : "?"}reload=${stamp}`;
  }

  function versionUrl(url, revision) {
    if (!revision || (root.location && root.location.protocol === "file:")) return url;
    return `${url}${url.includes("?") ? "&" : "?"}v=${encodeURIComponent(revision)}`;
  }

  class ProgressiveMarketDataStore {
    constructor(options = {}) {
      this.baseUrl = options.baseUrl || "public";
      this.document = options.document || root.document;
      this.fetchFn = options.fetchFn || (typeof root.fetch === "function" ? root.fetch.bind(root) : null);
      this.stampFn = options.stampFn || Date.now;
      this.scriptLoader = options.scriptLoader || ((fileName, force, revision) => this.loadScript(fileName, force, revision));
      this.manifest = null;
      this.bootstrap = null;
      this.serverData = new Map();
      this.inFlight = new Map();
      this.metrics = {};
    }

    loadScript(fileName, force, revision) {
      if (!this.document) throw new Error("document is required to load market data scripts");
      const source = cacheUrl(versionUrl(joinUrl(this.baseUrl, fileName), revision), force, this.stampFn());
      return new Promise((resolve, reject) => {
        const script = this.document.createElement("script");
        script.async = true;
        script.src = source;
        script.onload = () => {
          script.remove();
          resolve();
        };
        script.onerror = () => {
          script.remove();
          reject(new Error(`data request failed: ${fileName}`));
        };
        this.document.head.appendChild(script);
      });
    }

    async initialize(options = {}) {
      const force = Boolean(options.force);
      const started = now();
      if (force) {
        root.MARKET_PUBLIC_MANIFEST = null;
        root.MARKET_PUBLIC_BOOTSTRAP = null;
      }
      await this.scriptLoader(MANIFEST_FILE, force);
      const manifest = root.MARKET_PUBLIC_MANIFEST;
      if (!manifest || !manifest.bootstrap || !manifest.servers) {
        throw new Error("market data manifest is invalid");
      }
      await this.scriptLoader(manifest.bootstrap.file, force, manifest.bootstrap.sha256 || manifest.version);
      const bootstrap = decodeDataset(root.MARKET_PUBLIC_BOOTSTRAP || {});
      if (!bootstrap || !bootstrap.meta || bootstrap.meta.progressive_version !== manifest.version) {
        if (!force) return this.initialize({ force: true });
        throw new Error("bootstrap version does not match manifest");
      }
      this.manifest = manifest;
      this.bootstrap = bootstrap;
      this.serverData.clear();
      this.inFlight.clear();
      root.MARKET_PUBLIC_SERVER_DATA = {};
      this.metrics.bootstrapMs = now() - started;
      return bootstrap;
    }

    previewFor(server) {
      if (!this.bootstrap) throw new Error("market data store is not initialized");
      if (!this.bootstrap.servers.includes(server)) throw new Error(`unknown market server: ${server}`);
      return {
        ...this.bootstrap,
        servers: [server],
        items: this.bootstrap.items.filter((row) => row.server === server),
      };
    }

    loadedFor(server) {
      return this.serverData.get(server) || null;
    }

    async loadServer(server, options = {}) {
      if (!this.manifest || !this.manifest.servers[server]) {
        throw new Error(`unknown market server: ${server}`);
      }
      if (!options.force && this.serverData.has(server)) return this.serverData.get(server);
      if (!options.force && this.inFlight.has(server)) return this.inFlight.get(server);

      const task = (async () => {
        const started = now();
        const record = this.manifest.servers[server];
        if (options.force && root.MARKET_PUBLIC_SERVER_DATA) {
          delete root.MARKET_PUBLIC_SERVER_DATA[server];
        }
        await this.scriptLoader(record.file, Boolean(options.force), record.sha256 || record.version || this.manifest.version);
        const encoded = root.MARKET_PUBLIC_SERVER_DATA && root.MARKET_PUBLIC_SERVER_DATA[server];
        const value = encoded && decodeDataset(encoded);
        if (!value || !value.meta || value.meta.progressive_version !== (record.version || this.manifest.version)) {
          throw new Error(`server data version does not match manifest: ${server}`);
        }
        if (value.servers.length !== 1 || value.servers[0] !== server) {
          throw new Error(`server data is mixed or mislabeled: ${server}`);
        }
        this.serverData.set(server, value);
        this.metrics[`load:${server}`] = now() - started;
        return value;
      })();
      this.inFlight.set(server, task);
      try {
        return await task;
      } finally {
        this.inFlight.delete(server);
      }
    }

    async prefetchServer(server) {
      if (!this.manifest || !this.manifest.servers[server] || this.serverData.has(server)) return;
      const record = this.manifest.servers[server];
      const url = versionUrl(joinUrl(this.baseUrl, record.file), record.sha256 || record.version || this.manifest.version);
      const started = now();
      if (this.fetchFn && (!root.location || root.location.protocol !== "file:")) {
        const response = await this.fetchFn(url, { cache: "force-cache" });
        if (!response.ok) throw new Error(`prefetch failed: ${response.status} ${record.file}`);
        await response.arrayBuffer();
      } else if (this.document) {
        const link = this.document.createElement("link");
        link.rel = "prefetch";
        link.as = "script";
        link.href = url;
        this.document.head.appendChild(link);
      }
      this.metrics[`prefetch:${server}`] = now() - started;
    }

    async prefetchRemaining(exceptServer) {
      if (!this.bootstrap) return;
      await Promise.all(
        this.bootstrap.servers
          .filter((server) => server !== exceptServer)
          .map((server) => this.prefetchServer(server))
      );
    }

    async forceReload(server) {
      await this.initialize({ force: true });
      return this.loadServer(server, { force: true });
    }
  }

  root.ProgressiveMarketDataStore = ProgressiveMarketDataStore;
  root.decodeMarketColumns = decodeMarketColumns;
  root.decodeMarketDataset = decodeDataset;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ProgressiveMarketDataStore, joinUrl, cacheUrl, versionUrl, decodeMarketColumns, decodeDataset };
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
