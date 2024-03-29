﻿
// テーブルを頑張って作る係
var npc_doc = '<table id="table10" style="max-width: 800px;">';
npc_doc = npc_doc + '<colgroup><col span="1" width="5%" /><col span="1" width="56%" /><col span="1" width="24%" /><col span="1" width="6%" /></colgroup><col span="1" width="9%" /></colgroup><tbody>';
npc_doc = npc_doc + '<tr><th colspan="5">マップ一覧</th></tr>';
// npc_doc = npc_doc + '<tr><th>連動</th><th>マップ名</th><th>適正Lv</th></tr>';

map_c = getParam('map_c') ? getParam('map_c') : "";
map_c2 = getParam('map_c2') ? getParam('map_c2') : "";

for (key in NameList) {
    var Obj = NameList[key];
    var SubInfoObj = MapSubInfoList[key];
    if (map_c) {
        if (SubInfoObj && SubInfoObj.mc &&SubInfoObj.mc === map_c) {
            //マップでフィルタかけたい時
        } else {
            continue;
        }
    } 
    if (map_c2) {
        if (SubInfoObj && SubInfoObj.mc2 &&SubInfoObj.mc2 === Number(map_c2)) {
            //新連動マップでフィルタかけたい時
        } else {
            continue;
        }
    } 
    var LvMin = Obj.lvmin;
    var LvMax = Obj.lvmax;
    if (key % 100 === 0) {
        npc_doc = npc_doc + '<tr><th>P</th><th>マップ名</th><th>適正Lv</th><th>連動</th><th>新連動</th></tr>';
    }
    var key_num = parseInt(key);
    if (key_num === 27 || key_num === 28 || key_num === 438 || key_num === 555 || key_num === 799 || key_num === 801 || key_num === 9999) {
        // デバッグ用マップはリストには出さない
        continue;
    } else {
        var plemiun = Obj.plemiun ? "[P]" : "-";
        var rendou = SubInfoObj && SubInfoObj.mc ? SubInfoObj.mc : "?";
        var rendou2 = SubInfoObj && SubInfoObj.mc2 ? SubInfoObj.mc2 : "?";
        npc_doc = npc_doc + '<tr><td>' + plemiun + '</td>';
        npc_doc = npc_doc + '<td><a href="../map/map_viewer_2019.html?map_id=' + key_num + '">' + Obj.name + '</a></td>';
        // レベル帯
        if (LvMin && LvMax) {
            npc_doc = npc_doc + '<td>' + LvMin + '～' + LvMax + ' </td>';
        } else {
            npc_doc = npc_doc + '<td> - </td>';
        }
        npc_doc = npc_doc + '<td>' + createRendouColor(rendou) + '</td>';
        npc_doc = npc_doc + '<td>' + createRendou2Color(rendou2) + '</td>';
        npc_doc = npc_doc + '</tr>';
    }
}

npc_doc = npc_doc + '</tbody></table>';
//NPCやモンスター名全部かくよ
var npc_table = document.getElementById('map_index');
npc_table.innerHTML = npc_doc;

//map_listの方で表示用なので番号とアルファベットだけ
function createRendouColor(rendou) {
    switch (rendou) {
        case "A":
            return '<span class="color-image1">' + rendou + '</span>'
        case "B":
            return '<span class="color-image2">' + rendou + '</span>'
        case "C":
            return '<span class="color-image11">' + rendou + '</span>'
        case "D":
            return '<span class="color-image4">' + rendou + '</span>'
        case "E":
            return '<span class="color-image8">' + rendou + '</span>'
        default:
            return rendou;
    }
}

function createRendou2Color(rendou) {
    switch (rendou) {
        case 1:
            return '<span class="color-image1">' + rendou + '</span>'
        case 2:
            return '<span class="color-image2">' + rendou + '</span>'
        case 3:
            return '<span class="color-image3">' + rendou + '</span>'
        case 4:
            return '<span class="color-image4">' + rendou + '</span>'
        case 5:
            return '<span class="color-image5">' + rendou + '</span>'
        case 6:
            return '<span class="color-image6">' + rendou + '</span>'
        case 7:
            return '<span class="color-image7">' + rendou + '</span>'
        case 8:
            return '<span class="color-image8">' + rendou + '</span>'
        case 9:
            return '<span class="color-image9">' + rendou + '</span>'
        case 10:
            return '<span class="color-image10">' + rendou + '</span>'
        case 11:
            return '<span class="color-image11">' + rendou + '</span>'
        case 12:
            return '<span class="color-image12">' + rendou + '</span>'
        default:
            return rendou;
    }
}
