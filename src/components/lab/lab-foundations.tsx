import Link from 'next/link';
export function SimulationBoundary() {
  return (
    <p className="lab-boundary">
      <span aria-hidden="true">↳</span> Illustrative logical simulation. Fictional jobs and virtual
      seconds; no connection to AutoMark, SVN, AWS or Docker. No code is executed.
    </p>
  );
}
export function LabBreadcrumb({
  experiment = false,
  label,
}: {
  experiment?: boolean;
  label?: string;
}) {
  return (
    <nav className="lab-breadcrumb" aria-label="Lab breadcrumb">
      <Link href="/">Portfolio</Link>
      <span aria-hidden="true">/</span>
      {experiment || label ? (
        <>
          <Link href="/lab/">Engineering Lab</Link>
          <span aria-hidden="true">/</span>
          <span>{label ?? 'AutoMark'}</span>
        </>
      ) : (
        <span>Engineering Lab</span>
      )}
    </nav>
  );
}
export function WorkloadSketch() {
  return (
    <figure className="lab-sketch">
      <figcaption>
        <span>AutoMark / logical sketch</span>
        <span>Intake ≠ completion</span>
      </figcaption>
      <div
        className="sketch-flow"
        aria-label="Submission intake connects to a waiting queue, three independent workers and results"
      >
        <div className="sketch-intake">
          <span className="sketch-heading">Submit</span>
          <div className="sketch-pages" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p>Accept the work.</p>
        </div>
        <div className="sketch-queue">
          <span className="sketch-heading">Queue</span>
          <div className="sketch-slots" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>Hold it separately.</p>
        </div>
        <div className="sketch-workers">
          <span className="sketch-heading">Independent workers</span>
          <div aria-hidden="true">
            <i>
              01
              <span />
            </i>
            <i>
              02
              <span />
            </i>
            <i>
              03
              <span />
            </i>
          </div>
          <p>Grade in isolation.</p>
        </div>
        <div className="sketch-result">
          <span className="sketch-heading">Results</span>
          <div aria-hidden="true">
            ✓<span>↳</span>
          </div>
          <p>Return an outcome.</p>
        </div>
      </div>
      <p className="sketch-caption">
        A responsibility drawing, not an execution or deployment diagram.
      </p>
    </figure>
  );
}
