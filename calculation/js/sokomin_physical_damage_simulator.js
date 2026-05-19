/* =====================================================================
   物理ダメージシミュレーター
   namespace: SokominPDamage
   - 入力収集 → 各段階計算 → 中間結果 + 最終ダメージ
   - localStorage 保存 / URLクエリ共有 / プリセット読込 / JSONコピー
   - 計算式は暫定。仕様変更や検証中の項目あり。
   ===================================================================== */
(function (global) {
    'use strict';

    // ---- 定数 -------------------------------------------------------------

    var STORAGE_KEY = 'sokomin_pdamage_inputs_v1';
    var PRESET_URL  = 'data/physical_damage_presets.json';

    var FIELD_IDS = [
        'weaponAttackMin', 'weaponAttackMax', 'weaponAttackMode', 'weaponAttackCustom',
        'strength', 'skillDamagePercent', 'damageOpPercent',
        'skillCorrectionPercent', 'guildItemCorrectionPercent', 'nonWeaponAttack',
        'mobDefense', 'physicalDefenseReductionPercent', 'targetFinalDefenseIgnorePercent',
        'defenseMode', 'defenseCoefficient',
        'finalAttackPowerPercent', 'vsTypePhysicalDamagePercent', 'vsTypeCapPercent',
        'enemyFinalDamageReductionPercent', 'mobDamageCutPercent',
        'limitBreakLevel', 'physicalDamageCapBase',
        'limitBreakPhysicalEffectPercent',
        'physicalLimitDamageFlat', 'physicalLimitDamageFlatExtra',
        'diagramEffectPercent', 'diagramActivationRatePercent',
        'diagramExpectedValueMode', 'diagramAlwaysActivatedMode',
        'hitType',
        'doubleCriticalDamageIncreasePercent', 'physicalHeavyHitDamageIncreasePercent',
        'finalPhysicalDamagePercent', 'heavyHitOnlyPercent',
        'capSubtractValue', 'capSubtractStage'
    ];

    // 限界突破称号 Lv 別効果 (公式 koreaupdate20240627 #3 より)
    //   flat = ダメージ上限引き上げ量 / pct = 限界突破物理効果%
    var LIMIT_BREAK_PHYS_LEVELS = [
        { lv: 0, flat:     0, pct: 0 },
        { lv: 1, flat:  3000, pct: 1 },
        { lv: 2, flat:  6000, pct: 2 },
        { lv: 3, flat:  9000, pct: 3 },
        { lv: 4, flat: 12000, pct: 4 },
        { lv: 5, flat: 15000, pct: 5 }
    ];

    var DEFAULT_INPUTS = {
        weaponAttackMin: 0,
        weaponAttackMax: 0,
        weaponAttackMode: 'max',
        weaponAttackCustom: 0,
        strength: 0,
        skillDamagePercent: 0,
        damageOpPercent: 0,
        skillCorrectionPercent: 0,
        guildItemCorrectionPercent: 0,
        nonWeaponAttack: 0,
        mobDefense: 0,
        physicalDefenseReductionPercent: 0,
        targetFinalDefenseIgnorePercent: 0,
        defenseMode: 'subtract',
        defenseCoefficient: 1,
        finalAttackPowerPercent: 0,
        vsTypePhysicalDamagePercent: 0,
        vsTypeCapPercent: 300,
        enemyFinalDamageReductionPercent: 0,
        mobDamageCutPercent: 0,
        limitBreakLevel: 0,
        physicalDamageCapBase: 20000,
        limitBreakPhysicalEffectPercent: 0,
        physicalLimitDamageFlat: 0,
        physicalLimitDamageFlatExtra: 0,
        diagramEffectPercent: 0,
        diagramActivationRatePercent: 0,
        diagramExpectedValueMode: false,
        diagramAlwaysActivatedMode: false,
        hitType: 'normal',
        doubleCriticalDamageIncreasePercent: 150,
        physicalHeavyHitDamageIncreasePercent: 0,
        finalPhysicalDamagePercent: 0,
        heavyHitOnlyPercent: 0,
        capSubtractValue: 20000,
        capSubtractStage: 'none'
    };

    // ---- 補助関数 ---------------------------------------------------------

    function toNumber(v, fallback) {
        var n = parseFloat(v);
        if (isNaN(n) || !isFinite(n)) return (typeof fallback === 'number') ? fallback : 0;
        return n;
    }

    function clamp(v, min, max) {
        if (v < min) return min;
        if (v > max) return max;
        return v;
    }

    function normalizePercent(value) {
        var n = toNumber(value, 0);
        if (n < 0) n = 0;
        return n;
    }

    function formatNumber(v) {
        if (v === null || v === undefined || isNaN(v)) return '-';
        var sign = v < 0 ? '-' : '';
        var abs  = Math.abs(v);
        var fixed = abs >= 1000 ? Math.round(abs).toString() : abs.toFixed(2);
        var parts = fixed.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var joined = parts.join('.');
        // 小数末尾の0を整理
        joined = joined.replace(/\.00$/, '');
        return sign + joined;
    }

    function formatMultiplier(v) {
        if (v === null || v === undefined || isNaN(v)) return '-';
        return v.toFixed(4) + ' 倍';
    }

    // ---- 入力 / DOM 操作 --------------------------------------------------

    function el(id) {
        return document.getElementById('spd-' + id);
    }

    function getRadioValue(name) {
        var nodes = document.querySelectorAll('input[name="' + name + '"]');
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked) return nodes[i].value;
        }
        return null;
    }

    function setRadioValue(name, value) {
        var nodes = document.querySelectorAll('input[name="' + name + '"]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].checked = (nodes[i].value === value);
        }
    }

    function getInputs() {
        var inputs = {};
        for (var i = 0; i < FIELD_IDS.length; i++) {
            var id  = FIELD_IDS[i];
            var def = DEFAULT_INPUTS[id];
            var node;

            if (id === 'hitType') {
                inputs[id] = getRadioValue('spd-hitType') || def;
                continue;
            }

            node = el(id);
            if (!node) {
                inputs[id] = def;
                continue;
            }

            if (node.tagName === 'SELECT') {
                inputs[id] = node.value || def;
            } else if (node.type === 'checkbox') {
                inputs[id] = !!node.checked;
            } else {
                if (typeof def === 'number') {
                    inputs[id] = toNumber(node.value, def);
                } else {
                    inputs[id] = node.value !== '' ? node.value : def;
                }
            }
        }
        return inputs;
    }

    function setInputs(values) {
        if (!values || typeof values !== 'object') return;
        for (var i = 0; i < FIELD_IDS.length; i++) {
            var id = FIELD_IDS[i];
            if (!(id in values)) continue;

            if (id === 'hitType') {
                setRadioValue('spd-hitType', values[id]);
                continue;
            }

            var node = el(id);
            if (!node) continue;

            if (node.type === 'checkbox') {
                node.checked = !!values[id];
            } else {
                node.value = values[id];
            }
        }
        // 旧データ後方互換: limitBreakLevel が無く flat/pct だけ持つ古い保存値に対して、
        // 公式表と一致する flat があれば Lv セレクタを推定して合わせる (= UX 改善)。
        if (!('limitBreakLevel' in values)) {
            var lbSel = el('limitBreakLevel');
            var flatNode = el('physicalLimitDamageFlat');
            if (lbSel && flatNode) {
                var f = toNumber(flatNode.value, 0);
                for (var j = 0; j < LIMIT_BREAK_PHYS_LEVELS.length; j++) {
                    if (LIMIT_BREAK_PHYS_LEVELS[j].flat === f) {
                        lbSel.value = String(LIMIT_BREAK_PHYS_LEVELS[j].lv);
                        break;
                    }
                }
            }
        }
    }

    // ---- 個別計算関数 -----------------------------------------------------

    function calcWeaponAttack(inputs) {
        var min = toNumber(inputs.weaponAttackMin, 0);
        var max = toNumber(inputs.weaponAttackMax, 0);
        var custom = toNumber(inputs.weaponAttackCustom, 0);

        if (max < min) max = min;

        switch (inputs.weaponAttackMode) {
            case 'min':     return min;
            case 'max':     return max;
            case 'avg':     return (min + max) / 2;
            case 'custom':  return custom;
            default:        return max;
        }
    }

    function calcStrengthMultiplier(strength) {
        var s = toNumber(strength, 0);
        if (s < 0) s = 0;
        return 1 + s / 200;
    }

    function calcSkillDamageMultiplier(inputs) {
        var pct =
              normalizePercent(inputs.skillDamagePercent)
            + normalizePercent(inputs.damageOpPercent)
            + normalizePercent(inputs.skillCorrectionPercent)
            + normalizePercent(inputs.guildItemCorrectionPercent);
        return (100 + pct) / 100;
    }

    function calcBaseDamage(inputs) {
        var weapon  = calcWeaponAttack(inputs);
        var strMul  = calcStrengthMultiplier(inputs.strength);
        var skillMul = calcSkillDamageMultiplier(inputs);
        var nonWeapon = toNumber(inputs.nonWeaponAttack, 0);

        var base =
              (1 + weapon) * strMul * skillMul
            + nonWeapon * strMul;

        return {
            weaponAttack: weapon,
            strengthMultiplier: strMul,
            skillDamageMultiplier: skillMul,
            baseDamageBeforeDefense: base
        };
    }

    function calcDefenseAdjustment(inputs, baseDamage) {
        var def = toNumber(inputs.mobDefense, 0);
        var redu = clamp(normalizePercent(inputs.physicalDefenseReductionPercent), 0, 100);
        var ignr = clamp(normalizePercent(inputs.targetFinalDefenseIgnorePercent), 0, 100);

        var defenseValue = def * (1 - redu / 100) * (1 - ignr / 100);
        var afterDefense;

        switch (inputs.defenseMode) {
            case 'ignore':
                afterDefense = baseDamage;
                break;
            case 'coefficient':
                afterDefense = baseDamage * toNumber(inputs.defenseCoefficient, 1);
                break;
            case 'experimental':
                afterDefense = baseDamage - defenseValue;
                break;
            case 'subtract':
            default:
                afterDefense = Math.max(0, baseDamage - defenseValue);
        }

        return {
            defenseValue: defenseValue,
            baseDamageAfterDefense: afterDefense
        };
    }

    function calcFinalAttackMultiplier(inputs) {
        return 1 + normalizePercent(inputs.finalAttackPowerPercent) / 100;
    }

    function calcVsTypeMultiplier(inputs) {
        var pct = normalizePercent(inputs.vsTypePhysicalDamagePercent);
        var cap = normalizePercent(inputs.vsTypeCapPercent);
        if (cap <= 0) cap = 300;
        var capped = Math.min(pct, cap);
        return {
            vsTypePercentAfterCap: capped,
            vsTypeMultiplier: 1 + capped / 100
        };
    }

    function calcEnemyFinalDamageReductionMultiplier(inputs) {
        return 1 + normalizePercent(inputs.enemyFinalDamageReductionPercent) / 100;
    }

    function calcMobDamageCutMultiplier(inputs) {
        var p = clamp(normalizePercent(inputs.mobDamageCutPercent), 0, 100);
        return 1 - p / 100;
    }

    function calcLimitBreakMultiplier(inputs) {
        return 1 + normalizePercent(inputs.limitBreakPhysicalEffectPercent) / 100;
    }

    function calcDiagramMultiplier(inputs) {
        var eff = normalizePercent(inputs.diagramEffectPercent);
        var rate = clamp(normalizePercent(inputs.diagramActivationRatePercent), 0, 100);

        if (inputs.diagramAlwaysActivatedMode) {
            return 1 + eff / 100;
        }
        if (inputs.diagramExpectedValueMode) {
            return 1 + (eff * rate / 100) / 100;
        }
        return 1;
    }

    function calcCriticalMultiplier(inputs) {
        switch (inputs.hitType) {
            case 'critical':       return 2;
            case 'doubleCritical': return 4;
            case 'heavyHit':       return 3;
            case 'normal':
            default:               return 1;
        }
    }

    function calcDoubleCriticalMultiplier(inputs) {
        if (inputs.hitType !== 'doubleCritical') return 1;
        return 1 + normalizePercent(inputs.doubleCriticalDamageIncreasePercent) / 100;
    }

    function calcHeavyHitMultiplier(inputs) {
        if (inputs.hitType !== 'heavyHit') return 1;
        return 1 + normalizePercent(inputs.physicalHeavyHitDamageIncreasePercent) / 100;
    }

    function calcFinalPhysicalMultiplier(inputs) {
        return 1 + normalizePercent(inputs.finalPhysicalDamagePercent) / 100;
    }

    function calcHeavyHitOnlyMultiplier(inputs) {
        if (inputs.hitType !== 'heavyHit') return 1;
        return 1 + normalizePercent(inputs.heavyHitOnlyPercent) / 100;
    }

    function applyCapSubtract(inputs, stageName, value) {
        if (inputs.capSubtractStage !== stageName) return value;
        var v = value - toNumber(inputs.capSubtractValue, 0);
        return v < 0 ? 0 : v;
    }

    // ---- 全体計算 ---------------------------------------------------------

    var WEAPON_MODE_LABEL = {
        'min': '最小',
        'max': '最大',
        'avg': '平均',
        'custom': '任意入力'
    };
    var DEFENSE_MODE_LABEL = {
        'subtract': '減算',
        'coefficient': '係数化',
        'ignore': '無視',
        'experimental': '減算（クランプなし）'
    };
    var HIT_TYPE_LABEL = {
        'normal': '通常',
        'critical': 'クリティカル',
        'doubleCritical': 'ダブルクリティカル',
        'heavyHit': '物理強打'
    };

    function calculateDamage(inputs) {
        var steps = [];
        var warnings = [];

        // 1. 基礎ダメージ
        var b = calcBaseDamage(inputs);
        steps.push({ key: 'weaponAttack',           label: '武器攻撃力',                   value: b.weaponAttack,           note: '使用モード: ' + (WEAPON_MODE_LABEL[inputs.weaponAttackMode] || inputs.weaponAttackMode) });
        steps.push({ key: 'strengthMultiplier',     label: '力補正',                       value: b.strengthMultiplier,     note: '1 + 力 / 200' });
        steps.push({ key: 'skillDamageMultiplier',  label: 'スキル表記ダメージ倍率',         value: b.skillDamageMultiplier,  note: '(100 + 表記% + ダメージOP% + スキル補正% + ギルド/アイテム%) / 100' });
        steps.push({ key: 'baseDamageBeforeDefense', label: '基礎物理ダメージ（防御前）',     value: b.baseDamageBeforeDefense });

        // 2. 防御補正
        var d = calcDefenseAdjustment(inputs, b.baseDamageBeforeDefense);
        steps.push({ key: 'defenseValue',           label: '防御関連補正値',               value: d.defenseValue,           note: '防御方式: ' + (DEFENSE_MODE_LABEL[inputs.defenseMode] || inputs.defenseMode) });
        steps.push({ key: 'baseDamageAfterDefense', label: '基礎物理ダメージ（防御後）',     value: d.baseDamageAfterDefense });

        var current = d.baseDamageAfterDefense;

        // カンスト差し引き：基礎ダメージ後
        var afterCap1 = applyCapSubtract(inputs, 'afterBase', current);
        if (afterCap1 !== current) {
            steps.push({ key: 'capSubtractAfterBase', label: 'カンスト差し引き（基礎ダメージ後）', value: afterCap1 });
        }
        current = afterCap1;

        // 3. 最終攻撃力
        var fam = calcFinalAttackMultiplier(inputs);
        steps.push({ key: 'finalAttackMultiplier', label: '最終攻撃力倍率', value: fam });

        // カンスト差し引き：主要倍率前
        var afterCap2 = applyCapSubtract(inputs, 'beforeMain', current);
        if (afterCap2 !== current) {
            steps.push({ key: 'capSubtractBeforeMain', label: 'カンスト差し引き（主要倍率前）', value: afterCap2 });
        }
        current = afterCap2 * fam;
        steps.push({ key: 'afterFinalAttack', label: '最終攻撃力倍率 適用後', value: current });

        // 4. 種族型別
        var vs = calcVsTypeMultiplier(inputs);
        steps.push({ key: 'vsTypePercentAfterCap', label: '種族型別物理ダメージ%（上限適用後）', value: vs.vsTypePercentAfterCap, note: '上限: ' + normalizePercent(inputs.vsTypeCapPercent) + '%' });
        steps.push({ key: 'vsTypeMultiplier',      label: '種族型別倍率',                       value: vs.vsTypeMultiplier });
        current = current * vs.vsTypeMultiplier;
        steps.push({ key: 'afterVsType', label: '種族型別倍率 適用後', value: current });

        // 5. 敵最終ダメージ補正減少
        var efr = calcEnemyFinalDamageReductionMultiplier(inputs);
        steps.push({ key: 'enemyFinalDamageReductionMultiplier', label: '敵最終ダメージ補正減少倍率', value: efr });
        current = current * efr;
        steps.push({ key: 'afterEnemyReduction', label: '敵最終ダメージ補正減少 適用後', value: current });

        // 6. Mobダメージカット
        var mc = calcMobDamageCutMultiplier(inputs);
        steps.push({ key: 'mobDamageCutMultiplier', label: 'Mobダメージカット倍率', value: mc });
        current = current * mc;
        steps.push({ key: 'afterMobCut', label: 'Mobダメージカット 適用後', value: current });

        // 7. 限界突破称号物理効果 (倍率)
        var lb = calcLimitBreakMultiplier(inputs);
        steps.push({ key: 'limitBreakMultiplier', label: '限界突破称号物理効果倍率', value: lb });
        current = current * lb;
        steps.push({ key: 'afterLimitBreak', label: '限界突破称号物理効果 適用後', value: current });

        // 8. 物理ダメージ上限キャップ
        //   cap = ベース上限 (default 20,000) + 称号 Lv 由来 flat + その他 flat
        //   通常ヒット相当のダメ部分を min(value, cap) でクリップ → そのあとクリ倍率等を乗せる。
        var capBase  = toNumber(inputs.physicalDamageCapBase, 20000);
        var capTitle = toNumber(inputs.physicalLimitDamageFlat, 0);
        var capExtra = toNumber(inputs.physicalLimitDamageFlatExtra, 0);
        var damageCap = capBase + capTitle + capExtra;
        steps.push({ key: 'physicalDamageCap', label: 'ダメ上限 (キャップ)', value: damageCap,
            note: 'ベース ' + formatNumber(capBase) +
                  ' + 称号 ' + formatNumber(capTitle) +
                  ' + その他 ' + formatNumber(capExtra) });
        if (current > damageCap) {
            steps.push({ key: 'beforeCap', label: 'キャップ適用前', value: current });
            current = damageCap;
            steps.push({ key: 'afterCap', label: 'キャップ適用後', value: current });
        } else {
            steps.push({ key: 'capNotApplied', label: 'キャップ未到達 (素通り)', value: current });
        }

        // カンスト差し引き：主要倍率後
        var afterCap3 = applyCapSubtract(inputs, 'afterMain', current);
        if (afterCap3 !== current) {
            steps.push({ key: 'capSubtractAfterMain', label: 'カンスト差し引き（主要倍率後）', value: afterCap3 });
        }
        current = afterCap3;

        // 9. 図案書
        var dia = calcDiagramMultiplier(inputs);
        steps.push({ key: 'diagramMultiplier', label: '図案書倍率', value: dia });
        current = current * dia;
        steps.push({ key: 'afterDiagram', label: '図案書 適用後', value: current });

        // 10. クリティカル種別
        var crit = calcCriticalMultiplier(inputs);
        steps.push({ key: 'criticalMultiplier', label: 'クリティカル種別倍率', value: crit, note: 'ダメージ種別: ' + (HIT_TYPE_LABEL[inputs.hitType] || inputs.hitType) });
        current = current * crit;
        steps.push({ key: 'afterCritical', label: 'クリティカル 適用後', value: current });

        // 11. ダブクリダメ増加
        var wup = calcDoubleCriticalMultiplier(inputs);
        steps.push({ key: 'doubleCriticalMultiplier', label: 'ダブクリダメ増加倍率', value: wup });
        current = current * wup;
        steps.push({ key: 'afterWup', label: 'ダブクリダメ増加 適用後', value: current });

        // 12. 強打ダメ増加
        var hup = calcHeavyHitMultiplier(inputs);
        steps.push({ key: 'heavyHitMultiplier', label: '強打ダメ増加倍率', value: hup });
        current = current * hup;
        steps.push({ key: 'afterHup', label: '強打ダメ増加 適用後', value: current });

        // 13. 最終物理ダメージ
        var fp = calcFinalPhysicalMultiplier(inputs);
        steps.push({ key: 'finalPhysicalMultiplier', label: '最終物理ダメージ倍率', value: fp });
        current = current * fp;
        steps.push({ key: 'afterFinalPhysical', label: '最終物理ダメージ 適用後', value: current });

        // 14. 物理強打時専用補正
        var hho = calcHeavyHitOnlyMultiplier(inputs);
        steps.push({ key: 'heavyHitOnlyMultiplier', label: '物理強打時専用倍率', value: hho });
        current = current * hho;
        steps.push({ key: 'afterHeavyHitOnly', label: '物理強打時専用補正 適用後', value: current });

        // カンスト差し引き：最終結果前
        var afterCap4 = applyCapSubtract(inputs, 'beforeFinal', current);
        if (afterCap4 !== current) {
            steps.push({ key: 'capSubtractBeforeFinal', label: 'カンスト差し引き（最終結果前）', value: afterCap4 });
        }
        current = afterCap4;

        // ---- 警告 ----
        if (inputs.defenseMode !== 'subtract') {
            warnings.push('防御補正方式「' + inputs.defenseMode + '」は検証中です。');
        } else {
            warnings.push('防御補正方式（subtract）も含めて、Mob防御力の影響は検証中です。');
        }
        if (inputs.capSubtractStage !== 'none') {
            warnings.push('カンスト差し引き位置「' + inputs.capSubtractStage + '」は暫定です。実機検証で位置が変わる可能性があります。');
        }
        if (toNumber(inputs.physicalLimitDamageFlat, 0) > 0 || toNumber(inputs.physicalLimitDamageFlatExtra, 0) > 0) {
            warnings.push('物理限界ダメージは「ダメージ上限の引き上げ (キャップ)」として効きます。ベース上限 + 称号+ + その他+ を合計して min(value, cap) でクリップしています。実機の cap 算出ロジックは検証中。');
        }
        if (inputs.diagramExpectedValueMode && inputs.diagramAlwaysActivatedMode) {
            warnings.push('図案書「期待値計算」と「発動済み計算」が両方ONになっています。発動済み計算が優先されます。');
        }
        if (inputs.hitType === 'doubleCritical' && normalizePercent(inputs.physicalHeavyHitDamageIncreasePercent) > 0) {
            warnings.push('ダブルクリティカル時に HUP（物理強打ダメージ増加%）が入力されていますが、適用範囲は未検証です（初期実装では物理強打時のみ適用）。');
        }
        if (inputs.hitType === 'heavyHit' && normalizePercent(inputs.doubleCriticalDamageIncreasePercent) > 0) {
            warnings.push('物理強打時に WUP（ダブルクリティカルダメージ増加%）が入力されていますが、適用範囲は未検証です（初期実装ではダブルクリティカル時のみ適用）。');
        }
        if (toNumber(inputs.mobDefense, 0) >= 1000000) {
            warnings.push('Mob防御力が高い値です。位相Mob 想定の場合、防御補正方式は要検証です。');
        }
        if (normalizePercent(inputs.vsTypePhysicalDamagePercent) > normalizePercent(inputs.vsTypeCapPercent)) {
            warnings.push('VS型別物理ダメージ% が上限値を超えています。上限値で丸めて計算しています。');
        }

        return {
            inputs: inputs,
            steps: steps,
            warnings: warnings,
            finalDamage: current
        };
    }

    // ---- 描画 -------------------------------------------------------------

    function renderResult(result) {
        var box = document.getElementById('spd-result-value');
        if (box) box.textContent = formatNumber(result.finalDamage);
        var sub = document.getElementById('spd-result-sub');
        if (sub) {
            var hitLabel = {
                'normal': '通常ヒット',
                'critical': 'クリティカル',
                'doubleCritical': 'ダブルクリティカル',
                'heavyHit': '物理強打'
            }[result.inputs.hitType] || result.inputs.hitType;
            sub.textContent = 'ダメージ種別: ' + hitLabel;
        }
    }

    function renderBreakdown(result) {
        var tbody = document.getElementById('spd-breakdown-tbody');
        if (!tbody) return;
        var rows = '';
        for (var i = 0; i < result.steps.length; i++) {
            var s = result.steps[i];

            var isMul = /Multiplier$/.test(s.key) || /倍率/.test(s.label);
            var isPercent = /PercentAfterCap$/.test(s.key) || /Percent/.test(s.key);
            var formatted;
            if (isMul) {
                formatted = formatMultiplier(s.value);
            } else if (isPercent && /PercentAfterCap$/.test(s.key)) {
                formatted = formatNumber(s.value) + ' %';
            } else {
                formatted = formatNumber(s.value);
            }

            rows +=
                '<tr>' +
                  '<td class="sokomin-pdamage-breakdown-key">' + (i + 1) + '</td>' +
                  '<td class="sokomin-pdamage-breakdown-label">' + escapeHtml(s.label) + '</td>' +
                  '<td class="sokomin-pdamage-breakdown-value">' + escapeHtml(formatted) + '</td>' +
                  '<td class="sokomin-pdamage-breakdown-note">' + escapeHtml(s.note || '') + '</td>' +
                '</tr>';
        }
        // 最終ダメージ行
        rows +=
            '<tr class="sokomin-pdamage-row-final">' +
              '<td class="sokomin-pdamage-breakdown-key">★</td>' +
              '<td class="sokomin-pdamage-breakdown-label">最終概算ダメージ</td>' +
              '<td class="sokomin-pdamage-breakdown-value">' + escapeHtml(formatNumber(result.finalDamage)) + '</td>' +
              '<td class="sokomin-pdamage-breakdown-note"></td>' +
            '</tr>';
        tbody.innerHTML = rows;
    }

    function renderWarnings(result) {
        var ul = document.getElementById('spd-warnings-list');
        if (!ul) return;
        if (!result.warnings || result.warnings.length === 0) {
            ul.innerHTML = '<li>特に警告はありません。</li>';
            return;
        }
        var html = '';
        for (var i = 0; i < result.warnings.length; i++) {
            html += '<li>' + escapeHtml(result.warnings[i]) + '</li>';
        }
        ul.innerHTML = html;
    }

    function escapeHtml(s) {
        if (s === null || s === undefined) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ---- 永続化 -----------------------------------------------------------

    function saveToStorage(inputs) {
        try {
            if (window.localStorage) {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
            }
        } catch (e) { /* noop */ }
    }

    function loadFromStorage() {
        try {
            if (!window.localStorage) return null;
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function loadFromQuery() {
        try {
            var qs = window.location.search;
            if (!qs) return null;
            var params = new URLSearchParams(qs);
            var raw = params.get('pd');
            if (!raw) return null;
            var json = decodeURIComponent(raw);
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }

    function buildShareUrl(inputs) {
        var json = JSON.stringify(inputs);
        var url = window.location.origin + window.location.pathname + '?pd=' + encodeURIComponent(json);
        return url;
    }

    // ---- プリセット -------------------------------------------------------

    var loadedPresets = null;

    function fetchPresets(callback) {
        if (loadedPresets) {
            callback(loadedPresets);
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', PRESET_URL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    loadedPresets = JSON.parse(xhr.responseText);
                    callback(loadedPresets);
                } catch (e) {
                    callback(null);
                }
            } else {
                callback(null);
            }
        };
        xhr.send();
    }

    function populatePresetSelect() {
        var sel = document.getElementById('spd-preset-select');
        if (!sel) return;
        sel.innerHTML = '<option value="">読み込み中…</option>';
        fetchPresets(function (data) {
            if (!data || !data.presets) {
                sel.innerHTML = '<option value="">プリセット取得失敗</option>';
                return;
            }
            var html = '<option value="">— プリセットを選択 —</option>';
            for (var i = 0; i < data.presets.length; i++) {
                var p = data.presets[i];
                html += '<option value="' + escapeHtml(p.id) + '">'
                      + escapeHtml(p.name)
                      + '</option>';
            }
            sel.innerHTML = html;
        });
    }

    function applyPresetById(id) {
        if (!id || !loadedPresets || !loadedPresets.presets) return;
        for (var i = 0; i < loadedPresets.presets.length; i++) {
            if (loadedPresets.presets[i].id === id) {
                var preset = loadedPresets.presets[i];
                // デフォルトでマージしてから上書き
                var merged = mergeWithDefaults(preset.inputs);
                setInputs(merged);
                recalc();
                return;
            }
        }
    }

    function mergeWithDefaults(values) {
        var out = {};
        for (var k in DEFAULT_INPUTS) {
            if (Object.prototype.hasOwnProperty.call(DEFAULT_INPUTS, k)) {
                out[k] = (values && k in values) ? values[k] : DEFAULT_INPUTS[k];
            }
        }
        return out;
    }

    // ---- 再計算ハンドラ ---------------------------------------------------

    function recalc() {
        var inputs = getInputs();
        var result = calculateDamage(inputs);
        renderResult(result);
        renderBreakdown(result);
        renderWarnings(result);
        updateJsonArea(inputs);
        saveToStorage(inputs);
    }

    function updateJsonArea(inputs) {
        var area = document.getElementById('spd-json-area');
        if (!area) return;
        try {
            area.value = JSON.stringify(inputs, null, 2);
        } catch (e) { /* noop */ }
    }

    function copyJsonToClipboard() {
        var area = document.getElementById('spd-json-area');
        if (!area) return;
        try {
            area.select();
            document.execCommand('copy');
            flashMessage('入力値JSONをクリップボードにコピーしました。');
        } catch (e) {
            flashMessage('コピーに失敗しました。手動でテキストを選択してコピーしてください。');
        }
    }

    function flashMessage(msg) {
        var box = document.getElementById('spd-flash');
        if (!box) return;
        box.textContent = msg;
        box.style.opacity = '1';
        clearTimeout(flashMessage._t);
        flashMessage._t = setTimeout(function () {
            box.style.opacity = '0';
        }, 2500);
    }

    function copyShareUrl() {
        var inputs = getInputs();
        var url = buildShareUrl(inputs);
        try {
            var temp = document.createElement('textarea');
            temp.value = url;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            flashMessage('共有URLをクリップボードにコピーしました。');
        } catch (e) {
            window.prompt('共有URL（手動でコピーしてください）', url);
        }
    }

    function reset() {
        setInputs(DEFAULT_INPUTS);
        recalc();
        flashMessage('初期値に戻しました。');
    }

    // ---- モード切替 -------------------------------------------------------

    function switchMode(mode) {
        var root = document.getElementById('spd-root');
        if (!root) return;
        if (mode === 'simple') {
            root.classList.add('sokomin-pdamage-mode-simple');
        } else {
            root.classList.remove('sokomin-pdamage-mode-simple');
        }
        var simpleBtn = document.getElementById('spd-mode-simple-btn');
        var detailBtn = document.getElementById('spd-mode-detail-btn');
        if (simpleBtn) simpleBtn.classList.toggle('active', mode === 'simple');
        if (detailBtn) detailBtn.classList.toggle('active', mode === 'detail');
    }

    // ---- 初期化 -----------------------------------------------------------

    function bindEvents() {
        // 入力イベント
        for (var i = 0; i < FIELD_IDS.length; i++) {
            var id = FIELD_IDS[i];
            if (id === 'hitType') {
                var radios = document.querySelectorAll('input[name="spd-hitType"]');
                for (var r = 0; r < radios.length; r++) {
                    radios[r].addEventListener('change', recalc);
                }
                continue;
            }
            var node = el(id);
            if (!node) continue;
            node.addEventListener('input', recalc);
            node.addEventListener('change', recalc);
        }

        // 限界突破 Lv セレクタ: 選ぶと「物理効果%」と「上限+ (称号由来)」を自動セット
        var lbSel = el('limitBreakLevel');
        if (lbSel) {
            lbSel.addEventListener('change', function () {
                var lv = toNumber(lbSel.value, 0);
                var row = null;
                for (var k = 0; k < LIMIT_BREAK_PHYS_LEVELS.length; k++) {
                    if (LIMIT_BREAK_PHYS_LEVELS[k].lv === lv) { row = LIMIT_BREAK_PHYS_LEVELS[k]; break; }
                }
                if (!row) return;
                var flatNode = el('physicalLimitDamageFlat');
                var pctNode  = el('limitBreakPhysicalEffectPercent');
                if (flatNode) flatNode.value = row.flat;
                if (pctNode)  pctNode.value  = row.pct;
                recalc();
            });
        }

        // 計算ボタン
        var calcBtn = document.getElementById('spd-calc-btn');
        if (calcBtn) calcBtn.addEventListener('click', recalc);

        // 初期化ボタン
        var resetBtn = document.getElementById('spd-reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', reset);

        // プリセット
        var loadPresetBtn = document.getElementById('spd-load-preset-btn');
        if (loadPresetBtn) {
            loadPresetBtn.addEventListener('click', function () {
                var sel = document.getElementById('spd-preset-select');
                if (sel && sel.value) applyPresetById(sel.value);
            });
        }

        // JSON コピー
        var copyJsonBtn = document.getElementById('spd-copy-json-btn');
        if (copyJsonBtn) copyJsonBtn.addEventListener('click', copyJsonToClipboard);

        // URL 共有
        var shareBtn = document.getElementById('spd-share-url-btn');
        if (shareBtn) shareBtn.addEventListener('click', copyShareUrl);

        // モード切替
        var simpleBtn = document.getElementById('spd-mode-simple-btn');
        var detailBtn = document.getElementById('spd-mode-detail-btn');
        if (simpleBtn) simpleBtn.addEventListener('click', function () { switchMode('simple'); });
        if (detailBtn) detailBtn.addEventListener('click', function () { switchMode('detail'); });
    }

    function init() {
        // デフォルト → URLクエリ → localStorage の順で適用
        setInputs(DEFAULT_INPUTS);

        var fromQuery = loadFromQuery();
        if (fromQuery) {
            setInputs(mergeWithDefaults(fromQuery));
        } else {
            var fromStorage = loadFromStorage();
            if (fromStorage) {
                setInputs(mergeWithDefaults(fromStorage));
            }
        }

        bindEvents();
        populatePresetSelect();
        switchMode('detail');
        recalc();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ---- 公開 API（テスト用） --------------------------------------------

    global.SokominPDamage = {
        init: init,
        recalc: recalc,
        reset: reset,
        getInputs: getInputs,
        setInputs: setInputs,
        calculateDamage: calculateDamage,
        normalizePercent: normalizePercent,
        DEFAULT_INPUTS: DEFAULT_INPUTS,
        // 個別関数（検証用）
        calcWeaponAttack: calcWeaponAttack,
        calcStrengthMultiplier: calcStrengthMultiplier,
        calcSkillDamageMultiplier: calcSkillDamageMultiplier,
        calcBaseDamage: calcBaseDamage,
        calcDefenseAdjustment: calcDefenseAdjustment,
        calcFinalAttackMultiplier: calcFinalAttackMultiplier,
        calcVsTypeMultiplier: calcVsTypeMultiplier,
        calcEnemyFinalDamageReductionMultiplier: calcEnemyFinalDamageReductionMultiplier,
        calcMobDamageCutMultiplier: calcMobDamageCutMultiplier,
        calcLimitBreakMultiplier: calcLimitBreakMultiplier,
        calcDiagramMultiplier: calcDiagramMultiplier,
        calcCriticalMultiplier: calcCriticalMultiplier,
        calcDoubleCriticalMultiplier: calcDoubleCriticalMultiplier,
        calcHeavyHitMultiplier: calcHeavyHitMultiplier,
        calcFinalPhysicalMultiplier: calcFinalPhysicalMultiplier,
        calcHeavyHitOnlyMultiplier: calcHeavyHitOnlyMultiplier,
        applyCapSubtract: applyCapSubtract
    };

})(window);
