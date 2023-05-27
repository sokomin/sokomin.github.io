if (location.href.indexOf("?") == -1) {
  id1.selectedIndex = 1;
  //id1.options[0].style.display = "none";
  id1.options[0].disabled = true;
} else {
  id26.selectedIndex = 1; //URL語尾に「?」がある場合、初期の基本スキルを裏職とする
  //id26.options[0].style.display = "none";
  id26.options[0].disabled = true;
}
SkillRefresh(); //初期化
AwakeSwitch = 0;
var TransType = [0, 0, 0, 0, 0];
var TransPoint = [0, 0, 0, 0, 0];

function SkillReset() {
  AwakeSwitch = 0;
  AwakeText.innerHTML = "なし"
  // AwakeText_M.innerHTML = "なし"
  Rebirth.selectedIndex = 0;
  MQ1Skill.selectedIndex = 0;
  MQ2Skill.selectedIndex = 0;

  for (num = 1; num <= 68; num = num + 1) {
    document.getElementById("id" + num).selectedIndex = 0;
  }

  for (num = 51; num <= 68; num = num + 1) {
    document.getElementById("id" + num).disabled = false;
    SS[num][1] = 6; SS[num][4] = 0; SS[num][6] = 0; SS[num][8] = 0; SS[num][10] = 0;
  }

  if (location.href.indexOf("?") == -1) {
    id1.selectedIndex = 1;
  } else {
    id26.selectedIndex = 1;
  }
  SkillRefresh()
}

function SkillRefresh() {
  var i, tempnum, num;
  for (num = 1; num <= 68; num = num + 1) { //68回(全スキル)の精査
    if ((document.getElementById("id" + num).selectedIndex) > 0) {
      //Slvが振られている時
      document.getElementById("id" + num).style.background = "mistyrose";
      for (i = 1; i <= 5; i = i + 1) { //前提スキル5回繰り返す
        tempnum = SS[num][2 * i];
        if (tempnum > 0) { //前提スキルが設定されていたら前提スキルを必要Lv以上まで振る
          if (document.getElementById("id" + tempnum).selectedIndex < SS[num][2 * i + 1]) {
            document.getElementById("id" + tempnum).selectedIndex = SS[num][2 * i + 1];
            SkillRefresh();
          }
        }
      }
    } else {
      document.getElementById("id" + num).style.background = "white";
    }
  }
  SlvSum();
}

