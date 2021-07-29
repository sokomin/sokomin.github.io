function init1() {
    document.f.a1.value = 1;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;

    document.f.b1.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b1.options[1] = new Option('2005～2011', 1);
    document.f.b1.options[2] = new Option('2011～2015', 2);
    document.f.b1.options[3] = new Option('2015～2016', 3);
    document.f.b1.options[4] = new Option('2017～2018', 4);
    //もっと賢い定義方法あるよね？わかる。
    document.f.a21.value = 1;
    document.f.a22.value = 1;

    document.f.b2.value = 0;

    document.f.r21.value = 0;
    document.f.b2.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b2.options[1] = new Option('2005～2011', 1);
    document.f.b2.options[2] = new Option('2011～2015', 2);
    document.f.b2.options[3] = new Option('2015～2016', 3);
    document.f.b2.options[4] = new Option('2017～2018', 4);

    //獲得経験値計算用
    document.f.a31.value = 1;
    document.f.a32.value = 0;
    document.f.a33.value = 0;

    document.f.b31.value = 0;

    document.f.r31.value = 0;
    document.f.b31.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b31.options[1] = new Option('2005～2011', 1);
    document.f.b31.options[2] = new Option('2011～2015', 2);
    document.f.b31.options[3] = new Option('2015～2016', 3);
    document.f.b31.options[4] = new Option('2017～2018', 4);

}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

// 100億打ち込むの桁考えると面倒だろうから、ボタンにしといた
function input_support3(){
    document.f.a33.value = 10000000000;
}

function calc1() {
    var r1 = 0;
    var r2 = 0;
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;

    if (a1 <= 0) {
        document.f.r1.value = 0;
        document.f.r2.value = 0;
        return;
    }
    if (b1 === 4) {
        if (a1 >= 1500) {
            document.f.r1.value = 200000000000;
            document.f.r2.value = "最高レベルは1500です。";
            return;
        }
        r1 = exp_2017array[a1 - 1];
        r2 = exp_sum_2017array[a1 - 1];
    } else if (b1 === 1) {
        if (a1 >= 119300) {
            document.f.r1.value = "ループしました。";
            document.f.r2.value = "ループしました。";
            return;
        }
        document.f.r1.value = calc_2005exp(a1);
        var r2x = 0;
        for (var i = 1; i <= a1; i++) {
            r2x += calc_2005exp(i);
        }
        document.f.r2.value = r2x;
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 >= 1000) {
            document.f.r1.value = "5000兆";
            document.f.r2.value = "最高レベルは1000です。";
            return;
        } else if (a1 < 909) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_sum_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2011array[a1 - 909];
            r2 = exp_sum_2011array[a1 - 909];
        }
    } else if (b1 === 3) {
        //2015～2016
        if (a1 >= 1000) {
            document.f.r1.value = "5000兆";
            document.f.r2.value = "最高レベルは1000です。";
            return;
        } else if (a1 < 909) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_sum_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2015array[a1 - 909];
            r2 = exp_sum_2015array[a1 - 909];
        }
        //0は使いたくない…
    } else if (b1 === 5) {
        if (a1 >= 1500) {
            document.f.r1.value = 200000000000;
            document.f.r2.value = "最高レベルは1500です。";
            return;
        } else if (a1 >= 850 && a1 <= 999) {
            r1 = exp_2019array[a1 - 850];
            r2 = exp_sum_2019array[a1 - 850];
        } else if (a1 >= 1000) {
            r1 = exp_2017array[a1 - 1];
            //合計は850～999がズレた分、変わっちゃうからね
            r2 = exp_sum_2019array[a1 - 850];
        } else {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_sum_2017array[a1 - 1];
        }
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r1.value = Math.floor(r1);
    document.f.r2.value = Math.floor(r2);

}


function calc_2005exp(lv) {
    var ans = 0;

    if (lv == 1) {
        ans = 250;
    } else if (lv == 2) {
        ans = 420;
    } else if (lv > 2) {
        i = 0;
        j = 0;
        lv = Math.floor(lv);
        i = Math.ceil((Math.sqrt(4 * lv + 1) - 3) / 2);
        j = lv - 2 - (i - 1) * (i + 2);
        ans = 170 * lv + 80 + (20 / 3) * (3 * (i + 1) * Math.pow(j, 2) + (5 * Math.pow(i, 3) + 9 * Math.pow(i, 2) + 16 * i - 9) * j + (2 * Math.pow(i, 5) + 5 * Math.pow(i, 4) + 12 * Math.pow(i, 3) - 8 * Math.pow(i, 2) - 17 * i + 6));
    } else {
        ans = 0;
    }
    return ans;
}

