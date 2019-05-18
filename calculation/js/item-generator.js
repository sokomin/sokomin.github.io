function init1() {
    document.f.a1.value = "";
    document.f.a4.value = "";

    document.f.b1.value = 0;
    document.f.b2.value = 0;
    document.f.b3.value = 0;
    document.f.b4.value = 0;
    document.f.b5.value = 0;

    document.f.c1.value = 0;
    document.f.c2.value = 0;
    document.f.c3.value = 0;
    document.f.c4.value = 0;
    document.f.c5.value = 0;
    document.f.c6.value = 0;
    document.f.c7.value = 0;
    document.f.c8.value = 0;
    document.f.c9.value = 0;
    document.f.c10.value = 0;
    document.f.c11.value = 0;
    document.f.c12.value = 0;
    document.f.c13.value = 0;
    document.f.c14.value = 0;


    document.f.r1.value = "";

    document.f.b1.options[0] = new Option('Nxあり', 0, 1, 1);
    document.f.b1.options[1] = new Option('Nxなし', 1);

    document.f.b2.options[0] = new Option('可', 0, 1, 1);
    document.f.b2.options[1] = new Option('不可', 1);

    document.f.b3.options[0] = new Option('制限なし', 0, 1, 1);
    document.f.b3.options[1] = new Option('着用制限あり', 1);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}


function set1() {
    var c1 = parseInt(document.f.c1.value) ? parseInt(document.f.c1.value) : 0;
    var c1a = createOptionForm(c1);
    if (c1a.length !== 0) {
        document.f.a4.value = c1a[0];
        document.f.a5.value = c1a[1];
        document.f.a6.value = c1a[2];
    }
    var c2 = parseInt(document.f.c2.value) ? parseInt(document.f.c2.value) : 0;
    var c2a = createOptionForm(c2);
    if (c2a.length !== 0) {
        document.f.a7.value = c2a[0];
        document.f.a8.value = c2a[1];
        document.f.a9.value = c2a[2];
    }
    var c3 = parseInt(document.f.c3.value) ? parseInt(document.f.c3.value) : 0;
    var c3a = createOptionForm(c3);
    if (c3a.length !== 0) {
        document.f.a10.value = c3a[0];
        document.f.a11.value = c3a[1];
        document.f.a12.value = c3a[2];
    }
    var c4 = parseInt(document.f.c4.value) ? parseInt(document.f.c4.value) : 0;
    var c4a = createOptionForm(c4);
    if (c4a.length !== 0) {
        document.f.a13.value = c4a[0];
        document.f.a14.value = c4a[1];
        document.f.a15.value = c4a[2];
    }
    var c5 = parseInt(document.f.c5.value) ? parseInt(document.f.c5.value) : 0;
    var c5a = createOptionForm(c5);
    if (c5a.length !== 0) {
        document.f.a16.value = c5a[0];
        document.f.a17.value = c5a[1];
        document.f.a18.value = c5a[2];
    }
    var c6 = parseInt(document.f.c6.value) ? parseInt(document.f.c6.value) : 0;
    var c6a = createOptionForm(c6);
    if (c6a.length !== 0) {
        document.f.a19.value = c6a[0];
        document.f.a20.value = c6a[1];
        document.f.a21.value = c6a[2];
    }
    var c7 = parseInt(document.f.c7.value) ? parseInt(document.f.c7.value) : 0;
    var c7a = createOptionForm(c7);
    if (c7a.length !== 0) {
        document.f.a22.value = c7a[0];
        document.f.a23.value = c7a[1];
        document.f.a24.value = c7a[2];
    }
    var c8 = parseInt(document.f.c8.value) ? parseInt(document.f.c8.value) : 0;
    var c8a = createOptionForm(c8);
    if (c8a.length !== 0) {
        document.f.a25.value = c8a[0];
        document.f.a26.value = c8a[1];
        document.f.a27.value = c8a[2];
    }
    var c9 = parseInt(document.f.c9.value) ? parseInt(document.f.c9.value) : 0;
    var c9a = createOptionForm(c9);
    if (c9a.length !== 0) {
        document.f.a28.value = c9a[0];
        document.f.a29.value = c9a[1];
        document.f.a30.value = c9a[2];
    }
    var c10 = parseInt(document.f.c10.value) ? parseInt(document.f.c10.value) : 0;
    var c10a = createOptionForm(c10);
    if (c10a.length !== 0) {
        document.f.a31.value = c10a[0];
        document.f.a32.value = c10a[1];
        document.f.a33.value = c10a[2];
    }
    var c11 = parseInt(document.f.c11.value) ? parseInt(document.f.c11.value) : 0;
    var c11a = createOptionForm(c11);
    if (c11a.length !== 0) {
        document.f.a44.value = c11a[0];
        document.f.a45.value = c11a[1];
        document.f.a46.value = c11a[2];
    }
    var c12 = parseInt(document.f.c12.value) ? parseInt(document.f.c12.value) : 0;
    var c12a = createOptionForm(c12);
    if (c12a.length !== 0) {
        document.f.a47.value = c12a[0];
        document.f.a48.value = c12a[1];
        document.f.a49.value = c12a[2];
    }
    var c13 = parseInt(document.f.c13.value) ? parseInt(document.f.c13.value) : 0;
    var c13a = createOptionForm(c13);
    if (c13a.length !== 0) {
        document.f.a50.value = c13a[0];
        document.f.a51.value = c13a[1];
        document.f.a52.value = c13a[2];
    }
    var c14 = parseInt(document.f.c14.value) ? parseInt(document.f.c14.value) : 0;
    var c14a = createOptionForm(c14);
    if (c14a.length !== 0) {
        document.f.a53.value = c14a[0];
        document.f.a54.value = c14a[1];
        document.f.a55.value = c14a[2];
    }
}

