function pointFrom(table, key) {
  if (!table || !Object.prototype.hasOwnProperty.call(table, String(key))) return null;
  const value = table[String(key)];
  if (value == null || value === '') return null;
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function nearestPoint(table, key) {
  const target = Number(key);
  if (!table || !Number.isFinite(target)) return null;
  const candidates = Object.entries(table)
    .map(([candidateKey, value]) => ({ key: Number(candidateKey), value: Number(value) }))
    .filter((entry) => Number.isFinite(entry.key) && Number.isFinite(entry.value))
    .sort((a, b) => Math.abs(a.key - target) - Math.abs(b.key - target) || a.key - b.key);
  return candidates.length ? candidates[0].value : null;
}

function manualNumber(manual, key) {
  if (!manual || !Object.prototype.hasOwnProperty.call(manual, key)) return null;
  if (manual[key] === '') return null;
  const value = Number(manual[key]);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

function addKnown(rows, id, label, points, detail = '') {
  rows.push({ id, label, points, detail, pending: false });
}

function addPending(rows, unknowns, unknown) {
  rows.push({
    id: unknown.id,
    label: unknown.label,
    points: null,
    detail: unknown.detail || '',
    pending: true,
  });
  unknowns.push(unknown);
}

function clampInt(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) | 0));
}

function optionLabel(index, described) {
  const name = described && described.name ? ` ${described.name}` : '';
  return `付与OP${index + 1}${name}`;
}

function openOptionAt(inv, item, index) {
  if (Array.isArray(inv?.nxUnlockedOps) && inv.nxUnlockedOps[index]) return inv.nxUnlockedOps[index];
  return (item?.opSlots || []).find((slot) => {
    if (!slot) return false;
    const isOpen = slot.slotKind === 'nxop' || slot.slotKind === 'long_nxop';
    return isOpen && Number(slot.pos) === index;
  }) || null;
}

