const img_width = 64;
const img_height = 32;
const text_font_size = "16px sans-serif";

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
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maptiledb/maptile" + mapid + "_0.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(mapid, monster_str, req.responseText);
    }
}

//移動可能領域
function getMapCSV1(mapid) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maptiledb/maptile" + mapid + "_1.csv", true);
    req.send(null);
    req.onload = function () {
        convertAIndexCSVtoArray(mapid, req.responseText);
    }
}

//0_3
function getMapCSV3(mapid) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maptiledb/maptile" + mapid + "_3.csv", true);
    req.send(null);
    req.onload = function () {
        convert3IndexCSVtoArray(mapid, req.responseText);
    }
}

//0_4
function getMapCSV4(mapid) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maptiledb/maptile" + mapid + "_4.csv", true);
    req.send(null);
    req.onload = function () {
        convert4IndexCSVtoArray(mapid, req.responseText);
    }
}

//0_5
function getMapCSV5(mapid) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/maptiledb/maptile" + mapid + "_5.csv", true);
    req.send(null);
    req.onload = function () {
        convert5IndexCSVtoArray(mapid, req.responseText);
    }
}

var map_img_map = {};
var zindex_map = {};
var aindex_map = {};
var index_map3 = {};
var index_map4 = {};
var index_map5 = {};
var obj_format = {};
var monster_data = {};
var map_data = {};
var map_import = {};
var a1 = 0; //map_id
var is_canvas = false;

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(mapid, str, map_img) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    monster_data = {};
    map_data = {};
    map_img_map = {};

    var result = [];
    var tmp = str.split("\n");
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

    var result = [];
    // var map_tmp = map_str.split("\n");
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
    var map_tmp = map_img.split("\n");
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        map_img_map[i] = result[i];
    }
    console.log(map_img_map);

    if (is_canvas) {
        setCanvasImage();
    } else {
        createTile();
    }
}

function convertZIndexCSVtoArray(mapid, map_zindex) {
    // 初期化
    zindex_map = {};

    var result = [];
    var map_tmp = map_zindex.split("\n");
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        zindex_map[i] = result[i];
    }
    console.log(zindex_map);

    setZIndexImage();
}

function convertAIndexCSVtoArray(mapid, map_zindex) {
    // 初期化
    aindex_map = {};

    var result = [];
    var map_tmp = map_zindex.split("\n");
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        aindex_map[i] = result[i];
    }
    console.log(aindex_map);

    setAIndexImage();
}

function convert3IndexCSVtoArray(mapid, map_zindex) {
    // 初期化
    index_map3 = {};

    var result = [];
    var map_tmp = map_zindex.split("\n");
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        index_map3[i] = result[i];
    }
    console.log(index_map3);

    set3IndexImage();
}

function convert4IndexCSVtoArray(mapid, map_zindex) {
    // 初期化
    index_map4 = {};

    var result = [];
    var map_tmp = map_zindex.split("\n");
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        index_map4[i] = result[i];
    }
    console.log(index_map4);

    set4IndexImage();
}
function convert5IndexCSVtoArray(mapid, map_zindex) {
    // 初期化
    index_map5 = {};

    var result = [];
    var map_tmp = map_zindex.split("\n");
    for (var i = 0; i < map_tmp.length; ++i) {
        result[i] = map_tmp[i].split(',');
        index_map5[i] = result[i];
    }
    console.log(index_map5);

    set5IndexImage();
}

var DROP_TEXT_CONST = "<b><ドロップアイテム></b><br>";
var SKILL_TEXT_CONST = "<b><使用スキル></b><br>";

function calc1() {
    is_canvas = false;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getCSV(mapid);
}

function calc2() {
    is_canvas = true;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getCSV(mapid);
}

function calc3() {
    is_canvas = true;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getMapCSV2(mapid);
}

function calc4() {
    is_canvas = true;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getMapCSV1(mapid);
}

function calc5() {
    is_canvas = true;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getMapCSV3(mapid);
}

function calc6() {
    is_canvas = true;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getMapCSV4(mapid);
}

function calc7() {
    is_canvas = true;
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
    getMapCSV5(mapid);
}

var tmp_divx = -1;
var tmp_divy = -1;
var mob_inid_map = {}

