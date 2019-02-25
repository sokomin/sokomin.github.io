function init1() {
    document.f.a1.value = 0;
    // document.f.a2.value = 0;
    // document.f.a3.value = 0;
    document.f.a4.value = 0;
    document.f.a5.value = 0;
    // document.f.a6.value = 0;
    document.f.a7.value = 0;
    document.f.a8.value = 0;
    // document.f.a9.value = 0;
    document.f.a10.value = 0;
    document.f.a11.value = 0;
    // document.f.a12.value = 0;
    // document.f.a13.value = 0;
    // document.f.a14.value = 1;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;
    document.f.r3.value = 0;
    document.f.r4.value = 0;
    document.f.r5.value = 0;
    document.f.r6.value = 0;

    document.f.b1.options[0] = new Option('通常', 0, 1, 1);
    document.f.b1.options[1] = new Option('追放天使', 1);
    // document.f.b1.options[2] = new Option('EMそこみん', 40);
    // document.f.b1.options[3] = new Option('武器攻撃力依存', 3);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function calc1() {
    var wisdom_n = 0;
    var wisdom_b = 0;
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    // var a2 = parseInt(document.f.a2.value) ? parseInt(document.f.a2.value) : 0;
    // var a3 = parseInt(document.f.a3.value) ? parseInt(document.f.a3.value) : 0;
    var a4 = parseInt(document.f.a4.value) ? parseInt(document.f.a4.value) : 0;
    var a5 = parseInt(document.f.a5.value) ? parseInt(document.f.a5.value) : 0;
    // var a6 = parseInt(document.f.a6.value) ? parseInt(document.f.a6.value) : 0;
    var a7 = (document.f.a7.value) ? (document.f.a7.value) : 0;
    var a8 = (document.f.a8.value) ? (document.f.a8.value) : 0;
    // var a9 = parseInt(document.f.a9.value) ? parseInt(document.f.a9.value) : 0;
    var a10 = parseInt(document.f.a10.value) ? parseInt(document.f.a10.value) : 0;
    var a11 = parseInt(document.f.a11.value) ? parseInt(document.f.a11.value) : 0;
    // var a12 = parseInt(document.f.a12.value) ? parseInt(document.f.a12.value) : 0;
    // var a13 = parseInt(document.f.a13.value) ? parseInt(document.f.a13.value) : 0;
    // var a14 = parseInt(document.f.a14.value) ? parseInt(document.f.a14.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;

    if (a4 > 0) {
        a5 = a4 * 2 + 80;
        document.f.a5.value = Math.floor(a5);
    }

    wisdom_n = a1 + a10 + a11;
    var wisdom_s = Math.floor(wisdom_n * ((100 + a5) / 100));
    var down = (a7 - a8) > 0 ? (a7 - a8) : 0;
    wisdom_b = Math.floor(wisdom_n * ((100-down)/100));
    if (b1 === 0) {
        // 何もしない
    } else if (b1 === 1) {
        wisdom_n = Math.floor(wisdom_n * 1.03);
        wisdom_b = Math.floor(wisdom_b * 1.03);
        wisdom_s = Math.floor(wisdom_s * 1.03);
    } else if (b1 === 40) {
        document.f.r1.value = Math.floor(400000);
        document.f.r2.value = Math.floor(400000);
        document.f.r3.value = Math.floor(400000);
        document.f.r4.value = Math.floor(400000);
        document.f.r5.value = Math.floor(400000);
        document.f.r6.value = Math.floor(400000);
        return;
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }
    var wisdom_n_exp = calcIntOption(wisdom_n);
    var wisdom_b_exp = calcIntOption(wisdom_b);
    var wisdom_s_exp = calcIntOption(wisdom_s);

    document.f.r1.value = Math.floor(wisdom_n);
    document.f.r2.value = Math.floor(wisdom_n_exp);
    document.f.r3.value = Math.floor(wisdom_b);
    document.f.r4.value = Math.floor(wisdom_b_exp);
    document.f.r5.value = Math.floor(wisdom_s);
    document.f.r6.value = Math.floor(wisdom_s_exp);

}


