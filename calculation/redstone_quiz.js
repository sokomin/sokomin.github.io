(function () {
    'use strict';

    var DATA_DIR = 'redstone_quiz_data/';
    var DATA_EXT = '.rqx';
    var KEY_PART_URLS = 'abcdefghijklmnopqrstuvwxyz'.split('').map(function (letter) {
        return 'https://sokomin.github.io/sokomin_repository2023/item_search/items_search_cache_202606_' + letter + '.json';
    });
    var KEY_PART_PICK = [12, 8, 13];
    var STORAGE_KEY = 'rs_quiz_stats_v1';
    var dataKeyPromise = null;

    var STATE = {
        config: null,
        pools: {},          // { 1: [q,q,...], 2: [...], ... }
        screen: 'start',    // 'start' | 'ex-confirm' | 'quiz' | 'result'
        quizLevel: null,    // 1..10
        mode: 'normal',
        diagnosis: null,
        recommendLevel: null,
        questions: [],      // 出題セット (length === questionsPerSet)
        currentIdx: 0,
        currentChoices: [],
        answered: false,
        results: [],        // 各問の結果 { q, picked, correct, ok }
        history: []         // 過去セッションの記録 (localStorage)
    };

    // ---------- utils ----------

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    function $(id) { return document.getElementById(id); }

    function getGenreBalanceRule(quizLv) {
        var cfg = STATE.config.genreBalance || {};
        if (!cfg.enabled) return null;

        var enabledLevels = cfg.enabledLevels;
        if (Array.isArray(enabledLevels) && enabledLevels.length) {
            var enabled = enabledLevels.some(function (lv) {
                return String(lv) === String(quizLv);
            });
            if (!enabled) return null;
        }

        return {
            field: cfg.field || 'genre',
            untaggedGenre: cfg.untaggedGenre || '未分類',
            minGroups: cfg.minGroups || 2
        };
    }

    function getQuestionGenre(q, rule) {
        var value = q && q[rule.field];
        if (Array.isArray(value)) value = value[0];
        if (typeof value === 'string' && value.trim()) return value.trim();
        return rule.untaggedGenre;
    }

    function pickQuestions(pool, n, balanceRule) {
        var shuffled = shuffle(pool);
        if (!balanceRule) return shuffled.slice(0, n);

        var groups = {};
        shuffled.forEach(function (q) {
            var genre = getQuestionGenre(q, balanceRule);
            if (!groups[genre]) groups[genre] = [];
            groups[genre].push(q);
        });

        var genres = Object.keys(groups);
        if (genres.length < balanceRule.minGroups) return shuffled.slice(0, n);

        var picked = [];
        while (picked.length < n) {
            var added = false;
            for (var i = 0; i < genres.length && picked.length < n; i++) {
                var bucket = groups[genres[i]];
                if (!bucket.length) continue;
                picked.push(bucket.shift());
                added = true;
            }
            if (!added) break;
        }

        return picked;
    }

    function showScreen(name) {
        STATE.screen = name;
        ['start', 'ex-confirm', 'quiz', 'result'].forEach(function (n) {
            var el = $('rq-' + n);
            if (!el) return;
            if (n === name) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    }

    function isDebugMetaEnabled() {
        try {
            return new URLSearchParams(window.location.search).get('debugMeta') === '1';
        } catch (e) {
            return false;
        }
    }

    // ---------- data load ----------

    function getHashParam(name) {
        try {
            var raw = window.location.hash ? window.location.hash.slice(1) : '';
            return new URLSearchParams(raw).get(name);
        } catch (e) {
            return null;
        }
    }

    function getDataKey() {
        if (dataKeyPromise) return dataKeyPromise;
        dataKeyPromise = Promise.resolve().then(function () {
            var key = getHashParam('quizKey');
            if (!key) key = sessionStorage.getItem('rs_quiz_data_key');
            if (key) return key;
            return fetchDataKeyParts().catch(function () {
                return window.prompt('データキーを入力してください。');
            });
        }).then(function (key) {
            if (!key) throw new Error('データキーが未入力です');
            sessionStorage.setItem('rs_quiz_data_key', key);
            return key;
        });
        return dataKeyPromise;
    }

    function readKeyPart(doc, url, index) {
        var order = doc && doc.cache && doc.cache.order;
        var shard = doc && doc.cache && doc.cache.shard;
        if (typeof order !== 'number' || typeof shard !== 'string' || !shard) {
            throw new Error(url + ' のキー断片形式が不正です');
        }
        return { index: index, order: order, shard: shard };
    }

    function fetchDataKeyParts() {
        return Promise.all(KEY_PART_URLS.map(function (url, index) {
            return fetch(url, { cache: 'no-store' }).then(function (response) {
                if (!response.ok) throw new Error(url + ' を読み込めませんでした');
                return response.json();
            }).then(function (doc) {
                return readKeyPart(doc, url, index);
            });
        })).then(function (parts) {
            return parts.filter(function (part) {
                return KEY_PART_PICK.indexOf(part.index) !== -1;
            }).sort(function (a, b) {
                return a.order - b.order;
            }).map(function (part) {
                return part.shard;
            }).join('');
        });
    }

    function base64ToBytes(s) {
        var bin = atob(s);
        var out = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
    }

    function mixBytes(input, fileKey, bundle, keyMaterial) {
        var next = makeWords(['p', fileKey, bundle.s || '', bundle.n || '', keyMaterial].join('|'));
        var out = new Uint8Array(input.length);
        var word = 0;
        for (var i = 0; i < input.length; i++) {
            if ((i & 3) === 0) word = next();
            out[i] = input[i] ^ ((word >>> ((i & 3) * 8)) & 255);
        }
        return out;
    }

    function makeWords(seed) {
        function h(s) {
            var x = 1779033703 ^ s.length;
            for (var i = 0; i < s.length; i++) {
                x = Math.imul(x ^ s.charCodeAt(i), 3432918353);
                x = (x << 13) | (x >>> 19);
            }
            return function () {
                x = Math.imul(x ^ (x >>> 16), 2246822507);
                x = Math.imul(x ^ (x >>> 13), 3266489909);
                return (x ^= x >>> 16) >>> 0;
            };
        }
        var f = h(seed);
        var a = f(), b = f(), c = f(), d = f();
        return function () {
            var t = (a + b) | 0;
            a = b ^ (b >>> 9);
            b = (c + (c << 3)) | 0;
            c = (c << 21) | (c >>> 11);
            d = (d + 1) | 0;
            t = (t + d) | 0;
            c = (c + t) | 0;
            return t >>> 0;
        };
    }

    function readEncryptedJson(fileKey) {
        return Promise.all([
            getDataKey(),
            fetch(DATA_DIR + fileKey + DATA_EXT, { cache: 'no-store' })
        ]).then(function (values) {
            var keyMaterial = values[0];
            var response = values[1];
            if (!response.ok) {
                throw new Error(fileKey + DATA_EXT + ' を読み込めませんでした');
            }
            return response.json().then(function (packed) {
                if (!Array.isArray(packed) || packed[0] !== 1 || !packed[1] || !packed[2] || !packed[3]) {
                    throw new Error(fileKey + DATA_EXT + ' の形式が不正です');
                }
                return mixBytes(base64ToBytes(packed[3]), fileKey, { s: packed[1], n: packed[2] }, keyMaterial);
            });
        }).then(function (plainBytes) {
            return JSON.parse(new TextDecoder('utf-8').decode(plainBytes));
        });
    }

    function loadConfig() {
        return readEncryptedJson('config');
    }

    function loadLevel(lv) {
        return readEncryptedJson('level' + lv)
            .then(function (data) {
                var qs = (data.questions || []).filter(function (q) {
                    if (!q || typeof q.question !== 'string') return false;
                    if (!q.question.trim()) return false;
                    if (!Array.isArray(q.choices) || q.choices.length < 2) return false;
                    if (!q.answer) return false;
                    return true;
                });
                STATE.pools[lv] = qs;
            });
    }

    function loadAll() {
        return loadConfig().then(function (cfg) {
            STATE.config = cfg;
            var keySet = {};
            Object.keys(cfg.distribution || {}).forEach(function (k) {
                keySet[k] = true;
                Object.keys(cfg.distribution[k]).forEach(function (s) { keySet[s] = true; });
            });
            Object.keys(cfg.choicesByLevel || {}).forEach(function (k) { keySet[k] = true; });
            var allLevels = Object.keys(keySet);
            return Promise.all(allLevels.map(loadLevel));
        });
    }

    function compareLevelKeys(a, b) {
        var na = +a, nb = +b;
        var aNum = !isNaN(na), bNum = !isNaN(nb);
        if (aNum && bNum) return na - nb;
        if (aNum) return -1;
        if (bNum) return 1;
        return a < b ? -1 : (a > b ? 1 : 0);
    }

    function shouldShow(level) {
        var rule = (STATE.config.unlockRules || {})[String(level)];
        if (!rule) return true;
        if (rule.hidden) return false;
        if (rule.requirePassed) {
            return STATE.history.some(function (h) {
                return String(h.level) === String(rule.requirePassed) && h.pass;
            });
        }
        return true;
    }

    function getDifficultyDescription(quizLv) {
        var descriptions = STATE.config.difficultyDescriptions || {};
        return descriptions[String(quizLv)] || '難易度目安を準備中';
    }

    // ---------- start screen ----------

    function renderStart() {
        var grid = $('rq-level-grid');
        var diagnosisSlot = $('rq-diagnosis-slot');
        grid.innerHTML = '';
        diagnosisSlot.innerHTML = '';
        var diagnosisBtn = document.createElement('button');
        diagnosisBtn.className = 'rq-button';
        diagnosisBtn.id = 'rq-diagnosis';
        diagnosisBtn.textContent = 'おすすめLv診断';
        diagnosisBtn.addEventListener('click', startDiagnosis);
        diagnosisSlot.appendChild(diagnosisBtn);
        var visibleLevels = Object.keys(STATE.config.distribution || {})
            .filter(shouldShow)
            .sort(compareLevelKeys);
        visibleLevels.forEach(function (level) {
            var available = countAvailable(level);
            var btn = document.createElement('button');
            btn.className = 'rq-level-btn';
            btn.innerHTML =
                'Lv' + level +
                '<small>' + getDifficultyDescription(level) + '</small>';
            if (available.ok < available.need) {
                btn.style.opacity = '0.55';
                btn.title = '対象Lvの問題が不足しています (空テンプレを埋めるとプレイ可能になります)';
                btn.innerHTML += '<small style="opacity:.7;">準備中</small>';
            }
            btn.addEventListener('click', function () {
                if (String(level) === 'EX') showExConfirm();
                else startQuiz(level);
            });
            grid.appendChild(btn);
        });
    }

    function showExConfirm() {
        showScreen('ex-confirm');
    }

    function countAvailable(quizLv) {
        var dist = (STATE.config.distribution || {})[String(quizLv)] || {};
        var need = 0, ok = 0;
        Object.keys(dist).forEach(function (srcLv) {
            var n = dist[srcLv];
            need += n;
            var pool = STATE.pools[srcLv] || [];
            ok += Math.min(n, pool.length);
        });
        return { need: need, ok: ok };
    }

    // ---------- quiz session ----------

    function buildQuestionSet(quizLv) {
        var dist = (STATE.config.distribution || {})[String(quizLv)] || {};
        var balanceRule = getGenreBalanceRule(quizLv);
        var picked = [];
        Object.keys(dist).forEach(function (srcLv) {
            var n = dist[srcLv];
            var pool = (STATE.pools[srcLv] || []).slice();
            var selected = pickQuestions(pool, n, balanceRule);
            for (var i = 0; i < n && i < selected.length; i++) {
                picked.push(selected[i]);
            }
        });
        return shuffle(picked);
    }

    function startQuiz(quizLv) {
        var set = buildQuestionSet(quizLv);
        if (!set.length) {
            alert('Lv' + quizLv + ' は現在準備中です。');
            return;
        }
        STATE.mode = 'normal';
        STATE.diagnosis = null;
        STATE.recommendLevel = null;
        STATE.quizLevel = quizLv;
        STATE.questions = set;
        STATE.currentIdx = 0;
        STATE.results = [];
        var quizLevelLabel = $('rq-quiz-level');
        if (quizLevelLabel) quizLevelLabel.textContent = quizLv;
        showScreen('quiz');
        renderCurrent();
    }

    function pickDiagnosisQuestion(level) {
        var key = String(level);
        var pool = (STATE.pools[key] || []).slice();
        if (!pool.length) return null;
        if (!STATE.diagnosis.used[key]) STATE.diagnosis.used[key] = {};
        var used = STATE.diagnosis.used[key];
        var candidates = pool.filter(function (q) { return !used[q.id]; });
        if (!candidates.length) {
            used = {};
            STATE.diagnosis.used[key] = used;
            candidates = pool;
        }
        var q = shuffle(candidates)[0];
        used[q.id] = true;
        return q;
    }

    function appendDiagnosisQuestion() {
        var q = pickDiagnosisQuestion(STATE.diagnosis.currentLevel);
        if (!q) return false;
        STATE.questions.push(q);
        return true;
    }

    function startDiagnosis() {
        STATE.mode = 'diagnosis';
        STATE.diagnosis = {
            currentLevel: 1,
            correctAtLevel: 0,
            wrongTotal: 0,
            used: {},
            complete: false
        };
        STATE.recommendLevel = 1;
        STATE.quizLevel = '診断';
        STATE.questions = [];
        STATE.currentIdx = 0;
        STATE.results = [];
        if (!appendDiagnosisQuestion()) {
            alert('診断用の問題を準備できませんでした。');
            showScreen('start');
            return;
        }
        var quizLevelLabel = $('rq-quiz-level');
        if (quizLevelLabel) quizLevelLabel.textContent = '診断 Lv1';
        showScreen('quiz');
        renderCurrent();
    }

    function renderCurrent() {
        var q = STATE.questions[STATE.currentIdx];
        STATE.currentChoices = shuffle(q.choices);
        STATE.answered = false;

        var qid = $('rq-qid');
        if (qid) {
            qid.textContent = STATE.mode === 'diagnosis'
                ? '診断中 Lv' + q.level + ' / 問題ID: ' + q.id
                : '問題ID: ' + q.id + '  (出題元 Lv' + q.level + ')';
        }
        $('rq-question').innerHTML = q.question;

        var total = STATE.questions.length;
        if (STATE.mode === 'diagnosis') {
            $('rq-progress').textContent = '診断 ' + (STATE.currentIdx + 1) + '問目 / Lv' + q.level;
        } else {
            $('rq-progress').textContent = (STATE.currentIdx + 1) + ' / ' + total;
        }
        var pct = STATE.mode === 'diagnosis'
            ? Math.min(100, ((Number(q.level) - 1) / 10) * 100)
            : (STATE.currentIdx) / total * 100;
        $('rq-progress-bar-inner').style.width = pct + '%';
        var nCorrect = STATE.results.filter(function (r) { return r.ok; }).length;
        $('rq-correct-count').textContent = nCorrect;

        var box = $('rq-choices');
        box.innerHTML = '';
        STATE.currentChoices.forEach(function (choice, idx) {
            var btn = document.createElement('button');
            btn.className = 'rq-choice';
            btn.type = 'button';
            btn.dataset.choiceIndex = idx;
            btn.innerHTML =
                '<span class="rq-num">' + (idx + 1) + ')</span>' +
                '<span class="rq-choice-body">' + choice + '</span>';
            btn.addEventListener('click', function () { onChoiceClick(idx); });
            box.appendChild(btn);
        });

        var fb = $('rq-feedback');
        fb.className = 'rq-feedback';
        fb.textContent = '';

        var nextBtn = $('rq-next');
        nextBtn.disabled = true;
        nextBtn.textContent =
            (STATE.mode !== 'diagnosis' && STATE.currentIdx + 1 >= total) ? '結果を見る' : '次へ';
    }

    function onChoiceClick(idx) {
        if (STATE.answered) return;
        var q = STATE.questions[STATE.currentIdx];
        var picked = STATE.currentChoices[idx];
        var correct = q.answer;
        var ok = (picked === correct);
        STATE.answered = true;

        var btns = document.querySelectorAll('#rq-choices .rq-choice');
        btns.forEach(function (b, i) {
            b.disabled = true;
            var c = STATE.currentChoices[i];
            if (c === correct) b.classList.add('correct');
            else if (i === idx) b.classList.add('wrong');
            else b.classList.add('fade');
        });

        var fb = $('rq-feedback');
        if (ok) {
            fb.className = 'rq-feedback ok';
            fb.innerHTML = '○ 正解！';
        } else {
            fb.className = 'rq-feedback ng';
            fb.innerHTML = '× 不正解。 正解: ' + correct;
        }

        STATE.results.push({
            q: q,
            picked: picked,
            correct: correct,
            ok: ok
        });

        if (STATE.mode === 'diagnosis' && STATE.diagnosis) {
            if (ok) {
                STATE.diagnosis.correctAtLevel += 1;
                if (STATE.diagnosis.correctAtLevel >= 2) {
                    if (STATE.diagnosis.currentLevel >= 10) {
                        STATE.recommendLevel = 10;
                        STATE.diagnosis.complete = true;
                    } else {
                        STATE.diagnosis.currentLevel += 1;
                        STATE.recommendLevel = STATE.diagnosis.currentLevel;
                        STATE.diagnosis.correctAtLevel = 0;
                    }
                }
            } else {
                STATE.diagnosis.wrongTotal += 1;
                STATE.recommendLevel = STATE.diagnosis.currentLevel;
                if (STATE.diagnosis.wrongTotal >= 3) {
                    STATE.diagnosis.complete = true;
                }
            }
        }

        var nCorrect = STATE.results.filter(function (r) { return r.ok; }).length;
        $('rq-correct-count').textContent = nCorrect;

        if (STATE.mode === 'diagnosis' && STATE.diagnosis && STATE.diagnosis.complete) {
            $('rq-next').textContent = '結果を見る';
        }
        $('rq-next').disabled = false;
    }

    function onNext() {
        if (!STATE.answered) return;
        if (STATE.mode === 'diagnosis') {
            if (STATE.diagnosis && STATE.diagnosis.complete) {
                finishQuiz();
                return;
            }
            STATE.currentIdx += 1;
            if (STATE.currentIdx >= STATE.questions.length && !appendDiagnosisQuestion()) {
                finishQuiz();
                return;
            }
            var quizLevelLabel = $('rq-quiz-level');
            if (quizLevelLabel) quizLevelLabel.textContent = '診断 Lv' + STATE.diagnosis.currentLevel;
            renderCurrent();
            return;
        }
        STATE.currentIdx += 1;
        if (STATE.currentIdx >= STATE.questions.length) {
            finishQuiz();
        } else {
            renderCurrent();
        }
    }

    function onAbort() {
        if (!confirm('クイズを中断して難易度選択に戻りますか？')) return;
        showScreen('start');
    }

    // ---------- result screen ----------

    function sendQuizAnalytics(level, correct, total, rate, pass, mode, recommendedLevel) {
        if (typeof window.gtag !== 'function') return;
        var params = {
            event_category: 'redstone_quiz',
            event_label: mode === 'diagnosis' ? 'Diagnosis Lv' + recommendedLevel : 'Lv' + level,
            value: correct,
            quiz_level: String(level),
            quiz_score: correct,
            quiz_total: total,
            quiz_rate: Math.round(rate * 100),
            quiz_pass: pass ? 1 : 0,
            quiz_mode: mode
        };
        if (mode === 'diagnosis') params.quiz_recommended_level = recommendedLevel;
        window.gtag('event', 'quiz_finish', params);
    }

    function finishQuiz() {
        var total = STATE.questions.length;
        var nCorrect = STATE.results.filter(function (r) { return r.ok; }).length;
        var rate = nCorrect / total;
        var passRate = STATE.config.passRate || 0.6;
        var pass = (rate >= passRate);
        var isDiagnosis = STATE.mode === 'diagnosis';

        $('rq-result-level').textContent = isDiagnosis ? '診断' : STATE.quizLevel;
        $('rq-result-correct').textContent = nCorrect;
        $('rq-result-total').textContent = total;
        $('rq-result-rate').textContent = isDiagnosis
            ? (Math.round(rate * 1000) / 10) + '%'
            : (Math.round(rate * 1000) / 10) + '% (合格ライン ' + Math.round(passRate * 100) + '%)';

        var badge = $('rq-result-badge');
        var recommendBox = $('rq-result-recommend');
        var recommendLevel = $('rq-result-recommend-level');
        var recommendButton = $('rq-start-recommend');
        if (isDiagnosis) {
            var rec = STATE.recommendLevel || 1;
            badge.textContent = 'Lv' + rec + 'から始めましょう';
            badge.className = 'rq-result-badge pass';
            if (recommendBox) recommendBox.classList.remove('hidden');
            if (recommendLevel) recommendLevel.textContent = 'Lv' + rec;
            if (recommendButton) recommendButton.classList.remove('hidden');
        } else if (pass) {
            badge.textContent = '◎ 合格';
            badge.className = 'rq-result-badge pass';
            if (recommendBox) recommendBox.classList.add('hidden');
            if (recommendButton) recommendButton.classList.add('hidden');
        } else {
            badge.textContent = '× 不合格';
            badge.className = 'rq-result-badge fail';
            if (recommendBox) recommendBox.classList.add('hidden');
            if (recommendButton) recommendButton.classList.add('hidden');
        }

        $('rq-retry').textContent = isDiagnosis ? 'もう一度診断する' : '同じLvでもう一度';

        var tbody = $('rq-result-tbody');
        tbody.innerHTML = '';
        STATE.results.forEach(function (r, i) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + (i + 1) + '</td>' +
                '<td class="rq-debug-cell">' + escapeAttr(r.q.id) + '</td>' +
                '<td>' + r.q.question + '</td>' +
                '<td>' + r.picked + '</td>' +
                '<td>' + r.correct + '</td>' +
                '<td class="' + (r.ok ? 'res-ok' : 'res-ng') + '">' + (r.ok ? '○' : '×') + '</td>';
            tbody.appendChild(tr);
        });

        STATE.history.push({
            at: new Date().toISOString(),
            level: STATE.quizLevel,
            total: total,
            correct: nCorrect,
            pass: isDiagnosis ? true : pass,
            recommendedLevel: isDiagnosis ? STATE.recommendLevel : null
        });
        if (STATE.history.length > 100) STATE.history.shift();
        saveHistory();
        sendQuizAnalytics(
            isDiagnosis ? 'diagnosis' : STATE.quizLevel,
            nCorrect,
            total,
            rate,
            isDiagnosis ? true : pass,
            isDiagnosis ? 'diagnosis' : 'normal',
            isDiagnosis ? (STATE.recommendLevel || 1) : null
        );

        showScreen('result');
    }

    function onRetry() {
        if (STATE.mode === 'diagnosis') startDiagnosis();
        else startQuiz(STATE.quizLevel);
    }
    function onBack() { showScreen('start'); }
    function onStartRecommend() {
        if (STATE.recommendLevel) startQuiz(STATE.recommendLevel);
    }
    function onExConfirmYes() { startQuiz('EX'); }
    function onExConfirmNo() { showScreen('start'); }

    // ---------- storage ----------

    function escapeAttr(s) {
        return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function saveHistory() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.history));
        } catch (e) { /* ignore */ }
    }
    function loadHistory() {
        try {
            var s = localStorage.getItem(STORAGE_KEY);
            if (s) {
                var arr = JSON.parse(s);
                if (Array.isArray(arr)) STATE.history = arr;
            }
        } catch (e) { /* ignore */ }
    }

    // ---------- init ----------

    function showLoadError(msg) {
        var box = $('rq-load-error');
        if (!box) return;
        box.style.display = 'block';
        box.textContent = msg;
    }

    function init() {
        loadHistory();
        if (isDebugMetaEnabled()) {
            document.body.classList.add('rq-show-debug-meta');
        }
        $('rq-next').addEventListener('click', onNext);
        $('rq-abort').addEventListener('click', onAbort);
        $('rq-retry').addEventListener('click', onRetry);
        $('rq-back').addEventListener('click', onBack);
        $('rq-start-recommend').addEventListener('click', onStartRecommend);
        $('rq-ex-yes').addEventListener('click', onExConfirmYes);
        $('rq-ex-no').addEventListener('click', onExConfirmNo);

        loadAll().then(function () {
            renderStart();
            showScreen('start');
        }).catch(function (e) {
            showLoadError(
                'データ読み込み失敗: ' + (e && e.message ? e.message : e) +
                '\n時間をおいて再読み込みしてください。'
            );
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
