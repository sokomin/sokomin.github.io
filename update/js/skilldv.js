function getCSV() {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/skill.csv", true);//アクセスするファイルを指定
    req.send(null);
    req.onload = function () {
        getMobCSV(req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

function getMobCSV(skill_str) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/update/js/monster.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(skill_str, req.responseText);
    }
}


var obj_format = {};
var skill_data = {};
var mob_data = {};

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(skill_str, mob_str) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    skill_data = {};
    mob_data = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = skill_str.split("\"\n\"");// 改行を区切り文字として行を要素とした配列を生成
    // var tmp = skill_str.split("\n");
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        var tmp_txt = tmp[i].split('\",\"');//文中に,出てくる問題への対処
        tmp_txt = tmp_txt.join('",,,,,"');
        result[i] = tmp_txt.split(',,,,,');
        // result[i] = mob_tmp[i].split(',');
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
            if (skill_data[result[i][0]]) {
                skill_data[100000 + Number(result[i][0])] = md;
            } else {
                skill_data[result[i][0]] = md;
            }
        }
    }
    // console.log(quest_data);

    var result = [];// 最終的な二次元配列を入れるための配列
    var mob_tmp = mob_str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < mob_tmp.length; ++i) {
        result[i] = mob_tmp[i].split(',');
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
            mob_data[result[i][0]] = md;
        }
    }
    // console.log(map_data);



    createSkillTable();
}

function calc1() {
    // モンスターデータ読み込み(同期の関係上、これ以外呼ばない)
    getCSV();
}
var JN, SS;


