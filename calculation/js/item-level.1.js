
function calc1() {
    var sum_item_1 = 0;
    var a1 = parseInt(document.f.a1.value) ? parseInt(document.f.a1.value) : 0;
    var a2 = parseInt(document.f.a2.value) ? parseInt(document.f.a2.value) : 0;
    var a3 = parseInt(document.f.a3.value) ? parseInt(document.f.a3.value) : 0;
    var a4 = parseInt(document.f.a4.value) ? parseInt(document.f.a4.value) : 0;
    var a5 = parseInt(document.f.a5.value) ? parseInt(document.f.a5.value) : 0;
    var a6 = parseInt(document.f.a6.value) ? parseInt(document.f.a6.value) : 0;
    var b1 = parseInt(document.f.b1.value) ? parseInt(document.f.b1.value) : 0;

    var test = new Array(a4, a5, a6);
    test.sort(function (a, b) {
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
    });
    a4 = test[2];
    a5 = test[1];
    a6 = test[0];

    sum_item_1 = a1 - a2 - a3;
    if (sum_item_1 < 0) {
        sum_item_1 = 0;
    }
    if (b1 === 1) {
        if (a5 === 0 && a6 === 0) {
            sum_item_1 = sum_item_1 + a4;
        } else if (a6 === 0) {
            sum_item_1 = sum_item_1 + Math.floor(a4 * 3 / 4) + Math.floor(a5 * 1 / 4);
        } else {
            sum_item_1 = sum_item_1 + Math.floor(a4 * 3 / 4) + Math.floor(a5 * 1 / 4) + Math.floor(a6 * 1 / 20);
        }
    } else {
        if (a5 === 0 && a6 === 0) {
            sum_item_1 = sum_item_1 + a4;
        } else if (a6 === 0) {
            sum_item_1 = sum_item_1 + a4 + Math.floor(a5 * 2 / 3);
        } else {
            sum_item_1 = sum_item_1 + a4 + Math.floor(a5 * 2 / 3) + Math.floor(a6 * 1 / 3);
        }
    }

    document.f.r1.value = Math.floor(sum_item_1);

}

