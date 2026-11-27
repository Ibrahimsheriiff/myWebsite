'use client';
import { useState, useSyncExternalStore } from 'react';
import { scenarios } from '@/content/lab/workload-fixtures';
import { eventDescription, workloadMetrics } from '@/lib/lab/workload-metrics';
import type { WorkloadConfig, WorkloadEvent } from '@/lib/lab/workload-types';
import { WorkloadComparison } from './workload-comparison';
import { completedRun, type CompletedRun } from '@/lib/lab/workload-comparison';
import { useWorkloadPlayback } from './use-workload-playback';
const subscribe = () => () => {};
const statusLabel = {
  ready: 'Ready to explore',
  running: 'Running',
  paused: 'Paused',
  completed: 'Completed',
};
function EventList({ events, total }: { events: WorkloadEvent[]; total: number }) {
  return (
    <ol className="sim-events">
      {events.map((event) => (
        <li key={event.id} data-event={event.kind}>
          <time>{event.time}s</time>
          <span>{eventDescription(event, total)}</span>
        </li>
      ))}
    </ol>
  );
}
export function WorkloadSimulator() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { state, dispatch, speed, setSpeed } = useWorkloadPlayback();
  const [retained, setRetained] = useState<CompletedRun | null>(null);
  const current = state.status === 'completed' ? completedRun(state) : null;
  const [eventFilter, setEventFilter] = useState('all');
  const m = workloadMetrics(state);
  const active = state.status === 'running' || state.status === 'paused';
  const config = state.config;
  const configure = (change: Partial<WorkloadConfig>) => {
    dispatch({ type: 'reset', config: { ...config, ...change } });
    setEventFilter('all');
  };
  const queue = state.jobs.filter((j) => j.status === 'queued');
  const recent = state.events.filter(
    (e) =>
      eventFilter === 'all' ||
      (eventFilter === 'outcomes'
        ? ['completed', 'timeout', 'finished'].includes(e.kind)
        : ['assigned', 'started'].includes(e.kind)),
  );
  const failedJobs = state.jobs.filter((j) => j.status === 'failed');
  const recentCompletions = state.events
    .filter((e) => e.kind === 'completed')
    .slice(-4)
    .reverse()
    .map((e) => state.jobs.find((j) => j.id === e.job)!);
  const visibleOutcomes = [...failedJobs, ...recentCompletions];
  const scenario = scenarios.find((s) => s.id === config.scenario)!;
  const announcement =
    state.status === 'completed'
      ? `Completed. ${m.completed} jobs graded, ${m.failed} failed in ${state.time} virtual seconds.`
      : state.status === 'paused'
        ? 'Paused. Playback is stopped; Step advances one virtual second.'
        : state.status === 'running'
          ? 'Running. You can pause or reset at any time.'
          : 'Ready. Choose a workload, then start or step.';
  return (
    <section className="simulator" aria-labelledby="workspace-title" data-run-status={state.status}>
      <div className="sim-topline">
        <h2 id="workspace-title">The grading workbench</h2>
        <p className="sim-status" role="status" aria-live="polite" aria-atomic="true">
          <span>{statusLabel[state.status]}</span>
          <span className="sr-only">. {announcement}</span>
        </p>
      </div>
      <div className="sim-config">
        <label>
          Submitted jobs
          <select
            aria-label="Submitted jobs"
            disabled={!enhanced || active}
            value={config.jobs}
            onChange={(e) => configure({ jobs: Number(e.target.value) })}
          >
            {[0, 6, 12, 24, 36].map((n) => (
              <option key={n} value={n}>
                {n} jobs
              </option>
            ))}
          </select>
        </label>
        <label>
          Independent workers
          <select
            aria-label="Independent workers"
            disabled={!enhanced || active}
            value={config.workers}
            onChange={(e) => configure({ workers: Number(e.target.value) })}
          >
            {[1, 2, 3, 4, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'worker' : 'workers'}
              </option>
            ))}
          </select>
        </label>
        <label>
          Scenario
          <select
            aria-label="Scenario"
            disabled={!enhanced || active}
            value={config.scenario}
            onChange={(e) => configure({ scenario: e.target.value as WorkloadConfig['scenario'] })}
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Playback
          <select
            aria-label="Playback speed"
            disabled={!enhanced}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            {[1, 2, 4].map((n) => (
              <option key={n} value={n}>
                {n}× speed
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="sim-controls">
        <div>
          <button
            className="sim-primary"
            disabled={!enhanced || state.status === 'completed'}
            onClick={() =>
              dispatch({
                type:
                  state.status === 'ready'
                    ? 'start'
                    : state.status === 'running'
                      ? 'pause'
                      : 'resume',
              })
            }
          >
            {state.status === 'ready'
              ? 'Start workload'
              : state.status === 'running'
                ? 'Pause'
                : state.status === 'paused'
                  ? 'Resume'
                  : 'Workload completed'}
          </button>
          <button
            disabled={!enhanced || state.status === 'running' || state.status === 'completed'}
            onClick={() => dispatch({ type: 'step' })}
          >
            Step <span className="sim-control-unit">+1s</span>
          </button>
          <button
            disabled={!enhanced}
            onClick={() => {
              dispatch({ type: 'reset' });
              setEventFilter('all');
            }}
          >
            Reset
          </button>
        </div>
        <p>
          <span className="sim-clock" data-testid="virtual-time">
            {state.time}
            <span>s</span>
          </span>
          <span>VIRTUAL TIME</span>
        </p>
      </div>
      <p className="sim-instructions">
        {!enhanced
          ? 'Playback needs JavaScript. The model and a representative example are explained below.'
          : state.status === 'completed'
            ? 'Run complete. Reset or change a workload setting to explore another configuration.'
            : active
              ? 'Workload settings are locked until Reset. Playback speed changes viewing pace, not the model.'
              : 'Start plays the workload. Step opens at t = 0, then advances one virtual second at a time.'}
      </p>
      <div className="sim-flow" aria-label="Current submission flow">
        <section className="sim-intake" aria-labelledby="intake-title">
          <p className="sim-stage">01 / INTAKE</p>
          <h3 id="intake-title">Accept</h3>
          <p className="sim-big" data-testid="accepted-count">
            {m.accepted}
            <span> / {config.jobs}</span>
          </p>
          <p>jobs received</p>
          <div className="sim-intake-strip" aria-hidden="true">
            {state.jobs.map((j) => (
              <i key={j.id} data-arrived={j.status !== 'pending'} />
            ))}
          </div>
          <p className="sim-small">
            {m.pending} not yet received
            <br />
            {m.received} moving through intake
          </p>
          <p className="sim-intake-time">
            {m.acceptanceTime !== null
              ? `All received at ${m.acceptanceTime}s`
              : 'Arrivals: three jobs per second'}
          </p>
        </section>
        <section className="sim-queue" aria-labelledby="queue-title">
          <p className="sim-stage">02 / FIFO QUEUE</p>
          <h3 id="queue-title">
            Wait <span>{m.queued}</span>
          </h3>
          <p className="sim-small">Oldest waiting job goes first.</p>
          <ol className="sim-queue-jobs">
            {queue.map((j) => (
              <li key={j.id}>{j.id}</li>
            ))}
          </ol>
          {!queue.length && (
            <p className="sim-empty">
              {state.status === 'ready' ? 'Work will wait here.' : 'No jobs waiting.'}
            </p>
          )}
          <p className="sim-queue-foot">
            Intake takes one virtual second.
            <br />
            Queue size counts waiting jobs only.
          </p>
        </section>
        <section className="sim-worker-bank" aria-labelledby="workers-title">
          <p className="sim-stage">03 / ISOLATED EXECUTION</p>
          <h3 id="workers-title">
            Grade <span>{m.running} running</span>
          </h3>
          <div className="sim-workers">
            {Array.from({ length: config.workers }, (_, i) => {
              const j = state.jobs.find((j) => j.status === 'running' && j.worker === i + 1);
              const elapsed = j ? state.time - j.startedAt! : 0;
              const budget = j ? Math.min(j.duration, j.limit) : 1;
              return (
                <div key={i} className="sim-worker" data-busy={!!j}>
                  <div>
                    <span>Worker {String(i + 1).padStart(2, '0')}</span>
                    <strong key={j?.id ?? 'idle'}>{j ? j.id : 'Available'}</strong>
                  </div>
                  <div
                    className="sim-progress"
                    role={j ? 'progressbar' : undefined}
                    aria-label={j ? `${j.id} execution on worker ${i + 1}` : undefined}
                    aria-valuemin={j ? 0 : undefined}
                    aria-valuemax={j ? budget : undefined}
                    aria-valuenow={j ? elapsed : undefined}
                    aria-valuetext={j ? `${elapsed} of ${budget} virtual seconds` : undefined}
                  >
                    <span style={{ transform: `scaleX(${j ? elapsed / budget : 0})` }} />
                  </div>
                  <p>
                    {j
                      ? `${elapsed} / ${budget}s · illustrative Docker sandbox`
                      : 'Ready for the next queued job'}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="sim-outcomes" aria-labelledby="outcomes-title">
          <p className="sim-stage">04 / OUTCOMES</p>
          <h3 id="outcomes-title">Return</h3>
          <p className="sim-result-count">
            <span aria-hidden="true">✓</span>
            <strong data-testid="completed-count">{m.completed}</strong> completed
          </p>
          <p className="sim-result-count sim-failed">
            <span aria-hidden="true">×</span>
            <strong data-testid="failed-count">{m.failed}</strong> failed
          </p>
          <ol className="sim-outcome-jobs">
            {visibleOutcomes.map((j) => (
              <li key={j.id}>
                <span>{j.id}</span>
                <span>
                  {j.status === 'failed' ? 'Timed out' : 'Done'} · {j.finishedAt}s
                </span>
              </li>
            ))}
          </ol>
          {visibleOutcomes.length > 0 && (
            <p className="sim-small">
              All failures and latest four completions. All records below.
            </p>
          )}
          {!visibleOutcomes.length && <p className="sim-empty">Acceptance isn’t a result.</p>}
        </section>
      </div>
      <div className="sim-metrics">
        <div>
          <span>Peak waiting queue</span>
          <strong data-testid="peak-queue">
            {state.peakQueue}
            <small> jobs</small>
          </strong>
        </div>
        <div>
          <span>Simulated worker utilisation</span>
          <strong data-testid="utilisation">
            {Math.round(m.utilisation * 100)}
            <small>%</small>
          </strong>
        </div>
        <div>
          <span>Workload completion</span>
          <strong data-testid="completion-time">
            {m.completionTime === null ? '—' : `${m.completionTime}s`}
          </strong>
        </div>
      </div>
      <p className="sim-metric-note">
        Utilisation = busy worker-seconds ÷ (workers × elapsed virtual seconds), including intake
        time. It starts at 0%. Peak queue is sampled after dispatch at each whole-second boundary.
      </p>
      <div className="sim-observation">
        <span className="lab-eyebrow">WHAT TO LOOK FOR</span>
        <p>
          {state.status === 'completed'
            ? `${m.accepted} accepted by ${m.acceptanceTime}s; ${m.completed} completed and ${m.failed} failed by ${state.time}s. Reset, change the worker count and compare the waiting.`
            : scenario.description}
        </p>
      </div>
      <details className="sim-records">
        <summary>
          Inspect all {config.jobs} submission records <span aria-hidden="true">＋</span>
        </summary>
        <ol>
          {state.jobs.map((j) => (
            <li key={j.id}>
              <strong>{j.id}</strong>
              <span>
                {j.status === 'pending'
                  ? 'Not received'
                  : j.status === 'failed'
                    ? 'Failed · timeout'
                    : j.status}
              </span>
              <span>{j.worker ? `Worker ${j.worker}` : 'No worker assigned'}</span>
              <span>
                {j.receivedAt === undefined ? `Arrives ${j.arrival}s` : `Received ${j.receivedAt}s`}
                {j.finishedAt !== undefined ? ` · finished ${j.finishedAt}s` : ''}
              </span>
            </li>
          ))}
        </ol>
      </details>
      <section className="sim-timeline" aria-labelledby="timeline-title">
        <div className="sim-timeline-heading">
          <div>
            <p className="lab-eyebrow">ACTUAL EVENTS FROM THIS MODEL</p>
            <h3 id="timeline-title">Follow the hand-offs.</h3>
          </div>
          <label>
            Show
            <select
              aria-label="Filter events"
              value={eventFilter}
              disabled={!enhanced}
              onChange={(e) => setEventFilter(e.target.value)}
            >
              <option value="all">All events</option>
              <option value="execution">Worker activity</option>
              <option value="outcomes">Outcomes</option>
            </select>
          </label>
        </div>
        {recent.length ? (
          <>
            <p className="sim-small">
              Most recent {Math.min(8, recent.length)} of {recent.length} matching events. No
              automatic scrolling.
            </p>
            <EventList events={recent.slice(-8).reverse()} total={config.jobs} />
            <details>
              <summary>
                Read the complete chronological timeline <span aria-hidden="true">＋</span>
              </summary>
              <EventList events={recent} total={config.jobs} />
            </details>
          </>
        ) : (
          <p className="sim-empty">
            {state.status === 'ready'
              ? 'Start or step to create events.'
              : 'No events match this filter yet.'}
          </p>
        )}
      </section>
      <WorkloadComparison
        state={state}
        retained={retained}
        current={current}
        enabled={enhanced}
        onRetain={() => {
          if (current) setRetained(current);
        }}
        onClear={() => setRetained(null)}
      />
      <details className="sim-assumptions">
        <summary>
          Scheduling assumptions and limits <span aria-hidden="true">＋</span>
        </summary>
        <p>
          Three synthetic jobs arrive each virtual second, each spending one second in intake. FIFO
          dispatch uses received order; ties use submission identifier. Available workers are
          assigned in worker-number order. Executions finish before new dispatch at each tick. No
          retries, autoscaling, network delay, storage, crashes or durable persistence are modelled.
        </p>
        <p>
          The timeout scenario gives one job 14 seconds of required work and an 8-second execution
          limit. It fails at that limit; its worker becomes available in the same tick. A duration
          exactly equal to its limit completes. Timings are integers and independent of browser
          frame rate. Reset discards the current run.
        </p>
        <p>
          Playback at 1× advances one virtual second per one second of viewing time. Browser
          throttling can slow playback; the virtual schedule stays unchanged. Leaving the route
          cleans up playback. Hiding the tab pauses it.
        </p>
      </details>
    </section>
  );
}
