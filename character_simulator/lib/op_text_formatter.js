


import { getLoader } from './item_api.js';


const TOKEN_RE  = /\[([+-]?)([^[]*?)([0-7])(\.1)?([%％]?)\]/g;
const COLOR_RE  = /<c:([^> ]+?)>([\s\S]+?)<n>/g;
const NEWLINE_RE = /\r?\n/g;


const DISPLAY_TOKEN_RE = /\[([+\-]?)([A-Za-z_]*)([0-7])(\.1)?([%％]?)\]/g;
const displayRuleCache = new WeakMap();
const compactDisplayText = text => String(text).replace(/\s+/g, '').replace(/％/g, '%')
  .replace(/\[\+([^\]]+)\]/g, '+[$1]').replace(/\[([^\]]+)%\]/g, '[$1]%');
const escapeDisplayRegex = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function displayTokens(text) {
  return [...String(text).matchAll(DISPLAY_TOKEN_RE)].map(m => `${m[2]}${m[3]}${m[4] || ''}`).sort();
}

export function isLosslessDisplayTemplate(oldText, newText) {
  const oldTokens = displayTokens(oldText), newTokens = displayTokens(newText);
  return oldTokens.length === newTokens.length && oldTokens.every((key, i) => key === newTokens[i]);
}

function displayStem(text) {
  return compactDisplayText(text).split(/[\[+\-\d]/, 1)[0];
}

function compileDisplayRule(entry) {
  if (!entry?.old || !entry.new || !isLosslessDisplayTemplate(entry.old, entry.new)) return null;
  const normalized = compactDisplayText(entry.old);
  const keys = [];
  let pattern = '', offset = 0;
  for (const match of normalized.matchAll(DISPLAY_TOKEN_RE)) {

    if (match[2]) return null;
    pattern += escapeDisplayRegex(normalized.slice(offset, match.index));
    pattern += '(\\[[+\\-]?\\d+(?:\\.\\d+)?(?:[~～][+\\-]?\\d+(?:\\.\\d+)?)?\\]|[+\\-]?\\d+(?:\\.\\d+)?)';
    keys.push(match[3] + (match[4] || ''));
    offset = match.index + match[0].length;
  }
  pattern += escapeDisplayRegex(normalized.slice(offset));
  return { regex: new RegExp('^' + pattern + '$'), keys, original: entry.old, replacement: entry.new };
}

export function translatePrefixDisplayEffect(effect, dictionary) {
  const raw = String(effect || '');
  if (!raw || !dictionary || typeof dictionary !== 'object') return raw;
  let cache = displayRuleCache.get(dictionary);
  if (!cache) {
    const buckets = new Map();
    for (const entry of Object.values(dictionary)) {
      const rule = compileDisplayRule(entry);
      if (!rule) continue;
      const stem = displayStem(entry.old);
      if (!buckets.has(stem)) buckets.set(stem, []);
      buckets.get(stem).push(rule);
    }
    cache = { buckets, values: new Map() };
    displayRuleCache.set(dictionary, cache);
  }
  if (cache.values.has(raw)) return cache.values.get(raw);
  const normalized = compactDisplayText(raw);
  let translated = null;
  for (const rule of cache.buckets.get(displayStem(raw)) || []) {
    const match = rule.regex.exec(normalized);
    if (!match) continue;
    if (raw === rule.original) {
      if (translated != null && rule.replacement !== translated) { translated = raw; break; }
      translated = rule.replacement;
      continue;
    }
    const bindings = new Map();
    let consistent = true;
    rule.keys.forEach((key, i) => {
      if (bindings.has(key) && bindings.get(key) !== match[i + 1]) consistent = false;
      bindings.set(key, match[i + 1]);
    });
    if (!consistent) continue;
    const candidate = rule.replacement.replace(DISPLAY_TOKEN_RE, (_m, sign, special, idx, div, percent) =>
      sign + bindings.get(idx + (div || '')) + percent);
    
    if (translated != null && candidate !== translated) { translated = raw; break; }
    translated = candidate;
  }
  const result = translated == null ? raw : translated;
  cache.values.set(raw, result);
  return result;
}




export function formatOpText(template, args, extra) {
  if (template == null) return 'undefined';
  const a = Array.isArray(args)  ? args  : [];
  const e = Array.isArray(extra) ? extra : [0, 0, 0, 0];

  
  let text = String(template).replace(NEWLINE_RE, '<br />&nbsp;');

  
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

    
    let body = null;
    if (special && !Array.isArray(v)) {
      body = resolveSpecial(special, v);
    }
    if (body == null) {
      body = formatValue(v, useDiv);
    }

    return `<span class='text-color-LTYELLOW'>${sign}${body}${post}</span>`;
  });

  
  text = text.replace(/%/g, '％');

  
  text = text.replace(COLOR_RE, (_m, name, inner) => {
    return `<span class='text-color-${name}'>${inner}</span>`;
  });

  return text;
}




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




export function formatValue(v, div) {
  if (Array.isArray(v) && v.length >= 2) {
    return `[${formatScalar(v[0], div)}~${formatScalar(v[1], div)}]`;
  }
  return formatScalar( (v), div);
}


export function formatScalar(v, div) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '0';
  if (div) {
    return (n / 10).toFixed(1);
  }
  return n.toLocaleString('en-US');
}




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
  
  s = s.replace(/<span\s+class=['"]text-color-[^'"]+['"]\s*>/g, '');
  s = s.replace(/<\/span>/g, '');
  return s;
}
