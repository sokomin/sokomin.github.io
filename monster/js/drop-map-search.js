(function () {
  "use strict";

  var index = window.MONSTER_DROP_MAP_INDEX || { itemTypes: {}, itemTypeGroups: {}, maps: [] };
  var itemTypeGroups = index.itemTypeGroups || {};
  var itemSelect = document.getElementById("drop-map-item-type");
  var levelInput = document.getElementById("drop-map-level");
  var marginInput = document.getElementById("drop-map-margin");
  var limitInput = document.getElementById("drop-map-limit");
  var status = document.getElementById("drop-map-status");
  var results = document.getElementById("drop-map-result");

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

  function getQueryTypes(typeId) {
    typeId = String(typeId);
    var allWeaponTypeId = String(itemTypeGroups.allWeaponTypeId || "500");
    var allSubWeaponTypeId = String(itemTypeGroups.allSubWeaponTypeId || "79");
    var weaponTypeIds = (itemTypeGroups.weaponTypeIds || []).map(String);
    var subWeaponTypeIds = (itemTypeGroups.subWeaponTypeIds || []).map(String);
    var types = [];
    addQueryType(types, typeId);
    if (typeId === allWeaponTypeId) {
      weaponTypeIds.forEach(function (id) { addQueryType(types, id); });
    } else if (contains(weaponTypeIds, typeId)) {
      addQueryType(types, allWeaponTypeId);
    }
    if (typeId === allSubWeaponTypeId) {
      subWeaponTypeIds.forEach(function (id) { addQueryType(types, id); });
    } else if (contains(subWeaponTypeIds, typeId)) {
      addQueryType(types, allSubWeaponTypeId);
    }
    return types;
  }

  function fillItemTypes() {
    Object.keys(index.itemTypes)
      .map(function (key) { return Number(key); })
      .filter(function (key) { return Number.isFinite(key); })
      .sort(function (a, b) { return a - b; })
      .forEach(function (key) {
        var option = document.createElement("option");
        option.value = String(key);
        option.textContent = index.itemTypes[key];
        itemSelect.appendChild(option);
      });
  }

  function applyQuery() {
    var params = new URLSearchParams(window.location.search);
    if (params.has("type") && index.itemTypes[params.get("type")]) {
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
  }

  function overlapsLevel(map, level, margin) {
    var min = Number(map.lvMin) || 0;
    var max = Number(map.lvMax) || 0;
    if (min <= 0 || max <= 0) {
      return false;
    }
    return max >= level - margin && min <= level + margin;
  }

  function collectMapMonsters(map, queryTypes) {
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
          if (entry.rarities.indexOf(rarity) < 0) {
            entry.rarities.push(rarity);
          }
        });
      });
    });
    return Object.keys(byMonster).map(function (key) { return byMonster[key]; })
      .sort(function (a, b) { return (Number(b.spawnCount) || 0) - (Number(a.spawnCount) || 0); });
  }

  function scoreMap(row, level) {
    var spawnScore = row.monsters.reduce(function (sum, monster) {
      return sum + (Number(monster.spawnCount) || 0);
    }, 0);
    var min = Number(row.map.lvMin) || level;
    var max = Number(row.map.lvMax) || level;
    return spawnScore * 1000 - Math.abs(((min + max) / 2) - level);
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
        var rarity = monster.rarities && monster.rarities.length
          ? " (" + monster.rarities.join(",") + ")"
          : "";
        return "<li><a href=\"" + monsterLink(monster) + "\">" + escapeHtml(monster.monsterName) + "</a>"
          + " x" + escapeHtml(monster.spawnCount) + escapeHtml(rarity) + "</li>";
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
    var queryTypes = getQueryTypes(typeId);
    var rows = index.maps
      .map(function (map) {
        var monsters = collectMapMonsters(map, queryTypes);
        var spawnCount = monsters.reduce(function (sum, monster) {
          return sum + (Number(monster.spawnCount) || 0);
        }, 0);
        return { map: map, monsters: monsters, spawnCount: spawnCount };
      })
      .filter(function (row) { return row.monsters.length > 0 && overlapsLevel(row.map, level, margin); })
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
