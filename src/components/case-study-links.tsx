import Link from 'next/link';
import { completedStudies } from '@/content/case-studies';
export function CaseStudyLinks({ current }: { current: string }) {
  return (
    <>
      {' '}
      {current !== 'automark' && (
        <Link prefetch={false} className="text-link" href={`/lab/${current}/`}>
          Explore {completedStudies.find((s) => s.slug === current)?.name} in the Lab
        </Link>
      )}{' '}
      <nav className="case-study-links" aria-label="Other case studies">
        <span className="mono">MORE SYSTEMS</span>
        {completedStudies
          .filter((s) => s.slug !== current)
          .map((s) => (
            <Link key={s.slug} href={`/work/${s.slug}/`}>
              {s.name}
            </Link>
          ))}
      </nav>
    </>
  );
}
