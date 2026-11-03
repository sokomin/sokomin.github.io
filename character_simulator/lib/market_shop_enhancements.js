import { resolveEquipSlot } from './slot_resolver.js';
import { BF_OPTIONS, BF_TIERS } from './bf_options.js';
import { shopEffectResolver,shopModelKey,shopEffectText } from './market_shop_effects.js';
import { getLoader } from './item_api.js';

const clean = value => String(value ?? '').normalize('NFKC').replace(/\s+/g, '');
const fail = message => { throw Error(message); };
const TIERS = { 下級: 'lower', 中級: 'middle', 上級: 'upper' };

const NATIVE_EFFECTS = {
  145: value => `魔法攻撃力増加${value}%`,
  31: value => `物理命中率+${value}%`,
};
const PET_EFFECTS = {
  '(召喚獣・ペット)攻撃速度': { familyId: 303, render: value => `同伴者の攻撃速度増加${value}%` },
  '(召喚獣・ペット)魔法致命打発動確率': { familyId: 686, render: value => `同伴者の魔法致命打確率(%)+${value}%` },
};
const seirenLabel=value=>shopEffectText(value).replace(/\((?:同伴者|ペット・召喚獣|召喚獣・ペット)\)/g,'同伴者の').replace(/同伴者(?!の)/g,'同伴者の').replace(/アンデット/g,'アンデッド').replace(/(人間|アンデッド・悪魔|動物・神獣)型からの(物理|魔法)攻撃ダメージ/g,'vs$1の被$2ダメージ').replace(/(人間|アンデッド・悪魔|動物・神獣)型(物理|魔法)/g,'vs$1の$2').replace(/・/g,'、').replace(/^(同伴者の)?クリティカルダメージ減少/g,'$1被物理致命打ダメージの減少').replace(/クリティカル/g,'致命打').replace(/(?<!物理)命中率/g,'物理命中率').replace(/最大体力/g,'最大HP').replace(/魔法の精度/g,'魔法精度').replace(/\([+%]?\)/g,'');
const BF_OBSERVED = [
  ['skill_lv', /^全スキルレベル\+([\d.]+)$/],
  ['mhp_drain', /^敵に与えた魔法ダメージのHP吸収\+([\d.]+)%$/],
  ['hp_drain', /^敵に与えたダメージのHP吸収\+([\d.]+)%$/],
  ['dbl_crit', /^物理ダブルクリティカルダメージ増加([\d.]+)%$/],
  ['reflect', /^受けたダメージ反射\+([\d.]+)%$/],
  ['cp_convert', /^被ダメージCP変換\+([\d.]+)%$/],
  ['white_pet_final_dmg', /^同伴者の最終攻撃力増加([\d.]+)%$/],
];
export const shopSeirenFamily = name => PET_EFFECTS[name.name]?.familyId ?? (name.familyId == null ? -1 : Number(name.familyId));

export async function loadShopSeirenData() {
  const response = await fetch(new URL('./data/seiren_options.json', import.meta.url));
  if (!response.ok) fail('製錬データを取得できません');
  const data = await response.json();
  if (!data?.parts) fail('製錬データが不正です');
  return data;
}

export function shopEnhancements(detail, record, groups, seirenData,loader) {
  const result = {};
  const stage = detail.smelting_level;
  if (!Number.isInteger(stage) || stage < 0 || stage > 15) fail('製錬段階が不正です');
  const smelting = groups.get(`製錬 +${stage}`);
  if (stage) {
    const thresholds = [1, 5, 10, 15].filter(n => n <= stage);
    if (!smelting || smelting.length !== thresholds.length) fail('製錬段階と効果数が一致しません');
    const part = seirenData?.parts?.[resolveEquipSlot(record)];
    if (!part) fail('装備部位の製錬データがありません');
    result.seirenStage = stage;
    result.seirenOps = smelting.map((line, index) => {
      const tier = TIERS[line.label], matches = [];
      for (const [ei, row] of (part[thresholds[index]] || []).entries()) {
        const value = row.tiers?.[tier]?.[stage - 1];
        if (!Number.isFinite(value)) continue;
        for (const [ni, name] of (row.names || []).entries()) {
          const familyId = shopSeirenFamily(name);
          const render = PET_EFFECTS[name.name]?.render || NATIVE_EFFECTS[familyId];
          const resolved=loader&&shopEffectResolver(loader)(line.text);
          const label=row.names[0]?.name.endsWith('型からの')&&ni>0?row.names[0].name+name.name:name.name;
          const labelMatch=[`${label}${value}%`,`${label}${value}`].some(text=>seirenLabel(text)===seirenLabel(line.text));
          const standard=render&&clean(render(value))===clean(line.text)||resolved&&shopModelKey(resolved,loader)!=null&&shopModelKey(resolved,loader)===shopModelKey({familyId},loader)&&resolved.value===value;
          if(!standard&&!labelMatch)continue;
          if(!standard&&labelMatch&&resolved){(result.shopObservedSeiren||=[]).push({index,text:line.text,label:line.label});matches.push({...resolved,source:'ui.seiren',seirenName:line.text,seirenTier:tier,displayOnly:!!resolved.isDisplayOnly});continue;}
          matches.push({ familyId, value, name: name.name,
            seirenName: name.name, seirenTier: tier,
            seirenSel: `ent:${ei}:nm:${ni}:tier:${tier}` });
        }
      }
      if(matches.length!==1)fail('製錬効果と装備部位・段階・等級が一致しません: '+line.text);
      return matches[0];
    });
  }
  const bf = groups.get('異界強化');
  if (bf) {
    if (bf.length !== 1 || !['weapon','neck','head','back_ear','waist','hand','body','foot'].includes(resolveEquipSlot(record))) fail('異界強化の効果数・装備部位が不正です');
    const text = clean(bf[0].text);
    const direct=BF_OBSERVED.map(([id,pattern])=>({id,match:text.match(pattern)})).find(row=>row.match);
    const match = text.match(/^敵の魔法の抵抗\(%\)-([\d.]+)%$/) || text.match(/^受けた魔法ダメージ吸収\+([\d.]+)%$/);
    if(direct) result.shopObservedBf={id:direct.id,value:Number(direct.match[1])};
    else if (match) result.shopObservedBf = { id: text.startsWith('受けた') ? 'magic_abs' : 'mresist_weak', value: Number(match[1]) };
    else {
      const limit=text.match(/^限界突破称号の(物理|魔法)ダメージ制限の超過量適用\(%\)増加([\d.]+)%$/);
      const effect=loader&&shopEffectResolver(loader)(bf[0].text);
      const choices=limit?BF_OPTIONS.filter(d=>d.id===(limit[1]==='物理'?'white_limit_phys':'white_limit_magic')):BF_OPTIONS.filter(d=>effect&&shopModelKey(effect,loader)===shopModelKey(d,loader));
      if(choices.length!==1)fail('異界強化の効果を復元できません');
      result.shopObservedBf={id:choices[0].id,value:limit?Number(limit[2]):effect.value};
    }

    restoreShopBf({}, result);
  }
  return result;
}

