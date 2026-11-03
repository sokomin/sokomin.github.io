/* ./js2023/phase_expect.js
 * 相場期待値シミュレータ（1ptコスト比較）用スクリプト
 * ページ内の以下IDを利用します：
 * unitLabel, resetBtn, addRowBtn, exportBtn, importBtn, importFile,
 * bestName, bestCost, bestUnit, tbl
 * ローカルストレージKEY: 'market_ev_sim_v1'
 */
(function () {
  // ====== ユーティリティ ======
  const KEY_sokomin = "market_ev_sim_v1";
  const $ = (q, ctx = document) => ctx.querySelector(q);
  const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));
  const hasMarketDom_sokomin = () =>
    $("#unitLabel") &&
    $("#tbl") &&
    $("#bestName") &&
    $("#bestCost") &&
    $("#bestUnit");

  // ====== デフォルト行（ご指定の4種） ======
  const DEFAULT_STATE_min = {
    unit: "本",
    rows: [
      { name: "炎の石", need: 1, setQty: 1, setPrice: 4 }, // 1セット1個 / デフォ4本
      { name: "神秘の石", need: 100, setQty: 999, setPrice: 60 }, // 1セット999個 / デフォ20本
      { name: "出土品", need: 110, setQty: 999, setPrice: 40 }, // 1セット999個 / デフォ15本
      { name: "結晶石", need: 50, setQty: 999, setPrice: 100 }, // 1セット999個 / デフォ60本
    ],
  };

  // ====== 状態ロード／セーブ ======
  function loadState() {
    try {
      const obj = JSON.parse(localStorage.getItem(KEY_sokomin));
      if (!obj || !Array.isArray(obj.rows)) throw 0;
      // 型崩れを軽く補正
      obj.unit = obj.unit || "本";
      obj.rows = obj.rows.map((r) => ({
        ...r, name: String(r.name ?? ""),
        need: toNum(r.need, 0),
        setQty: Math.max(1, toNum(r.setQty, 1)),
        setPrice: toNum(r.setPrice, 0),
      }));
      return obj;
    } catch {
      return structuredClone(DEFAULT_STATE_min);
    }
  }
  function saveState() {
    localStorage.setItem(KEY_sokomin, JSON.stringify(state_sokomin));
  }
  function toNum(v, fb) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fb;
  }
  function fmt(n) {
    // 小数を最大4桁まで表示、末尾0は削除
    const s = (Math.round(n * 10000) / 10000).toFixed(4);
    return s.replace(/\.?0+$/, "");
  }

  // ====== DOMキャッシュ ======
  let state_sokomin;
  let tbody_min, unitLabel_min, bestName_min, bestCost_sokomin, bestUnit_min;

  // ====== 行生成・単行描画 ======
  function makeRow(rec, idx) {
    const tr = document.createElement("tr");

    // 素材名
    const tdName_sokomin = document.createElement("td");
    const name_sokomin = document.createElement("input");
    name_sokomin.type = "text";
    name_sokomin.value = rec.name;
    name_sokomin.style.width = "140px";
    name_sokomin.addEventListener("input", () => {
      delete rec.marketPrice;
      tr.querySelector(".phase-price-source")?.remove();
      rec.name = name_sokomin.value;
      saveState();
      renderBest();
    });
    tdName_sokomin.appendChild(name_sokomin);

    if (rec.marketPrice) {
      const source_min = document.createElement("small");
      source_min.className = "phase-price-source";
      const p = rec.marketPrice;
      source_min.textContent = p.server + (p.goldYear ? " " + p.goldYear + "年" : "") + " / " + p.observedDate + " / " + p.sourceUnit;
      tdName_sokomin.appendChild(source_min);
    }


    // 1pt必要個数
    const tdNeed_sokomin = document.createElement("td");
    const need_min = document.createElement("input");
    need_min.type = "number";
    need_min.step = "1";
    need_min.min = "0";
    need_min.value = rec.need;
    need_min.addEventListener("input", () => {
      delete rec.marketPrice;
      tr.querySelector(".phase-price-source")?.remove();
      rec.need = toNum(need_min.value, 0);
      saveState();
      renderOne(tr, rec);
      renderBest();
    });
    tdNeed_sokomin.appendChild(need_min);

    // セット個数
    const tdSetQty_min = document.createElement("td");
    const setQty_sokomin = document.createElement("input");
    setQty_sokomin.type = "number";
    setQty_sokomin.step = "1";
    setQty_sokomin.min = "1";
    setQty_sokomin.value = rec.setQty;
    setQty_sokomin.addEventListener("input", () => {
      delete rec.marketPrice;
      tr.querySelector(".phase-price-source")?.remove();
      rec.setQty = Math.max(1, toNum(setQty_sokomin.value, 1));
      saveState();
      renderOne(tr, rec);
      renderBest();
    });
    tdSetQty_min.appendChild(setQty_sokomin);

    // セット相場（通貨単位の表示付き）
    const tdSetPrice_sokomin = document.createElement("td");
    const wrap_min = document.createElement("div");
    const setPrice_sokomin = document.createElement("input");
    setPrice_sokomin.type = "number";
    setPrice_sokomin.step = "0.01";
    setPrice_sokomin.min = "0";
    setPrice_sokomin.value = rec.setPrice;
    setPrice_sokomin.addEventListener("input", () => {
      delete rec.marketPrice;
      tr.querySelector(".phase-price-source")?.remove();
      rec.setPrice = toNum(setPrice_sokomin.value, 0);
      saveState();
      renderOne(tr, rec);
      renderBest();
    });
    const unit_sokomin = document.createElement("span");
    unit_sokomin.className = "unit";
    unit_sokomin.textContent = state_sokomin.unit || "本";
    wrap_min.append(setPrice_sokomin, unit_sokomin);
    tdSetPrice_sokomin.appendChild(wrap_min);

    // 個単価 / 1ptコスト（表示専用セル）
    const tdUnitPrice_min = document.createElement("td");
    tdUnitPrice_min.className = "unitPrice";
    const tdPtCost_sokomin = document.createElement("td");
    tdPtCost_sokomin.className = "ptCost total";

    // 削除ボタン
    const tdDel_min = document.createElement("td");
    const delBtn_sokomin = document.createElement("button");
    delBtn_sokomin.textContent = "削除";
    delBtn_sokomin.addEventListener("click", () => {
      state_sokomin.rows.splice(idx, 1);
      saveState();
      renderTable();
    });
    tdDel_min.appendChild(delBtn_sokomin);

    tr.append(
      tdName_sokomin,
      tdNeed_sokomin,
      tdSetQty_min,
      tdSetPrice_sokomin,
      tdUnitPrice_min,
      tdPtCost_sokomin,
      tdDel_min
    );
    renderOne(tr, rec);
    return tr;
  }

  function renderOne(tr, rec) {
    const unitTxt_min = state_sokomin.unit || "本";
    const unitPrice = rec.setQty > 0 ? rec.setPrice / rec.setQty : 0;
    const ptCost = unitPrice * rec.need;
    $(".unitPrice", tr).textContent = `${fmt(unitPrice)} ${unitTxt_min}/個`;
    $(".ptCost", tr).textContent = `${fmt(ptCost)} ${unitTxt_min}`;
  }

  // ====== 最安ハイライト ======
  function renderBest() {
    let bestIdx_min = -1;
    let bestVal_min = Infinity;
    state_sokomin.rows.forEach((r, i) => {
      const unitPrice = r.setQty > 0 ? r.setPrice / r.setQty : 0;
      const ptCost = unitPrice * r.need;
      if (ptCost < bestVal_min) {
        bestVal_min = ptCost;
        bestIdx_min = i;
      }
    });
    $$("#tbl tbody tr").forEach((tr, i) =>
      tr.classList.toggle("best", i === bestIdx_min)
    );
    if (bestIdx_min >= 0) {
      bestName_min.textContent = state_sokomin.rows[bestIdx_min].name || "-";
      bestCost_sokomin.textContent = fmt(bestVal_min);
      bestUnit_min.textContent = state_sokomin.unit || "本";
    } else {
      bestName_min.textContent = "-";
      bestCost_sokomin.textContent = "-";
    }
  }

  // ====== テーブル全体描画 ======
  function renderTable() {
    tbody_min.innerHTML = "";
    state_sokomin.rows.forEach((r, i) => tbody_min.appendChild(makeRow(r, i)));
    renderBest();
  }

  // ====== 初期化 ======
  function initMarketSimulator() {
    if (!hasMarketDom_sokomin()) return; // DOMが存在しない（別ページ読み込みなど）場合は何もしない

    // 状態ロード
    state_sokomin = loadState();

    // DOMキャッシュ
    tbody_min = $("#tbl tbody");
    unitLabel_min = $("#unitLabel");
    bestName_min = $("#bestName");
    bestCost_sokomin = $("#bestCost");
    bestUnit_min = $("#bestUnit");

    // 単位
    unitLabel_min.value = state_sokomin.unit || "本";
    unitLabel_min.addEventListener("input", () => {
      state_sokomin.rows.forEach(r => delete r.marketPrice);
      $$(".phase-price-source", tbody_min).forEach(el => el.remove());
      state_sokomin.unit = unitLabel_min.value || "本";
      saveState();
      // 表示中の「本」ラベルを更新
      $$("#tbl tbody tr").forEach((tr) => {
        const u = $(".unit", tr);
        if (u) u.textContent = state_sokomin.unit;
      });
      renderBest();
    });

    // ボタン群
    $("#addRowBtn")?.addEventListener("click", () => {
      state_sokomin.rows.push({ name: "新しい素材", need: 1, setQty: 1, setPrice: 0 });
      saveState();
      renderTable();
    });

    $("#resetBtn")?.addEventListener("click", () => {
      if (!confirm("初期値に戻しますか？（現在の入力は消えます）")) return;
      state_sokomin = structuredClone(DEFAULT_STATE_min);
      saveState();
      unitLabel_min.value = state_sokomin.unit;
      renderTable();
    });

    $("#exportBtn")?.addEventListener("click", () => {
      const blob_sokomin = new Blob([JSON.stringify(state_sokomin, null, 2)], {
        type: "application/json",
      });
      const url_min = URL.createObjectURL(blob_sokomin);
      const a = document.createElement("a");
      a.href = url_min;
      a.download = "market_ev_settings.json";
      a.click();
      URL.revokeObjectURL(url_min);
    });

    $("#importBtn")?.addEventListener("click", () => $("#importFile")?.click());
    $("#importFile")?.addEventListener("change", (ev) => {
      const f = ev.target.files?.[0];
      if (!f) return;
      const reader_min = new FileReader();
      reader_min.onload = () => {
        try {
          const obj = JSON.parse(reader_min.result);
          if (!obj || !Array.isArray(obj.rows))
            throw new Error("形式が不正です");
          state_sokomin = {
            unit: obj.unit || "本",
            rows: obj.rows.map((r) => ({
              ...r, name: String(r.name ?? ""),
              need: toNum(r.need, 0),
              setQty: Math.max(1, toNum(r.setQty, 1)),
              setPrice: toNum(r.setPrice, 0),
            })),
          };
          saveState();
          unitLabel_min.value = state_sokomin.unit;
          renderTable();
        } catch (e) {
          alert("読み込みに失敗しました: " + e.message);
        }
      };
      reader_min.readAsText(f);
    });


    window.PhaseMaterialCost = {
      read: () => structuredClone(state_sokomin),
      apply: (plan) => {
        if (JSON.stringify(state_sokomin) !== plan.expected || !state_sokomin.rows[plan.index]) throw new Error("changed input");
        const previous_min = structuredClone(state_sokomin);
        state_sokomin.rows[plan.index].setPrice = plan.setPrice;
        state_sokomin.rows[plan.index].marketPrice = structuredClone(plan.provenance);
        try { saveState(); } catch (e) { state_sokomin = previous_min; throw e; }
        renderTable();
      }
    };

    // 初回描画
    renderTable();
  }

  // ====== 期待値（パック費用）パートのフック ======
  // ページの費用シミュレータ（#evsim-*）は、確率計算の前提データが
  // 別スクリプト（phase_stone.js / phase_common.js）に依存するため、
  // ここでは存在チェックだけして、未実装なら無害にスキップします。
  function initEVCostHooks() {
    const runBtn_sokomin = $("#evsim-run");
    if (!runBtn_sokomin) return;

    runBtn_sokomin.addEventListener("click", () => {
      // 依存APIが提供されているか確認
      const api_min =
        window.PhaseExpect?.compute || // 例: 統合API
        window.computeEVCost; // 例: 既存の関数

      if (!api_min) {
        const outA = $("#evsim-out-a");
        const outB = $("#evsim-out-b");
        [outA, outB].forEach((el) => {
          if (!el) return;
          el.innerHTML =
            '<div class="hint">確率テーブル未ロードのため計算できません。phase_stone.js 側で PhaseExpect.compute() か computeEVCost() を提供してください。</div>';
        });
        return;
      }

      // 入力値
      const price_min = Number($("#evsim-pack-price")?.value ?? 0); // 円
      const kNum_min = Number($("#evsim-pack-k")?.value ?? 0); // 高級触媒: 個
      const sNum_min = Number($("#evsim-pack-s")?.value ?? 0); // スクロール: 個
      const gUnit_sokomin = Number($("#evsim-general-gold")?.value ?? 0); // 一般触媒 1個あたりの本

      // APIに応じたパラメータ例
      const params_sokomin = {
        pack: { priceYen: price_min, k: kNum_min, s: sNum_min },
        generalUnitInHon: gUnit_sokomin,
      };

      try {
        const res_sokomin = api_min(params_sokomin); // 実装側で {patternA:{...}, patternB:{...}} を返す想定
        // res が想定通りなら描画、違っても安全に文字列化
        const outA = $("#evsim-out-a");
        const outB = $("#evsim-out-b");
        if (outA)
          outA.textContent =
            typeof res_sokomin?.patternA === "string"
              ? res_sokomin.patternA
              : JSON.stringify(res_sokomin?.patternA ?? res_sokomin);
        if (outB)
          outB.textContent =
            typeof res_sokomin?.patternB === "string"
              ? res_sokomin.patternB
              : JSON.stringify(res_sokomin?.patternB ?? res_sokomin);
      } catch (e) {
        const msg_sokomin = "計算に失敗しました: " + (e?.message || e);
        $("#evsim-out-a") && ($("#evsim-out-a").textContent = msg_sokomin);
        $("#evsim-out-b") && ($("#evsim-out-b").textContent = msg_sokomin);
      }
    });
  }

  // ====== 起動 ======
  document.addEventListener("DOMContentLoaded", () => {
    initMarketSimulator();

  });
})();
