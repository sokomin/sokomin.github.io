//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
    var req = new XMLHttpRequest();// HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/quest.csv", true);//アクセスするファイルを指定
    req.send(null);
    req.onload = function () {
        getMapCSV(req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

// 入れ子じゃん・・・ジェネレータだから許して。
function getMapCSV(quest_str) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maplist.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(quest_str, req.responseText);
    }
}


var obj_format = {};
var quest_data = {};
var map_data = {};

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(str, map_str) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    quest_data = {};
    map_data = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = str.split("\"\n\"");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
            var tmp_txt = tmp[i].split('\",\"');//文中に,出てくる問題への対処
            tmp_txt = tmp_txt.join('",,,,,"');
            result[i] = tmp_txt.split(',,,,,');
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
            // FIXME 謎の空行が入る問題対応したい
            // if (i >= 410 && i < 420) {
            //     console.log(result[i]);
            // }
            var md = {};
            for (var j = 1; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                md[obj_format[j]] = txt;
            }
            re = /\"/g;
            result[i][0] = result[i][0].replace(re, "");
            quest_data[result[i][0]] = md;
        }
    }
    // console.log(quest_data);

    var result = [];// 最終的な二次元配列を入れるための配列
    var map_tmp = map_str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
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
            map_data[result[i][0]] = md;
        }
    }
    // console.log(map_data);



    createQuestTable();
}

var DROP_TEXT_CONST = "<b><ドロップアイテム></b><br>";
var SKILL_TEXT_CONST = "<b><使用スキル></b><br>";

function calc1() {
    // モンスターデータ読み込み(同期の関係上、これ以外呼ばない)
    getCSV();
}

// ０：一般・イベントクエなど色々
// １：マスクエ
// ２：称号クエ
// ３：MQ
// ４：ギルドクエ
// ５：BF系連作クエ
// ６：ギルドデイリー
// ７：韓国専用イベクエ
// ８：恩寵・ダリン・デリンクエ
// ９：復帰者クエ
// １０：韓国専用イベントクエ
// １１：ウィークリークエスト
// １２：ヤティカヌキャンプクエ（受諾不可能）
// １３：ディメンション・ハブクエ
// 凡例
// MQ Season2を取得(最後のMQ1-5が入ってくるから手動ではじく)
// https://sokomin.github.io/update/quest_converter.html?type=3&lv=250