function createSkillTable() {
    // var a1 = $('input[name="a1"]').val()? Number($('input[name="a1"]').val()) : 0;
    // var a2 = $('input[name="a2"]').val()? Number($('input[name="a2"]').val()) : 9999;
    var JOBID = getParam('jobid') ? parseInt(getParam('jobid')) : -1;
    // var REQ_LEVEL = getParam('lv') ? parseInt(getParam('lv')) : 0;
    var DEBUG = getParam('debug') ? parseInt(getParam('debug')) : 0;
    var $div_main = $('<div>');
    defdata(JOBID);　//JNとSSをいれる
    for (var i in skill_data) {
        var data = skill_data[i];
        if (validateData(data, JOBID, DEBUG)) {
            continue;
        }
        var $table;
        var imgid = ('0000' + data["imageid"]).slice(-4);
        var skill_icon = '<img width="34" height="34" src="https://sokomin.github.io/skill/design/image/skill/iconSkill_'+ imgid +'.png"border="0">';
        var re=/\\r\\n/g;
        var skill_txt = data["str_description"].replace(re, "<br>");
        var re=/。/g;
        skill_txt = skill_txt.replace(re, "。<br>");
        if (i > 100000) {
            skill_txt = skill_txt + '<br><font color="#ff0033">[PVP専用]</font>';
        }
        var powerup_txt = data["str_progress"];
        var req_txt = calcReqText(JN, SS, data["str_name"]);


        if (data["unknown10_139"] != 0 && data["unknown10_139"] != 3) {
            //覚醒スキル
            if (data["unknown10_143"] == 0) {
                //覚醒パッシブ
                $table = $('<table>').attr("id", "table10").css("min-width", "700px").css("text-align", "left")
                    .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 40)));
                var $tr_Name = $('<tr>');
                var skill_title = '<a name="' + i + '"></a><font color="#f8f800">[専用パッシブ] ' + data["str_name"] + '</font>';
                $tr_Name.append($('<th>').attr("colspan", "8").append(skill_title));
                var $tr_icon = $('<tr>');
                var des_txt = 'スキル説明'
                $tr_icon.append($('<th>').attr("rowspan", "2").css("text-align", "left").append(skill_icon))
                    .append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                    .append($('<td>').attr("colspan", "6").css("text-align", "left").append(skill_txt))
                var $tr_detail = $('<tr>');
                var des_txt = 'スキル効果'
                $tr_detail.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                    .append($('<td>').attr("colspan", "6").css("text-align", "left").append(""))

                $table.append($tr_Name);
                $table.append($tr_icon);
                $table.append($tr_detail);
                $div_main.append($table);
                $div_main.append("<br><br>");
            } else {
                //覚醒スキル
                $table = $('<table>').attr("id", "table10").css("min-width", "700px").css("text-align", "left")
                    .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 130)));
                var $tr_Name = $('<tr>');
                var skill_title = '<a name="' + i + '"></a>' + data["str_name"];
                $tr_Name.append($('<th>').append(skill_icon))
                    .append($('<th>').attr("colspan", "8").css("text-align", "left").css("padding-left", "5%").append(skill_title));
                var $tr_icon = $('<tr>');
                var des_txt = 'スキル難易度';
                $tr_icon.append($('<th>').css("text-align", "left").append(des_txt))
                    .append($('<td>').append(data["unknown2_0"]))
                    .append($('<td>').attr("colspan", "7").append(""))
                var $tr_req = $('<tr>');
                var des_txt = '必要スキル'
                $tr_req.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                    .append($('<td>').attr("colspan", "8").css("text-align", "left").append(req_txt))
                var $tr_detail = $('<tr>');
                var des_txt = 'スキル説明'
                $tr_detail.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                    .append($('<td>').attr("colspan", "8").css("text-align", "left").append(skill_txt))
                var $tr_power = $('<tr>');
                var des_txt = 'パワーアップ形態'
                $tr_power.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                    .append($('<td>').attr("colspan", "8").css("text-align", "left").append(powerup_txt))
                // TODO スキル効果の詳細も書けたらここに…

                $table.append($tr_Name);
                $table.append($tr_icon);
                $table.append($tr_req);
                $table.append($tr_detail);
                $table.append($tr_power);
                $div_main.append($table);
                $div_main.append("<br><br>");

            }
        } else {
            //通常スキル
            $table = $('<table>').attr("id", "table10").css("min-width", "700px").css("text-align", "left")
            .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 130)));
            var $tr_Name = $('<tr>');
            var skill_title = '<a name="' + i + '"></a>' + data["str_name"];
            $tr_Name.append($('<th>').append(skill_icon))
                .append($('<th>').attr("colspan", "14").css("text-align", "left").css("padding-left", "5%").append(skill_title));
            var $tr_icon = $('<tr>');
            var des_txt = 'スキル難易度';
            $tr_icon.append($('<th>').css("text-align", "left").append(des_txt))
                .append($('<td>').append(data["unknown2_0"]))
                .append($('<td>').attr("colspan", "13").append(""))
            var $tr_req = $('<tr>');
            var des_txt = '必要スキル'
            $tr_req.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                .append($('<td>').attr("colspan", "14").css("text-align", "left").append(req_txt))
            var $tr_detail = $('<tr>');
            var des_txt = 'スキル説明'
            $tr_detail.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                .append($('<td>').attr("colspan", "14").css("text-align", "left").append(skill_txt))
            var $tr_power = $('<tr>');
            var des_txt = 'パワーアップ形態'
            $tr_power.append($('<th>').attr("colspan", "1").css("text-align", "left").append(des_txt))
                .append($('<td>').attr("colspan", "14").css("text-align", "left").append(powerup_txt))

            // TODO スキル効果の詳細も書けたらここに…
            
            $table.append($tr_Name);
            $table.append($tr_icon);
            $table.append($tr_req);
            $table.append($tr_detail);
            $table.append($tr_power);
            $div_main.append($table);
            $div_main.append("<br><br>");

        }
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


function validateData(data, jobid, debug) {
    // type2は未実装っぽいから非表示にしてもいいかも…
    if (!data) {
        return true;
    }
    if (data["unknown1_6"] != jobid) {
        return true;
    }
    if (Number(debug) == 9999) {
        return false;
    }
    return false;
}

