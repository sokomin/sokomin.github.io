(function (root) {
  "use strict";

  const MANIFEST_FILE = "market_public_manifest.js";

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

  class ProgressiveMarketDataStore {
    constructor(options = {}) {
      this.baseUrl = options.baseUrl || "public";
      this.document = options.document || root.document;
      this.fetchFn = options.fetchFn || (typeof root.fetch === "function" ? root.fetch.bind(root) : null);
      this.stampFn = options.stampFn || Date.now;
      this.scriptLoader = options.scriptLoader || ((fileName, force) => this.loadScript(fileName, force));
      this.manifest = null;
      this.bootstrap = null;
      this.serverData = new Map();
      this.inFlight = new Map();
      this.metrics = {};
    }

    loadScript(fileName, force) {
      if (!this.document) throw new Error("document is required to load market data scripts");
      const source = cacheUrl(joinUrl(this.baseUrl, fileName), force, this.stampFn());
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
      await this.scriptLoader(manifest.bootstrap.file, force);
      const bootstrap = root.MARKET_PUBLIC_BOOTSTRAP;
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
        await this.scriptLoader(record.file, Boolean(options.force));
        const value = root.MARKET_PUBLIC_SERVER_DATA && root.MARKET_PUBLIC_SERVER_DATA[server];
        if (!value || !value.meta || value.meta.progressive_version !== this.manifest.version) {
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
      const url = joinUrl(this.baseUrl, record.file);
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
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ProgressiveMarketDataStore, joinUrl, cacheUrl };
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
