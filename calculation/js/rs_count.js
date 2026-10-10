const server_name = ["strasserad", "vaultish", "bridgehead", "goldexperience"];
const rs_count_data_root = "https://sokomin.github.io/sokomin_repository/jpn_data/";
const rs_count_csv_urls = [rs_count_data_root + "rs_change_server.csv"];
const rs_count_gold_catalog_url = rs_count_data_root + "rs_change_gold_seasons.json";
var rank_now = [];
var chart = null;
var rs_count_request = 0;

function init1() {}
function init2() {}

function setRsCountStatus(message) {
    var element = document.getElementById("rs_count_status");
    if (element) element.textContent = message;
}

function clearRsCountResult() {
    rank_now = [];
    document.getElementById("preview_html").replaceChildren();
    if (chart) chart.destroy();
    chart = null;
}

function loadRsCountText(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.timeout = 20000;
        request.onload = function () {
            if (request.status >= 200 && request.status < 300 && request.responseText.trim()) {
                resolve(request.responseText);
            } else {
                reject(new Error("個数データを読み込めませんでした。再度取得してください。"));
            }
        };
        request.onerror = request.ontimeout = function () {
            reject(new Error("個数データを読み込めませんでした。再度取得してください。"));
        };
        request.send(null);
    });
}

function parseRsCountDate(value) {
    var match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(String(value).trim());
    if (!match) return null;
    var parts = match.slice(1).map(function (part) { return Number(part || 0); });
    var date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
    if (date.getFullYear() !== parts[0] || date.getMonth() !== parts[1] - 1 ||
        date.getDate() !== parts[2] || date.getHours() !== parts[3] ||
        date.getMinutes() !== parts[4] || date.getSeconds() !== parts[5]) return null;
    return date.getTime();
}

function parseRsCountCSV(text) {
    var rows = [];
    var headerSeen = false;
    String(text).replace(/^\uFEFF/, "").split(/\r?\n/).forEach(function (line) {
        if (!line.trim()) return;
        var fields = line.split(",").map(function (value) { return value.trim(); });
        if (fields.join(",") === "鯖,日時,天上,地下,悪魔") {
            headerSeen = true;
            return;
        }
        if (!headerSeen || fields.length !== 5 || !/^[bvsg]$/.test(fields[0]) ||
            parseRsCountDate(fields[1]) === null || fields.slice(2).some(function (value) {
                return !(/^\d+$/.test(value) || (fields[0] !== "g" && value === "-1")) || !Number.isSafeInteger(Number(value));
            })) throw new Error("個数データの形式を確認できませんでした。");
        rows.push(fields);
    });
    if (!headerSeen || !rows.length) throw new Error("個数データの形式を確認できませんでした。");
    return rows;
}

function parseGoldCatalog(text) {
    var value = JSON.parse(text);
    if (!value || value.schema_version !== 1 || !Array.isArray(value.seasons) || !value.seasons.length) {
        throw new Error("金鯖の取得年度を確認できませんでした。");
    }
    var seen = new Set();
    value.seasons.forEach(function (season) {
        if (!Number.isInteger(season.year) || season.year < 2000 || season.year > 9999 ||
            season.csv !== "rs_change_server_g" + season.year + ".csv" || seen.has(season.year)) {
            throw new Error("金鯖の取得年度を確認できませんでした。");
        }
        seen.add(season.year);
    });
    return value.seasons.slice().sort(function (a, b) { return a.year - b.year; });
}

function validateGoldRows(rows, year) {
    var sorted = rows.slice().sort(function (a, b) { return parseRsCountDate(a[1]) - parseRsCountDate(b[1]); });
    var previous = null;
    sorted.forEach(function (row) {
        var timestamp = parseRsCountDate(row[1]);
        if (row[0] !== "g" || new Date(timestamp).getFullYear() !== year ||
            (previous && (timestamp === parseRsCountDate(previous[1]) || row.slice(2).some(function (value, index) {
                return Number(value) < Number(previous[index + 2]);
            })))) throw new Error("金鯖の年度別データを確認できませんでした。");
        previous = row;
    });
    return sorted;
}

function check_server_name(sn, id) { return convert_server_name(sn) === id; }
function convert_server_name(sn) { return ["s", "v", "b", "g"][Number(sn)] || ""; }

