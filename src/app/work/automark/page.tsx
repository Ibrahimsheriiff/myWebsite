import { CaseStudyLinks } from '@/components/case-study-links';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AutoMarkBenchmark } from '@/components/automark-benchmark';
import { AutoMarkExplorer } from '@/components/automark-explorer';
import { Navigation, ProjectImage } from '@/components/site-controls';
import { automarkStudy, caseNarrative } from '@/content/automark';
import { profile } from '@/content/portfolio';
import './automark.css';

const url = 'https://ibrahimsheriiff.com/work/automark/';
export const metadata: Metadata = {
  title: 'AutoMark — Engineering a better way to assess code | Ibrahim Sharif',
  description: automarkStudy.description,
  alternates: { canonical: '/work/automark/' },
  openGraph: {
    type: 'article',
    url,
    title: 'AutoMark — From commit to feedback',
    description: automarkStudy.description,
    authors: [profile.name],
    images: [
      {
        url: '/automark-og.png',
        width: 1200,
        height: 630,
        alt: 'AutoMark — From commit to feedback. An engineering case study by Ibrahim Sharif.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoMark — From commit to feedback',
    description: automarkStudy.description,
    images: ['/automark-og.png'],
  },
};

function Chapter({
  number,
  label,
  title,
  children,
  id,
  className = '',
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <section id={id} className={`case-chapter ${className}`} aria-labelledby={`${id}-title`}>
      <div className="chapter-heading">
        <p className="section-label">
          <span>{number}</span>
          {label}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function AutoMarkCaseStudy() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: automarkStudy.title,
    description: automarkStudy.description,
    author: { '@type': 'Person', name: profile.name, url: 'https://ibrahimsheriiff.com/' },
    mainEntityOfPage: url,
    image: 'https://ibrahimsheriiff.com/automark-og.png',
    inLanguage: 'en-AU',
    about: {
      '@type': 'SoftwareApplication',
      name: 'AutoMark',
      applicationCategory: 'EducationalApplication',
    },
  };
  return (
    <>
      <a className="skip-link" href="#case-main">
        Skip to case study
      </a>
      <div id="top" />
      <Navigation homeLinks />
      <main id="case-main" className="automark-case">
        <article>
          <header className="case-opening shell">
            <div className="case-breadcrumb">
              <Link className="text-link" href="/#work">
                All work
              </Link>
              <span className="mono">ENGINEERING CASE STUDY / AUTOMARK</span>
            </div>
            <div className="case-title-grid">
              <div>
                <p className="case-kicker">AutoMark · Western Sydney University</p>
                <h1>
                  Engineering a better way to <span className="serif">assess code.</span>
                </h1>
              </div>
              <aside className="case-brief">
                <span className="mono">THE SHORT VERSION</span>
                <p>{automarkStudy.description}</p>
                <a className="text-link" href="#system">
                  Explore the architecture
                </a>
              </aside>
            </div>
            <dl className="case-facts">
              <div>
                <dt>My role</dt>
                <dd>Backend Lead</dd>
              </div>
              <div>
                <dt>Context</dt>
                <dd>Final-year team capstone</dd>
              </div>
              <div>
                <dt>When</dt>
                <dd>{automarkStudy.period}</dd>
              </div>
              <div>
                <dt>Core stack</dt>
                <dd>Python · FastAPI · JavaScript · Docker · AWS</dd>
              </div>
            </dl>
          </header>
          <div className="case-product">
            <div className="shell">
              <div className="case-product-top">
                <p className="serif">
                  From a code commit
                  <br />
                  to something a lecturer can use.
                </p>
                <span className="mono">THE PRODUCT / LECTURER WORKSPACE</span>
              </div>
              <figure>
                <div className="case-dashboard">
                  <ProjectImage priority />
                </div>
                <figcaption>
                  <span>
                    Original AutoMark interface: assignments, submissions and grading controls.
                  </span>
                  <a className="text-link" href="/assets/img/dashboard.png">
                    Open original image
                  </a>
                </figcaption>
              </figure>
              <div className="case-achievements" aria-label="Project achievements">
                <p>
                  <strong>
                    97<span>/100</span>
                  </strong>
                  <span>capstone result</span>
                </p>
                <p>
                  <strong>200</strong>
                  <span>concurrent submissions tested</span>
                </p>
                <p>
                  <strong>43</strong>
                  <span>backend API endpoints</span>
                </p>
                <p className="case-nomination">
                  Nominated for
                  <br />
                  <strong>Best Capstone Project.</strong>
                </p>
              </div>
              <p className="case-team-note">
                Built by a team. Backend led by me. Accepted by the sponsor after a live
                demonstration.
              </p>
            </div>
          </div>
          <nav className="case-index shell" aria-label="Case study chapters">
            <details open>
              <summary>
                In this case study<span aria-hidden="true">＋</span>
              </summary>
              <ol>
                {automarkStudy.chapters.map((chapter, i) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`}>
                      <span className="mono">0{i + 1}</span>
                      {chapter.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>
          <div className="shell">
            <Chapter
              id="problem"
              number="01"
              label="The problem"
              title={
                <>
                  The submission is only
                  <br />
                  <span className="serif">the beginning.</span>
                </>
              }
            >
              <div className="case-reading">
                <p className="case-lead">{caseNarrative.problemLead}</p>
                <p>{caseNarrative.problemBody}</p>
              </div>
              <div className="case-users">
                <div>
                  <span className="mono">FOR THE STUDENT</span>
                  <h3>
                    Submit code.
                    <br />
                    Find the result.
                  </h3>
                  <p>{caseNarrative.studentWorkflow}</p>
                </div>
                <div>
                  <span className="mono">FOR THE LECTURER</span>
                  <h3>
                    Set up the assessment.
                    <br />
                    Review the work.
                  </h3>
                  <p>{caseNarrative.lecturerWorkflow}</p>
                </div>
              </div>
            </Chapter>
            <Chapter
              id="ownership"
              number="02"
              label="What I owned"
              title={<>I built across the workflow.</>}
            >
              <div className="ownership-layout">
                <div className="case-reading">
                  <p className="case-lead">{caseNarrative.ownershipLead}</p>
                  <p>{caseNarrative.teamOwnership}</p>
                  <p className="case-annotation serif">
                    The important work was
                    <br />
                    in the connections.
                  </p>
                </div>
                <div className="ownership-list">
                  {automarkStudy.ownership.map((item) => (
                    <div key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Chapter>
          </div>
          <div className="case-system-environment">
            <div className="shell">
              <Chapter
                id="system"
                number="03"
                label="Inside the system"
                title={<>Where does a submission go?</>}
              >
                <div className="system-intro">
                  <p>{caseNarrative.systemIntroduction}</p>
                  <p>{caseNarrative.mapIntroduction}</p>
                </div>
                <AutoMarkExplorer />
                <details className="case-terminology">
                  <summary>
                    A few terms, in plain language<span aria-hidden="true">＋</span>
                  </summary>
                  <dl>
                    <div>
                      <dt>Post-commit hook</dt>
                      <dd>An action triggered after code is committed to the repository.</dd>
                    </div>
                    <div>
                      <dt>Sandbox</dt>
                      <dd>A separate execution environment for running submitted code.</dd>
                    </div>
                    <div>
                      <dt>Polling</dt>
                      <dd>Asking the service for an updated status or result at intervals.</dd>
                    </div>
                  </dl>
                </details>
              </Chapter>
            </div>
          </div>
          <div className="shell">
            <Chapter
              id="decisions"
              number="04"
              label="Engineering decisions"
              title={<>Accept first. Grade independently.</>}
            >
              <p className="case-reading decision-intro">{caseNarrative.decisionsIntroduction}</p>
              <div className="decision-list">
                {automarkStudy.decisions.map((decision, i) => (
                  <div className="decision-row" key={decision.label}>
                    <p className="mono">
                      0{i + 1} / {decision.label}
                    </p>
                    <div>
                      <h3>{decision.title}</h3>
                      <p>{decision.body}</p>
                    </div>
                    <aside>
                      <span className="mono">THE CONSTRAINT</span>
                      <p>{decision.tradeoff}</p>
                    </aside>
                  </div>
                ))}
              </div>
            </Chapter>
          </div>
          <div className="case-demo-environment">
            <div className="shell">
              <Chapter
                id="demo"
                number="05"
                label="When things did not go to plan"
                title={<>A volume issue, during the demo.</>}
              >
                <div className="demo-layout">
                  <p className="demo-note serif">
                    A system includes
                    <br />
                    its environment.
                  </p>
                  <div className="case-reading">
                    <p className="case-lead">{caseNarrative.demoExperience}</p>
                    <p>{caseNarrative.demoReflection}</p>
                    <p>{caseNarrative.demoLesson}</p>
                  </div>
                </div>
              </Chapter>
            </div>
          </div>
          <div className="shell">
            <Chapter
              id="results"
              number="06"
              label="Verification & results"
              title={<>200 submissions. Every job graded.</>}
            >
              <div className="case-results-summary">
                <div className="case-reading">
                  <p className="case-lead">{caseNarrative.delivery}</p>
                  <p>{caseNarrative.concurrencyContext}</p>
                </div>
                <p className="results-assessment">
                  <strong>97/100</strong>Capstone result · nominated for Best Capstone Project. The
                  backend contained 43 API endpoints.
                </p>
              </div>
              <AutoMarkBenchmark />
            </Chapter>
            <Chapter
              id="reflection"
              number="07"
              label="Looking back"
              title={
                <>
                  I learned to look
                  <br />
                  <span className="serif">between the components.</span>
                </>
              }
            >
              <div className="case-reading">
                <p className="case-lead">{caseNarrative.lookingBackLead}</p>
                <p>{caseNarrative.lookingBackBody}</p>
                <p>{caseNarrative.lookingBackNext}</p>
              </div>
              <div className="case-future">
                <span className="mono">IF I WERE TAKING IT FURTHER</span>
                {automarkStudy.future.map((item) => (
                  <div key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </Chapter>
          </div>
          <footer className="case-end">
            <div className="shell">
              <span className="mono">END OF CASE STUDY / THANKS FOR READING</span>
              <h2>
                There’s always more
                <br />
                <span className="serif">to figure out.</span>
              </h2>
              <div className="case-end-actions">
                <Link className="text-link" href="/lab/automark/" prefetch={false}>
                  Try the AutoMark workload simulator
                </Link>
                <Link className="text-link" href="/work/equityguard/">
                  Next study: EquityGuard ↗
                </Link>
                <Link className="button button-dark" href="/#work">
                  Back to selected work
                </Link>
                <a className="text-link" href={`mailto:${profile.email}`}>
                  Let’s talk about the system
                </a>
                <a className="text-link" href={profile.resume}>
                  Résumé PDF
                </a>
              </div>
              <CaseStudyLinks current="automark" />
              <div className="case-end-bottom">
                <span>Ibrahim Sharif · The Curious Engineer</span>
                <a href="#top">Back to top</a>
              </div>
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
