(function (root) {
  "use strict";
  const SERVERS = { b: "Bridgehead", s: "Strasserad", v: "Valutish", g: "Gold Experience" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const validId = (id) => typeof id === "string" && /^[a-f0-9]{24}$/.test(id);
  const validKey = (key) => typeof key === "string" && /^[a-f0-9]{12}$/.test(key);
  function priceText(price) {
    if (!price || !Number.isInteger(price.amount) || price.amount < 0) return "価格未取得";
    const amount = price.amount.toLocaleString("ja-JP");
    return amount + ({ ingot: "本", gold: "G" }[price.currency] || "（通貨未取得）");
  }
  function badges(item) {
    const labels = [];
    if (item.quantity > 1) labels.push(`${item.quantity.toLocaleString("ja-JP")}個`);
    if (item.smelting_level) labels.push(`製錬 +${item.smelting_level}`);
    if (item.available) labels.push(`解放 ${item.opened}/${item.available}`);
    return labels.map((v) => `<span class="detail-badge">${esc(v)}</span>`).join("");
  }
  function renderOffer(item, selected, query) {
    const params = new URLSearchParams(query);
    params.set("id", item.id);
    return `<li><a class="detail-offer${selected ? " is-selected" : ""}" href="?${esc(params.toString())}" data-offer="${esc(item.id)}"${selected ? ' aria-current="true"' : ""}><span class="detail-offer-name">${esc(item.display_name)}</span><strong class="detail-offer-price">${esc(priceText(item.price))}</strong><span class="detail-badges">${badges(item)}</span></a></li>`;
  }
  function renderDetail(item) {
    const groups = (item.groups || []).map((group) => `<section class="detail-option-group"><h3>${esc(group.name)}</h3><ul>${group.lines.map((line) => `<li class="${line.active === false ? "is-sealed" : ""}">${line.slot ? `<span class="detail-slot">${line.slot}.</span> ` : ""}${line.label ? `<span class="detail-option-label">${esc(line.label)}</span> ` : ""}${esc(line.text)}${line.active === false ? ' <span class="detail-seal">封印</span>' : ""}</li>`).join("")}</ul></section>`).join("");
    const date = item.date.replace(/^(....)(..)(..)$/, "$1/$2/$3");
    return `<article class="detail-tooltip"><div class="detail-sale"><span>販売価格${item.quantity > 1 ? ` / ${esc(item.quantity.toLocaleString("ja-JP"))}個` : ""}</span><strong>${esc(priceText(item.price))}</strong></div><p class="detail-capture-date">${esc(SERVERS[item.server] || "")} / ${esc(date)}</p><h2>${esc(item.display_name)}</h2><p class="detail-item-type">${esc(item.item_type)}</p>${groups}${(item.notes || []).map((note) => `<p class="detail-note">${esc(note)}</p>`).join("")}</article>`;
  }
  function matchingOffers(items, sokominDetailState) {
    const query = String(sokominDetailState.query || "").normalize("NFKC").toLowerCase();
    return items.filter((item) => (!sokominDetailState.key || item.item_key === sokominDetailState.key) && (!sokominDetailState.complexOnly || item.complex) && (!query || `${item.display_name} ${item.item_type}`.normalize("NFKC").toLowerCase().includes(query)));
  }
  function verifyDetail(item, offer, server, date) {
    return item?.schema === 1 && item.id === offer.id && item.item_id === offer.item_id && item.item_key === offer.item_key && item.server === server && item.date === date && item.price?.amount === offer.price.amount && item.price?.currency === offer.price.currency && Array.isArray(item.groups);
  }
  async function start(sokominDetailApp, fetcher = root.fetch.bind(root)) {
    const doc = sokominDetailApp.ownerDocument;
    const byId = (id) => doc.getElementById(id);
    const params = new URLSearchParams(root.location.search);
    const minDetailDataRoot = new URL(sokominDetailApp.dataset.dataRoot, root.location.href);
    const sokominDetailState = { server: params.get("server") || sokominDetailApp.dataset.server || "b", date: params.get("date") || sokominDetailApp.dataset.date || "", key: validKey(params.get("key")) ? params.get("key") : "", id: validId(params.get("id")) ? params.get("id") : "", query: "", complexOnly: false };
    let captures = [], items = [], minDetailRevision = 0;
    const details = new Map();
    async function json(path) {
      const response = await fetcher(new URL(path, minDetailDataRoot).href, { cache: "no-cache" });
      if (!response.ok) throw new Error("detail unavailable");
      return response.json();
    }
    function urlState() {
      const query = new URLSearchParams({ server: sokominDetailState.server, date: sokominDetailState.date });
      if (sokominDetailState.key) query.set("key", sokominDetailState.key);
      if (sokominDetailState.id) query.set("id", sokominDetailState.id);
      return query;
    }
    function writeLocation(replace = false) {
      root.history[replace ? "replaceState" : "pushState"](null, "", `?${urlState()}`);
    }
    async function selectOffer(offer, navigate = false) {
      const ticket = ++minDetailRevision;
      sokominDetailState.id = offer.id;
      if (navigate) writeLocation();
      byId("detailPanel").innerHTML = '<p class="detail-loading">読み込み中</p>';
      try {
        const cacheKey = `${sokominDetailState.server}/${sokominDetailState.date}/${offer.id}`;
        const item = details.get(cacheKey) || await json(`${sokominDetailState.server}/${sokominDetailState.date}/items/${offer.id}.json`);
        if (ticket !== minDetailRevision) return;
        if (!verifyDetail(item, offer, sokominDetailState.server, sokominDetailState.date)) throw new Error("detail mismatch");
        details.set(cacheKey, item);
        byId("detailPanel").innerHTML = renderDetail(item);
        renderList(false);
      } catch (error) {
        if (ticket !== minDetailRevision) return;
        byId("detailPanel").innerHTML = '<p role="alert">詳細を読み込めませんでした。</p><button type="button" id="detailRetry">再読み込み</button>';
        byId("detailRetry").addEventListener("click", () => selectOffer(offer));
      }
    }
    function renderList(select = true) {
      const shown = matchingOffers(items, sokominDetailState);
      byId("offerCount").textContent = `${shown.length.toLocaleString("ja-JP")}件`;
      byId("detailOffers").innerHTML = shown.map((item) => renderOffer(item, item.id === sokominDetailState.id, urlState())).join("") || '<li class="detail-empty">該当するアイテムがありません。</li>';
      if (!select) return;
      const offer = shown.find((item) => item.id === sokominDetailState.id) || shown[0];
      if (offer) selectOffer(offer);
      else { ++minDetailRevision; sokominDetailState.id = ""; byId("detailPanel").innerHTML = ""; }
    }
    async function loadDay() {
      const ticket = ++minDetailRevision;
      items = [];
      byId("detailOffers").innerHTML = "";
      byId("detailPanel").innerHTML = "";
      byId("detailStatus").textContent = "読み込み中";
      try {
        const data = await json(`${sokominDetailState.server}/${sokominDetailState.date}/catalog.json`);
        if (ticket !== minDetailRevision) return;
        if (data.schema !== 1 || data.server !== sokominDetailState.server || data.date !== sokominDetailState.date || !Array.isArray(data.items)) throw new Error("catalog mismatch");
        items = data.items.filter((item) => validId(item.id) && validKey(item.item_key));
        byId("detailStatus").textContent = "";
        renderList();
      } catch (error) {
        if (ticket !== minDetailRevision) return;
        byId("detailStatus").innerHTML = '一覧を読み込めませんでした。<button type="button" id="catalogRetry">再読み込み</button>';
        byId("catalogRetry").addEventListener("click", loadDay);
      }
    }
    function updateDates() {
      const days = captures.filter((c) => c.server === sokominDetailState.server).map((c) => c.date);
      if (!days.includes(sokominDetailState.date)) sokominDetailState.date = days[0] || "";
      byId("captureDate").innerHTML = days.map((day) => `<option value="${day}">${day.replace(/^(....)(..)(..)$/, "$1/$2/$3")}</option>`).join("");
      byId("captureDate").value = sokominDetailState.date;
    }
    byId("detailOffers").addEventListener("click", (event) => {
      const link = event.target.closest("a[data-offer]");
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
      const offer = items.find((item) => item.id === link.dataset.offer);
      if (!offer) return;
      event.preventDefault();
      selectOffer(offer, true);
    });
    byId("detailSearch").addEventListener("input", (event) => { sokominDetailState.query = event.target.value; renderList(); });
    byId("complexOnly").addEventListener("change", (event) => { sokominDetailState.complexOnly = event.target.checked; renderList(); });
    byId("detailReset").addEventListener("click", () => { sokominDetailState.key = ""; sokominDetailState.query = ""; byId("detailSearch").value = ""; writeLocation(); renderList(); });
    byId("captureServer").addEventListener("change", (event) => { sokominDetailState.server = event.target.value; sokominDetailState.key = ""; sokominDetailState.id = ""; updateDates(); writeLocation(); loadDay(); });
    byId("captureDate").addEventListener("change", (event) => { sokominDetailState.date = event.target.value; sokominDetailState.id = ""; writeLocation(); loadDay(); });
    root.addEventListener("popstate", () => {
      const query = new URLSearchParams(root.location.search);
      sokominDetailState.server = Object.hasOwn(SERVERS, query.get("server")) ? query.get("server") : sokominDetailState.server;
      sokominDetailState.date = query.get("date") || sokominDetailState.date;
      sokominDetailState.key = validKey(query.get("key")) ? query.get("key") : "";
      sokominDetailState.id = validId(query.get("id")) ? query.get("id") : "";
      byId("captureServer").value = sokominDetailState.server; updateDates(); loadDay();
    });
    async function initialize() {
      byId("detailStatus").textContent = "読み込み中";
      try {
        const data = await json("catalog.json");
        captures = data.captures.filter((c) => Object.hasOwn(SERVERS, c.server) && /^\d{8}$/.test(c.date)).sort((a, b) => b.date.localeCompare(a.date));
        const servers = [...new Set(captures.map((c) => c.server))];
        if (!servers.length) throw new Error("empty captures");
        if (!servers.includes(sokominDetailState.server)) sokominDetailState.server = servers[0];
        byId("captureServer").innerHTML = servers.map((s) => `<option value="${s}">${SERVERS[s]}</option>`).join("");
        byId("captureServer").value = sokominDetailState.server;
        updateDates(); writeLocation(true); await loadDay();
      } catch (error) {
        byId("detailStatus").innerHTML = '取得日を読み込めませんでした。<button type="button" id="captureRetry">再読み込み</button>';
        byId("captureRetry").addEventListener("click", initialize);
      }
    }
    await initialize();
  }
  const api = { priceText, renderOffer, renderDetail, matchingOffers, verifyDetail, start };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MarketItemDetail = api;
  if (root.document) {
    const sokominDetailApp = root.document.getElementById("itemDetailApp");
    if (sokominDetailApp) start(sokominDetailApp);
  }
})(typeof window !== "undefined" ? window : globalThis);
