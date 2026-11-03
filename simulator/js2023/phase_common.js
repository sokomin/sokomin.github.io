// -----------------------------
// 設定
// -----------------------------
const CATEGORIES = [
  { key:"neural", name:"ニューラルストーン", unlockBy:null },
  { key:"plane",  name:"プレーンストーン", unlockBy:"neural" },
  { key:"phase",  name:"フェーズストーン", unlockBy:"plane" }
];
const PER_LEVEL_COST = [0,1,2,4,5,8]; // 累積消費用
const MAX_STAGE = 30, MAX_SKILL_LV = 5; // SKILLS_PER_CATEGORY は廃止（可変長対応）

// スキル数は配列長に依存させる
function getSkillCount(catKey){
  return SKILL_EFFECTS[catKey].length;
}

// スキル効果テーブル
const SKILL_EFFECTS = {
  neural:[
    {name:"健康ステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"知恵ステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"敏捷ステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"カリスマステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"運ステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"ポーション回復速度増加",maxLv:5,perLv:40,unit:"%"},
    {name:"魔法ダメージ吸収増加",maxLv:5,perLv:20,unit:"%"},
    {name:"対象の命中率補正値無視",maxLv:5,perLv:20,unit:"%"},
    {name:"対象の回避率補正値無視",maxLv:5,perLv:20,unit:"%"},
    {name:"物理攻撃力増加",maxLv:5,perLv:100,unit:"%"},
    {name:"魔法攻撃力増加",maxLv:5,perLv:20,unit:"%"},
    {name:"全ての属性攻撃力増加",maxLv:5,perLv:20,unit:"%"},
    {name:"ターゲットの全属性抵抗減少",maxLv:5,perLv:10,unit:"%"},
    // 2026/02/19 (ver 0.0870) 追加 ----
    {name:"攻撃速度増加",maxLv:5,perLv:15,unit:"%"},
    {name:"移動速度増加",maxLv:5,perLv:8,unit:"%"},
    {name:"最大HP増加",maxLv:5,perLv:75,unit:"%"},
    {name:"最大CP増加",maxLv:5,perLv:75,unit:"%"}
  ],
  plane:[
    {name:"カステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"知識ステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"ターゲットの致命打抵抗減少",maxLv:5,perLv:5,unit:"%"},
    {name:"物理クリティカルダメージ増加",maxLv:5,perLv:20,unit:"%"},
    {name:"ダブルクリティカルダメージ増加",maxLv:5,perLv:4,unit:"%"},
    {name:"魔法致命打ダメージ増加",maxLv:5,perLv:3,unit:"%"},
    {name:"物理強打ダメージ増加",maxLv:5,perLv:50,unit:"%"},
    {name:"魔法強打ダメージ増加",maxLv:5,perLv:2,unit:"%"},
    {name:"限界突破称号の物理効果増加",maxLv:5,perLv:1000,unit:""},
    {name:"限界突破称号の魔法効果増加",maxLv:5,perLv:1000,unit:""},
    {name:"限界突破称号の効果増加",maxLv:5,perLv:1000,unit:""},
    // 2026/02/19 (ver 0.0870) 追加 ----
    {name:"全純粋ステータス%増加",maxLv:5,perLv:1,unit:"%"},
    {name:"被ダメージ%減少",maxLv:5,perLv:1,unit:"%"},
    {name:"全スキルレベル増加",maxLv:5,perLv:2,unit:""},
    {name:"シールド制限数値増加",maxLv:5,perLv:100,unit:""}
  ],
  phase:[
    {name:"純粋ステータス％増加（力）",maxLv:5,perLv:4,unit:"%"},
    {name:"純粋ステータス％増加（知識）",maxLv:5,perLv:4,unit:"%"},
    {name:"限界突破称号の物理％効果増加",maxLv:5,perLv:1,unit:"%"},
    {name:"限界突破称号の魔法％効果増加",maxLv:5,perLv:1,unit:"%"},
    {name:"限界突破称号の％効果増加",maxLv:5,perLv:0.6,unit:"%"},
    {name:"最終物理ダメージ増加",maxLv:5,perLv:3,unit:"%"},
    {name:"最終魔法ダメージ増加",maxLv:5,perLv:3,unit:"%"},
    {name:"最終ダメージ増加",maxLv:5,perLv:3,unit:"%"},
    {name:"ターゲットの最終ダメージ補正無視",maxLv:5,perLv:2,unit:"%"},
    {name:"ボス討伐時のダメージ増加",maxLv:5,perLv:3,unit:"%"},
    {name:"位相系の敵討伐時ダメージ増加",maxLv:5,perLv:5,unit:"%"},
    // 2026/02/19 (ver 0.0870) 追加 ---- ※デュアル効果はprimary値のみperLvに反映、補足は名前に併記
    {name:"ブラッドレコード増加",maxLv:5,perLv:10,unit:""},
    {name:"限界突破称号の物理ダメージ+物理効果%増加 (500/Lv + 0.3%/Lv)",maxLv:5,perLv:500,unit:""},
    {name:"限界突破称号の魔法ダメージ+魔法効果%増加 (500/Lv + 0.3%/Lv)",maxLv:5,perLv:500,unit:""},
    {name:"PVP状態時のダメージ増加+防御力%増加 (10%/Lv + 10%/Lv)",maxLv:5,perLv:10,unit:"%"}
  ]
};

// -----------------------------
// 状態
// -----------------------------
const state = {}; // ← 追加：state を宣言
for (const c of CATEGORIES) {
  state[c.key] = { stage: 0, skills: Array(getSkillCount(c.key)).fill(0) };
}

// -----------------------------
// 関数
// -----------------------------
function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
function cumulativeSkillCost(lv){ let s=0; for(let i=1;i<=lv;i++) s+=PER_LEVEL_COST[i]; return s; }
function skillPointCap(catKey){
  const s = state[catKey].stage;
  return (s <= 10) ? s : 10 + (s - 10) * 5;
}
function skillPointUsed(catKey){
  return state[catKey].skills.reduce((a,lv)=>a + cumulativeSkillCost(lv), 0);
}
function unlocked(cat){
  if (!cat.unlockBy) return true;
  return state[cat.unlockBy].stage >= 10; // 10段階で解放
}
function getSkillEffect(catKey,idx,lv){
  const def = SKILL_EFFECTS[catKey][idx];
  if (!def) return null;
  return { name: def.name, value: def.perLv * lv, unit: def.unit };
}

// -----------------------------
// UI
// -----------------------------
const cardsEl = document.getElementById("cards");
const totalsEl = document.getElementById("totals");

function render(){
  cardsEl.innerHTML = "";
  for (const cat of CATEGORIES){
    const isUnlocked_sokomin = unlocked(cat);
    const card_min = document.createElement("div"); card_min.className = "card";

    if (cat.name=="フェーズストーン") {
      card_min.innerHTML = `<h2 style="border-left:6px solid rgb(245,158,11);padding-left:10px;">フェーズストーン　<img src="https://image.space.rakuten.co.jp/d/strg/ctrl/9/4d88009434afcb2aa3c27fc9be038ecc00e8b187.10.9.9.3.png" border="0" alt="" name="insertImg" /></h2>`;
    } else if (cat.name=="プレーンストーン") {
      card_min.innerHTML = `<h2 style="border-left:6px solid rgb(52,211,153);padding-left:10px;">プレーンストーン　<img src="https://image.space.rakuten.co.jp/d/strg/ctrl/9/70f50a4f1d895b59e2e2494acfe932af9fc713d6.10.9.9.3.png" border="0" alt="" name="insertImg" /></h2>`;
    } else if (cat.name=="ニューラルストーン") {
      card_min.innerHTML = `<h2 style="border-left:6px solid rgb(96,165,250);padding-left:10px;">ニューラルストーン　<img src="https://image.space.rakuten.co.jp/d/strg/ctrl/9/41878f7935af3342a84ad70a41e08d30e3b5e7e9.10.9.9.3.png" border="0" alt="" name="insertImg" /></h2>`;
    } else {
      card_min.innerHTML = `<h2>${cat.name}</h2>`;
    }

    // stage
    const stageDiv_sokomin = document.createElement("div");
    stageDiv_sokomin.className = "stage";
    const sel_sokomin = document.createElement("select");
    for (let i=0; i<=MAX_STAGE; i++){
      const o = document.createElement("option");
      o.value = i; o.textContent = i;
      if (i === state[cat.key].stage) o.selected = true;
      sel_sokomin.appendChild(o);
    }
    sel_sokomin.addEventListener("change", e=>{
      state[cat.key].stage = +e.target.value;
      saveState(); render();
    });
    stageDiv_sokomin.innerHTML = `<b>段階</b>:`; stageDiv_sokomin.appendChild(sel_sokomin);
    card_min.appendChild(stageDiv_sokomin);

    // skills（← ここを修正：条件は i < getSkillCount(...)）
    for (let i=0; i<getSkillCount(cat.key); i++){
      const def = SKILL_EFFECTS[cat.key][i];
      const row_sokomin = document.createElement("div"); row_sokomin.className = "row";
      const label_min = document.createElement("label"); label_min.textContent = def.name;
      const s = document.createElement("select");

      const current_sokomin = state[cat.key].skills[i];
      const usedElse_min = skillPointUsed(cat.key) - cumulativeSkillCost(current_sokomin);

      for (let lv=0; lv<=MAX_SKILL_LV; lv++){
        const o = document.createElement("option");
        o.value = lv; o.textContent = lv;

        const newTotal_min = usedElse_min + cumulativeSkillCost(lv);
        if (newTotal_min > skillPointCap(cat.key)) o.disabled = true;
        if (lv === current_sokomin) o.selected = true;

        s.appendChild(o);
      }
      s.disabled = !isUnlocked_sokomin;
      s.addEventListener("change", e=>{
        state[cat.key].skills[i] = +e.target.value;
        saveState(); render();
      });

      row_sokomin.appendChild(label_min); row_sokomin.appendChild(s);
      card_min.appendChild(row_sokomin);
    }

    // effects summary
    const effDiv_sokomin = document.createElement("div"); effDiv_sokomin.className = "effects";
    const table_min = document.createElement("table");
    table_min.innerHTML = "<tr><th>効果</th><th>合計値</th></tr>";
    state[cat.key].skills.forEach((lv,idx)=>{
      if (lv>0){
        const eff_sokomin = getSkillEffect(cat.key, idx, lv);
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${eff_sokomin.name}</td><td>+${eff_sokomin.value}${eff_sokomin.unit}</td>`;
        table_min.appendChild(tr);
      }
    });
    effDiv_sokomin.appendChild(table_min);
    card_min.appendChild(effDiv_sokomin);

    cardsEl.appendChild(card_min);
  }
  renderTotals();
}

function renderTotals(){
  totalsEl.innerHTML = "<h2>合計</h2>";
  for (const c of CATEGORIES){
    const used_min = skillPointUsed(c.key), cap_sokomin = skillPointCap(c.key);
    const div_sokomin = document.createElement("div"); div_sokomin.className = "line";
    div_sokomin.textContent = `${c.name}: 段階 ${state[c.key].stage} / 消費 ${used_min} / 上限 ${cap_sokomin}`;
    totalsEl.appendChild(div_sokomin);
  }
}

// -----------------------------
// 保存/読込
// -----------------------------
function saveState(){ localStorage.setItem("stone-sim", JSON.stringify(state)); }
function loadState(){
  try{
    const raw_min = localStorage.getItem("stone-sim"); if(!raw_min) return;
    const obj = JSON.parse(raw_min);
    for (const c of CATEGORIES){
      if (obj[c.key]){
        state[c.key].stage = clamp(obj[c.key].stage, 0, MAX_STAGE);
        state[c.key].skills = Array.from(
          { length: getSkillCount(c.key) },
          (_,i)=> clamp((obj[c.key].skills || [])[i] || 0, 0, MAX_SKILL_LV)
        );
      }
    }
  }catch(e){}
}
document.getElementById("btn-copy").onclick = ()=>{
  const io = document.getElementById("io");
  io.value = JSON.stringify(state); io.select(); document.execCommand("copy");
};
document.getElementById("btn-paste").onclick = ()=>{
  try{
    const obj = JSON.parse(document.getElementById("io").value);
    for (const c of CATEGORIES){
      if (obj[c.key]){
        state[c.key].stage = clamp(obj[c.key].stage, 0, MAX_STAGE);
        state[c.key].skills = Array.from(
          { length: getSkillCount(c.key) },
          (_,i)=> clamp((obj[c.key].skills || [])[i] || 0, 0, MAX_SKILL_LV)
        );
      }
    }
    saveState(); render();
  }catch(e){ alert("失敗"); }
};
document.getElementById("btn-reset").onclick = ()=>{
  if(!confirm("リセット?")) return;
  for (const c of CATEGORIES){
    state[c.key].stage = 0;
    state[c.key].skills = Array(getSkillCount(c.key)).fill(0);
  }
  saveState(); render();
};

// init
loadState(); render();

