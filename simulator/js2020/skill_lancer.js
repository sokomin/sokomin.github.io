//ID,スキル名,難易度,前提ID1,前提LV1,前提ID2,前提LV2,前提ID3,前提LV3,前提ID4,前提LV4,前提ID5,前提LV5
//skill_common.jsの2016/7/30版が必要
var b6l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var RS;

function dec(s){
  var t = '', p = -8, a = 0, c, d;
  for( var i = 0; i < s.length; i++ ) {
    if ( ( c = b6l.indexOf(s.charAt(i)) ) < 0 )
      continue;
    a = (a<<6)|(c&63);
    if ( ( p += 6 ) >= 0 ) {
      d = (a>>p)&255;
      if ( c != 64 )
        t += String.fromCharCode(d);
      a &= 63;
      p -= 8;
    }
  }
  RS=true;
  return t;
}

JN = new Array(9);
JN[0]="lancer";
JN[1]="ランサー";
JN[2]="アーチャー";
JN[3]="ヴァンガードキャバリエ";
JN[4]="エレメンタルランサー";
JN[5]="ロージングヴァルキリー";
JN[6]="シャープシューター";
JN[7]="アケインスナイパー";
JN[8]="ローチングアンブッシャ";

SS = new Array(69,0);
SS[0]=new Array("無",0,0,0,0,0,0,0,0,0,0,0);
SS[1]=new Array("突き",1,0,0,0,0,0,0,0,0,0,0);
SS[2]=new Array("デザートブラスト",1,1,3,0,0,0,0,0,0,0,0);
SS[3]=new Array("ラピッドスティンガー",2,1,6,0,0,0,0,0,0,0,0);
SS[4]=new Array("槍投げ",1,1,3,2,3,26,3,0,0,0,0);
SS[5]=new Array("インパクトスピア",2,4,6,26,3,0,0,0,0,0,0);
SS[6]=new Array("ジャベリンテンペスト",3,5,3,0,0,0,0,0,0,0,0);
SS[7]=new Array("ブレイキングポイント",1,0,0,0,0,0,0,0,0,0,0);
SS[8]=new Array("サイドステップ",2,7,6,0,0,0,0,0,0,0,0);
SS[9]=new Array("スピンアライジング",2,7,6,2,6,0,0,0,0,0,0);
SS[10]=new Array("アーマーディスアセンブラ",3,7,12,3,6,0,0,0,0,0,0);
SS[11]=new Array("ライトニングエンチャント",4,8,12,0,0,0,0,0,0,0,0);
SS[12]=new Array("旋風突き",1,4,3,0,0,0,0,0,0,0,0);
SS[13]=new Array("サプライジングレイド",2,12,6,8,3,0,0,0,0,0,0);
SS[14]=new Array("ワールランニング",2,2,6,8,3,0,0,0,0,0,0);
SS[15]=new Array("スチールレイン",3,14,6,0,0,0,0,0,0,0,0);
SS[16]=new Array("ロージングインパクト",4,14,12,15,6,5,12,0,0,0,0);
SS[17]=new Array("グラウンドシェイカー",2,2,6,24,6,0,0,0,0,0,0);
SS[18]=new Array("ラジアルアーク",3,17,6,6,3,24,12,0,0,0,0);
SS[19]=new Array("ファイアー・アンド・アイス",4,2,18,25,12,0,0,0,0,0,0);
SS[20]=new Array("ガーディアンポスト",5,18,12,6,12,28,18,25,18,0,0);
SS[21]=new Array("エントラップメントピアシング",3,3,6,5,6,0,0,0,0,0,0);
SS[22]=new Array("オーサムフォートレス",4,21,6,25,12,0,0,0,0,0,0);
SS[23]=new Array("ミラーメラーミスト",5,21,12,22,6,24,24,0,0,0,0);
SS[24]=new Array("確信",1,1,1,0,0,0,0,0,0,0,0);
SS[25]=new Array("信念",2,24,6,0,0,0,0,0,0,0,0);

