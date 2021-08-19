//CSVファイルを読み込む関数getCSV()の定義
function getCSV(mapid) {
    var req = new XMLHttpRequest();// HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "https://sokomin.github.io/update/js/monster.csv", true);//アクセスするファイルを指定
    req.send(null);
    req.onload = function () {
        getMapCSV(mapid, req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

// 入れ子じゃん・・・ジェネレータだから許して。
function getMapCSV(mapid, monster_str) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maptiledb/maptile"+ mapid +"_0.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(mapid, monster_str, req.responseText);
    }
}

var map_img_map = {};
var obj_format = {};
var monster_data = {};
var map_data = {};
var map_import = {};
var a1 = 0; //map_id

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(is_area, str, map_img) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    monster_data = {};
    map_data = {};
    map_img_map = {};

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
            monster_data[result[i][0]] = md;
        }
    }


    var result = [];// 最終的な二次元配列を入れるための配列
    // var map_tmp = map_str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    // for (var i = 0; i < map_tmp.length; ++i) {
    //     result[i] = map_tmp[i].split(',');
    //     var re;
    //     if (i == 0) {
    //         // 列定義
    //         for (var j = 0; j < result[i].length; j++) {
    //             var txt = result[i][j];
    //             re = /\"/g;
    //             txt = txt.replace(re, "");
    //             obj_format[j] = txt;
    //         }
    //         // TODO フォーマット違ったらエラー出すなりしたい
    //         console.log(obj_format);
    //     } else {
    //         var md = {};
    //         for (var j = 1; j < result[i].length; j++) {
    //             var txt = result[i][j];
    //             re = /\"/g;
    //             txt = txt.replace(re, "");
    //             md[obj_format[j]] = txt;
    //         }
    //         re = /\"/g;
    //         result[i][0] = result[i][0].replace(re, "");
    //         map_data[result[i][0]] = md;
    //     }
    // }
    var map_tmp = map_img.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        map_img_map[i] = result[i];
    }
    console.log(map_img_map);

    createTile();
}

var DROP_TEXT_CONST = "<b><ドロップアイテム></b><br>";
var SKILL_TEXT_CONST = "<b><使用スキル></b><br>";

function calc1() {
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    // モンスターデータ読み込み(同期の関係上、これ以外呼ばない)
    getCSV(mapid);
}

var tmp_divx = -1;
var tmp_divy = -1;
var mob_inid_map = {}

map_type_map = {
    0: "Brunenstig",
    1: "Arian",
    2: "Grassland",
    7: "Yatikanu",
}

function createTile() {
    

    var map_type = $('select[name="b1"]').val() ? Number($('select[name="b1"]').val()) : 0;

    $('.main-background-map').css({ 'min-height': "200%", 'min-width': "1000%" });
    var $div_main = $('<div>');

    var html_append = "<br>";
    for (var i in map_img_map) {
        var data = map_img_map[i];
        for (var j = 0; j < data.length; j++) {
            if (j > 450) {
                break;
            }
            var num = ('0000' + data[j]).slice(-4);
            // html_append += '<img width="8px" height="4px" src="https://sokomin.github.io/sokomin_repository/db/mapset/Grassland/tile/tile_'+ num +'.png">'
            html_append += ('<img src="https://sokomin.github.io/sokomin_repository/db/mapset/'+ map_type_map[map_type] +'/tile/tile_'+ num +'.png">')
        }
        html_append += '<br>'
    }
    $div_main.append(html_append);
    $("#preview_html").empty().append($div_main);


}


