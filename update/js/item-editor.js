function init1() {
    document.f.a1.value = "";
    document.f.b1.value = "";
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

const default_html_txt = ['<table id="table1"><colgroup><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"><col span="1" width="40"><col span="1" width="135"><col span="1" width="135"><col span="2"><col span="1"></colgroup><tbody><tr><th colspan="6"><font color="#e8c898">',
    // アイテム名
    '</font></th><th colspan="6"><font color="#cc6633">',
    // Nx名
    '</font></th></tr><tr><td rowspan="2"><img src="../item/design/image/item/iconItem_',
    // item_id
    '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>',
    // NOPリスト
            // - 火 水 風大地 抵抗 <font color="#f8f800">+14%</font> <br />
    '<font color="#f8f800">錬成 可能</font><br></td><td rowspan="2"><img src="../item/design/image/item/iconItem_',
    //item_id
    '.png"></td><td colspan="5" valign="top"><font color="#00f8f8">&lt;基本情報&gt;</font><br>',
    // NxOPリスト
            // - 火 水 風大地 抵抗 <font color="#f8f800">+14%</font> <br />
    '<br><font color="#00f8f8">&lt;錬成 オプション 情報&gt;</font><br>',
    // 解放OPリスト
            // - アイテム着用レベル -<font color="#f8f800">100</font> <br />
            // - 攻撃速度 <font color="#f8f800">+10</font> ％<br />
            // - CP獲得ボーナス <font color="#f8f800">20</font> ％<br />
            // - 魔法致命打 <font color="#f8f800">+5</font>％<br>
    '</td></tr><tr><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>',
            // レベル 1000<br>
            // 知識 800<br>
            // カリスマ 400<br>
    '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>',
    // TODO
            // - 男性キャラクター専用アイテム
    '</td><td valign="top"><font color="#00f8f8">&lt;要求能力値&gt;</font><br>',
    // Nx時に変わるケースに注意
            // レベル 1000<br>
            // 知識 800<br>
            // カリスマ 400<br>
    '</td><td valign="top" colspan="4"><font color="#00f8f8">&lt;着用可能な職業&gt;</font><br>',
    // TODO
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
    var r1 = "";
    var r2 = "";
    // var a1 = parseInt(document.f.a1.value ? parseInt(document.f.a1.value) : "";
    var a1 = document.f.a1.value ? document.f.a1.value : "？？？";
    var a2 = document.f.a2.value ? document.f.a2.value : "0000";
    var a3 = document.f.a3.value ? document.f.a3.value : "- ";
    // if (sup === 99) {
    //     document.f.r1.value = "調査中";
    //     document.f.r2.value = "調査中";
    //     return;
    // }
    // if (sup === 0) {
    //     document.f.r1.value = 1;
    //     document.f.r2.value = 1;
    //     return;
    // }
    // if (sup === -1) {
    //     document.f.r1.value = "適正外";
    //     // document.f.r2.value = "適正外";
    //     return;
    // }

    // 頑張って描画
    var res_text = "";
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
        if (i == 4) {
            res_text += a2;
        }
        if (i == 11) {
            res_text += a3;
        }
    }
    // r2はr1の内容をDOM化して直接貼り付け
    document.f.r1.value = res_text;
    var prev_html = document.getElementById('preview_html');
    prev_html.innerHTML = '<p style="text-align: left">' + res_text + '</p>';

}

//％数値が返ってくるよ、後で1/100してね
//-1はレベル外、99は知らない
function def_celestial_sup(lv) {
    if (lv < 250) {
        return -1;
    }
    if (lv < 700) {
        return 25;
    }
    if (lv < 850) {
        return 99;
    }
    if (lv < 1160) {
        return (3.1 - (lv - 850) * 0.01);
    }
    if (lv >= 1160) {
        return 0;
    }
}


function calc_2005exp(lv) {
    var ans = 0;

    if (lv == 1) {
        ans = 250;
    } else if (lv == 2) {
        ans = 420;
    } else if (lv > 2) {
        i = 0;
        j = 0;
        lv = Math.floor(lv);
        i = Math.ceil((Math.sqrt(4 * lv + 1) - 3) / 2);
        j = lv - 2 - (i - 1) * (i + 2);
        ans = 170 * lv + 80 + (20 / 3) * (3 * (i + 1) * Math.pow(j, 2) + (5 * Math.pow(i, 3) + 9 * Math.pow(i, 2) + 16 * i - 9) * j + (2 * Math.pow(i, 5) + 5 * Math.pow(i, 4) + 12 * Math.pow(i, 3) - 8 * Math.pow(i, 2) - 17 * i + 6));
    } else {
        ans = 0;
    }
    return ans;
}
