(function (root) {
  "use strict";

  const DISPLAY_LIMIT = 500;
  const SERVER_ORDER = ["Strasserad", "Valutish", "Bridgehead", "Gold Experience"];

  function itemSearchText(row) {
    return `${row.display_name || row.item_name || ""} ${row.option_effects || ""}`.toLowerCase();
  }

  function rowActivity(row) {
    return Number(row.has_recent ? row.recent_count : row.trend_count) || 0;
  }

  function sortedRows(data, state, searchIndex = null) {
    const rows = (data.items || []).filter((row) => {
      const key = `${row.server}|${row.item_key}`;
      const text = searchIndex && searchIndex.has(key) ? searchIndex.get(key) : itemSearchText(row);
      return (!state.query || text.includes(state.query)) &&
        (state.server === "all" || row.server === state.server) &&
        (state.category === "all" || row.category === state.category) &&
        (state.recent === "all" || row.has_recent);
    });
    if (state.sort === "priceDesc") rows.sort((a, b) => Number(b.reference_gold || 0) - Number(a.reference_gold || 0));
    else if (state.sort === "priceAsc") rows.sort((a, b) => Number(a.reference_gold || 0) - Number(b.reference_gold || 0));
    else if (state.sort === "name") rows.sort((a, b) => String(a.display_name || a.item_name).localeCompare(String(b.display_name || b.item_name), "ja"));
    else rows.sort((a, b) => Number(Boolean(b.has_recent)) - Number(Boolean(a.has_recent)) || rowActivity(b) - rowActivity(a));
    return rows;
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
      selectedKey: "",
    };
    const yen = new Intl.NumberFormat("ja-JP");
    const byId = (name) => root.document.getElementById(name);
    const trendsByServerItem = new Map();
    const dailyTrendsByServerItem = new Map();
    const searchIndex = new Map();
    let indexedServer = "";
    let searchTimer = 0;

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
      return Boolean(state.query) || state.category !== "all" || state.recent !== "all" || state.sort !== "count";
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
      for (const row of data.items || []) {
        searchIndex.set(`${row.server}|${row.item_key}`, itemSearchText(row));
      }
      for (const row of data.trends || []) {
        const key = `${row.server}|${row.item_key}`;
        if (!trendsByServerItem.has(key)) trendsByServerItem.set(key, []);
        trendsByServerItem.get(key).push(row);
      }
      for (const rows of trendsByServerItem.values()) {
        rows.sort((a, b) => String(a.period_order).localeCompare(String(b.period_order)));
      }
      for (const row of data.daily_trends || []) {
        const key = `${row.server}|${row.item_key}`;
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

    function pointLine(points, className, width, height, pad, minY, spanY) {
      if (points.length < 1) return "";
      const spanX = Math.max(1, points.length - 1);
      const coords = points.map((point, index) => {
        const x = pad + ((width - pad * 2) * index) / spanX;
        const clamped = Math.max(minY, Math.min(minY + spanY, Number(point.value || 0)));
        const y = height - pad - ((height - pad * 2) * (clamped - minY)) / spanY;
        return { ...point, x, y };
      });
      const path = coords.length >= 2
        ? `<path class="market-line ${className}" d="${coords.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")}"></path>`
        : "";
      const circles = coords.map((point) => `<circle class="market-point ${className}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3"></circle>`).join("");
      const hitPoints = coords.map((point) => `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="8" fill="transparent" pointer-events="all"><title>${escapeHtml(point.label)}</title></circle>`).join("");
      return path + circles + hitPoints;
    }

    function renderChart(rows) {
      const values = [];
      for (const row of rows) {
        for (const key of ["reference_gold", "sell_gold", "buy_gold"]) {
          const value = Number(row[key] || 0);
          if (Number.isFinite(value) && value > 0) values.push(value);
        }
      }
      if (!values.length) return `<div class="market-empty">推移を表示できる価格がありません。</div>`;
      values.sort((a, b) => a - b);
      const minY = values[0] === values[values.length - 1] ? values[0] * 0.95 : values[0];
      const maxY = values[0] === values[values.length - 1] ? values[0] * 1.05 : values[values.length - 1];
      const spanY = Math.max(1, maxY - minY);
      const width = 420;
      const height = 180;
      const pad = 24;
      const ref = rows.filter((row) => row.reference_gold).map((row) => ({ value: row.reference_gold, label: `${row.period} 参考 ${row.reference_text}` }));
      const sell = rows.filter((row) => row.sell_gold).map((row) => ({ value: row.sell_gold, label: `${row.period} 売り ${row.sell_text}` }));
      const buy = rows.filter((row) => row.buy_gold).map((row) => ({ value: row.buy_gold, label: `${row.period} 買い ${row.buy_text}` }));
      return `<div class="market-chart">
        <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="価格推移">
          <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#d8d8d8"></line>
          <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#d8d8d8"></line>
          ${pointLine(ref, "ref", width, height, pad, minY, spanY)}
          ${pointLine(sell, "sell", width, height, pad, minY, spanY)}
          ${pointLine(buy, "buy", width, height, pad, minY, spanY)}
        </svg>
        <div class="market-legend"><span><i></i>緑: 参考相場</span><span class="sell"><i></i>赤: 売り叫び</span><span class="buy"><i></i>青: 買い叫び</span></div>
      </div>`;
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
      if (!row) {
        byId("detailTitle").textContent = "価格推移";
        byId("detailBody").innerHTML = `<div class="market-empty">一覧からアイテムを選択してください。</div>`;
        return;
      }
      const key = `${row.server}|${row.item_key}`;
      const longTrends = trendsByServerItem.get(key) || [];
      const dailyTrends = dailyTrendsByServerItem.get(key) || [];
      const trends = state.periodMode === "daily" ? dailyTrends : longTrends;
      const trendOnlyPrice = row.reference_is_trend_only ? " is-trend-only" : "";
      const referenceFallback = Number(row.stack_max || 1) > 1 ? "露店データなし" : "推移のみ";
      const shoutUnitNote = row.shout_unit_uncertain
        ? `<div class="market-note" style="margin-top:8px;">このアイテムの叫び価格は発言上の取引単位です。1個あたりの参考相場には含めていません。</div>`
        : "";
      const meta = store.bootstrap.meta || {};
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
        ${renderChart(trends)}
        ${state.periodMode === "daily" ? renderDailyTable(dailyTrends) : ""}
        ${shoutUnitNote}
        <div class="market-note" style="margin-top:8px;">${escapeHtml(state.periodMode === "daily" ? `直近${meta.recent_window_days || 183}日を日ごとにまとめています。` : (row.server === "Gold Experience" ? "このサーバは週ごとに推移をまとめています。" : "このサーバは月ごとに推移をまとめています。"))}</div>
      `;
    }

    function renderTable() {
      const data = currentListData();
      const rows = sortedRows(data, state, indexedServer === state.server ? searchIndex : null);
      const shown = rows.slice(0, DISPLAY_LIMIT);
      byId("marketCount").textContent = rows.length > DISPLAY_LIMIT
        ? `${yen.format(rows.length)}件中 ${yen.format(DISPLAY_LIMIT)}件表示`
        : `${yen.format(rows.length)}件`;
      const meta = store.bootstrap.meta || {};
      byId("marketSource").textContent = `直近半年: ${meta.recent_cutoff || ""} 以降 / 更新: ${meta.latest_signal_date || ""}`;
      byId("marketRows").innerHTML = `
        <tr>
          <th>アイテム</th><th class="num">参考相場</th><th class="num">露店</th><th class="num">売り叫び</th><th class="num">買い叫び</th><th class="num">集計件数</th><th>扱い</th>
        </tr>
        ${shown.map((row) => {
          const selected = state.selectedKey === `${row.server}|${row.item_key}` ? " is-selected" : "";
          const muted = row.has_recent ? "" : " is-muted";
          const count = rowActivity(row);
          const trendOnlyPrice = row.reference_is_trend_only ? " is-trend-only" : "";
          return `<tr class="market-row${selected}${muted}" data-key="${escapeHtml(row.server)}|${escapeHtml(row.item_key)}">
            <td>${escapeHtml(row.display_name || row.item_name)}</td>
            <td class="num market-ref-price${trendOnlyPrice}">${escapeHtml(priceText(row.reference_gold, row.reference_text))}</td>
            <td class="num">${escapeHtml(priceText(row.market_gold, row.market_text))}</td>
            <td class="num">${escapeHtml(priceText(row.sell_gold, row.sell_text))}</td>
            <td class="num">${escapeHtml(priceText(row.buy_gold, row.buy_text))}</td>
            <td class="num">${yen.format(count)}</td>
            <td></td>
          </tr>`;
        }).join("")}`;
      if (!shown.length) {
        byId("marketRows").innerHTML = `<tr><th>相場一覧</th></tr><tr><td><div class="market-empty">該当するアイテムがありません。</div></td></tr>`;
      }

      let selected = rows.find((row) => `${row.server}|${row.item_key}` === state.selectedKey);
      if (!selected && rows[0]) {
        state.selectedKey = `${rows[0].server}|${rows[0].item_key}`;
        selected = rows[0];
      }
      const detailData = currentDetailData();
      const detailRow = detailData.items.find((row) => `${row.server}|${row.item_key}` === state.selectedKey) || selected;
      renderDetail(detailRow || null);
    }

    async function ensureFullData(message, server = state.server) {
      const existing = store.loadedFor(server);
      if (existing) {
        if (server === state.server && indexedServer !== server) indexFullData(existing);
        return existing;
      }
      if (server === state.server) byId("marketLoadStatus").textContent = message;
      const data = await store.loadServer(server);
      if (server === state.server) {
        indexFullData(data);
        byId("marketLoadStatus").textContent = "検索データ準備完了";
      }
      return data;
    }

    async function applyInteractiveChange() {
      const server = state.server;
      if (interactiveMode()) await ensureFullData("検索データ読込中", server);
      if (server === state.server) renderTable();
    }

    function idle(callback) {
      if ("requestIdleCallback" in root) root.requestIdleCallback(callback, { timeout: 1200 });
      else root.setTimeout(callback, 0);
    }

    function showError(error) {
      byId("marketLoadStatus").textContent = `読込失敗: ${error.message}`;
    }

    async function warmServer(server) {
      try {
        await ensureFullData("検索データを裏で準備中", server);
        if (server === state.server) renderTable();
        idle(() => store.prefetchRemaining(server).catch(showError));
      } catch (error) {
        showError(error);
      }
    }

    async function initialize() {
      await store.initialize();
      state.server = store.bootstrap.servers.includes("Bridgehead") ? "Bridgehead" : store.bootstrap.servers[0];
      renderOptions();
      byId("marketLoadStatus").textContent = `各サーバ上位${store.bootstrap.top_limit}件を表示`;
      renderTable();
      idle(() => warmServer(state.server));
    }

    byId("marketRows").addEventListener("click", (event) => {
      const rowElement = event.target.closest("tr[data-key]");
      if (!rowElement) return;
      state.selectedKey = rowElement.dataset.key;
      renderTable();
      const server = state.server;
      ensureFullData("詳細データ読込中", server)
        .then(() => { if (server === state.server) renderTable(); })
        .catch(showError);
    });
    byId("marketSearch").addEventListener("input", (event) => {
      state.query = event.target.value.trim().toLowerCase();
      state.selectedKey = "";
      root.clearTimeout(searchTimer);
      searchTimer = root.setTimeout(() => applyInteractiveChange().catch(showError), 120);
    });
    byId("marketServer").addEventListener("change", (event) => {
      state.server = event.target.value;
      state.selectedKey = "";
      indexedServer = "";
      searchIndex.clear();
      trendsByServerItem.clear();
      dailyTrendsByServerItem.clear();
      renderTable();
      idle(() => warmServer(state.server));
    });
    for (const [id, key] of [["marketCategory", "category"], ["marketRecent", "recent"], ["marketSort", "sort"]]) {
      byId(id).addEventListener("change", (event) => {
        state[key] = event.target.value;
        state.selectedKey = "";
        applyInteractiveChange().catch(showError);
      });
    }
    byId("marketPeriodMode").addEventListener("change", (event) => {
      state.periodMode = event.target.value;
      ensureFullData("詳細データ読込中").then(renderTable).catch(showError);
    });
    byId("marketForceReload").addEventListener("click", async () => {
      const button = byId("marketForceReload");
      button.disabled = true;
      byId("marketLoadStatus").textContent = "キャッシュを強制更新中";
      try {
        const requestedServer = state.server;
        const data = await store.forceReload(requestedServer);
        state.server = store.bootstrap.servers.includes(requestedServer) ? requestedServer : store.bootstrap.servers[0];
        indexFullData(data);
        renderOptions();
        byId("marketLoadStatus").textContent = "キャッシュ強制更新完了";
        renderTable();
        idle(() => store.prefetchRemaining(state.server).catch(showError));
      } catch (error) {
        showError(error);
      } finally {
        button.disabled = false;
      }
    });

    initialize().catch(showError);
  }

  const api = { DISPLAY_LIMIT, itemSearchText, rowActivity, sortedRows, start };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root.document && root.ProgressiveMarketDataStore) start();
})(typeof globalThis !== "undefined" ? globalThis : this);
