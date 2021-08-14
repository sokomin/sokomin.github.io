//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
    var req = new XMLHttpRequest();// HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "https://sokomin.github.io/update/js/monster.csv", true);//アクセスするファイルを指定
    req.send(null);// HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function () {
        convertCSVtoArray(req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

var obj_format = {};
var monster_data = {};

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(str) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    monster_data = {};

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
    // console.log(monster_data);

    // モンスターデータ解析
    createMobTable();
}

var DROP_TEXT_CONST = "<b><ドロップアイテム></b><br>";
var SKILL_TEXT_CONST = "<b><使用スキル></b><br>";

function calc1() {
    // モンスターデータ読み込み(同期の関係上、これ以外呼ばない)
    getCSV();
}

function createMobTable() {
    var MOBSPEC = getParam('spec') ? parseInt(getParam('spec')) : 0;
    var MOBRANK = getParam('rank') ? parseInt(getParam('rank')) : 0;
    var MOBID = getParam('mi') ? parseInt(getParam('mi')) : -1; //mobid直リンク専用
    var DEF_LV = getParam('dlv') ? parseInt(getParam('dlv')) : "600"; //デフォルトレベル
    var DEBUG = getParam('debug') ? parseInt(getParam('debug')) : 0;
    var $div_main = $('<div>');
    var title_text = "<h4>" + mobSpec[MOBSPEC] + " " + mobRank[MOBRANK] + " の一覧" + "</h4>";
    if (MOBID < 0) {
        $div_main.append(title_text);
    }
    var cnt = 0; //セーフティをはっておく
    for (var i in monster_data) {
        if (cnt >= 300) {
            console.log("３００件以上はhtml重くて出せないよ");
            break;
        }
        var data = monster_data[i];
        var drop_txt = createDropItem(i);
        var skill_txt = createSkillName(i);
        if (MOBID >= 0) {
            if (Number(MOBID) != Number(i)) {
                continue;
            }
        } else if (validateData(data, MOBSPEC, MOBRANK, DEBUG, drop_txt, skill_txt)) {
            continue;
        }
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

        var id = "tmain" + i;
        var $table = $('<table>').attr("id", "table10")
            .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 550)));
        var $tr_Name = $('<tr>');
        // モンスター名
        $tr_Name.append($('<th>').attr("id", (id + "name")).addClass("title").text(data["name"])
            .attr("title", i).attr({ "rowspan": "2" }));


        // Lv入力欄
        $tr_Name.append($('<td>').attr({
            "id": (id + "lv"),
            "title": "Lvを入力"
        }).attr({ "colspan": "2", }).text('モンスターのLv: ').append($('<input>').attr({
            id: id + "flv",
            name: i,
            type: "text",
            value: DEF_LV,
        }).addClass("inputlvform").css("width", "100px").bind("keyup", function () {
            var has = $(this).attr("id");
            has = has.substr(0, (has.length - 3));
            statusUpdate(has, $(this).attr("name"));
        })));

        // 種族・等級
        var $tr_Type = $('<tr>');
        $tr_Type.append($('<td>').attr("id", (id + "type")).text(mobSpec[data["Species"]]));
        $tr_Type.append($('<td>').attr("id", (id + "fty")).text(mobRank[data["Lineage"]]));

        /**
         * 列2
         */
        // 基本ステータス
        var $statusTable = $('<table>').attr("id", "table10");
        var $tr_row3 = $('<tr>');
        $tr_row3.append($('<th>').text("HP").attr({ "colspan": "2", }));
        $tr_row3.append($('<th>').text("攻撃力").attr({ "colspan": "2", }));
        $tr_row3.append($('<th>').text("防御力"));
        var $tr_row3_1 = $('<tr>');
        $tr_row3_1.append($('<td>').attr("id", ("tmain" + i + "fab1_" + 0)).attr({ "colspan": "2", }));
        $tr_row3_1.append($('<td>').attr("id", ("tmain" + i + "fab1_" + 1)).attr({ "colspan": "2", }));
        $tr_row3_1.append($('<td>').attr("id", ("tmain" + i + "fab1_" + 2)));

        var $tr_row4 = $('<tr>');
        $tr_row4.append($('<th>').text("攻撃速度"));
        $tr_row4.append($('<th>').text("移動速度"));
        $tr_row4.append($('<th>').text("ブロック率"));
        $tr_row4.append($('<th>').text("視野"));
        $tr_row4.append($('<th>').text("基礎経験値"));
        var $tr_row4_1 = $('<tr>');
        $tr_row4_1.append($('<td>').attr("id", ("tmain" + i + "fab2_" + 0)));
        $tr_row4_1.append($('<td>').attr("id", ("tmain" + i + "fab2_" + 1)));
        $tr_row4_1.append($('<td>').attr("id", ("tmain" + i + "fab2_" + 2)));
        $tr_row4_1.append($('<td>').attr("id", ("tmain" + i + "fab2_" + 3)));
        $tr_row4_1.append($('<td>').attr("id", ("tmain" + i + "fab2_" + 4)));
        $statusTable.append($tr_row3).append($tr_row3_1).append($tr_row4).append($tr_row4_1);

        var $reg0Table = $('<table>').attr("id", "table10");
        // 魔法抵抗
        var $tr_reg1 = $('<tr>');
        $tr_reg1.append($('<th>').text("火"));
        $tr_reg1.append($('<th>').text("水"));
        $tr_reg1.append($('<th>').text("風"));
        $tr_reg1.append($('<th>').text("地"));
        $tr_reg1.append($('<th>').text("光"));
        $tr_reg1.append($('<th>').text("闇"));
        var $tr_reg1_1 = $('<tr>');
        $tr_reg1_1.append($('<td>').attr("id", ("tmain" + i + "fel" + 0)));
        $tr_reg1_1.append($('<td>').attr("id", ("tmain" + i + "fel" + 1)));
        $tr_reg1_1.append($('<td>').attr("id", ("tmain" + i + "fel" + 2)));
        $tr_reg1_1.append($('<td>').attr("id", ("tmain" + i + "fel" + 3)));
        $tr_reg1_1.append($('<td>').attr("id", ("tmain" + i + "fel" + 4)));
        $tr_reg1_1.append($('<td>').attr("id", ("tmain" + i + "fel" + 5)));
        $reg0Table.append($tr_reg1).append($tr_reg1_1);

        var $state0Table = $('<table>').attr("id", "table10");
        // ステータス
        var $tr_sta0 = $('<tr>');
        $tr_sta0.append($('<th>').text("力"));
        $tr_sta0.append($('<th>').text("敏捷"));
        $tr_sta0.append($('<th>').text("健康"));
        $tr_sta0.append($('<th>').text("知識"));
        $tr_sta0.append($('<th>').text("知恵"));
        $tr_sta0.append($('<th>').text("威厳"));
        $tr_sta0.append($('<th>').text("運"));
        var $tr_sta0_1 = $('<tr>');
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 0)));
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 1)));
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 2)));
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 3)));
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 4)));
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 5)));
        $tr_sta0_1.append($('<td>').attr("id", ("tmain" + i + "fst" + 6)));

        //状態異常抵抗
        // ステータス
        var $tr_reg2 = $('<tr>');
        $tr_reg2.append($('<th>').text("暗闇"));
        $tr_reg2.append($('<th>').text("毒"));
        $tr_reg2.append($('<th>').text("睡眠"));
        $tr_reg2.append($('<th>').text("コールド"));
        $tr_reg2.append($('<th>').text("フリーズ"));
        $tr_reg2.append($('<th>').text("スタン"));
        $tr_reg2.append($('<th>').text("石化"));
        var $tr_reg2_1 = $('<tr>');
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 0)));
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 1)));
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 2)));
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 3)));
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 4)));
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 5)));
        $tr_reg2_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 6)));

        var $tr_reg3 = $('<tr>');
        $tr_reg3.append($('<th>').text("混乱"));
        $tr_reg3.append($('<th>').text("魅了"));
        $tr_reg3.append($('<th>').text("異常"));
        $tr_reg3.append($('<th>').text("低下"));
        $tr_reg3.append($('<th>').text("呪い"));
        $tr_reg3.append($('<th>').text("致命打"));
        $tr_reg3.append($('<th>').text("決定打"));
        var $tr_reg3_1 = $('<tr>');
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 7)));
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 8)));
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 9)));
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 10)));
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 11)));
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 12)));
        $tr_reg3_1.append($('<td>').attr("id", ("tmain" + i + "freg2_" + 13)));

        $state0Table.append($tr_sta0).append($tr_sta0_1).append($tr_reg2).append($tr_reg2_1).append($tr_reg3).append($tr_reg3_1);

        // 変動する能力は全部ここにくっつける
        var $tr_row2 = $('<tr>');
        $tr_row2.append($('<td>').attr("id", (id + "status")).append(($('<div>').css({
            "margin": "3px 0 0 5px",
            "text-align": "left",
            "vertical-align": "top"
        }).text('<基礎能力値>')).append($statusTable).append("<br>").append($reg0Table).append("<br>").append($state0Table)
        ));

        // 画像
        var mImage = Number(data["EffectId"]).toString(16);
        mImage = ('0' + mImage).slice(-3)
        mImage = "https://sokomin.github.io/monster/design/image/monster/0" + mImage.toLowerCase() + "000" + data["EffectId_2"] + ".png";
        $tr_row2.append($('<th>').attr({
            "colspan": "2"
        }).css({
            "background-color": "#000000"
        }).append($('<div>').attr("id", (id + "image"))
            .append($("<img>").attr({ src: mImage, })))
        );

        // mobに関連する情報はここに
        var $tr_row3 = $('<tr>');
        // 出現マップ情報取得
        // TODO　(事前に計算・集計しておいて出力。)
        // 作りたいけど、どこに何のmobいるか把握しきれてないので見送っておきます。
        var $mapDiv = $('<div>');

        $tr_row3.append($('<td>').css({
            "margin": "3px 0 0 5px",
            "text-align": "left",
            "vertical-align": "top"
        }).attr("id", (id + "mapDiv"))
            .append(($('<div>').text('<出現マップ>')).append($mapDiv)
            ));

        //使用スキル
        $tr_row3.append($('<td>').attr({
            "id": (id + "skill"),
            "rowspan": "2"
        }).css({
            "padding": "3px 0 0 5px",
            "text-align": "left",
            "vertical-align": "top"
        }).append(skill_txt));

        //ドロップアイテム
        $tr_row3.append($('<td>').attr({
            "id": (id + "dtype"),
            "rowspan": "2"
        }).css({
            "padding": "3px 0 0 5px",
            "text-align": "left",
            "vertical-align": "top"
        }).append(drop_txt));

        $table.append($tr_Name);
        $table.append($tr_Type);
        $table.append($tr_row2);
        $table.append($tr_row3);
        $div_main.append($table);
        $div_main.append("<br><br>");
        cnt++;
    }
    $("#preview_html").empty().append($div_main);

    // 各パラメタの文字出力
    cnt = 0;
    for (var i in monster_data) {
        if (cnt >= 300) {
            break;
        }
        var data = monster_data[i];
        var drop_txt = createDropItem(i);
        var skill_txt = createSkillName(i);
        if (MOBID >= 0) {
            if (Number(MOBID) != Number(i)) {
                continue;
            }
        } else if (validateData(data, MOBSPEC, MOBRANK, DEBUG, drop_txt, skill_txt)) {
            continue;
        }
        statusUpdate("tmain" + i, i);
        cnt++;
    }

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


