//NameImgはcommon.jsで定義されてる
map_image.src = "../map/design/" + NameImg;
for (i = 0; i < (ObjX.length - 1); i++) {
    document.write("\t<div class=\"Obj Pa a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i]) + "px; left:" + (ObjX[i] + 20) + "px;\" title=\"" + (ObjT[i]) + "\">" + (ObjN[i]) + "</div>\n");
    document.write("\t<div class=\"Obj Pb a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i] - 1) + "px; left:" + (ObjX[i] + 19) + "px;\" title=\"" + (ObjT[i]) + "\">" + (ObjN[i]) + "</div>\n");
}
PP = 0; PPP = 0;
for (i = 0; i < (LnkX.length - 1); i++) {
    alt = ""; nam2 = "";
    if (LnkS[i] == 2) {
        col = "#ff00ff"; nam = "п"; nam2 = "п";
    }
    if (LnkS[i] == 3) {
        col = "#00ffff"; nam = "●";
        // リンク先を配列にしたがって追加していく
        // nam2 = "<a href=\"javascript:void(0);\" onclick=Jump(" + LnkP[PPP] + ") style=\"color:" + col + "\">●</a>";
        nam2 = "<a href=\"map_viewer?map_id=" + parseInt(LnkP[PPP]) + "\" style=\"color:" + col + "\">●</a>";
        alt = LnkA[PP];
        PP++;
        PPP++;
    }
    if (LnkS[i] == 5) {
        col = "#ff7fff"; nam = "○"; nam2 = "○";
    }
    if (LnkS[i] == 6) {
        col = "#00ff00"; nam = "＋"; nam2 = "＋"; alt = LnkP[PPP]; PPP++;
    }
    if (LnkS[i] == 12) {
        col = "#00ffff"; nam = "＋"; nam2 = "＋"; alt = LnkP[PPP]; PPP++;
    }
    if (LnkS[i] == 13) {
        col = "#ffff00"; nam = "＄"; nam2 = "＄"; alt = "[" + Math.round(LnkX[i] / 2) + "." + Math.round(LnkY[i]) + "]";
    }
    document.write("\t<div class=\"Lnk Pa\" style=\"top:" + (LnkY[i]) + "px; left:" + (LnkX[i] + 20) + "px;\" title=\"" + alt + "\">" + nam + "</div>\n");
    document.write("\t<div class=\"Lnk\" style=\"top:" + (LnkY[i] - 1) + "px; left:" + (LnkX[i] + 19) + "px; color:" + col + "\" title=\"" + alt + "\">" + nam2 + "</div>\n");
}
//手動でサイズ指定しないと背景が死ぬので
//TODO 背景この指定はアレ
// $('.html').css({ 'height': "100%"});
// $('.body').css({ 'height': "100%"});
// $('.main-background-map').css({'height':"auto"});
$('.main-background-map').css({ 'min-height': "200%" });
// $('.main-background-map').css({'height':$(window).height()});

// テーブルを頑張って作る係
// TODO テーブルの内容もっと充実させるよ
var npc_doc = '<table id="table10" border="0" style="max-width: 360px;" cellspacing="1" cellpadding="2">';
npc_doc = npc_doc + '<colgroup><col span="1" width="20%" /><col span="1" width="80%" /></colgroup><tbody>';
npc_doc = npc_doc + '<tr><th colspan="2">NPC関連情報</th></tr>';

if (NameNpc && NameNpc.length > 0) {
    //NPC
    for (i = 0; i <= (NameNpc.length - 1); i++) {
        if (i === 0) {
            npc_doc = npc_doc + '<tr><th colspan="2">NPC</th></tr>';
        } else {
            npc_doc = npc_doc + '<tr><td>' + i + '</td>';
            npc_doc = npc_doc + '<td><a href="javascript:void(0);" onclick="Yl('+ i +')">'+ NameNpc[i] +'</a></td>';
            npc_doc = npc_doc + '</tr>';
        }
    }
    //モンスター
    for (i = 0; i <= (NameMob.length - 1); i++) {
        if (i === 0) {
            npc_doc = npc_doc + '<tr><th colspan="2">モンスター</th></tr>';
        } else {
            // 1行目は「NPC」が固定で入ってるからね
            var mob_num = NameNpc.length + i - 1;
            npc_doc = npc_doc + '<tr><td>' + mob_num + '</td>';
            npc_doc = npc_doc + '<td><a href="javascript:void(0);" onclick="Yl('+ mob_num +')">'+ NameMob[i] +'</a></td>';
            npc_doc = npc_doc + '</tr>';

        }
    }
}

npc_doc = npc_doc + '</tbody></table>';
//NPCやモンスター名全部かくよ
var npc_table = document.getElementById('npc_info');
npc_table.innerHTML = npc_doc;


//初期描画担当さん
var greet = document.getElementById('map_title_name');
greet.innerHTML = Name;

