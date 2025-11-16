const RANKS = ["N", "R", "HR", "SR", "LR", "GR"];
const RANK_INDEX = { N: 0, R: 1, HR: 2, SR: 3, LR: 4, GR: 5 };

// ===== 合成用確率テーブル =====
const TRANSITIONS = {
  N: [
    { cumProb: 0.1, result: null }, // 10% 破壊
    { cumProb: 0.748, result: "R" }, // +64.8% で R
    { cumProb: 1.0, result: "N" }, // 残りで N 維持
  ],
  R: [
    { cumProb: 0.2, result: "N" },
    { cumProb: 0.592, result: "HR" },
    { cumProb: 1.0, result: "R" },
  ],
  HR: [
    { cumProb: 0.4, result: "R" },
    { cumProb: 0.55, result: "SR" },
    { cumProb: 1.0, result: "HR" },
  ],
  SR: [
    { cumProb: 0.5, result: "HR" },
    { cumProb: 0.59, result: "LR" },
    { cumProb: 1.0, result: "SR" },
  ],
  LR: [
    { cumProb: 0.7, result: "SR" },
    { cumProb: 0.7225, result: "GR" }, // 2.25%
    { cumProb: 1.0, result: "LR" },
  ],
  // GR は合成しない
};

// ===== パッケージ用確率テーブル（累積） =====
// 最下級：N 90%, R 10%
const PACK_LOWEST = [
  { cumProb: 0.9, rankIndex: RANK_INDEX.N },
  { cumProb: 1.0, rankIndex: RANK_INDEX.R },
];
// 下級：N 75%, R 20%, HR 5%
const PACK_LOW = [
  { cumProb: 0.75, rankIndex: RANK_INDEX.N },
  { cumProb: 0.95, rankIndex: RANK_INDEX.R },
  { cumProb: 1.0, rankIndex: RANK_INDEX.HR },
];
// 鱗：N 52%, R 26%, HR 13%, SR 7%, LR 2%
const PACK_SCALE = [
  { cumProb: 0.52, rankIndex: RANK_INDEX.N },
  { cumProb: 0.78, rankIndex: RANK_INDEX.R },
  { cumProb: 0.91, rankIndex: RANK_INDEX.HR },
  { cumProb: 0.98, rankIndex: RANK_INDEX.SR },
  { cumProb: 1.0, rankIndex: RANK_INDEX.LR },
];

// ===== 共通ユーティリティ =====
function totalItems(counts) {
  return counts.reduce((a, b) => a + b, 0);
}

function getCountsFromInputs() {
  const vals = [
    document.getElementById("cntN").value,
    document.getElementById("cntR").value,
    document.getElementById("cntHR").value,
    document.getElementById("cntSR").value,
    document.getElementById("cntLR").value,
    document.getElementById("cntGR").value,
  ];
  return vals.map((v) => {
    const n = Number(v);
    if (isNaN(n) || !isFinite(n)) return 0;
    return Math.max(0, Math.floor(n));
  });
}

function setInputsFromCounts(counts) {
  document.getElementById("cntN").value = counts[0];
  document.getElementById("cntR").value = counts[1];
  document.getElementById("cntHR").value = counts[2];
  document.getElementById("cntSR").value = counts[3];
  document.getElementById("cntLR").value = counts[4];
  document.getElementById("cntGR").value = counts[5];
}

// ===== 合成 1 回 =====
function combineOnce(counts) {
  // N〜LR の中で、2個以上ある一番下の等級を探す
  let idx = -1;
  for (let i = 0; i <= 4; i++) {
    // 0〜4: N〜LR
    if (counts[i] >= 2) {
      idx = i;
      break;
    }
  }
  if (idx === -1) {
    return null; // もう合成できない
  }

  const rankName = RANKS[idx];
  const transTable = TRANSITIONS[rankName];
  const r = Math.random();

  // 2個消費
  counts[idx] -= 2;

  // 結果を確率で決定
  let resultRank = null;
  for (const t of transTable) {
    if (r < t.cumProb) {
      resultRank = t.result;
      break;
    }
  }
  if (resultRank !== null) {
    counts[RANK_INDEX[resultRank]] += 1;
  }

  return {
    sourceRank: rankName,
    resultRank: resultRank,
  };
}

