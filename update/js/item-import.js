
function calc2(evt) {
    var file = document.getElementById('files').files;

    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
    var item_info = {};
    //読込終了後の処理
    reader.onload = function(ev){
      //テキストエリアに表示する
        // 構造解析
        var item_data = reader.result;
        var lines = item_data.split(/-------------------------------------------------------------------------------/);
        var idx = 0;
        var items = {};
        for (var i = 0; i < lines.length; i++) {
            items[idx] = lines[i].split(/\r?\n/);
            idx++;
        }
        console.log(items);

        // アイテムを調べる
        for (var key in items) {
            var data = items[key];
            item_info[key] = {
                name: "",
                image_id: "0000",
                op: [],
                nxop: [], //nxアイテムの場合：OP変動
                lbop: [], //nxアイテムの場合：封印解放
                req: [],
                reqnx: [], //nxアイテムの要求値
                job: [],
                // nxアイテムは扱わないのでスルーしたい…
                txt: "",
                system: "", // DropLv/係数
                price: "", //販売価格
                nxsystem: "",　// Nxのドロップ係数
                nxprice: "", //Nx販売価格
                stack: 1, // スタック数
                type: "", //アイテムの種類(ここから職業を判定する)＋フィルタ用
            };
            var nx_subkey = null;
            var re;
            var phase = 0;
            var sys_txt = "";
            for (var i = 0; i < data.length; i++) {
                var txt = data[i];
                if (!txt || txt == "") {
                    continue;
                }
                // 初手は必ずitemで、Nxはスルーする
                if (item_info[key].name == "") {
                    var name = txt.split(" ");
                    re = /\[Nx\]/; //$一番後ろにつけてもうまくいかないので何か変な文字入ってること多い
                    if (re.test(name[2])) {
                        for (var nxkey in item_info) {
                            var nxname = name[2].split("[Nx]")[0];
                            if (item_info[nxkey].name == nxname && !item_info[nxkey].is_nx) {
                                item_info[nxkey].is_nx = true;
                                nx_subkey = nxkey;
                                break;
                            }
                        }
                        // item_info[key] = {};
                        // TODO Nxは通常アイテムに結合させたい。(通常アイテムが先に出力される前提)
                        // break;
                    }
                    item_info[key].image_id = ( '0000' + name[1] ).slice( -4 );
                    item_info[key].name = name[2];
                    phase = 1;
                }
                // TODO 取引不可とかその辺りの情報も自動で仕込みたい
                if (txt.includes("<基本情報>")) {
                    phase = 2;
                    continue;
                } else if (txt.includes("<要求能力値>")) {
                    phase = 3;
                    continue;
                } else if (txt.includes("<錬成 オプション 情報>")) {
                    phase = 25;
                    continue;
                } else if (txt.includes("<着用可能な職業>")) {
                    phase = 4;
                    continue;
                } else if (txt.includes("<説明>")) {
                    phase = 5;
                    continue;
                } else if (txt.includes("<System>")) {
                    phase = 6;
                    continue;
                }
                if (phase == 2) {
                    re=/#[0-9]: /g;
                    txt = txt.replace(re, "");
                    txt = txt.replace("*", "-");

                    // 変な文字を消す
                    re = /<(.*?)>/g;
                    txt = txt.replace(re, "");
                    // 職専用スキルレベル変換
                    re = /(\- )(.*?)\(([0-9]+)(系列職業)\)/;
                    if (re.test(txt)) {
                        var job = chara_code[txt.match(/[0-9]+/g)[1]].name;
                        // var replace_skill = '<font color="#f8f800">'+job+'</font> $1'
                        var replace_skill = '$1' + job + ' $2';
                        txt = txt.replace(re,replace_skill);
                    }

                    var replace_txt = '<font color="#f8f800">$1</font>';
                    re = /(-?\d+(?:\.\d*)?)/g; //小数点・負の値にも対応してる
                    txt = txt.replace(re, replace_txt);
                    if (nx_subkey) {
                        item_info[nx_subkey].nxop.push(txt);
                    } else {
                        item_info[key].op.push(txt);
                    }
                }
                if (phase == 25) {
                    re=/#[0-9]: /g;
                    txt = txt.replace(re, "");
                    txt = txt.replace("*", "-");

                    // 変な文字を消す
                    re = /<(.*?)>/g;
                    txt = txt.replace(re, "");
                    // 職専用スキルレベル変換
                    re = /(\- )(.*?)\(([0-9]+)(系列職業)\)/;
                    if (re.test(txt)) {
                        var job = chara_code[txt.match(/[0-9]+/g)[1]].name;
                        // var replace_skill = '<font color="#f8f800">'+job+'</font> $1'
                        var replace_skill = '$1' + job + ' $2';
                        txt = txt.replace(re,replace_skill);
                    }
                    
                    var replace_txt = '<font color="#f8f800">$1</font>';
                    re = /(-?\d+(?:\.\d*)?)/g; //小数点・負の値にも対応してる
                    txt = txt.replace(re, replace_txt);
                    if (nx_subkey) {
                        item_info[nx_subkey].lbop.push(txt);
                    } else {
                        item_info[key].lbop.push(txt);
                    }
                    // item_info[nx_subkey].lbop.push(txt);
                }
                if (phase == 3) {
                    if (nx_subkey) {
                        item_info[nx_subkey].reqnx.push(txt);
                    } else {
                        item_info[key].req.push(txt);
                    }
                }
                if (phase == 4) {
                    item_info[key].job.push(txt);
                }
                if (phase == 5) {
                    item_info[key].txt += txt;
                    item_info[key].txt += "<br>";
                    if (txt == "※ 封印された力を解放するには 封印解放道具箱 が必要です") {
                        item_info[key].txt += '<font color="#ef6cef">※ 封印された力を解放するには</font> <font color="#e8c898">封印解放道具箱</font> <font color="#ef6cef">が必要です</font><br>';
                    }
                }
                if (phase == 6) {
                    if (txt.includes("- Drop Level: ")) {
                        txt = txt.replace("- Drop Level: ", "");
                        sys_txt += txt;
                        sys_txt += "/";
                    } else if (txt.includes("- Drop Factor: ")) {
                        txt = txt.replace("- Drop Factor: ", "");
                        sys_txt += txt;
                    } else if (txt.includes("- Stack Size: ")) {
                        txt = txt.replace("- Stack Size: ", "");
                        if (Number(txt) > 1) {
                            sys_txt += "<br>";
                            sys_txt += txt;
                            item_info[key].stack = txt;
                        }
                    } else if (txt.includes("- Item Price: ")) {
                        txt = txt.replace("- Item Price: ", "");
                        // TODO 補正値とかありそう
                        if (nx_subkey) {
                            item_info[nxkey].nxprice = '<font color="#f8f800">' + txt + '</font> Gold<br>';
                        } else {
                            item_info[key].price = '<font color="#f8f800">' + txt + '</font> Gold<br>';
                        }
                    } else if (txt.includes("- Item Type: ")) {
                        txt = txt.replace("- Item Type: ", "");
                        item_info[key].item_type = txt;
                    } else if (txt.includes("- Required Job: ")) {
                        txt = txt.replace("- Required Job: ", "");
                        item_info[key].job = create_joblist(txt);
                    }
                }
            }
            if (nx_subkey) {
                item_info[nxkey].nxsystem = sys_txt;
            } else {
                item_info[key].system = sys_txt;
            }
            // Nxアイテムは後続の処理で邪魔になるので削除しておく
            if (nx_subkey) {
                item_info[key] = {};
            }
        }
        console.log(item_info);

        var warn_text = "";
        var res_text = "";
        for (var key in item_info) {
            if (!item_info[key] || !item_info[key].name) {
                continue;
            }
            var a1 = item_info[key].name;
            var a2 = item_info[key].image_id;
            var nop_ary = item_info[key].op;
            var nxop_ary = item_info[key].nxop;
            var lbop_ary = item_info[key].lbop;
            var req_ary = item_info[key].req;
            var reqnx_ary = item_info[key].reqnx;
            var job_ary = item_info[key].job;
            var a5 = item_info[key].system;
            var a6 = item_info[key].price;
            var a7 = item_info[key].txt;
            var a13 = item_info[key].nxsystem;
            var a14 = item_info[key].nxprice;
            if (item_info[key].is_nx) {
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
                    if (i == 3 && nop_ary && nop_ary.length > 0) {
                        // for文で回すなりして頑張る
                        for (var j = 0; j < nop_ary.length; j++) {
                            res_text += nop_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 4) {
                        res_text += a2;
                    }
                    if (i == 5 && nxop_ary && nxop_ary.length > 0) {
                        // for文で回すなりして頑張る
                        for (var j = 0; j < nxop_ary.length; j++) {
                            res_text += nxop_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 6 && lbop_ary && lbop_ary.length > 0) {
                        // for文で回すなりして頑張る
                        for (var j = 0; j < lbop_ary.length; j++) {
                            res_text += lbop_ary[j];
                            res_text += "<br>";
                        }
                    }

                    if (i == 7 && req_ary && req_ary.length > 0) {
                        for (var j = 0; j < req_ary.length; j++) {
                            res_text += req_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 8 && job_ary && job_ary.length > 0) {
                        // TODO 職業も出したい
                        for (var j = 0; j < job_ary.length; j++) {
                            res_text += job_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 9 && reqnx_ary && reqnx_ary.length > 0) {
                        for (var j = 0; j < reqnx_ary.length; j++) {
                            res_text += reqnx_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 10 && job_ary && job_ary.length > 0) {
                        // TODO 職業も出したい
                        for (var j = 0; j < job_ary.length; j++) {
                            res_text += job_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 11) {
                        res_text += a5;
                    }
                    if (i == 12) {
                        res_text += a6;
                    }
                    if (i == 13) {
                        res_text += a13;
                    }
                    if (i == 14) {
                        res_text += a14;
                    }
                    if (i == 15) {
                        res_text += a7;
                    }
                }
    
            } else {
                for (var i = 0; i < single_html_txt.length; i++) {
                    res_text += single_html_txt[i];
                    if (i == 0) {
                        res_text += a1;
                    }
                    if (i == 1) {
                        res_text += a2;
                    }
                    if (i == 2 && nop_ary && nop_ary.length > 0) {
                        // for文で回すなりして頑張る
                        for (var j = 0; j < nop_ary.length; j++) {
                            res_text += nop_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 3 && req_ary && req_ary.length > 0) {
                        for (var j = 0; j < req_ary.length; j++) {
                            res_text += req_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 4 && job_ary && job_ary.length > 0) {
                        // TODO 職業も出したい
                        for (var j = 0; j < job_ary.length; j++) {
                            res_text += job_ary[j];
                            res_text += "<br>";
                        }
                    }
                    if (i == 5) {
                        res_text += a5;
                    }
                    if (i == 6) {
                        res_text += a6;
                    }
                    if (i == 7) {
                        res_text += a7;
                    }
                }
            }
        }
        // r2はr1の内容をDOM化して直接貼り付け
        document.import_form.import_field.value = res_text;
        var prev_html = document.getElementById('import_preview_html');
        prev_html.innerHTML = '<p style="text-align: left">' + res_text + '</p>';

        var warn_html = document.getElementById('warning_html');
        warn_html.innerHTML = '<p style="text-align: left">' + warn_text + '</p>';

    }
}

// 20-3: 女性専用
// 20-4: 男性専用
// ※両方1の場合は性別制限なし

// 22-1: 武道家
// 22-2: シーフ
// 22-3: 追放天使
// 22-4: ビショップ
// 22-5: ウルフマン
// 22-6: ウィザード
// 22-7: 戦士
// 22-8: 剣士

// 23-1: 悪魔
// 23-2: ネクロマンサー
// 23-3: リトルウィッチ
// 23-4: プリンセス
// 23-5: サマナー
// 23-6: ビーストテイマー
// 23-7: アーチャー
// 23-8: ランサー

// 24-1: アルケミスト
// 24-2: マスケッティア
// 24-3: 黒魔術師
// 24-4: メイド
// 24-5: 獣人
// 24-6: 光奏師
// 24-7: 闘士
// 24-8: 霊術師
// ※1ブロックに1が7つ以上並んでる所はスルーした方がいい。
// (22と23が11111111なら職制限無しでいいかも、最初期は16職構成だったからここ2つが全部1->制限無しって実装してるんだと思う)

// 大体決め打ちの着用可能な職業リスト
function create_joblist(txt){
    var res = [];
    var all_flag = 0; //2なら全部装備可能
    txt = txt.split(" ");
    if(txt)
    for (var i = 0; i < 4; i++) {
        var val = Number(txt[i]);
        var sub = reverse(val.toString(2)); // リトルエンディアンで
        if (i == 0) {
            var a = sub.substr(4,2);
            if (a == '01') {
                res.push("- 女性キャラクター専用アイテム");
                break;
            } else if (a == '10') {
                res.push("- 男性キャラクター専用アイテム");
                break;
            }
        }
        if (i == 1) {
            if (sub == '11111111') {
                all_flag++;
                continue;
            }
            for (var j = 0; j < sub.length; j++) {
                var a = sub.substr(j,1);
                if (a == "1") {
                    res.push("- " + chara_code[j].name);
                }
            }
        }
        if (i == 2) {
            if (sub == '11111111') {
                all_flag++;
                if (all_flag >= 2) {
                    break;
                }
            }
            for (var j = 0; j < sub.length; j++) {
                var a = sub.substr(j,1);
                if (a == "1") {
                    res.push("- " + chara_code[j + 8].name);
                }
            }
        }
        if (i == 3) {
            for (var j = 0; j < sub.length; j++) {
                var a = sub.substr(j,1);
                if (a == "1") {
                    res.push("- " + chara_code[j + 16].name);
                }
            }
        }
    }
    return res;
}

// 8bitリトルエンディアン
function reverse(s) {
    s = ('00000000' + s).slice(-8);
    return s.split("").reverse().join("");
}