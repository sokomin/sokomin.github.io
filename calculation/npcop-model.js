(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.NpcopSimulator = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const HISTORY_LIMIT = 5000;
  const copy = value => JSON.parse(JSON.stringify(value));
  const ordinary = () => ({ kind: 'ordinary' });
  const integer = n => Number.isSafeInteger(n) && n >= 0;
  const defaultRequirement = () => ({ base: 0, op: [0, 0, 0], reduction: 0, mode: 'normal' });
  function calculateRequiredLevel(config = defaultRequirement(), slots = [ordinary(), ordinary(), ordinary()]) {
    if (!config || !integer(config.base) || !integer(config.reduction) || !Array.isArray(config.op) || config.op.length !== 3 || !config.op.every(integer) || !['normal', 'um'].includes(config.mode) || !Array.isArray(slots) || slots.length !== 3) {
      throw new Error('要求レベルには0以上の整数を入力してください。');
    }
    const [first, second, third] = config.op.map((level, index) => slots[index]?.kind === 'ordinary' ? level : 0).sort((a, b) => b - a);
    let bonus = first;
    if (second > 0) {
      bonus = config.mode === 'um'
        ? Math.floor(first * 3 / 4) + Math.floor(second / 4) + Math.floor(third / 20)
        : first + Math.floor(second * 2 / 3) + Math.floor(third / 3);
    }
    const level = Math.max(0, config.base - config.reduction) + bonus;
    if (!Number.isSafeInteger(level)) throw new Error('要求レベルの入力値が大きすぎます。');
    return level;
  }
  class Simulator {
    constructor(data, random = Math.random) {
      this.data = data;
      this.random = random;
      this.state = {
        version: 1, item: { part: data.parts[0].id, serial: 1, broken: false, slots: [ordinary(), ordinary(), ordinary()], requirement: defaultRequirement() },
        totals: { ingot: 0, charm: 0, repair: 0, attach: 0, attempts: 0, success: 0, failure: 0, destruction: 0 },
        materials: {}, history: [], sequence: 0, items: 1
      };
    }
    get item() { return this.state.item; }
    definition(id) { return this.data.options.find(op => op.id === id); }
    options() { return this.data.options.filter(op => op.parts.includes(this.item.part)); }
    requiredLevel() { return calculateRequiredLevel(this.item.requirement, this.item.slots); }
    setRequirement(config) {
      calculateRequiredLevel(config, this.item.slots);
      this.item.requirement = copy(config);
      this.item.requirement.op = config.op.map((level, index) => this.item.slots[index]?.kind === 'ordinary' ? level : 0);
      return this.requiredLevel();
    }
    slot(index) {
      if (!Number.isInteger(index) || index < 0 || index > 2) throw new Error('対象枠を選んでください。');
      return this.item.slots[index];
    }
    pick() {
      const n = this.random();
      if (!Number.isFinite(n) || n < 0 || n >= 1) throw new Error('抽選に失敗しました。');
      return n;
    }
    record(action, result, index = null, costs = {}) {
      for (const [name, count] of Object.entries(costs)) {
        this.state.materials[name] = (this.state.materials[name] || 0) + count;
      }
      const entry = { no: ++this.state.sequence, item: this.item.serial, part: this.item.part,
        slot: index === null ? null : index + 1, action, result, costs: copy(costs),
        ingot: this.state.totals.ingot, charm: this.state.totals.charm, repair: this.state.totals.repair };
      this.state.history.push(entry);
      if (this.state.history.length > HISTORY_LIMIT) this.state.history.shift();
      return entry;
    }
    newItem(part = this.item.part) {
      if (!this.data.parts.some(p => p.id === part)) throw new Error('装備部位を選んでください。');
      this.state.items++;
      this.state.item = { part, serial: this.state.items, broken: false, slots: [ordinary(), ordinary(), ordinary()], requirement: defaultRequirement() };
      return this.record('装備作成', '新しい装備');
    }
    prepare(index) {
      const slot = this.slot(index);
      if (this.item.broken) throw new Error('先に装備を修理してください。');
      if (slot?.kind === 'npc') throw new Error('宿命OPは削除できません。');
      this.item.slots[index] = slot ? null : ordinary();
      this.item.requirement.op[index] = 0;
      return this.record('通常OP', slot ? '枠を空けた' : '通常OPをセット', index);
    }
    canAttach(id, index) {
      this.slot(index);
      const op = this.definition(id);
      if (this.item.broken) return '先に装備を修理してください。';
      if (!op || !op.parts.includes(this.item.part)) return 'この部位には付与できません。';
      if (!op.slots.includes(index + 1)) return 'この枠には付与できません。';
      if (this.item.slots[index]?.kind === 'npc') return '宿命OPは上書きできません。';
      if (this.item.slots.slice(0, index).some(slot => slot === null)) return '手前の枠にOPをセットしてください。';
      if (this.item.slots.some(slot => slot?.id === id) && this.item.slots[index] !== null) return '同名OPを追加する枠は、先に通常OPを外してください。';
      return '';
    }
    attach(id, index) {
      const reason = this.canAttach(id, index);
      if (reason) throw new Error(reason);
      const op = this.definition(id);
      this.item.slots[index] = { kind: 'npc', id, stage: 0, stat: op.stat };
      this.item.requirement.op[index] = 0;
      this.state.totals.attach++;
      this.state.totals.charm++;
      return this.record('付与', `[${op.name}] ${op.effect}`, index, { [`${this.data.materials.charm.name}［${op.name}］`]: 1 });
    }
    next(index, method = 'normal') {
      const slot = this.slot(index);
      if (!['normal', 'enhanced'].includes(method)) throw new Error('増幅方法を選んでください。');
      if (slot?.kind !== 'npc') return null;
      const op = this.definition(slot.id);
      if (op.kind === 'other' || slot.stage === 7) return null;
      const stage = slot.stage === 0 && op.kind === 'ratio' ? 4 : slot.stage + 1;
      const row = this.data[op.kind].find(row => row[0] === stage);
      const start = method === 'normal' ? 1 : 5;
      return { stage, success: row[start], failure: row[start + 1], destruction: row[start + 2], ingot: row[start + 3], charm: method === 'enhanced' ? row[9] : 0 };
    }
    amplify(index, method = 'normal') {
      if (this.item.broken) throw new Error('先に装備を修理してください。');
      const next = this.next(index, method);
      if (!next) throw new Error('増幅できる宿命OPを選んでください。');
      const slot = this.slot(index);
      const roll = this.pick() * 100;
      const outcome = roll < next.success ? 'success' : roll < next.success + next.failure ? 'failure' : 'destruction';
      const stat = outcome === 'success' && slot.stage === 0 ? this.data.stats[Math.floor(this.pick() * this.data.stats.length)] : slot.stat;
      this.state.totals.ingot += next.ingot;
      this.state.totals.charm += next.charm;
      this.state.totals.attempts++;
      this.state.totals[outcome]++;
      const before = this.describe(slot).name;
      if (outcome === 'success') { slot.stage = next.stage; slot.stat = stat; }
      if (outcome === 'destruction') this.item.broken = true;
      const result = outcome === 'success' ? `成功：${before} → ${this.describe(slot).name}（${this.describe(slot).effect}）` : `${outcome === 'failure' ? '失敗' : '破壊'}：${before}（段階維持）`;
      const costs = { [this.data.materials.ingot.name]: next.ingot };
      if (next.charm) costs[this.data.materials.charm.name] = next.charm;
      return this.record(method === 'normal' ? '増幅' : '強化増幅', result, index, costs);
    }
    repair() {
      if (!this.item.broken) throw new Error('装備は壊れていません。');
      this.item.broken = false;
      this.state.totals.repair++;
      return this.record('修理', '修理完了（全OP・段階維持）', null, { [this.data.materials.repair.name]: 1 });
    }
    describe(slot, level = 2000) {
      if (!slot) return { name: '空き', effect: '—' };
      if (slot.kind === 'ordinary') return { name: '通常OP', effect: '通常OP' };
      const op = this.definition(slot.id);
      if (!slot.stage) return { name: op.name, effect: op.effect };
      const tier = this.data.stages[op.kind].find(t => t.stage === slot.stage);
      if (op.kind === 'fixed') return { name: tier.name, effect: `${slot.stat} +${tier.value}` };
      const value = Math.floor(Math.min(2000, Math.max(1, level)) * tier.n / tier.d);
      return { name: tier.name, effect: `${slot.stat} +${tier.n} / レベル${tier.d}`, value };
    }
    snapshot() { return copy(this.state); }
    restore(input) {
      const state = copy(input);
      const bad = () => { throw new Error('保存データを読み込めません。'); };
      if (state?.version !== 1 || !this.data.parts.some(p => p.id === state.item?.part) || typeof state.item.broken !== 'boolean' || !Array.isArray(state.item.slots) || state.item.slots.length !== 3) bad();
      if (!integer(state.sequence) || !integer(state.items) || state.items < 1 || !integer(state.item.serial) || state.item.serial < 1 || state.item.serial > state.items) bad();
      const keys = ['ingot', 'charm', 'repair', 'attach', 'attempts', 'success', 'failure', 'destruction'];
      if (!state.totals || keys.some(k => !integer(state.totals[k])) || state.totals.attempts !== state.totals.success + state.totals.failure + state.totals.destruction) bad();
      for (const [i, slot] of state.item.slots.entries()) {
        if (slot === null || slot?.kind === 'ordinary') continue;
        const op = this.definition(slot?.id);
        if (slot?.kind !== 'npc' || !op || !op.parts.includes(state.item.part) || !op.slots.includes(i + 1)) bad();
        if (op.kind === 'other' ? slot.stage !== 0 : !this.data.stages[op.kind].some(t => t.stage === slot.stage)) bad();
        if (op.stat && !this.data.stats.includes(slot.stat)) bad();
      }
      if (state.item.requirement === undefined) state.item.requirement = defaultRequirement();
      calculateRequiredLevel(state.item.requirement, state.item.slots);
      if (!state.materials || typeof state.materials !== 'object' || Array.isArray(state.materials) || Object.entries(state.materials).some(([k,v]) => k.length > 150 || !integer(v))) bad();
      if (!Array.isArray(state.history) || state.history.length > HISTORY_LIMIT) bad();
      let previous = Math.max(0, state.sequence - HISTORY_LIMIT);
      for (const e of state.history) {
        if (!integer(e.no) || e.no !== previous + 1 || !integer(e.item) || typeof e.part !== 'string' || typeof e.action !== 'string' || typeof e.result !== 'string' || !e.costs || Object.entries(e.costs).some(([k,v]) => k.length > 150 || !integer(v)) || ['ingot','charm','repair'].some(k => !integer(e[k]))) bad();
        previous = e.no;
      }
      if (previous !== state.sequence) bad();
      this.state = state;
    }
  }
  return { Simulator, HISTORY_LIMIT, calculateRequiredLevel };
});
