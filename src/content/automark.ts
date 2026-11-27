import { resumeSource, type Evidence } from './portfolio';

export {
  systemComponents,
  systemConnections,
  systemLanes,
  automarkBenchmark,
} from './automark-system';

export const automarkStudy = {
  title: 'Engineering a better way to assess code.',
  description:
    'How our team connected full-stack application features, a durable queue and independent AWS grading workers — tested with 200 concurrent submissions.',
  period: 'July–November 2025',
  chapters: [
    { id: 'problem', title: 'The problem' },
    { id: 'ownership', title: 'What I owned' },
    { id: 'system', title: 'Inside the system' },
    { id: 'decisions', title: 'Engineering decisions' },
    { id: 'demo', title: 'The demonstration' },
    { id: 'results', title: 'Verification & results' },
    { id: 'reflection', title: 'Looking back' },
  ],
  ownership: [
    {
      title: 'Core services & access',
      text: 'I designed and developed FastAPI services for JWT authentication, role-based access, subject enrolment, assignment management and submission tracking. The backend contained 43 API endpoints.',
    },
    {
      title: 'Frontend & API integration',
      text: 'I developed HTML, CSS and JavaScript features connecting student and lecturer dashboards to REST APIs for assignments, file submissions, grading results, feedback and reporting.',
    },
    {
      title: 'Distributed grading',
      text: 'I built the submission-to-feedback workflow, including isolated Docker execution, a durable job queue and independent grading workers on AWS.',
    },
  ],
  decisions: [
    {
      label: 'Intake & execution',
      title: 'Why keep accepting work separate from grading it?',
      body: 'I implemented a durable queue and independent AWS workers so incoming submissions could be accepted separately from the work of executing student programs and grading scripts.',
      tradeoff:
        'That separation introduces handoffs between intake, queued jobs and workers. The résumé establishes the architecture, but does not specify a broker, retry guarantees or delivery semantics.',
    },
    {
      label: 'Isolated execution',
      title: 'Give submitted code its own execution environment.',
      body: 'Student programs and grading scripts ran in isolated Docker containers. The worker coordinates grading work while the container provides the execution environment.',
      tradeoff:
        'The environment still needs access to the correct code and scripts. Container isolation is one boundary; it is not a claim that arbitrary execution becomes completely secure.',
    },
    {
      label: 'Full-stack integration',
      title: 'Make the outcome usable in the application.',
      body: 'JWT and role-based access sit alongside enrolment, assignment management and submission tracking. I also connected frontend features to the APIs that return results, feedback and reporting data.',
      tradeoff:
        'The complete workflow crosses browser, service, queue and execution boundaries. The 200-submission test exercised that end-to-end path; it does not isolate the contribution of each component.',
    },
  ],
  future: [
    {
      title: 'Make the environment reproducible',
      text: 'I would extend clean-environment checks around volume configuration and the complete submission path before a demonstration.',
    },
    {
      title: 'Keep the measurements reproducible',
      text: 'I would keep raw test logs, timing definitions, workload and infrastructure details alongside the reported results so another engineer could repeat the test.',
    },
  ],
  evidence: [
    {
      status: 'authoritative-resume-supported',
      source: resumeSource,
      note: 'Full-stack contribution, durable queue, independent AWS workers, all 200 jobs accepted and graded, 18.17s intake, P95 155s/P99 157s, approximate 15-minute prior manual workflow, 97/100 and nomination.',
    },
    {
      status: 'user-confirmed',
      source: 'Phase 2A.1 brief',
      note: 'Backend Lead and 43 API endpoints; Docker-volume demonstration experience retained.',
    },
    {
      status: 'historical',
      source: 'assets/img/system architecture.png',
      note: 'Earlier development layout; the new diagram is a reconciled logical view, not a reproduction of current physical AWS deployment.',
    },
  ] satisfies Evidence[],
} as const;
export const caseNarrative = {
  problemLead:
    'Manual grading previously took approximately 15 minutes per submission. The repetitive work was in accepting code, running it, applying grading scripts and getting feedback back to the student.',
  problemBody:
    'Our WSU capstone team built AutoMark to connect those steps. Students needed a dependable submission path and access to their results; lecturers needed assignment management, grading controls and reporting. The approximate manual time describes the starting problem, not a measured speed-up ratio.',
  studentWorkflow:
    'Submit code through SVN, then use the dashboard to access grading results and feedback. The code-submission path and the application need to agree about the work being assessed.',
  lecturerWorkflow:
    'Manage subjects and assignments, track submissions, review grading results and use feedback and reporting through the application.',
  ownershipLead:
    'I served as Backend Lead, with work across the application: core FastAPI services, frontend integrations and distributed grading.',
  teamOwnership:
    'AutoMark was a team delivery. My contribution included developing and integrating dashboard features, alongside the backend and execution workflow; it was not sole ownership of the whole product.',
  systemIntroduction:
    'An SVN commit starts the submission path. Intake hands grading work to a durable queue; independent workers on AWS run isolated Docker grading jobs. Application services then make the outcomes useful in the dashboards.',
  mapIntroduction:
    'This is a logical view reconciled from the graduate résumé and earlier project drawing. The components are established; exact AWS products, physical boundaries and some handoff protocols are deliberately abstracted.',
  decisionsIntroduction:
    'The main engineering question was how to connect incoming submissions, independent grading and the application people actually use. These choices explain that separation and the responsibilities around it.',
  authentication:
    'I implemented JWT authentication and role-based access in the application services. Enrolment, assignments and submission tracking made those services more than a wrapper around the grading worker. The earlier project drawing also identifies a separate SSH/SVN entry point.',
  demoExperience:
    'A Docker volume issue interrupted our demonstration. I investigated, fixed the problem and successfully demonstrated the system afterwards.',
  demoReflection:
    'The experience reinforced the same lesson as the distributed workflow: the connections matter. Code, scripts, containers and the environment have to work together for the application to produce a useful result.',
  demoLesson:
    'It is why I want to test the complete path in its target environment, as well as the individual services. The specific root cause and recovery steps are not reconstructed here.',
  delivery:
    'In the end-to-end test, all 200 concurrent submissions were accepted and all 200 jobs were graded.',
  achievements:
    'The capstone received 97/100 and was nominated for Best Capstone Project. The backend contained 43 API endpoints, and the completed platform was demonstrated successfully.',
  concurrencyContext:
    'The reported results show what happened in that project test. They do not establish a production workload, sustained throughput or an infrastructure-capacity guarantee.',
  lookingBackLead:
    'The useful outcome was a complete system: submit code, accept the work, execute grading independently and return something students and lecturers could use.',
  lookingBackBody:
    'Leading the backend also took me into frontend integration and the decisions between services. I enjoyed connecting those responsibilities and checking the behaviour across the whole workflow.',
  lookingBackNext:
    'The demonstration and concurrency test gave me different kinds of feedback: one exposed an environment dependency, while the other put numbers around the end-to-end workflow. These are the areas I would develop further.',
} as const;
