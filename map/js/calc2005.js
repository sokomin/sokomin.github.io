(function () {
    "use strict";

    var archive = window.MapArchive2005 || { maps: [] };
    var mapSubInfo = window.MapSubInfo2005 || {};
    var maps = Array.isArray(archive.maps) ? archive.maps : [];
    var mapById = new Map(maps.map(function (map) { return [String(map.map_id), map]; }));
    var mapId = getMapId();
    var currentMap = mapById.get(String(mapId));
    var scale = 1;
    var selectedNumber = null;
    var numberedMarkers = [];
    var npcNames = [];
    var monsterNames = [];
    var map2Rows = [];
    var monsterById = {};
    var DROP_TEXT_CONST = "";
    var mapPadding = 20;

    if (!currentMap) {
        document.getElementById("map_title_name").innerHTML = '<h4><font color="#e95388">指定されたマップは一覧にありません。</font></h4>';
        return;
    }

    prepareNumberedMarkers();
    renderMapHeader();
    renderImageAndMarkers();
    renderInfoTables();
    loadNumericData();

    window.Up = function () {
        scale += 0.2;
        redrawMap();
    };

    window.Dn = function () {
        scale = Math.max(0.2, scale - 0.2);
        redrawMap();
    };

    window.Yl2005 = function (number) {
        selectedNumber = selectedNumber === number ? null : number;
        redrawSelection();
        return false;
    };

    function getMapId() {
        var params = new URLSearchParams(window.location.search);
        var raw = params.get("map_id");
        return raw === null ? 0 : Number(raw);
    }

    function prepareNumberedMarkers() {
        var npcMap = new Map();
        var monsterMap = new Map();
        currentMap.markers.forEach(function (marker) {
            var target = marker.type === 2 ? monsterMap : npcMap;
            if (!target.has(marker.name)) target.set(marker.name, target.size);
        });
        npcNames = Array.from(npcMap.keys());
        monsterNames = Array.from(monsterMap.keys());
        currentMap.markers.forEach(function (marker) {
            var number = marker.type === 2 ? npcNames.length + monsterMap.get(marker.name) : npcMap.get(marker.name);
            numberedMarkers.push({
                number: number,
                name: marker.name,
                typeName: marker.type_name,
                baseX: (marker.x - currentMap.coordinate_origin_x) * 200 / currentMap.coordinate_height,
                baseY: (marker.y - currentMap.coordinate_origin_y) * 200 / currentMap.coordinate_height
            });
        });
    }

    function renderMapHeader() {
        document.title = (currentMap.name || "名称不明") + " マップ（2005～2010） 赤石の民衆";
        document.getElementById("map_title_name").innerHTML = '<h4><font color="#e95388">' + escapeHtml(currentMap.name || "名称不明") + '</font></h4>';
        if (currentMap.level_min && currentMap.level_max) {
            document.getElementById("map_level_range").textContent = "[適正レベル] " + currentMap.level_min + "～" + currentMap.level_max;
        }
        renderLoweringInfo();
    }

    function renderLoweringInfo() {
        var info = mapSubInfo[String(mapId)];
        var target = document.getElementById("map_down_info");
        if (!info) return;
        var fields = ["dfi", "dwa", "dwi", "dea", "dli", "dda", "st_down", "lbd"];
        if (!fields.some(function (field) { return Number(info[field]) > 0; })) {
            target.textContent = "MAP低下情報 無し";
            return;
        }
        var html = 'MAP低下情報 <table id="table10" border="0" style="max-width: 560px;" cellspacing="1" cellpadding="2">';
        html += '<colgroup><col span="8" width="80%" /></colgroup><tbody>';
        html += '<tr><th colspan="8">低下情報(％)</th></tr>';
        html += '<tr><th><span class="color-fire">火</span></th><th><span class="color-water">水</span></th><th><span class="color-wind">風</span></th><th><span class="color-earth">大地</span></th><th><span class="color-shine">光</span></th><th><span class="color-dark">闇</span></th><th>ステ低下</th><th>抵抗上限</th></tr>';
        html += '<tr><td>' + info.dfi + '</td><td>' + info.dwa + '</td><td>' + info.dwi + '</td><td>' + info.dea + '</td><td>' + info.dli + '</td><td>' + info.dda + '</td><td>' + info.st_down + '</td><td>' + info.lbd + '</td></tr>';
        html += '</tbody></table>';
        target.innerHTML = html;
    }

    function renderImageAndMarkers() {
        var image = document.getElementById("map_image");
        image.src = currentMap.image_url;
        image.alt = (currentMap.name || "") + " マップ画像（2005～2010）";
        image.addEventListener("error", function () {
            document.getElementById("map_image_error").textContent = "マップ画像を読み込めませんでした。";
        });

        var markerHtml = "";
        numberedMarkers.forEach(function (marker) {
            var title = escapeAttribute(marker.name + "\n" + marker.typeName);
            markerHtml += '<div class="Obj Pa a' + marker.number + '" data-number="' + marker.number + '" data-x="' + marker.baseX + '" data-y="' + marker.baseY + '" title="' + title + '">' + marker.number + '</div>';
            markerHtml += '<div class="Obj Pb a' + marker.number + '" data-number="' + marker.number + '" data-x="' + marker.baseX + '" data-y="' + marker.baseY + '" title="' + title + '">' + marker.number + '</div>';
        });
        document.getElementById("map-drawer").innerHTML = markerHtml;

        var portalHtml = "";
        currentMap.portals.forEach(function (portal) {
            var x = (portal.x - currentMap.coordinate_origin_x) * 200 / currentMap.coordinate_height;
            var y = (portal.y - currentMap.coordinate_origin_y) * 200 / currentMap.coordinate_height;
            var title = escapeAttribute(portal.name || ("移動先: " + portal.target_raw));
            var portalImage = '<img width="15" height="15" src="https://sokomin.github.io/sokomin_repository/db/etc_anm/etc_anm_0022.png" alt="" />';
            var symbol = portalImage;
            if (mapById.has(String(portal.target_id))) {
                symbol = '<a href="map_viewer2005.html?map_id=' + Number(portal.target_id) + '">' + portalImage + '</a>';
            }
            portalHtml += '<div class="Lnk Pa map-portal-icon" data-x="' + x + '" data-y="' + y + '" data-dx="0" data-dy="-10" title="' + title + '">' + portalImage + '</div>';
            portalHtml += '<div class="Lnk map-portal-icon" data-x="' + x + '" data-y="' + y + '" data-dx="-1" data-dy="-9" title="' + title + '">' + symbol + '</div>';
        });
        currentMap.locations.forEach(function (location) {
            var x = (location.x - currentMap.coordinate_origin_x) * 200 / currentMap.coordinate_height;
            var y = (location.y - currentMap.coordinate_origin_y) * 200 / currentMap.coordinate_height;
            var title = escapeAttribute(location.name);
            var label = escapeHtml(location.name);
            portalHtml += '<div class="Lnk Pa map-location-label" data-x="' + x + '" data-y="' + y + '" data-dx="0" data-dy="0" title="' + title + '">' + label + '</div>';
            portalHtml += '<div class="Lnk map-location-label" data-x="' + x + '" data-y="' + y + '" data-dx="-1" data-dy="-1" style="color:#00ff00" title="' + title + '">' + label + '</div>';
        });
        document.getElementById("map-portal").innerHTML = portalHtml;
        redrawMap();
    }

    function redrawMap() {
        var image = document.getElementById("map_image");
        var width = currentMap.coordinate_width * 200 / currentMap.coordinate_height;
        image.width = width * scale;
        image.height = 200 * scale;
        document.getElementById("map_blank").style.height = (200 * scale) + "px";

        document.querySelectorAll("#map-drawer .Obj, #map-portal .Lnk").forEach(function (node) {
            node.style.left = (Number(node.dataset.x) * scale + mapPadding + Number(node.dataset.dx || 0)) + "px";
            node.style.top = (Number(node.dataset.y) * scale + Number(node.dataset.dy || 0)) + "px";
        });
        document.querySelectorAll("#map-portal .map-portal-icon img").forEach(function (imageNode) {
            imageNode.width = 15;
            imageNode.height = 15;
        });
        redrawSelection();
    }

    function redrawSelection() {
        document.querySelectorAll("#map-drawer .Obj.Pb").forEach(function (node) {
            var selected = selectedNumber !== null && Number(node.dataset.number) === selectedNumber;
            node.style.color = selected ? "#ffff00" : "#ff0000";
            node.style.backgroundColor = selected ? "#000000" : "";
        });
    }

    function loadNumericData() {
        Promise.all([
            fetch("database/map2_2005.csv").then(function (response) {
                if (!response.ok) throw new Error("map2");
                return response.text();
            }),
            fetch("https://sokomin.github.io/sokomin_repository/db/monster.csv").then(function (response) {
                if (!response.ok) throw new Error("monster");
                return response.text();
            })
        ]).then(function (texts) {
            map2Rows = parseCsvObjects(texts[0]).filter(function (row) { return Number(row.mapid) === mapId; });
            parseCsvObjects(texts[1]).forEach(function (row) {
                var id = row.id !== undefined ? row.id : row.ID;
                if (id !== undefined) monsterById[String(id)] = row;
            });
            renderInfoTables();
        }).catch(function () {
            renderInfoTables();
        });
    }

    function renderInfoTables() {
        var html = '<table border="0"><colgroup><col span="1" width="360px" /><col span="1" width="960px" /></colgroup><tbody><tr><td valign="top">';
        html += createNumberTable();
        html += '</td><td valign="top">';
        html += createMonsterTable();
        html += '</td></tr></tbody></table>';
        document.getElementById("npc_info").innerHTML = html;
    }

    function createNumberTable() {
        var html = '<table id="table10" border="0" style="width: 360px;" cellspacing="1" cellpadding="2">';
        html += '<colgroup><col span="1" width="20%" /><col span="1" width="80%" /></colgroup><tbody>';
        html += '<tr><th colspan="2">NPC関連情報</th></tr>';
        if (npcNames.length) {
            html += '<tr><th colspan="2">NPC</th></tr>';
            npcNames.forEach(function (name, index) {
                html += '<tr><td>' + index + '</td><td><a href="javascript:void(0);" onclick="Yl2005(' + index + ')">' + escapeHtml(name) + '</a></td></tr>';
            });
        }
        if (monsterNames.length) {
            html += '<tr><th colspan="2">モンスター</th></tr>';
            monsterNames.forEach(function (name, index) {
                var number = npcNames.length + index;
                html += '<tr><td>' + number + '</td><td><a href="javascript:void(0);" onclick="Yl2005(' + number + ')">' + escapeHtml(name) + '</a></td></tr>';
            });
        }
        html += '</tbody></table>';
        return html;
    }

    function createMonsterTable() {
        if (!map2Rows.length || !Object.keys(monsterById).length || !monsterNames.length) return "";
        var confirmedNames = new Set(monsterNames);
        var rows = "";
        map2Rows.forEach(function (mapRow) {
            if (!confirmedNames.has(mapRow.name)) return;
            var monster = monsterById[String(mapRow.mobid)];
            if (!monster) return;
            var dropText = createDropItem(mapRow.mobid);
            if (validateData(monster, dropText)) return;

            var name = '<a href="https://sokomin.github.io/monster/monster-list-detail.html?mi=' + encodeURIComponent(mapRow.mobid) + '&amp;dlv=' + encodeURIComponent(mapRow.lvmax) + '&amp;map_id=' + mapId + '">' + escapeHtml(mapRow.name) + '</a><br />';
            if (monster.name) name += '(' + escapeHtml(monster.name) + ')<br />';
            var effectId = Number(monster.EffectId || 0);
            var effectHex = ('000' + effectId.toString(16)).slice(-3).toLowerCase();
            var imageUrl = 'https://sokomin.github.io/monster/design/image/monster/0' + effectHex + '000' + escapeAttribute(monster.EffectId_2 || 0) + '.png';
            var species = window.mobSpec && mobSpec[monster.Species] !== undefined ? mobSpec[monster.Species] : "";
            var rank = window.mobRank && mobRank[monster.Lineage] !== undefined ? mobRank[monster.Lineage] : "";

            rows += '<tr><td>' + name + '</td>';
            rows += '<td style="background-color: rgb(0, 0, 0);"><img width="140" src="' + imageUrl + '" alt="" /></td>';
            rows += '<td>' + escapeHtml(species) + '<br />' + escapeHtml(rank) + '</td>';
            rows += '<td>' + escapeHtml(mapRow.lvmin) + '～' + escapeHtml(mapRow.lvmax) + '</td>';
            rows += '<td style="text-align: left;">' + dropText + '</td></tr>';
        });
        if (!rows) return "";

        var html = '<table id="table10" border="0" style="width: 900px;" cellspacing="1" cellpadding="2">';
        html += '<colgroup><col span="1" width="270px" /><col span="1" width="150px" /><col span="1" width="120px" /><col span="1" width="150px" /><col span="1" width="210px" /></colgroup><tbody>';
        html += '<tr><th colspan="5">モンスター関連情報</th></tr>';
        html += '<tr><th>モンスター名</th><th>画像</th><th>種別</th><th>レベル</th><th>ドロップアイテム</th></tr>';
        html += rows + '</tbody></table>';
        return html;
    }

    function validateData(monster, dropText) {
        if (dropText === DROP_TEXT_CONST) return true;
        if (Number(monster.DefaultHP) <= 0) return true;
        if (monster.name === "自爆テスター" || monster.name === "自爆ヘルパー") return true;
        return false;
    }

    function createDropItem(mobId) {
        var monster = monsterById[String(mobId)];
        if (!monster) return DROP_TEXT_CONST;
        var text = DROP_TEXT_CONST;
        for (var fieldNo = 29; fieldNo <= 65; fieldNo += 4) {
            var typeId = monster["unknown_" + fieldNo];
            var rarity = monster["unknown_" + (fieldNo + 2)];
            if (Number(typeId) <= 0 || Number(rarity) <= 0) continue;
            text += "- " + escapeHtml(getMonsterDropTypeText(typeId)) + "(" + escapeHtml(rarity) + ")<br />";
        }
        return text;
    }

    function parseCsvObjects(text) {
        var rows = parseCsv(text);
        if (!rows.length) return [];
        var headers = rows[0];
        return rows.slice(1).filter(function (row) { return row.some(function (value) { return value !== ""; }); }).map(function (row) {
            var object = {};
            headers.forEach(function (header, index) { object[header] = row[index] === undefined ? "" : row[index]; });
            return object;
        });
    }

    function parseCsv(text) {
        var rows = [];
        var row = [];
        var field = "";
        var quoted = false;
        for (var index = 0; index < text.length; index++) {
            var character = text[index];
            if (quoted) {
                if (character === '"' && text[index + 1] === '"') {
                    field += '"';
                    index++;
                } else if (character === '"') {
                    quoted = false;
                } else {
                    field += character;
                }
            } else if (character === '"') {
                quoted = true;
            } else if (character === ',') {
                row.push(field);
                field = "";
            } else if (character === '\n') {
                row.push(field.replace(/\r$/, ""));
                rows.push(row);
                row = [];
                field = "";
            } else {
                field += character;
            }
        }
        if (field !== "" || row.length) {
            row.push(field.replace(/\r$/, ""));
            rows.push(row);
        }
        return rows;
    }

    function escapeHtml(value) {
        return String(value === undefined ? "" : value).replace(/[&<>"']/g, function (character) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
        });
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/\n/g, "&#10;");
    }
}());
