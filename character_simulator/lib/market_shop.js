import { formatOpText } from './op_text_formatter.js';
import { parseShopUrl } from './market_shop_url.js';
import { loadShopSeirenData, shopEnhancements, restoreShopBf,restoreShopSeiren } from './market_shop_enhancements.js';
import { getSetOpDef } from './set_op_bonus.js';
import { parseShopNxEffect, restoreShopNx } from './market_shop_nx_options.js';
import { inverseShopNative, restoreShopNative } from './market_shop_native.js';
import { shopNativeTemplate,shopEffectResolver,shopEffectText,shopModelKey } from './market_shop_effects.js';
import { shopNonstandardEntry,restoreShopNonstandard } from './market_shop_nonstandard.js';
import { fixedShopGameValues,restoreShopGameCorrections,renderShopGameNative } from './market_shop_game_base.js';
export { renderShopGameNative,restoreShopGameCorrections,serializeShopGameCorrections } from './market_shop_game_base.js';
export { restoreShopNonstandard,serializeShopNonstandard } from './market_shop_nonstandard.js';
export { shopItemRecord, restoreShopNative, serializeShopNative,preserveShopNative } from './market_shop_native.js';
export { restoreShopNx, serializeShopNx, preserveShopNx, renderShopNxSelection } from './market_shop_nx_options.js';
export { restoreShopBf, serializeShopBf, renderShopBfEditor, shopSeirenFamily,restoreShopSeiren,serializeShopSeiren } from './market_shop_enhancements.js';
export { parseShopUrl, shopSearchUrl, SHOP_SERVERS } from './market_shop_url.js';
const clean = value => String(value ?? '').replace(/<[^>]*>/g, '').normalize('NFKC').replace(/\s+/g, '');
const fail = message => { throw Error(message); };
export function validateShopDetail(detail, source) {
  if (detail?.schema !== 1 || detail.id !== source.id || detail.server !== source.server || detail.date !== source.date || detail.item_key !== source.key ||
      !Number.isInteger(detail.item_id) || detail.item_id <= 0 || typeof detail.name !== 'string' || !detail.name || typeof detail.display_name !== 'string' ||
      !Array.isArray(detail.groups) || detail.groups.length > 12 || !Number.isSafeInteger(detail.quantity) || detail.quantity <= 0 ||
      !Number.isSafeInteger(detail.price?.amount) || detail.price.amount < 0 || !['ingot','gold'].includes(detail.price.currency)) fail('商品詳細の識別子・価格・個数が一致しません');
  if (detail.groups.some(g => typeof g.name !== 'string' || !Array.isArray(g.lines) || g.lines.length > 50 || g.lines.some(l => typeof l.text !== 'string' || l.text.length > 1000))) fail('商品オプションが不正です');
  const gold = detail.price.amount * (detail.price.currency === 'ingot' ? 100000000 : 1);
  if (!Number.isSafeInteger(gold)) fail('価格が大きすぎます');
  return gold;
}
export function honText(gold) {
  if (!Number.isSafeInteger(gold) || gold < 0) fail('価格が不正です');
  const whole = Math.floor(gold / 100000000), rest = gold % 100000000;
  return whole.toLocaleString('ja-JP') + (rest ? '.' + String(rest).padStart(8,'0').replace(/0+$/, '') : '') + '本';
}

