(function () {
  'use strict';
  const model = window.PotentialDisassembly;
  const $ = id => document.getElementById(id);
  const number = (n, digits = 3) => n === null ? '—' : new Intl.NumberFormat('ja-JP', { maximumFractionDigits: digits }).format(n);
  const cost = n => n === null ? '—' : number(n, 5) + '本';
  const initialRefining = 5;
  const defaultInput = () => ({...model.defaults(),refining:initialRefining});
  let current = null;
  let selectedItem = null;
  let selectedGroup = null;
  let items = [];
  let catalogPromise = null;
  let searchPage = 0;
  const itemApi = window.PotentialItemSelection;
  const refinement=window.RefinementModel,processingApi=window.PotentialProcessing;
  let materialPrices={},marketRequest=0;
  function refiningSettings(){return {start:$('refining-start').value,guard:$('refining-guard').value,guardFrom:$('refining-guard-from').value};}
  function syncProcessing(){
    const target=$('kind').value==='equipment'&&$('part').value!=='auxiliary'?Number($('refining').value):0;
    const oldStart=Number($('refining-start').value)||0;
    addOptions('refining-start',Array.from({length:target+1},(_,i)=>[i,'＋'+i]));$('refining-start').value=Math.min(oldStart,target);
    const oldGuard=$('refining-guard').value;
    addOptions('refining-guard',[...(target<=10?[['none','なし']]:[]),['guard','製錬ガード'],['guard2','製錬ガードⅡ']]);
    $('refining-guard').value=target>10&&oldGuard==='none'?'guard':oldGuard||'none';
    if(!$('refining-guard').value)$('refining-guard').value=target>10?'guard':'none';
    const oldFrom=target>10&&oldGuard==='none'?10:Number($('refining-guard-from').value)||0;
    addOptions('refining-guard-from',Array.from({length:11},(_,i)=>[i,'＋'+i+'から']));$('refining-guard-from').value=Math.min(oldFrom,10);
    $('auto-refining-fields').hidden=false;
    $('refinement-settings').hidden=$('kind').value!=='equipment'||$('part').value==='auxiliary';
    $('refinement-cost').hidden=$('refinement-settings').hidden;
    $('refining-guard-from-field').hidden=$('refining-guard').value==='none';
  }
  async function refreshMaterialPrices(){
    const request=++marketRequest,server=$('market-server').value;materialPrices={};$('market-date').textContent='相場を取得中…';$('market-error').textContent='';$('refresh-market').disabled=true;updateCost();
    try{
      const snapshot=await window.RefinementMarket.load(server,refinement.materials);
      if(request!==marketRequest)return;
      materialPrices=snapshot.prices;
      const date=String(snapshot.generatedAt??'').match(/^\d{4}-\d{2}-\d{2}(?=[ T]|$)/)?.[0];
      $('market-date').textContent=server+'鯖'+(date?' ／ '+date:'');updateCost();
    }catch(error){if(request!==marketRequest)return;$('market-date').textContent='';$('market-error').textContent=error.message;updateCost();}
    finally {if(request===marketRequest)$('refresh-market').disabled=false;}
  }
  const catalogUrl = new URL('potential-disassembly-catalog.js', document.currentScript.src).href;
  function ensureCatalog() {
    if (!catalogPromise) {
      $('item-status').textContent = 'アイテムを読み込み中…';
      catalogPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = catalogUrl;
        script.onload = () => {
          try {
            items = itemApi.decode(window.PotentialItemCatalog);
            $('item-retry').hidden = true;
            resolve(items);
          } catch (error) { catalogPromise = null; reject(error); }
        };
        script.onerror = () => { script.remove(); catalogPromise = null; reject(new Error('アイテムを読み込めません。再試行してください。')); };
        document.head.appendChild(script);
      });
    }
    return catalogPromise;
  }
  async function findItems(resetPage = false) {
    if (resetPage) searchPage = 0;
    try {
      if (!$('item-search').value.trim()) { $('item-results').replaceChildren(); $('item-paging').hidden=true; $('item-status').textContent=''; return; }
      await ensureCatalog();
      if (!$('item-search').value.trim()) return;
      const found = itemApi.search(items, $('item-search').value, searchPage);
      searchPage = found.page;
      $('item-status').textContent = found.total ? '' : $('item-search').value.trim() ? '該当するアイテムがありません。' : '';
      $('item-results').replaceChildren(...found.items.map(item => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'potential-item';
        button.disabled = Boolean(item.error);
        const name = document.createElement('strong'); name.textContent = item.name;
        const meta = document.createElement('span');
        meta.textContent = item.type + (item.error ? ' ／ ' + item.error : '');
        button.append(name, meta); button.addEventListener('click', () => chooseItem(item));
        return button;
      }));
      $('item-paging').hidden = found.total <= 12;
      $('item-page').textContent = found.total ? (searchPage * 12 + 1) + '～' + Math.min((searchPage + 1) * 12, found.total) + ' / ' + found.total + '件' : '';
      $('item-prev').disabled = searchPage === 0;
      $('item-next').disabled = (searchPage + 1) * 12 >= found.total;
    } catch (error) {
      $('item-status').textContent = error.message;
      $('item-retry').hidden = false;
    }
  }
  function chooseItem(item) {
    selectedItem = item; selectedGroup = null;
    $('selected-item').textContent = item.name + ' ／ ' + item.type;
    $('item-search').value = item.name;
    $('item-results').replaceChildren(); $('item-paging').hidden = true;
    $('item-status').textContent = '';
    try {
      const input = itemApi.input(item, model);
      if(input.kind==='equipment'&&input.part!=='auxiliary')input.refining=initialRefining;
      load({ name: item.name, input }, item);
    } catch (error) { update(); }
  }
  const addOptions = (id, entries) => {
    $(id).replaceChildren(...entries.map(([value, text]) => {
      const option = document.createElement('option'); option.value = value; option.textContent = text; return option;
    }));
  };
  addOptions('equipment-group', [['', '区分を選択／アイテム名で検索'], ...itemApi.groups.map(group => [group.id, group.label])]);
  function chooseGroup() {
    const group = itemApi.groups.find(row => row.id === $('equipment-group').value);
    const input = group && current?.input.kind === group.kind ? structuredClone(current.input) : group ? itemApi.groupInput(group.id, model) : defaultInput();
    if(group?.kind==='equipment'&&current?.input.kind!=='equipment')input.refining=initialRefining;
    if (group?.base) input.base = group.base;
    if (group?.id === 'bfu') input.part = 'armor';
    if (group && !group.canNx) { input.nxSlots = 0; input.openCount = 0; }
    $('item-search').value = ''; $('item-results').replaceChildren(); $('item-paging').hidden = true; $('item-status').textContent = '';
    load({ name: group?.label || '', ...(group ? { groupId: group.id } : {}), input });
  }
  addOptions('refining', model.rules.refining.map((points, level) => [level, '+' + level]));
  $('refining').value=initialRefining;
  for (let i = 0; i < 4; i++) addOptions('open-grade-' + i, Object.keys(model.rules.openEquipment[i]).map(grade => [grade, '等級' + grade.slice(-1)]));
  function changeKind() {
    const ring = $('kind').value !== 'equipment';
    const entries = ring
      ? [['none', 'なし'], ['grade1', '等級1'], ['grade2', '等級2'], ['grade3', '等級3'], ['grade4', '等級4'], ['grade5', '等級5'], ['ult', 'ULT']]
      : [['none', 'なし'], ['normal', '一般'], ['set', 'セット'], ['dx', 'DX'], ['ult', 'ULT'], ['npc', '宿命']];
    for (let i = 0; i < 3; i++) addOptions('option-' + i, entries);
    $('equipment-fields').hidden = ring;
    $('base-field').hidden = true;
    $('part-field').hidden = ring || Boolean(selectedItem) || !selectedGroup;
    $('part').disabled = $('part-field').hidden || selectedGroup?.id === 'bfu';
    $('engraving-field').hidden = $('kind').value !== 'rebirth';
    $('engraving').value = 0;
    $('nx-slots').disabled = $('kind').value === 'rebirth' || Boolean(selectedItem && !selectedItem.canNx) || Boolean(selectedGroup && !selectedGroup.canNx);
    if ($('kind').value === 'rebirth') $('nx-slots').value = '0';
    $('open-grade-fields').hidden = ring;
    syncPart(); syncOpen(); update();
  }
  function syncPart() {
    const armor = $('part').value === 'armor';
    const auxiliary = $('part').value === 'auxiliary';
    if (!armor) $('scroll').value = 'none';
    if (auxiliary) { $('refining').value = '0'; $('bf').value = 'none'; }
    $('scroll').disabled = !armor;
    $('refining').disabled = auxiliary;
    $('bf').disabled = auxiliary;
  }
  function syncOpen() {
    const slots = Number($('nx-slots').value);
    const old = Number($('open-count').value);
    addOptions('open-count', Array.from({ length: slots + 1 }, (_, count) => [count, count + '枠']));
    $('open-count').value = Math.min(old, slots);
    for (let i = 0; i < 4; i++) $('open-grade-field-' + i).hidden = i >= Number($('open-count').value);
  }
  function read() {
    return { kind: $('kind').value, part: $('part').value, base: $('base').value, refining: $('refining').value,
      options: [0, 1, 2].map(i => $('option-' + i).value), nxSlots: $('nx-slots').value, openCount: $('open-count').value,
      openGrades: [0, 1, 2, 3].map(i => $('open-grade-' + i).value), bf: $('bf').value, scroll: $('scroll').value, scrollStage: $('scroll-stage').value,
      engraving: $('kind').value === 'rebirth' ? $('engraving').value : 0 };
  }
  function cell(row, value, numeric = false) {
    const td = document.createElement('td'); td.textContent = value;
    if (numeric) td.className = 'number'; row.appendChild(td); return td;
  }
  function update() {
    $('error').textContent = ''; current = null;
    $('processing-error').textContent='';syncProcessing();
    $('scroll-stage').disabled = $('scroll').value === 'none';
    try {
      if (!selectedItem && !selectedGroup) throw new Error('');
      if (selectedItem?.error) throw new Error(selectedItem.error);
      const input=read(),result=model.calculate(input);
      current={input,result};
      $('currency').textContent=result.currency;
      $('yield').textContent=result.yield+'個';
      $('raw').textContent='＋'+result.raw;
      $('excess').textContent=result.excess+'個';
      $('breakdown').replaceChildren(...result.rows.filter(row=>row.points!==0).map(row=>{
        const tr=document.createElement('tr');cell(tr,row.label);cell(tr,'＋'+row.points,true);return tr;
      }));
    } catch(error) {
      $('error').textContent=error.message;$('currency').textContent='分解結果';
      for(const id of ['yield','raw','excess'])$(id).textContent='—';
      $('breakdown').replaceChildren();
    }
    updateCost();
  }
  function updateCost() {
    $('processing-error').textContent='';
    const input=read();
    if(input.kind!=='equipment'||input.part==='auxiliary'){$('refining-cost').textContent='—';return;}
    try {
        const fees=processingApi.calculate(refinement,input,refiningSettings(),materialPrices,'0');
        $('refining-cost').textContent=cost(fees.refiningHon);
        $('refining-cost-title').textContent='製錬 ＋'+$('refining-start').value+' → ＋'+input.refining+' の期待費用';
        if(fees.missing.length)$('processing-error').textContent=refinement.materials.filter(item=>fees.missing.includes(item.key)).map(item=>item.name).join('・')+'の相場がありません。';
      } catch(error) { $('refining-cost').textContent='—';$('processing-error').textContent=error.message; }
  }
  function load(candidate, item = null) {
    selectedItem = item;
    selectedGroup = item ? null : itemApi.groups.find(row => row.id === candidate.groupId) || null;
    $('equipment-group').value = selectedGroup?.id || '';
    $('selected-item').textContent = item ? item.name + ' ／ ' + item.type : selectedGroup ? selectedGroup.label : '区分またはアイテムを選択してください。';
    addOptions('nx-slots', [['', '枠数を選択'], ...model.rules.transmutation.map((points, count) => [count, count ? count + '枠' : '未錬成'])]);
    Array.from($('nx-slots').options).find(option => option.value === '0').disabled = Boolean(item?.nx);
    $('kind').value = candidate.input.kind; changeKind();
    const input = candidate.input;
    $('part').value = input.part ?? 'armor';
    for (const [id, property] of [['base', 'base'], ['refining', 'refining'], ['nx-slots', 'nxSlots'], ['bf', 'bf'], ['scroll', 'scroll'], ['scroll-stage', 'scrollStage'], ['engraving', 'engraving']]) $(id).value = input[property];
    syncOpen(); $('open-count').value = input.openCount; syncOpen();
    input.options.forEach((op, i) => $('option-' + i).value = op);
    input.openGrades.forEach((grade, i) => $('open-grade-' + i).value = grade);
    syncPart();
    $('nx-slots').disabled = input.kind === 'rebirth' || Boolean(item && !item.canNx) || Boolean(selectedGroup && !selectedGroup.canNx);
    if (item && !item.canNx || selectedGroup && !selectedGroup.canNx) { $('nx-slots').value = '0'; syncOpen(); }
    syncProcessing();
    $('refining-start').value='0';
    $('refining-guard').value=Number($('refining').value)>10?'guard':'none';
    $('refining-guard-from').value=Number($('refining').value)>10?'10':'0';
    update();
  }
  $('kind').addEventListener('change', changeKind);
  $('equipment-group').addEventListener('change', chooseGroup);
  $('part').addEventListener('change', syncPart);
  $('nx-slots').addEventListener('change', syncOpen);
  $('open-count').addEventListener('change', syncOpen);
  $('potential-form').addEventListener('submit', event => event.preventDefault());
  $('potential-form').addEventListener('input', update);
  $('potential-form').addEventListener('change', update);
  $('reset-equipment').addEventListener('click', () => {
    $('item-search').value='';$('item-results').replaceChildren();$('item-paging').hidden=true;$('item-status').textContent='';
    load({input:defaultInput()});
  });
  $('item-search').addEventListener('focus', () => findItems());
  $('item-search').addEventListener('input', () => findItems(true));
  $('item-search').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); findItems(true); } });
  $('item-retry').addEventListener('click', () => findItems());
  $('item-prev').addEventListener('click', () => { searchPage--; findItems(); });
  $('item-next').addEventListener('click', () => { searchPage++; findItems(); });
  changeKind();
  $('refresh-market').addEventListener('click',refreshMaterialPrices);
  $('market-server').addEventListener('change',refreshMaterialPrices);
  requestAnimationFrame(refreshMaterialPrices);
  const linkedId = new URL(window.location?.href || 'https://sokomin.github.io/calculation/potential-disassembly.html').searchParams.get('item');
  if (linkedId !== null) {
    ensureCatalog().then(() => {
      const item = items.find(row => String(row.id) === linkedId);
      if (item) chooseItem(item);
      else $('item-status').textContent = '指定されたアイテムが見つかりません。';
    }).catch(error => { $('item-status').textContent = error.message; $('item-retry').hidden = false; });
  }
})();
