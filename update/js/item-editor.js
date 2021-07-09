function init1() {
    document.f.a1.value = "";
    document.f.a2.value = "";
    document.f.a3.value = "";
    document.f.r1.value = "";

    for (var key in optionlist) {
        document.f.op1.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op2.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op3.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op4.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op5.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op6.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op7.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op8.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.op9.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.nx1.options[0] = new Option('アイテム着用レベル-[数値]', 9999, 1, 1);
        document.f.nx1.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.nx2.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.nx3.options[key] = new Option(optionlist[key].name, key);
    }
    for (var key in optionlist) {
        document.f.nx4.options[key] = new Option(optionlist[key].name, key);
    }
}
const req_ary = ["レベル","力","知識","敏捷","知恵","健康","カリスマ","運"];

const default_html_txt = ['<table id="table1"><colgroup><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"></colgroup><tbody><tr><th colspan="6"><font color="#e8c898">',
    // アイテム名
    '</font></th><th colspan="6"><font color="#cc6633">',
    // Nx名
    '</font></th></tr><tr><td rowspan="2"><img src="../item/design/image/item/iconItem_',
    // item_id
    '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>',
    // NOPリスト 3
            // - 火 水 風大地 抵抗 <font color="#f8f800">+14%</font> <br />
    '<font color="#f8f800">錬成 可能</font><br></td><td rowspan="2"><img src="../item/design/image/item/iconItem_',
    //item_id 4
    '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>',
    // NxOPリスト 5
            // - 火 水 風大地 抵抗 <font color="#f8f800">+14%</font> <br />
    '<br><font color="#00f8f8">&lt;錬成 オプション 情報&gt;</font><br>',
    // 解放OPリスト 6
            // - アイテム着用レベル -<font color="#f8f800">100</font> <br />
            // - 攻撃速度 <font color="#f8f800">+10</font> ％<br />
            // - CP獲得ボーナス <font color="#f8f800">20</font> ％<br />
            // - 魔法致命打 <font color="#f8f800">+5</font>％<br>
    '</td></tr><tr><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>',
            // レベル 1000<br>
            // 知識 800<br>
            // カリスマ 400<br>
    '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>',
    // TODO 8
            // - 男性キャラクター専用アイテム
    '</td><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>',
    // Nx時に変わるケースに注意 9 
            // レベル 1000<br>
            // 知識 800<br>
            // カリスマ 400<br>
    '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>',
    // TODO 10
            // - 男性キャラクター専用アイテム
    '</td></tr><tr><td colspan="2" valign="top"><font color="#00f8f8">&lt;DropLv/係数&gt;</font><br>1000/1000</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;価格&gt;</font><br></td><td colspan="2" valign="top"><font color="#00f8f8">&lt;DropLv/係数&gt;</font><br>1000/1000</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;価格&gt;</font><br></td></tr><tr><td colspan="12"><font color="#00f8f8">&lt;説明&gt;</font><br>',
    // a3
            // - あるやんちゃな天才が気まぐれいに作ったマント。
            // ただ派手なマントに見えるが、使用者は自分の周りに漂う強い力を感じられるという。
            // <br>
    '</td></tr></tbody></table>'
];

// Nxじゃない版のhtml
const single_html_txt = ['<table id="table1"><colgroup><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"></colgroup><tbody><tr><th colspan="6"><font color="#e8c898">',
    // アイテム名
    '</font></th><th colspan="6"><font color="#cc6633">',
    // Nx名
    '</font></th></tr><tr><td rowspan="2"><img src="../item/design/image/item/iconItem_',
    // item_id
    '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>',
    // NOPリスト 3
            // - 火 水 風大地 抵抗 <font color="#f8f800">+14%</font> <br />
    '<font color="#f8f800">錬成 可能</font><br></td><td rowspan="2"><img src="../item/design/image/item/iconItem_',
    //item_id 4
    '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>',
    // NxOPリスト 5
            // - 火 水 風大地 抵抗 <font color="#f8f800">+14%</font> <br />
    '<br><font color="#00f8f8">&lt;錬成 オプション 情報&gt;</font><br>',
    // 解放OPリスト 6
            // - アイテム着用レベル -<font color="#f8f800">100</font> <br />
            // - 攻撃速度 <font color="#f8f800">+10</font> ％<br />
            // - CP獲得ボーナス <font color="#f8f800">20</font> ％<br />
            // - 魔法致命打 <font color="#f8f800">+5</font>％<br>
    '</td></tr><tr><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>',
            // レベル 1000<br>
            // 知識 800<br>
            // カリスマ 400<br>
    '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>',
    // TODO 8
            // - 男性キャラクター専用アイテム
    '</td><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>',
    // Nx時に変わるケースに注意 9 
            // レベル 1000<br>
            // 知識 800<br>
            // カリスマ 400<br>
    '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>',
    // TODO 10
            // - 男性キャラクター専用アイテム
    '</td></tr><tr><td colspan="2" valign="top"><font color="#00f8f8">&lt;DropLv/係数&gt;</font><br>1000/1000</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;価格&gt;</font><br></td><td colspan="2" valign="top"><font color="#00f8f8">&lt;DropLv/係数&gt;</font><br>1000/1000</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;価格&gt;</font><br></td></tr><tr><td colspan="12"><font color="#00f8f8">&lt;説明&gt;</font><br>',
    // a3
            // - あるやんちゃな天才が気まぐれいに作ったマント。
            // ただ派手なマントに見えるが、使用者は自分の周りに漂う強い力を感じられるという。
            // <br>
    '</td></tr></tbody></table>'
];


