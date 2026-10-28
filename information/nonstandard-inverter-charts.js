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
  function opChart(sokomin_opData, name) {
    const sokomin_view = el('div', 'prob-op-chart');
    const min_tiers = sokomin_opData.headers.slice(3);
    const tierColor_min = tier => colors[Number(tier.replace('Tier', '')) % colors.length];
    const sokomin_legend = el('div', 'prob-op-legend');
    min_tiers.forEach(tier => {
      const key = el('span', 'prob-op-key', tier);
      key.style.setProperty('--tier-color', tierColor_min(tier));
      sokomin_legend.append(key);
    });
    const header = el('div', 'prob-op-heading');
    header.append(el('span', '', 'OP'), el('span', '', 'OP内のTier分布'), el('span', 'prob-op-rate-heading', sokomin_opData.headers[2]));
    const axis = el('div', 'prob-op-axis');
    ['0%', '25%', '50%', '75%', '100%'].forEach(tick => axis.append(el('span', '', tick)));
    const min_rows = el('div', 'prob-op-rows');
    sokomin_opData.rows.forEach(cells => {
      const sokomin_row = el('div', 'prob-op-row');
      const min_track = el('div', 'prob-op-track');
      const sokomin_distribution = min_tiers.map((tier, index) => tier + ' ' + cells[index + 3]).join('、');
      min_track.setAttribute('role', 'img');
      min_track.setAttribute('aria-label', cells[0] + '：' + sokomin_distribution);
      min_track.tabIndex = 0;
      min_track.title = cells[0] + '：' + sokomin_distribution;
      min_tiers.forEach((tier, index) => {
        const value = percent(cells[index + 3]);
        if (value === null || value === 0) return;
        const segment_sokomin = el('span', 'prob-op-segment', value >= 8 ? cells[index + 3] : '');
        segment_sokomin.dataset.tier = tier;
        segment_sokomin.dataset.value = String(value);
        segment_sokomin.style.width = value + '%';
        segment_sokomin.style.backgroundColor = tierColor_min(tier);
        segment_sokomin.title = cells[0] + ' · ' + tier + ' · ' + cells[index + 3];
        min_track.append(segment_sokomin);
      });
      if (cells.slice(3).every(value => percent(value) === null)) {
        min_track.classList.add('prob-no-sample');
        min_track.append(el('span', '', '実測なし'));
      }
      sokomin_row.dataset.op = cells[0];
      sokomin_row.append(el('span', 'prob-op-name', cells[0]), min_track, el('strong', 'prob-op-value', cells[2]));
      min_rows.append(sokomin_row);
    });
    sokomin_view.append(sokomin_legend, header, axis, min_rows);
    return sokomin_view;
  }
  function opRateChart(sokomin_data, name, ceiling) {
    const sokomin_view = el('div', 'prob-op-rate-chart');
    const header = el('div', 'prob-rate-heading');
    header.append(el('span', '', 'OP'), el('span', '', '1枠あたりの出現率'), el('span', 'prob-op-rate-heading', '確率'));
    const axis = el('div', 'prob-rate-axis');
    for (let i = 0; i <= 4; i++) axis.append(el('span', '', (ceiling * i / 4) + '%'));
    const min_rows = el('div', 'prob-rate-rows');
    sokomin_data.rows.forEach(cells => {
      const row = el('div', 'prob-rate-row');
      row.dataset.op = cells[0];
      const track = el('div', 'prob-rate-track');
      track.setAttribute('role', 'img');
      track.setAttribute('aria-label', cells[0] + '：1枠あたり ' + cells[1]);
      track.title = name + ' · ' + cells[0] + ' · ' + cells[1];
      track.tabIndex = 0;
      const bar = el('span', 'prob-rate-bar');
      bar.dataset.value = String(percent(cells[1]));
      bar.style.width = (percent(cells[1]) / ceiling * 100) + '%';
      track.append(bar);
      row.append(el('span', 'prob-op-name', cells[0]), track, el('strong', 'prob-op-value', cells[1]));
      min_rows.append(row);
    });
    sokomin_view.dataset.ceiling = String(ceiling);
    sokomin_view.append(header, axis, min_rows);
    return sokomin_view;
  }
  const tables = new Map(Array.from(document.querySelectorAll('.probability-scroll table[data-table]'), table => [table.dataset.table, table]));
  const poolRates = Array.from(tables.values()).filter(table => table.classList.contains('op-pool')).flatMap(table => read(table).rows.map(row => percent(row[1])));
  const rateCeiling = poolRates.length ? Math.ceil(Math.max(...poolRates) / 5) * 5 : 10;
  document.querySelectorAll('[data-probability-chart-for]').forEach(mount => {
    const id = mount.dataset.probabilityChartFor;
    const table = tables.get(id);
    if (!table) return;
    const data = read(table);
    const isOp = table.classList.contains('op-distribution');
    const isPool = table.classList.contains('op-pool');
    const heading = isPool ? mount.closest('.prob-pool-section').querySelector('h3') : mount.previousElementSibling;
    const name = heading && /^H[2-4]$/.test(heading.tagName) ? heading.textContent.trim() : 'Tier分布';
    const chart = isPool ? opRateChart(data, name, rateCeiling) : isOp ? opChart(data, name) : tierChart(data, name);
    const card = el('section', 'prob-chart-card');
    card.setAttribute('aria-label', name + ' 確率グラフ');
    card.dataset.chart = id;
    const toolbar = el('div', 'prob-chart-toolbar');
    const title = el('strong', 'prob-chart-title', isOp || isPool ? 'OPの出現率' : 'Tier分布');
    chart.id = 'prob-chart-' + id;
    toolbar.append(title);
    card.append(toolbar, chart);
    mount.replaceWith(card);
  });
})();
