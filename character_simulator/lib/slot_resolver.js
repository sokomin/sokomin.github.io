



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


const WEAPON_JOBS = {
  18: [0, 14], 20: [0, 1, 14], 21: [4, 14], 22: [5, 14],
  23: [6, 13, 14], 24: [7, 14], 25: [10, 14], 26: [2],
  28: [3, 14], 29: [8, 9, 14], 30: [12, 14], 32: [13, 14],
  33: [14, 15], 54: [14, 16], 55: [14, 17], 56: [14, 18],
  57: [19], 58: [24], 61: [14, 20], 63: [21], 68: [22],
  70: [11, 14], 80: [23], 82: [25],
  12: [4, 18, 24], 13: [2, 3], 14: [8, 9], 15: [7, 14, 15, 20], 19: [0, 6],
  27: [2], 31: [12, 14], 64: [21], 69: [22], 71: [1],
  72: [10], 73: [11], 74: [5], 75: [13], 76: [16],
  77: [17], 78: [19], 81: [23], 83: [25],
};


const ITEM_WEAPON_JOBS = {
  4495: [54, 16],
  4821: [55, 17],
  4822: [55, 17],
  4823: [55, 17],
  4824: [55, 17],
  4825: [55, 17],
  4826: [55, 17],
  4827: [55, 17],
  4828: [55, 17],
  4829: [55, 17],
  4830: [55, 17],
  5593: [54, 16],
  5594: [55, 17],
  5595: [55, 17],
  5596: [55, 17],
  5889: [56, 18],
  5890: [56, 18],
  5891: [56, 18],
  5892: [56, 18],
  5893: [56, 18],
  5894: [56, 18],
  5895: [56, 18],
  5896: [56, 18],
  5897: [56, 18],
  5898: [56, 18],
  5899: [56, 18],
  5900: [56, 18],
  5901: [56, 18],
  5902: [56, 18],
  5903: [56, 18],
  5904: [56, 18],
  5905: [56, 18],
  5906: [56, 18],
  5907: [56, 18],
  5908: [56, 18],
  5909: [56, 18],
  5910: [56, 18],
  5911: [56, 18],
  5912: [56, 18],
  5913: [56, 18],
  5914: [56, 18],
  6006: [55, 17],
  6007: [55, 17],
  6008: [55, 17],
  6009: [55, 17],
  6010: [56, 18],
  6011: [56, 18],
  6012: [56, 18],
  6013: [56, 18],
  6014: [56, 18],
  6015: [56, 18],
  6016: [56, 18],
  6017: [56, 18],
  6744: [61, 20],
  6745: [61, 20],
  6746: [61, 20],
  6747: [61, 20],
  6748: [61, 20],
  6749: [61, 20],
  6750: [61, 20],
  6751: [61, 20],
  6752: [61, 20],
  6753: [61, 20],
  6754: [61, 20],
  6755: [61, 20],
  6756: [61, 20],
};

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
  if (!isWeaponJobAllowed(item, character)) return null;
  if (item && WEAPON_KINDS.has(Number(item.kind))) return 'weapon';
  
  if (item && SUB_WEAPON_KINDS.has(Number(item.kind))) return 'sub_weapon';
  const part = resolveItemPart(item);
  if (part == null) return null;
  return PART_TO_SLOT_KEY[part] || null;
}

export function isWeaponJobAllowed(item, character) {
  if (character?.job == null) return true;
  const jobs = WEAPON_JOBS[Number(item?.kind)];
  if (!jobs) return true;
  const exception = ITEM_WEAPON_JOBS[Number(item?.id)];
  const listed = exception?.[0] === Number(item?.kind) ? exception.slice(1) : jobs;
  const explicit = item?.req?.jobType === 3 && item.req.jobs?.length ? item.req.jobs : listed;
  return explicit.map(Number).includes(Number(character.job));
}
