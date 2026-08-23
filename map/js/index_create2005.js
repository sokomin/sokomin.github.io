(function () {
    "use strict";

    var archive = window.MapArchive2005 || { maps: [] };
    var maps = Array.isArray(archive.maps) ? archive.maps : [];
    var mapIndex = document.getElementById("map_index");
    var selectedLinkage = new URLSearchParams(window.location.search).get("map_c") || "";
    var html = '<table id="table10" style="max-width: 800px;">';
    html += '<colgroup><col span="1" width="7%" /><col span="1" width="61%" /><col span="1" width="24%" /><col span="1" width="8%" /></colgroup><tbody>';
    html += '<tr><th colspan="4">マップ一覧（2005～2010）</th></tr>';
    html += '<tr><th>P</th><th>マップ名</th><th>適正Lv</th><th>連動マップ</th></tr>';

    maps.forEach(function (map) {
        if (Number(map.map_id) >= 10000) return;
        if (Number(map.map_id) === 28 || Number(map.map_id) === 979) return;
        if (map.name === "Noname Map 02") return;
        if (selectedLinkage && map.legacy_linkage !== selectedLinkage) return;
        if (Number(map.map_id) > 0 && Number(map.map_id) % 100 === 0) {
            html += '<tr><th>P</th><th>マップ名</th><th>適正Lv</th><th>連動マップ</th></tr>';
        }
        html += '<tr><td>' + (map.premium ? '[P]' : '-') + '</td>';
        html += '<td><a href="map_viewer2005.html?map_id=' + Number(map.map_id) + '">' + escapeHtml(map.name || "名称不明") + '</a></td>';
        if (map.level_min && map.level_max) {
            html += '<td>' + escapeHtml(map.level_min) + '～' + escapeHtml(map.level_max) + '</td>';
        } else {
            html += '<td> - </td>';
        }
        html += '<td>' + createLinkageColor(map.legacy_linkage || '?') + '</td></tr>';
    });

    html += '</tbody></table>';
    mapIndex.innerHTML = html;

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];
        });
    }

    function createLinkageColor(value) {
        var classByValue = {
            A: "color-image1",
            B: "color-image2",
            C: "color-image11",
            D: "color-image4",
            E: "color-image8"
        };
        return classByValue[value] ? '<span class="' + classByValue[value] + '">' + value + '</span>' : escapeHtml(value);
    }
}());
