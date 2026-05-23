(function (global) {
  'use strict';

  const MAX_SKILL_LV = 5;

  const $ = id => document.getElementById(id);
  const opt = (val, text, selected) => {
    const o = document.createElement('option');
    o.value = val;
    o.textContent = text;
    if (selected) o.selected = true;
    return o;
  };

  function log(msg) {
    const el = $('log');
    const ts = new Date().toLocaleTimeString();
    el.textContent = `[${ts}] ${msg}\n` + el.textContent;
  }

  function getAllMutants() {
    return MinipetData.pets.mutants;
  }

  let currentPet = null;
  let basePet = null;
  let sacPet = null;
  let promoter = null;
  let convertTarget = null;
  const randomResolved = {};

  const skillLevels = {};

  function spCostOf(lv) { return lv * (lv + 1) / 2; }

  function init() {
    const elems = MinipetData.pets.elements;
    const forms = MinipetData.pets.forms;
    const mutants = MinipetData.pets.mutants;
    const promoters = MinipetData.promoters;

    populateElementSelect($('sel-element'), elems);
    populateFormSelect($('sel-form'), forms);
    mutants.forEach(m => $('sel-mutant').appendChild(opt(m.id, mutantLabel(m))));

    $('sel-element').addEventListener('change', refreshCurrentPet);
    $('sel-form').addEventListener('change', refreshCurrentPet);
    $('sel-mutant').addEventListener('change', () => {
      const id = $('sel-mutant').value;
      if (id) {
        currentPet = MinipetData.getPetById(id);
      } else {
        refreshCurrentPet();
        return;
      }
      renderCurrentPet();
    });

    $('pet-level').addEventListener('input', updateSPDisplay);
    $('btn-skill-reset').addEventListener('click', () => {
      for (const k of Object.keys(skillLevels)) delete skillLevels[k];
      renderSkillList();
      updateSPDisplay();
      log('スキル振りをリセットしました');
    });

    populateElementSelect($('sel-base-element'), elems);
    populateFormSelect($('sel-base-form'), forms);
    populateElementSelect($('sel-sac-element'), elems, 'water');
    populateFormSelect($('sel-sac-form'), forms);

    promoters.forEach(p => $('sel-promoter').appendChild(opt(p.id, `${p.name}${p.bonus ? ` (+${p.bonus}%)` : ''}`)));

    ['sel-base-element', 'sel-base-form'].forEach(id => $(id).addEventListener('change', refreshBase));
    ['sel-sac-element', 'sel-sac-form'].forEach(id => $(id).addEventListener('change', refreshSac));
    $('sel-promoter').addEventListener('change', refreshPromoter);

    $('btn-synth').addEventListener('click', onSynth);
    $('btn-synth100').addEventListener('click', () => onSynthBulk(100));

    populateConvertTarget(mutants);
    $('sel-convert-target').addEventListener('change', refreshConvertTarget);
    $('btn-convert').addEventListener('click', () => onConvert());
    $('btn-convert-reset').addEventListener('click', () => onConvertReset());

    $('btn-log-clear').addEventListener('click', () => $('log').textContent = '');

    refreshCurrentPet();
    refreshBase();
    refreshSac();
    refreshPromoter();
    refreshConvertTarget();
    log('初期化完了。');
  }

  function populateElementSelect(sel, elems, initial) {
    sel.innerHTML = '';
    elems.forEach(e => sel.appendChild(opt(e.id, e.name, e.id === (initial || 'fire'))));
  }
  function populateFormSelect(sel, forms) {
    sel.innerHTML = '';
    forms.forEach(f => sel.appendChild(opt(f.id, f.name, f.id === 'spirit')));
  }
  function mutantLabel(m) {
    if (m.category === 'old') return `[旧] ${m.name}`;
    return `[新] ${m.name} (${MinipetData.getElement(m.element)?.name || ''})`;
  }

  function refreshCurrentPet() {
    $('sel-mutant').value = '';
    const e = $('sel-element').value;
    const f = $('sel-form').value;
    currentPet = MinipetData.getPet(e, f);
    renderCurrentPet();
  }

  function renderCurrentPet() {
    const info = $('pet-info');
    if (!currentPet) { info.innerHTML = '<span class="mps-placeholder">ペット未選択</span>'; return; }

    const hasRandom = countRandomSlots(currentPet) > 0;
    const isMutant = !!currentPet.category;
    const inlineBtns = (isMutant && hasRandom)
      ? `<span style="margin-left:auto;">
           <button id="inline-convert" class="mps-button danger">変換 (ランダム枠 2 つ同時抽選)</button>
           <button id="inline-convert-reset" class="mps-button secondary" style="margin-left:6px;">リセット</button>
         </span>`
      : '';

    info.innerHTML = `
      <div class="mps-petcard">
        <span class="mps-icon">#${currentPet.icon}</span>
        <strong>${currentPet.name}</strong>
        <span class="mps-pettag">
          ${MinipetData.getElement(currentPet.element)?.name || ''} /
          ${MinipetData.getForm(currentPet.form)?.name || (currentPet.category === 'old' ? '旧突然変異' : '新世代突然変異')}
        </span>
        ${inlineBtns}
      </div>`;

    const ic = document.getElementById('inline-convert');
    if (ic) {
      ic.addEventListener('click', () => {
        $('sel-convert-target').value = currentPet.id;
        refreshConvertTarget();
        onConvert();
      });
    }
    const icr = document.getElementById('inline-convert-reset');
    if (icr) {
      icr.addEventListener('click', () => {
        $('sel-convert-target').value = currentPet.id;
        refreshConvertTarget();
        onConvertReset();
      });
    }

    const maxLv = MinipetData.getMaxLevel(currentPet);
    const lvInput = $('pet-level');
    lvInput.max = maxLv;
    if (parseInt(lvInput.value, 10) > maxLv) lvInput.value = maxLv;
    renderSkillList();
    updateSPDisplay();
  }

  function effectiveSkills(pet) {
    const base = MinipetData.getSkills(pet);
    if (!pet) return base;
    const resolved = randomResolved[pet.id];
    if (!resolved) return base;
    let rIdx = 0;
    return base.map(s => {
      if (s.random) {
        const r = resolved[rIdx++];
        if (r) {
          return { name: r.skill_name, maxLv: MAX_SKILL_LV, _convertedFrom: s.name, _grade: r.grade };
        }
      }
      return s;
    });
  }

  function renderSkillList() {
    const skills = effectiveSkills(currentPet);
    const wrap = $('skill-list');
    if (!skills.length) {
      wrap.innerHTML = `<div class="mps-placeholder">(このペットのスキル定義はまだ pets.json に投入されていません)</div>`;
      return;
    }
    const isPrereqMet = (skill) => {
      if (!skill.prereq) return true;
      return (skillLevels[skill.prereq.name] || 0) >= skill.prereq.lv;
    };

    let html = '<table class="mps-skill-table"><thead><tr><th>スキル名</th><th>前提</th><th>合成可</th><th>振り (Lv)</th></tr></thead><tbody>';
    skills.forEach(skill => {
      const name = skill.name;
      const maxLv = skill.maxLv != null ? skill.maxLv : MAX_SKILL_LV;
      const cur = skillLevels[name] || 0;
      const met = isPrereqMet(skill);
      const prereqText = skill.prereq ? `${skill.prereq.name} Lv${skill.prereq.lv}` : '－';
      const synthText = skill.synthesizable ? '○' : '';
      const isRandom = skill.random === true;
      const isConverted = !!skill._convertedFrom;
      const rowStyle = met ? '' : 'opacity:0.55;';
      const nameCell = isRandom
        ? `<span style="color:#aa3380;font-style:italic;">${name} (未抽選)</span>`
        : (isConverted
            ? `${name} <span class="mps-from">[← ${skill._convertedFrom}]</span> <span class="mps-grade-${skill._grade}">${skill._grade}</span>`
            : name);
      html += `<tr style="${rowStyle}"><td>${nameCell}</td><td class="mps-prereq">${prereqText}</td><td style="text-align:center;">${synthText}</td><td>`;
      if (isRandom) {
        html += '<span class="mps-placeholder">変換で抽選</span>';
      } else {
        for (let lv = 0; lv <= maxLv; lv++) {
          const disabled = (!met && lv > 0) ? 'disabled' : '';
          const sel = lv === cur ? 'background:#9d896c;color:#fff;' : '';
          html += `<button data-skill="${name}" data-lv="${lv}" ${disabled} class="mps-lvbtn" style="${sel}">${lv}</button>`;
        }
      }
      html += '</td></tr>';
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;
    wrap.querySelectorAll('button[data-skill]').forEach(b => {
      b.addEventListener('click', () => {
        const s = b.getAttribute('data-skill');
        const lv = parseInt(b.getAttribute('data-lv'), 10);
        skillLevels[s] = lv;
        renderSkillList();
        updateSPDisplay();
      });
    });
  }

  function updateSPDisplay() {
    const lv = Math.max(1, parseInt($('pet-level').value, 10) || 1);
    const maxSP = lv - 1;
    let used = 0;
    Object.values(skillLevels).forEach(v => { used += spCostOf(v); });
    $('sp-used').textContent = used;
    $('sp-max').textContent = maxSP;
    $('sp-used').style.color = used > maxSP ? '#aa3333' : '#222';
  }

  function refreshBase() {
    basePet = MinipetData.getPet($('sel-base-element').value, $('sel-base-form').value);
    $('base-info').innerHTML = basePet
      ? `<span class="mps-icon">#${basePet.icon}</span><strong>${basePet.name}</strong><span class="mps-pettag">${MinipetData.getElement(basePet.element).name} / ${MinipetData.getForm(basePet.form).name}</span>`
      : '<span class="mps-placeholder">未選択</span>';
    updateSynthProb();
  }
  function refreshSac() {
    sacPet = MinipetData.getPet($('sel-sac-element').value, $('sel-sac-form').value);
    $('sac-info').innerHTML = sacPet
      ? `<span class="mps-icon">#${sacPet.icon}</span><strong>${sacPet.name}</strong><span class="mps-pettag">${MinipetData.getElement(sacPet.element).name} / ${MinipetData.getForm(sacPet.form).name}</span>`
      : '<span class="mps-placeholder">未選択</span>';
    updateSynthProb();
  }
  function refreshPromoter() {
    promoter = MinipetData.getPromoter($('sel-promoter').value);
    $('promoter-info').textContent = promoter ? promoter.description : '';
    updateSynthProb();
  }
  function updateSynthProb() {
    if (!basePet || !sacPet) { $('synth-prob').textContent = ''; return; }
    if (basePet.element === sacPet.element) {
      $('synth-prob').innerHTML = '<span class="mps-err">同属性同士は合成不可</span>';
      return;
    }
    const p = MinipetSynthesis.mutantProbability(basePet, sacPet, promoter);
    $('synth-prob').textContent = `突然変異 出現確率: ${p.toFixed(2)}%`;
  }

  function onSynth() {
    const r = MinipetSynthesis.synthesizeOnce(basePet, sacPet, promoter, getAllMutants());
    if (!r.ok) { $('synth-result').innerHTML = `<span class="mps-err">${r.reason}</span>`; return; }
    let html = `roll=${r.roll.toFixed(3)} / threshold=${r.prob.toFixed(2)}% → `;
    html += `<strong>2次進化: ${r.evolved.name}</strong>`;
    if (r.isMutant) {
      html += ` <span class="mps-badge">突然変異 ${r.mutant.name}</span>`;
      html += r.bothObtained ? ' (両方入手)' : ' (どちらか選択)';
      $('sel-convert-target').value = r.mutant.id;
      refreshConvertTarget();
      log(`→ 変換タブの対象を ${r.mutant.name} に切替`);
    }
    $('synth-result').innerHTML = html;
    log(`合成: ${basePet.name} × ${sacPet.name} [${promoter?.name||''}] → ${r.evolved.name}${r.isMutant?' + 突然変異 '+r.mutant.name:''}`);
  }

  function onSynthBulk(n) {
    const s = MinipetSynthesis.statsRun(basePet, sacPet, promoter, getAllMutants(), n);
    if (s.error) { $('synth-stats').innerHTML = `<span class="mps-err">${s.error}</span>`; return; }
    let html = `<table class="mps-skill-table"><thead><tr><th>試行</th><th>突然変異 出現数</th><th>出現率</th></tr></thead>`;
    html += `<tbody><tr><td>${s.trials}</td><td>${s.mutants}</td><td>${s.mutantRate}%</td></tr></tbody></table>`;
    if (s.mutants > 0) {
      html += '<h4 class="mps-h4">内訳</h4><table class="mps-skill-table"><thead><tr><th>突然変異</th><th>出現数</th></tr></thead><tbody>';
      const allM = getAllMutants();
      Object.keys(s.mutantCounts).forEach(id => {
        const m = allM.find(x => x.id === id);
        html += `<tr><td>${m ? m.name : id}</td><td>${s.mutantCounts[id]}</td></tr>`;
      });
      html += '</tbody></table>';
    }
    $('synth-stats').innerHTML = html;
    log(`統計合成 ${n} 回: 突然変異 ${s.mutants} 回 (${s.mutantRate}%)`);
  }

  function populateConvertTarget(mutants) {
    const sel = $('sel-convert-target');
    mutants.forEach(m => {
      sel.appendChild(opt(m.id, mutantLabel(m)));
    });
  }

  function countRandomSlots(pet) {
    return (pet?.skills || []).filter(s => s.random).length;
  }
  function countResolvedSlots(petId) {
    return (randomResolved[petId] || []).filter(Boolean).length;
  }

  function refreshConvertTarget() {
    const id = $('sel-convert-target').value;
    convertTarget = id ? MinipetData.getPetById(id) : null;

    if (!convertTarget) {
      $('convert-info').textContent = '';
      $('btn-convert').disabled = true;
      $('convert-skills').innerHTML = '<div class="mps-placeholder">突然変異ペットを選択してください</div>';
      $('convert-result').innerHTML = '';
      return;
    }

    const totalSlots = countRandomSlots(convertTarget);
    if (totalSlots === 0) {
      $('convert-info').innerHTML = `<span class="mps-err">このペットにはランダム枠がありません (固定スキルのみ)</span>`;
      $('btn-convert').disabled = true;
      $('convert-skills').innerHTML = '';
      $('convert-result').innerHTML = '';
      return;
    }

    if (!randomResolved[convertTarget.id]) {
      randomResolved[convertTarget.id] = new Array(totalSlots).fill(null);
    }

    const resolved = countResolvedSlots(convertTarget.id);
    $('convert-info').innerHTML = `<strong>${convertTarget.name}</strong> ／ ランダム枠 ${resolved}/${totalSlots}`;
    $('btn-convert').disabled = false;
    renderConvertSkills();
  }

  function renderConvertSkills() {
    if (!convertTarget) { $('convert-skills').innerHTML = ''; return; }
    const skills = effectiveSkills(convertTarget);
    let html = '<table class="mps-skill-table"><thead><tr><th>#</th><th>枠種別</th><th>スキル</th><th>等級</th></tr></thead><tbody>';
    skills.forEach((s, i) => {
      if (s.random) {
        html += `<tr><td>${i+1}</td><td><span class="mps-tag-random">ランダム</span></td><td colspan="2"><span class="mps-placeholder">${s.name} (未抽選)</span></td></tr>`;
      } else if (s._convertedFrom) {
        html += `<tr><td>${i+1}</td><td><span class="mps-tag-random">変換済</span></td><td>${s.name} <span class="mps-from">[← ${s._convertedFrom}]</span></td><td class="mps-grade-${s._grade}">${s._grade}</td></tr>`;
      } else {
        html += `<tr><td>${i+1}</td><td>固定</td><td>${s.name}</td><td></td></tr>`;
      }
    });
    html += '</tbody></table>';
    $('convert-skills').innerHTML = html;
  }

  function fixedSkillNames(pet) {
    return (pet?.skills || []).filter(s => !s.random).map(s => s.name);
  }

  function onConvert() {
    if (!convertTarget) return;
    const totalSlots = countRandomSlots(convertTarget);
    if (totalSlots === 0) return;

    const prevResolved = randomResolved[convertTarget.id] || [];
    prevResolved.forEach(r => { if (r) delete skillLevels[r.skill_name]; });

    const exclude = new Set(fixedSkillNames(convertTarget));
    const results = [];
    for (let i = 0; i < totalSlots; i++) {
      const r = MinipetConvert.rollOnce(MinipetData.convertTable, [...exclude]);
      if (!r) { results.push(null); continue; }
      results.push(r);
      exclude.add(r.skill_name);
    }
    randomResolved[convertTarget.id] = results;

    let html = `<div>${convertTarget.name} のランダム枠 ${results.length} 個を抽選</div>`;
    html += '<ul class="mps-result-list">';
    results.forEach((r, i) => {
      if (!r) { html += `<li>枠${i+1}: (抽選プール枯渇)</li>`; return; }
      html += `<li>枠${i+1}: <span class="mps-grade-${r.grade}">${r.grade}</span> ${r.skill_name} (${r.probability.toFixed(2)}%)</li>`;
    });
    html += '</ul>';
    $('convert-result').innerHTML = html;
    log(`変換: ${convertTarget.name} ランダム枠 ${results.length} 個 = ` + results.map(r => r ? r.skill_name : '－').join(' / '));
    refreshConvertTarget();
    if (currentPet && currentPet.id === convertTarget.id) renderSkillList();
    updateSPDisplay();
  }

  function onConvertReset() {
    if (!convertTarget) return;
    (randomResolved[convertTarget.id] || []).forEach(r => { if (r) delete skillLevels[r.skill_name]; });
    randomResolved[convertTarget.id] = new Array(countRandomSlots(convertTarget)).fill(null);
    $('convert-result').innerHTML = '<span class="mps-placeholder">リセット済</span>';
    log(`変換リセット: ${convertTarget.name}`);
    refreshConvertTarget();
    if (currentPet && currentPet.id === convertTarget.id) renderSkillList();
    updateSPDisplay();
  }

  global.MinipetUI = { init };
})(typeof window !== 'undefined' ? window : globalThis);