function prefixOption(line, loader) {
  const families = loader.optionPrefix?.families;
  const found = [];
  let named=false;
  for (const [key, family] of Object.entries(families || {})) for (const tier of family.tiers || []) {
    if (clean(tier.name) !== clean(line.label)) continue;
    named=true;
    if (Number(key) === 869) {
      const observed=clean(line.text).match(/^最終全ての状態抵抗\(%\)\+(\d+)%$/);
      if(observed&&Number(observed[1])>=1&&Number(observed[1])<=5)found.push({statId:'finalStatusResist',rowId:tier.id,name:tier.name,value:Number(observed[1])});
      continue;
    }
    if (family.enhance) {
      const ranges=[];
      const template=tier.effect.replace(/\[(-?\d+)~(-?\d+)([%％]?)\]/g,(_,a,b,unit)=>{ranges.push([Number(a),Number(b)]);return `[0${unit}]`;});
      const observed=Number(key)===886?line.text.replace('武器ダメージ増加','攻撃力増加'):line.text;
      const values=inverseShopNative(shopEffectText(template),ranges,shopEffectText(observed));
      if (values && ranges.length===1 && Number.isInteger(values[0])) found.push({familyId:Number(key),rowId:tier.id,name:tier.name,value:values[0]});
      continue;
    }
    if (tier.gradeClass === 'set' && getSetOpDef(tier.id)?.name === tier.name && clean(line.text) === 'セットオプション') {
      found.push({ familyId: Number(key), rowId: tier.id, name: tier.name, value: 0 });
      continue;
    }
    
    if (Number(key) === 103) {
      const native = clean(line.text).match(/^スキルレベル\+(\d+)\((\d+)系列職業\)$/);
      if (!native) continue;
      const jobName = loader.master?.specialTokens?.jobtype?.[native[2]]?.replace(/―/g,'ー');
      const amount = Number(native[1]);
      const expected = clean(tier.effect).replace(/\[(\d+)~(\d+)\]/g, (_,a,b) => amount >= Number(a) && amount <= Number(b) ? String(amount) : 'invalid');
      if (!jobName || expected !== clean(jobName + ' スキルレベル +' + amount)) continue;
      const jobs = Object.entries(loader.master?.jobs || {}).filter(([,job]) => Array.isArray(job) && clean(job[1]) === clean(jobName));
      if (jobs.length !== 1) continue;
      found.push({ familyId: 103, rowId: tier.id, name: tier.name, jobIdx: Number(jobs[0][0]), value: amount });
      continue;
    }
    {
      const ranges=[];let axis=0;
      const template=tier.effect.replace(/\[(-?\d+(?:\.\d+)?)~(-?\d+(?:\.\d+)?)([%％]?)\]/g,(_,a,b,unit)=>{ranges.push([Number(a),Number(b)]);return`[${axis++}${unit}]`;});
      const actual=inverseShopNative(shopEffectText(template),ranges,shopEffectText(line.text));
      if(actual&&(family.stat?.id||family.stat?.stats||family.enhance)){
        const option={familyId:Number(key),rowId:tier.id,name:tier.name};
        if(family.stat?.layer==='lvLinked'){
          const ratio=clean(line.text).match(/\+([\d.]+)\/レベル([\d.]+)/);if(!ratio)continue;option.addValue=Number(ratio[1]);option.divisor=Number(ratio[2]);
        }else option.value=ranges.length?actual[0]:Number(line.text.match(/-?\d+(?:\.\d+)?/)?.[0]??1);
        found.push(option);continue;
      }
      const observed=shopEffectResolver(loader)(line.text);
      const validObserved=family.stat?.layer!=='lvLinked'&&observed?.value!=null&&(ranges.length===1?observed.value>=ranges[0][0]&&observed.value<=ranges[0][1]:ranges.length===0&&Number(tier.effect.match(/-?\d+(?:\.\d+)?/)?.[0]??1)===observed.value);
      if(validObserved&&shopModelKey(observed,loader)!=null&&shopModelKey(observed,loader)===shopModelKey({familyId:Number(key)},loader)) {found.push({...observed,familyId:Number(key),rowId:tier.id,name:tier.name});continue;}
    }
    const ranges = [];
    const effect = clean(tier.effect);
    let cursor = 0, pattern = '';
    for (const m of effect.matchAll(/\[(-?\d+(?:\.\d+)?)~(-?\d+(?:\.\d+)?)\]/g)) {
      pattern += effect.slice(cursor,m.index).replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '(-?\\d+(?:\\.\\d+)?)';
      ranges.push([Number(m[1]), Number(m[2])]); cursor = m.index + m[0].length;
    }
    pattern += effect.slice(cursor).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const matched = clean(line.text).match(new RegExp('^' + pattern + '$'));
    if (!matched || ranges.some(([a,b],i) => Number(matched[i+1]) < a || Number(matched[i+1]) > b)) continue;
    if (!family.stat?.id && !family.stat?.stats) continue;
    const option = { familyId: Number(key), rowId: tier.id, name: tier.name };
    if (family.stat.layer === 'lvLinked') {
      const ratio = clean(line.text).match(/\+([\d.]+)\/レベル([\d.]+)/);
      if (!ratio || Number(ratio[2]) <= 0) continue;
      option.addValue = Number(ratio[1]); option.divisor = Number(ratio[2]);
    } else {
      if (ranges.length > 1) continue;
      const nums = clean(line.text).match(/-?\d+(?:\.\d+)?/g);
      if (!nums || (!ranges.length && nums.length !== 1)) continue;
      option.value = ranges.length ? Number(matched[1]) : Number(nums[0]);
    }
    found.push(option);
  }

  const distinct=new Map();
  for(const option of found){const f=families[option.familyId];const key=JSON.stringify([shopModelKey(option,loader)||option.familyId,option.value,option.addValue,option.divisor,option.jobIdx,f?.tiers.find(t=>t.id===option.rowId)?.gradeClass==='set'?option.rowId:null]);if(!distinct.has(key))distinct.set(key,option);}
  if(!named&&!distinct.size&&!/ステータスを/.test(line.text)){const observed=shopEffectResolver(loader)(line.text);if(observed?.familyId!=null&&families[observed.familyId]?.stat&&typeof line.label==='string'&&/^\[[^\[\]]{1,100}\]$/.test(line.label))return{...observed,name:line.label};}
  if (distinct.size !== 1) fail('この称号オプションは正確に復元できません: ' + (line.label || line.text));
  return [...distinct.values()][0];
}

