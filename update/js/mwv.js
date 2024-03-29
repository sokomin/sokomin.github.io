//CSVファイルを読み込む関数getCSV()の定義
function getCSV(is_area) {
    var req = new XMLHttpRequest();// HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    // req.open("get", "https://sokomin.github.io/update/js/monster.csv", true);//アクセスするファイルを指定
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/monster.csv", true);
    req.send(null);
    req.onload = function () {
        getMapCSV(is_area, req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

// 入れ子じゃん・・・ジェネレータだから許して。
function getMapCSV(is_area, monster_str) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maplist.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(is_area, monster_str, req.responseText);
    }
}

var obj_format = {};
var monster_data = {};
var map_data = {};
var map_import = {};
var a1 = 0; //map_id
var tmp_divx = -1;
var tmp_divy = -1;
var mob_inid_map = {}

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(is_area, str, map_str) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    monster_data = {};
    map_data = {};
    tmp_divx = -1;
    tmp_divy = -1;

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

    if (is_area) {
        createAreaPositionTable();
    } else {
        createMobPositionTable();
    }
}

var DROP_TEXT_CONST = "<b><ドロップアイテム></b><br>";
var SKILL_TEXT_CONST = "<b><使用スキル></b><br>";

function calc1() {
    // モンスターデータ読み込み(同期の関係上、これ以外呼ばない)
    getCSV();
}

function calc2() {
    var file = document.getElementById('files').files;
    map_import = {};

    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
    //読込終了後の処理
    reader.onload = function (ev) {
        var file_name = document.querySelector('#files').files[0].name;
        a1 = Number(file_name.match(/\d+/)[0]);
        var map_str = reader.result;
        var result = [];// 最終的な二次元配列を入れるための配列
        var map_tmp = map_str.split("\r\n");// 改行を区切り文字として行を要素とした配列を生成
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
                map_import[result[i][0]] = md;
            }
        }
        getCSV();
    }
}

function calc3() {
    var file = document.getElementById('area_files').files;
    map_import = {};

    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
    //読込終了後の処理
    reader.onload = function (ev) {
        var file_name = document.querySelector('#area_files').files[0].name;
        a1 = Number(file_name.match(/\d+/)[0]);
        var map_str = reader.result;
        var result = [];// 最終的な二次元配列を入れるための配列
        var map_tmp = map_str.split("\r\n");// 改行を区切り文字として行を要素とした配列を生成
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
                map_import[result[i][0]] = md;
            }
        }
        getCSV(true);
    }
}

