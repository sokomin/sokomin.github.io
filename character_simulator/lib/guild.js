const POSITIONS = [
  { id: 'master', label: 'ギルドマスター', rank: 3, statFactor: 18, hpFactor: 100, cpFactor: 80, rateFactor: 2.0, skillDivisor: 1 },
  { id: 'sub', label: '副ギルドマスター', rank: 2, statFactor: 15, hpFactor: 80, cpFactor: 60, rateFactor: 1.5, skillDivisor: 2 },
  { id: 'regular', label: '一般・元老', rank: 1, statFactor: 12, hpFactor: 60, cpFactor: 40, rateFactor: 1.0, skillDivisor: 3 },
  { id: 'new', label: '新入', rank: 0, statFactor: 10, hpFactor: 50, cpFactor: 30, rateFactor: 0.5, skillDivisor: 5 },
];

const STAT_SKILLS = [
  ['str', '力強化', '力'], ['agi', '敏捷強化', '敏捷'], ['con', '健康増加', '健康'],
  ['int', '知識増加', '知識'], ['wiz', '知恵増加', '知恵'], ['chs', 'カリスマ増加', 'カリスマ'], ['luc', '運増加', '運'],
].map(([stat, name, label]) => ({ key: `stat-${stat}`, name, max: 3, effect: `${label} +[Lv × 職位補正]`, kind: 'ranked', stat }));

const JOB_PREREQUISITES = {
  0: ['attack-training', 'stat-str'], 1: ['bodybuilding', 'stat-str'], 4: ['mental', 'stat-int'], 5: ['warrior-eye', 'stat-con'],
  6: ['bodybuilding', 'stat-wiz'], 7: ['mental', 'stat-chs'], 10: ['attack-training', 'stat-luc'], 11: ['attack-training', 'stat-luc'],
  2: ['attack-training', 'stat-agi'], 3: ['warrior-eye', 'stat-agi'], 9: ['mental', 'stat-wiz'], 8: ['warrior-eye', 'stat-con'],
  12: ['attack-training', 'stat-chs'], 13: ['mental', 'stat-luc'], 14: ['warrior-eye', 'stat-int'], 15: ['bodybuilding', 'stat-luc'],
  16: ['mental', 'stat-chs'], 17: ['mental', 'stat-con'], 18: ['stat-str', 'stat-int'], 19: ['stat-str', 'stat-luc'],
  24: ['stat-str', 'stat-int'], 20: ['stat-chs', 'stat-int'], 21: ['attack-training', 'warrior-eye'], 22: ['mental', 'stat-int'],
  23: ['stat-luc', 'stat-con'], 25: ['mental', 'bodybuilding'],
};

const JOB_SKILLS = [
  ['騎士道', 0], ['戦術', 1], ['ウィザードリィ', 4], ['ライカントロフィー', 5], ['狂神', 6], ['天使階級学', 7],
  ['七つ道具', 10], ['気功術', 11], ['偵察術', 2], ['傭兵術', 3], ['精神学', 9], ['調練学', 8],
  ['宮廷礼法', 12], ['天文学', 13], ['降神術', 14], ['悪魔学', 15], ['心霊術', 16], ['闘魂学', 17],
  ['分光学', 18], ['掃除技術', 19], ['双剣術', 24], ['闇魔法学', 20], ['射撃術', 21], ['ポーション調合術', 22],
  ['航海術', 23], ['砲撃術', 25],
].map(([name, jobId]) => ({ key: `job-${jobId}`, name, max: 3, effect: '対象職業のスキルLv +[Lv ÷ 職位係数]', kind: 'job', jobId, requires: JOB_PREREQUISITES[jobId] }));

