export const PRESET_DEFINITIONS = [
  { id: 'sho_phys', label: '松・物理', rank: 'sho', build: 'phys' },
  { id: 'bai_phys', label: '梅・物理', rank: 'bai', build: 'phys' },
  { id: 'chiku_phys', label: '竹・物理', rank: 'chiku', build: 'phys' },
  { id: 'sho_mag', label: '松・魔法', rank: 'sho', build: 'mag' },
  { id: 'bai_mag', label: '梅・魔法', rank: 'bai', build: 'mag' },
  { id: 'chiku_mag', label: '竹・魔法', rank: 'chiku', build: 'mag' },
  { id: 'sho_pet', label: '松・ペット', rank: 'sho', build: 'pet' },
  { id: 'bai_pet', label: '梅・ペット', rank: 'bai', build: 'pet' },
  { id: 'chiku_pet', label: '竹・ペット', rank: 'chiku', build: 'pet' },
];

export const SLOT_DEFINITIONS = [
  { id: 'weapon', label: '武器' },
  { id: 'sub_weapon', label: '補助武器' },
  { id: 'neck', label: '首' },
  { id: 'head', label: '頭' },
  { id: 'back_ear', label: '耳・背' },
  { id: 'waist', label: '腰' },
  { id: 'hand', label: '手' },
  { id: 'body', label: '鎧' },
  { id: 'foot', label: '足' },
  ...Array.from({ length: 10 }, (_, index) => ({ id: `ring_${index}`, label: `指輪${index + 1}` })),
];

export function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

export function normalizeInventoryEntry(source) {
  if (!source || !Number.isFinite(Number(source.itemId))) return null;
  const entry = deepClone(source);
  entry.itemId = Number(entry.itemId);
  delete entry.slotIndex;
  delete entry.equippedSlot;
  delete entry.builderSlot;
  if (!Array.isArray(entry.revisions)) entry.revisions = [0, 0, 0];
  entry.revisions = entry.revisions.slice(0, 3).map((value) => Number(value) || 0);
  while (entry.revisions.length < 3) entry.revisions.push(0);
  if (!Array.isArray(entry.ops)) entry.ops = [null, null, null];
  entry.ops = entry.ops.slice(0, 3).map((op) => normalizeOp(op));
  while (entry.ops.length < 3) entry.ops.push(null);
  entry.daybreak = !!entry.daybreak;
  if (entry.nxActive != null) entry.nxActive = !!entry.nxActive;
  if (entry.nxUnlockedCount != null) {
    entry.nxUnlockedCount = Math.max(0, Math.min(4, Number(entry.nxUnlockedCount) || 0));
  }
  if (entry.seirenStage != null) {
    entry.seirenStage = Math.max(0, Math.min(15, Number(entry.seirenStage) || 0));
  }
  return entry;
}

export function normalizeOp(source) {
  if (!source || !Number.isFinite(Number(source.familyId)) || Number(source.familyId) < 0) return null;
  const op = deepClone(source);
  op.familyId = Number(op.familyId);
  for (const key of ['value', 'addValue', 'divisor', 'jobIdx', 'rowId', 'opId']) {
    if (op[key] === '' || op[key] == null) delete op[key];
    else if (Number.isFinite(Number(op[key]))) op[key] = Number(op[key]);
  }
  if (!Array.isArray(op.revisions)) op.revisions = [0, 0, 0];
  op.revisions = op.revisions.slice(0, 3).map((value) => Number(value) || 0);
  while (op.revisions.length < 3) op.revisions.push(0);
  return op;
}

export function createEmptyPreset(definition) {
  return {
    id: definition.id,
    label: definition.label,
    rank: definition.rank,
    build: definition.build,
    updatedAt: null,
    inventory: [],
  };
}

export function createEmptyPresetFile() {
  return {
    version: 1,
    presets: PRESET_DEFINITIONS.map(createEmptyPreset),
  };
}

export function normalizePresetFile(source) {
  const empty = createEmptyPresetFile();
  const sourcePresets = Array.isArray(source?.presets)
    ? source.presets
    : Object.entries(source?.presets || {}).map(([id, preset]) => ({ id, ...preset }));
  const byId = new Map(sourcePresets.map((preset) => [String(preset?.id || ''), preset]));
  empty.presets = PRESET_DEFINITIONS.map((definition) => {
    const sourcePreset = byId.get(definition.id);
    if (!sourcePreset) return createEmptyPreset(definition);
    return {
      id: definition.id,
      label: String(sourcePreset.label || definition.label),
      rank: definition.rank,
      build: definition.build,
      updatedAt: sourcePreset.updatedAt || sourcePreset.saved || null,
      inventory: (Array.isArray(sourcePreset.inventory) ? sourcePreset.inventory : [])
        .map(normalizeInventoryEntry)
        .filter(Boolean),
    };
  });
  return empty;
}

export function exportPresetFile(presets) {
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    presets: PRESET_DEFINITIONS.map((definition) => {
      const source = presets[definition.id] || createEmptyPreset(definition);
      return {
        id: definition.id,
        label: String(source.label || definition.label),
        rank: definition.rank,
        build: definition.build,
        updatedAt: source.updatedAt || null,
        inventory: (Array.isArray(source.inventory) ? source.inventory : [])
          .map(normalizeInventoryEntry)
          .filter(Boolean),
      };
    }),
  };
}

export function validateInventoryShape(inventory) {
  const errors = [];
  const warnings = [];
  if (!Array.isArray(inventory)) {
    errors.push('inventory が配列ではありません');
    return { errors, warnings };
  }
  inventory.forEach((entry, index) => {
    const prefix = `${index + 1}件目`;
    if (!entry || !Number.isInteger(Number(entry.itemId))) {
      errors.push(`${prefix}: itemId が不正です`);
      return;
    }
    if (Array.isArray(entry.ops) && entry.ops.length > 3) errors.push(`${prefix}: OPが3個を超えています`);
    (entry.ops || []).forEach((op, opIndex) => {
      if (op && (!Number.isInteger(Number(op.familyId)) || Number(op.familyId) < 0)) {
        errors.push(`${prefix}: OP${opIndex + 1}のfamilyIdが不正です`);
      }
    });
    if (entry.nxUnlockedCount != null && (entry.nxUnlockedCount < 0 || entry.nxUnlockedCount > 4)) {
      errors.push(`${prefix}: nxUnlockedCountが範囲外です`);
    }
    if (entry.seirenStage != null && (entry.seirenStage < 0 || entry.seirenStage > 15)) {
      errors.push(`${prefix}: seirenStageが範囲外です`);
    }
  });
  if (inventory.length === 0) warnings.push('装備が未登録です');
  if (inventory.length > SLOT_DEFINITIONS.length) errors.push(`装備数が${SLOT_DEFINITIONS.length}枠を超えています`);
  return { errors, warnings };
}