function SlvSum() {
  //スキルポイント算出
  sum = 0;
  for (num = 1; num <= 68; num = num + 1) { //68回(全スキル)の精査
    if ((document.getElementById("id" + num).selectedIndex) > 0) {
      tempnum = SS[num][1];
      switch (tempnum) {
        case 1:
          //sum = 難易度付加+レベル/2*(2*難易度+(レベル-1)*難易度)
          sum = sum + (0 + document.getElementById("id" + num).selectedIndex / 2 * (2 * 1 + (document.getElementById("id" + num).selectedIndex - 1) * 1));
          break;
        case 2:
          sum = sum + (1 + document.getElementById("id" + num).selectedIndex / 2 * (2 * 2 + (document.getElementById("id" + num).selectedIndex - 1) * 2));
          break;
        case 3:
          sum = sum + (5 + document.getElementById("id" + num).selectedIndex / 2 * (2 * 3 + (document.getElementById("id" + num).selectedIndex - 1) * 3));
          break;
        case 4:
          sum = sum + (20 + document.getElementById("id" + num).selectedIndex / 2 * (2 * 4 + (document.getElementById("id" + num).selectedIndex - 1) * 4));
          break;
        case 5:
          sum = sum + (45 + document.getElementById("id" + num).selectedIndex / 2 * (2 * 5 + (document.getElementById("id" + num).selectedIndex - 1) * 5));
          break;
        case 6:
          sum = sum + 3500;
          break;
        case 7:
          sum = sum + 7000;
          break;
      }

    }
  }
  //超越スキル用(ポイントの計算は外部でする）
  var tpt0 = TransPoint ? TransPoint[0] : 0; 
  var tpt1 = TransPoint ? TransPoint[1] : 0; 
  var tpt2 = TransPoint ? TransPoint[2] : 0; 
  var tpt3 = TransPoint ? TransPoint[3] : 0; 
  var tpt4 = TransPoint ? TransPoint[4] : 0; 
  sum = sum + tpt0 + tpt1 + tpt2 + tpt3 + tpt4;
  SkillPointText.innerHTML = (sum);
  //スキルポイントからLvを算出する部分
  var CharaLevel, SkillPoint, Total, PointMuch, Lv;
  CharaLevel = 0; SkillPoint = 0; PointMuch = 0; Total = (sum);

  //算出前に転生スキルポイントボーナス分を差し引き
  switch (Rebirth.selectedIndex) {
    case 1:
      Total = Total - 100;
      break;
    case 2:
      Total = Total - 300;
      break;
    case 3:
      Total = Total - 600;
      break;
    case 4:
      Total = Total - 1000;
      break;
    case 5:
      Total = Total - 1500;
      break;
  }
  //天上ボーナス差し引き
  Total = CalcMQ1Skill(Total);
  //MQ2ボーナス差し引き
  Total = CalcMQ2Skill(Total);
  //クエストボーナス差し引き
  // TODO まとめとく
  Total = CalcQuestSkill(Total);
  if (Total >= 5049) { //100Lv超の時の計算式
    CharaLevel = 100;
    SkillPoint = 5149;
    PointMuch = SkillPoint - Total;
    while (PointMuch < 0) {
      CharaLevel = CharaLevel + 1;
      SkillPoint = SkillPoint + 100;
      PointMuch = SkillPoint - Total;
    }
  }
  if (Total < 5149) { //100Lv以下の時の計算式
    SkillPoint = 0;
    for (Lv = 1; Lv < 101; Lv++) {
      SkillPoint = SkillPoint + Lv + 1;
      if (SkillPoint - Total >= 0) {
        CharaLevel = Lv;
        PointMuch = SkillPoint - Total;
        break;
      }
    }
  }
  SkillPointText.innerHTML = (sum - 1);
  SkillLvText.innerHTML = (CharaLevel);
  document.getElementById("SkillPointText_M").innerHTML = (sum - 1);
  document.getElementById("SkillLvText_M").innerHTML = (CharaLevel);
};

function CalcMQ1Skill(total) {
  var num = MQ1Skill.selectedIndex ? MQ1Skill.selectedIndex : 0;
  return total - (num * 100);
};

function CalcMQ2Skill(total) {
  var num = MQ2Skill.selectedIndex ? MQ2Skill.selectedIndex : 0;
  total = total - num * 1000;
  if (num >= 5) {
    total = total - 4000;    
  }
  if (num >= 10) {
    total = total - 4000;    
  }
  if (num >= 15) {
    total = total - 4000;    
  }
  if (num >= 20) {
    total = total - 4000;    
  }
  return total;
};


function CalcQuestSkill(total) {
  var num = parseInt(document.getElementsByName("a21")[0].value) ? parseInt(document.getElementsByName("a21")[0].value) : 0;
  total = total - num;
  return total;
};

function LvMax(num) {
  //アイコンをクリックされた時は50Lvにする
  if (num <= 50) {
    document.getElementById("id" + num).selectedIndex = 50;
  } else {
    if (document.getElementById("id" + num).disabled == false) {
      document.getElementById("id" + num).selectedIndex = 1;
      Awake(num);
    }
  }
  SkillRefresh();
};

function CalcTransType(num) {
  if (num === 900) {
    TransType[0] = document.getElementById("id" + num).selectedIndex;
    TransPoint[0] = 0;
    document.getElementById("id901").selectedIndex = 0;
    SlvSum();
    // document.getElementById("id901");
  }
  if (num === 1000) {
    TransType[1] = document.getElementById("id" + num).selectedIndex;
    document.getElementById("id1001").selectedIndex = 0;
    TransPoint[1] = 0;
    SlvSum();
  }
  if (num === 1100) {
    TransType[2] = document.getElementById("id" + num).selectedIndex;
    document.getElementById("id1101").selectedIndex = 0;
    TransPoint[2] = 0;
    SlvSum();
  }
  if (num === 1200) {
    TransType[3] = document.getElementById("id" + num).selectedIndex;
    document.getElementById("id1201").selectedIndex = 0;
    TransPoint[3] = 0;
    SlvSum();
  }
  // 丁寧にゴリ押すのだ、バグるから共通化したいのだ
  if (num === 1300) {
    TransType[4] = document.getElementById("id" + num).selectedIndex;
    document.getElementById("id1301").selectedIndex = 0;
    TransPoint[4] = 0;
    SlvSum();
  }
};

