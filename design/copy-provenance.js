(() => {
  'use strict';
  const script = document.currentScript;
  const pageId = script && script.getAttribute('data-sk-page');
  if (!pageId) return;
  const MIN_LENGTH = 80;
  const PREFIX = 'sokomin-copy-v1|';
  const ZERO = '\u200B';
  const ONE = '\u200C';
  const BOUNDARY = '\u2060';
  const marker = (value) => {
    let bits = '';
    for (let i = 0; i < value.length; i += 1) {
      const code = value.charCodeAt(i);
      for (let bit = 7; bit >= 0; bit -= 1) bits += ((code >> bit) & 1) ? ONE : ZERO;
    }
    return BOUNDARY + bits + BOUNDARY;
  };
  const isEditable = (target) => target && typeof target.closest === 'function'
    && target.closest('input, textarea, [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]');
  document.addEventListener('copy', (event) => {
    if (isEditable(event.target) || !event.clipboardData) return;
    const selection = window.getSelection();
    if (!selection) return;
    const text = selection.toString();
    if ([...text].filter((character) => character.trim().length > 0).length < MIN_LENGTH) return;
    const provenance = marker(PREFIX + pageId);
    try {
      event.clipboardData.setData('text/plain', text + provenance);
      if (selection.rangeCount > 0) {
        const container = document.createElement('div');
        for (let i = 0; i < selection.rangeCount; i += 1) {
          container.appendChild(selection.getRangeAt(i).cloneContents());
        }
        const stamp = document.createElement('span');
        stamp.setAttribute('aria-hidden', 'true');
        stamp.setAttribute('data-sk-copy', 'v1');
        stamp.textContent = provenance;
        container.appendChild(stamp);
        event.clipboardData.setData('text/html', container.innerHTML);
      }
      event.preventDefault();
    } catch (_) {
      return;
    }
  }, true);
})();