export function restoreShopBf(inv, entry) {
  if (entry.shopObservedBf == null) return inv;
  const { id, value } = entry.shopObservedBf;
  const def = BF_OPTIONS.find(row => row.id === id);
  const validRange = def && ['black','white'].some(grade => BF_TIERS.some(tier => {
    const range = def[grade]?.[tier];
    return range && value >= range.min && value <= range.max;
  }));
  if (!def || !Number.isSafeInteger(value) || !validRange) fail('異界強化の実測値が不正です');
  inv.shopObservedBf = { id, value };
  inv.bfop = { source: 'bfop', bfId: id, value };
  if(def.familyId!=null)inv.bfop.familyId=def.familyId;
  if(def.statId)inv.bfop.statId=def.statId;
  if(def.displayOnly)inv.bfop.isDisplayOnly=true;
  return inv;
}

export function serializeShopBf(snapshot, inventory) {
  for (const entry of snapshot.inventory || []) {
    const value = inventory.get(entry.slotIndex)?.shopObservedBf;
    if (value) { delete entry.bfop; entry.shopObservedBf = { ...value }; }
  }
}

export function restoreShopSeiren(inv,entry,loader=getLoader()){
  if(!entry.shopObservedSeiren)return inv;
  const rows=entry.shopObservedSeiren,seen=new Set(),count=[1,5,10,15].filter(n=>n<=inv.seirenStage).length;
  if(!Array.isArray(rows)||rows.length>count)fail('保存された製錬効果が不正です');
  inv.seirenOps||=[];
  inv.shopObservedSeiren=rows.map(row=>{
    const effect=typeof row.text==='string'&&shopEffectResolver(loader)(row.text);
    if(!Number.isInteger(row.index)||row.index<0||row.index>=count||seen.has(row.index)||!TIERS[row.label]||!effect||!Number.isFinite(effect.value)||effect.value<0)fail('保存された製錬効果が一致しません');
    seen.add(row.index);
    inv.seirenOps[row.index]={...effect,source:'ui.seiren',seirenName:row.text,seirenTier:TIERS[row.label],displayOnly:!!effect.isDisplayOnly};
    return{index:row.index,text:row.text,label:row.label};
  });
  return inv;
}
export function serializeShopSeiren(snapshot,inventory){
  for(const entry of snapshot.inventory||[]){const rows=inventory.get(entry.slotIndex)?.shopObservedSeiren;if(rows)entry.shopObservedSeiren=rows.map(row=>({...row}));}
}

export function renderShopBfEditor(inv, state, grade, tier, id, document) {
  for (const select of [grade, tier]) select?.querySelector('option[data-shop-observed]')?.remove();
  for (const select of [tier, id]) if (select) select.disabled = false;
  if (!inv?.shopObservedBf || state.shopBfEdited) return false;
  
  for (const select of [tier, id]) if (select) select.disabled = true;
  const observed = inv.shopObservedBf;
  for (const [select, label] of [[grade, '(未指定)'], [tier, `${observed.value}%`]]) {
    if (!select) continue;
    const option = document.createElement('option');
    option.value = 'observed'; option.textContent = label; option.dataset.shopObserved = '';
    select.appendChild(option); select.value = 'observed';
  }
  if (id) {
    id.replaceChildren();
    const option = document.createElement('option');
    option.value = observed.id; option.textContent = BF_OPTIONS.find(row => row.id === observed.id).name;
    id.appendChild(option); id.value = observed.id;
  }
  return true;
}
