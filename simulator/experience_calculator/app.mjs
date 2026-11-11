import { calculate } from './calculation.mjs';
import { MIRROR_MAPS, CONSUMABLES, EXPERIENCE_BADGES } from './rules.mjs';

const numeric = (form, key) => {
  const field = form.elements.namedItem(key);
  const value = field.value.trim();
  if (!/^\d+(?:\.\d{1,6})?$/.test(value)) throw new Error(`${field.dataset.label || key}を数値で入力してください`);
  return Number(value);
};
const checked = (form, key) => form.elements.namedItem(key).checked;
export function readState(form) {
  const value = key => form.elements.namedItem(key).value;
  const n = key => numeric(form, key);
  const c = key => checked(form, key);
  const profile = value('profile');
  const x = { profile, playerLevel: n('playerLevel'), monsterLevel: n('monsterLevel'), kills: n('kills'), source: value('source') };
  const pt = value('partyLevels').trim();
  if (pt && !/^\d+(?:[\s,、]+\d+)*$/.test(pt)) throw new Error('PTメンバーLvをカンマで区切って入力してください');
  x.partyLevels = pt ? pt.split(/[\s,、]+/).map(Number) : [x.playerLevel];
  if (profile === 'post2000') {
    if (x.source !== 'postfield') return x;
    x.post = { wisdom: n('postWisdom'), nova: c('nova'), appleMangoBerry: c('appleMangoBerry'),
      starBerry: c('starBerry'), bell: c('bell'),
      devilHunt: c('devilHunt'), flagLevel: n('postFlagLevel'), crestCount: n('postCrestCount'),
      guildBuff: c('postGuildBuff'), aura: c('postAura'), treasureTier: n('postTreasureTier'), hotTime: n('hotTime') };
    return x;
  }
  if (x.source === 'collapsed') {
    if (!value('mapId')) throw new Error('マップを選択してください');
    x.mapId = n('mapId'); x.partyBoss = c('partyBoss');
  }
  else x.baseExp = n('baseExp');
  x.portal = value('portal'); x.eventMultiplier = n('eventMultiplier');
  const ring1 = n('ring1'), ring2 = n('ring2');
  const berryType = value('berryType');
  x.bonuses = { wisdom: n('wisdom'), creatureLevel: n('creatureLevel'), creatureAdvancedLevel: n('creatureAdvancedLevel'),
    creatureDropLevel: n('creatureDropLevel'), costume: c('costume'), costumeStage: n('costumeStage'), crestPercent: n('crestPercent'),
    potential5: c('potential5'), potential75: c('potential75'), experienceRings: [ring1, ring2].filter(Boolean),
    courageRing: c('courageRing'), rebirth: n('rebirth'), biologyLevel: n('biologyLevel'), flagLevel: n('flagLevel'),
    returner: c('returner'), aura: c('aura'), badge: c('badge'), carpetPercent: profile === 'normal' ? 0 : n('carpetPercent'),
    consumables: [value('consumable')].filter(Boolean), treasure: c('treasure'), auras: c('auras'), partyExperiencePercent: n('partyExperiencePercent'),
    berryType, berryPercent: berryType === 'apple-mango' ? 0 : n('berryPercent'),
    fieldBoost: value('fieldBoost'), guildMaster: c('guildMaster'), eventBadges: [value('eventBadge')].filter(Boolean),
    anniversarySunBerry: c('anniversarySunBerry'), lionBadge: c('lionBadge') };
  return x;
}
export function initApp(doc = document) {
  const form = doc.getElementById('experience-form');
  const error = doc.getElementById('error');
  const perKill = doc.getElementById('per-kill');
  const total = doc.getElementById('total');
  const base = doc.getElementById('base-result');
  const levelBase = doc.getElementById('level-base');
  const multiplier = doc.getElementById('multiplier');
  const totalLabel = doc.getElementById('total-label');
  const format = value => BigInt(value).toLocaleString('ja-JP');
  let selectedMap = MIRROR_MAPS[0].id;
  let page = 0;
  const field = key => form.elements.namedItem(key);
  for (const badge of EXPERIENCE_BADGES) {
    const option = doc.createElement('option');
    option.value = badge.id;
    option.textContent = `${badge.name}（+${badge.percent}%）`;
    field('eventBadge').append(option);
  }
  const sharedFields = ['playerLevel', 'monsterLevel', 'partyLevels', 'source'];
  const modeDefaults = { ordinary: ['1250', '1250', '', 'manual'], post: ['2000', '2000', '', 'postfield'] };
  const modeValues = {};
  const mode = () => field('profile').value === 'post2000' ? 'post' : 'ordinary';
  let activeMode = mode();
  function mapOptions() {
    const query = field('mapSearch').value.trim().toLowerCase();
    const hits = MIRROR_MAPS.filter(m => m.name.toLowerCase().includes(query) || String(m.id) === query);
    const pages = Math.max(1, Math.ceil(hits.length / 24));
    page = Math.min(page, pages - 1);
    const visible = hits.slice(page * 24, (page + 1) * 24);
    const select = field('mapId');
    select.replaceChildren();
    for (const map of visible) {
      const option = doc.createElement('option');
      option.value = String(map.id); option.textContent = map.name;
      option.selected = map.id === selectedMap; select.append(option);
    }
    const match = visible.find(m => m.id === selectedMap) ?? visible[0];
    select.value = match ? String(match.id) : '';
    select.disabled = !match;
    doc.getElementById('map-page').textContent = match ? `${page + 1} / ${pages}` : '該当するマップなし';
    doc.getElementById('map-prev').disabled = page === 0;
    doc.getElementById('map-next').disabled = page === pages - 1;
  }
  function visibility() {
    const post = field('profile').value === 'post2000';
    const profile = field('profile').value;
    for (const option of field('consumable').options) {
      const item = CONSUMABLES.find(row => row.id === option.value);
      option.hidden = Boolean(item && !item.profiles.includes(profile));
    }
    if (field('consumable').selectedOptions[0]?.hidden) field('consumable').value = '';
    const fieldBoost = field('fieldBoost');
    for (const option of fieldBoost.options) {
      option.hidden = option.value === 'bell' && profile === 'gold2026';
    }
    if (fieldBoost.selectedOptions[0]?.hidden) fieldBoost.value = '';
    doc.getElementById('ordinary-bonuses').hidden = post;
    doc.getElementById('sun-berry-field').hidden = field('berryType').value === 'apple-mango';
    doc.getElementById('carpet-field').hidden = profile === 'normal';
    doc.getElementById('auras-field').hidden = !['gold2025', 'gold2026'].includes(profile);
    for (const option of field('source').options) {
      option.hidden = post ? option.value === 'collapsed' : !['manual','collapsed'].includes(option.value);
      if (option.value === 'manual') option.textContent = post ? '通常狩場' : '基礎経験値を入力';
    }
    if (field('source').selectedOptions[0]?.hidden) field('source').value = post ? 'postfield' : 'manual';
    doc.getElementById('post-bonuses').hidden = !post || field('source').value !== 'postfield';
    const mirror = field('source').value === 'collapsed';
    doc.getElementById('mirror-fields').hidden = !mirror;
    doc.getElementById('base-field').hidden = post || mirror;
  }
  function update() {
    error.textContent = '';
    try {
      const state = readState(form);
      const result = calculate(state);
      totalLabel.textContent = state.post?.devilHunt ? '有効中の合計経験値' : '合計経験値';
      perKill.textContent = format(result.perKill);
      total.textContent = format(result.total);
      base.textContent = format(result.base);
      levelBase.textContent = format(result.partyBase);
      multiplier.textContent = (Number(result.multiplier.numerator) / Number(result.multiplier.denominator)).toLocaleString('ja-JP', { maximumFractionDigits: 6 }) + '倍';
    } catch (e) {
      perKill.textContent = total.textContent = base.textContent = levelBase.textContent = multiplier.textContent = '—';
      totalLabel.textContent = '合計経験値';
      error.textContent = e.message;
    }
  }
  field('profile').addEventListener('change', () => {
    const nextMode = mode();
    if (nextMode !== activeMode) {
      modeValues[activeMode] = sharedFields.map(key => field(key).value);
      const nextValues = modeValues[nextMode] ?? modeDefaults[nextMode];
      sharedFields.forEach((key, index) => { field(key).value = nextValues[index]; });
      activeMode = nextMode;
    }
    visibility(); update();
  });
  field('source').addEventListener('change', () => { visibility(); update(); });
  field('berryType').addEventListener('change', () => { visibility(); update(); });
  field('mapSearch').addEventListener('input', () => { page = 0; mapOptions(); update(); });
  field('mapId').addEventListener('change', () => { selectedMap = Number(field('mapId').value); update(); });
  for (const [id, delta] of [['map-prev',-1],['map-next',1]]) doc.getElementById(id).addEventListener('click', () => { page += delta; mapOptions(); update(); });
  form.addEventListener('input', ({ target }) => {
    if (target.tagName !== 'SELECT' && target.type !== 'checkbox' && target.name !== 'mapSearch') update();
  });
  form.addEventListener('change', ({ target }) => {
    if (target.type === 'checkbox' || (target.tagName === 'SELECT' && !['profile', 'source', 'mapId', 'berryType'].includes(target.name))) update();
  });
  form.addEventListener('submit', event => { event.preventDefault(); update(); });
  // The native reset applies the default values after the reset event returns.
  form.addEventListener('reset', () => setTimeout(() => {
    page = 0;
    selectedMap = MIRROR_MAPS[0].id;
    delete modeValues.ordinary;
    delete modeValues.post;
    activeMode = mode();
    mapOptions(); visibility(); update();
  }, 0));
  mapOptions(); visibility(); update();
  return { update, mapOptions };
}
if (typeof document !== 'undefined') initApp();