export function detailToShopEntry(detail, record, loader, seirenData) {
  if (!record || record.id !== detail.item_id || clean(record.name) !== clean(detail.name)) fail('装備データが一致しません');
  if (!Number.isSafeInteger(detail.quantity) || detail.quantity < 1) fail('商品の個数が不正です');
  if (detail.notes?.length) fail('この商品の強化は取り込みに未対応です');
  const allowed = new Set(['基本オプション','称号オプション','固有オプション','Nx解放オプション']);
  if (detail.smelting_level > 0) allowed.add(`製錬 +${detail.smelting_level}`);
  allowed.add('異界強化');
  if(detail.nonstandard){allowed.add('非規格オプション');allowed.add('錬成オプション');}
  if (detail.groups.some(g => !allowed.has(g.name))) fail('この商品の追加効果は取り込みに未対応です');
  const groups = new Map();
  for (const group of detail.groups) {
    if (groups.has(group.name)) fail('商品オプションが重複しています');
    groups.set(group.name, group.lines);
  }
  const entry = { itemId: record.id, revisions: [null,null,null], ops: [], nxActive: !!detail.nx, nxUnlockedCount: 0 };
  const base = [...(groups.get('基本オプション') || [])];
  const unique = [...(groups.get('固有オプション') || [])];
  const nx = [...(groups.get('Nx解放オプション') || [])];

  
  const carving=base.find(line=>/^刻印(?:\[carving_name\])?レベル\d+$/.test(clean(line.text)));
  let carvingLevel=null;
  if(carving&&(record.opSlots||[]).some(slot=>slot.slotKind==='base'&&[333,773].includes(slot.opId))){
    carvingLevel=Number(clean(carving.text).match(/レベル(\d+)$/)[1]);
    if(!Number.isInteger(carvingLevel)||carvingLevel<1||carvingLevel>30)fail('刻印レベルが不正です');
    entry.incusedRingLv=carvingLevel;
  }
  if (detail.nx && !detail.nonstandard) {
    if (!Number.isInteger(detail.nx.opened) || !Number.isInteger(detail.nx.available) || detail.nx.opened < 0 || detail.nx.opened > detail.nx.available || detail.nx.available > 4 || nx.length !== detail.nx.available) fail('Nx解放状態が不正です');
    entry.nxUnlockedCount = detail.nx.opened;
    entry.nxAvailableCount = detail.nx.available;
    if (!Array.isArray(detail.nx.slots) || detail.nx.slots.length !== nx.length || detail.nx.slots.some((slot,i) => slot.slot !== nx[i].slot || slot.active !== nx[i].active || clean(slot.text) !== clean(nx[i].text))) fail('Nx枠の詳細が一致しません');
  } else if (nx.length && !detail.nonstandard) fail('Nx解放状態が不足しています');
  if(detail.nonstandard)Object.assign(entry,shopNonstandardEntry(detail,record,groups,loader));
  for (const slot of detail.nonstandard?[]:record.opSlots || []) {

    if (carvingLevel != null && slot.slotKind === 'op' && slot.opId === 774 &&
        record.opSlots.some(s=>s.slotKind==='base'&&s.opId===773&&s.vals?.[1]===slot.vals?.[1])) continue;
    
    if (slot.slotKind === 'nxop' && slot.pos >= (detail.nx?.available || 0)) continue;
    const lines = slot.slotKind === 'base' ? base : slot.slotKind === 'op' ? unique : slot.slotKind === 'nxop' ? nx : null;
    if (!lines) fail('この装備の効果形式は未対応です');
    const template = carvingLevel!=null&&slot.slotKind==='base'&&slot.opId===773?'刻印[carving_name]レベル[0]':shopNativeTemplate(loader,slot);
    if (!template) fail('装備効果の定義がありません');
    let candidates = [];
    const vals = slot.vals || [];
    const range = vals[0];
    const carvingBase=carvingLevel!=null&&slot.slotKind==='base';
    const matchValues=carvingBase?vals.map(v=>slot.opId===773&&!Array.isArray(v)?v:carvingLevel):vals;
    for (let i = 0; i < lines.length; i++) {
      if (slot.slotKind === 'nxop' && lines[i].slot !== slot.pos + 1) continue;
      let values=inverseShopNative(template,matchValues,lines[i].text,slot.opId)||inverseShopNative(shopEffectText(template),matchValues,shopEffectText(lines[i].text),slot.opId);
      if(!values&&slot.opId===1051&&vals[2]===2141&&clean(lines[i].text)==='バジリスクパス発動')values=vals.slice();
      if(values)candidates.push({i,value:values[0],values});
    }
    if (!candidates.length && slot.slotKind === 'nxop') {
      const index = lines.findIndex(line => line.slot === slot.pos + 1);
      const line = lines[index], observed = line && parseShopNxEffect(line.text,loader);
      if (observed && line.active === (slot.pos < entry.nxUnlockedCount)) {
        (entry.shopObservedNx ||= []).push({ slot: slot.pos, ...observed });
        lines.splice(index,1); continue;
      }
    }
    if(!candidates.length&&!carvingBase){
      const fixed=fixedShopGameValues(slot,loader);
      const kind=slot.slotKind==='base'?'基本オプション':'固有オプション';
      const peers=record.opSlots.filter(s=>s.slotKind===slot.slotKind),original=groups.get(kind)||[];
      const observed=original[peers.indexOf(slot)],i=lines.indexOf(observed);
      if(fixed&&original.length===peers.length&&i>=0){
        candidates.push({i,value:fixed[0],values:fixed});
        (entry.shopGameCorrections||=[]).push({index:record.opSlots.indexOf(slot),opId:slot.opId,observed:observed.text,expected:renderShopGameNative(slot,null,loader)});
      }
    }
    if (candidates.length > 1 && candidates.every(candidate =>
      JSON.stringify(candidate.values) === JSON.stringify(candidates[0].values) &&
      clean(lines[candidate.i].text) === clean(lines[candidates[0].i].text))) candidates = candidates.slice(0,1);
    if (candidates.length !== 1) fail('装備効果の値を正確に復元できません: ' + record.name);
    const { i, value, values } = candidates[0];
    if(!carvingBase&&values.some((v,n)=>!Array.isArray(v)&&Array.isArray(vals[n]))) (entry.shopNativeSlots ||= []).push({index:record.opSlots.indexOf(slot),opId:slot.opId,values});
    const line = lines.splice(i,1)[0];
    if (slot.slotKind === 'base' && slot.pos < 3) entry.revisions[slot.pos] = carvingBase?(Array.isArray(vals[0])?carvingLevel:vals[0]):value;
    if (slot.slotKind === 'nxop' && (line.slot !== slot.pos + 1 || line.active !== (slot.pos < entry.nxUnlockedCount))) fail('Nx解放順序が一致しません');
  }
  if (!detail.nonstandard && (base.length || unique.length || nx.length)) fail('復元できない効果が残っています');
  const prefixes = groups.get('称号オプション') || [];
  if (prefixes.length > 3) fail('称号オプション数が不正です');
  entry.ops = prefixes.map(line => prefixOption(line, loader));
  if(detail.quantity>1)entry.shopQuantity=detail.quantity;
  Object.assign(entry, shopEnhancements(detail, record, groups, seirenData,loader));
  return entry;
}

