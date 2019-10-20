KS = 1.0;
// mapid = 0;
ChkYlw = 999;
BChkYlw = 999;
LnkA = [];
MapX = 0;
MapY = 0;
ObjY = [];
ObjX = [];
ObjT = [];
ObjN = [];
LnkY = [];
LnkX = [];
LnkS = [];
LnkP = [];
//map_image = "";

Name = "";
NameImg = "";
NameNpc = ["NPC"];
NameMob = ["モンスター"];

mapid = getParam('map_id') ? parseInt(getParam('map_id')) : 0;

Jump(mapid);



function Up() {
    KS = KS + 0.2;
    Ad();
}

// 引数で既にmapのid入ってる
function Jump(num) {
    //名前入れ替えの術
    datalist(num);
    // 画像入れ替え
    // 配列総入れ替え
    // ぜーんぶ再描画
    mapid = parseInt(num);
    ChkYlw = 999;
    BChkYlw = 999;
    KS = 1.0;
    Ad();
    return false;
}

function Dn() {
    KS = KS - 0.2;
    Ad();
}

function Yl(num) {
    BChkYlw = ChkYlw;
    ChkYlw = num;
    if (BChkYlw == ChkYlw) ChkYlw = 999;
    Ad()
    return false;
}

function Ad() {
    var map_image = document.getElementById('map_image');
    if (map_image) {
        map_image.width = (MapX * 2) * KS;
        map_image.height = (MapY) * KS;
    }
    $("#map_blank").css({
        "height": (MapY) * KS,
    });
    if (!document.getElementsByTagName) { return; }
    var objs = document.getElementsByTagName("div");
    j = 0;
    k = 0;
    for (i = 0; i < objs.length; i++) {
        if (objs[i].className.substr(0, 3) == "Obj") {
            $(objs[i + 0]).css({
                "top": (ObjY[j]) * KS,
                "left": (ObjX[j]) * KS + 20
            })
            $(objs[i + 1]).css({
                "top": (ObjY[j]) * KS - 1,
                "left": (ObjX[j]) * KS + 20 - 1
            })
            i = i + 1;
            j = j + 1;
            // クリックしたオブジェクトに色づけするんやで
            if (BChkYlw != 999) {
                if (objs[i - 1].className.substr(7) == "a" + BChkYlw) {
                    $(objs[i - 0]).css({
                        "color": "#ff0000",
                        "backgroundColor": ""
                    })
                }
            }
            if (ChkYlw != 999) {
                if (objs[i - 1].className.substr(7) == "a" + ChkYlw) {
                    $(objs[i - 0]).css({
                        "color": "#ffff00",
                        "backgroundColor": "#000000"
                    })
                }
            }
        }
        if (objs[i].className.substr(0, 3) == "Lnk") {
            $(objs[i + 0]).css({
                "top": (LnkY[k]) * KS,
                "left": (LnkX[k]) * KS + 20
            })
            $(objs[i + 1]).css({
                "top": (LnkY[k]) * KS - 1,
                "left": (LnkX[k]) * KS + 20 - 1
            })
            i = i + 1;
            k = k + 1;
        }
    }
}


/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
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
