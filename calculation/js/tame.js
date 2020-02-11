function calc1() {
  var datA, datB, datC, datD;

  datA = eval(document.form02.txt01.value);
  datB = eval(document.form02.txt02.value);
  datC = eval(document.form02.txt03.value);
  datD = eval(document.form02.txt04.value);

  document.form02.txt05.value = datA + datB + datC + datD - 25;
}
function calc2() {
  var datA, datB, datC, datD;

  datA = eval(document.form03.txt01.value);
  datB = eval(document.form03.txt02.value);
  datC = eval(document.form03.txt03.value);
  datD = eval(document.form03.txt04.value);

  document.form03.txt05.value = datA - datB - datC - datD + 25;
}
function calc3() {
  var settoku, nirami, moblv, arch;
  var resettoku, renirami;

  settoku = eval(document.form01.txt01.value);
  nirami = eval(document.form01.txt02.value);
  moblv = eval(document.form01.txt03.value);
  arch = eval(document.form01.txt04.value);

  resettoku = Math.floor(Math.floor((settoku + arch) * 0.2) + 55);
  renirami = Math.floor(Math.floor((nirami + arch) * 0.4) + 5.4);
  if (resettoku > 70) { resettoku = 70 };
  if (renirami > 30) { renirami = 30 };

  document.form01.txt05.value = Math.floor(moblv * resettoku / 100) + Math.floor(moblv * renirami / 100);
}

//
//　function calc4()
//  機能：毒舌使用Ver計算機モジュール
//
function calc4() {
  teima = eval(document.keisandoku.teimer.value);
  settoku = eval(document.keisandoku.settoku.value);
  nirami = eval(document.keisandoku.nirami.value);
  megami = eval(document.keisandoku.megami.value);
  arch = eval(document.keisandoku.arch.value);
  mobfrom = eval(document.keisandoku.mobfrom.value);
  mobto = eval(document.keisandoku.mobto.value);
  dokuinput = eval(document.keisandoku.dokuinput.value);

  teimkanoulv = teima + settoku + megami + arch - 25;
  //      teimlv = mob - dokuinput ;

  if (dokuinput == 0) {
    // 毒舌SLvの自動計算
    dokuslv = 0;
    for (i = mobto; i >= mobfrom; i--) {
      // 適正な毒舌SLvの計算
      mob = i;
      teika = mob - teimkanoulv;
      dokuamari = (teika - 10) % 3;
      if (dokuamari == 0) {
        dokuslv = (teika - 10) / 3;
        teimlv = mob - teika;
        break;
      }
    }
    // 該当しなかった場合は最高LvのMOBを１つ上の毒舌SLvで低下させる
    if (dokuslv == 0) {
      mob = mobto;
      teika = mob - teimkanoulv;
      dokuslv = Math.ceil((teika - 10) / 3);
      teimlv = mob - (dokuslv * 3 + 10);
    }
  } else {
    // 手動計算
    mob = mobto;
    dokuslv = dokuinput;
    teimlv = mob - (dokuslv * 3 + 10);
  }
  resettoku = Math.floor(Math.floor((settoku + arch) * 0.2) + 55);
  renirami = Math.floor(Math.floor((nirami + arch) * 0.4) + 5.4);
  if (resettoku > 70) { resettoku = 70 };
  if (renirami > 30) { renirami = 30 };

  mob1 = Math.floor(teimkanoulv * resettoku / 100) + Math.floor(teimkanoulv * renirami / 100);
  mob2 = Math.floor(teimlv * resettoku / 100) + Math.floor(mob * renirami / 100);
  document.keisandoku.res1.value = teimkanoulv;
  document.keisandoku.res2.value = mob;
  document.keisandoku.res3.value = dokuslv;
  document.keisandoku.res4.value = (dokuslv * 3) + 10;
  document.keisandoku.res5.value = mob - ((dokuslv * 3) + 10);
  document.keisandoku.res6.value = mob2;
  document.keisandoku.res7.value = mob1;
  document.keisandoku.res8.value = mob2 - mob1;
}

//
//　function calc5()
//  機能：ペット成長計算機モジュール
//
function calc5() {
  var teimerlv1, petlv1, teimerlv2, petlv2;
  var teimerexp1, petexp1, teimerexp2, petexp2;
  var i, j;

  teimerlv1 = eval(document.calcexp.teimerlv1.value);
  petlv1 = eval(document.calcexp.petlv1.value);
  teimerlv2 = eval(document.calcexp.teimerlv2.value);

  teimerexp2 = expgtotal(teimerlv1);
  teimerexpsabun = expgtotal(teimerlv2) - teimerexp2;
  // 倍率の取得
  for (i = 0; i < calcexp.teimerexpindex.length; i++) {
    if (calcexp.teimerexpindex[i].checked) {
      switch (i) {
        case 0:
          teimerexpindex = 0.75;
          break;
        case 1:
          teimerexpindex = 1.00;
          break;
        case 2:
          teimerexpindex = 1.20;
          break;
        default:
          teimerexpindex = 0.75;
      }
      break;
    }
  }
  petresult = new expadv(petlv1, teimerexpsabun, teimerexpindex);
  petlv2 = petresult.lv;
  document.calcexp.petlv2.value = petresult.lv;
}