map_type_map = {
    0: "Brunenstig",
    1: "Arian",
    2: "Grassland",
    3: "Augusta",
    4: "Bigaple",
    5: "Bridgehead",
    6: "Cave",
    7: "Desert",
    8: "Dungeon",
    9: "FarmHouse",
    11: "guildhall",
    12: "Gypsy",
    13: "Heaven",
    14: "Hell",
    15: "Mine",
    16: "Mountains",
    17: "MountainsVillage",
    18: "Room",
    19: "RuinedCity",
    20: "Savana",
    21: "Tower",
    22: "Yatikanu",
}

function createTile() {

    var map_type = $('select[name="b1"]').val() ? Number($('select[name="b1"]').val()) : 0;

    // FIXME 画像サイズもっと大きく…1500ぐらい？
    var min_width = 300;
    var $div_main = $('<div>');

    var html_append = "<br>";
    for (var i in map_img_map) {
        var data = map_img_map[i];
        for (var j = 0; j < data.length; j++) {
            if (j > 999) {
                break;
            }
            var num = ('0000' + data[j]).slice(-4);
            // html_append += '<img width="8px" height="4px" src="https://sokomin.github.io/sokomin_repository/db/mapset/Grassland/tile/tile_'+ num +'.png">'
            html_append += ('<img src="https://sokomin.github.io/sokomin_repository/db/mapset/' + map_type_map[map_type] + '/tile/tile_' + num + '.png">')
            if (i == 0) {
                min_width += 5;
            }
        }
        html_append += '<br>'
    }
    $('.main-background-map').css({ 'min-height': "200%", 'min-width': ("" + min_width + "%") });
    $div_main.append(html_append);
    $("#preview_html").empty().append($div_main);

}

// FIXME　これ使って1枚絵にする
// var createImage= function(context){
//     var image= new Image
//     image.src= context.canvas.toDataURL()
//     return image
//   }

//   var context1= document.createElement('canvas').getContext('2d')
//   context1.fillText('foo',0,10)

//   var context2= document.createElement('canvas').getContext('2d')
//   context2.fillText('bar',0,20)

//   var context3= document.createElement('canvas').getContext('2d')
//   context3.fillText('baz',0,30)

//   var context4= document.createElement('canvas').getContext('2d')
//   context4.drawImage(createImage(context1),0,0)
//   context4.drawImage(createImage(context2),0,0)
//   context4.drawImage(createImage(context3),0,0)

//   document.body.appendChild(createImage(context4))

// ref: https://note.affi-sapo-sv.com/js-globalcompositeoperation.php
window.addEventListener('DOMContentLoaded', () => {

    const dcv = document.getElementById('cvdemo');
    const context = dcv.getContext('2d');

    // 選択リスト　オプション内容作成
    const lists = ((selLists, selValue) => selLists.map(
        e => {
            const list = document.getElementById(e);
            const fragment = document.createDocumentFragment();

            selValue.forEach(e => {
                const opt = document.createElement("option");
                opt.value = e;
                opt.innerHTML = e;
                fragment.appendChild(opt);
            });

            list.appendChild(fragment);
            list.value = selValue[0];
            list.disabled = true;
            return list;

        }))(["cvsel1", "cvsel2"], [
            "source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop",
            "destination-in", "destination-out", "lighter", "copy", "xor", "normal", "multiply", "screen",
            "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light",
            "difference", "hue", "saturation", "color", "luminosity"
        ]);

    // 描画処理
    const setImage = () => {
        lists.forEach(e => e.disabled = false);
        context.clearRect(0, 0, 400, 248);
        context.save();
        context.drawImage(image[0], 0, 0);
        context.globalCompositeOperation = lists[0].value;
        context.drawImage(image[1], 0, 0);
        context.globalCompositeOperation = lists[1].value;
        context.font = "40px sans-serif";
        context.fillStyle = "orange";
        context.fillText("sample", 10, 200);
        context.restore();
    };

    // イメージオブジェクト作成　＆　画像読み込み待ち
    const image = ((imagePath) => {
        const im = imagePath.map(e => new Image());
        im.forEach(e => e.onload = () => im.every(e => e.complete) ? setImage() : null);
        im.forEach((e, i) => e.src = imagePath[i]);
        return im;
    })(['https://sokomin.github.io/map/design/[001]G07.rmd.png', 'https://sokomin.github.io/sokomin_repository/db/map_img/[001]G07.img.png']);

    // リスト選択イベント登録
    lists.forEach(e => e.addEventListener("change", () => setImage()));

});

