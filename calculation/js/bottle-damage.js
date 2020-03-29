function init1() {
    document.f.a2.value = 0;
    document.f.a3.value = 0;
    document.f.a4.value = 0;
    document.f.a5.value = 0;
    document.f.a6.value = 0;
    document.f.a7.value = 0;
    document.f.a8.value = 0;
    document.f.a9.value = 0;
    document.f.a101.value = 0;
    document.f.a102.value = 0;
    document.f.a103.value = 0;
    document.f.a104.value = 0;
    document.f.a105.value = 0;
    document.f.a106.value = 0;
    document.f.a201.value = 0;
    document.f.a202.value = 0;
    document.f.a203.value = 0;
    document.f.a204.value = 0;
    document.f.a205.value = 0;
    document.f.a206.value = 0;
    document.f.a301.value = 0;
    document.f.a302.value = 0;
    document.f.a303.value = 0;
    document.f.a304.value = 0;
    document.f.a305.value = 0;
    document.f.a306.value = 0;
    document.f.a401.value = 0;
    document.f.a402.value = 0;
    document.f.a403.value = 0;
    document.f.a404.value = 0;
    document.f.a405.value = 0;
    document.f.a406.value = 0;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;

    document.f.b1.options[0] = new Option('通常スキル', 0, 1, 1);
    document.f.b1.options[1] = new Option('覚醒スキル', 1);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function calc1() {
    var min_damage = 0;
    var gv_damage = 0;
    var lb_damage = 0;
    var a2 = parseInt(document.f.a2.value) ? parseInt(document.f.a2.value) : 0;
    var a3 = parseInt(document.f.a3.value) ? parseInt(document.f.a3.value) : 0;
    var a4 = parseInt(document.f.a4.value) ? parseInt(document.f.a4.value) : 0;
    var a5 = parseInt(document.f.a5.value) ? parseInt(document.f.a5.value) : 0;
    var a6 = parseInt(document.f.a6.value) ? parseInt(document.f.a6.value) : 0;
    var a7 = parseInt(document.f.a7.value) ? parseInt(document.f.a7.value) : 0;
    var a8 = parseInt(document.f.a8.value) ? parseInt(document.f.a8.value) : 0;
    var a9 = parseInt(document.f.a9.value) ? parseInt(document.f.a9.value) : 0;

    //属性基礎
    var a101 = parseInt(document.f.a101.value) ? parseInt(document.f.a101.value) : 0;
    var a102 = parseInt(document.f.a102.value) ? parseInt(document.f.a102.value) : 0;
    var a103 = parseInt(document.f.a103.value) ? parseInt(document.f.a103.value) : 0;
    var a104 = parseInt(document.f.a104.value) ? parseInt(document.f.a104.value) : 0;
    var a105 = parseInt(document.f.a105.value) ? parseInt(document.f.a105.value) : 0;
    var a106 = parseInt(document.f.a106.value) ? parseInt(document.f.a106.value) : 0;
    //属性強化
    var a201 = parseInt(document.f.a201.value) ? parseInt(document.f.a201.value) : 0;
    var a202 = parseInt(document.f.a202.value) ? parseInt(document.f.a202.value) : 0;
    var a203 = parseInt(document.f.a203.value) ? parseInt(document.f.a203.value) : 0;
    var a204 = parseInt(document.f.a204.value) ? parseInt(document.f.a204.value) : 0;
    var a205 = parseInt(document.f.a205.value) ? parseInt(document.f.a205.value) : 0;
    var a206 = parseInt(document.f.a206.value) ? parseInt(document.f.a206.value) : 0;
    //属性弱化
    var a301 = parseInt(document.f.a301.value) ? parseInt(document.f.a301.value) : 0;
    var a302 = parseInt(document.f.a302.value) ? parseInt(document.f.a302.value) : 0;
    var a303 = parseInt(document.f.a303.value) ? parseInt(document.f.a303.value) : 0;
    var a304 = parseInt(document.f.a304.value) ? parseInt(document.f.a304.value) : 0;
    var a305 = parseInt(document.f.a305.value) ? parseInt(document.f.a305.value) : 0;
    var a306 = parseInt(document.f.a306.value) ? parseInt(document.f.a306.value) : 0;
    //敵の抵抗
    var a401 = parseInt(document.f.a401.value) ? parseInt(document.f.a401.value) : 0;
    var a402 = parseInt(document.f.a402.value) ? parseInt(document.f.a402.value) : 0;
    var a403 = parseInt(document.f.a403.value) ? parseInt(document.f.a403.value) : 0;
    var a404 = parseInt(document.f.a404.value) ? parseInt(document.f.a404.value) : 0;
    var a405 = parseInt(document.f.a405.value) ? parseInt(document.f.a405.value) : 0;
    var a406 = parseInt(document.f.a406.value) ? parseInt(document.f.a406.value) : 0;
    var b1 = 0;

    if (b1 === 0) {
        //スキル
        var skilldamage = 1 + a2 / 10;
        // 各属性強化
        var base1 = parseInt(a101 * (1 + a201 / 100));
        var base2 = parseInt(a102 * (1 + a202 / 100));
        var base3 = parseInt(a103 * (1 + a203 / 100));
        var base4 = parseInt(a104 * (1 + a204 / 100));
        var base5 = parseInt(a105 * (1 + a205 / 100));
        var base6 = parseInt(a106 * (1 + a206 / 100));
        //全属性強化
        base1 = parseInt(base1 * (1 + a4 / 100));
        base2 = parseInt(base2 * (1 + a4 / 100));
        base3 = parseInt(base3 * (1 + a4 / 100));
        base4 = parseInt(base4 * (1 + a4 / 100));
        base5 = parseInt(base5 * (1 + a4 / 100));
        base6 = parseInt(base6 * (1 + a4 / 100));
        //属性弱化
        base1 = parseInt(base1 * (1 + (a5 + a301 - a401) / 100));
        base2 = parseInt(base2 * (1 + (a5 + a302 - a402) / 100));
        base3 = parseInt(base3 * (1 + (a5 + a303 - a403) / 100));
        base4 = parseInt(base4 * (1 + (a5 + a304 - a404) / 100));
        base5 = parseInt(base5 * (1 + (a5 + a305 - a405) / 100));
        base6 = parseInt(base6 * (1 + (a5 + a306 - a406) / 100));
        // マイナスは出さんぞ
        base1 = base1 > 0 ? base1 : 0;
        base2 = base2 > 0 ? base2 : 0;
        base3 = base3 > 0 ? base3 : 0;
        base4 = base4 > 0 ? base4 : 0;
        base5 = base5 > 0 ? base5 : 0;
        base6 = base6 > 0 ? base6 : 0;
        // 最終的な属性合算
        min_damage = (base1 * skilldamage) + (base2 * skilldamage) + (base3 * skilldamage)
            + (base4 * skilldamage) + (base5 * skilldamage) + (base6 * skilldamage);
        // 知識補正は最後に計算だよ
        min_damage = min_damage * (1 + (a3 / 200));

        //最終ダメージと敵ダメージカットはこれ全部無視させとく
        min_damage = min_damage * (1 + a8 / 100);
        min_damage = min_damage * (1 - a9 / 100);
        // TODO Gvダメージここでいい？
        gv_damage = parseInt(Math.sqrt(min_damage));

        // 限界突破計算
        if (min_damage > 20000) {
            lb_damage = 20000 + lb_table(min_damage, a6, a7);
        } else {
            lb_damage = min_damage;
        }

        // 0以下は出したくない
        if (min_damage <= 0) {
            min_damage = 0;
        }

        //小数点第2位までしか扱わないので。切り捨てておく
        min_damage = parseInt(min_damage * 100) / 100;
    } else if (b1 === 1) {
        //跳弾関連の計算結果出すためのロジックほしいよね
    } else {
        //ここ通らないはずです。
        console.log("ｚｚｚ");
    }

    document.f.r1.value = Math.floor(min_damage);
    document.f.r2.value = Math.floor(gv_damage);
    document.f.r3.value = Math.floor(lb_damage);

}

// 他でも使いたい
function lb_table(min_damage, a6, a7) {
    var lb = min_damage - 20000;
    a6 = (a6 > 0) ? a6 : 0;
    if (lb <= 0 || a7 <= 0) {
        return 0;
    }
    if (a6 === 1) {
        lb = parseInt(lb * ((8 + a6) / 100));
    } else if (a7 === 2) {
        lb = parseInt(lb * ((16 + a6) / 100));
    } else if (a7 === 3) {
        lb = parseInt(lb * ((24 + a6) / 100));
    } else if (a7 === 4) {
        lb = parseInt(lb * ((32 + a6) / 100));
    } else if (a7 === 5) {
        lb = parseInt(lb * ((36 + a6) / 100));
    } else if (a7 >= 6) {
        // チートかな？
        lb = parseInt(lb * ((36 + a6) / 100));
    }
    return lb;
}