function calcIntOption(intParam) {
    //もっとトリッキーなコードの書き方したさある
    //えぐい条件文になってるぞ…そんなコードで大丈夫か？
    if (!intParam) {
        return 0;
    } else if (intParam <= 99) {
        return 0;
    } else if (intParam <= 119) {
        return 5;
    } else if (intParam <= 139) {
        return 6;
    } else if (intParam <= 159) {
        return 7;
    } else if (intParam <= 179) {
        return 8;
    } else if (intParam <= 199) {
        return 9;
    } else if (intParam <= 239) {
        return 10;
    } else if (intParam <= 279) {
        return 11;
    } else if (intParam <= 319) {
        return 12;
    } else if (intParam <= 359) {
        return 13;
    } else if (intParam <= 399) {
        return 14;
    } else if (intParam <= 400) {
        return 15;
    } else if (intParam <= 479) {
        return 20;
    } else if (intParam <= 559) {
        return 21;
    } else if (intParam <= 639) {
        return 22;
    } else if (intParam <= 719) {
        return 23;
    } else if (intParam <= 799) {
        return 24;
    } else if (intParam <= 800) {
        return 25;
    } else if (intParam <= 959) {
        return 30;
    } else if (intParam <= 1119) {
        return 31;
    } else if (intParam <= 1279) {
        return 32;
    } else if (intParam <= 1439) {
        return 33;
    } else if (intParam <= 1599) {
        return 34;
    } else if (intParam <= 1600) {
        return 35;
    } else if (intParam <= 1919) {
        return 40;
    } else if (intParam <= 1119) {
        return 31;
    } else if (intParam <= 1279) {
        return 32;
    } else if (intParam <= 1439) {
        return 33;
    } else if (intParam <= 1599) {
        return 34;
    } else if (intParam <= 1600) {
        return 35;
    } else if (intParam <= 1919) {
        return 40;
    } else if (intParam <= 2239) {
        return 41;
    } else if (intParam <= 2559) {
        return 42;
    } else if (intParam <= 2879) {
        return 43;
    } else if (intParam <= 3199) {
        return 44;
    } else if (intParam <= 3200) {
        return 45;
    } else if (intParam <= 3839) {
        return 50;
    } else if (intParam <= 4479) {
        return 51;
    } else if (intParam <= 5119) {
        return 52;
    } else if (intParam <= 5759) {
        return 53;
    } else if (intParam <= 6399) {
        return 54;
    } else if (intParam <= 6400) {
        return 55;
    } else if (intParam <= 7679) {
        return 60;
    } else if (intParam <= 8959) {
        return 61;
    } else if (intParam <= 10239) {
        return 62;
    } else if (intParam <= 11519) {
        return 63;
    } else if (intParam <= 12799) {
        return 64;
    } else if (intParam <= 12800) {
        return 65;
    } else if (intParam <= 15359) {
        return 70;
    } else if (intParam <= 17919) {
        return 71;
    } else if (intParam <= 20479) {
        return 72;
    } else if (intParam <= 23039) {
        return 73;
    } else if (intParam <= 25999) {
        return 74;
    } else if (intParam <= 25600) {
        return 75;
    } else if (intParam <= 30719) {
        return 80;
    } else if (intParam <= 35839) {
        return 81;
    } else if (intParam <= 40959) {
        return 82;
    } else if (intParam <= 46079) {
        return 83;
    } else if (intParam <= 51199) {
        return 84;
    } else if (intParam <= 51200) {
        return 85;
    } else if (intParam <= 61439) {
        return 90;
    } else if (intParam <= 71679) {
        return 91;
    } else if (intParam <= 81919) {
        return 92;
    } else if (intParam <= 92159) {
        return 93;
    } else if (intParam <= 102399) {
        return 94;
    } else if (intParam <= 102400) {
        return 95;
    } else {
        //102401で上限らしい
        return 100;
    }
    //計算式で書くなら、Math.floor(log2(intParam/10)) * いろいろ
    //大丈夫だ、問題ない。
}

