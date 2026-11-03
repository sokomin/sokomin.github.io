import { honText, SHOP_SERVERS, parseShopUrl } from './market_shop.js';
import { createShopSearch } from './market_shop_search.js';
import { SHOP_RECENT_DATE, SHOP_RECENT_LABEL } from './market_shop_date_range.js';
const PAGE = 20;
export function mountMarketShop({ root, shop, getRecord, loader, win = window, search = createShopSearch() }) {
  const doc=root.ownerDocument, el=id=>root.querySelector('#shop-'+id);
  let revision=0, rows=[], page=0, importing=false;
  const error=message=>{el('error').textContent=message;};
  function refresh() {
    el('history').replaceChildren();
    for(const row of shop.snapshot()){
      const li=doc.createElement('li'),a=doc.createElement('a');
      a.href=row.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=row.name;a.style.color='#b9d9ff';
      li.append(a,doc.createTextNode(' — '+honText(row.gold)));el('history').append(li);
    }
    el('total').textContent=shop.totals().map(({key,gold})=>{const [server,year]=key.split('/');return SHOP_SERVERS[server]+(year?' '+year+'年':'')+': '+honText(gold);}).join(' / ')||'0本';
    render();
  }
  async function take(row, button) {
    if(importing)return;
    importing=true;button.disabled=true;error('');render();
    const ticket=revision;
    try {
      const product=await shop.read(row.source.href);
      const record=await getRecord(product.detail.item_id);
      if(ticket!==revision)return;
      const gold=product.detail.price.amount*(product.detail.price.currency==='ingot'?100000000:1);
      if(product.detail.item_id!==row.itemId || gold!==row.gold || product.detail.quantity!==row.quantity)throw Error('一覧と商品詳細の価格・個数が一致しません');
      await shop.buy(product,record,loader,()=>ticket===revision);refresh();
    }catch(e){if(ticket===revision)error(e.message);}
    finally{importing=false;render();}
  }
  function render(){
    el('results').replaceChildren();
    const purchased=new Set(shop.snapshot().map(r=>r.url));
    for(const row of rows.slice(page*PAGE,(page+1)*PAGE)){
      const tr=doc.createElement('tr'),name=doc.createElement('td'),price=doc.createElement('td'),date=doc.createElement('td'),action=doc.createElement('td');
      const link=doc.createElement('a');link.href=row.source.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent=row.name;link.style.color='#b9d9ff';name.append(link);
      price.textContent=honText(row.gold)+(row.quantity>1?' / '+row.quantity+'個':'');
      date.textContent=row.source.date.replace(/(....)(..)(..)/,'$1/$2/$3');
      const button=doc.createElement('button');button.type='button';button.textContent=purchased.has(row.source.href)?'追加済み':'追加';button.disabled=importing||purchased.has(row.source.href);
      button.addEventListener('click',()=>take(row,button));action.append(button);tr.append(name,price,date,action);el('results').append(tr);
    }
    el('count').textContent=rows.length?`${page*PAGE+1}–${Math.min(rows.length,(page+1)*PAGE)} / ${rows.length}件`:'';
    el('prev').disabled=page===0;el('next').disabled=(page+1)*PAGE>=rows.length;
  }
  function invalidate(){revision++;rows=[];page=0;el('search').disabled=false;error('');render();}
  function dateOptions(dates = []) {
    el('date').replaceChildren();
    for (const [value, text] of [[SHOP_RECENT_DATE, SHOP_RECENT_LABEL], ['latest', '最新'], ...dates.map(day => [day, day.replace(/(....)(..)(..)/,'$1/$2/$3')])]) {
      const option=doc.createElement('option');option.value=value;option.textContent=text;el('date').append(option);
    }
    el('date').value=SHOP_RECENT_DATE;
  }
  for(const id of ['query','server','year'])el(id).addEventListener('input',()=>{
    invalidate();el('year').disabled=el('server').value!=='g';
    if(id!=='query')dateOptions();
  });
  async function run(){
    const ticket=++revision;rows=[];page=0;render();error('検索中');el('search').disabled=true;
    try{
      const result=await search.search({query:el('query').value,server:el('server').value,year:el('year').value,date:el('date').value});
      if(ticket!==revision)return;
      rows=result.items;dateOptions(result.dates);
      el('date').value=result.date;error(rows.length?'':'該当する商品がありません');render();
    }catch(e){if(ticket===revision)error(e.message);}
    finally{if(ticket===revision)el('search').disabled=false;}
  }
  el('search').addEventListener('click',run);
  el('query').addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();run();}});
  el('date').addEventListener('change',run);
  el('prev').addEventListener('click',()=>{page=Math.max(0,page-1);render();});
  el('next').addEventListener('click',()=>{if((page+1)*PAGE<rows.length)page++;render();});
  const launch=async()=>{
    if(!win.location.hash.startsWith('#market-shop='))return;
    const ticket=++revision;
    try{
      const source=parseShopUrl(decodeURIComponent(win.location.hash.slice('#market-shop='.length)));
      doc.querySelector('[data-tab-btn="shop"]').click();
      const product=await shop.read(source.href);if(ticket!==revision)return;
      rows=[{source,name:product.detail.display_name,itemId:product.detail.item_id,gold:product.detail.price.amount*(product.detail.price.currency==='ingot'?100000000:1),quantity:product.detail.quantity}];page=0;render();
    }catch(e){if(ticket===revision)error(e.message);}
  };
  win.addEventListener('hashchange',launch);refresh();launch();
  return {refresh,reset(){invalidate();refresh();}};
}
