export const NPCOP_STATS = Object.freeze({ str: '力', agi: '敏捷', con: '健康', int: '知識', wiz: '知恵', chs: 'カリスマ', luc: '運' });
const SOURCES = {
  ジェーソン: [1], セリー: [1], トゥンガ: [1], マファス: [2], ティレン: [2], 'ジム・モリ': [2], ハーソン: [3],
  ガイルート: [1, 2], バルラレル: [1, 2], ロシペル: [1, 2], テマヌエル: [2, 3], オニトルロ: [2, 3], タニア: [2, 3], ランディス: [1, 3],
};
const ATTACHMENT_SLOTS = {
  ...SOURCES, サナ: [1], シュルト: [1], タポ: [1], ケイルン: [2], バイル: [3], アリエル: [3], オベ: [3], ニケ: [2], ペル: [1], ソラ: [2], リラ: [1, 3], ガスピル: [3],
  ロングッシュ: [3], 'ジョン・マルコ': [3], ネルバ: [2], ホーク: [1], エステル: [3], ベリータ: [3],
};

function selectedTier(op, prefix) {
  const family = prefix?.families?.[String(op?.familyId)];
  if (!family) return null;
  if (op.rowId != null && Number(op.rowId) >= 0) return family.tiers?.find(t => Number(t.id) === Number(op.rowId)) || null;
  return op.name ? family.tiers?.find(t => t.name === op.name) || null : null;
}

export function npcAttachment(op, prefix) {
  const tier = selectedTier(op, prefix);
  const name = String(tier?.name || '').replace(/^\[|\]$/g, '');
  return ATTACHMENT_SLOTS[name] ? { tier, name, slots: ATTACHMENT_SLOTS[name] } : null;
}

export function isNpcopSlot(op, prefix) {
  return op?.npcEnhancement != null || !!npcAttachment(op, prefix) || selectedTier(op, prefix)?.gradeClass === 'npc';
}

export function npcAttachmentIssue(op, prefix, item, index, master) {
  const attachment = npcAttachment(op, prefix);
  if (!attachment) return '';
  if (!Number.isInteger(index) || !attachment.slots.includes(index + 1)) return 'この枠には付与できない宿命OPです。';
  const kindName = master?.kinds?.[String(item?.kind)]?.name;
  if (!kindName || !attachment.tier.equipKinds?.includes(kindName)) return 'この部位には付与できない宿命OPです。';
  return '';
}

export function validateNpcAttachments(ops, prefix, item, master) {
  for (let index = 0; index < 3; index++) {
    const issue = npcAttachmentIssue(ops?.[index], prefix, item, index, master);
    if (issue) throw Error(issue);
  }
}

export function removeOptionAt(ops, index, prefix) {
  if (!Number.isInteger(index) || index < 0 || index > 2) throw Error('OP枠が不正です。');
  if (isNpcopSlot(ops?.[index], prefix)) throw Error('宿命OPは個別に削除できません。');
  const out = [null, null, null], from = [null, null, null], movable = [];
  for (let k = 0; k < 3; k++) {
    if (k === index) continue;
    const op = ops?.[k];
    if (!op || op.familyId == null || op.familyId < 0) continue;
    if (isNpcopSlot(op, prefix)) { out[k] = op; from[k] = k; }
    else movable.push(k);
  }
  for (let k = 0; k < 3; k++) if (!out[k] && movable.length) {
    const previous = movable.shift(); out[k] = ops[previous]; from[k] = previous;
  }
  return { ops: out, from };
}
const FIXED = [[0, '', 250], [1, 'ケルベロス', 500], [2, 'ドラゴート', 700], [3, '骸骨王', 1000], [4, 'ハシュラム', 1250], [5, 'タビアクート', 1500], [6, 'スザルアンギール', 1750], [7, 'シュミット', 2000]];
const RATIO = [[0, '', 2, 3], [4, '神々しい太陽', 3, 4], [5, 'かき回す神龍', 5, 6], [6, '深い静寂', 11, 12], [7, '偉大な者', 1, 1]];

export function npcSource(op, prefix) {
  const family = prefix?.families?.[String(op?.familyId)];
  const tier = family?.tiers?.find(t => Number(t.id) === Number(op?.rowId));
  const name = String(tier?.name || '').replace(/^\[|\]$/g, '');
  if (tier?.gradeClass !== 'npc' || !SOURCES[name] || !NPCOP_STATS[family.stat?.id]) return null;
  return { familyId: Number(op.familyId), tier, name, stat: family.stat.id,
    kind: family.stat.layer === 'lvLinked' ? 'ratio' : 'fixed', slots: SOURCES[name] };
}

export function npcStages(source) {
  return (source?.kind === 'fixed' ? FIXED : source?.kind === 'ratio' ? RATIO : []).map(([stage, name, value, divisor]) => ({ stage, name, value, divisor }));
}

export function buildNpcopSlot(op, stage, stat, prefix, item, index, master) {
  const source = npcSource(op, prefix);
  if (!source) throw Error('強化できる宿命OPを選択してください。');
  if (!Number.isInteger(stage) || !npcStages(source).some(t => t.stage === stage) || !NPCOP_STATS[stat] || (stage === 0 && stat !== source.stat)) throw Error('宿命OPの段階・能力値が不正です。');
  const issue = npcAttachmentIssue(op, prefix, item, index, master);
  if (issue) throw Error(issue);
  const tier = npcStages(source).find(t => t.stage === stage);
  const slot = { familyId: source.familyId, rowId: Number(source.tier.id), name: stage ? `[${tier.name}]` : source.tier.name };
  if (source.kind === 'fixed') slot.value = tier.value;
  else { slot.addValue = tier.value; slot.divisor = tier.divisor; }
  if (stage) slot.npcEnhancement = { stage, stat };
  return slot;
}

export function npcEffect(op, prefix, level = 0) {
  if (op?.npcEnhancement == null) return null;
  const source = npcSource(op, prefix);
  const { stage, stat } = op.npcEnhancement;
  const tier = source && npcStages(source).find(t => t.stage === stage && stage > 0);
  if (!tier || !NPCOP_STATS[stat]) throw Error('宿命OPの段階・能力値が不正です。');
  const value = source.kind === 'fixed' ? tier.value : Math.floor(Math.min(2000, Math.max(0, level)) * tier.value / tier.divisor);
  return { stat, value, name: `[${tier.name}]`, effect: source.kind === 'fixed' ? `${NPCOP_STATS[stat]} +${tier.value}` : `${NPCOP_STATS[stat]} +${tier.value} / レベル${tier.divisor}`, layer: source.kind === 'fixed' ? 'sum' : 'lvLinked' };
}

export function renderNpcopControls(document, op, prefix, index) {
  const row = document.querySelector(`.edit-npcop-row[data-eop="${index}"]`);
  if (!row) return;
  const source = npcSource(op, prefix);
  row.hidden = !source;
  if (!source) return;
  const stage = row.querySelector('.edit-npcop-stage');
  const stat = row.querySelector('.edit-npcop-stat');
  const fill = (select, entries, current) => {
    select.replaceChildren(...entries.map(([value, label]) => {
      const option = document.createElement('option'); option.value = String(value); option.textContent = label; return option;
    }));
    select.value = String(current);
  };
  fill(stage, npcStages(source).map(t => [t.stage, t.stage ? `${t.stage}: ${t.name}` : '付与時']), op.npcEnhancement?.stage ?? 0);
  fill(stat, Object.entries(NPCOP_STATS), op.npcEnhancement?.stat ?? source.stat);
  stat.disabled = stage.value === '0';
}
