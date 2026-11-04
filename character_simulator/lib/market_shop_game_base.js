import { formatOpText } from './op_text_formatter.js';
import { nativeOptionExtra } from './native_option_defs.js';
import { shopNativeTemplate } from './market_shop_effects.js';

export function fixedShopGameValues(slot, loader) {
  if (!['base','op'].includes(slot.slotKind)) return null;
  const template=shopNativeTemplate(loader,slot),values=slot.vals;
  if(!template||!Array.isArray(values)||!Number.isInteger(slot.opId))return null;
  for(const m of template.matchAll(/\[([+-]?)([^[]*?)([0-7])(\.1)?([%％]?)\]/g)){
    if(m[2]==='F')continue;
    if(!Number.isFinite(values[Number(m[3])]))return null;
  }
  return values.map(v=>Array.isArray(v)?v.slice():v);
}

export function renderShopGameNative(slot,inv,loader) {
  if(slot.opId==null||slot.familyId!=null)return null;
  const nx=['nxop','long_nxop'].includes(slot.slotKind),pos=Number(slot.pos);
  const count=inv?.nxUnlockedCount??4;
  if(nx&&pos<count&&inv?.nxUnlockedOps?.[pos])return null;
  const template=shopNativeTemplate(loader,slot);
  if(!template)throw Error('ゲームの装備効果定義がありません: '+slot.opId);
  const text=formatOpText(template,slot.vals||[],nativeOptionExtra(slot.opId));
  return `<span class="idp-op${nx?' is-nx':''}${nx&&pos>=count?' is-sealed':''}">- ${text}${nx?` <span class="idp-nx-label">${pos<count?'[Nx]':'[封印中]'}</span>`:''}</span>`;
}

export function restoreShopGameCorrections(inv,entry){
  if(entry.shopGameCorrections==null)return inv;
  const rows=entry.shopGameCorrections;
  if(!Array.isArray(rows)||rows.length>40||rows.some(r=>!Number.isInteger(r.index)||r.index<0||!(Number.isInteger(r.opId)||r.opId===null&&r.scope==='nonstandard.base')||typeof r.observed!=='string'||r.observed.length>1000||typeof r.expected!=='string'||r.expected.length>2000))throw Error('ゲーム定義による補正記録が不正です');
  inv.shopGameCorrections=rows.map(r=>({...r}));return inv;
}
export function serializeShopGameCorrections(snapshot,inventory){
  for(const entry of snapshot.inventory||[]){const rows=inventory.get(entry.slotIndex)?.shopGameCorrections;if(rows)entry.shopGameCorrections=rows.map(r=>({...r}));}
}
