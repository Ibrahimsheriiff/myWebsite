export const experiments = [
  {
    slug: 'automark',
    name: 'AutoMark',
    title: 'Workload Simulator',
    question: 'What changes when another worker joins?',
    description:
      'Separate accepting work from finishing it. Compare queues, workers and completed runs.',
    boundary: 'Fictional jobs and virtual seconds. No original runtime or code execution.',
  },
  {
    slug: 'equityguard',
    name: 'EquityGuard',
    title: 'Agent Execution Replay',
    question: 'What can you observe about an agent?',
    description:
      'Follow a prepared tool request, its result and the boundary of a structured response.',
    boundary:
      'Prepared fictional replay, not a live agent or investment assessment. No models, market data or hidden reasoning.',
  },
  {
    slug: 'mediquery',
    name: 'MediQuery',
    title: 'Evidence Journey',
    question: 'Where does a source become a statement?',
    description:
      'Carry fictional research from source records through chunks, selection and prepared answer references.',
    boundary:
      'Fictional garden research, synthetic vectors and prepared statements. No PubMed, BioBERT inference or live generation. Highlighting is authored, not automatic citation verification.',
  },
  {
    slug: 'returns-agent',
    name: 'Returns Agent',
    title: 'Resolution Workflow',
    question: 'What happens before a rule can decide?',
    description:
      'Resolve missing information, inspect a trusted fictional record and follow the policy outcome.',
    boundary:
      'Educational workflow with prepared interpretations and fictional rules. No original assessment policy, consumer-rights determination or live model.',
  },
  {
    slug: 'daita',
    name: 'DAITA',
    title: 'Document Quality & Review',
    question: 'What should happen to the awkward rows?',
    description:
      'Map columns, repair missing fields and keep every exception visible through human review.',
    boundary:
      'Synthetic records and educational controls, not original client data or DAITA execution. No uploads, tax rules, eligibility decisions or confidence scores.',
  },
] as const;
export type ExperimentSlug = (typeof experiments)[number]['slug'];
