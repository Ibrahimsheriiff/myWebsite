import type { RawRecord } from '@/content/daita-fixtures';
export const qualityRecords: RawRecord[] = [
  {
    id: 'Q01',
    source: 'Fictional ledger A',
    fields: { When: '2026-03-01', Entry: 'Paper delivery', Value: '$120.00', Key: 'DEMO-A' },
    columns: { date: 'When', description: 'Entry', amount: 'Value', reference: 'Key' },
  },
  {
    id: 'Q02',
    source: 'Fictional ledger B',
    fields: { When: '02 Mar 2026', Entry: '', Value: 'AUD 48.00', Key: 'DEMO-B' },
    columns: { date: 'When', description: 'Entry', amount: 'Value', reference: 'Key' },
  },
  {
    id: 'Q03',
    source: 'Fictional extract C',
    fields: { When: '2026-03-01', Entry: 'PAPER DELIVERY', Value: '120', Key: 'DEMO-A' },
    columns: { date: 'When', description: 'Entry', amount: 'Value', reference: 'Key' },
  },
  {
    id: 'Q04',
    source: 'Fictional ledger B',
    fields: { When: '31 Feb 2026', Entry: 'Desk repair', Value: '$240.00', Key: 'DEMO-C' },
    columns: { date: 'When', description: 'Entry', amount: 'Value', reference: 'Key' },
  },
];
export const qualityCategories = [
  'General review',
  'Equipment review',
  'Subscription review',
] as const;
export type QualityCategory = (typeof qualityCategories)[number];
