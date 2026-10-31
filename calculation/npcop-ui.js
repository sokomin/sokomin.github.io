(function () {
  'use strict';
  const data = globalThis.NPCOP_DATA;
  const sim = new NpcopSimulator.Simulator(data);
  const $ = id => document.getElementById(id);
  const key = 'sokomin:npcop-simulator:v1';
  const format = n => n.toLocaleString('ja-JP');
  let selectedSlot = 0, selectedOption = null, page = 0, running = false, stop = false;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  function message(text, kind = '') {
    $('outcome').textContent = text;
    $('outcome').dataset.kind = kind;
  }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(sim.snapshot())); }
    catch { $('save-error').textContent = '記録を保存できません。履歴をCSVで保存してください。'; }
  }
  try {
    const saved = localStorage.getItem(key);
    if (saved) sim.restore(JSON.parse(saved));
  } catch { $('save-error').textContent = '前回の記録を読み込めませんでした。'; }

  for (const group of ['武器', '補助武器', '防具']) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group;
    for (const p of data.parts.filter(p => p.group === group)) {
      const option = document.createElement('option');
      option.value = p.id; option.textContent = p.label; optgroup.append(option);
    }
    $('part').append(optgroup);
  }
  $('part').value = sim.item.part;
  function renderChoices() {
    const options = sim.options();
    if (!options.some(o => o.id === selectedOption)) selectedOption = null;
    $('op-count').textContent = `${options.length}種`;
    $('op-list').innerHTML = options.map(op => `<button type="button" class="op-choice ${op.id === selectedOption ? 'chosen' : ''}" data-op="${esc(op.id)}" aria-pressed="${op.id === selectedOption}"><strong>${esc(op.name)}</strong><span>${esc(op.effect)}</span><small>${op.slots.join('・')}OP目${op.kind !== 'other' ? ' ／ 増幅可' : ''}</small></button>`).join('');
    $('op-list').querySelectorAll('[data-op]').forEach(button => {
      button.disabled = running;
      button.addEventListener('click', () => { selectedOption = button.dataset.op; renderChoices(); renderAttach(); });
    });
  }
  function renderAttach() {
    const reason = selectedOption ? sim.canAttach(selectedOption, selectedSlot) : '付与するOPを選択';
    $('attach').disabled = !!reason || running;
    $('attach-hint').textContent = reason || `成功率100% ／ お守り1個`;
  }
  function renderPreview() {
    const part = data.parts.find(p => p.id === sim.item.part);
    const level = Math.min(9999, Math.max(1, Number($('level').value) || 1));
    const slots = sim.item.slots;
    const title = slots.filter(s => s?.kind === 'npc').map(s => `[${sim.describe(s).name}]`).join('') + part.label;
    $('item-name').textContent = title;
    $('item-icon').src = part.icon;
    $('item-part').textContent = part.label;
    $('item-broken').textContent = sim.item.broken ? '［壊れたアイテム］' : '';
    $('item-ops').innerHTML = slots.map((s, i) => {
      const d = sim.describe(s, level);
      return `<div class="${s?.kind === 'npc' ? 'item-op' : 'item-muted'}">${s?.kind === 'npc' ? `<b>[${esc(d.name)}]</b><br>` : ''}${i + 1}OP目：${esc(d.effect)}${d.value !== undefined ? `<br>　Lv${Math.min(level, 2000)}：${esc(s.stat)} +${format(d.value)}` : ''}</div>`;
    }).join('');
    $('slots').innerHTML = slots.map((slot, i) => {
      const d = sim.describe(slot);
      return `<button type="button" class="slot-card ${i === selectedSlot ? 'selected' : ''}" data-slot="${i}" aria-pressed="${i === selectedSlot}" ${running ? 'disabled' : ''}>${i + 1}OP目<strong>${esc(d.name)}</strong><small>${slot?.kind === 'npc' ? (slot.stage ? `${slot.stage}段階` : '未増幅') : slot ? '付与で上書き' : '空き枠'}</small></button>`;
    }).join('');
    $('slots').querySelectorAll('[data-slot]').forEach(button => button.addEventListener('click', () => { selectedSlot = Number(button.dataset.slot); render(); }));
    const slot = slots[selectedSlot];
    $('prepare').disabled = slot?.kind === 'npc' || sim.item.broken || running;
    $('prepare').textContent = slot ? '選択枠の通常OPを外す' : '選択枠に通常OPをセット';
    $('target').value = String(selectedSlot);
    $('repair').disabled = !sim.item.broken || running;
  }
  function renderAmplification() {
    const slot = sim.item.slots[selectedSlot];
    const ratio = slot?.kind === 'npc' && sim.definition(slot.id).kind === 'ratio';
    for (const option of $('goal').options) option.disabled = ratio && Number(option.value) < 4;
    if (ratio && Number($('goal').value) < 4) $('goal').value = '4';
    const next = sim.next(selectedSlot, $('method').value);
    $('next-stage').textContent = next ? `${next.stage}段階へ` : slot?.kind === 'npc' && slot.stage === 7 ? '最大段階' : '増幅対象なし';
    $('success-rate').textContent = next ? `${next.success}%` : '—';
    $('failure-rate').textContent = next ? `${next.failure}%` : '—';
    $('destruction-rate').textContent = next ? `${next.destruction}%` : '—';
    $('attempt-cost').textContent = next ? `1回：金のインゴット ${next.ingot}個${next.charm ? ` ＋ お守り ${next.charm}個` : ''}` : slot?.kind === 'npc' && data.options.find(o => o.id === slot.id).kind === 'other' ? '固定値・比率のステータスOPが増幅対象です。' : '増幅する宿命OPの枠を選択';
    $('amplify').disabled = !next || sim.item.broken || running;
    $('batch').disabled = !next || sim.item.broken || running;
    $('stop').disabled = !running;
    for (const id of ['part', 'new-item', 'target', 'method', 'goal', 'limit', 'auto-repair', 'reset']) $(id).disabled = running;
  }
  function renderLedger() {
    const totals = sim.state.totals;
    $('total-ingot').textContent = format(totals.ingot);
    $('total-charm').textContent = format(totals.charm);
    $('total-repair').textContent = format(totals.repair);
    $('stat-line').textContent = `付与 ${format(totals.attach)}回 ／ 増幅 ${format(totals.attempts)}回（成功 ${format(totals.success)}・失敗 ${format(totals.failure)}・破壊 ${format(totals.destruction)}）`;
    $('material-list').innerHTML = Object.entries(sim.state.materials).map(([name, n]) => `<span>${esc(name)}：${format(n)}個</span>`).join('');
    const history = sim.state.history;
    const pages = Math.max(1, Math.ceil(history.length / 25));
    page = Math.min(page, pages - 1);
    const entries = history.slice().reverse().slice(page * 25, (page + 1) * 25);
    $('history-body').innerHTML = entries.length ? entries.map(e => `<tr><td>${e.no}</td><td>#${e.item} ${esc(e.part)}${e.slot ? `<br>${e.slot}OP目` : ''}</td><td>${esc(e.action)}<br>${esc(e.result)}</td><td>${Object.entries(e.costs).map(([name,n]) => `${esc(name)} ×${n}`).join('<br>') || '—'}</td><td>インゴット ${format(e.ingot)}<br>お守り ${format(e.charm)}<br>鉄床 ${format(e.repair)}</td></tr>`).join('') : '<tr><td colspan="5">履歴はありません。</td></tr>';
    $('log-title').textContent = history.length === NpcopSimulator.HISTORY_LIMIT ? '消費・試行履歴（直近5,000件）' : '消費・試行履歴';
    $('page-number').textContent = `${page + 1} / ${pages}`;
    $('previous').disabled = page === 0;
    $('next').disabled = page >= pages - 1;
  }
  function renderRequirement() {
    const config = sim.item.requirement;
    $('requirement-base').value = config.base;
    $('requirement-mode').value = config.mode;
    $('requirement-down').value = config.reduction;
    sim.item.slots.forEach((slot, index) => {
      const input = $(`requirement-op-${index}`);
      input.disabled = slot?.kind !== 'ordinary';
      input.value = input.disabled ? 0 : config.op[index];
      $(`requirement-slot-${index}`).textContent = slot?.kind === 'npc' ? 'NPCOP：+0' : slot ? '' : '空き枠：+0';
    });
    const level = format(sim.requiredLevel());
    $('required-level').textContent = level;
    $('item-required-level').textContent = level;
    $('requirement-error').textContent = '';
  }
  function updateRequirement() {
    const number = id => {
      const input = $(id);
      if (input.validity.badInput) throw new Error('要求レベルには0以上の整数を入力してください。');
      return input.value === '' ? 0 : Number(input.value);
    };
    try {
      const level = sim.setRequirement({ base: number('requirement-base'), mode: $('requirement-mode').value, reduction: number('requirement-down'), op: [0, 1, 2].map(index => number(`requirement-op-${index}`)) });
      $('required-level').textContent = format(level);
      $('item-required-level').textContent = format(level);
      $('requirement-error').textContent = '';
      persist();
    } catch (error) {
      $('required-level').textContent = '—';
      $('item-required-level').textContent = '—';
      $('requirement-error').textContent = error.message;
    }
  }
  function render() { renderPreview(); renderAttach(); renderAmplification(); renderLedger(); renderRequirement(); }
  function perform(fn) {
    try { const entry = fn(); page = 0; persist(); render(); message(entry.result, entry.result.startsWith('成功') ? 'success' : entry.result.startsWith('破壊') ? 'destruction' : ''); }
    catch (error) { message(error.message, 'error'); render(); }
  }
  $('part').addEventListener('change', () => { perform(() => sim.newItem($('part').value)); selectedOption = null; selectedSlot = 0; renderChoices(); render(); });
  $('new-item').addEventListener('click', () => { selectedSlot = 0; perform(() => sim.newItem()); });
  $('prepare').addEventListener('click', () => perform(() => sim.prepare(selectedSlot)));
  $('attach').addEventListener('click', () => perform(() => sim.attach(selectedOption, selectedSlot)));
  $('target').addEventListener('change', () => { selectedSlot = Number($('target').value); render(); });
  $('method').addEventListener('change', renderAmplification);
  $('level').addEventListener('input', renderPreview);
  for (const id of ['requirement-base', 'requirement-down', 'requirement-op-0', 'requirement-op-1', 'requirement-op-2']) $(id).addEventListener('input', updateRequirement);
  $('requirement-mode').addEventListener('change', updateRequirement);
  $('amplify').addEventListener('click', () => perform(() => sim.amplify(selectedSlot, $('method').value)));
  $('repair').addEventListener('click', () => perform(() => sim.repair()));
  $('stop').addEventListener('click', () => { stop = true; });
  $('batch').addEventListener('click', async () => {
    const goal = Number($('goal').value), limit = Number($('limit').value);
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) { message('試行上限は1～1,000回で指定してください。', 'error'); return; }
    const slot = sim.item.slots[selectedSlot];
    if (!slot || slot.stage >= goal) { message('目標段階に到達しています。'); return; }
    const target = selectedSlot, method = $('method').value, autoRepair = $('auto-repair').checked;
    let attempts = 0;
    running = true; stop = false; renderChoices(); render();
    try {
      while (!stop && attempts < limit && sim.item.slots[target].stage < goal) {
        if (sim.item.broken) { if (!autoRepair) break; sim.repair(); }
        sim.amplify(target, method); attempts++;
        if (attempts % 10 === 0) { render(); persist(); await new Promise(resolve => setTimeout(resolve, 20)); }
      }
      const stage = sim.item.slots[target].stage;
      message(`${attempts}回試行 ／ ${stage ? stage + '段階' : '未増幅'}${sim.item.broken ? ' ／ 装備破損' : ''}${stop ? ' ／ 停止' : stage >= goal ? ' ／ 目標達成' : attempts >= limit ? ' ／ 試行上限' : ''}`, stage >= goal ? 'success' : sim.item.broken ? 'destruction' : '');
    } catch (error) { message(error.message, 'error'); }
    finally { running = false; page = 0; persist(); renderChoices(); render(); }
  });
  $('previous').addEventListener('click', () => { page--; renderLedger(); });
  $('next').addEventListener('click', () => { page++; renderLedger(); });
  $('export').addEventListener('click', () => {
    const cell = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
    const rows = [['No', '装備', '部位', 'OP枠', '操作', '結果', '消費', '累計インゴット', '累計お守り', '累計鉄床'], ...sim.state.history.map(e => [e.no, e.item, e.part, e.slot, e.action, e.result, Object.entries(e.costs).map(([k,v]) => `${k} ×${v}`).join(' / '), e.ingot, e.charm, e.repair]), [], ['消費累計', '個数'], ...Object.entries(sim.state.materials)];
    const blob = new Blob(['\ufeff' + rows.map(row => row.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'npcop-simulator-log.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('reset').addEventListener('click', () => {
    if (!confirm('装備・消費累計・履歴をすべてリセットしますか？')) return;
    const fresh = new NpcopSimulator.Simulator(data);
    sim.restore(fresh.snapshot()); selectedSlot = 0; selectedOption = null; page = 0;
    $('part').value = sim.item.part; persist(); renderChoices(); render(); message('');
  });
  renderChoices(); render();
})();
