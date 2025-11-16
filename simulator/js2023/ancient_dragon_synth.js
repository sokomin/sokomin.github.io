const RANKS = ["N", "R", "HR", "SR", "LR", "GR"];
const RANK_INDEX = { N: 0, R: 1, HR: 2, SR: 3, LR: 4, GR: 5 };

// 各等級ごとの確率テーブル（累積確率）
// result: null は「破壊（何もできない）」を表す
const TRANSITIONS = {
  N: [
    { cumProb: 0.1, result: null }, // 10% 破壊
    { cumProb: 0.748, result: "R" }, // +64.8% で R
    { cumProb: 1.0, result: "N" }, // 残りで N 維持
  ],
  R: [
    { cumProb: 0.2, result: "N" }, // 20% で N にダウン
    { cumProb: 0.592, result: "HR" }, // +39.2% で HR
    { cumProb: 1.0, result: "R" }, // 残りで R 維持
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

function totalItems(counts) {
  return counts.reduce((a, b) => a + b, 0);
}

// 1回の合成を行う（できなければ null を返す）
function combineOnce(counts) {
  // 下位等級から順に、2個以上あるものを探す（N〜LRまで）
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

    // 終了条件2: 早期終了オプション
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
      // combineOnce が null を返すのは基本合成不能のときだけ
      reason = "合成可能なペアがないため終了。";
      break;
    }
  }

  if (!reason) {
    reason = "最大ステップ数に達したため強制終了。";
  }

  return { counts, log, reason, steps };
}

document.getElementById("btnSim").addEventListener("click", () => {
  const counts = [
    Number(document.getElementById("cntN").value) || 0,
    Number(document.getElementById("cntR").value) || 0,
    Number(document.getElementById("cntHR").value) || 0,
    Number(document.getElementById("cntSR").value) || 0,
    Number(document.getElementById("cntLR").value) || 0,
    Number(document.getElementById("cntGR").value) || 0,
  ].map((v) => Math.max(0, Math.floor(v))); // 負数・小数を補正

  const useThreshold = document.getElementById("useThreshold").checked;
  const thVal = document.getElementById("thresholdRank").value;
  let thresholdIndex = null;
  if (useThreshold && thVal !== "none") {
    thresholdIndex = Number(thVal);
  }

  const result = simulate(counts, useThreshold, thresholdIndex);

  let text = "";
  text += "=== 最終所持数 ===\n";
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
});
