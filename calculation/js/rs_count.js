function init1() {
    // 何か初期値入れたいデータあれば
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}


const server_name = ["strasserad", "vaultish", "bridgehead", "goldexperience"];
const rs_count_csv_urls = [
    "https://sokomin.github.io/sokomin_repository/jpn_data/rs_change_server.csv",
    "https://sokomin.github.io/sokomin_repository/jpn_data/rs_change_server_g2023.csv",
];

//CSVファイルを読み込む
function getCSV(date1, date2, server_name) {
    var requests = rs_count_csv_urls.map(function (url) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open("get", url, true);
            req.send(null);
            req.onload = function () {
                resolve(req.responseText);
            };
            req.onerror = function () {
                reject(url);
            };
        });
    });

    Promise.all(requests).then(function (csv_data) {
        convertCSVtoArray(csv_data.join("\n"), date1, date2, server_name);
    }).catch(function (url) {
        alert("CSV load failed: " + url);
    });

    // var request = [
    //     { url: url1 },
    // ];

    // var jqXHRList = [];

    // for (var i = 0; i < request.length; i++) {
    //     jqXHRList.push($.ajax({ // $.ajaxの戻り値を配列に格納
    //         url: request[i].url,
    //         type: 'GET',
    //     }));
    // }

    // $.when.apply($, jqXHRList).done(function () {
    //     var csv_data = [];
    //     var statuses = [];
    //     var jqXHRResultList = [];
    //     for (var i = 0; i < arguments.length; i++) {
    //         var result = arguments[i];
    //         csv_data.push(result[0]);
    //         statuses.push(result[1]);
    //         jqXHRResultList.push(result[3]);
    //     }

    //     //何とってきたかわからんとデバッグしづらいので…
    //     console.log(csv_data);
    //     convertCSVtoArray(csv_data, date1, date2, server_name);

    // });
}

var obj_format = { 0: "server", 1: "rs_date", 2: "tenzyo", 3: "tika", 4: "devil" };
var rank_now = {};　//表形式で出力する用

// obj_formatに沿って変換
function convertCSVtoArray(csv_data, date1, date2, server_name) {
    // フィルタリングしたい鯖の種類を指定する
    // 初期化
    rank_now = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var result_ary = [];
    var tmp = csv_data.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        if (i == 0) {
            continue;
        }
        var result = tmp[i].split(',')
        result_ary.push(result)
        var md = {};
        for (var j = 0; j < result.length; j++) {
            var txt = result[j];
            md[obj_format[j]] = txt;
        }
        rank_now[i] = md;
    }
    console.log(rank_now);

    createTable(date1, date2, server_name);
    createGraph(result_ary, date1, date2, server_name);
}

function calc1() {

    var a1 = $('input[name="a1"]').val();
    var a2 = $('input[name="a2"]').val();
    var date_a1 = getNowYMDStr(a1);
    var date_a2 = getNowYMDStr(a2);
    // どっちか空にすると全期間取得（いれるの面倒になった）
    if (!a1 || !a2) {
        a1 = "2008-05-01";
        a2 = "2040-05-01";
    }
    // これ以前はデータが存在しない
    var dy = new Date(2008, 03, 30);
    var sn = $('select[name="world"]').val() ? Number($('select[name="world"]').val()) : 0;

    var d1t = new Date(a1).getTime()
    var d2t = new Date(a2).getTime()
    var dyt = dy.getTime()
    if (d1t < dyt || d2t < dyt) {
        alert("指定NGの日付が含まれています");
        return;
    }

    // TODO 鯖間比較（all指定された場合）についても検討する

    if (date_a1 && date_a2) {
        getCSV(d1t, d2t, sn);
    } else {
        alert("日付入力フォーマットエラー");
    }
}


