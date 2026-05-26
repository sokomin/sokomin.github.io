(function () {
  "use strict";

  var DEFAULT_CSV_URL = "https://sokomin.github.io/sokomin_repository/db/monster.csv";
  var MAX_RESULTS = 300;
  var DROP_FIELD_START = 29;
  var DROP_FIELD_END = 85;
  var DROP_FIELD_STEP = 4;

  var itemTypeTextOverride = {
    0: "ヘルメット",
    1: "冠",
    2: "グローブ",
    3: "投擲機",
    4: "爪",
    5: "ブレスレット",
    6: "ベルト",
    7: "ブーツ",
    8: "ネックレス",
    9: "リング",
    10: "イヤリング",
    11: "マント",
    12: "ブローチ",
    13: "腕刺青",
    14: "肩刺青",
    15: "十字架",
    16: "共用鎧",
    17: "専用鎧",
    18: "片手剣",
    19: "盾",
    20: "両手剣",
    21: "杖",
    22: "牙",
    23: "メイス",
    24: "翼",
    25: "短剣",
    26: "弓",
    27: "矢",
    28: "槍",
    29: "笛",
    30: "スリング",
    31: "スリング弾丸",
    32: "ワンド",
    33: "鞭",
    34: "宝石",
    35: "ヒールポーション",
    36: "チャージポーション",
    37: "ステータスポーション",
    38: "油、爪、心臓ほか",
    39: "治療薬",
    40: "霊薬、復活",
    41: "鍵",
    42: "移動アイテム",
    43: "必殺技の巻物",
    44: "お菓子",
    45: "力の霊薬ほか",
    46: "魔力補充キット",
    47: "セッティング原石",
    48: "イベントアイテム",
    49: "クエストアイテム",
    50: "課金アイテム",
    51: "エンチャント",
    52: "BOX",
    53: "null",
    54: "鎌",
    55: "クロー",
    56: "本",
    57: "ほうき",
    58: "双剣",
    59: "コスチューム",
    60: "クレスト",
    61: "ダークコア",
    62: "null",
    63: "双拳銃",
    64: "魔弾石",
    65: "超越の書ノーマル",
    66: "超越の書レア",
    67: "超越の書ユニーク",
    68: "錬金石",
    69: "触媒石",
    70: "格闘武器",
    71: "鞘",
    72: "マスターキー",
    73: "保護帯",
    74: "獣毛装飾",
    75: "星群",
    76: "契約霊",
    77: "ウォーペイント",
    78: "コサージュ",
    80: "アンカー",
    81: "酒瓶",
    82: "大砲",
    83: "エネルギーチャージャー"
  };

  var fallbackMobSpec = {
    0: "アンデット型",
    1: "人間型",
    2: "悪魔型",
    3: "動物型",
    4: "神獣型",
    5: "位相型"
  };

  var fallbackMobRank = {
    0: "一般1",
    1: "一般2",
    2: "一般3",
    3: "一般4",
    4: "セミボス1",
    5: "セミボス2",
    6: "セミボス3",
    7: "ボス1",
    8: "ボス2",
    9: "ボス3"
  };

  var state = {
    loaded: false,
    monsters: []
  };

  function $(id) {
    return document.getElementById(id);
  }

  function getItemTypeText() {
    var text = {};
    if (typeof item_type_text !== "undefined") {
      Object.keys(item_type_text).forEach(function (key) {
        text[key] = item_type_text[key];
      });
    }
    Object.keys(itemTypeTextOverride).forEach(function (key) {
      text[key] = itemTypeTextOverride[key];
    });
    return text;
  }

  function getMobSpec() {
    if (typeof mobSpec !== "undefined") {
      return mobSpec;
    }
    return fallbackMobSpec;
  }

  function getMobRank() {
    if (typeof mobRank !== "undefined") {
      return mobRank;
    }
    return fallbackMobRank;
  }

  function normalizeText(value) {
    return String(value || "").normalize("NFKC").toLowerCase().trim();
  }

  function toNumber(value, defaultValue) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var field = "";
    var inQuotes = false;

    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      var next = text[i + 1];

      if (ch === '"') {
        if (inQuotes && next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
        if (ch === "\r" && next === "\n") {
          i++;
        }
        row.push(field);
        if (row.length > 1 || row[0] !== "") {
          rows.push(row);
        }
        row = [];
        field = "";
      } else {
        field += ch;
      }
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }

    return rows;
  }

  function rowsToObjects(rows) {
    if (!rows.length) {
      return [];
    }

    var header = rows[0];
    return rows.slice(1).map(function (row) {
      var obj = {};
      header.forEach(function (key, index) {
        obj[key] = row[index] == null ? "" : row[index];
      });
      return obj;
    });
  }

  function getDropItems(monster) {
    var itemTypeText = getItemTypeText();
    var drops = [];

    for (var fieldNo = DROP_FIELD_START; fieldNo <= DROP_FIELD_END; fieldNo += DROP_FIELD_STEP) {
      var typeId = toNumber(monster["unknown_" + fieldNo], -1);
      if (typeId < 0) {
        continue;
      }

      var rarityField = "unknown_" + (fieldNo + 2);
      drops.push({
        typeId: typeId,
        name: itemTypeText[typeId] || typeId + "系列",
        rarity: monster[rarityField] || ""
      });
    }

    return drops;
  }

  function getMonsterImageUrl(monster) {
    var effectId = toNumber(monster.EffectId, 0).toString(16);
    var effectId2 = toNumber(monster.EffectId_2, 0);
    if (effectId2 < 0) {
      effectId2 = 0;
    }
    var padded = ("0" + effectId).slice(-3).toLowerCase();
    return "https://sokomin.github.io/monster/design/image/monster/0" + padded + "000" + effectId2 + ".png";
  }

  function getCsvUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get("csv") || DEFAULT_CSV_URL;
  }

  function setStatus(message) {
    $("drop-search-status").textContent = message || "";
  }

  function populateSelects() {
    var itemSelect = $("drop-item-type");
    var speciesSelect = $("drop-species");
    var itemTypeText = getItemTypeText();
    var mobSpecMap = getMobSpec();

    Object.keys(itemTypeText)
      .map(function (key) { return Number(key); })
      .filter(function (key) { return Number.isFinite(key); })
      .sort(function (a, b) { return a - b; })
      .forEach(function (key) {
        var option = document.createElement("option");
        option.value = String(key);
        option.textContent = itemTypeText[key];
        itemSelect.appendChild(option);
      });

    Object.keys(mobSpecMap)
      .map(function (key) { return Number(key); })
      .filter(function (key) { return Number.isFinite(key); })
      .sort(function (a, b) { return a - b; })
      .forEach(function (key) {
        var option = document.createElement("option");
        option.value = String(key);
        option.textContent = mobSpecMap[key];
        speciesSelect.appendChild(option);
      });
  }

  function hydrateMonsters(rawRows) {
    return rowsToObjects(parseCsv(rawRows))
      .map(function (monster) {
        monster.dropItems = getDropItems(monster);
        monster.normalizedName = normalizeText(monster.name);
        return monster;
      })
      .filter(function (monster) {
        return monster.name && monster.name !== "自爆テスター" && monster.dropItems.length > 0;
      });
  }

  function loadCsv() {
    setStatus("データを読み込み中です...");
    return fetch(getCsvUrl())
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.text();
      })
      .then(function (text) {
        state.monsters = hydrateMonsters(text);
        state.loaded = true;
        setStatus("データ読み込み完了: " + state.monsters.length + "件");
      })
      .catch(function () {
        setStatus("データ取得に失敗しました。時間を置いて再度お試しください。");
      });
  }

  function getCurrentFilters() {
    return {
      itemType: $("drop-item-type").value,
      species: $("drop-species").value,
      name: normalizeText($("drop-name").value)
    };
  }

  function matchMonster(monster, filters) {
    if (filters.itemType && !monster.dropItems.some(function (drop) {
      return String(drop.typeId) === filters.itemType;
    })) {
      return false;
    }

    if (filters.species && String(monster.Species) !== filters.species) {
      return false;
    }

    if (filters.name && monster.normalizedName.indexOf(filters.name) === -1) {
      return false;
    }

    return true;
  }

  function renderEmpty(message) {
    $("drop-search-result").innerHTML = "<p>" + escapeHtml(message) + "</p>";
  }

  function renderResults(results, totalCount) {
    var mobSpecMap = getMobSpec();
    var mobRankMap = getMobRank();
    var rows = [];

    results.forEach(function (monster) {
      var detailUrl = "monster-list-detail.html?mi=" + encodeURIComponent(monster.id);
      var nameCell = '<a href="' + detailUrl + '">' + escapeHtml(monster.name) + "</a>";
      var species = mobSpecMap[monster.Species] || monster.Species || "";
      var rank = mobRankMap[monster.Lineage] || monster.Lineage || "";
      var drops = monster.dropItems.slice(0, 9);
      var headerCells = [
        '<th><font style="color:#FFFF33;">' + nameCell + "</font></th>",
        "<th>" + escapeHtml(species) + "</th>",
        "<th>" + escapeHtml(rank) + "</th>"
      ];
      var dropCells = [
        '<td><img src="' + getMonsterImageUrl(monster) + '" width="120" height="120" alt="' + escapeHtml(monster.name) + '" loading="lazy"></td>'
      ];

      while (headerCells.length < 10) {
        headerCells.push("<td></td>");
      }

      drops.forEach(function (drop) {
        dropCells.push("<td>" + escapeHtml(drop.name) + "(" + escapeHtml(drop.rarity) + ")</td>");
      });

      while (dropCells.length < 10) {
        dropCells.push("<td></td>");
      }

      rows.push("<tr>" + headerCells.join("") + "</tr>");
      rows.push("<tr>" + dropCells.join("") + "</tr>");
    });

    var note = totalCount > results.length
      ? "<p>検索結果 " + totalCount + "件のうち、先頭 " + results.length + "件まで表示しています。</p>"
      : "<p>検索結果 " + totalCount + "件</p>";

    $("drop-search-result").innerHTML =
      note +
      '<table id="table10" style="min-width: 700px; max-width: 1600px;">' +
      "<tbody>" + rows.join("") + "</tbody>" +
      "</table>";
  }

  function runSearch() {
    var filters = getCurrentFilters();
    if (!filters.itemType && !filters.species && !filters.name) {
      renderEmpty("条件を1つ以上指定してください。");
      return;
    }

    if (!state.loaded) {
      renderEmpty("データ読み込み中です。少し待ってから検索してください。");
      return;
    }

    var matched = state.monsters.filter(function (monster) {
      return matchMonster(monster, filters);
    });
    if (!matched.length) {
      renderEmpty("該当するモンスターは見つかりませんでした。");
      return;
    }

    renderResults(matched.slice(0, MAX_RESULTS), matched.length);
  }

  function bindEvents() {
    $("drop-search-submit").addEventListener("click", runSearch);
    $("drop-name").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        runSearch();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    populateSelects();
    bindEvents();
    loadCsv();
  });
})();
