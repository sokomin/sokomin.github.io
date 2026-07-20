(() => {
  'use strict';

  const ASSET_ROOT = 'guildmark-simulator/assets/';
  const $ = (id) => document.getElementById(id);
  const imageCache = new Map();
  const cellCache = new Map();
  const colorCache = new Map();

  const state = {
    symbolGroup: 'alphabet',
    symbolIndex: 0,
    symbolColor: 3,
    baseIndex: 0,
    partitionIndex: 3,
    baseColor1: 18,
    baseColor2: 6,
    lineColor: 0,
  };

  let manifest;
  let resources;

  function loadImage(asset) {
    if (imageCache.has(asset)) return imageCache.get(asset);
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        image.assetName = asset;
        resolve(image);
      };
      image.onerror = () => reject(new Error(`画像を読み込めませんでした: ${asset}`));
      image.src = ASSET_ROOT + asset;
    });
    imageCache.set(asset, promise);
    return promise;
  }

  function parseColor(hex) {
    if (colorCache.has(hex)) return colorCache.get(hex);
    const value = Number.parseInt(hex.slice(1), 16);
    const rgb = [(value >> 16) & 255, (value >> 8) & 255, value & 255];
    colorCache.set(hex, rgb);
    return rgb;
  }

  function currentSymbolGroup(config = state) {
    return manifest.symbols.find((group) => group.key === config.symbolGroup);
  }

  function cellData(image, columns, index, width, height) {
    const key = `${image.assetName}:${columns}:${index}:${width}:${height}`;
    if (cellCache.has(key)) return cellCache.get(key);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.imageSmoothingEnabled = false;
    context.drawImage(
      image,
      (index % columns) * width,
      Math.floor(index / columns) * height,
      width,
      height,
      0,
      0,
      width,
      height,
    );
    const data = context.getImageData(0, 0, width, height);
    cellCache.set(key, data);
    return data;
  }

  function setPixel(target, offset, rgb, alpha = 255) {
    target.data[offset] = rgb[0];
    target.data[offset + 1] = rgb[1];
    target.data[offset + 2] = rgb[2];
    target.data[offset + 3] = alpha;
  }

  function drawEncodedLayer(target, source, palette) {
    for (let offset = 0; offset < source.data.length; offset += 4) {
      if (source.data[offset + 3] === 0) continue;
      if (source.data[offset + 2] > 200 && source.data[offset + 1] < 200) {
        setPixel(target, offset, [0, 0, 0]);
        continue;
      }
      if (source.data[offset + 1] > 200) {
        const shade = Math.min(7, Math.round(source.data[offset] / 32));
        setPixel(target, offset, parseColor(palette[shade]));
      }
    }
  }

  function drawFixedLayer(target, source) {
    for (let offset = 0; offset < source.data.length; offset += 4) {
      if (source.data[offset + 3] === 0) continue;
      const isEncodedOutline =
        source.data[offset] === 0 &&
        source.data[offset + 1] === 0 &&
        source.data[offset + 2] === 255;
      if (isEncodedOutline) {
        setPixel(target, offset, [0, 0, 0]);
      } else {
        setPixel(
          target,
          offset,
          [
            source.data[offset],
            source.data[offset + 1],
            source.data[offset + 2],
          ],
        );
      }
    }
  }

  function composeMaster(overrides = {}, includeSymbol = true) {
    const config = { ...state, ...overrides };
    const size = manifest.cellSize;
    const output = new ImageData(size, size);
    const baseFill = cellData(resources.baseFill, manifest.base.count, config.baseIndex, size, size);
    const baseLine = cellData(resources.baseLine, manifest.base.count, config.baseIndex, size, size);
    const partition = cellData(
      resources.partitions,
      manifest.partitions.columns,
      config.partitionIndex,
      manifest.partitions.cellWidth,
      manifest.partitions.cellHeight,
    );
    const bounds = manifest.base.bounds[config.baseIndex];
    const firstPalette = manifest.palettes.base[config.baseColor1];
    const secondPalette = manifest.palettes.base[config.baseColor2];

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const offset = (y * size + x) * 4;
        if (baseFill.data[offset + 3] === 0) continue;
        const localX = Math.max(0, Math.min(bounds.width - 1, x - bounds.x));
        const localY = Math.max(0, Math.min(bounds.height - 1, y - bounds.y));
        const patternX = Math.min(
          manifest.partitions.cellWidth - 1,
          Math.floor(localX * manifest.partitions.cellWidth / bounds.width),
        );
        const patternY = Math.min(
          manifest.partitions.cellHeight - 1,
          Math.floor(localY * manifest.partitions.cellHeight / bounds.height),
        );
        const patternOffset =
          (patternY * manifest.partitions.cellWidth + patternX) * 4;
        const selectedPalette =
          partition.data[patternOffset] < 2 ? firstPalette : secondPalette;
        const shade = Math.min(
          7,
          Math.round(localY * 7 / Math.max(1, bounds.height - 1)),
        );
        setPixel(output, offset, parseColor(selectedPalette[shade]));
      }
    }

    drawEncodedLayer(output, baseLine, manifest.palettes.mark[config.lineColor]);

    if (includeSymbol) {
      const group = currentSymbolGroup(config);
      const symbolImage = resources.symbols.get(group.key);
      const symbol = cellData(
        symbolImage,
        group.columns,
        config.symbolIndex,
        size,
        size,
      );
      if (group.fixedColor) {
        drawFixedLayer(output, symbol);
      } else {
        drawEncodedLayer(output, symbol, manifest.palettes.mark[config.symbolColor]);
      }
    }
    return output;
  }

  function imageDataCanvas(imageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    return canvas;
  }

  function alphaBounds(imageData) {
    let minX = imageData.width;
    let minY = imageData.height;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const alpha = imageData.data[(y * imageData.width + x) * 4 + 3];
        if (alpha === 0) continue;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
    if (maxX < minX) return { x: 0, y: 0, width: 1, height: 1 };
    return {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    };
  }

  function drawFitted(canvas, imageData, background = null) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (background) {
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    const source = imageDataCanvas(imageData);
    const bounds = alphaBounds(imageData);
    const margin = canvas.width <= 40 ? 1 : Math.max(2, Math.round(canvas.width / 30));
    const scale = Math.min(
      (canvas.width - margin * 2) / bounds.width,
      (canvas.height - margin * 2) / bounds.height,
    );
    const width = Math.max(1, Math.round(bounds.width * scale));
    const height = Math.max(1, Math.round(bounds.height * scale));
    const x = Math.round((canvas.width - width) / 2);
    const y = Math.round((canvas.height - height) / 2);
    context.imageSmoothingEnabled = false;
    context.drawImage(
      source,
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      x,
      y,
      width,
      height,
    );
  }

  function drawRawPreview(canvas, imageData) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
  }

  function renderPreview() {
    const master = composeMaster();
    drawRawPreview($('preview'), master);
    const background = $('transparentBackground').checked ? null : '#FFFFFF';
    drawFitted($('preview30'), master, background);
    drawFitted($('preview60'), master, background);
    drawFitted($('preview120'), master, background);
    updateSummary();
    $('renderStatus').textContent = '選択内容を反映しました。';
  }

  function selectedClass(container, selected) {
    container.querySelectorAll('[data-index]').forEach((button) => {
      const active = Number(button.dataset.index) === selected;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-selected', String(active));
    });
  }

  function drawThumbnail(canvas, imageData) {
    drawFitted(canvas, imageData, '#FFFFFF');
  }

  function createChoiceButton(index, label, selected, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    button.dataset.index = String(index);
    button.setAttribute('role', 'option');
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-selected', String(index === selected));
    button.classList.toggle('selected', index === selected);
    button.addEventListener('click', onClick);
    return button;
  }

  function renderSymbolCategories() {
    const container = $('symbolCategories');
    container.innerHTML = '';
    manifest.symbols.forEach((group) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category-button';
      button.textContent = `${group.label}（${group.count}）`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(group.key === state.symbolGroup));
      button.classList.toggle('selected', group.key === state.symbolGroup);
      button.addEventListener('click', () => {
        state.symbolGroup = group.key;
        state.symbolIndex = 0;
        renderSymbolCategories();
        renderSymbolPicker();
        renderSymbolColorPicker();
        renderPreview();
      });
      container.appendChild(button);
    });
  }

  function symbolThumbnail(group, index) {
    const source = cellData(
      resources.symbols.get(group.key),
      group.columns,
      index,
      manifest.cellSize,
      manifest.cellSize,
    );
    const output = new ImageData(manifest.cellSize, manifest.cellSize);
    if (group.fixedColor) {
      drawFixedLayer(output, source);
    } else {
      drawEncodedLayer(output, source, manifest.palettes.mark[state.symbolColor]);
    }
    return output;
  }

  function renderSymbolPicker() {
    const group = currentSymbolGroup();
    const container = $('symbolPicker');
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < group.count; index++) {
      const button = createChoiceButton(
        index,
        `${group.label} ${index + 1}`,
        state.symbolIndex,
        () => {
          state.symbolIndex = index;
          selectedClass(container, index);
          renderPreview();
        },
      );
      const canvas = document.createElement('canvas');
      canvas.width = manifest.cellSize;
      canvas.height = manifest.cellSize;
      drawThumbnail(canvas, symbolThumbnail(group, index));
      button.appendChild(canvas);
      button.appendChild(Object.assign(document.createElement('small'), {
        textContent: String(index + 1),
      }));
      fragment.appendChild(button);
    }
    container.appendChild(fragment);
  }

  function renderBasePicker() {
    const container = $('basePicker');
    container.innerHTML = '';
    for (let index = 0; index < manifest.base.count; index++) {
      const button = createChoiceButton(
        index,
        `ベース形 ${index + 1}`,
        state.baseIndex,
        () => {
          state.baseIndex = index;
          selectedClass(container, index);
          renderPartitionPicker();
          renderPreview();
        },
      );
      const canvas = document.createElement('canvas');
      canvas.width = manifest.cellSize;
      canvas.height = manifest.cellSize;
      drawThumbnail(canvas, composeMaster({ baseIndex: index }, false));
      button.appendChild(canvas);
      fragmentLabel(button, index + 1);
      container.appendChild(button);
    }
  }

  function fragmentLabel(button, number) {
    const label = document.createElement('small');
    label.textContent = String(number);
    button.appendChild(label);
  }

  function renderPartitionPicker() {
    const container = $('partitionPicker');
    container.innerHTML = '';
    for (let index = 0; index < manifest.partitions.count; index++) {
      const button = createChoiceButton(
        index,
        `分割パターン ${index + 1}`,
        state.partitionIndex,
        () => {
          state.partitionIndex = index;
          selectedClass(container, index);
          renderPreview();
        },
      );
      const canvas = document.createElement('canvas');
      canvas.width = manifest.cellSize;
      canvas.height = manifest.cellSize;
      drawThumbnail(canvas, composeMaster({ partitionIndex: index }, false));
      button.appendChild(canvas);
      fragmentLabel(button, index + 1);
      container.appendChild(button);
    }
  }

  function paletteButton(bank, index, selected, label, onClick) {
    const button = createChoiceButton(index, `${label} ${index + 1}`, selected, onClick);
    button.classList.add('palette-button');
    button.style.setProperty('--swatch-light', bank[0]);
    button.style.setProperty('--swatch-main', bank[4]);
    button.style.setProperty('--swatch-dark', bank[7]);
    const swatch = document.createElement('i');
    swatch.setAttribute('aria-hidden', 'true');
    button.appendChild(swatch);
    fragmentLabel(button, index + 1);
    return button;
  }

  function renderPalette(
    container,
    banks,
    selected,
    label,
    onSelect,
  ) {
    container.innerHTML = '';
    banks.forEach((bank, index) => {
      container.appendChild(
        paletteButton(bank, index, selected, label, () => {
          onSelect(index);
          selectedClass(container, index);
          renderPreview();
        }),
      );
    });
  }

  function renderSymbolColorPicker() {
    const group = currentSymbolGroup();
    const container = $('symbolColorPicker');
    const fixed = group.fixedColor;
    container.classList.toggle('is-disabled', fixed);
    container.setAttribute('aria-disabled', String(fixed));
    $('symbolColorHelp').textContent = fixed
      ? 'このカテゴリは絵柄ごとの専用配色を使用します。選択色は適用されません。'
      : '30種類の配色から選択します。';
    renderPalette(
      container,
      manifest.palettes.mark,
      state.symbolColor,
      'シンボル配色',
      (index) => {
        if (fixed) return;
        state.symbolColor = index;
        renderSymbolPicker();
      },
    );
  }

  function renderBaseColors() {
    renderPalette(
      $('baseColor1Picker'),
      manifest.palettes.base,
      state.baseColor1,
      'ベース色1',
      (index) => {
        state.baseColor1 = index;
        renderBaseColorsChips();
        renderBasePicker();
        renderPartitionPicker();
      },
    );
    renderPalette(
      $('baseColor2Picker'),
      manifest.palettes.base,
      state.baseColor2,
      'ベース色2',
      (index) => {
        state.baseColor2 = index;
        renderBaseColorsChips();
        renderBasePicker();
        renderPartitionPicker();
      },
    );
    renderBaseColorsChips();
  }

  function renderBaseColorsChips() {
    $('baseColor1Chip').style.background = manifest.palettes.base[state.baseColor1][4];
    $('baseColor2Chip').style.background = manifest.palettes.base[state.baseColor2][4];
  }

  function renderLineColorPicker() {
    renderPalette(
      $('lineColorPicker'),
      manifest.palettes.mark,
      state.lineColor,
      'ライン配色',
      (index) => {
        state.lineColor = index;
        renderBasePicker();
        renderPartitionPicker();
      },
    );
  }

  function updateSummary() {
    const group = currentSymbolGroup();
    $('summarySymbol').textContent = `${group.label} ${state.symbolIndex + 1}`;
    $('summarySymbolColor').textContent = group.fixedColor
      ? '専用配色'
      : `色 ${state.symbolColor + 1}`;
    $('summaryBase').textContent = `ベース形 ${state.baseIndex + 1}`;
    $('summaryPartition').textContent = `分割パターン ${state.partitionIndex + 1}`;
    $('summaryBaseColors').textContent =
      `色 ${state.baseColor1 + 1}・色 ${state.baseColor2 + 1}`;
    $('summaryLineColor').textContent = `色 ${state.lineColor + 1}`;
  }

  function renderAllControls() {
    renderSymbolCategories();
    renderSymbolPicker();
    renderSymbolColorPicker();
    renderBasePicker();
    renderPartitionPicker();
    renderBaseColors();
    renderLineColorPicker();
    renderPreview();
  }

  function randomIndex(length) {
    return Math.floor(Math.random() * length);
  }

  function randomize() {
    const group = manifest.symbols[randomIndex(manifest.symbols.length)];
    state.symbolGroup = group.key;
    state.symbolIndex = randomIndex(group.count);
    state.symbolColor = randomIndex(manifest.palettes.mark.length);
    state.baseIndex = randomIndex(manifest.base.count);
    state.partitionIndex = randomIndex(manifest.partitions.count);
    state.baseColor1 = randomIndex(manifest.palettes.base.length);
    do {
      state.baseColor2 = randomIndex(manifest.palettes.base.length);
    } while (state.baseColor2 === state.baseColor1);
    state.lineColor = randomIndex(manifest.palettes.mark.length);
    renderAllControls();
  }

  function downloadPng() {
    const size = Number($('exportSize').value);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const background = $('transparentBackground').checked ? null : '#FFFFFF';
    drawFitted(canvas, composeMaster(), background);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `guild-crest-${size}px.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, 'image/png');
  }

  async function loadResources() {
    const response = await fetch(ASSET_ROOT + 'manifest.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('紋章データを読み込めませんでした。');
    manifest = await response.json();
    const [baseFill, baseLine, partitions, ...symbolImages] = await Promise.all([
      loadImage(manifest.base.fillAsset),
      loadImage(manifest.base.lineAsset),
      loadImage(manifest.partitions.asset),
      ...manifest.symbols.map((group) => loadImage(group.asset)),
    ]);
    resources = {
      baseFill,
      baseLine,
      partitions,
      symbols: new Map(
        manifest.symbols.map((group, index) => [group.key, symbolImages[index]]),
      ),
    };
  }

  async function init() {
    if (location.protocol === 'file:') $('serverNotice').hidden = false;
    try {
      await loadResources();
      renderAllControls();
      $('randomize').addEventListener('click', randomize);
      $('download').addEventListener('click', downloadPng);
      $('downloadBottom').addEventListener('click', downloadPng);
      $('transparentBackground').addEventListener('change', renderPreview);
    } catch (error) {
      $('renderStatus').textContent = error.message;
      $('renderStatus').classList.add('is-error');
    }
  }

  init();
})();
