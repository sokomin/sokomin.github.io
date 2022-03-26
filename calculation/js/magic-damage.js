function init1() {
    document.f.a1.value = 0;
    document.f.a2.value = 0;
    document.f.a3.value = 0;
    document.f.a4.value = 0;
    document.f.a5.value = 0;
    document.f.a6.value = 0;
    document.f.a7.value = 0;
    document.f.a8.value = 0;
    document.f.a9.value = 0;
    document.f.a10.value = 0;
    document.f.a11.value = 0;
    document.f.a12.value = 0;
    document.f.a13.value = 0;
    document.f.a14.value = 1;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;

    document.f.b1.options[0] = new Option('純粋魔法', 0, 1, 1);
    document.f.b1.options[1] = new Option('物理ダメを含む魔法', 1);
    document.f.b1.options[2] = new Option('改変ドラツイ', 2);
    // document.f.b1.options[3] = new Option('武器攻撃力依存', 3);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function calc1() {
    var min_damage = 0;
    var max_damage = 0;
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var a2 = parseInt(document.f.a2.value) ? parseInt(document.f.a2.value) : 0;
    var a3 = parseInt(document.f.a3.value) ? parseInt(document.f.a3.value) : 0;
    var a4 = parseInt(document.f.a4.value) ? parseInt(document.f.a4.value) : 0;
    var a5 = parseInt(document.f.a5.value) ? parseInt(document.f.a5.value) : 0;
    var a6 = parseInt(document.f.a6.value) ? parseInt(document.f.a6.value) : 0;
    var a7 = parseInt(document.f.a7.value) ? parseInt(document.f.a7.value) : 0;
    var a8 = parseInt(document.f.a8.value) ? parseInt(document.f.a8.value) : 0;
    var a9 = parseInt(document.f.a9.value) ? parseInt(document.f.a9.value) : 0;
    //武器攻撃力
    var a10 = parseInt(document.f.a10.value) ? parseInt(document.f.a10.value) : 0;
    //石像補正
    var a11 = parseInt(document.f.a11.value) ? parseInt(document.f.a11.value) : 0;
    //スキルレベル
    var a12 = parseInt(document.f.a12.value) ? parseInt(document.f.a12.value) : 0;
    //神秘水
    var a13 = parseInt(document.f.a13.value) ? parseInt(document.f.a13.value) : 0;
    //刃油
    var a14 = parseInt(document.f.a14.value) ? parseInt(document.f.a14.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;

    //おなかすいた
    //上限超えてる場合、補正調整かかりますが一旦無視。
    // if (a4 >= 255) {
    //     a4 = 255;
    // }
    // if (a5 >= 255) {
    //     a4 = 255;
    // }

    var intBonus = calcIntOption(a3);
    if (b1 === 0) {
        min_damage = a1 * (1 + intBonus * (a3 / 200));
        min_damage = min_damage * ((100 + a4 + (a7 * 2) + a11) / 100);
        min_damage = min_damage * ((100 - a6 + a5) / 100);
        if (min_damage <= 0) {
            min_damage = 0;
        }
        min_damage = min_damage * (1 + a8/100);
        min_damage = min_damage * (1 + a12/100);
        min_damage = min_damage * (1 - a9/100);
        if (min_damage <= 0) {
            min_damage = 0;
        }
        max_damage = a2 * (1 + intBonus * (a3 / 200));
        max_damage = max_damage * ((100 + a4 + (a7 * 2) + a11) / 100);
        max_damage = max_damage * ((100 - a6 + a5) / 100);
        if (max_damage <= 0) {
            max_damage = 0;
        }
        max_damage = max_damage * (1 + a8/100);
        max_damage = max_damage * (1 + a12/100);
        max_damage = max_damage * (1 - a9/100);
        if (max_damage <= 0) {
            max_damage = 0;
        }
    } else if (b1 === 1) {
        min_damage = a1 * (1 + (a3 / 200));
        min_damage = min_damage * ((100 + a4) / 100);
        min_damage = Math.floor(min_damage * ((100 - a6 + a5) / 100));
        if (min_damage <= 0) {
            min_damage = 0;
        }
        min_damage = min_damage * (1 + a8/100);
        min_damage = min_damage * (1 + a12/100);
        min_damage = min_damage * (1 - a9/100);
        if (min_damage <= 0) {
            min_damage = 0;
        }

        max_damage = a2 * (1 + (a3 / 200));
        max_damage = max_damage * ((100 + a4) / 100);
        max_damage = Math.floor(max_damage * ((100 - a6 + a5) / 100));
        if (max_damage <= 0) {
            max_damage = 0;
        }
        max_damage = max_damage * (1 + a8/100);
        max_damage = max_damage * (1 + a12/100);
        max_damage = max_damage * (1 - a9/100);
        if (max_damage <= 0) {
            max_damage = 0;
        }
    } else if (b1 === 2) {
        //ドラツイ君
        //最小ダメージ側(関数化しろよ感)
        min_damage = (1+a10) * (1 + (a3 / 200)) * 0.5;
        min_damage = min_damage * (1 + (0.6 * a14 /100));
        min_damage = min_damage * ((100 + a11 + a13) / 100);
        min_damage = min_damage * ((100 + a4 + a12) / 100);
        min_damage = Math.floor(min_damage * ((100 - a6 + a5) / 100));
        if (min_damage <= 0) {
            min_damage = 0;
        }
        min_damage = min_damage * (1 + a8/100);
        min_damage = min_damage * (1 + a12/100);
        min_damage = min_damage * (1 - a9/100);
        if (min_damage <= 0) {
            min_damage = 0;
        }
        //最大ダメージ側
        max_damage = (1+a10) * (1 + (a3 / 200)) * 0.5;
        max_damage = max_damage * (1 + (0.6 * a14 /100));
        max_damage = max_damage * ((100 + a11 + a13) / 100);
        max_damage = max_damage * ((100 + a4 + a12) / 100);
        max_damage = Math.floor(max_damage * ((100 - a6 + a5) / 100));
        if (max_damage <= 0) {
            max_damage = 0;
        }
        max_damage = max_damage * (1 + a8/100);
        max_damage = max_damage * (1 + a12/100);
        max_damage = max_damage * (1 - a9/100);
        if (max_damage <= 0) {
            max_damage = 0;
        }
    } else if (b1 === 3) {
        //未実装
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r1.value = Math.floor(min_damage);
    document.f.r2.value = Math.floor(max_damage);

}

function calcIntOption(intParam) { 
    //えぐい条件文になってるぞ…そんなコードで大丈夫か？
    if (!intParam) {
        return 1.00;
    } else if (intParam <= 99) {
        return 1.00;
    } else if (intParam <= 131) {
        return 1.02;
    } else if (intParam <= 173) {
        return 1.04;
    } else if (intParam <= 229) {
        return 1.06;
    } else if (intParam <= 303) {
        return 1.08;
    } else if (intParam <= 401) {
        return 1.10;
    } else if (intParam <= 530) {
        return 1.12;
    } else if (intParam <= 701) {
        return 1.14;
    } else if (intParam <= 927) {
        return 1.16;
    } else if (intParam <= 1226) {
        return 1.18;
    } else if (intParam <= 1576) {
        return 1.20;
    } else if (intParam <= 1926) {
        return 1.22;
    } else if (intParam <= 2276) {
        return 1.24;
    } else if (intParam <= 2676) {
        return 1.26;
    } else if (intParam <= 2976) {
        return 1.28;
    } else if (intParam <= 3326) {
        return 1.30;
    } else if (intParam <= 3676) {
        return 1.32;
    } else if (intParam <= 4026) {
        return 1.34;
    } else if (intParam <= 4376) {
        return 1.36;
    } else if (intParam <= 4726) {
        return 1.38;
    } else if (intParam <= 5126) {
        return 1.40;
    } else if (intParam <= 5526) {
        return 1.42;
    } else if (intParam <= 5926) {
        return 1.44;
    } else if (intParam <= 6326) {
        return 1.46;
    } else if (intParam <= 6726) {
        return 1.48;
    } else if (intParam <= 7126) {
        return 1.50;
    } else {
        var overInt = parseInt((intParam - 7126) / 400);
        var additional = 0.02 * overInt + 1.50;
        return additional;
        //TODO 上限ないんだっけ？
    }
    //大丈夫だ、問題ない。
}

