function init1() {
    document.f.a21.value = 900;

    document.f.b1.value = 0;

    document.f.b1.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b1.options[1] = new Option('2005～2011', 1);
    document.f.b1.options[2] = new Option('2011～2015', 2);
    document.f.b1.options[3] = new Option('2015～2016', 3);
    document.f.b1.options[4] = new Option('2017～2018', 4);
    //もっと賢い定義方法あるよね？わかる。
    document.f.a22.value = 0;
    document.f.a23.value = 0;
    document.f.a24.value = 8;
    document.f.a25.value = 100000000;



    document.f.a1.value = 900;
    document.f.a2.value = 0;
    document.f.a10.value = 900;
    document.f.a11.value = 0;
    document.f.a4.value = 8;
    document.f.a5.value = 100000000;
    document.f.b2.value = 0;

    document.f.b2.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b2.options[1] = new Option('2005～2011', 1);
    document.f.b2.options[2] = new Option('2011～2015', 2);
    document.f.b2.options[3] = new Option('2015～2016', 3);
    document.f.b2.options[4] = new Option('2017～2018', 4);

    document.f.a41.value = 900;
    document.f.a42.value = 0;
    document.f.a43.value = 0;
    document.f.a44.value = 8;
    document.f.a45.value = 0;
    document.f.a46.value = 1;

    document.f.b3.value = 0;

    document.f.b3.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b3.options[1] = new Option('2005～2011', 1);
    document.f.b3.options[2] = new Option('2011～2015', 2);
    document.f.b3.options[3] = new Option('2015～2016', 3);
    document.f.b3.options[4] = new Option('2017～2018', 4);

    //スフィア
    document.f.b4.options[0] = new Option('有', 1, 1, 1);
    document.f.b4.options[1] = new Option('無し', 0);
    //バッジ
    document.f.b5.options[0] = new Option('無し', 0, 1, 1);
    document.f.b5.options[1] = new Option('有', 1);
    //復帰者
    document.f.b6.options[0] = new Option('無し', 0, 1, 1);
    document.f.b6.options[1] = new Option('有', 2);
    //経験値バフ
    document.f.b7.options[0] = new Option('0', 0, 1, 1);
    document.f.b7.options[1] = new Option('1', 0.5);
    document.f.b7.options[2] = new Option('2', 1.0);
    document.f.b7.options[3] = new Option('3', 1.3);
    document.f.b7.options[4] = new Option('4', 1.6);
    document.f.b7.options[5] = new Option('5', 2.0);
    //パワキ
    document.f.b8.options[0] = new Option('有', 1, 1, 1);
    document.f.b8.options[1] = new Option('無し', 0);
    document.f.b8.options[2] = new Option('ULT', 2);
    //PTボーナス(何段階かあるけど、その違い判る人誰かいます？)
    document.f.b9.options[0] = new Option('無し', 0, 1, 1);
    document.f.b9.options[1] = new Option('有', 1);
    // document.f.b8.options[2] = new Option('ULT', 2);

    document.f.a47.value = 0;
    document.f.a48.value = 0;
    document.f.a49.value = 0;
    document.f.a50.value = 0;
    document.f.a51.value = 0;
    document.f.a52.value = 0;
    document.f.a53.value = 0;
    document.f.a54.value = 0;
    document.f.a55.value = 0;
    //ギルドスキル
    // document.f.b10.options[0] = new Option('0', 0, 1, 1);
    // document.f.b10.options[1] = new Option('1', 0.05);
    // document.f.b10.options[2] = new Option('2', 0.1);
    // document.f.b10.options[3] = new Option('3', 0.15);
    // document.f.b10.options[4] = new Option('4', 0.2);
    // document.f.b10.options[5] = new Option('5', 0.25);
    //ギルド旗バフ
    document.f.b12.options[0] = new Option('0', 0, 1, 1);
    document.f.b12.options[1] = new Option('1', 0.05);
    document.f.b12.options[2] = new Option('2', 0.1);
    document.f.b12.options[3] = new Option('3', 0.15);
    document.f.b12.options[4] = new Option('4', 0.2);
    document.f.b12.options[5] = new Option('5', 0.25);

}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

