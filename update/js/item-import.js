
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
                nxop: [], //nxアイテムの場合
                lbop: [], //lbアイテムの場合
                req: [],
                job: [],
                // nxアイテムは扱わないのでスルーしたい…
                txt: "",
                system: "", // DropLv/係数
                price: "", //販売価格
                stack: 1, // スタック数
                type: "", //アイテムの種類(ここから職業を判定する)＋フィルタ用
            };
            var re;
            var phase = 0;
            for (var i = 0; i < data.length; i++) {
                var txt = data[i];
                var sys_txt = "";
                if (!txt || txt == "") {
                    continue;
                }
                // 初手は必ずitemで、Nxはスルーする
                if (item_info[key].name == "") {
                    if (txt.includes("[Nx]")) {
                        item_info[key] = {};
                        // TODO Nxは通常アイテムに結合させたい。(通常アイテムが先に出力される前提)
                        break;
                    }
                    var name = txt.split(" ");
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
                    var replace_txt = '<font color="#f8f800">$1</font>';
                    re = /(-?\d+(?:\.\d*)?)/g; //小数点・負の値にも対応してる
                    txt = txt.replace(re, replace_txt);
                    item_info[key].op.push(txt);
                }
                if (phase == 3) {
                    item_info[key].req.push(txt);
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
                        item_info[key].price = txt + '<font color="#f8f800">ゴールド</font>';
                    } else if (txt.includes("- Item Type: ")) {
                        txt = txt.replace("- Item Type: ", "");
                        item_info[key].item_type = txt;
                    }
                }
            }
            item_info[key].system = sys_txt
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
            var req_ary = item_info[key].req;
            var job_ary = item_info[key].job;
            var a5 = item_info[key].system;
            var a6 = item_info[key].price;
            var a7 = item_info[key].txt;
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
        // r2はr1の内容をDOM化して直接貼り付け
        document.import_form.import_field.value = res_text;
        var prev_html = document.getElementById('import_preview_html');
        prev_html.innerHTML = '<p style="text-align: left">' + res_text + '</p>';

        var warn_html = document.getElementById('warning_html');
        warn_html.innerHTML = '<p style="text-align: left">' + warn_text + '</p>';

    }
}