function createMobPositionTable() {
    // マップサイズはmaplistの値をもとに推測してみる。mapidを手動で入力
    // var a1 = $('input[name="a1"]').val()? Number($('input[name="a1"]').val()) : 0;
    var a2 = $('input[name="a2"]').val() ? Number($('input[name="a2"]').val()) : 0;
    var a3 = $('input[name="a3"]').val() ? Number($('input[name="a3"]').val()) : 0;
    // var a2 = $('input[name="a2"]').val()? Number($('input[name="a2"]').val()) : 200;
    var max_selected_data = map_data[a1];
    if (!max_selected_data) {
        alert("maplistが古い可能性あり");
    }
    var max_x = max_selected_data["x"] ? max_selected_data["x"] : max_selected_data["unknown_0"];
    var max_y = max_selected_data["y"] ? max_selected_data["y"] : max_selected_data["unknown_1"];
    // ない場合はmaplist.csvと同じサイズで問題ない。
    if (!max_x || !max_y) {
        alert("maplistから最大x,yが取れてないからposx, posy取れないよ");
    }
    var img_size = IMG_SIZE[a1] ? IMG_SIZE[a1] : { w: map_data[a1].unknown_0, h: map_data[a1].unknown_1 };

    var $div_main = $('<div>');
    var max_inid = -1;
    // 座標系の最大値計算
    for (var i in map_import) {
        var data = map_import[i];
        testPosX(Number(data["posx"]), Number(max_x));
        testPosY(Number(data["posy"]), Number(max_y));
        var tmp_inid = Number(data["inid"]);
        if (tmp_inid > max_inid) {
            max_inid = tmp_inid;
        }
    }

    var header = "MobData = {<br>" + a1 + ": [ ";
    $div_main.append(header);
    for (var i in map_import) {
        var data = map_import[i];
        // マップは全部出す
        // if (validateData(data, QTYPE, REQ_LEVEL, DEBUG)) {
        //     continue;
        // }

        if (!data || data["inid"] == void 0) {
            continue;
        }
        var mobdb_tmp = {};
        mobdb_tmp["id"] = i;
        mobdb_tmp["inid"] = Number(data["inid"]);
        mobdb_tmp["type"] = Number(data["type"]);
        mobdb_tmp["name"] = data["name"];
        if (mob_inid_map[mobdb_tmp["inid"]] && mob_inid_map[mobdb_tmp["inid"]] == data["name"]) {
            // 既にあるので追記しない
        } else if (mob_inid_map[mobdb_tmp["inid"]] && mob_inid_map[mobdb_tmp["inid"]] != data["name"]) {
            // コンフリクトしてるので、どっちかのinidを書き換える必要がある。
            var inid_exist_flag = true;
            for (var key in mob_inid_map) {
                if (mob_inid_map[mobdb_tmp["inid"]] == data["name"]) {
                    // 見つけた場合はそのinidで統合（名前かぶってたらどうしようもないけど、そんなケースはないはず）
                    mobdb_tmp["inid"] = key;
                    inid_exist_flag = false;
                    break;
                }
            }
            if (inid_exist_flag) {
                max_inid++;
                mob_inid_map[max_inid] = data["name"];
                mobdb_tmp["inid"] = max_inid;
            }
        } else {
            mob_inid_map[mobdb_tmp["inid"]] = data["name"];
        }
        mobdb_tmp["repop"] = Number(data["repop"]);
        mobdb_tmp["id_area"] = Number(data["id_area"]);
        mobdb_tmp["lv_min"] = Number(a2);
        mobdb_tmp["lv_max"] = Number(a3);
        mobdb_tmp["is_npc"] = Number(data["is_enemy"]) == 0;
        mobdb_tmp["real_posx"] = calcPos(Number(data["posx"]), Number(max_x), tmp_divx);
        mobdb_tmp["real_posy"] = calcPos(Number(data["posy"]), Number(max_y), tmp_divy);
        mobdb_tmp["posx"] = calcImgPos(Number(data["posx"]), Number(max_x), img_size["w"], tmp_divx);
        mobdb_tmp["posy"] = calcImgPos(Number(data["posy"]), Number(max_y), img_size["h"], tmp_divy);
        var res = JSON.stringify(mobdb_tmp) + ",<br>";
        $div_main.append(res);
    }
    console.log(mob_inid_map);

    var footer = "]};";
    $div_main.append(footer);

    // Mobのフィルタをしたい時用に
    var moblist_text = a1 + ': ["モンスター", ';
    cnt = 0;
    for (var key in mob_inid_map) {
        var name = mob_inid_map[key];
        if (cnt < Number(key)) {
            for (var k = cnt; k < key; k++) {
                moblist_text += '"';
                moblist_text += "None.";
                moblist_text += '",';
                cnt++;
            }
        }
        moblist_text += '"';
        moblist_text += name;
        moblist_text += '",';
        cnt++;
    }

    moblist_text += "],";
    $div_main.append('<br><br><br><br><span class="color-image1">mapdataのMoblistにアイ・コピー☆</span><br><br>');
    $div_main.append(moblist_text);

    var map2csv = '';
    for (var key in mob_inid_map) {
        var name = mob_inid_map[key];
        map2csv += (',' + a1 + ',' + name + ',' + a1 + ',' + Number(a2) + ',' + Number(a3) + ',100,100<br>')
    }

    $div_main.append('<br><br><br><br><span class="color-image1">map2csvの雛形作ったよ！</span><br><br>');
    $div_main.append(map2csv);

    //monster.csvからinidの名前から順次、mobdbからそれっぽいモンスターを探してきたい。
    // 見つかったのだけでもmap2.csvに仕込みたい
    var matched_mob = '';
    for (var i in monster_data) {
        var data = monster_data[i];
        if (!data || !data["name"]) {
            continue;
        }
        var sname = data["name"];
        for (var key in mob_inid_map) {
            var name = mob_inid_map[key];
            if (sname.indexOf(name) != -1) {
                matched_mob += (',' + a1 + ',' + sname + ',' + Number(i) + ',' + Number(a2) + ',' + Number(a3) + ',100,100<br>')
            }
        }
    }
    $div_main.append('<br><br><br><br><span class="color-image1">↓map2.csvに参考になりそうな情報↓</span><br><br>');
    $div_main.append(matched_mob);

    $div_main.append('<br><br><br><br><span class="color-image1">狩場の適正レベルはmapDataのNameListに、<br>画像サイズはIMG_SIZEに、抵抗低下情報はmapdata_subに記載してね！<br></span><br><br>');

    $("#preview_html").empty().append($div_main);

}

