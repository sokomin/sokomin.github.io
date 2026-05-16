// abilities.js — HP / CP / 攻撃力 / 防御力 の能力値計算
//
// 公開 API:
//   computeAbilities(character, finalStats, equippedItems, loader) → {
//     hpMax, cpMax, atkMin, atkMax, def, weaponName
//   }
//
// 計算式 (公開仕様 sokomin.github.io/information/player_status.html 準拠):
//
//   HP  = (ベースHP定数 + Lv + HP連動ステ) × (1 + hp%/100) + hpFlat
//   CP  = (ベースCP定数 + Lv + CP連動ステ) × (1 + cp%/100) + cpFlat
//   def = (装備防御力合計 × (1 + def%/100) + defFlat) × (1 + HP連動ステ/100)
//
//   - ベースHP/CP定数: 職業ごとの定数 (master.jobs の数値カラム)
//   - HP連動ステ: 通常 = 健康 (con)、 ウルフマンは カリスマ (chs) に swap
//   - CP連動ステ: 通常 = **カリスマ (chs)** (知識/知恵 ではない)、 ウルフマンは健康 (con)
//   - 装備防御力合計: equippedItems の item.combat.def の合計 (武器以外)
//
// 攻撃力は本来多軸式 (atk[0]/[4]/[6]/[125]/[7]) で複雑なため、 現状は
// 「武器 atk + atkMin/MaxFlat + ステ係数」 の近似式で代用している。

import { getEffectiveLv, PRIMARY_STAT_IDS } from './character.js';

const STAT_KEYS = PRIMARY_STAT_IDS;

/**
 * 職業ごとの stat index リマップテーブル。
 * デフォルトは identity [0..6]、 ウルフマン (job=5) のみ swap (物理/魔法系を入れ替え)。
 * @param {number} jobId
 * @returns {number[]}
 */
function getJobStatRemap(jobId) {
  if (Number(jobId) === 5) return [3, 4, 5, 0, 1, 2, 6];
  return [0, 1, 2, 3, 4, 5, 6];
}

/**
 * master.jobs から職業ごとのベース HP/CP 定数を取得。
 * @param {Object} loader
 * @param {number} jobId
 * @returns {{ baseHp: number, baseCp: number }}
 */
function getJobConsts(loader, jobId) {
  const j = loader && loader.master && loader.master.jobs && loader.master.jobs[String(jobId)];
  const baseHp = (Array.isArray(j) && Number.isFinite(j[6])) ? j[6] : 0;
  const baseCp = (Array.isArray(j) && Number.isFinite(j[7])) ? j[7] : 0;
  return { baseHp, baseCp };
}

/**
 * 能力値を計算する。
 *
 * @param {Object} character           Character (Lv / job / stats.equipped を使う)
 * @param {Object} finalStats          finalizeStats 戻り値 { base, equipped, layers }
 * @param {{inv: Object, item: Object}[]} equippedItems  装着中アイテム (combat / def 取得用)
 * @param {Object} [loader]            getLoader() 戻り値
 */
export function computeAbilities(character, finalStats, equippedItems, loader) {
  const jobId = Number(character.job) || 0;
  const Lv = getEffectiveLv(character);
  const { baseHp, baseCp } = getJobConsts(loader, jobId);
  const statRemap = getJobStatRemap(jobId);

  const eq = (finalStats && finalStats.equipped) || {};
  const hpStat  = numOrZero(eq[STAT_KEYS[statRemap[2]]]);  // 通常 = con (健康)
  const cpStat  = numOrZero(eq[STAT_KEYS[statRemap[5]]]);  // 通常 = chs (カリスマ)
  const defStat = hpStat;                                  // 防御も HP-driving と同じ stat を使う
  const str = numOrZero(eq.str);
  const agi = numOrZero(eq.agi);

  // 付与 op 経由で積まれた flat / percent
  const hpFlat       = numOrZero(eq.hp);
  const hpPercent    = numOrZero(eq.hpPercent);
  const cpFlat       = numOrZero(eq.cp);
  const cpPercent    = numOrZero(eq.cpPercent);
  const defFlat      = numOrZero(eq.def);
  const defPercent   = numOrZero(eq.defPercent);
  const atkMinFlat   = numOrZero(eq.atkMinFlat);
  const atkMaxFlat   = numOrZero(eq.atkMaxFlat);

  // === HP / CP ===
  const hpMax = Math.floor((baseHp + Lv + hpStat) * (1 + hpPercent / 100) + hpFlat);
  const cpMax = Math.floor((baseCp + Lv + cpStat) * (1 + cpPercent / 100) + cpFlat);

  // === 攻撃力 (近似式: 武器 atk + atkMin/MaxFlat + ステ係数) ===
  let weaponName = '';
  let weaponAtkMin = 0, weaponAtkMax = 0;
  for (const { inv, item } of (equippedItems || [])) {
    if (inv && inv.equippedSlot === 'weapon' && item && item.combat) {
      weaponName = item.name || '';
      weaponAtkMin = numOrZero(item.combat.atkMin);
      weaponAtkMax = numOrZero(item.combat.atkMax);
      break;
    }
  }
  // 攻撃ステ: アーチャー / ランサー は敏捷主、 それ以外は力主
  const atkStatValue = (jobId === 2 || jobId === 3) ? agi : str;
  const atkBonus = Math.floor(atkStatValue * 0.5);
  const atkMin = weaponAtkMin + atkMinFlat + atkBonus;
  const atkMax = weaponAtkMax + atkMaxFlat + atkBonus;

  // === 防御力 ===
  // def = (itemDefSum × (1 + def%/100) + defFlat) × (1 + defStat/100)
  let itemDefSum = 0;
  for (const { inv, item } of (equippedItems || [])) {
    if (!inv || !inv.equippedSlot) continue;
    if (inv.equippedSlot === 'weapon') continue;
    if (item && item.combat && Number.isFinite(item.combat.def)) {
      itemDefSum += Number(item.combat.def) || 0;
    }
  }
  const def = Math.floor(
    (itemDefSum * (1 + defPercent / 100) + defFlat) * (1 + defStat / 100)
  );

  return {
    hpMax,
    cpMax,
    atkMin,
    atkMax,
    def,
    weaponName,
  };
}

function numOrZero(v) {
  if (v == null || Number.isNaN(Number(v))) return 0;
  return Number(v);
}
