(function () {
  'use strict';

  var data = window.MONSTER_IMAGE_COMPARE_DATA || { assetBase: '', entries: [] };
  var entries = data.entries || [];
  var pageSize = 24;
  var currentPage = 1;
  var filtered = [];

  var elements = {
    query: document.getElementById('monster-compare-query'),
    category: document.getElementById('monster-compare-category'),
    availability: document.getElementById('monster-compare-availability'),
    view: document.getElementById('monster-compare-view'),
    sort: document.getElementById('monster-compare-sort'),
    summary: document.getElementById('monster-compare-summary'),
    grid: document.getElementById('monster-compare-grid'),
    prev: document.getElementById('monster-compare-prev'),
    next: document.getElementById('monster-compare-next'),
    page: document.getElementById('monster-compare-page'),
    dialog: document.getElementById('monster-compare-dialog'),
    dialogImage: document.getElementById('monster-compare-dialog-image'),
    dialogCaption: document.getElementById('monster-compare-dialog-caption')
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function searchableText(entry) {
    var monsterNames = entry.monsters.map(function (monster) { return monster.name; });
    return monsterNames.concat(entry.npcNames).join(' ').toLowerCase();
  }

  function availability(entry, view) {
    var oldExists = Boolean(entry.old[view]);
    var newExists = Boolean(entry.new[view]);
    if (oldExists && newExists) return 'both';
    if (newExists) return 'new-only';
    if (oldExists) return 'old-only';
    return 'none';
  }

  function entryLabel(entry) {
    if (entry.monsters.length) return entry.monsters[0].name;
    if (entry.npcNames.length) return entry.npcNames[0];
    return '名称未登録';
  }

  function allNames(entry) {
    var monsterNames = entry.monsters.map(function (monster) { return monster.name; });
    return monsterNames.concat(entry.npcNames).filter(function (name, index, names) {
      return names.indexOf(name) === index;
    });
  }

  function titleHtml(entry) {
    if (entry.monsters.length) {
      var monster = entry.monsters[0];
      return '<a href="monster-list-detail.html?mi=' + encodeURIComponent(monster.id) + '">' +
        escapeHtml(monster.name) + '</a>';
    }
    return escapeHtml(entryLabel(entry));
  }

  function assetFile(entry, view) {
    if (view === 'back') return entry.asset + '_back.png';
    if (view === 'idle') return entry.asset + '_idle.gif';
    return entry.asset + '.png';
  }

  function imageHtml(entry, version, view) {
    if (!entry[version][view]) {
      return '<div class="monster-compare-missing">画像なし</div>';
    }
    var directory = version === 'old' ? 'monster2022' : 'monster';
    var label = entryLabel(entry) + ' ' + (version === 'old' ? '旧版' : '新版');
    var src = data.assetBase + '/' + directory + '/' + assetFile(entry, view);
    var image = '<img loading="lazy" decoding="async" src="' + escapeHtml(src) + '" alt="' +
      escapeHtml(label) + '" onerror="this.parentNode.innerHTML=\'<div class=&quot;monster-compare-missing&quot;>読み込み失敗</div>\'">';
    if (!entry[version].idle) return image;
    var rotateSrc = data.assetBase + '/' + directory + '/' + entry.asset + '_idle.gif';
    return '<button type="button" class="monster-compare-rotate" data-rotate-url="' + escapeHtml(rotateSrc) +
      '" data-rotate-caption="' + escapeHtml(label) + '" aria-label="' + escapeHtml(label) + 'を回転表示">' +
      image + '<span class="monster-compare-rotate-hint" aria-hidden="true">クリックで回転</span></button>';
  }

  function cardHtml(entry, view) {
    var names = allNames(entry);
    var extraNames = names.length > 1 ? names.slice(1).join('、') : '';
    var categoryLabel = entry.category === 'monster' ? 'モンスター' : entry.category === 'npc' ? 'NPC' : '名称未登録';
    return '<article class="monster-compare-card">' +
      '<header class="monster-compare-card-header">' +
        '<h2 class="monster-compare-title">' + titleHtml(entry) + '</h2>' +
      '</header>' +
      '<div class="monster-compare-images">' +
        '<section class="monster-compare-version">' +
          '<div class="monster-compare-version-label">旧版（2022）</div>' +
          '<div class="monster-compare-image-box">' + imageHtml(entry, 'old', view) + '</div>' +
        '</section>' +
        '<section class="monster-compare-version">' +
          '<div class="monster-compare-version-label">新版（現行）</div>' +
          '<div class="monster-compare-image-box">' + imageHtml(entry, 'new', view) + '</div>' +
        '</section>' +
      '</div>' +
      '<div class="monster-compare-names"><strong>' + categoryLabel + '</strong>' +
        (extraNames ? '<br>同じ画像を使う名称: ' + escapeHtml(extraNames) : '') + '</div>' +
    '</article>';
  }

  function render() {
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * pageSize;
    var pageEntries = filtered.slice(start, start + pageSize);
    var view = elements.view.value;

    elements.grid.innerHTML = pageEntries.length
      ? pageEntries.map(function (entry) { return cardHtml(entry, view); }).join('')
      : '<div class="monster-compare-empty">条件に一致する画像がありません。</div>';
    elements.summary.innerHTML = '<span class="monster-compare-chip">全 ' + entries.length + ' 件</span>' +
      '<span class="monster-compare-chip">表示対象 ' + filtered.length + ' 件</span>' +
      '<span class="monster-compare-chip">' + currentPage + ' / ' + totalPages + ' ページ</span>';
    elements.page.textContent = currentPage + ' / ' + totalPages;
    elements.prev.disabled = currentPage <= 1;
    elements.next.disabled = currentPage >= totalPages;
  }

  function filterEntries() {
    var query = elements.query.value.trim().toLowerCase();
    var category = elements.category.value;
    var selectedAvailability = elements.availability.value;
    var view = elements.view.value;
    var sort = elements.sort.value;

    filtered = entries.filter(function (entry) {
      if (query && searchableText(entry).indexOf(query) === -1) return false;
      if (category !== 'all' && entry.category !== category) return false;
      var state = availability(entry, view);
      if (state === 'none') return false;
      return selectedAvailability === 'all' || state === selectedAvailability;
    });

    filtered.sort(function (a, b) {
      if (sort === 'name') return entryLabel(a).localeCompare(entryLabel(b), 'ja');
      return a.asset.localeCompare(b.asset);
    });
    currentPage = 1;
    render();
  }

  [elements.query, elements.category, elements.availability, elements.view, elements.sort].forEach(function (element) {
    element.addEventListener(element === elements.query ? 'input' : 'change', filterEntries);
  });
  elements.prev.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage -= 1;
      render();
      elements.summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  elements.next.addEventListener('click', function () {
    if (currentPage * pageSize < filtered.length) {
      currentPage += 1;
      render();
      elements.summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  function closeDialog() {
    if (!elements.dialog) return;
    if (typeof elements.dialog.close === 'function') elements.dialog.close();
    else elements.dialog.removeAttribute('open');
    elements.dialogImage.src = '';
    elements.dialogImage.alt = '';
    elements.dialogCaption.textContent = '';
  }

  elements.grid.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-rotate-url]');
    if (!trigger || !elements.dialog) return;
    var caption = trigger.getAttribute('data-rotate-caption') || '';
    elements.dialogImage.src = trigger.getAttribute('data-rotate-url');
    elements.dialogImage.alt = caption;
    elements.dialogCaption.textContent = caption;
    if (typeof elements.dialog.showModal === 'function') elements.dialog.showModal();
    else elements.dialog.setAttribute('open', '');
  });

  elements.dialog.addEventListener('click', function (event) {
    if (event.target === elements.dialog || event.target.matches('[data-action="close"]')) closeDialog();
  });

  filterEntries();
}());
