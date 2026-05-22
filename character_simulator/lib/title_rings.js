

export const SOLO_EQUIP_RING_IDS = new Set([
  
  2550,  
  4406,  
  4480,  
  4497,  
  4532,  
  4533,  
  4534,  
  4535,  
  4536,  
  4537,  
  4538,  
  4539,  
  4540,  
  4698,  
  4699,  
  4700,  
  4819,  
  4842,  
  4843,  
  4844,  
  4845,  
  5735,  
  5772,  
  5868,  
  6967,  
  6968,  
  7180,  
  7181,  
  7182,  
  7183,  
  8029,  
  8030,  
  8241,  
  8242,  
  8329,  
  8360,  
  8361,  
  8367,  
  8766,  
  8818,  
  8819,  
  8958,  
  10274, 
  10356, 
  10357, 
  10810, 
  10935, 
  11037, 
  11038, 
  11621, 
  11622, 
  12458, 

  10362, 
  10363, 
  10364, 
  10365, 
  10366, 
]);

export function isSoloEquipRing(itemOrId) {
  if (itemOrId == null) return false;
  if (typeof itemOrId === 'number') return SOLO_EQUIP_RING_IDS.has(itemOrId);
  if (typeof itemOrId === 'object' && itemOrId.id != null) {
    return SOLO_EQUIP_RING_IDS.has(Number(itemOrId.id));
  }
  return false;
}