function CalcTransPoint(num) {
  if (num === 901) {
    TransPoint[0] = CalcTransPt(TransType[0], document.getElementById("id" + num).selectedIndex);
    SlvSum();
    // document.getElementById("id901");
  }
  if (num === 1001) {
    TransPoint[1] = CalcTransPt(TransType[1], document.getElementById("id" + num).selectedIndex);
    SlvSum();
  }
  if (num === 1101) {
    TransPoint[2] = CalcTransPt(TransType[2], document.getElementById("id" + num).selectedIndex);
    SlvSum();
  }
  if (num === 1201) {
    TransPoint[3] = CalcTransPt(TransType[3], document.getElementById("id" + num).selectedIndex);
    SlvSum();
  }
  if (num === 1301) {
    TransPoint[4] = CalcTransPt(TransType[4], document.getElementById("id" + num).selectedIndex);
    SlvSum();
  }
};

function CalcTransPt(type, level){
  if (type === 0) {
    return CalcNormalTransPt(level);
  } else if (type === 1) {
    // 3万に減った
    return level >= 1 ? 30000 : 0;
  } else if (type === 2) {
    return CalcUniqueTransPt(level);
  } else {
    console.log("えぇ…");
    return 0;
  }
};

function CalcNormalTransPt(level) {
  //不規則なので計算することをあきらめた。後、韓国版のDIのほうが可能性高いんで。
  var nt = [2000, 2100, 2300, 2500, 2700, 2900, 3100, 3300, 3500, 3700,
    3900, 4100, 4300, 4500, 4700, 4900, 5100, 5300, 5500, 5700];
  var rp = 0;
  for (var i = 0; i < level; i++) {
    //2019.3現在、スキルレベル20までしかないからね
    if (i >= 20) {
      break;
    }
    rp += nt[i];
  }
  return rp;
};

