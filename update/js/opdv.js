//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
    var req = new XMLHttpRequest();// HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "https://sokomin.github.io/update/js/prefix.csv", true);//アクセスするファイルを指定
    req.send(null);// HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function () {
        convertCSVtoArray(req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

var obj_format = {};
var prefix_data = {};

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(str) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    prefix_data = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
        var re;
        if (i == 1) {
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
            prefix_data[result[i][0]] = md;
        }
    }
    // console.log(prefix_data);

    // モンスターデータ解析
    createMobTable();
}

function calc1() {
    // モンスターデータ読み込み(同期の関係上、これ以外呼ばない)
    getCSV();
}

function createMobTable() {
    var DEBUG = getParam('debug') ? parseInt(getParam('debug')) : 0;
    var $div_main = $('<div>');
    // TODO OP名のタイトルいれたい
    prefix_data = Object.values(prefix_data).sort(function (a, b) {
        return Number(a.op_id) - Number(b.op_id);
    });

    var op_id = -1;
    for (var i in prefix_data) {
        var data = prefix_data[i];
        if (validateData(data, DEBUG)) {
            continue;
        }

        var tmp_op_id = Number(data["op_id"]);

        var $table = $('<table>').attr("id", "table1")
            .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", "22%"))
            .append($("<col>").attr("span", 1).attr("width", "45%"))
            );
        var $th_Name = $('<tr>');
        $th_Name.append($('<th>').text("オプション"));
        $th_Name.append($('<th>').text("効果"));
        $th_Name.append($('<th>').text("要求Lv上昇"));
        $th_Name.append($('<th>').text("付加係数"));

        // TODO 協会OPやNPC称号についても記載したいので、判別方法考えとく
        var $tr_Name = $('<tr>');
        $tr_Name.append($('<td>').append(createOpTxt(data["text1"])));
        $tr_Name.append($('<td>').append(
            createOpDetail(option_text[data["op_id"]], data["n0_min"], data["n0_max"], data["n1_min"], data["n1_max"], data["n2"]))
        );
        $tr_Name.append($('<td>').text(data["level"]));
        $tr_Name.append($('<td>').text(data["137"]));

        if (op_id != tmp_op_id) {
            $table.append($th_Name);
            $div_main.append("<br>");
            op_id = tmp_op_id;
        }
        $table.append($tr_Name);
        $div_main.append($table);
    }
    $("#preview_html").empty().append($div_main);

}

// 非表示にしたいデータはここで定義
function validateData(data, debug) {
    var id = Number(data.sortid);

    if (id <= 0 || id == void 0 || !id) {
        return true;
    }

    // 遺物OPなどを表示したい時だけは?debug=40000指定で
    if (id > 40000 && id < 50000 && Number(debug) == 40000) {
        return false;
    } else if ((id <= 40000 || id >= 50000) && Number(debug) == 40000) {
        return true;
    }
    if (id > 40000 && id < 50000) {
        return true;
    }

    // 隠しOP？
    if (id > 7000 && id < 7100) {
        return true;
    }
    if (id == 5001 || id==6201 || id==8001) {
        return true;
    }

    if (Number(debug) == 9999) {
        return false;
    }
    return false;
}


function createOpTxt(txt) {
    if (!txt) {
        return txt;
    }
    var re = /\[/g;
    txt = txt.replace(re, "");
    re = /\]/g;
    txt = txt.replace(re, "");

    txt = '<font color="#00f800">' + txt + '</font>';
    return txt;
}

// オプション詳細を出力
function createOpDetail(txt, n0min, n0max, n1min, n1max, n2) {
    if (!txt) {
        return txt;
    }
    var replace_txt = "";
    var re = /スキルレベル\+\[0\]\(\[1\]系列職業\)/;
    if (re.test(txt)) {
        var job = chara_code[n1max].name;
        if (n0min == n0max) {
            replace_txt = '<font color="#f8f800">' + job + '</font> スキルレベル +<font color="#f8f800">' + n0max +'</font>';
        } else {
            replace_txt = '<font color="#f8f800">' + job + '</font> スキルレベル +<font color="#f8f800">[' + n0min + '~' + n0max + ']</font>';
        }
        txt = txt.replace(re, replace_txt);
        return txt;
    }

    // OP補正を黄色に
    re = /(.*?)(\[0\])(.*?)/g;
    if (n0min == n0max) {
        replace_txt = '$1<font color="#f8f800">' + n0max + '</font>$3';
    } else {
        replace_txt = '$1<font color="#f8f800">[' + n0min + '~' + n0max + ']</font>$3';
    }
    txt = txt.replace(re, replace_txt);

    re = /(.*?)(\[1\])(.*?)/g;
    if (n1min == n1max) {
        replace_txt = '$1<font color="#f8f800">' + n1max + '</font>$3';
    } else {
        replace_txt = '$1<font color="#f8f800">[' + n1min + '~' + n1max + ']</font>$3';
    }
    txt = txt.replace(re, replace_txt);

    re = /(.*?)(\[2\])(.*?)/g;
    replace_txt = '$1<font color="#f8f800">' + n2 + '</font>$3';
    txt = txt.replace(re, replace_txt);

    return txt;
}