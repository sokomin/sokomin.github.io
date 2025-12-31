// sheet_05.js
// 赤石の民衆（確率情報）: タニアのお守り（占術道具）
// 重要：HTML側に全データ（韓国語・確率）を埋め込み済みです。
// このJSは「接頭辞名（日本語案）」を後からマップで自動補完するためだけに使います。

(function () {
  "use strict";

  // --- 翻訳マップ（韓国語接頭辞 -> 日本語案） ---
  // TODO: 判明次第ここに追記してください。
  // 例:
  // const JP_MAP = { "강해지는": "力比率上昇Lv2", ... };
  const JP_MAP = {
    "존경스러워지는": "威厳比率上昇Lv2",
    "건강해지는": "健康比率上昇Lv2",
    "강해지는": "力比率上昇Lv2",
    "민첩해지는": "敏捷比率上昇Lv2",
    "지혜로워지는": "知恵比率上昇Lv2",
    "다식해지는": "知識比率上昇Lv2",
    "행복해지는": "運比率上昇Lv2",
    "조화로운": "攻撃Lv10"
  };

  function fillJapaneseName() {
    const tables = document.querySelectorAll("table.prob-table");
    tables.forEach(tbl => {
      const rows = tbl.querySelectorAll("tbody tr");
      rows.forEach(tr => {
        const tds = tr.querySelectorAll("td");
        if (tds.length < 2) return;
        const jpCell = tds[0];
        const krCell = tds[1];
        const kr = (krCell.textContent || "").trim();
        if (!kr) return;
        const jp = JP_MAP[kr];
        if (jp && (!jpCell.textContent || jpCell.textContent.trim() === "")) {
          jpCell.textContent = jp;
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillJapaneseName);
  } else {
    fillJapaneseName();
  }
})();
