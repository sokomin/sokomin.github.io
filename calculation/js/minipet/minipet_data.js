(function (global) {
  'use strict';

  const FORM_PARENT = {
    spirit:  'base',
    nature:  'base',
    divine:  'base',
    spirit2: 'spirit',
    nature2: 'nature',
    divine2: 'divine',
  };

  const MinipetData = {
    pets: null,
    promoters: null,
    convertTable: null,

    async loadAll() {
      const base = './js/minipet/data/';
      const [pets, promoters, csvText] = await Promise.all([
        fetch(base + 'pets.json').then(r => r.json()),
        fetch(base + 'promoters.json').then(r => r.json()),
        fetch(base + 'skill_convert_table.csv').then(r => r.text())
      ]);
      this.pets = pets;
      this.promoters = promoters;
      this.convertTable = this._parseCsv(csvText);
      return this;
    },

    _parseCsv(text) {
      const lines = text.split(/\r?\n/).filter(Boolean);
      const header = lines.shift().split(',');
      return lines.map(line => {
        const cols = line.split(',');
        const row = {};
        header.forEach((h, i) => { row[h] = cols[i]; });
        row.probability = parseFloat(row.probability);
        return row;
      });
    },

    getPetById(id) {
      return this.pets.pets.find(p => p.id === id)
          || this.pets.mutants.find(m => m.id === id)
          || null;
    },

    getPet(elementId, formId) {
      return this.pets.pets.find(p => p.element === elementId && p.form === formId) || null;
    },

    getElement(id) {
      return this.pets.elements.find(e => e.id === id) || null;
    },

    getForm(id) {
      return this.pets.forms.find(f => f.id === id) || null;
    },

    getPromoter(id) {
      return this.promoters.find(p => p.id === id) || null;
    },

    getMaxLevel(pet) {
      if (!pet) return 1;
      if (pet.category) return 150;
      const form = this.getForm(pet.form);
      return form ? form.maxLevel : 100;
    },

    getSkills(pet) {
      if (!pet) return [];
      if (pet.category) return Array.isArray(pet.skills) ? pet.skills : [];
      if (!this.pets) return Array.isArray(pet.skills) ? pet.skills : [];
      const seen = new Set();
      const chain = [];
      let current = pet;
      while (current) {
        if (Array.isArray(current.skills)) {
          for (const s of current.skills) {
            if (!s || !s.name || seen.has(s.name)) continue;
            seen.add(s.name);
            chain.push(s);
          }
        }
        const parentFormId = FORM_PARENT[current.form];
        if (!parentFormId) break;
        const parent = this.pets.pets.find(p => p.element === current.element && p.form === parentFormId);
        if (!parent || parent === current) break;
        current = parent;
      }
      return chain;
    },

    getOwnSkills(pet) {
      return (pet && Array.isArray(pet.skills)) ? pet.skills : [];
    }
  };

  global.MinipetData = MinipetData;
})(typeof window !== 'undefined' ? window : globalThis);