function setCanvasImage() {
    var map_type = $('select[name="b1"]').val() ? Number($('select[name="b1"]').val()) : 0;

    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    var min_width = 300;
    var max_length = 0;
    var max_height = 0;
    var image_path_array = []
    for (let i in map_img_map) {
        var data = map_img_map[i];
        // image_path_array[i] = [];
        max_length = max_length < data.length ? data.length : max_length;
        for (let j = 0; j < data.length; j++) {
            if (data.length != max_length) {
                break;
            }
            let image1 = new Image();
            let num = ('0000' + data[j]).slice(-4);
            let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/' + map_type_map[map_type] + '/tile/tile_' + num + '.png';
            image_path_array.push(txt);
            image1.src = txt;
            image1.addEventListener('load', function() {
                context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
            }, false);

            if (i == 0) {
                min_width += (img_width/15);
            }
        }
        max_height++;
    }
    $('.main-background-map').css({ 'min-height': "200%", 'min-width': ("" + min_width + "%") });
    $('#cvpreview').attr({ 'width': img_width * max_length, 'height': img_height * max_height});

    // context.clearRect(0, 0, 1920, 1080);

    // for (var i = 0; i < image_path_array.length; i++) {
    //     var image1 = new Image();
    //     image1.src = image_path_array[i];
    //     var j = i % max_length;
    //     var k = parseInt(i / max_length);
    //     image1.addEventListener('load', function() {
    //         context.drawImage(image1, 0, 0, 150, 100);
    //     }, false);
    
    // }

    // // 描画処理
    // var setImage = (i) => {
    //     // lists.forEach(e => e.disabled = false);
    //     context.clearRect(0, 0, 1920, 1080);
    //     context.save();
    //     var j = i % max_length;
    //     var k = parseInt(i / max_length);
    //     // for (var key in map_img_map) {
    //     //     var data = map_img_map[key];
    //     //     for (var l = 0; l < data.length; l++) {
    //             context.drawImage(image[i], k*64, j*32);
    //     //     }
    //     // }
    //     context.restore();
    //     // saveCanvas("cvpreview");
    // };

    
    // // イメージオブジェクト作成　＆　画像読み込み待ち
    // var image = ((imagePath) => {
    //     // for (var k = 0; k < imagePaths.length; k++) {
    //     //     var imagePath = imagePaths[k];
    //         const im = imagePath.map(e => new Image());
    //         im.forEach((e, i) => e.onload = () => im.every(e => e.complete) ? setImage(i) : null);
    //         im.forEach((e, i) => e.src = imagePath[i]);
    //         return im;
    //     // }
    // })(image_path_array);

}

// aが1以上の部分をフィルタ
function setAIndexImage() {
    var map_type = $('select[name="b1"]').val() ? Number($('select[name="b1"]').val()) : 0;

    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    var min_width = 300;
    var max_length = 0;
    var max_height = 0;
    for (let i in map_img_map) {
        var data = map_img_map[i];
        var adata = aindex_map[i];
        max_length = max_length < data.length ? data.length : max_length;
        for (let j = 0; j < data.length; j++) {
            if (data.length != max_length) {
                break;
            }
            if (adata[j] >= 1) {
                let image1 = new Image();
                // let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/Dungeon/tile/tile_0391.png';
                let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/Hell/tile/tile_0022.png';
                image1.src = txt;
                image1.addEventListener('load', function() {
                    context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
                }, false);
            } else {
                let image1 = new Image();
                let num = ('0000' + data[j]).slice(-4);
                let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/' + map_type_map[map_type] + '/tile/tile_' + num + '.png';
                image1.src = txt;
                image1.addEventListener('load', function() {
                    context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
                }, false);
            }
            if (i == 0) {
                min_width += (img_width/15);
            }
        }
        max_height++;
    }
    $('.main-background-map').css({ 'min-height': "200%", 'min-width': ("" + min_width + "%") });
    $('#cvpreview').attr({ 'width': img_width * max_length, 'height': img_height * max_height});

}

