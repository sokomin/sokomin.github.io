// 移動速度計算機 ロジック
//
// 仕様 (sokomin.github.io/information/magiccarpet.html):
//   1frame に進む座標距離は移動速度(%) から以下で算出。
//     走り  : 0.0025 * speed + 0.25
//     絨毯  : 0.0075 * speed + 0.75   ("3 倍補正" は係数 3 倍として式に内包)
//     ＧＶ  : 0.0005 * speed + 0.2
//   ただし 1frame に 1 座標距離が最速 (キャップ)。

(function (root) {
  'use strict';

  var MODES = {
    run:    { label: '走り', coef: 0.0025, base: 0.25 },
    carpet: { label: '絨毯', coef: 0.0075, base: 0.75 },
    gv:     { label: 'ＧＶ', coef: 0.0005, base: 0.20 }
  };
  var FRAME_CAP = 1.0;

  function rawPerFrame(mode, speedPct) {
    var m = MODES[mode];
    return m.coef * speedPct + m.base;
  }
  function perFrame(mode, speedPct) {
    return Math.min(FRAME_CAP, rawPerFrame(mode, speedPct));
  }
  function framesPerCoord(mode, speedPct) {
    var d = perFrame(mode, speedPct);
    return d > 0 ? FRAME_CAP / d : Infinity;
  }
  function isCapped(mode, speedPct) {
    return rawPerFrame(mode, speedPct) >= FRAME_CAP;
  }

  function fix(x, d) {
    if (!isFinite(x)) return '∞';
    var p = Math.pow(10, d);
    return (Math.round(x * p) / p).toFixed(d);
  }

  // キャップ到達時の見た目: 薄赤背景 + 赤太字
  function applyCapStyle(input, capped) {
    if (!input) return;
    if (capped) {
      input.style.backgroundColor = '#ffe0e0';
      input.style.color = '#c00';
      input.style.fontWeight = 'bold';
    } else {
      input.style.backgroundColor = '';
      input.style.color = '';
      input.style.fontWeight = '';
    }
  }

  function getSlider() {
    return document.getElementById('speedSlider');
  }

  // 数値欄が変わったらスライダーをクランプ追従させて再計算
  function onSpeedInputChange() {
    var v = parseFloat(document.f.a1.value);
    var s = getSlider();
    if (s && !isNaN(v)) {
      var lo = parseFloat(s.min);
      var hi = parseFloat(s.max);
      s.value = Math.max(lo, Math.min(hi, v));
    }
    calc1();
  }

  // スライダー操作時は数値欄に書き戻して再計算
  function onSpeedSliderChange() {
    var s = getSlider();
    if (s) document.f.a1.value = s.value;
    calc1();
  }

  function init1() {
    document.f.a1.value = 0;
    var s = getSlider();
    if (s) s.value = 0;
    for (var i = 1; i <= 9; i++) {
      var el = document.f['r' + i];
      el.value = '';
      applyCapStyle(el, false);
    }
  }

  function init2() {
    // memorize.js が cookie から a1 を復元 → スライダー同期 → 初期計算
    var v = parseFloat(document.f.a1.value);
    var s = getSlider();
    if (s && !isNaN(v)) {
      var lo = parseFloat(s.min);
      var hi = parseFloat(s.max);
      s.value = Math.max(lo, Math.min(hi, v));
    }
    calc1();
  }

  function calc1() {
    var a1 = parseFloat(document.f.a1.value);
    if (isNaN(a1)) a1 = 0;

    var runCap    = isCapped('run', a1);
    var carpetCap = isCapped('carpet', a1);
    var gvCap     = isCapped('gv', a1);

    // 走り
    document.f.r1.value = fix(perFrame('run', a1), 4);
    document.f.r2.value = fix(framesPerCoord('run', a1), 3);
    document.f.r3.value = runCap ? '到達' : '—';
    applyCapStyle(document.f.r1, runCap);
    applyCapStyle(document.f.r2, runCap);
    applyCapStyle(document.f.r3, runCap);

    // 絨毯
    document.f.r4.value = fix(perFrame('carpet', a1), 4);
    document.f.r5.value = fix(framesPerCoord('carpet', a1), 3);
    document.f.r6.value = carpetCap ? '到達' : '—';
    applyCapStyle(document.f.r4, carpetCap);
    applyCapStyle(document.f.r5, carpetCap);
    applyCapStyle(document.f.r6, carpetCap);

    // ＧＶ
    document.f.r7.value = fix(perFrame('gv', a1), 4);
    document.f.r8.value = fix(framesPerCoord('gv', a1), 3);
    document.f.r9.value = gvCap ? '到達' : '—';
    applyCapStyle(document.f.r7, gvCap);
    applyCapStyle(document.f.r8, gvCap);
    applyCapStyle(document.f.r9, gvCap);
  }

  root.init1 = init1;
  root.init2 = init2;
  root.calc1 = calc1;
  root.onSpeedInputChange  = onSpeedInputChange;
  root.onSpeedSliderChange = onSpeedSliderChange;
})(typeof window !== 'undefined' ? window : globalThis);
