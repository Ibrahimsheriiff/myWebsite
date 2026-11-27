import { CaseStudyLinks } from '@/components/case-study-links';
/* eslint-disable @next/next/no-img-element -- Responsive derivatives are generated at build time for static hosting. */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/site-controls';
import { EquityGuardInspector } from '@/components/equityguard-inspector';
import { equityguardStudy, observedWorkflow, testInventory } from '@/content/equityguard';
import { profile } from '@/content/portfolio';
import './equityguard.css';

const url = 'https://ibrahimsheriiff.com/work/equityguard/';
export const metadata: Metadata = {
  title: 'EquityGuard — An agent with tools. And boundaries. | Ibrahim Sharif',
  description: equityguardStudy.description,
  alternates: { canonical: '/work/equityguard/' },
  openGraph: {
    type: 'article',
    url,
    title: equityguardStudy.title,
    description: equityguardStudy.description,
    authors: [profile.name],
    images: [
      {
        url: '/equityguard-og.png',
        width: 1200,
        height: 630,
        alt: 'EquityGuard — An agent with tools. And boundaries. An engineering case study by Ibrahim Sharif.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: equityguardStudy.title,
    description: equityguardStudy.description,
    images: ['/equityguard-og.png'],
  },
};

function BoundaryDrawing() {
  return (
    <figure
      className="eq-cover-drawing"
      aria-label="Conceptual system boundary: React interface, FastAPI boundary, a model loop and six tools. The model is one component inside the application."
    >
      <div className="eq-drawing-heading mono">
        <span>APPLICATION BOUNDARY</span>
        <span>FIG. 01</span>
      </div>
      <div className="eq-cover-stack">
        <div className="eq-cover-layer">
          <span className="mono">01 / INTERFACE</span>
          <strong>React</strong>
          <span>Request · loading · result</span>
        </div>
        <span className="eq-cover-connector" aria-hidden="true">
          ↓ ↑
        </span>
        <div className="eq-cover-layer">
          <span className="mono">02 / API</span>
          <strong>FastAPI</strong>
          <span>Validate · dispatch · shape</span>
        </div>
        <span className="eq-cover-connector" aria-hidden="true">
          ↓ ↑
        </span>
        <div className="eq-cover-agent">
          <div>
            <span className="mono">03 / ORCHESTRATION</span>
            <strong>
              Model <span className="serif">↔</span> tools
            </strong>
          </div>
          <svg viewBox="0 0 132 84" fill="none" aria-hidden="true">
            <path d="M15 42h30m0 0 24-28h43M45 42h67M45 42l24 28h43" />
            <circle cx="15" cy="42" r="8" />
            {[14, 42, 70].map((y) => (
              <g key={y}>
                <circle cx="99" cy={y} r="3" />
                <circle cx="119" cy={y} r="3" />
              </g>
            ))}
          </svg>
        </div>
      </div>
      <figcaption>
        One intelligent component.
        <br />
        <em className="serif">A whole application around it.</em>
      </figcaption>
    </figure>
  );
}

export default function EquityGuardCaseStudy() {
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: equityguardStudy.title,
    description: equityguardStudy.description,
    author: { '@type': 'Person', name: profile.name, url: 'https://ibrahimsheriiff.com/' },
    mainEntityOfPage: url,
    image: 'https://ibrahimsheriiff.com/equityguard-og.png',
    inLanguage: 'en-AU',
    about: {
      '@type': 'SoftwareApplication',
      name: 'EquityGuard',
      applicationCategory: 'EducationalApplication',
    },
  };
  return (
    <>
      <a className="skip-link" href="#equityguard-main">
        Skip to case study
      </a>
      <div id="top" />
      <Navigation homeLinks />
      <main id="equityguard-main" className="eq-case">
        <article>
          <header className="eq-opening shell">
            <div className="eq-edition">
              <Link className="text-link" href="/#work">
                All work
              </Link>
              <p className="mono">
                ENGINEERING STUDIES <span>/</span> 02 — EQUITYGUARD
              </p>
            </div>
            <div className="eq-cover-grid">
              <div className="eq-cover-copy">
                <p className="eq-project-name">
                  EquityGuard <span>/ Independent project</span>
                </p>
                <h1>
                  An agent
                  <br />
                  with tools.
                  <br />
                  <span className="serif">And boundaries.</span>
                </h1>
                <p className="eq-deck">
                  I built a full-stack financial risk application around an AI agent. The
                  interesting part is how the interface, APIs and tools give that agent somewhere
                  useful to work.
                </p>
                <div className="eq-opening-links">
                  <a className="text-link" href="#tool-inspector">
                    Inspect the six tools <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    className="text-link"
                    href={equityguardStudy.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <BoundaryDrawing />
            </div>
            <dl className="eq-facts">
              <div>
                <dt>My contribution</dt>
                <dd>Independent full-stack development</dd>
              </div>
              <div>
                <dt>Application</dt>
                <dd>React + FastAPI</dd>
              </div>
              <div>
                <dt>Agent</dt>
                <dd>Custom Python loop · Claude API</dd>
              </div>
              <div>
                <dt>Verification</dt>
                <dd>23 automated tests · GitHub Actions</dd>
              </div>
            </dl>
          </header>
          <div className="eq-question shell">
            <p className="mono eq-margin-label">01 / THE QUESTION</p>
            <div>
              <h2>
                What sits between a question
                <br />
                and a useful answer?
              </h2>
              <p className="eq-lead">
                Price history, momentum indicators, news and company documents each tell part of a
                story. EquityGuard brings those inputs into a tool-driven analysis workflow.
              </p>
              <p>
                I developed the React interface, FastAPI service, tool integrations and agent
                orchestration as one application. It explores financial risk analysis; it does not
                establish predictive accuracy or provide professional financial advice.
              </p>
            </div>
          </div>
          <section className="eq-product" aria-labelledby="eq-product-title">
            <div className="shell">
              <div className="eq-product-caption">
                <h2 id="eq-product-title">
                  A real interface.
                  <br />
                  <span className="serif">A defined request.</span>
                </h2>
                <p>
                  A watchlist and ticker search provide the entry point. React handles selection,
                  loading and errors, then presents the API’s result.
                </p>
              </div>
              <figure>
                <a
                  href="/assets/equityguard/react-watchlist.png"
                  aria-label="Open original EquityGuard React watchlist capture"
                >
                  <img
                    src="/assets/equityguard/watchlist-1600.webp"
                    srcSet="/assets/equityguard/watchlist-800.webp 800w, /assets/equityguard/watchlist-1600.webp 1600w"
                    sizes="(max-width: 700px) 100vw, 1200px"
                    width="1440"
                    height="870"
                    loading="lazy"
                    alt="Actual EquityGuard React watchlist with ticker search, ten stocks and NVDA selected. Prices are zero-value offline fixtures."
                  />
                </a>
                <figcaption>
                  <span className="mono">FIG. 02 / REACT WATCHLIST</span>
                  <span>
                    Captured locally from the source interface with zero-value offline price
                    fixtures. No market data or model calls.
                  </span>
                </figcaption>
              </figure>
            </div>
          </section>
          <section
            id="application"
            className="eq-architecture shell"
            aria-labelledby="eq-architecture-title"
          >
            <div className="eq-section-top">
              <p className="mono">02 / BEYOND THE CHATBOX</p>
              <h2 id="eq-architecture-title">
                The model is one part
                <br />
                of the application.
              </h2>
            </div>
            <div className="eq-architecture-grid">
              <div className="eq-architecture-note">
                <p>
                  Each layer owns a different responsibility. The browser makes a request; Python
                  orchestrates the work; tool functions fetch or calculate context.
                </p>
                <p className="serif eq-pull-note">
                  Useful boundaries
                  <br />
                  are software, too.
                </p>
                <span className="mono">
                  LOGICAL VIEW
                  <br />
                  SOURCE-GROUNDED / NOT A DEPLOYMENT MAP
                </span>
              </div>
              <ol className="eq-layer-list">
                <li>
                  <span className="eq-layer-number mono">01</span>
                  <div>
                    <h3>
                      React <span>Interaction</span>
                    </h3>
                    <p>
                      Selection and ticker search → <code>POST /analyse</code>. Non-success
                      responses become visible errors. The results view reads the score, explanation
                      and tools used.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="eq-layer-number mono">02</span>
                  <div>
                    <h3>
                      FastAPI <span>Application boundary</span>
                    </h3>
                    <p>
                      <code>RiskRequest</code> accepts a ticker and optional query. The service
                      normalises the ticker, applies the advice phrase filter, runs the agent and
                      returns a <code>RiskResponse</code>.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="eq-layer-number mono">03</span>
                  <div>
                    <h3>
                      Python agent <span>Orchestration</span>
                    </h3>
                    <p>
                      Direct Anthropic SDK calls with six JSON input schemas. A named registry
                      dispatches tool calls and serialises returned dictionaries for the next model
                      call.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="eq-layer-number mono">04</span>
                  <div>
                    <h3>
                      Tools & sources <span>Context</span>
                    </h3>
                    <p>
                      yfinance data, deterministic indicators, local ticker-matched files and a
                      separate vector-retrieval path. Their outputs become context, not verified
                      conclusions.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="eq-response-strip">
              <span className="mono">RESPONSE → REACT</span>
              <code>ticker · risk_score? · risk_label · explanation · tools_called</code>
              <p>
                The API also serialises trace metadata. This case study focuses on observable tool
                contracts and does not reproduce private model reasoning.
              </p>
            </div>
          </section>
          <section id="agent-loop" className="eq-loop" aria-labelledby="eq-loop-title">
            <div className="shell">
              <div className="eq-loop-heading">
                <div>
                  <p className="mono">03 / INSIDE THE AGENT</p>
                  <h2 id="eq-loop-title">A loop, with an exit.</h2>
                </div>
                <p>
                  ReAct-style orchestration, implemented directly in Python. The reviewed loop is
                  not built on LangChain.
                </p>
              </div>
              <ol className="eq-flow">
                {observedWorkflow.map((step, i) => (
                  <li key={step.title}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
              <div className="eq-loop-foot">
                <p>
                  <strong>Tool use returns to the model.</strong> The path depends on returned
                  tool-use blocks; this drawing describes the source control flow, not a recorded
                  execution.
                </p>
                <p>
                  <strong>Stopping is explicit.</strong> Other stop reasons break the loop.
                  Exhaustion returns “Agent reached maximum iterations.” A loop limit does not
                  guarantee successful analysis.
                </p>
              </div>
            </div>
          </section>
          <section id="tool-inspector" className="eq-tools shell" aria-labelledby="eq-tools-title">
            <div className="eq-section-top">
              <p className="mono">04 / TOOL INSPECTOR</p>
              <h2 id="eq-tools-title">
                Six tools.
                <br />
                <span className="serif">Different responsibilities.</span>
              </h2>
              <p>
                A tool name can hide a lot. Select one to see what it accepts, what it returns and
                where its responsibility ends.
              </p>
            </div>
            <EquityGuardInspector />
            <p className="eq-inspector-foot mono">
              CONTRACT SUMMARIES FROM SOURCE · NO LIVE EXECUTION · OUTPUTS ARE DICTIONARIES, NOT
              ENFORCED TOOL-RESPONSE MODELS
            </p>
          </section>
          <section
            id="boundaries"
            className="eq-boundaries shell"
            aria-labelledby="eq-boundaries-title"
          >
            <div>
              <p className="mono">05 / DETERMINISTIC EDGES</p>
              <h2 id="eq-boundaries-title">
                Structure helps.
                <br />
                It isn’t certainty.
              </h2>
              <p>
                I put application code around model behaviour: request types, a tool registry,
                response shaping and visible error states. Those mechanisms have specific limits.
              </p>
            </div>
            <dl>
              <div>
                <dt>Input</dt>
                <dd>
                  Pydantic supplies request types; the API trims and uppercases the ticker. It does
                  not validate ticker syntax or existence. The advice filter matches phrases, so it
                  cannot establish comprehensive safety.
                </dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>
                  The API extracts an <code>n/10</code> score from model text and assigns a label.
                  The optional integer is not range-constrained. A structured response does not
                  guarantee a correct score.
                </dd>
              </div>
              <div>
                <dt>Failure</dt>
                <dd>
                  Most market tools return error dictionaries; unknown tool names also return an
                  error. Argument errors and model-call failures have no general loop-level
                  recovery. The price endpoint’s zero fallback can obscure a failed fetch.
                </dd>
              </div>
            </dl>
          </section>
          <section id="evaluation" className="eq-evaluation" aria-labelledby="eq-evaluation-title">
            <div className="shell">
              <div className="eq-evaluation-heading">
                <div>
                  <p className="mono">06 / TESTING INTELLIGENT SOFTWARE</p>
                  <h2 id="eq-evaluation-title">
                    What do the tests
                    <br />
                    actually tell us?
                  </h2>
                </div>
                <div className="eq-test-total">
                  <strong>23</strong>
                  <span>
                    collected tests
                    <br />
                    three source files
                  </span>
                </div>
              </div>
              <div className="eq-test-inventory">
                {testInventory.map((group) => (
                  <div className="eq-test-group" key={group.name}>
                    <div className="eq-test-count">
                      <strong>{String(group.count).padStart(2, '0')}</strong>
                      <div aria-hidden="true" className="eq-test-marks">
                        {Array.from({ length: group.count }, (_, i) => (
                          <span key={i} />
                        ))}
                      </div>
                    </div>
                    <h3>{group.name}</h3>
                    <code>{group.file}</code>
                    <p>{group.scope}</p>
                    <p className="eq-test-limit">{group.limit}</p>
                  </div>
                ))}
              </div>
              <div className="eq-test-note">
                <p>
                  <strong>23/23 passed in an isolated, network-blocked review.</strong> GitHub
                  Actions defines separate pytest runs for these three files. That configuration is
                  source evidence; no remote CI outcome is claimed here.
                </p>
                <p>
                  The live evaluation runner is separate and can invoke the model. It was not run.
                  The inspected tests do not exercise FastAPI, provider integrations, retrieval or a
                  complete agent loop.
                </p>
              </div>
            </div>
          </section>
          <section
            id="reflection"
            className="eq-reflection shell"
            aria-labelledby="eq-reflection-title"
          >
            <p className="mono eq-margin-label">07 / LOOKING BACK</p>
            <div>
              <h2 id="eq-reflection-title">
                The next work is
                <br />
                <span className="serif">at the boundaries.</span>
              </h2>
              <p className="eq-lead">
                EquityGuard demonstrates the work of connecting an interface, API, model and
                external tools. It also makes the next engineering questions concrete.
              </p>
              <p>
                The README still describes older keyword retrieval, while newer source includes
                ChromaDB ingestion and vector search. A missing import and undeclared retrieval
                dependencies leave that runtime unresolved. The separate filename lookup should not
                be mistaken for semantic retrieval.
              </p>
              <p>
                My next priorities would be production-code calculation tests, mocked provider
                failures, API and tool-contract checks, tighter score validation and an operational
                retrieval check. Those are proposed improvements, not completed features.
              </p>
              <div className="eq-stack">
                <span className="mono">IMPLEMENTATION CONTEXT</span>
                <p>{equityguardStudy.stack.join(' / ')}</p>
                <span>
                  ChromaDB describes the source retrieval path; a working deployment has not been
                  verified.
                </span>
              </div>
            </div>
          </section>
          <footer className="eq-end">
            <div className="shell">
              <div className="eq-next-project">
                <div>
                  <p className="mono">ANOTHER ENGINEERING STUDY</p>
                  <h2>
                    From intelligent tools
                    <br />
                    to distributed work.
                  </h2>
                </div>
                <Link className="button button-dark" href="/work/automark/">
                  Explore AutoMark <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <Link className="text-link" href="/work/daita/">
                Next study: DAITA ↗
              </Link>
              <CaseStudyLinks current="equityguard" />
              <div className="eq-signoff">
                <p>
                  Thanks for looking inside.
                  <br />
                  <span className="serif">Ibrahim.</span>
                </p>
                <div>
                  <a className="text-link" href={`mailto:${profile.email}`}>
                    Let’s talk engineering
                  </a>
                  <a className="text-link" href={profile.resume}>
                    Résumé PDF
                  </a>
                  <Link className="text-link" href="/#work">
                    Back to selected work
                  </Link>
                  <a className="text-link" href="#top">
                    Back to top ↑
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