function createAreaPositionTable() {
    // マップサイズはmaplistの値をもとに推測してみる。mapidを手動で入力
    // var a1 = $('input[name="a1"]').val()? Number($('input[name="a1"]').val()) : 0;
    // var a2 = $('input[name="a2"]').val()? Number($('input[name="a2"]').val()) : 200;
    var max_selected_data = map_data[a1];
    var max_x = max_selected_data["x"] ? max_selected_data["x"] : max_selected_data["unknown_0"];
    var max_y = max_selected_data["y"] ? max_selected_data["y"] : max_selected_data["unknown_1"];
    // ない場合はmaplist.csvと同じサイズで問題ない。
    if (!max_x || !max_y) {
        alert("maplistから最大x,yが取れてないからposx, posy取れないよ");
    }
    var img_size = IMG_SIZE[a1] ? IMG_SIZE[a1] : { w: map_data[a1].unknown_0, h: map_data[a1].unknown_1 };

    var $div_main = $('<div>');
    // 座標系の最大値計算
    for (var i in map_import) {
        var data = map_import[i];
        testPosX(Number(data["posx"]), Number(max_x));
        testPosY(Number(data["posy"]), Number(max_y));
    }

    var header = "AreaData = {<br>" + a1 + ": [ ";
    $div_main.append(header);
    for (var i in map_import) {
        var data = map_import[i];
        // マップは全部出す
        // if (validateData(data, QTYPE, REQ_LEVEL, DEBUG)) {
        //     continue;
        // }

        if (!data || data["type"] == void 0) {
            continue;
        }
        var mobdb_tmp = {};
        mobdb_tmp["id"] = i;
        mobdb_tmp["type"] = Number(data["type"]);
        mobdb_tmp["name"] = data["name"];
        mobdb_tmp["area_name"] = data["area_name"];
        mobdb_tmp["access_map"] = data["access_map"];
        if (data["access_map"]) {
            // var re = /\[(.*?)\](.*?)/;
            // var replace_txt = "$1"
            // var next_map_id = Number(data["access_map"].replace(re, replace_txt));
            var next_map_id = data["access_map"]>=0 ? data["access_map"].match(/\d+/)[0] : -1;
            var next_map_data = map_data[next_map_id];
            if (next_map_data && next_map_data.name) {
                mobdb_tmp["name"] = next_map_data.name;
                mobdb_tmp["access_map"] = next_map_data.filename;
            }
        }
        mobdb_tmp["is_secret"] = isSecret(data);
        mobdb_tmp["real_posx"] = calcPos(Number(data["posx"]), Number(max_x), tmp_divx);
        mobdb_tmp["real_posx2"] = calcPos(Number(data["posx2"]), Number(max_x), tmp_divx);
        mobdb_tmp["real_posy"] = calcPos(Number(data["posy"]), Number(max_y), tmp_divy);
        mobdb_tmp["real_posy2"] = calcPos(Number(data["posy2"]), Number(max_y), tmp_divy);
        // 画像にあわせて座標を再計算
        mobdb_tmp["posx"] = calcImgPos(Number(data["posx"]), Number(max_x), img_size["w"], tmp_divx);
        mobdb_tmp["posx2"] = calcImgPos(Number(data["posx2"]), Number(max_x), img_size["w"], tmp_divx);
        mobdb_tmp["posy"] = calcImgPos(Number(data["posy"]), Number(max_y), img_size["h"], tmp_divy);
        mobdb_tmp["posy2"] = calcImgPos(Number(data["posy2"]), Number(max_y), img_size["h"], tmp_divy);
        var res = JSON.stringify(mobdb_tmp) + ",<br>";
        $div_main.append(res);
    }

    var footer = "]};";
    $div_main.append(footer);

    $("#preview_area_html").empty().append($div_main);

}

