
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

