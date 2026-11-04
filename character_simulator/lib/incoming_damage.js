export const INCOMING_ELEMENTS = ['Fire', 'Water', 'Wind', 'Earth', 'Light', 'Dark'];

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const percent = (value) => Math.max(0, Math.min(100, finite(value)));

export function calculateIncomingMagicDamage(input) {
  const rawMin = finite(input.rawMin, NaN);
  const rawMax = finite(input.rawMax, NaN);
  if (!Number.isFinite(rawMin) || !Number.isFinite(rawMax) || rawMin < 0 || rawMax < rawMin) {
    throw new RangeError('素ダメージは 0 以上で、最大値を最小値以上にしてください。');
  }
  const resist = finite(input.resist) - Math.max(0, finite(input.weaken));
  const absorb = Math.max(0, finite(input.elementAbsorb) + finite(input.magicAbsorb));
  const reduction = percent(input.reduction);
  const miss = absorb >= 100;
  const resistFactor = Math.max(0, 1 - resist / 100);
  const one = (raw) => {
    const afterResistance = miss ? raw : raw * resistFactor;
    const healing = afterResistance * absorb / 100;
    const damage = miss ? 0 : afterResistance * (1 - absorb / 100) * (1 - reduction / 100);
    return { afterResistance, damage, healing, hpLoss: damage - healing };
  };
  return { min: one(rawMin), max: one(rawMax), resist, absorb, reduction, miss };
}

export function incomingDefenseFromStats(stats, wisdomBonus, resistCap) {
  return {
    elements: Object.fromEntries(INCOMING_ELEMENTS.map((element) => [element, {
      resist: Math.min(resistCap, Math.floor(finite(stats['attr' + element + 'Resist']) + wisdomBonus)),
      elementAbsorb: Math.floor(Math.max(0, finite(stats['attr' + element + 'Absorb']) - finite(stats['attr' + element + 'AbsorbShared']))),
    }])),
    magicAbsorb: finite(stats.attrMagicAbsorb),
    reduction: finite(stats.damageReducePercent),
  };
}

const DEFAULT_STATE = Object.freeze({
  auto: true, element: 'Fire', rawMin: 2000, rawMax: 2000, weaken: 0,
  resist: 0, elementAbsorb: 0, magicAbsorb: 0, reduction: 0,
});
const NUMERIC_FIELDS = ['rawMin', 'rawMax', 'weaken', 'resist', 'elementAbsorb', 'magicAbsorb', 'reduction'];
const DEFENSE_FIELDS = ['resist', 'elementAbsorb', 'magicAbsorb', 'reduction'];

export function createIncomingDamageCalculator({ document, onChange, firstAid }) {
  const node = (key) => document.getElementById('incoming-' + key);
  let defense = null;
  let initialized = false;

  function getState() {
    return {
      auto: node('auto').checked,
      element: node('element').value,
      ...Object.fromEntries(NUMERIC_FIELDS.map((key) => [key, finite(node(key).value, DEFAULT_STATE[key])])),
      ...(firstAid ? { firstAid: firstAid.getState() } : {}),
    };
  }

  function syncInputs() {
    const auto = node('auto').checked;
    if (auto && defense) {
      const values = { ...defense.elements[node('element').value], magicAbsorb: defense.magicAbsorb, reduction: defense.reduction };
      for (const key of DEFENSE_FIELDS) node(key).value = String(values[key]);
    }
    for (const key of DEFENSE_FIELDS) {
      node(key).readOnly = auto;
      node(key).classList.toggle('is-auto', auto);
    }
  }

  function render() {
    syncInputs();
    const input = getState();
    
    const invalid = NUMERIC_FIELDS.some((key) => node(key).value.trim() === '' || !Number.isFinite(Number(node(key).value)));
    const error = invalid ? '計算条件に数値を入力してください。'
      : input.rawMin < 0 || input.rawMax < input.rawMin ? '素ダメージは 0 以上で、最大値を最小値以上にしてください。'
      : input.weaken < 0 || input.elementAbsorb < 0 || input.magicAbsorb < 0 || input.reduction < 0 || input.reduction > 100
        ? '弱化・吸収は 0 以上、被ダメージ減少は 0〜100% にしてください。' : '';
    node('error').textContent = error;
    const format = (value) => value.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
    if (error) {
      firstAid?.setDamage(null);
      for (const key of ['damage', 'healing', 'hpLoss', 'basis']) node(key).textContent = '—';
      return;
    }
    const result = calculateIncomingMagicDamage(input);
    firstAid?.setDamage(result);
    const range = (key) => {
      const values = [result.min[key], result.max[key]].sort((a, b) => a - b);
      return values[0] === values[1] ? format(values[0]) : format(values[0]) + ' 〜 ' + format(values[1]);
    };
    node('damage').textContent = result.miss ? '0（MISS!!）' : range('damage');
    node('healing').textContent = range('healing');
    node('hpLoss').textContent = range('hpLoss');
    node('basis').textContent = range('afterResistance');
  }

  function setState(raw) {
    const state = raw && typeof raw === 'object' ? raw : {};
    node('auto').checked = typeof state.auto === 'boolean' ? state.auto : DEFAULT_STATE.auto;
    node('element').value = INCOMING_ELEMENTS.includes(state.element) ? state.element : DEFAULT_STATE.element;
    for (const key of NUMERIC_FIELDS) node(key).value = String(finite(state[key] ?? DEFAULT_STATE[key], DEFAULT_STATE[key]));
    firstAid?.setState(state.firstAid);
    render();
  }

  function init() {
    if (initialized) return;
    initialized = true;
    firstAid?.init();
    for (const key of ['auto', 'element', ...NUMERIC_FIELDS]) {
      node(key).addEventListener(key === 'auto' || key === 'element' ? 'change' : 'input', () => {
        render();
        onChange();
      });
    }
    node('reset').addEventListener('click', () => { setState(null); onChange(); });
    render();
  }

  return {
    init, getState, setState, reset: () => setState(null),
    syncFromCharacter(stats, wisdomBonus, resistCap) {
      defense = incomingDefenseFromStats(stats, wisdomBonus, resistCap);
      render();
    },
  };
}
