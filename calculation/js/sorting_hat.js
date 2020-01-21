function init1() {
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}


function tweet() {
    if (!document.f.res2.value) {
        alert("組分け帽子の診断を受けてからツイートボタンを押してください。");
        return;
    }
    var text_base = document.f.res2.value;
    var text = "【RS鯖診断】\n組分け帽子「" + text_base + "」";
    var url = "https://sokomin.github.io/calculation/sorting_hat.html"
    var hashtags = "赤石の民衆"
	window.open(
        'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) +'&url='+ url + '&hashtags=' + encodeURIComponent(hashtags),
		'share window','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
	);
	return !1;
}


// ネタだから。連絡くれれば消すよ。
var ban_list = ["ネトゲ廃人ken", "廃ken"];

function calc1(num) {
    var a_name = document.f.a_name.value;
    var ban_flag = false;
    var s_per = 100;
    var v_per = 100;
    var b_per = 100;
    var pt_list = [
        [
            [105, 100, 100],
            [100, 100, 100],
            [100, 100, 100],
            [100, 105, 100],
            [100, 100, 105],
            [100, 100, 100],
        ],
        [
            [120, 100, 100],
            [100, 120, 100],
            [100, 100, 120],
        ],
        [
            [100, 100, 100],
            [100, 100, 100],
            [100, 100, 100],
        ],
        [
            [105, 100, 100],
            [100, 100, 105],
            [100, 105, 100],
        ],
        [
            [113, 106, 103],
            [100, 106, 113],
            [106, 113, 106],
            [113, 106, 106],
            [113, 100, 106],
            [100, 113, 110],
        ],
        [
            [114, 100, 107],
            [100, 115, 107],
            [114, 100, 107],
            [100, 107, 115],
            [107, 114, 100],
            [114, 100, 107],
            [100, 114, 107],
        ],
        [
            [103, 100, 106],
            [106, 100, 103],
            [100, 106, 103],
            [106, 103, 100],
            [100, 103, 106],
            [103, 106, 100],
            [106, 103, 100],
            [100, 106, 103],
            [103, 100, 106],
        ],
    ];
    // テスト関数はmochaとか使って外部実行のため、省略。ロジックとか仕様は.test側に書いといた


    if (a_name) {
        for (var i = 0; i < ban_list.length; i++) {
            if (a_name === ban_list[i]) {
                ban_flag = true;
            }
        }
    }

    //ソース読んでるそこの君以外、ほぼ誰もこのケース踏まないと思うんだよなあ
    if (ban_flag) {
        document.f.res2.value = "また不正プレイヤーの子だな、君はもう決まっとる。\n君のサーバは…アズカバン！";
        return;
    }
    //よくある診断メーカーの裏側ロジック的な
    var checked_state = [
        [
            document.f.q3_1.checked,
            document.f.q3_2.checked,
            document.f.q3_3.checked,
            document.f.q3_4.checked,
            document.f.q3_5.checked,
            document.f.q3_6.checked,
        ],
        [
            document.f.q4_1.checked,
            document.f.q4_2.checked,
            document.f.q4_3.checked,
        ],
        [
            document.f.q5_1.checked,
            document.f.q5_2.checked,
            document.f.q5_3.checked,
        ],
        [
            document.f.q6_1.checked,
            document.f.q6_2.checked,
            document.f.q6_3.checked,
        ],
        [
            document.f.q7_1.checked,
            document.f.q7_2.checked,
            document.f.q7_3.checked,
            document.f.q7_4.checked,
            document.f.q7_5.checked,
            document.f.q7_6.checked,
        ],
        [
            document.f.q2_1.checked,
            document.f.q2_2.checked,
            document.f.q2_3.checked,
            document.f.q2_4.checked,
            document.f.q2_5.checked,
            document.f.q2_6.checked,
            document.f.q2_7.checked,
        ],
        [
            document.f.q1_1.checked,
            document.f.q1_2.checked,
            document.f.q1_3.checked,
            document.f.q1_4.checked,
            document.f.q1_5.checked,
            document.f.q1_6.checked,
            document.f.q1_7.checked,
            document.f.q1_8.checked,
            document.f.q1_9.checked,
        ]
    ];

    for (var i = 0; i < pt_list.length; i++) {
        var data = pt_list[i];
        for (var j = 0; j < data.length; j++) {
            if (checked_state[i][j]) {
                console.log(i + ", " + j);
                s_per += (pt_list[i][j][0] - 100);
                v_per += (pt_list[i][j][1] - 100);
                b_per += (pt_list[i][j][2] - 100);
            }
        }
    }
    num = parseInt(num);
    // 割とこのパーセントの影響デカくしてます。多少でも適正あれば希望に振れるはず
    var per_rate = 1.25;
    switch (num) {
        case 1:
            s_per *= per_rate;
            break;
        case 2:
            v_per *= per_rate;
            break;
        case 3:
            b_per *= per_rate;
            break;
        default:
            break;
    }
    //勢力図か何か
    var rand = parseInt(Math.random() * 3);
    var rand_s = "シュトラセラト(S鯖)";
    if (rand >= 2) {
        rand_s = "ブリッジヘッド(B鯖)";
    } else if (rand >= 1) {
        rand_s = "ボルティッシュ(V鯖)";
    }
    console.log(s_per + ", ", v_per + ", " + b_per, ", " + rand_s);
    //何も押さないか余程珍しいケース
    if (s_per === v_per && v_per === b_per && num === 0) {
        document.f.res2.value = "ふむ、難しいな…。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    //結果がS鯖
    if (s_per > v_per && s_per > b_per && num === 1) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "ふむ、君の希望は叶えやすい。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per > v_per && s_per > b_per && num === 2) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "ほう、意外な結果じゃな。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per > v_per && s_per > b_per && num === 3) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "ほう、意外な結果じゃのう。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per > v_per && s_per > b_per) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "なるほどなるほど…。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }

    //結果がV鯖
    if (v_per > s_per && v_per > b_per && num === 1) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほど、少し意外かもしれぬが…\n君にオススメのサーバは…" + rand_s + "じゃ！";
        return;
    }
    if (v_per > s_per && v_per > b_per && num === 2) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "ふむ、君の希望通りじゃな。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (v_per > s_per && v_per > b_per && num === 3) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほど…。希望とは違うかもしれぬが、\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (v_per > s_per && v_per > b_per) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほどわかったぞ。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }

    //結果がB鯖
    if (b_per > s_per && b_per > v_per && num === 1) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "ほう…こんなこともあるものかのう。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (b_per > s_per && b_per > v_per && num === 2) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "ほう…珍しい。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }

    if (b_per > s_per && b_per > v_per && num === 3) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "なるほど、君の希望は叶えられそうだ。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (b_per > s_per && b_per > v_per) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "ほうほう。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }

    // S鯖とV鯖優勢みたいなケース
    if (s_per === v_per && num === 1) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "ふむ、2つの選択肢で迷うな…。\nならば、君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per === v_per && num === 2) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "ふむ迷うな…。\nならば、君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per === v_per && num === 3) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "ほう…？\n意外かもしれぬが、君にオススメのサーバは…" + rand_s + "じゃ！";
        return;
    }
    if (s_per === v_per) {
        rand_s = parseInt(Math.random() * 2) >= 1 ? "シュトラセラト(S鯖)" : "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほど迷う…。\nならばワシが決めよう。オススメのサーバは…" + rand_s + "！";
        return;
    }


    // V鯖とB鯖優勢みたいなケース
    if (b_per === v_per && num === 1) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "おやおや…？君は珍しいのう。\n 君にオススメのサーバは…" + rand_s + "じゃ！";
        return;
    }
    if (b_per === v_per && num === 2) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほど…迷うのう。\n よし、君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (b_per === v_per && num === 3) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "なるほど…。迷うわい。\nならば、君の希望を叶えよう。オススメのサーバは…" + rand_s + "じゃ！";
        return;
    }
    if (b_per === v_per) {
        rand_s = parseInt(Math.random() * 2) >= 1 ? "ブリッジヘッド(B鯖)" : "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほど…。\nならばここは、オススメのサーバは…" + rand_s + "じゃ！";
        return;
    }

    // B鯖とS鯖優勢みたいなケース
    if (s_per === b_per && num === 1) {
        rand_s = "シュトラセラト(S鯖)";
        document.f.res2.value = "ふむ…迷ったときは君の希望を頼りにするかのう。\n君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per === b_per && num === 2) {
        rand_s = "ボルティッシュ(V鯖)";
        document.f.res2.value = "なるほど…。\nかなり迷ったが、君にオススメのサーバは…" + rand_s + "！";
        return;
    }
    if (s_per === b_per && num === 3) {
        rand_s = "ブリッジヘッド(B鯖)";
        document.f.res2.value = "ふむ…。判断に迷うのう…。\n君の希望に沿って、君にオススメのサーバは…" + rand_s + "じゃ！";
        return;
    }
    if (s_per === b_per) {
        rand_s = parseInt(Math.random() * 2) >= 1 ? "ブリッジヘッド(B鯖)" : "シュトラセラト(S鯖)";
        document.f.res2.value = "なるほど、であれば…。\nオススメのサーバは…" + rand_s + "！";
        return;
    }

    //ケース漏れ(ないはずだけど)時にも結果をランダムで返したい。
    document.f.res2.value = "ふむ、難しいのう…。\n君にオススメのサーバは…" + rand_s + "！";
}

function calc2(num) {
    var server = "";

    switch (num) {
        case 1:
        case 2:
        case 7:
        case 8:
        case 17:
        case 20:
            server = "Strasserad(シュトラセラト) 、S";
            break;
        case 3:
        case 4:
        case 15:
        case 12:
        case 13:
        case 14:
            server = "Vaultish(ボルティッシュ) 、V";
            break;
        case 5:
        case 6:
        case 9:
        case 16:
        case 10:
        case 11:
        case 18:
            server = "Bridgehead(ブリッジヘッド) 、B";
            break;
        default:
            server = "バグ";
            break;
    }
    document.f.res1.value = "あなたのキャラクターは " + server + "鯖にいます！";
}