function calc2() {
    var r1 = 0;
    var a1 = parseInt(document.f.a21.value) ? parseInt(document.f.a21.value) : 0;
    var a2 = parseInt(document.f.a22.value) ? parseInt(document.f.a22.value) : 0;
    var b1 = parseInt(document.f.b2.value) ? parseInt(document.f.b2.value) : 0;

    if (a2 - a1 <= 0) {
        alert("計算できません。");
        document.f.r21.value = Math.floor(r1);
        return;
    }
    if (a2 <= 1) {
        document.f.r21.value = 0;
        return;
    }
    if (b1 === 4) {
        if (a1 > 1500 || a2 > 1500) {
            //1500までで計算するならこれ
            // r1 = exp_sum_2017array[1499] - exp_sum_2017array[a1 - 2];
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        var a1_4 = a1 >= 2 ? exp_sum_2017array[a1 - 2] : 0;
        r1 = exp_sum_2017array[a2 - 2] - a1_4;
    } else if (b1 === 1) {
        if (a1 >= 119300) {
            document.f.r21.value = "ループしました。";
            return;
        }
        var r2x = 0;
        for (var i = a1; i <= a2 - 1; i++) {
            r2x += calc_2005exp(i);
        }
        document.f.r21.value = r2x;
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 > 1000 || a2 > 1000) {
            document.f.r21.value = "最高レベルは1000です。";
            return;
        }
        var a1_2 = 0;
        var a2_2 = 0;
        if (a1 <= 909) {
            a1_2 = a1 >= 2 ? exp_sum_2017array[a1 - 2] : 0;
        } else if (a1 <= 1000) {
            a1_2 = exp_sum_2011array[a1 - 910];
        }
        if (a2 <= 909) {
            a2_2 = a2 >= 2 ? exp_sum_2017array[a2 - 2] : 0;
        } else if (a2 <= 1000) {
            a2_2 = exp_sum_2011array[a2 - 910];
        }
        r1 = a2_2 - a1_2;
    } else if (b1 === 3) {
        //2015～2016
        if (a1 > 1000 || a2 > 1000) {
            document.f.r21.value = "最高レベルは1000です。";
            return;
        }
        var a1_2 = 0;
        var a2_2 = 0;
        if (a1 <= 909) {
            a1_2 = a1 >= 2 ? exp_sum_2017array[a1 - 2] : 0;
        } else if (a1 <= 1000) {
            a1_2 = exp_sum_2015array[a1 - 910];
        }
        if (a2 <= 909) {
            a2_2 = a2 >= 2 ? exp_sum_2017array[a2 - 2] : 0;
        } else if (a2 <= 1000) {
            a2_2 = exp_sum_2015array[a2 - 910];
        }
        r1 = a2_2 - a1_2;
    } else if (b1 === 5) {
        if (a1 > 1500 || a2 > 1500) {
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        var a1_2 = 0;
        var a2_2 = 0;
        if (a1 <= 850) {
            a1_2 = a1 >= 2 ? exp_sum_2017array[a1 - 2] : 0;
        } else if (a1 <= 1500) {
            a1_2 = exp_sum_2019array[a1 - 851];
        }
        if (a2 <= 850) {
            a2_2 = a2 >= 2 ? exp_sum_2017array[a2 - 2] : 0;
        } else if (a2 <= 1500) {
            a2_2 = exp_sum_2019array[a2 - 851];
        }
        r1 = a2_2 - a1_2;
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r21.value = Math.floor(r1);
}


function calc3() {
    var r1 = 0;
    var a1 = parseInt(document.f.a31.value) ? parseInt(document.f.a31.value) : 0;
    var a2 = Number(document.f.a32.value) ? Number(document.f.a32.value) : 0;
    var a3 = Number(document.f.a33.value) ? Number(document.f.a33.value) : 0;
    var b1 = parseInt(document.f.b31.value) ? parseInt(document.f.b31.value) : 0;

    // init
    document.f.r31.value = "";
    document.f.r32.value = "";

    if (a1 <= 0) {
        document.f.r31.value = "レベルは1以上";
        return;
    }
    if (a2 < 0 || a2 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }

    if (b1 === 4) {
        //2017～2018
        if (a1 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        var exp1 = exp_sum_2017array[a1 - 2] + per + a3;
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else if (b1 === 1) {
        // 2005～2011
        document.f.r31.value = "未実装です";
        return;
    } else if (b1 === 2) {
        // 2011～2015
        if (a1 > 1000) {
            document.f.r21.value = "最高レベルは1000です。";
            return;
        }
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2011array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + a3) : (exp_sum_2011array[a1 - 910] + per + a3);
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
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + a3) : (exp_sum_2015array[a1 - 910] + per +　a3);
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
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per + a3) : (exp_sum_2019array[a1 - 851] + per + a3);
        r1 = findReturnerLv(exp1, b1);
        console.log(exp1);
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r31.value = r1.lv;
    document.f.r32.value = r1.per;

}
