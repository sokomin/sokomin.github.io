(function () {
    'use strict';

    var STATE = {
        questions: [],
        current: null,
        currentChoices: [],
        answered: false,
        stats: { total: 0, correct: 0, wrong: 0, streak: 0 },
        history: []
    };

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function pickQuestion() {
        // choices が4つ揃っている問題のみ出題対象
        var pool = STATE.questions.filter(function (q) {
            return Array.isArray(q.choices) && q.choices.length >= 4;
        });
        if (!pool.length) return null;
        // 直前と同じ問題はなるべく避ける
        var last = STATE.current ? STATE.current.id : null;
        var candidates = pool.filter(function (q) { return q.id !== last; });
        if (!candidates.length) candidates = pool;
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    function renderQuestion() {
        var q = pickQuestion();
        STATE.current = q;
        STATE.answered = false;
        STATE.currentChoices = shuffle(q.choices);

        document.getElementById('tq-qid').textContent = '問題ID: ' + q.id;
        document.getElementById('tq-question').textContent = q.question;

        var box = document.getElementById('tq-choices');
        box.innerHTML = '';
        STATE.currentChoices.forEach(function (choice, idx) {
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
        var btn = e.currentTarget;
        var picked = btn.dataset.choice;
        var correct = STATE.current.answer;
        var ok = (picked === correct);

        STATE.answered = true;
        STATE.stats.total += 1;
        if (ok) {
            STATE.stats.correct += 1;
            STATE.stats.streak += 1;
        } else {
            STATE.stats.wrong += 1;
            STATE.stats.streak = 0;
        }

        // 全選択肢を着色して非活性
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
    }

    function onSkip() {
        if (!STATE.current) return;
        // スキップは出題数に含めない
        renderQuestion();
    }

    function onNext() {
        renderQuestion();
    }

    function renderStats() {
        var s = STATE.stats;
        document.getElementById('tq-total').textContent = s.total;
        document.getElementById('tq-correct').textContent = s.correct;
        document.getElementById('tq-wrong').textContent = s.wrong;
        document.getElementById('tq-rate').textContent = s.total ? (Math.round(s.correct / s.total * 1000) / 10) + '%' : '-';
        document.getElementById('tq-streak').textContent = s.streak;

        // 本番想定: ランダム4〜6問のうち何問正解できそうか (=直近の正答率を本番出題数に掛ける、参考)
        if (s.total >= 4) {
            var rate = s.correct / s.total;
            var lo = Math.round(rate * 4 * 10) / 10;
            var hi = Math.round(rate * 6 * 10) / 10;
            document.getElementById('tq-passmark').textContent = lo + '〜' + hi + ' 問 / 4〜6問';
        } else {
            document.getElementById('tq-passmark').textContent = '-';
        }
    }

    function renderHistory() {
        var body = document.getElementById('tq-history-body');
        body.innerHTML = '';
        STATE.history.forEach(function (h, i) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + (i + 1) + '</td>' +
                '<td>' + escapeHtml(h.qid) + '</td>' +
                '<td>' + escapeHtml(truncate(h.question, 64)) + '</td>' +
                '<td>' + escapeHtml(h.picked) + '</td>' +
                '<td class="' + (h.ok ? 'res-ok' : 'res-ng') + '">' + (h.ok ? '○' : '×') + '</td>';
            body.appendChild(tr);
        });
    }

    function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function saveStats() {
        try {
            localStorage.setItem('trade_quiz_stats_v1', JSON.stringify(STATE.stats));
        } catch (e) { /* ignore */ }
    }
    function loadStats() {
        try {
            var s = localStorage.getItem('trade_quiz_stats_v1');
            if (s) {
                var obj = JSON.parse(s);
                if (obj && typeof obj.total === 'number') STATE.stats = obj;
            }
        } catch (e) { /* ignore */ }
    }

    function onResetStats() {
        if (!confirm('成績と履歴をリセットしますか？')) return;
        STATE.stats = { total: 0, correct: 0, wrong: 0, streak: 0 };
        STATE.history = [];
        saveStats();
        renderStats();
        renderHistory();
    }

    function loadDb() {
        return fetch('trade_quiz_db.json', { cache: 'no-store' })
            .then(function (r) { return r.json(); })
            .then(function (db) {
                STATE.questions = db.questions || [];
            });
    }

    function init() {
        loadStats();
        renderStats();
        renderHistory();

        document.getElementById('tq-next').addEventListener('click', onNext);
        document.getElementById('tq-skip').addEventListener('click', onSkip);
        document.getElementById('tq-reset-stats').addEventListener('click', onResetStats);

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
