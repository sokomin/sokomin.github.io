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
        var req_txt = calcReqText(JN, SS, data["str_name"], JOBID);


        if (data["unknown10_139"] != 0 && data["unknown10_139"] != 3) {
            //覚醒スキル
            if (data["unknown10_143"] == 0) {
                //覚醒パッシブ
                $table = $('<table>').attr("id", "table10").css("min-width", "700px").css("max-width", "1200px").css("text-align", "left")
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
                $table = $('<table>').attr("id", "table10").css("min-width", "700px").css("max-width", "1200px").css("text-align", "left")
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
                /*
                 *スキル効果の詳細
                 */
                var $tr_lv_header = "<tr><th>レベル</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>...</th><th>50</th></tr>";
                var $tr_cost_cp = createCostCP(data, 8);
                var $tr_get_cp = createGetCP(data, 8);
                var $tr_get_damage = createGetDamage(data, 8);

                $table.append($tr_Name);
                $table.append($tr_icon);
                $table.append($tr_req);
                $table.append($tr_detail);
                $table.append($tr_power);
                // ここからスキル表
                $table.append($tr_lv_header);
                $table.append($tr_cost_cp);
                $table.append($tr_get_cp);
                $table.append($tr_get_damage);
                $div_main.append($table);
                $div_main.append("<br><br>");

            }
        } else {
            //通常スキル
            $table = $('<table>').attr("id", "table10").css("min-width", "700px").css("max-width", "1200px").css("text-align", "left")
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

            // スキル詳細もわかるところまで…
            /*
            *スキル効果の詳細
            */
            var $tr_lv_header = "<tr><th>レベル</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>20</th><th>30</th><th>40</th><th>50</th></tr>";
            var $tr_cost_cp = createCostCP(data, 14);
            var $tr_get_cp = createGetCP(data, 14);
            var $tr_get_damage = createGetDamage(data, 14);


            $table.append($tr_Name);
            $table.append($tr_icon);
            $table.append($tr_req);
            $table.append($tr_detail);
            $table.append($tr_power);
            // ここからスキル表
            $table.append($tr_lv_header);
            $table.append($tr_cost_cp);
            $table.append($tr_get_cp);
            $table.append($tr_get_damage);
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

function createCostCP(data, mode) {
    var res_html = "<tr><th>消費CP</th>"
    if (mode == 8) {
        if (data["unknown2_13"] > 0) {
            for (var i = 1; i <= 50; i++) {
                if (i >= 7) {
                    res_html += '<td>...</td>'
                    i += 44;
                }
                var ccp = Number(data["unknown2_12"]) + Number(data["unknown2_13"]) * i;
                if (Number(data["unknown2_14"]) > 0 && ccp > Number(data["unknown2_14"]) ) {
                    ccp = Number(data["unknown2_14"]);
                }
                res_html += '<td>' + (Math.round(ccp / 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        } else {
            res_html += '<td colspan="8">' + data["unknown2_12"] +  '</td>'
        }
    } else {
        if (data["unknown2_13"] > 0) {
            for (var i = 1; i <= 50; i++) {
                var ccp = Number(data["unknown2_12"]) + Number(data["unknown2_13"]) * i;
                if (Number(data["unknown2_14"]) > 0 && ccp > Number(data["unknown2_14"]) ) {
                    ccp = Number(data["unknown2_14"]);
                }
                res_html += '<td>' + (Math.round(ccp / 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
                if (i >= 10) {
                    i += 9;
                }
            }
        } else {
            res_html += '<td colspan="14">' + (Math.round(Number(data["unknown2_12"]) / 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
        }
    }
    res_html += "</tr>"
    return res_html;
}


function createGetCP(data, mode) {
    var res_html = "<tr><th>獲得CP</th>"
    if (mode == 8) {
        if (data["unknown2_16"] > 0) {
            for (var i = 1; i <= 50; i++) {
                if (i >= 7) {
                    res_html += '<td>...</td>'
                    i += 44;
                }
                var ccp = Number(data["unknown2_15"]) + Number(data["unknown2_16"]) * i;
                if (Number(data["unknown2_17"]) > 0 && ccp > Number(data["unknown2_17"]) ) {
                    ccp = Number(data["unknown2_17"]);
                }
                res_html += '<td>' + (Math.round(ccp / 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        } else {
            res_html += '<td colspan="8">' + data["unknown2_15"] +  '</td>'
        }
    } else {
        if (data["unknown2_16"] > 0) {
            for (var i = 1; i <= 50; i++) {
                var ccp = Number(data["unknown2_15"]) + Number(data["unknown2_16"]) * i;
                if (Number(data["unknown2_17"]) > 0 && ccp > Number(data["unknown2_17"]) ) {
                    ccp = Number(data["unknown2_17"]);
                }
                res_html += '<td>' + (Math.round(ccp / 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
                if (i >= 10) {
                    i += 9;
                }
            }
        } else {
            res_html += '<td colspan="14">' + (Math.round(Number(data["unknown2_15"]) / 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
        }
    }
    res_html += "</tr>"
    return res_html;
}


function createGetDamage(data, mode) {
    res_html = ""
    if (mode == 8) {
        // 物理ダメージ覚醒
        if (data["unknown2_136"] != 0 || data["unknown2_138"] > 0) {
            res_html += "<tr><th>◆物理ダメージ</th>"
            if (Number(data["unknown2_138"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_136"]) + Number(data["unknown2_138"]) * i / 10;
                    if (ccp >= 0) {
                        res_html += '<td>+' + Math.round(ccp / 10) + '%</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10) + '%</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_136"]) / 10) +  '</td>'
            }
        }
        // 火属性覚醒
        if (data["unknown2_144"] > 0) {
            res_html += "<tr><th><span class='color-fire'>◆</span>炎ダメージ</th>"
            if (Number(data["unknown2_145"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_144"]) + Number(data["unknown2_145"]) * i;
                    if (Number(data["unknown2_146"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_146"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_146"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_147"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_147"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_147"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_144"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        //水属性覚醒
        if (data["unknown2_151"] > 0) {
            res_html += "<tr><th><span class='color-water'>◆</span>水ダメージ</th>"
            if (Number(data["unknown2_152"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_151"]) + Number(data["unknown2_152"]) * i;
                    if (Number(data["unknown2_153"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_153"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_153"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_154"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_154"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_154"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_151"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        //風属性覚醒
        if (data["unknown2_158"] > 0) {
            res_html += "<tr><th><span class='color-wind'>◆</span>風ダメージ</th>"
            if (Number(data["unknown2_159"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_158"]) + Number(data["unknown2_159"]) * i;
                    if (Number(data["unknown2_160"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_160"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_160"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_161"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_161"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_161"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_158"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        //大地属性覚醒
        if (data["unknown2_165"] > 0) {
            res_html += "<tr><th><span class='color-earth'>◆</span>大地ダメージ</th>"
            if (Number(data["unknown2_166"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_165"]) + Number(data["unknown2_166"]) * i;
                    if (Number(data["unknown2_167"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_167"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_167"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_168"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_168"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_168"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_165"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        //光属性覚醒
        if (data["unknown2_172"] > 0) {
            res_html += "<tr><th><span class='color-shine'>◆</span>光ダメージ</th>"
            if (Number(data["unknown2_173"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_172"]) + Number(data["unknown2_173"]) * i;
                    if (Number(data["unknown2_174"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_174"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_174"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_175"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_175"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_175"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_172"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        //闇属性覚醒
        if (data["unknown2_179"] > 0) {
            res_html += "<tr><th><span class='color-dark'>◆</span>闇ダメージ</th>"
            if (Number(data["unknown2_180"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    if (i >= 7) {
                        res_html += '<td>...</td>'
                        i += 44;
                    }
                    var ccp = Number(data["unknown2_179"]) + Number(data["unknown2_180"]) * i;
                    if (Number(data["unknown2_181"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_181"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_181"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_182"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_182"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_182"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                }
            } else {
                res_html += '<td colspan="8">' + Math.round(Number(data["unknown2_179"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }

    } else {
        // 物理ダメージ通常
        if (data["unknown2_136"] != 0 || data["unknown2_138"] > 0) {
            res_html += "<tr><th>◆物理ダメージ</th>"
            if (Number(data["unknown2_138"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_136"]) + Number(data["unknown2_138"]) * i / 10;
                    if (ccp >= 0) {
                        res_html += '<td>+' + Math.round(ccp / 10) + '%</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10) + '%</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_136"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '％</td>'
            }
        }
        // 通常炎
        if (data["unknown2_144"] > 0) {
            res_html += "<tr><th><span class='color-fire'>◆</span>炎ダメージ</th>"
            if (Number(data["unknown2_145"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_144"]) + Number(data["unknown2_145"]) * i;
                    if (Number(data["unknown2_146"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_146"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_146"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_147"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_147"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_147"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_144"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        // 通常水
        if (data["unknown2_151"] > 0) {
            res_html += "<tr><th><span class='color-water'>◆</span>水ダメージ</th>"
            if (Number(data["unknown2_152"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_151"]) + Number(data["unknown2_152"]) * i;
                    if (Number(data["unknown2_153"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_153"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_153"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_154"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_154"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_154"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_151"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        // 通常風
        if (data["unknown2_158"] > 0) {
            res_html += "<tr><th><span class='color-wind'>◆</span>風ダメージ</th>"
            if (Number(data["unknown2_159"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_158"]) + Number(data["unknown2_159"]) * i;
                    if (Number(data["unknown2_160"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_160"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_160"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_161"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_161"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_161"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_158"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        // 通常大地
        if (data["unknown2_165"] > 0) {
            res_html += "<tr><th><span class='color-earth'>◆</span>大地ダメージ</th>"
            if (Number(data["unknown2_166"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_165"]) + Number(data["unknown2_166"]) * i;
                    if (Number(data["unknown2_167"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_167"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_167"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_168"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_168"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_168"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_165"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        // 通常光
        if (data["unknown2_172"] > 0) {
            res_html += "<tr><th><span class='color-shine'>◆</span>光ダメージ</th>"
            if (Number(data["unknown2_173"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_172"]) + Number(data["unknown2_173"]) * i;
                    if (Number(data["unknown2_174"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_174"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_174"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_175"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_175"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_175"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_172"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }
        // 通常闇
        if (data["unknown2_179"] > 0) {
            res_html += "<tr><th><span class='color-dark'>◆</span>闇ダメージ</th>"
            if (Number(data["unknown2_180"]) > 0) {
                for (var i = 1; i <= 50; i++) {
                    var ccp = Number(data["unknown2_179"]) + Number(data["unknown2_180"]) * i;
                    if (Number(data["unknown2_181"]) > 0) {
                        // ダメージ幅 パターン１
                        var min = ccp - Number(data["unknown2_181"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  Number(data["unknown2_181"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'

                    } else if (Number(data["unknown2_182"]) > 0) {
                        // ダメージ幅パターン２：レベル連動
                        var min = ccp -  i * Number(data["unknown2_182"]) / 10;
                        min = (Math.round(min / 10))
                        var max = ccp +  i * Number(data["unknown2_182"]) / 10;
                        max = (Math.round(max / 10))
                        res_html += '<td>' + min + '～' + max + '</td>'
                    } else {
                        res_html += '<td>' + Math.round(ccp / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '</td>'
                    }
                    if (i >= 10) {
                        i += 9;
                    }
                }
            } else {
                res_html += '<td colspan="14">' + Math.round(Number(data["unknown2_179"]) / 10).toLocaleString(undefined, { maximumFractionDigits: 2 }) +  '</td>'
            }
        }

    }
    return res_html;
}