// 秘密ダンジョンかどうかの判定。これ以外のtype2は扉なので注意。
function isSecret(data) {
    var res = 0;
    if (Number(data["unknown_1_8"]) == 1
        // && Number(data["unknown_1_11"]) == 1 秘密Dとは関係無し
        && Number(data["unknown_1_6"]) == 1000
        && Number(data["unknown_1_4"]) == 10000
        && Number(data["unknown_1_19"]) > 0 //多分これだけ調べれば秘密Dのidなので大丈夫では…？ 
        ){
        res = 1;
    }
    return res;
}
// XとYで違う座標を仕込まないとダメ
function testPosX(tmp, max_x) {
    var x = tmp;
    var cnt = 1;
    while (x > max_x) {
        x = x / 2;
        cnt = cnt * 2;
    }
    if (cnt > tmp_divx) {
        tmp_divx = cnt;
    }
}
// XとYで違う座標を仕込まないとダメ
function testPosY(tmp, max_x) {
    var x = tmp;
    var cnt = 1;
    while (x > max_x) {
        x = x / 2;
        cnt = cnt * 2;
    }
    if (cnt > tmp_divy) {
        tmp_divy = cnt;
    }
}

function calcPos(x, max, n) {
    x = orgRound(x / n, 100);
    if (n > 0 && x > max) {
        console.log("座標計算失敗してる。x：" + x + ", max:" + max);
    }
    return x;
}

function calcImgPos(x, max, n, div) {
    if (max <= 0 || n <= 0) {
        console.log("座標がおかしい。x：" + x + ", max:" + max + " n:" + n);
        return x;
    }
    x = orgRound(x * n / max / div, 100);
    return x;
}

/**
 * 任意の桁で四捨五入する関数
 * @param {number} value 四捨五入する数値
 * @param {number} base どの桁で四捨五入するか(10→10の位、0.1→小数第１位)
 * @return {number} 四捨五入した値
 */
function orgRound(value, base) {
    return Math.round(value * base) / base;
}

// mobdbのテスト
function test1() {
    var MobData = null;
    var AreaData = null;
    var el = null;
    var res_val = [];
    var err_text = "";
    const readMobDB = (param, callback) => {
        const result = callback();
        return new Promise((resolve, reject) => {
            appendScript(param, function (res) {
                console.log(res);
                if (res) {
                    resolve(result);
                } else {
                    reject("失敗");
                }
            });
        });
    }
    // readMobDB("https://sokomin.github.io/map/database/mobdb0.js", () => {
    //     console.log("1こめ");
    //     return 1;
    // }).then(value => {
    //     res_val.push(value);
    //     return readMobDB("https://sokomin.github.io/map/database/mobdb1.js", () => {
    //         console.log("2こめ");
    //         return 2;
    //     })
    // }).catch(console.error);
    for (var i = 0; i <= 1018; i++) {
        readMobDB("https://sokomin.github.io/map/database/mobdb"+ i +".js", () => {
            // console.log("1こめ");
            return 1;
        }).then(value => {
            res_val.push(value);
            if (!MobData) {
                err_text += ("モンスターデータがない" + i + "<br>");
            } else if (!MobData[i]) {
                err_text += ("モンスターデータの番号が違う" + i + "<br>");
            } else {

            }
            if (!AreaData) {
                err_text += ("エリアデータがない" + i + "<br>");
            } else if (!AreaData[i]) {
                err_tesxt += ("エリアデータの番号が違う" + i + "<br>");
            } else {

            }
            // return removeScript(el, () => {
            //     return 2;
            // })
        }).catch(console.error);

        // try {
        //     el = appendScript("https://sokomin.github.io/map/database/mobdb" + i + ".js");
        //     if (!el) {
        //         throw ("404 Not Found. " + i);
        //     }
        // } catch (e) {
        //     console.log(e);
        // } finally {
        //     // MobData = MobData[i];
        //     // AreaData = AreaData[i];
        //     if (!MobData) {
        //         err_text += ("モンスターデータがない" + i + "<br>");
        //     } else if (!MobData[i]) {
        //         err_text += ("モンスターデータの番号が違う" + i + "<br>");
        //     } else {

        //     }
        //     if (!AreaData) {
        //         err_text += ("エリアデータがない" + i + "<br>");
        //     } else if (!AreaData[i]) {
        //         err_tesxt += ("エリアデータの番号が違う" + i + "<br>");
        //     } else {

        //     }
        //     removeScript(el);
        // }
    }
    $("#test_area_result").empty().append(err_text);

}

function test2() {

}