function selectedRsCountRows(rows, date1, date2, sn) {
    return rows.filter(function (row) {
        var timestamp = parseRsCountDate(row[1]);
        return row[0] === convert_server_name(sn) && timestamp !== null && timestamp >= date1 && timestamp <= date2;
    }).sort(function (a, b) { return parseRsCountDate(a[1]) - parseRsCountDate(b[1]); });
}

function goldYearSummaries(rows) {
    var groups = new Map();
    rows.forEach(function (row) {
        var year = new Date(parseRsCountDate(row[1])).getFullYear();
        if (!groups.has(year)) groups.set(year, []);
        groups.get(year).push(row);
    });
    return Array.from(groups.keys()).sort().map(function (year) {
        var records = validateGoldRows(groups.get(year), year);
        var first = records[0], last = records[records.length - 1];
        return { year: year, first: first[1], last: last[1], observations: records.length,
            latest: last.slice(2).map(Number),
            growth: records.length > 1 ? last.slice(2).map(function (value, index) {
                return Number(value) - Number(first[index + 2]);
            }) : null };
    });
}

function createRsCountTable(headers, rows, id) {
    var table = document.createElement("table");
    table.id = id;
    table.style.textAlign = "center";
    var head = document.createElement("thead");
    var header = document.createElement("tr");
    headers.forEach(function (text) {
        var cell = document.createElement("th");
        cell.textContent = text;
        header.appendChild(cell);
    });
    head.appendChild(header);
    table.appendChild(head);
    var body = document.createElement("tbody");
    rows.forEach(function (values) {
        var tr = document.createElement("tr");
        values.forEach(function (text) {
            var cell = document.createElement("td");
            cell.textContent = String(text);
            tr.appendChild(cell);
        });
        body.appendChild(tr);
    });
    table.appendChild(body);
    return table;
}

function createTable(date1, date2, sn) {
    var rows = selectedRsCountRows(rank_now, date1, date2, sn);
    var result = document.getElementById("preview_html");
    result.replaceChildren();
    if (!rows.length) return;
    if (Number(sn) === 3) {
        var heading = document.createElement("h4");
        heading.textContent = "金鯖の年度別集計";
        result.appendChild(heading);
        var summaries = goldYearSummaries(rows).map(function (summary) {
            return [summary.year + "年", summary.first + " ～ " + summary.last].concat(summary.latest.map(function (value) {
                return value.toLocaleString("ja-JP");
            }), [summary.growth ? summary.growth.reduce(function (a, b) { return a + b; }, 0).toLocaleString("ja-JP") : "—"]);
        });
        result.appendChild(createRsCountTable(["年度", "観測期間", "天上", "地下", "赤い悪魔", "観測間の増加（合計）"], summaries, "rs_gold_summary"));
        var note = document.createElement("p");
        note.textContent = "個数は選択期間の最終観測時点の累計です。観測間の増加は、その期間の最初と最後の観測値の差です。";
        result.appendChild(note);
    }
    result.appendChild(createRsCountTable(["鯖", "日時", "天上", "地下", "赤い悪魔", "備考"], rows.map(function (row) {
        return row.concat([Number(sn) === 3 ? new Date(parseRsCountDate(row[1])).getFullYear() + "年" : "—"]);
    }), "table14"));
}

function createGraphSeries(label, color, values) {
    return { label: label, data: values, backgroundColor: color.background, borderColor: color.border,
        borderWidth: 1, pointRadius: 2, pointHoverRadius: 5, tension: 0, spanGaps: false };
}

function buildRsCountDatasets(rows, sn) {
    var labels = ["天上", "地下", "赤い悪魔"];
    var colors = [
        { background: "rgba(32, 200, 245, 0.4)", border: "rgb(32, 200, 245)" },
        { background: "rgba(245, 130, 32, 0.4)", border: "rgb(245, 130, 32)" },
        { background: "rgba(255, 0, 51, 0.4)", border: "rgb(255, 0, 51)" }
    ];
    var years = Number(sn) === 3 ? goldYearSummaries(rows).map(function (summary) { return summary.year; }) : [null];
    var datasets = [];
    years.forEach(function (year, yearIndex) {
        var annual = year === null ? rows : rows.filter(function (row) { return new Date(parseRsCountDate(row[1])).getFullYear() === year; });
        labels.forEach(function (label, index) {
            var points = annual.map(function (row) { return { x: parseRsCountDate(row[1]), y: Number(row[index + 2]) }; });
            if (year === null) points = points.filter(function (point) { return point.y > 0; });
            var dataset = createGraphSeries(label + (year === null ? "" : "（" + year + "年）"), colors[index], points);
            if (year !== null) dataset.borderDash = yearIndex % 2 ? [6, 3] : [];
            datasets.push(dataset);
        });
    });
    return datasets;
}

