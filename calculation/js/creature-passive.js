function init1() {
    var d1dom = document.getElementById("sub_d1");
    var d2dom = document.getElementById("sub_d2");
    var d3dom = document.getElementById("sub_d3");
    // var d2dom = document.getElementByClassName("d2");
    // var d3dom = document.getElementByClassName("d3");
    skillIdMap.forEach(function (e, index) {
        document.optionlist.a2.options[index] = new Option(e.value, e.value);
        // .options[index] = new Option(e.value, e.value);
        var element1 = document.createElement('option');
        element1.setAttribute('value', e.value);
        element1.innerHTML = e.value;
        d1dom.appendChild(element1);
        var element2 = document.createElement('option');
        element2.setAttribute('value', e.value);
        element2.innerHTML = e.value;
        d2dom.appendChild(element2);
        var element3 = document.createElement('option');
        element3.setAttribute('value', e.value);
        element3.innerHTML = e.value;
        d3dom.appendChild(element3);
        // document.keisannormal.d2.options[index] = new Option(e.value, e.value);
        // document.keisannormal.d3.options[index] = new Option(e.value, e.value);
    });
}

function init2() {
    //TODO localstorage辺りから引っ張ってきたい。
}

// 裏でも多分こんな感じで管理してるんでないの。
var skillIdMap = [
    { id: 0, value: "PVP攻撃力", passive_rank: 1 },
    { id: 1, value: "PVP防御力", passive_rank: 1 },
    { id: 2, value: "スキルクールタイム減少", passive_rank: 2 },
    { id: 3, value: "アンデッド型ダメージ", passive_rank: 2 },
    { id: 4, value: "人間型ダメージ", passive_rank: 1 },
    { id: 5, value: "悪魔型ダメージ", passive_rank: 2 },
    { id: 6, value: "動物型ダメージ", passive_rank: 2 },
    { id: 7, value: "神獣型ダメージ", passive_rank: 2 },
    { id: 8, value: "ドロップ率", passive_rank: 2 },
    { id: 9, value: "経験値", passive_rank: 2 },
    { id: 10, value: "移動速度", passive_rank: 2 },
    { id: 11, value: "攻撃速度", passive_rank: 2 },
    { id: 12, value: "命中率", passive_rank: 2 },
    { id: 13, value: "回避率", passive_rank: 2 },
    { id: 14, value: "火抵抗力", passive_rank: 2 },
    { id: 15, value: "水抵抗力", passive_rank: 2 },
    { id: 16, value: "風抵抗力", passive_rank: 2 },
    { id: 17, value: "大地抵抗力", passive_rank: 2 },
    { id: 18, value: "光抵抗力", passive_rank: 2 },
    { id: 19, value: "闇抵抗力", passive_rank: 2 },
    { id: 21, value: "火強化", passive_rank: 2 },
    { id: 22, value: "火低下", passive_rank: 2 },
    { id: 23, value: "水強化", passive_rank: 2 },
    { id: 24, value: "水低下", passive_rank: 2 },
    { id: 25, value: "風強化", passive_rank: 2 },
    { id: 26, value: "風低下", passive_rank: 2 },
    { id: 27, value: "大地強化", passive_rank: 2 },
    { id: 28, value: "大地低下", passive_rank: 2 },
    { id: 29, value: "光強化", passive_rank: 2 },
    { id: 30, value: "光低下", passive_rank: 2 },
    { id: 31, value: "闇強化", passive_rank: 2 },
    { id: 32, value: "闇低下", passive_rank: 2 },
    { id: 33, value: "ペット&召喚獣強化", passive_rank: 2 },
    { id: 34, value: "ペット&召喚獣攻撃力", passive_rank: 2 },
    { id: 35, value: "ペット&召喚獣状態異常抵抗", passive_rank: 2 },
    { id: 36, value: "ペット&召喚獣全てのステータス", passive_rank: 2 },
    { id: 37, value: "ペット&召喚獣体力", passive_rank: 2 },
    { id: 38, value: "ペット&召喚獣の魔法致命打確率", passive_rank: 2 },//合成
    { id: 39, value: "ペット&召喚獣の強打確率", passive_rank: 2 },//合成
    { id: 40, value: "最大体力", passive_rank: 2 },
    { id: 41, value: "最大CP", passive_rank: 2 },
    { id: 42, value: "攻撃力", passive_rank: 2 },
    { id: 43, value: "防御力", passive_rank: 2 },
    { id: 50, value: "クリティカルダメージ", passive_rank: 2 },
    { id: 51, value: "ダブルクリティカルダメージ", passive_rank: 1 },
    { id: 52, value: "クリティカル確率", passive_rank: 2 },
    { id: 53, value: "クリティカルダメージ減少", passive_rank: 2 },
    { id: 76, value: "敵致命打減少", passive_rank: 1 },
    { id: 77, value: "抵抗力低下防止", passive_rank: 2 },
    { id: 78, value: "能力値低下防止", passive_rank: 2 },
    { id: 79, value: "人間型魔法ダメージ", passive_rank: 1 },
    { id: 80, value: "魔法強打", passive_rank: 1 },
    { id: 81, value: "魔法攻撃力強化", passive_rank: 1 },
    { id: 82, value: "魔法攻撃力低下", passive_rank: 1 },
    { id: 83, value: "魔法致命打", passive_rank: 1 },
    { id: 84, value: "強打", passive_rank: 1 },
    { id: 101, value: "被ダメージCPに変換", passive_rank: 2 },
    { id: 102, value: "被ダメージ反射", passive_rank: 2 },
    { id: 103, value: "被魔法ダメージ吸収", passive_rank: 2 },
    { id: 104, value: "体力吸収", passive_rank: 2 },
    { id: 105, value: "与魔法ダメージ吸収", passive_rank: 1 },
    { id: 106, value: "獲得CP増加", passive_rank: 2 },//合成
    { id: 107, value: "魔法ダメージ吸収", passive_rank: 1 },//合成
    { id: 199, value: "状態異常抵抗力", passive_rank: 2 },
    { id: 200, value: "全ての属性抵抗", passive_rank: 2 },
    { id: 201, value: "人間型ダメージ抵抗", passive_rank: 1 },
    { id: 210, value: "全ての能力値増加", passive_rank: 2 }, //合成
    { id: 299, value: "スキル", passive_rank: 2 },
    { id: 300, value: "上級スキル", passive_rank: 1 },
    { id: 301, value: "上級攻撃力", passive_rank: 1 },
    { id: 302, value: "上級防御力", passive_rank: 1 },
    { id: 303, value: "上級体力", passive_rank: 1 },
    { id: 304, value: "上級最大CP", passive_rank: 1 },
    { id: 305, value: "上級状態異常抵抗力", passive_rank: 1 },
    { id: 306, value: "上級攻撃速度", passive_rank: 1 },
    { id: 307, value: "最終ダメージ", passive_rank: 1 }, // 合成
    { id: 308, value: "上級経験値", passive_rank: 1 }, //合成
    { id: 309, value: "上級ドロップ", passive_rank: 1 }, //合成
];


