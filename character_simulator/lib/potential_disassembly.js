function pointFrom(table, key) {
  if (!table || !Object.prototype.hasOwnProperty.call(table, String(key))) return null;
  const value = table[String(key)];
  if (value == null || value === '' || typeof value === 'boolean') return null;
  return Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : null;
}

function manualNumber(manual, key) {
  if (!manual || !Object.prototype.hasOwnProperty.call(manual, key)) return null;
  if (!['number', 'string'].includes(typeof manual[key]) || String(manual[key]).trim() === '') return null;
  const value = Number(manual[key]);
  return Number.isSafeInteger(value) && value >= 0 ? value : null;
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

function inputInt(value, min, max) {
  if (value == null || typeof value === 'boolean' || String(value).trim() === '') return null;
  const number = Number(value);
  return Number.isInteger(number) && number >= min && number <= max ? number : null;
}

export function disassemblyInputKey(inv) {
  const opKey = op => op ? [op.familyId ?? null, op.rowId ?? null, op.value ?? null,
    op.addValue ?? null, op.divisor ?? null, op.jobIdx ?? null,
    op.familyId == null ? op.opId ?? null : null, op.familyId == null ? op.vals ?? null : null] : null;
  const openKey = op => op ? [op.ocName ?? null, op.ocValue ?? null,
    op.ocConverter ?? null, op.bfId ?? null, op.bfTier ?? null, ...opKey(op)] : null;
  return JSON.stringify([inv.itemId, inv.nxUnlockedCount ?? 0, (inv.ops || []).map(opKey),
    (inv.nxUnlockedOps || []).map(openKey), inv.seirenStage ?? 0,
    inv.bfop ? [inv.bfop.bfId, inv.bfop.bfTier] : null,
    inv.scroll ? [inv.scroll.id, inv.scroll.type, inv.scroll.stage] : null, inv.incusedRingLv ?? null]);
}

function matchingBase(item, base) {
  return base && !base.nxAvailable && Number(base.kind) === Number(item.kind)
    && base.name === String(item.name).replace(/\[Nx\]$/i, '')
    && String(base.imgId) === String(item.imgId);
}

export async function resolveDisassemblyBaseItem(item, searchRows, getItem) {
  if ([5, 8].includes(Number(item?.grade)) && Number(item?.kind) !== 9) return null;
  if (!item?.nxAvailable) return item;
  const name = String(item.name).replace(/\[Nx\]$/i, '');
  if (name === item.name) return null;
  const candidates = (searchRows || []).filter(row => row[2] === name);
  if (candidates.length !== 1) return null;
  const base = await getItem(candidates[0][0]);
  return matchingBase(item, base) ? base : null;
}

export function describeDisassemblyOption(op, prefix) {
  if (!op || !prefix?.families) return null;
  if (op.familyId != null && inputInt(op.familyId, 0, Number.MAX_SAFE_INTEGER) == null) return null;
  const families = op.familyId == null ? Object.values(prefix.families)
    : [prefix.families[String(op.familyId)]].filter(Boolean);
  const tiers = families.flatMap(family => family.tiers || []);
  if (op.rowId != null) {
    if (inputInt(op.rowId, 0, Number.MAX_SAFE_INTEGER) == null) return null;
    const matches = tiers.filter(tier => Number(tier.id) === Number(op.rowId));
    return matches.length === 1 ? matches[0] : null;
  }
  if (op.familyId == null || !['number', 'string'].includes(typeof op.value)
    || String(op.value).trim() === '' || !Number.isFinite(Number(op.value))) return null;
  if (op.addValue != null || op.divisor != null) return null;
  const matches = tiers.filter(tier => {
    const range = String(tier.effect || '').match(/\[(-?\d+)~(-?\d+)\]/);
    if (range) return Number(op.value) >= Number(range[1]) && Number(op.value) <= Number(range[2]);
    const fixed = String(tier.effect || '').match(/[+]?(-?\d+)/);
    return fixed && Number(op.value) === Number(fixed[1]);
  });
  if (!matches.length || !matches[0].gradeClass || matches.some(tier => tier.gradeClass !== matches[0].gradeClass)) return null;
  return matches[0];
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
  baseItem = null,
}) {
  const rows = [];
  const unknowns = [];
  const warnings = [];
  const inputs = [];
  const unresolved = (id, label, table = null) => {
    const options = table ? Object.keys(table).filter(key => pointFrom(table, key) != null)
      .map(value => ({ value, label: `${value}等級` })) : null;
    const hasGrades = options && options.length > 0;
    const input = { id, label, min: 0, ...(hasGrades ? { input: 'select', options } : {}) };
    inputs.push(input);
    const value = manualNumber(manual, id);
    const points = hasGrades ? (value == null ? null : pointFrom(table, value)) : value;
    if (points != null) addKnown(rows, id, label, points, '手動指定');
    else addPending(rows, unknowns, input);
  };
  const nxActive = !!(inv && item && (inv.nxActive || item.nxAvailable));

  if (!inv || !item || !rules) {
    return { eligible: false, complete: false, cappedTotal: null, reason: '計算に必要なアイテム情報を取得できません。', rows, unknowns, warnings, knownTotal: 0 };
  }
  if (inv.nonstandard || item.nonstandard) {
    return { eligible: false, complete: false, cappedTotal: null, reason: '非規格装備は現在の計算対象外です。', rows, unknowns, warnings, knownTotal: 0 };
  }

  const grade = Number(item.grade);
  if (item.kind != null) isRing = Number(item.kind) === 9;
  const baseIsDxu = item.nxAvailable && matchingBase(item, baseItem) && [5, 8].includes(Number(baseItem.grade));
  if (!isRing && ([5, 8].includes(grade) || baseIsDxu)) {
    return { eligible: false, complete: false, cappedTotal: null, reason: 'DXU装備は分解できません。', rows, unknowns, warnings, knownTotal: 0 };
  }
  const equipmentEligible = (rules.equipment?.eligibleGrades || []).includes(grade);
  if (!isRing && !equipmentEligible) {
    return { eligible: false, complete: false, cappedTotal: null, reason: '現在はUMU／UMU-Nx装備とユニーク系の指輪を対象にしています。', rows, unknowns, warnings, knownTotal: 0 };
  }
  if (isRing && !(grade >= 4 && grade <= 9)) {
    return { eligible: false, complete: false, cappedTotal: null, reason: '現在はユニーク系の指輪を対象にしています。', rows, unknowns, warnings, knownTotal: 0 };
  }

  if (isRing) {
    const base = pointFrom(rules.ring, 'base');
    if (base != null) addKnown(rows, 'base', '指輪の基本値', base);
    else unresolved('base-points', '指輪の基本値');
  } else {
    const source = item.nxAvailable ? (matchingBase(item, baseItem) ? baseItem : null) : item;
    const dataLevel = inputInt(source?.mix?.dropLv, 1, 9998);
    const base = Number(source?.id) === 10747 ? 10
      : dataLevel == null ? null : pointFrom(rules.equipment?.baseByDataLevel, dataLevel);
    if (base != null) {
      addKnown(rows, 'base', `装備データレベル ${dataLevel}`, base);
    } else {
      unresolved('base-points', '装備の基本値');
    }
  }

  const seirenStage = inputInt(inv.seirenStage ?? 0, 0, 20);
  const seirenPoints = pointFrom(rules.shared?.refiningByLevel, seirenStage);
  if (seirenStage != null && seirenPoints != null) {
    if (seirenStage > 0) addKnown(rows, 'refining', `製錬 Lv${seirenStage}`, seirenPoints);
  } else unresolved('refining-points', '製錬ポイント');

  const openCount = inputInt(Object.hasOwn(manual, 'open-count') ? manual['open-count'] : inv.nxUnlockedCount, 0, 4);
  if (nxActive) {
    if (inputInt(inv.nxUnlockedCount, 0, 4) == null || Object.hasOwn(manual, 'open-count')) {
      inputs.push({ id: 'open-count', label: 'Nx解放数', input: 'select',
        options: [0, 1, 2, 3, 4].map(value => ({ value, label: `${value}枠` })) });
    }
    const transmutation = pointFrom(rules.shared?.transmutationByOpenCount, openCount);
    if (openCount == null) {
      addPending(rows, unknowns, { id: 'open-count', label: 'Nx解放数' });
    } else if (transmutation != null) {
      if (transmutation > 0) addKnown(rows, 'transmutation', `Nx封印解放 ${openCount}枠`, transmutation);
    } else {
      unresolved('transmutation-points', `Nx封印解放 ${openCount}枠`);
    }
  }

  for (let index = 0; index < (inv.ops || []).length; index++) {
    const op = inv.ops[index];
    if (!op) continue;
    const described = describeOption(op) || {};
    const label = optionLabel(index, described);
    if (isRing) {
      const manualKey = `ring-option-${index}`;
      const adoptedGrade = pointFrom(
        rules.bestEffort?.ringOptionGradeByGradeClass,
        described.gradeClass,
      );
      const ringGrade = Object.hasOwn(manual, manualKey) ? manualNumber(manual, manualKey) : adoptedGrade;
      const points = pointFrom(rules.ring?.optionByGrade, ringGrade);
      if (points != null) {
        addKnown(rows, manualKey, label, points);
      } else {
        unresolved(manualKey, label, rules.ring?.optionByGrade);
      }
      if (points != null && (adoptedGrade == null || Object.hasOwn(manual, manualKey)))
        inputs.push({ id: manualKey, label, input: 'select', options: Object.keys(rules.ring.optionByGrade).map(value => ({ value, label: `${value}等級` })) });
      continue;
    }

    const gradeClass = described.gradeClass;
    const points = pointFrom(rules.equipment?.optionByGradeClass, gradeClass);
    const manualKey = `option-${index}`;
    if (points != null) {
      addKnown(rows, manualKey, label, points);
    } else {
      unresolved(manualKey, label);
    }
  }

  if (nxActive) {
    for (let index = 0; index < openCount; index++) {
      const position = index + 1;
      if (isRing) {
        const points = pointFrom(rules.ring?.openSlotByPosition, position);
        if (points != null) addKnown(rows, `open-slot-${index}`, `指輪の解放OP ${position}枠目`, points);
        else unresolved(`open-slot-${index}`, `指輪の解放OP ${position}枠目`);
        continue;
      }
      const manualKey = `open-option-${index}`;
      const openOption = openOptionAt(inv, item, index);
      const describedOpen = openOption ? (describeOption(openOption) || {}) : {};
      const adoptedOpenGrade = pointFrom(
        rules.bestEffort?.equipmentOpenGradeByGradeClass,
        describedOpen.gradeClass,
      );
      const openGrade = Object.hasOwn(manual, manualKey) ? manualNumber(manual, manualKey) : adoptedOpenGrade;
      const slotRules = rules.equipment?.openOptionBySlot?.[String(position)] || {};
      const points = pointFrom(slotRules, openGrade);
      if (points != null) {
        addKnown(rows, manualKey, `封印解放OP ${position}枠目`, points);
      } else {
        unresolved(manualKey, `封印解放OP ${position}枠目`, slotRules);
      }
      if (points != null && (adoptedOpenGrade == null || Object.hasOwn(manual, manualKey)))
        inputs.push({ id: manualKey, label: `封印解放OP ${position}枠目`, input: 'select', options: Object.keys(slotRules).map(value => ({ value, label: `${value}等級` })) });
    }
  }

  if (inv.bfop) {
    const tier = inv.bfop.bfTier;
    const points = pointFrom(rules.shared?.bfByTier, tier);
    const tierLabel = { low: 'C／下級', mid: 'B／中級', high: 'A／上級', top: 'S／最上級' }[tier] || tier;
    if (points != null) addKnown(rows, 'bf', `BF強化（${tierLabel}）`, points);
    else unresolved('bf-points', 'BF強化ポイント');
  }

  if (inv.scroll) {
    const type = inv.scroll.type || '';
    const typeLabel = { normal: 'ノーマル', rare: 'レア', special: 'スペシャル', college: '協会' }[type] || type || '種別不明';
    const stage = inputInt(inv.scroll.stage, 1, 5);
    const points = pointFrom(rules.shared?.scrollByTypeAndStage?.[type], stage);
    if (stage != null && points != null) {
      addKnown(rows, 'scroll', `魔力注入 ${typeLabel} ${stage}段`, points);
    } else {
      unresolved('scroll-points', '魔力注入ポイント');
    }
  }

  if (isRing && Object.prototype.hasOwnProperty.call(inv, 'incusedRingLv')) {
    const engravingLevel = inputInt(inv.incusedRingLv, 0, Number.MAX_SAFE_INTEGER);
    const perLevel = pointFrom(rules.ring, 'engravingPerLevel');
    if (engravingLevel != null && perLevel != null) {
      if (engravingLevel > 0) addKnown(rows, 'engraving', `刻印 Lv${engravingLevel}`, engravingLevel * perLevel);
    } else unresolved('engraving-points', '刻印ポイント');
  }

  const knownTotal = rows.reduce((sum, row) => sum + (Number(row.points) || 0), 0);
  const itemCap = Math.min(100, pointFrom(rules, 'itemCap') ?? 100);
  const complete = unknowns.length === 0;
  return {
    eligible: true,
    kind: isRing ? 'ring' : 'equipment',
    rows,
    unknowns,
    inputs,
    warnings,
    knownTotal,
    complete,
    itemCap,
    cappedTotal: complete ? Math.min(itemCap, knownTotal) : null,
    currencyLabel: rules.currencyLabel || 'ポイント',
  };
}
