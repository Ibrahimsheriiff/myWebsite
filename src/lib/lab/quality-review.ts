import {
  qualityRecords,
  qualityCategories,
  type QualityCategory,
} from '@/content/lab/quality-fixtures';
import {
  mapRecord,
  normaliseRecord,
  checkRecords,
  type ProcessedRecord,
} from '@/lib/daita-workbench';
export type ReviewEdits = {
  date?: string;
  description?: string;
  category?: QualityCategory;
  duplicate?: 'hold' | 'exclude' | 'keep';
  reviewed?: boolean;
};
export type QualityState = {
  mapping: { date: 'When' | 'Entry'; amount: '' | 'Value' | 'Entry' };
  edits: Record<string, ReviewEdits>;
};
export type QualityAction =
  | { type: 'reset' }
  | { type: 'mapping'; field: 'date' | 'amount'; value: string }
  | {
      type: 'edit';
      id: string;
      field: 'date' | 'description' | 'category' | 'duplicate';
      value: string;
    }
  | { type: 'confirm'; id: string }
  | { type: 'revert'; id: string };
export type QualityRow = ProcessedRecord & {
  status: 'held' | 'ready' | 'reviewed' | 'excluded';
  disposition: string;
};
export function createQuality(): QualityState {
  return { mapping: { date: 'When', amount: '' }, edits: {} };
}
export function deriveQuality(s: QualityState): QualityRow[] {
  const checked = checkRecords(
    qualityRecords.map((raw) => {
      const m = mapRecord({ ...raw, columns: { ...raw.columns, ...s.mapping } }),
        edit = s.edits[raw.id] ?? {};
      return normaliseRecord({
        id: raw.id,
        source: raw.source,
        fields: {
          date: edit.date ?? m.date,
          description: edit.description ?? m.description,
          amount: m.amount,
          reference: m.reference,
        },
        columns: {
          date: 'date',
          description: 'description',
          amount: 'amount',
          reference: 'reference',
        },
      });
    }),
  );
  return checked.map((row) => {
    const edit = s.edits[row.id] ?? {};
    const excluded = !!row.duplicateOf && edit.duplicate === 'exclude';
    const held =
      row.issues.length > 0 ||
      (!!row.duplicateOf && !['keep', 'exclude'].includes(edit.duplicate ?? 'hold'));
    const status = excluded ? 'excluded' : held ? 'held' : edit.reviewed ? 'reviewed' : 'ready';
    return {
      ...row,
      category: edit.category ?? 'General review',
      reviewed: status === 'reviewed',
      status,
      disposition: excluded
        ? 'Confirmed repeat retained in ledger'
        : row.duplicateOf && edit.duplicate === 'keep'
          ? 'Kept as distinct by reviewer'
          : row.duplicateOf
            ? `Possible repeat of ${row.duplicateOf}`
            : row.issues.join(' · ') || 'Quality checks passed',
    };
  });
}
export function qualityReducer(s: QualityState, a: QualityAction): QualityState {
  if (a.type === 'reset') return createQuality();
  if (a.type === 'mapping') {
    if (
      (a.field === 'date' && !['When', 'Entry'].includes(a.value)) ||
      (a.field === 'amount' && !['', 'Value', 'Entry'].includes(a.value))
    )
      return s;
    return {
      ...s,
      mapping: { ...s.mapping, [a.field]: a.value },
      edits: Object.fromEntries(
        Object.entries(s.edits).map(([id, e]) => [id, { ...e, reviewed: false }]),
      ),
    };
  }
  if (!qualityRecords.some((r) => r.id === a.id)) return s;
  if (a.type === 'revert') {
    const edits = { ...s.edits };
    delete edits[a.id];
    return { ...s, edits };
  }
  if (a.type === 'confirm') {
    if (deriveQuality(s).find((r) => r.id === a.id)?.status !== 'ready') return s;
    return { ...s, edits: { ...s.edits, [a.id]: { ...s.edits[a.id], reviewed: true } } };
  }
  if (
    (a.field === 'category' && !qualityCategories.includes(a.value as QualityCategory)) ||
    (a.field === 'duplicate' && !['hold', 'exclude', 'keep'].includes(a.value))
  )
    return s;
  const value = a.value.slice(0, a.field === 'description' ? 100 : 40);
  return {
    ...s,
    edits: { ...s.edits, [a.id]: { ...s.edits[a.id], [a.field]: value, reviewed: false } },
  };
}
export function qualityTotals(s: QualityState) {
  const rows = deriveQuality(s);
  return {
    total: rows.length,
    held: rows.filter((r) => r.status === 'held').length,
    ready: rows.filter((r) => r.status === 'ready').length,
    reviewed: rows.filter((r) => r.status === 'reviewed').length,
    excluded: rows.filter((r) => r.status === 'excluded').length,
  };
}
export function qualityExport(s: QualityState) {
  const quote = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;
  return [
    ['id', 'source', 'date', 'description', 'amount_cents', 'category'],
    ...deriveQuality(s)
      .filter((r) => r.status === 'reviewed')
      .map((r) => [r.id, r.source, r.date!, r.description, r.cents!, r.category!]),
  ]
    .map((row) => row.map(quote).join(','))
    .join('\n');
}
