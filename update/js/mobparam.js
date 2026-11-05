mobSpec = {
    0: "アンデット型",
    1: "人間型",
    2: "悪魔型",
    3: "動物型",
    4: "神獣型",
    5: "位相型"
}

mobRank = {
    0: "一般1",
    1: "一般2",
    2: "一般3",
    3: "一般4",
    4: "セミボス1",
    5: "セミボス2",
    6: "セミボス3",
    7: "ボス1",
    8: "ボス2",
    9: "ボス3",
}

var monsterVisibilityRecords = {"1499":{"name":"逃亡魔法師Sp[テスト用]","Species":"1","Lineage":"3","EffectId":"267","EffectId_2":"0","unknown_69":"624"},"1866":{"name":"非アクションスキル","Species":"0","Lineage":"0","EffectId":"333","EffectId_2":"0","unknown_69":"958"},"2152":{"name":"HP倍数テスト用","Species":"0","Lineage":"9","EffectId":"389","EffectId_2":"0","unknown_69":"-1"}};

function isPublicMonster(id, data) {
    if (!data || !Object.prototype.hasOwnProperty.call(monsterVisibilityRecords, String(id))) {
        return true;
    }
    var expected = monsterVisibilityRecords[String(id)];
    return !Object.keys(expected).every(function (key) {
        return data[key] !== undefined && String(data[key]) === expected[key];
    });
}
