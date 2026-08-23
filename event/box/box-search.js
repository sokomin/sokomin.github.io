(function () {
  "use strict";

  var data = window.BOX_SEARCH_DATA;
  if (!data) return;

  var state = { mode: "all", query: "", selected: null };
  var containersById = new Map(data.containers.map(function (container) { return [container.id, container]; }));
  var sourcesById = new Map(data.sources.map(function (source) { return [source.id, source]; }));
  var acquisitionsById = new Map((data.acquisitionSources || []).map(function (source) { return [source.id, source]; }));
  var eventsById = new Map((data.eventSources || []).map(function (source) { return [source.id, source]; }));
  var parentIds = new Map();
  var itemRecords = [];

  data.containers.forEach(function (container) {
    container.contents.forEach(function (entry) {
      if (entry.kind === "container" && entry.childId) {
        var parents = parentIds.get(entry.childId) || [];
        if (!parents.includes(container.id)) parents.push(container.id);
        parentIds.set(entry.childId, parents);
      } else {
        itemRecords.push({ container: container, entry: entry });
      }
    });
  });

  var elements = {
    input: document.getElementById("box-search-input"),
    modes: Array.from(document.querySelectorAll("[data-search-mode]")),
    results: document.getElementById("box-search-results"),
    count: document.getElementById("box-result-count"),
    detail: document.getElementById("box-search-detail"),
    stats: document.getElementById("box-search-stats")
  };

  function normalize(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("ja")
      .replace(/[・·]/g, "")
      .replace(/\s+/g, "");
  }

  var itemSearchFields = [
    { key: "name", score: 0, label: "アイテム名" },
    { key: "added", score: 2, label: "公式画像の付加情報" },
    { key: "features", score: 3, label: "オプション・封印解放等" },
    { key: "tags", score: 4, label: "分類" },
    { key: "details", score: 6, label: "基本情報" }
  ];

  function searchTokens(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("ja")
      .replace(/[・·]/g, " ")
      .split(/\s+/)
      .map(normalize)
      .filter(Boolean);
  }

  function itemMatch(entry, tokens) {
    var index = {
      name: entry.name,
      added: [entry.imageText?.displayTitle].concat(entry.imageText?.lines || [], entry.description || []).filter(Boolean).join(" "),
      features: entry.searchFeatures || "",
      tags: [entry.item?.type, entry.item?.grade].filter(Boolean).join(" "),
      details: entry.item?.searchText || entry.searchText || ""
    };
    var totalScore = 0;
    var matchedField = itemSearchFields[0];
    for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex += 1) {
      var token = tokens[tokenIndex];
      var best = null;
      itemSearchFields.forEach(function (field) {
        var text = normalize(index[field.key]);
        if (!text.includes(token)) return;
        var candidate = { field: field, score: field.score + (text.startsWith(token) ? 0 : 1) };
        if (!best || candidate.score < best.score) best = candidate;
      });
      if (!best) return null;
      totalScore += best.score;
      if (best.field.score > matchedField.score) matchedField = best.field;
    }
    return { score: totalScore, label: matchedField.label };
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cleanDescription(value) {
    return String(value || "")
      .replace(/<c:[^>]+>/g, "")
      .replace(/<n>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function eraLabel(era) {
    return era === "legacy" ? '<span class="box-era-label">(移管前)</span>' : '';
  }

  function getContainerPaths(containerId, visited) {
    var seen = new Set(visited || []);
    if (seen.has(containerId)) return [];
    seen.add(containerId);
    var parents = (parentIds.get(containerId) || []).filter(function (id) { return !seen.has(id); });
    if (!parents.length) return [[containerId]];
    var paths = [];
    parents.forEach(function (parentId) {
      var parentPaths = getContainerPaths(parentId, seen);
      if (!parentPaths.length) parentPaths = [[parentId]];
      parentPaths.forEach(function (path) { paths.push(path.concat(containerId)); });
    });
    return paths;
  }

  function uniquePaths(paths) {
    var seen = new Set();
    return paths.filter(function (path) {
      var key = path.join("/");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function resultRecords() {
    var tokens = searchTokens(state.query);
    var records = [];
    if (state.mode !== "item") {
      data.containers.forEach(function (container) {
        var boxName = normalize(container.name);
        if (!tokens.every(function (token) { return boxName.includes(token); })) return;
        records.push({ kind: "container", container: container, score: !tokens.length || boxName.startsWith(tokens[0]) ? 0 : 1 });
      });
    }
    if (state.mode !== "box" && tokens.length) {
      var grouped = new Map();
      itemRecords.forEach(function (record) {
        var match = itemMatch(record.entry, tokens);
        if (!match) return;
        var era = record.container.era || "current";
        var key = era + "\u0000" + record.entry.name;
        var current = grouped.get(key) || { kind: "item", name: record.entry.name, era: era, records: [], score: match.score, matchLabel: match.label };
        current.records.push(record);
        if (match.score < current.score) {
          current.score = match.score;
          current.matchLabel = match.label;
        }
        grouped.set(key, current);
      });
      grouped.forEach(function (record) { records.push(record); });
    }
    return records.sort(function (a, b) {
      return a.score - b.score || (a.container?.name || a.name).localeCompare(b.container?.name || b.name, "ja");
    });
  }

  function pathLabel(path) {
    return path.map(function (id) { return containersById.get(id)?.name || id; }).join(" → ");
  }

  function renderResultCard(record) {
    if (record.kind === "container") {
      var selected = state.selected?.kind === "container" && state.selected.container.id === record.container.id;
      return '<button class="box-result-card' + (selected ? ' is-selected' : '') + '" data-result-kind="container" data-container-id="' + escapeHtml(record.container.id) + '">' +
        '<span class="box-result-title"><span class="box-badge is-box">BOX</span>' + escapeHtml(record.container.name) + eraLabel(record.container.era) + '</span>' +
        '<span class="box-result-meta">' + (record.container.publishedAt ? escapeHtml(record.container.publishedAt) + '・' : '') + '中身 ' + record.container.contents.length + '件' + (record.container.acquisitionSourceIds.length ? '・公式の入手元あり' : '') + '</span>' +
        '</button>';
    }
    var paths = [];
    record.records.forEach(function (itemRecord) {
      getContainerPaths(itemRecord.container.id).forEach(function (path) { paths.push(path); });
    });
    paths = uniquePaths(paths);
    var first = record.records[0].entry;
    var selectedItem = state.selected?.kind === "item" && state.selected.name === record.name && state.selected.era === record.era;
    return '<button class="box-result-card' + (selectedItem ? ' is-selected' : '') + '" data-result-kind="item" data-item-name="' + escapeHtml(record.name) + '" data-item-era="' + escapeHtml(record.era) + '">' +
      '<span class="box-result-title">' + (first.icon ? '<img src="' + escapeHtml(first.icon) + '" alt="">' : '<span class="box-badge is-item">ITEM</span>') + '<span>' + escapeHtml(record.name) + '</span>' + eraLabel(record.era) + '</span>' +
      '<span class="box-result-meta">出現経路 ' + paths.length + '件' + (record.matchLabel ? '・一致: ' + escapeHtml(record.matchLabel) : '') + '</span>' +
      paths.slice(0, 3).map(function (path) { return '<span class="box-path"><strong>' + escapeHtml(pathLabel(path)) + '</strong></span>'; }).join("") +
      '</button>';
  }

  function renderResults() {
    var records = resultRecords();
    elements.count.textContent = records.length + "件";
    elements.results.innerHTML = records.length
      ? records.map(renderResultCard).join("")
      : '<div class="box-no-results">一致するBOX・アイテムはありません。</div>';
  }

  function sourceList(ids, sourceMap) {
    var items = ids.map(function (id) { return sourceMap.get(id); }).filter(Boolean);
    if (!items.length) return "";
    return '<ul class="box-source-list">' + items.map(function (source) {
      return '<li><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.title) + '</a>' + (source.period ? ' <small>(' + escapeHtml(source.period) + ')</small>' : '') + '</li>';
    }).join("") + '</ul>';
  }

  function renderContainerDetail(container) {
    var contentHtml = container.contents.length
      ? container.contents.map(function (entry) {
        var isContainer = entry.kind === "container";
        var isUnresolved = entry.kind === "unresolved-container";
        return '<button class="box-link-button" data-content-kind="' + escapeHtml(entry.kind) + '" data-container-id="' + escapeHtml(entry.childId) + '" data-item-name="' + escapeHtml(entry.name) + '" data-item-era="' + escapeHtml(container.era || "current") + '">' +
          (entry.icon ? '<img class="box-content-icon" src="' + escapeHtml(entry.icon) + '" alt="">' : '') +
          '<span class="box-link-name"><strong>' + escapeHtml(entry.name) + '</strong><small>' + (isContainer ? 'BOXの中身を見る' : isUnresolved ? 'BOXとして掲載・中身未収録' : '個数 ' + entry.quantity) + '</small></span>' +
          '<span class="box-badge ' + (isContainer || isUnresolved ? 'is-box' : 'is-item') + '">' + (isContainer ? 'BOX' : isUnresolved ? 'BOX?' : 'ITEM') + '</span>' +
          '</button>';
      }).join("")
      : '<div class="box-no-results">公式記事に中身の掲載がないBOXです。</div>';

    var acquisitionHtml = sourceList(container.acquisitionSourceIds || [], acquisitionsById);
    var inheritedEventIds = [];
    getContainerPaths(container.id).forEach(function (path) {
      path.forEach(function (containerId) {
        var pathContainer = containersById.get(containerId);
        (pathContainer?.eventSourceIds || []).forEach(function (id) { if (!inheritedEventIds.includes(id)) inheritedEventIds.push(id); });
      });
    });
    var eventHtml = sourceList(inheritedEventIds, eventsById);
    var dataSourceHtml = sourceList(container.sourceIds || [], sourcesById);
    elements.detail.innerHTML =
      '<div class="box-detail-topline"><div><span class="box-badge is-box">BOX</span><h2>' + escapeHtml(container.name) + '</h2>' + eraLabel(container.era) + '</div><span class="box-stat">' + (container.publishedAt ? escapeHtml(container.publishedAt) + '・' : '') + '中身 ' + container.contents.length + '件</span></div>' +
      '<p class="box-detail-summary">' + (container.era === "legacy" ? '移管前の掲載内容です。同名の現行BOXとは別の版として表示しています。' : 'BOXを含む出現物は、そのBOXの詳細へ続けて移動できます。') + '</p>' +
      '<section class="box-section"><h3>中身</h3><div class="box-content-list">' + contentHtml + '</div></section>' +
      (acquisitionHtml ? '<section class="box-section"><h3>このBOXの入手元として確認できる公式記事</h3>' + acquisitionHtml + '</section>' : '') +
      (eventHtml ? '<section class="box-section"><h3>登場した公式企画</h3>' + eventHtml + '</section>' : '') +
      (dataSourceHtml ? '<section class="box-section"><h3>中身の公式ソース</h3>' + dataSourceHtml + '</section>' : '');
  }

  function renderItemDetail(name, records, era) {
    var entry = records[0].entry;
    var paths = [];
    records.forEach(function (record) {
      getContainerPaths(record.container.id).forEach(function (path) { paths.push(path); });
    });
    paths = uniquePaths(paths);
    var item = entry.item;
    var legacyDescriptions = Array.from(new Set(records.map(function (record) { return record.entry.description; }).filter(Boolean)));
    var itemData = era === "legacy"
      ? '<div class="box-item-data">' + (legacyDescriptions.length ? legacyDescriptions.map(function (description) { return '<p class="box-item-description">' + escapeHtml(description) + '</p>'; }).join("") : '移管前の記事に文字による説明はありません。') + '</div>'
      : item
        ? '<div class="box-item-data"><dl><dt>分類</dt><dd>' + escapeHtml(item.type || "-") + '</dd><dt>要求Lv</dt><dd>' + escapeHtml(item.requiredLevel) + '</dd><dt>アイテムLv</dt><dd>' + escapeHtml(item.level) + '</dd></dl><p class="box-item-description">' + escapeHtml(cleanDescription(item.searchText)) + '</p></div>'
        : '<div class="box-item-data">既存アイテム検索データとの一致はありません。</div>';
    var variants = new Map();
    records.forEach(function (record) {
      var variantKey = [record.entry.detailImage || "", JSON.stringify(record.entry.imageText || null)].join("\u0000");
      var variant = variants.get(variantKey) || { entry: record.entry, boxes: [] };
      if (!variant.boxes.includes(record.container.name)) variant.boxes.push(record.container.name);
      variants.set(variantKey, variant);
    });
    var variantHtml = Array.from(variants.values()).map(function (variant, index) {
      var variantImage = variant.entry.detailImage
        ? '<img class="box-detail-image" src="' + escapeHtml(variant.entry.detailImage) + '" alt="' + escapeHtml(name) + 'の公式アイテム詳細画像 ' + (index + 1) + '">'
        : '<div class="box-item-data">公式記事に詳細画像はありません。</div>';
      var variantText = variant.entry.imageText
        ? '<div class="box-image-text"><p><strong>' + escapeHtml(variant.entry.imageText.displayTitle) + '</strong></p><ul class="box-source-list">' + variant.entry.imageText.lines.map(function (line) { return '<li>' + escapeHtml(line) + '</li>'; }).join("") + '</ul></div>'
        : '';
      return '<article class="box-item-variant"><h4>掲載画像 ' + (index + 1) + '</h4><p class="box-variant-boxes">掲載BOX：' + escapeHtml(variant.boxes.join("、")) + '</p><div class="box-item-view">' + variantImage + '<div>' + variantText + '</div></div></article>';
    }).join("");
    var pathHtml = paths.map(function (path) {
      var targetId = path[path.length - 1];
      return '<button class="box-path-button" data-open-container="' + escapeHtml(targetId) + '">' + escapeHtml(pathLabel(path)) + '</button>';
    }).join("");
    var sourceIds = [];
    var eventSourceIds = [];
    records.forEach(function (record) {
      record.container.sourceIds.forEach(function (id) { if (!sourceIds.includes(id)) sourceIds.push(id); });
    });
    paths.forEach(function (path) {
      path.forEach(function (containerId) {
        var container = containersById.get(containerId);
        (container?.eventSourceIds || []).forEach(function (id) { if (!eventSourceIds.includes(id)) eventSourceIds.push(id); });
      });
    });
    elements.detail.innerHTML =
      '<div class="box-detail-topline"><div><span class="box-badge is-item">ITEM</span><h2>' + escapeHtml(name) + '</h2>' + eraLabel(era) + '</div></div>' +
      '<section class="box-section"><h3>出現するBOX</h3><div class="box-path-list">' + pathHtml + '</div></section>' +
      '<section class="box-section"><h3>基本情報</h3>' + itemData + '</section>' +
      (era === "legacy" ? '' : '<section class="box-section"><h3>公式記事の詳細画像</h3><div class="box-item-variants">' + variantHtml + '</div></section>') +
      (eventSourceIds.length ? '<section class="box-section"><h3>この入手経路が登場した公式企画</h3>' + sourceList(eventSourceIds, eventsById) + '</section>' : '') +
      '<section class="box-section"><h3>公式ソース</h3>' + sourceList(sourceIds, sourcesById) + '</section>';
  }

  function selectContainer(id) {
    var container = containersById.get(id);
    if (!container) return;
    state.selected = { kind: "container", container: container };
    renderContainerDetail(container);
    renderResults();
    window.history.replaceState(null, "", "#box=" + encodeURIComponent(id));
  }

  function selectItem(name, era) {
    var records = itemRecords.filter(function (record) {
      return record.entry.name === name && (record.container.era || "current") === era;
    });
    if (!records.length) return;
    state.selected = { kind: "item", name: name, era: era };
    renderItemDetail(name, records, era);
    renderResults();
  }

  function updateMode(mode) {
    state.mode = mode;
    elements.modes.forEach(function (button) {
      var active = button.dataset.searchMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderResults();
  }

  elements.input.addEventListener("input", function () {
    state.query = elements.input.value;
    renderResults();
  });
  elements.modes.forEach(function (button) {
    button.addEventListener("click", function () { updateMode(button.dataset.searchMode); });
  });
  elements.results.addEventListener("click", function (event) {
    var card = event.target.closest("[data-result-kind]");
    if (!card) return;
    if (card.dataset.resultKind === "container") selectContainer(card.dataset.containerId);
    else selectItem(card.dataset.itemName, card.dataset.itemEra);
  });
  elements.detail.addEventListener("click", function (event) {
    var content = event.target.closest("[data-content-kind]");
    if (content) {
      if (content.dataset.contentKind === "container") selectContainer(content.dataset.containerId);
      else selectItem(content.dataset.itemName, content.dataset.itemEra);
      return;
    }
    var pathButton = event.target.closest("[data-open-container]");
    if (pathButton) selectContainer(pathButton.dataset.openContainer);
  });

  var relationCount = data.containers.reduce(function (sum, container) { return sum + container.contents.length; }, 0);
  var enrichedCount = itemRecords.filter(function (record) { return Boolean(record.entry.item); }).length;
  var currentCount = data.containers.filter(function (container) { return container.era !== "legacy"; }).length;
  var legacyCount = data.containers.length - currentCount;
  elements.stats.innerHTML = '<span class="box-stat">現行BOX ' + currentCount + '件</span><span class="box-stat">移管前BOX ' + legacyCount + '件</span><span class="box-stat">収録関係 ' + relationCount + '件</span><span class="box-stat">詳細検索対応 ' + enrichedCount + '件</span><span class="box-stat">更新基準 ' + escapeHtml(data.updatedAt) + '</span>';

  var initialId = decodeURIComponent((location.hash.match(/box=([^&]+)/) || [])[1] || "");
  renderResults();
  if (containersById.has(initialId)) selectContainer(initialId);
  else selectContainer(data.containers.find(function (container) { return container.name === "黄金の人形・改"; })?.id || data.containers[0].id);
}());
