(function (root,factory) {
  const api=factory();
  if (typeof module==='object' && module.exports) module.exports=api;
  else root.RefinementMarket=api;
})(typeof globalThis!=='undefined'?globalThis:this,function () {
  'use strict';
  const servers={B:'Bridgehead',S:'Strasserad',V:'Valutish'};
  const files={B:'market_public_bridgehead.js',S:'market_public_strasserad.js',V:'market_public_valutish.js'};
  function parse(text,server=null) {
    const prefix=server ? 'window.MARKET_PUBLIC_SERVER_DATA = window.MARKET_PUBLIC_SERVER_DATA || {};\nwindow.MARKET_PUBLIC_SERVER_DATA['+JSON.stringify(server)+'] = ' : 'window.MARKET_PUBLIC_MANIFEST = ';
    const normalized=text.replace(/\r\n/g,'\n').trim();
    if (!normalized.startsWith(prefix) || !normalized.endsWith(';')) throw new Error('相場データの形式が不正です。');
    return JSON.parse(normalized.slice(prefix.length,-1));
  }
  async function verified(text, record, cryptoImpl=globalThis.crypto) {
    if (!/^[a-f0-9]{64}$/.test(record.sha256||'') || !Number.isInteger(record.bytes) || record.bytes>8*1024*1024 || record.bytes<0) throw new Error('相場データの検証情報が不正です。');
    for (const value of [text,text.replace(/\r?\n/g,'\r\n')]) {
      const bytes=new TextEncoder().encode(value);
      if (bytes.length!==record.bytes) continue;
      const digest=Array.from(new Uint8Array(await cryptoImpl.subtle.digest('SHA-256',bytes))).map(n=>n.toString(16).padStart(2,'0')).join('');
      if (digest===record.sha256) return;
    }
    throw new Error('相場データが更新中です。再取得してください。');
  }
  function quotes(data, server, materials) {
    if (!data || data.servers?.length!==1 || data.servers[0]!==server) throw new Error('相場のサーバーが一致しません。');
    const result={};
    for (const item of materials) {
      const found=data.items.filter(r=>r.server===server && r.item_name===item.name && Number(r.option_count)===0 && !r.option_variant && r.unit==='Gold' && Number(r.market_count)>0 && !r.reference_is_trend_only && Number.isFinite(r.reference_gold) && r.reference_gold>0);
      if (found.length!==1) { result[item.key]={gold:null,date:null};continue; }
      const row=found[0];
      const dates=(data.daily_trends||[]).filter(r=>r.server===server && r.item_key===row.item_key && Number(r.market_count)>0 && Number(r.market_gold)>0).map(r=>r.period).sort();
      result[item.key]={ gold:row.reference_gold,date:dates.at(-1)||null,itemKey:row.item_key,observations:row.market_count };
    }
    return result;
  }
  async function load(code, materials, {fetchFn=globalThis.fetch,decode=globalThis.decodeMarketDataset,cryptoImpl=globalThis.crypto,base='https://sokomin.github.io/market/public/',stamp=Date.now()}={}) {
    const server=servers[code];if (!server) throw new Error('サーバーを選択してください。');
    const get=async url=>{const response=await fetchFn(url,{cache:'no-store'});if(!response.ok)throw new Error('相場を取得できません。再試行してください。');return response.text();};
    const manifest=parse(await get(base+'market_public_manifest.js?reload='+stamp));
    const record=manifest.servers?.[server];
    if (!record || record.file!==files[code]) throw new Error('相場のサーバー情報が不正です。');
    const text=await get(base+record.file+'?v='+encodeURIComponent(record.sha256));
    await verified(text,record,cryptoImpl);
    const data=decode(parse(text,server));
    if(data.meta?.progressive_version!==(record.version||manifest.version))throw new Error('相場データの世代が一致しません。');
    return { server,generatedAt:manifest.generated_at,prices:quotes(data,server,materials) };
  }
  return {servers,parse,verified,quotes,load};
});
