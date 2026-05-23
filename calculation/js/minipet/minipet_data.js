(function (global) {
  'use strict';

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
      return pet.skills || [];
    }
  };

  global.MinipetData = MinipetData;
})(typeof window !== 'undefined' ? window : globalThis);
