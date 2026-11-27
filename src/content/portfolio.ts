export { profile, stages } from './identity';
export type Evidence = {
  status:
    | 'authoritative-resume-supported'
    | 'repository-supported'
    | 'user-confirmed'
    | 'historical'
    | 'unresolved'
    | 'unsupported';
  source: string;
  note?: string;
};
export type Project = {
  id: string;
  name: string;
  context: string;
  contribution: string;
  challenge: string;
  outcome: string;
  technologies: string[];
  href?: string;
  caseStudy?: string;
  asset?: string;
  evidence: Evidence[];
};
export const resumeSource = 'content-sources/resume/IBRAHIM_RESUME_Graduate.pdf';
const currentEvidence: Evidence = {
  status: 'authoritative-resume-supported',
  source: resumeSource,
};
export const editorial = {
  introduction:
    'I’m a software engineer based in Sydney. I build across the stack, from interfaces and backend services to distributed workflows and AI-powered systems. I’m particularly interested in the decisions that make software work reliably in practice.',
  automark: [
    'I led the backend work on our capstone grading platform and developed frontend integrations connecting student and lecturer dashboards to REST APIs.',
    'SVN submissions fed a durable job queue, independent grading workers on AWS and isolated Docker execution. We tested 200 concurrent submissions end to end: all 200 were accepted and graded.',
  ],
  demoReflection:
    'A Docker volume issue interrupted our demonstration. I investigated, fixed the problem and successfully demonstrated the system afterwards. A useful reminder to test the environment as carefully as the code.',
  equityguard: [
    'I built a full-stack financial risk platform with React and FastAPI, bringing six market, news, analysis and retrieval tools into one application.',
    'A custom Claude tool-selection loop returns structured results, with input validation and error handling around the workflow. I built 23 automated tests, run through GitHub Actions to catch regressions.',
  ],
  daita: [
    'Working with Deloitte Australia stakeholders in a WSU team, I helped build DAITA: a tax decision-support application for processing financial documents, classifying transactions and producing reports.',
    'I developed the FastAPI and Pydantic application, its document-processing pipeline and a versioned tax knowledge engine. Secure uploads and background processing led into classification corrections, approvals and report exports.',
  ],
  aboutLead: 'I grew up in Chittagong, Bangladesh. These days, Sydney is home.',
  about: [
    'I studied Computer Science at Western Sydney University from March 2023 to January 2026, earning High Distinctions in Artificial Intelligence, Distributed Systems and Programming, and Professional Experience.',
    'Our AutoMark demo hit a Docker volume issue. Getting it running again was a reminder that a system includes its environment, not just its code. I like working through those connections.',
    'Away from the keyboard, I enjoy travelling, discovering new places and exploring business ideas. I’m especially interested in the everyday workings of a business, and where a little software might help.',
  ],
  kafela:
    'an ongoing exploration of software for travel agency operations, from bookings and payments to the details that keep a trip moving.',
  lab: 'A space to pull systems apart, follow the connections and see why things work.',
  labFuture:
    'Five working experiments: grading queues, agent hand-offs, evidence journeys, resolution workflows and document review. Pick a system and change something.',
  contact: [
    'I’m looking for opportunities to work with people who enjoy solving interesting problems and building useful technology.',
    'A role, a project, or just an interesting idea — I’d love to hear from you.',
  ],
} as const;
export const equityArchitecture = {
  request: 'Ticker + research question',
  tools: [
    { id: 'market', title: 'Market data', detail: 'Price · volatility' },
    { id: 'technicals', title: 'Technical signals', detail: 'RSI · MACD' },
    { id: 'news', title: 'News context', detail: 'Headlines · summaries' },
    { id: 'context', title: 'Company context', detail: 'Earnings · two retrieval tools' },
  ],
  response: ['risk_score', 'risk_label', 'explanation'],
  note: 'Six tools, grouped here into four areas. Each result returns to the loop before the next tool is selected.',
} as const;
export const financialWorkflow = [
  {
    title: 'Ingest & validate',
    detail:
      'Secure uploads of CSV, Excel and scanned PDFs. Map columns, normalise data, detect duplicates and validate.',
  },
  {
    title: 'Apply tax knowledge',
    detail:
      'A versioned Python engine matches classified transactions to ATO rules, with references and documentation requirements.',
  },
  {
    title: 'Review, approve & export',
    detail:
      'Consultants can correct classifications, review references and confidence scores, approve the work and export reports.',
  },
] as const;
export const projects: Project[] = [
  {
    id: 'automark',
    name: 'AutoMark',
    href: '/work/automark/',
    context: 'Final-year capstone · Western Sydney University · July–November 2025',
    contribution: 'Backend Lead; frontend development and REST API integration',
    challenge: 'Connect submission intake, distributed grading and usable feedback.',
    outcome: 'An end-to-end platform accepted by the sponsor after a live demonstration.',
    technologies: ['Python', 'FastAPI', 'JavaScript', 'Docker', 'SVN', 'AWS'],
    asset: '/assets/img/dashboard.png',
    evidence: [
      currentEvidence,
      {
        status: 'user-confirmed',
        source: 'Phase 1 and Phase 2A.1 briefs',
        note: '43 API endpoints. Queue, AWS workers and reported test measurements now also supported by the authoritative graduate résumé.',
      },
      {
        status: 'historical',
        source: 'assets/resume/Ibrahim Sharif Resume v4.pdf',
        note: 'Historical sponsor-acceptance outcome; not the primary professional source.',
      },
      {
        status: 'historical',
        source: 'assets/img/system architecture.png',
        note: 'Earlier development topology; not a complete AWS deployment diagram.',
      },
    ],
  },
  {
    id: 'equityguard',
    name: 'EquityGuard',
    context: 'Full-Stack AI Financial Risk Platform',
    contribution:
      'Built the React/FastAPI application, tool-selection workflow and regression tests.',
    challenge:
      'Connect six financial and retrieval tools with structured results and clear error handling.',
    outcome: '23 automated tests and GitHub Actions regression testing.',
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Claude API',
      'ChromaDB',
      'Docker',
      'GitHub Actions',
    ],
    href: 'https://github.com/Ibrahimsheriiff/equityguard',
    evidence: [
      currentEvidence,
      {
        status: 'repository-supported',
        source:
          'https://github.com/Ibrahimsheriiff/equityguard/blob/6801099818177cb1aad758c7880dbb94901be129/src/agent/tool_registry.py',
        note: 'Pinned Phase 2B review: six tools; direct Claude custom loop. 23/23 offline checks passed: 9 guardrails, 7 test-local calculation examples, 7 evaluation definitions. No API/end-to-end coverage claim. LangChain remains résumé-listed, not the implemented orchestrator.',
      },
      {
        status: 'repository-supported',
        source:
          'https://github.com/Ibrahimsheriiff/equityguard/blob/6801099818177cb1aad758c7880dbb94901be129/src/rag/retriever.py',
        note: 'Current source has a vector query path and ChromaDB ingestion; separate company-document tool matches ticker filenames. README is older. Runtime readiness unresolved; no deployment claim.',
      },
    ],
  },
  {
    id: 'daita',
    name: 'Deloitte DAITA',
    context: 'University-industry collaboration · WSU · March–June 2025',
    contribution:
      'Application features, document ingestion, tax knowledge and human-review workflows.',
    challenge: 'Turn heterogeneous financial documents into validated, reviewable tax decisions.',
    outcome:
      'A tax decision-support application with corrections, approvals and structured report exports.',
    technologies: ['Python', 'FastAPI', 'Pydantic', 'Pandas'],
    evidence: [
      currentEvidence,
      {
        status: 'user-confirmed',
        source: 'Phase 2A.1 brief',
        note: 'University team working with Deloitte Australia stakeholders; not employment. No project AWS service established.',
      },
    ],
  },
];
export const secondaryProjects: Project[] = [
  {
    id: 'mediquery',
    caseStudy: '/work/mediquery/',
    name: 'MediQuery',
    context: 'Clinical RAG & Document Retrieval Platform',
    contribution: 'Built a full-stack biomedical research application with React and FastAPI.',
    challenge: 'Connect medical literature search and generated answers to source citations.',
    outcome:
      'Automated PubMed ingestion, ChromaDB embedding storage, BioBERT and MMR retrieval, with modular ingestion, search and answer generation. A research application, not a clinically validated product.',
    technologies: ['Python', 'FastAPI', 'React', 'LangChain', 'ChromaDB', 'BioBERT', 'Docker'],
    href: 'https://github.com/Ibrahimsheriiff/mediquery',
    evidence: [
      currentEvidence,
      {
        status: 'repository-supported',
        source:
          'https://github.com/Ibrahimsheriiff/mediquery/blob/2d68d497ac46bd4f4129b7e5d93f4629418a3415/README.md',
        note: 'Phase 2D pinned source review: exact BioBERT model, character chunks, MMR k=5/fetch_k=15 and separate answer/source retrieval verified in code. Four API checks passed with service boundaries stubbed; no live retrieval or quality claim.',
      },
    ],
  },
  {
    id: 'returns-agent',
    caseStudy: '/work/returns-agent/',
    name: 'Autonomous Returns & Resolution Agent',
    context: 'Deterministic rules · 13-test baseline',
    contribution:
      'Built a multi-step LangGraph workflow for customer requests and order retrieval.',
    challenge:
      'Let the model interpret requests while deterministic code enforces business policy.',
    outcome:
      'Pydantic-validated structured decisions, a 13-test baseline covering rules, missing information, invalid inputs and tools, and LangSmith tracing for failure investigation. A pinned offline review passed 16 tests; three live-model tests were skipped.',
    technologies: [
      'Python',
      'LangGraph',
      'LangChain',
      'Claude API',
      'Pydantic',
      'Pytest',
      'LangSmith',
    ],
    href: 'https://github.com/Ibrahimsheriiff/autonomous-returns-agent',
    evidence: [
      currentEvidence,
      {
        status: 'repository-supported',
        source:
          'https://github.com/Ibrahimsheriiff/autonomous-returns-agent/blob/d61617e6b6b554294a27a781b468bcab0427fd29/README.md',
        note: 'Phase 2D: 19 collected, 16 passed offline, 3 live tests skipped. Retain résumé’s 13-test accomplishment as a baseline. Source unchanged; no assessment policies, customer fixtures or private traces published.',
      },
    ],
  },
  {
    id: 'supplier-risk',
    name: 'Supplier Risk Pulse',
    context: 'Earlier work · Operational risk',
    contribution: 'Built a full-stack procurement risk dashboard.',
    challenge: 'Make supplier and invoice CSV data useful for operational decisions.',
    outcome: 'CSV ingestion, validation and explainable risk drivers in a searchable dashboard.',
    technologies: ['React', 'Node.js', 'Express'],
    href: 'https://github.com/Ibrahimsheriiff/Supplier-Risk-Pulse',
    evidence: [{ status: 'historical', source: 'assets/resume/Ibrahim Sharif Resume v4.pdf' }],
  },
  {
    id: 'interview-ai',
    name: 'Practice Interview AI',
    context: 'Earlier work · Interview practice',
    contribution: 'Built an AI-powered interview practice application.',
    challenge: 'Create practice questions and feedback around an interview conversation.',
    outcome: 'Dynamic questions, answer evaluation and automated feedback.',
    technologies: ['Python', 'Streamlit', 'OpenAI API'],
    href: 'https://github.com/Ibrahimsheriiff/interview-bot',
    evidence: [{ status: 'historical', source: 'assets/resume/Ibrahim Sharif Resume v4.pdf' }],
  },
];