function createOptionForm(num) {
    var array = [];
    if (num === 1) {
        array = ["力 n1/レベル n2", "+1", "2"];
    }
    if (num === 2) {
        array = ["ダメージ n1％", "+25", ""];
    }
    if (num === 3) {
        array = ["スキルレベル n1", "+3", ""];
    }
    if (num === 4) {
        array = ["n1 スキルレベル +n2", "プリンセス", "5"];
    }
    if (num === 5) {
        array = ["n1", "自動リロード", ""];
    }
    if (num === 6) {
        array = ["睡眠攻撃 n1％(n2秒)", "+30", "30"];
    }
    if (num === 7) {
        array = ["水ダメージ n1～n2", "310", "560"];
    }
    if (num === 8) {
        array = ["ターゲットの火抵抗をn1％弱化させる。", "45", ""];
    }
    if (num === 9) {
        array = ["n1％ 確率で魔法ダメージのn2％をHP吸収", "25", "4"];
    }
    if (num === 10) {
        array = ["Aがn1のBでn2する", "310", "560"];
    }
    return array;

}

function save() {
    var theforms = document.forms
    memorizearray = new Array()
    for (i = 0; i < theforms.length; i++) {
        for (j = 0; j < theforms[i].elements.length; j++) {
            if (theforms[i].elements[j].className.indexOf("memorize") != -1 && theforms[i].elements[j].type == "text")
                memorizearray[memorizearray.length] = theforms[i].elements[j]
            if (theforms[i].elements[j].className.indexOf("memorize") != -1 && theforms[i].elements[j].type == "select-one")
                memorizearray[memorizearray.length] = theforms[i].elements[j]
        }
    }
    var setjson = JSON.stringify(memorizearray);
    localStorage.setItem('キー', setjson);
}

function load() {
    var getjson = localStorage.getItem('キー');
    var memorizearray = JSON.parse(getjson);
    var theforms = document.forms;
    // memorizearray = new Array()
    for (i = 0; i < theforms.length; i++) {
        for (j = 0; j < theforms[i].elements.length; j++) {
            if (theforms[i].elements[j].className.indexOf("memorize") != -1 && theforms[i].elements[j].type == "text"){}
                //memorizearray[memorizearray.length] = theforms[i].elements[j]
            if (theforms[i].elements[j].className.indexOf("memorize") != -1 && theforms[i].elements[j].type == "select-one") { }
                //memorizearray[memorizearray.length] = theforms[i].elements[j]
        }
    }

}

