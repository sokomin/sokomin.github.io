
// オプションデータ作成用
function getCSV(mode) {
    var req = new XMLHttpRequest();
    req.open("get", "https://sokomin.github.io/sokomin_repository/db/prefix.csv", true);
    req.send(null);
    req.onload = function () {
        convertCSVtoArray(req.responseText);
    }
}


var obj_format = {};
var prefix_data = {};

// 読み込んだCSVデータをオブジェクトに変換
function convertCSVtoArray(prefix_str) {
    // 初期化
    obj_format = {};
    prefix_data = {};

    var result = [];// 最終的な二次元配列を入れるための配列
    var tmp = prefix_str.split("\n");// 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    var cnt = 0;
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
        var re;
        if (i == 0) {
            // 列定義
            for (var j = 0; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                obj_format[j] = txt;
            }
            // TODO フォーマット違ったらエラー出すなりしたい
            console.log(obj_format);
        } else {
            var md = {};
            for (var j = 1; j < result[i].length; j++) {
                var txt = result[i][j];
                re = /\"/g;
                txt = txt.replace(re, "");
                md[obj_format[j]] = txt;
            }
            re = /\"/g;
            result[i][0] = result[i][0].replace(re, "");
            prefix_data[cnt] = md;
            cnt++;
        }
    }
    // 分岐が必要ならここで
    createMobTable();
}

// 何回かやってみたけどjQuery使いづら過ぎるのでNGで
// const table_format = $('<table>').attr("id", "table10")
// .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 300)))
// .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 500)))
// .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 200)))
// .append($("<colgroup>").append($("<col>").attr("span", 1).attr("width", 200)));

// const header_format = $('<tr>')
// .append($('<th>').text("オプション"))
// .append($('<th>').text("効果"))
// .append($('<th>').text("要求Lv上昇"))
// .append($('<th>').text("付与係数"))

const table_header = '<table id="table10" style="background-color:black; max-width: 1200px;"><colgroup><col span="1" width="300px"><col span="1" width="500px"></colgroup>';
const table_header_tail = '</table>'
const header_format = '<tr><th>オプション</th><th>効果</th><th>要求Lv上昇</th><th>付与係数</th></tr>'
const enter_double="<br><br>"

function calc1() {
    getCSV();
}

function createMobTable() {
    // var $div_main = $('#option_index');
    var $div_main = document.getElementById('option_index');
    var bef_sort_id = 0;
    var bef_op_id = 0;
    var $table = table_header
    var $tr_Name = header_format;
    var summary_html = "";

    for (var i in prefix_data) {
        var data = prefix_data[i];
        // 不要なデータを弾く
        if (validateData(data)) {
            continue;
        }

        var id = "opid_" + i;
        // i = sortid
        var sort_id = Number(data["sortid"]);
        var op_id = Number(data["op_id"]);
        if(sort_id < bef_sort_id || op_id != bef_op_id){
            $table += table_header_tail;
            summary_html += $table;
            summary_html += enter_double;
            // 初期化してテーブル作り直す
            $table = table_header;
            $table += $tr_Name;
        } else if(bef_sort_id == 0){
            $table += $tr_Name;
        }
        bef_sort_id = sort_id;
        bef_op_id = op_id;

        // 中身
        var op_color = def_item_color(data, Number(i));
        if(!op_color || !data["名称"]){
            continue;
        }
        var text_color = def_text_color(data["効果"]);
        var $tr_Type = '<tr id="sort_id_'+ sort_id +'"><td id="id_'+ id +'">'
            + op_color +'</td><td>'+text_color+ '</td><td><span class="option-color">'+data["要求レベル上昇"]+'</span></td><td><span class="option-color">'+data["付加係数"]+'</span></td></tr>'

        // var $tr_Type = $('<tr>').attr("id", (sort_id));
        // $tr_Type.append($('<td>').attr("id", (id)).text(data["名称"]));
        // $tr_Type.append($('<td>').text(data["効果"]));
        // $tr_Type.append($('<td>').text(data["要求レベル上昇"]));
        // $tr_Type.append($('<td>').text(data["付加係数"]));
        $table += $tr_Type


    }
    // 最後に変なオプション入ってるから不要になった行
    // $div_main.append($table);
    // $div_main.append("<br><br>");
    // summary_html += $table;
    // summary_html += enter_double;
    $div_main.innerHTML = summary_html;
}

// 等級の判定
// TODO 普通にデータから取りたい
function def_item_color(data, id){
    // DX
    if(!data){
        return "";
    }
    var sort_id = Number(data["sortid"]);
    // セットOP
    if(sort_id > 50000 && sort_id < 50030){
        return '<span class="color-image5"><b>'+ data["名称"] +'</b></span>'
    }
    
    if(data["名称"]){
        if(data["名称"].indexOf("DX") > 0){
            return '<span class="color-rank-b"><b>'+ data["名称"] +'</b></span>'
        }
        // ULT
        if(data["名称"].indexOf("ULT") > 0 || data["名称"].indexOf("増強") > 0){
            return '<span class="color-rank-a"><b>'+ data["名称"] +'</b></span>'
        }
        // 先に魔力のとか判定
        if(data["名称"].indexOf("魔力の") > 0 || data["名称"].indexOf("痛烈の") > 0 || data["名称"].indexOf("忍耐の") > 0 || data["名称"].indexOf("剛断の") > 0){
            return '<span class="color-rank-b"><b>'+ data["名称"] +'</b></span>'
        }
        if(data["名称"].indexOf("魔神の") > 0 || data["名称"].indexOf("鋭い") > 0 || data["名称"].indexOf("辛苦の") > 0 || data["名称"].indexOf("堅実な") > 0){
            return '<span class="color-rank-a"><b>'+ data["名称"] +'</b></span>'
        }
        // 残りは大体協会OP
        if(data["名称"].indexOf("な]") > 0 || data["名称"].indexOf("の]") > 0 || data["名称"].indexOf("たる]") > 0){
            return '<span class="color-rank-d"><b>'+ data["名称"] +'</b></span>'
        }
    }
    // NPC OP
    if(sort_id > 30000 && sort_id < 30100){
        return '<span class="color-rank-s"><b>'+ data["名称"] +'</b></span>'
    }
    // ノーマル
    return '<span class="color-rank-c"><b>'+ data["名称"] +'</b></span>';
}



// オプションテキストの色塗り
// TODO 普通にデータから取りたい
function def_text_color(text){
    text = text.replace(/([0-9]+)/g, '<font color="#f8f800">'+"$1"+'</font>')
    return '<font color="#ffffff">'+ text +'</font>'
}
/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列(任意)
 */
 function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function validateData(data) {
    // 最低限種族と等級は絞ってくれ
    // if (Number(debug) == 9999) {
    //     return false;
    // }
    if (data["name"] == "自爆テスター") {
        return true;
    }
    return false;
}
