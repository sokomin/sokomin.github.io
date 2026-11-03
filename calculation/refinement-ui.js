(function () {
  'use strict';
  const model=window.RefinementModel,market=window.RefinementMarket,$=id=>document.getElementById(id);
  const format=(n,d=3)=>new Intl.NumberFormat('ja-JP',{maximumFractionDigits:d}).format(n);
  const money=n=>n===null?'—':format(n/1e8,5)+'本';
  let prices={},marketRequest=0,running=false,stop=false,session=model.fresh(),previewData=null;
  const options=(id,rows)=>$(id).replaceChildren(...rows.map(([value,label])=>{const option=document.createElement('option');option.value=value;option.textContent=label;return option;}));
  const cell=(row,text)=>{const td=document.createElement('td');td.textContent=text;row.appendChild(td);return td;};
  function plan() {return model.config({start:$('start-stage').value,target:$('target-stage').value,guard:$('guard').value,guardFrom:$('guard-from').value});}
  function controls() {
    const advanced=$('advanced').checked,max=advanced?20:10;
    const oldStart=Number($('start-stage').value)||0,oldTarget=Number($('target-stage').value)||3;
    options('start-stage',Array.from({length:max},(_,i)=>[i,'＋'+i]));
    options('target-stage',Array.from({length:max},(_,i)=>[i+1,'＋'+(i+1)]));
    $('start-stage').value=Math.min(oldStart,max-1);$('target-stage').value=Math.min(max,Math.max(Number($('start-stage').value)+1,oldTarget));
    guardControls();
  }
  function guardControls() {
    const high=Number($('target-stage').value)>10,old=$('guard').value;
    options('guard',[...(!high?[['none','なし']]:[]),['guard','製錬ガード'],['guard2','製錬ガードⅡ']]);
    $('guard').value=high&&old==='none'?'guard':old||'none';
    if (!$('guard').value) $('guard').value=high?'guard':'none';
    const from=high&&old==='none'?10:Number($('guard-from').value)||0;
    options('guard-from',Array.from({length:11},(_,i)=>[i,'＋'+i+'から']));$('guard-from').value=Math.min(from,10);
    $('guard-from-field').hidden=$('guard').value==='none';
  }
  function materialRows(counts,body) {
    $(body).replaceChildren(...model.materials.filter(item=>counts[item.key]>0).map(item=>{
      const tr=document.createElement('tr'),name=cell(tr,'');
      const img=document.createElement('img');img.src='../item/design/image/item/iconItem_'+item.icon+'.png';img.width=28;img.height=28;img.alt='';img.loading='lazy';
      name.append(img,document.createTextNode(item.name));
      cell(tr,format(counts[item.key]));cell(tr,prices[item.key]?.gold==null?'相場なし':money(prices[item.key].gold));
      cell(tr,prices[item.key]?.date||'—');
      return tr;
    }));
  }
  function updateExpected() {
    $('plan-error').textContent='';
    try {
      const result=model.expectation(plan()),value=model.cost(result,prices);
      $('expected-cost').textContent=money(value.total);$('expected-attempts').textContent=format(result.attempts)+'回';
      $('expected-fee').textContent=money(result.gold);$('expected-slots').textContent=result.slots+'枠';
      materialRows(result,'expected-materials');
    } catch(error) {$('plan-error').textContent=error.message;$('expected-cost').textContent='—';}
  }
  function renderSession() {
    $('actual-stage').textContent='＋'+session.stage;$('actual-attempts').textContent=session.attempts+'回';
    $('actual-cost').textContent=money(model.cost(session,prices).total);
    $('actual-materials').replaceChildren(...model.materials.filter(item=>session[item.key]>0).map(item=>{const row=document.createElement('tr');cell(row,item.name);cell(row,format(session[item.key],0));return row;}));
    $('attempt-log').replaceChildren(...session.log.slice().reverse().map(entry=>{const row=document.createElement('tr');cell(row,'＋'+entry.from+' → ＋'+entry.to);cell(row,entry.outcome);return row;}));
    const done=session.stage>=Number($('target-stage').value)||session.broken;
    $('one-attempt').disabled=running||done;$('run-target').disabled=running||done;$('stop-run').disabled=!running;
    $('attempt-limit').disabled=running;
    $('reset-run').disabled=running;$('plan-fields').disabled=running;
  }
  function resetSession() {if(running)return;session=model.fresh(Number($('start-stage').value));$('run-status').textContent='';renderSession();}
  async function refreshMarket() {
    const request=++marketRequest;prices={};$('market-error').textContent='';$('price-date').textContent='相場を取得中…';updateExpected();renderSession();
    try {
      const snapshot=await market.load($('world').value,model.materials);
      if(request!==marketRequest)return;
      prices=snapshot.prices;$('price-date').textContent='価格基準：'+snapshot.generatedAt;updateExpected();renderSession();
    } catch(error) {if(request!==marketRequest)return;$('price-date').textContent='';$('market-error').textContent=error.message;}
  }
  $('refinement-form').addEventListener('submit',event=>event.preventDefault());
  $('advanced').addEventListener('change',()=>{controls();updateExpected();resetSession();});
  $('start-stage').addEventListener('change',()=>{if(Number($('target-stage').value)<=Number($('start-stage').value))$('target-stage').value=Number($('start-stage').value)+1;guardControls();updateExpected();resetSession();});
  $('target-stage').addEventListener('change',()=>{guardControls();updateExpected();resetSession();});
  $('guard').addEventListener('change',()=>{guardControls();updateExpected();resetSession();});
  $('guard-from').addEventListener('change',()=>{updateExpected();resetSession();});
  $('world').addEventListener('change',refreshMarket);$('refresh-market').addEventListener('click',refreshMarket);
  $('one-attempt').addEventListener('click',()=>{try{session=model.step(session,plan());$('run-status').textContent=session.stage>=Number($('target-stage').value)?'目標に到達しました。':'';renderSession();}catch(error){$('run-status').textContent=error.message;}});
  $('run-target').addEventListener('click',async()=>{
    if(running)return;running=true;stop=false;$('run-status').textContent='試行中…';renderSession();
    try {
      const input=plan(),limit=Number($('attempt-limit').value);let attempts=0;
      while(!stop&&!session.broken&&session.stage<input.target&&attempts<limit){
        for(let i=0;i<500&&!stop&&!session.broken&&session.stage<input.target&&attempts<limit;i++,attempts++)session=model.step(session,input);
        renderSession();await new Promise(resolve=>setTimeout(resolve,0));
      }
      $('run-status').textContent=session.broken?'装備が破壊されました。':session.stage>=input.target?'目標に到達しました。':stop?'停止しました。':'試行上限に到達しました。';
    }catch(error){$('run-status').textContent=error.message;}finally{running=false;renderSession();}
  });
  $('stop-run').addEventListener('click',()=>{stop=true;});$('reset-run').addEventListener('click',resetSession);
  const partNames={weapon:'武器',neck:'首',head:'冠',back_ear:'マント・イヤリング',waist:'ベルト',hand:'グローブ',body:'共通鎧・専用鎧',foot:'シューズ'};
  options('preview-part',Object.entries(partNames));options('preview-stage',Array.from({length:10},(_,i)=>[i+1,'＋'+(i+1)]));$('preview-stage').value='10';
  async function showPreview() {
    $('preview-error').textContent='';
    try {
      if(!previewData){const response=await fetch('https://sokomin.github.io/character_simulator/lib/data/seiren_options.json',{cache:'no-cache'});if(!response.ok)throw new Error('OP一覧を取得できません。再試行してください。');previewData=await response.json();}
      const level=Number($('preview-stage').value),part=previewData.parts[$('preview-part').value];
      const tiers=['lower','middle','upper'].slice(0,Number($('preview-grade').value));
      const header=document.createElement('tr');for(const text of ['枠','OP',...['下級','中級','上級'].slice(0,tiers.length)]){const th=document.createElement('th');th.textContent=text;header.appendChild(th);}
      const rows=[header];
      for(const [index,threshold]of [1,5,10].entries())if(threshold<=level)for(const option of part[threshold]||[]){const row=document.createElement('tr');cell(row,(index+1)+'枠目');cell(row,option.names.map(n=>n.name).join('／'));for(const tier of tiers)cell(row,option.tiers[tier][level-1]??'—');rows.push(row);}
      $('op-preview').replaceChildren(...rows);
    }catch(error){$('preview-error').textContent=error.message;}
  }
  $('show-preview').addEventListener('click',showPreview);
  controls();updateExpected();renderSession();requestAnimationFrame(refreshMarket);
})();