var template1 = '<table id="table1"><colgroup><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"></colgroup><tbody><tr><th colspan="6"><font color="#e8c898">';
var template2 = '</font></th><th colspan="6"><font color="#cc6633">';
var template3 = ' [Nx]</font></th></tr><tr><td rowspan="2"><img src="../item/design/image/item/iconItem_';
var template4 = '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>';
var template5 = '<font color="#f8f800">錬成 可能</font>';
var template6 = '</td><td rowspan="2"><img src="../item/design/image/item/iconItem_';
var template7 = '.png"></td><td colspan="5"><font color="#00f8f8">&lt;基本情報&gt;</font><br>';
var temp1 = '<font color="#ae5dae">取引不可アイテム<br></font>';
var temp2 = '<font color="#ae5dae">装備数制限(</font><font color="#f8f800">1/1</font><font color="#ae5dae">)</font><br>';
var template8 = '<br><font color="#00f8f8">&lt;錬成 オプション 情報&gt;</font><br>';
var template9 = '</td></tr><tr><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>';
var template91 = '</td><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>';
// 2回繰り返す
var template10 = '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>';
var template11 = '</td></tr><tr><td colspan="12"><font color="#00f8f8">&lt;説明&gt;</font><br>';
var template12 = ' </td></tr></tbody></table>';

function createOption(a4, a5, a6, r1) {
    if (a4 !== "") {
        a4 = a4.replace('n1', a5);
        a4 = a4.replace('n2', a6);
        r1 += (a4 + '<br />');
    }
    return r1;
}

