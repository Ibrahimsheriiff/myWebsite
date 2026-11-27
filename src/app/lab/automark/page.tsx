import Link from 'next/link';
import { LabBreadcrumb, SimulationBoundary } from '@/components/lab/lab-foundations';
import { ExperimentLinks } from '@/components/lab/experiment-frame';
import { WorkloadSimulator } from '@/components/lab/workload-simulator';
import { labMetadata } from '@/lib/lab/metadata';
import { createWorkload, workloadReducer } from '@/lib/lab/workload-engine';
export const metadata = labMetadata(true);
export default function WorkloadPage() {
  const example = (workers: number) => {
    let state = workloadReducer(createWorkload({ jobs: 6, workers, scenario: 'steady' }), {
      type: 'start',
    });
    while (state.status === 'running') state = workloadReducer(state, { type: 'tick' });
    return state.time;
  };
  const application = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AutoMark Workload Simulator',
    url: 'https://ibrahimsheriiff.com/lab/automark/',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web browser',
    description:
      'An illustrative deterministic simulation of submission intake, queueing and independent grading workers. Synthetic timings, no external services.',
    author: { '@type': 'Person', name: 'Ibrahim Sharif' },
  };
  return (
    <>
      <div className="shell">
        <LabBreadcrumb experiment />
        <header className="experiment-cover">
          <p className="lab-eyebrow">AUTOMARK / WORKLOAD SIMULATOR</p>
          <div>
            <h1>
              Accepting
              <br />
              <span className="serif">isn’t finishing.</span>
            </h1>
            <p>
              A burst of submissions. A queue. A few independent workers. Change the workload and
              follow what happens between submit and result.
            </p>
          </div>
          <SimulationBoundary />
        </header>
        <WorkloadSimulator />
        <noscript>
          <aside className="lab-nojs">
            <h2>A representative workload, without playback.</h2>
            <p>
              JavaScript is required for the controls. In this deterministic example, six synthetic
              jobs are all received by virtual second 1. One worker finishes them at {example(1)}s;
              three workers finish at {example(3)}s. Intake is unchanged while execution finishes
              earlier. These are model outputs, not AutoMark measurements.
            </p>
          </aside>
        </noscript>
        <section className="experiment-notes" aria-labelledby="notes-title">
          <div>
            <p className="lab-eyebrow">WHAT THE MODEL LEAVES VISIBLE</p>
            <h2 id="notes-title">
              The work
              <br />
              <span className="serif">between the steps.</span>
            </h2>
            <Link className="lab-text-link" href="/work/automark/">
              Explore the full AutoMark case study
            </Link>
          </div>
          <div className="lab-note-rows">
            <div>
              <h3>Accepted is a promise to process.</h3>
              <p>
                Intake receives jobs before grading finishes. A queue lets incoming work wait
                separately while available workers take the next job.
              </p>
            </div>
            <div>
              <h3>Independent doesn’t mean instantaneous.</h3>
              <p>
                More workers can reduce waiting in this model. They cannot make an individual
                execution shorter. Mixed durations also change completion order.
              </p>
            </div>
            <div>
              <h3>Failure is an outcome, too.</h3>
              <p>
                The timeout scenario stops one execution and frees its worker. There are no retries
                here. Completed and failed jobs are both terminal states.
              </p>
            </div>
            <div>
              <h3>Isolation is a real boundary.</h3>
              <p>
                AutoMark used isolated Docker execution for student code. These worker lanes only
                illustrate that responsibility: they execute no code and establish no production
                capacity.
              </p>
            </div>
          </div>
        </section>
        <aside className="lab-history">
          <span className="lab-eyebrow">REAL PROJECT / SEPARATE EVIDENCE</span>
          <p>
            The graduate résumé reports 200 concurrent submissions accepted and graded, intake in
            18.17 seconds, and P95/P99 grading completion of 155/157 seconds. These historical
            observations are separate from this model. Its synthetic durations are not calibrated to
            them.
          </p>
          <Link href="/work/automark/#results">Read the reported results and their limits</Link>
        </aside>
        <div className="lab-return">
          <Link className="lab-text-link" href="/lab/">
            Back to the Engineering Lab
          </Link>
          <Link className="lab-text-link" href="/work/automark/">
            AutoMark case study
          </Link>
        </div>
        <ExperimentLinks current="automark" />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(application).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
