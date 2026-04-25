// sheet_05.js
// 赤石の民衆（確率情報）: タニアのお守り（占術道具）
// このJSは「接頭辞名（日本語）」を後からマップで自動補完するためだけに使います。
// JP_MAP は decomin/batch/out/prefix.csv の (名称→効果) を機械的に当てたものです。
// 韓国語接頭辞名は同一でも、装着部位/装備種で効果が異なる場合があります。
// 個別に上書きしたい場合は OVERRIDE に追記してください（OVERRIDE が優先）。

(function () {
  "use strict";

  const JP_MAP = {
    "강해지는": "力 +1/レベル [2~3]",
    "민첩해지는": "敏捷 +1/レベル [2~3]",
    "건강해지는": "健康 +1/レベル [2~3]",
    "지혜로워지는": "知恵 +1/レベル [2~3]",
    "다식해지는": "知識 +1/レベル [2~3]",
    "존경스러워지는": "カリスマ +1/レベル [2~3]",
    "행복해지는": "運 +1/レベル [2~3]",
    "조화로운": "物理ダメージ [121~150]％ 増加",
    "장엄한": "防御力 +[121~150]％",
    "기운참의": "最大HP +[71~100]％",
    "넘침의": "最大CP +[71~100]％",
    "정도의": "命中率 +[10~12]％",
    "번쩍번쩍한": "回避率 +[10~12]％",
    "모험의": "移動速度 +30％",
    "발악의": "攻撃速度  +[36~50]％",
    "붉은 보석의": "スキルレベル+[4~5]",
    "어우러진": "物理ダメージ [151~200]％ 増加",
    "창대한": "防御力 +[151~200]％",
    "생동의": "最大HP +[101~120]％",
    "흘러넘침의": "最大CP +[101~120]％",
    "바른길의": "命中率 +[10~15]％",
    "뻔적뻔적한": "回避率 +[10~15]％",
    "유랑의": "移動速度 +[30~35]％",
    "발광의": "攻撃速度  +[40~55]％",
    "큰 붉은 보석의": "スキルレベル+[4~6]",
    "마력의": "魔法ダメージを [40~50]％ 強化させる。",
    "인내의": "フィールドのステータス低下に対する抵抗 [8~10]％ 増加",
    "강단의": "フィールドの属性最大値制限に対する抵抗 [8~10]％ 増加",
    "거대 신수의": "力 [101~150] 増加",
    "깊은 경지의": "敏捷 [101~150] 増加",
    "강철 같은 굳건함의": "健康 [101~150] 増加",
    "마음 속 깊음의": "知恵 [101~150] 増加",
    "진정 깨달음의": "知識 [101~150] 増加",
    "바다 같은 덕망의": "カリスマ [101~150] 増加",
    "행운 여신의": "運 [101~150] 増加"
};

  // ユーザーによる手動上書き（必要なら追記）
  const OVERRIDE = {
    // "강해지는": "力比率上昇Lv2",
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
        const jp = OVERRIDE[kr] || JP_MAP[kr];
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
