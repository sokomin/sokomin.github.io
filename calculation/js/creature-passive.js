
var obj_format = {};
var creature_data = {};
var passive_data = {};
var skillData = [
{ name: "メイン1", id: 9996, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
{ name: "サブ１", id: 9997, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
{ name: "サブ２", id: 9998, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
{ name: "サブ３", id: 9999, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },]
;
var skillIdMap = [];

function translateTubo(num) {
    if (crnt_num === 10000) {
        console.log("これ以上登録できません。");
        return num;
    }
    if (crnt_num >= 9996 && crnt_num <= 9999) {
        // formの中で入力してonclickしてDOM書き換えるとバグってリロードされちゃうから無理矢理回避してます。
        var d1dom = document.getElementById("sub_d1");
        var d2dom = document.getElementById("sub_d2");
        var d3dom = document.getElementById("sub_d3");
        var e1dom = document.getElementById("sub_e1");
        var e2dom = document.getElementById("sub_e2");
        var e3dom = document.getElementById("sub_e3");
        var d1 = d1dom.value ? d1dom.value : "";
        var d2 = d2dom.value ? d2dom.value : "";
        var d3 = d3dom.value ? d3dom.value : "";
        var e1 = e1dom.value ? parseInt(e1dom.value) : 0;
        var e2 = e2dom.value ? parseInt(e2dom.value) : 0;
        var e3 = e3dom.value ? parseInt(e3dom.value) : 0;

        skillData.forEach(function (e, index) {
            if (e.id === crnt_num) {
                var name = "";
                if (crnt_num === 9996) {
                    name = "自作メインクリーチャー"
                } else if (crnt_num === 9997) {
                    name = "自作サブクリーチャー１"
                } else if (crnt_num === 9998) {
                    name = "自作サブクリーチャー２"
                } else if (crnt_num === 9999) {
                    name = "自作サブクリーチャー３"
                }
                skillData[index] = {
                    name: name,
                    id: crnt_num,
                    used: true,
                    mainId: d1,
                    mainLv: e1,
                    sub1Id: d2,
                    sub1IdLv: e2,
                    sub2Id: d3,
                    sub2IdLv: e3
                }
                console.log(skillData[index]);
            }
        });
        crnt_num++;
    }
    return (crnt_num - 1);
}

var crnt_num = 9996;
var cnt = 0;
var set_c = [-1, -1, -1, -1];

function setCreature(num, pos) {
    if (num === -1) {
        if (pos === 0) {
            var greet = document.getElementById('main_c');
            greet.innerHTML = '<input onclick="setCreature(-1, 0)" type="image"src="../calculation/image//interface2_0767.png" title="メイン">';
            cnt = 0;
            crnt_num = 9996;
            set_c[0] = -1;
            calc();
            return;
        }
        if (pos === 1) {
            var greet = document.getElementById('sub_c1');
            greet.innerHTML = '<input onclick="setCreature(-1, 1)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ１">';
            cnt = 1;
            crnt_num = 9997;
            set_c[1] = -1;
            calc();
            return;
        }
        if (pos === 2) {
            var greet = document.getElementById('sub_c2');
            greet.innerHTML = '<input onclick="setCreature(-1, 2)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ２">';
            cnt = 2;
            crnt_num = 9998;
            set_c[2] = -1;
            calc();
            return;
        }
        if (pos === 3) {
            var greet = document.getElementById('sub_c3');
            greet.innerHTML = '<input onclick="setCreature(-1, 3)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ３">';
            cnt = 3;
            crnt_num = 9999;
            set_c[3] = -1;
            calc();
            return;
        }
    }
    if (parseInt(num) === 9999) {
        num = translateTubo(num);
    }
    if (cnt === 0 && set_c[0] === -1) {
        var greet = document.getElementById('main_c');
        greet.innerHTML = '<input onclick="setCreature(-1, 0)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="メイン">';
        cnt = 1;
        crnt_num = 9997;
        set_c[0] = parseInt(num);
        calc();
        return;
    }
    if (cnt === 1 && set_c[1] === -1) {
        var greet = document.getElementById('sub_c1');
        greet.innerHTML = '<input onclick="setCreature(-1, 1)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="サブ１">';
        cnt = 2;
        crnt_num = 9998;
        set_c[1] = parseInt(num);
        calc();
        return;
    }
    if (cnt === 2 && set_c[2] === -1) {
        var greet = document.getElementById('sub_c2');
        greet.innerHTML = '<input onclick="setCreature(-1, 2)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="サブ２">';
        cnt = 3;
        crnt_num = 9999;
        set_c[2] = parseInt(num);
        calc();
        return;
    }
    if (cnt === 3 && set_c[3] === -1) {
        var greet = document.getElementById('sub_c3');
        greet.innerHTML = '<input onclick="setCreature(-1, 3)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="サブ３">';
        cnt = 4;
        crnt_num = 10000;
        set_c[3] = parseInt(num);
        calc();
        return;
    }
    console.log("インベントリが一杯です。(赤文字)" + set_c);
    //ここまできたら目いっぱいセットされてるよ
};

// いいから全部リセットだ！！！
function resetCreature() {
    var greet = document.getElementById('main_c');
    greet.innerHTML = '<input onclick="setCreature(-1, 0)" type="image"src="../calculation/image//interface2_0767.png" title="メイン">';
    var greet1 = document.getElementById('sub_c1');
    greet1.innerHTML = '<input onclick="setCreature(-1, 1)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ１">';
    var greet2 = document.getElementById('sub_c2');
    greet2.innerHTML = '<input onclick="setCreature(-1, 2)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ２">';
    var greet3 = document.getElementById('sub_c3');
    greet3.innerHTML = '<input onclick="setCreature(-1, 3)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ３">';
    cnt = 0;
    crnt_num = 9996;
    set_c = [-1, -1, -1, -1];
    calc();
}


function output1(mobname) {
    var result = mobname.map(function (e) {
        return "<" + e + ">\n";
    });
    return result;
}

function output2(skillset) {
    var result = skillset.map(function (e) {
        var creatureId = searchID(e.skillName);
        var out_slv = e.skillLv;
        if(e.skillLv > 50){
            out_slv = 50;
        }
        var options = searchOption(creatureId, out_slv);
        if (e.rank === 1) {
            // 上級スキル
            return '＜<span class="color-image1">' + passive_data[e.skillName].name + '</span> Lv <span class="color-image11">' + out_slv + '</span>＞<br>' + options;
        } else if (e.rank === 0) {
            //　一般スキル
            return '＜<span class="color-image2">' + passive_data[e.skillName].name + '</span> Lv <span class="color-image11">' + out_slv + '</span>＞<br>' + options;
        } else {
            //その他(ないけど一応赤くしておくよ)
            return '＜<span class="color-image1">' + passive_data[e.skillName].name + '</span> Lv <span class="color-image11">' + out_slv + '</span>＞<br>' + options;
        }
    });
    return result;
}

//色付け用
function searchaPassiveRank(value) {
    var prank = passive_data[value].rank;
    // var prank = 0;
    // for (var i = 0; i < skillIdMap.length; i++) {
    //     if (skillIdMap[i].value === value) {
    //         prank = skillIdMap[i].rank;
    //         break;
    //     }
    // };
    return Number(prank);
}

function searchID(value) {
    // var result = -1;
    // skillIdMap.forEach(function (e) {
    //     if (e.value === value) {
    //         result = e.id;
    //     }
    // });
    var result = value;
    if (result === -1) {
        console.log("誤字ってるからマシュマロ報告よろ：https://marshmallow-qa.com/sokoranominnsyu");
    }
    return result;
}

// upsertくん
function merge(skillset, sub) {
    var flag = true;
    var result = skillset.map(function (e) {
        if (e.skillName === sub.skillName) {
            e.skillLv += sub.skillLv;
            flag = false;
        }
        return e;
    });
    if (flag) {
        skillset.push(sub);
    }
    return result;
}

// 各クリーチャーの使用スキル
function getCSV(mode) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/creatureInfo_creature.csv", true);
    req.send(null);// HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function () {
        getCSV2(mode, req.responseText);// 渡されるのは読み込んだCSVデータ
    }
}

// パッシブ詳細
function getCSV2(mode, cic) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/creatureInfo_passiveskill.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(mode, cic, req.responseText);
    }
}


// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(mode, creature, passive) {// 読み込んだCSVデータが文字列として渡される
    // 初期化
    obj_format = {};
    creature_data = {};
    passive_data = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = creature.split("\"\n\"");// 改行を区切り文字として行を要素とした配列を生成
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
            creature_data[result[i][0]] = md;
        }
    }
    console.log(creature_data);

    // マップ一覧からmobid引いてくる
    var tmp = passive.split("\n");
    var p=0;
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
        var re;
        if (i == 0) {
            for (var j = 0; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                obj_format[j] = txt;
            }
            // TODO フォーマット違ったらエラー出すなりしたい
            // console.log(obj_format);
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
            passive_data[p] = md;
            p++;
        }
    }
    console.log(passive_data);

    // 実行
    if (mode == 2) {
        createTable();
    } else {
        createTable();
    }
}


function init1() {
    // 初回で呼ぶ用の関数
    getCSV();
}

function createTable() {
    // 既存データの生成
    for (var i in creature_data) {
        var data = creature_data[i];
        var temp = {
            id: i, //ないと任意クリーチャー作るときに死ぬ
            name: data["name"],
            rank: Number(data["rank"]), //N,HR...など
            type: data["type"], //サポートとかそういうの
            mainId:data["skill_0_id"],
            mainLv:Number(data["skill_0_lv"]),
            sub1Id:data["skill_2_id"],
            sub1IdLv:Number(data["skill_2_lv"]),
            sub2Id:data["skill_3_id"],
            sub2IdLv:Number(data["skill_3_lv"]),
        };
        skillData.push(temp);
    }
    for (var i in passive_data) {
        var data = passive_data[i];
        skillIdMap.push(data);
    }

    var d1dom = document.getElementById("sub_d1");
    var d2dom = document.getElementById("sub_d2");
    var d3dom = document.getElementById("sub_d3");
    skillIdMap.forEach(function (e, index) {
        if(!e.name){
            return;
        }
        document.optionlist.a2.options[index] = new Option(e.name, index);
        // .options[index] = new Option(e.value, e.value);
        var element1 = document.createElement('option');
        element1.setAttribute('value', index);
        element1.innerHTML = e.name;
        d1dom.appendChild(element1);
        var element2 = document.createElement('option');
        element2.setAttribute('value', index);
        element2.innerHTML = e.name;
        d2dom.appendChild(element2);
        var element3 = document.createElement('option');
        element3.setAttribute('value', index);
        element3.innerHTML = e.name;
        d3dom.appendChild(element3);
    });
    // TODO 可能ならパッシブシミュレータのクリーチャー部分を動的に作りたい
}

