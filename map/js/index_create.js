
// テーブルを頑張って作る係
var npc_doc = '<table id="table10" style="max-width: 860px;">';
npc_doc = npc_doc + '<colgroup><col span="1" width="5%" /><col span="1" width="56%" /><col span="1" width="24%" />'
+ '<col span="1" width="6%" /><col span="1" width="6%" /><col span="1" width="6%" /></colgroup><tbody>';
npc_doc = npc_doc + '<tr><th colspan="6">マップ一覧</th></tr>';
// npc_doc = npc_doc + '<tr><th>連動</th><th>マップ名</th><th>適正Lv</th></tr>';

map_c = getParam('map_c') ? getParam('map_c') : "";
map_c2 = getParam('map_c2') ? getParam('map_c2') : "";
map_c3 = getParam('map_c3') ? getParam('map_c3') : "";

// 既存の map_c, map_c2, map_c3 を取得するあたりの直後に追加
var levelMin = getParam('level_min') ? Number(getParam('level_min')) : 0;
var levelMax = getParam('level_max') ? Number(getParam('level_max')) : 9999;
var normalMonstersOnly = getParam('normal_monsters') === '1';

function normalizeSearchText(value) {
    return String(value || "").normalize("NFKC").replace(/[\s\u3000]+/g, "").toLowerCase();
}

