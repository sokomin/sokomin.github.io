function getItemJson() {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/calculation/js/item/itemData.json", true);
    req.overrideMimeType('text/plain; charset=Shift_JIS');
    req.send(null);
    req.onload = function () {
        convertJson(req.responseText);
    }
}

function init1() {
    getItemJson();
}

var item_data = {};
const chara_code = {
    // 0: { name: "アイテム着用レベル -[数値]", },
    0: { name: "剣士", },
    1: { name: "戦士", },
    2: { name: "ウィザード", },
    3: { name: "ウルフマン", },
    4: { name: "ビショップ", },
    5: { name: "追放天使", },
    6: { name: "シーフ", },
    7: { name: "武道家", },
    8: { name: "ランサー", },
    9: { name: "アーチャー", },
    10: { name: "ビーストテイマー", },
    11: { name: "サマナー", },
    12: { name: "プリンセス", },
    13: { name: "リトルウィッチ", },
    14: { name: "ネクロマンサー", },
    15: { name: "悪魔", },
    16: { name: "霊術師", },
    17: { name: "闘士", },
    18: { name: "光奏師", },
    19: { name: "獣人", },
    20: { name: "メイド", },
    21: { name: "黒魔術師", },
    22: { name: "マスケッティア", },
    23: { name: "アルケミスト", },
};


function convertJson(itemJson) {
    item_data = JSON.parse(itemJson);
    console.log(item_data);
    var j0dom = document.getElementById("jobtype");
    var d0dom = document.getElementById("sub_0");
    var d1dom = document.getElementById("sub_1");
    var d2dom = document.getElementById("sub_2");
    var d3dom = document.getElementById("sub_3");
    var d4dom = document.getElementById("sub_4");
    var d5dom = document.getElementById("sub_5");
    var d6dom = document.getElementById("sub_6");
    var d7dom = document.getElementById("sub_7");
    var d8dom = document.getElementById("sub_8");
    var d9_1dom = document.getElementById("sub_9_1");
    var d9_2dom = document.getElementById("sub_9_2");
    var d9_3dom = document.getElementById("sub_9_3");
    var d9_4dom = document.getElementById("sub_9_4");
    var d9_5dom = document.getElementById("sub_9_5");
    var d9_6dom = document.getElementById("sub_9_6");
    var d9_7dom = document.getElementById("sub_9_7");
    var d9_8dom = document.getElementById("sub_9_8");
    var d9_9dom = document.getElementById("sub_9_9");
    var d9_10dom = document.getElementById("sub_9_10");
    for(var index in chara_code){
        var elements = document.createElement('option');
        elements.setAttribute('value', index);
        elements.innerHTML = chara_code[index].name;
        j0dom.appendChild(elements);
    };

    item_data.forEach(function (e, index) {
        // 初手では剣士のデータを出力
        // document.optionlist.a2.options[index] = new Option(e.Type, e.Id);
        let elements = document.createElement('option');
        elements.setAttribute('value', e.Id);
        elements.innerHTML = e.Name;
        switch (e.Type) {
            case 18:
            // case 19:以降はタブ変わったら出す
                d0dom.appendChild(elements);
                break;
            // case 12: タブ変わったら表示
            // case 13:
            // case 14:
            // case 15:
            case 19:
                d1dom.appendChild(elements);
                break;
            case 8:
                d2dom.appendChild(elements);
                break;
            case 0:
            case 1:
                d3dom.appendChild(elements);
                break;
            case 10:
            case 11:
                d4dom.appendChild(elements);
                break;
            case 6:
                d5dom.appendChild(elements);
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                d6dom.appendChild(elements);
                break;
            case 16:
            case 17:
                d7dom.appendChild(elements);
                break;
            case 7:
                d8dom.appendChild(elements);
                break;
            case 9:
                // FIXME cloneってどうやるんだっけ
                d9_1dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_2dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_3dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_4dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_5dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_6dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_7dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_8dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_9dom.appendChild(elements);
                elements = document.createElement('option');
                elements.setAttribute('value', e.Id);
                elements.innerHTML = e.Name;
                d9_10dom.appendChild(elements);
                break;
            default:
                break;
        }
    });
}