const GUILD_SKILLS = [
  { key: 'advertising', name: '広告学', max: 19, effect: '最大ギルドメンバー数 +[Lv × 10]', kind: 'display' },
  { key: 'management', name: '経営学', max: 9, effect: '最大副ギルドマスター数 +Lv', kind: 'display' },
  { key: 'politics', name: '政治学', max: 6, effect: '最大ギルド委員数 +[Lv × 5]', kind: 'display' },
  { key: 'real-estate', name: '不動産', max: 6, effect: '古都以外の縁故地数 +Lv', kind: 'display' },
  { key: 'warehouse', name: '倉庫業', max: 10, effect: 'ギルド倉庫 +[Lv × 20]', kind: 'display' },
  { key: 'bodybuilding', name: 'ボディービルディング', max: 5, effect: 'HP +[Lv × 職位補正]', kind: 'hp' },
  { key: 'mental', name: '精神修養', max: 5, effect: 'CP +[Lv × 職位補正]', kind: 'cp' },
  { key: 'attack-training', name: '攻撃基礎修練', max: 5, effect: '命中率 +[Lv × 職位補正]%', kind: 'rate', stat: 'hit' },
  { key: 'warrior-eye', name: '戦士の目修練', max: 5, effect: '回避率 +[Lv × 職位補正]%', kind: 'rate', stat: 'eva' },
  ...[0, 1, 2, 3, 4, 5].map((rebirth) => ({
    key: `biology-${rebirth}`, name: rebirth === 0 ? '生体学 - 序文' : `生体学 - ${rebirth}章`, max: 5,
    effect: `転生${rebirth}回時の獲得経験値 +[Lv × ${5 + rebirth}]%`, kind: 'biology', rebirth,
  })),
  ...STAT_SKILLS,
  { key: 'meditation', name: '瞑想術', max: 5, effect: 'フィールドの能力値低下を +[0.5 + Lv × 0.5]%回復', kind: 'field-stat' },
  { key: 'thought', name: '思想教育', max: 5, effect: 'フィールドの最大属性抵抗低下を +[0.5 + Lv × 0.5]%回復', kind: 'field-attr' },
  ...JOB_SKILLS,
];

const STATUES = [
  { id: 'nar', name: 'ナルの神像', parts: [
    ['頭部', '火ダメージ吸収 +Lv%', 'attrFireAbsorb', 'linear', 1],
    ['胴体', '火属性抵抗 +Lv%', 'attrFireResist', 'linear', 1],
    ['翼', '防御力 +Lv%', 'defPercent', 'linear', 1],
    ['尻尾', 'ギルドペット・オビティアン数増加', null],
    ['台座', '決定打抵抗 +[Lv × 2]%', 'criticalResist', 'linear', 2],
  ] },
  { id: 'nene', name: 'ネーンの杯', parts: [
    ['蓋', '水ダメージ吸収 +Lv%', 'attrWaterAbsorb', 'linear', 1],
    ['器', '水属性抵抗 +Lv%', 'attrWaterResist', 'linear', 1],
    ['受け皿', '攻撃速度 +[Lv × 2]%', 'atkspd', 'linear', 2],
    ['取っ手', 'ギルドペット・クリスタルウォーター数増加', null],
    ['盆', '呪い抵抗 +[Lv × 2]%', 'curseResist', 'linear', 2],
  ] },
  { id: 'sur', name: 'スルの杖', parts: [
    ['グリップ', '風ダメージ吸収 +Lv%', 'attrWindAbsorb', 'linear', 1],
    ['シャフト', '風属性抵抗 +Lv%', 'attrWindResist', 'linear', 1],
    ['杖先', '移動速度 +[Lv × 4]%', 'mvspd', 'linear', 4],
    ['ストラップ', 'ギルドペット・アストロボウ数増加', null],
    ['ヘッド飾り', '状態異常抵抗 +[Lv × 2]%', 'statusResist', 'linear', 2],
  ] },
  { id: 'kemen', name: 'ケーメンの冠', parts: [
    ['中央の宝石', '大地ダメージ吸収 +Lv%', 'attrEarthAbsorb', 'linear', 1],
    ['本体', '大地属性抵抗 +Lv%', 'attrEarthResist', 'linear', 1],
    ['枠飾り', '物理・魔法ダメージ増加 +Lv%', ['physDamagePercent', 'attrMagic'], 'linear', 1],
    ['冠の装飾', 'ギルドペット・ダッシュブレード数増加', null],
    ['冠の台', '能力値低下抵抗 +[Lv × 2]%', 'statDownResist', 'linear', 2],
  ] },
  { id: 'lark', name: 'ラークの刀', parts: [
    ['柄頭', '光ダメージ吸収 +Lv%', 'attrLightAbsorb', 'linear', 1],
    ['刀身', '光属性抵抗 +Lv%', 'attrLightResist', 'linear', 1],
    ['柄', '命中率 +[0 / 0 / 1 / 1 / 2]%', 'hit', 'table', [0, 0, 1, 1, 2]],
    ['刀紐', 'ギルドガーディアン数増加', null],
    ['鞘', 'フィールド魔法抵抗力ペナルティー減少', 'attrMagicResist', 'linear', 5],
  ] },
  { id: 'siroio', name: 'シロイオのホール', parts: [
    ['先端', '闇ダメージ吸収 +Lv%', 'attrDarkAbsorb', 'linear', 1],
    ['本体', '闇属性抵抗 +Lv%', 'attrDarkResist', 'linear', 1],
    ['先端の宝石', '回避率 +[0 / 1 / 2 / 3 / 4]%', 'eva', 'table', [0, 1, 2, 3, 4]],
    ['後端', 'ギルドホール販売アイテム価格割引', null],
    ['紐', '死亡ペナルティー減少', null],
  ] },
];

