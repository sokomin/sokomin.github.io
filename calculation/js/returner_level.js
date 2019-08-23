function init1() {
    document.f.a1.value = 1;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;
    document.f.r3.value = 0;

    document.f.b1.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    document.f.b1.options[1] = new Option('2005～2011', 1);
    document.f.b1.options[2] = new Option('2011～2015', 2);
    document.f.b1.options[3] = new Option('2015～2016', 3);
    document.f.b1.options[4] = new Option('2017～2018', 4);
    //もっと賢い定義方法あるよね？わかる。
    // document.f.a21.value = 1;
    // document.f.a22.value = 1;

    // document.f.b2.value = 0;

    // document.f.r21.value = 0;
    // document.f.b2.options[0] = new Option('2019～(暫定版)', 5, 1, 1);
    // document.f.b2.options[1] = new Option('2005～2011', 1);
    // document.f.b2.options[2] = new Option('2011～2015', 2);
    // document.f.b2.options[3] = new Option('2015～2016', 3);
    // document.f.b2.options[4] = new Option('2017～2018', 4);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

//2011～2016辺りまで
const exp_300_600_2011 = 20308052880;
//2017～はこっちで計算しとく(正確には2018頃？)
const exp_300_600_2017 = 18499165540;

//連続転生したときどうなるか？
function findReturnerLv(exp, b) {
    //厳密には598とかで満たすことあるけど、今回は計算にいれない。
    var cnt = 1;
    var ret = {
        lv: 1,
        per: 0,
    };
    if (b === 4) {
        for (var i = 0; i <= 1500; i++) {
            if (exp < exp_sum_2017array[i]) {
                var rest = exp - exp_sum_2017array[i - 1];
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
                ret.per = parseInt((rest * 100 / exp_2017array[i -1]) * 10000) / 10000;
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
                ret.per = parseInt((rest * 100 / exp_2017array[i -1]) * 10000) / 10000;
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
                if (i >= 1000) {
                    ret.per = parseInt((rest * 100 / exp_2017array[i - 1]) * 10000) / 10000;
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
    var r2 = {};
    var r3 = {};
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    // var a2 = parseInt(document.f.a2.value) ? parseInt(document.f.a2.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;
    document.f.r1.value = "";
    document.f.r2.value = "";
    document.f.r3.value = "";
    document.f.r11.value = "";
    document.f.r12.value = "";
    document.f.r13.value = "";

    if (a1 < 600) {
        document.f.r1.value = "600Lvから転生できます。";
        return;
    }
    if (b1 === 4) {
        //2017～2018
        if (a1 > 1500) {
            document.f.r1.value = "最高レベルは1500です。";
            return;
        }
        var exp1 = exp_sum_2017array[a1 - 2] - exp_300_600_2017;
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? exp1 - exp_300_600_2017 : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? exp2 - exp_300_600_2017 : 0;
        if (exp3 <= 0) {
            r3.lv = "Lv不足で転生できません。";
            r3.per = "";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        // 転生して引かれた後にどれだけ経験値残ってるか。
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else if (b1 === 1) {
        //2005～2011
        document.f.r1.value = "1";
        document.f.r2.value = "強制的に1Lvになります。";
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 > 1000) {
            document.f.r1.value = "最高レベルは1000です。";
            return;
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] - exp_300_600_2011) : (exp_sum_2011array[a1 - 2] - exp_300_600_2011);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? exp1 - exp_300_600_2011 : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? exp2 - exp_300_600_2011 : 0;
        if (exp3 <= 0) {
            r3.lv = "Lv不足で転生できません。";
            r3.per = "";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        // 転生して引かれた後にどれだけ経験値残ってるか。
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else if (b1 === 3) {
        //2015～2016
        if (a1 > 1000) {
            document.f.r1.value = "最高レベルは1000です。";
            return;
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] - exp_300_600_2011) : (exp_sum_2015array[a1 - 2] - exp_300_600_2011);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? exp1 - exp_300_600_2011 : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? exp2 - exp_300_600_2011 : 0;
        if (exp3 <= 0) {
            r3.lv = "Lv不足で転生できません。";
            r3.per = "";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        // 転生して引かれた後にどれだけ経験値残ってるか。
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else if (b1 === 5) {
        //2019～
        if (a1 > 1500) {
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] - exp_300_600_2017) : (exp_sum_2019array[a1 - 851] - exp_300_600_2017);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? exp1 - exp_300_600_2017 : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? exp2 - exp_300_600_2017 : 0;
        if (exp3 <= 0) {
            r3.lv = "Lv不足で転生できません。";
            r3.per = "";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        // 転生して引かれた後にどれだけ経験値残ってるか。
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);

        // var a1_2 = 0;
        // var a2_2 = 0;
        // if (a1 <= 850) {
        //     a1_2 = a1 >= 2 ? exp_sum_2017array[a1 - 2] : 0;
        // } else if (a1 <= 1500) {
        //     a1_2 = exp_sum_2019array[a1 - 851];
        // }
        // if (a2 <= 850) {
        //     a2_2 = a2 >= 2 ? exp_sum_2017array[a2 - 2] : 0;
        // } else if (a2 <= 1500) {
        //     a2_2 = exp_sum_2019array[a2 - 851];
        // }
        // r1 = a2_2 - a1_2;
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r1.value = r1.lv;
    document.f.r2.value = r2.lv;
    document.f.r3.value = r3.lv;
    document.f.r11.value = r1.per;
    document.f.r12.value = r2.per;
    document.f.r13.value = r3.per;
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