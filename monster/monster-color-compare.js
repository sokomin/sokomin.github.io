(function () {
  'use strict';

  var data = window.MONSTER_IMAGE_COMPARE_DATA || { assetBase: '', entries: [] };
  var filtered = [];

  var elements = {
    query: document.getElementById('monster-color-query'),
    availability: document.getElementById('monster-color-availability'),
    view: document.getElementById('monster-color-view'),
    sort: document.getElementById('monster-color-sort'),
    summary: document.getElementById('monster-color-summary'),
    list: document.getElementById('monster-color-list'),
    dialog: document.getElementById('monster-color-dialog'),
    dialogImage: document.getElementById('monster-color-dialog-image'),
    dialogCaption: document.getElementById('monster-color-dialog-caption')
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function allNames(entry) {
    return entry.monsters.map(function (monster) { return monster.name; })
      .filter(function (name, index, names) { return names.indexOf(name) === index; });
  }

  function primaryName(entry) {
    return entry.monsters.length ? entry.monsters[0].name : '';
  }

  function isExcludedNpc(entry) {
    return entry.monsters.some(function (monster) {
      return monster.name.indexOf('宴会用服') === 0 ||
        monster.name === '進化npc 財貨' ||
        monster.name === '進化npc 狩り';
    });
  }

  function createGroups(entries) {
    var grouped = {};
    entries.forEach(function (entry) {
      if (entry.category !== 'monster' || isExcludedNpc(entry) || !/^[0-9a-f]{4}000[0-4]$/i.test(entry.asset)) return;
      var key = entry.asset.slice(0, 4).toLowerCase();
      var colorIndex = Number(entry.asset.slice(-1));
      if (!grouped[key]) grouped[key] = { key: key, colors: [] };
      grouped[key].colors[colorIndex] = entry;
    });
    return Object.keys(grouped).map(function (key) { return grouped[key]; })
      .filter(function (group) {
        var colorIndex;
        for (colorIndex = 0; colorIndex < 5; colorIndex += 1) {
          if (!group.colors[colorIndex]) return false;
        }
        return true;
      });
  }

  var groups = createGroups(data.entries || []);

  function searchableText(group) {
    var names = [];
    group.colors.forEach(function (entry) { names = names.concat(allNames(entry)); });
    return names.join(' ').toLowerCase();
  }

  function groupLabel(group) {
    return group.colors.map(primaryName).filter(Boolean).join('／');
  }

  function versionComplete(group, version, view) {
    return group.colors.every(function (entry) { return Boolean(entry[version][view]); });
  }

  function availability(group, view) {
    var oldComplete = versionComplete(group, 'old', view);
    var newComplete = versionComplete(group, 'new', view);
    if (oldComplete && newComplete) return 'both';
    if (newComplete) return 'new-only';
    if (oldComplete) return 'old-only';
    return 'none';
  }

  function assetFile(entry, view) {
    if (view === 'back') return entry.asset + '_back.png';
    if (view === 'idle') return entry.asset + '_idle.gif';
    return entry.asset + '.png';
  }

  function imageHtml(entry, version, view) {
    if (!entry[version][view]) return '<div class="monster-color-missing">画像なし</div>';
    var directory = version === 'old' ? 'monster2022' : 'monster';
    var versionLabel = version === 'old' ? '旧版' : '現行';
    var label = primaryName(entry) + ' ' + versionLabel;
    var src = data.assetBase + '/' + directory + '/' + assetFile(entry, view);
    var image = '<img loading="lazy" decoding="async" src="' + escapeHtml(src) + '" alt="' +
      escapeHtml(label) + '" onerror="this.parentNode.innerHTML=\'<div class=&quot;monster-color-missing&quot;>読み込み失敗</div>\'">';
    if (!entry[version].idle) return image;
    var rotateSrc = data.assetBase + '/' + directory + '/' + entry.asset + '_idle.gif';
    return '<button type="button" class="monster-color-rotate" data-rotate-url="' + escapeHtml(rotateSrc) +
      '" data-rotate-caption="' + escapeHtml(label) + '" aria-label="' + escapeHtml(label) + 'を回転表示">' +
      image + '<span class="monster-color-rotate-hint" aria-hidden="true">クリックで回転</span></button>';
  }

  function nameHtml(entry, colorIndex) {
    var names = allNames(entry);
    var first = entry.monsters[0];
    var firstName = first
      ? '<a href="monster-list-detail.html?mi=' + encodeURIComponent(first.id) + '">' + escapeHtml(first.name) + '</a>'
      : '';
    var extra = names.length > 1 ? '<span>' + escapeHtml(names.slice(1).join('、')) + '</span>' : '';
    return '<div class="monster-color-name"><strong>色' + (colorIndex + 1) + '</strong>' + firstName + extra + '</div>';
  }

  function versionRowHtml(group, version, view) {
    var label = version === 'old' ? '旧版（2022）' : '現行';
    return '<section class="monster-color-version">' +
      '<h3>' + label + '</h3>' +
      '<div class="monster-color-images">' + group.colors.map(function (entry) {
        return '<div class="monster-color-image-box">' + imageHtml(entry, version, view) + '</div>';
      }).join('') + '</div>' +
    '</section>';
  }

  function cardHtml(group, view) {
    return '<article class="monster-color-card">' +
      '<header class="monster-color-card-header"><h2>' + escapeHtml(groupLabel(group)) + '</h2></header>' +
      '<div class="monster-color-column-labels">' + group.colors.map(function (entry, index) {
        return '<span>色' + (index + 1) + '</span>';
      }).join('') + '</div>' +
      versionRowHtml(group, 'old', view) +
      versionRowHtml(group, 'new', view) +
      '<div class="monster-color-names">' + group.colors.map(nameHtml).join('') + '</div>' +
    '</article>';
  }

  function render() {
    var view = elements.view.value;

    elements.list.innerHTML = filtered.length
      ? filtered.map(function (group) { return cardHtml(group, view); }).join('')
      : '<div class="monster-color-empty">条件に一致する5色画像がありません。</div>';
    elements.summary.innerHTML = '<span class="monster-color-chip">全 ' + groups.length + ' 組</span>' +
      '<span class="monster-color-chip">表示対象 ' + filtered.length + ' 組</span>';
  }

  function filterGroups() {
    var query = elements.query.value.trim().toLowerCase();
    var selectedAvailability = elements.availability.value;
    var view = elements.view.value;
    var sort = elements.sort.value;

    filtered = groups.filter(function (group) {
      if (query && searchableText(group).indexOf(query) === -1) return false;
      var state = availability(group, view);
      if (state === 'none') return false;
      return selectedAvailability === 'all' || state === selectedAvailability;
    });

    filtered.sort(function (a, b) {
      if (sort === 'name') return groupLabel(a).localeCompare(groupLabel(b), 'ja');
      return a.key.localeCompare(b.key);
    });
    render();
  }

  [elements.query, elements.availability, elements.view, elements.sort].forEach(function (element) {
    element.addEventListener(element === elements.query ? 'input' : 'change', filterGroups);
  });

  function closeDialog() {
    if (!elements.dialog) return;
    if (typeof elements.dialog.close === 'function') elements.dialog.close();
    else elements.dialog.removeAttribute('open');
    elements.dialogImage.src = '';
    elements.dialogImage.alt = '';
    elements.dialogCaption.textContent = '';
  }

  elements.list.addEventListener('click', function (event) {
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

  filterGroups();
}());

