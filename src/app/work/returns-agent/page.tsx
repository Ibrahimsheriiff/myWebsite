import Link from 'next/link';
import { Navigation } from '@/components/site-controls';
import { CaseStudyLinks } from '@/components/case-study-links';
import { PolicyPlayground } from '@/components/policy-playground';
import { returnsStudy as study } from '@/content/compact-studies';
import { profile } from '@/content/identity';
import { studyMetadata, studySchema } from '@/lib/study-metadata';
import '../compact.css';
export const metadata = studyMetadata('returns-agent', study.title, study.description);
export default function ReturnsAgent() {
  return (
    <>
      <a className="skip-link" href="#returns-main">
        Skip to case study
      </a>
      <div id="top" />
      <Navigation homeLinks />
      <main id="returns-main" className="compact-study returns-study">
        <article>
          <header className="ra-opening">
            <div className="shell">
              <div className="compact-kicker">
                <Link className="text-link" href="/#work">
                  All work
                </Link>
                <p className="mono">AUTONOMOUS RETURNS & RESOLUTION AGENT</p>
              </div>
              <div className="ra-cover-grid">
                <h1>
                  Let AI
                  <br />
                  understand.
                  <br />
                  <span className="serif">Let rules decide.</span>
                </h1>
                <div>
                  <p className="mono">INDEPENDENT ENGINEERING PROTOTYPE</p>
                  <p>
                    I built a returns workflow around a simple separation: language models can
                    interpret a request, but deterministic software should own the policy outcome.
                  </p>
                  <p>
                    LangGraph connects that interpretation to order lookup, structured state,
                    clarification, reply drafting and final validation.
                  </p>
                  <a className="text-link" href="#policy-playground">
                    Try a fictional decision boundary ↓
                  </a>
                </div>
              </div>
              <div className="ra-responsibility-strip">
                <span>Interpret the request</span>
                <span>Retrieve trusted order data</span>
                <span>Apply deterministic policy</span>
                <span>Draft & validate the reply</span>
              </div>
            </div>
          </header>
          <section id="workflow" className="compact-section shell" aria-labelledby="workflow-title">
            <div className="compact-section-heading">
              <p className="mono">01 / SEPARATING RESPONSIBILITIES</p>
              <h2 id="workflow-title">Policy owns the decision.</h2>
              <p>
                A request can be incomplete or conversational. The graph checks the available
                context before lookup, clarification or policy. The current order tool reads a mock
                store; it is not a production order API.
              </p>
            </div>
            <div className="ra-workflow">
              <div className="ra-loop">
                <span className="mono">TOOL LOOP</span>
                <p>
                  <code>agent</code> → <code>tools</code> → <code>observe_tool</code> →{' '}
                  <code>agent</code>
                </p>
              </div>
              <div className="ra-workflow-body">
                <p>
                  <code>parse_response</code>
                </p>
                <div>
                  <p>
                    Missing context → <code>ask_customer</code> → <code>validate</code>
                  </p>
                  <p>
                    Ready for policy → <code>policy</code> → <code>draft_reply</code> →{' '}
                    <code>validate</code>
                  </p>
                </div>
              </div>
              <p className="compact-note">
                Source-grounded logical flow, not a recorded execution. A parsed response can also
                force an order lookup. Waiting requests can resume with prior state; terminal
                tickets are protected from reopening.
              </p>
            </div>
            <div className="ra-boundary-note">
              <p>
                The model’s structured route is validated with Pydantic. The policy outcome is
                stored separately, and the reply model supplies wording rather than replacing the
                decision.
              </p>
              <p>
                Final output is checked again. Shape validation helps enforce the interface; it
                cannot guarantee correct interpretation, correct policy or appropriate wording.
              </p>
            </div>
          </section>
          <section
            id="policy-playground"
            className="ra-playground-section compact-section"
            aria-labelledby="policy-title"
          >
            <div className="shell">
              <div className="compact-section-heading">
                <p className="mono">02 / POLICY PLAYGROUND</p>
                <h2 id="policy-title">
                  Change the facts.
                  <br />
                  <span className="serif">Inspect the boundary.</span>
                </h2>
                <p>
                  This smaller, fictional policy illustrates the separation. Change structured
                  attributes to see the rule and deterministic result; no conversation is generated.
                </p>
              </div>
              <PolicyPlayground />
            </div>
          </section>
          <section
            id="verification"
            className="compact-section shell"
            aria-labelledby="ra-verification-title"
          >
            <div className="compact-section-heading">
              <p className="mono">03 / TESTING THE BOUNDARIES</p>
              <h2 id="ra-verification-title">What the tests cover.</h2>
            </div>
            <div className="ra-test-ledger">
              <div>
                <span className="mono">RÉSUMÉ BASELINE</span>
                <h3>13 automated tests</h3>
                <p>
                  The documented accomplishment covers rules, missing information, invalid inputs
                  and tool interactions.
                </p>
              </div>
              <div>
                <span className="mono">PINNED SOURCE / OFFLINE REVIEW</span>
                <h3>16 passed · 3 skipped</h3>
                <p>
                  19 collected: eight workflow tests, four policy tests, three tool tests, one
                  golden-suite test and three optional live tests. Deterministic model doubles
                  exercised the offline graph.
                </p>
              </div>
              <div>
                <span className="mono">EXTERNAL-SERVICE LIMIT</span>
                <h3>Live calls were not run.</h3>
                <p>
                  The three live-model tests were deliberately skipped. LangSmith decorators
                  instrument workflow, tool and parser calls; no hosted traces or private reasoning
                  are displayed here.
                </p>
              </div>
            </div>
          </section>
          <section id="ra-reflection" className="compact-section shell compact-two-column">
            <div>
              <p className="mono">04 / LOOKING BACK</p>
              <h2>
                The useful work
                <br />
                is at the handoff.
              </h2>
            </div>
            <div>
              <p>
                This project demonstrates my experience separating probabilistic interpretation from
                deterministic decisions, then testing the handoffs between them. Tool failures,
                incomplete context and resumed requests matter as much as the happy path.
              </p>
              <p>
                I would extend malformed-output and provider-failure tests before treating the
                prototype as an operational service. The existing source and successful offline run
                establish a tested prototype, not production readiness.
              </p>
              <a
                className="text-link"
                href={study.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the Returns Agent source ↗
              </a>
            </div>
          </section>
          <footer className="compact-end shell">
            <p className="serif">Clear decisions need clear responsibilities.</p>
            <div className="compact-end-actions">
              <Link className="text-link" href="/work/mediquery/">
                Explore MediQuery ↗
              </Link>
              <a className="text-link" href={profile.resume}>
                Résumé PDF
              </a>
              <a className="text-link" href="#top">
                Back to top ↑
              </a>
            </div>
            <CaseStudyLinks current="returns-agent" />
          </footer>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            studySchema('returns-agent', study.title, study.description),
          ).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