function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function calc1() {
    // var a1 = parseInt(document.f.a1.value ? parseInt(document.f.a1.value) : "";
    var a1 = document.f.a1.value ? document.f.a1.value : "？？？";
    var a2 = document.f.a2.value ? document.f.a2.value : "0000";
    var a3 = document.f.a3.value ? document.f.a3.value : "";
    var b1 = document.f.b1.value!= void 0 ? document.f.b1.value : -1;
    var b2 = document.f.b2.value ? document.f.b2.value : 0;
    var b3 = document.f.b3.value!= void 0 ? document.f.b3.value : -1;
    var b4 = document.f.b4.value ? document.f.b4.value : 0;
    var b5 = document.f.b5.value!= void 0 ? document.f.b5.value : -1;
    var b6 = document.f.b6.value ? document.f.b6.value : 0;
    var nb2 = document.f.nb2.value ? document.f.nb2.value : 0;
    var nb4 = document.f.nb4.value ? document.f.nb4.value : 0;
    var nb6 = document.f.nb6.value ? document.f.nb6.value : 0;
    var nop_ary = create_op_ary("op");
    var nxop_ary = create_nxop_ary("nxop");
    var lbop_ary = create_lbop_ary("nx");
    console.log(nop_ary);
    console.log(nxop_ary);
    console.log(lbop_ary);
    // 頑張って描画
    var warn_text = "";
    var res_text = "";
    // 途中でおかしな部分あったらwarn_textに書き込んで最終的に出力
    // Nxと通常で同じ、アイテム名が空、錬成OPが指定されていない…など
    for (var i = 0; i < default_html_txt.length; i++) {
        res_text += default_html_txt[i];
        if (i == 0) {
            res_text += a1;
        }
        if (i == 1) {
            res_text += a1;
            res_text += "[Nx]";
        }
        if (i == 2) {
            res_text += a2;
        }
        if (i == 3) {
            // for文で回すなりして頑張る
            for (var j = 0; j < nop_ary.length; j++) {
                var op_txt = create_op_text(nop_ary[j]);
                res_text += op_txt;
            }
        }
        if (i == 4) {
            res_text += a2;
        }
        if (i == 5) {
            // for文で回すなりして頑張る
            for (var j = 0; j < nxop_ary.length; j++) {
                var op_txt = create_op_text(nxop_ary[j]);
                res_text += op_txt;
            }
        }
        if (i == 6) {
            // for文で回すなりして頑張る
            for (var j = 0; j < lbop_ary.length; j++) {
                var op_txt = create_op_text(lbop_ary[j]);
                res_text += op_txt;
            }
        }
        if (i == 7) {
            if (b1 >= 0 && b2 > 0) {
                res_text += "- ";
                res_text += req_ary[b1];
                res_text += " " + b2;
                res_text += "<br>";
            }
            if (b3 >= 0 && b4 > 0) {
                res_text += "- ";
                res_text += req_ary[b3];
                res_text += " " + b4;
                res_text += "<br>";
            }
            if (b5 >= 0 && b6 > 0) {
                res_text += "- ";
                res_text += req_ary[b5];
                res_text += " " + b6;
                res_text += "<br>";
            }
        }
        // 8と10の職業は未実装
        if (i == 9) {
            if (b1 >= 0 && b2 > 0) {
                res_text += "- ";
                res_text += req_ary[b1];
                if (nb2 > 0) {
                    res_text += " " + nb2;
                } else {
                    res_text += " " + b2;
                }
                res_text += "<br>";
            }
            if (b3 >= 0 && b4 > 0) {
                res_text += "- ";
                res_text += req_ary[b3];
                if (nb4 > 0) {
                    res_text += " " + nb4;
                } else {
                    res_text += " " + b4;
                }
                res_text += "<br>";
            }
            if (b5 >= 0 && b6 > 0) {
                res_text += "- ";
                res_text += req_ary[b5];
                if (nb6 > 0) {
                    res_text += " " + nb6;
                } else {
                    res_text += " " + b6;
                }
                res_text += "<br>";
            }
        }
        if (i == 11) {
            res_text += "- ";
            res_text += a3;
        }
    }

    // r2はr1の内容をDOM化して直接貼り付け
    document.f.r1.value = res_text;
    var prev_html = document.getElementById('preview_html');
    prev_html.innerHTML = '<p style="text-align: left">' + res_text + '</p>';

    var warn_html = document.getElementById('warning_html');
    warn_html.innerHTML = '<p style="text-align: left">' + warn_text + '</p>';

}