// ===== 合成シミュレーション全体 =====
function simulate(initialCounts, useThreshold, thresholdRankIndex) {
  const counts = initialCounts.slice(); // コピー
  const log = [];
  let reason = "";
  let steps = 0;
  const MAX_STEPS = 100000;

  const initialTotal = totalItems(counts);
  if (initialTotal < 7) {
    reason = "初期総数が7未満のため、そのまま終了。";
    return { counts, log, reason, steps };
  }

  while (steps < MAX_STEPS) {
    const t = totalItems(counts);

    // 終了条件1: 全体が7個以下
    if (t <= 7) {
      reason = "総数が7個以下になったため終了。";
      break;
    }

    // 終了条件2: 早期終了（◯◯以上が7個以上）
    if (useThreshold && thresholdRankIndex !== null) {
      let highCount = 0;
      for (let i = thresholdRankIndex; i < counts.length; i++) {
        highCount += counts[i];
      }
      if (highCount >= 7) {
        reason = RANKS[thresholdRankIndex] + "以上が7個以上になったため終了。";
        break;
      }
    }

    // 合成可能かチェック
    let canCombine = false;
    for (let i = 0; i <= 4; i++) {
      // N〜LR
      if (counts[i] >= 2) {
        canCombine = true;
        break;
      }
    }
    if (!canCombine) {
      reason = "合成可能なペアがないため終了。";
      break;
    }

    const beforeTotal = t;
    const result = combineOnce(counts);
    steps++;

    if (result) {
      log.push({
        step: steps,
        sourceRank: result.sourceRank,
        resultRank: result.resultRank,
        totalBefore: beforeTotal,
        totalAfter: totalItems(counts),
        snapshot: counts.slice(),
      });
    } else {
      reason = "合成可能なペアがないため終了。";
      break;
    }
  }

  if (!reason) {
    reason = "最大ステップ数に達したため強制終了。";
  }

  return { counts, log, reason, steps };
}

// ===== パッケージ開封（共通関数） =====
function openPackageOnce(table) {
  const r = Math.random();
  for (const t of table) {
    if (r < t.cumProb) {
      return t.rankIndex;
    }
  }
  // 理論上ここには来ない
  return table[table.length - 1].rankIndex;
}

function openPackage100(table, label) {
  const counts = getCountsFromInputs();
  const gained = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 100; i++) {
    const idx = openPackageOnce(table);
    counts[idx] += 1;
    gained[idx] += 1;
  }

  setInputsFromCounts(counts);

  // ログ出力を追加（上書きしないで先頭に足しても良いが、ここでは後ろに追記）
  const out = document.getElementById("output");
  let text = "";
  text += `=== パッケージ開封：${label} 100個 ===\n`;
  text += "今回の獲得数：\n";
  for (let i = 0; i < RANKS.length; i++) {
    if (gained[i] > 0) {
      text += `  ${RANKS[i]}: +${gained[i]} 個\n`;
    }
  }
  if (gained.every((v) => v === 0)) {
    text += "  （今回のテーブルでは想定外）\n";
  }
  text += "現在の所持数：\n";
  for (let i = 0; i < RANKS.length; i++) {
    text += `  ${RANKS[i]}: ${counts[i]} 個\n`;
  }
  text += "\n";

  out.value = text + out.value; // 先頭に追加したい場合はこう
}

// ===== UI イベント =====
document.getElementById("btnSim").addEventListener("click", () => {
  const counts = getCountsFromInputs();

  const useThreshold = document.getElementById("useThreshold").checked;
  const thVal = document.getElementById("thresholdRank").value;
  let thresholdIndex = null;
  if (useThreshold && thVal !== "none") {
    thresholdIndex = Number(thVal);
  }

  const result = simulate(counts, useThreshold, thresholdIndex);

  let text = "";
  text += "=== 合成シミュレーション結果（最終所持数） ===\n";
  for (let i = 0; i < RANKS.length; i++) {
    text += `${RANKS[i]}: ${result.counts[i]} 個\n`;
  }
  text += "\n";
  text += `総ステップ数: ${result.steps}\n`;
  text += `終了理由: ${result.reason}\n\n`;

  text += "=== ログ（最大 200 行まで） ===\n";
  const maxLog = Math.min(200, result.log.length);
  for (let i = 0; i < maxLog; i++) {
    const entry = result.log[i];
    text +=
      `[${entry.step}] ${entry.sourceRank}×2 → ${entry.resultRank ?? "破壊"} ` +
      `(総数 ${entry.totalBefore} → ${entry.totalAfter})\n` +
      `  状態: `;
    for (let j = 0; j < RANKS.length; j++) {
      text += `${RANKS[j]}=${entry.snapshot[j]} `;
    }
    text += "\n";
  }
  if (result.log.length > maxLog) {
    text += `...（省略：残り ${result.log.length - maxLog} ステップ）\n`;
  }

  document.getElementById("output").value = text;
  // 入力欄も最終状態に更新しておく
  setInputsFromCounts(result.counts);
});

// パッケージボタン
document.getElementById("btnPackLowest").addEventListener("click", () => {
  openPackage100(PACK_LOWEST, "最下級");
});
document.getElementById("btnPackLow").addEventListener("click", () => {
  openPackage100(PACK_LOW, "下級");
});
document.getElementById("btnPackScale").addEventListener("click", () => {
  openPackage100(PACK_SCALE, "鱗");
});
