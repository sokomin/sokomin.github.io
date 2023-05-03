
// テーブルを頑張って作る係
var npc_doc = '<table id="table10" style="max-width: 800px;">';
// npc_doc = npc_doc + '<colgroup><col span="1" width="5%" /><col span="1" width="56%" /><col span="1" width="24%" /><col span="1" width="6%" /></colgroup><col span="1" width="9%" /></colgroup><tbody>';
// npc_doc = npc_doc + '<tr><th colspan="5">モンスター情報</th></tr>';
// npc_doc = npc_doc + '<tr><th>連動</th><th>マップ名</th><th>適正Lv</th></tr>';

npc_doc = npc_doc + '<tr><th>アイコン</th>';
for (key in mobSpec) {
    npc_doc += '<th>';
    npc_doc += mobSpec[key];
    if(key == "0"){
        npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0011.png">';
    } else if (key == "1") {
        npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0012.png">';
    } else if (key == "2") {
        npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0013.png">';
    } else if (key == "3") {
        npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0014.png">';
    } else if (key == "4") {
        npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0015.png">';
    }
    npc_doc += '</th>';
}
npc_doc += '</tr>';

for (key in mobRank) {
    var mobRankName = mobRank[key];

    npc_doc = npc_doc + '<tr><th>';
    for (keys in mobSpec) {
        if(keys == "0"){
            if(key == "0"){
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0000.png"> ';
            } else if (key == "1") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0001.png"> ';
            } else if (key == "2") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0002.png"> ';
            } else if (key == "3") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0003.png"> ';
            } else if (key == "4") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0004.png"> ';
            } else if (key == "5") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0005.png"> ';
            } else if (key == "6") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0006.png"> ';
            } else if (key == "7") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0007.png"> ';
            } else if (key == "8") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0008.png"> ';
            } else if (key == "9") {
                npc_doc += ' <img src="https://sokomin.github.io/sokomin_repository/db/monsterDiscerner/monsterDiscerner_0009.png"> ';
            }
        }
        npc_doc += '</th><td>'
        npc_doc += '<a href="monster-list-detail.html?spec=' + keys +'&rank='+ key +'">';
        npc_doc += mobRankName;
        npc_doc += '</a>';
        npc_doc += '</td>';
    }
    npc_doc += '</tr>';
}

npc_doc = npc_doc + '</tbody></table>';
//モンスターのカテゴリ
var npc_table = document.getElementById('mob_index');
npc_table.innerHTML = npc_doc;