// 通常OPの配列を生成
function create_op_ary(str) {
    var res_ary = [];
    for (var i = 1; i < 10; i++){
        // var str = "op";
        var str1 = str + String(i);
        var str11 = str + String(i) + "1";
        var str12 = str + String(i) + "2";
        var str13 = str + String(i) + "3";
        var op1 = document.f[str1].value ? document.f[str1].value : "";
        var op11 = document.f[str11].value ? document.f[str11].value : "";
        var op12 = document.f[str12].value ? document.f[str12].value : "";
        var op13 = document.f[str13].value ? document.f[str13].value : "";
        var op_data = {
            c: op1,
            p1: op11,
            p2: op12,
            p3: op13,
        };
        res_ary.push(op_data);
    }
    return res_ary;
}

// NxOPの配列を生成
function create_nxop_ary(str) {
    var res_ary = [];
    for (var i = 1; i < 10; i++){
        // var str = "op";
        var str1 = "op" + String(i);
        var str11 = str + String(i) + "1";
        var str12 = str + String(i) + "2";
        var str13 = str + String(i) + "3";
        var op1 = document.f[str1].value ? document.f[str1].value : "";
        var op11 = document.f[str11].value ? document.f[str11].value : "";
        var op12 = document.f[str12].value ? document.f[str12].value : "";
        var op13 = document.f[str13].value ? document.f[str13].value : "";
        var op_data = {
            c: op1,
            p1: op11,
            p2: op12,
            p3: op13,
        };
        res_ary.push(op_data);
    }
    return res_ary;
}

// 封印解放の配列を生成
function create_lbop_ary(str) {
    var res_ary = [];
    for (var i = 1; i <= 4; i++){
        // var str = "op";
        var str1 = str + String(i);
        var str11 = str + String(i) + "1";
        var str12 = str + String(i) + "2";
        var str13 = str + String(i) + "3";
        var op1 = document.f[str1].value ? document.f[str1].value : "";
        var op11 = document.f[str11].value ? document.f[str11].value : "";
        var op12 = document.f[str12].value ? document.f[str12].value : "";
        var op13 = document.f[str13].value ? document.f[str13].value : "";
        var op_data = {
            c: op1,
            p1: op11,
            p2: op12,
            p3: op13,
        };
        res_ary.push(op_data);
    }
    return res_ary;
}


function create_op_text(obj) {
    var res_text = "- ";
    if (!obj || obj.c == 0) {
        return "";
    }
    if (optionlist[obj.c]) {
        var text = optionlist[obj.c].name;
        var op1 = '<font color="#f8f800">' + obj.p1 + '</font>'
        var op2 = '<font color="#f8f800">' + obj.p2 + '</font>'
        var op3 = '<font color="#f8f800">' + obj.p3 + '</font>'
        // jsのreplace関数は最初に一致した文字のみ置き換えるからこれで動く
        text = text.replace("\[数値\]", op1);
        text = text.replace("\[数値\]", op2);
        text = text.replace("\[数値\]", op3);
        res_text += text;
    } else {
        // この場合はOP未実装なので何も出力しない、が正解。
        return "";
        // console.log("warning:そんなOPはない。" + obj.c);
    };
    res_text += "<br>";
    return res_text;
};