SS[26]=new Array("射掛ける",1,0,0,0,0,0,0,0,0,0,0);
SS[27]=new Array("フレイムアロー",1,26,3,0,0,0,0,0,0,0,0);
SS[28]=new Array("フローズンアロー",1,26,3,0,0,0,0,0,0,0,0);
SS[29]=new Array("デュアルアロー",2,28,3,27,3,0,0,0,0,0,0);
SS[30]=new Array("ピアシングアロー",2,26,6,0,0,0,0,0,0,0,0);
SS[31]=new Array("スナイプ",3,30,3,0,0,0,0,0,0,0,0);
SS[32]=new Array("ボイドボウ",2,31,6,49,6,1,6,0,0,0,0);
SS[33]=new Array("ボウストライキング",3,30,6,29,6,0,0,0,0,0,0);
SS[34]=new Array("エターナルプロジェクター",4,32,12,50,12,0,0,0,0,0,0);
SS[35]=new Array("テイルチェイサー",5,34,6,31,12,0,0,0,0,0,0);
SS[36]=new Array("ブラインドシンカー",1,27,3,0,0,0,0,0,0,0,0);
SS[37]=new Array("マジカルアロー",2,29,6,0,0,0,0,0,0,0,0);
SS[38]=new Array("シーカーアロー",2,30,6,49,6,26,6,0,0,0,0);
SS[39]=new Array("ビックスパロー",3,38,6,0,0,0,0,0,0,0,0);
SS[40]=new Array("グレーシャルシャード",3,37,6,50,3,0,0,0,0,0,0);
SS[41]=new Array("スプレッドアロー",2,38,6,0,0,0,0,0,0,0,0);
SS[42]=new Array("マシーンアロー",2,41,3,0,0,0,0,0,0,0,0);
SS[43]=new Array("レイヤーストーム",3,41,6,0,0,0,0,0,0,0,0);
SS[44]=new Array("ビットグライダー",3,43,3,31,6,0,0,0,0,0,0);
SS[45]=new Array("ランドマーカー",4,40,3,0,0,0,0,0,0,0,0);
SS[46]=new Array("インターバルシューター",3,44,3,50,6,0,0,0,0,0,0);
SS[47]=new Array("グライディングファイアー",4,29,12,45,6,0,0,0,0,0,0);
SS[48]=new Array("ウォーターフォール",5,29,12,40,6,0,0,0,0,0,0);
SS[49]=new Array("集中",1,26,1,0,0,0,0,0,0,0,0);
SS[50]=new Array("瞑想",2,49,6,0,0,0,0,0,0,0,0);

SS[51]=new Array("パラライズスティンガー",6,3,50,0,50,0,1,0,1,0,1);
SS[52]=new Array("エントラップメントインペール",6,21,50,0,50,0,1,0,1,0,1);
SS[53]=new Array("ヴィジョンキャスター",6,34,50,0,50,0,1,0,1,0,1);
SS[54]=new Array("クレセントライトニング",6,18,50,0,50,0,1,0,1,0,1);
SS[55]=new Array("ブレイズ・アンド・ブリザード",6,19,50,0,50,0,1,0,1,0,1);
SS[56]=new Array("信義",6,25,50,0,50,0,1,0,1,0,1);
SS[57]=new Array("ロージングストライク",6,16,50,0,50,0,1,0,1,0,1);
SS[58]=new Array("スチールマルチレイン",6,15,50,0,50,0,1,0,1,0,1);
SS[59]=new Array("ジャベリンストーム",6,5,50,0,50,0,1,0,1,0,1);

SS[60]=new Array("インターバルボマー",6,46,50,0,50,0,1,0,1,0,1);
SS[61]=new Array("シャドウチェイサー",6,35,50,0,50,0,1,0,1,0,1);
SS[62]=new Array("バラージショット",6,42,50,0,50,0,1,0,1,0,1);
SS[63]=new Array("リワインドマーカー",6,45,50,0,50,0,1,0,1,0,1);
SS[64]=new Array("イリュージョンアーチャー",6,37,50,0,50,0,1,0,1,0,1);
SS[65]=new Array("ハーモニックアロー",6,29,50,0,50,0,1,0,1,0,1);
SS[66]=new Array("レイヤーテンペスト",6,43,50,0,50,0,1,0,1,0,1);
SS[67]=new Array("バーストショット",6,30,50,0,50,0,1,0,1,0,1);
SS[68]=new Array("シーカーミサイル",6,38,50,0,50,0,1,0,1,0,1);
