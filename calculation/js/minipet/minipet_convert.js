(function (global) {
  'use strict';

  const MinipetConvert = {
    rollOnce(table, excludeNames) {
      const exclude = new Set(excludeNames || []);
      const pool = table.filter(r => !exclude.has(r.skill_name));
      if (pool.length === 0) return null;

      const totalWeight = pool.reduce((s, r) => s + r.probability, 0);
      let target = Math.random() * totalWeight;
      for (const row of pool) {
        target -= row.probability;
        if (target <= 0) return row;
      }
      return pool[pool.length - 1];
    },

    rollMany(table, excludeNames, n) {
      const counts = {};
      const detail = [];
      for (let i = 0; i < n; i++) {
        const r = this.rollOnce(table, excludeNames);
        if (!r) break;
        detail.push(r);
        counts[r.skill_name] = (counts[r.skill_name] || 0) + 1;
      }
      return { detail, counts };
    }
  };

  global.MinipetConvert = MinipetConvert;
})(typeof window !== 'undefined' ? window : globalThis);
