// item_viewer.html 用の補足テキスト
// 書式:
//   ItemExtraInfoList = {
//       <itemId>: ["<行1>", "<行2>", ...],
//       ...
//   };
//
//   - itemId は 10進 (例: 65535) でも 16進リテラル (例: 0xffff) でも可。
//     文字列キー "0xffff" も許容する（viewer 側で両対応）。
//   - 配列の各要素が1行として表示される（<a> 等の HTML タグはそのまま書ける）。
//   - 見出しは既定で <入手方法>。別見出しを使いたい場合はオブジェクト形式
//     { heading: "見出し", lines: [...] } で書く。
//
// 参考: map/database/mapdata_extra.js（マップ側の同種データ）

ItemExtraInfoList = {
    // --- サンプル: 練習用 honeypot アイテム（type=-1 の「そこみん」, id=0xffff=65535）---
    // 0xffff を開いて表示されるかを確認するためのひな形。
    // URL: ?id=0xffff&t=-1
    65535: [
        "表示テスト用の補足テキスト",
        "<a href=\"https://sokomin.github.io/\">sokomin</a> などのリンクもそのまま書ける",
        "2行以上は配列で区切って記述する",
    ],

    // --- 実データ記入例（コメントアウト）---
    // 329: ["<a href=\"../quest/longquest_hector.html\">ヘクトルクエ</a>でキャラ毎に入手可能"],
    // 0x014a: ["特定のダンジョンで入手"],
    //
    // 見出しを <注意> などに変えたい場合:
    // 12345: { heading: "注意", lines: ["このアイテムは…"] },
};
