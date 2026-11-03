(function (root) {
  "use strict";
  const MATERIALS = Object.freeze({
    "炎の石": "260763c8e1e6",
    "神秘の石": "cdc0d7ba3b29",
    "結晶石": "9db697b3f302"
  });
  const SERVERS_sokomin = ["Bridgehead", "Strasserad", "Valutish", "Gold Experience"];
  const GOLD_PER_HON = 100000000;
  const positive_min = x => typeof x === "number" && Number.isFinite(x) && x > 0;
  const sameSeason_sokomin = (row, server, year) => row.server === server &&
    (server === "Gold Experience" ? row.season_year === year : !row.season_year);
  function dayOK(day) {
    return typeof day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day) &&
      Number.isFinite(Date.parse(day)) && new Date(day).toISOString().slice(0, 10) === day;
  }
  function cleanItem(row, name, key) {
    return row.item_key === key && row.item_name === name && row.display_name === name &&
      row.option_count === 0 && row.option_variant === false && row.option_unresolved_count === 0 &&
      ["option_names", "option_effects", "option_label"].every(k => row[k] === "");
  }
  function quote(data, name, server, year) {
    const no = reason => ({ available: false, reason });
    if (!SERVERS_sokomin.includes(server) || (server === "Gold Experience" && !/^\d{4}$/.test(year || ""))) return no("server_year");
    const key = MATERIALS[name];
    if (!key) return no("unsupported");
    if (!Array.isArray(data?.items) || !Array.isArray(data?.daily_trends)) return no("data");
    const matches_sokomin = data.items.filter(r => sameSeason_sokomin(r, server, year) && r.item_name === name);
    if (matches_sokomin.length !== 1) return no(matches_sokomin.length ? "ambiguous" : "missing");
    const item_sokomin = matches_sokomin[0];
    if (!cleanItem(item_sokomin, name, key)) return no("identity_options");
    if (item_sokomin.unit !== "Gold") return no("unit");
    // Stackable materials use the market unit price, never the ambiguous shout-set prices.
    if (!Number.isInteger(item_sokomin.stack_max) || item_sokomin.stack_max <= 1 ||
        !positive_min(item_sokomin.market_count) || !positive_min(item_sokomin.reference_gold) ||
        item_sokomin.reference_gold !== item_sokomin.market_gold || item_sokomin.reference_is_trend_only !== false ||
        item_sokomin.reference_is_manual === true || item_sokomin.has_recent !== true) return no("price");
    const days_min = data.daily_trends.filter(r => r.item_key === key && sameSeason_sokomin(r, server, year) &&
      r.stack_max === item_sokomin.stack_max && positive_min(r.market_count) && positive_min(r.market_gold) &&
      r.reference_gold === r.market_gold && dayOK(r.period_order) &&
      (server !== "Gold Experience" || r.period_order.slice(0, 4) === year));
    if (!days_min.length) return no("observation_date");
    const latest_sokomin = days_min.reduce((a, b) => a.period_order > b.period_order ? a : b).period_order;
    if (days_min.filter(r => r.period_order === latest_sokomin).length !== 1) return no("ambiguous_date");
    return { available: true, name, itemKey: key, server,
      goldYear: server === "Gold Experience" ? year : null,
      observedDate: latest_sokomin, priceGoldPerItem: item_sokomin.reference_gold,
      sourceUnit: "Gold/個", source: "reference_market", goldPerHon: GOLD_PER_HON };
  }
  function setPrice(q, unit, quantity) {
    if (!q?.available || !positive_min(q.priceGoldPerItem) || !positive_min(quantity)) return null;
    const divisor_sokomin = unit === "本" ? GOLD_PER_HON : unit === "Gold" ? 1 : null;
    if (!divisor_sokomin) return null;
    const value = q.priceGoldPerItem / divisor_sokomin * quantity;
    return positive_min(value) ? value : null;
  }
  function planImport(state, index, q) {
    const row = state?.rows?.[index];
    if (!row || row.name !== q?.name || MATERIALS[row.name] !== q.itemKey || !positive_min(row.need)) return null;
    const value = setPrice(q, state.unit, row.setQty);
    if (value === null) return null;
    return { index, expected: JSON.stringify(state), setPrice: value,
      provenance: { ...q, targetUnit: state.unit, setQty: row.setQty, setPrice: value } };
  }
  function minimum(state) {
    if (!["本", "Gold"].includes(state?.unit) || !state.rows?.length) return null;
    const contexts_sokomin = new Set(state.rows.filter(r => r.marketPrice).map(r =>
      JSON.stringify([r.marketPrice.server, r.marketPrice.goldYear])));
    if (contexts_sokomin.size > 1) return null;
    // Same comparison as phase_expect: set price / set quantity * quantity per catalyst.
    let best = null;
    for (const [index, r] of state.rows.entries()) {
      if (![r.need, r.setQty, r.setPrice].every(positive_min)) return null;
      const value = r.setPrice / r.setQty * r.need;
      if (!positive_min(value)) return null;
      if (!best || value < best.value) best = { index, name: r.name, value };
    }
    return { ...best, hon: best.value / (state.unit === "Gold" ? GOLD_PER_HON : 1) };
  }
  function mount(doc, data, bridge, runCosts) {
    const host_min = doc.getElementById("phase-market");
    if (!host_min || !bridge) return;
    const server = doc.getElementById("phase-market-server");
    const year = doc.getElementById("phase-market-year");
    const body_min = doc.getElementById("phase-market-rows");
    const error_sokomin = doc.getElementById("phase-market-error");
    const show_min = doc.getElementById("phase-market-show");
    const useBest_sokomin = doc.getElementById("phase-market-best");
    for (const value of SERVERS_sokomin) {
      const o = doc.createElement("option"); o.value = value; o.textContent = value; server.append(o);
    }
    for (const value of [...new Set((data?.meta?.gold_seasons || []).map(r => r.year))].sort().reverse()) {
      if (!/^\d{4}$/.test(value)) continue;
      const o = doc.createElement("option"); o.value = value; o.textContent = value; year.append(o);
    }
    function invalidate() {
      year.disabled = server.value !== "Gold Experience";
      body_min.replaceChildren(); error_sokomin.textContent = "";
    }
    server.addEventListener("change", invalidate);
    year.addEventListener("change", invalidate);
    show_min.addEventListener("click", () => {
      body_min.replaceChildren(); error_sokomin.textContent = "";
      const state = bridge.read();
      for (const [i, row] of state.rows.entries()) {
        const q = quote(data, row.name, server.value, year.value);
        const plan_min = planImport(state, i, q);
        const tr = doc.createElement("tr");
        const name = doc.createElement("td"); name.textContent = row.name;
        const price_sokomin = doc.createElement("td");
        price_sokomin.textContent = plan_min ? `${q.priceGoldPerItem.toLocaleString("ja-JP")} Gold/個 → ${plan_min.setPrice} ${state.unit}/${row.setQty}個` : "取込できる価格なし";
        const observed_sokomin = doc.createElement("td");
        observed_sokomin.textContent = plan_min ? `${q.server}${q.goldYear ? ` ${q.goldYear}年` : ""} / ${q.observedDate}` : "—";
        const action_sokomin = doc.createElement("td");
        const button_sokomin = doc.createElement("button"); button_sokomin.textContent = "この価格を取込"; button_sokomin.disabled = !plan_min;
        button_sokomin.addEventListener("click", () => {
          if (!plan_min || JSON.stringify(bridge.read()) !== plan_min.expected) {
            error_sokomin.textContent = "入力が変わりました。相場を再表示してください。"; return;
          }
          try {
            bridge.apply(plan_min);
            body_min.replaceChildren();
          } catch (e) { error_sokomin.textContent = "価格を保存できませんでした。"; }
        });
        action_sokomin.append(button_sokomin); tr.append(name, price_sokomin, observed_sokomin, action_sokomin); body_min.append(tr);
      }
    });
    useBest_sokomin.addEventListener("click", () => {
      const state = bridge.read(), best = minimum(state);
      if (!best) { error_sokomin.textContent = "各素材の単位・価格・個数・サーバー・Gold年を確認してください。"; return; }
      const target_min = doc.getElementById("evsim-general-gold");
      target_min.value = String(best.hon);
      target_min.dispatchEvent(new root.Event("input", { bubbles: true }));
      runCosts();
    });
    invalidate();
  }
  const api_sokomin = { MATERIALS, GOLD_PER_HON, quote, setPrice, planImport, minimum, mount };
  if (typeof module !== "undefined" && module.exports) module.exports = api_sokomin;
  root.PhaseMarketPrices = api_sokomin;
  if (root.document) root.document.addEventListener("DOMContentLoaded", () => {
    mount(root.document, root.PHASE_MARKET_DATA, root.PhaseMaterialCost, root.EVSIM_runAll);
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
