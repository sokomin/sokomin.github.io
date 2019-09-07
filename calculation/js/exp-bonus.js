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

