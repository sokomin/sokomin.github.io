function init1() {
    // 何か初期値入れたいデータあれば
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}


const server_name = ["strasserad", "vaultish", "bridgehead"];

//CSVファイルを読み込む
function getCSV(date1, date2, server_name) {
    url1 = "https://sokomin.github.io/sokomin_repository/jpn_data/rs_change_server.csv";

    var req = new XMLHttpRequest();
    req.open("get", url1, true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(req.responseText, date1, date2, server_name);
    }

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
    return ""
}

var chart = '';

function createGraph(rs_change, date1, date2, sn) {
    // 鯖でフィルタリングした結果を格納する配列
    var filteredData = [];
    targetServer = convert_server_name(sn)
    // rs_change配列の要素を順番に処理する
    rs_change.forEach((data) => {
        // 鯖がtargetServerの場合のみ、filteredDataに追加する
        if (data[0] === targetServer) {
            filteredData.push(data);
        }
    });

    // 日時の配列と天上の配列を作成する
    var dateArray = [];
    var dateObjArray = [];
    var tenjouArray = [];
    var tikaArray = [];
    var akumaArray = [];
    for (var i = 0; i < filteredData.length; i++) {
        var data = filteredData[i];
        var dateObj = new Date(data[1]);
        var date_str = data[1];
        // var dateObj = moment(dateString, "YYYY/MM/DD").toDate();
        dateArray.push(date_str);
        dateObjArray.push(date_str);
        if (data[2] > 0 && data[3] > 0 && data[4] > 0) {
            tenjouArray.push(data[2]);
            tikaArray.push(data[3]);
            akumaArray.push(data[4]);
        }
    }
    // const dateArray = filteredData.map((data) => new Date(data[1]));
    // const tenjouArray = filteredData.map((data) => data[2]);

    // グラフを描画する
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(document.getElementById("myChart"), {
        type: "line",
        data: {
            labels: dateArray,
            datasets: [
                {
                    label: "天上",
                    data: tenjouArray,
                    backgroundColor: "rgba(32, 200, 245, 0.4)",
                    borderColor: "rgba(32, 200, 245, 2)",
                    borderWidth: 1,
                },
                {
                    label: "地下",
                    data: tikaArray,
                    backgroundColor: "rgba(245, 130, 32, 0.4)",
                    borderColor: "rgba(245, 130, 32, 2)",
                    borderWidth: 1,
                },
                {
                    label: "赤い悪魔",
                    data: akumaArray,
                    backgroundColor: "rgba(255, 0, 51, 0.4)",
                    borderColor: "rgba(255, 0, 51, 1)",
                    borderWidth: 1,
                },
            ],
        },
        // TODO 軸バグってる
        options: {
            scales: {
                xAxes: [{
                    type: 'time', // x軸のタイプを指定
                    time: {
                        displayFormats: {
                            day: 'YYYY/MM/DD' // 日単位の目盛りに表示する日付のフォーマットを指定
                        }
                    },
                    ticks: {
                        autoSkip: true, // 目盛りを自動的にスキップするように設定
                        maxRotation: 0, // 目盛りのラベルを回転させないように設定
                        minRotation: 0, // 目盛りのラベルを回転させないように設定
                        callback: function (value, index, values) {
                            return moment(value).format('YYYY/MM/DD'); // 目盛りの日付の表示形式を設定
                        }
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0, // 最小値を0に設定
                        max: 2000000, // 最大値を200万に設定
                        callback: function (value, index, values) {
                            return value.toLocaleString(); // 目盛りにカンマ区切りの数値を表示する
                        }
                    }
                }]
            }
        },
    });
}