function stripHtml(value) {
    return String(value || "").replace(/<[^>]*>/g, "");
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function createMapConditionTerms(SubInfoObj) {
    var terms = [];
    if (!SubInfoObj) {
        return terms;
    }
    if (SubInfoObj.req_map_lv > 0) {
        terms.push("必要 マップ製作者Lv " + SubInfoObj.req_map_lv);
    }
    [
        ["dfi", "火属性抵抗低下"],
        ["dwa", "水属性抵抗低下"],
        ["dwi", "風属性抵抗低下"],
        ["dea", "大地属性抵抗低下"],
        ["dli", "光属性抵抗低下"],
        ["dda", "闇属性抵抗低下"],
        ["st_down", "ステータス低下"],
        ["lbd", "抵抗上限"]
    ].forEach(function (item) {
        if (SubInfoObj[item[0]] > 0) {
            terms.push(item[1] + " " + SubInfoObj[item[0]] + "％");
        }
    });
    return terms;
}

function createMapDetailTerms(key, SubInfoObj) {
    var terms = MapSearchIndex[key] ? MapSearchIndex[key].slice() : [];
    var extraInfo = MapExtraInfoList[key];
    if (extraInfo && extraInfo.length) {
        extraInfo.forEach(function (value) {
            terms.push(stripHtml(value));
        });
    }
    return terms.concat(createMapConditionTerms(SubInfoObj));
}

var mapKeywords = String(getParam('map_name') || "")
    .normalize("NFKC")
    .trim()
    .split(/[\s\u3000]+/)
    .filter(function (value) { return value; })
    .map(normalizeSearchText);
var resultCount = 0;

for (key in NameList) {
    var Obj = NameList[key];
    var SubInfoObj = MapSubInfoList[key];
    var detailTerms = createMapDetailTerms(key, SubInfoObj);
    var normalizedSearchTarget = [Obj.name].concat(detailTerms).map(normalizeSearchText).join(" ");

    // マップ名と詳細情報を対象に、複数キーワードのAND検索を行う
    if (mapKeywords.some(function (keyword) { return normalizedSearchTarget.indexOf(keyword) === -1; })) {
        continue;
    }

    // —— ここでレベル帯フィルタ —— 
    var LvMin = Obj.lvmin || 0;
    var LvMax = Obj.lvmax || 0;
    // 「入力範囲と重複しない」場合はスキップ（重複があるマップのみ表示）
    if (LvMax < levelMin || LvMin > levelMax) {
        continue;
    }
    // 最小レベルが0のマップはレベル帯が表示されないのでレベルフィルタ発動時には確定で非表示
    if (LvMin == 0 && levelMin > 0) {
        continue;
    }
    // 適正レベルと出現情報が登録されているマップを一般モンスター出現マップとして扱う
    if (normalMonstersOnly && (!(LvMin > 0 && LvMax > 0) || !MapSearchIndex[key] || !MapSearchIndex[key].length)) {
        continue;
    }

    if (map_c) {
        if (SubInfoObj && SubInfoObj.mc &&SubInfoObj.mc === map_c) {
            //マップでフィルタかけたい時
        } else {
            continue;
        }
    } 
    if (map_c2) {
        if (SubInfoObj && SubInfoObj.mc2 &&SubInfoObj.mc2 === Number(map_c2)) {
            //新連動マップでフィルタかけたい時
        } else {
            continue;
        }
    } 
    if (map_c3) {
        if (SubInfoObj && SubInfoObj.mc3 &&SubInfoObj.mc3 === Number(map_c3)) {
            //新連動マップでフィルタかけたい時
        } else {
            continue;
        }
    } 
    var LvMin = Obj.lvmin;
    var LvMax = Obj.lvmax;
    if (key % 100 === 0) {
        npc_doc = npc_doc + '<tr><th>P</th><th>マップ名</th><th>適正Lv</th><th>連動</th><th>連動2022</th><th>連動2025</th></tr>';
    }
    var key_num = parseInt(key);
    if (key_num === 27 || key_num === 28 || key_num === 438 || key_num === 555 || key_num === 799 || key_num === 801 || key_num === 9999) {
        // デバッグ用マップはリストには出さない
        continue;
    } else {
        resultCount++;
        var plemiun = Obj.plemiun ? "[P]" : "-";
        var rendou = SubInfoObj && SubInfoObj.mc ? SubInfoObj.mc : "?";
        var rendou2 = SubInfoObj && SubInfoObj.mc2 ? SubInfoObj.mc2 : "?";
        var rendou3 = SubInfoObj && SubInfoObj.mc3 ? SubInfoObj.mc3 : "?";
        var matchedDetails = [];
        if (mapKeywords.length) {
            matchedDetails = detailTerms.filter(function (term) {
                var normalizedTerm = normalizeSearchText(term);
                return mapKeywords.some(function (keyword) { return normalizedTerm.indexOf(keyword) !== -1; });
            }).slice(0, 3);
        }
        npc_doc = npc_doc + '<tr><td>' + plemiun + '</td>';
        npc_doc = npc_doc + '<td><a href="../map/map_viewer.html?map_id=' + key_num + '">' + Obj.name + '</a>';
        if (matchedDetails.length) {
            npc_doc = npc_doc + '<br><span style="font-size:12px;">一致: ' +
                matchedDetails.map(escapeHtml).join(" / ") + '</span>';
        }
        npc_doc = npc_doc + '</td>';
        // レベル帯
        if (LvMin && LvMax) {
            npc_doc = npc_doc + '<td>' + LvMin + '～' + LvMax + ' </td>';
        } else {
            npc_doc = npc_doc + '<td> - </td>';
        }
        npc_doc = npc_doc + '<td>' + createRendouColor(rendou) + '</td>';
        npc_doc = npc_doc + '<td>' + createRendou2Color(rendou2) + '</td>';
        npc_doc = npc_doc + '<td>' + createRendou3Color(rendou3) + '</td>';
        npc_doc = npc_doc + '</tr>';
    }
}

npc_doc = npc_doc + '</tbody></table>';
//NPCやモンスター名全部かくよ
var npc_table = document.getElementById('map_index');
npc_table.innerHTML = npc_doc;
var resultCountElement = document.getElementById('map_result_count');
if (resultCountElement) {
    resultCountElement.textContent = "該当 " + resultCount + " 件";
}

//map_listの方で表示用なので番号とアルファベットだけ
function createRendouColor(rendou) {
    switch (rendou) {
        case "A":
            return '<span class="color-image1">' + rendou + '</span>'
        case "B":
            return '<span class="color-image2">' + rendou + '</span>'
        case "C":
            return '<span class="color-image11">' + rendou + '</span>'
        case "D":
            return '<span class="color-image4">' + rendou + '</span>'
        case "E":
            return '<span class="color-image8">' + rendou + '</span>'
        default:
            return rendou;
    }
}

function createRendou2Color(rendou) {
    switch (rendou) {
        case 1:
            return '<span class="color-image1">' + rendou + '</span>'
        case 2:
            return '<span class="color-image2">' + rendou + '</span>'
        case 3:
            return '<span class="color-image3">' + rendou + '</span>'
        case 4:
            return '<span class="color-image4">' + rendou + '</span>'
        case 5:
            return '<span class="color-image5">' + rendou + '</span>'
        case 6:
            return '<span class="color-image6">' + rendou + '</span>'
        case 7:
            return '<span class="color-image7">' + rendou + '</span>'
        case 8:
            return '<span class="color-image8">' + rendou + '</span>'
        case 9:
            return '<span class="color-image9">' + rendou + '</span>'
        case 10:
            return '<span class="color-image10">' + rendou + '</span>'
        case 11:
            return '<span class="color-image11">' + rendou + '</span>'
        case 12:
            return '<span class="color-image12">' + rendou + '</span>'
        default:
            return rendou;
    }
}



function createRendou3Color(rendou) {
    switch (rendou) {
        case 1:
            return '<span class="color-image1">' + rendou + '</span>'
        case 2:
            return '<span class="color-image2">' + rendou + '</span>'
        case 3:
            return '<span class="color-image3">' + rendou + '</span>'
        case 4:
            return '<span class="color-image4">' + rendou + '</span>'
        case 5:
            return '<span class="color-image5">' + rendou + '</span>'
        case 6:
            return '<span class="color-image7">' + rendou + '</span>'
        case -1:
            return '<span class="color-image6">' + rendou + '</span>'
        default:
            return rendou;
    }
}
