import { experiments } from '@/content/lab/experiments';
import Link from 'next/link';
import { LabBreadcrumb, WorkloadSketch } from '@/components/lab/lab-foundations';
import { labMetadata } from '@/lib/lab/metadata';
export const metadata = labMetadata();
export default function LabPage() {
  return (
    <>
      <div className="shell">
        <LabBreadcrumb />
        <section className="lab-cover" aria-labelledby="lab-heading">
          <p className="lab-eyebrow">THE ENGINEERING LAB / AN OPEN WORKBENCH</p>
          <h1 id="lab-heading">
            Let’s take
            <br />
            things apart.
            <br />
            <span className="serif">
              And see how
              <br />
              they work.
            </span>
          </h1>
          <div className="lab-cover-note">
            <span className="lab-note-line" aria-hidden="true" />
            <p>
              A collection of small, interactive experiments inspired by systems I’ve built. Change
              something, follow the consequences and explore what’s happening underneath.
            </p>
            <p className="serif">The interesting part is what changes.</p>
          </div>
          <a href="#available" className="lab-text-link lab-cover-link">
            Explore AutoMark’s workload
          </a>
          <nav className="lab-quick-index" aria-label="Choose an experiment">
            <span>AVAILABLE NOW</span>
            {experiments.map((e) => (
              <Link key={e.slug} prefetch={false} href={`/lab/${e.slug}/`}>
                {e.name}
              </Link>
            ))}
          </nav>
        </section>
      </div>
      <section id="available" className="lab-available" aria-labelledby="available-title">
        <div className="shell">
          <div className="lab-edition">
            <span>AVAILABLE TO EXPLORE</span>
            <span>FIVE EXPERIMENTS / FIVE QUESTIONS</span>
          </div>
          <div className="lab-feature-heading">
            <div>
              <p className="lab-eyebrow">AUTOMARK / WORKLOAD SIMULATOR</p>
              <h2 id="available-title">
                Accept first.
                <br />
                <span className="serif">Finish independently.</span>
              </h2>
            </div>
            <div>
              <p>
                Send a burst of submissions into a queue. Change the worker count. Give one job too
                long to finish. Watch what each decision changes.
              </p>
              <Link className="lab-launch" href="/lab/automark/" prefetch={false}>
                Open the workload simulator<span aria-hidden="true">＋</span>
              </Link>
            </div>
          </div>
          <WorkloadSketch />
          <div className="lab-feature-foot">
            <p>Browser-only · deterministic · synthetic timings</p>
            <Link className="lab-text-link" href="/work/automark/">
              Read the engineering case study
            </Link>
          </div>
        </div>
      </section>
      <section className="shell lab-collection" aria-labelledby="collection-title">
        <header>
          <p className="lab-eyebrow">FOUR MORE WAYS IN</p>
          <h2 id="collection-title">
            Different systems.
            <br />
            <span className="serif">Different questions.</span>
          </h2>
          <p>
            Each workbench opens a different part of the engineering story. Pick the question that
            catches you.
          </p>
        </header>
        <article className="lc-equity">
          <div>
            <p className="lab-eyebrow">EQUITYGUARD / AGENT EXECUTION REPLAY</p>
            <h3>
              What can you observe
              <br />
              about an agent?
            </h3>
            <p>
              Follow a prepared request, inspect its tool payload and stop at the boundaries of a
              structured response.
            </p>
            <Link prefetch={false} className="lab-text-link" href="/lab/equityguard/">
              Explore the agent replay
            </Link>
          </div>
          <figure className="lc-packets">
            <figcaption>Observable hand-offs / logical preview</figcaption>
            <div>
              <span>
                Request
                <br />
                <small>ticker: FICT</small>
              </span>
              <span>
                Tool result
                <br />
                <small>public dictionary</small>
              </span>
              <span>
                Response
                <br />
                <small>check the shape</small>
              </span>
            </div>
          </figure>
        </article>
        <article className="lc-evidence">
          <figure>
            <figcaption>Fictional evidence / identity retained</figcaption>
            <div>
              <strong>S01</strong>
              <p>Source record</p>
              <span>S01-C1 / paragraph chunk</span>
              <span>[S01-C1] / prepared statement</span>
            </div>
          </figure>
          <div>
            <p className="lab-eyebrow">MEDIQUERY / EVIDENCE JOURNEY</p>
            <h3 className="serif">
              Where does a source
              <br />
              become a sentence?
            </h3>
            <p>
              Prepare chunks, change retrieval and inspect the references attached to a prepared
              answer.
            </p>
            <Link prefetch={false} className="lab-text-link" href="/lab/mediquery/">
              Follow the evidence journey
            </Link>
          </div>
        </article>
        <article className="lc-returns">
          <div>
            <p className="lab-eyebrow">RETURNS AGENT / RESOLUTION WORKFLOW</p>
            <h3>
              A rule needs
              <br />
              <span className="serif">something to work with.</span>
            </h3>
            <p>
              Supply a missing fictional reference, resume lookup and see why language and policy
              have different jobs.
            </p>
            <Link prefetch={false} className="lab-text-link" href="/lab/returns-agent/">
              Explore the resolution workflow
            </Link>
          </div>
          <figure>
            <figcaption>A clarification branch / logical preview</figcaption>
            <div>
              <span>Reference?</span>
              <ul>
                <li>Missing → ask for details</li>
                <li>Present → lookup → policy</li>
              </ul>
            </div>
          </figure>
        </article>
        <article className="lc-daita">
          <figure>
            <figcaption>Document quality / logical preview</figcaption>
            <div>
              <span>Original</span>
              <span>Reviewable</span>
              <p>When</p>
              <p>date</p>
              <p>Value</p>
              <p>integer cents</p>
              <p>Exception</p>
              <p>kept in view</p>
            </div>
          </figure>
          <div>
            <p className="lab-eyebrow">DAITA / DOCUMENT QUALITY &amp; REVIEW</p>
            <h3>Keep the awkward rows.</h3>
            <p>
              Map a column, repair a field and make a review decision. Every record keeps its source
              identity.
            </p>
            <Link prefetch={false} className="lab-text-link" href="/lab/daita/">
              Open the document-review workspace
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
