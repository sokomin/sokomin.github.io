function init1() {
    document.f.a1.value = 1;

    document.f.b1.value = 0;

    document.f.b1.options[0] = new Option('2022～', 6, 1, 1);
    document.f.b1.options[1] = new Option('2005～2011', 1);
    document.f.b1.options[2] = new Option('2011～2015', 2);
    document.f.b1.options[3] = new Option('2015～2016', 3);
    document.f.b1.options[4] = new Option('2017～2018', 4);
    document.f.b1.options[5] = new Option('2019～2021', 5);
    //もっと賢い定義方法あるよね？わかる。
    document.f.a21.value = 1;

    document.f.b2.value = 0;

    document.f.b2.options[0] = new Option('2022～', 6,1,1);
    document.f.b2.options[1] = new Option('2005～2011', 1);
    document.f.b2.options[2] = new Option('2011～2015', 2);
    document.f.b2.options[3] = new Option('2015～2016', 3);
    document.f.b2.options[4] = new Option('2017～2018', 4);
    document.f.b2.options[5] = new Option('2019～2021', 5);

    document.f.a31.value = 1;

    document.f.b3.value = 0;

    document.f.b3.options[0] = new Option('2022～', 6, 1, 1);
    document.f.b3.options[1] = new Option('2005～2011', 1);
    document.f.b3.options[2] = new Option('2011～2015', 2);
    document.f.b3.options[3] = new Option('2015～2016', 3);
    document.f.b3.options[4] = new Option('2017～2018', 4);
    document.f.b3.options[5] = new Option('2019～2021', 5);
}
const limit2022 = 2000;

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
                if (i > 1000) {
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
    } else if (b === 6) {
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
        for (var i = 851; i <= limit2022; i++) {
            if (exp < exp_sum_2019array[i - 851]) {
                var rest = i >= 852 ? exp - exp_sum_2019array[i - 852] : exp - exp_sum_2017array[i - 1];
                ret.rest = rest;
                if (i > 1000) {
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
    var r2 = {};
    var r3 = {};
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var a2 = parseFloat(document.f.a2.value) ? parseFloat(document.f.a2.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;
    document.f.r1.value = "";
    document.f.r2.value = "";
    document.f.r3.value = "";
    document.f.r11.value = "";
    document.f.r12.value = "";
    document.f.r13.value = "";

    if (a2 < 0 || a2 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }
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
        if (a1 >= 1500 && a2 > 0) {
            //システム上はできるけど、シミュレータとしてはやらないでほしい
            document.f.r1.value = "最高レベルは1500です。";
            return;
        }
        var per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        var exp1 = exp_sum_2017array[a1 - 2] + per - exp_300_600_2017;
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? (exp1 - exp_300_600_2017) : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? (exp2 - exp_300_600_2017) : 0;
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
        if (a1 >= 1000 && a2 > 0) {
            //システム上はできるけど、シミュレータとしてはやらないでほしい
            document.f.r1.value = "最高レベルは1000です。";
            return;
        }
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2011array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per - exp_300_600_2011) : (exp_sum_2011array[a1 - 910] + per - exp_300_600_2011);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? (exp1 - exp_300_600_2011) : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? (exp2 - exp_300_600_2011) : 0;
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
        if (a1 >= 1000 && a2 > 0) {
            //システム上はできるけど、シミュレータとしてはやらないでほしい
            document.f.r1.value = "最高レベルは1000です。";
            return;
        }
        var per = 0;
        if (a1 < 909) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2015array[a1 - 909] * a2 / 100);
        }
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per - exp_300_600_2011) : (exp_sum_2015array[a1 - 910] + per - exp_300_600_2011);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv >= 600 ? (exp1 - exp_300_600_2011) : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv >= 600 ? (exp2 - exp_300_600_2011) : 0;
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
        if (a1 >= 1500 && a2 > 0) {
            //システム上はできるけど、シミュレータとしてはやらないでほしい
            document.f.r1.value = "最高レベルは1500です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 > 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        var exp1 = a1 <= 850 || a1 > 1000 ? (exp_sum_2017array[a1 - 2] + per - exp_300_600_2017) : (exp_sum_2019array[a1 - 851] + per - exp_300_600_2017);
        r1 = findReturnerLv(exp1, b1);
        //ここから2転の計算
        var exp2 = r1.lv >= 600 ? (exp1 - exp_300_600_2017) : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        //ここから3転の計算
        var exp3 = r2.lv >= 600 ? (exp2 - exp_300_600_2017) : 0;
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
    } else if (b1 === 6) {
        //2019～
        if (a1 >= 2000) {
            document.f.r21.value = "最高レベルは2000です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 > 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per - exp_300_600_2017) : (exp_sum_2019array[a1 - 851] + per - exp_300_600_2017);
        r1 = findReturnerLv(exp1, b1);
        //ここから2転の計算
        var exp2 = r1.lv >= 600 ? (exp1 - exp_300_600_2017) : 0;
        if (exp2 <= 0) {
            r2.lv = "Lv不足で転生できません。";
            r2.per = "";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        //ここから3転の計算
        var exp3 = r2.lv >= 600 ? (exp2 - exp_300_600_2017) : 0;
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
    var r1 = {};
    var r2 = {};
    var r3 = {};
    var a1 = parseInt(document.f.a21.value) ? parseInt(document.f.a21.value) : 0;
    var a2 = parseFloat(document.f.a22.value) ? parseFloat(document.f.a22.value) : 0;
    var b1 = parseInt(document.f.b2.value) ? parseInt(document.f.b2.value) : 0;
    document.f.r21.value = "";
    document.f.r22.value = "";
    document.f.r23.value = "";
    document.f.r24.value = "";
    document.f.r25.value = "";
    document.f.r26.value = "";

    if (a2 < 0 || a2 >= 100) {
        alert("％以下は0以上100未満で入力してください。");
        return;
    }
    if (a1 < 1) {
        alert("Lvは1以上で入力してください。");
        return;
    }
    if (b1 === 4) {
        //2017～2018
        if (a1 >= 1500) {
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        if (a1 < 300) {
            document.f.r21.value = "最小レベルは300です。";
            return;
        }
        var per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        var exp1 = exp_sum_2017array[a1 - 2] + per + exp_300_600_2017;
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv <= 1500 ? (exp1 + exp_300_600_2017) : 0;
        if (exp2 <= 0) {
            r2.lv = "1500";
            r2.per = "0";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv <= 1500 ? (exp2 + exp_300_600_2017) : 0;
        if (exp3 <= 0) {
            r3.lv = "1500";
            r3.per = "0";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else if (b1 === 1) {
        //2005～2011
        if (a1 === 1 && a2 <= 0) {
            document.f.r21.value = "600";
            document.f.r22.value = "0";
        } else {
            document.f.r21.value = "見つかりませんでした。";
            document.f.r22.value = "[転生後は強制的に1Lv]";
        }
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
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + exp_300_600_2011) : (exp_sum_2011array[a1 - 910] + per + exp_300_600_2011);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv <= 1000 ? (exp1 + exp_300_600_2011) : 0;
        if (exp2 <= 0) {
            r2.lv = "1000";
            r2.per = "0";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv <= 1000 ? (exp2 + exp_300_600_2011) : 0;
        if (exp3 <= 0) {
            r3.lv = "1000";
            r3.per = "0";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
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
        var exp1 = a1 < 910 ? (exp_sum_2017array[a1 - 2] + per + exp_300_600_2011) : (exp_sum_2015array[a1 - 910] + per + exp_300_600_2011);
        r1 = findReturnerLv(exp1, b1);
        var exp2 = r1.lv <= 1000 ? (exp1 + exp_300_600_2011) : 0;
        if (exp2 <= 0) {
            r2.lv = "1000";
            r2.per = "0";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        var exp3 = r2.lv <= 1000 ? (exp2 + exp_300_600_2011) : 0;
        if (exp3 <= 0) {
            r3.lv = "1000";
            r3.per = "0";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else if (b1 === 5) {
        //2019～
        if (a1 >= 1500) {
            document.f.r21.value = "最高レベルは1500です。";
            return;
        }
        if (a1 < 300) {
            document.f.r21.value = "最小レベルは300です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 > 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        // 2連続以降はexpベースで計算する
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per + exp_300_600_2017) : (exp_sum_2019array[a1 - 851] + per + exp_300_600_2017);
        r1 = findReturnerLv(exp1, b1);
        //ここから2転の計算
        var exp2 = r1.lv <= 1500 ? (exp1 + exp_300_600_2017) : 0;
        if (exp2 <= 0) {
            r2.lv = "1500";
            r2.per = "0";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        //ここから3転の計算
        var exp3 = r2.lv <= 1500 ? (exp2 + exp_300_600_2017) : 0;
        if (exp3 <= 0) {
            r3.lv = "1500";
            r3.per = "0";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else if (b1 === 6) {
        //2019～
        if (a1 >= 2000) {
            document.f.r21.value = "最高レベルは2000です。";
            return;
        }
        if (a1 < 300) {
            document.f.r21.value = "最小レベルは300です。";
            return;
        }
        var per = 0;
        if (a1 < 850 || a1 > 1000) {
            per = parseInt(exp_2017array[a1 - 1] * a2 / 100);
        } else {
            per = parseInt(exp_2019array[a1 - 850] * a2 / 100);
        }
        // 2連続以降はexpベースで計算する
        var exp1 = a1 <= 850 ? (exp_sum_2017array[a1 - 2] + per + exp_300_600_2017) : (exp_sum_2019array[a1 - 851] + per + exp_300_600_2017);
        r1 = findReturnerLv(exp1, b1);
        //ここから2転の計算
        var exp2 = r1.lv <= 2000 ? (exp1 + exp_300_600_2017) : 0;
        if (exp2 <= 0) {
            r2.lv = "2000";
            r2.per = "0";
        } else {
            r2 = findReturnerLv(exp2, b1);
        }
        //ここから3転の計算
        var exp3 = r2.lv <= 2000 ? (exp2 + exp_300_600_2017) : 0;
        if (exp3 <= 0) {
            r3.lv = "2000";
            r3.per = "0";
        } else {
            r3 = findReturnerLv(exp3, b1);
        }
        console.log(exp1);
        console.log(exp2);
        console.log(exp3);
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r21.value = r1.lv;
    document.f.r22.value = r2.lv;
    document.f.r23.value = r3.lv;
    document.f.r24.value = r1.per;
    document.f.r25.value = r2.per;
    document.f.r26.value = r3.per;
}


function calc3() {
    var r1 = {};
    var r2 = {};
    var lv = 0;
    var best = {};
    var a1 = parseInt(document.f.a31.value) ? parseInt(document.f.a31.value) : 0;
    var b1 = parseInt(document.f.b3.value) ? parseInt(document.f.b3.value) : 0;
    document.f.r31.value = "";
    document.f.r32.value = "";
    document.f.r33.value = "";
    document.f.r34.value = "";

    if (a1 < 1) {
        alert("Lvは1以上で入力してください。");
        return;
    }
    if (a1 < 700) {
        document.f.r31.value = "700以上のレベル帯でお試しください。";
        return;
    }
    if (b1 === 4) {
        //2017～2018
        if (a1 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per = 0;
        for (var i = 0; i < 600; i++) {
            //1Lv引いて調べてみる
            lv = a1 - i;
            var exp1 = exp_sum_2017array[lv - 2] + per + exp_300_600_2017;
            best = findReturnerLv(exp1, b1);
            var min = i;
            var max = best.lv - a1;
            if (min <= max) {
                r1 = best;
                r2 = {
                    lv: lv,
                    per: 0,
                }
            } else {
                //もういいんだ、もういいんだ…
                break;
            }
        }
        console.log(exp1);
    } else if (b1 === 1) {
        //2005～2011
        document.f.r31.value = "見つかりませんでした。";
        document.f.r32.value = "[転生後は強制的に1Lv]";
        return;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 > 1000) {
            document.f.r31.value = "最高レベルは1000です。";
            return;
        }
        var per = 0;
        for (var i = 0; i < 600; i++) {
            //1Lv引いて調べてみる
            lv = a1 - i;
            var exp1 = lv < 910 ? (exp_sum_2017array[lv - 2] + per + exp_300_600_2011) : (exp_sum_2011array[lv - 910] + per + exp_300_600_2011);
            best = findReturnerLv(exp1, b1);
            var min = i;
            var max = best.lv - a1;
            if (min <= max) {
                r1 = best;
                r2 = {
                    lv: lv,
                    per: 0,
                }
            } else {
                //もういいんだ、もういいんだ…
                break;
            }
        }
        console.log(exp1);
    } else if (b1 === 3) {
        //2015～2016
        if (a1 > 1000) {
            document.f.r31.value = "最高レベルは1000です。";
            return;
        }
        var per = 0;
        for (var i = 0; i < 600; i++) {
            //1Lv引いて調べてみる
            lv = a1 - i;
            var exp1 = lv < 910 ? (exp_sum_2017array[lv - 2] + per + exp_300_600_2011) : (exp_sum_2015array[lv - 910] + per + exp_300_600_2011);
            best = findReturnerLv(exp1, b1);
            var min = i;
            var max = best.lv - a1;
            if (min <= max) {
                r1 = best;
                r2 = {
                    lv: lv,
                    per: 0,
                }
            } else {
                //もういいんだ、もういいんだ…
                break;
            }
        }
        console.log(exp1);
    } else if (b1 === 5) {
        //2019～
        if (a1 >= 1500) {
            document.f.r31.value = "最高レベルは1500です。";
            return;
        }
        var per = 0;
        for (var i = 0; i < 600; i++) {
            //1Lv引いて調べてみる
            lv = a1 - i;
            var exp1 = lv <= 850 ? (exp_sum_2017array[lv - 2] + per + exp_300_600_2017) : (exp_sum_2019array[lv - 851] + per + exp_300_600_2017);
            best = findReturnerLv(exp1, b1);
            var min = i;
            var max = best.lv - a1;
            if (min <= max) {
                r1 = best;
                r2 = {
                    lv: lv,
                    per: 0,
                }
            } else {
                //もういいんだ、もういいんだ…
                break;
            }
        }
        console.log(exp1);
    } else if (b1 === 6) {
        //2019～
        if (a1 >= 2000) {
            document.f.r31.value = "最高レベルは2000です。";
            return;
        }
        var per = 0;
        for (var i = 0; i < 600; i++) {
            //1Lv引いて調べてみる
            lv = a1 - i;
            var exp1 = lv <= 850 ? (exp_sum_2017array[lv - 2] + per + exp_300_600_2017) : (exp_sum_2019array[lv - 851] + per + exp_300_600_2017);
            best = findReturnerLv(exp1, b1);
            var min = i;
            var max = best.lv - a1;
            if (min <= max) {
                r1 = best;
                r2 = {
                    lv: lv,
                    per: 0,
                }
            } else {
                //もういいんだ、もういいんだ…
                break;
            }
        }
        console.log(exp1);
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r31.value = r1.lv;
    document.f.r32.value = r2.lv;
    document.f.r33.value = r1.per;
    document.f.r34.value = r2.per;
}