// Public logical-diagram records; provenance stays in the server-authored article module.
export type SystemComponent = {
  id: string;
  name: string;
  short: string;
  kind: string;
  technology: string;
  purpose: string;
  input: string;
  output: string;
  boundary: string;
};
export type SystemConnection = {
  from: string;
  to: string;
  label: string;
  route: 'adjacent' | 'queue' | 'results' | 'support';
  logical?: boolean;
  bidirectional?: boolean;
};
export const systemLanes = [
  {
    id: 'intake',
    title: 'Submission intake',
    context: 'Student code enters the repository through an SVN commit.',
    nodes: ['svn', 'hook', 'intake', 'queue'],
  },
  {
    id: 'execution',
    title: 'Asynchronous grading',
    context: 'Independent workers on AWS execute queued grading work.',
    nodes: ['worker', 'sandbox', 'results'],
  },
  {
    id: 'application',
    title: 'Application requests & data',
    context: 'Student and lecturer dashboards connect to REST services.',
    nodes: ['workspace', 'api', 'records'],
  },
] as const;
export const systemComponents: SystemComponent[] = [
  {
    id: 'svn',
    name: 'SVN repository',
    short: 'Stores student commits',
    kind: 'Repository',
    technology: 'SVN',
    purpose:
      'Students submit code by committing it to the SVN repository. The commit is the event; the repository is the service that accepts it.',
    input: 'A student’s SVN commit containing assignment code.',
    output: 'A stored revision and a post-commit event.',
    boundary:
      'The repository accepts the commit; the hook reacts to it. Retrieving marks follows the separate application path.',
  },
  {
    id: 'hook',
    name: 'Post-commit hook',
    short: 'Reacts to a commit',
    kind: 'Event handler',
    technology: 'SVN post-commit behaviour',
    purpose:
      'React to a committed revision and connect repository activity to submission processing. The earlier project drawing identifies the post-commit integration.',
    input: 'A post-commit event from the SVN repository.',
    output: 'Submission information passed into the intake workflow.',
    boundary:
      'The event, handler and intake are distinct responsibilities; the transport between them is abstracted.',
  },
  {
    id: 'intake',
    name: 'Submission intake',
    short: 'Accepts grading work',
    kind: 'Logical boundary',
    technology: 'Submission processing',
    purpose:
      'Accept incoming submission work before it is graded. This is a logical responsibility in the workflow, not a claim that another standalone service was deployed.',
    input: 'Submission information from the commit workflow.',
    output: 'A grading job placed in the durable queue.',
    boundary: 'Intake is separate from grading execution. Exact handoff protocols are abstracted.',
  },
  {
    id: 'queue',
    name: 'Durable job queue',
    short: 'Holds accepted jobs',
    kind: 'Queue',
    technology: 'Durable queue · product unspecified',
    purpose:
      'Keep submission intake separate from execution by holding accepted grading jobs for independent workers. I implemented the durable queue as part of the project.',
    input: 'Accepted submission jobs from intake.',
    output: 'Grading work for independent AWS workers.',
    boundary:
      'The queue is durable. Its broker product, retry policy and delivery semantics are unspecified.',
  },
  {
    id: 'worker',
    name: 'AWS grading workers',
    short: 'Independent execution workers',
    kind: 'Workers',
    technology: 'AWS · independent workers',
    purpose:
      'Process queued grading work independently of submission intake. I implemented these workers on AWS to support concurrent workloads.',
    input: 'Grading jobs from the durable queue.',
    output: 'Work passed into the isolated Docker grading environment.',
    boundary:
      'The workers run independently on AWS. Service choice, worker count and physical host boundaries remain unspecified.',
  },
  {
    id: 'sandbox',
    name: 'Docker execution',
    short: 'Runs code & grading scripts',
    kind: 'Execution environment',
    technology: 'Docker · isolated grading',
    purpose:
      'Execute submitted programs and grading scripts in an isolated container environment, producing scores and feedback.',
    input: 'A grading job, student code and its grading script.',
    output: 'Scores, feedback and execution outputs.',
    boundary:
      'Execution is isolated in Docker; exact resource restrictions and file-access mechanisms require implementation evidence.',
  },
  {
    id: 'results',
    name: 'Results & feedback',
    short: 'Retains grading outcomes',
    kind: 'Data responsibility',
    technology: 'Scores / feedback / execution outputs',
    purpose:
      'Make grading outcomes available after execution so the application can present them to students and lecturers.',
    input: 'Scores and feedback produced by grading execution.',
    output: 'Saved grading outcomes retrieved through application services.',
    boundary:
      'This is a logical results responsibility, not an invented AWS database or storage product.',
  },
  {
    id: 'workspace',
    name: 'Student & lecturer dashboards',
    short: 'Assignments, marks & reports',
    kind: 'Interface',
    technology: 'HTML / CSS / JavaScript',
    purpose:
      'Connect people to assignment management, submissions, grading results, feedback and reporting. I developed and integrated frontend features with the REST APIs.',
    input: 'Student and lecturer actions in the browser.',
    output: 'REST requests and rendered results or reports.',
    boundary:
      'My frontend integration was part of a team product. It does not imply sole ownership of every interface or design decision.',
  },
  {
    id: 'api',
    name: 'FastAPI services',
    short: 'Application & access control',
    kind: 'Application service',
    technology: 'Python / FastAPI / JWT / RBAC',
    purpose:
      'Provide JWT authentication, role-based access, subject enrolment, assignment management and submission tracking. I designed and developed these core services.',
    input: 'Authenticated application requests and requests for grading outcomes.',
    output: 'Application records, submission status, scores, feedback and reporting data.',
    boundary:
      'Application responsibilities extend beyond grading. The diagram does not prescribe a hook-to-API endpoint.',
  },
  {
    id: 'records',
    name: 'Records & grading files',
    short: 'Application data & file access',
    kind: 'Data responsibilities',
    technology: 'Application records / student code / marker scripts',
    purpose:
      'Support application records and access to the student code and marker scripts needed for grading. These are grouped data responsibilities, not one asserted physical store.',
    input: 'Application updates, student code and lecturer-provided grading scripts.',
    output: 'Data for the REST services and code/script access for grading execution.',
    boundary:
      'Records, marker scripts and outputs are distinct responsibilities. Current AWS storage products and access protocols remain unspecified.',
  },
];
export const systemConnections: SystemConnection[] = [
  { from: 'svn', to: 'hook', label: 'post-commit event', route: 'adjacent' },
  { from: 'hook', to: 'intake', label: 'submission information', route: 'adjacent', logical: true },
  { from: 'intake', to: 'queue', label: 'enqueue grading job', route: 'adjacent', logical: true },
  { from: 'queue', to: 'worker', label: 'queued grading work', route: 'queue', logical: true },
  { from: 'worker', to: 'sandbox', label: 'run grading work', route: 'adjacent' },
  { from: 'sandbox', to: 'results', label: 'scores + feedback', route: 'adjacent', logical: true },
  { from: 'results', to: 'api', label: 'retrieve outcomes', route: 'results', logical: true },
  {
    from: 'workspace',
    to: 'api',
    label: 'REST requests / results',
    route: 'adjacent',
    bidirectional: true,
  },
  {
    from: 'api',
    to: 'records',
    label: 'application data',
    route: 'adjacent',
    bidirectional: true,
    logical: true,
  },
  {
    from: 'records',
    to: 'sandbox',
    label: 'code + script access',
    route: 'support',
    logical: true,
  },
];
export const automarkBenchmark = {
  submissions: 200,
  accepted: 200,
  graded: 200,
  intakeSeconds: '18.17',
  p95Seconds: 155,
  p99Seconds: 157,
  source: 'Reported end-to-end project test · graduate résumé',
  explanation:
    'Acceptance and completion measure different parts of the workflow. The 18.17-second figure describes acceptance of all SVN commits. P95 and P99 describe grading completion; they are not averages.',
  limits:
    'The résumé does not define the exact timing origins or test setup. Intake duration is not added to grading completion. Raw logs, workload details and hardware remain to be reconciled.',
} as const;
