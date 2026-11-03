import { formatOpText, formatValue } from './op_text_formatter.js';
import { nativeOptionExtra } from './native_option_defs.js';
export const shopPlain = value => String(value ?? '').replace(/<[^>]*>/g,'').replace(/&nbsp;|\\n/g,'').normalize('NFKC').replace(/[\s,]/g,'').replace(/(\d)\.0+(?=[^\d]|$)/g,'$1');
const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function inverseShopNative(template, values, text, opId) {
  const extra=nativeOptionExtra(opId);
  const indices=[...new Set([...template.matchAll(/\[([+-]?)([^[]*?)([0-7])(\.1)?([%％]?)\]/g)].filter(m=>m[2]!=='F').map(m=>Number(m[3])).filter(i=>Array.isArray(values[i])))];
  if (!indices.length) return shopPlain(formatOpText(template,values,extra))===shopPlain(text) ? values.slice() : null;
  const args=values.slice(),markers=[];
  for(const i of indices){args[i]=9000000+i*11110;markers.push({i,value:args[i]});}
  const variants=markers.flatMap(m=>[false,true].map(div=>({i:m.i,scale:div?10:1,text:shopPlain(formatValue(m.value,div))}))).sort((a,b)=>b.text.length-a.text.length);
  const rendered=shopPlain(formatOpText(template,args,extra)),rx=new RegExp(variants.map(v=>escape(v.text)).join('|'),'g'),captures=[];
  let pattern='',cursor=0;
  for(const match of rendered.matchAll(rx)){pattern+=escape(rendered.slice(cursor,match.index))+'(-?\\d+(?:\\.\\d+)?)';captures.push(variants.find(v=>v.text===match[0]));cursor=match.index+match[0].length;}
  pattern+=escape(rendered.slice(cursor));
  const match=shopPlain(text).match(new RegExp('^'+pattern+'$'));
  if(!match)return null;
  const observed=new Map();
  for(let n=0;n<captures.length;n++){
    const m=captures[n],v=Number(match[n+1])*m.scale,range=values[m.i];
    if(!Number.isFinite(v)||v<range[0]||v>range[1])return null;args[m.i]=v;
    if(observed.has(m.i)&&observed.get(m.i)!==v)return null;observed.set(m.i,v);
  }
  return shopPlain(formatOpText(template,args,extra))===shopPlain(text)?args:null;
}
export function shopItemRecord(inv,record) {
  if(!inv?.shopNativeSlots?.length&&!inv?.shopNonstandard)return record;
  const slots=record.opSlots.map(slot=>({...slot,vals:slot.vals?.slice()}));
  for(const row of inv.shopNativeSlots||[]){
    const slot=slots[row.index];if(!slot||slot.opId!==row.opId||row.values.length!==slot.vals?.length||row.values.some((v,i)=>Array.isArray(slot.vals[i])?Array.isArray(v)?JSON.stringify(v)!==JSON.stringify(slot.vals[i]):v<slot.vals[i][0]||v>slot.vals[i][1]:v!==slot.vals[i]))throw Error('保存装備の効果定義が一致しません');
    slot.vals=row.values.map(v=>Array.isArray(v)?v.slice():v);
  }
  const result={...record,opSlots:slots};
  if(inv.shopNonstandard){let i=0;result.nonstandard={...record.nonstandard,baseLines:record.nonstandard.baseLines.map(line=>/^攻撃力 |^射程距離 /.test(line)?line:inv.shopNonstandard.base[i++])};}
  return result;
}
export function restoreShopNative(inv,entry){
  if(entry.shopNativeSlots){
    const rows=entry.shopNativeSlots,seen=new Set();
    if(!Array.isArray(rows)||rows.length>40)throw Error('保存装備の補正値が不正です');
    for(const row of rows){if(!Number.isInteger(row.index)||row.index<0||seen.has(row.index)||!Number.isInteger(row.opId)||!Array.isArray(row.values)||row.values.length>8||row.values.some(v=>Array.isArray(v)?v.length!==2||v.some(n=>!Number.isFinite(n)||Math.abs(n)>1000000):!Number.isFinite(v)||Math.abs(v)>1000000))throw Error('保存装備の補正値が不正です');seen.add(row.index);}
    inv.shopNativeSlots=structuredClone(rows);
  }
  if(entry.shopQuantity!=null){if(!Number.isSafeInteger(entry.shopQuantity)||entry.shopQuantity<1)throw Error('保存された個数が不正です');inv.shopQuantity=entry.shopQuantity;}
  return inv;
}
export function preserveShopNative(built,inv,record){
  restoreShopNative(built,inv);
  if(built.shopNativeSlots)built.shopNativeSlots=built.shopNativeSlots.filter(row=>{const slot=record.opSlots[row.index];return slot?.slotKind!=='base'||built.revisions[slot.pos]===inv.revisions[slot.pos];});
  if(inv.shopNonstandard)built.shopNonstandard=structuredClone(inv.shopNonstandard);
}
export function serializeShopNative(snapshot,inventory){
  for(const entry of snapshot.inventory||[]){const inv=inventory.get(entry.slotIndex);for(const key of ['shopNativeSlots','shopQuantity'])if(inv?.[key]!=null)entry[key]=structuredClone(inv[key]);}
}
