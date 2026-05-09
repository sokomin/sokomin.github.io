(function () {
    'use strict';

    var TA_DURATION = 60;            // 秒
    var DELAY_CORRECT = 300;         // ms (タイムアタック・正解)
    var DELAY_WRONG = 1000;          // ms (タイムアタック・不正解、正解表示を読む時間)

    var STATE = {
        questions: [],
        current: null,
        answered: false,
        mode: 'practice',
        stats: { total: 0, correct: 0, wrong: 0, streak: 0 },
        history: [],
        ta: {
            running: false,
            timeLeft: TA_DURATION,
            correct: 0,
            wrong: 0,
            best: 0,
            timerHandle: null,
            advanceHandle: null
        }
    };

    function pickQuestion() {
        var pool = STATE.questions;
        if (!pool.length) return null;
        var last = STATE.current ? STATE.current.id : null;
        var candidates = pool.filter(function (q) { return q.id !== last; });
        if (!candidates.length) candidates = pool;
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    function renderQuestion() {
        var q = pickQuestion();
        STATE.current = q;
        STATE.answered = false;

        document.getElementById('tq-qid').textContent = '問題ID: ' + q.id;
        document.getElementById('tq-question').textContent = q.question;

        var box = document.getElementById('tq-choices');
        box.innerHTML = '';
        q.choices.forEach(function (choice, idx) {
            var btn = document.createElement('button');
            btn.className = 'tq-choice';
            btn.type = 'button';
            btn.dataset.choice = choice;
            btn.innerHTML = '<span class="tq-num">' + (idx + 1) + ')</span><span>' + escapeHtml(choice) + '</span>';
            btn.addEventListener('click', onChoiceClick);
            box.appendChild(btn);
        });

        var fb = document.getElementById('tq-feedback');
        fb.className = 'tq-feedback';
        fb.textContent = '';

        document.getElementById('tq-next').disabled = true;
    }

    function onChoiceClick(e) {
        if (STATE.answered) return;
        if (STATE.mode === 'ta' && !STATE.ta.running) return;

        var btn = e.currentTarget;
        var picked = btn.dataset.choice;
        var correct = STATE.current.answer;
        var ok = (picked === correct);

        STATE.answered = true;

        var allBtns = document.querySelectorAll('#tq-choices .tq-choice');
        allBtns.forEach(function (b) {
            b.disabled = true;
            if (b.dataset.choice === correct) {
                b.classList.add('correct');
            } else if (b === btn) {
                b.classList.add('wrong');
            } else {
                b.classList.add('fade');
            }
        });

        var fb = document.getElementById('tq-feedback');
        if (ok) {
            fb.className = 'tq-feedback ok';
            fb.textContent = '○ 正解！';
        } else {
            fb.className = 'tq-feedback ng';
            fb.textContent = '× 不正解。 正解: ' + correct;
        }

        if (STATE.mode === 'practice') {
            STATE.stats.total += 1;
            if (ok) {
                STATE.stats.correct += 1;
                STATE.stats.streak += 1;
            } else {
                STATE.stats.wrong += 1;
                STATE.stats.streak = 0;
            }
            STATE.history.unshift({
                qid: STATE.current.id,
                question: STATE.current.question,
                picked: picked,
                ok: ok
            });
            if (STATE.history.length > 50) STATE.history.length = 50;

            document.getElementById('tq-next').disabled = false;
            renderStats();
            renderHistory();
            saveStats();
        } else {
            // タイムアタック
            if (ok) STATE.ta.correct += 1;
            else STATE.ta.wrong += 1;
            renderTaStats();
            // 自動で次の問題へ
            var delay = ok ? DELAY_CORRECT : DELAY_WRONG;
            STATE.ta.advanceHandle = setTimeout(function () {
                STATE.ta.advanceHandle = null;
                if (STATE.ta.running) renderQuestion();
            }, delay);
        }
    }

    function onSkip() {
        if (!STATE.current) return;
        renderQuestion();
    }

    function onNext() {
        renderQuestion();
    }

    // -------- 練習モード stats --------
    function renderStats() {
        var s = STATE.stats;
        document.getElementById('tq-total').textContent = s.total;
        document.getElementById('tq-correct').textContent = s.correct;
        document.getElementById('tq-wrong').textContent = s.wrong;
        document.getElementById('tq-rate').textContent = s.total ? (Math.round(s.correct / s.total * 1000) / 10) + '%' : '-';
        document.getElementById('tq-streak').textContent = s.streak;
    }

    function renderHistory() {
        var body = document.getElementById('tq-history-body');
        body.innerHTML = '';
        STATE.history.forEach(function (h, i) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + (i + 1) + '</td>' +
                '<td>' + escapeHtml(String(h.qid)) + '</td>' +
                '<td>' + escapeHtml(truncate(h.question, 64)) + '</td>' +
                '<td>' + escapeHtml(truncate(h.picked, 32)) + '</td>' +
                '<td class="' + (h.ok ? 'res-ok' : 'res-ng') + '">' + (h.ok ? '○' : '×') + '</td>';
            body.appendChild(tr);
        });
    }

    // -------- タイムアタック --------
    function renderTaStats() {
        document.getElementById('tq-ta-timer').textContent = STATE.ta.timeLeft;
        document.getElementById('tq-ta-correct').textContent = STATE.ta.correct;
        document.getElementById('tq-ta-wrong').textContent = STATE.ta.wrong;
        document.getElementById('tq-ta-best').textContent = STATE.ta.best || '-';

        var timer = document.getElementById('tq-ta-timer');
        if (STATE.ta.timeLeft <= 10 && STATE.ta.running) timer.classList.add('warn');
        else timer.classList.remove('warn');
    }

    function startTa() {
        clearTaTimers();
        STATE.ta.running = true;
        STATE.ta.timeLeft = TA_DURATION;
        STATE.ta.correct = 0;
        STATE.ta.wrong = 0;
        STATE.current = null;
        document.getElementById('tq-ta-result').classList.add('hidden');
        document.getElementById('tq-ta-start').classList.add('hidden');
        document.getElementById('tq-ta-stop').classList.remove('hidden');
        renderTaStats();
        renderQuestion();

        STATE.ta.timerHandle = setInterval(function () {
            STATE.ta.timeLeft -= 1;
            if (STATE.ta.timeLeft <= 0) {
                STATE.ta.timeLeft = 0;
                renderTaStats();
                endTa();
            } else {
                renderTaStats();
            }
        }, 1000);
    }

    function endTa() {
        clearTaTimers();
        STATE.ta.running = false;

        var score = STATE.ta.correct;
        var isBest = score > STATE.ta.best;
        if (isBest) {
            STATE.ta.best = score;
            saveTaBest();
        }

        // 結果画面
        document.getElementById('tq-ta-result-score').textContent = score + ' 問正解';
        var detail = '不正解: ' + STATE.ta.wrong + ' 問';
        if (isBest && score > 0) {
            detail += '<br><span class="best-new">★ ベスト記録更新！</span>';
        } else if (STATE.ta.best > 0) {
            detail += '<br>ベスト: ' + STATE.ta.best + ' 問';
        }
        document.getElementById('tq-ta-result-detail').innerHTML = detail;
        document.getElementById('tq-ta-result').classList.remove('hidden');
        document.getElementById('tq-ta-start').classList.add('hidden');
        document.getElementById('tq-ta-stop').classList.add('hidden');

        // 問題エリアを無効化
        var btns = document.querySelectorAll('#tq-choices .tq-choice');
        btns.forEach(function (b) { b.disabled = true; });
        renderTaStats();
    }

    function stopTa() {
        if (!STATE.ta.running) return;
        if (!confirm('タイムアタックを中断しますか？')) return;
        STATE.ta.timeLeft = 0;
        endTa();
    }

    function clearTaTimers() {
        if (STATE.ta.timerHandle) {
            clearInterval(STATE.ta.timerHandle);
            STATE.ta.timerHandle = null;
        }
        if (STATE.ta.advanceHandle) {
            clearTimeout(STATE.ta.advanceHandle);
            STATE.ta.advanceHandle = null;
        }
    }

    // -------- モード切替 --------
    function switchMode(mode) {
        if (STATE.mode === mode) return;
        // 進行中のTAは中断
        if (STATE.mode === 'ta' && STATE.ta.running) {
            clearTaTimers();
            STATE.ta.running = false;
        }
        STATE.mode = mode;

        document.getElementById('tq-tab-practice').classList.toggle('active', mode === 'practice');
        document.getElementById('tq-tab-ta').classList.toggle('active', mode === 'ta');

        document.getElementById('tq-section-practice-stats').classList.toggle('hidden', mode !== 'practice');
        document.getElementById('tq-section-ta-stats').classList.toggle('hidden', mode !== 'ta');
        document.getElementById('tq-section-history').classList.toggle('hidden', mode !== 'practice');
        document.getElementById('tq-actions-practice').classList.toggle('hidden', mode !== 'practice');

        if (mode === 'practice') {
            // 練習モードに戻ったら新しい問題を1問
            renderQuestion();
        } else {
            // タイムアタック初期表示
            document.getElementById('tq-ta-result').classList.add('hidden');
            document.getElementById('tq-ta-start').classList.remove('hidden');
            document.getElementById('tq-ta-stop').classList.add('hidden');
            STATE.ta.timeLeft = TA_DURATION;
            STATE.ta.correct = 0;
            STATE.ta.wrong = 0;
            renderTaStats();
            // 開始前は問題エリアに案内
            document.getElementById('tq-qid').textContent = '';
            document.getElementById('tq-question').textContent = '「スタート」を押すと開始します。';
            document.getElementById('tq-choices').innerHTML = '';
            document.getElementById('tq-feedback').className = 'tq-feedback';
            document.getElementById('tq-feedback').textContent = '';
        }
    }

    // -------- ユーティリティ --------
    function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function saveStats() {
        try { localStorage.setItem('dg_hard_quiz_stats_v1', JSON.stringify(STATE.stats)); } catch (e) {}
    }
    function loadStats() {
        try {
            var s = localStorage.getItem('dg_hard_quiz_stats_v1');
            if (s) {
                var obj = JSON.parse(s);
                if (obj && typeof obj.total === 'number') STATE.stats = obj;
            }
        } catch (e) {}
    }
    function saveTaBest() {
        try { localStorage.setItem('dg_hard_quiz_ta_best_v1', String(STATE.ta.best)); } catch (e) {}
    }
    function loadTaBest() {
        try {
            var s = localStorage.getItem('dg_hard_quiz_ta_best_v1');
            if (s) STATE.ta.best = parseInt(s, 10) || 0;
        } catch (e) {}
    }

    function onResetStats() {
        if (!confirm('練習モードの成績と履歴をリセットしますか？')) return;
        STATE.stats = { total: 0, correct: 0, wrong: 0, streak: 0 };
        STATE.history = [];
        saveStats();
        renderStats();
        renderHistory();
    }
    function onResetTaBest() {
        if (!confirm('タイムアタックのベスト記録をリセットしますか？')) return;
        STATE.ta.best = 0;
        saveTaBest();
        renderTaStats();
    }

    function loadDb() {
        return fetch('dg_hard_quiz_db.json', { cache: 'no-store' })
            .then(function (r) { return r.json(); })
            .then(function (db) {
                STATE.questions = (db.questions || []).filter(function (q) {
                    return Array.isArray(q.choices) && q.choices.length >= 2;
                });
            });
    }

    function init() {
        loadStats();
        loadTaBest();
        renderStats();
        renderHistory();
        renderTaStats();

        document.getElementById('tq-next').addEventListener('click', onNext);
        document.getElementById('tq-skip').addEventListener('click', onSkip);
        document.getElementById('tq-reset-stats').addEventListener('click', onResetStats);
        document.getElementById('tq-tab-practice').addEventListener('click', function () { switchMode('practice'); });
        document.getElementById('tq-tab-ta').addEventListener('click', function () { switchMode('ta'); });
        document.getElementById('tq-ta-start').addEventListener('click', startTa);
        document.getElementById('tq-ta-stop').addEventListener('click', stopTa);
        document.getElementById('tq-ta-restart').addEventListener('click', startTa);
        document.getElementById('tq-ta-reset-best').addEventListener('click', onResetTaBest);

        loadDb().then(function () {
            if (!STATE.questions.length) {
                document.getElementById('tq-question').textContent = '問題データの読み込みに失敗しました。';
                return;
            }
            renderQuestion();
        }).catch(function (e) {
            document.getElementById('tq-question').textContent = '問題データの読み込みエラー: ' + e;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
