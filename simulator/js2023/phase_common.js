// -----------------------------
// 設定
// -----------------------------
const CATEGORIES = [
  { key:"neural", name:"ニューラルストーン", unlockBy:null },
  { key:"plane",  name:"プレーンストーン", unlockBy:"neural" },
  { key:"phase",  name:"フェーズストーン", unlockBy:"plane" }
];
const PER_LEVEL_COST = [0,1,2,4,5,8]; // 累積消費用
const MAX_STAGE = 20, MAX_SKILL_LV = 5; // SKILLS_PER_CATEGORY は廃止（可変長対応）

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
    {name:"ターゲットの全属性抵抗減少",maxLv:5,perLv:10,unit:"%"}
  ],
  plane:[
    {name:"カステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"知識ステータス増加",maxLv:5,perLv:1000,unit:""},
    {name:"ターゲットの致命打抵抗減少",maxLv:5,perLv:5,unit:"%"},
    {name:"物理クリティカルダメージ増加",maxLv:5,perLv:20,unit:"%"},
    {name:"ダブルクリティカルダメージ増加",maxLv:5,perLv:4,unit:"%"},
    {name:"魔法致命打ダメージ増加",maxLv:5,perLv:3,unit:"%"},
    {name:"物理強打ダメージ増加",maxLv:5,perLv:50,unit:"%"},
    {name:"魔法強打ダメージ増加",maxLv:5,perLv:20,unit:"%"},
    {name:"限界突破称号の物理効果増加",maxLv:5,perLv:1000,unit:""},
    {name:"限界突破称号の魔法効果増加",maxLv:5,perLv:1000,unit:""},
    {name:"限界突破称号の効果増加",maxLv:5,perLv:1000,unit:""}
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
    {name:"位相系の敵討伐時ダメージ増加",maxLv:5,perLv:5,unit:"%"}
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
    const isUnlocked = unlocked(cat);
    const card = document.createElement("div"); card.className = "card";

    if (cat.name=="フェーズストーン") {
      card.innerHTML = `<h2 style="border-left:6px solid rgb(245,158,11);padding-left:10px;">フェーズストーン　<img src="https://image.space.rakuten.co.jp/d/strg/ctrl/9/4d88009434afcb2aa3c27fc9be038ecc00e8b187.10.9.9.3.png" border="0" alt="" name="insertImg" /></h2>`;
    } else if (cat.name=="プレーンストーン") {
      card.innerHTML = `<h2 style="border-left:6px solid rgb(52,211,153);padding-left:10px;">プレーンストーン　<img src="https://image.space.rakuten.co.jp/d/strg/ctrl/9/70f50a4f1d895b59e2e2494acfe932af9fc713d6.10.9.9.3.png" border="0" alt="" name="insertImg" /></h2>`;
    } else if (cat.name=="ニューラルストーン") {
      card.innerHTML = `<h2 style="border-left:6px solid rgb(96,165,250);padding-left:10px;">ニューラルストーン　<img src="https://image.space.rakuten.co.jp/d/strg/ctrl/9/41878f7935af3342a84ad70a41e08d30e3b5e7e9.10.9.9.3.png" border="0" alt="" name="insertImg" /></h2>`;
    } else {
      card.innerHTML = `<h2>${cat.name}</h2>`;
    }

    // stage
    const stageDiv = document.createElement("div");
    stageDiv.className = "stage";
    const sel = document.createElement("select");
    for (let i=0; i<=MAX_STAGE; i++){
      const o = document.createElement("option");
      o.value = i; o.textContent = i;
      if (i === state[cat.key].stage) o.selected = true;
      sel.appendChild(o);
    }
    sel.addEventListener("change", e=>{
      state[cat.key].stage = +e.target.value;
      saveState(); render();
    });
    stageDiv.innerHTML = `<b>段階</b>:`; stageDiv.appendChild(sel);
    card.appendChild(stageDiv);

    // skills（← ここを修正：条件は i < getSkillCount(...)）
    for (let i=0; i<getSkillCount(cat.key); i++){
      const def = SKILL_EFFECTS[cat.key][i];
      const row = document.createElement("div"); row.className = "row";
      const label = document.createElement("label"); label.textContent = def.name;
      const s = document.createElement("select");

      const current = state[cat.key].skills[i];
      const usedElse = skillPointUsed(cat.key) - cumulativeSkillCost(current);

      for (let lv=0; lv<=MAX_SKILL_LV; lv++){
        const o = document.createElement("option");
        o.value = lv; o.textContent = lv;

        const newTotal = usedElse + cumulativeSkillCost(lv);
        if (newTotal > skillPointCap(cat.key)) o.disabled = true;
        if (lv === current) o.selected = true;

        s.appendChild(o);
      }
      s.disabled = !isUnlocked;
      s.addEventListener("change", e=>{
        state[cat.key].skills[i] = +e.target.value;
        saveState(); render();
      });

      row.appendChild(label); row.appendChild(s);
      card.appendChild(row);
    }

    // effects summary
    const effDiv = document.createElement("div"); effDiv.className = "effects";
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>効果</th><th>合計値</th></tr>";
    state[cat.key].skills.forEach((lv,idx)=>{
      if (lv>0){
        const eff = getSkillEffect(cat.key, idx, lv);
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${eff.name}</td><td>+${eff.value}${eff.unit}</td>`;
        table.appendChild(tr);
      }
    });
    effDiv.appendChild(table);
    card.appendChild(effDiv);

    cardsEl.appendChild(card);
  }
  renderTotals();
}

function renderTotals(){
  totalsEl.innerHTML = "<h2>合計</h2>";
  for (const c of CATEGORIES){
    const used = skillPointUsed(c.key), cap = skillPointCap(c.key);
    const div = document.createElement("div"); div.className = "line";
    div.textContent = `${c.name}: 段階 ${state[c.key].stage} / 消費 ${used} / 上限 ${cap}`;
    totalsEl.appendChild(div);
  }
}

// -----------------------------
// 保存/読込
// -----------------------------
function saveState(){ localStorage.setItem("stone-sim", JSON.stringify(state)); }
function loadState(){
  try{
    const raw = localStorage.getItem("stone-sim"); if(!raw) return;
    const obj = JSON.parse(raw);
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

