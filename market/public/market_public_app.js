(function (root) {
  "use strict";

  const DISPLAY_LIMIT = 500;
  const GOLD_SERVER = "Gold Experience";
  const SERVER_ORDER = ["Strasserad", "Valutish", "Bridgehead", "Gold Experience"];

  function rowSeason(row) {
    return row.server === GOLD_SERVER ? String(row.season_year || "") : "";
  }

  function rowKey(row) {
    return `${row.server}|${rowSeason(row)}|${row.item_key}`;
  }

  const FAVORITES_STORAGE_KEY = "redstone.market.favorites";

  function createFavorites() {
    const keys = new Set();
    let message = "";
    try {
      const saved = root.localStorage?.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data?.version !== 1 || !Array.isArray(data.keys) ||
            !data.keys.every((key) => typeof key === "string" && key.length > 0)) {
          throw new Error("Invalid favorites");
        }
        for (const key of data.keys) keys.add(key);
      }
    } catch (_) {
      message = "お気に入りを復元できませんでした。この画面では引き続き操作できます。";
    }
    return {
      has: (key) => keys.has(key),
      get message() { return message; },
      toggle(key) {
        if (keys.has(key)) keys.delete(key);
        else keys.add(key);
        try {
          if (!root.localStorage) throw new Error("Storage unavailable");
          root.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({ version: 1, keys: [...keys] }));
          message = "";
        } catch (_) {
          message = "お気に入りを端末に保存できません。この画面を閉じるまでは操作を保持します。";
        }
      },
    };
  }

  function favoriteButton(row, favorites, escapeHtml) {
    const pressed = favorites.has(rowKey(row));
    const label = `${row.display_name || row.item_name}：お気に入り${pressed ? "を解除" : "に登録"}`;
    return `<button type="button" data-market-favorite="${escapeHtml(rowKey(row))}" aria-pressed="${pressed}" aria-label="${escapeHtml(label)}">${pressed ? "★" : "☆"}</button>`;
  }

  function connectFavorites(state, favorites, rows, render, applyFilter) {
    const document = root.document;
    const byId = (id) => document.getElementById(id);
    let filter = byId("marketFavoritesOnly");
    if (!filter) {
      const label = document.createElement("label");
      filter = document.createElement("input");
      filter.id = "marketFavoritesOnly";
      filter.type = "checkbox";
      label.setAttribute?.("style", "display:inline-flex;align-items:center;gap:6px");
      filter.setAttribute?.("style", "min-width:0;width:auto;padding:0");
      label.appendChild(filter);
      label.append("お気に入りだけ");
      byId("marketSort").closest("label").insertAdjacentElement("afterend", label);
    }
    let status = byId("marketFavoritesStatus");
    if (!status) {
      status = document.createElement("p");
      status.id = "marketFavoritesStatus";
      status.className = "market-note";
      status.setAttribute?.("aria-live", "polite");
      byId("marketRows").closest(".market-panel").appendChild(status);
    }
    const showStatus = () => { status.textContent = favorites.message; };
    showStatus();
    filter.checked = false;
    filter.addEventListener("change", () => {
      state.favoritesOnly = filter.checked;
      state.selectedKey = "";
      applyFilter();
    });
    return (event) => {
      const button = event.target.closest("button[data-market-favorite]");
      const key = button?.dataset.marketFavorite;
      if (key === undefined || !rows().some((row) => rowKey(row) === key)) return false;
      const buttons = [...(document.querySelectorAll?.("button[data-market-favorite]") || [])];
      const index = buttons.indexOf(button);
      favorites.toggle(key);
      showStatus();
      render();
      const updated = [...(document.querySelectorAll?.("button[data-market-favorite]") || [])];
      const next = updated.find((element) => element.dataset.marketFavorite === key) || updated[Math.min(Math.max(index, 0), updated.length - 1)] || filter;
      next.focus?.();
      return true;
    };
  }

  function goldSeasonOptions(meta) {
    return [...new Set((meta.gold_seasons || []).map((row) => String(row.year || "")).filter(Boolean))]
      .sort((a, b) => b.localeCompare(a));
  }

  function activeWindowMeta(meta, state) {
    if (state.server !== GOLD_SERVER || !state.goldSeason) return meta;
    return (meta.gold_seasons || []).find((row) => String(row.year) === state.goldSeason) || meta;
  }

  function shouldShowGoldSeason(server, meta) {
    return server === GOLD_SERVER && goldSeasonOptions(meta).length > 0;
  }

  function itemSearchText(row) {
    return `${row.display_name || row.item_name || ""} ${row.option_effects || ""}`.toLowerCase();
  }

  function rowActivity(row) {
    return Number(row.has_recent ? row.recent_count : row.trend_count) || 0;
  }

  const CHANGE_DAYS = [1, 7, 30];
  const PUBLIC_CHANGE_DAYS = [7];
  const CHANGE_METRICS = ["reference_gold", "market_gold", "sell_gold", "buy_gold"];

  function normalizePublicSort(sort) {
    const legacy = /^change(?:1|30)(Asc|Desc)$/.exec(sort || "");
    return legacy ? `change7${legacy[1]}` : sort;
  }

  function priceSeriesKey(row) {
    return JSON.stringify([rowKey(row), row.unit || "Gold"]);
  }

  function changeSort(sort) {
    return /^change(1|7|30)(Asc|Desc)$/.exec(sort || "");
  }

  function buildPriceChangeIndex(data, metric = "reference_gold") {
    const series = new Map();
    if (!CHANGE_METRICS.includes(metric)) return new Map();
    for (const row of data.daily_trends || []) {
      const day = String(row.period_order || "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
      const time = periodTime(day);
      if (!Number.isFinite(time)) continue;
      if (row.server === GOLD_SERVER && day.slice(0, 4) !== rowSeason(row)) continue;
      const raw = row[metric];
      if (raw === null || raw === undefined || raw === "") continue;
      const key = priceSeriesKey(row);
      if (!series.has(key)) series.set(key, new Map());
      const days = series.get(key);
      const value = typeof raw === "number" && Number.isFinite(raw) ? raw : null;
      if (!days.has(time)) days.set(time, value);
      else if (days.get(time) !== value) days.set(time, null);
    }
    const changes = new Map();
    for (const [key, days] of series) {
      let latest = -Infinity;
      for (const time of days.keys()) latest = Math.max(latest, time);
      const current = days.get(latest);
      const values = { date: new Date(latest).toISOString().slice(0, 10) };
      for (const distance of CHANGE_DAYS) {
        const base = days.get(latest - distance * 86400000);
        const rate = current !== null && current >= 0 && base > 0 ? (current / base - 1) * 100 : NaN;
        values[distance] = Number.isFinite(rate) ? rate : null;
      }
      changes.set(key, values);
    }
    return changes;
  }

  function priceChangeText(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) return "—";
    const magnitude = Math.abs(value).toLocaleString("ja-JP", { maximumFractionDigits: 1 });
    return value > 0 ? `+${magnitude}% ↑` : value < 0 ? `-${magnitude}% ↓` : "0% →";
  }

  function sortedRows(data, state, searchIndex = null, changes = null) {
    const rows = (data.items || []).filter((row) => {
      const key = rowKey(row);
      const text = searchIndex && searchIndex.has(key) ? searchIndex.get(key) : itemSearchText(row);
      return (!state.query || text.includes(state.query)) &&
        (state.server === "all" || row.server === state.server) &&
        (state.server !== GOLD_SERVER || !state.goldSeason || rowSeason(row) === state.goldSeason) &&
        (state.category === "all" || row.category === state.category) &&
        (!state.favoritesOnly || state.favorites?.has(key)) &&
        (state.recent === "all" || row.has_recent);
    });
    const change = changeSort(state.sort);
    if (change) {
      changes = changes || buildPriceChangeIndex(data, state.changeMetric || "reference_gold");
      const value = (row) => changes.get(priceSeriesKey(row))?.[Number(change[1])] ?? null;
      rows.sort((a, b) => {
        const left = value(a), right = value(b);
        if (left === null) return right === null ? 0 : 1;
        if (right === null) return -1;
        return change[2] === "Asc" ? left - right : right - left;
      });
    }
    else if (state.sort === "priceDesc") rows.sort((a, b) => Number(b.reference_gold || 0) - Number(a.reference_gold || 0));
    else if (state.sort === "priceAsc") rows.sort((a, b) => Number(a.reference_gold || 0) - Number(b.reference_gold || 0));
    else if (state.sort === "name") rows.sort((a, b) => String(a.display_name || a.item_name).localeCompare(String(b.display_name || b.item_name), "ja"));
    else rows.sort((a, b) => Number(Boolean(b.has_recent)) - Number(Boolean(a.has_recent)) || rowActivity(b) - rowActivity(a));
    return rows;
  }

  function periodTime(period) {
    const match = /^(\d{4})-(\d{2})(?:-(\d{2})|-W(\d{2}))?$/.exec(String(period || ""));
    if (!match) return NaN;
    const year = Number(match[1]);
    const month = Number(match[2]);
    if (month < 1 || month > 12) return NaN;
    const first = new Date(Date.UTC(year, month - 1, 1));
    let day = Number(match[3] || 1);
    if (match[4]) {
      const week = Number(match[4]);
      const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
      const lastWeek = Math.floor((lastDay + first.getUTCDay() - 1) / 7) + 1;
      if (week < 1 || week > lastWeek) return NaN;
      day = Math.max(1, 1 + (week - 1) * 7 - first.getUTCDay());
    }
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date.getTime() : NaN;
  }

  function chartRows(rows) {
    return rows.map((row) => ({ ...row, time: periodTime(row.period_order) }))
      .filter((row) => Number.isFinite(row.time))
      .sort((a, b) => a.time - b.time);
  }

  function chartX(time, minTime, maxTime, width, pad) {
    if (minTime === maxTime) return width / 2;
    return pad + (width - pad * 2) * (time - minTime) / (maxTime - minTime);
  }

  const CHART_RANGES = { "7": 7, "30": 30, "183": 183, all: 0 };
  const chartEscape = (value) => String(value ?? "").replace(/[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const chartPrice = (value) => typeof value === "number" && Number.isFinite(value) && value > 0;

  function nextChartPeriod(period) {
    const time = periodTime(period);
    if (!Number.isFinite(time)) return NaN;
    const date = new Date(time);
    if (/^\d{4}-\d{2}$/.test(period)) return Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
    if (/-W\d{2}$/.test(period)) {
      const nextSunday = time + (7 - date.getUTCDay()) * 86400000;
      return Math.min(nextSunday, Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
    }
    return time + 86400000;
  }

  function chartAnchor(data, state) {
    let latest = NaN;
    for (const row of data.daily_trends || []) {
      if (row.server !== state.server || (row.server === GOLD_SERVER && rowSeason(row) !== state.goldSeason)) continue;
      const day = String(row.period_order || "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day) ||
          (row.server === GOLD_SERVER && day.slice(0, 4) !== state.goldSeason)) continue;
      if (!CHANGE_METRICS.some((key) => chartPrice(row[key]))) continue;
      const time = periodTime(day);
      if (Number.isFinite(time)) latest = Number.isFinite(latest) ? Math.max(latest, time) : time;
    }
    if (state.server === GOLD_SERVER) {
      const season = (data.meta?.gold_seasons || []).find((row) => String(row.year) === state.goldSeason);
      const day = String(season?.latest_signal_date || "");
      const time = /^\d{4}-\d{2}-\d{2}$/.test(day) && day.slice(0, 4) === state.goldSeason ? periodTime(day) : NaN;
      if (Number.isFinite(time)) latest = Number.isFinite(latest) ? Math.max(latest, time) : time;
    }
    return latest;
  }

  function selectChartRows(rows, range = "all", anchor = NaN, item = null) {
    const days = CHART_RANGES[range] || 0;
    if (days && !Number.isFinite(anchor)) return [];
    const cutoff = anchor - (days - 1) * 86400000;
    return chartRows(rows).filter((row) => (!item || (rowKey(row) === rowKey(item) &&
      (!row.unit || !item.unit || row.unit === item.unit))) &&
      (!days || (row.time <= anchor && nextChartPeriod(row.period_order) > cutoff)));
  }

  function chartRangeControl(document) {
    let select = document.getElementById("marketChartRange");
    if (!select) {
      const label = document.createElement("label");
      label.append("グラフ期間");
      select = document.createElement("select");
      select.id = "marketChartRange";
      select.innerHTML = '<option value="7">7日</option><option value="30">30日</option><option value="183">半年</option><option value="all">全期間</option>';
      label.appendChild(select);
      document.getElementById("marketPeriodMode").closest("label").insertAdjacentElement("afterend", label);
    }
    select.value = "all";
    return select;
  }

  function connectChartDetails(container) {
    const show = (event) => {
      const point = event.target.closest?.("[data-market-point]");
      if (!point || !container.contains?.(point)) return;
      if (event.type === "keydown") {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
      }
      if (event.type === "pointerup" && event.pointerType !== "touch") return;
      const output = container.querySelector("[data-market-chart-value]");
      if (output) output.textContent = point.dataset.marketPoint;
      for (const other of container.querySelectorAll("[data-market-point]")) {
        other.setAttribute("aria-pressed", String(other === point));
      }
    };
    for (const type of ["click", "focusin", "keydown", "pointerup"]) container.addEventListener(type, show);
  }

  function renderPriceChart(inputRows, { range = "all", anchor = NaN, item = null } = {}) {
    const rows = selectChartRows(inputRows, range, anchor, item);
    const values = rows.flatMap((row) => [row.reference_gold, row.sell_gold, row.buy_gold]).filter(chartPrice);
    if (!values.length) return '<div class="market-empty">推移を表示できる価格がありません。</div>';
    const width = 420, height = 180, pad = 24;
    let low = Infinity, high = -Infinity;
    for (const value of values) { low = Math.min(low, value); high = Math.max(high, value); }
    const minY = low === high ? low * 0.95 : low;
    const maxY = low === high ? high * 1.05 : high;
    const spanY = maxY - minY || 1;
    const y = (value) => height - pad - (height - pad * 2) * ((value - minY) / spanY);
    const minTime = rows[0].time, maxTime = rows[rows.length - 1].time;
    const scale = high >= 1e16 ? [1e16, "億本"] : high >= 1e12 ? [1e12, "万本"] : high >= 1e8 ? [1e8, "本"] : [1, "G"];
    const digits = Math.min(16, Math.max(2, 1 - Math.floor(Math.log10(spanY / scale[0] / 4))));
    const number = (value) => (value / scale[0]).toLocaleString("ja-JP", { maximumFractionDigits: digits });
    const format = (value, fallback) => fallback || (value >= 1e8
      ? `${(value / 1e8).toLocaleString("ja-JP", { maximumFractionDigits: 4 })}本`
      : `${value.toLocaleString("ja-JP", { maximumFractionDigits: 4 })}G`);
    const grid = Array.from({ length: 5 }, (_, index) => {
      const value = minY + spanY * index / 4;
      const label = number(value);
      const fontSize = Math.min(10, 120 / Math.max(1, label.length));
      return `<line class="market-grid" x1="24" y1="${y(value).toFixed(1)}" x2="396" y2="${y(value).toFixed(1)}" stroke="#ddd"/><text class="market-y-tick" x="18" y="${(y(value) + 3).toFixed(1)}" text-anchor="end" font-size="${fontSize}" fill="#555">${chartEscape(label)}</text>`;
    }).join("");
    const series = [["reference_gold", "reference_text", "ref", "参考", "#1a7358"],
      ["sell_gold", "sell_text", "sell", "売り", "#bc4242"], ["buy_gold", "buy_text", "buy", "買い", "#365fc0"]];
    const lines = series.map(([key, textKey, name, label, color]) => {
      const points = rows.filter((row) => chartPrice(row[key])).map((row) => ({ ...row,
        x: chartX(row.time, minTime, maxTime, width, pad), y: y(row[key]),
        label: `${row.period} ${label} ${format(row[key], row[textKey])}` }));
      const d = points.map((point, index) =>
        `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
      const line = points.length > 1 ? `<path class="market-line ${name}" d="${d}" fill="none" stroke="${color}" stroke-width="2"/>` : "";
      return line + points.map((point) => `<circle class="market-point ${name}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3" fill="${color}"/>`).join("") +
        points.map((point) => `<circle class="market-hit" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="12" fill="transparent" pointer-events="all" tabindex="0" role="button" aria-pressed="false" aria-label="${chartEscape(point.label)}" data-market-point="${chartEscape(point.label)}"><title>${chartEscape(point.label)}</title></circle>`).join("");
    }).join("");
    const dateLabels = minTime === maxTime
      ? `<text x="210" y="176" text-anchor="middle" font-size="10" fill="#666">${chartEscape(rows[0].period)}</text>`
      : `<text x="24" y="176" font-size="10" fill="#666">${chartEscape(rows[0].period)}</text><text x="396" y="176" text-anchor="end" font-size="10" fill="#666">${chartEscape(rows[rows.length - 1].period)}</text>`;
    return `<div class="market-chart"><svg viewBox="-56 0 476 180" role="group" aria-label="価格推移" style="width:100%;display:block">
      <style>.market-hit{cursor:pointer;touch-action:manipulation}.market-hit:focus,.market-hit[aria-pressed="true"]{stroke:#222;stroke-width:2;outline:none}</style>
      ${grid}<text x="18" y="12" text-anchor="end" font-size="10" fill="#555">${scale[1]}</text>
      <line x1="24" y1="24" x2="24" y2="156" stroke="#aaa"/>${lines}${dateLabels}</svg>
      <div data-market-chart-value role="status" aria-live="polite" style="min-height:1.5em;font-size:13px"></div>
      <div class="market-legend"><span style="color:#1a7358">緑: 参考相場</span> <span class="sell" style="color:#bc4242">赤: 売り叫び</span> <span class="buy" style="color:#365fc0">青: 買い叫び</span></div></div>`;
  }

  function createUrlState(state, servers, hasRecent = false) {
    const byId = (id) => root.document.getElementById(id);
    const enabled = Boolean(root.location && root.history);
    let explicitItem = "";
    const sorts = ["count", "priceDesc", "priceAsc", "name",
      ...PUBLIC_CHANGE_DAYS.flatMap((day) => [`change${day}Asc`, `change${day}Desc`])];
    const allowed = (value, values, fallback) => values.includes(value) ? value : fallback;
    return {
      hasItem: () => Boolean(explicitItem),
      read() {
        if (!enabled) return false;
        const params = new root.URLSearchParams(root.location.search);
        const available = servers();
        state.server = allowed(params.get("server"), available,
          available.includes("Bridgehead") ? "Bridgehead" : available[0]);
        const query = params.get("q") || "";
        state.query = query.trim().toLowerCase();
        state.category = allowed(params.get("category"), ["all", "equipment", "other"], "all");
        state.sort = allowed(normalizePublicSort(params.get("sort")), sorts, "count");
        const period = allowed(params.get("period"), hasRecent
          ? ["daily", "long", "recent:daily", "recent:long"] : ["daily", "long"], "daily");
        state.periodMode = period.endsWith("long") ? "long" : "daily";
        if (hasRecent) state.recent = period.startsWith("recent:") ? "recent" : "all";
        state.goldSeason = /^\d{4}$/.test(params.get("season") || "") ? params.get("season") : "";
        explicitItem = params.get("item") || "";
        state.selectedKey = explicitItem;
        if (changeSort(state.sort) && !state.changeMetric) state.changeMetric = "reference_gold";
        for (const [id, value] of [["marketSearch", query], ["marketServer", state.server],
          ["marketCategory", state.category], ["marketSort", state.sort],
          ["marketPeriodMode", state.periodMode], ["marketChangeMetric", state.changeMetric]]) {
          const control = byId(id);
          if (control) control.value = value;
        }
        if (hasRecent && byId("marketRecent")) byId("marketRecent").value = state.recent;
        return Boolean(explicitItem || state.server === GOLD_SERVER || state.query ||
          state.category !== "all" || state.sort !== "count" || state.recent === "recent" || state.periodMode !== "daily");
      },
      validate(rows) {
        if (explicitItem && !rows.some((row) => rowKey(row) === explicitItem)) {
          explicitItem = "";
          state.selectedKey = "";
        }
      },
      write(mode = "replace", itemSelected = false) {
        if (!enabled) return;
        if (itemSelected) explicitItem = state.selectedKey;
        else if (!state.selectedKey) explicitItem = "";
        const params = new root.URLSearchParams();
        params.set("server", state.server);
        const query = byId("marketSearch")?.value || "";
        if (query) params.set("q", query);
        if (state.category !== "all") params.set("category", state.category);
        if (state.sort !== "count") params.set("sort", state.sort);
        if (state.server === GOLD_SERVER && state.goldSeason) params.set("season", state.goldSeason);
        if (explicitItem) params.set("item", explicitItem);
        const period = `${hasRecent && state.recent === "recent" ? "recent:" : ""}${state.periodMode}`;
        if (period !== "daily") params.set("period", period);
        const url = `${root.location.pathname}?${params.toString()}${root.location.hash || ""}`;
        if (url !== `${root.location.pathname}${root.location.search}${root.location.hash || ""}`) {
          root.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
        }
      },
    };
  }

  function start() {
    const store = new root.ProgressiveMarketDataStore({ baseUrl: "public" });
    const state = {
      query: "",
      server: "",
      category: "all",
      recent: "all",
      sort: "count",
      periodMode: "daily",
      chartRange: "all",
      selectedKey: "",
      goldSeason: "",
      changeMetric: "",
      favoritesOnly: false,
      favorites: createFavorites(),
    };
    const yen = new Intl.NumberFormat("ja-JP");
    const byId = (name) => root.document.getElementById(name);
    const trendsByServerItem = new Map();
    const dailyTrendsByServerItem = new Map();
    const searchIndex = new Map();
    const changeIndexes = new Map();
    let indexedServer = "";
    let searchTimer = 0;
    let revision = 0;
    const urlState = createUrlState(state, () => store.bootstrap?.servers || [], true);

    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch]));
    }

    function priceText(gold, fallback) {
      if (fallback) return fallback;
      const n = Number(gold || 0);
      if (!Number.isFinite(n) || n <= 0) return "";
      if (n >= 100000000) {
        const ingot = n / 100000000;
        return `${yen.format(Math.round(ingot * 10) / 10)}本`;
      }
      return `${yen.format(Math.round(n))}G`;
    }

    function interactiveMode() {
      return urlState.hasItem() || state.favoritesOnly || Boolean(state.query) || Boolean(state.changeMetric) || state.category !== "all" || state.recent !== "all" || state.sort !== "count" || state.server === GOLD_SERVER;
    }

    function currentListData() {
      const loaded = store.loadedFor(state.server);
      return interactiveMode() && loaded ? loaded : store.previewFor(state.server);
    }

    function currentDetailData() {
      return store.loadedFor(state.server) || store.previewFor(state.server);
    }

    function indexFullData(data) {
      const server = data.servers[0];
      trendsByServerItem.clear();
      dailyTrendsByServerItem.clear();
      searchIndex.clear();
      changeIndexes.clear();
      for (const metric of CHANGE_METRICS) changeIndexes.set(metric, buildPriceChangeIndex(data, metric));
      for (const row of data.items || []) {
        searchIndex.set(rowKey(row), itemSearchText(row));
      }
      for (const row of data.trends || []) {
        const key = rowKey(row);
        if (!trendsByServerItem.has(key)) trendsByServerItem.set(key, []);
        trendsByServerItem.get(key).push(row);
      }
      for (const rows of trendsByServerItem.values()) {
        rows.sort((a, b) => String(a.period_order).localeCompare(String(b.period_order)));
      }
      for (const row of data.daily_trends || []) {
        const key = rowKey(row);
        if (!dailyTrendsByServerItem.has(key)) dailyTrendsByServerItem.set(key, []);
        dailyTrendsByServerItem.get(key).push(row);
      }
      for (const rows of dailyTrendsByServerItem.values()) {
        rows.sort((a, b) => String(a.period_order).localeCompare(String(b.period_order)));
      }
      indexedServer = server;
    }

    function orderedServers() {
      const servers = store.bootstrap ? store.bootstrap.servers : [];
      return [
        ...SERVER_ORDER.filter((server) => servers.includes(server)),
        ...servers.filter((server) => !SERVER_ORDER.includes(server)),
      ];
    }

    function renderOptions() {
      byId("marketServer").innerHTML = orderedServers()
        .map((server) => `<option value="${escapeHtml(server)}">${escapeHtml(server)}</option>`)
        .join("");
      byId("marketServer").value = state.server;
    }

    function ensureGoldSeasonControl() {
      let label = byId("marketGoldSeasonControl");
      if (label) return byId("marketGoldSeason");
      label = root.document.createElement("label");
      label.id = "marketGoldSeasonControl";
      label.append("金鯖年次");
      const select = root.document.createElement("select");
      select.id = "marketGoldSeason";
      label.appendChild(select);
      byId("marketServer").closest("label").insertAdjacentElement("afterend", label);
      return select;
    }

    const goldSeasonSelect = ensureGoldSeasonControl();

    function ensurePriceChangeControls() {
      let select = byId("marketChangeMetric");
      if (!select) {
        const label = root.document.createElement("label");
        label.append("変動率");
        select = root.document.createElement("select");
        select.id = "marketChangeMetric";
        select.innerHTML = '<option value="">非表示</option><option value="reference_gold">参考（日次）</option><option value="market_gold">露店</option><option value="sell_gold">売り叫び</option><option value="buy_gold">買い叫び</option>';
        label.appendChild(select);
        byId("marketSort").closest("label").insertAdjacentElement("afterend", label);
      }
      const sort = byId("marketSort");
      if (sort.options) {
        for (const option of [...sort.options]) {
          if (/^change(?:1|30)(Asc|Desc)$/.test(option.value)) option.remove();
        }
        for (const day of PUBLIC_CHANGE_DAYS) {
          for (const [direction, label] of [["Desc", "値上がり順"], ["Asc", "値下がり順"]]) {
            const value = `change${day}${direction}`;
            if (![...sort.options].some((option) => option.value === value)) {
              const option = root.document.createElement("option");
              option.value = value;
              option.textContent = `${day}日 ${label}`;
              sort.appendChild(option);
            }
          }
        }
      }
      byId("marketChangeNote")?.remove?.();
    }

    ensurePriceChangeControls();
    chartRangeControl(root.document).addEventListener("change", (event) => {
      state.chartRange = Object.hasOwn(CHART_RANGES, event.target.value) ? event.target.value : "all";
      const ticket = ++revision;
      ensureFullData("読み込み中", state.server, ticket)
        .then(() => { if (ticket === revision) renderTable(); })
        .catch((error) => { if (ticket === revision) showError(error); });
    });
    connectChartDetails(byId("detailBody"));

    function renderGoldSeasonOptions() {
      const meta = store.loadedFor(GOLD_SERVER)?.meta || store.bootstrap?.meta || {};
      const seasons = goldSeasonOptions(meta);
      if (!seasons.includes(state.goldSeason)) state.goldSeason = seasons[0] || "";
      goldSeasonSelect.innerHTML = seasons
        .map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`)
        .join("");
      goldSeasonSelect.value = state.goldSeason;
      byId("marketGoldSeasonControl").hidden = !shouldShowGoldSeason(state.server, meta);
    }

    function renderDailyTable(rows) {
      if (!rows.length) return `<div class="market-empty">直近半年の日次データがありません。</div>`;
      return `<div class="market-daily-table-wrap"><table id="table10"><tbody>
        <tr><th>日付</th><th class="num">参考相場</th><th class="num">露店</th><th class="num">売り叫び</th><th class="num">買い叫び</th><th class="num">件数</th></tr>
        ${rows.slice().reverse().map((daily) => `<tr>
          <td>${escapeHtml(daily.period)}</td>
          <td class="num market-ref-price">${escapeHtml(priceText(daily.reference_gold, daily.reference_text) || "-")}</td>
          <td class="num">${escapeHtml(priceText(daily.market_gold, daily.market_text) || "-")}</td>
          <td class="num">${escapeHtml(priceText(daily.sell_gold, daily.sell_text) || "-")}</td>
          <td class="num">${escapeHtml(priceText(daily.buy_gold, daily.buy_text) || "-")}</td>
          <td class="num">${yen.format(daily.count || 0)}</td>
        </tr>`).join("")}
      </tbody></table></div>`;
    }

    function renderDetail(row) {
      if (row && !store.loadedFor(state.server)) {
        byId("detailTitle").textContent = row.display_name || row.item_name;
        byId("detailBody").textContent = "一覧を選択すると価格推移を表示します。";
        return;
      }
      if (!row) {
        byId("detailTitle").textContent = "価格推移";
        byId("detailBody").innerHTML = `<div class="market-empty">一覧からアイテムを選択してください。</div>`;
        return;
      }
      const key = rowKey(row);
      const longTrends = trendsByServerItem.get(key) || [];
      const dailyTrends = dailyTrendsByServerItem.get(key) || [];
      const options = { range: state.chartRange, anchor: chartAnchor(currentDetailData(), state), item: row };
      const trends = state.periodMode === "daily" ? dailyTrends : longTrends;
      const trendOnlyPrice = row.reference_is_trend_only ? " is-trend-only" : "";
      const referenceFallback = Number(row.stack_max || 1) > 1 ? "露店データなし" : "推移のみ";
      const shoutUnitNote = row.shout_unit_uncertain
        ? `<div class="market-note" style="margin-top:8px;">このアイテムの叫び価格は発言上の取引単位です。1個あたりの参考相場には含めていません。</div>`
        : "";
      const meta = activeWindowMeta(store.bootstrap.meta || {}, state);
      byId("detailTitle").textContent = row.display_name || row.item_name;
      byId("detailBody").innerHTML = `
        <dl class="market-kv">
          <dt>サーバ</dt><dd>${escapeHtml(row.server)}</dd>
          <dt>参考相場</dt><dd class="market-ref-price${trendOnlyPrice}">${escapeHtml(priceText(row.reference_gold, row.reference_text) || referenceFallback)}</dd>
          <dt>露店</dt><dd>${escapeHtml(priceText(row.market_gold, row.market_text) || "-")}</dd>
          <dt>売り叫び</dt><dd>${escapeHtml(priceText(row.sell_gold, row.sell_text) || "-")}</dd>
          <dt>買い叫び</dt><dd>${escapeHtml(priceText(row.buy_gold, row.buy_text) || "-")}</dd>
          <dt>集計件数</dt><dd>${yen.format(row.has_recent ? row.recent_count : row.trend_count)}件</dd>
        </dl>
        ${renderPriceChart(trends, options)}
        ${state.periodMode === "daily" ? renderDailyTable(selectChartRows(dailyTrends, state.chartRange, options.anchor, row)) : ""}
        ${shoutUnitNote}
      `;
    }

    function renderTable() {
      const data = currentListData();
      const metric = state.changeMetric || (changeSort(state.sort) ? "reference_gold" : "");
      const changes = metric && indexedServer === state.server ? changeIndexes.get(metric) : new Map();
      const rows = sortedRows(data, state, indexedServer === state.server ? searchIndex : null, changes);
      urlState.validate(rows);
      const shown = rows.slice(0, DISPLAY_LIMIT);
      byId("marketCount").textContent = rows.length > DISPLAY_LIMIT
        ? `${yen.format(rows.length)}件中 ${yen.format(DISPLAY_LIMIT)}件表示`
        : `${yen.format(rows.length)}件`;
      const meta = store.bootstrap.meta || {};
      const windowMeta = activeWindowMeta(meta, state);
      byId("marketSource").textContent = `直近半年: ${windowMeta.recent_cutoff || ""} 以降 / 更新: ${windowMeta.latest_signal_date || ""}`;
      byId("marketRows").innerHTML = `
        <tr>
          <th>アイテム</th><th class="num">参考相場</th><th class="num">露店</th><th class="num">売り叫び</th><th class="num">買い叫び</th>${metric ? PUBLIC_CHANGE_DAYS.map((day) => `<th class="num">${day}日比</th>`).join("") : ""}<th class="num">集計件数</th>
        </tr>
        ${shown.map((row) => {
          const selected = state.selectedKey === rowKey(row) ? " is-selected" : "";
          const muted = row.has_recent ? "" : " is-muted";
          const count = rowActivity(row);
          const trendOnlyPrice = row.reference_is_trend_only ? " is-trend-only" : "";
          return `<tr class="market-row${selected}${muted}" data-key="${escapeHtml(rowKey(row))}">
            <td>${favoriteButton(row, state.favorites, escapeHtml)} ${escapeHtml(row.display_name || row.item_name)}</td>
            <td class="num market-ref-price${trendOnlyPrice}">${escapeHtml(priceText(row.reference_gold, row.reference_text))}</td>
            <td class="num">${escapeHtml(priceText(row.market_gold, row.market_text))}</td>
            <td class="num">${escapeHtml(priceText(row.sell_gold, row.sell_text))}</td>
            <td class="num">${escapeHtml(priceText(row.buy_gold, row.buy_text))}</td>
            ${metric ? PUBLIC_CHANGE_DAYS.map((day) => `<td class="num" title="${escapeHtml(changes.get(priceSeriesKey(row))?.date || "実観測なし")} 基準">${priceChangeText(changes.get(priceSeriesKey(row))?.[day])}</td>`).join("") : ""}
            <td class="num">${yen.format(count)}</td>
          </tr>`;
        }).join("")}`;
      if (!shown.length) {
        byId("marketRows").innerHTML = `<tr><th>相場一覧</th></tr><tr><td><div class="market-empty">該当するアイテムがありません。</div></td></tr>`;
      }

      let selected = rows.find((row) => rowKey(row) === state.selectedKey);
      if (!selected && rows[0]) {
        state.selectedKey = rowKey(rows[0]);
        selected = rows[0];
      }
      const detailData = currentDetailData();
      if (!selected) state.selectedKey = "";
      const detailRow = selected && (detailData.items.find((row) => rowKey(row) === state.selectedKey) || selected);
      renderDetail(detailRow || null);
    }

    async function ensureFullData(message, server = state.server, ticket = revision) {
      const existing = store.loadedFor(server);
      if (existing) {
        if (server === state.server && ticket === revision && indexedServer !== server) indexFullData(existing);
        return existing;
      }
      if (server === state.server && ticket === revision) byId("marketLoadStatus").textContent = message;
      const data = await store.loadServer(server);
      if (server === state.server && ticket === revision) {
        indexFullData(data);
        byId("marketLoadStatus").textContent = "";
      }
      return data;
    }

    async function applyInteractiveChange(ticket = ++revision) {
      if (ticket !== revision) return;
      const server = state.server;
      try {
        if (interactiveMode()) await ensureFullData("読み込み中", server, ticket);
        if (server === state.server && ticket === revision) {
          renderGoldSeasonOptions();
          renderTable();
        }
      } catch (error) { if (ticket === revision) showError(error); }
    }

    function idle(callback) {
      if ("requestIdleCallback" in root) root.requestIdleCallback(callback, { timeout: 1200 });
      else root.setTimeout(callback, 0);
    }

    function showError(error) {
      byId("marketLoadStatus").textContent = `読込失敗: ${error.message}`;
    }

    async function warmServer(server, ticket = revision) {
      try {
        await ensureFullData("読み込み中", server, ticket);
        if (server === state.server && ticket === revision) {
          renderGoldSeasonOptions();
          renderTable();
        }
      } catch (error) {
        if (ticket === revision) showError(error);
      }
    }

    async function restoreLocation() {
      const ticket = ++revision;
      root.clearTimeout(searchTimer);
      const needsData = urlState.read();
      renderOptions();
      try {
        if (needsData) await ensureFullData("読み込み中", state.server, ticket);
        if (ticket !== revision) return;
        const existing = store.loadedFor(state.server);
        if (existing && indexedServer !== state.server) indexFullData(existing);
        renderGoldSeasonOptions();
        renderTable();
      } catch (error) { if (ticket === revision) showError(error); }
    }

    async function initialize() {
      await store.initialize();
      state.server = store.bootstrap.servers.includes("Bridgehead") ? "Bridgehead" : store.bootstrap.servers[0];
      byId("marketLoadStatus").textContent = "";
      await restoreLocation();
    }

    root.addEventListener?.("popstate", () => { if (store.bootstrap) restoreLocation(); });

    byId("marketRows").addEventListener("click", (event) => {
      if (favoriteClick(event)) return;
      const rowElement = event.target.closest("tr[data-key]");
      if (!rowElement) return;
      state.selectedKey = rowElement.dataset.key;
      urlState.write("push", true);
      renderTable();
      const server = state.server;
      const ticket = ++revision;
      ensureFullData("読み込み中", server, ticket)
        .then(() => { if (server === state.server && ticket === revision) renderTable(); })
        .catch((error) => { if (ticket === revision) showError(error); });
    });
    byId("marketSearch").addEventListener("input", (event) => {
      state.query = event.target.value.trim().toLowerCase();
      state.selectedKey = "";
      const ticket = ++revision;
      urlState.write();
      root.clearTimeout(searchTimer);
      searchTimer = root.setTimeout(() => applyInteractiveChange(ticket), 120);
    });
    byId("marketServer").addEventListener("change", (event) => {
      state.server = event.target.value;
      state.selectedKey = "";
      const ticket = ++revision;
      root.clearTimeout(searchTimer);
      indexedServer = "";
      searchIndex.clear();
      trendsByServerItem.clear();
      dailyTrendsByServerItem.clear();
      renderGoldSeasonOptions();
      urlState.write("push");
      renderTable();
      const server = state.server;
      idle(() => { if (ticket === revision) warmServer(server, ticket); });
    });
    goldSeasonSelect.addEventListener("change", (event) => {
      state.goldSeason = event.target.value;
      state.selectedKey = "";
      urlState.write();
      applyInteractiveChange();
    });
    for (const [id, key] of [["marketCategory", "category"], ["marketRecent", "recent"], ["marketSort", "sort"], ["marketChangeMetric", "changeMetric"]]) {
      byId(id).addEventListener("change", (event) => {
        state[key] = event.target.value;
        if (key === "sort") {
          state.sort = normalizePublicSort(state.sort);
          byId("marketSort").value = state.sort;
        }
        if (key === "sort" && changeSort(state.sort) && !state.changeMetric) {
          state.changeMetric = "reference_gold";
          byId("marketChangeMetric").value = state.changeMetric;
        }
        if (key === "changeMetric" && !state.changeMetric && changeSort(state.sort)) {
          state.sort = "count";
          byId("marketSort").value = state.sort;
        }
        state.selectedKey = "";
        urlState.write();
        applyInteractiveChange().catch(showError);
      });
    }
    byId("marketPeriodMode").addEventListener("change", (event) => {
      state.periodMode = event.target.value;
      urlState.write();
      const ticket = ++revision;
      ensureFullData("読み込み中", state.server, ticket)
        .then(() => { if (ticket === revision) renderTable(); })
        .catch((error) => { if (ticket === revision) showError(error); });
    });
    byId("marketForceReload").addEventListener("click", async () => {
      const button = byId("marketForceReload");
      button.disabled = true;
      byId("marketLoadStatus").textContent = "更新中";
      const ticket = ++revision;
      try {
        const requestedServer = state.server;
        const data = await store.forceReload(requestedServer);
        if (ticket !== revision) return;
        state.server = store.bootstrap.servers.includes(requestedServer) ? requestedServer : store.bootstrap.servers[0];
        indexFullData(data);
        renderOptions();
        renderGoldSeasonOptions();
        byId("marketLoadStatus").textContent = "";
        renderTable();
      } catch (error) {
        if (ticket === revision) showError(error);
      } finally {
        button.disabled = false;
      }
    });

    const favoriteClick = connectFavorites(state, state.favorites, () => currentListData().items || [], renderTable, () => {
      renderTable();
      applyInteractiveChange().catch(showError);
    });
    initialize().catch(showError);
  }

  const api = { DISPLAY_LIMIT, GOLD_SERVER, CHANGE_DAYS, PUBLIC_CHANGE_DAYS, normalizePublicSort, FAVORITES_STORAGE_KEY, createFavorites, favoriteButton, connectFavorites, createUrlState, activeWindowMeta, buildPriceChangeIndex, priceSeriesKey, priceChangeText, chartRows, chartX, periodTime, nextChartPeriod, chartAnchor, selectChartRows, chartRangeControl, connectChartDetails, renderPriceChart, goldSeasonOptions, itemSearchText, rowActivity, rowKey, shouldShowGoldSeason, sortedRows, start };
  root.MarketPublicApp = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root.document && root.ProgressiveMarketDataStore) start();
})(typeof globalThis !== "undefined" ? globalThis : this);