const FLAG_EFFECTS = [
  { group: '支援バフ', key: 'experience', name: '獲得経験値', values: [5, 10, 15, 20, 25], unit: '%', stat: 'expBonus' },
  { group: '支援バフ', key: 'item-drop', name: 'アイテムドロップ率', values: [5, 10, 15, 20, 25], unit: '%', stat: 'mfDrop' },
  { group: '支援バフ', key: 'unique-drop', name: 'ユニークアイテムドロップ率', values: [20, 40, 60, 80, 100], unit: '%', stat: 'uniDrop' },
  { group: '支援バフ', key: 'dx-unique-drop', name: 'DXユニークアイテムドロップ率', values: [10, 20, 30, 40, 50], unit: '%', stat: 'guildFlagDxUniqueDrop' },
  { group: '支援バフ', key: 'move-speed', name: '移動速度', values: [95, 110, 125, 140, 155], unit: '%', stat: 'mvspd' },
  { group: '攻撃バフ', key: 'physical-damage', name: '物理ダメージ', values: [30, 35, 40, 45, 50], unit: '%', stat: 'physDamagePercent' },
  { group: '攻撃バフ', key: 'magic-damage', name: '魔法ダメージ', values: [25, 29, 33, 37, 41], unit: '%', stat: 'attrMagic' },
  { group: '攻撃バフ', key: 'attack-speed', name: '攻撃速度', values: [35, 40, 45, 50, 55], unit: '%', stat: 'atkspd' },
  { group: '攻撃バフ', key: 'all-attr-weaken', name: 'ターゲットの全属性抵抗弱化', values: [20, 23, 26, 29, 32], unit: '%', stat: 'guildFlagAttrWeaken' },
  { group: '攻撃バフ', key: 'extra-fire-damage', name: '追加火属性ダメージ', values: [700, 800, 900, 1000, 1100], unit: '', stat: 'guildFlagExtraFireDamage' },
  { group: '防御バフ', key: 'defense', name: '防御力', values: [240, 280, 320, 360, 400], unit: '%', stat: 'defPercent' },
  { group: '防御バフ', key: 'hp-recovery', name: 'HP自動回復速度（毎秒）', values: [21, 25, 29, 33, 37], unit: '', stat: 'hpRegen' },
  { group: '防御バフ', key: 'evasion', name: '回避率', values: [13, 15, 17, 19, 21], unit: '%', stat: 'eva' },
  { group: '防御バフ', key: 'max-hp', name: '最大HP', values: [120, 140, 160, 180, 200], unit: '%', stat: 'hpPercent' },
  { group: '防御バフ', key: 'magic-resist', name: '魔法抵抗', values: [5, 10, 15, 20, 25], unit: '%', stat: 'attrMagicResist' },
  { group: 'アイテム供給', key: 'item-supply', name: 'アイテム供給（クールタイム3秒）', values: [1, 2, 3], unit: '段階', stat: null },
];

