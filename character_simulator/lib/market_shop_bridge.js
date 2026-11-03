import { parseShopUrl } from './market_shop_url.js';

export function mountShopBridge({ panel, simulatorUrl, win = window }) {
  const doc = panel.ownerDocument;
  const update = () => {
    panel.querySelectorAll('[data-shop-import]').forEach(node => node.remove());
    if (!panel.querySelector('.detail-tooltip')) return;
    try {
      const source = parseShopUrl('https://sokomin.github.io/market/item-detail.html' + win.location.search);
      const target = new URL(simulatorUrl,win.location.href);
      if (target.origin !== win.location.origin) return;
      target.hash = 'market-shop=' + encodeURIComponent(source.href);
      const a = doc.createElement('a');
      a.setAttribute('data-shop-import',''); a.href = target.href;
      a.textContent = 'キャラシミュに取り込む'; a.target = '_blank'; a.rel = 'noopener noreferrer';
      panel.append(a);
    } catch {  }
  };
  
  const observer = new win.MutationObserver(records => {
    if (records.some(r => [...r.addedNodes,...r.removedNodes].some(n => n.nodeType === 1 && !n.hasAttribute('data-shop-import')))) update();
  });
  observer.observe(panel,{childList:true}); update();
  return () => observer.disconnect();
}
