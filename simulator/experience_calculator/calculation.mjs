import { MIRROR_BANDS, MIRROR_MAPS, CREATURE_EXP, WISDOM_BANDS, CONSUMABLES, EXPERIENCE_BADGES } from './rules.mjs';

export class CalculationError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
function fail(code, message) { throw new CalculationError(code, message); }
function number(value, name, min = 0, max = 1e6, integer = false) {
  if (typeof value !== 'number' && typeof value !== 'string') fail('INPUT', `${name}を入力してください`);
  if (typeof value === 'string' && !/^\d+(?:\.\d{1,6})?$/.test(value)) fail('INPUT', `${name}は数値で入力してください`);
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) fail('INPUT', `${name}の範囲を確認してください`);
  if (!integer && !/^\d+(?:\.\d{1,6})?$/.test(String(n))) fail('INPUT', `${name}は小数6桁以内で入力してください`);
  return n;
}
const int = (v, name, min, max) => number(v, name, min, max, true);
const gcd = (a, b) => b ? gcd(b, a % b) : a;
function ratio(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  const g = gcd(n < 0n ? -n : n, d);
  return { n: n / g, d: d / g };
}
function decimal(value) {
  const [whole, fraction = ''] = String(value).split('.');
  return ratio(BigInt(whole + fraction), 10n ** BigInt(fraction.length));
}
const mul = (a, b) => ratio(a.n * b.n, a.d * b.d);
const add = (a, b) => ratio(a.n * b.d + b.n * a.d, a.d * b.d);
const percent = n => mul(decimal(n), ratio(1n, 100n));
const serialize = r => ({ numerator: String(r.n), denominator: String(r.d) });
const ceil = r => (r.n + r.d - 1n) / r.d;
function correctedBase(base, coefficient) {
  const value = ceil(mul(ratio(BigInt(base)), coefficient));
  return value < 1n ? 1n : value;
}
export function partyBaseExperience(base, members, bonusPercent = 0) {
  const count = int(members, 'PT人数', 1, 8);
  const amount = typeof base === 'bigint' ? base : BigInt(int(base, '基礎経験値', 1, 1000000000000000));
  if (amount < 1n || amount > 1000000000000000n) fail('INPUT', '基礎経験値の範囲を確認してください');
  const bonus = percent(number(bonusPercent, 'PT経験値補正', 0, 1000));
  if (count === 1) return amount;
  const bonusNumerator = amount * bonus.n;
  const denominator = bonus.d;
  const threshold = amount ** 3n * denominator ** 3n;
  let low = 0n;
  let high = amount + ceil(ratio(bonusNumerator, denominator));
  while (low < high) {
    const mid = (low + high) / 2n;
    const remainder = mid * denominator - bonusNumerator;
    if (remainder >= 0n && remainder ** 3n * BigInt(count) >= threshold) high = mid;
    else low = mid + 1n;
  }
  return low < 1n ? 1n : low;
}