function calc() {
    var skillset = [];
    var mobname = [];
    // forEachでいいんじゃないかな…。
    for (var i = 0; i <= 3; i++) {
        if (set_c[i] === -1) {
            continue;//空だもんね
        }
        for (var j = 0; j < skillData.length; j++) {
            if (Number(skillData[j].id) === set_c[i]) {
                mobname.push(skillData[j].name);
                //パッシブ展開だ！！！！
                if (i === 0) {
                    // ここでリネームしてるの悪い設計だなあ…。
                    var mainSkill = {
                        skillName: Number(skillData[j].mainId),
                        skillLv: Number(skillData[j].mainLv),
                        rank: Number(searchaPassiveRank(skillData[j].mainId)),
                    }
                    //初っ端だから必ず空
                    skillset.push(mainSkill);
                    var sub1 = {
                        skillName: Number(skillData[j].sub1Id),
                        skillLv: Number(skillData[j].sub1IdLv),
                        rank: Number(searchaPassiveRank(skillData[j].sub1Id)),
                    }
                    // 勇気のゴーレムみたいにメインとサブで同じパッシブ持ってるのいるんで
                    merge(skillset, sub1);
                    var sub2 = {
                        skillName: Number(skillData[j].sub2Id),
                        skillLv: Number(skillData[j].sub2IdLv),
                        rank: Number(searchaPassiveRank(skillData[j].sub2Id)),
                    }
                    merge(skillset, sub2);
                } else {
                    var sub1 = {
                        skillName: Number(skillData[j].sub1Id),
                        skillLv: Number(skillData[j].sub1IdLv),
                        rank: Number(searchaPassiveRank(skillData[j].sub1Id)),
                    }
                    merge(skillset, sub1);
                    var sub2 = {
                        skillName: Number(skillData[j].sub2Id),
                        skillLv: Number(skillData[j].sub2IdLv),
                        rank: Number(searchaPassiveRank(skillData[j].sub2Id)),
                    }
                    merge(skillset, sub2);
                }
            }
        }
    }
    //ここまででパッシブ一覧が出来てるはずなので出力するよ
    document.keisannormal.res1.value = output1(mobname);
    var greet3 = document.getElementById('passive_state');
    greet3.innerHTML = ('<p style="text-align: left">' + output2(skillset) + '</p>');
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

function searchOption(cid, slv) {
    if(slv <= 0){
        return "";
    }
    if(slv > 50){
        slv = 50;
    }
    // これ直書きが一番速いってことに気づいてしまった。実ソースだとそんなことないだろうけど。
    var result = '';
    var passive_info = passive_data[cid];
    
    // flag次第でどっち見に行くか変更される
    var op_text0 = "";
    if(Number(passive_info["flag_0"]) > 0){
        op_text0 = option_text[passive_info["opid_0"]]
    } else {
        op_text0 = base_option_text[passive_info["opid_0"]]
    }
    var op_text1 = "";
    if(Number(passive_info["flag_1"]) > 0){
        op_text1 = option_text[passive_info["opid_1"]]
    } else {
        op_text1 = base_option_text[passive_info["opid_1"]]
    }
    var op_text2 = "";
    if(Number(passive_info["flag_2"]) > 0){
        op_text2 = option_text[passive_info["opid_2"]]
    } else {
        op_text2 = base_option_text[passive_info["opid_2"]]
    }
    var text0_0 = "opvalue_0_0_" + slv
    var text0_1 = "opvalue_0_1_" + slv
    var text0_2 = "opvalue_0_2_" + slv
    var text1_0 = "opvalue_1_0_" + slv
    var text1_1 = "opvalue_1_1_" + slv
    var text1_2 = "opvalue_1_2_" + slv
    var text2_0 = "opvalue_2_0_" + slv
    var text2_1 = "opvalue_2_1_" + slv
    var text2_2 = "opvalue_2_2_" + slv
    if(slv >= Number(passive_info["op2_reqlv"])){
        // 3段階目
        var text2 = createOpDetail(op_text2, passive_info[text2_0], passive_info[text2_0], passive_info[text2_1], passive_info[text2_1], passive_info[text2_2])
        var text1 = createOpDetail(op_text1, passive_info[text1_0], passive_info[text1_0], passive_info[text1_1], passive_info[text1_1], passive_info[text1_2])
        var text0 = createOpDetail(op_text0, passive_info[text0_0], passive_info[text0_0], passive_info[text0_1], passive_info[text0_1], passive_info[text0_2])
        result += text0 + "<br>";
        result += text1 + "<br>";
        result += text2 + "<br>";
    } else if (slv >= Number(passive_info["op1_reqlv"])){
        // 2段階目
        var text1 = createOpDetail(op_text1, passive_info[text1_0], passive_info[text1_0], passive_info[text1_1], passive_info[text1_1], passive_info[text1_2])
        var text0 = createOpDetail(op_text0, passive_info[text0_0], passive_info[text0_0], passive_info[text0_1], passive_info[text0_1], passive_info[text0_2])
        result += text0 + "<br>";
        result += text1 + "<br>";
    } else {
        // 1段階目
        var text0 = createOpDetail(op_text0, passive_info[text0_0], passive_info[text0_0], passive_info[text0_1], passive_info[text0_1], passive_info[text0_2])
        result += text0 + "<br>";

    }
    return result;
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
            replace_txt = '<span class="color-image11">' + job + '</span> スキルレベル +<span class="color-image11">' + n0max +'</span>';
        } else {
            replace_txt = '<span class="color-image11">' + job + '</span> スキルレベル +<span class="color-image11">[' + n0min + '~' + n0max + ']</span>';
        }
        txt = txt.replace(re, replace_txt);
        return txt;
    }

    // OP補正を黄色に
    re = /(.*?)(\[0\])(.*?)/g;
    if (n0min == n0max) {
        replace_txt = '$1<span class="color-image11">' + n0max + '</span>$3';
    } else {
        replace_txt = '$1<span class="color-image11">[' + n0min + '~' + n0max + ']</span>$3';
    }
    txt = txt.replace(re, replace_txt);

    re = /(.*?)(\[1\])(.*?)/g;
    if (n1min == n1max) {
        replace_txt = '$1<span class="color-image11">' + n1max + '</span>$3';
    } else {
        replace_txt = '$1<span class="color-image11">[' + n1min + '~' + n1max + ']</span>$3';
    }
    txt = txt.replace(re, replace_txt);

    re = /(.*?)(\[2\])(.*?)/g;
    replace_txt = '$1<span class="color-image11">' + n2 + '</span>$3';
    txt = txt.replace(re, replace_txt);

    return txt;
}

