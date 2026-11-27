import Link from 'next/link';
import { LabBreadcrumb } from './lab-foundations';
import { experiments, type ExperimentSlug } from '@/content/lab/experiments';
import '@/app/lab/collection.css';
export function ExperimentLinks({ current }: { current: ExperimentSlug }) {
  return (
    <nav className="experiment-links" aria-label="Other experiments">
      <span className="lab-eyebrow">KEEP EXPLORING</span>
      {experiments
        .filter((e) => e.slug !== current)
        .map((e) => (
          <Link prefetch={false} key={e.slug} href={`/lab/${e.slug}/`}>
            {e.name}
          </Link>
        ))}
    </nav>
  );
}
export function ExperimentFrame({
  slug,
  headline,
  children,
  lesson,
  example,
}: {
  slug: ExperimentSlug;
  headline: React.ReactNode;
  children: React.ReactNode;
  lesson: string;
  example: string;
}) {
  const e = experiments.find((e) => e.slug === slug)!;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${e.name} — ${e.title}`,
    url: `https://ibrahimsheriiff.com/lab/${slug}/`,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web browser',
    description: e.description,
    author: { '@type': 'Person', name: 'Ibrahim Sharif' },
  };
  return (
    <div className={`shell experiment-page experiment-${slug}`}>
      <LabBreadcrumb label={e.name} />
      <header className="collection-cover">
        <p className="lab-eyebrow">
          {e.name.toUpperCase()} / {e.title.toUpperCase()}
        </p>
        <h1>{headline}</h1>
        <p className="collection-intro">{e.description}</p>
        <p className="lab-boundary">{e.boundary}</p>
      </header>
      {children}
      <noscript>
        <aside className="lab-nojs">
          <h2>Explore the idea without playback.</h2>
          <p>JavaScript is required for the interactive controls. {example}</p>
        </aside>
      </noscript>
      <div className="collection-lesson">
        <p>{lesson}</p>
        <Link className="lab-text-link" href={`/work/${slug}/`}>
          Read the {e.name} case study
        </Link>
      </div>
      <div className="lab-return">
        <Link className="lab-text-link" href="/lab/">
          Back to the Engineering Lab
        </Link>
      </div>
      <ExperimentLinks current={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
    </div>
  );
}