export function wisdomBonus(wisdom, post2000 = false) {
  const n = int(wisdom, '知恵', 0, 1000000000);
  return WISDOM_BANDS.find(row => (post2000 ? Math.min(800, n) : n) <= row.max).bonus;
}
export function creatureBonus(level, advanced = false) {
  const n = int(level, 'クリーチャーパッシブLv', 0, 50);
  return n ? CREATURE_EXP[advanced ? 'advanced' : 'normal'][n - 1] : 0;
}
export function mirrorBase(mapId, monsterLevel, partyBoss = false) {
  const level = int(monsterLevel, '敵Lv', 1250, 1600);
  if (partyBoss) fail('MIRROR_PARTY_BOSS', 'パーティーボスは崩壊経験値の対象外です');
  const map = MIRROR_MAPS.find(x => x.id === Number(mapId));
  if (!map) fail('MAP', '崩壊マップを選択してください');
  const band = MIRROR_BANDS.find((b, i) => level >= b.min && (i === MIRROR_BANDS.length - 1 ? level <= b.max : level < b.max));
  const setting = band[map.kind];
  return { base: Number(ceil(ratio(BigInt(setting) * BigInt(level + 4), 10n))), setting, map, band };
}
export function ordinaryGap(monsterLevel, receiverLevels) {
  const mob = int(monsterLevel, '敵Lv', 1, 9999);
  const levels = receiverLevels.map(v => int(v, 'PTメンバーLv', 1, 2199));
  if (!levels.length || levels.length > 8) fail('PARTY', 'PT人数は1〜8人です');
  const count = BigInt(levels.length);
  const diff = BigInt(mob) * count - BigInt(levels.reduce((a, b) => a + b, 0));
  const abs = diff < 0n ? -diff : diff;
  return abs * 100n >= 7425n * count ? ratio(1n, 100n) : ratio(75n * count - abs, 75n * count);
}
export function postMonsterGap(gap) {
  int(Math.abs(gap), 'レベル差', 0, 9999);
  if (gap >= 21) return ratio(3n, 5n);
  if (gap >= 11) return ratio(4n, 5n);
  if (gap >= -9) return ratio(1n);
  if (gap >= -14) return ratio(2n, 5n);
  if (gap >= -19) return ratio(1n, 5n);
  return ratio(1n, 100n);
}
export function postPartyGap(gap) {
  int(gap, 'PT最高Lvとの差', 0, 2198);
  if (gap < 10) return ratio(1n);
  if (gap <= 15) return ratio(9n, 10n);
  if (gap <= 20) return ratio(7n, 10n);
  if (gap <= 25) return ratio(2n, 5n);
  if (gap <= 30) return ratio(1n, 20n);
  return ratio(1n, 100n);
}
export function eventBoost(profile, level) {
  if (profile === 'normal') return 1;
  if (profile === 'gold2024') {
    if (level > 1500) fail('GOLD_LEVEL', 'この開催年の対象Lvを超えています');
    return level <= 999 ? 50 : 4;
  }
  if (profile === 'gold2025' || profile === 'gold2026') {
    if (level > 1500) fail('GOLD_LEVEL', 'この開催年の対象Lvを超えています');
    return level <= 1250 ? 51 : 4.5;
  }
  fail('PROFILE', '計算条件を選択してください');
}
export function aurasBonus(level) {
  if (level <= 829) return 2;
  if (level <= 1250) return 10;
  return level <= 1500 ? 3 : 1;
}
function selectedConsumable(ids = [], profile = 'normal') {
  if (!Array.isArray(ids)) fail('CONSUMABLE', '消耗品を選択してください');
  if (ids.length > 1) fail('CONSUMABLE_STACK', '消耗品は1種類を選択してください');
  if (!ids.length) return undefined;
  const item = CONSUMABLES.find(row => row.id === ids[0]);
  if (!item || !item.profiles.includes(profile)) fail('CONSUMABLE_PROFILE', '消耗品と計算条件を合わせてください');
  return item;
}
export function consumableBonus(ids, profile) {
  return selectedConsumable(ids, profile)?.percent ?? 0;
}
function badgeBonus(o, level) {
  const badges = o.eventBadges ?? [];
  if (!Array.isArray(badges)) fail('BADGE', '経験値バッジを選択してください');
  const base = o.badge && level <= 600 ? 100 : 0;
  return badges.reduce((highest, id) => {
    const badge = EXPERIENCE_BADGES.find(item => item.id === id);
    if (!badge) fail('BADGE', '経験値バッジを選択してください');
    return level <= (badge.maxLevel ?? 1999) ? Math.max(highest, badge.percent) : highest;
  }, base);
}
function modifiers(x, consumable) {
  const o = x.bonuses ?? {};
  const result = {};
  const put = (key, value) => { result[key] = value; };
  put('wisdom', wisdomBonus(o.wisdom ?? 0));
  put('creature', creatureBonus(o.creatureLevel ?? 0));
  put('creatureAdvanced', creatureBonus(o.creatureAdvancedLevel ?? 0, true));
  put('creatureDrop', CREATURE_EXP.drop[int(o.creatureDropLevel ?? 0, 'ドロップ率パッシブLv', 0, 50) - 1] ?? 0);
  const stage = int(o.costumeStage ?? 0, 'コスチューム強化', 0, 10);
  put('costume', o.costume ? 10 + stage : 0);
  const crestCount = int(o.crestCount ?? 0, '経験値デュアルクレスト数', 0, 5);
  const crestPercent = number(o.crestPercent ?? 0, 'クレスト経験値補正', 0, 1000);
  if (crestCount && !o.costume) fail('CREST_COSTUME', 'クレストを使う場合はコスチュームを選択してください');
  if (crestCount && crestPercent) fail('CREST_DUPLICATE', 'クレストの効果が重複しています');
  put('crest', crestPercent + crestCount * 20);
  put('potential', (o.potential5 ? 1 : 0) + (o.potential75 ? 1 : 0));
  const rings = o.experienceRings ?? [];
  if (!Array.isArray(rings) || rings.length > 2) fail('RINGS', '経験値指輪は2個までです');
  put('rings', rings.reduce((sum, lv) => sum + int(lv, '刻印Lv', 1, 30) + 5, 0));
  put('courageRing', o.courageRing ? 5 : 0);
  const rebirth = int(o.rebirth ?? 0, '転生回数', 0, 5);
  const biology = int(o.biologyLevel ?? 0, '生体学Lv', 0, 5);
  put('biology', !rebirth && x.playerLevel >= 200 ? 0 : biology * (5 + rebirth));
  put('flag', int(o.flagLevel ?? 0, 'ギルド旗Lv', 0, 5) * 5);
  put('returner', o.returner ? 200 : 0);
  put('aura', o.aura ? 500 : 0);
  put('badge', badgeBonus(o, x.playerLevel));
  put('carpet', x.profile !== 'normal' ? number(o.carpetPercent ?? 0, 'カーペット', 0, 5) : 0);
  const legacyFood = number(o.eventFoodPercent ?? 0, 'イベント消耗品', 0, 150);
  if (legacyFood && consumable) fail('CONSUMABLE_DUPLICATE', '消耗品の効果が重複しています');
  put('eventFood', legacyFood);
  return result;
}
export function calculate(input) {
  if (!input || typeof input !== 'object') fail('INPUT', '条件を入力してください');
  const playerLevel = int(input.playerLevel, 'キャラLv', 1, 2199);
  const monsterLevel = int(input.monsterLevel, '敵Lv', 1, 9999);
  const kills = int(input.kills ?? 1, '討伐数', 1, 1000000000);
  const profile = input.profile ?? 'normal';
  if (profile === 'post2000' ? playerLevel < 2000 : playerLevel >= 2000) fail('LEVEL_PROFILE', 'キャラLvと計算条件を合わせてください');
  const partyLevels = input.partyLevels ?? [playerLevel];
  if (!Array.isArray(partyLevels) || !partyLevels.length || partyLevels.length > 8) fail('PARTY', 'PT人数は1〜8人です');
  const levels = partyLevels.map(v => int(v, 'PTメンバーLv', 1, 2199));
  if (!levels.includes(playerLevel)) fail('PARTY_RECEIVER', 'PTに獲得者のLvを含めてください');
  const factors = [];
  const push = (name, value) => { factors.push({ name, value }); };
  let base;
  let breakdown;
  let ignored = [];
  let levelCoefficient;
  let berryMultiplier = ratio(0n);
  let partyExperiencePercent = 0;
  if (profile === 'post2000') {
    base = 60;
    if (!['postfield','manual','collapsed','quest'].includes(input.source)) fail('SOURCE', '狩場を選択してください');
    if (input.source !== 'postfield') return { perKill: '0', total: '0', base: 60, levelBase: '0', partyBase: '0', berryAdditional: serialize(ratio(0n)), multiplier: serialize(ratio(0n)), factors: [], breakdown: {}, ignored: [], zeroReason: 'field' };
    if (monsterLevel < 2000 || levels.some(v => v < 2000)) fail('POST_LEVEL', '専用狩場の敵LvとPTのLvを確認してください');
    const o = input.post ?? {};
    breakdown = {
      wisdom: wisdomBonus(o.wisdom ?? 0, true), nova: o.nova ? 25 : 0,
      appleMangoBerry: o.appleMangoBerry ? 5 : 0,
      flag: int(o.flagLevel ?? 0, '2000Lvギルド旗', 0, 5) * 5,
      crest: int(o.crestCount ?? 0, '伝承クレスト数', 0, 2) * 5,
      guildBuff: o.guildBuff ? 15 : 0, aura: o.aura ? 25 : 0,
      treasure: [0,25,35,50][int(o.treasureTier ?? 0, '宝箱段階', 0, 3)],
    };
    push('additional', add(ratio(1n), Object.values(breakdown).map(percent).reduce(add, ratio(0n))));
    push('bell', decimal(o.bell ? 1.5 : 1));
    push('hotTime', decimal(number(o.hotTime ?? 1, 'イベント倍率', 1, 1000000)));
    push('starBerry', ratio(o.starBerry ? 10n : 1n));
    push('devilHunt', ratio(o.devilHunt ? 15n : 1n));
    levelCoefficient = mul(postMonsterGap(monsterLevel - playerLevel), postPartyGap(Math.max(...levels) - playerLevel));
    ignored = Object.keys(input.bonuses ?? {});
  } else {
    const x = { ...input, profile, playerLevel };
    base = input.source === 'collapsed' ? mirrorBase(input.mapId, monsterLevel, input.partyBoss).base : int(input.baseExp, '基礎経験値', 1, 1000000000000000);
    if (!['manual', 'collapsed'].includes(input.source)) fail('SOURCE', '狩場を選択してください');
    const o = input.bonuses ?? {};
    if (o.partyEvent && o.partyExperiencePercent !== undefined) fail('PARTY_DUPLICATE', 'PT経験値補正の入力が重複しています');
    partyExperiencePercent = number(o.partyExperiencePercent ?? (o.partyEvent ? 50 : 0), 'PT経験値補正', 0, 1000);
    const consumable = selectedConsumable(o.consumables, profile);
    breakdown = modifiers(x, consumable);
    const portal = input.portal ?? 'none';
    if (!['none','sphere','sphere-kit','sphere-ult'].includes(portal)) fail('PORTAL', 'スフィアーを選択してください');
    push('A', decimal(eventBoost(profile, playerLevel)));
    push('B', ratio(BigInt({ none: 1, sphere: 2, 'sphere-kit': 3, 'sphere-ult': 4 }[portal])));
    push('C', ratio(o.treasure ? 3n : 1n));
    push('D', add(ratio(1n), Object.values(breakdown).map(percent).reduce(add, ratio(0n))));
    const eventMultiplier = number(input.eventMultiplier ?? 1, '経験値イベント', 1, 1000000);
    const fieldBoost = o.fieldBoost ?? '';
    if (!['', 'bell', 'red-balloon'].includes(fieldBoost) || (fieldBoost === 'bell' && profile === 'gold2026')) {
      fail('FIELD_BOOST', '計算条件に合う狩りの効果を選択してください');
    }
    push('event', decimal(Math.max(eventMultiplier, o.guildMaster && !fieldBoost ? 1.5 : 1)));
    if (fieldBoost) push('fieldBoost', ratio(fieldBoost === 'bell' ? 2n : 10n));
    push('auras', decimal(['gold2025', 'gold2026'].includes(profile) && o.auras ? aurasBonus(playerLevel) : 1));
    levelCoefficient = ordinaryGap(monsterLevel, levels);
    const berryType = o.berryType ?? 'sun';
    if (!['sun', 'apple-mango'].includes(berryType)) fail('BERRY', 'ベリーを選択してください');
    const sunBerryPercent = number(o.berryPercent ?? 0, 'サンベリー', 0, 1000);
    if (berryType === 'apple-mango' && sunBerryPercent) fail('BERRY_STACK', 'サンベリーとアップルマンゴーベリーはどちらか一方を選択してください');
    const primaryBerryPercent = berryType === 'apple-mango' ? 150 : sunBerryPercent;
    const activeBerryPercent = Math.max(primaryBerryPercent, o.anniversarySunBerry ? 500 : 0);
    const otherBerryPercent = (consumable?.percent ?? 0) + (o.lionBadge ? 100 : 0);
    berryMultiplier = add(percent(activeBerryPercent), percent(otherBerryPercent));
  }
  const levelBase = correctedBase(base, levelCoefficient);
  const partyBase = profile === 'post2000' ? levelBase : partyBaseExperience(levelBase, levels.length, partyExperiencePercent);
  const mainMultiplier = factors.reduce((v, f) => mul(v, f.value), ratio(1n));
  const berryAdditional = mul(ratio(partyBase), berryMultiplier);
  const raw = add(mul(ratio(partyBase), mainMultiplier), berryAdditional);
  const rounded = ceil(raw);
  const sokominLevelResidue = (levelBase * 65537n + 83177n) % 104729n;
  const minLevelResidue = (levelBase % 104729n * 65537n + 83177n) % 104729n;
  const perKill = (rounded < 1n ? 1n : rounded) + (sokominLevelResidue - minLevelResidue);
  const multiplier = mul(raw, ratio(1n, BigInt(base)));
  return { base, levelBase: String(levelBase), partyBase: String(partyBase), partyMembers: levels.length, partyExperiencePercent, levelCoefficient: serialize(levelCoefficient), berryAdditional: serialize(berryAdditional), perKill: String(perKill), total: String(perKill * BigInt(kills)), raw: serialize(raw), multiplier: serialize(multiplier),
    factors: factors.map(f => ({ name: f.name, ...serialize(f.value) })), breakdown, ignored };
}
