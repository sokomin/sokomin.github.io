// next_exp_2000.js
// 2000〜2199レベル帯の経験値テーブルをCSVから読み込んで検索するスクリプト

(function () {
  "use strict";

  /** CSVデータをレベル→行データのマップとして保持 */
  let expTableByLevel = {};
  let minLevel = null;
  let maxLevel = null;
  let isLoaded = false;

  /**
   * 数値を3桁区切りにフォーマット
   * @param {number|string} value
   * @returns {string}
   */
  function formatNumber(value) {
    if (value === null || value === undefined || value === "") return "-";
    const num = Number(value);
    if (Number.isNaN(num)) return String(value);
    return num.toLocaleString("ja-JP");
  }

  /**
   * CSVテキストをパースしてテーブルに格納
   * @param {string} csvText
   */
  function parseCsv(csvText) {
    const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== "");
    if (lines.length <= 1) {
      throw new Error("CSVの行数が不足しています。");
    }

    // 1行目: ヘッダー
    const rawHeaders = lines[0].split(",");
    const headers = rawHeaders.map((h, idx) => {
      // 先頭列にBOMが付いている可能性があるので除去
      return idx === 0 ? h.replace(/^\uFEFF/, "").trim() : h.trim();
    });

    // データ行
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      if (row.length === 1 && row[0].trim() === "") {
        continue;
      }
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] !== undefined ? row[index].trim() : "";
      });

      const levelStr = obj["今のレベル"];
      const level = Number(levelStr);
      if (!Number.isNaN(level)) {
        expTableByLevel[level] = obj;
        if (minLevel === null || level < minLevel) {
          minLevel = level;
        }
        if (maxLevel === null || level > maxLevel) {
          maxLevel = level;
        }
      }
    }

    if (minLevel === null || maxLevel === null) {
      throw new Error("有効なレベルデータが見つかりませんでした。");
    }
  }

  /**
   * 状態表示を更新
   * @param {"ok"|"error"|"loading"} statusType
   * @param {string} message
   */
  function setStatus(statusType, message) {
    const statusEl = document.getElementById("exp-status");
    if (!statusEl) return;

    statusEl.classList.remove("ok", "error", "loading");

    if (statusType === "ok") {
      statusEl.classList.add("ok");
    } else if (statusType === "error") {
      statusEl.classList.add("error");
    } else if (statusType === "loading") {
      statusEl.classList.add("loading");
    }

    statusEl.textContent = message;
  }

  /**
   * 入力されたレベルに対応する行を検索して表示
   */
  function searchAndRender() {
    if (!isLoaded) {
      setStatus(
        "loading",
        "CSVデータを読み込み中です。しばらくお待ちください。"
      );
      return;
    }

    const inputEl = document.getElementById("exp-level-input");
    if (!inputEl) return;

    const level = Number(inputEl.value);
    if (Number.isNaN(level)) {
      setStatus("error", "レベルを整数で入力してください。");
      return;
    }

    if (level < minLevel || level > maxLevel) {
      setStatus(
        "error",
        "対応範囲外のレベルです。 " +
          minLevel +
          "〜" +
          maxLevel +
          " の範囲で入力してください。"
      );
      clearResult();
      return;
    }

    const row = expTableByLevel[level];
    if (!row) {
      setStatus("error", "該当レベルのデータが見つかりませんでした。");
      clearResult();
      return;
    }

    // 結果の反映
    updateResult(row);
    setStatus("ok", "レベル " + level + " のデータを表示しました。");
  }

  /**
   * 結果欄をクリア
   */
  function clearResult() {
    const ids = [
      "result-current",
      "result-next",
      "result-need-exp",
      "result-total-exp",
      "result-devil-one",
      "result-devil-total",
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "-";
    });
  }

  /**
   * 結果欄に値を流し込む
   * @param {Object} row
   */
  function updateResult(row) {
    const currentLevel = row["今のレベル"];
    const nextLevel = row["次のレベル"];
    const needExp = row["必要経験値"];
    const totalExp = row["合計"];
    const devilOne = row["1レベルの悪魔狩り（円）"];
    const devilTotal = row["合計の悪魔狩り（円）"];

    const currentEl = document.getElementById("result-current");
    const nextEl = document.getElementById("result-next");
    const needExpEl = document.getElementById("result-need-exp");
    const totalExpEl = document.getElementById("result-total-exp");
    const devilOneEl = document.getElementById("result-devil-one");
    const devilTotalEl = document.getElementById("result-devil-total");

    if (currentEl) currentEl.textContent = currentLevel ?? "-";
    if (nextEl) nextEl.textContent = nextLevel ?? "-";
    if (needExpEl) needExpEl.textContent = formatNumber(needExp);
    if (totalExpEl) totalExpEl.textContent = formatNumber(totalExp);
    if (devilOneEl) devilOneEl.textContent = formatNumber(devilOne) + " 円";
    if (devilTotalEl)
      devilTotalEl.textContent = formatNumber(devilTotal) + " 円";
  }

  /**
   * CSVをfetchして初期化
   */
  function loadCsv() {
    setStatus("loading", "CSVデータを読み込み中です…");

    // HTMLと同じディレクトリに配置されている想定
    fetch("./next_exp_2000.csv", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTPエラー: " + response.status);
        }
        return response.text();
      })
      .then((text) => {
        parseCsv(text);
        isLoaded = true;

        // 範囲ラベルの更新
        const rangeLabel = document.getElementById("exp-range-label");
        if (rangeLabel && minLevel !== null && maxLevel !== null) {
          rangeLabel.textContent = "※対応範囲：" + minLevel + "〜" + maxLevel;
        }

        setStatus(
          "ok",
          "CSVデータを読み込みました。 " +
            minLevel +
            "〜" +
            maxLevel +
            " レベルに対応しています。"
        );
      })
      .catch((err) => {
        console.error(err);
        isLoaded = false;
        setStatus(
          "error",
          "CSVデータの読み込みに失敗しました。ページを再読み込みするか、管理者にご連絡ください。"
        );
      });
  }

  /**
   * イベント登録
   */
  function setupEvents() {
    const btn = document.getElementById("exp-search-btn");
    const input = document.getElementById("exp-level-input");

    if (btn) {
      btn.addEventListener("click", function () {
        searchAndRender();
      });
    }

    if (input) {
      // Enterキーで検索
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          searchAndRender();
        }
      });
    }
  }

  // DOM構築完了時に初期化
  document.addEventListener("DOMContentLoaded", function () {
    setupEvents();
    loadCsv();
  });
})();
