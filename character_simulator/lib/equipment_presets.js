import { SLOT_DEFINITIONS } from './preset_codec.js';

const SLOTS = new Set(SLOT_DEFINITIONS.map(({ id }) => id));

export function presetsForJob(data, job) {
  return (data?.presets || []).filter((preset) => preset.job === Number(job));
}

export function defaultPresetForJob(data, job) {
  const choices = presetsForJob(data, job);
  return choices.find((preset) => preset.default) || choices[0] || null;
}

export function validateEquipmentPresets(data) {
  if (data?.version !== 1 || !Array.isArray(data.presets)) throw Error('装備セットの形式が不正です');
  const ids = new Set();
  for (const preset of data.presets) {
    if (!preset.id || ids.has(preset.id) || !Number.isInteger(preset.job) || preset.job < 0 || preset.job > 25
        || preset.rank !== 'bai' || !preset.label || !preset.jobName) throw Error('装備セットの職業・識別子が不正です');
    ids.add(preset.id);
    const slots = new Set();
    if (!Array.isArray(preset.inventory) || preset.inventory.length !== SLOTS.size) throw Error('装備セットは19枠必要です');
    for (const entry of preset.inventory) {
      if (!Number.isInteger(entry.itemId) || !SLOTS.has(entry.equippedSlot) || slots.has(entry.equippedSlot)) {
        throw Error('装備セットのアイテム・装着枠が不正です');
      }
      slots.add(entry.equippedSlot);
    }
  }
  for (let job = 0; job < 26; job++) {
    if (presetsForJob(data, job).filter((preset) => preset.default).length !== 1) throw Error('職業ごとの標準セットが必要です');
  }
  return data;
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
}

function signature(inv, serialize) {
  const { slotIndex, equippedSlot, ...equipment } = serialize(inv);
  return JSON.stringify(canonical(equipment));
}

export async function distributeEquipmentPreset({ entries, inventory, restore, serialize, maxSlots }) {
  const available = new Map();
  for (const inv of inventory.items()) {
    const key = signature(inv, serialize);
    if (!available.has(key)) available.set(key, []);
    available.get(key).push(inv);
  }
  const prepared = [];
  for (const entry of entries) {
    const restored = await restore(entry);
    if (!restored) throw Error(`アイテム ${entry.itemId} を復元できません`);
    const match = available.get(signature(restored, serialize))?.shift();
    prepared.push({ inv: match || restored, slot: entry.equippedSlot || null, reused: !!match });
  }
  const additions = prepared.filter(({ reused }) => !reused);
  if (inventory.size() + additions.length > maxSlots) {
    throw Error(`空き枠不足: ${additions.length}枠必要です（空き${maxSlots - inventory.size()}枠）`);
  }
  const added = [];
  try {
    for (const { inv } of additions) {
      if (!inventory.add(inv)) throw Error('インベントリへ追加できません');
      added.push(inv);
    }
  } catch (error) {
    for (const inv of added) inventory.remove(inv.slotIndex);
    throw error;
  }
  return { prepared, added: added.length, reused: prepared.length - added.length };
}

export async function equipEquipmentPreset({ prepared, inventory, canEquip, recalculate }) {
  const previous = new Map([...inventory.items()].map((inv) => [inv, inv.equippedSlot]));
  try {
    for (const inv of inventory.items()) inv.equippedSlot = null;
    await recalculate();
    let pending = [...prepared];
    for (let pass = 0; pending.length && pass < prepared.length; pass++) {
      const next = [];
      for (const choice of pending) {
        if (!choice.slot || !SLOTS.has(choice.slot) || !await canEquip(choice.inv, choice.slot)) next.push(choice);
        else choice.inv.equippedSlot = choice.slot;
      }
      if (next.length === pending.length) break;
      await recalculate();
      pending = next;
    }
    return prepared.filter(({ inv }) => inv.equippedSlot).length;
  } catch (error) {
    for (const [inv, slot] of previous) inv.equippedSlot = slot;
    throw error;
  }
}
