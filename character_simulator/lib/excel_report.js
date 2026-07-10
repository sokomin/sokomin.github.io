

const UTF8_FLAG = 0x0800;
const encoder = new TextEncoder();

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function columnName(index) {
  let n = index + 1;
  let out = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

function le16(value) {
  return Uint8Array.of(value & 0xff, (value >>> 8) & 0xff);
}

function le32(value) {
  return Uint8Array.of(
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff,
  );
}

function concatBytes(parts) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(dateValue) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue || Date.now());
  const year = Math.max(1980, date.getFullYear());
  return {
    time: ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | ((date.getSeconds() / 2) & 0x1f),
    date: (((year - 1980) & 0x7f) << 9) | (((date.getMonth() + 1) & 0x0f) << 5) | (date.getDate() & 0x1f),
  };
}

function buildStoredZip(files, dateValue) {
  const localParts = [];
  const centralParts = [];
  const stamp = dosDateTime(dateValue);
  let offset = 0;

  for (const file of files) {
    const name = encoder.encode(file.name);
    const data = typeof file.data === 'string' ? encoder.encode(file.data) : file.data;
    const crc = crc32(data);
    const local = concatBytes([
      le32(0x04034b50), le16(20), le16(UTF8_FLAG), le16(0),
      le16(stamp.time), le16(stamp.date), le32(crc), le32(data.length), le32(data.length),
      le16(name.length), le16(0), name, data,
    ]);
    localParts.push(local);

    centralParts.push(concatBytes([
      le32(0x02014b50), le16(20), le16(20), le16(UTF8_FLAG), le16(0),
      le16(stamp.time), le16(stamp.date), le32(crc), le32(data.length), le32(data.length),
      le16(name.length), le16(0), le16(0), le16(0), le16(0), le32(0), le32(offset), name,
    ]));
    offset += local.length;
  }

  const central = concatBytes(centralParts);
  const end = concatBytes([
    le32(0x06054b50), le16(0), le16(0), le16(files.length), le16(files.length),
    le32(central.length), le32(offset), le16(0),
  ]);
  return concatBytes([...localParts, central, end]);
}

function cellXml(cell, rowIndex, colIndex) {
  if (cell == null) return '';
  const spec = (typeof cell === 'object' && !Array.isArray(cell) && Object.prototype.hasOwnProperty.call(cell, 'v'))
    ? cell : { v: cell };
  if (spec.v == null || spec.v === '') {
    return spec.style ? `<c r="${columnName(colIndex)}${rowIndex}" s="${spec.style}"/>` : '';
  }
  const ref = `${columnName(colIndex)}${rowIndex}`;
  const style = spec.style ? ` s="${spec.style}"` : '';
  if (typeof spec.v === 'number' && Number.isFinite(spec.v) && spec.type !== 'text') {
    return `<c r="${ref}"${style}><v>${spec.v}</v></c>`;
  }
  if (typeof spec.v === 'boolean' && spec.type !== 'text') {
    return `<c r="${ref}" t="b"${style}><v>${spec.v ? 1 : 0}</v></c>`;
  }
  return `<c r="${ref}" t="inlineStr"${style}><is><t xml:space="preserve">${xmlEscape(spec.v)}</t></is></c>`;
}