var skillData = [
    { name: "ブリザード火炎犬", id: 0, mainId: "攻撃力", mainLv: 8, sub1Id: "経験値", sub1IdLv: 4, sub2Id: "体力吸収", sub2IdLv: 4 },
    { name: "青の火炎犬", id: 1, mainId: "ドロップ率", mainLv: 8, sub1Id: "回避率", sub1IdLv: 4, sub2Id: "ドロップ率", sub2IdLv: 4 },
    { name: "緑の火炎犬", id: 2, mainId: "火低下", mainLv: 8, sub1Id: "被ダメージ反射", sub1IdLv: 4, sub2Id: "火強化", sub2IdLv: 4 },
    { name: "紫の火炎犬", id: 3, mainId: "火抵抗力", mainLv: 8, sub1Id: "火強化", sub1IdLv: 4, sub2Id: "抵抗力低下防止", sub2IdLv: 4 },
    { name: "灰色の火炎犬", id: 4, mainId: "最大CP", mainLv: 8, sub1Id: "能力値低下防止", sub1IdLv: 4, sub2Id: "最大体力", sub2IdLv: 4 },
    { name: "赤の火炎犬", id: 5, mainId: "攻撃力", mainLv: 8, sub1Id: "攻撃力", sub1IdLv: 4, sub2Id: "動物型ダメージ", sub2IdLv: 4 },
    { name: "紫の閃光犬", id: 6, mainId: "クリティカル確率", mainLv: 8, sub1Id: "クリティカルダメージ", sub1IdLv: 4, sub2Id: "スキル", sub2IdLv: 4 },
    { name: "水色の閃光犬", id: 7, mainId: "最大体力", mainLv: 8, sub1Id: "防御力", sub1IdLv: 4, sub2Id: "体力吸収", sub2IdLv: 4 },
    { name: "赤の閃光犬", id: 8, mainId: "火強化", mainLv: 8, sub1Id: "神獣型ダメージ", sub1IdLv: 4, sub2Id: "火低下", sub2IdLv: 4 },
    { name: "青の閃光犬", id: 9, mainId: "大地抵抗力", mainLv: 8, sub1Id: "クリティカルダメージ減少", sub1IdLv: 4, sub2Id: "火抵抗力", sub2IdLv: 4 },
    { name: "変異火炎犬", id: 10, mainId: "ペット&召喚獣強化", mainLv: 8, sub1Id: "ペット&召喚獣体力", sub1IdLv: 4, sub2Id: "ペット&召喚獣全てのステータス", sub2IdLv: 4 },
    { name: "乙女ミニゴースト", id: 11, mainId: "状態異常抵抗力", mainLv: 8, sub1Id: "ドロップ率", sub1IdLv: 4, sub2Id: "最大CP", sub2IdLv: 4 },
    { name: "海ミニゴースト", id: 12, mainId: "闇低下", mainLv: 8, sub1Id: "全ての属性抵抗", sub1IdLv: 4, sub2Id: "闇強化", sub2IdLv: 4 },
    { name: "森ミニゴースト", id: 13, mainId: "闇抵抗力", mainLv: 8, sub1Id: "闇強化", sub1IdLv: 4, sub2Id: "闇低下", sub2IdLv: 4 },
    { name: "崖ミニゴースト", id: 14, mainId: "攻撃力", mainLv: 8, sub1Id: "被魔法ダメージ吸収", sub1IdLv: 4, sub2Id: "命中率", sub2IdLv: 4 },
    { name: "岩ミニゴースト", id: 15, mainId: "スキル", mainLv: 8, sub1Id: "スキル", sub1IdLv: 4, sub2Id: "最大CP", sub2IdLv: 4 },
    { name: "砂漠ミニゴースト", id: 16, mainId: "回避率", mainLv: 8, sub1Id: "火抵抗力", sub1IdLv: 4, sub2Id: "移動速度", sub2IdLv: 4 },
    { name: "滝ミニゴースト", id: 17, mainId: "闇強化", mainLv: 8, sub1Id: "攻撃速度", sub1IdLv: 4, sub2Id: "闇低下", sub2IdLv: 4 },
    { name: "平原ミニゴースト", id: 18, mainId: "最大体力", mainLv: 8, sub1Id: "クリティカルダメージ減少", sub1IdLv: 4, sub2Id: "悪魔型ダメージ", sub2IdLv: 4 },
    { name: "紳士ミニゴースト", id: 19, mainId: "移動速度", mainLv: 8, sub1Id: "被魔法ダメージ吸収", sub1IdLv: 4, sub2Id: "攻撃力", sub2IdLv: 4 },
    { name: "墓地ミニゴースト", id: 20, mainId: "クリティカル確率", mainLv: 8, sub1Id: "水抵抗力", sub1IdLv: 4, sub2Id: "クリティカルダメージ", sub2IdLv: 4 },
    { name: "地下ミニゴースト", id: 21, mainId: "防御力", mainLv: 8, sub1Id: "闇抵抗力", sub1IdLv: 4, sub2Id: "被ダメージ反射", sub2IdLv: 4 },
    { name: "強欲のゴーレム", id: 22, mainId: "光抵抗力", mainLv: 8, sub1Id: "クリティカル確率", sub1IdLv: 4, sub2Id: "光低下", sub2IdLv: 4 },
    { name: "忘却のゴーレム", id: 23, mainId: "光強化", mainLv: 8, sub1Id: "光強化", sub1IdLv: 4, sub2Id: "動物型ダメージ", sub2IdLv: 4 },
    { name: "貪欲のゴーレム", id: 24, mainId: "回避率", mainLv: 8, sub1Id: "能力値低下防止", sub1IdLv: 4, sub2Id: "光抵抗力", sub2IdLv: 4 },
    { name: "祝福のゴーレム", id: 25, mainId: "攻撃速度", mainLv: 8, sub1Id: "クリティカルダメージ", sub1IdLv: 4, sub2Id: "防御力", sub2IdLv: 4 },
    { name: "勇気のゴーレム", id: 26, mainId: "最大体力", mainLv: 8, sub1Id: "最大体力", sub1IdLv: 4, sub2Id: "ドロップ率", sub2IdLv: 4 },
    { name: "正義のゴーレム", id: 27, mainId: "経験値", mainLv: 8, sub1Id: "大地抵抗力", sub1IdLv: 4, sub2Id: "被ダメージ反射", sub2IdLv: 4 },
    { name: "不屈のゴーレム", id: 28, mainId: "大地抵抗力", mainLv: 8, sub1Id: "攻撃力", sub1IdLv: 4, sub2Id: "経験値", sub2IdLv: 4 },
    { name: "幸福のゴーレム", id: 29, mainId: "ペット&召喚獣強化", mainLv: 8, sub1Id: "ペット&召喚獣全てのステータス", sub1IdLv: 4, sub2Id: "ペット&召喚獣攻撃力", sub2IdLv: 4 },
    { name: "希望のゴーレム", id: 30, mainId: "移動速度", mainLv: 8, sub1Id: "アンデッド型ダメージ", sub1IdLv: 4, sub2Id: "体力吸収", sub2IdLv: 4 },
    { name: "憤怒のゴーレム", id: 31, mainId: "光低下", mainLv: 8, sub1Id: "移動速度", sub1IdLv: 4, sub2Id: "光強化", sub2IdLv: 4 },
    { name: "復讐のゴーレム", id: 32, mainId: "ドロップ率", mainLv: 8, sub1Id: "光抵抗力", sub1IdLv: 4, sub2Id: "状態異常抵抗力", sub2IdLv: 4 },
    { name: "レビット", id: 33, mainId: "水強化", mainLv: 8, sub1Id: "水低下", sub1IdLv: 4, sub2Id: "アンデッド型ダメージ", sub2IdLv: 4 },
    { name: "リビット", id: 34, mainId: "水低下", mainLv: 8, sub1Id: "抵抗力低下防止", sub1IdLv: 4, sub2Id: "水強化", sub2IdLv: 4 },
    { name: "ルビット", id: 35, mainId: "水抵抗力", mainLv: 8, sub1Id: "回避率", sub1IdLv: 4, sub2Id: "被魔法ダメージ吸収", sub2IdLv: 4 },
    { name: "ロビット", id: 36, mainId: "最大体力", mainLv: 8, sub1Id: "防御力", sub1IdLv: 4, sub2Id: "状態異常抵抗力", sub2IdLv: 4 },
    { name: "ブビット", id: 37, mainId: "最大CP", mainLv: 8, sub1Id: "ペット&召喚獣強化", sub1IdLv: 4, sub2Id: "水抵抗力", sub2IdLv: 4 },
    { name: "レイット", id: 38, mainId: "水強化", mainLv: 8, sub1Id: "水低下", sub1IdLv: 4, sub2Id: "スキルクールタイム減少", sub2IdLv: 4 },
    { name: "ルイット", id: 39, mainId: "ペット&召喚獣全てのステータス", mainLv: 8, sub1Id: "ペット&召喚獣体力", sub1IdLv: 4, sub2Id: "風抵抗力", sub2IdLv: 4 },
    { name: "ロイット", id: 40, mainId: "防御力", mainLv: 8, sub1Id: "攻撃速度", sub1IdLv: 4, sub2Id: "神獣型ダメージ", sub2IdLv: 4 },
    { name: "ライット", id: 41, mainId: "スキル", mainLv: 8, sub1Id: "攻撃力", sub1IdLv: 4, sub2Id: "防御力", sub2IdLv: 4 },
    { name: "レビント", id: 42, mainId: "水低下", mainLv: 8, sub1Id: "水強化", sub1IdLv: 4, sub2Id: "被ダメージCPに変換", sub2IdLv: 4 },
    { name: "ルビント", id: 43, mainId: "命中率", mainLv: 8, sub1Id: "クリティカル確率", sub1IdLv: 4, sub2Id: "闇抵抗力", sub2IdLv: 4 },
    { name: "花霊アサガオ", id: 44, mainId: "大地強化", mainLv: 8, sub1Id: "被ダメージCPに変換", sub1IdLv: 4, sub2Id: "最大CP", sub2IdLv: 4 },
    { name: "花霊ローズ", id: 45, mainId: "攻撃力", mainLv: 8, sub1Id: "状態異常抵抗力", sub1IdLv: 4, sub2Id: "クリティカルダメージ", sub2IdLv: 4 },
    { name: "花霊スミレ", id: 46, mainId: "状態異常抵抗力", mainLv: 8, sub1Id: "最大体力", sub1IdLv: 4, sub2Id: "悪魔型ダメージ", sub2IdLv: 4 },
    { name: "花霊ベル", id: 47, mainId: "大地低下", mainLv: 8, sub1Id: "大地強化", sub1IdLv: 4, sub2Id: "大地抵抗力", sub2IdLv: 4 },
    { name: "花霊ナノハ", id: 48, mainId: "風抵抗力", mainLv: 8, sub1Id: "命中率", sub1IdLv: 4, sub2Id: "全ての属性抵抗", sub2IdLv: 4 },
    { name: "花霊カスミ", id: 49, mainId: "被ダメージ反射", mainLv: 8, sub1Id: "ペット&召喚獣全てのステータス", sub1IdLv: 4, sub2Id: "ペット&召喚獣状態異常抵抗", sub2IdLv: 4 },
    { name: "花霊ノウゼン", id: 50, mainId: "風強化", mainLv: 8, sub1Id: "最大CP", sub1IdLv: 4, sub2Id: "風低下", sub2IdLv: 4 },
    { name: "花霊ワスレナ", id: 51, mainId: "攻撃速度", mainLv: 8, sub1Id: "最大体力", sub1IdLv: 4, sub2Id: "大地低下", sub2IdLv: 4 },
    { name: "花霊アマドコロ", id: 52, mainId: "風低下", mainLv: 8, sub1Id: "風抵抗力", sub1IdLv: 4, sub2Id: "風強化", sub2IdLv: 4 },
    { name: "花霊ウィロウ", id: 53, mainId: "経験値", mainLv: 8, sub1Id: "攻撃力", sub1IdLv: 4, sub2Id: "火抵抗力", sub2IdLv: 4 },
    { name: "花霊アイリス", id: 54, mainId: "被魔法ダメージ吸収", mainLv: 8, sub1Id: "風強化", sub1IdLv: 4, sub2Id: "移動速度", sub2IdLv: 4 },
    { name: "黄昏のフレア", id: 55, mainId: "火低下", mainLv: 16, sub1Id: "回避率", sub1IdLv: 8, sub2Id: "火強化", sub2IdLv: 8 },
    { name: "堕落のフレア", id: 56, mainId: "水低下", mainLv: 16, sub1Id: "水強化", sub1IdLv: 8, sub2Id: "最大CP", sub2IdLv: 8 },
    { name: "呪いのフレア", id: 57, mainId: "風低下", mainLv: 16, sub1Id: "全ての属性抵抗", sub1IdLv: 8, sub2Id: "風強化", sub2IdLv: 8 },
    { name: "暗闇のフレア", id: 58, mainId: "水強化", mainLv: 16, sub1Id: "水抵抗力", sub1IdLv: 8, sub2Id: "水低下", sub2IdLv: 8 },
    { name: "地獄のフレア", id: 59, mainId: "状態異常抵抗力", mainLv: 16, sub1Id: "攻撃速度", sub1IdLv: 8, sub2Id: "悪魔型ダメージ", sub2IdLv: 8 },
    { name: "ボーンナイト", id: 60, mainId: "闇抵抗力", mainLv: 16, sub1Id: "最大体力", sub1IdLv: 8, sub2Id: "防御力", sub2IdLv: 8 },
    { name: "ボーンウォリアー", id: 61, mainId: "大地強化", mainLv: 16, sub1Id: "防御力", sub1IdLv: 8, sub2Id: "大地強化", sub2IdLv: 8 },
    { name: "ボーンヒーロー", id: 62, mainId: "闇低下", mainLv: 16, sub1Id: "闇強化", sub1IdLv: 8, sub2Id: "経験値", sub2IdLv: 8 },
    { name: "ボーンソルジャー", id: 63, mainId: "防御力", mainLv: 16, sub1Id: "攻撃力", sub1IdLv: 8, sub2Id: "被ダメージ反射", sub2IdLv: 8 },
    { name: "ボーンシーフ", id: 64, mainId: "闇強化", mainLv: 16, sub1Id: "スキルクールタイム減少", sub1IdLv: 8, sub2Id: "闇低下", sub2IdLv: 8 },
    { name: "空色のルジュエ", id: 65, mainId: "被ダメージ反射", mainLv: 16, sub1Id: "最大体力", sub1IdLv: 8, sub2Id: "ドロップ率", sub2IdLv: 8 },
    { name: "血色のルジュエ", id: 66, mainId: "火強化", mainLv: 16, sub1Id: "火低下", sub1IdLv: 8, sub2Id: "スキル", sub2IdLv: 8 },
    { name: "リボンのルジュエ", id: 67, mainId: "移動速度", mainLv: 16, sub1Id: "クリティカルダメージ", sub1IdLv: 8, sub2Id: "命中率", sub2IdLv: 8 },
    { name: "太糸のルジュエ", id: 68, mainId: "回避率", mainLv: 16, sub1Id: "移動速度", sub1IdLv: 8, sub2Id: "神獣型ダメージ", sub2IdLv: 8 },
    { name: "ルジュエ", id: 69, mainId: "最大CP", mainLv: 16, sub1Id: "ドロップ率", sub1IdLv: 8, sub2Id: "攻撃速度", sub2IdLv: 8 },
    { name: "ヴィド", id: 70, mainId: "大地抵抗力", mainLv: 16, sub1Id: "被ダメージCPに変換", sub1IdLv: 8, sub2Id: "攻撃力", sub2IdLv: 8 },
    { name: "モヒカンキャロ", id: 71, mainId: "ドロップ率", mainLv: 16, sub1Id: "経験値", sub1IdLv: 8, sub2Id: "クリティカルダメージ減少", sub2IdLv: 8 },
    { name: "リーゼントキャロ", id: 72, mainId: "クリティカルダメージ", mainLv: 16, sub1Id: "クリティカル確率", sub1IdLv: 8, sub2Id: "動物型ダメージ", sub2IdLv: 8 },
    { name: "アフロキャロ", id: 73, mainId: "風強化", mainLv: 16, sub1Id: "風低下", sub1IdLv: 8, sub2Id: "状態異常抵抗力", sub2IdLv: 8 },
    { name: "ファフ", id: 74, mainId: "全ての属性抵抗", mainLv: 16, sub1Id: "光強化", sub1IdLv: 8, sub2Id: "能力値低下防止", sub2IdLv: 8 },
    { name: "ポフ", id: 75, mainId: "光低下", mainLv: 16, sub1Id: "アンデッド型ダメージ", sub1IdLv: 8, sub2Id: "光強化", sub2IdLv: 8 },
    { name: "パフ", id: 76, mainId: "火強化", mainLv: 16, sub1Id: "火低下", sub1IdLv: 8, sub2Id: "火抵抗力", sub2IdLv: 8 },
    { name: "プフ", id: 77, mainId: "大地低下", mainLv: 16, sub1Id: "大地抵抗力", sub1IdLv: 8, sub2Id: "大地強化", sub2IdLv: 8 },
    { name: "レッドアブソル", id: 78, mainId: "クリティカル確率", mainLv: 16, sub1Id: "クリティカルダメージ", sub1IdLv: 8, sub2Id: "全ての属性抵抗", sub2IdLv: 8 },
    { name: "ブルーアブソル", id: 79, mainId: "攻撃力", mainLv: 16, sub1Id: "体力吸収", sub1IdLv: 8, sub2Id: "水抵抗力", sub2IdLv: 8 },
    { name: "グリーンアブソル", id: 80, mainId: "大地強化", mainLv: 16, sub1Id: "大地抵抗力", sub1IdLv: 8, sub2Id: "大地低下", sub2IdLv: 8 },
    { name: "パープルアブソル", id: 81, mainId: "防御力", mainLv: 16, sub1Id: "被魔法ダメージ吸収", sub1IdLv: 8, sub2Id: "被ダメージ反射", sub2IdLv: 8 },
    { name: "ロードアブソル", id: 82, mainId: "クリティカル確率", mainLv: 16, sub1Id: "スキル", sub1IdLv: 8, sub2Id: "火抵抗力", sub2IdLv: 8 },
    { name: "強靭なヒヨコ戦士", id: 83, mainId: "攻撃速度", mainLv: 16, sub1Id: "体力吸収", sub1IdLv: 8, sub2Id: "風抵抗力", sub2IdLv: 8 },
    { name: "強運のヒヨコ戦士", id: 84, mainId: "クリティカル確率", mainLv: 16, sub1Id: "最大CP", sub1IdLv: 8, sub2Id: "攻撃速度", sub2IdLv: 8 },
    { name: "賢明なヒヨコ戦士", id: 85, mainId: "光強化", mainLv: 16, sub1Id: "光低下", sub1IdLv: 8, sub2Id: "アンデッド型ダメージ", sub2IdLv: 8 },
    { name: "疾風のヒヨコ戦士", id: 86, mainId: "大地強化", mainLv: 16, sub1Id: "最大体力", sub1IdLv: 8, sub2Id: "大地低下", sub2IdLv: 8 },
    { name: "壮健なヒヨコ戦士", id: 87, mainId: "クリティカルダメージ減少", mainLv: 16, sub1Id: "クリティカル確率", sub1IdLv: 8, sub2Id: "光抵抗力", sub2IdLv: 8 },
    { name: "ワイアットピグ", id: 117, mainId: "最大体力", mainLv: 16, sub1Id: "風抵抗力", sub1IdLv: 8, sub2Id: "全ての属性抵抗", sub2IdLv: 8 },
    { name: "コリントピグ", id: 118, mainId: "火強化", mainLv: 16, sub1Id: "火低下", sub1IdLv: 8, sub2Id: "スキル", sub2IdLv: 8 },
    { name: "フィルバートピグ", id: 119, mainId: "風強化", mainLv: 16, sub1Id: "風低下", sub1IdLv: 8, sub2Id: "クリティカルダメージ減少", sub2IdLv: 8 },
    { name: "メイソンピグ", id: 120, mainId: "ペット&召喚獣体力", mainLv: 16, sub1Id: "ペット&召喚獣状態異常抵抗", sub1IdLv: 8, sub2Id: "ペット&召喚獣強化", sub2IdLv: 8 },
    { name: "骸骨仮面バット", id: 123, mainId: "被ダメージCPに変換", mainLv: 16, sub1Id: "防御力", sub1IdLv: 8, sub2Id: "抵抗力低下防止", sub2IdLv: 8 },
    { name: "ピエロ仮面バット", id: 124, mainId: "命中率", mainLv: 16, sub1Id: "闇強化", sub1IdLv: 8, sub2Id: "闇低下", sub2IdLv: 8 },
    { name: "舞台仮面バット", id: 125, mainId: "状態異常抵抗力", mainLv: 16, sub1Id: "攻撃力", sub1IdLv: 8, sub2Id: "クリティカルダメージ", sub2IdLv: 8 },
    { name: "トガリ仮面バット", id: 126, mainId: "ペット&召喚獣攻撃力", mainLv: 16, sub1Id: "ペット&召喚獣攻撃力", sub1IdLv: 8, sub2Id: "ペット&召喚獣全てのステータス", sub2IdLv: 8 },
    { name: "ピンクチビット", id: 135, mainId: "スキル", mainLv: 16, sub1Id: "火強化", sub1IdLv: 8, sub2Id: "クリティカル確率", sub2IdLv: 8 },
    { name: "ブルーチビット", id: 136, mainId: "最大体力", mainLv: 16, sub1Id: "状態異常抵抗力", sub1IdLv: 8, sub2Id: "経験値", sub2IdLv: 8 },
    { name: "グリーンチビット", id: 137, mainId: "ペット&召喚獣状態異常抵抗", mainLv: 16, sub1Id: "ペット&召喚獣強化", sub1IdLv: 8, sub2Id: "ペット&召喚獣体力", sub2IdLv: 8 },
    { name: "オレンジチビット", id: 138, mainId: "クリティカルダメージ", mainLv: 16, sub1Id: "防御力", sub1IdLv: 8, sub2Id: "命中率", sub2IdLv: 8 },
    { name: "花精マリアカラス", id: 141, mainId: "攻撃力", mainLv: 16, sub1Id: "体力吸収", sub1IdLv: 8, sub2Id: "状態異常抵抗力", sub2IdLv: 8 },
    { name: "花精シャルル", id: 142, mainId: "ペット&召喚獣強化", mainLv: 16, sub1Id: "ペット&召喚獣全てのステータス", sub1IdLv: 8, sub2Id: "攻撃速度", sub2IdLv: 8 },
    { name: "花精サンブライト", id: 143, mainId: "経験値", mainLv: 16, sub1Id: "移動速度", sub1IdLv: 8, sub2Id: "水低下", sub2IdLv: 8 },
    { name: "花精ブルームーン", id: 144, mainId: "スキル", mainLv: 16, sub1Id: "神獣型ダメージ", sub1IdLv: 8, sub2Id: "体力吸収", sub2IdLv: 8 },
    { name: "ブラウンモス", id: 145, mainId: "火抵抗力", mainLv: 16, sub1Id: "攻撃力", sub1IdLv: 8, sub2Id: "被魔法ダメージ吸収", sub2IdLv: 8 },
    { name: "バイオレットモス", id: 146, mainId: "水抵抗力", mainLv: 16, sub1Id: "水強化", sub1IdLv: 8, sub2Id: "能力値低下防止", sub2IdLv: 8 },
    { name: "オリーブモス", id: 147, mainId: "風抵抗力", mainLv: 16, sub1Id: "最大体力", sub1IdLv: 8, sub2Id: "抵抗力低下防止", sub2IdLv: 8 },
    { name: "ミュータントモス", id: 148, mainId: "大地抵抗力", mainLv: 16, sub1Id: "悪魔型ダメージ", sub1IdLv: 8, sub2Id: "闇抵抗力", sub2IdLv: 8 },
    { name: "パープルエリーズ", id: 153, mainId: "クリティカル確率", mainLv: 16, sub1Id: "経験値", sub1IdLv: 8, sub2Id: "水抵抗力", sub2IdLv: 8 },
    { name: "ブルーエリーズ", id: 154, mainId: "光抵抗力", mainLv: 16, sub1Id: "攻撃力", sub1IdLv: 8, sub2Id: "神獣型ダメージ", sub2IdLv: 8 },
    { name: "レッドエリーズ", id: 155, mainId: "ペット&召喚獣攻撃力", mainLv: 16, sub1Id: "ペット&召喚獣状態異常抵抗", sub1IdLv: 8, sub2Id: "ペット&召喚獣体力", sub2IdLv: 8 },
    { name: "グリーンエリーズ", id: 156, mainId: "移動速度", mainLv: 16, sub1Id: "被ダメージ反射", sub1IdLv: 8, sub2Id: "火抵抗力", sub2IdLv: 8 },
    { name: "チャンピオンマモ", id: 157, mainId: "攻撃力", mainLv: 16, sub1Id: "アンデッド型ダメージ", sub1IdLv: 8, sub2Id: "光強化", sub2IdLv: 8 },
    { name: "チャンピオンシマ", id: 158, mainId: "ペット&召喚獣全てのステータス", mainLv: 16, sub1Id: "ペット&召喚獣攻撃力", sub1IdLv: 8, sub2Id: "ペット&召喚獣体力", sub2IdLv: 8 },
    { name: "チャンピオンモモ", id: 159, mainId: "最大体力", mainLv: 16, sub1Id: "闇抵抗力", sub1IdLv: 8, sub2Id: "体力吸収", sub2IdLv: 8 },
    { name: "チャンピオンジリ", id: 160, mainId: "最大CP", mainLv: 16, sub1Id: "クリティカル確率", sub1IdLv: 8, sub2Id: "ドロップ率", sub2IdLv: 8 },
    { name: "コボルト大魔導師", id: 88, mainId: "火低下", mainLv: 24, sub1Id: "火強化", sub1IdLv: 12, sub2Id: "魔法攻撃力強化", sub2IdLv: 3 },
    { name: "ウィッチマゴ", id: 89, mainId: "光低下", mainLv: 24, sub1Id: "光強化", sub1IdLv: 12, sub2Id: "魔法強打", sub2IdLv: 3 },
    { name: "ドレアス", id: 90, mainId: "水低下", mainLv: 24, sub1Id: "水強化", sub1IdLv: 12, sub2Id: "水抵抗力", sub2IdLv: 12 },
    { name: "ナイトスピア", id: 91, mainId: "アンデッド型ダメージ", mainLv: 24, sub1Id: "上級状態異常抵抗力", sub1IdLv: 3, sub2Id: "闇抵抗力", sub2IdLv: 12 },
    { name: "ドベルト", id: 92, mainId: "動物型ダメージ", mainLv: 24, sub1Id: "クリティカル確率", sub1IdLv: 12, sub2Id: "PVP防御力", sub2IdLv: 3 },
    { name: "タイムシュラット", id: 93, mainId: "スキルクールタイム減少", mainLv: 24, sub1Id: "被ダメージ反射", sub1IdLv: 12, sub2Id: "風抵抗力", sub2IdLv: 12 },
    { name: "エマティース", id: 94, mainId: "大地低下", mainLv: 24, sub1Id: "大地強化", sub1IdLv: 12, sub2Id: "最大CP", sub2IdLv: 12 },
    { name: "トゥルイク", id: 95, mainId: "悪魔型ダメージ", mainLv: 24, sub1Id: "PVP防御力", sub1IdLv: 3, sub2Id: "上級攻撃力", sub2IdLv: 3 },
    { name: "グリフォン", id: 96, mainId: "風低下", mainLv: 24, sub1Id: "風強化", sub1IdLv: 12, sub2Id: "上級最大CP", sub2IdLv: 3 },
    { name: "マスクグール", id: 97, mainId: "闇低下", mainLv: 24, sub1Id: "闇強化", sub1IdLv: 12, sub2Id: "与魔法ダメージ吸収", sub2IdLv: 3 },
    { name: "泣き虫ルドルフ", id: 105, mainId: "ドロップ率", mainLv: 24, sub1Id: "PVP攻撃力", sub1IdLv: 3, sub2Id: "命中率", sub2IdLv: 12 },
    { name: "クリスマスフェアリー", id: 106, mainId: "ペット&召喚獣体力", mainLv: 24, sub1Id: "経験値", sub1IdLv: 12, sub2Id: "ペット&召喚獣強化", sub2IdLv: 12 },
    { name: "フォクシーテール", id: 108, mainId: "経験値", mainLv: 24, sub1Id: "人間型魔法ダメージ", sub1IdLv: 3, sub2Id: "魔法攻撃力強化", sub2IdLv: 3 },
    { name: "ハウンデブル", id: 109, mainId: "被ダメージ反射", mainLv: 24, sub1Id: "被ダメージCPに変換", sub1IdLv: 12, sub2Id: "火抵抗力", sub2IdLv: 12 },
    { name: "ペンギン大佐", id: 113, mainId: "回避率", mainLv: 24, sub1Id: "上級防御力", sub1IdLv: 3, sub2Id: "風抵抗力", sub2IdLv: 12 },
    { name: "プリンセスルーナ", id: 114, mainId: "被魔法ダメージ吸収", mainLv: 24, sub1Id: "人間型ダメージ", sub1IdLv: 3, sub2Id: "抵抗力低下防止", sub2IdLv: 12 },
    { name: "クマーン", id: 121, mainId: "防御力", mainLv: 24, sub1Id: "強打", sub1IdLv: 3, sub2Id: "全ての属性抵抗", sub2IdLv: 12 },
    { name: "見習い魔女リトル", id: 127, mainId: "クリティカルダメージ減少", mainLv: 24, sub1Id: "上級体力", sub1IdLv: 3, sub2Id: "能力値低下防止", sub2IdLv: 12 },
    { name: "ライカンスロープ", id: 139, mainId: "神獣型ダメージ", mainLv: 24, sub1Id: "敵致命打減少", sub1IdLv: 3, sub2Id: "被ダメージ反射", sub2IdLv: 12 },
    { name: "キングクレバネット", id: 149, mainId: "経験値", mainLv: 24, sub1Id: "体力吸収", sub1IdLv: 12, sub2Id: "上級攻撃速度", sub2IdLv: 3 },
    { name: "ガイア", id: 150, mainId: "闇低下", mainLv: 24, sub1Id: "魔法強打", sub1IdLv: 3, sub2Id: "光抵抗力", sub2IdLv: 12 },
    { name: "トリックスター", id: 161, mainId: "状態異常抵抗力", mainLv: 24, sub1Id: "防御力", sub1IdLv: 12, sub2Id: "人間型ダメージ抵抗", sub2IdLv: 3 },
    { name: "ドリーマー", id: 173, mainId: "命中率", mainLv: 24, sub1Id: "上級攻撃力", sub1IdLv: 3, sub2Id: "攻撃速度", sub2IdLv: 12 },
    { name: "ノーマド", id: 174, mainId: "回避率", mainLv: 24, sub1Id: "大地抵抗力", sub1IdLv: 12, sub2Id: "魔法攻撃力低下", sub2IdLv: 3 },
    { name: "シッティングダイル", id: 175, mainId: "攻撃速度", mainLv: 24, sub1Id: "クリティカルダメージ", sub1IdLv: 12, sub2Id: "回避率", sub2IdLv: 12 },
    { name: "シーウォーカー", id: 177, mainId: "最大体力", mainLv: 24, sub1Id: "ダブルクリティカルダメージ", sub1IdLv: 3, sub2Id: "最大体力", sub2IdLv: 12 },
    { name: "クレア", id: 179, mainId: "攻撃力", mainLv: 24, sub1Id: "クリティカルダメージ減少", sub1IdLv: 12, sub2Id: "ドロップ率", sub2IdLv: 12 },
    { name: "サキュバスヴェラ", id: 183, mainId: "スキル", mainLv: 24, sub1Id: "経験値", sub1IdLv: 12, sub2Id: "上級スキル", sub2IdLv: 3 },
    { name: "インキュバス", id: 98, mainId: "上級スキル", mainLv: 10, sub1Id: "魔法攻撃力低下", sub1IdLv: 5, sub2Id: "闇強化", sub2IdLv: 16 },
    { name: "吸血姫", id: 99, mainId: "体力吸収", mainLv: 32, sub1Id: "スキル", sub1IdLv: 16, sub2Id: "上級攻撃力", sub2IdLv: 5 },
    { name: "アイスクイーン", id: 100, mainId: "ペット&召喚獣強化", mainLv: 32, sub1Id: "PVP防御力", sub1IdLv: 5, sub2Id: "人間型魔法ダメージ", sub2IdLv: 5 },
    { name: "ラストウィッチ", id: 101, mainId: "魔法致命打", mainLv: 10, sub1Id: "与魔法ダメージ吸収", sub1IdLv: 5, sub2Id: "火強化", sub2IdLv: 16 },
    { name: "ラミア", id: 102, mainId: "クリティカルダメージ", mainLv: 32, sub1Id: "PVP攻撃力", sub1IdLv: 5, sub2Id: "回避率", sub2IdLv: 16 },
    { name: "サンタレビット", id: 107, mainId: "ドロップ率", mainLv: 32, sub1Id: "強打", sub1IdLv: 5, sub2Id: "最大体力", sub2IdLv: 16 },
    { name: "レオフォールド", id: 110, mainId: "ペット&召喚獣全てのステータス", mainLv: 32, sub1Id: "PVP防御力", sub1IdLv: 5, sub2Id: "ペット&召喚獣状態異常抵抗", sub2IdLv: 16 },
    { name: "メリアス", id: 111, mainId: "強打", mainLv: 10, sub1Id: "上級体力", sub1IdLv: 5, sub2Id: "大地強化", sub2IdLv: 16 },
    { name: "コモルコクーン", id: 115, mainId: "能力値低下防止", mainLv: 32, sub1Id: "人間型ダメージ抵抗", sub1IdLv: 5, sub2Id: "移動速度", sub2IdLv: 16 },
    { name: "マートン所長", id: 116, mainId: "クリティカル確率", mainLv: 32, sub1Id: "敵致命打減少", sub1IdLv: 16, sub2Id: "上級攻撃速度", sub2IdLv: 5 },
    { name: "スペクター", id: 122, mainId: "能力値低下防止", mainLv: 32, sub1Id: "上級防御力", sub1IdLv: 5, sub2Id: "命中率", sub2IdLv: 16 },
    { name: "パンプキンナイト", id: 128, mainId: "上級攻撃速度", mainLv: 10, sub1Id: "上級最大CP", sub1IdLv: 5, sub2Id: "被ダメージ反射", sub2IdLv: 16 },
    { name: "アサシン", id: 129, mainId: "攻撃速度", mainLv: 16, sub1Id: "強打", sub1IdLv: 5, sub2Id: "PVP防御", sub2IdLv: 10 },
    { name: "アーチャー", id: 130, mainId: "上級最大CP", mainLv: 10, sub1Id: "全ての属性抵抗", sub1IdLv: 16, sub2Id: "経験値", sub2IdLv: 16 },
    { name: "バーサーカー", id: 131, mainId: "被ダメージCPに変換", mainLv: 32, sub1Id: "上級体力", sub1IdLv: 5, sub2Id: "クリティカルダメージ減少", sub2IdLv: 16 },
    { name: "ランサー", id: 132, mainId: "全属性抵抗", mainLv: 32, sub1Id: "ドロップ率", sub1IdLv: 16, sub2Id: "スキル", sub2IdLv: 16 },
    { name: "ケンタウロスナイト", id: 140, mainId: "上級状態異常抵抗力", mainLv: 10, sub1Id: "上級攻撃力", sub1IdLv: 5, sub2Id: "上級状態異常抵抗力", sub2IdLv: 5 },
    { name: "クレセンティ", id: 151, mainId: "光低下", mainLv: 32, sub1Id: "上級スキル", sub1IdLv: 5, sub2Id: "上級最大CP", sub2IdLv: 5 },
    { name: "オーロラ", id: 162, mainId: "闇低下", mainLv: 32, sub1Id: "魔法攻撃力強化", sub1IdLv: 5, sub2Id: "人間型魔法ダメージ", sub2IdLv: 5 },
    { name: "アレクサンダ", id: 163, mainId: "敵致命打減少", mainLv: 10, sub1Id: "攻撃力", sub1IdLv: 16, sub2Id: "クリティカルダメージ", sub2IdLv: 16 },
    { name: "マキュリア", id: 180, mainId: "水低下", mainLv: 32, sub1Id: "魔法致命打", sub1IdLv: 5, sub2Id: "水強化", sub2IdLv: 16 },
    { name: "ラクネーラ", id: 181, mainId: "魔法強打", mainLv: 10, sub1Id: "PVP防御力", sub1IdLv: 5, sub2Id: "上級最大CP", sub2IdLv: 5 },
    { name: "ラクネーラ", id: 184, mainId: "人間型魔法ダメージ", mainLv: 10, sub1Id: "魔法致命打", sub1IdLv: 5, sub2Id: "水強化", sub2IdLv: 16 },
    { name: "橘 清音", id: 189, mainId: "クリティカル確率", mainLv: 32, sub1Id: "上級攻撃速度", sub1IdLv: 5, sub2Id: "命中率", sub2IdLv: 16 },
    { name: "枇々木 丈", id: 190, mainId: "クリティカルダメージ", mainLv: 32, sub1Id: "上級攻撃力", sub1IdLv: 5, sub2Id: "最大体力", sub2IdLv: 16 },
    { name: "宮 うつつ", id: 191, mainId: "上級最大CP", mainLv: 32, sub1Id: "状態異常抵抗力", sub1IdLv: 16, sub2Id: "経験値", sub2IdLv: 16 },
    { name: "爾乃美家 累", id: 192, mainId: "人間型魔法ダメージ", mainLv: 5, sub1Id: "スキル", sub1IdLv: 16, sub2Id: "被ダメージをCPに変換", sub2IdLv: 16 },
    { name: "シーカー", id: 203, mainId: "PVP防御力", mainLv: 10, sub1Id: "人間型ダメージ抵抗", sub1IdLv: 5, sub2Id: "被魔法ダメージ吸収", sub2IdLv: 16 },
    { name: "ヴァルキリー", id: 103, mainId: "上級攻撃力", mainLv: 20, sub1Id: "敵致命打減少", sub1IdLv: 10, sub2Id: "上級攻撃速度", sub2IdLv: 10 },
    { name: "アグレアス", id: 104, mainId: "人間型ダメージ", mainLv: 20, sub1Id: "上級体力", sub1IdLv: 10, sub2Id: "上級防御力", sub2IdLv: 10 },
    { name: "アビス", id: 112, mainId: "人間型ダメージ抵抗", mainLv: 20, sub1Id: "上級状態異常抵抗力", sub1IdLv: 10, sub2Id: "魔法強打", sub2IdLv: 10 },
    { name: "セイバー", id: 133, mainId: "強打", mainLv: 20, sub1Id: "上級最大CP", sub1IdLv: 10, sub2Id: "上級攻撃力", sub2IdLv: 10 },
    { name: "ライダー", id: 134, mainId: "魔法強打", mainLv: 20, sub1Id: "与魔法ダメージ吸収", sub1IdLv: 10, sub2Id: "上級スキル", sub2IdLv: 10 },
    { name: "グラビティアナ", id: 152, mainId: "PVP攻撃力", mainLv: 20, sub1Id: "強打", sub1IdLv: 10, sub2Id: "ダブルクリティカルダメージ", sub2IdLv: 10 },
    { name: "タナトス", id: 164, mainId: "魔法攻撃力強化", mainLv: 20, sub1Id: "魔法致命打", sub1IdLv: 10, sub2Id: "魔法攻撃力低下", sub2IdLv: 10 },
    { name: "ハーモニー", id: 182, mainId: "与魔法ダメージ吸収", mainLv: 20, sub1Id: "魔法攻撃力低下", sub1IdLv: 10, sub2Id: "上級スキル", sub2IdLv: 10 },
    { name: "一ノ瀬はじめ", id: 188, mainId: "上級防御力", mainLv: 20, sub1Id: "強打", sub1IdLv: 10, sub2Id: "魔法強打", sub2IdLv: 10 },
    { name: "ゴールド・エンペラー", id: 204, mainId: "最終ダメージ", mainLv: 20, sub1Id: "強打", sub1IdLv: 10, sub2Id: "上級状態異常抵抗力", sub2IdLv: 10 },
    //ここからは覚醒クリーチャー用
    { name: "メイン1", id: 9996, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
    { name: "サブ１", id: 9997, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
    { name: "サブ２", id: 9998, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
    { name: "サブ３", id: 9999, used: false, mainId: "test", mainLv: 20, sub1Id: "test", sub1IdLv: 10, sub2Id: "test", sub2IdLv: 10 },
];



function searchPassiveSkill() {
    var a2 = document.optionlist.a2.value ? document.optionlist.a2.value : "";
    if (!a2) {
        alert("何も選ばれてないよ");
        return;
    }
    var memo_main = [];
    var memo_sub = [];
    var skillset = [];
    var nameList = "";
    var tmpSkill = {
        skillName: a2,
        skillLv: 0,
    }
    skillData.forEach(function (e) {
        if (e.mainId === a2) {
            memo_main.push(e);
            nameList += e.name
            nameList += ", "
        }
        if (e.sub1Id === a2) {
            memo_sub.push(e);
            nameList += e.name
            nameList += ", "
        }
        if (e.sub2Id === a2) {
            memo_sub.push(e);
            nameList += e.name
            nameList += ", "
        }
    });
    var match = matchSkill(memo_main, memo_sub, a2);
    tmpSkill.skillLv = match.best_slv;
    skillset.push(tmpSkill);
    var resultRes3 = "[該当スキルを所持しているクリーチャー]\n" + nameList + "\n\n"
    if (match.best_slv > 0) {
        resultRes3 = resultRes3 + "最大効果は" + match.best + "] を組み合わせることで\n SLv" + match.best_slv + "が得られます。\n"
    } else {
        resultRes3 = resultRes3 + "このパッシブはクリーチャーパッシブ変換スキルでのみ入手できます。\n"
    }

    document.optionlist.res3.value = resultRes3;
    // オプション効果も引っ張ってきちゃう
    var greet4 = document.getElementById('passive_state2');
    greet4.innerHTML = '<p style="text-align: left">' + output2(skillset) + '</p>';

}

function matchSkill(main, sub, name) {
    var result = {
        matched: [], // その他(ロジック上出せる範囲で)
        best: "[ ", //最大値
        best_main: null,
        best3: null,
        best_slv: 0,
    }
    //メインは最大値を取るように選ぶ(それ以外は選ばない)
    if (main.length > 0) {
        var tmp_b = "";
        main.forEach(function (e, index) {
            if (e.mainLv > result.best_slv) {
                result.best_slv = e.mainLv;
                tmp_b = e.name;
            }
        });
        result.best += (tmp_b + ", ");
    }
    //メインは確定したので、サブだけで組む。(ロジック上同じの２匹は選ばれない)
    var best3 = [{ id: -1, name: "", slv: 0 }, { id: -1, name: "", slv: 0 }, { id: -1, name: "", slv: 0 }];
    sub.forEach(function (e, index) {
        if (e.sub1Id === name) {
            if (e.sub1IdLv > best3[0].slv) {
                best3[0] = { id: e.id, name: e.name, slv: e.sub1IdLv };
                best3.sort(function (a, b) {
                    if (a.slv > b.slv) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
        }
        if (e.sub2Id === name) {
            if (e.sub2IdLv > best3[0].slv) {
                best3[0] = { id: e.id, name: e.name, slv: e.sub2IdLv };
                best3.sort(function (a, b) {
                    if (a.slv > b.slv) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
        }
    });

    //結果出力
    result.best3 = best3;
    best3.forEach(function (e) {
        if (e.id !== -1) {
            result.best += (e.name + ", ");
            result.best_slv += parseInt(e.slv);
        }
    });
    return result;
};

function translateTubo(num) {
    if (crnt_num === 10000) {
        console.log("これ以上登録できません。");
        return num;
    }
    if (crnt_num >= 9996 && crnt_num <= 9999) {
        // formの中で入力してonclickしてDOM書き換えるとバグってリロードされちゃうから無理矢理回避してます。
        var d1dom = document.getElementById("sub_d1");
        var d2dom = document.getElementById("sub_d2");
        var d3dom = document.getElementById("sub_d3");
        var e1dom = document.getElementById("sub_e1");
        var e2dom = document.getElementById("sub_e2");
        var e3dom = document.getElementById("sub_e3");
        var d1 = d1dom.value ? d1dom.value : "";
        var d2 = d2dom.value ? d2dom.value : "";
        var d3 = d3dom.value ? d3dom.value : "";
        var e1 = e1dom.value ? parseInt(e1dom.value) : 0;
        var e2 = e2dom.value ? parseInt(e2dom.value) : 0;
        var e3 = e3dom.value ? parseInt(e3dom.value) : 0;

        skillData.forEach(function (e, index) {
            if (e.id === crnt_num) {
                var name = "";
                if (crnt_num === 9996) {
                    name = "自作メインクリーチャー"
                } else if (crnt_num === 9997) {
                    name = "自作サブクリーチャー１"
                } else if (crnt_num === 9998) {
                    name = "自作サブクリーチャー２"
                } else if (crnt_num === 9999) {
                    name = "自作サブクリーチャー３"
                }
                skillData[index] = {
                    name: name,
                    id: crnt_num,
                    used: true,
                    mainId: d1,
                    mainLv: e1,
                    sub1Id: d2,
                    sub1IdLv: e2,
                    sub2Id: d3,
                    sub2IdLv: e3
                }
                console.log(skillData[index]);
            }
        });
        crnt_num++;
    }
    return (crnt_num - 1);
}

var crnt_num = 9996;
var cnt = 0;
var set_c = [-1, -1, -1, -1];

function setCreature(num, pos) {
    if (num === -1) {
        if (pos === 0) {
            var greet = document.getElementById('main_c');
            greet.innerHTML = '<input onclick="setCreature(-1, 0)" type="image"src="../calculation/image//interface2_0767.png" title="メイン">';
            cnt = 0;
            crnt_num = 9996;
            set_c[0] = -1;
            calc();
            return;
        }
        if (pos === 1) {
            var greet = document.getElementById('sub_c1');
            greet.innerHTML = '<input onclick="setCreature(-1, 1)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ１">';
            cnt = 1;
            crnt_num = 9997;
            set_c[1] = -1;
            calc();
            return;
        }
        if (pos === 2) {
            var greet = document.getElementById('sub_c2');
            greet.innerHTML = '<input onclick="setCreature(-1, 2)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ２">';
            cnt = 2;
            crnt_num = 9998;
            set_c[2] = -1;
            calc();
            return;
        }
        if (pos === 3) {
            var greet = document.getElementById('sub_c3');
            greet.innerHTML = '<input onclick="setCreature(-1, 3)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ３">';
            cnt = 3;
            crnt_num = 9999;
            set_c[3] = -1;
            calc();
            return;
        }
    }
    if (parseInt(num) === 9999) {
        num = translateTubo(num);
    }
    if (cnt === 0 && set_c[0] === -1) {
        var greet = document.getElementById('main_c');
        greet.innerHTML = '<input onclick="setCreature(-1, 0)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="メイン">';
        cnt = 1;
        crnt_num = 9997;
        set_c[0] = parseInt(num);
        calc();
        return;
    }
    if (cnt === 1 && set_c[1] === -1) {
        var greet = document.getElementById('sub_c1');
        greet.innerHTML = '<input onclick="setCreature(-1, 1)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="サブ１">';
        cnt = 2;
        crnt_num = 9998;
        set_c[1] = parseInt(num);
        calc();
        return;
    }
    if (cnt === 2 && set_c[2] === -1) {
        var greet = document.getElementById('sub_c2');
        greet.innerHTML = '<input onclick="setCreature(-1, 2)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="サブ２">';
        cnt = 3;
        crnt_num = 9999;
        set_c[2] = parseInt(num);
        calc();
        return;
    }
    if (cnt === 3 && set_c[3] === -1) {
        var greet = document.getElementById('sub_c3');
        greet.innerHTML = '<input onclick="setCreature(-1, 3)" type="image"src="../information/creature2_files/creature_' + num + '.png" title="サブ３">';
        cnt = 4;
        crnt_num = 10000;
        set_c[3] = parseInt(num);
        calc();
        return;
    }
    console.log("インベントリが一杯です。(赤文字)" + set_c);
    //ここまできたら目いっぱいセットされてるよ
};

// いいから全部リセットだ！！！
function resetCreature() {
    var greet = document.getElementById('main_c');
    greet.innerHTML = '<input onclick="setCreature(-1, 0)" type="image"src="../calculation/image//interface2_0767.png" title="メイン">';
    var greet1 = document.getElementById('sub_c1');
    greet1.innerHTML = '<input onclick="setCreature(-1, 1)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ１">';
    var greet2 = document.getElementById('sub_c2');
    greet2.innerHTML = '<input onclick="setCreature(-1, 2)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ２">';
    var greet3 = document.getElementById('sub_c3');
    greet3.innerHTML = '<input onclick="setCreature(-1, 3)" type="image"src="../calculation/image//interface2_0767-1.png" title="サブ３">';
    cnt = 0;
    crnt_num = 9996;
    set_c = [-1, -1, -1, -1];
    calc();
}

// {id: -1, value: "効果なし"}
// データベース(ただの配列)をもとに計算して結果を良い感じに出力してくれる計算機くん
function calc() {
    var skillset = [];
    var mobname = [];
    // forEachでいいんじゃないかな…。
    for (var i = 0; i <= 3; i++) {
        if (set_c[i] === -1) {
            continue;//空だもんね
        }
        for (var j = 0; j < skillData.length; j++) {
            if (skillData[j].id === set_c[i]) {
                mobname.push(skillData[j].name);
                //パッシブ展開だ！！！！
                if (i === 0) {
                    // ここでリネームしてるの悪い設計だなあ…。
                    var mainSkill = {
                        skillName: skillData[j].mainId,
                        skillLv: skillData[j].mainLv,
                        passive_rank: searchaPassiveRank(skillData[j].mainId),
                    }
                    //初っ端だから必ず空
                    skillset.push(mainSkill);
                    var sub1 = {
                        skillName: skillData[j].sub1Id,
                        skillLv: skillData[j].sub1IdLv,
                        passive_rank: searchaPassiveRank(skillData[j].mainId),
                    }
                    // 勇気のゴーレムみたいにメインとサブで同じパッシブ持ってるのいるんで
                    merge(skillset, sub1);
                    var sub2 = {
                        skillName: skillData[j].sub2Id,
                        skillLv: skillData[j].sub2IdLv,
                        passive_rank: searchaPassiveRank(skillData[j].mainId),
                    }
                    merge(skillset, sub2);
                } else {
                    var sub1 = {
                        skillName: skillData[j].sub1Id,
                        skillLv: skillData[j].sub1IdLv,
                        passive_rank: searchaPassiveRank(skillData[j].mainId),
                    }
                    merge(skillset, sub1);
                    var sub2 = {
                        skillName: skillData[j].sub2Id,
                        skillLv: skillData[j].sub2IdLv,
                        passive_rank: searchaPassiveRank(skillData[j].mainId),
                    }
                    merge(skillset, sub2);
                }
            }
        }
    }
    //ここまででパッシブ一覧が出来てるはずなので出力するよ
    document.keisannormal.res1.value = output1(mobname);
    var greet3 = document.getElementById('passive_state');
    greet3.innerHTML = ('<p style="text-align: left">' + output2(skillset) + '</p>');

}

function output1(mobname) {
    var result = mobname.map(function (e) {
        return "<" + e + ">\n";
    });
    return result;
}

function output2(skillset) {
    var result = skillset.map(function (e) {
        var creatureId = searchID(e.skillName);
        var options = searchOption(creatureId, e.skillLv);
        if (e.passive_rank === 1) {
            // 上級スキル
            return '＜<span class="color-image1">' + e.skillName + '</span> Lv <span class="color-image11">' + e.skillLv + '</span>＞<br>' + options;
        } else if (e.passive_rank === 2) {
            //　一般スキル
            return '＜<span class="color-image2">' + e.skillName + '</span> Lv <span class="color-image11">' + e.skillLv + '</span>＞<br>' + options;
        } else {
            //その他(ないけど一応赤くしておくよ)
            return '＜<span class="color-image1">' + e.skillName + '</span> Lv <span class="color-image11">' + e.skillLv + '</span>＞<br>' + options;
        }
    });
    return result;
}

//色付け用
function searchaPassiveRank(value) {
    var prank = 0;
    for (var i = 0; i < skillIdMap.length; i++) {
        if (skillIdMap[i].value === value) {
            prank = skillIdMap[i].passive_rank;
            break;
        }
    };
    return prank;
}

function searchID(value) {
    var result = -1;
    skillIdMap.forEach(function (e) {
        if (e.value === value) {
            result = e.id;
        }
    });
    if (result === -1) {
        console.log("誤字ってるからマシュマロ報告よろ：https://marshmallow-qa.com/sokoranominnsyu");
    }
    return result;
}

function searchOption(cid, slv) {
    // これ直書きが一番速いってことに気づいてしまった。実ソースだとそんなことないだろうけど。
    var result = '';
    if (cid === 0) {
        if (slv >= 50) {
            result += '- PVP時、攻撃力増加 <span class="color-image11">' + 40 + '</span>%<br>';
            result += '- 攻撃速度 +<span class="color-image11">50</span>%<br>'
            result += '- PVP時、防御力増加 <span class="color-image11">15</span>%<br>'
        } else {
            result += '- PVP時、攻撃力増加 <span class="color-image11">' + Math.round(slv * 0.6) + '</span>%<br>';
            if (slv >= 40) {
                result += '- 攻撃速度 +<span class="color-image11">30</span>%<br>'
                result += '- PVP時、防御力増加 <span class="color-image11">10</span>%<br>'
            } else if (slv >= 30) {
                result += '- 攻撃速度 +<span class="color-image11">20</span>%<br>'
                result += '- PVP時、防御力増加 <span class="color-image11">5</span>%<br>'
            } else if (slv >= 20) {
                result += '- 攻撃速度 +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 1) {
        if (slv >= 50) {
            result += '- PVP時、防御力増加 <span class="color-image11">' + 40 + '</span>%<br>';
            result += '- 最大HP +<span class="color-image11">50</span>%<br>'
            result += '- PVP時、攻撃力増加 <span class="color-image11">15</span>%<br>'
        } else {
            result += '- PVP時、防御力増加 <span class="color-image11">' + Math.round(slv * 0.6) + '</span>%<br>';
            if (slv >= 40) {
                result += '- 最大HP +<span class="color-image11">30</span>%<br>'
                result += '- PVP時、攻撃力増加 <span class="color-image11">10</span>%<br>'
            } else if (slv >= 30) {
                result += '- 最大HP +<span class="color-image11">20</span>%<br>'
                result += '- PVP時、攻撃力増加 <span class="color-image11">5</span>%<br>'
            } else if (slv >= 20) {
                result += '- 最大HP +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 2) {
        if (slv >= 50) {
            result += '- スキルクールタイム <span class="color-image11">30</span>％ 減少<br>';
            result += '- 最大CP <span class="color-image11">+800</span><br>'
            result += '- スキルレベル <span class="color-image11">+3</span><br>'
        } else {
            let sl = slv * 1 < 24 ? slv : 25
            result += '- スキルクールタイム <span class="color-image11">' + sl + '</span>％ 減少<br>';
            if (slv >= 40) {
                result += '- 最大CP <span class="color-image11">+650</span><br>'
                result += '- スキルレベル <span class="color-image11">+2</span><br>'
            } else if (slv >= 30) {
                result += '- 最大CP <span class="color-image11">+550</span><br>'
                result += '- スキルレベル <span class="color-image11">+1</span><br>'
            } else if (slv >= 20) {
                result += '- 最大CP <span class="color-image11">+450</span><br>'
            }
        }
    }
    if (cid === 3) {
        if (slv >= 50) {
            result += '- アンデッド型キャラクターに追加で<span class="color-image11">' + 100 + '</span>％のダメージを与える。<br>';
            result += '- ダメージ +<span class="color-image11">50</span>%<br>'
            result += '- クリティカル率 +<span class="color-image11">3</span>%<br>'
        } else {
            result += '- アンデッド型キャラクターに追加で<span class="color-image11">' + Math.round(19 + slv * 1.5) + '</span>％のダメージを与える。<br>';
            if (slv >= 40) {
                result += '- ダメージ +<span class="color-image11">30</span>%<br>'
            } else if (slv >= 30) {
                result += '- ダメージ +<span class="color-image11">20</span>%<br>'
            } else if (slv >= 20) {
                result += '- ダメージ +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 4) {
        // LV14で40%
        if (slv >= 50) {
            result += '- 人間型キャラクターに追加で<span class="color-image11">' + 100 + '</span>％のダメージを与える。<br>';
            result += '- ダメージ +<span class="color-image11">100</span>%<br>'
            result += '- 最終ダメージ +<span class="color-image11">5</span>%<br>'
        } else {
            result += '- 人間型キャラクターに追加で<span class="color-image11">' + Math.round(19 + slv * 1.5) + '</span>％のダメージを与える。<br>';
            if (slv >= 40) {
                result += '- ダメージ +<span class="color-image11">80</span>%<br>'
            } else if (slv >= 30) {
                result += '- ダメージ +<span class="color-image11">60</span>%<br>'
            } else if (slv >= 20) {
                result += '- ダメージ +<span class="color-image11">40</span>%<br>'
            }
        }
    }
    if (cid === 5) {
        if (slv >= 50) {
            result += '- 悪魔型キャラクターに追加で<span class="color-image11">' + 100 + '</span>％のダメージを与える。<br>';
            result += '- ダメージ +<span class="color-image11">50</span>%<br>'
            result += '- クリティカル率 +<span class="color-image11">3</span>%<br>'
        } else {
            result += '- 悪魔型キャラクターに追加で<span class="color-image11">' + Math.round(19 + slv * 1.5) + '</span>％のダメージを与える。<br>';
            if (slv >= 40) {
                result += '- ダメージ +<span class="color-image11">30</span>%<br>'
            } else if (slv >= 30) {
                result += '- ダメージ +<span class="color-image11">20</span>%<br>'
            } else if (slv >= 20) {
                result += '- ダメージ +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 6) {
        if (slv >= 50) {
            result += '- 動物型キャラクターに追加で<span class="color-image11">' + 100 + '</span>％のダメージを与える。<br>';
            result += '- ダメージ +<span class="color-image11">50</span>%<br>'
            result += '- クリティカル率 +<span class="color-image11">3</span>%<br>'
        } else {
            result += '- 動物型キャラクターに追加で<span class="color-image11">' + Math.round(19 + slv * 1.5) + '</span>％のダメージを与える。<br>';
            if (slv >= 40) {
                result += '- ダメージ +<span class="color-image11">30</span>%<br>'
            } else if (slv >= 30) {
                result += '- ダメージ +<span class="color-image11">20</span>%<br>'
            } else if (slv >= 20) {
                result += '- ダメージ +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 7) {
        if (slv >= 50) {
            result += '- 神獣型キャラクターに追加で<span class="color-image11">' + 100 + '</span>％のダメージを与える。<br>';
            result += '- ダメージ +<span class="color-image11">50</span>%<br>'
            result += '- クリティカル率 +<span class="color-image11">3</span>%<br>'
        } else {
            result += '- 神獣型キャラクターに追加で<span class="color-image11">' + Math.round(19 + slv * 1.5) + '</span>％のダメージを与える。<br>';
            if (slv >= 40) {
                result += '- ダメージ +<span class="color-image11">30</span>%<br>'
            } else if (slv >= 30) {
                result += '- ダメージ +<span class="color-image11">20</span>%<br>'
            } else if (slv >= 20) {
                result += '- ダメージ +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 8) {
        if (slv >= 50) {
            result += '- アイテムドロップ率<span class="color-image11">' + 35 + '</span>％<br>';
            result += '- ユニークアイテムドロップ確率 +<span class="color-image11">40</span>%<br>'
            result += '- 着用時、モンスター討伐経験値 <span class="color-image11">30</span>％ 追加獲得<br>'
        } else {
            result += '- アイテムドロップ率<span class="color-image11">' + Math.round(10 + slv * 0.5) + '</span>％<br>';
            if (slv >= 40) {
                result += '- ユニークアイテムドロップ確率 +<span class="color-image11">30</span>%<br>'
                result += '- 着用時、モンスター討伐経験値 <span class="color-image11">20</span>％ 追加獲得<br>'
            } else if (slv >= 30) {
                result += '- ユニークアイテムドロップ確率 +<span class="color-image11">20</span>%<br>'
                result += '- 着用時、モンスター討伐経験値 <span class="color-image11">10</span>％ 追加獲得<br>'
            } else if (slv >= 20) {
                result += '- ユニークアイテムドロップ確率 +<span class="color-image11">10</span>%<br>'
            }
        }
    }
    if (cid === 9) {
        // こういうデータがあるからDB作って管理しても個別に全部対応する必要が…。
        if (slv < 50) {
            result += '- 着用時、モンスター討伐経験値 <span class="color-image11">' + (9 + slv * 1) + '</span>％追加獲得<br>';
        }
        if (slv >= 50) {
            result += '- 着用時、モンスター討伐経験値 <span class="color-image11">' + (60) + '</span>％追加獲得<br>';
            result += '- ユニークアイテムドロップ確率 +<span class="color-image11">40</span>%<br>'
            result += '- アイテムドロップ率 <span class="color-image11">30</span>％ <br>'
        } else if (slv >= 40) {
            result += '- ユニークアイテムドロップ確率 +<span class="color-image11">30</span>%<br>'
            result += '- アイテムドロップ率 <span class="color-image11">20</span>％ <br>'
        } else if (slv >= 30) {
            result += '- ユニークアイテムドロップ確率 +<span class="color-image11">20</span>%<br>'
            result += '- アイテムドロップ率 <span class="color-image11">10</span>％ <br>'
        } else if (slv >= 20) {
            result += '- ユニークアイテムドロップ確率 +<span class="color-image11">10</span>%<br>'
        }
    }
    if (cid === 10) {
        if (slv < 50) {
            result += '- 移動速度 +<span class="color-image11">' + (slv * 2) + '</span>％<br>';

        }
        if (slv >= 50) {
            result += '- 移動速度 +<span class="color-image11">' + 100 % + '</span>％<br>';
            result += '- 力 +<span class="color-image11">100</span><br>'
            result += '- 回避率 +<span class="color-image11">５</span>％<br>'
        } else if (slv >= 40) {
            result += '- 力 +<span class="color-image11">70</span><br>'
        } else if (slv >= 30) {
            result += '- 力 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 力 +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 11) {
        if (slv < 50) {
            result += '- 攻撃速度 +<span class="color-image11">' + (11 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 攻撃速度 +<span class="color-image11">' + 70 + '</span>％<br>';
            result += '- 敏捷 +<span class="color-image11">100</span><br>'
            result += '- 運 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 敏捷 +<span class="color-image11">70</span><br>'
            result += '- 運 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 敏捷 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
        }
    }
    if (cid === 12) {
        if (slv < 50) {
            result += '- 命中率 +<span class="color-image11">' + Math.round(slv * 0.5) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 命中率 +<span class="color-image11">' + 30 + '</span>％<br>';
            result += '- 敏捷 +<span class="color-image11">100</span><br>'
            result += '- 運 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 敏捷 +<span class="color-image11">70</span><br>'
            result += '- 運 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 敏捷 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 敏捷 +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 13) {
        // Lv12で3%だった
        // Lv24で5%と敏捷+30
        if (slv < 50) {
            result += '- 回避率 +<span class="color-image11">' + Math.round(0.2 + slv * 0.2) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 敏捷 +<span class="color-image11">100</span><br>'
            result += '- 運 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 敏捷 +<span class="color-image11">70</span><br>'
            result += '- 運 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 敏捷 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 敏捷 +<span class="color-image11">30</span><br>'
        }
    }
    // 意外と20作れなかった
    if (cid === 14) {
        if (slv < 50) {
            result += '- 火抵抗 +<span class="color-image11">' + (4 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 火抵抗 +<span class="color-image11">' + 55 + '</span>％<br>';
            result += '- 知恵 +<span class="color-image11">100</span><br>'
            result += '- 健康 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 知恵 +<span class="color-image11">70</span><br>'
            result += '- 健康 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 知恵 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 知恵 +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 15) {
        if (slv < 50) {
            result += '- 水抵抗 +<span class="color-image11">' + (4 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 水抵抗 +<span class="color-image11">' + 55 + '</span>％<br>';
            result += '- 知恵 +<span class="color-image11">100</span><br>'
            result += '- 健康 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 知恵 +<span class="color-image11">70</span><br>'
            result += '- 健康 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 知恵 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 知恵 +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 16) {
        if (slv < 50) {
            result += '- 風抵抗 +<span class="color-image11">' + (4 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 風抵抗 +<span class="color-image11">' + 55 + '</span>％<br>';
            result += '- 知恵 +<span class="color-image11">100</span><br>'
            result += '- 健康 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 知恵 +<span class="color-image11">70</span><br>'
            result += '- 健康 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 知恵 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 知恵 +<span class="color-image11">30</span><br>'
        }

    }
    if (cid === 17) {
        if (slv < 50) {
            result += '- 大地抵抗 +<span class="color-image11">' + (4 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 大地抵抗 +<span class="color-image11">' + 55 + '</span>％<br>';
            result += '- 知恵 +<span class="color-image11">100</span><br>'
            result += '- 健康 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 知恵 +<span class="color-image11">70</span><br>'
            result += '- 健康 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 知恵 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 知恵 +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 18) {
        if (slv < 50) {
            result += '- 光抵抗 +<span class="color-image11">' + (4 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 光抵抗 +<span class="color-image11">' + 55 + '</span>％<br>';
            result += '- 知恵 +<span class="color-image11">100</span><br>'
            result += '- 健康 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 知恵 +<span class="color-image11">70</span><br>'
            result += '- 健康 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 知恵 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 知恵 +<span class="color-image11">30</span><br>'
        }

    }
    if (cid === 19) {
        if (slv < 50) {
            result += '- 闇抵抗 +<span class="color-image11">' + (4 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 闇抵抗 +<span class="color-image11">' + 55 + '</span>％<br>';
            result += '- 知恵 +<span class="color-image11">100</span><br>'
            result += '- 健康 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- 知恵 +<span class="color-image11">70</span><br>'
            result += '- 健康 +<span class="color-image11">50</span><br>'
        } else if (slv >= 30) {
            result += '- 知恵 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- 知恵 +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 21) {
        if (slv >= 50) {
            result += '- 火属性攻撃力を<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの火抵抗を<span class="color-image11">' + 10 + '</span>％弱化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (5) + '</span>％<br>';
        } else {
            result += '- 火属性攻撃力を<span class="color-image11">' + (2 + slv * 1) + '</span>％強化させる。<br>';
            if (slv >= 40) {
                result += '- ターゲットの火抵抗を<span class="color-image11">' + (7) + '</span>％弱化させる。<br>';
                result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
            } else if (slv >= 30) {
                result += '- ターゲットの火抵抗を<span class="color-image11">' + (6) + '</span>％弱化させる。<br>';
            } else if (slv >= 20) {
                result += '- ターゲットの火抵抗を<span class="color-image11">' + (5) + '</span>％弱化させる。<br>';
            }
        }
    }
    if (cid === 22) {
        // Lv8で7%だった
        if (slv < 50) {
            result += '- ターゲットの火抵抗を<span class="color-image11">' + Math.round(2.6 + 0.6 * slv) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの火抵抗を<span class="color-image11">' + 35 + '</span>％弱化させる。<br>';
            result += '- 火属性攻撃力を<span class="color-image11">' + (20) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">5</span>％<br>';
        } else if (slv >= 40) {
            result += '- 火属性攻撃力を<span class="color-image11">' + (15) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 火属性攻撃力を<span class="color-image11">' + (10) + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 火属性攻撃力を<span class="color-image11">' + (5) + '</span>％強化させる。<br>';
        }
    }
    if (cid === 23) {
        if (slv >= 50) {
            result += '- 水属性攻撃力を<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの水抵抗を<span class="color-image11">' + 10 + '</span>％弱化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (5) + '</span>％<br>';
        } else {
            result += '- 水属性攻撃力を<span class="color-image11">' + (2 + slv * 1) + '</span>％強化させる。<br>';
            if (slv >= 40) {
                result += '- ターゲットの水抵抗を<span class="color-image11">' + (7) + '</span>％弱化させる。<br>';
                result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
            } else if (slv >= 30) {
                result += '- ターゲットの水抵抗を<span class="color-image11">' + (6) + '</span>％弱化させる。<br>';
            } else if (slv >= 20) {
                result += '- ターゲットの水抵抗を<span class="color-image11">' + (5) + '</span>％弱化させる。<br>';
            }
        }
    }
    if (cid === 24) {
        if (slv < 50) {
            result += '- ターゲットの水抵抗を<span class="color-image11">' + Math.round(2.6 + 0.6 * slv) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの水抵抗を<span class="color-image11">' + 35 + '</span>％弱化させる。<br>';
            result += '- 水属性攻撃力を<span class="color-image11">' + (20) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">5</span>％<br>';
        } else if (slv >= 40) {
            result += '- 水属性攻撃力を<span class="color-image11">' + (15) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 水属性攻撃力を<span class="color-image11">' + (10) + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 水属性攻撃力を<span class="color-image11">' + (5) + '</span>％強化させる。<br>';
        }
    }
    if (cid === 25) {
        if (slv >= 50) {
            result += '- 風属性攻撃力を<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの風抵抗を<span class="color-image11">' + 10 + '</span>％弱化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (5) + '</span>％<br>';
        } else {
            result += '- 風属性攻撃力を<span class="color-image11">' + (2 + slv * 1) + '</span>％強化させる。<br>';
            if (slv >= 40) {
                result += '- ターゲットの風抵抗を<span class="color-image11">' + (7) + '</span>％弱化させる。<br>';
                result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
            } else if (slv >= 30) {
                result += '- ターゲットの風抵抗を<span class="color-image11">' + (6) + '</span>％弱化させる。<br>';
            } else if (slv >= 20) {
                result += '- ターゲットの風抵抗を<span class="color-image11">' + (5) + '</span>％弱化させる。<br>';
            }
        }
    }
    if (cid === 26) {
        if (slv < 50) {
            result += '- ターゲットの風抵抗を<span class="color-image11">' + Math.round(2.6 + 0.6 * slv) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの風抵抗を<span class="color-image11">' + 35 + '</span>％弱化させる。<br>';
            result += '- 風属性攻撃力を<span class="color-image11">' + (20) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">5</span>％<br>';
        } else if (slv >= 40) {
            result += '- 風属性攻撃力を<span class="color-image11">' + (15) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 風属性攻撃力を<span class="color-image11">' + (10) + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 風属性攻撃力を<span class="color-image11">' + (5) + '</span>％強化させる。<br>';
        }
    }
    if (cid === 27) {
        if (slv >= 50) {
            result += '- 大地属性攻撃力を<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの大地抵抗を<span class="color-image11">' + 10 + '</span>％弱化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (5) + '</span>％<br>';
        } else {
            result += '- 大地属性攻撃力を<span class="color-image11">' + (2 + slv * 1) + '</span>％強化させる。<br>';
            if (slv >= 40) {
                result += '- ターゲットの大地抵抗を<span class="color-image11">' + (7) + '</span>％弱化させる。<br>';
                result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
            } else if (slv >= 30) {
                result += '- ターゲットの大地抵抗を<span class="color-image11">' + (6) + '</span>％弱化させる。<br>';
            } else if (slv >= 20) {
                result += '- ターゲットの大地抵抗を<span class="color-image11">' + (5) + '</span>％弱化させる。<br>';
            }
        }
    }
    if (cid === 28) {
        if (slv < 50) {
            result += '- ターゲットの大地抵抗を<span class="color-image11">' + Math.round(2.6 + 0.6 * slv) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの大地抵抗を<span class="color-image11">' + 35 + '</span>％弱化させる。<br>';
            result += '- 大地属性攻撃力を<span class="color-image11">' + (20) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">5</span>％<br>';
        } else if (slv >= 40) {
            result += '- 大地属性攻撃力を<span class="color-image11">' + (15) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 大地属性攻撃力を<span class="color-image11">' + (10) + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 大地属性攻撃力を<span class="color-image11">' + (5) + '</span>％強化させる。<br>';
        }
    }
    if (cid === 29) {
        if (slv >= 50) {
            result += '- 光属性攻撃力を<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの光抵抗を<span class="color-image11">' + 10 + '</span>％弱化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (5) + '</span>％<br>';
        } else {
            result += '- 光属性攻撃力を<span class="color-image11">' + (2 + slv * 1) + '</span>％強化させる。<br>';
            if (slv >= 40) {
                result += '- ターゲットの光抵抗を<span class="color-image11">' + (7) + '</span>％弱化させる。<br>';
                result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
            } else if (slv >= 30) {
                result += '- ターゲットの光抵抗を<span class="color-image11">' + (6) + '</span>％弱化させる。<br>';
            } else if (slv >= 20) {
                result += '- ターゲットの光抵抗を<span class="color-image11">' + (5) + '</span>％弱化させる。<br>';
            }
        }
    }
    if (cid === 30) {
        if (slv < 50) {
            result += '- ターゲットの光の抵抗を<span class="color-image11">' + Math.round(2.6 + 0.6 * slv) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの光の抵抗を<span class="color-image11">' + 35 + '</span>％弱化させる。<br>';
            result += '- 光属性攻撃力を<span class="color-image11">' + (20) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">5</span>％<br>';
        } else if (slv >= 40) {
            result += '- 光属性攻撃力を<span class="color-image11">' + (15) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 光属性攻撃力を<span class="color-image11">' + (10) + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 光属性攻撃力を<span class="color-image11">' + (5) + '</span>％強化させる。<br>';
        }
    }
    if (cid === 31) {
        if (slv >= 50) {
            result += '- 闇属性攻撃力を<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの闇抵抗を<span class="color-image11">' + 10 + '</span>％弱化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (5) + '</span>％<br>';
        } else {
            result += '- 闇属性攻撃力を<span class="color-image11">' + (2 + slv * 1) + '</span>％強化させる。<br>';
            if (slv >= 40) {
                result += '- ターゲットの闇抵抗を<span class="color-image11">' + (7) + '</span>％弱化させる。<br>';
                result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
            } else if (slv >= 30) {
                result += '- ターゲットの闇抵抗を<span class="color-image11">' + (6) + '</span>％弱化させる。<br>';
            } else if (slv >= 20) {
                result += '- ターゲットの闇抵抗を<span class="color-image11">' + (5) + '</span>％弱化させる。<br>';
            }
        }

    }
    if (cid === 32) {
        if (slv < 50) {
            result += '- ターゲットの闇の抵抗を<span class="color-image11">' + Math.round(2.6 + 0.6 * slv) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの闇の抵抗を<span class="color-image11">' + 35 + '</span>％弱化させる。<br>';
            result += '- 闇属性攻撃力を<span class="color-image11">' + (20) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">5</span>％<br>';
        } else if (slv >= 40) {
            result += '- 闇属性攻撃力を<span class="color-image11">' + (15) + '</span>％強化させる。<br>';
            result += '- 魔法致命打 <span class="color-image11">' + (3) + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 闇属性攻撃力を<span class="color-image11">' + (10) + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 闇属性攻撃力を<span class="color-image11">' + (5) + '</span>％強化させる。<br>';
        }
    }
    if (cid === 33) {
        if (slv < 50) {
            result += '- ペット&召喚獣の魔法攻撃力 +<span class="color-image11">' + parseInt(1 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣の魔法攻撃力 +<span class="color-image11">' + 50 + '</span>％<br>';
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (40) + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">200</span><br>';
        } else if (slv >= 40) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (30) + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">100</span><br>';
        } else if (slv >= 30) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (20) + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">50</span><br>';
        } else if (slv >= 20) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (10) + '</span>％<br>';
        }
    }
    if (cid === 34) {
        if (slv < 50) {
            result += '- ペット&召喚獣の攻撃力 +<span class="color-image11">' + parseInt(2 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣の攻撃力 +<span class="color-image11">' + 100 + '</span>％<br>';
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (40) + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">200</span><br>';
        } else if (slv >= 40) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (30) + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">100</span><br>';
        } else if (slv >= 30) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (20) + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">50</span><br>';
        } else if (slv >= 20) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (10) + '</span>％<br>';
        }
    }
    if (cid === 35) {
        if (slv < 50) {
            result += '- ペット&召喚獣の異常状態抵抗増加 +<span class="color-image11">' + parseInt(1 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣の異常状態抵抗増加 +<span class="color-image11">' + 50 + '</span>％<br>';
            result += '- ペット&召喚獣の最大体力 +<span class="color-image11">' + '15' + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">200</span><br>';
        } else if (slv >= 40) {
            result += '- ペット&召喚獣の最大体力 +<span class="color-image11">' + '11' + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">100</span><br>';
        } else if (slv >= 30) {
            result += '- ペット&召喚獣の最大体力 +<span class="color-image11">' + '8' + '</span>％<br>';
            result += '- ペット/召喚獣の全てのステータス +<span class="color-image11">50</span><br>';
        } else if (slv >= 20) {
            result += '- ペット&召喚獣の最大体力 +<span class="color-image11">' + '5' + '</span>％<br>';
        }
    }
    if (cid === 36) {
        if (slv < 50) {
            result += '- ペット&召喚獣のすべてのステータス +<span class="color-image11">' + parseInt(10 * slv) + '</span><br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣のすべてのステータス +<span class="color-image11">' + 500 + '</span><br>';
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (40) + '</span>％<br>';
            result += '- ペット/召喚獣の最大体力 +<span class="color-image11">20</span>％<br>';
        } else if (slv >= 40) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (30) + '</span>％<br>';
            result += '- ペット/召喚獣の最大体力 +<span class="color-image11">10</span>％<br>';
        } else if (slv >= 30) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (20) + '</span>％<br>';
            result += '- ペット/召喚獣の最大体力 +<span class="color-image11">5</span>％<br>';
        } else if (slv >= 20) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (10) + '</span>％<br>';
        }
    }
    if (cid === 37) {
        if (slv < 50) {
            result += '- ペット&召喚獣の最大体力 +<span class="color-image11">' + parseInt(1 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣の最大体力 +<span class="color-image11">' + parseInt(1 * slv) + '</span>％<br>';
            result += '- ペット&召喚獣の攻撃力 +<span class="color-image11">' + '50' + '</span>％<br>';
            result += '- ペット&召喚獣の異常状態抵抗増加 +<span class="color-image11">' + 20 + '</span>％<br>';
        } else if (slv >= 40) {
            result += '- ペット&召喚獣の攻撃力 +<span class="color-image11">' + '40' + '</span>％<br>';
            result += '- ペット&召喚獣の異常状態抵抗増加 +<span class="color-image11">' + 10 + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- ペット&召喚獣の攻撃力 +<span class="color-image11">' + '30' + '</span>％<br>';
            result += '- ペット&召喚獣の異常状態抵抗増加 +<span class="color-image11">' + 5 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- ペット&召喚獣の攻撃力 +<span class="color-image11">' + (20) + '</span>％<br>';
        }
    }
    //合成専門で、青
    if (cid === 38) {
        if (slv < 50) {
            result += '- ペット&召喚獣の魔法致命打増加 +<span class="color-image11">' + "？" + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣の魔法致命打増加 +<span class="color-image11">' + "？" + '</span>％<br>';
            result += '- ターゲットの魔法抵抗弱化 +<span class="color-image11">' + (10) + '</span>％<br>';
            result += '- スキルレベル +<span class="color-image11">3</span><br>'
        } else if (slv >= 40) {
            result += '- ターゲットの魔法抵抗弱化 +<span class="color-image11">' + (7) + '</span>％<br>';
            result += '- スキルレベル +<span class="color-image11">2</span><br>'
        } else if (slv >= 30) {
            result += '- ターゲットの魔法抵抗弱化 +<span class="color-image11">' + (6) + '</span>％<br>';
            result += '- スキルレベル +<span class="color-image11">1</span><br>'
        } else if (slv >= 20) {
            result += '- ターゲットの魔法抵抗弱化 +<span class="color-image11">' + (5) + '</span>％<br>';
        }
    }
    //合成専門
    if (cid === 39) {
        if (slv < 50) {
            result += '- ペット&召喚獣の魔法致命打増加 +<span class="color-image11">' + "？" + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ペット&召喚獣の魔法致命打増加 +<span class="color-image11">' + "？" + '</span>％<br>';
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (40) + '</span>％<br>';
            result += '- スキルレベル +<span class="color-image11">3</span><br>'
        } else if (slv >= 40) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (30) + '</span>％<br>';
            result += '- スキルレベル +<span class="color-image11">2</span><br>'
        } else if (slv >= 30) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (20) + '</span>％<br>';
            result += '- スキルレベル +<span class="color-image11">1</span><br>'
        } else if (slv >= 20) {
            result += '- ペット&召喚獣の攻撃速度 +<span class="color-image11">' + (10) + '</span>％<br>';
        }
    }
    // ペット系は全部青だった

    if (cid === 40) {
        if (slv < 50) {
            result += '- 最大HP +<span class="color-image11">' + (slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 最大HP +<span class="color-image11">' + 50 + '</span>％<br>';
            result += '- 防御力 +<span class="color-image11">20</span>％<br>'
            result += '- 健康 +<span class="color-image11">100</span><br>'
        } else if (slv >= 40) {
            result += '- 防御力 +<span class="color-image11">15</span>％<br>'
            result += '- 健康 +<span class="color-image11">80</span><br>'
        } else if (slv >= 30) {
            result += '- 防御力 +<span class="color-image11">10</span>％<br>'
            result += '- 健康 +<span class="color-image11">60</span><br>'
        } else if (slv >= 20) {
            result += '- 防御力 +<span class="color-image11">5</span>％<br>'
        }
    }
    if (cid === 41) {
        if (slv < 50) {
            result += '- 最大CP +<span class="color-image11">' + (slv * 50) + '</span><br>';
        }
        if (slv >= 50) {
            result += '- 最大CP +<span class="color-image11">' + 3000 + '</span><br>';
            result += '- カリスマ +<span class="color-image11">100</span><br>'
            result += '- 最大CP +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 40) {
            result += '- カリスマ +<span class="color-image11">70</span><br>'
            result += '- 最大CP +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 30) {
            result += '- カリスマ +<span class="color-image11">50</span><br>'
            result += '- 最大CP +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 20) {
            result += '- カリスマ +<span class="color-image11">30</span><br>'
        }
    }
    if (cid === 42) {
        if (slv < 50) {
            result += '- 攻撃力 +<span class="color-image11">' + (6 + slv * 4) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 攻撃力 +<span class="color-image11">' + 210 + '</span>％<br>';
            result += '- クリティカル +<span class="color-image11">20</span>％<br>'
            result += '- 攻撃速度 +<span class="color-image11">30</span>％<br>'
        } else if (slv >= 40) {
            result += '- クリティカル +<span class="color-image11">11</span>％<br>'
            result += '- 攻撃速度 +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 30) {
            result += '- クリティカル +<span class="color-image11">8</span>％<br>'
            result += '- 攻撃速度 +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 20) {
            result += '- クリティカル +<span class="color-image11">5</span>％<br>'
        }
    }
    if (cid === 43) {
        if (slv < 50) {
            result += '- 防御力 +<span class="color-image11">' + (slv * 2) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 防御力 +<span class="color-image11">' + 100 + '</span>％<br>';
            result += '- 最大HP +<span class="color-image11">20</span>％<br>'
            result += '- 健康 +<span class="color-image11">100</span><br>'
        } else if (slv >= 40) {
            result += '- 最大HP +<span class="color-image11">15</span>％<br>'
            result += '- 健康 +<span class="color-image11">80</span><br>'
        } else if (slv >= 30) {
            result += '- 最大HP +<span class="color-image11">10</span>％<br>'
            result += '- 健康 +<span class="color-image11">60</span><br>'
        } else if (slv >= 20) {
            result += '- 最大HP +<span class="color-image11">5</span>％<br>'
        }
    }
    if (cid === 50) {
        // LV12で13%だった Lv8で10%だった
        if (slv >= 50) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">' + 50 + '</span>％<br>';
            result += '- クリティカル +<span class="color-image11">20</span>％<br>'
            result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">10</span>％<br>'
        } else {
            result += '- クリティカルダメージ増加 +<span class="color-image11">' + Math.round(4 + slv * 0.8) + '</span>％<br>';
            if (slv >= 40) {
                result += '- クリティカル +<span class="color-image11">15</span>％<br>'
                result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">7</span>％<br>'
            } else if (slv >= 30) {
                result += '- クリティカル +<span class="color-image11">10</span>％<br>'
                result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">5</span>％<br>'
            } else if (slv >= 20) {
                result += '- クリティカル +<span class="color-image11">5</span>％<br>'
            }
        }
    }
    if (cid === 51) {
        if (slv < 50) {
            result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">' + Math.round(9 + slv * 0.8) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">' + 20 + '</span>％<br>';
            result += '- クリティカル +<span class="color-image11">30</span>％<br>'
            result += '- 敵致命打減少 +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 40) {
            result += '- クリティカル +<span class="color-image11">20</span>％<br>'
            result += '- 不明<br>'
        } else if (slv >= 30) {
            result += '- クリティカル +<span class="color-image11">15</span>％<br>'
            result += '- 不明<br>'
        } else if (slv >= 20) {
            result += '- クリティカル +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 52) {
        if (slv < 50) {
            result += '- クリティカル確率 +<span class="color-image11">' + Math.round(1 + slv * 0.5) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- クリティカル確率 +<span class="color-image11">' + 30 + '</span>％<br>';
            result += '- 物理攻撃力 +<span class="color-image11">25</span>％<br>'
            result += '- クリティカルダメージ増加 +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 40) {
            result += '- 物理攻撃力 +<span class="color-image11">20</span>％<br>'
            result += '- クリティカルダメージ増加 +<span class="color-image11">7</span>％<br>'
        } else if (slv >= 30) {
            result += '- 物理攻撃力 +<span class="color-image11">15</span>％<br>'
            result += '- クリティカルダメージ増加 +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 20) {
            result += '- 物理攻撃力 +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 53) {
        if (slv < 50) {
            result += '- クリティカルダメージ減少 +<span class="color-image11">' + Math.round(10 + slv * 0.5) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- クリティカルダメージ減少 +<span class="color-image11">' + 40 + '</span>％<br>';
            result += '- 最大HP +<span class="color-image11">40</span>％<br>'
            result += '- ダブルクリティカルダメージ減少 +<span class="color-image11">15</span>％<br>'
        } else if (slv >= 40) {
            result += '- 最大HP +<span class="color-image11">30</span>％<br>'
            result += '- ダブルクリティカルダメージ減少 +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 30) {
            result += '- 最大HP +<span class="color-image11">20</span>％<br>'
            result += '- ダブルクリティカルダメージ減少 +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 20) {
            result += '- 最大HP +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 76) {
        if (slv < 50) {
            result += '- 敵の致命打抵抗減少 +<span class="color-image11">' + Math.round(4.5 + slv * 0.5) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 敵の致命打抵抗減少 +<span class="color-image11">' + 30 + '</span>％<br>';
            result += '- クリティカルダメージ増加 +<span class="color-image11">30</span>％<br>'
            result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 40) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">20</span>％<br>'
            result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 30) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">15</span>％<br>'
            // 7%かもしれない
            result += '- ダブルクリティカルダメージ増加 +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 20) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 77) {
        if (slv < 50) {
            result += '- 抵抗値低下防止 +<span class="color-image11">' + Math.round(slv * 0.2) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 抵抗値低下防止 +<span class="color-image11">' + 15 + '</span>％<br>';
            // 5%かもしれない。違ったらごめん
            result += '- 能力値低下防止 +<span class="color-image11">10</span>％<br>'
            result += '- すべての能力値 +<span class="color-image11">80</span>上昇<br>'
        } else if (slv >= 40) {
            result += '- 能力値低下防止 +<span class="color-image11">3</span>％<br>'
            result += '- すべての能力値 +<span class="color-image11">40</span>上昇<br>'
        } else if (slv >= 30) {
            result += '- 能力値低下防止 +<span class="color-image11">2</span>％<br>'
            result += '- すべての能力値 +<span class="color-image11">20</span>上昇<br>'
        } else if (slv >= 20) {
            result += '- 能力値低下防止 +<span class="color-image11">1</span>％<br>'
        }
    }
    if (cid === 78) {
        if (slv < 50) {
            result += '- 能力値低下防止 +<span class="color-image11">' + Math.round(slv * 0.2) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 能力値低下防止 +<span class="color-image11">' + 10 + '</span>％<br>';
            result += '- 抵抗値低下防止 +<span class="color-image11">5</span>％<br>'
            result += '- すべての能力値 +<span class="color-image11">80</span>上昇<br>'
        } else if (slv >= 40) {
            result += '- 抵抗値低下防止 +<span class="color-image11">3</span>％<br>'
            result += '- すべての能力値 +<span class="color-image11">40</span>上昇<br>'
        } else if (slv >= 30) {
            result += '- 抵抗値低下防止 +<span class="color-image11">2</span>％<br>'
            result += '- すべての能力値 +<span class="color-image11">20</span>上昇<br>'
        } else if (slv >= 20) {
            result += '- 抵抗値低下防止 +<span class="color-image11">1</span>％<br>'
        }
    }
    if (cid === 79) {
        if (slv < 50) {
            result += '- 人間型キャラクターに追加で +<span class="color-image11">' + parseInt(5 + slv * 1) + '</span>％の魔法ダメージを与える。<br>';
        }
        if (slv >= 50) {
            result += '- 人間型キャラクターに追加で +<span class="color-image11">' + 55 + '</span>％の魔法ダメージを与える。<br>';
            result += '- 魔法強化 +<span class="color-image11">30</span>％<br>'
            result += '- 最終ダメージ +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 40) {
            result += '- 魔法強化 +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 30) {
            result += '- 魔法強化 +<span class="color-image11">15</span>％<br>'
        } else if (slv >= 20) {
            result += '- 魔法強化 +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 80) {
        if (slv < 50) {
            result += '- 魔法強打 +<span class="color-image11">' + Math.round(4.8 + slv * 0.2) + '</span>％増加<br>';
        }
        if (slv >= 50) {
            result += '- 魔法強打 +<span class="color-image11">' + 16 + '</span>％増加<br>';
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">3</span><br>'
            result += '- 最終ダメージ +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 40) {
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">4</span><br>'
        } else if (slv >= 30) {
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">5</span><br>'
        } else if (slv >= 20) {
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">6</span><br>'
        }
    }
    if (cid === 81) {
        if (slv < 50) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + parseInt(2 + slv * 1) + '</span>％強化させる。<br>';
        }
        if (slv >= 50) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 55 + '</span>％強化させる。<br>';
            result += '- ターゲットの魔法抵抗を <span class="color-image11">20</span>％弱化させる。<br>'
            result += '- <span class="color-image11">' + 20 + '</span>％の確率で魔法ダメージの3％をHP吸収<br>';
        } else if (slv >= 40) {
            result += '- ターゲットの魔法抵抗を <span class="color-image11">15</span>％弱化させる。<br>'
            result += '- <span class="color-image11">' + 10 + '</span>％の確率で魔法ダメージの3％をHP吸収<br>';
        } else if (slv >= 30) {
            result += '- ターゲットの魔法抵抗を <span class="color-image11">10</span>％弱化させる。<br>'
        } else if (slv >= 20) {
            result += '- ターゲットの魔法抵抗を <span class="color-image11">5</span>％弱化させる。<br>'
        }
    }
    if (cid === 82) {
        if (slv < 50) {
            result += '- ターゲットの魔法抵抗を <span class="color-image11">' + Math.round(slv * 0.5) + '</span>％弱化させる。<br>';
        }
        if (slv >= 50) {
            result += '- ターゲットの魔法抵抗を <span class="color-image11">' + 30+ '</span>％弱化させる。<br>';
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 30 + '</span>％強化させる。<br>';
            result += '- <span class="color-image11">' + 20 + '</span>％の確率で魔法ダメージの3％をHP吸収<br>';
        } else if (slv >= 40) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 20 + '</span>％強化させる。<br>';
            result += '- <span class="color-image11">' + 10 + '</span>％の確率で魔法ダメージの3％をHP吸収<br>';
        } else if (slv >= 30) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 15 + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 10 + '</span>％強化させる。<br>';
        }
    }
    if (cid === 83) {
        if (slv < 50) {
            result += '- 魔法致命打 <span class="color-image11">' + Math.round(5 + slv * 0.4) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 魔法致命打 <span class="color-image11">' + 25 + '</span>％<br>';
            result += '- 魔法攻撃力を +<span class="color-image11">40</span>％強化させる。<br>'
            result += '- 魔法強打 <span class="color-image11">' + 5 + '</span>％<br>';
        } else if (slv >= 40) {
            result += '- 魔法攻撃力を +<span class="color-image11">30</span>％強化させる。<br>'
        } else if (slv >= 30) {
            result += '- 魔法攻撃力を +<span class="color-image11">20</span>％強化させる。<br>'
        } else if (slv >= 20) {
            result += '- 魔法攻撃力を +<span class="color-image11">10</span>％強化させる。<br>'
        }
    }
    if (cid === 84) {
        if (slv < 50) {
            result += '- 強打率 <span class="color-image11">' + Math.round(5 + slv * 0.3) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 強打率 <span class="color-image11">' + 20 + '</span>％<br>';
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">3</span><br>'
            result += '- 最終ダメージ +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 40) {
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">4</span><br>'
        } else if (slv >= 30) {
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">5</span><br>'
        } else if (slv >= 20) {
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">6</span><br>'
        }
    }
    if (cid === 101) {
        if (slv < 50) {
            result += '- ダメージをCPに変換 <span class="color-image11">' + Math.round(1 + slv * 0.5) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ダメージをCPに変換 <span class="color-image11">' + 30 + '</span>％<br>';
            result += '- 最大CP +<span class="color-image11">30</span>％<br>'
            result += '- CP獲得ボーナス +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 40) {
            result += '- 最大CP +<span class="color-image11">25</span>％<br>'
            result += '- CP獲得ボーナス +<span class="color-image11">3</span>％<br>'
        } else if (slv >= 30) {
            result += '- 最大CP +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 20) {
            result += '- 最大CP +<span class="color-image11">15</span>％<br>'
        }
    }
    if (cid === 102) {
        if (slv < 50) {
            result += '- ダメージ反射 <span class="color-image11">' + parseInt(slv * 2) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- ダメージ反射 <span class="color-image11">' + 100 + '</span>％<br>';
            result += '- 健康 +<span class="color-image11">80</span><br>'
            result += '- 最大HP +<span class="color-image11">30</span>％<br>'
        } else if (slv >= 40) {
            result += '- 健康 +<span class="color-image11">60</span><br>'
            result += '- 最大HP +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 30) {
            result += '- 健康 +<span class="color-image11">40</span><br>'
            result += '- 最大HP +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 20) {
            result += '- 健康 +<span class="color-image11">20</span><br>'
        }
    }
    if (cid === 103) {
        // 謎の一般スキル。バグってOPが正常に適用されてないかもしれない。
        if (slv < 50) {
            // result += '- 魔法属性ダメージ吸収 <span class="color-image11">' + Math.round(2 + slv * 0.2) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 魔法属性ダメージ吸収 <span class="color-image11">' + 12+ '</span>％<br>';
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 10 + '</span>％強化させる。<br>';
        } else if (slv >= 40) {
            result += '- 魔法属性ダメージ吸収 <span class="color-image11">' + 10 + '</span>％<br>';
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 5 + '</span>％強化させる。<br>';
        } else if (slv >= 30) {
            result += '- 魔法属性ダメージ吸収 <span class="color-image11">' + 8 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- 魔法属性ダメージ吸収 <span class="color-image11">' + 6 + '</span>％<br>';
        }
    }
    if (cid === 104) {
        if (slv < 50) {
            result += '- 物理攻撃力増加 <span class="color-image11">' + parseInt(40 + slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 物理攻撃力増加 <span class="color-image11">' + 100 + '</span>％<br>';
            result += '- 敵に与えたダメージの <span class="color-image11">' + (5) + '</span>％をHP吸収<br>';
            result += '- クリティカルダメージ +<span class="color-image11">30</span>％増加<br>'
        } else if (slv >= 40) {
            result += '- 敵に与えたダメージの <span class="color-image11">' + (4) + '</span>％をHP吸収<br>';
            result += '- クリティカルダメージ +<span class="color-image11">20</span>％増加<br>'
        } else if (slv >= 30) {
            result += '- 敵に与えたダメージの <span class="color-image11">' + (3) + '</span>％をHP吸収<br>';
            result += '- クリティカルダメージ +<span class="color-image11">10</span>％増加<br>'
        } else if (slv >= 20) {
            result += '- 敵に与えたダメージの <span class="color-image11">' + (2) + '</span>％をHP吸収<br>';
        }
    }
    if (cid === 105) {
        if (slv < 50) {
            result += '- <span class="color-image11">' + parseInt(slv * 1) + '</span>％の確率で魔法ダメージの2％をHP吸収<br>';
        }
        if (slv >= 50) {
            result += '- <span class="color-image11">' + 50 + '</span>％の確率で魔法ダメージの5％をHP吸収<br>';
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 30 + '</span>％強化させる。<br>';
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">2</span><br>'
        } else if (slv >= 40) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 20 + '</span>％強化させる。<br>';
        } else if (slv >= 30) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 15 + '</span>％強化させる。<br>';
        } else if (slv >= 20) {
            result += '- 魔法の攻撃力を +<span class="color-image11">' + 10 + '</span>％強化させる。<br>';
        }
    }
    if (cid === 106) {
        if (slv < 50) {
            result += '- CP獲得ボーナス <span class="color-image11">' + Math.round(5 + slv * 0.5) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- CP獲得ボーナス <span class="color-image11">' + 35 + '</span>％<br>';
            result += '- 最大HP +<span class="color-image11">50</span>％<br>'
            result += '- 最大CP +<span class="color-image11">40</span>％<br>'
        } else if (slv >= 40) {
            result += '- 最大HP +<span class="color-image11">30</span>％<br>'
            result += '- 最大CP +<span class="color-image11">20</span>％<br>'
        } else if (slv >= 30) {
            result += '- 最大HP +<span class="color-image11">20</span>％<br>'
            result += '- 最大CP +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 20) {
            result += '- 最大HP +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 107) {
        if (slv < 50) {
            // 多分何かの設定ミス。修正されるんじゃないかな。
            result += '- 魔法属性ダメージ <span class="color-image11">' + slv * 0.06 + '</span>％吸収<br>';
        }
        if (slv >= 50) {
            // 多分何かの設定ミス。修正されるんじゃないかな。
            result += '- CP獲得ボーナス <span class="color-image11">' + 3 + '</span>％<br>';
            result += '- 魔法強打 +<span class="color-image11">15</span>％<br>'
            result += '- 知識 <span class="color-image11">1</span>/ レベル<span class="color-image11">2</span><br>'
        } else if (slv >= 40) {
            result += '- 魔法強打 +<span class="color-image11">10</span>％<br>'
        } else if (slv >= 30) {
            result += '- 魔法強打 +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 20) {
        }
    }
    if (cid === 199) {
        // これもわからん
        if (slv < 50) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + parseInt(slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + 55 + '</span>％<br>';
            result += '- ノックバック抵抗 +<span class="color-image11">30</span>％<br>'
            result += '- 運 +<span class="color-image11">150</span><br>'
        } else if (slv >= 40) {
            result += '- ノックバック抵抗 +<span class="color-image11">20</span>％<br>'
            result += '- 運 +<span class="color-image11">100</span><br>'
        } else if (slv >= 30) {
            result += '- ノックバック抵抗 +<span class="color-image11">15</span>％<br>'
            result += '- 運 +<span class="color-image11">50</span><br>'
        } else if (slv >= 20) {
            result += '- ノックバック抵抗 +<span class="color-image11">10</span>％<br>'
        }
    }
    if (cid === 200) {
        // これもわからん
        if (slv < 50) {
            result += '- 魔法抵抗 + <span class="color-image11">' + parseInt(slv * 1) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 魔法抵抗 + <span class="color-image11">' + parseInt(slv * 1) + '</span>％<br>';
            result += '- 状態異常抵抗 + <span class="color-image11">' + 40 + '</span>％<br>';
            result += '- 抵抗低下防止 + <span class="color-image11">' + 5 + '</span>％<br>';
        } else if (slv >= 40) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + 30 + '</span>％<br>';
            result += '- 抵抗低下防止 + <span class="color-image11">' + 3 + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + 20 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + 10 + '</span>％<br>';
        }
    }
    if (cid === 201) {
        // これもわからん(LV3で23%)　Lv20で49%
        if (slv >= 50) {
            result += '- vs人間型ダメージ抵抗 <span class="color-image11">' + 100 + '</span>％<br>';
            result += '- 防御力 +<span class="color-image11">100</span>％<br>'
            result += '- 最終ダメージ +<span class="color-image11">5</span>％<br>'
        } else {
            result += '- vs人間型ダメージ抵抗 <span class="color-image11">' + Math.round(19 + slv * 1.5) + '</span>％<br>';
            if (slv >= 40) {
                result += '- 防御力 +<span class="color-image11">80</span>％<br>'
            } else if (slv >= 30) {
                result += '- 防御力 +<span class="color-image11">60</span>％<br>'
            } else if (slv >= 20) {
                result += '- 防御力 +<span class="color-image11">40</span>％<br>'
            }
        }
    }

    // 合成・覚醒専門
    if (cid === 210) {
        // LV17で68、LV43で146
        if (slv < 50) {
            result += '- すべての能力値 + <span class="color-image11">' + Math.round(17 + 3 * slv) + '</span><br>';
        }
        if (slv >= 50) {
            result += '- すべての能力値 + <span class="color-image11">' + 200 + '</span><br>';
            result += '- アイテム着用レベル ー<span class="color-image11">80</span><br>'
            result += '- 能力値低下防止 <span class="color-image11">5</span>％増加<br>'
        } else if (slv >= 40) {
            result += '- アイテム着用レベル ー<span class="color-image11">60</span><br>'
            result += '- 能力値低下防止 <span class="color-image11">3</span>％増加<br>'
        } else if (slv >= 30) {
            result += '- アイテム着用レベル ー<span class="color-image11">40</span><br>'
        } else if (slv >= 20) {
            result += '- アイテム着用レベル ー<span class="color-image11">20</span><br>'
        }
    }

    if (cid === 299) {
        if (slv < 50) {
            result += '- スキルレベル + <span class="color-image11">' + Math.round(0.1 * slv) + '</span><br>';
        }
        if (slv >= 50) {
            result += '- スキルレベル + <span class="color-image11">' + 5 + '</span><br>';
            result += '- 全ての能力値 +<span class="color-image11">80</span><br>'
            result += '- スキルレベル + <span class="color-image11">' + 2 + '</span><br>';
        } else if (slv >= 40) {
            result += '- 全ての能力値 +<span class="color-image11">60</span><br>'
        } else if (slv >= 30) {
            result += '- 全ての能力値 +<span class="color-image11">40</span><br>'
        } else if (slv >= 20) {
            result += '- 全ての能力値 +<span class="color-image11">20</span><br>'
        }
    }

    //ここから上級
    if (cid === 300) {
        if (slv < 50) {
            result += '- スキルレベル + <span class="color-image11">' + Math.round(2 + 0.15 * slv) + '</span><br>';
        }
        if (slv >= 50) {
            result += '- スキルレベル + <span class="color-image11">' + 10 + '</span><br>';
            result += '- 全ての能力値 +<span class="color-image11">250</span><br>'
            result += '- スキルレベル + <span class="color-image11">' + 5 + '</span><br>';
        } else if (slv >= 40) {
            result += '- 全ての能力値 +<span class="color-image11">200</span><br>'
        } else if (slv >= 30) {
            result += '- 全ての能力値 +<span class="color-image11">150</span><br>'
        } else if (slv >= 20) {
            result += '- 全ての能力値 +<span class="color-image11">100</span><br>'
        }
    }
    if (cid === 301) {
        if (slv < 50) {
            result += '- 攻撃力 + <span class="color-image11">' + parseInt(94 + 6 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 攻撃力 + <span class="color-image11">' + 400 + '</span>％<br>';
            result += '- クリティカルダメージ増加 +<span class="color-image11">60</span>％<br>'
            result += '- 強打 +<span class="color-image11">8</span>％<br>'
        } else if (slv >= 40) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">40</span>％<br>'
            result += '- 強打 +<span class="color-image11">5</span>％<br>'
        } else if (slv >= 30) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">30</span>％<br>'
            result += '- 強打 +<span class="color-image11">3</span>％<br>'
        } else if (slv >= 20) {
            result += '- クリティカルダメージ増加 +<span class="color-image11">20</span>％<br>'
        }
    }
    if (cid === 302) {
        if (slv < 50) {
            result += '- 防御力 + <span class="color-image11">' + parseInt(50 + 4 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 防御力 + <span class="color-image11">' + 250 + '</span>％<br>';
            result += '- 最大HP +<span class="color-image11">60</span>％<br>'
            result += '- 健康 <span class="color-image11">1</span>/ レベル<span class="color-image11">2</span><br>'
        } else if (slv >= 40) {
            result += '- 最大HP +<span class="color-image11">40</span>％<br>'
        } else if (slv >= 30) {
            result += '- 最大HP +<span class="color-image11">30</span>％<br>'
        } else if (slv >= 20) {
            result += '- 最大HP +<span class="color-image11">20</span>％<br>'
        }
    }
    if (cid === 303) {
        if (slv < 50) {
            result += '- 最大HP + <span class="color-image11">' + parseInt(50 + 2 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 最大HP + <span class="color-image11">' + 150 + '</span>％<br>';
            result += '- 防御力 +<span class="color-image11">100</span>％<br>'
            result += '- 健康 <span class="color-image11">1</span>/ レベル<span class="color-image11">2</span><br>'
        } else if (slv >= 40) {
            result += '- 防御力 +<span class="color-image11">80</span>％<br>'
        } else if (slv >= 30) {
            result += '- 防御力 +<span class="color-image11">60</span>％<br>'
        } else if (slv >= 20) {
            result += '- 防御力 +<span class="color-image11">40</span>％<br>'
        }
    }
    if (cid === 304) {
        // LV18で66%
        if (slv < 50) {
            result += '- 最大CP + <span class="color-image11">' + parseInt(12 * slv * 3) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 最大CP + <span class="color-image11">' + 200 + '</span>％<br>';
            result += '- CP獲得ボーナス <span class="color-image11">' + 30 + '</span>％<br>';
            result += '- 威厳 <span class="color-image11">1</span>/ レベル<span class="color-image11">2</span><br>'
        } else if (slv >= 40) {
            result += '- CP獲得ボーナス <span class="color-image11">' + 20 + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- CP獲得ボーナス <span class="color-image11">' + 15 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- CP獲得ボーナス <span class="color-image11">' + 10 + '</span>％<br>';
        }
    }
    if (cid === 305) {
        if (slv < 50) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + parseInt(2 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 状態異常抵抗 + <span class="color-image11">' + 120 + '</span>％<br>';
            result += '- ノックバック抵抗 +<span class="color-image11">60</span>％<br>'
            result += '- 全ての能力値 +<span class="color-image11">300</span><br>'
        } else if (slv >= 40) {
            result += '- ノックバック抵抗 +<span class="color-image11">40</span>％<br>'
            result += '- 全ての能力値 +<span class="color-image11">200</span><br>'
        } else if (slv >= 30) {
            result += '- ノックバック抵抗 +<span class="color-image11">30</span>％<br>'
            result += '- 全ての能力値 +<span class="color-image11">100</span><br>'
        } else if (slv >= 20) {
            result += '- ノックバック抵抗 +<span class="color-image11">20</span>％<br>'
        }
    }
    if (cid === 306) {
        if (slv < 50) {
            result += '- 攻撃速度 + <span class="color-image11">' + parseInt(50 + 3 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 攻撃速度 + <span class="color-image11">' + 200 + '</span>％<br>';
            result += '- クリティカルダメージ <span class="color-image11">40</span>％増加<br>'
            result += '- 運 <span class="color-image11">1</span>/ レベル<span class="color-image11">2</span><br>'
        } else if (slv >= 40) {
            result += '- クリティカルダメージ <span class="color-image11">30</span>％増加<br>'
        } else if (slv >= 30) {
            result += '- クリティカルダメージ <span class="color-image11">20</span>％増加<br>'
        } else if (slv >= 20) {
            result += '- クリティカルダメージ <span class="color-image11">10</span>％増加<br>'
        }
    }
    // 合成専用
    if (cid === 307) {
        // Lv15で2%
        if (slv < 50) {
            result += '- 最終ダメージ + <span class="color-image11">' + parseInt(0.5 + 0.1 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- 最終ダメージ + <span class="color-image11">' + 7 + '</span>％<br>';
            result += '- スキルレベル + <span class="color-image11">' + 10 + '</span><br>';
            result += '- 敵致命打減少 + <span class="color-image11">' + 8 + '</span>％<br>';
        } else if (slv >= 40) {
            result += '- スキルレベル + <span class="color-image11">' + 8 + '</span><br>';
            result += '- 敵致命打減少 + <span class="color-image11">' + 5 + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- スキルレベル + <span class="color-image11">' + 6 + '</span><br>';
            result += '- 敵致命打減少 + <span class="color-image11">' + 3 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- スキルレベル + <span class="color-image11">' + 4 + '</span><br>';
        }
    }
    // 合成専用
    if (cid === 308) {
        // Lv18で74%　Lv8で64%
        if (slv < 50) {
            result += '- 着用時、モンスター討伐経験値 + <span class="color-image11">' + parseInt(54 + 1 * slv) + '</span>％ 追加獲得<br>';
        }
        if (slv >= 50) {
            result += '- 着用時、モンスター討伐経験値 + <span class="color-image11">' + 120 + '</span>％ 追加獲得<br>';
            result += '- スキルレベル + <span class="color-image11">' + 6 + '</span><br>';
            result += '- 最終ダメージ + <span class="color-image11">' + 3 + '</span>％<br>';
        } else if (slv >= 40) {
            result += '- スキルレベル + <span class="color-image11">' + 4 + '</span><br>';
            result += '- 最終ダメージ + <span class="color-image11">' + 2 + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- スキルレベル + <span class="color-image11">' + 3 + '</span><br>';
            result += '- 最終ダメージ + <span class="color-image11">' + 1 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- スキルレベル + <span class="color-image11">' + 2 + '</span><br>';
        }
    }
    // 合成専用
    if (cid === 309) {
        if (slv < 50) {
            result += '- アイテムドロップ率 + <span class="color-image11">' + parseInt(50 + 1 * slv) + '</span>％<br>';
        }
        if (slv >= 50) {
            result += '- アイテムドロップ率 + <span class="color-image11">' + 100 + '</span>％<br>';
            result += '- ユニークドロップ率 + <span class="color-image11">' + 60 + '</span>％<br>';
            result += '- 最終ダメージ + <span class="color-image11">' + 3 + '</span>％<br>';
        } else if (slv >= 40) {
            result += '- ユニークドロップ率 + <span class="color-image11">' + 40 + '</span>％<br>';
            result += '- 最終ダメージ + <span class="color-image11">' + 2 + '</span>％<br>';
        } else if (slv >= 30) {
            result += '- ユニークドロップ率 + <span class="color-image11">' + 30 + '</span>％<br>';
            result += '- 最終ダメージ + <span class="color-image11">' + 1 + '</span>％<br>';
        } else if (slv >= 20) {
            result += '- ユニークドロップ率 + <span class="color-image11">' + 20 + '</span>％<br>';
        }
    }

    return result;
}
// TODO 補正値の合計とかやりたい

// upsertくん
function merge(skillset, sub) {
    var flag = true;
    var result = skillset.map(function (e) {
        if (e.skillName === sub.skillName) {
            e.skillLv += sub.skillLv;
            flag = false;
        }
        return e;
    });
    if (flag) {
        skillset.push(sub);
    }
    return result;
}