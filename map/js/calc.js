

const file_url = "https://sokomin.github.io/map/database/mobdb.js";
// const file_url = "../map/database/mobdb1.js";
// import(file_url).then((module) => {
    $.ajax({
        type: "GET",
        url: file_url,
        // dataType: "js",
        success: function (result) {
            Jump(mapid);
            //NameImgはcommon.jsで定義されてる
            map_image.src = "../map/design/" + NameImg;
            //オブジェクトの描画
            if (mapid === 1) {
                var map_dot = document.getElementById('map-drawer');
                var dot_txt = "";
                for (i = 0; i < (ObjX.length - 1); i++) {
                    // var mob_info = ObjX[i]; 
                    // document.write("\t<div class=\"Obj Pa a" + (mob_info.inid) + "\" style=\"top:" + (mob_info.posy) + "px; left:" + (mob_info.posx + 20) + "px;\" title=\"" + (mob_info.repop) + "\">" + mob_info.inid + "</div>\n");
                    // document.write("\t<div class=\"Obj Pb a" + (mob_info.inid) + "\" style=\"top:" + (mob_info.posy - 1) + "px; left:" + (mob_info.posx + 19) + "px;\" title=\"" + (mob_info.repop) + "\">" + mob_info.inid + "</div>\n");
                    var height = IMG_SIZE[mapid].h;
                    // ObjY[i] = ObjY[i] * 200 / height;
                    // ObjX[i] = ObjX[i] * 200 / height;
                    // TODO 名前もとってきたい
                    dot_txt += "\t<div class=\"Obj Pa a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i]) + "px; left:" + (ObjX[i] + 20) + "px;\" title=\"" + (ObjT[i]) + "\">" + (ObjN[i]) + "</div>\n";
                    dot_txt += "\t<div class=\"Obj Pb a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i] - 1) + "px; left:" + (ObjX[i] + 19) + "px;\" title=\"リポップ時間：" + (ObjT[i]) + "秒\">" + (ObjN[i]) + "</div>\n";
                    //document.write("\t<div class=\"Obj Pa a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i]) + "px; left:" + (ObjX[i] + 20) + "px;\" title=\"" + (ObjT[i]) + "\">" + (ObjN[i]) + "</div>\n");
                    //document.write("\t<div class=\"Obj Pb a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i] - 1) + "px; left:" + (ObjX[i] + 19) + "px;\" title=\"" + (ObjT[i]) + "\">" + (ObjN[i]) + "</div>\n");
                }
                map_dot.innerHTML = dot_txt;
            } else {
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
                        nam2 = "<a href=\"map_viewer.html?map_id=" + parseInt(LnkP[PPP]) + "\" style=\"color:" + col + "\">●</a>";
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

            if ((NameNpc && NameNpc.length > 0) || (NameMob && NameMob.length > 0)) {
                //NPC
                if (!NameNpc) {
                    NameNpc = [];
                }
                if (!NameMob) {
                    NameMob = [];
                }
                for (i = 0; i <= (NameNpc.length - 1); i++) {
                    if (i === 0) {
                        npc_doc = npc_doc + '<tr><th colspan="2">NPC</th></tr>';
                    } else {
                        npc_doc = npc_doc + '<tr><td>' + i + '</td>';
                        npc_doc = npc_doc + '<td><a href="javascript:void(0);" onclick="Yl(' + i + ')">' + NameNpc[i] + '</a></td>';
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
                        npc_doc = npc_doc + '<td><a href="javascript:void(0);" onclick="Yl(' + mob_num + ')">' + NameMob[i] + '</a></td>';
                        npc_doc = npc_doc + '</tr>';

                    }
                }
            }

            npc_doc = npc_doc + '</tbody></table>';
            //NPCやモンスター名全部かくよ
            var npc_table = document.getElementById('npc_info');
            npc_table.innerHTML = npc_doc;


            //マップ名の初期描画担当さん
            var greet = document.getElementById('map_title_name');
            greet.innerHTML = '<h4><font color="#e95388">' + Name + '</font></h4>';

            //レベル帯
            if (LvMin && LvMax) {
                var lv_range_obj = document.getElementById('map_level_range');
                lv_range_obj.innerHTML = '[適正レベル] ' + LvMin + '～' + LvMax + " ";
            }
            if (MapId && Rendou) {
                var rendou_obj = document.getElementById('map_rendou');
                rendou_obj.innerHTML = '連動マップ：' + createRendouColor(Rendou) + " ";
            }
            if (MapId && SubInfo) {
                if (SubInfo.req_map_lv > 0) {
                    var req_map = document.getElementById('req_map_lv');
                    req_map.innerHTML = '必要 マップ製作者Lv <span class="color-image11">' + SubInfo.req_map_lv + "</span>";
                }
                var rendou_obj = document.getElementById('map_down_info');
                rendou_obj.innerHTML = 'MAP低下情報 ' + createDownTabe(SubInfo) + " ";
            }


            //連動わかりやすくするために色付けるだけの関数
            function createRendouColor(rendou) {
                switch (rendou) {
                    case "A":
                        return '<span class="color-image1">' + rendou + '(古都銀)</span>'
                    case "B":
                        return '<span class="color-image2">' + rendou + '(アリアン)</span>'
                    case "C":
                        return '<span class="color-image11">' + rendou + '(古都)</span>'
                    case "D":
                        return '<span class="color-image4">' + rendou + '(アウグ/地下水路)</span>'
                    case "E":
                        return '<span class="color-image8">' + rendou + '(GH/ハノブ)</span>'
                    default:
                        return rendou;
                }
            }

            function createDownTabe(SubInfo) {
                if (checkSubInfo(SubInfo)) {
                    var npc_doc = '<table id="table10" border="0" style="max-width: 560px;" cellspacing="1" cellpadding="2">';
                    npc_doc = npc_doc + '<colgroup><col span="8" width="80%" /></colgroup><tbody>';
                    npc_doc = npc_doc + '<tr><th colspan="8">低下情報(％)</th></tr>';
                    npc_doc = npc_doc + '<tr><th><span class="color-fire">火</span></th><th><span class="color-water">水</span></th><th><span class="color-wind">風</span></th><th><span class="color-earth">大地</span></th><th><span class="color-shine">光</span></th><th><span class="color-dark">闇</span></th><th>ステ低下</th><th>抵抗上限</th></tr>';
                    npc_doc = npc_doc + '<tr><td>' + SubInfo.dfi + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.dwa + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.dwi + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.dea + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.dli + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.dda + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.st_down + '</td>';
                    npc_doc = npc_doc + '<td>' + SubInfo.lbd + '</td>';
                    npc_doc = npc_doc + '</tr>';
                    return npc_doc;
                } else {
                    return "無し";
                }
            }

            function checkSubInfo(SubInfo) {
                if (SubInfo) {
                    if (SubInfo.dfi > 0 || SubInfo.dwa > 0 || SubInfo.dwi > 0 || SubInfo.dea > 0 || SubInfo.dli > 0 || SubInfo.dda > 0 || SubInfo.st_down > 0 || SubInfo.lbd > 0) {
                        return true;
                    }
                } else {
                    return false;
                }
                return false;
            }
        },
        error: function (result) {
            alert("データの読み込みに問題が発生したか、URL引数の指定が正しくありません。");
        },

});