function calc1() {
    var r1 = template1;
    var a1 = document.f.a1.value ? document.f.a1.value : "";
    r1 += a1;
    r1 += template2;
    r1 += a1;
    r1 += template3;
    //アイテムID
    var a34 = document.f.a34.value ? document.f.a34.value : "";
    r1 += a34;
    r1 += template4;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;
    var b2 = parseInt(document.f.b2.value) ? parseInt(document.f.b2.value) : 0;
    var b3 = parseInt(document.f.b3.value) ? parseInt(document.f.b3.value) : 0;
    var b4 = parseInt(document.f.b4.value) ? parseInt(document.f.b4.value) : 0;
    var b5 = parseInt(document.f.b5.value) ? parseInt(document.f.b5.value) : 0;
    //取引不可
    if (b2 === 1) {
        r1 += temp1;
    }
    //装備着用制限
    if (b3 === 1) {
        r1 += temp2;
    }

    //武器ベース＋射程はここ
    var a41 = document.f.a41.value ? ('<font color="#f8f800">' + document.f.a41.value + '~') : "";
    var a42 = document.f.a42.value ? (document.f.a42.value + '</font>') : "";
    var a43 = document.f.a43.value ? ('<font color="#f8f800">' + document.f.a43.value + '</font>') : "";
    //射程距離は2番で定義しちゃった…。
    var a2 = document.f.a2.value ? ('<font color="#f8f800">' + document.f.a2.value + '</font>') : "";
    if (a41 !== "") {
        var dame = "攻撃力 " + a41 + a42 + "(" + a43 + "秒)<br />"
        r1 += dame;
        var sya1 = "射程距離 " + a2 + " <br />";
        r1 += sya1;
    }
    var pet = "ミニペットエサ分類 "
    if (b4 !== 0) {
        if (b4 === 1) {
            pet += '<font color="#f8f800">自然型</font><br/>';
        }
        if (b4 === 2) {
            pet += '<font color="#f8f800">精霊型</font><br/>';
        }
        if (b4 === 3) {
            pet += '<font color="#f8f800">神霊型</font><br/>';
        }
        r1 += pet;
    }

    //通常OP1
    var a4 = document.f.a4.value ? document.f.a4.value : "";
    var a5 = document.f.a5.value ? ('<font color="#f8f800">' + document.f.a5.value + '</font>') : "";
    var a6 = document.f.a6.value ? ('<font color="#f8f800">' + document.f.a6.value + '</font>') : "";
    r1 = createOption(a4, a5, a6, r1);

    var a7 = document.f.a7.value ? document.f.a7.value : "";
    var a8 = document.f.a8.value ? ('<font color="#f8f800">' + document.f.a8.value + '</font>') : "";
    var a9 = document.f.a9.value ? ('<font color="#f8f800">' + document.f.a9.value + '</font>') : "";
    r1 = createOption(a7, a8, a9, r1);

    var a10 = document.f.a10.value ? document.f.a10.value : "";
    var a11 = document.f.a11.value ? ('<font color="#f8f800">' + document.f.a11.value + '</font>') : "";
    var a12 = document.f.a12.value ? ('<font color="#f8f800">' + document.f.a12.value + '</font>') : "";
    r1 = createOption(a10, a11, a12, r1);
    var a13 = document.f.a13.value ? document.f.a13.value : "";
    var a14 = document.f.a14.value ? ('<font color="#f8f800">' + document.f.a14.value + '</font>') : "";
    var a15 = document.f.a15.value ? ('<font color="#f8f800">' + document.f.a15.value + '</font>') : "";
    r1 = createOption(a13, a14, a15, r1);
    var a16 = document.f.a16.value ? document.f.a16.value : "";
    var a17 = document.f.a17.value ? ('<font color="#f8f800">' + document.f.a17.value + '</font>') : "";
    var a18 = document.f.a18.value ? ('<font color="#f8f800">' + document.f.a18.value + '</font>') : "";
    r1 = createOption(a16, a17, a18, r1);
    var a19 = document.f.a19.value ? document.f.a19.value : "";
    var a20 = document.f.a20.value ? ('<font color="#f8f800">' + document.f.a20.value + '</font>') : "";
    var a21 = document.f.a21.value ? ('<font color="#f8f800">' + document.f.a21.value + '</font>') : "";
    r1 = createOption(a19, a20, a21, r1);
    var a22 = document.f.a22.value ? document.f.a22.value : "";
    var a23 = document.f.a23.value ? ('<font color="#f8f800">' + document.f.a23.value + '</font>') : "";
    var a24 = document.f.a24.value ? ('<font color="#f8f800">' + document.f.a24.value + '</font>') : "";
    r1 = createOption(a22, a23, a24, r1);
    var a25 = document.f.a25.value ? document.f.a25.value : "";
    var a26 = document.f.a26.value ? ('<font color="#f8f800">' + document.f.a26.value + '</font>') : "";
    var a27 = document.f.a27.value ? ('<font color="#f8f800">' + document.f.a27.value + '</font>') : "";
    r1 = createOption(a25, a26, a27, r1);
    var a28 = document.f.a28.value ? document.f.a28.value : "";
    var a29 = document.f.a29.value ? ('<font color="#f8f800">' + document.f.a29.value + '</font>') : "";
    var a30 = document.f.a30.value ? ('<font color="#f8f800">' + document.f.a30.value + '</font>') : "";
    r1 = createOption(a28, a29, a30, r1);
    var a31 = document.f.a31.value ? document.f.a31.value : "";
    var a32 = document.f.a32.value ? ('<font color="#f8f800">' + document.f.a32.value + '</font>') : "";
    var a33 = document.f.a33.value ? ('<font color="#f8f800">' + document.f.a33.value + '</font>') : "";
    r1 = createOption(a31, a32, a33, r1);

    if (b1 === 0) {
        r1 += template5;
    }




    /////////////////// ここからNx関連の表記 //////////////
    r1 += template6;
    r1 += a34;
    r1 += template7;

    //取引不可
    if (b2 === 1) {
        r1 += temp1;
    }
    //装備着用制限
    if (b3 === 1) {
        r1 += temp2;
    }


    //武器の場合はここ通る
    if (a41 !== "") {
        var dame = "攻撃力 " + a41 + a42 + "(" + a43 + "秒)<br />"
        r1 += dame;
        var sya1 = "射程距離 " + a2 + "<br />";
        r1 += sya1;
    }
    if (b4 !== 0) {
        r1 += pet;
    }


    r1 = createOption(a4, a5, a6, r1);
    r1 = createOption(a7, a8, a9, r1);
    r1 = createOption(a10, a11, a12, r1);
    r1 = createOption(a13, a14, a15, r1);
    r1 = createOption(a16, a17, a18, r1);
    r1 = createOption(a19, a20, a21, r1);
    r1 = createOption(a22, a23, a24, r1);
    r1 = createOption(a25, a26, a27, r1);
    r1 = createOption(a28, a29, a30, r1);
    r1 = createOption(a31, a32, a33, r1);


    r1 += template8;
    var a44 = document.f.a44.value ? document.f.a44.value : "";
    var a45 = document.f.a45.value ? ('<font color="#f8f800">' + document.f.a45.value + '</font>') : "";
    var a46 = document.f.a46.value ? ('<font color="#f8f800">' + document.f.a46.value + '</font>') : "";
    r1 = createOption(a44, a45, a46, r1);
    var a47 = document.f.a47.value ? document.f.a47.value : "";
    var a48 = document.f.a48.value ? ('<font color="#f8f800">' + document.f.a48.value + '</font>') : "";
    var a49 = document.f.a49.value ? ('<font color="#f8f800">' + document.f.a49.value + '</font>') : "";
    r1 = createOption(a47, a48, a49, r1);
    var a50 = document.f.a50.value ? document.f.a50.value : "";
    var a51 = document.f.a51.value ? ('<font color="#f8f800">' + document.f.a51.value + '</font>') : "";
    var a52 = document.f.a52.value ? ('<font color="#f8f800">' + document.f.a52.value + '</font>') : "";
    r1 = createOption(a50, a51, a52, r1);
    var a53 = document.f.a53.value ? document.f.a53.value : "";
    var a54 = document.f.a54.value ? ('<font color="#f8f800">' + document.f.a54.value + '</font>') : "";
    var a55 = document.f.a55.value ? ('<font color="#f8f800">' + document.f.a55.value + '</font>') : "";
    r1 = createOption(a53, a54, a55, r1);

    r1 += '<br>';
    //要求値
    r1 += template9;
    var a37 = document.f.a37.value ? (document.f.a37.value + '<br/>') : "";
    r1 += a37;
    var a38 = document.f.a38.value ? (document.f.a38.value + '<br/>') : "";
    r1 += a38;
    var a39 = document.f.a39.value ? (document.f.a39.value + '<br/>') : "";
    r1 += a39;

    //職業
    r1 += template10;
    var a35 = document.f.a35.value ? (document.f.a35.value + '<br/>') : "";
    r1 += a35;
    var a36 = document.f.a36.value ? (document.f.a36.value + '<br/>') : "";
    r1 += a36;

    //要求値
    r1 += template91;
    var a37 = document.f.a37.value ? (document.f.a37.value + '<br/>') : "";
    r1 += a37;
    var a38 = document.f.a38.value ? (document.f.a38.value + '<br/>') : "";
    r1 += a38;
    var a39 = document.f.a39.value ? (document.f.a39.value + '<br/>') : "";
    r1 += a39;

    //職業
    r1 += template10;
    var a35 = document.f.a35.value ? (document.f.a35.value + '<br/>') : "";
    r1 += a35;
    var a36 = document.f.a36.value ? (document.f.a36.value + '<br/>') : "";
    r1 += a36;

    r1 += template11;
    var a40 = document.f.a40.value ? (document.f.a40.value + '<br/>') : "";
    r1 += a40;
    r1 += '<br />'
    if (b5 !== 0) {
        r1 += '<br />'
        if (b5 === 1) {
            r1 += '<font color="#ff0000">※ ブラックファイヤーユニークは、部位を問わず一つのみ装着可能です。<br></font>'
        }
        if (b5 === 2) {
            r1 += '<font color="#ef6cef">※ 封印された力を解放するには</font>‘<font color="#e8c898">封印解放道具箱</font>’<font color="#ef6cef">が必要です</font></td>';
        }
        if (b5 === 3) {
            r1 += '<font color="#ff0000">※ 鏡の魔法書使用不可。<br></font>'
        }

    }
    r1 += template12;

    document.f.r1.value = r1;
}