// ユニークと同じはずだけど、Lv11~が不明
function CalcRareTransPt(level) {
  //不規則なので計算することをあきらめた。後、韓国版のDIのほうが可能性高いんで。
  var ut = [2000, 2100, 2200, 2400, 2500, 3000, 3500, 4500, 5500, 6000,
    7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
  var rp = 0;
  for (var i = 0; i < level; i++) {
    //2019.3現在、スキルレベル20までしかないからね
    if (i >= 20) {
      break;
    }
    rp += ut[i];
  }
  return rp;
};


function CalcUniqueTransPt(level) {
  //不規則なので計算することをあきらめた。後、韓国版のDIのほうが可能性高いんで。
  var ut = [2000, 2100, 2200, 2400, 2500, 3000, 3500, 4500, 5500, 6000,
    7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
  var rp = 0;
  for (var i = 0; i < level; i++) {
    //2019.3現在、スキルレベル20までしかないからね
    if (i >= 20) {
      break;
    }
    rp += ut[i];
  }
  return rp;
};

function Awake(num) {
  //★覚醒スキル制御部(覚醒が無ければコードこんなに長くならなかったのにね・・・）
  if (AwakeSwitch == 0) {

    if (num >= 51 && num <= 53) { //表職覚醒スキル1
      AwakeText.innerHTML = JN[3];
      id54.disabled = true;
      id57.disabled = true;
      SS[55][1] = 7; SS[56][1] = 7; SS[58][1] = 7; SS[59][1] = 7;

      //覚醒スキルの前提スキルを他覚醒スキルに埋め込む
      SS[52][4] = SS[51][2]; SS[53][4] = SS[51][2];
      i = 51; SS[55][6] = i; SS[56][6] = i; SS[58][6] = i; SS[59][6] = i;
      i = 52; SS[55][8] = i; SS[56][8] = i; SS[58][8] = i; SS[59][8] = i;
      i = 53; SS[55][10] = i; SS[56][10] = i; SS[58][10] = i; SS[59][10] = i;
    }
    if (num >= 54 && num <= 56) { //表職覚醒スキル2
      AwakeText.innerHTML = JN[4];
      id51.disabled = true;
      id57.disabled = true;
      SS[52][1] = 7; SS[53][1] = 7; SS[58][1] = 7; SS[59][1] = 7;

      //覚醒スキルの前提スキルを他覚醒スキルに埋め込む
      SS[55][4] = SS[54][2]; SS[56][4] = SS[54][2];
      i = 54; SS[52][6] = i; SS[53][6] = i; SS[58][6] = i; SS[59][6] = i;
      i = 55; SS[52][8] = i; SS[53][8] = i; SS[58][8] = i; SS[59][8] = i;
      i = 56; SS[52][10] = i; SS[53][10] = i; SS[58][10] = i; SS[59][10] = i;
    }
    if (num >= 57 && num <= 59) { //表職覚醒スキル3
      AwakeText.innerHTML = JN[5];
      id51.disabled = true;
      id54.disabled = true;
      SS[52][1] = 7; SS[53][1] = 7; SS[55][1] = 7; SS[56][1] = 7;

      //覚醒スキルの前提スキルを他覚醒スキルに埋め込む
      SS[58][4] = SS[57][2]; SS[59][4] = SS[57][2];
      i = 57; SS[52][6] = i; SS[53][6] = i; SS[55][6] = i; SS[56][6] = i;
      i = 58; SS[52][8] = i; SS[53][8] = i; SS[55][8] = i; SS[56][8] = i;
      i = 59; SS[52][10] = i; SS[53][10] = i; SS[55][10] = i; SS[56][10] = i;
    }

    if (num >= 60 && num <= 62) { //裏職覚醒スキル1
      AwakeText.innerHTML = JN[6];
      id63.disabled = true;
      id66.disabled = true;
      SS[64][1] = 7; SS[65][1] = 7; SS[67][1] = 7; SS[68][1] = 7;

      //覚醒スキルの前提スキルを他覚醒スキルに埋め込む
      SS[61][4] = SS[60][2]; SS[62][4] = SS[60][2];
      i = 60; SS[64][6] = i; SS[65][6] = i; SS[67][6] = i; SS[68][6] = i;
      i = 61; SS[64][8] = i; SS[65][8] = i; SS[67][8] = i; SS[68][8] = i;
      i = 62; SS[64][10] = i; SS[65][10] = i; SS[67][10] = i; SS[68][10] = i;
    }
    if (num >= 63 && num <= 65) { //裏職覚醒スキル2
      AwakeText.innerHTML = JN[7];

      id60.disabled = true;
      id66.disabled = true;
      SS[61][1] = 7; SS[62][1] = 7; SS[67][1] = 7; SS[68][1] = 7;

      //覚醒スキルの前提スキルを他覚醒スキルに埋め込む
      SS[64][4] = SS[63][2]; SS[65][4] = SS[63][2];
      i = 63; SS[61][6] = i; SS[62][6] = i; SS[67][6] = i; SS[68][6] = i;
      i = 64; SS[61][8] = i; SS[62][8] = i; SS[67][8] = i; SS[68][8] = i;
      i = 65; SS[61][10] = i; SS[62][10] = i; SS[67][10] = i; SS[68][10] = i;
    }
    if (num >= 66 && num <= 68) { //裏職覚醒スキル3
      AwakeText.innerHTML = JN[8];
      id60.disabled = true;
      id63.disabled = true;
      SS[61][1] = 7; SS[62][1] = 7; SS[64][1] = 7; SS[65][1] = 7;

      //覚醒スキルの前提スキルを他覚醒スキルに埋め込む
      SS[67][4] = SS[66][2]; SS[68][4] = SS[66][2];
      i = 66; SS[61][6] = i; SS[62][6] = i; SS[64][6] = i; SS[65][6] = i;
      i = 67; SS[61][8] = i; SS[62][8] = i; SS[64][8] = i; SS[65][8] = i;
      i = 68; SS[61][10] = i; SS[62][10] = i; SS[64][10] = i; SS[65][10] = i;
    }
    AwakeSwitch = 1;
  }
  if (num >= 51 && num <= 59) {
    for (num = 60; num <= 68; num = num + 1) { //裏職の覚醒スキルをすべて無効に
      document.getElementById("id" + num).disabled = true;
    }
  }
  if (num >= 60 && num <= 68) {
    for (num = 51; num <= 59; num = num + 1) { //表職の覚醒スキルをすべて無効に
      document.getElementById("id" + num).disabled = true;
    }
  }
  SkillRefresh();
}
