/* ./js2023/phase_expect.js
 * 相場期待値シミュレータ（1ptコスト比較）用スクリプト
 * ページ内の以下IDを利用します：
 * unitLabel, resetBtn, addRowBtn, exportBtn, importBtn, importFile,
 * bestName, bestCost, bestUnit, tbl
 * ローカルストレージKEY: 'market_ev_sim_v1'
 */
(function () {
  // ====== ユーティリティ ======
  const KEY = "market_ev_sim_v1";
  const $ = (q, ctx = document) => ctx.querySelector(q);
  const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));
  const hasMarketDom = () =>
    $("#unitLabel") &&
    $("#tbl") &&
    $("#bestName") &&
    $("#bestCost") &&
    $("#bestUnit");

  // ====== デフォルト行（ご指定の4種） ======
  const DEFAULT_STATE = {
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
      const obj = JSON.parse(localStorage.getItem(KEY));
      if (!obj || !Array.isArray(obj.rows)) throw 0;
      // 型崩れを軽く補正
      obj.unit = obj.unit || "本";
      obj.rows = obj.rows.map((r) => ({
        name: String(r.name ?? ""),
        need: toNum(r.need, 0),
        setQty: Math.max(1, toNum(r.setQty, 1)),
        setPrice: toNum(r.setPrice, 0),
      }));
      return obj;
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  }
  function saveState() {
    localStorage.setItem(KEY, JSON.stringify(state));
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
  let state;
  let tbody, unitLabel, bestName, bestCost, bestUnit;

  // ====== 行生成・単行描画 ======
  function makeRow(rec, idx) {
    const tr = document.createElement("tr");

    // 素材名
    const tdName = document.createElement("td");
    const name = document.createElement("input");
    name.type = "text";
    name.value = rec.name;
    name.style.width = "140px";
    name.addEventListener("input", () => {
      rec.name = name.value;
      saveState();
      renderBest();
    });
    tdName.appendChild(name);

    // 1pt必要個数
    const tdNeed = document.createElement("td");
    const need = document.createElement("input");
    need.type = "number";
    need.step = "1";
    need.min = "0";
    need.value = rec.need;
    need.addEventListener("input", () => {
      rec.need = toNum(need.value, 0);
      saveState();
      renderOne(tr, rec);
      renderBest();
    });
    tdNeed.appendChild(need);

    // セット個数
    const tdSetQty = document.createElement("td");
    const setQty = document.createElement("input");
    setQty.type = "number";
    setQty.step = "1";
    setQty.min = "1";
    setQty.value = rec.setQty;
    setQty.addEventListener("input", () => {
      rec.setQty = Math.max(1, toNum(setQty.value, 1));
      saveState();
      renderOne(tr, rec);
      renderBest();
    });
    tdSetQty.appendChild(setQty);

    // セット相場（通貨単位の表示付き）
    const tdSetPrice = document.createElement("td");
    const wrap = document.createElement("div");
    const setPrice = document.createElement("input");
    setPrice.type = "number";
    setPrice.step = "0.01";
    setPrice.min = "0";
    setPrice.value = rec.setPrice;
    setPrice.addEventListener("input", () => {
      rec.setPrice = toNum(setPrice.value, 0);
      saveState();
      renderOne(tr, rec);
      renderBest();
    });
    const unit = document.createElement("span");
    unit.className = "unit";
    unit.textContent = state.unit || "本";
    wrap.append(setPrice, unit);
    tdSetPrice.appendChild(wrap);

    // 個単価 / 1ptコスト（表示専用セル）
    const tdUnitPrice = document.createElement("td");
    tdUnitPrice.className = "unitPrice";
    const tdPtCost = document.createElement("td");
    tdPtCost.className = "ptCost total";

    // 削除ボタン
    const tdDel = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.addEventListener("click", () => {
      state.rows.splice(idx, 1);
      saveState();
      renderTable();
    });
    tdDel.appendChild(delBtn);

    tr.append(
      tdName,
      tdNeed,
      tdSetQty,
      tdSetPrice,
      tdUnitPrice,
      tdPtCost,
      tdDel
    );
    renderOne(tr, rec);
    return tr;
  }

  function renderOne(tr, rec) {
    const unitTxt = state.unit || "本";
    const unitPrice = rec.setQty > 0 ? rec.setPrice / rec.setQty : 0;
    const ptCost = unitPrice * rec.need;
    $(".unitPrice", tr).textContent = `${fmt(unitPrice)} ${unitTxt}/個`;
    $(".ptCost", tr).textContent = `${fmt(ptCost)} ${unitTxt}`;
  }

  // ====== 最安ハイライト ======
  function renderBest() {
    let bestIdx = -1;
    let bestVal = Infinity;
    state.rows.forEach((r, i) => {
      const unitPrice = r.setQty > 0 ? r.setPrice / r.setQty : 0;
      const ptCost = unitPrice * r.need;
      if (ptCost < bestVal) {
        bestVal = ptCost;
        bestIdx = i;
      }
    });
    $$("#tbl tbody tr").forEach((tr, i) =>
      tr.classList.toggle("best", i === bestIdx)
    );
    if (bestIdx >= 0) {
      bestName.textContent = state.rows[bestIdx].name || "-";
      bestCost.textContent = fmt(bestVal);
      bestUnit.textContent = state.unit || "本";
    } else {
      bestName.textContent = "-";
      bestCost.textContent = "-";
    }
  }

  // ====== テーブル全体描画 ======
  function renderTable() {
    tbody.innerHTML = "";
    state.rows.forEach((r, i) => tbody.appendChild(makeRow(r, i)));
    renderBest();
  }

  // ====== 初期化 ======
  function initMarketSimulator() {
    if (!hasMarketDom()) return; // DOMが存在しない（別ページ読み込みなど）場合は何もしない

    // 状態ロード
    state = loadState();

    // DOMキャッシュ
    tbody = $("#tbl tbody");
    unitLabel = $("#unitLabel");
    bestName = $("#bestName");
    bestCost = $("#bestCost");
    bestUnit = $("#bestUnit");

    // 単位
    unitLabel.value = state.unit || "本";
    unitLabel.addEventListener("input", () => {
      state.unit = unitLabel.value || "本";
      saveState();
      // 表示中の「本」ラベルを更新
      $$("#tbl tbody tr").forEach((tr) => {
        const u = $(".unit", tr);
        if (u) u.textContent = state.unit;
      });
      renderBest();
    });

    // ボタン群
    $("#addRowBtn")?.addEventListener("click", () => {
      state.rows.push({ name: "新しい素材", need: 1, setQty: 1, setPrice: 0 });
      saveState();
      renderTable();
    });

    $("#resetBtn")?.addEventListener("click", () => {
      if (!confirm("初期値に戻しますか？（現在の入力は消えます）")) return;
      state = structuredClone(DEFAULT_STATE);
      saveState();
      unitLabel.value = state.unit;
      renderTable();
    });

    $("#exportBtn")?.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "market_ev_settings.json";
      a.click();
      URL.revokeObjectURL(url);
    });

    $("#importBtn")?.addEventListener("click", () => $("#importFile")?.click());
    $("#importFile")?.addEventListener("change", (ev) => {
      const f = ev.target.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = JSON.parse(reader.result);
          if (!obj || !Array.isArray(obj.rows))
            throw new Error("形式が不正です");
          state = {
            unit: obj.unit || "本",
            rows: obj.rows.map((r) => ({
              name: String(r.name ?? ""),
              need: toNum(r.need, 0),
              setQty: Math.max(1, toNum(r.setQty, 1)),
              setPrice: toNum(r.setPrice, 0),
            })),
          };
          saveState();
          unitLabel.value = state.unit;
          renderTable();
        } catch (e) {
          alert("読み込みに失敗しました: " + e.message);
        }
      };
      reader.readAsText(f);
    });

    // 初回描画
    renderTable();
  }

  // ====== 期待値（パック費用）パートのフック ======
  // ページの費用シミュレータ（#evsim-*）は、確率計算の前提データが
  // 別スクリプト（phase_stone.js / phase_common.js）に依存するため、
  // ここでは存在チェックだけして、未実装なら無害にスキップします。
  function initEVCostHooks() {
    const runBtn = $("#evsim-run");
    if (!runBtn) return;

    runBtn.addEventListener("click", () => {
      // 依存APIが提供されているか確認
      const api =
        window.PhaseExpect?.compute || // 例: 統合API
        window.computeEVCost; // 例: 既存の関数

      if (!api) {
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
      const price = Number($("#evsim-pack-price")?.value ?? 0); // 円
      const kNum = Number($("#evsim-pack-k")?.value ?? 0); // 高級触媒: 個
      const sNum = Number($("#evsim-pack-s")?.value ?? 0); // スクロール: 個
      const gUnit = Number($("#evsim-general-gold")?.value ?? 0); // 一般触媒 1個あたりの本

      // APIに応じたパラメータ例
      const params = {
        pack: { priceYen: price, k: kNum, s: sNum },
        generalUnitInHon: gUnit,
      };

      try {
        const res = api(params); // 実装側で {patternA:{...}, patternB:{...}} を返す想定
        // res が想定通りなら描画、違っても安全に文字列化
        const outA = $("#evsim-out-a");
        const outB = $("#evsim-out-b");
        if (outA)
          outA.textContent =
            typeof res?.patternA === "string"
              ? res.patternA
              : JSON.stringify(res?.patternA ?? res);
        if (outB)
          outB.textContent =
            typeof res?.patternB === "string"
              ? res.patternB
              : JSON.stringify(res?.patternB ?? res);
      } catch (e) {
        const msg = "計算に失敗しました: " + (e?.message || e);
        $("#evsim-out-a") && ($("#evsim-out-a").textContent = msg);
        $("#evsim-out-b") && ($("#evsim-out-b").textContent = msg);
      }
    });
  }

  // ====== 起動 ======
  document.addEventListener("DOMContentLoaded", () => {
    initMarketSimulator();
    initEVCostHooks();
  });
})();
