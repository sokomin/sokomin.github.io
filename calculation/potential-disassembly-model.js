(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PotentialDisassembly = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const rules = {
    base: { bfu: 5, umu775: 5, umu900: 10, umu1000: 10, umu1250: 50 },
    refining: [0, 1, 1, 2, 3, 5, 7, 10, 15, 20, 25, 35, 55, 75, 95, 120, 145, 170, 195, 220, 245],
    equipmentOptions: { none: 0, normal: 8, set: 8, dx: 35, ult: 55, npc: 55 },
    ringOptions: { none: 0, grade1: 1, grade2: 2, grade3: 5, grade4: 20, grade5: 30, ult: 1 },
    transmutation: [0, 3, 5, 8, 10],
    openEquipment: [{ grade1: 5, grade2: 8, grade3: 10 }, { grade1: 8, grade2: 12, grade3: 14 }, { grade1: 25, grade2: 45 }, { grade1: 45, grade2: 70, grade3: 80 }],
    openRing: [5, 8, 20, 40],
    bf: { none: 0, C: 3, B: 5, A: 15, S: 30 },
    scroll: { none: [0, 0, 0, 0, 0], normal: [1, 2, 3, 4, 5], rare: [5, 7, 10, 15, 20], special: [30, 40, 60, 80, 100] },
    cap: 100, inventoryCap: 1000000
  };
  function integer(value, label, min, max) {
    if (value === '' || value == null || typeof value === 'boolean') throw new Error(label + 'を入力してください。');
    const n = Number(value);
    if (!Number.isSafeInteger(n) || n < min || n > max) throw new Error(label + 'は' + min + '～' + max + 'の整数で入力してください。');
    return n;
  }
  function lookup(table, key, label) {
    if (!Object.prototype.hasOwnProperty.call(table, key)) throw new Error(label + 'を選択してください。');
    return table[key];
  }
  function defaults(kind = 'equipment') {
    return { kind, part: 'armor', base: 'umu775', refining: 0, options: ['none', 'none', 'none'], nxSlots: 0, openCount: 0, openGrades: ['grade1', 'grade1', 'grade1', 'grade1'], bf: 'none', scroll: 'none', scrollStage: 1, engraving: 0 };
  }
  function calculate(input) {
    if (!input || !['equipment', 'ring', 'rebirth'].includes(input.kind)) throw new Error('装備の種類を選択してください。');
    const ring = input.kind !== 'equipment';
    if (!ring) {
      const part = input.part ?? 'armor';
      if (!['armor', 'weapon', 'auxiliary'].includes(part)) throw new Error('装備部位を選択してください。');
      if (part !== 'armor' && input.scroll !== 'none') throw new Error('図案書は防具に付与してください。');
      if (part === 'auxiliary' && (input.bf !== 'none' || Number(input.refining) !== 0)) throw new Error('補助武器は製錬・BF強化の対象外です。');
    }
    const rows = [];
    const add = (id, label, points) => rows.push({ id, label, points });
    add('base', 'ベース', ring ? 3 : lookup(rules.base, input.base, 'ベース装備'));
    if (!Array.isArray(input.options) || input.options.length !== 3) throw new Error('付与OPを3枠指定してください。');
    input.options.forEach((op, i) => add('option' + i, '付与OP' + (i + 1), lookup(ring ? rules.ringOptions : rules.equipmentOptions, op, '付与OP' + (i + 1))));
    const slots = integer(input.nxSlots, '錬成枠数', 0, 4);
    if (input.kind === 'rebirth' && slots !== 0) throw new Error('転生指は錬成できません。');
    const opened = integer(input.openCount, '解放数', 0, slots);
    add('nx', '錬成枠', rules.transmutation[slots]);
    for (let i = 0; i < opened; i++) {
      add('open' + i, '解放OP' + (i + 1), ring ? rules.openRing[i] : lookup(rules.openEquipment[i], input.openGrades?.[i], '解放OP' + (i + 1) + 'の等級'));
    }
    if (ring) {
      const level = integer(input.engraving, '刻印Lv', 0, 30);
      if (input.kind !== 'rebirth' && level !== 0) throw new Error('刻印は転生指で指定してください。');
      add('engraving', '刻印', level);
    } else {
      add('refining', '製錬', rules.refining[integer(input.refining, '製錬Lv', 0, 20)]);
      add('bf', 'BF強化', lookup(rules.bf, input.bf, 'BF強化'));
      const scroll = lookup(rules.scroll, input.scroll, '図案書');
      add('scroll', '図案書', scroll[integer(input.scrollStage, '図案書段階', 1, 5) - 1]);
    }
    const raw = rows.reduce((sum, row) => sum + row.points, 0);
    return { currency: ring ? '混沌の形象' : '秩序の形象', raw, yield: Math.min(rules.cap, raw), excess: Math.max(0, raw - rules.cap), rows };
  }
  function price(value) {
    if (value == null || String(value).trim() === '') return null;
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0 || n > 100000000) throw new Error('費用は0～100000000本で入力してください。');
    return n;
  }
  function evaluate(result, baseCost, processingCost, target = 1000, owned = 0) {
    const goal = integer(target, '目標数', 0, rules.inventoryCap);
    const stock = integer(owned, '所持数', 0, rules.inventoryCap);
    const base = price(baseCost), processing = price(processingCost);
    const cost = base === null || processing === null ? null : base + processing;
    const required = Math.max(0, goal - stock);
    const count = Math.ceil(required / result.yield);
    return { cost, unitGold: cost === null ? null : cost * 100000000 / result.yield, count, totalCost: count === 0 ? 0 : cost === null ? null : count * cost, produced: count * result.yield, after: stock + count * result.yield, overflow: stock + count * result.yield > rules.inventoryCap };
  }
  return { rules, defaults, calculate, evaluate };
});
