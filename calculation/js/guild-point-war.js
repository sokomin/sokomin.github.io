function init1() {
    document.f.r1.value = 0;
    document.f.r2.value = 0;
    document.f.r3.value = 0;
    document.f.r4.value = 0;
    document.f.r5.value = 0;
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function tweet() {
    if (!document.f.r5.value || document.f.r5.value <=0) {
        alert("挑戦してからツイートボタンを押してください。");
        return;
    }
    var text = "ポイント戦シミュレータで、" + parseInt(document.f.r5.value) + "点ゲットしました！";
    var hashtags = "赤石の民衆"
	window.open(
        'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&hashtags=' + encodeURIComponent(hashtags),
		'share window','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
	);
	return !1;
}

function calc1() {
    var sum_pt = 0;
    var stage1 = calcStage1();
    var stage2 = calcStage2();
    var stage3 = calcStage3();
    var stage4 = calcStage4();
    var stage5 = calcStage5();
    document.f.r1.value = Math.floor(stage1);
    sum_pt = stage1 + stage2;
    document.f.r2.value = Math.floor(sum_pt);
    sum_pt += stage3;
    document.f.r3.value = Math.floor(sum_pt);
    sum_pt += stage4;
    document.f.r4.value = Math.floor(sum_pt);
    sum_pt += stage5;
    document.f.r5.value = Math.floor(sum_pt);

    //平均出力用
    // var sum_ave = 0;
    // var ave_stage1 = testCalcStage1();
    // var ave_stage2 = testCalcStage2();
    // var ave_stage3 = testCalcStage3();
    // var ave_stage5 = testCalcStage5();
    // document.f.r6.value = Math.floor(ave_stage1);
    // sum_ave = ave_stage1 + ave_stage2;
    // document.f.r7.value = Math.floor(sum_ave);
    // sum_ave += ave_stage3;
    // document.f.r8.value = Math.floor(sum_ave);
    // sum_ave += stage4;
    // document.f.r9.value = Math.floor(sum_ave);
    // sum_ave += ave_stage5;
    // document.f.r10.value = Math.floor(sum_ave);
}

// sinon使えば乱数テストできるんだよねぇ
function testCalcStage1() {
    var level_sum = 0;
    level_sum += (14 * 215);
    level_sum += (9 * 235);
    level_sum += (13 * 225);
    level_sum += (11 * 155);
    level_sum += (7 * 175);
    level_sum += (15 * 165);
    level_sum += (16 * 240);
    level_sum += 240;
    level_sum += 180;
    level_sum += (14 * 185);
    level_sum += (10 * 203);
    level_sum += 180;
    level_sum += (15 * 193);

    return level_sum * 80;
}


function calcStage1() {
    //そんなコードで大丈夫か？
    var level_sum = 0;
    for (var i = 0; i < 14; i++) {
        var kuma = Math.floor(Math.random() * 11) + 210;
        level_sum += kuma;
    }
    for (var i = 0; i < 9; i++) {
        var orga = Math.floor(Math.random() * 11) + 230;
        level_sum += orga;
    }
    for (var i = 0; i < 13; i++) {
        var orga2 = Math.floor(Math.random() * 11) + 220;
        level_sum += orga2;
    }
    for (var i = 0; i < 11; i++) {
        var ifu = Math.floor(Math.random() * 11) + 150;
        level_sum += ifu;
    }
    for (var i = 0; i < 7; i++) {
        var rizard = Math.floor(Math.random() * 11) + 170;
        level_sum += rizard;
    }
    for (var i = 0; i < 15; i++) {
        var rizard2 = Math.floor(Math.random() * 11) + 160;
        level_sum += rizard2;
    }
    for (var i = 0; i < 16; i++) {
        var hone = Math.floor(Math.random() * 11) + 240;
        level_sum += hone;
    }
    level_sum += 240;
    level_sum += 180;

    for (var i = 0; i < 14; i++) {
        var inu = Math.floor(Math.random() * 11) + 180;
        level_sum += inu;
    }
    for (var i = 0; i < 10; i++) {
        var wasi = Math.floor(Math.random() * 16) + 195;
        level_sum += wasi;
    }
    level_sum += 180;
    for (var i = 0; i < 15; i++) {
        var wasi2 = Math.floor(Math.random() * 11) + 185;
        level_sum += wasi2;
    }
    // 一番いい乱数を頼む(MT)
    return level_sum * 80;
}

function testCalcStage2() {
    var level_sum = 0;
    level_sum += 275;
    level_sum += 275;
    // FIXME これ数あってるっけ？
    // level_sum += 350;
    level_sum += 400;
    level_sum += 400;
    level_sum += 400;
    level_sum += 400;
    level_sum += 310;
    level_sum += 310;
    level_sum += 310;
    level_sum += 340;
    level_sum += 430;
    level_sum += 430;
    level_sum += 430;
    level_sum += 430;

    level_sum += (10 * 333);
    level_sum += (12 * 383);
    level_sum += (10 * 393);
    level_sum += 280;

    level_sum += (12 * 303);
    level_sum += (4 * 303);
    level_sum += (9 * 273);
    level_sum += (8 * 318);
    level_sum += 340;
    level_sum += 340;
    level_sum += 340;
    level_sum += 340;
    level_sum += (8 * 258);
    level_sum += (11 * 288);
    level_sum += 430;
    level_sum += 310;


    return level_sum * 80;
}

function calcStage2() {
    //そんなコードで大丈夫か？
    var level_sum = 0;
    level_sum += 275;
    level_sum += 275;
    // level_sum += 350;
    level_sum += 400;
    level_sum += 400;
    level_sum += 400;
    level_sum += 400;
    level_sum += 310;
    level_sum += 310;
    level_sum += 310;
    level_sum += 340;
    level_sum += 430;
    level_sum += 430;
    level_sum += 430;
    level_sum += 430;
    //バーノンの幻影


    for (var i = 0; i < 10; i++) {
        var gago = Math.floor(Math.random() * 16) + 325;
        level_sum += gago;
    }
    for (var i = 0; i < 12; i++) {
        var debi = Math.floor(Math.random() * 16) + 375;
        level_sum += debi;
    }
    for (var i = 0; i < 10; i++) {
        var akuma = Math.floor(Math.random() * 16) + 385;
        level_sum += akuma;
    }
    level_sum += 280;

    for (var i = 0; i < 12; i++) {
        var ge = Math.floor(Math.random() * 16) + 295;
        level_sum += ge;
    }
    for (var i = 0; i < 4; i++) {
        var whip = Math.floor(Math.random() * 16) + 295;
        level_sum += whip;
    }
    for (var i = 0; i < 9; i++) {
        var ki = Math.floor(Math.random() * 16) + 265;
        level_sum += ki;
    }
    for (var i = 0; i < 8; i++) {
        var destroy = Math.floor(Math.random() * 16) + 310;
        level_sum += destroy;
    }
    level_sum += 340;
    level_sum += 340;
    level_sum += 340;
    level_sum += 340;

    for (var i = 0; i < 8; i++) {
        var hone = Math.floor(Math.random() * 16) + 250;
        level_sum += hone;
    }
    for (var i = 0; i < 11; i++) {
        var gobu = Math.floor(Math.random() * 16) + 280;
        level_sum += gobu;
    }
    level_sum += 430;
    level_sum += 310;

    // 一番いい乱数を頼む(MT)
    return level_sum * 80;
}

function testCalcStage3() {
    var level_sum = 0;
    level_sum += 450;
    level_sum += 460;

    level_sum += (10 * 435);
    level_sum += (10 * 460);
    level_sum += (10 * 455);
    level_sum += 470;

    level_sum += (17 * 465);
    level_sum += (10 * 445);
    level_sum += (10 * 445);
    level_sum += 450;
    level_sum += 450;


    return level_sum * 80;
}
function calcStage3() {
    //そんなコードで大丈夫か？
    var level_sum = 0;
    level_sum += 450;
    level_sum += 460;

    for (var i = 0; i < 10; i++) {
        var giga = Math.floor(Math.random() * 11) + 430;
        level_sum += giga;
    }
    for (var i = 0; i < 10; i++) {
        var debi = 460;
        level_sum += debi;
    }
    for (var i = 0; i < 10; i++) {
        var pam = Math.floor(Math.random() * 11) + 450;
        level_sum += pam;
    }
    // 止まるんじゃねぇぞ
    level_sum += 470;
    for (var i = 0; i < 17; i++) {
        var ge = Math.floor(Math.random() * 11) + 460;
        level_sum += ge;
    }
    for (var i = 0; i < 10; i++) {
        var whip = Math.floor(Math.random() * 11) + 440;
        level_sum += whip;
    }
    for (var i = 0; i < 10; i++) {
        var ki = Math.floor(Math.random() * 11) + 440;
        level_sum += ki;
    }

    level_sum += 450;
    level_sum += 450;
    // 一番いい乱数を頼む(MT)
    return level_sum * 80;
}


function calcStage4() {
    //神は言っている
    var level_sum = 0;

    for (var i = 0; i < 23; i++) {
        var mogura = 550;
        level_sum += mogura;
    }
    for (var i = 0; i < 23; i++) {
        var mogura2 = 560;
        level_sum += mogura2;
    }
    // ここで死ぬ定めではないと…
    return level_sum * 80;
}

function testCalcStage5() {
    var level_sum = 0;
    level_sum += 2400;
    

    return level_sum * 80 + 31550;
}

function calcStage5() {
    //神は言っている
    var level_sum = 0;
    level_sum += 600;
    level_sum += 600;
    level_sum += 600;
    level_sum += 600;
    // 秒数？
    var additional = 31400 + Math.floor(Math.random() * 31) * 10;
    // level_sum += 180;

    // ここで死ぬ定めではないと…
    return (level_sum * 80 + additional);
}