function createQuestTable() {
    var a1 = $('input[name="a1"]').val()? Number($('input[name="a1"]').val()) : 0;
    var a2 = $('input[name="a2"]').val()? Number($('input[name="a2"]').val()) : 9999;
    var QTYPE = getParam('type') ? parseInt(getParam('type')) : 0;
    var REQ_LEVEL = getParam('lv') ? parseInt(getParam('lv')) : 0;
    var DEBUG = getParam('debug') ? parseInt(getParam('debug')) : 0;
    var $div_main = $('<div>');
    // var title_text = "<h4>" + mobSpec[MOBSPEC] + " " + mobRank[MOBRANK] + " の一覧" + "</h4>";
    // $div_main.append(title_text);
    var cnt = 0; //セーフティをはっておく
    for (var i in quest_data) {
        if (cnt >= 300) {
            console.log("３００件以上はhtml重くて出せないよ");
            break;
        }
        var data = quest_data[i];
        if (Number(i) < a1 || Number(i) > a2) {
            continue;
        }
        // クエストは目視バリデーションするからあんま使わなさそう
        if (validateData(data, QTYPE, REQ_LEVEL, DEBUG)) {
            continue;
        }
        
        // デバッグ用
        // var tnum = 62;
        // if (Number(data["unknown_29"]) == tnum ||
        //     Number(data["unknown_33"]) == tnum ||
        //     Number(data["unknown_37"]) == tnum ||
        //     Number(data["unknown_41"]) == tnum ||
        //     Number(data["unknown_45"]) == tnum ||
        //     Number(data["unknown_49"]) == tnum ||
        //     Number(data["unknown_53"]) == tnum ||
        //     Number(data["unknown_57"]) == tnum ||
        //     Number(data["unknown_61"]) == tnum ||
        //     Number(data["unknown_65"]) == tnum
        // ) {

        // } else {
        //     continue;
        // }

        var $table = $('<table>').attr("id", "table14").css("text-align", "left")
            .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 240)).append($("<col>").attr("span", 1).attr("width", 640)));

        var $tr_Name = $('<tr>');
        // クエストタイトル
        var quest_title = '<a name="'+ i + '"><font style="color:#00ff00;">' + data["name"] + "</font>"
        $tr_Name.append($('<th>').attr("colspan", "2").append(quest_title));

        // クエスト概要解析：ゲーム内表記に即して記述したいけど、できるところまでにしよう。
        var $tr_txt = $('<tr>');
        // var quest_txt = '<span class="color-image17">関連NPC</span><br><hr class="quest-hr">';
        var quest_txt = "";
        // 進行状況解析
        if (data["str_progress"]) {
            quest_txt += '<span class="color-image17">進行状況</span><br><hr class="quest-hr">';
            quest_txt += convText(data["str_progress"]);
            quest_txt += "<br>";
        }
        // テキスト解析
        for (var j = 1; j <= 6; j++) {
            if (data["text" + j]) {
                var re = /\n/g;
                var qt = data["text" + j].split(re);
                var map_tmp = "";
                var header_flag = true;
                for (var k = 0; k < qt.length; k++) {
                    re = /field (.*?);/;
                    if (re.test(qt[k])) {
                        // NPC側にデータなかった時のみこっち参照します
                        var replace_txt = '$1'
                        qt[k] = qt[k].replace(re, replace_txt);
                        // quest_txt += '<span class="color-image17">関連フィールド</span><br><hr class="quest-hr">';
                        if (MapSubInfoList[qt[k]]) {
                            // quest_txt += '<span class="color-image2">' + MapSubInfoList[qt[k]].name + '</span>';
                            map_tmp += '<span class="color-image2">' + map_data[qt[k]].name + '</span> ';
                        } else {
                            // quest_txt += '<span class="color-image2">' + qt[k] + '</span>';
                            map_tmp += '<span class="color-image2">' + qt[k] + '</span> ';
                        }
                        // quest_txt += " ";
                        continue;
                    }

                    re = /(npc|NPC) (.*?) \'(.*?)\';/;
                    re2 = /(npc|NPC) (.*?) \'(.*?)\'/;
                    if (re.test(qt[k]) || re2.test(qt[k])) {
                        if (header_flag) {
                            quest_txt += '<span class="color-image17">関連NPC</span><br><hr class="quest-hr">';
                            header_flag = false;
                        }
                        var qt1_txt = '$2'
                        var qt2_txt = '$3'
                        var qt1 = "";
                        var qt2 = "";
                        if (re.test(qt[k]) ) {
                            qt1 = qt[k].replace(re, qt1_txt);
                            qt2 = qt[k].replace(re, qt2_txt);
                        } else {
                            qt1 = qt[k].replace(re2, qt1_txt);
                            qt2 = qt[k].replace(re2, qt2_txt);
                        }
                        if (map_data[qt1]) {
                            quest_txt += '<span class="color-image2"><a href="https://sokomin.github.io/map/map_viewer.html?map_id='+ qt1 +'">' + map_data[qt1].name + '</a></span> ';
                            quest_txt += '<span class="color-image4">' + qt2 + '</span>';
                        } else {
                            // quest_txt += '<span class="color-image2">' + qt1 + '</span> ';
                            quest_txt += map_tmp;
                            quest_txt += '<span class="color-image4">' + qt2 + '</span>';
                        }
                        quest_txt += "<br>";
                        continue;
                    }

                    re = /monster (.*?) \'(.*?)\';/;
                    re2 = /monster (.*?) \'(.*?)\'(.*?)/;
                    if (re.test(qt[k]) || re2.test(qt[k])) {
                        if (header_flag) {
                            quest_txt += '<span class="color-image17">関連モンスター</span><br><hr class="quest-hr">';
                            header_flag = false;
                        }
                        var qt1_txt = '$1'
                        var qt2_txt = '$2'
                        var qt1 = "";
                        var qt2 = "";
                        if (re.test(qt[k]) ) {
                            qt1 = qt[k].replace(re, qt1_txt);
                            qt2 = qt[k].replace(re, qt2_txt);
                        } else {
                            qt1 = qt[k].replace(re2, qt1_txt);
                            qt2 = qt[k].replace(re2, qt2_txt);
                        }
                        if (map_data[qt1]) {
                            quest_txt += '<span class="color-image2"><a href="https://sokomin.github.io/map/map_viewer.html?map_id='+ qt1 +'">' + map_data[qt1].name + '</a></span> ';
                            quest_txt += '<span class="color-image1">' + qt2 + '</span>';
                        } else {
                            // quest_txt += '<span class="color-image2">' + qt1 + '</span> ';
                            quest_txt += map_tmp;
                            quest_txt += '<span class="color-image1">' + qt2 + '</span>';
                        }
                        quest_txt += "<br>";
                        continue;
                    }

                    re = /value \'(.*?)\';/;
                    re2 = /value \'(.*?)\'(.*?)/;
                    if (re.test(qt[k]) || re2.test(qt[k])) {
                        quest_txt += '<br><span class="color-image17">進行状況</span><br><hr class="quest-hr">';
                        var qt1_txt = '$1'
                        // var qt2_txt = '$2'
                        var qt1 = "";
                        // var qt2 = "";
                        if (re.test(qt[k]) ) {
                            qt1 = qt[k].replace(re, qt1_txt);
                            // qt2 = qt[k].replace(re, qt2_txt);
                        } else {
                            qt1 = qt[k].replace(re2, qt1_txt);
                            // qt2 = qt[k].replace(re2, qt2_txt);
                        }
                        quest_txt += convText(qt1);
                        quest_txt += "<br>";
                        continue;
                    }

                    re = /item (.*?) \'(.*?)\';/;
                    re2 = /item (.*?) \'(.*?)\'(.*?)/;
                    if (re.test(qt[k]) || re2.test(qt[k])) {
                        if (header_flag) {
                            quest_txt += '<span class="color-image17">関連アイテム</span><br><hr class="quest-hr">';
                            header_flag = false;
                        }
                        // TODO qt1はitem_idが直で入ってることもある。ここは手動で対応。
                        var qt1_txt = '$1'
                        var qt2_txt = '$2'
                        var qt1 = "";
                        var qt2 = "";
                        if (re.test(qt[k]) ) {
                            qt1 = qt[k].replace(re, qt1_txt);
                            qt2 = qt[k].replace(re, qt2_txt);
                        } else {
                            qt1 = qt[k].replace(re2, qt1_txt);
                            qt2 = qt[k].replace(re2, qt2_txt);
                        }
                        quest_txt += '<span class="color-image1">' + qt2 + '</span> ';
                        quest_txt += '<span class="color-image20">' + qt1 + '個</span>';
                        quest_txt += "<br>";
                        continue;
                    }

                    re = /object (.*?) \'(.*?)\';/;
                    re2 = /object (.*?) \'(.*?)\'(.*?)/;
                    if (re.test(qt[k]) || re2.test(qt[k])) {
                        if (header_flag) {
                            quest_txt += '<span class="color-image17">関連アイテム</span><br><hr class="quest-hr">';
                            header_flag = false;
                        }
                        var qt1_txt = '$1'
                        var qt2_txt = '$2'
                        var qt1 = "";
                        var qt2 = "";
                        if (re.test(qt[k]) ) {
                            qt1 = qt[k].replace(re, qt1_txt);
                            qt2 = qt[k].replace(re, qt2_txt);
                        } else {
                            qt1 = qt[k].replace(re2, qt1_txt);
                            qt2 = qt[k].replace(re2, qt2_txt);
                        }
                        var pos = qt1.split(",");
                        if (map_data[pos[0]]) {
                            quest_txt += '<span class="color-image2">' + map_data[pos[0]].name + '</span> ' + "(" + pos[1] + "," + pos[2] + ") ";
                            quest_txt += '<span class="color-image1">' + qt2 + '</span>';
                        } else {
                            quest_txt += '<span class="color-image2">' + pos[0] + '</span> ' + "(" + pos[1] + "," + pos[2] + ") ";
                            quest_txt += '<span class="color-image1">' + qt2 + '</span>';
                        }
                        quest_txt += "<br>";
                        continue;
                    }

                    re = /switch (.*?) \'(.*?)\';/;
                    re2 = /switch (.*?) \'(.*?)\'(.*?)/;
                    if (re.test(qt[k]) || re2.test(qt[k])) {
                        if (header_flag) {
                            quest_txt += '<span class="color-image17">関連アイテム</span><br><hr class="quest-hr">';
                            header_flag = false;
                        }
                        var qt1_txt = '$1'
                        var qt2_txt = '$2'
                        var qt1 = "";
                        var qt2 = "";
                        if (re.test(qt[k]) ) {
                            qt1 = qt[k].replace(re, qt1_txt);
                            qt2 = qt[k].replace(re, qt2_txt);
                        } else {
                            qt1 = qt[k].replace(re2, qt1_txt);
                            qt2 = qt[k].replace(re2, qt2_txt);
                        }
                        quest_txt += '<span class="color-image20">' + qt1 + '</span> ';
                        quest_txt += qt2;
                        quest_txt += "<br>";
                        continue;
                    }

                    re = /_codeEnd/;
                    if (re.test(qt[k])) {
                        quest_txt += '<br><span class="color-image17">クエスト情報</span><br><hr class="quest-hr">'
                        continue;
                    }
                    re = /_codeEND/;
                    if (re.test(qt[k])) {
                        quest_txt += '<br><span class="color-image17">クエスト情報</span><br><hr class="quest-hr">'
                        continue;
                    }
                    quest_txt += convText(qt[k]);
                    quest_txt += "<br>";
                }
                quest_txt += "<br><hr><br>";
            }
        }
        $tr_txt.append($('<td>').attr({ "colspan": "2", }).append(quest_txt));

        var $client = $('<tr>');
        //依頼人(座標は手動で足す。)
        if (data["str_unknown2"]) {
            $client.append($('<th>').append("受諾場所"));
            var txt = '<span class="color-image2"> </span> <span class="color-image4">' + data["str_unknown2"] + "</sapn>"
            $client.append($('<td>').append(txt));
        }

        // 要求レベル
        var $req_lv = $('<tr>');
        if (data["unknown2_0"] != void 0) {
            // TODO 1次転生や特殊条件を満たした場合などに対応しきれていないので、手動で編集すること。
            $req_lv.append($('<th>').append("受諾条件"));
            var txt = 'Lv ' + data["unknown2_0"] + "～" + data["unknown2_1"]
            if (Number(data["unknown2_0"]) == Number(data["unknown2_1"]) && Number(data["unknown2_0"]) == 0) {
                txt = "Lv制限無し"
            }
            $req_lv.append($('<td>').append(txt));
        }

        $table.append($tr_Name);
        $table.append($tr_txt);
        $table.append($client);
        $table.append($req_lv);
        $div_main.append($table);
        $div_main.append("<br><br>");
        cnt++;
    }
    $("#preview_html").empty().append($div_main);

}

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列(任意)
 */
 function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function validateData(data, qtype, lv, debug) {
    // type2は未実装っぽいから非表示にしてもいいかも…
    if (!data) {
        return true;
    }
    if (!data["name"]) {
        return true;
    }
    if (Number(debug) == 9999) {
        return false;
    }
    // クエストのタイプで絞りたい時に
    if (data["unknown1"] != qtype) {
        return true;
    }
    // クエストの要求レベルで絞りたい時に
    if (data["unknown2_0"]　< lv) {
        return true;
    }


    return false;
}


function convText(str) {
    var re = /<c:YELLOW>\%d<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image20">(n)</span>'
        str = str.replace(re, replace_txt);
    }

    var re = /\%d/g;
    if (re.test(str)) {
        var replace_txt = '(n)'
        str = str.replace(re, replace_txt);
    }

    re = /<c:GREEN>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image4">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:RED>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image1">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:CYAN>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image17">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:LTCYAN>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image15">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:LTRED>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image11">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:YELLOW>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image20">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:LTYELLOW>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image13">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:GOLDYELLOW>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image3">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:CTPURPLE>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image5">$1</span>'
        str = str.replace(re, replace_txt);
    }

    re = /<c:LTPURPLE>(.*?)<n>/g;
    if (re.test(str)) {
        var replace_txt = '<span class="color-image18">$1</span>'
        str = str.replace(re, replace_txt);
    }

    return str;
}