//
//　function calc6()
//  機能：毒舌なしVer計算機モジュール
//
function calc6() {
  // 数値の取り込み
  teima = eval(document.keisannormal.teimer.value);
  settoku = eval(document.keisannormal.settoku.value);
  nirami = eval(document.keisannormal.nirami.value);
  megami = eval(document.keisannormal.megami.value);
  arch = eval(document.keisannormal.arch.value);
  mob = eval(document.keisannormal.mob.value);

  teimkanoulv = teima + settoku + megami + arch - 25;  // テイム可能Lv
  document.keisannormal.res1.value = teimkanoulv;    // テイム可能Lvの出力

  if (teimkanoulv >= mob) {
    // テイム可能の出力
    document.keisannormal.res2.value = "テイムできます。"
  } else {
    // テイム不可能の出力
    teimval = mob - teimkanoulv;
    document.keisannormal.res2.value = "まだテイムできません。\n\n本体Lvを " + teimval.toString(10) + " 上げるか\nスキルLvを " + teimval.toString(10) + " 上げれば\nテイムできます。";
  }

  // テイム後MOBLvの演算
  resettoku = Math.floor(Math.floor((settoku + arch) * 0.2) + 55);
  renirami = Math.floor(Math.floor((nirami + arch) * 0.4) + 5.4);
  if (resettoku > 70) { resettoku = 70 };
  if (renirami > 30) { renirami = 30 };
  mob1 = Math.floor(mob * resettoku / 100) + Math.floor(mob * renirami / 100);
  if (teimkanoulv >= mob) {
    document.keisannormal.res3.value = mob1;　//　出力
  } else {
    document.keisannormal.res3.value = "";　  //　テイムできない場合は空白にする　        
  }
}

//
//　function calc7()
//  機能：スキルかんたん計算機モジュール
//
function calc7() {
  skill = new Array(20);
  // 数値の取り込み
  skill[0] = eval(document.skilleasyculc.fue.value);
  skill[1] = eval(document.skilleasyculc.irezumi.value);
  skill[2] = eval(document.skilleasyculc.kubi.value);
  skill[3] = eval(document.skilleasyculc.atama.value);
  skill[4] = eval(document.skilleasyculc.se.value);
  skill[5] = eval(document.skilleasyculc.koshi.value);
  skill[6] = eval(document.skilleasyculc.te.value);
  skill[7] = eval(document.skilleasyculc.yoroi.value);
  skill[8] = eval(document.skilleasyculc.ashi.value);
  skill[9] = eval(document.skilleasyculc.finger.value);
  skill[10] = eval(document.skilleasyculc.stone.value);
  skill[11] = eval(document.skilleasyculc.master.value);
  skill[12] = eval(document.skilleasyculc.guild.value);
  skill[13] = eval(document.skilleasyculc.minipet.value);
  skill[14] = eval(document.skilleasyculc.badge.value);
  settokumoto = eval(document.skilleasyculc.settokumoto.value);
  niramimoto = eval(document.skilleasyculc.niramimoto.value);

  // 値の書き込み
  total = 0;
  for (i = 0; i <= 14; i++) {
    total += skill[i];
  }
  document.skilleasyculc.settoku.value = total + settokumoto;
  document.skilleasyculc.nirami.value = total + niramimoto;
}

//
//　function calc8( btn, zoubun )
//  機能：ペット成長計算機(ボタンによる操作)
//  引数：btn ボタンの種類。1　本体after
//　　　　zoubun　増分値
//
function calc8(btn, zoubun) {
  switch (btn) {
    case 1: // 本体after
      teimerlv2 = eval(document.calcexp.teimerlv2.value);
      teimerlv2 += zoubun;
      if (teimerlv2 < 0) teimerlv2 = 0;
      document.calcexp.teimerlv2.value = teimerlv2;
      calc5();  // 再計算させる
      break;
  }
}

//
//　関数名：expcalc( Lv )
//　機能：引数の次のLvまでに必要なEXPを返す。
//　戻り値：引数の次のLvまでに必要なEXP
//
function expcalc(Lv) {
  var i, j, exp;

  i = Math.ceil((Math.sqrt(4 * Lv + 1) - 3) / 2);
  j = Lv - 2 - (i - 1) * (i + 2);
  exp = 170 * Lv + 80 + (20 / 3) * (3 * (i + 1) * Math.pow(j, 2) + (5 * Math.pow(i, 3) + 9 * Math.pow(i, 2) + 16 * i - 9) * j + (2 * Math.pow(i, 5) + 5 * Math.pow(i, 4) + 12 * Math.pow(i, 3) - 8 * Math.pow(i, 2) - 17 * i + 6));

  return exp;
}

//
//　関数名：expgtotal( Lv )
//　機能：引数のLvになるまでの累計EXPを演算する。
//　戻り値：引数のLvになるまでの累計EXP
//
function expgtotal(Lv) {
  gt = new Array(10);
  var i, j, baselv, baseexp, cnt;

  // 演算負荷を軽くするため、固定値を準備
  gt[0] = 39908880;
  gt[1] = 441027180;
  gt[2] = 1808887340;
  gt[3] = 4931858880;
  gt[4] = 10744909240;
  gt[5] = 20308052880;
  gt[6] = 34794519880;
  gt[7] = 55479287520;
  gt[8] = 83731169880;

  baselv = Math.floor(Lv / 100) * 100;
  if (Lv < 100) baseexp = 0;
  else baseexp = gt[Math.floor(Lv / 100) - 1];
  cnt = Lv - baselv;
  for (i = 0; i < cnt; i++) {
    baseexp += expcalc(baselv + i);
  }
  return baseexp;
}

//
//　クラス名：expadv( Lv, exptotal, ind )
//　機能：引数のLvからexptotalのEXPを倍率indで加えた時のLvと残りexpを演算する。
//　メンバ：lv, exp
//　戻り値：なし。
//
function expadv(Lv, exptotal, ind) {
  this.lv = Lv; // ペットの初期Lv
  this.exp = Math.floor(exptotal * ind);  // ペットに入るtotalのEXP
  nextexp = expcalc(this.lv);
  while (this.exp > nextexp) {
    this.lv++;
    this.exp -= nextexp;
    nextexp = expcalc(this.lv);
  }
}
