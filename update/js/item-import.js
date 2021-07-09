
function calc2() {
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
