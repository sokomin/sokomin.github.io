
// テーブルを頑張って作る係
var npc_doc = '<table id="table10" style="max-width: 800px;">';
// npc_doc = npc_doc + '<colgroup><col span="1" width="5%" /><col span="1" width="56%" /><col span="1" width="24%" /><col span="1" width="6%" /></colgroup><col span="1" width="9%" /></colgroup><tbody>';
// npc_doc = npc_doc + '<tr><th colspan="5">モンスター情報</th></tr>';
// npc_doc = npc_doc + '<tr><th>連動</th><th>マップ名</th><th>適正Lv</th></tr>';

npc_doc = npc_doc + '<tr>';
for (key in mobSpec) {
    npc_doc += '<th>';
    npc_doc += mobSpec[key];
    npc_doc += '</th>';
}
npc_doc += '</tr>';

for (key in mobRank) {
    var mobRankName = mobRank[key];

    npc_doc = npc_doc + '<tr>';
    for (keys in mobSpec) {
        npc_doc += '<td><a href="monster-list-detail.html?spec=' + keys +'&rank='+ key +'">';
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

