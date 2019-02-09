function init1() {
    document.f.a1.value = 0;
    document.f.a3.value = 0;
    document.f.a5.value = 0;
    document.f.a6.value = 0;
    document.f.a7.value = 0;
    document.f.a8.value = 0;
    document.f.a9.value = 0;
    document.f.a10.value = 0;
    document.f.a11.value = 0;
    document.f.a12.value = 0;
    document.f.a13.value = 0;
    document.f.a14.value = 0;
    document.f.a15.value = 0;
    document.f.a16.value = 0;
    document.f.a17.value = 0;
    document.f.a18.value = 0;
    document.f.a19.value = 0;
    document.f.a20.value = 0;

    document.f.b1.value = 0;
    document.f.b2.value = 0;
    document.f.b3.value = 0;
    document.f.b4.value = 0;
    document.f.b5.value = 20;

    //結果欄をデフォで埋める用
    document.f.r1.value = 13;
    document.f.r2.value = 0;
    document.f.r3.value = 20;
    document.f.r4.value = 15;
    document.f.r5.value = 4;
    document.f.r6.value = 0.9230769230769231;
    document.f.r7.value = 1.0833333333333333;
    document.f.r8.value = 20;
    document.f.r9.value = 0;
    document.f.r10.value = 20;
    document.f.r11.value = 15;
    document.f.r12.value = 1;
    document.f.r13.value = 0.6;
    document.f.r14.value = 1.6666666666666667;

    document.f.a2.options[0] = new Option('0.45', 0.45);
    document.f.a2.options[1] = new Option('0.50', 0.50);
    document.f.a2.options[2] = new Option('0.55', 0.55);
    document.f.a2.options[3] = new Option('0.60', 0.60);
    document.f.a2.options[4] = new Option('0.75', 0.75);
    document.f.a2.options[5] = new Option('0.80', 0.80);
    document.f.a2.options[6] = new Option('0.90', 0.90);
    document.f.a2.options[7] = new Option('1.00', 1.00, 1, 1);
    document.f.a2.options[8] = new Option('1.10', 1.10);
    document.f.a2.options[9] = new Option('1.20', 1.20);
    document.f.a2.options[10] = new Option('1.30', 1.30);
    document.f.a2.options[11] = new Option('1.40', 1.40);
    document.f.a2.options[12] = new Option('1.50', 1.50);
    document.f.a2.options[13] = new Option('1.60', 1.60);
    document.f.a2.options[14] = new Option('1.70', 1.70);
    document.f.a2.options[15] = new Option('1.80', 1.80);
    document.f.a2.options[16] = new Option('2.00', 2.00);
    document.f.a2.options[17] = new Option('2.50', 2.50);
    document.f.a2.options[18] = new Option('3.00', 3.00);

    document.f.a4.options[0] = new Option('0.45', 0.45);
    document.f.a4.options[1] = new Option('0.50', 0.50);
    document.f.a4.options[2] = new Option('0.55', 0.55);
    document.f.a4.options[3] = new Option('0.60', 0.60);
    document.f.a4.options[4] = new Option('0.75', 0.75);
    document.f.a4.options[5] = new Option('0.80', 0.80);
    document.f.a4.options[6] = new Option('0.90', 0.90);
    document.f.a4.options[7] = new Option('1.00', 1.00);
    document.f.a4.options[8] = new Option('1.10', 1.10);
    document.f.a4.options[9] = new Option('1.20', 1.20);
    document.f.a4.options[10] = new Option('1.30', 1.30);
    document.f.a4.options[11] = new Option('1.40', 1.40);
    document.f.a4.options[12] = new Option('1.50', 1.50, 1, 1);
    document.f.a4.options[13] = new Option('1.60', 1.60);
    document.f.a4.options[14] = new Option('1.70', 1.70);
    document.f.a4.options[15] = new Option('1.80', 1.80);
    document.f.a4.options[16] = new Option('2.00', 2.00);
    document.f.a4.options[17] = new Option('2.50', 2.50);
    document.f.a4.options[18] = new Option('3.00', 3.00);

}

function init2() {
    document.f.s1.value = 0;
    document.f.s2.value = 0;
    document.f.s3.value = 0;
    document.f.s4.value = 0;
    document.f.s5.value = 0;
    document.f.s6.value = 0;
    document.f.s7.value = 0;
    document.f.s8.value = 0;

    document.f.l1.value = 0;
    document.f.l2.value = 0;
    document.f.l3.value = 0;
    document.f.l4.value = 0;
    document.f.l5.value = 0;
    document.f.l6.value = 0;
    document.f.l8.value = 0;

}

