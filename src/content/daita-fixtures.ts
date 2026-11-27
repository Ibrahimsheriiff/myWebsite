// Fictional portfolio fixtures. No client data, original DAITA code or tax rules.
export type RawRecord = {
  id: string;
  source: string;
  fields: Record<string, string>;
  columns: { date: string; description: string; amount: string; reference: string };
};
export const rawRecords: RawRecord[] = [
  {
    id: 'R01',
    source: 'CSV',
    fields: { Date: '2025-04-03', Details: 'Harbour Paper', Value: '$120.00', Reference: 'F-104' },
    columns: { date: 'Date', description: 'Details', amount: 'Value', reference: 'Reference' },
  },
  {
    id: 'R02',
    source: 'Excel',
    fields: {
      Posted: '04 Apr 2025',
      Memo: '  Studio subscription  ',
      Debit: 'AUD 48.00',
      Ref: 'F-105',
    },
    columns: { date: 'Posted', description: 'Memo', amount: 'Debit', reference: 'Ref' },
  },
  {
    id: 'R03',
    source: 'PDF extract¹',
    fields: { Date: '2025-04-03', Narrative: 'HARBOUR PAPER', Total: '120.00', Reference: 'F-104' },
    columns: { date: 'Date', description: 'Narrative', amount: 'Total', reference: 'Reference' },
  },
  {
    id: 'R04',
    source: 'Excel',
    fields: { Posted: '2025-04-05', Memo: '', Debit: '$65.00', Ref: 'F-106' },
    columns: { date: 'Posted', description: 'Memo', amount: 'Debit', reference: 'Ref' },
  },
  {
    id: 'R05',
    source: 'CSV',
    fields: {
      Date: '06 Apr 2025',
      Details: 'Studio desk replacement',
      Value: '$240.00',
      Reference: 'F-107',
    },
    columns: { date: 'Date', description: 'Details', amount: 'Value', reference: 'Reference' },
  },
];
export const workbenchStages = [
  {
    name: 'Raw data',
    title: 'Same subject. Different document shapes.',
    description:
      'Five fictional rows arrive with different column names, date styles and amount formatting. Keep each record’s identity as it moves through the process.',
    change: 'Original field names and values are preserved.',
  },
  {
    name: 'Map & normalise',
    title: 'Make the fields comparable.',
    description:
      'Map each source column to a common field. Trim descriptions, parse unambiguous dates and represent amounts as integer cents before displaying AUD.',
    change:
      'Posted → date · Memo → description · Debit → amount. R02 and R05 now share an ISO date format.',
  },
  {
    name: 'Check quality',
    title: 'Keep the exceptions in view.',
    description:
      'Compare the normalised fields and check required values. Flag a possible repeat and an incomplete record; neither silently disappears.',
    change: 'R03 matches R01’s date, description, amount and reference. R04 has no description.',
  },
  {
    name: 'Prepare review',
    title: 'Organise what a person needs to see.',
    description:
      'Attach fictional review categories to valid, non-repeated records. Keep held records separate from the review-ready set.',
    change: 'R01, R02 and R05 are ready for review. These example categories make no tax decision.',
  },
  {
    name: 'Human review',
    title: 'A suggestion is a starting point.',
    description:
      'R05 is suggested as General supplies. Try Equipment review, then confirm the category. The missing and repeated rows stay held.',
    change:
      'Your correction changes this illustration only. It does not approve a tax claim or alter the original DAITA application.',
  },
];
export const reviewCategories = ['General supplies', 'Equipment review'] as const;
export type ReviewCategory = (typeof reviewCategories)[number];
