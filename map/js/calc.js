
mapid = mapid ? mapid : 0;
const file_url = "https://sokomin.github.io/map/database/mobdb" + mapid + ".js";
//モンスターとのリンク作成用
const mob_file_url = "https://sokomin.github.io/sokomin_repository/db/map2.csv";
var DROP_TEXT_CONST = "";

// 入れ子じゃん・・・ジェネレータだから許して。
function getMap2CSV() {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/map2.csv", true);
    req.send(null);
    req.onload = function () {
        getMonsterCSV(req.responseText);
    }
}

//モンスターDBも読まないと動かないので・・・重いけど全部読む
function getMonsterCSV(mapCSV) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/update/js/monster.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(mapCSV, req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}


var obj_format = {};
var mob_data = {};
var monster_data = {};

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(str, monster_str) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    mob_data = {};
    var cnt = 0;

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
        var re;
        if (i == 0) {
            // 列定義
            for (var j = 0; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                obj_format[j] = txt;
            }
            // TODO フォーマット違ったらエラー出すなりしたい
            console.log(obj_format);
        } else {
            var md = {};
            for (var j = 1; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                md[obj_format[j]] = txt;
            }
            re = /\"/g;
            result[i][0] = result[i][0].replace(re, "");
            // mapidと一致しないデータは拾わない
            if (Number(md["mapid"]) != mapid) {
                continue;
            }
            // データ取ってこれないのでとりあえずcnt番目ってことにする
            mob_data[cnt] = md;
            cnt++;
        }
    }
    console.log(mob_data);

    /**
     * モンスターデータ読み込み
     */
    monster_data = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = monster_str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
        var re;
        if (i == 0) {
            // 列定義
            for (var j = 0; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                obj_format[j] = txt;
            }
            // TODO フォーマット違ったらエラー出すなりしたい
            console.log(obj_format);
        } else {
            var md = {};
            for (var j = 1; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                md[obj_format[j]] = txt;
            }
            re = /\"/g;
            result[i][0] = result[i][0].replace(re, "");
            monster_data[result[i][0]] = md;
        }
    }

    getMobDB();
}


