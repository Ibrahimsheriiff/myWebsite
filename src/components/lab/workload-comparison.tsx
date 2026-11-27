'use client';
import { comparisonNote, type CompletedRun, workerActivity } from '@/lib/lab/workload-comparison';
import type { WorkloadState } from '@/lib/lab/workload-types';
export function WorkloadComparison({
  state,
  retained,
  current,
  onRetain,
  onClear,
  enabled,
}: {
  state: WorkloadState;
  retained: CompletedRun | null;
  current: CompletedRun | null;
  onRetain: () => void;
  onClear: () => void;
  enabled: boolean;
}) {
  const rows: [string, (r: CompletedRun) => string | number][] = [
    ['Submitted jobs', (r) => r.config.jobs],
    ['Workers', (r) => r.config.workers],
    ['Scenario', (r) => r.config.scenario],
    ['Acceptance', (r) => `${r.acceptance}s`],
    ['Completion', (r) => `${r.completion}s`],
    ['Peak waiting', (r) => `${r.peakQueue} jobs`],
    ['Completed / failed', (r) => `${r.completed} / ${r.failed}`],
    ['Worker utilisation', (r) => `${Math.round(r.utilisation * 100)}%`],
  ];
  return (
    <section className="sim-comparison" aria-labelledby="comparison-title">
      <div>
        <p className="lab-eyebrow">KEEP A REFERENCE / IN MEMORY ONLY</p>
        <h3 id="comparison-title">Change one thing. Compare the wait.</h3>
        <p>
          Retain a completed run, reset and try another configuration. Leaving this experiment
          clears the reference.
        </p>
        <div className="comparison-actions">
          <button disabled={!enabled || !current} onClick={onRetain}>
            Retain completed run
          </button>
          <button disabled={!enabled || !retained} onClick={onClear}>
            Clear retained run
          </button>
        </div>
      </div>
      {retained ? (
        <>
          <p className="comparison-note" role="status">
            {current
              ? comparisonNote(retained, current)
              : 'Reference retained. Complete another run to compare.'}
          </p>
          <table>
            <caption>Synthetic completed-run comparison · virtual seconds</caption>
            <thead>
              <tr>
                <th scope="col">Measure</th>
                <th scope="col">Retained run</th>
                <th scope="col">Current run</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value(retained)}</td>
                  <td>{current ? value(current) : 'Not completed'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="sim-small">No completed run retained yet.</p>
      )}
      {current && (
        <details>
          <summary>
            Worker activity from actual model events <span aria-hidden="true">＋</span>
          </summary>
          <p className="sim-small">
            Each segment lists virtual start–end time; failures stay identified.
          </p>
          <ol className="comparison-activity">
            {Array.from({ length: state.config.workers }, (_, i) => (
              <li key={i}>
                <strong>Worker {i + 1}</strong>
                <div>
                  {workerActivity(state)
                    .filter((s) => s.worker === i + 1)
                    .map((s) => (
                      <span key={s.job} data-failed={s.failed}>
                        {s.job} · {s.start}–{s.end}s{s.failed ? ' · timeout' : ''}
                      </span>
                    ))}
                </div>
              </li>
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}
