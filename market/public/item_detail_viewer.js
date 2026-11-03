(function (root) {
  "use strict";
  const SERVERS = { b: "Bridgehead", s: "Strasserad", v: "Valutish", g: "Gold Experience" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const validId = (id) => typeof id === "string" && /^[a-f0-9]{24}$/.test(id);
  const validKey = (key) => typeof key === "string" && /^[a-f0-9]{12}$/.test(key);
  const dateText = (date) => String(date || "").replace(/^(....)(..)(..)$/, "$1/$2/$3");
  function goldValue(price) {
    if (!Number.isInteger(price?.amount) || price.amount < 0) return -1;
    return price.currency === "ingot" ? price.amount * 100000000 : price.currency === "gold" ? price.amount : -1;
  }
  const excludedPrice = (price) => goldValue(price) > 200000 * 100000000;
  function groupOffers(items) {
    const groups = new Map();
    for (const item of items) {
      if (excludedPrice(item.price)) continue;
      const variant = /^[a-f0-9]{64}$/.test(item.variant_key || "") ? item.variant_key : item.id;
      const key = JSON.stringify([item.server, item.date, item.item_id, item.item_key, variant]);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    return [...groups.values()].map((offers) => {
      offers.sort((a, b) => goldValue(b.price) - goldValue(a.price) || a.id.localeCompare(b.id));
      return { ...offers[0], offers };
    }).sort((a, b) => goldValue(b.price) - goldValue(a.price) || String(b.date || "").localeCompare(a.date || "") || a.id.localeCompare(b.id));
  }
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
    if (excludedPrice(item.price)) return "";
    const params = new URLSearchParams(query);
    params.set("id", item.id);
    if (params.get("date") === "all") params.set("offerDate", item.date);
    else params.delete("offerDate");
    const offers = item.offers || [item], lowest = offers[offers.length - 1];
    const price = goldValue(lowest.price) === goldValue(item.price) ? priceText(item.price) : priceText(lowest.price) + "～" + priceText(item.price);
    return `<li><a class="detail-offer${selected ? " is-selected" : ""}" href="?${esc(params.toString())}" data-offer="${esc(item.id)}" data-date="${esc(item.date || "")}"${selected ? ' aria-current="true"' : ""}><span class="detail-offer-name">${esc(item.display_name)}</span><strong class="detail-offer-price">${esc(price)}</strong><span class="detail-badges">${badges(item)}${offers.length > 1 ? `<span class="detail-badge">${offers.length.toLocaleString("ja-JP")}出品</span>` : ""}${item.date ? `<span class="detail-badge">${esc(dateText(item.date))}</span>` : ""}</span></a></li>`;
  }
  function renderDetail(item, offers = [item]) {
    if (excludedPrice(item.price)) return "";
    offers = offers.filter((offer) => !excludedPrice(offer.price));
    const groups = (item.groups || []).map((group) => `<section class="detail-option-group"><h3>${esc(group.name)}</h3><ul>${group.lines.map((line) => `<li class="${line.active === false ? "is-sealed" : ""}">${line.slot ? `<span class="detail-slot">${line.slot}.</span> ` : ""}${line.label ? `<span class="detail-option-label">${esc(line.label)}</span> ` : ""}${esc(line.text)}${line.active === false ? ' <span class="detail-seal">封印</span>' : ""}</li>`).join("")}</ul></section>`).join("");
    const date = item.date.replace(/^(....)(..)(..)$/, "$1/$2/$3");
    const sales = offers.map((offer) => `<div class="detail-sale"><span>販売価格${offer.quantity > 1 ? ` / ${esc(offer.quantity.toLocaleString("ja-JP"))}個` : ""}</span><strong>${esc(priceText(offer.price))}</strong></div>`).join("");
    return `<article class="detail-tooltip">${sales}<p class="detail-capture-date">${esc(SERVERS[item.server] || "")} / ${esc(date)}</p><h2>${esc(item.display_name)}</h2><p class="detail-item-type">${esc(item.item_type)}</p>${groups}${(item.notes || []).map((note) => `<p class="detail-note">${esc(note)}</p>`).join("")}</article>`;
  }
  function matchingOffers(items, sokominDetailState) {
    const query = String(sokominDetailState.query || "").normalize("NFKC").toLowerCase();
    return items.filter((item) => !excludedPrice(item.price) && (!sokominDetailState.key || item.item_key === sokominDetailState.key) && (!sokominDetailState.complexOnly || item.complex) && (!query || `${item.display_name} ${item.item_type}`.normalize("NFKC").toLowerCase().includes(query)));
  }
  function verifyDetail(item, offer, server, date) {
    return item?.schema === 1 && !excludedPrice(item.price) && item.id === offer.id && item.item_id === offer.item_id && item.item_key === offer.item_key && item.server === server && item.date === date && item.price?.amount === offer.price.amount && item.price?.currency === offer.price.currency && item.quantity === offer.quantity && Array.isArray(item.groups);
  }
  function variantIdentity(item) {
    const canonical = (value) => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])])) : value;
    return JSON.stringify(canonical(Object.fromEntries(Object.entries(item).filter(([key]) => !["schema", "id", "server", "date", "price", "quantity"].includes(key)))));
  }
  async function mapLimited(values, callback) {
    const results = new Array(values.length);
    let next = 0;
    await Promise.all(Array.from({ length: Math.min(4, values.length) }, async () => {
      while (next < values.length) {
        const index = next++;
        results[index] = await callback(values[index]);
      }
    }));
    return results;
  }
  async function start(sokominDetailApp, fetcher = root.fetch.bind(root)) {
    const doc = sokominDetailApp.ownerDocument;
    const byId = (id) => doc.getElementById(id);
    const params = new URLSearchParams(root.location.search);
    const minDetailDataRoot = new URL(sokominDetailApp.dataset.dataRoot, root.location.href);
    const sokominDetailState = { server: params.get("server") || sokominDetailApp.dataset.server || "b", date: params.get("date") || sokominDetailApp.dataset.date || "", key: "", id: "", offerDate: "", query: "", complexOnly: false, limit: 100 };
    let captures = [], items = [], minDetailRevision = 0, catalogRevision = 0, loadingCatalog = false;
    const details = new Map(), catalogs = new Map();
    function readFilters(query) {
      sokominDetailState.key = validKey(query.get("key")) ? query.get("key") : "";
      sokominDetailState.id = validId(query.get("id")) ? query.get("id") : "";
      sokominDetailState.offerDate = /^\d{8}$/.test(query.get("offerDate")) ? query.get("offerDate") : "";
      sokominDetailState.query = query.get("q") || "";
      sokominDetailState.complexOnly = query.get("complex") === "1";
      sokominDetailState.limit = query.get("limit") === "all" ? 0 : 100;
      byId("detailSearch").value = sokominDetailState.query;
      byId("complexOnly").checked = sokominDetailState.complexOnly;
      byId("detailLimit").value = sokominDetailState.limit ? "100" : "all";
    }
    readFilters(params);
    async function json(path) {
      const response = await fetcher(new URL(path, minDetailDataRoot).href, { cache: "no-cache" });
      if (!response.ok) throw new Error("detail unavailable");
      return response.json();
    }
    function urlState() {
      const query = new URLSearchParams({ server: sokominDetailState.server, date: sokominDetailState.date });
      if (sokominDetailState.key) query.set("key", sokominDetailState.key);
      if (sokominDetailState.id) query.set("id", sokominDetailState.id);
      if (sokominDetailState.date === "all" && sokominDetailState.offerDate) query.set("offerDate", sokominDetailState.offerDate);
      if (sokominDetailState.query) query.set("q", sokominDetailState.query);
      if (sokominDetailState.complexOnly) query.set("complex", "1");
      if (!sokominDetailState.limit) query.set("limit", "all");
      return query;
    }
    function writeLocation(replace = false) {
      root.history[replace ? "replaceState" : "pushState"](null, "", `?${urlState()}`);
    }
    const selected = (group) => group.offers.some((offer) => offer.id === sokominDetailState.id && (!sokominDetailState.offerDate || offer.date === sokominDetailState.offerDate));
    async function selectOffer(group, navigate = false) {
      const ticket = ++minDetailRevision;
      const server = group.server, date = group.date;
      const offer = group.offers.find((item) => item.id === sokominDetailState.id) || group;
      sokominDetailState.id = offer.id;
      sokominDetailState.offerDate = date;
      writeLocation(!navigate);
      byId("detailPanel").innerHTML = '<p class="detail-loading">読み込み中</p>';
      renderList(false);
      try {
        const records = await mapLimited(group.offers, async (row) => {
          const cacheKey = `${server}/${date}/${row.id}`;
          const item = details.get(cacheKey) || await json(`${server}/${date}/items/${row.id}.json`);
          if (!verifyDetail(item, row, server, date)) throw new Error("detail mismatch");
          details.set(cacheKey, item);
          return item;
        });
        if (ticket !== minDetailRevision) return;
        if (records.some((item) => variantIdentity(item) !== variantIdentity(records[0]))) throw new Error("variant mismatch");
        byId("detailPanel").innerHTML = renderDetail(records.find((row) => row.id === offer.id) || records[0], records);
      } catch (error) {
        if (ticket !== minDetailRevision) return;
        byId("detailPanel").innerHTML = '<p role="alert">詳細を読み込めませんでした。</p><button type="button" id="detailRetry">再読み込み</button>';
        byId("detailRetry").addEventListener("click", () => { for (const row of group.offers) details.delete(`${server}/${date}/${row.id}`); selectOffer(group); });
      }
    }
    function renderList(select = true) {
      if (loadingCatalog) return;
      const matched = groupOffers(matchingOffers(items, sokominDetailState));
      const shown = sokominDetailState.limit ? matched.slice(0, sokominDetailState.limit) : matched;
      byId("offerCount").textContent = shown.length < matched.length ? `${shown.length.toLocaleString("ja-JP")} / ${matched.length.toLocaleString("ja-JP")}件` : `${shown.length.toLocaleString("ja-JP")}件`;
      byId("detailOffers").innerHTML = shown.map((item) => renderOffer(item, selected(item), urlState())).join("") || '<li class="detail-empty">該当するアイテムがありません。</li>';
      if (!select) return;
      const offer = matched.find(selected) || shown[0];
      if (offer) selectOffer(offer);
      else { ++minDetailRevision; sokominDetailState.id = ""; sokominDetailState.offerDate = ""; byId("detailPanel").innerHTML = ""; writeLocation(true); }
    }
    async function loadDay() {
      const ticket = ++catalogRevision;
      ++minDetailRevision;
      const server = sokominDetailState.server, date = sokominDetailState.date;
      const days = date === "all" ? [...new Set(captures.filter((c) => c.server === server).map((c) => c.date))] : [date];
      loadingCatalog = true;
      items = [];
      byId("offerCount").textContent = "";
      byId("detailOffers").innerHTML = "";
      byId("detailPanel").innerHTML = "";
      byId("detailStatus").textContent = "読み込み中";
      try {
        const lists = await mapLimited(days, async (day) => {
          const cacheKey = `${server}/${day}`;
          let data = catalogs.get(cacheKey);
          if (!data) {
            data = await json(`${server}/${day}/catalog.json`);
            if (data.schema !== 1 || data.server !== server || data.date !== day || !Array.isArray(data.items)) throw new Error("catalog mismatch");
            catalogs.set(cacheKey, data);
          }
          return data.items.filter((item) => validId(item.id) && validKey(item.item_key) && !excludedPrice(item.price)).map((item) => ({ ...item, server, date: day }));
        });
        if (ticket !== catalogRevision) return;
        items = lists.flat();
        loadingCatalog = false;
        byId("detailStatus").textContent = "";
        renderList();
      } catch (error) {
        if (ticket !== catalogRevision) return;
        loadingCatalog = false;
        byId("detailStatus").innerHTML = '一覧を読み込めませんでした。<button type="button" id="catalogRetry">再読み込み</button>';
        byId("catalogRetry").addEventListener("click", loadDay);
      }
    }
    function updateDates() {
      const days = [...new Set(captures.filter((c) => c.server === sokominDetailState.server).map((c) => c.date))];
      if (sokominDetailState.date !== "all" && !days.includes(sokominDetailState.date)) sokominDetailState.date = days[0] || "";
      byId("captureDate").innerHTML = '<option value="all">全日付</option>' + days.map((day) => `<option value="${day}">${dateText(day)}</option>`).join("");
      byId("captureDate").value = sokominDetailState.date;
    }
    byId("detailOffers").addEventListener("click", (event) => {
      const link = event.target.closest("a[data-offer]");
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
      const offer = groupOffers(items).find((item) => item.id === link.dataset.offer && (!link.dataset.date || item.date === link.dataset.date));
      if (!offer) return;
      event.preventDefault();
      selectOffer(offer, true);
    });
    function filterChanged() { sokominDetailState.id = ""; sokominDetailState.offerDate = ""; writeLocation(); renderList(); }
    byId("detailSearch").addEventListener("input", (event) => { sokominDetailState.query = event.target.value; filterChanged(); });
    byId("complexOnly").addEventListener("change", (event) => { sokominDetailState.complexOnly = event.target.checked; filterChanged(); });
    byId("detailLimit").addEventListener("change", (event) => { sokominDetailState.limit = event.target.value === "all" ? 0 : 100; filterChanged(); });
    byId("detailReset").addEventListener("click", () => { sokominDetailState.key = ""; sokominDetailState.query = ""; sokominDetailState.complexOnly = false; sokominDetailState.limit = 0; byId("detailSearch").value = ""; byId("complexOnly").checked = false; byId("detailLimit").value = "all"; filterChanged(); });
    byId("captureServer").addEventListener("change", (event) => { sokominDetailState.server = event.target.value; sokominDetailState.key = ""; sokominDetailState.id = ""; sokominDetailState.offerDate = ""; updateDates(); writeLocation(); loadDay(); });
    byId("captureDate").addEventListener("change", (event) => { sokominDetailState.date = event.target.value; sokominDetailState.id = ""; sokominDetailState.offerDate = ""; writeLocation(); loadDay(); });
    root.addEventListener("popstate", () => {
      const query = new URLSearchParams(root.location.search);
      sokominDetailState.server = Object.hasOwn(SERVERS, query.get("server")) ? query.get("server") : sokominDetailState.server;
      sokominDetailState.date = query.get("date") || "";
      readFilters(query);
      byId("captureServer").value = sokominDetailState.server; updateDates(); loadDay();
    });
    async function initialize() {
      byId("detailStatus").textContent = "読み込み中";
      try {
        const data = await json("catalog.json");
        if (data.schema !== 1 || !Array.isArray(data.captures)) throw new Error("capture mismatch");
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
  const api = { priceText, goldValue, groupOffers, renderOffer, renderDetail, matchingOffers, verifyDetail, variantIdentity, start };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MarketItemDetail = api;
  if (root.document) {
    const sokominDetailApp = root.document.getElementById("itemDetailApp");
    if (sokominDetailApp) start(sokominDetailApp);
  }
})(typeof window !== "undefined" ? window : globalThis);