function getMobDB() {
    $.ajax({
        type: "GET",
        url: file_url,
        // mobdb見つかったらsuccess、なかったらエラー
        success: function (result) {
            var obj = (new Function(result + "return{m:MobData,a:AreaData}"))();
            MobData = obj.m;
            AreaData = obj.a;
            Jump(mapid);
            //NameImgはcommon.jsで定義されてる
            map_image.src = "../map/design/" + NameImg;
            //オブジェクトの描画
            if (mapid >= 0) {
                var map_dot = document.getElementById('map-drawer');
                var dot_txt = "";
                var height = IMG_SYS_SIZE[mapid] ? IMG_SYS_SIZE[mapid].h : IMG_SIZE[mapid].h;
                // モンスターの位置を描画
                for (i = 0; i < ObjX.length; i++) {
                    ObjY[i] = ObjY[i] * 200 / height;
                    ObjX[i] = ObjX[i] * 200 / height;
                    // FIXME ミラーテレポーターなどのNPCも全てこちらに統合するので、NPC関連の情報を取得する時はここからアイコン取ってこれるようにしたい。
                    dot_txt += "\t<div class=\"Obj Pa a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i]) + "px; left:" + (ObjX[i] + 20) + "px;\" title=\"" + (ObjT[i]) + "\">" + (ObjN[i]) + "</div>\n";
                    dot_txt += "\t<div class=\"Obj Pb a" + (ObjN[i]) + "\" style=\"top:" + (ObjY[i] - 1) + "px; left:" + (ObjX[i] + 19) + "px;\" title=\"" + MobMapName[i] + "\nリポップ時間：" + (ObjT[i]) + "秒\">" + (ObjN[i]) + "</div>\n";
                }
                map_dot.innerHTML = dot_txt;
                // AreaTypeにおいて移動ポータル描画
                // type3の時だけカウントが増える
                PP = 0; PPP = 0;
                var map_pot = document.getElementById('map-portal');
                var area_txt = "";
                for (i = 0; i < LnkX.length; i++) {
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
                    LnkY[i] = LnkY[i] * 200 / height;
                    LnkX[i] = LnkX[i] * 200 / height;
                    area_txt += "\t<div class=\"Lnk Pa\" style=\"top:" + (LnkY[i] - 10) + "px; left:" + (LnkX[i] + 20) + "px;\" title=\"" + alt + "\">" + nam + "</div>\n";
                    area_txt += "\t<div class=\"Lnk\" style=\"top:" + (LnkY[i] - 9) + "px; left:" + (LnkX[i] + 19) + "px; color:" + col + "\" title=\"" + alt + "\">" + nam2 + "</div>\n";
                }
                map_pot.innerHTML = area_txt;
            } else {
                // 旧描画システム
                for (i = 0; i <= (ObjX.length - 1); i++) {
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
            // テーブルを頑張って作る係
            outputInfo();
        },
        error: function (result) {
            // mob名とか対応してないマップっぽいで。低下情報等がない旧型式で出力するやで
            console.log("御伽原エラー");
            Jump(mapid);
            //NameImgはcommon.jsで定義されてる
            map_image.src = "../map/design/" + NameImg;
            outputInfo();
        },
    });
}

/**
 * 実行
 */
getMap2CSV();


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
function createRendou2Color(rendou) {
    switch (rendou) {
        case 1:
            return '<span class="color-image1">' + rendou + '(古都)</span>'
        case 2:
            return '<span class="color-image2">' + rendou + '(ハノブ)</span>'
        case 3:
            return '<span class="color-image3">' + rendou + '(アウグ/ブリッジ)</span>'
        case 4:
            return '<span class="color-image4">' + rendou + '(リンケン)</span>'
        case 5:
            return '<span class="color-image5">' + rendou + '(アリアン)</span>'
        case 6:
            return '<span class="color-image6">' + rendou + '(スマグ)</span>'
        case 7:
            return '<span class="color-image7">' + rendou + '(ロマ)</span>'
        case 8:
            return '<span class="color-image8">' + rendou + '(ボルティッシュ)</span>'
        case 9:
            return '<span class="color-image9">' + rendou + '(ロングテール)</span>'
        case 10:
            return '<span class="color-image10">' + rendou + '(漆黒の城)</span>'
        case 11:
            return '<span class="color-image11">' + rendou + '(収容所)</span>'
        case 12:
            return '<span class="color-image12">' + rendou + '(古代悪魔研究所)</span>'
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

// 左下のモンスター・NPCマーキング用＋NPCデータ出力
function outputInfo() {
    // スマホレイアウト死亡問題回避用。PCだと横がちょっと長く見える…
    $('.main-background-map').css({ 'min-height': "200%", 'min-width': "140%" });
    // $('.main-background-map').css({'height':$(window).height()});

    // テーブルを頑張って作る係
    var map_concat = '<table border="0"><colgroup><col span="1" width="360px" /><col span="1" width="960px" /></colgroup><tbody><tr><td valign="top">';
    var npc_doc = '<table id="table10" border="0" style="width: 360px;" cellspacing="1" cellpadding="2">';
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
    map_concat += npc_doc;

    // モンスター詳細のリンクがあればここに記載。
    map_concat += '</td><td valign="top">';
    if (mob_data[0] && mob_data[0].mapid >= 0) {
        var is_header = false;
        var npc_doc = '<table id="table10" border="0" style="width: 900px;" cellspacing="1" cellpadding="2">';
        npc_doc = npc_doc + '<colgroup><col span="1" width="270px" /><col span="1" width="150px" /><col span="1" width="120px" /><col span="1" width="150px" /><col span="1" width="210px" /></colgroup><tbody>';
        npc_doc = npc_doc + '<tr><th colspan="5">モンスター関連情報</th></tr>';
        npc_doc = npc_doc + '<tr><th>モンスター名</th><th>画像</th><th>種別</th><th>レベル</th><th>ドロップアイテム</th></tr>';

        if ((NameMob && NameMob.length > 0)) {
            //モンスター情報があればモンスターDBと照合して追記していく。順番違っても仕方ないし、ダブっても仕方ない。
            for (var i in mob_data) {
                if (mob_data[i] && mob_data[i].mobid >= 0) {
                    // モンスターのIDで出力しないデータをフィルタ。
                    var md = monster_data[mob_data[i].mobid];
                    if (!md) {
                        continue;
                    }
                    var drop_txt = createDropItem(mob_data[i].mobid);
                    if (validateData(md, drop_txt)) {
                        continue;
                    }
                    var mob_name = mob_data[i].name ? ('<a href="https://sokomin.github.io/monster/monster-list-detail.html?mi=' +
                                    mob_data[i].mobid +'&dlv=' + mob_data[i].lvmax +'">' + mob_data[i].name + "</a><br>") : "";
                    // モンスターDB上の名前を追記
                    var mobdb_name = md.name ? "(" + md.name + ")<br>" : "";
                    mob_name += mobdb_name;
                    npc_doc = npc_doc + '<tr><td>' + mob_name + '</td>';

                    // モンスターのアイコン出したい。サイズ小さめで。
                    var mImage = Number(md["EffectId"]).toString(16);
                    mImage = ('0' + mImage).slice(-3)
                    mImage = "https://sokomin.github.io/monster/design/image/monster/0" + mImage.toLowerCase() + "000" + md["EffectId_2"] + ".png";
                    var img = '<img width="140px" src="'+ mImage +'">';
                    npc_doc = npc_doc + '<td style="background-color: rgb(0, 0, 0);">' + img + '</td>';

                    // 種別もmobDB参照して確定。
                    var spec = mobSpec[md["Species"]] + "<br>" + mobRank[md["Lineage"]];
                    npc_doc = npc_doc + '<td>' + spec + '</td>';


                    // レベルは書いてる。
                    var lv = mob_data[i].lvmin + "～" + mob_data[i].lvmax;
                    npc_doc = npc_doc + '<td>' + lv + '</td>';

                    // ドロップアイテムもmobDB参照して確定。
                    npc_doc = npc_doc + '<td style="text-align: left;">' + drop_txt + '</td>';
                    npc_doc = npc_doc + '</tr>';
                    is_header = true;
                }
            }
        }
        if (is_header) {
            npc_doc += "</table>"
            map_concat += npc_doc;
        }
    }

    map_concat += "</td></tr></tbody></table>";
    //NPCやモンスター名全部かくよ
    var npc_table = document.getElementById('npc_info');
    // npc_table.innerHTML = npc_doc;
    npc_table.innerHTML = map_concat;


    //マップ名の初期描画担当さん
    var greet = document.getElementById('map_title_name');
    greet.innerHTML = '<h4><font color="#e95388">' + Name + '</font></h4>';

    //レベル帯
    if (LvMin && LvMax) {
        var lv_range_obj = document.getElementById('map_level_range');
        lv_range_obj.innerHTML = '[適正レベル] ' + LvMin + '～' + LvMax + " ";
    }
    if (MapId != void 0 && Rendou) {
        var rendou_obj = document.getElementById('map_rendou');
        rendou_obj.innerHTML = '連動マップ：' + createRendouColor(Rendou) + " ";
    }
    if (MapId != void 0 && Rendou2) {
        var rendou_obj = document.getElementById('map_rendou2');
        rendou_obj.innerHTML = '新連動マップ：' + createRendou2Color(Rendou2) + " ";
    }
    if (MapId != void 0 && SubInfo) {
        if (SubInfo.req_map_lv > 0) {
            var req_map = document.getElementById('req_map_lv');
            req_map.innerHTML = '必要 マップ製作者Lv <span class="color-image11">' + SubInfo.req_map_lv + "</span>";
        }
        var rendou_obj = document.getElementById('map_down_info');
        rendou_obj.innerHTML = 'MAP低下情報 ' + createDownTabe(SubInfo) + " ";
    }
    if (MapId != void 0 && ExtraInfo) {
        var text = "";
        for (var i = 0; i < ExtraInfo.length; i++) {
            var data = ExtraInfo[i];
            data += "<br>"
            text += data;
        }
        var req_map = document.getElementById('map_extra_info');
        req_map.innerHTML = "<br>" + text;
    }
}

function validateData(data, drop_txt) {
    if (drop_txt == DROP_TEXT_CONST) {
        return true;
    }
    if (Number(data["DefaultHP"]) <= 0) {
        return true;
    }
    // FIXME -1で死んでる画像があるので、monster.csv側を見直したい。
    if (Number(data["EffectId_2"]) < 0) {
        return true;
    }
    if (data["name"] == "自爆テスター") {
        return true;
    }
    return false;
}


// 頭いい人は共通化したくなるあれ
function createDropItem(mobid) {
    var txt = DROP_TEXT_CONST;
    var md = monster_data[mobid];
    if (Number(md["unknown_29"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_29"]] ? item_type_text[md["unknown_29"]] : (md["unknown_29"] + "系列");
        txt += "("
        txt += md["unknown_31"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_33"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_33"]] ? item_type_text[md["unknown_33"]] : (md["unknown_33"] + "系列");;
        txt += "("
        txt += md["unknown_35"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_37"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_37"]] ? item_type_text[md["unknown_37"]] : (md["unknown_37"] + "系列");;
        txt += "("
        txt += md["unknown_39"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_41"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_41"]] ? item_type_text[md["unknown_41"]] : (md["unknown_41"] + "系列");;
        txt += "("
        txt += md["unknown_43"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_45"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_45"]] ? item_type_text[md["unknown_45"]] : (md["unknown_45"] + "系列");;
        txt += "("
        txt += md["unknown_47"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_49"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_49"]] ? item_type_text[md["unknown_49"]] : (md["unknown_49"] + "系列");;
        txt += "("
        txt += md["unknown_51"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_53"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_53"]] ? item_type_text[md["unknown_53"]] : (md["unknown_53"] + "系列");;
        txt += "("
        txt += md["unknown_55"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_57"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_57"]] ? item_type_text[md["unknown_57"]] : (md["unknown_57"] + "系列");;
        txt += "("
        txt += md["unknown_59"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_61"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_61"]] ? item_type_text[md["unknown_61"]] : (md["unknown_61"] + "系列");
        txt += "("
        txt += md["unknown_63"];
        txt += ")"
        txt += "<br>"
    }
    if (Number(md["unknown_65"]) > 0) {
        txt += "- "
        txt += item_type_text[md["unknown_65"]] ? item_type_text[md["unknown_65"]] : (md["unknown_65"] + "系列");;
        txt += "("
        txt += md["unknown_67"];
        txt += ")"
        txt += "<br>"
    }
    return txt;
}
