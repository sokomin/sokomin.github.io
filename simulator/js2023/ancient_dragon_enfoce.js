// 段階 1〜100 の成功確率（0〜1）
// 元 CSV の B列（％）を 100 で割ったもの
const PROBS = [
  0.9705, //  1: 97.05%
  0.941,  //  2: 94.10%
  0.912,  //  3: 91.20%
  0.884,  //  4: 88.40%
  0.8565, //  5: 85.65%
  0.8295, //  6: 82.95%
  0.803,  //  7: 80.30%
  0.777,  //  8: 77.70%
  0.7515, //  9: 75.15%
  0.7265, // 10: 72.65%
  0.702,  // 11: 70.20%
  0.678,  // 12: 67.80%
  0.6545, // 13: 65.45%
  0.6315, // 14: 63.15%
  0.609,  // 15: 60.90%
  0.587,  // 16: 58.70%
  0.5655, // 17: 56.55%
  0.5445, // 18: 54.45%
  0.524,  // 19: 52.40%
  0.504,  // 20: 50.40%
  0.4845, // 21: 48.45%
  0.4655, // 22: 46.55%
  0.447,  // 23: 44.70%
  0.429,  // 24: 42.90%
  0.4115, // 25: 41.15%
  0.3945, // 26: 39.45%
  0.378,  // 27: 37.80%
  0.362,  // 28: 36.20%
  0.3465, // 29: 34.65%
  0.3315, // 30: 33.15%
  0.317,  // 31: 31.70%
  0.303,  // 32: 30.30%
  0.2895, // 33: 28.95%
  0.2765, // 34: 27.65%
  0.264,  // 35: 26.40%
  0.252,  // 36: 25.20%
  0.2405, // 37: 24.05%
  0.2295, // 38: 22.95%
  0.219,  // 39: 21.90%
  0.209,  // 40: 20.90%
  0.1995, // 41: 19.95%
  0.1905, // 42: 19.05%
  0.182,  // 43: 18.20%
  0.174,  // 44: 17.40%
  0.1665, // 45: 16.65%
  0.1595, // 46: 15.95%
  0.153,  // 47: 15.30%
  0.147,  // 48: 14.70%
  0.1415, // 49: 14.15%
  0.1365, // 50: 13.65%
  0.1315, // 51: 13.15%
  0.1265, // 52: 12.65%
  0.1215, // 53: 12.15%
  0.1165, // 54: 11.65%
  0.1115, // 55: 11.15%
  0.1066, // 56: 10.66%
  0.1018, // 57: 10.18%
  0.0971, // 58:  9.71%
  0.0925, // 59:  9.25%
  0.088,  // 60:  8.80%
  0.0836, // 61:  8.36%
  0.0793, // 62:  7.93%
  0.0751, // 63:  7.51%
  0.071,  // 64:  7.10%
  0.067,  // 65:  6.70%
  0.0631, // 66:  6.31%
  0.0593, // 67:  5.93%
  0.0556, // 68:  5.56%
  0.052,  // 69:  5.20%
  0.0485, // 70:  4.85%
  0.0455, // 71:  4.55%
  0.0426, // 72:  4.26%
  0.0398, // 73:  3.98%
  0.0371, // 74:  3.71%
  0.0345, // 75:  3.45%
  0.032,  // 76:  3.20%
  0.0296, // 77:  2.96%
  0.0273, // 78:  2.73%
  0.0251, // 79:  2.51%
  0.023,  // 80:  2.30%
  0.021,  // 81:  2.10%
  0.0191, // 82:  1.91%
  0.0173, // 83:  1.73%
  0.0156, // 84:  1.56%
  0.014,  // 85:  1.40%
  0.0125, // 86:  1.25%
  0.0111, // 87:  1.11%
  0.0098, // 88:  0.98%
  0.0086, // 89:  0.86%
  0.0075, // 90:  0.75%
  0.0065, // 91:  0.65%
  0.0056, // 92:  0.56%
  0.0047, // 93:  0.47%
  0.0039, // 94:  0.39%
  0.0031, // 95:  0.31%
  0.0024, // 96:  0.24%
  0.0017, // 97:  0.17%
  0.0011, // 98:  0.11%
  0.0005, // 99:  0.05%
  0      // 100: 0.00%
];

const N = PROBS.length; // 段階数