// 取得できたデータを一覧で表示してあげる
function createTable(date1, date2, server_name) {
    var $div_main = $('<div>');
    var cnt = 0; //セーフティをはっておく

    var $table = $('<table>').attr("id", "table14").css("text-align", "center")
        .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 80))
            .append($("<col>").attr("span", 1).attr("width", 120))
            .append($("<col>").attr("span", 1).attr("width", 200))
            .append($("<col>").attr("span", 1).attr("width", 120))
            .append($("<col>").attr("span", 1).attr("width", 80))
            .append($("<col>").attr("span", 1).attr("width", 200))
        );

    var $th_info = $('<tr>');
    var quest_title = "<th>鯖</th><th>日時</th><th>天上</th><th>地下</th><th>赤い悪魔</th><th>備考</th>"
    $th_info.append(quest_title);
    $table.append($th_info);

    for (var i in rank_now) {
        if (cnt >= 2000) {
            console.log("2000件以上はhtml重くて出せないよ");
            break;
        }
        var data = rank_now[i];
        if (!data["server"] || !data["rs_date"]) {
            continue;
        }
        var date_comp = new Date(data["rs_date"]).getTime()
        if (date1 <= date_comp && date_comp <= date2) {
        } else {
            continue;
        }
        if (check_server_name(server_name, data["server"])) {

        } else {
            continue;
        }

        // 差分とか出したい
        diff = '<font color="red">-</font>';
        var $rp = $('<tr>');
        var user_data = "<td>" + data["server"] + "</td><td>" + data["rs_date"] + "</td><td>" + data["tenzyo"] + "</td><td>" + data["tika"] + "</td><td>" + data["devil"] + "</td><td>" + diff + "</td>";
        $rp.append(user_data);
        $table.append($rp);
        cnt++;
    }

    $div_main.append($table);
    $div_main.append("<br><br>");

    $("#preview_html").empty().append($div_main);

}


function check_server_name(sn, id) {
    if (id == "s" && sn == 0) {
        return true
    }
    if (id == "v" && sn == 1) {
        return true
    }
    if (id == "b" && sn == 2) {
        return true
    }
    if (id == "g" && sn == 3) {
        return true
    }
    return false
}


function convert_server_name(sn, id) {
    if (sn == 0) {
        return "s"
    }
    if (sn == 1) {
        return "v"
    }
    if (sn == 2) {
        return "b"
    }
    if (sn == 3) {
        return "g"
    }
    return ""
}

var chart = '';

function parseRsCountDate(value) {
    var match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?$/.exec(String(value).trim());
    if (!match) {
        return null;
    }

    return new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
        Number(match[4] || 0),
        Number(match[5] || 0)
    ).getTime();
}

function createGraphSeries(label, color, values) {
    return {
        label: label,
        data: values.sort(function (a, b) { return a.x - b.x; }),
        backgroundColor: color.background,
        borderColor: color.border,
        borderWidth: 1,
        pointRadius: 2,
        pointHoverRadius: 5,
        tension: 0,
    };
}

function createGraph(rs_change, date1, date2, sn) {
    var targetServer = convert_server_name(sn);
    var values = [[], [], []];

    rs_change.forEach(function (data) {
        if (data[0] !== targetServer) {
            return;
        }

        var x = parseRsCountDate(data[1]);
        if (x === null || x < date1 || x > date2) {
            return;
        }

        for (var i = 0; i < values.length; i++) {
            var y = Number(data[i + 2]);
            if (Number.isFinite(y) && y > 0) {
                values[i].push({ x: x, y: y });
            }
        }
    });

    if (chart) {
        chart.destroy();
    }
    chart = new Chart(document.getElementById("myChart"), {
        type: "line",
        data: {
            datasets: [
                createGraphSeries("天上", { background: "rgba(32, 200, 245, 0.4)", border: "rgba(32, 200, 245, 2)" }, values[0]),
                createGraphSeries("地下", { background: "rgba(245, 130, 32, 0.4)", border: "rgba(245, 130, 32, 2)" }, values[1]),
                createGraphSeries("赤い悪魔", { background: "rgba(255, 0, 51, 0.4)", border: "rgba(255, 0, 51, 1)" }, values[2]),
            ],
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    ticks: {
                        maxTicksLimit: 12,
                        maxRotation: 0,
                        minRotation: 0,
                        callback: function (value) {
                            return new Date(Number(value)).toLocaleDateString('ja-JP');
                        }
                    }
                },
                y: {
                    min: 0,
                    max: 2000000,
                    ticks: {
                        callback: function (value) {
                            return Number(value).toLocaleString();
                        }
                    }
                }
            }
        },
    });
}