function validateData(data, spec, rank, debug, drop_txt, skill_txt) {
    if (Number(data["Species"]) != Number(spec)) {
        return true;
    }
    if (Number(data["Lineage"]) != Number(rank)) {
        return true;
    }
    // 最低限種族と等級は絞ってくれ
    if (Number(debug) == 9999) {
        return false;
    }
    if (drop_txt == DROP_TEXT_CONST && skill_txt == SKILL_TEXT_CONST) {
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

// Lv対応ステータス入力更新用
function statusUpdate(tableid, mobid) {
    var md = monster_data[mobid];

    var MobLv = $("#" + tableid + "flv").val();
    if (MobLv === "") { MobLv = 1; }
    else { MobLv = parseFloat(MobLv); }

    var Hp1 = parseFloat(md["DefaultHP"]) / 100.0; //基礎HP　	係数/100
    var Hp2 = parseFloat(md["LevelUpBonus"]) > 0 ? (parseFloat(md["LevelUpBonus"]) / 10.0) : (parseFloat(md["unknown_109"]) / 10.0);//上昇HP　	係数/10
    var Hp3 = parseFloat(md["ConditionBonus"]) > 0 ? (parseFloat(md["ConditionBonus"]) / 10.0) : (parseFloat(md["unknown_112"]) / 10.0);//健康補正 	係数/10

    var STRup = parseFloat(md["STR"]) * parseFloat(md["StatusFactor"]) / 100000.0;//力上昇  	力基礎/100000
    var AGIup = parseFloat(md["AGI"]) * parseFloat(md["StatusFactor"]) / 100000.0;//敏捷上昇  	力基礎/100000
    var CONup = parseFloat(md["CON"]) * parseFloat(md["StatusFactor"]) / 100000.0;//健康上昇  	力基礎/100000
    var INTup = parseFloat(md["INT"]) * parseFloat(md["StatusFactor"]) / 100000.0;//知識上昇  	力基礎/100000
    var WISup = parseFloat(md["WIS"]) * parseFloat(md["StatusFactor"]) / 100000.0;//知恵上昇  	力基礎/100000
    var CHSup = parseFloat(md["CHS"]) * parseFloat(md["StatusFactor"]) / 100000.0;//威厳上昇  	力基礎/100000
    var LUCup = parseFloat(md["LUC"]) * parseFloat(md["StatusFactor"]) / 100000.0;//運上昇  	力基礎/100000

    var AtcMinup = parseFloat(md["AtcMinValueBonus"]) / 100.0;//最小攻撃力上昇	最小攻撃上昇/100
    var AtcMaxup = parseFloat(md["AtcMaxValueBonus"]) / 100.0;//最大攻撃力上昇	最大攻撃上昇/100
    var Defup = parseFloat(md["DefenseValueBonus"]) / 100.0;//防御力上昇防御力上昇/100
    var AtcSpeed = parseFloat(md["AtcSpeed"]) / 100.0;//攻撃速度攻撃速度/100
    var MovSpeed = parseFloat(md["MovSpeed"]);//移動速度

    var MobSTR = Math.floor(((STRup * (MobLv - 1)) + parseFloat(md["STR"])));//力最終値
    var MobAGI = Math.floor(((AGIup * (MobLv - 1)) + parseFloat(md["AGI"])));//敏捷最終値
    var MobCON = Math.floor(((CONup * (MobLv - 1)) + parseFloat(md["CON"])));//健康最終値
    var MobINT = Math.floor(((INTup * (MobLv - 1)) + parseFloat(md["INT"])));//知識最終値
    var MobWIS = Math.floor(((WISup * (MobLv - 1)) + parseFloat(md["WIS"])));//知恵最終値
    var MobCHS = Math.floor(((CHSup * (MobLv - 1)) + parseFloat(md["CHS"])));//威厳最終値
    var MobLUC = Math.floor(((LUCup * (MobLv - 1)) + parseFloat(md["LUC"])));//運最終値

    var MobHP = Math.floor((Hp2 * MobLv + Hp1) + (Hp3 * MobCON));//HP最終値
    var MobAtcMin = Math.floor((((AtcMinup * (MobLv - 1.0) + parseFloat(md["AtcMinValue"]))) * (1.0 + MobSTR / 200.0)));//最小攻撃力最終値	
    var MobAtcMax = Math.floor((((AtcMaxup * (MobLv - 1.0) + parseFloat(md["AtcMaxValue"]))) * (1.0 + MobSTR / 200.0)));//最大攻撃力最終値
    var MobDef = Math.floor((((Defup * (MobLv - 1.0) + parseFloat(md["DefenseValue"]))) * (1.0 + MobCON / 100.0)));//防御力最終値

    var MobEl_Fire = Math.floor(parseFloat(md["FireResistance"]) + (MobWIS / 20.0));
    var MobEl_Water = Math.floor(parseFloat(md["WaterResistance"]) + (MobWIS / 20.0));
    var MobEl_Wind = Math.floor(parseFloat(md["WindResistance"]) + (MobWIS / 20.0));
    var MobEl_Earth = Math.floor(parseFloat(md["EarthResistance"]) + (MobWIS / 20.0));
    var MobEl_Light = Math.floor(parseFloat(md["LightResistance"]) + (MobWIS / 20.0));
    var MobEl_Dark = Math.floor(parseFloat(md["DarkResistance"]) + (MobWIS / 20.0));

    var MobReg_1 = Math.floor(parseFloat(md["Resistance1"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_2 = Math.floor(parseFloat(md["Resistance2"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_3 = Math.floor(parseFloat(md["Resistance3"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_4 = Math.floor(parseFloat(md["Resistance4"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_5 = Math.floor(parseFloat(md["Resistance5"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_6 = Math.floor(parseFloat(md["Resistance6"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_7 = Math.floor(parseFloat(md["Resistance7"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_8 = Math.floor(parseFloat(md["Resistance8"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));
    var MobReg_9 = Math.floor(parseFloat(md["Resistance9"]) + (parseFloat(md["Resistance10"]) * ((MobWIS + MobCHS) / 1000.0)));

    var MobReg_10 = Math.floor(parseFloat(md["Resistance10"]) * (1 + ((MobWIS + MobCHS) / 500.0)));//異常
    var MobReg_11 = Math.floor(parseFloat(md["Resistance11"]) * (1 + ((MobWIS + MobCHS) / 1000.0)));//低下
    var MobReg_12 = Math.floor(parseFloat(md["Resistance12"]) * (1 + ((MobWIS + MobCHS) / 1000.0)));//呪い

    var MobReg_13 = Math.floor(parseFloat(md["Resistance13"]) * (1 + ((MobWIS + MobCHS) / 1000.0)));//致命打
    var MobReg_14 = Math.floor(parseFloat(md["Resistance14"]) * (1 + ((MobWIS + MobCHS) / 1000.0)));//決定打

    var ActivRange = parseInt(md["ActiveRange"]);//視野射程
    var Blocking = parseInt(md["Blocking"]);//ブロック率
    var MobExp = Math.floor((parseFloat(md["DefaultExp"]) / 10) * (MobLv + 4));//基礎経験値

    //表示書き換え
    $("#" + tableid + "fab1_0").text(MobHP);
    $("#" + tableid + "fab1_1").text(MobAtcMin + "~" + MobAtcMax);
    $("#" + tableid + "fab1_2").text(MobDef);

    $("#" + tableid + "fab2_0").text(AtcSpeed);
    $("#" + tableid + "fab2_1").text(MovSpeed);
    $("#" + tableid + "fab2_2").text(Blocking);
    $("#" + tableid + "fab2_3").text(ActivRange);
    $("#" + tableid + "fab2_4").text(MobExp);

    $("#" + tableid + "fst0").text(MobSTR);
    $("#" + tableid + "fst1").text(MobAGI);
    $("#" + tableid + "fst2").text(MobCON);
    $("#" + tableid + "fst3").text(MobINT);
    $("#" + tableid + "fst4").text(MobWIS);
    $("#" + tableid + "fst5").text(MobCHS);
    $("#" + tableid + "fst6").text(MobLUC);

    $("#" + tableid + "fel0").text(MobEl_Fire);
    $("#" + tableid + "fel1").text(MobEl_Water);
    $("#" + tableid + "fel2").text(MobEl_Wind);
    $("#" + tableid + "fel3").text(MobEl_Earth);
    $("#" + tableid + "fel4").text(MobEl_Light);
    $("#" + tableid + "fel5").text(MobEl_Dark);

    $("#" + tableid + "freg1_0").text(parseInt(md["Resistance1"]));
    $("#" + tableid + "freg1_1").text(parseInt(md["Resistance2"]));
    $("#" + tableid + "freg1_2").text(parseInt(md["Resistance3"]));
    $("#" + tableid + "freg1_3").text(parseInt(md["Resistance4"]));
    $("#" + tableid + "freg1_4").text(parseInt(md["Resistance5"]));
    $("#" + tableid + "freg1_5").text(parseInt(md["Resistance6"]));
    $("#" + tableid + "freg1_6").text(parseInt(md["Resistance7"]));
    $("#" + tableid + "freg1_7").text(parseInt(md["Resistance8"]));
    $("#" + tableid + "freg1_8").text(parseInt(md["Resistance9"]));
    $("#" + tableid + "freg1_9").text(parseInt(md["Resistance10"]));
    $("#" + tableid + "freg1_10").text(parseInt(md["Resistance11"]));
    $("#" + tableid + "freg1_11").text(parseInt(md["Resistance12"]));
    $("#" + tableid + "freg1_12").text(parseInt(md["Resistance13"]));
    $("#" + tableid + "freg1_13").text(parseInt(md["Resistance14"]));

    $("#" + tableid + "freg2_0").text(MobReg_1);
    $("#" + tableid + "freg2_1").text(MobReg_2);
    $("#" + tableid + "freg2_2").text(MobReg_3);
    $("#" + tableid + "freg2_3").text(MobReg_4);
    $("#" + tableid + "freg2_4").text(MobReg_5);
    $("#" + tableid + "freg2_5").text(MobReg_6);
    $("#" + tableid + "freg2_6").text(MobReg_7);
    $("#" + tableid + "freg2_7").text(MobReg_8);
    $("#" + tableid + "freg2_8").text(MobReg_9);
    $("#" + tableid + "freg2_9").text(MobReg_10);
    $("#" + tableid + "freg2_10").text(MobReg_11);
    $("#" + tableid + "freg2_11").text(MobReg_12);
    $("#" + tableid + "freg2_12").text(MobReg_13);
    $("#" + tableid + "freg2_13").text(MobReg_14);

}


// スキル表入れる
function createSkillName(mobid) {
    var txt = SKILL_TEXT_CONST;
    var md = monster_data[mobid];
    // 0は垂直斬りだけど、多分使うmobいないからわざと弾いてる
    // これ以上スキル使うmobはいないと信じてる
    if (Number(md["unknown_69"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_69"]];
        txt += "<br>"
    }
    if (Number(md["unknown_71"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_71"]];
        txt += "<br>"
    }
    if (Number(md["unknown_73"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_73"]];
        txt += "<br>"
    }
    if (Number(md["unknown_75"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_75"]];
        txt += "<br>"
    }
    if (Number(md["unknown_77"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_77"]];
        txt += "<br>"
    }
    if (Number(md["unknown_79"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_79"]];
        txt += "<br>"
    }
    if (Number(md["unknown_81"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_81"]];
        txt += "<br>"
    }
    if (Number(md["unknown_83"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_83"]];
        txt += "<br>"
    }
    if (Number(md["unknown_85"]) > 0) {
        txt += "- "
        txt += skillName[md["unknown_85"]];
        txt += "<br>"
    }
    if (Number(md["unknown_87"]) > 0) {
        txt += skillName[md["unknown_87"]];
        txt += "<br>"
    }
    return txt;
}

// どろっぷあいてむテキスト（何もドロップしないmobは弾いておく・・・）
function createDropItem(mobid) {
    var txt = DROP_TEXT_CONST;
    var md = monster_data[mobid];
    // 0は垂直斬りだけど、多分使うmobいないからわざと弾いてる
    // これ以上スキル使うmobはいないと信じてる
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
