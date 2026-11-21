(() => {
  "use strict";

  const servers = ["Bridgehead", "Strasserad", "Valutish"];
  const byId = (id) => document.getElementById(id);
  const form = byId("comparison-search");
  const input = byId("comparison-query");
  const results = byId("comparison-results");
  const status = byId("comparison-status");
  const failure = byId("comparison-failure");
  const retry = byId("comparison-retry");
  const body = byId("comparison-rows");
  const pagination = byId("comparison-pagination");
  const previous = byId("comparison-previous");
  const next = byId("comparison-next");
  const pageNumber = byId("comparison-page");
  const scriptUrl = new URL(document.currentScript.src);
  const workerUrl = new URL("market_comparison_worker.js", scriptUrl);
  workerUrl.search = scriptUrl.search;
  const countFormat = new Intl.NumberFormat("ja-JP");
  let worker;
  let requestId = 0;
  let query = "";
  let page = 1;

  byId("search-field").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.isComposing) return;
    const siteQuery = event.currentTarget.value.trim();
    if (siteQuery) location.assign(`https://www.google.com/search?${new URLSearchParams({ q: `site:sokomin.github.io ${siteQuery}` })}`);
  });

  function cell(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function renderRow(item, unavailable, dateCutoff, showCount) {
    const row = document.createElement("tr");
    const name = cell("th", item.name, "comparison-name");
    name.scope = "row";
    const type = item.unit === "Gold" ? item.type : [item.type, item.unit].filter(Boolean).join(" · ");
    name.append(cell("small", type, "comparison-secondary"));
    if (showCount) name.append(cell("small", `${countFormat.format(item.count)}件`, "comparison-secondary"));
    row.append(name);
    const amounts = Object.values(item.cells).filter((value) => value.price && value.amount > 0).map((value) => value.amount);
    const max = Math.max(...amounts);
    for (const server of servers) {
      const value = item.cells[server];
      const td = cell("td", "", "comparison-value");
      td.dataset.server = server;
      const mobileLabel = cell("span", server, "comparison-mobile-label");
      mobileLabel.setAttribute("aria-hidden", "true");
      td.append(mobileLabel);
      if (value?.price) {
        const link = cell("a", value.price, "comparison-price");
        link.href = `index.html?${new URLSearchParams({ server, item: `${server}||${item.key}` })}`;
        link.setAttribute("aria-label", `${server} ${item.name} ${value.price}の相場推移`);
        td.append(link);
        if (amounts.length > 1 && value.amount > 0) {
          const track = cell("span", "", "comparison-bar");
          track.setAttribute("aria-hidden", "true");
          const fill = document.createElement("span");
          fill.style.width = `${value.amount / max * 100}%`;
          track.append(fill);
          td.append(track);
        }
        if (value.historical) td.append(cell("span", "過去相場", "comparison-secondary"));
      } else {
        td.append(cell("span", unavailable.includes(server) ? "取得できません" : "データなし", "comparison-secondary"));
      }
      if (value?.observed && value.observed <= dateCutoff) {
        const date = cell("time", value.observed, "comparison-secondary");
        date.dateTime = value.observed;
        td.append(date);
      }
      row.append(td);
    }
    return row;
  }

  function render({ id, rows, unavailable, total, page: selected, pages, top, asOf, latestObserved }) {
    if (id !== requestId) return;
    page = selected;
    const latest = Date.parse(`${latestObserved}T00:00:00Z`);
    const dateCutoff = Number.isFinite(latest) ? new Date(latest - 2 * 86400000).toISOString().slice(0, 10) : "";
    body.replaceChildren(...rows.map((row) => renderRow(row, unavailable, dateCutoff, !top)));
    results.hidden = rows.length === 0;
    results.setAttribute("aria-busy", "false");
    failure.textContent = unavailable.length ? `${unavailable.join("・")}の相場を取得できませんでした。` : "";
    if (asOf) failure.append(` ${asOf}時点の相場を表示しています。`);
    retry.hidden = unavailable.length === 0;
    if (!total && unavailable.length === servers.length) status.textContent = "";
    else if (!total) status.textContent = unavailable.length ? "取得できたサーバーに該当するアイテムがありません。" : "該当するアイテムがありません。";
    else if (top) status.textContent = "";
    else status.textContent = `${countFormat.format(total)}件`;
    pagination.hidden = pages <= 1;
    pageNumber.textContent = `${page} / ${pages}`;
    previous.disabled = page <= 1;
    next.disabled = page >= pages;
  }

  function workerFailed() {
    worker?.terminate();
    worker = undefined;
    render({ id: requestId, rows: [], unavailable: servers, total: 0, page: 1, pages: 1 });
  }

  function request(target, reload = false) {
    status.textContent = "相場を読み込み中…";
    failure.textContent = "";
    retry.hidden = true;
    results.setAttribute("aria-busy", "true");
    previous.disabled = true;
    next.disabled = true;
    try {
      if (!worker) {
        worker = new Worker(workerUrl);
        worker.onmessage = ({ data }) => render(data);
        worker.onerror = workerFailed;
      }
      worker.postMessage({ id: ++requestId, query, page: target, retry: reload });
    } catch (error) {
      workerFailed();
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    query = input.value.trim();
    request(1);
  });
  input.addEventListener("input", () => {
    if (!input.value && query) {
      query = "";
      request(1);
    }
  });
  function changePage(target) {
    results.focus({ preventScroll: true });
    results.scrollIntoView({ block: "start" });
    request(target);
  }
  previous.addEventListener("click", () => changePage(page - 1));
  next.addEventListener("click", () => changePage(page + 1));
  retry.addEventListener("click", () => request(page, true));
  request(1);
})();
