/* eslint-disable @next/next/no-img-element -- Build-time responsive images support static export. */
import Link from 'next/link';
import { Navigation } from '@/components/site-controls';
import { CaseStudyLinks } from '@/components/case-study-links';
import { RetrievalExplorer } from '@/components/retrieval-explorer';
import { mediqueryStudy as study } from '@/content/compact-studies';
import { profile } from '@/content/identity';
import { studyMetadata, studySchema } from '@/lib/study-metadata';
import '../compact.css';
export const metadata = studyMetadata('mediquery', study.title, study.description);
export default function MediQuery() {
  return (
    <>
      <a className="skip-link" href="#mq-main">
        Skip to case study
      </a>
      <div id="top" />
      <Navigation homeLinks />
      <main id="mq-main" className="compact-study mq-study">
        <article>
          <header className="mq-opening shell">
            <div className="compact-kicker">
              <Link className="text-link" href="/#work">
                All work
              </Link>
              <p className="mono">MEDIQUERY / INDEPENDENT PROJECT</p>
            </div>
            <p className="compact-context">Clinical RAG & Document Retrieval Platform</p>
            <h1 className="serif">
              An answer is only as good as its <em>evidence.</em>
            </h1>
            <div className="mq-opening-bottom">
              <div>
                <p>
                  I built a React and FastAPI biomedical research application to search literature
                  and return answers with source references. The question behind it: how do you keep
                  the evidence connected as information moves through the system?
                </p>
                <p className="compact-stack">
                  Python / FastAPI / React / LangChain / ChromaDB / BioBERT / Docker
                </p>
                <a className="text-link" href="#retrieval">
                  Explore document selection ↓
                </a>
              </div>
              <figure>
                <a
                  href="/assets/mediquery/landing-offline.png"
                  aria-label="Open the original MediQuery interface capture"
                >
                  <img
                    src="/assets/mediquery/landing-1000.webp"
                    width="1440"
                    height="720"
                    alt="Actual MediQuery React landing screen with a question box and example prompts; no generated answer."
                    loading="eager"
                  />
                </a>
                <figcaption>
                  Actual React interface, captured locally in its initial state. No backend or model
                  request. A research prototype, not a clinically validated tool.
                </figcaption>
              </figure>
            </div>
          </header>
          <section id="pipeline" className="mq-pipeline compact-section">
            <div className="shell">
              <div className="compact-section-heading">
                <p className="mono">01 / BUILDING THE EVIDENCE PIPELINE</p>
                <h2>
                  Keep the source
                  <br />
                  with the text.
                </h2>
              </div>
              <ol>
                {study.pipeline.map((step, i) => (
                  <li key={step.name}>
                    <span className="mono">0{i + 1}</span>
                    <h3>{step.name}</h3>
                    <p>{step.detail}</p>
                  </li>
                ))}
              </ol>
              <p className="compact-note">
                Ingestion, search and generation are separate modules. The API queues ingestion as a
                FastAPI background task; this does not establish a durable job service.
              </p>
            </div>
          </section>
          <section
            id="retrieval"
            className="compact-section shell"
            aria-labelledby="retrieval-title"
          >
            <div className="compact-section-heading">
              <p className="mono">02 / RETRIEVAL EXPLORER</p>
              <h2 id="retrieval-title">
                Similar is useful.
                <br />
                <span className="serif">Different can be useful, too.</span>
              </h2>
              <p>
                BioBERT supplies a biomedical language representation. Maximum Marginal Relevance
                adds a selection trade-off: query similarity versus similarity to documents already
                chosen. That trade-off does not guarantee a better answer.
              </p>
            </div>
            <RetrievalExplorer />
          </section>
          <section id="citations" className="mq-citations compact-section">
            <div className="shell compact-two-column">
              <div>
                <p className="mono">03 / ANSWERS AND ATTRIBUTION</p>
                <h2>
                  A citation is
                  <br />a place to check.
                </h2>
                <p>
                  The generation prompt asks for <code>[Source: title]</code> citations and supplies
                  retrieved, source-labelled chunks. The model is configured with 512 new tokens and
                  temperature 0.1.
                </p>
              </div>
              <div className="mq-source-note">
                <p className="mono">THE IMPORTANT BOUNDARY</p>
                <p>
                  The code retrieves again to build the displayed sources, deduplicating titles and
                  returning a 200-character snippet with each source record. That list is not a
                  guaranteed record of the exact context used for generation.
                </p>
                <p>
                  A citation makes inspection possible. It does not prove that an answer is
                  supported, complete or clinically correct. The reviewed code does not
                  automatically validate every citation against the generated text.
                </p>
              </div>
            </div>
          </section>
          <section id="mq-reflection" className="compact-section shell compact-two-column">
            <div>
              <p className="mono">04 / WHAT I CAN VERIFY</p>
              <h2>
                Grounding needs
                <br />
                its own checks.
              </h2>
            </div>
            <div>
              <p>
                Four existing API tests passed in an isolated review with vector, ingestion and
                generation boundaries stubbed. They check health, a stats response and invalid short
                requests; they do not establish retrieval quality or live model behaviour.
              </p>
              <p>
                This project demonstrates my work connecting ingestion, retrieval and generation
                across a full-stack application. Next, I would reuse the same retrieved context for
                both the answer and source list, then evaluate citation support and retrieval
                choices on a defined dataset.
              </p>
              <a
                className="text-link"
                href={study.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the MediQuery source ↗
              </a>
            </div>
          </section>
          <footer className="compact-end shell">
            <p className="serif">Keep asking where the answer came from.</p>
            <div className="compact-end-actions">
              <Link className="text-link" href="/work/returns-agent/">
                Next: Returns Agent ↗
              </Link>
              <a className="text-link" href={profile.resume}>
                Résumé PDF
              </a>
              <a className="text-link" href="#top">
                Back to top ↑
              </a>
            </div>
            <CaseStudyLinks current="mediquery" />
          </footer>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(studySchema('mediquery', study.title, study.description)).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
    </>
  );
}
