(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PotentialItemSelection = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const normalize = value => String(value).normalize('NFKC').replace(/<[^>]*>/g, '').toLocaleLowerCase('ja').replace(/\s+/g, '');
  const groups = [
    { id: 'umu775', label: '775UMU', kind: 'equipment', base: 'umu775', canNx: true },
    { id: 'umu1000', label: '900／1000UMU', kind: 'equipment', base: 'umu1000', canNx: true },
    { id: 'umu1250', label: '1250UMU', kind: 'equipment', base: 'umu1250', canNx: true },
    { id: 'bfu', label: 'BFU', kind: 'equipment', base: 'bfu', canNx: false },
    { id: 'ring', label: 'U・DXU指', kind: 'ring', canNx: true },
    { id: 'rebirth', label: '転生指', kind: 'rebirth', canNx: false }
  ];
  function groupInput(id, model) {
    const group = groups.find(row => row.id === id);
    if (!group) throw new Error('装備の区分を選択してください。');
    const state = model.defaults(group.kind);
    if (group.base) state.base = group.base;
    return state;
  }
  function decode(catalog) {
    return catalog.rows.map(row => Object.fromEntries(catalog.fields.map((field, i) => [field, row[i]])));
  }
  function search(items, query, page = 0) {
    const words = String(query).trim().split(/[\s　]+/).map(normalize).filter(Boolean);
    if (!words.length) return { items: [], total: 0, page: 0 };
    const matches = items.filter(item => words.every(word => normalize(item.name + item.type + item.id).includes(word)));
    matches.sort((a, b) => Number(words[0] === normalize(b.name)) - Number(words[0] === normalize(a.name)));
    const current = Math.max(0, Math.min(page, Math.ceil(matches.length / 12) - 1));
    return { items: matches.slice(current * 12, (current + 1) * 12), total: matches.length, page: current };
  }
  function input(item, model) {
    if (item.error) throw new Error(item.error);
    const state = model.defaults(item.kind);
    state.part = item.part;
    if (item.kind === 'equipment') {
      if (!Object.hasOwn(model.rules.base, item.base)) throw new Error('この装備のベース点は計算に対応していません。');
      state.base = item.base;
    }
    // A Nexus item does not tell us how many sealed slots it has.
    if (item.nx) state.nxSlots = '';
    return state;
  }
  return { normalize, decode, search, input, groups, groupInput };
});
