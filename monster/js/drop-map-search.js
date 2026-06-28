(function () {
  "use strict";

  var index = window.MONSTER_DROP_MAP_INDEX || { itemTypes: {}, itemTypeGroups: {}, maps: [] };
  var itemTypeGroups = index.itemTypeGroups || {};
  var itemSelect = document.getElementById("drop-map-item-type");
  var levelInput = document.getElementById("drop-map-level");
  var marginInput = document.getElementById("drop-map-margin");
  var limitInput = document.getElementById("drop-map-limit");
  var excludeAllInput = document.getElementById("drop-map-exclude-all");
  var status = document.getElementById("drop-map-status");
  var results = document.getElementById("drop-map-result");
  var hiddenItemTypeIds = {
    "46": true,
    "47": true,
    "48": true,
    "49": true,
    "50": true,
    "51": true,
    "52": true,
    "53": true,
    "59": true,
    "60": true,
    "62": true,
    "65": true,
    "66": true,
    "67": true
  };
  var resultRowsCache = {};

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function numberValue(input, fallback) {
    var value = Number(input.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function contains(list, value) {
    return Array.isArray(list) && list.indexOf(value) >= 0;
  }

  function isSearchableItemType(typeId) {
    typeId = String(typeId);
    return Boolean(index.itemTypes[typeId]) && !hiddenItemTypeIds[typeId];
  }

  function addQueryType(types, typeId) {
    typeId = String(typeId);
    if (!index.itemTypes[typeId]) {
      return;
    }
    if (types.indexOf(typeId) >= 0) {
      return;
    }
    types.push(typeId);
  }

  function getQueryTypes(typeId, excludeAllTypes) {
    typeId = String(typeId);
    var allWeaponTypeId = String(itemTypeGroups.allWeaponTypeId || "500");
    var allSubWeaponTypeId = String(itemTypeGroups.allSubWeaponTypeId || "79");
    var weaponTypeIds = (itemTypeGroups.weaponTypeIds || []).map(String);
    var subWeaponTypeIds = (itemTypeGroups.subWeaponTypeIds || []).map(String);
    var types = [];
    addQueryType(types, typeId);
    if (typeId === allWeaponTypeId) {
      weaponTypeIds.forEach(function (id) { addQueryType(types, id); });
    } else if (contains(weaponTypeIds, typeId) && !excludeAllTypes) {
      addQueryType(types, allWeaponTypeId);
    }
    if (typeId === allSubWeaponTypeId) {
      subWeaponTypeIds.forEach(function (id) { addQueryType(types, id); });
    } else if (contains(subWeaponTypeIds, typeId) && !excludeAllTypes) {
      addQueryType(types, allSubWeaponTypeId);
    }
    return types;
  }

  function appendItemOption(typeId) {
    typeId = String(typeId);
    if (!isSearchableItemType(typeId)) {
      return;
    }
    var option = document.createElement("option");
    option.value = typeId;
    option.textContent = index.itemTypes[typeId];
    itemSelect.appendChild(option);
  }

  function fillItemTypes() {
    ["500", "79"].forEach(appendItemOption);
    Object.keys(index.itemTypes)
      .map(function (key) { return Number(key); })
      .filter(function (key) { return Number.isFinite(key); })
      .sort(function (a, b) { return a - b; })
      .forEach(function (key) {
        key = String(key);
        if (key !== "500" && key !== "79") {
          appendItemOption(key);
        }
      });
  }

  function applyQuery() {
    var params = new URLSearchParams(window.location.search);
    if (params.has("type") && isSearchableItemType(params.get("type"))) {
      itemSelect.value = params.get("type");
    } else if (index.itemTypes["500"]) {
      itemSelect.value = "500";
    }
    if (params.has("level")) {
      levelInput.value = params.get("level");
    }
    if (params.has("margin")) {
      marginInput.value = params.get("margin");
    }
    if (params.has("limit")) {
      if (["100", "200", "500"].indexOf(params.get("limit")) >= 0) {
        limitInput.value = params.get("limit");
      }
    }
    if (params.get("exclude_all") === "1") {
      excludeAllInput.checked = true;
    }
  }

  function overlapsLevel(map, level, margin) {
    var min = Number(map.lvMin) || 0;
    var max = Number(map.lvMax) || 0;
    if (min <= 0 || max <= 0) {
      return false;
    }
    return max >= level - margin && min <= level + margin;
  }

  function rarityToken(rarity, sourceTypeId, selectedTypeId) {
    var allWeaponTypeId = String(itemTypeGroups.allWeaponTypeId || "500");
    var allSubWeaponTypeId = String(itemTypeGroups.allSubWeaponTypeId || "79");
    sourceTypeId = String(sourceTypeId);
    selectedTypeId = String(selectedTypeId);
    if (sourceTypeId !== selectedTypeId && (sourceTypeId === allWeaponTypeId || sourceTypeId === allSubWeaponTypeId)) {
      return "all:" + rarity;
    }
    return String(rarity);
  }

  function rarityText(rarities) {
    var regular = [];
    var all = [];
    (rarities || []).forEach(function (rarity) {
      rarity = String(rarity);
      if (rarity.indexOf("all:") === 0) {
        all.push(rarity.slice(4));
      } else {
        regular.push(rarity);
      }
    });
    var parts = [];
    if (regular.length) {
      parts.push("(" + regular.join(",") + ")");
    }
    if (all.length) {
      parts.push("全(" + all.join(",") + ")");
    }
    return parts.length ? " " + parts.join(", ") : "";
  }

  function collectMapMonsters(map, queryTypes, selectedTypeId) {
    var byMonster = {};
    queryTypes.forEach(function (typeId) {
      (map.drops[typeId] || []).forEach(function (monster) {
        var key = String(monster.monsterId);
        if (!byMonster[key]) {
          byMonster[key] = {
            monsterId: monster.monsterId,
            monsterName: monster.monsterName,
            spawnCount: 0,
            rarities: []
          };
        }
        var entry = byMonster[key];
        entry.spawnCount = Math.max(Number(entry.spawnCount) || 0, Number(monster.spawnCount) || 0);
        (monster.rarities || []).forEach(function (rarity) {
          var token = rarityToken(rarity, typeId, selectedTypeId);
          if (entry.rarities.indexOf(token) < 0) {
            entry.rarities.push(token);
          }
        });
      });
    });
    return Object.keys(byMonster).map(function (key) { return byMonster[key]; })
      .sort(function (a, b) { return (Number(b.spawnCount) || 0) - (Number(a.spawnCount) || 0); });
  }

  function getRowsForQueryTypes(queryTypes, selectedTypeId) {
    var cacheKey = selectedTypeId + ":" + queryTypes.join("|");
    if (resultRowsCache[cacheKey]) {
      return resultRowsCache[cacheKey];
    }
    resultRowsCache[cacheKey] = index.maps
      .map(function (map) {
        var monsters = collectMapMonsters(map, queryTypes, selectedTypeId);
        var spawnCount = monsters.reduce(function (sum, monster) {
          return sum + (Number(monster.spawnCount) || 0);
        }, 0);
        var min = Number(map.lvMin) || 0;
        var max = Number(map.lvMax) || 0;
        return {
          map: map,
          monsters: monsters,
          spawnCount: spawnCount,
          levelCenter: min > 0 && max > 0 ? (min + max) / 2 : 0
        };
      })
      .filter(function (row) { return row.monsters.length > 0; });
    return resultRowsCache[cacheKey];
  }

  function scoreMap(row, level) {
    return row.spawnCount * 1000 - Math.abs((row.levelCenter || level) - level);
  }

  function levelText(map) {
    var min = Number(map.lvMin) || 0;
    var max = Number(map.lvMax) || 0;
    if (min <= 0 || max <= 0) {
      return "-";
    }
    if (min === max) {
      return String(min);
    }
    return min + " - " + max;
  }

  function monsterLink(monster) {
    return "monster-list-detail.html?mi=" + encodeURIComponent(monster.monsterId) + "&dlv=2000";
  }

  function renderRows(rows) {
    return rows.map(function (row) {
      var monsters = row.monsters.slice(0, 3);
      var monsterHtml = monsters.map(function (monster) {
        return "<li><a href=\"" + monsterLink(monster) + "\">" + escapeHtml(monster.monsterName) + "</a>"
          + " x" + escapeHtml(monster.spawnCount) + escapeHtml(rarityText(monster.rarities)) + "</li>";
      }).join("");
      return "<tr>"
        + '<td><a class="map-link" href="../map/map_viewer.html?map_id=' + encodeURIComponent(row.map.mapId) + '">'
        + escapeHtml(row.map.mapName) + "</a></td>"
        + "<td>" + escapeHtml(levelText(row.map)) + "</td>"
        + '<td><ul class="monster-list">' + monsterHtml + "</ul></td>"
        + "<td>" + escapeHtml(row.spawnCount) + "</td>"
        + "</tr>";
    }).join("");
  }

  function search() {
    var typeId = itemSelect.value;
    var level = numberValue(levelInput, 0);
    var margin = Math.max(0, numberValue(marginInput, 50));
    var limit = Math.min(1000, Math.max(100, numberValue(limitInput, 100)));
    var queryTypes = getQueryTypes(typeId, excludeAllInput.checked);
    var rows = getRowsForQueryTypes(queryTypes, typeId)
      .filter(function (row) { return overlapsLevel(row.map, level, margin); })
      .sort(function (a, b) { return scoreMap(b, level) - scoreMap(a, level); });

    var limited = rows.slice(0, limit);
    var itemName = index.itemTypes[typeId] || typeId;
    status.textContent = itemName + " / Lv" + level + "±" + margin + " の検索結果 " + rows.length + " 件";

    if (!limited.length) {
      results.innerHTML = "<p>条件に合う狩場が見つかりませんでした。</p>";
      return;
    }

    results.innerHTML = '<table id="table10"><thead><tr>'
      + "<th>狩場</th><th>Lv帯</th><th>該当モンスター</th><th>配置数</th>"
      + "</tr></thead><tbody>" + renderRows(limited) + "</tbody></table>";
  }

  fillItemTypes();
  applyQuery();
  document.getElementById("drop-map-search-submit").addEventListener("click", search);
  [itemSelect, levelInput, marginInput, limitInput].forEach(function (element) {
    element.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        search();
      }
    });
  });
  search();
})();
