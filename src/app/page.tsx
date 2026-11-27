import Link from 'next/link';
import { Notebook } from '@/components/notebook';
import { AgentDiagram, FinancialWorkflow } from '@/components/project-diagrams';
import { Navigation, ProjectImage, SydneyTime } from '@/components/site-controls';
import { editorial, profile, projects, secondaryProjects } from '@/content/portfolio';

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function GradingFlow({ lab = false }: { lab?: boolean }) {
  const nodes = lab
    ? ['SVN intake', 'Durable queue', 'AWS workers', 'Docker execution', 'Scores & feedback']
    : ['SVN intake', 'Durable queue', 'AWS workers + Docker', 'Scores & feedback'];
  return (
    <ol
      className={`grading-flow${lab ? ' lab-flow' : ''}`}
      aria-label={
        lab
          ? 'Illustrative grading architecture, not a running simulation'
          : 'Simplified AutoMark grading architecture'
      }
    >
      {nodes.map((node, i) => (
        <li key={node}>
          <span className="flow-icon" aria-hidden="true">
            {i === 0 ? (
              <svg viewBox="0 0 28 28" fill="none">
                <path d="M7 4h10l5 5v15H7V4Zm10 0v6h5M11 14h7m-7 5h7" />
              </svg>
            ) : i === nodes.length - 1 ? (
              <svg viewBox="0 0 28 28" fill="none">
                <ellipse cx="14" cy="7" rx="9" ry="4" />
                <path d="M5 7v14c0 5 18 5 18 0V7M5 14c0 5 18 5 18 0" />
              </svg>
            ) : lab && i === 1 ? (
              <svg viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" />
                <path d="m8 14 4 4 8-9" />
              </svg>
            ) : (lab && i === 2) || (!lab && i === 1) ? (
              <svg viewBox="0 0 28 28" fill="none">
                <rect x="5" y="3" width="18" height="6" rx="1" />
                <rect x="5" y="11" width="18" height="6" rx="1" />
                <rect x="5" y="19" width="18" height="6" rx="1" />
                <path d="M8 6h1m-1 8h1m-1 8h1" />
              </svg>
            ) : (
              <svg viewBox="0 0 28 28" fill="none">
                <path d="m14 3 10 6v11l-10 6-10-6V9L14 3Zm0 12v11M4 9l10 6 10-6" />
              </svg>
            )}
          </span>
          <span>{node}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  const [automark, equityguard, daita] = projects;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Navigation />
      <main id="main">
        <section className="hero shell" aria-labelledby="intro-title">
          <div className="hero-meta">
            <span className="eyebrow">
              SOFTWARE ENGINEER<span className="identity-tagline"> · A CURIOUS MIND</span>
            </span>
            <SydneyTime />
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hello">Hey, I’m Ibrahim.</p>
              <h1 id="intro-title">
                I like figuring
                <br />
                <span className="serif">things out.</span>
                <br />
                <span className="hero-final">
                  And building them<span className="forest-period">.</span>
                </span>
              </h1>
              <p className="hero-description">{editorial.introduction}</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#work">
                  Explore what I’ve built
                  <span className="button-dot" aria-hidden="true" />
                </a>
                <a className="text-link" href="#about">
                  A little about me
                </a>
              </div>
            </div>
            <Notebook />
          </div>
          <div className="hero-foot">
            <span>Across the stack. Distributed systems. Applied AI.</span>
            <span className="hero-scroll">
              A little further down <span aria-hidden="true">↓</span>
            </span>
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <span id="projects" className="anchor-alias" />
          <div className="shell">
            <div className="work-intro">
              <SectionLabel number="01">Selected work</SectionLabel>
              <div>
                <h2 id="work-title">
                  From problems
                  <br />
                  to <span className="serif">working systems.</span>
                </h2>
                <p>
                  A few things I’ve built, broken, improved
                  <br className="desktop-break" /> and learned from.
                </p>
              </div>
              <span className="margin-note serif">
                The interesting part
                <br />
                is usually underneath.
              </span>
            </div>
          </div>

          <article id="automark" className="automark" aria-labelledby="automark-title">
            <div className="shell">
              <div className="project-topline">
                <span className="mono">A / AUTOMARK</span>
                <span>University capstone · Backend lead</span>
              </div>
              <div className="automark-heading">
                <h3 id="automark-title">
                  Engineering a better
                  <br />
                  way to <span className="serif">assess code.</span>
                </h3>
                <span className="project-seal">
                  <strong>
                    97<span>/100</span>
                  </strong>
                  <span>Capstone result</span>
                </span>
              </div>
              <div className="automark-body">
                <div className="project-narrative">
                  <p className="project-name">{automark.name}</p>
                  <p className="contribution-label">
                    <span className="mono">MY ROLE</span>
                    <strong>Backend Lead</strong>
                  </p>
                  <p>{editorial.automark[0]}</p>
                  <p>{editorial.automark[1]}</p>

                  <p className="tech-line">{automark.technologies.join(' / ')}</p>
                  <a className="text-link automark-case-link" href="/work/automark/">
                    Read the engineering case study
                  </a>
                  <details className="project-reflection">
                    <summary>
                      A note from the demo<span aria-hidden="true">＋</span>
                    </summary>
                    <p>{editorial.demoReflection}</p>
                  </details>
                </div>
                <div className="automark-visual">
                  <div className="screenshot-frame">
                    <div className="screenshot-topbar">
                      <span className="mono">AUTOMARK / LECTURER WORKSPACE</span>
                    </div>
                    <ProjectImage />
                  </div>
                  <div className="architecture-strip">
                    <span className="mono">A SUBMISSION’S JOURNEY</span>
                    <GradingFlow />
                  </div>
                  <p className="project-outcome">
                    <span className="mono">THE OUTCOME</span>
                    {automark.outcome}
                  </p>
                </div>
              </div>
              <div className="automark-evidence">
                <p>
                  <strong>200</strong>
                  <span>concurrent submissions tested</span>
                </p>
                <p>
                  <strong>43</strong>
                  <span>backend API endpoints</span>
                </p>
                <p className="nomination">
                  <span className="award-glyph" aria-hidden="true">
                    ✳
                  </span>
                  <span>
                    Nominated for
                    <br />
                    <strong>Best Capstone Project</strong>
                  </span>
                </p>
                <p className="evidence-context">
                  Built with a team.
                  <br />
                  Backend led by me.
                </p>
              </div>
            </div>
          </article>

          <article id="equityguard" className="equityguard shell" aria-labelledby="equity-title">
            <div className="equity-copy">
              <p className="mono project-code">B / EQUITYGUARD</p>
              <h3 id="equity-title">
                An agent with tools.
                <br />
                <span className="serif">And boundaries.</span>
              </h3>
              <p className="project-context">Full-Stack AI Financial Risk Platform</p>
              <p>{editorial.equityguard[0]}</p>
              <p>{editorial.equityguard[1]}</p>
              <p className="tech-line">{equityguard.technologies.join(' / ')}</p>
              <div className="equity-study-links">
                <Link className="text-link" href="/work/equityguard/">
                  Inside EquityGuard <span aria-hidden="true">↗</span>
                </Link>
                <a
                  className="text-link"
                  href={equityguard.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore the source
                </a>
              </div>
            </div>
            <AgentDiagram />
          </article>

          <article id="daita" className="daita" aria-labelledby="daita-title">
            <div className="shell daita-grid">
              <div className="daita-meta">
                <p className="mono">C / DELOITTE DAITA</p>
                <p>
                  University-industry
                  <br />
                  collaboration · WSU
                  <br />
                  March–June 2025
                </p>
                <span className="serif daita-note">
                  Practical problems.
                  <br />
                  Useful automation.
                </span>
              </div>
              <div className="daita-copy">
                <h3 id="daita-title">
                  Less manual review.
                  <br />
                  <span className="serif">A clearer workflow.</span>
                </h3>
                <p>{editorial.daita[0]}</p>
                <p>{editorial.daita[1]}</p>
                <p className="tech-line">{daita.technologies.join(' / ')}</p>
                <Link className="text-link daita-study-link" href="/work/daita/">
                  Inside DAITA <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <FinancialWorkflow />
            </div>
          </article>

          <div className="shell more-work">
            <div className="more-work-intro">
              <h3>More from the workbench.</h3>
              <p>Different problems. The same curiosity.</p>
            </div>
            <div className="project-archive">
              {secondaryProjects.map((project, i) => (
                <details key={project.id} id={project.id}>
                  <summary>
                    <span className="archive-index mono">0{i + 1}</span>
                    <span className="archive-name">{project.name}</span>
                    <span className="archive-context">{project.context}</span>
                    <span className="archive-plus" aria-hidden="true">
                      ＋
                    </span>
                  </summary>
                  <div className="archive-details">
                    <p>
                      {project.contribution} {project.outcome}
                    </p>
                    <p className="tech-line">{project.technologies.join(' / ')}</p>
                    <div className="archive-actions">
                      {project.caseStudy && (
                        <Link className="text-link" href={project.caseStudy}>
                          Read the {project.name === 'MediQuery' ? 'MediQuery' : 'Returns Agent'}{' '}
                          study ↗
                        </Link>
                      )}
                      <a
                        className="text-link"
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View source code
                      </a>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="shell about-grid">
            <div className="about-heading">
              <SectionLabel number="02">A little about me</SectionLabel>
              <h2 id="about-title">
                From Chittagong.
                <br />
                <span className="serif">Still exploring.</span>
              </h2>
              <div
                className="place-drawing"
                aria-label="Originally from Chittagong, Bangladesh; now based in Sydney, Australia"
              >
                <svg viewBox="0 0 400 125" fill="none" aria-hidden="true">
                  <path d="M28 35c71-62 80 96 169 41S311 20 365 90" strokeDasharray="3 6" />
                  <circle cx="28" cy="35" r="5" />
                  <circle cx="365" cy="90" r="5" />
                  <path d="m355 85 10 5-3-11" />
                </svg>
                <span className="place-from">
                  Chittagong<span>where I grew up</span>
                </span>
                <span className="place-to">
                  Sydney<span>where I call home</span>
                </span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">{editorial.aboutLead}</p>
              <p>{editorial.about[0]}</p>
              <p>{editorial.about[1]}</p>
              <p>{editorial.about[2]}</p>
              <div className="currently-building">
                <span className="mono">ON THE WORKBENCH</span>
                <p>
                  <strong>KafelaOS</strong> — {editorial.kafela}
                </p>
              </div>
              <span id="experience" className="anchor-alias" />
              <span id="collaborations" className="anchor-alias" />
              <span id="education" className="anchor-alias" />
              <span id="resume" className="anchor-alias" />
              <a className="text-link" href={profile.resume}>
                The professional version: my résumé<span className="file-label">PDF</span>
              </a>
            </div>
          </div>
        </section>

        <section id="lab" className="lab-section" aria-labelledby="lab-title">
          <div className="shell">
            <div className="lab-top">
              <SectionLabel number="03">The Engineering Lab</SectionLabel>
              <span className="lab-status mono">OPEN TO EXPLORE</span>
            </div>
            <div className="lab-heading">
              <h2 id="lab-title">
                Let’s look
                <br />
                <span className="serif">under the hood.</span>
              </h2>
              <div>
                <p>{editorial.lab}</p>
                <p className="lab-future">{editorial.labFuture}</p>
              </div>
            </div>
            <div className="lab-workspace">
              <div className="lab-workspace-header">
                <span className="mono">AUTOMARK / GRADING PIPELINE</span>
                <span className="lab-illustration-label">Inside the workload simulator</span>
              </div>
              <GradingFlow lab />
              <div className="lab-workspace-footer">
                <span className="lab-note serif">What happens between submit and result?</span>
                <Link className="text-link" href="/lab/automark/" prefetch={false}>
                  Try the workload simulator
                </Link>
              </div>
            </div>
            <div className="lab-bottom">
              <p>
                <Link className="text-link" href="/lab/">
                  Explore the Engineering Lab
                </Link>
              </p>
              <span className="lab-small-mark" aria-hidden="true">
                is<span>.</span>
              </span>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section shell" aria-labelledby="contact-title">
          <SectionLabel number="04">Get in touch</SectionLabel>
          <div className="contact-grid">
            <div>
              <h2 id="contact-title">
                Good things start
                <br />
                with <span className="serif">a conversation.</span>
              </h2>
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <div className="contact-copy">
              <p>{editorial.contact[0]}</p>
              <p>{editorial.contact[1]}</p>
              <div className="social-links">
                <a
                  className="text-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a className="text-link" href={profile.resume}>
                  Résumé<span className="file-label">PDF</span>
                </a>
              </div>
            </div>
          </div>
          <div className="sign-off">
            <p>
              Thanks for stopping by,<span className="serif">Ibrahim.</span>
            </p>
            <span className="signoff-flower" aria-hidden="true">
              ✳
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <p>© {new Date().getUTCFullYear()} Ibrahim Sharif</p>
        <span>Built with care. And a few good questions.</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
