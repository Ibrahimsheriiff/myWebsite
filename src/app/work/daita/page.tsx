import { CaseStudyLinks } from '@/components/case-study-links';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/site-controls';
import { DaitaWorkbench } from '@/components/daita-workbench';
import { daitaStudy } from '@/content/daita';
import { profile } from '@/content/identity';
import './daita.css';
const url = 'https://ibrahimsheriiff.com/work/daita/';
export const metadata: Metadata = {
  title: 'DAITA — Less manual review. A clearer workflow. | Ibrahim Sharif',
  description: daitaStudy.description,
  alternates: { canonical: '/work/daita/' },
  openGraph: {
    type: 'article',
    url,
    title: daitaStudy.title,
    description: daitaStudy.description,
    authors: [profile.name],
    images: [
      {
        url: '/daita-og.png',
        width: 1200,
        height: 630,
        alt: 'DAITA — Less manual review. A clearer workflow. A university-industry engineering case study.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: daitaStudy.title,
    description: daitaStudy.description,
    images: ['/daita-og.png'],
  },
};
function DocumentSpread() {
  return (
    <figure className="dt-document-spread">
      <div className="dt-spread-label mono">
        <span>A CONCEPTUAL DOCUMENT TRANSFORMATION</span>
        <span>FICTIONAL DATA / NOT AN APPLICATION SCREENSHOT</span>
      </div>
      <div className="dt-document-pair">
        <div className="dt-source-document">
          <p className="mono">IN / DIFFERENT DOCUMENT SHAPES</p>
          <h2 className="serif">Start with what arrives.</h2>
          <dl>
            <div>
              <dt>CSV</dt>
              <dd>
                <code>Date · Details · Value</code>
                <span>2025-04-03 / Harbour Paper / $120.00</span>
              </dd>
            </div>
            <div>
              <dt>Excel</dt>
              <dd>
                <code>Posted · Memo · Debit</code>
                <span>04 Apr 2025 / Studio subscription / AUD 48.00</span>
              </dd>
            </div>
            <div>
              <dt>Scanned PDF</dt>
              <dd>
                Document content to be processed<span>Extraction method is not asserted here.</span>
              </dd>
            </div>
          </dl>
        </div>
        <div className="dt-document-arrow" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="dt-review-document">
          <p className="mono">OUT / A COMMON RECORD FOR REVIEW</p>
          <div className="dt-record-heading">
            <strong>R02</strong>
            <span className="mono">SOURCE ID RETAINED</span>
          </div>
          <dl>
            <div>
              <dt>Date</dt>
              <dd>2025-04-04</dd>
            </div>
            <div>
              <dt>Description</dt>
              <dd>Studio subscription</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>AUD 48.00</dd>
            </div>
            <div>
              <dt>Review</dt>
              <dd>Needs human judgement</dd>
            </div>
          </dl>
          <p className="dt-document-note">
            A consistent shape makes differences easier to inspect.
          </p>
        </div>
      </div>
      <figcaption>
        <span className="serif">Different inputs. A shared language.</span>
        <p>
          An illustration of the processing problem. The workbench below follows the same fictional
          records through the individual steps.
        </p>
      </figcaption>
    </figure>
  );
}
export default function DaitaCaseStudy() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: daitaStudy.title,
    description: daitaStudy.description,
    author: { '@type': 'Person', name: profile.name, url: 'https://ibrahimsheriiff.com/' },
    mainEntityOfPage: url,
    image: 'https://ibrahimsheriiff.com/daita-og.png',
    inLanguage: 'en-AU',
    about: {
      '@type': 'SoftwareApplication',
      name: 'DAITA',
      applicationCategory: 'BusinessApplication',
    },
  };
  return (
    <>
      <a className="skip-link" href="#daita-main">
        Skip to case study
      </a>
      <div id="top" />
      <Navigation homeLinks />
      <main id="daita-main" className="dt-case">
        <article>
          <header className="dt-opening">
            <div className="shell">
              <div className="dt-breadcrumb">
                <Link className="text-link" href="/#work">
                  All work
                </Link>
                <p className="mono">DAITA / UNIVERSITY–INDUSTRY COLLABORATION</p>
              </div>
              <p className="dt-project-label">
                Western Sydney University <span>with Deloitte Australia stakeholders</span>
              </p>
              <h1>
                Less manual review.
                <br />
                <span className="serif">A clearer workflow.</span>
              </h1>
              <div className="dt-cover-bottom">
                <dl>
                  <div>
                    <dt>When</dt>
                    <dd>March–June 2025</dd>
                  </div>
                  <div>
                    <dt>My work</dt>
                    <dd>Backend application · data pipeline · tax knowledge engine</dd>
                  </div>
                  <div>
                    <dt>Built with</dt>
                    <dd>Python / FastAPI / Pydantic / pandas</dd>
                  </div>
                </dl>
                <div>
                  <p>
                    Working with Deloitte Australia stakeholders as part of a university team, I
                    helped develop DAITA: a tax decision-support application for turning
                    inconsistent financial documents into structured, reviewable information.
                  </p>
                  <a className="text-link" href="#workbench">
                    Follow a document through <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
              <DocumentSpread />
            </div>
          </header>
          <section id="context" className="dt-context shell" aria-labelledby="dt-context-title">
            <div>
              <p className="mono">01 / A PRACTICAL BUSINESS PROBLEM</p>
              <h2 id="dt-context-title">
                Before a decision,
                <br />
                there is the data.
              </h2>
            </div>
            <div className="dt-reading">
              <p className="dt-lead">
                A spreadsheet column, a line in a CSV and an entry in a scanned document can
                describe the same kind of transaction in different ways.
              </p>
              <p>
                For consultants, bringing that information together creates repetitive processing
                and data-quality work. DAITA was designed to help process financial documents,
                classify transactions and generate reports, while keeping corrections and approvals
                in the workflow.
              </p>
              <p>
                This was a university-industry collaboration, not employment with Deloitte. We
                worked as a university team with Deloitte Australia stakeholders. My contribution
                focused on the application, processing pipeline and versioned tax knowledge
                described below.
              </p>
            </div>
          </section>
          <section
            id="contribution"
            className="dt-contribution shell"
            aria-labelledby="dt-contribution-title"
          >
            <div className="dt-contribution-heading">
              <p className="mono">02 / WHAT I CONTRIBUTED</p>
              <h2 id="dt-contribution-title">
                Connecting the business need
                <br />
                to working software.
              </h2>
              <p>
                The team’s application brought documents, classification and reporting together. I
                worked across three connected engineering responsibilities.
              </p>
            </div>
            <ol>
              {daitaStudy.contributions.map((item) => (
                <li key={item.number}>
                  <span className="serif">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="dt-scope-note">
              These are implemented capabilities described in my project experience. Exact storage,
              background-task technology and deployment topology are not specified.
            </p>
          </section>
          <section
            id="workbench"
            className="dt-workbench-section"
            aria-labelledby="dt-workbench-title"
          >
            <div className="shell">
              <div className="dt-workbench-heading">
                <div>
                  <p className="mono">03 / DOCUMENT PROCESSING WORKBENCH</p>
                  <h2 id="dt-workbench-title">
                    Follow the rows.
                    <br />
                    <span className="serif">Keep the exceptions.</span>
                  </h2>
                </div>
                <p>
                  Explore a small, fictional processing workflow. Advance it yourself, inspect the
                  held records, then try a category correction.
                </p>
              </div>
              <DaitaWorkbench />
            </div>
          </section>
          <section
            id="knowledge"
            className="dt-knowledge shell"
            aria-labelledby="dt-knowledge-title"
          >
            <div className="dt-knowledge-copy">
              <p className="mono">04 / DETERMINISTIC DOMAIN KNOWLEDGE</p>
              <h2 id="dt-knowledge-title">
                A result needs
                <br />
                something behind it.
              </h2>
              <p className="dt-lead">
                My Python tax knowledge engine matched classified transactions with applicable ATO
                rules using versioned knowledge.
              </p>
              <p>
                It provided references, confidence scores and documentation requirements for review
                and approval. That context matters: a classification on its own gives a reviewer
                much less to inspect.
              </p>
              <p>
                Versioned, traceable domain logic helps make business software maintainable. The
                exact rule definitions, scoring method and versioning mechanism are not reproduced
                here.
              </p>
            </div>
            <aside className="dt-review-sheet" aria-label="Conceptual review information">
              <p className="mono">WHAT A REVIEWER NEEDS / CONCEPTUAL</p>
              <h3 className="serif">More than a label.</h3>
              <dl>
                <div>
                  <dt>Classification</dt>
                  <dd>The transaction’s assigned category.</dd>
                </div>
                <div>
                  <dt>Rule reference</dt>
                  <dd>A basis that can be checked.</dd>
                </div>
                <div>
                  <dt>Confidence</dt>
                  <dd>Information to consider during review, not a guarantee.</dd>
                </div>
                <div>
                  <dt>Documentation</dt>
                  <dd>Supporting material required for a decision.</dd>
                </div>
              </dl>
              <p>No real tax rules, references or scores are shown in this illustration.</p>
            </aside>
          </section>
          <section id="human-review" className="dt-human-review" aria-labelledby="dt-human-title">
            <div className="shell dt-human-grid">
              <div>
                <p className="mono">05 / PEOPLE IN THE WORKFLOW</p>
                <h2 id="dt-human-title">
                  Review is part
                  <br />
                  of the system.
                </h2>
                <p>
                  Manual classification corrections and approvals give people a way to intervene.
                  Report exports make the processed information useful beyond the processing step.
                </p>
              </div>
              <ol>
                <li>
                  <span className="mono">CORRECT</span>
                  <h3>A person can change a classification.</h3>
                  <p>
                    The application supports manual corrections rather than treating the initial
                    category as final.
                  </p>
                </li>
                <li>
                  <span className="mono">APPROVE</span>
                  <h3>Professional judgement stays involved.</h3>
                  <p>
                    References and documentation requirements support review. The software assists
                    the decision; it does not establish legal correctness.
                  </p>
                </li>
                <li>
                  <span className="mono">REPORT</span>
                  <h3>Carry structured information forward.</h3>
                  <p>
                    Report exports are part of the application’s scope. Specific export layouts and
                    measured productivity gains are not asserted.
                  </p>
                </li>
              </ol>
            </div>
          </section>
          <section
            id="reflection"
            className="dt-reflection shell"
            aria-labelledby="dt-reflection-title"
          >
            <p className="mono">06 / LOOKING BACK</p>
            <div>
              <h2 id="dt-reflection-title">
                Useful automation leaves
                <br />
                <span className="serif">room for judgement.</span>
              </h2>
              <p className="dt-lead">
                This project brings together the kind of engineering I want to keep doing:
                understanding a practical requirement, making inconsistent inputs manageable and
                building results that people can review.
              </p>
              <p>
                I can point to application functionality, support for CSV, Excel and scanned PDFs,
                data-quality processing and versioned knowledge. The value was in connecting those
                capabilities into a workflow that could be reviewed.
              </p>
              <a className="text-link" href={profile.resume}>
                Read my graduate résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
          <footer className="dt-end">
            <div className="shell">
              <p className="serif dt-signoff">Thanks for following the details.</p>
              <div className="dt-end-links">
                <Link className="text-link" href="/work/automark/">
                  Explore AutoMark ↗
                </Link>
                <Link className="text-link" href="/work/equityguard/">
                  Explore EquityGuard ↗
                </Link>
                <Link className="text-link" href="/#work">
                  All selected work
                </Link>
                <a className="text-link" href={`mailto:${profile.email}`}>
                  Let’s talk engineering
                </a>
                <a className="text-link" href="#top">
                  Back to top ↑
                </a>
              </div>
              <CaseStudyLinks current="daita" />
              <p className="mono">IBRAHIM SHARIF / THE CURIOUS ENGINEER</p>
            </div>
          </footer>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
