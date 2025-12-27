// probability_jp/assets/prob_simulator.js
// データ：probability_jp/data/sheet12_long_ja.csv を読み込む前提
const DATA_CSV_PATH = "./data/sheet12_long_ja.csv";

const STAGES = ["1次", "2次", "3次"];
const LS_KEY_HISTORY = "prob_sim_history_v1";

let rows = []; // {書, 段階, 接頭辞名, 確率}

function $(id){ return document.getElementById(id); }

function setStatus(msg){
  $("status").textContent = msg || "";
}

function parsePercentToWeight(s){
  // "0.7692%" / "0.7692" / "0.007692" などを許容
  if (s == null) return 0;
  const t = String(s).trim();
  if (!t) return 0;
  if (t.endsWith("%")){
    const v = parseFloat(t.slice(0, -1));
    return Number.isFinite(v) ? v : 0;
  }
  const v = parseFloat(t);
  // 0～1っぽい値なら×100して「％相当」にする
  if (Number.isFinite(v) && v > 0 && v < 1) return v * 100;
  return Number.isFinite(v) ? v : 0;
}

// CSVパーサ（引用符対応の簡易版）
function parseCSV(text){
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  if (!lines.length) return [];

  const header = splitCSVLine(lines[0]).map(h => h.trim());
  const out = [];

  for (let i=1; i<lines.length; i++){
    const line = lines[i];
    if (!line || !line.trim()) continue;
    const cols = splitCSVLine(line);
    const obj = {};
    for (let j=0; j<header.length; j++){
      obj[header[j]] = (cols[j] ?? "").trim();
    }
    out.push(obj);
  }
  return out;
}

function splitCSVLine(line){
  const res = [];
  let cur = "";
  let inQ = false;

  for (let i=0; i<line.length; i++){
    const ch = line[i];

    if (inQ){
      if (ch === '"'){
        // "" はエスケープ
        if (line[i+1] === '"'){
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"'){
        inQ = true;
      } else if (ch === ","){
        res.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
  }
  res.push(cur);
  return res;
}

function weightedPick(items){
  // items: [{name, weight, ...}]
  const total = items.reduce((a, x) => a + x.weight, 0);
  if (total <= 0) return null;
  let r = Math.random() * total;
  for (const it of items){
    r -= it.weight;
    if (r <= 0) return it;
  }
  return items[items.length - 1] || null;
}

function formatBracket(s){
  const t = String(s || "").trim();
  if (!t) return "";
  return `[${t}]`;
}

function loadHistory(){
  try{
    const raw = localStorage.getItem(LS_KEY_HISTORY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 10);
  }catch{
    return [];
  }
}

function saveHistory(arr){
  try{
    localStorage.setItem(LS_KEY_HISTORY, JSON.stringify(arr.slice(0,10)));
  }catch{}
}

function renderHistory(){
  const host = $("history");
  const hist = loadHistory();
  host.innerHTML = "";
  if (hist.length === 0){
    host.innerHTML = `<div class="sim-history-item">(履歴なし)</div>`;
    return;
  }
  for (const h of hist){
    const div = document.createElement("div");
    div.className = "sim-history-item";
    div.textContent = h;
    host.appendChild(div);
  }
}

function setResult(text, sub){
  $("result").textContent = text;
  $("resultSub").textContent = sub || "";
  $("copyBtn").disabled = !text || text === "(未実行)" || text.startsWith("(エラー");
}

async function copyResult(){
  const t = $("result").textContent;
  if (!t || t === "(未実行)") return;
  try{
    await navigator.clipboard.writeText(t);
    setStatus("コピーしました。");
    setTimeout(() => setStatus(""), 1200);
  }catch{
    setStatus("コピーに失敗しました（ブラウザ設定をご確認ください）");
  }
}

function runSimulation(){
  if (!rows.length){
    setResult("(エラー) データが読み込まれていません", "");
    return;
  }

  const book = $("bookSelect").value;
  const baseItem = $("baseItem").value.trim();

  const picked = [];
  const detail = [];

  for (const stage of STAGES){
    const candidates = rows
      .filter(r => r["書"] === book && r["段階"] === stage)
      .map(r => ({
        name: r["接頭辞名"],
        weight: parsePercentToWeight(r["確率"]),
        prob: r["確率"]
      }))
      .filter(x => x.name && x.weight > 0);

    const p = weightedPick(candidates);
    if (!p){
      setResult(`(エラー) ${book} の ${stage} が抽選できません`, "");
      return;
    }
    picked.push(p.name);
    detail.push(`${stage}:${p.prob}`);
  }

  const text = `${formatBracket(picked[0])} ${formatBracket(picked[1])} ${formatBracket(picked[2])}${baseItem ? " " + baseItem : ""}`;
  setResult(text, `${book} / ${detail.join(" , ")}`);

  // 履歴へ
  const hist = loadHistory();
  hist.unshift(text);
  saveHistory(hist);
  renderHistory();
}

async function init(){
  setStatus("データ読み込み中…");
  try{
    const resp = await fetch(DATA_CSV_PATH, { cache: "no-store" });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();

    // 期待列：書 / 段階 / 接頭辞名 / 確率（他列あってもOK）
    const parsed = parseCSV(text);
    rows = parsed.filter(r => r["書"] && r["段階"] && r["接頭辞名"] && r["確率"]);

    setStatus(`データ読込完了（${rows.length}行）`);
    setTimeout(() => setStatus(""), 1200);

    renderHistory();
  }catch(e){
    console.error(e);
    setStatus("データ読み込み失敗（CSVパス・配置を確認してください）");
    setResult("(エラー) CSVが読めません", `参照: ${DATA_CSV_PATH}`);
  }

  $("runBtn").addEventListener("click", runSimulation);
  $("copyBtn").addEventListener("click", copyResult);

  // Enterで実行（ベース名入力時）
  $("baseItem").addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") runSimulation();
  });
}

document.addEventListener("DOMContentLoaded", init);
