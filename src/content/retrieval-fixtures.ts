// Entirely synthetic vectors and document labels; no scientific findings.
export const retrievalQuery = [1, 0];
export const retrievalDocuments = [
  { id: 'A', title: 'Cohort notes', vector: [1, 0.05], note: 'One direction close to the query.' },
  { id: 'B', title: 'Cohort summary', vector: [0.98, 0.1], note: 'A second document close to A.' },
  {
    id: 'C',
    title: 'Sampling appendix',
    vector: [0.8, 0.6],
    note: 'A different direction with some query similarity.',
  },
  {
    id: 'D',
    title: 'Measurement notes',
    vector: [0.6, -0.8],
    note: 'Another direction, farther from the A/B cluster.',
  },
  {
    id: 'E',
    title: 'Archive index',
    vector: [0, 1],
    note: 'Orthogonal to the query in this illustration.',
  },
];
