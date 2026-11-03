export const FIRST_AID_CHANCE = 10;
export const FIRST_AID_CAP = 200;


export function calculateFirstAid({ damage, amount, maxHp, hp, aidHp = 0 }) {
  const values = [damage, amount, maxHp, hp, aidHp];
  if (values.some((value) => !Number.isFinite(value)) || damage < 0 || amount < 0
      || maxHp <= 0 || hp < 0 || aidHp < 0 || hp + aidHp > maxHp) {
    throw new RangeError('HPは0以上、最大HPは正の値とし、通常HP＋応急処置HPを最大HP以下にしてください。');
  }
  const effectiveAmount = Math.min(FIRST_AID_CAP, amount);
  const consumedAid = Math.min(aidHp, damage);
  const remainingAid = aidHp - consumedAid;
  const remainingHp = Math.max(0, hp - (damage - consumedAid));
  const total = remainingHp + remainingAid;
  const potential = damage * effectiveAmount / 100;
  
  const lethal = damage > 0 && total === 0;
  const added = lethal ? null : Math.min(potential, maxHp - total);
  return {
    effectiveAmount, potential, chance: damage > 0 && amount > 0 ? FIRST_AID_CHANCE : 0,
    hp: remainingHp, aidHp: remainingAid, total, consumedAid,
    noDamage: aidHp > 0 && remainingAid === 0, lethal,
    added, triggeredAidHp: added == null ? null : remainingAid + added,
    triggeredTotal: added == null ? null : total + added,
  };
}

const DEFAULTS = { auto: true, amount: 0, maxHp: 200000, hp: 100000, aidHp: 0 };
const FIELDS = ['amount', 'maxHp', 'hp', 'aidHp'];
const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

export function createFirstAidCalculator({ document, onChange }) {
  const node = (key) => document.getElementById('firstaid-' + key);
  let character = null;
  let received = null;
  let initialized = false;
  let initializeHp = true;
  const format = (value) => value.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  function getState() {
    return { auto: node('auto').checked,
      ...Object.fromEntries(FIELDS.map((key) => [key, finite(node(key).value, DEFAULTS[key])])) };
  }
  function render() {
    const auto = node('auto').checked;
    if (auto && character) {
      node('amount').value = String(character.amount);
      node('maxHp').value = String(character.maxHp);
    }
    for (const key of ['amount', 'maxHp']) {
      node(key).readOnly = auto;
      node(key).classList.toggle('is-auto', auto);
    }
    const state = getState();
    const error = FIELDS.some((key) => node(key).value.trim() === '' || !Number.isFinite(Number(node(key).value)))
      ? '応急処置の計算条件に数値を入力してください。'
      : state.amount < 0 || state.maxHp <= 0 || state.hp < 0 || state.aidHp < 0 || state.hp + state.aidHp > state.maxHp
        ? '通常HP＋応急処置HPを最大HP以下にしてください。応急処置量・HPは0以上、最大HPは正の値です。'
        : !received ? '上の魔法被ダメージ計算の入力値を確認してください。' : '';
    node('error').textContent = error;
    for (const key of ['effective', 'chance', 'potential', 'added', 'normalHp', 'normalAid', 'normalTotal', 'triggerAid', 'triggerTotal']) {
      node(key).textContent = '—';
    }
    if (error) return;
    const results = [received.min.damage, received.max.damage].map((damage) => calculateFirstAid({ damage, ...state }));
    const range = (key) => {
      if (results.some((result) => result[key] == null)) return '致死量のため未判定';
      const values = results.map((result) => result[key]).sort((a, b) => a - b);
      return values[0] === values[1] ? format(values[0]) : format(values[0]) + ' 〜 ' + format(values[1]);
    };
    node('effective').textContent = format(results[0].effectiveAmount) + '%（装備・入力合計 ' + format(state.amount) + '%）';
    node('chance').textContent = range('chance') + '%';
    for (const [key, resultKey] of Object.entries({ potential: 'potential', added: 'added', normalHp: 'hp',
      normalAid: 'aidHp', normalTotal: 'total', triggerAid: 'triggeredAidHp', triggerTotal: 'triggeredTotal' })) {
      node(key).textContent = range(resultKey);
    }
  }
  function setState(raw) {
    const state = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    initializeHp = !Object.hasOwn(state, 'hp');
    node('auto').checked = typeof state.auto === 'boolean' ? state.auto : DEFAULTS.auto;
    for (const key of FIELDS) {
      const fallback = key === 'hp' && node('auto').checked && character ? character.maxHp : DEFAULTS[key];
      node(key).value = String(finite(state[key] ?? fallback, fallback));
    }
    render();
  }
  function init() {
    if (initialized) return;
    initialized = true;
    for (const key of ['auto', ...FIELDS]) {
      node(key).addEventListener(key === 'auto' ? 'change' : 'input', () => {
        if (key === 'hp' || key === 'aidHp') initializeHp = false;
        render(); onChange();
      });
    }
    node('reset').addEventListener('click', () => { setState(null); onChange(); });
    render();
  }
  return { init, getState, setState, reset: () => setState(null),
    setDamage(result) { received = result; render(); },
    syncFromCharacter(stats, maxHp) {
      character = { amount: Math.max(0, finite(stats.emergencyCure, 0)), maxHp: Math.max(1, finite(maxHp, 1)) };
      if (initializeHp && node('auto').checked) {
        node('hp').value = String(character.maxHp);
        node('aidHp').value = '0';
        initializeHp = false;
      }
      render();
    },
  };
}