function createGraph(rows, date1, date2, sn) {
    var selected = selectedRsCountRows(rows, date1, date2, sn);
    if (chart) chart.destroy();
    chart = null;
    if (!selected.length) return;
    var y = { min: 0, ticks: { callback: function (value) { return Number(value).toLocaleString("ja-JP"); } } };
    if (Number(sn) !== 3) y.max = 2000000;
    chart = new Chart(document.getElementById("myChart"), {
        type: "line", data: { datasets: buildRsCountDatasets(selected, sn) },
        options: { maintainAspectRatio: false, scales: {
            x: { type: "linear", ticks: { maxTicksLimit: 12, maxRotation: 0, minRotation: 0,
                callback: function (value) { return new Date(Number(value)).toLocaleDateString("ja-JP"); } } },
            y: y
        }, plugins: { tooltip: { callbacks: {
            title: function (items) { return items.length ? new Date(items[0].parsed.x).toLocaleString("ja-JP") : ""; }
        } } } }
    });
}

function convertCSVtoArray(text, date1, date2, sn) {
    rank_now = parseRsCountCSV(text);
    createTable(date1, date2, sn);
    createGraph(rank_now, date1, date2, sn);
}

async function getCSV(date1, date2, sn) {
    var token = ++rs_count_request;
    clearRsCountResult();
    setRsCountStatus("読み込み中…");
    try {
        var seasons = [];
        var rows;
        if (Number(sn) === 3) {
            seasons = parseGoldCatalog(await loadRsCountText(rs_count_gold_catalog_url));
            var requested = seasons.filter(function (season) {
                return season.year >= new Date(date1).getFullYear() && season.year <= new Date(date2).getFullYear();
            });
            var annualRows = await Promise.all(requested.map(async function (season) {
                return validateGoldRows(parseRsCountCSV(await loadRsCountText(rs_count_data_root + season.csv)), season.year);
            }));
            rows = [].concat.apply([], annualRows);
        } else {
            rows = parseRsCountCSV(await loadRsCountText(rs_count_csv_urls[0]));
        }
        if (token !== rs_count_request) return;
        rank_now = rows;
        createTable(date1, date2, sn);
        createGraph(rows, date1, date2, sn);
        var selected = selectedRsCountRows(rows, date1, date2, sn);
        var message = selected.length ? selected.length + "件の観測値" : "指定期間のデータはありません。";
        if (Number(sn) === 3) {
            message += "　取得年度：" + seasons.map(function (season) { return season.year + "年"; }).join("、") + "。ほかの年度は未取得です。";
        }
        setRsCountStatus(message);
        return true;
    } catch (error) {
        if (token !== rs_count_request) return false;
        clearRsCountResult();
        setRsCountStatus(error instanceof SyntaxError ? "金鯖の取得年度を確認できませんでした。" : error.message);
        return false;
    }
}

function rsCountDateRange(start, end) {
    if (!start || !end) return [new Date(2008, 4, 1).getTime(), new Date(9999, 11, 31, 23, 59, 59, 999).getTime()];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) throw new Error("日付を確認してください。");
    var first = parseRsCountDate(start.replace(/-/g, "/"));
    var last = parseRsCountDate(end.replace(/-/g, "/"));
    if (first === null || last === null || first > last || first < new Date(2008, 4, 1).getTime()) throw new Error("日付の範囲を確認してください。");
    var endOfDay = new Date(last);
    endOfDay.setHours(23, 59, 59, 999);
    return [first, endOfDay.getTime()];
}

function calc1() {
    try {
        var range = rsCountDateRange(document.querySelector('input[name="a1"]').value, document.querySelector('input[name="a2"]').value);
        return getCSV(range[0], range[1], Number(document.querySelector('select[name="world"]').value));
    } catch (error) {
        ++rs_count_request;
        clearRsCountResult();
        setRsCountStatus(error.message);
        return Promise.resolve(false);
    }
}