export function calculateDisassemblyEstimate({
  inv,
  item,
  rules,
  isRing = false,
  describeOption = () => null,
  manual = {},
}) {
  const rows = [];
  const unknowns = [];
  const warnings = [];
  const nxActive = !!(inv && item && (inv.nxActive || item.nxAvailable));

  if (!inv || !item || !rules) {
    return { eligible: false, reason: '計算に必要なアイテム情報を取得できません。', rows, unknowns, warnings, knownTotal: 0 };
  }
  if (inv.nonstandard || item.nonstandard) {
    return { eligible: false, reason: '非規格装備は現在の計算対象外です。', rows, unknowns, warnings, knownTotal: 0 };
  }

  const grade = Number(item.grade);
  const equipmentEligible = (rules.equipment?.eligibleGrades || []).includes(grade);
  if (!isRing && !equipmentEligible) {
    return { eligible: false, reason: '現在はUMU／UMU-Nx装備とユニーク系の指輪を対象にしています。', rows, unknowns, warnings, knownTotal: 0 };
  }
  if (isRing && !(grade >= 4 && grade <= 9)) {
    return { eligible: false, reason: '現在はユニーク系の指輪を対象にしています。', rows, unknowns, warnings, knownTotal: 0 };
  }

  if (isRing) {
    addKnown(rows, 'base', '指輪の基本値', Number(rules.ring?.base) || 0);
  } else {
    const dataLevel = Number(item.mix?.dropLv);
    const base = pointFrom(rules.equipment?.baseByDataLevel, dataLevel);
    const estimatedBase = pointFrom(rules.equipment?.estimatedBaseByDataLevel, dataLevel);
    const nearestBase = nearestPoint(rules.equipment?.baseByDataLevel, dataLevel);
    const manualBase = manualNumber(manual, 'base-points');
    if (base != null) {
      addKnown(rows, 'base', `装備データレベル ${dataLevel}`, base);
    } else if (estimatedBase != null) {
      addKnown(rows, 'base', `装備データレベル ${Number.isFinite(dataLevel) ? dataLevel : '不明'}`, estimatedBase);
    } else if (manualBase != null) {
      addKnown(rows, 'base', `装備データレベル ${Number.isFinite(dataLevel) ? dataLevel : '不明'}`, manualBase, '手動指定');
    } else {
      addKnown(rows, 'base', `装備データレベル ${Number.isFinite(dataLevel) ? dataLevel : '不明'}`, nearestBase ?? 0);
    }
  }

  const seirenStage = clampInt(inv.seirenStage || 0, 0, 20);
  const seirenPoints = pointFrom(rules.shared?.refiningByLevel, seirenStage);
  if (seirenStage > 0 && seirenPoints != null) {
    addKnown(rows, 'refining', `製錬 Lv${seirenStage}`, seirenPoints);
  }

  if (nxActive) {
    const openCount = clampInt(inv.nxUnlockedCount, 0, 4);
    const transmutation = pointFrom(rules.shared?.transmutationByOpenCount, openCount);
    const manualTransmutation = manualNumber(manual, 'transmutation-points');
    if (transmutation != null) {
      if (transmutation > 0) addKnown(rows, 'transmutation', `Nx封印解放 ${openCount}枠`, transmutation);
    } else if (manualTransmutation != null) {
      addKnown(rows, 'transmutation', `Nx封印解放 ${openCount}枠`, manualTransmutation, '手動指定');
    } else {
      addKnown(rows, 'transmutation', `Nx封印解放 ${openCount}枠`, Math.round(openCount * 2.5));
    }
  }

  for (let index = 0; index < (inv.ops || []).length; index++) {
    const op = inv.ops[index];
    if (!op) continue;
    const described = describeOption(op) || {};
    const label = optionLabel(index, described);
    if (isRing) {
      const manualKey = `ring-option-${index}`;
      const estimatedGrade = pointFrom(
        rules.bestEffort?.ringOptionGradeByGradeClass,
        described.gradeClass || rules.bestEffort?.equipmentOptionDefaultGradeClass || 'normal',
      ) || 1;
      const ringGrade = manualNumber(manual, manualKey) ?? estimatedGrade;
      const points = pointFrom(rules.ring?.optionByGrade, ringGrade);
      if (points != null) {
        addKnown(rows, manualKey, label, points);
      } else {
        addKnown(rows, manualKey, label, 1);
      }
      continue;
    }

    const gradeClass = described.gradeClass || rules.bestEffort?.equipmentOptionDefaultGradeClass || 'normal';
    const points = pointFrom(rules.equipment?.optionByGradeClass, gradeClass);
    const manualKey = `option-${index}`;
    const manualPoints = manualNumber(manual, manualKey);
    if (points != null) {
      addKnown(rows, manualKey, label, points);
    } else if (manualPoints != null) {
      addKnown(rows, manualKey, label, manualPoints, '手動指定');
    } else {
      addKnown(rows, manualKey, label, pointFrom(rules.equipment?.optionByGradeClass, 'normal') ?? 8);
    }
  }

  if (nxActive) {
    const openCount = clampInt(inv.nxUnlockedCount, 0, 4);
    for (let index = 0; index < openCount; index++) {
      const position = index + 1;
      if (isRing) {
        const points = pointFrom(rules.ring?.openSlotByPosition, position);
        if (points != null) addKnown(rows, `open-slot-${index}`, `指輪の解放OP ${position}枠目`, points);
        continue;
      }
      const manualKey = `open-option-${index}`;
      const openOption = openOptionAt(inv, item, index);
      const describedOpen = openOption ? (describeOption(openOption) || {}) : {};
      const estimatedOpenGrade = pointFrom(
        rules.bestEffort?.equipmentOpenGradeByGradeClass,
        describedOpen.gradeClass || rules.bestEffort?.equipmentOptionDefaultGradeClass || 'normal',
      ) || 1;
      const openGrade = manualNumber(manual, manualKey) ?? estimatedOpenGrade;
      const slotRules = rules.equipment?.openOptionBySlot?.[String(position)] || {};
      const points = pointFrom(slotRules, openGrade);
      if (points != null) {
        addKnown(rows, manualKey, `封印解放OP ${position}枠目`, points);
      } else {
        addKnown(rows, manualKey, `封印解放OP ${position}枠目`, pointFrom(slotRules, 1) ?? 0);
      }
    }
  }

  if (inv.bfop && inv.bfop.bfId) {
    const tier = inv.bfop.bfTier || 'top';
    const points = pointFrom(rules.shared?.bfByTier, tier);
    const tierLabel = { low: 'C／下級', mid: 'B／中級', high: 'A／上級', top: 'S／最上級' }[tier] || tier;
    if (points != null) addKnown(rows, 'bf', `BF強化（${tierLabel}）`, points);
  }

  if (inv.scroll && inv.scroll.id) {
    const type = inv.scroll.type || '';
    const typeLabel = { normal: 'ノーマル', rare: 'レア', special: 'スペシャル', college: '協会' }[type] || type || '種別不明';
    const stage = clampInt(inv.scroll.stage || 1, 1, 5);
    const points = pointFrom(rules.shared?.scrollByTypeAndStage?.[type], stage);
    const manualScroll = manualNumber(manual, 'scroll-points');
    if (points != null) {
      addKnown(rows, 'scroll', `魔力注入 ${typeLabel} ${stage}段`, points);
    } else if (manualScroll != null) {
      addKnown(rows, 'scroll', `魔力注入 ${typeLabel} ${stage}段`, manualScroll, '手動指定');
    } else {
      addKnown(rows, 'scroll', `魔力注入 ${typeLabel} ${stage}段`, pointFrom(rules.shared?.scrollByTypeAndStage?.normal, stage) ?? 0);
    }
  }

  if (isRing && Object.prototype.hasOwnProperty.call(inv, 'incusedRingLv')) {
    const engravingLevel = Math.max(0, Number(inv.incusedRingLv) | 0);
    const perLevel = Number(rules.ring?.engravingPerLevel) || 0;
    if (engravingLevel > 0 && perLevel > 0) {
      addKnown(rows, 'engraving', `刻印 Lv${engravingLevel}`, engravingLevel * perLevel);
    }
  }

  const knownTotal = rows.reduce((sum, row) => sum + (Number(row.points) || 0), 0);
  const itemCap = Number(rules.itemCap);
  return {
    eligible: true,
    kind: isRing ? 'ring' : 'equipment',
    rows,
    unknowns,
    warnings,
    knownTotal,
    complete: true,
    itemCap: Number.isFinite(itemCap) ? itemCap : 100,
    cappedTotal: Math.min(Number.isFinite(itemCap) ? itemCap : 100, knownTotal),
    currencyLabel: rules.currencyLabel || 'ポイント',
  };
}