function add(STTemp, stat, amount) {
  if (!stat || !amount) return;
  STTemp.sum[stat] = (Number(STTemp.sum[stat]) || 0) + amount;
}

function emptyState() {
  return { guildLv: 200, heavenlyBonus: 0, position: 'new', skills: {}, statues: {}, flag: {} };
}

function positionFor(id) {
  return POSITIONS.find((position) => position.id === id) || POSITIONS[3];
}

function guildPointCap(state) {
  return Math.max(1, Math.min(200, Number(state.guildLv) || 1)) + Math.max(0, Math.min(40, Number(state.heavenlyBonus) || 0));
}

function skillByKey(key) {
  return GUILD_SKILLS.find((skill) => skill.key === key) || null;
}

function prerequisitesMet(state, skill) {
  return !skill.requires || skill.requires.every((key) => (Number(state.skills[key]) || 0) >= 1);
}

function usedPoints(state) {
  return GUILD_SKILLS.reduce((total, skill) => total + (Number(state.skills[skill.key]) || 0), 0);
}

function maxSkillPoints() {
  return GUILD_SKILLS.reduce((total, skill) => total + skill.max, 0);
}

function normalizeState(raw) {
  const next = emptyState();
  if (!raw || typeof raw !== 'object') return next;
  next.guildLv = Math.max(1, Math.min(200, Math.floor(Number(raw.guildLv) || 200)));
  next.heavenlyBonus = Math.max(0, Math.min(40, Math.floor(Number(raw.heavenlyBonus) || 0)));
  next.position = POSITIONS.some((position) => position.id === raw.position) ? raw.position : 'new';
  if (raw.skills && typeof raw.skills === 'object') {
    for (const skill of GUILD_SKILLS) {
      const level = Math.max(0, Math.min(skill.max, Math.floor(Number(raw.skills[skill.key]) || 0)));
      if (level) next.skills[skill.key] = level;
    }
  }
  if (raw.statues && typeof raw.statues === 'object') {
    for (const statue of STATUES) {
      const saved = raw.statues[statue.id];
      if (!saved || typeof saved !== 'object') continue;
      const parts = {};
      statue.parts.forEach((_, index) => {
        const level = Math.max(0, Math.min(5, Math.floor(Number(saved[index]) || 0)));
        if (level) parts[index] = level;
      });
      if (Object.keys(parts).length) next.statues[statue.id] = parts;
    }
  }
  if (raw.flag && typeof raw.flag === 'object') {
    for (const effect of FLAG_EFFECTS) {
      const level = Math.max(0, Math.min(effect.values.length, Math.floor(Number(raw.flag[effect.key]) || 0)));
      if (level) next.flag[effect.key] = level;
    }
  }
  return next;
}

function pruneSkills(state) {
  let removedForRequirement = true;
  while (removedForRequirement) {
    removedForRequirement = false;
    for (const skill of GUILD_SKILLS) {
      if ((Number(state.skills[skill.key]) || 0) > 0 && !prerequisitesMet(state, skill)) {
        delete state.skills[skill.key];
        removedForRequirement = true;
      }
    }
  }
  const cap = guildPointCap(state);
  let excess = usedPoints(state) - cap;
  if (excess <= 0) return;
  for (const skill of [...GUILD_SKILLS].reverse()) {
    if (excess <= 0) break;
    const current = Number(state.skills[skill.key]) || 0;
    if (!current) continue;
    const removed = Math.min(current, excess);
    const level = current - removed;
    if (level) state.skills[skill.key] = level;
    else delete state.skills[skill.key];
    excess -= removed;
  }
}