function sheetXml(sheet) {
  const rowCount = Math.max(1, sheet.rows.length);
  const colCount = Math.max(1, ...sheet.rows.map((row) => row.cells.length));
  const dimension = `A1:${columnName(colCount - 1)}${rowCount}`;
  const cols = (sheet.widths || []).map((width, index) =>
    `<col min="${index + 1}" max="${index + 1}" width="${Number(width) || 10}" customWidth="1"/>`).join('');
  const rows = sheet.rows.map((row, index) => {
    const rowIndex = index + 1;
    const height = row.height ? ` ht="${row.height}" customHeight="1"` : '';
    const cells = row.cells.map((cell, colIndex) => cellXml(cell, rowIndex, colIndex)).join('');
    return `<row r="${rowIndex}"${height}>${cells}</row>`;
  }).join('');
  const merges = (sheet.merges || []).length
    ? `<mergeCells count="${sheet.merges.length}">${sheet.merges.map((ref) => `<mergeCell ref="${ref}"/>`).join('')}</mergeCells>`
    : '';
  const freeze = sheet.freezeRows
    ? `<pane ySplit="${sheet.freezeRows}" topLeftCell="A${sheet.freezeRows + 1}" activePane="bottomLeft" state="frozen"/>`
    : '';
  const autoFilter = sheet.autoFilter ? `<autoFilter ref="${sheet.autoFilter}"/>` : '';
  const landscape = sheet.landscape ? ' orientation="landscape"' : '';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<dimension ref="${dimension}"/><sheetViews><sheetView workbookViewId="0" showGridLines="0">${freeze}</sheetView></sheetViews>` +
    `<sheetFormatPr defaultRowHeight="18"/>${cols ? `<cols>${cols}</cols>` : ''}<sheetData>${rows}</sheetData>${autoFilter}${merges}` +
    `<pageMargins left="0.25" right="0.25" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>` +
    `<pageSetup paperSize="9" fitToWidth="1" fitToHeight="0"${landscape}/></worksheet>`;
}

function stylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="4">
    <font><sz val="10"/><name val="Yu Gothic"/><family val="2"/></font>
    <font><b/><sz val="16"/><color rgb="FFFFFFFF"/><name val="Yu Gothic"/><family val="2"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Yu Gothic"/><family val="2"/></font>
    <font><b/><sz val="10"/><color rgb="FF493100"/><name val="Yu Gothic"/><family val="2"/></font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF5B3A12"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF8A5A16"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFE9A8"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFD9CBA7"/></left><right style="thin"><color rgb="FFD9CBA7"/></right><top style="thin"><color rgb="FFD9CBA7"/></top><bottom style="thin"><color rgb="FFD9CBA7"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="8">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="3" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="right" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
}

function row(cells, height) {
  return { cells, height };
}

function styled(value, style = 4, type) {
  return { v: value, style, type };
}

function detailHeight(values, minimum = 32) {
  const maxLines = Math.max(1, ...values.map((value) => String(value ?? '').split(/\r?\n/).length));
  return Math.min(180, Math.max(minimum, 16 + maxLines * 13));
}

function buildEquipmentSheet(report) {
  const character = report.character || {};
  const rows = [
    row([styled(report.title || 'RED STONE キャラクター構成レポート', 1)], 30),
    row([styled('出力日時', 5), styled(report.generatedAtLabel || ''), styled('職業', 5), styled(character.job || ''), styled('レベル', 5), styled(character.level ?? '', 6)], 22),
    row([styled('転生回数', 5), styled(character.rebirth ?? '', 6), styled('性別', 5), styled(character.gender || ''), styled('恩寵', 5), styled(character.grace || 'なし')], 22),
    row([]),
    row([styled('装備中の装備', 2)], 23),
    row(['部位', '装備表示名', '種別・等級', '基本情報・固有效果', '付与OP・強化内訳', '要求能力値・状態'].map((value) => styled(value, 3)), 30),
  ];

  const equipment = Array.isArray(report.equipment) ? report.equipment : [];
  if (equipment.length === 0) {
    rows.push(row([styled('装備なし', 7), styled('', 4), styled('', 4), styled('', 4), styled('', 4), styled('', 4)], 28));
  } else {
    for (const item of equipment) {
      const values = [item.slot, item.displayName, item.typeGrade, item.baseInfo, item.options, item.requirements];
      rows.push(row(values.map((value, index) => styled(value ?? '', index === 0 ? 5 : 4)), detailHeight(values, 42)));
    }
  }
  const lastRow = rows.length;
  return {
    name: '装備構成', rows,
    widths: [13, 43, 20, 49, 54, 34],
    merges: ['A1:F1', 'A5:F5'],
    freezeRows: 6,
    autoFilter: `A6:F${lastRow}`,
    landscape: true,
  };
}

function buildBreakdownSheet(report) {
  const character = report.character || {};
  const rows = [
    row([styled('ステータス・装備外補正内訳', 1)], 30),
    row([styled('職業', 5), styled(character.job || ''), styled('レベル', 5), styled(character.level ?? '', 6), styled('出力日時', 5), styled(report.generatedAtLabel || '')], 22),
    row([]),
    row([styled('現在の最終ステータス', 2)], 23),
    row(['分類', '項目', '素値', '最終値', '単位', '備考'].map((value) => styled(value, 3)), 28),
  ];

  const stats = Array.isArray(report.stats) ? report.stats : [];
  for (const stat of stats) {
    rows.push(row([
      styled(stat.category || '', 5), styled(stat.name || ''), styled(stat.base ?? '', typeof stat.base === 'number' ? 6 : 4),
      styled(stat.final ?? '', typeof stat.final === 'number' ? 6 : 4), styled(stat.unit || ''), styled(stat.note || ''),
    ], detailHeight([stat.note], 23)));
  }

  rows.push(row([]));
  const sectionRow = rows.length + 1;
  rows.push(row([styled('装備外補正・構成内訳', 2)], 23));
  const headerRow = rows.length + 1;
  rows.push(row(['カテゴリ', 'スロット・区分', '名称', '設定値', '効果・詳細', '再現メモ'].map((value) => styled(value, 3)), 28));

  const bonuses = Array.isArray(report.bonuses) ? report.bonuses : [];
  if (bonuses.length === 0) {
    rows.push(row([styled('設定なし', 7), styled('', 4), styled('', 4), styled('', 4), styled('', 4), styled('', 4)], 28));
  } else {
    for (const bonus of bonuses) {
      const values = [bonus.category, bonus.slot, bonus.name, bonus.setting, bonus.detail, bonus.memo];
      rows.push(row(values.map((value, index) => styled(value ?? '', index === 0 ? 5 : 4)), detailHeight(values, 32)));
    }
  }

  return {
    name: 'ステータス・補正内訳', rows,
    widths: [22, 20, 34, 24, 58, 36],
    merges: ['A1:F1', 'A4:F4', `A${sectionRow}:F${sectionRow}`],
    freezeRows: 5,
    autoFilter: `A${headerRow}:F${rows.length}`,
    landscape: true,
  };
}

function workbookFiles(report, sheets) {
  const created = new Date(report.generatedAt || Date.now()).toISOString();
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
    `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
    sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('') +
    `<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>` +
    `<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>` +
    `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>` +
    `<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>` +
    sheets.map((sheet, i) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('') + `</sheets><calcPr calcId="0"/></workbook>`;
  const workbookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('') +
    `<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const core = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>RED STONE キャラクター構成レポート</dc:title><dc:creator>キャラクターシミュレーター</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${created}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${created}</dcterms:modified></cp:coreProperties>`;
  const app = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>RED STONE Character Simulator</Application><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>${sheets.length}</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="${sheets.length}" baseType="lpstr">${sheets.map((sheet) => `<vt:lpstr>${xmlEscape(sheet.name)}</vt:lpstr>`).join('')}</vt:vector></TitlesOfParts></Properties>`;

  return [
    { name: '[Content_Types].xml', data: contentTypes },
    { name: '_rels/.rels', data: rootRels },
    { name: 'docProps/core.xml', data: core },
    { name: 'docProps/app.xml', data: app },
    { name: 'xl/workbook.xml', data: workbook },
    { name: 'xl/_rels/workbook.xml.rels', data: workbookRels },
    { name: 'xl/styles.xml', data: stylesXml() },
    ...sheets.map((sheet, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(sheet) })),
  ];
}

export function buildCharacterReportXlsx(report) {
  const normalized = report || {};
  const sheets = [buildEquipmentSheet(normalized), buildBreakdownSheet(normalized)];
  return buildStoredZip(workbookFiles(normalized, sheets), normalized.generatedAt);
}

export function downloadCharacterReportXlsx(filename, report) {
  const bytes = buildCharacterReportXlsx(report);
  const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