export function restoreShopAvailability(inv, entry) {
  if (entry.nxAvailableCount == null) return inv;
  const count = entry.nxAvailableCount;
  if (!Number.isInteger(count) || count < 0 || count > 4 || (inv.nxUnlockedCount || 0) > count) fail('Nx枠数と解放数が一致しません');
  inv.nxAvailableCount = count;
  return inv;
}
export function serializeShopAvailability(snapshot, inventory) {
  for (const entry of snapshot.inventory || []) {
    const inv = inventory.get(entry.slotIndex);
    if (inv?.nxAvailableCount != null) entry.nxAvailableCount = inv.nxAvailableCount;
  }
}

export function createShop({ inventory, restore, recalculate, changed, sourceOptions = {} }) {
  let ledger = [], busy = false, generation = 0;
  const cache = new Map();
  let seirenDataPromise;
  const seirenData = () => seirenDataPromise ||= (sourceOptions.loadSeirenData || loadShopSeirenData)().catch(error => { seirenDataPromise = null; throw error; });
  return {
    snapshot: () => JSON.parse(JSON.stringify(ledger)),
    reset(rows = []) {
      if (!Array.isArray(rows) || rows.length > 84) fail('露店の保存形式が不正です');
      const next = rows.map(row => {
        const source = parseShopUrl(row.url);
        if (!Number.isSafeInteger(row.gold) || row.gold < 0 || !Number.isInteger(row.slot) || row.slot < 0 || row.slot >= 84 || typeof row.name !== 'string' || row.name.length > 300) fail('購入履歴が不正です');
        return { url: source.href, gold: row.gold, name: row.name, slot: row.slot, server: source.server, date: source.date };
      });
      if (new Set(next.map(r => r.url)).size !== next.length) fail('購入履歴が重複しています');
      generation++; ledger = next;
    },
    totals() {
      const sums = new Map();
      for (const row of ledger) {
        const key = row.server + (row.server === 'g' ? '/' + row.date.slice(0,4) : '');
        const gold = (sums.get(key) || 0) + row.gold;
        if (!Number.isSafeInteger(gold)) fail('合計金額が大きすぎます');
        sums.set(key,gold);
      }
      return [...sums].map(([key,gold]) => ({ key, gold }));
    },
    async read(url, fetcher = fetch) {
      const source = parseShopUrl(url);
      if (!cache.has(source.dataUrl)) {
        const request = fetcher(sourceOptions.dataUrl?.(source) || source.dataUrl).then(async response => {
          if (!response.ok) fail('商品詳細を取得できません');
          const text = await response.text();
          if (text.length > 100000) fail('商品詳細が大きすぎます');
          const detail = JSON.parse(text); validateShopDetail(detail,source); return detail;
        });
        cache.set(source.dataUrl, request); request.catch(() => cache.delete(source.dataUrl));
        if (cache.size > 20) cache.delete(cache.keys().next().value);
      }
      
      return { source, detail: JSON.parse(JSON.stringify(await cache.get(source.dataUrl))) };
    },
    async buy(product, record, loader, isCurrent = () => true) {
      if (busy) fail('購入処理中です');
      if (ledger.length >= 84) fail('購入履歴の上限です');
      const source = parseShopUrl(product.source.href);
      const gold = validateShopDetail(product.detail,source);
      if (ledger.some(r => r.url === source.href)) fail('この商品は購入済みです');
      if (!Number.isSafeInteger(ledger.reduce((n,r) => n + r.gold,0) + gold)) fail('合計金額が大きすぎます');
      busy = true; const revision = generation; let inv, purchase;
      try {
        const data = product.detail.smelting_level > 0 ? await seirenData() : undefined;
        if (revision !== generation || !isCurrent()) fail('購入を中断しました');
        const entry = detailToShopEntry(product.detail,record,loader,data);
        inv = await restore(entry);
        if (!inv || revision !== generation || !isCurrent()) fail('購入を中断しました');
        restoreShopAvailability(inv, entry);
        restoreShopBf(inv, entry);
        restoreShopNx(inv, entry);
        restoreShopNative(inv, entry);
        restoreShopNonstandard(inv, entry,loader);
        restoreShopSeiren(inv,entry,loader);
        restoreShopGameCorrections(inv,entry);
        if (!inventory.add(inv)) fail('インベントリに空きがありません');
        inv.equippedSlot = null;
        await recalculate();
        if (revision !== generation || !isCurrent() || inventory.get(inv.slotIndex) !== inv) fail('構成が変更されたため購入を中断しました');
        purchase = { url: source.href, name: product.detail.display_name, gold, slot: inv.slotIndex, server: source.server, date: source.date };
        ledger.push(purchase);
        changed(); return inv;
      } catch (error) {
        if (purchase) ledger = ledger.filter(row => row !== purchase);
        if (inv && inventory.get(inv.slotIndex) === inv) { inventory.remove(inv.slotIndex); await recalculate(); }
        throw error;
      } finally { busy = false; }
    },
  };
}