function statueLevel(state, statueId, partIndex) {
  return Number(state.statues[statueId]?.[partIndex]) || 0;
}

function statueActive(state, statue) {
  return statue.parts.filter((_, index) => statueLevel(state, statue.id, index) > 0).length >= 3;
}

function flagLevel(state, effect) {
  return Number(state.flag[effect.key]) || 0;
}

export function createGuildSystem({ onChange } = {}) {
  let state = emptyState();
  let initialized = false;
  let renderTimer = null;

  function emitChange() {
    if (typeof onChange === 'function') onChange();
  }

  function queueRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      renderTimer = null;
      render();
    }, 0);
  }

  function renderSkill(skill, pointsLeft) {
    const level = Number(state.skills[skill.key]) || 0;
    const canAdd = level < skill.max && pointsLeft > 0 && prerequisitesMet(state, skill);
    const requirement = skill.requires
      ? `<div class="guild-requirement">必要: ${skill.requires.map((key) => skillByKey(key)?.name || key).join(' Lv1 / ')} Lv1</div>`
      : '';
    return `<tr><td><strong>${skill.name}</strong><div class="guild-effect">${skill.effect}</div>${requirement}</td>` +
      `<td class="guild-level-control"><button type="button" data-guild-skill="${skill.key}" data-guild-delta="-1" ${level <= 0 ? 'disabled' : ''}>−</button>` +
      `<span>Lv ${level} / ${skill.max}</span><button type="button" data-guild-skill="${skill.key}" data-guild-delta="1" ${canAdd ? '' : 'disabled'}>＋</button></td></tr>`;
  }

  function bindControls(root) {
    const updateGuildLevel = (event) => {
      state.guildLv = Math.max(1, Math.min(200, Math.floor(Number(event.target.value) || 1)));
      pruneSkills(state);
    };
    const updateHeavenlyBonus = (event) => {
      state.heavenlyBonus = Math.max(0, Math.min(40, Math.floor(Number(event.target.value) || 0)));
      pruneSkills(state);
    };
    root.querySelector('#guild-level').addEventListener('input', updateGuildLevel);
    root.querySelector('#guild-level').addEventListener('change', (event) => {
      updateGuildLevel(event);
      queueRender();
      emitChange();
    });
    root.querySelector('#guild-heavenly-bonus').addEventListener('input', updateHeavenlyBonus);
    root.querySelector('#guild-heavenly-bonus').addEventListener('change', (event) => {
      updateHeavenlyBonus(event);
      queueRender();
      emitChange();
    });
    root.querySelector('#guild-position').addEventListener('change', (event) => {
      state.position = positionFor(event.target.value).id;
      queueRender();
      emitChange();
    });
    root.querySelectorAll('[data-guild-skill]').forEach((button) => button.addEventListener('click', () => {
      const skill = skillByKey(button.dataset.guildSkill);
      const delta = Number(button.dataset.guildDelta) || 0;
      if (!skill || !delta) return;
      const current = Number(state.skills[skill.key]) || 0;
      const next = Math.max(0, Math.min(skill.max, current + delta));
      if (delta > 0 && (usedPoints(state) >= guildPointCap(state) || !prerequisitesMet(state, skill))) return;
      if (next) state.skills[skill.key] = next;
      else delete state.skills[skill.key];
      pruneSkills(state);
      render();
      emitChange();
    }));
    root.querySelector('#guild-max-skills').addEventListener('click', () => {
      const total = maxSkillPoints();
      const requiredHeavenlyBonus = Math.max(0, total - state.guildLv);
      if (requiredHeavenlyBonus > 40) return;
      state.skills = Object.fromEntries(GUILD_SKILLS.map((skill) => [skill.key, skill.max]));
      state.heavenlyBonus = Math.max(state.heavenlyBonus, requiredHeavenlyBonus);
      render();
      emitChange();
    });
    root.querySelectorAll('[data-statue-id]').forEach((select) => select.addEventListener('change', () => {
      const statueId = select.dataset.statueId;
      const partIndex = Number(select.dataset.statuePart);
      const level = Math.max(0, Math.min(5, Math.floor(Number(select.value) || 0)));
      if (!state.statues[statueId]) state.statues[statueId] = {};
      if (level) state.statues[statueId][partIndex] = level;
      else delete state.statues[statueId][partIndex];
      if (Object.keys(state.statues[statueId]).length === 0) delete state.statues[statueId];
      queueRender();
      emitChange();
    }));
    root.querySelectorAll('[data-guild-flag]').forEach((select) => select.addEventListener('change', () => {
      const effect = FLAG_EFFECTS.find((entry) => entry.key === select.dataset.guildFlag);
      if (!effect) return;
      const level = Math.max(0, Math.min(effect.values.length, Math.floor(Number(select.value) || 0)));
      if (level) state.flag[effect.key] = level;
      else delete state.flag[effect.key];
      queueRender();
      emitChange();
    }));
    root.querySelector('#guild-reset').addEventListener('click', () => {
      state = emptyState();
      render();
      emitChange();
    });
  }

  function render() {
    const root = document.getElementById('guild-tab');
    if (!root) return;
    const cap = guildPointCap(state);
    const used = usedPoints(state);
    const pointsLeft = Math.max(0, cap - used);
    const maxSkillRequired = maxSkillPoints();
    const canMaxAllSkills = maxSkillRequired <= state.guildLv + 40;
    const positionOptions = POSITIONS.map((position) => `<option value="${position.id}" ${state.position === position.id ? 'selected' : ''}>${position.label}</option>`).join('');
    const skillRows = GUILD_SKILLS.map((skill) => renderSkill(skill, pointsLeft)).join('');
    const statueCards = STATUES.map((statue) => {
      const active = statueActive(state, statue);
      const rows = statue.parts.map((part, index) => {
        const level = statueLevel(state, statue.id, index);
        const levels = [0, 1, 2, 3, 4, 5].map((value) => `<option value="${value}" ${level === value ? 'selected' : ''}>${value === 0 ? '未完成' : `Lv ${value}`}</option>`).join('');
        return `<tr><td>${part[0]}</td><td>${part[1]}</td><td><select data-statue-id="${statue.id}" data-statue-part="${index}">${levels}</select></td></tr>`;
      }).join('');
      return `<section class="guild-statue-card"><h4>${statue.name}<span class="guild-statue-status ${active ? 'is-active' : ''}">${active ? '有効' : '3部位で有効'}</span></h4><table class="guild-table"><thead><tr><th>部位</th><th>効果</th><th>完成Lv</th></tr></thead><tbody>${rows}</tbody></table></section>`;
    }).join('');
    const flagPanels = [...new Set(FLAG_EFFECTS.map((effect) => effect.group))].map((group) => {
      const rows = FLAG_EFFECTS.filter((effect) => effect.group === group).map((effect) => {
        const level = flagLevel(state, effect);
        const levels = [0, ...effect.values.map((_, index) => index + 1)].map((value) => `<option value="${value}" ${level === value ? 'selected' : ''}>${value === 0 ? '未使用' : `Lv ${value}`}</option>`).join('');
        const amount = level ? `+${effect.values[level - 1]}${effect.unit}` : '—';
        return `<tr><td>${effect.name}</td><td class="guild-flag-value">${amount}</td><td><select data-guild-flag="${effect.key}">${levels}</select></td></tr>`;
      }).join('');
      return `<section class="guild-flag-group"><h5>${group}</h5><table class="guild-table"><thead><tr><th>効果</th><th>反映値</th><th>旗Lv</th></tr></thead><tbody>${rows}</tbody></table></section>`;
    }).join('');
    root.innerHTML = `<div class="guild-tab-layout"><section class="guild-panel guild-control-panel"><div class="guild-heading"><h4>ギルドスキル</h4><div class="guild-actions"><button type="button" id="guild-max-skills" class="guild-max-skills" title="全スキルを最大にし、必要な天上ボーナスも自動設定します"${canMaxAllSkills ? '' : ' disabled'}>スキル全振り</button><button type="button" id="guild-reset" class="guild-reset">リセット</button></div></div><div class="guild-controls"><label>ギルドLv <input id="guild-level" type="number" min="1" max="200" value="${state.guildLv}"></label><label>天上ボーナス <input id="guild-heavenly-bonus" type="number" min="0" max="40" value="${state.heavenlyBonus}"></label><label>職位 <select id="guild-position">${positionOptions}</select></label></div><div class="guild-points">GSP <strong>${pointsLeft}</strong> / ${cap}（使用 ${used}）</div><p class="guild-note">職位により、基本能力・HP/CP・命中/回避・対象職業のスキルLv補正が変化します。職業別スキルは表示されたLv1条件を満たすと割り振れます。</p><div class="guild-skill-scroll"><table class="guild-table"><thead><tr><th>スキル</th><th>割り振り</th></tr></thead><tbody>${skillRows}</tbody></table></div></section><div class="guild-side-stack"><section class="guild-panel guild-flag-panel"><h4>ギルド旗</h4><p class="guild-note">旗Lvごとに効果を反映します。全属性抵抗弱化は通常の属性弱化120%上限とは別枠で加算されます。</p>${flagPanels}</section><section class="guild-panel"><h4>ギルド石像</h4><p class="guild-note">各石像は完成部位が3つ以上になると、その石像の完成部位すべての効果を反映します。</p><div class="guild-statue-grid">${statueCards}</div></section></div></div>`;
    bindControls(root);
  }

  function init() {
    if (initialized) return;
    initialized = true;
    render();
  }

  function applyToSTTemp(STTemp, character) {
    if (!STTemp || !STTemp.sum) return;
    const position = positionFor(state.position);
    for (const skill of GUILD_SKILLS) {
      const level = Number(state.skills[skill.key]) || 0;
      if (!level) continue;
      if (skill.kind === 'ranked') add(STTemp, skill.stat, level * position.statFactor);
      if (skill.kind === 'hp') add(STTemp, 'hp', level * position.hpFactor);
      if (skill.kind === 'cp') add(STTemp, 'cp', level * position.cpFactor);
      if (skill.kind === 'rate') add(STTemp, skill.stat, level * position.rateFactor);
      if (skill.kind === 'biology' && Number(character?.rebirth) === skill.rebirth) add(STTemp, 'expBonus', level * (5 + skill.rebirth));
      if (skill.kind === 'field-stat') add(STTemp, 'fieldStatDownResist', 0.5 + level * 0.5);
      if (skill.kind === 'field-attr') add(STTemp, 'fieldAttrCapResist', 0.5 + level * 0.5);
      if (skill.kind === 'job' && Number(character?.job) === skill.jobId) add(STTemp, 'skillLv', Math.floor(level / position.skillDivisor));
    }
    for (const statue of STATUES) {
      if (!statueActive(state, statue)) continue;
      statue.parts.forEach((part, index) => {
        const level = statueLevel(state, statue.id, index);
        if (!level || !part[2]) return;
        const amount = part[3] === 'table' ? part[4][level - 1] : level * part[4];
        for (const stat of (Array.isArray(part[2]) ? part[2] : [part[2]])) add(STTemp, stat, amount);
      });
    }
    for (const effect of FLAG_EFFECTS) {
      const level = flagLevel(state, effect);
      if (!level || !effect.stat) continue;
      add(STTemp, effect.stat, effect.values[level - 1]);
    }
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  function setState(raw) {
    state = normalizeState(raw);
    pruneSkills(state);
    if (initialized) render();
  }

  function reset() {
    state = emptyState();
    if (initialized) render();
  }

  return { init, applyToSTTemp, getState, setState, reset, render };
}