function searchPassiveSkill() {
    var a2 = document.optionlist.a2.value ? document.optionlist.a2.value : "";
    if (!a2) {
        alert("何も選ばれてないよ");
        return;
    }
    var memo_main = [];
    var memo_sub = [];
    var skillset = [];
    var nameList = "";
    var tmpSkill = {
        skillName: a2,
        skillLv: 0,
    }
    skillData.forEach(function (e) {
        if (e.mainId === a2) {
            memo_main.push(e);
            nameList += e.name
            nameList += ", "
        }
        if (e.sub1Id === a2) {
            memo_sub.push(e);
            nameList += e.name
            nameList += ", "
        }
        if (e.sub2Id === a2) {
            memo_sub.push(e);
            nameList += e.name
            nameList += ", "
        }
    });
    var match = matchSkill(memo_main, memo_sub, a2);
    tmpSkill.skillLv = match.best_slv;
    skillset.push(tmpSkill);
    var resultRes3 = "[該当スキルを所持しているクリーチャー]\n" + nameList + "\n\n"
    if (match.best_slv > 0) {
        resultRes3 = resultRes3 + "最大効果は" + match.best + "] を組み合わせることで\n SLv" + match.best_slv + "が得られます。\n"
    } else {
        resultRes3 = resultRes3 + "このパッシブはクリーチャーパッシブ変換スキルでのみ入手できます。\n"
    }

    document.optionlist.res3.value = resultRes3;
    // オプション効果も引っ張ってきちゃう
    var greet4 = document.getElementById('passive_state2');
    greet4.innerHTML = '<p style="text-align: left">' + output2(skillset) + '</p>';

}
function matchSkill(main, sub, name) {
    var result = {
        matched: [], // その他(ロジック上出せる範囲で)
        best: "[ ", //最大値
        best_main: null,
        best3: null,
        best_slv: 0,
    }
    //メインは最大値を取るように選ぶ(それ以外は選ばない)
    if (main.length > 0) {
        var tmp_b = "";
        main.forEach(function (e, index) {
            if (e.mainLv > result.best_slv) {
                result.best_slv = e.mainLv;
                tmp_b = e.name;
            }
        });
        result.best += (tmp_b + ", ");
    }
    //メインは確定したので、サブだけで組む。(ロジック上同じの２匹は選ばれない)
    var best3 = [{ id: -1, name: "", slv: 0 }, { id: -1, name: "", slv: 0 }, { id: -1, name: "", slv: 0 }];
    sub.forEach(function (e, index) {
        if (e.sub1Id === name) {
            if (e.sub1IdLv > best3[0].slv) {
                best3[0] = { id: e.id, name: e.name, slv: e.sub1IdLv };
                best3.sort(function (a, b) {
                    if (a.slv > b.slv) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
        }
        if (e.sub2Id === name) {
            if (e.sub2IdLv > best3[0].slv) {
                best3[0] = { id: e.id, name: e.name, slv: e.sub2IdLv };
                best3.sort(function (a, b) {
                    if (a.slv > b.slv) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
        }
    });

    //結果出力
    result.best3 = best3;
    best3.forEach(function (e) {
        if (e.id !== -1) {
            result.best += (e.name + ", ");
            result.best_slv += parseInt(e.slv);
        }
    });
    return result;
};
