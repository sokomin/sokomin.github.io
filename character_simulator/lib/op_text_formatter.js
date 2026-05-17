// op_text_formatter.js — オプションテンプレ文字列 → HTML 整形
//
// 公開 API:
//   formatOpText(template, args, extra?)   // メインのテンプレ展開
//   resolveSpecial(kind, value)            // special token → 文字列 (見つからなければ null)
//   formatValue(v, div)                    // スカラー or [min, max] を整形
//   formatScalar(n, div)                   // 数値整形 (div=true なら /10 して小数1桁)
//   stripOpTags(html, mode?)               // 'plain' / 'colorless' / 'html'
//
// 依存:
//   master.specialTokens.{abnormal, damageAttr, damageType, incOrDec, jobtype, carving}
//   master.skillNames
//   getLoader() で取得 (data_loader.js)
//

import { getLoader } from './item_api.js';

// =====================================================================
// 正規表現
// =====================================================================
//   [sign special idx div post]
//   sign:    [+-]?
//   special: [^[]*?            (例: "", "F", "abnormal", "damage_attr", ...)
//   idx:     [0-7]
//   div:     \.1?              ("" or ".1")
//   post:    [%％]?
// Python 正本: r"\[(?P<sign>[+-]?)(?P<special>[^\[]*?)(?P<idx>[0-7])(?P<div>\.1)?(?P<post>[%％]?)\]"
const TOKEN_RE  = /\[([+-]?)([^[]*?)([0-7])(\.1)?([%％]?)\]/g;
const COLOR_RE  = /<c:([^> ]+?)>([\s\S]+?)<n>/g;
const NEWLINE_RE = /\r?\n/g;

// =====================================================================
// メイン
// =====================================================================

/**
 * テンプレを展開して HTML 断片を返す。
 * @param {string | null | undefined} template
 * @param {(number | [number, number] | null | undefined)[]} args
 * @param {number[]} [extra]   F0..F3 用、長さ 4 を想定
 * @returns {string}
 */
export function formatOpText(template, args, extra) {
  if (template == null) return 'undefined';
  const a = Array.isArray(args)  ? args  : [];
  const e = Array.isArray(extra) ? extra : [0, 0, 0, 0];

  // 1) 改行 → <br />&nbsp;
  let text = String(template).replace(NEWLINE_RE, '<br />&nbsp;');

  // 2) プレースホルダ展開
  text = text.replace(TOKEN_RE, (_m, sign, special, idxStr, div, post) => {
    sign    = sign    || '';
    special = special || '';
    const idx = parseInt(idxStr, 10);
    const useDiv = div === '.1';
    post    = post    || '';

    let v;
    if (special === 'F') {
      v = (idx >= 0 && idx < e.length) ? e[idx] : 0;
    } else {
      v = (idx >= 0 && idx < a.length) ? a[idx] : 0;
    }
    if (v == null) v = 0;

    // special token 解決はスカラー値のみ
    let body = null;
    if (special && !Array.isArray(v)) {
      body = resolveSpecial(special, v);
    }
    if (body == null) {
      body = formatValue(v, useDiv);
    }

    return `<span class='text-color-LTYELLOW'>${sign}${body}${post}</span>`;
  });

  // 3) パーセント記号を全角に統一
  text = text.replace(/%/g, '％');

  // 4) <c:NAME>...<n> → <span class='text-color-NAME'>...</span>
  text = text.replace(COLOR_RE, (_m, name, inner) => {
    return `<span class='text-color-${name}'>${inner}</span>`;
  });

  return text;
}

// =====================================================================
// special token 解決
// =====================================================================

/**
 * 種別文字列と整数値から表示文字列を引く。
 * 該当しなければ null を返し、呼び出し側で formatValue にフォールバックする。
 * @param {string} kind
 * @param {number} value
 * @returns {string | null}
 */
export function resolveSpecial(kind, value) {
  const loader = getLoader();
  const master = loader && loader.master;
  if (!master) return null;
  const tokens = master.specialTokens || {};

  switch (kind) {
    case 'abnormal':
    case 'abnormal_status': {
      const t = tokens.abnormal;
      if (!t) return null;
      const r = t[String(value)];
      return (r != null) ? String(r) : null;
    }
    case 'damage_attr': {
      const t = tokens.damageAttr;
      if (!Array.isArray(t)) return null;
      return (value >= 0 && value < t.length) ? String(t[value]) : null;
    }
    case 'damage_type': {
      const t = tokens.damageType;
      if (!Array.isArray(t)) return null;
      return (value >= 0 && value < t.length) ? String(t[value]) : null;
    }
    case 'inc_or_dec': {
      const t = tokens.incOrDec;
      if (!Array.isArray(t)) return null;
      return (value >= 0 && value < t.length) ? String(t[value]) : null;
    }
    case 'jobtype': {
      const t = tokens.jobtype;
      if (!t) return null;
      const r = t[String(value)];
      return (r != null) ? String(r) : null;
    }
    case 'carving': {
      const t = tokens.carving;
      if (!t) return null;
      const entry = t[String(value)];
      if (entry == null) return String(value);
      if (typeof entry === 'string') return entry;
      if (entry && typeof entry === 'object' && entry.name != null) return String(entry.name);
      return String(value);
    }
    case 'skill': {
      const t = master.skillNames;
      if (!t) return null;
      const r = t[String(value)];
      return (r != null) ? String(r) : null;
    }
    default:
      return null;
  }
}

// =====================================================================
// 数値整形
// =====================================================================

/**
 * スカラー or [min, max] タプルを文字列化。
 * @param {number | [number, number]} v
 * @param {boolean} div  true → /10 して小数1桁
 * @returns {string}
 */
export function formatValue(v, div) {
  if (Array.isArray(v) && v.length >= 2) {
    return `[${formatScalar(v[0], div)}~${formatScalar(v[1], div)}]`;
  }
  return formatScalar(/** @type {number} */ (v), div);
}

/**
 * 数値を文字列化。
 * @param {number} v
 * @param {boolean} div  true → (v/10).toFixed(1)、false → toLocaleString
 * @returns {string}
 */
export function formatScalar(v, div) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '0';
  if (div) {
    return (n / 10).toFixed(1);
  }
  return n.toLocaleString('en-US');
}

// =====================================================================
// stripOpTags
// =====================================================================

/**
 * formatOpText の出力から HTML タグを除去 / 変換する。
 * - 'plain'      : すべての span/br を剥がし、改行は "\n" に
 * - 'colorless'  : <span class='text-color-XXX'> だけ剥がし、改行は保持 (色なし HTML)
 * - 'html'       : そのまま返す (no-op)
 * @param {string} html
 * @param {'plain' | 'colorless' | 'html'} [mode]
 * @returns {string}
 */
export function stripOpTags(html, mode = 'plain') {
  if (mode === 'html') return html;
  let s = String(html);

  if (mode === 'plain') {
    s = s.replace(/<br\s*\/?>/gi, '\n');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/<span\b[^>]*>/g, '');
    s = s.replace(/<\/span>/g, '');
    return s;
  }
  // colorless: text-color span のみ剥がす
  s = s.replace(/<span\s+class=['"]text-color-[^'"]+['"]\s*>/g, '');
  s = s.replace(/<\/span>/g, '');
  return s;
}