// z軸が1以上の部分でフィルタ
function setZIndexImage() {
    var map_type = $('select[name="b1"]').val() ? Number($('select[name="b1"]').val()) : 0;

    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    var min_width = 300;
    var max_length = 0;
    var max_height = 0;
    for (let i in map_img_map) {
        var data = map_img_map[i];
        var zdata = zindex_map[i];
        max_length = max_length < data.length ? data.length : max_length;
        for (let j = 0; j < data.length; j++) {
            if (data.length != max_length) {
                break;
            }
            if (zdata[j] < 1) {
                let image1 = new Image();
                let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/Dungeon/tile/tile_0391.png';
                // let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/Yatikanu/tile/tile_0415.png';
                image1.src = txt;
                image1.addEventListener('load', function() {
                    context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
                }, false);
            } else {
                let image1 = new Image();
                let num = ('0000' + data[j]).slice(-4);
                let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/' + map_type_map[map_type] + '/tile/tile_' + num + '.png';
                image1.src = txt;
                image1.addEventListener('load', function() {
                    context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
                }, false);
            }
            if (i == 0) {
                min_width += (img_width/15);
            }
        }
        max_height++;
    }
    $('.main-background-map').css({ 'min-height': "200%", 'min-width': ("" + min_width + "%") });
    $('#cvpreview').attr({ 'width': img_width * max_length, 'height': img_height * max_height});

}

// 3が1以上の部分では文字も打ち込む
function set3IndexImage() {
    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    var max_length = 0;
    for (let i in map_img_map) {
        var data = map_img_map[i];
        var data3 = index_map3[i];
        max_length = max_length < data.length ? data.length : max_length;
        for (let j = 0; j < data.length; j++) {
            if (data.length != max_length) {
                break;
            }
            if (data3[j] >= 1) {
                context.font = text_font_size;
                context.fillStyle = "orange";
                context.fillText(data3[j], (j*img_width+2), i* img_height);
            }
        }
    }
}

// 4が1以上の部分では文字も打ち込む
function set4IndexImage() {
    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    var max_length = 0;
    for (let i in map_img_map) {
        var data = map_img_map[i];
        var data4 = index_map4[i];
        max_length = max_length < data.length ? data.length : max_length;
        for (let j = 0; j < data.length; j++) {
            if (data.length != max_length) {
                break;
            }
            if (data4[j] >= 1) {
                context.font = text_font_size;
                context.fillStyle = "blue";
                context.fillText(data4[j], (j*img_width+2), i* img_height+1);
                // let image1 = new Image();
                // let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/Dungeon/tile/tile_0391.png';
                // image1.src = txt;
                // image1.addEventListener('load', function() {
                //     context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
                // }, false);
            }
        }
    }
}

// 5が1以上の部分では文字も打ち込む
function set5IndexImage() {
    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    var max_length = 0;
    for (let i in map_img_map) {
        var data = map_img_map[i];
        var data5 = index_map5[i];
        max_length = max_length < data.length ? data.length : max_length;
        for (let j = 0; j < data.length; j++) {
            if (data.length != max_length) {
                break;
            }
            if (data5[j] >= 1) {
                context.font = text_font_size;
                context.fillStyle = "red";
                context.fillText(data5[j], (j*img_width+4), i* img_height+2);
                // let image1 = new Image();
                // let txt = 'https://sokomin.github.io/sokomin_repository/db/mapset/Dungeon/tile/tile_0391.png';
                // image1.src = txt;
                // image1.addEventListener('load', function() {
                //     context.drawImage(image1, j*img_width, i* img_height, img_width, img_height);
                // }, false);
            }
        }
    }
}

function calcPos() {
    var xpos = $('input[name="x1"]').val() ? Number($('input[name="x1"]').val()) : 0;
    var ypos = $('input[name="y1"]').val() ? Number($('input[name="y1"]').val()) : 0;

    const dcv = document.getElementById('cvpreview');
    const context = dcv.getContext('2d');

    let image1 = new Image();
    let txt = 'https://sokomin.github.io/sokomin_repository/db/interface/interface_0278.png';
    image1.src = txt;
    image1.addEventListener('load', function() {
        context.drawImage(image1, xpos*img_width, ypos* img_height, img_width, img_height);
    }, false);
    context.font = text_font_size;
    context.fillStyle = "black";
    var text = "(" + xpos + ","+ ypos + ")"
    context.fillText(text,  xpos*img_width, ypos* img_height);

}

function saveCanvas(canvas_id)
{
    var mapid = $('input[name="a2"]').val() ? $('input[name="a2"]').val() : 0;
	var canvas = document.getElementById(canvas_id);
	//アンカータグを作成
	var a = document.createElement('a');
	//canvasをJPEG変換し、そのBase64文字列をhrefへセット
	a.href = canvas.toDataURL('image/jpeg', 0.85);
	//ダウンロード時のファイル名を指定
	a.download = 'maptile_'+ mapid +'.jpg';
	//クリックイベントを発生させる
	a.click();
}