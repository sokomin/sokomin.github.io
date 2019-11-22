
// テーブルを頑張って作る係
// TODO テーブルの内容もっと充実させるよ
var npc_doc = '<table id="table10" style="max-width: 700px;">';
npc_doc = npc_doc + '<colgroup><col span="1" width="5%" /><col span="1" width="60%" /><col span="1" width="27%" /><col span="1" width="8%" /></colgroup><tbody>';
npc_doc = npc_doc + '<tr><th colspan="4">マップ一覧</th></tr>';
// npc_doc = npc_doc + '<tr><th>連動</th><th>マップ名</th><th>適正Lv</th></tr>';

for (key in NameList) {
    var Obj = NameList[key];
    var SubInfoObj = MapSubInfoList[key];
    var LvMin = Obj.lvmin;
    var LvMax = Obj.lvmax;
    if (key % 100 === 0) {
        npc_doc = npc_doc + '<tr><th>P</th><th>マップ名</th><th>適正Lv</th><th>連動</th></tr>';
    }
    var key_num = parseInt(key);
    if (key_num === 27 || key_num === 28 || key_num === 438 || key_num === 555 || key_num === 799 || key_num === 801 || key_num === 9999) {
        // デバッグ用マップはリストには出さない
        continue;
    } else {
        var plemiun = Obj.plemiun ? "[P]" : "-";
        var rendou = SubInfoObj.mc ? SubInfoObj.mc : "?";
        npc_doc = npc_doc + '<tr><td>' + plemiun + '</td>';
        npc_doc = npc_doc + '<td><a href="../map/map_viewer.html?map_id=' + key_num + '">' + Obj.name + '</a></td>';
        // レベル帯
        if (LvMin && LvMax) {
            npc_doc = npc_doc + '<td>' + LvMin + '～' + LvMax + ' </td>';
        } else {
            npc_doc = npc_doc + '<td> - </td>';
        }
        npc_doc = npc_doc + '<td>' + createRendouColor(rendou) + '</td>';
        npc_doc = npc_doc + '</tr>';
        // TODO連動マップ調べて表にしたい
    }
}

npc_doc = npc_doc + '</tbody></table>';
//NPCやモンスター名全部かくよ
var npc_table = document.getElementById('map_index');
npc_table.innerHTML = npc_doc;

//連動わかりやすくするために色付けるだけの関数
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