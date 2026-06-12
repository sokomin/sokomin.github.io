



const KIND_TO_PART = {
  
  18: 0,  
  20: 0,  
  21: 0,  
  22: 0,  
  23: 0,  
  24: 0,  
  25: 0,  
  26: 0,  
  28: 0,  
  29: 0,  
  30: 0,  
  32: 0,  
  33: 0,  
  54: 0,  
  55: 0,  
  56: 0,  
  57: 0,  
  58: 0,  
  61: 0,  
  63: 0,  
  68: 0,  
  70: 0,  
  80: 0,  
  82: 0,  
  
  17: 7,  
  8: 2,   
  0: 3,   
  1: 3,   
  10: 4,  
  11: 4,  
  6: 5,   
  2: 6,   
  3: 6,   
  4: 6,   
  5: 6,   
  16: 7,  
  7: 8,   
  9: 9,   
  
};

const WEAPON_KINDS = new Set([
  18, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 32, 33,
  54, 55, 56, 57, 58, 61, 63, 68, 70, 80, 82,
]);


const SUB_WEAPON_KINDS = new Set([
  12,  
  13,  
  14,  
  15,  
  19,  
  27,  
  31,  
  64,  
  69,  
  71,  
  72,  
  73,  
  74,  
  75,  
  76,  
  77,  
  78,  
  81,  
  83,  
]);

export const PART_LABELS = {
  0: '武器', 1: '職専', 2: '首', 3: '頭', 4: '背・耳', 5: '腰',
  6: '手', 7: '体', 8: '足', 9: '指', 10: 'メインクエスト',
  11: '宝石', 12: 'バッジ', 13: '消耗品', 14: 'その他',
};

const PART_TO_SLOT_KEY = {
  0: 'weapon',
  
  2: 'neck',
  3: 'head',
  4: 'back_ear',  
  5: 'waist',
  6: 'hand',
  7: 'body',
  8: 'foot',

  
};


export function resolveItemPart(itemOrKind) {
  if (itemOrKind == null) return null;
  if (typeof itemOrKind === 'number') return KIND_TO_PART[itemOrKind] ?? null;
  if (typeof itemOrKind === 'object') {
    if (itemOrKind.part != null) return itemOrKind.part;          
    if (itemOrKind.kind != null) return KIND_TO_PART[itemOrKind.kind] ?? null;
  }
  return null;
}


export function resolveEquipSlot(item, character) {
  void character;
  if (item && WEAPON_KINDS.has(Number(item.kind))) return 'weapon';
  
  if (item && SUB_WEAPON_KINDS.has(Number(item.kind))) return 'sub_weapon';
  const part = resolveItemPart(item);
  if (part == null) return null;
  return PART_TO_SLOT_KEY[part] || null;
}
