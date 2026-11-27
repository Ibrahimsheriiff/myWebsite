export const evidenceSources = [
  {
    id: 'S01',
    title: 'North bed notebook',
    vector: [1, 0.04],
    paragraphs: [
      'The north bed received water in the early morning.',
      'The same notebook recorded covered soil beside the planting rows.',
    ],
  },
  {
    id: 'S02',
    title: 'Morning watering notes',
    vector: [0.98, 0.1],
    paragraphs: [
      'The morning notes describe watering before the garden opened.',
      'A second entry repeats the north bed watering observation.',
    ],
  },
  {
    id: 'S03',
    title: 'Measuring containers',
    vector: [0.8, 0.6],
    paragraphs: [
      'The container sheet records water in marked measuring vessels.',
      'The sheet describes how the vessels were labelled before use.',
    ],
  },
  {
    id: 'S04',
    title: 'Shade observations',
    vector: [0.6, -0.8],
    paragraphs: [
      'The shade notes describe a covered corner of the garden.',
      'Those notes concern shade, rather than a watering schedule.',
    ],
  },
] as const;
export const journeyStages = [
  'Sources',
  'Chunks',
  'Vectors',
  'Select',
  'Context',
  'Answer',
] as const;
export const journeyQuery = [1, 0] as const;
