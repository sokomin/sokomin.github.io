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
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function calc1() {
    var r1 = 0;
    var r2 = 0;
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;
    var sup = def_celestial_sup(a1);
    if (sup === 99) {
        document.f.r1.value = "調査中";
        document.f.r2.value = "調査中";
        return;
    }
    if (sup === 0) {
        document.f.r1.value = 1;
        document.f.r2.value = 1;
        return;
    }
    if (sup === -1) {
        document.f.r1.value = "適正外";
        document.f.r2.value = "適正外";
        return;
    }

    if (b1 === 4) {
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1500) {
            document.f.r1.value = 0;
            document.f.r2.value = "最高レベルは1500です。";
            return;
        }

        r1 = exp_2017array[a1 - 1] * sup / 100;
        r2 = exp_2017array[a1 - 1] * sup * 3 / 100;
    } else if (b1 === 1) {
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 99999999) {
            document.f.r1.value = "ループしました。";
            document.f.r2.value = "ループしました。";
            return;
        }
        r1 = calc_2005exp(a1) * sup / 100;
        r2 = calc_2005exp(a1) * sup * 3 / 100;
    } else if (b1 === 2) {
        //2011～2015
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1000) {
            document.f.r1.value = "5000兆";
            document.f.r2.value = "最高レベルは1000です。";
            return;
        } else if (a1 < 909) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2011array[a1 - 909];
            r2 = exp_2011array[a1 - 909];
        }
        r1 = r1 * sup / 100;
        r2 = r2 * sup * 3 / 100;
    } else if (b1 === 3) {
        //2015～2016
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1500) {
            document.f.r1.value = "5000兆";
            document.f.r2.value = "最高レベルは1000です。";
            return;
        } else if (a1 < 909) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2015array[a1 - 909];
            r2 = exp_2015array[a1 - 909];
        }
        r1 = r1 * sup / 100;
        r2 = r2 * sup * 3 / 100;
    } else if (b1 === 5) {
        //2019～
        if (a1 <= 0) {
            document.f.r1.value = 0;
            document.f.r2.value = 0;
            return;
        } else if (a1 >= 1500) {
            document.f.r1.value = "0";
            document.f.r2.value = "最高レベルは1500です。";
            return;
        } else if (a1 < 850 || a1 >= 1000) {
            r1 = exp_2017array[a1 - 1];
            r2 = exp_2017array[a1 - 1];
        } else if (a1 < 1000) {
            r1 = exp_2019array[a1 - 850];
            r2 = exp_2019array[a1 - 850];
        }
        r1 = r1 * sup / 100;
        r2 = r2 * sup * 3 / 100;
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r1.value = Math.floor(r1);
    document.f.r2.value = Math.floor(r2);

}

//％数値が返ってくるよ、後で1/100してね
//-1はレベル外、99は知らない
function def_celestial_sup(lv) {
    if (lv < 250) {
        return -1;
    }
    if (lv < 700) {
        return 25;
    }
    if (lv < 850) {
        return 99;
    }
    if (lv < 1160) {
        return (3.1 - (lv - 850) * 0.01);
    }
    if (lv >= 1160) {
        return 0;
    }
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
