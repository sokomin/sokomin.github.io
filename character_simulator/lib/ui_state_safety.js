
export function compatibleSeirenSelection(current, pool) {
  if (!current?.seirenName || !current?.seirenTier || !Array.isArray(pool)) return '';
  for (let ei = 0; ei < pool.length; ei++) {
    const entry = pool[ei];
    if (!Array.isArray(entry?.tiers?.[current.seirenTier])) continue;
    const ni = (entry.names || []).findIndex((name) =>
      name.name === current.seirenName
      && Number(name.familyId ?? -1) === Number(current.familyId ?? -1));
    if (ni >= 0) return `ent:${ei}:nm:${ni}:tier:${current.seirenTier}`;
  }
  return '';
}

export function skillDamageIssue(skill, row, mode, weaponMagic = false) {
  if (!row) return '現在の条件では計算結果を表示できません。';
  if (weaponMagic) return '';
  const keys = mode === 'phys' ? ['physDmgPct'] : ['magicDmgMin', 'magicDmgMax'];
  if (keys.some((key) => typeof row[key] !== 'number' || !Number.isFinite(row[key]))) {
    return '現在の条件では計算結果を表示できません。';
  }
  if (skill.hasAttackCount && readSkillAttackCount(row.attackCount) == null) {
    return '現在の条件では計算結果を表示できません。';
  }
  return '';
}

export function readSkillAttackCount(value) {
  if (typeof value === 'string' && /^\d+(?:\.\d+)?回$/.test(value)) value = Number(value.slice(0, -1));
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}


export function serialTaskQueue(task) {
  let tail = Promise.resolve();
  return (...args) => {
    const result = tail.then(() => task(...args));
    tail = result.then(() => undefined, () => undefined);
    return result;
  };
}
