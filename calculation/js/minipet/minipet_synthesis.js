(function (global) {
  'use strict';

  const MinipetSynthesis = {
    canSynthesize(basePet, sacPet) {
      if (!basePet || !sacPet) return { ok: false, reason: 'ペットを2体選択してください' };
      if (basePet.element === sacPet.element) {
        return { ok: false, reason: '同属性のペットは合成できません' };
      }
      return { ok: true };
    },

    mutantProbability(basePet, sacPet, promoter) {
      const elems = new Set([basePet.element, sacPet.element]);
      const baseProb = (elems.has('light') && elems.has('dark')) ? 0.2 : 0.1;
      const bonus = promoter ? (promoter.bonus || 0) : 0;
      return baseProb + bonus;
    },

    synthesizeOnce(basePet, sacPet, promoter, allMutants) {
      const can = this.canSynthesize(basePet, sacPet);
      if (!can.ok) return { ok: false, reason: can.reason };

      const evolved = this._evolveToStage2(basePet);

      const prob = this.mutantProbability(basePet, sacPet, promoter);
      const roll = Math.random() * 100;
      const isMutant = roll < prob;

      let mutant = null;
      if (isMutant) {
        mutant = allMutants[Math.floor(Math.random() * allMutants.length)];
      }

      const promoterUsed = !!(promoter && promoter.id !== 'none');
      return {
        ok: true,
        evolved,
        isMutant,
        mutant,
        prob,
        roll,
        bothObtained: isMutant && promoterUsed,
        eitherChoice: isMutant && !promoterUsed,
      };
    },

    _evolveToStage2(basePet) {
      const map = { spirit: 'spirit2', nature: 'nature2', divine: 'divine2',
                    spirit2: 'spirit2', nature2: 'nature2', divine2: 'divine2',
                    base: 'spirit2' };
      const targetForm = map[basePet.form] || 'spirit2';
      return MinipetData.getPet(basePet.element, targetForm) || basePet;
    },

    statsRun(basePet, sacPet, promoter, allMutants, n) {
      const out = { trials: n, mutants: 0, mutantCounts: {} };
      const can = this.canSynthesize(basePet, sacPet);
      if (!can.ok) { out.error = can.reason; return out; }
      for (let i = 0; i < n; i++) {
        const r = this.synthesizeOnce(basePet, sacPet, promoter, allMutants);
        if (r.isMutant) {
          out.mutants++;
          out.mutantCounts[r.mutant.id] = (out.mutantCounts[r.mutant.id] || 0) + 1;
        }
      }
      out.mutantRate = (out.mutants / n * 100).toFixed(2);
      return out;
    }
  };

  global.MinipetSynthesis = MinipetSynthesis;
})(typeof window !== 'undefined' ? window : globalThis);