function computeExpectations(probs, T) {
  const Nlocal = probs.length;
  const E = new Array(Nlocal).fill(0);
  const suffixSumE = new Array(Nlocal + 1).fill(0); // suffixSumE[N] = 0

  // 初期 suffixSumE（E は 0 で初期化済みなので全部 0）
  for (let i = Nlocal - 1; i >= 0; i--) {
    suffixSumE[i] = E[i] + suffixSumE[i + 1];
  }

  // i = T-1, ..., 1 （level 単位）で計算
  for (let level = T - 1; level >= 1; level--) {
    const idx = level - 1;
    const p = probs[idx];

    if (p === 0) {
      E[idx] = Infinity; // 到達不可能扱い
    } else {
      const countHigher = Nlocal - level; // i+1 ～ N の個数
      let avgFuture = 0;
      if (countHigher > 0) {
        const sumFuture = suffixSumE[idx + 1]; // E[i+1] + ... + E[N-1]
        avgFuture = sumFuture / countHigher;
      }
      E[idx] = 1 / p + avgFuture;
    }

    // E[idx] 更新後、suffixSumE を更新
    suffixSumE[idx] = E[idx] + suffixSumE[idx + 1];
  }

  return E;
}

function formatNumber(x) {
  if (!isFinite(x)) return "∞（到達不能）";
  if (x === 0) return "0";
  return x.toFixed(6).replace(/0+$/,"").replace(/\.$/,"");
}

function mainAB() {
  const baseErrorEl = document.getElementById("baseError");
  baseErrorEl.textContent = "";
  const resultEl = document.getElementById("resultAB");
  resultEl.textContent = "";

  try {
    let A = parseInt(document.getElementById("startA").value, 10);
    let B = parseInt(document.getElementById("targetB").value, 10);

    if (isNaN(A) || isNaN(B)) throw new Error("A, B の値を整数で入力してください。");
    if (A < 1 || A > N) throw new Error(`A は 1〜${N} の範囲で指定してください。`);
    if (B < 1 || B > N) throw new Error(`B は 1〜${N} の範囲で指定してください。`);

    if (A >= B) {
      resultEl.textContent =
        `A = ${A}, B = ${B}\n` +
        `すでに A ≥ B なので、期待試行回数は 0 回です。`;
      return;
    }

    const T = B;
    const E = computeExpectations(PROBS, T);
    const expA = E[A - 1];

    resultEl.textContent =
      `◆（１）A段階から B段階以上に強化する場合\n` +
      // `- 段階数 N: ${N}\n` +
      `- スタート段階 A: ${A}\n` +
      `- 目標段階 B (以上): ${B}\n\n` +
      `期待試行回数（A → B以上）: ${formatNumber(expA)} 回`;
  } catch (e) {
    baseErrorEl.textContent = e.message;
  }
}

function mainC() {
  const baseErrorEl = document.getElementById("baseError");
  baseErrorEl.textContent = "";
  const resultEl = document.getElementById("resultC");
  resultEl.textContent = "";

  try {
    let C = parseInt(document.getElementById("thresholdC").value, 10);
    if (isNaN(C)) throw new Error("C の値を整数で入力してください。");
    if (C < 1 || C > N) throw new Error(`C は 1〜${N} の範囲で指定してください。`);

    const T = C;
    const E = computeExpectations(PROBS, T);

    // 初回は 1〜N を一様ランダム
    let sumEBelow = 0;
    for (let level = 1; level <= C - 1; level++) {
      sumEBelow += E[level - 1];
    }

    const probBelow = (C - 1) / N;
    const probAbove = (N - C + 1) / N;

    let expectedTotal;
    let expectedCond;

    if (probBelow === 0) {
      expectedTotal = 0;
      expectedCond = 0;
    } else {
      expectedTotal = sumEBelow / N;        // 条件なし期待値
      expectedCond = sumEBelow / (C - 1);   // 条件付き: 初回が C 未満
    }

    resultEl.textContent =
      `◆（２）初回入手から C段階以上のアイテムを得る場合\n` +
      // `- 段階数 N: ${N}\n` +
      `- 目標段階 C (以上): ${C}\n\n` +
      `初回入手の分布: 1〜N を一様ランダム (各 1/${N})\n` +
      `- 初回で C 段階以上を引く確率: ${probAbove.toFixed(6)}\n` +
      `- 初回で C 未満を引く確率:      ${probBelow.toFixed(6)}\n\n` +
      `期待試行回数（条件なし）: ${formatNumber(expectedTotal)} 回\n` +
      `  ※ 初回で C 以上だったケースは 0 回として含めた期待値\n\n` +
      `期待試行回数（条件付き）: ${formatNumber(expectedCond)} 回\n` +
      `  ※ 「初回が C 未満だった」と分かっている場合の平均回数`;
  } catch (e) {
    baseErrorEl.textContent = e.message;
  }
}

document.getElementById("calcABBtn").addEventListener("click", mainAB);
document.getElementById("calcCBtn").addEventListener("click", mainC);