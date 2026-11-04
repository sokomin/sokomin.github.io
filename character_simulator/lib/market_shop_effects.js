import { shopPlain, inverseShopNative } from './market_shop_native.js';
import { NATIVE_OPTION_STATS, nativeOptionExtra } from './native_option_defs.js';
const caches=new WeakMap();
const canonical=t=>shopPlain(t).replace(/\[[+-]?(?:n|[0-7]|-?\d+~-?\d+)(?:\.1)?([%％]?)\]/g,(_,unit)=>'@'+unit).replace(/\+@/g,'@').replace(/全ての/g,'全');
export const shopModelKey=(model,loader)=>{const stat=model?.statId||model?.stats?{id:model.statId,stats:model.stats}:loader.optionPrefix?.families?.[model?.familyId]?.stat;return stat?JSON.stringify([stat.id||stat.stats?.slice().sort(),stat.mul??1,stat.stats?'sumAll':stat.layer||'sum']):undefined;};
export const shopEffectText=t=>{const text=shopPlain(t);return text.replace(/\(召喚獣[・、]ペット\)|召喚獣[・、]ペット|召喚獣/g,'同伴者').replace(/\(%\)/g,'').replace(/発動確率/g,'確率').replace(/物理ダメージ/g,'物理攻撃力').replace(/魔法ダメージ/g,'魔法攻撃力').replace(/全ての|すべての/g,'全').replace(/増加|減少/g,'').replace(/\+/g,'')+(text.includes('減少')?'減少':'');};
export function shopEffectResolver(loader) {
  if(caches.has(loader))return caches.get(loader);
  const rows=[],seen=new Map(),aliases=loader.optionNameModes?.modes?.['2026']?.base_option_text||{};
  const add=(template,model,priority=0)=>{
    if(!template)return;
    const key=template+JSON.stringify(model);if(seen.has(key)){seen.get(key).priority=Math.max(seen.get(key).priority,priority);return;}
    const row={template,model,priority};seen.set(key,row);rows.push(row);
  };
  for(const[id,family]of Object.entries(loader.optionPrefix?.families||{})){
    const stat=NATIVE_OPTION_STATS[id]||family.stat;
    if(!stat?.id&&!stat?.stats)continue;
    const model={familyId:Number(id)};
    if(NATIVE_OPTION_STATS[id]){delete model.familyId;if(stat.stats)model.stats=stat.stats;else model.statId=stat.id;}
    add(loader.options.templates[id]?.displayTemplate,model);
    add(loader.optionNameModes?.modes?.['2026']?.option_text?.[id]?.new,model);
    for(const tier of family.tiers||[])if(tier.effect.includes('[0'))add(tier.effect,model);
    for(const alias of Object.values(aliases))if(canonical(alias.old)===canonical(loader.options.templates[id]?.displayTemplate||''))add(alias.new,model);
  }
  const known={21:'物理攻撃力増加[0%]',145:'魔法攻撃力増加[0%]',41:'攻撃速度増加[0%]',31:'物理命中率 +[0%]',34:'物理致命打確率(%) +[0%]',461:'魔法致命打確率(%) +[0%]',462:'物理強打確率(%) +[0%]',723:'魔法強打確率(%) +[0%]',115:'魔法アイテムドロップ確率(%) +[0%]',26:'最大HP増加[0%]',28:'最大CP増加[0%]',32:'物理回避率(%) +[0%]',182:'物理ダブルクリティカルダメージ増加 [0%]',22:'武器最小攻撃力 +[0]',23:'武器最大攻撃力 +[0]',51:'CP獲得量増加[0%]',40:'移動速度増加[0%]',303:'同伴者の攻撃速度増加[0%]',686:'同伴者の魔法致命打確率(%) +[0%]'};
  for(const[id,template]of Object.entries(known))add(template,{familyId:Number(id)},1);
  add('敵の魔法の抵抗(％) -[0%]',{familyId:138},1);
  add('すべてのステータス [0]増加',{stats:['str','agi','con','int','wiz','chs','luc']},1);
  add('全スキルレベル +[0]',{familyId:104},1);
  add('最終攻撃力増加 [0%]',{statId:'finalAttackPercent'},1);
  add('集中力 +[0]',{familyId:43},1);
  add('物理強打ダメージ増加 [0%]',{familyId:755},1);
  
  for (const [species, ids] of [['人間',['Humanoid']],['アンデット、悪魔',['Undead','Demon']],['動物、神獣',['Animal','Beast']]]) {
    for (const [kind, axis] of [['物理','Phys'],['魔法','Magic']]) {
      add(`vs ${species}の被${kind}ダメージ減少 [0%]`,
        ids.length === 1 ? {statId:`vs${ids[0]}${axis}Received`} : {stats:ids.map(id=>`vs${id}${axis}Received`)}, 1);
    }
  }
  add('同伴者の被物理致命打ダメージの減少 [0%]', {statId:'petPhysCritDamageReduce'}, 1);
  add('被ダメージ減少[0%]', {statId:'damageReducePercent'}, 1);
  add('最終全ての状態抵抗(%) +[0%]', {statId:'finalStatusResist'}, 1);
  for (const [name, element] of [['火','Fire'],['水','Water'],['風','Wind'],['大地','Earth'],['光','Light'],['闇','Dark']]) {
    add(`同伴者の${name} 属性抵抗(%) +[0%]`, {statId:`petAttr${element}Resist`}, 1);
  }
  for (const [name, statId] of [['力','str'],['敏捷','agi'],['健康','con'],['知恵','wiz'],['知識','int'],['カリスマ','chs'],['運','luc']]) {
    add(`同伴者の${name} +[0]`, {statId:'pet'+statId[0].toUpperCase()+statId.slice(1)}, 1);
  }
  for(const option of loader.nonstandard?.openOptions||[]){
    if(!/^\d+(?:\.\d+)?%?$/.test(String(option.value)))continue;
    const model={};for(const key of ['familyId','statId','stats','isDisplayOnly'])if(option[key]!=null)model[key]=option[key];
    if(!model.familyId&&!model.statId&&!model.stats&&!model.isDisplayOnly)continue;
    add(option.name+' [0'+(String(option.value).endsWith('%')?'%':'')+']',model);
  }

  
  for(const[id,definition]of Object.entries(loader.options?.templates||{})){
    const stat=NATIVE_OPTION_STATS[id]||loader.optionPrefix?.families?.[id]?.stat;
    const model=stat?.id||stat?.stats?NATIVE_OPTION_STATS[id]?stat.stats?{stats:stat.stats}:{statId:stat.id}:{familyId:Number(id)}:{isDisplayOnly:true};
    if(stat?.layer==='lvLinked')continue;
    add(loader.optionNameModes?.modes?.['2026']?.option_text?.[id]?.new||definition.displayTemplate,model,-1);
    add(loader.optionNameModes?.modes?.['2026']?.base_option_text?.[id]?.new,{isDisplayOnly:true},-2);
  }
  for(const option of loader.nonstandard?.options||[]){
    const model={};for(const key of ['familyId','statId','stats','isDisplayOnly'])if(option[key]!=null)model[key]=option[key];
    let n=0;const template=option.name.replace(/\[n([%％]?)\]/g,(_,unit)=>`[${n++}${unit}]`);
    if(n!==1)continue;
    add(template,model);
    for(const alias of Object.values(aliases))if(canonical(alias.old)===canonical(template))add(alias.new,model);
  }
  const resultCache=new Map();
  const resolve=text=>{
    const key=shopPlain(text);if(resultCache.has(key))return resultCache.get(key);
    const primary={'力':0,'敏捷':1,'健康':2,'知恵':3,'知識':4,'カリスマ':5,'運':6};
    const ratio=key.match(/^(力|敏捷|健康|知識|知恵|カリスマ|運)ステータスを(\d+)レベル当たり、(\d+)ほど増加させる。$/);
    if(ratio&&Number(ratio[2])>0){const model={familyId:primary[ratio[1]]+14,addValue:Number(ratio[3]),divisor:Number(ratio[2])};resultCache.set(key,model);return model;}
    const fixed=key.match(/^(力|敏捷|健康|知識|知恵|カリスマ|運)ステータスを([\d,]+)ほど増加させる。$/);
    if(fixed){const value=Number(fixed[2].replaceAll(',',''));if(Number.isSafeInteger(value)&&value>=0&&value<=1000000){const model={familyId:primary[fixed[1]],value};resultCache.set(key,model);return model;}}
    const matches=new Map();let priority=-1;
    for(const row of rows){
      const values=inverseShopNative(shopEffectText(row.template),Array.from({length:8},()=>[-1000000,1000000]),shopEffectText(text));
      if(!values)continue;
      if(row.priority<priority)continue;if(row.priority>priority){matches.clear();priority=row.priority;}
      const used=values.filter(v=>!Array.isArray(v));
      
      if(used.length>1 && loader.optionPrefix?.families?.[row.model.familyId]?.stat?.layer!=='lvLinked')continue;
      if(!used.length&&!row.model.isDisplayOnly)continue;
      const model={...row.model,value:used[0]??1};
      if(model.familyId!=null&&loader.optionPrefix.families[model.familyId]?.stat?.layer==='lvLinked'){
        const ratio=shopPlain(text).match(/\+(\d+(?:\.\d+)?)\/レベル(\d+(?:\.\d+)?)/);
        if(!ratio||Number(ratio[2])<=0)continue;delete model.value;model.addValue=Number(ratio[1]);model.divisor=Number(ratio[2]);
      }
      const family=loader.optionPrefix.families[model.familyId];
      const stat=model.statId||model.stats||family?.stat?.id||family?.stat?.stats;
      matches.set(JSON.stringify([shopModelKey(model,loader),model.value,model.addValue,model.divisor,!!model.isDisplayOnly]),model);
    }
    const result=matches.size===1?[...matches.values()][0]:null;resultCache.set(key,result);return result;
  };
  caches.set(loader,resolve);return resolve;
}
export function shopNativeTemplate(loader,slot){
  if(slot.slotKind!=='base'&&slot.opId===103)return 'スキルレベル+[0]([1]系列職業)';
  if(slot.slotKind!=='base'&&slot.opId===128)return 'スキル難易度[0]以下のスキルレベルが [1]増加する。';
  const table=slot.slotKind==='base'?'base_option_text':'option_text';
  return loader.optionNameModes?.modes?.['2026']?.[table]?.[slot.opId]?.new||loader.options?.templates?.[slot.opId]?.[slot.slotKind==='base'?'displayTemplateBase':'displayTemplate'];
}
export { nativeOptionExtra };
