(() => {
  'use strict';
  const colors = ['#64748b', '#2879c7', '#148578', '#229bb3', '#5d63bb', '#9357ba', '#c47b19', '#b65b68', '#6c7c23', '#925b38'];
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const percent = text => /^\d+(?:\.\d+)?%$/.test(text.trim()) ? Number(text.trim().slice(0, -1)) : null;
  const option = (value, text) => {
    const node = el('option', '', text);
    node.value = value;
    return node;
  };
  function read(table) {
    const rows = Array.from(table.rows);
    return {
      headers: Array.from(rows[0].cells, cell => cell.innerText.trim().replace(/\s+/g, ' ')),
      rows: rows.slice(1).map(row => Array.from(row.cells, cell => cell.textContent.trim()))
    };
  }
  function labeledSelect(label, select) {
    const wrap = el('label', 'prob-chart-control');
    wrap.append(el('span', '', label), select);
    return wrap;
  }
  function tierChart(data, name) {
    const view = el('div', 'prob-tier-chart');
    const legend = el('div', 'prob-tier-legend');
    const select = el('select', 'prob-chart-select');
    select.setAttribute('aria-label', name + ' 比較するTier');
    data.rows.forEach((row, index) => select.append(option(index, row[0])));
    const breakdown = el('div', 'prob-tier-comparison');
    const legendButtons = [];
    const update = () => {
      const index = Number(select.value);
      const row = data.rows[index];
      breakdown.replaceChildren();
      legendButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      data.headers.slice(1).forEach((header, column) => {
        const metric = el('div', 'prob-tier-metric');
        metric.append(el('span', 'prob-metric-label', header.split(' ')[0] + ' / ' + row[0]), el('strong', 'prob-metric-value', row[column + 1]));
        if (percent(row[column + 1]) === null) metric.append(el('span', 'prob-metric-empty', '実測なし'));
        breakdown.append(metric);
      });
    };
    data.rows.forEach((row, index) => {
      const button = el('button', 'prob-tier-key', row[0]);
      button.type = 'button';
      button.style.setProperty('--tier-color', colors[index % colors.length]);
      button.addEventListener('click', () => { select.value = String(index); update(); });
      legendButtons.push(button);
      legend.append(button);
    });
    const plot = el('div', 'prob-stacked-plot');
    const axis = el('div', 'prob-stack-axis');
    ['0%', '25%', '50%', '75%', '100%'].forEach(tick => axis.append(el('span', '', tick)));
    plot.append(axis);
    data.headers.slice(1).forEach((header, column) => {
      const parts = header.split(' ');
      const row = el('div', 'prob-stack-row');
      const label = el('div', 'prob-stack-label');
      label.append(el('strong', '', parts[0]), el('span', '', parts.slice(1).join(' ')));
      const track = el('div', 'prob-stack-track');
      track.setAttribute('role', 'group');
      track.setAttribute('aria-label', name + ' ' + header);
      const values = data.rows.map(cells => percent(cells[column + 1]));
      if (values.every(value => value === null)) {
        track.classList.add('prob-no-sample');
        track.append(el('span', '', '実測なし'));
      } else {
        data.rows.forEach((cells, index) => {
          const value = values[index];
          if (value === null || value === 0) return;
          const segment = el('button', 'prob-stack-segment', value >= 8 ? cells[0] + ' ' + cells[column + 1] : '');
          segment.type = 'button';
          segment.style.width = value + '%';
          segment.style.backgroundColor = colors[index % colors.length];
          segment.dataset.value = String(value);
          segment.setAttribute('aria-label', parts[0] + ' ' + cells[0] + ' ' + cells[column + 1]);
          segment.title = parts[0] + ' · ' + cells[0] + ' · ' + cells[column + 1];
          segment.addEventListener('click', () => { select.value = String(index); update(); });
          track.append(segment);
        });
      }
      row.append(label, track);
      plot.append(row);
    });
    const comparisonHeader = el('div', 'prob-comparison-header');
    comparisonHeader.append(labeledSelect('Tierを比較', select));
    view.append(legend, plot, comparisonHeader, breakdown);
    select.addEventListener('change', update);
    update();
    return view;
  }
  function opChart(data, name) {
    const view = el('div', 'prob-op-chart');
    const tiers = data.headers.slice(3);
    const colorFor = tier => colors[Number(tier.replace('Tier', '')) % colors.length];
    const legend = el('div', 'prob-op-legend');
    tiers.forEach(tier => {
      const key = el('span', 'prob-op-key', tier);
      key.style.setProperty('--tier-color', colorFor(tier));
      legend.append(key);
    });
    const header = el('div', 'prob-op-heading');
    header.append(el('span', '', 'OP'), el('span', '', 'OP内のTier分布'), el('span', 'prob-op-rate-heading', data.headers[2]));
    const axis = el('div', 'prob-op-axis');
    ['0%', '25%', '50%', '75%', '100%'].forEach(tick => axis.append(el('span', '', tick)));
    const rows = el('div', 'prob-op-rows');
    data.rows.forEach(cells => {
      const row = el('div', 'prob-op-row');
      const track = el('div', 'prob-op-track');
      const distribution = tiers.map((tier, index) => tier + ' ' + cells[index + 3]).join('、');
      track.setAttribute('role', 'img');
      track.setAttribute('aria-label', cells[0] + '：' + distribution);
      track.tabIndex = 0;
      track.title = cells[0] + '：' + distribution;
      tiers.forEach((tier, index) => {
        const value = percent(cells[index + 3]);
        if (value === null || value === 0) return;
        const segment = el('span', 'prob-op-segment', value >= 8 ? cells[index + 3] : '');
        segment.dataset.tier = tier;
        segment.dataset.value = String(value);
        segment.style.width = value + '%';
        segment.style.backgroundColor = colorFor(tier);
        segment.title = cells[0] + ' · ' + tier + ' · ' + cells[index + 3];
        track.append(segment);
      });
      if (cells.slice(3).every(value => percent(value) === null)) {
        track.classList.add('prob-no-sample');
        track.append(el('span', '', '実測なし'));
      }
      row.dataset.op = cells[0];
      row.append(el('span', 'prob-op-name', cells[0]), track, el('strong', 'prob-op-value', cells[2]));
      rows.append(row);
    });
    view.append(legend, header, axis, rows);
    return view;
  }
  const tables = new Map(Array.from(document.querySelectorAll('.probability-scroll table[data-table]'), table => [table.dataset.table, table]));
  document.querySelectorAll('[data-probability-chart-for]').forEach(mount => {
    const id = mount.dataset.probabilityChartFor;
    const table = tables.get(id);
    if (!table) return;
    const data = read(table);
    const isOp = table.classList.contains('op-distribution');
    const heading = mount.previousElementSibling;
    const name = heading && /^H[2-4]$/.test(heading.tagName) ? heading.textContent.trim() : 'Tier分布';
    const chart = isOp ? opChart(data, name) : tierChart(data, name);
    const card = el('section', 'prob-chart-card');
    card.setAttribute('aria-label', name + ' 確率グラフ');
    card.dataset.chart = id;
    const toolbar = el('div', 'prob-chart-toolbar');
    const title = el('strong', 'prob-chart-title', isOp ? 'OPの出現率' : 'Tier分布');
    chart.id = 'prob-chart-' + id;
    toolbar.append(title);
    card.append(toolbar, chart);
    mount.replaceWith(card);
  });
})();
