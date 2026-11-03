import { getLoader } from './item_api.js';
import { inverseShopNative, shopPlain } from './market_shop_native.js';
import { shopEffectResolver, shopEffectText } from './market_shop_effects.js';
import { parseShopNxEffect } from './market_shop_nx_options.js';

const fail=message=>{throw Error(message);};
const caches=new WeakMap();
function baseLine(template,text){
  const ranges=[];
  const pattern=template.replace(/\[(-?\d+)~(-?\d+)\]/g,(_,a,b)=>{ranges.push([Number(a),Number(b)]);return`[${ranges.length-1}]`;});
  return inverseShopNative(pattern,ranges,text)!==null;
}
function nonstandardSlot(text,loader){
  let cache=caches.get(loader);if(!cache){cache=new Map();caches.set(loader,cache);}if(cache.has(text))return structuredClone(cache.get(text));
  const matches=[];
  for(const option of loader.nonstandard.options){
    const template=option.name.replace(/\[n([%％]?)\]/g,(_,unit)=>`[0${unit}]`);
    const values=inverseShopNative(shopEffectText(template),[[option.min,option.max]],shopEffectText(text));
    if(!values)continue;
    const slot={source:'nonstandard.base',nsName:option.name,nsTier:option.tier,nsMin:option.min,nsMax:option.max,value:values[0]};
    for(const key of ['familyId','statId','stats','isDisplayOnly'])if(option[key]!=null)slot[key]=option[key];
    matches.push({slot,option:{key:option.key,name:option.name,tier:option.tier,value:values[0]}});
  }
  const distinct=new Map(matches.map(row=>[JSON.stringify(row),row]));
  if(distinct.size!==1){
    const effect=shopEffectResolver(loader)(text);
    if(effect&&Number.isFinite(effect.value)){const row={slot:{...effect,source:'nonstandard.base',nsName:text,nsTier:null,value:effect.value},option:{name:text,value:effect.value}};cache.set(text,row);return structuredClone(row);}
  }
  if(distinct.size!==1)fail('非規格オプションの効果・値を復元できません: '+text);
  const row=[...distinct.values()][0];cache.set(text,row);return structuredClone(row);
}
export function shopNonstandardEntry(detail,record,groups,loader){
  if(!record.nonstandard||!loader.nonstandard?.items?.[record.id])fail('非規格装備の定義がありません');
  
  let base=groups.get('基本オプション')||[];
  const expected=(record.nonstandard.baseLines||[]).filter(line=>!/^攻撃力 |^射程距離 /.test(line)),corrections=[];
  if(base.length!==expected.length)fail('非規格装備の基本効果が一致しません');
  base=base.map((line,i)=>{
    if(baseLine(expected[i],line.text))return line;
    if(/\[.*?~.*?\]/.test(expected[i]))fail('非規格装備の基本効果が一致しません');
    corrections.push({index:i,opId:null,scope:'nonstandard.base',observed:line.text,expected:expected[i]});
    return{...line,text:expected[i]};
  });
  const lines=groups.get('非規格オプション')||[];
  if(lines.length>5||!Array.isArray(detail.nonstandard.effects)||lines.length!==detail.nonstandard.effects.length||lines.some((l,i)=>shopPlain(l.text)!==shopPlain(detail.nonstandard.effects[i])))fail('非規格オプションの明細が一致しません');
  const slots=lines.map(line=>nonstandardSlot(line.text,loader));
  const refine=groups.get('錬成オプション')||[];
  if(!detail.nx||refine.length!==detail.nx.available||!Array.isArray(detail.nx.slots)||detail.nx.slots.length!==refine.length||refine.length>4||!Number.isInteger(detail.nx.opened)||detail.nx.opened<0||detail.nx.opened>refine.length)fail('非規格装備の錬成状態が不正です');
  const nx=refine.map((line,i)=>{
    const source=detail.nx.slots[i];
    if(line.slot!==i+1||line.active!==(i<detail.nx.opened)||line.slot!==source.slot||line.active!==source.active||shopPlain(line.text)!==shopPlain(source.text))fail('非規格装備の錬成明細が一致しません');
    const effect=parseShopNxEffect(line.text,loader);
    if(!effect)fail('非規格装備の錬成効果を復元できません: '+line.text);
    return{slot:i,...effect,text:line.text};
  });
  const entry={customBaseOps:slots.map(row=>row.slot),nonstandard:{grade:lines.length>=3?'ult':lines.length?'dx':'normal',slotCount:lines.length,ops:slots.map(row=>row.option),openOps:[],openConverter:''},nxActive:true,nxUnlockedCount:detail.nx.opened,nxAvailableCount:refine.length,shopObservedNx:nx};
  entry.shopNonstandard={base:base.map(row=>row.text),effects:lines.map(row=>row.text)};
  if(corrections.length)entry.shopGameCorrections=corrections;
  return entry;
}
export function restoreShopNonstandard(inv,entry,loader=getLoader()){
  if(!entry.shopNonstandard)return inv;
  const record=loader.nonstandard?.items?.[inv.itemId],saved=entry.shopNonstandard;
  const expected=record?.nonstandard.baseLines.filter(line=>!/^攻撃力 |^射程距離 /.test(line));
  if(!record||!Array.isArray(saved.base)||!Array.isArray(saved.effects)||saved.effects.length>5||saved.base.length!==expected.length||saved.base.some((text,i)=>typeof text!=='string'||!baseLine(expected[i],text)))fail('保存された非規格装備が不正です');
  const slots=saved.effects.map(text=>nonstandardSlot(text,loader));
  inv.customBaseOps=slots.map(row=>row.slot);
  inv.nonstandard={grade:slots.length>=3?'ult':slots.length?'dx':'normal',slotCount:slots.length,ops:slots.map(row=>row.option),openOps:[],openConverter:''};
  inv.shopNonstandard={base:saved.base.slice(),effects:saved.effects.slice()};
  return inv;
}
export function serializeShopNonstandard(snapshot,inventory){
  for(const entry of snapshot.inventory||[]){const saved=inventory.get(entry.slotIndex)?.shopNonstandard;if(saved)entry.shopNonstandard=structuredClone(saved);}
}