//TODO 転生って名前だけどレベルとEXP計算できる汎用化関数だよねこれ共通化しなきゃ
function findReturnerLv(exp, b) {
    //厳密には598とかで満たすことあるけど、今回は計算にいれない。
    var cnt = 1;
    var ret = {
        lv: 1,
        per: 0,
        rest: 0,
    };
    if (b === 4) {
        for (var i = 0; i <= 1500; i++) {
            if (exp < exp_sum_2017array[i]) {
                var rest = exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        //b=１はLvリセットなので対応不要
    } else if (b === 2) {
        for (var i = 1; i <= 909; i++) {
            if (exp < exp_sum_2017array[i - 1]) {
                var rest = i >= 1 ? exp - exp_sum_2017array[i - 2] : 250;
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        cnt--;
        for (var i = 910; i <= 1000; i++) {
            if (exp < exp_sum_2011array[i - 910]) {
                var rest = i >= 910 ? exp - exp_sum_2011array[i - 911] : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2011array[i - 910]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
    } else if (b === 3) {
        for (var i = 1; i <= 909; i++) {
            if (exp < exp_sum_2017array[i - 1]) {
                var rest = i >= 1 ? exp - exp_sum_2017array[i - 2] : 250;
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        cnt--;
        for (var i = 910; i <= 1000; i++) {
            if (exp < exp_sum_2015array[i - 910]) {
                var rest = i >= 910 ? exp - exp_sum_2015array[i - 911] : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2015array[i - 910]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
    } else if (b === 5) {
        for (var i = 1; i <= 850; i++) {
            if (exp < exp_sum_2017array[i - 1]) {
                var rest = i >= 1 ? exp - exp_sum_2017array[i - 2] : 250;
                ret.rest = rest;
                ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
        cnt--;
        for (var i = 851; i <= 1500; i++) {
            if (exp < exp_sum_2019array[i - 851]) {
                var rest = i >= 852 ? exp - exp_sum_2019array[i - 852] : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                if (i >= 1000) {
                    ret.per = parseInt((rest * 100 / exp_2017array[i - 2]) * 10000) / 10000;
                } else {
                    ret.per = parseInt((rest * 100 / exp_2019array[i - 851]) * 10000) / 10000;
                }
                ret.lv = cnt;
                return ret;
            } else {
                cnt++;
            }
        }
    }
    return ret;
}

function calc1() {
    var r1 = {};
    //今のレベル
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var a2 = parseFloat(document.f.a2.value) ? parseFloat(document.f.a2.value) : 0;
    //壺PT後のレベル
    var a10 = parseInt(document.f.a10.value) ? parseInt(document.f.a10.value) : 0;
    var a11 = parseFloat(document.f.a11.value) ? parseFloat(document.f.a11.value) : 0;
    var a4 = parseInt(document.f.a4.value) ? parseInt(document.f.a4.value) : 0; //PTメンバー数
    var a5 = parseInt(document.f.a5.value) > 1 ? parseInt(document.f.a5.value) : 1;
    var b1 = parseInt(document.f.b2.value) ? parseInt(document.f.b2.value) : 0;
    document.f.r31.value = "";
    document.f.r34.value = "";
    // 合計10万の時点でも1人12500個だよぉ
    if (a4 <= 0) {
        alert("壺をあける人がいません。");
        return;
    }
    if (a4 >= 9) {
        alert("1PTは8人までです。");
        return;
    }
    //壺で獲得できる経験値は一緒なので、ここでまとめて計算して代入する。(53bit超える値入れたら1500なるので平気)
    var tubo_num = 0;
    var tubo_pt = 0;
    var diff = 0;

    if (a2 < 0 || a2 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }
    if (a1 < 200) {
        alert("Lvは200以上で入力してください。");
        return;
    }
    if (a11 < 0 || a11 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }
    if (a10 < 200) {
        alert("Lvは200以上で入力してください。");
        return;
    }
    if (b1 === 4) {
        //2017～2018
        if (a1 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        var exp1 = exp_sum_2017array[a1 - 2] + per + tubo_exp;

        if (a10 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per10 = parseInt(exp_2017array[a10 - 1] * a11 / 100);
        var exp2 = exp_sum_2017array[a10 - 2] + per10;
        //人数とベース経験値で割り算
        diff = exp2 - exp1;
        tubo_num = parseInt(diff / a5) >= 0 ? parseInt(diff / a5) : 0;
        tubo_pt = parseInt(diff / a4 / a5) >= 0 ? parseInt(diff / a4 / a5) : 0;

        console.log(exp1);
    } else if (b1 === 1) {
        document.f.r31.value = a1;
        document.f.r34.value = "未実装です。";
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 > 1000) {
            document.f.r31.value = "最高レベルは1000です。";
            return;
        }
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2011array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per) : (exp_sum_2011array[a1 - 910] + per);

        var per10 = 0;
        if (a10 < 909) {
            per10 = parseInt(exp_2017array[a10 - 1] * a11 / 100);
        } else {
            per10 = parseInt(exp_2011array[a10 - 909] * a11 / 100);
        }
        var exp2 = a10 < 910 ? (exp_sum_2017array[a10 - 2] + per10) : (exp_sum_2011array[a10 - 910] + per10);

        //人数とベース経験値で割り算
        diff = exp2 - exp1;
        tubo_num = parseInt(diff / a5) >= 0 ? parseInt(diff / a5) : 0;
        tubo_pt = parseInt(diff / a4 / a5) >= 0 ? parseInt(diff / a4 / a5) : 0;

        console.log(exp1);
    } else if (b1 === 3) {
        //2015～2016
        if (a1 > 1000) {
            document.f.r31.value = "最高レベルは1000です。";
            return;
        }
        var per = 0;
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2015array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per) : (exp_sum_2015array[a1 - 910] + per);
        if (a10 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }

        var per10 = 0;
        if (a10 < 909) {
            per10 = parseInt(exp_2017array[a10 - 1] * a11 / 100);
        } else {
            per10 = parseInt(exp_2015array[a10 - 909] * a11 / 100);
        }
        var exp2 = a10 < 910 ? (exp_sum_2017array[a10 - 2] + per10) : (exp_sum_2015array[a10 - 910] + per10);
        if (a10 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        //人数とベース経験値で割り算
        diff = exp2 - exp1;
        tubo_num = parseInt(diff / a5) >= 0 ? parseInt(diff / a5) : 0;
        tubo_pt = parseInt(diff / a4 / a5) >= 0 ? parseInt(diff / a4 / a5) : 0;
        //簡易計算機だし、直接引き算でOK(1000以降なら直接EXP調整してね。)
        console.log(exp1);
    } else if (b1 === 5) {
        //2019～
        if (a1 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 >= 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per) : (exp_sum_2019array[a1 - 851] + per);

        if (a10 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per10 = 0;
        if (a10 < 850 || a10 >= 1000) {
            per10 = parseInt(exp_2017array[a10 - 1] * a11 / 100);
        } else {
            per10 = parseInt(exp_2019array[a10 - 850] * a11 / 100);
        }
        var exp2 = a10 <= 850 ? (exp_sum_2017array[a10 - 2] + per10) : (exp_sum_2019array[a10 - 851] + per10);
        diff = exp2 - exp1;
        //人数とベース経験値で割り算
        tubo_num = parseInt(diff / a5) >= 0 ? parseInt(diff / a5) : 0;
        tubo_pt = parseInt(diff / a4 / a5) >= 1 ? parseInt(diff / a4 / a5 + 0.999) : 0;
        //簡易計算機だし、直接引き算でOK(1000以降なら直接EXP調整してね。)
        console.log(exp1);
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r31.value = tubo_num;
    document.f.r34.value = tubo_pt;
}

// 壺Pt通常シミュレータのほう（簡易計算版）
function calc2() {
    var r1 = {};
    var a1 = parseInt(document.f.a21.value) ? parseInt(document.f.a21.value) : 0;
    var a2 = parseFloat(document.f.a22.value) ? parseFloat(document.f.a22.value) : 0;
    var a3 = parseInt(document.f.a23.value) ? parseInt(document.f.a23.value) : 0;　// 壺数
    var a4 = parseInt(document.f.a24.value) ? parseInt(document.f.a24.value) : 0; //PTメンバー数
    var a5 = parseInt(document.f.a25.value) > 1 ? parseInt(document.f.a25.value) : 1;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;
    document.f.r21.value = "";
    document.f.r24.value = "";
    document.f.r22.value = "";
    document.f.r23.value = "";
    document.f.r25.value = "";
    document.f.r26.value = "";
    if (a3 <= 0) {
        alert("壺がありません。");
        return;
    }
    // 合計10万の時点でも1人12500個だよぉ
    if (a3 >= 9999999) {
        alert("壺あけるのに時間かかりすぎて経験値イベ終わっちゃいます");
        return;
    }
    if (a4 <= 0) {
        alert("壺をあける人がいません。");
        return;
    }
    if (a4 >= 9) {
        alert("1PTは8人までです。");
        return;
    }
    //壺で獲得できる経験値は一緒なので、ここでまとめて計算して代入する。(53bit超える値入れたら1500なるので平気)
    var tubo_exp = a5 * a3 * a4;
    var tubo_box = parseInt((a3 + 19) / 20); //厳密に言うと昔は重ねられなかったけど、ﾕﾙｼﾃ
    var tubo_line = parseInt((parseInt((a3 + 19) / 20) + 5) / 6); //厳密に言うと昔は重ねられなかったけど、ﾕﾙｼﾃ
    var berry_box = a3 * a4;
    var berry_ss_box = parseInt(a3 * a4 * 1.2);

    if (a2 < 0 || a2 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }
    if (a1 < 200) {
        alert("Lvは200以上で入力してください。");
        return;
    }
    if (b1 === 4) {
        //2017～2018
        if (a1 >= 1500) {
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        var per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        var exp1 = exp_sum_2017array[a1 - 2] + per + tubo_exp;
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 1) {
        document.f.r21.value = a1;
        document.f.r24.value = "未実装です。";
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 > 1000) {
            document.f.r21.value = "最高レベルは1000です。";
            return;
        }
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2011array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + tubo_exp) : (exp_sum_2011array[a1 - 910] + per + tubo_exp);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 3) {
        //2015～2016
        if (a1 > 1000) {
            document.f.r21.value = "最高レベルは1000です。";
            return;
        }
        var per = 0;
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2015array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + tubo_exp) : (exp_sum_2015array[a1 - 910] + per + tubo_exp);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 5) {
        //2019～
        if (a1 >= 1500) {
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 >= 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        //簡易計算機だし、直接足し算でOK(1000以降なら直接EXP調整してね。)
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per + tubo_exp) : (exp_sum_2019array[a1 - 851] + per + tubo_exp);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r21.value = r1.lv;
    document.f.r24.value = r1.per;
    document.f.r23.value = tubo_box;
    document.f.r22.value = tubo_line;
    document.f.r25.value = berry_box;
    document.f.r26.value = berry_ss_box;
}

const exp_buff = [0.5, 1.0, 1.3, 1.6, 2.0];

// 壺Pt通常シミュレータのほう（簡易計算版）
function calc3() {
    var r1 = {};
    var a1 = parseInt(document.f.a41.value) ? parseInt(document.f.a41.value) : 0;
    var a2 = parseFloat(document.f.a42.value) ? parseFloat(document.f.a42.value) : 0;
    var a3 = parseInt(document.f.a43.value) ? parseInt(document.f.a43.value) : 0;　// 壺数
    var a4 = parseInt(document.f.a44.value) ? parseInt(document.f.a44.value) : 0; //PTメンバー数
    // var a5 = parseInt(document.f.a45.value) > 1 ? parseInt(document.f.a45.value) : 1;
    var a46 = parseFloat(document.f.a46.value) ? parseFloat(document.f.a46.value) : 0;
    var a47 = parseInt(document.f.a47.value) ? parseInt(document.f.a47.value) : 0;
    var a48 = parseInt(document.f.a48.value) ? parseInt(document.f.a48.value) : 0;
    var a49 = parseInt(document.f.a49.value) ? parseInt(document.f.a49.value) : 0;
    var a50 = parseInt(document.f.a50.value) ? parseInt(document.f.a50.value) : 0;
    var a51 = parseInt(document.f.a51.value) ? parseInt(document.f.a51.value) : 0;
    var a52 = parseInt(document.f.a52.value) ? parseInt(document.f.a52.value) : 0;
    var a53 = parseInt(document.f.a53.value) ? parseInt(document.f.a53.value) : 0;
    var a54 = parseInt(document.f.a54.value) ? parseInt(document.f.a54.value) : 0;
    var a55 = parseInt(document.f.a55.value) ? parseInt(document.f.a55.value) : 0;
    var a5 = 0;
    document.f.a45.value = 0;
    var b1 = parseInt(document.f.b3.value) ? parseInt(document.f.b3.value) : 0;
    var b4 = parseInt(document.f.b4.value) ? parseInt(document.f.b4.value) : 0;
    var b5 = parseInt(document.f.b5.value) ? parseInt(document.f.b5.value) : 0;
    var b6 = parseInt(document.f.b6.value) ? parseInt(document.f.b6.value) : 0;
    var b7 = parseInt(document.f.b7.value) ? parseInt(document.f.b7.value) : 0;
    var b8 = parseInt(document.f.b8.value) ? parseInt(document.f.b8.value) : 0;
    var b9 = parseInt(document.f.b9.value) ? parseInt(document.f.b9.value) : 0;
    // var b10 = parseInt(document.f.b10.value) ? parseInt(document.f.b10.value) : 0;
    var b12 = parseInt(document.f.b12.value) ? parseInt(document.f.b12.value) : 0;
    // この数の変数をバリデーションかけるのは無理なので各自でバリデーションしてください。
    document.f.r41.value = "";
    document.f.r44.value = "";
    document.f.r42.value = "";
    document.f.r43.value = "";
    document.f.r45.value = "";
    document.f.r46.value = "";
    if (a3 <= 0) {
        alert("壺がありません。");
        return;
    }
    // 合計10万の時点でも1人12500個だよぉ
    if (a3 >= 9999999) {
        alert("壺あけるのに時間かかりすぎて経験値イベ終わっちゃいます");
        return;
    }
    if (a4 <= 0) {
        alert("壺をあける人がいません。");
        return;
    }
    if (a4 >= 9) {
        alert("1PTは8人までです。");
        return;
    }
    //TODO a5の部分だけ書き換えるようにしてcalc2とcalc3を統合できるよ
    //基礎EXP
    a5 = (26200 + 6500 * a1);
    //スフィアとパワキ、後EXP指もこの辺りかも
    //共通関数より知恵補正計算を召喚
    a5 = a5 * (1 + b4 + b8 + a53 / 100+ calcIntOption(a48) / 100);
    //バッジ
    a5 = a5 * (1 + b5);
    //復帰者(PT50%は8人PTの50%と打ち消し計算かもしれない？ってことで0.5のほう削っておくね。つまりPT人数計算ははどっかいった。)
    a5 = a5 * (1 + b6);
    // 経験値イベ
    a5 = a5 * a46;
    //PTボーナス(大体これくらいで合ってる)
    if (b9 > 0) {
        a5 = a5 * (1 + a4 * 0.07);
    }
    //経験値バフを召喚
    a5 = a5 * (1 + b7);
    //ギルドスキルとギルドバフはここでまとめて(で合ってるのか？)
    a5 = a5 * (1 + a49 / 100 + b12);
    var creature_exp1 = 0;
    var creature_exp2 = 0;
    var creature_exp3 = 0;
    if (a50 >= 50) {
        creature_exp1 = 60;
    } else if (a50 > 0) {
        creature_exp1 = 9 + a50;
    }
    if (a51 >= 50) {
        creature_exp2 = 120;
    } else if (a51 > 0) {
        creature_exp2 = 54 + a51;
    }
    if (a52 >= 50) {
        creature_exp3 = 30;
    } else if (a52 >= 40) {
        creature_exp3 = 20;
    } else if (a52 >= 30) {
        creature_exp3 = 20;
    }
    a5 = a5 * (1 + (creature_exp1 + creature_exp2 + creature_exp3) / 100);
    //PT平均レベル差：Excelだともう少し複雑なことできるけど、シミュレータで入力するの苦痛でしかないので平均Lv項目だけ掲載
    var lv_diff = (75 - a54) / 75 > 0.01 ? (75 - a54) / 75 : 0.01;
    a5 = parseInt(a5 * lv_diff);
    //探偵補正とかつっこみたい時に。
    a5 = a5 * (1 + a55 / 100);
    if (a5 <= 1) {
        a5 = 1;
    }
    //ベリー補正はここにかける
    a5 =  a5 + (26200 + 6500 * a1) * (1 + (a47 / 100));

    //壺で獲得できる経験値は一緒なので、ここでまとめて計算して代入する。(53bit超える値入れたら1500なるので平気)
    var tubo_exp = a5 * a3 * a4;
    var tubo_box = parseInt((a3 + 19) / 20); //厳密に言うと昔は重ねられなかったけど、ﾕﾙｼﾃ
    var tubo_line = parseInt((parseInt((a3 + 19) / 20) + 5) / 6); //厳密に言うと昔は重ねられなかったけど、ﾕﾙｼﾃ
    var berry_box = a3 * a4;
    var berry_ss_box = parseInt(a3 * a4 * 1.2);

    if (a2 < 0 || a2 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }
    if (a1 < 200) {
        alert("Lvは200以上で入力してください。");
        return;
    }
    if (b1 === 4) {
        //2017～2018
        if (a1 >= 1500) {
            document.f.r41.value = "最高レベルは1500です。";
            return;
        }
        var per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        var exp1 = exp_sum_2017array[a1 - 2] + per + tubo_exp;
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 1) {
        document.f.r41.value = a1;
        document.f.r44.value = "未実装です。";
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 > 1000) {
            document.f.r41.value = "最高レベルは1000です。";
            return;
        }
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2011array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + tubo_exp) : (exp_sum_2011array[a1 - 910] + per + tubo_exp);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 3) {
        //2015～2016
        if (a1 > 1000) {
            document.f.r41.value = "最高レベルは1000です。";
            return;
        }
        var per = 0;
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2015array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + tubo_exp) : (exp_sum_2015array[a1 - 910] + per + tubo_exp);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 5) {
        //2019～
        if (a1 >= 1500) {
            document.f.r41.value = "最高レベルは1500です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 >= 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        //簡易計算機だし、直接足し算でOK(1000以降なら直接EXP調整してね。)
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per + tubo_exp) : (exp_sum_2019array[a1 - 851] + per + tubo_exp);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r41.value = r1.lv;
    document.f.r44.value = r1.per;
    document.f.r43.value = tubo_box;
    document.f.r42.value = tubo_line;
    document.f.r45.value = berry_box;
    document.f.r46.value = berry_ss_box;
    document.f.a45.value = a5;
}
