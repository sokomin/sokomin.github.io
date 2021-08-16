
var open0 = true;
var open1 = false;
var open2 = false;
var open3 = false;
var open4 = true;


// 
function calcDebug() {
    var area_text = "";
    var area_infos = AreaData[mapid];
    // var height = IMG_SYS_SIZE[mapid] ? IMG_SYS_SIZE[mapid].h : IMG_SIZE[mapid].h;
    var height = IMG_SIZE[mapid].h;
    var map_area_info = document.getElementById('map-area');
    // エリア情報描画
    for (var i = 0; i < area_infos.length; i++) {
        var area_info = area_infos[i];
        var atype = area_info.type;
        var aname = area_info.name;
        var ais = area_info.is_secret;
        var aposx = area_info.posx;
        var aposy = area_info.posy;
        var aposx2 = area_info.posx2;
        var aposy2 = area_info.posy2;
        var raposx = aposx * 200 / height;
        var raposy = aposy * 200 / height;
        var rawidth = (aposx2 * 200 / height) - raposx;
        var raheight = (aposy2 * 200 / height) - raposy;
        // FIXME open4やopen0辺りがバグってる
        if (atype == 4 && open4) {
            area_text += '<div class="AreaObj area_type04" style=\"top:' + raposy + "px; left:" + raposx + "px; width:" + rawidth + "px; height:" + raheight + "px;\" title=\"" + (aname) + "\"></div>\n";
        } else if (atype == 0 && open0) {
            area_text += '<div class="AreaObj area_type00" style=\"top:' + raposy + "px; left:" + raposx + "px; width:" + (rawidth) + "px; height:" + (raheight) + "px;\" title=\"" + (aname) + "\"></div>\n";

        }
    }
    map_area_info.innerHTML = area_text;
}


function AreaDebug(mode) {
    var arate = KS + mode;
    var map_image = document.getElementById('map_image');
    if (map_image) {
        map_image.width = MapX * KS;
        map_image.height = MapY * KS;
    } else {
        //初期描画の時だけこっち通るよ(高さをどーしても計算したいので)
    }
    // var blank = map_image && map_image.height > 0 ? map_image.height : 200;
    if (!document.getElementsByTagName) { return; }
    var objs = document.getElementsByTagName("div");

    var area_infos = AreaData[mapid];
    // var height = IMG_SYS_SIZE[mapid] ? IMG_SYS_SIZE[mapid].h : IMG_SIZE[mapid].h;
    var height = IMG_SIZE[mapid].h;
    var j = 0;
    var k = 0;
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].className.substr(0, 7) == "AreaObj") {

            // for (var l = k; l < area_infos.length; l++) {
                var area_info = area_infos[k];
                var atype = area_info.type;
                var aposx = area_info.posx;
                var aposy = area_info.posy;
                var aposx2 = area_info.posx2;
                var aposy2 = area_info.posy2;
                var raposx = (aposx * 200 / height);
                var raposy = (aposy * 200 / height);
                var rawidth = (aposx2 * 200 / height - raposx)  * arate;
                var raheight = (aposy2 * 200 / height - raposy) * arate;
                if (atype == 4 && open4) {
                    $(objs[i]).css({
                        "top": raposy * arate,
                        "left": (raposx) * arate,
                        "width": rawidth,
                        "height": raheight,
                    })
                    j = j + 1;
                } else if (atype == 0 && open0) {
                    $(objs[i]).css({
                        "top": raposy * arate,
                        "left": (raposx) * arate,
                        "width": rawidth,
                        "height": raheight,
                    })
                    j = j + 1;
                }
                k++;
            // }

        }
    }
}