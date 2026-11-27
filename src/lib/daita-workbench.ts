import { rawRecords, type RawRecord, type ReviewCategory } from '@/content/daita-fixtures';
export type MappedRecord = {
  id: string;
  source: string;
  date: string;
  description: string;
  amount: string;
  reference: string;
};
export type ProcessedRecord = {
  id: string;
  source: string;
  date: string | null;
  description: string;
  cents: number | null;
  reference: string;
  issues: string[];
  duplicateOf: string | null;
  category: string | null;
  reviewed: boolean;
};
export function mapRecord(raw: RawRecord): MappedRecord {
  return {
    id: raw.id,
    source: raw.source,
    date: raw.fields[raw.columns.date] ?? '',
    description: raw.fields[raw.columns.description] ?? '',
    amount: raw.fields[raw.columns.amount] ?? '',
    reference: raw.fields[raw.columns.reference] ?? '',
  };
}
export function parseDemoDate(value: string): string | null {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const raw = value.trim();
  let y: number, m: number, d: number;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  const named = /^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})$/.exec(raw);
  if (iso) {
    y = Number(iso[1]);
    m = Number(iso[2]);
    d = Number(iso[3]);
  } else if (named) {
    y = Number(named[3]);
    m = months.indexOf(named[2]) + 1;
    d = Number(named[1]);
  } else return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (
    y < 1900 ||
    m < 1 ||
    m > 12 ||
    d < 1 ||
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  )
    return null;
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
export function parseDemoAmount(value: string): number | null {
  const clean = value.trim().replace(/^(?:AUD\s*)?\$?\s*/, '');
  if (!/^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/.test(clean)) return null;
  const [whole, fraction = ''] = clean.replaceAll(',', '').split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(cents) ? cents : null;
}
export function normaliseRecord(raw: RawRecord): ProcessedRecord {
  const mapped = mapRecord(raw);
  return {
    id: raw.id,
    source: raw.source,
    date: parseDemoDate(mapped.date),
    description: mapped.description.trim().replace(/\s+/g, ' '),
    cents: parseDemoAmount(mapped.amount),
    reference: mapped.reference.trim(),
    issues: [],
    duplicateOf: null,
    category: null,
    reviewed: false,
  };
}
export function checkRecords(records: ProcessedRecord[]): ProcessedRecord[] {
  const seen = new Map<string, string>();
  return records.map((record) => {
    const issues = [];
    if (!record.date) issues.push('Date missing or invalid');
    if (!record.description) issues.push('Description missing');
    if (record.cents === null) issues.push('Amount missing or invalid');
    if (!record.reference) issues.push('Reference missing');
    const key = JSON.stringify([
      record.date,
      record.description.toLowerCase(),
      record.cents,
      record.reference.toLowerCase(),
    ]);
    const duplicateOf = issues.length ? null : (seen.get(key) ?? null);
    if (!issues.length && !duplicateOf) seen.set(key, record.id);
    return { ...record, issues, duplicateOf };
  });
}
export function prepareRecords(
  category: ReviewCategory = 'General supplies',
  reviewed = false,
): ProcessedRecord[] {
  return checkRecords(rawRecords.map(normaliseRecord)).map((record) => ({
    ...record,
    category:
      record.issues.length || record.duplicateOf
        ? null
        : record.id === 'R01'
          ? 'Office materials'
          : record.id === 'R02'
            ? 'Subscriptions'
            : category,
    reviewed: record.id === 'R05' && reviewed,
  }));
}
export function formatDemoAmount(cents: number | null): string {
  return cents === null
    ? 'Missing'
    : new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(cents / 100);
}