function calc1() {
    var sum1, sum2, skill, R4, R14;

    if (document.f.e[0].checked == true)
        skill = parseInt(document.f.s1.value);
    else if (document.f.e[1].checked == true)
        skill = parseInt(document.f.s2.value);
    else if (document.f.e[2].checked == true)
        skill = parseInt(document.f.s3.value);
    else if (document.f.e[3].checked == true)
        skill = parseInt(document.f.s4.value);
    else if (document.f.e[4].checked == true)
        skill = parseInt(document.f.s5.value);
    else if (document.f.e[5].checked == true)
        skill = parseInt(document.f.s6.value);
    else
        skill = parseInt(document.f.s7.value);

    if (document.f.e[0].checked == true) {
        skill += parseInt(document.f.s8.value);
    }

    sum1 = parseInt(document.f.a1.value) + parseInt(document.f.a5.value) +
        parseInt(document.f.a6.value) + parseInt(document.f.a7.value) +
        parseInt(document.f.a8.value) + parseInt(document.f.a9.value) +
        parseInt(document.f.a10.value) + parseInt(document.f.a11.value) +
        parseInt(document.f.a12.value) + parseInt(document.f.a13.value) +
        parseInt(document.f.a14.value) + parseInt(document.f.a15.value) +
        parseInt(document.f.a16.value) + parseInt(document.f.a17.value) +
        parseInt(document.f.a18.value) + parseInt(document.f.a19.value) +
        parseInt(document.f.a20.value);
    sum2 = parseInt(sum1) + parseInt(skill) +
        parseInt(document.f.b1.value) + parseInt(document.f.b2.value) +
        parseInt(document.f.b3.value) + parseInt(document.f.b4.value) +
        parseInt(document.f.b5.value);

    document.f.r1.value = Math.floor(Math.floor(16 * (document.f.a2.value))
        * 100 / (100 + sum2));
    document.f.r2.value = sum1;
    document.f.r3.value = sum2;

    R4 = Math.floor(Math.floor(16 * document.f.a2.value) * 100 / (parseInt(document.f.r1.value) + 1) - 100 + 1);
    if (R4 < 0)
        document.f.r4.value = 0;
    else
        document.f.r4.value = R4;

    document.f.r5.value = Math.floor(Math.floor(16 * document.f.a2.value) * 100 / (parseInt(document.f.r1.value)) - 100 + 1) - sum2;
    document.f.r6.value = 12 / parseInt(document.f.r1.value);
    document.f.r7.value = parseInt(document.f.r1.value) / 12;

    sum11 = parseInt(document.f.a3.value) + parseInt(document.f.a5.value) +
        parseInt(document.f.a6.value) + parseInt(document.f.a7.value) +
        parseInt(document.f.a8.value) + parseInt(document.f.a9.value) +
        parseInt(document.f.a10.value) + parseInt(document.f.a11.value) +
        parseInt(document.f.a12.value) + parseInt(document.f.a13.value) +
        parseInt(document.f.a14.value) + parseInt(document.f.a15.value) +
        parseInt(document.f.a16.value) + parseInt(document.f.a17.value) +
        parseInt(document.f.a18.value) + parseInt(document.f.a19.value) +
        parseInt(document.f.a20.value);
    sum12 = parseInt(sum11) + parseInt(skill) +
        parseInt(document.f.b1.value) + parseInt(document.f.b2.value) +
        parseInt(document.f.b3.value) + parseInt(document.f.b4.value) +
        parseInt(document.f.b5.value);

    document.f.r8.value = Math.floor(Math.floor(16 * (document.f.a4.value))
        * 100 / (100 + sum12));
    document.f.r9.value = sum11;
    document.f.r10.value = sum12;

    R14 = Math.floor(Math.floor(16 * document.f.a4.value) * 100 / (parseInt(document.f.r8.value) + 1) - 100 + 1);
    if (R14 < 0)
        document.f.r11.value = 0;
    else
        document.f.r11.value = R14;

    document.f.r12.value = Math.floor(Math.floor(16 * document.f.a4.value) * 100 / (parseInt(document.f.r8.value)) - 100 + 1) - sum12;
    document.f.r13.value = 12 / parseInt(document.f.r8.value);
    document.f.r14.value = parseInt(document.f.r8.value) / 12;
}

function calcc1() {
    if (document.f.l1.value == 0)
        document.f.s1.value = 0;
    else
        document.f.s1.value = 10 + parseInt(document.f.l1.value) * 0.5;
}

function calcc2() {
    if (document.f.l2.value == 0)
        document.f.s2.value = 0;
    else
        document.f.s2.value = 5 + parseInt(document.f.l2.value) * 0.5;
}

function calcc3() {
    if (document.f.l3.value == 0)
        document.f.s3.value = 0;
    else
        document.f.s3.value = parseInt(document.f.l3.value) * 0.5;
}

function calcc4() {
    if (document.f.l4.value == 0)
        document.f.s4.value = 0;
    else
        document.f.s4.value = 5 + parseInt(document.f.l4.value) * 0.2;
}

function calcc5() {
    if (document.f.l5.value == 0)
        document.f.s5.value = 0;
    else
        document.f.s5.value = 5 + parseInt(document.f.l5.value) * 0.3;
}

function calcc6() {
    if (document.f.l6.value == 0)
        document.f.s6.value = 0;
    else
        document.f.s6.value = 10 + parseInt(document.f.l6.value) * 0.2;
}

function calcc8() {
    if (document.f.l8.value == 0)
        document.f.s8.value = 0;
    else
        document.f.s8.value = 10 + parseInt(document.f.l8.value) * 0.5;
}
