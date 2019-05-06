function init1() {
    document.f.a1.value = 0;
    document.f.a2.value = 0;
    document.f.a3.value = 0;

    document.f.b1.value = 0;

    document.f.r1.value = 0;
    document.f.r2.value = 0;
    document.f.r3.value = 0;

    document.f.b1.options[0] = new Option('通常', 0, 1, 1);
    document.f.b1.options[1] = new Option('Gv', 1);
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

function calc1() {
    var sum_item_1 = 0;
    //ダメージ
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    //攻撃者のレベル
    var a2 = parseInt(document.f.a2.value) ? parseInt(document.f.a2.value) : 0;
    var a2p10 = a2 + 10;
    var a2p20 = a2 + 20;
    //防御者のレベル
    var a3 = parseInt(document.f.a3.value) ? parseInt(document.f.a3.value) : 0;
    //通常かGvか
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;

    var result = 0;
    var result10 = 0;
    var result20 = 0;
    if (a1 <= 0) {
        a1 = 0;
    }
    if (b1 === 1) {
        result = Math.sqrt(a1) * Math.sqrt(((a2-a3)*(-0.00000003*(a2-a3)*(a2-a3)+ 0.0045)) + 1);
        result10 = Math.sqrt(a1) * Math.sqrt(((a2p10-a3)*(-0.00000003*(a2p10-a3)*(a2p10-a3)+ 0.0045)) + 1);
        result20 = Math.sqrt(a1) * Math.sqrt(((a2p20-a3)*(-0.00000003*(a2p20-a3)*(a2p20-a3)+ 0.0045)) + 1);
    } else {
        result = a1 * (((a2-a3)*(-0.00000003*(a2-a3)*(a2-a3)+ 0.0045)) + 1);
        result10 = a1 * (((a2p10-a3)*(-0.00000003*(a2p10-a3)*(a2p10-a3)+ 0.0045)) + 1);
        result20 = a1 * (((a2p20-a3)*(-0.00000003*(a2p20-a3)*(a2p20-a3)+ 0.0045)) + 1);
    }

    document.f.r1.value = Math.floor(result);
    document.f.r2.value = Math.floor(result10);
    document.f.r3.value = Math.floor(result20);

}

