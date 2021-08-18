
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

/**
 * 内部のファイル呼び出し用
 *
 * @param  URL {url} 対象のファイル名 パス指定 https://sokomin.github.io/map/database/mobdb874.js
 */
function appendScript(URL, callback) {
    var el = document.createElement('script');
    el.src = URL;
    document.body.appendChild(el);
    callback(el);
    // return el;
};


/**
 * 逆にscript削減したいとき
 *
 * @param  el 対象オブジェクト
 */
function removeScript(el, callback) {
    document.body.removeChild(el);
    callback(true);
};
