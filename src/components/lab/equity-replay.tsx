'use client';
import { useEffect, useReducer, useState } from 'react';
import { createReplay, replayReducer } from '@/lib/lab/equity-replay';
import { replayScenarios, type ReplayScenario } from '@/content/lab/equity-replay';
import { useEnhanced } from './use-enhanced';
import '@/app/lab/equityguard/replay.css';
export function EquityReplay() {
  const enhanced = useEnhanced();
  const [s, dispatch] = useReducer(replayReducer, undefined, () => createReplay());
  const [selected, setSelected] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  useEffect(() => {
    if (s.status !== 'running') return;
    const timer = setInterval(() => dispatch({ type: 'tick' }), 1200 / speed);
    const hide = () => {
      if (document.hidden) dispatch({ type: 'pause' });
    };
    document.addEventListener('visibilitychange', hide);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', hide);
    };
  }, [s.status, speed]);
  const current = s.events[selected ?? s.events.length - 1];
  const locked = s.status === 'running' || s.status === 'paused';
  return (
    <section
      className="experiment-workspace equity-replay"
      data-state={s.status}
      aria-label="Agent execution workspace"
    >
      <div className="ew-top">
        <h2>An observable execution.</h2>
        <p role="status">
          {s.status}
          {s.status === 'paused' ? ` · event ${s.events.length}` : ''}
          {s.status === 'completed'
            ? ` · ${s.events.at(-1)?.outcome === 'failed' ? 'Stopped at a boundary' : 'Prepared response ready'}`
            : ''}
        </p>
      </div>
      <div className="eq-transport">
        <label>
          Scenario
          <select
            disabled={!enhanced || locked}
            aria-label="Replay scenario"
            value={s.scenario}
            onChange={(e) => {
              dispatch({ type: 'reset', scenario: e.target.value as ReplayScenario });
              setSelected(null);
            }}
          >
            {replayScenarios.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <div className="ew-actions">
          <button
            className="ew-primary"
            disabled={!enhanced || s.status === 'completed'}
            onClick={() => {
              setSelected(null);
              dispatch({
                type: s.status === 'ready' ? 'start' : s.status === 'running' ? 'pause' : 'resume',
              });
            }}
          >
            {s.status === 'ready'
              ? 'Start replay'
              : s.status === 'running'
                ? 'Pause'
                : s.status === 'paused'
                  ? 'Resume'
                  : 'Replay complete'}
          </button>
          <button
            disabled={!enhanced || s.status === 'running' || s.status === 'completed'}
            onClick={() => {
              setSelected(null);
              dispatch({ type: 'step' });
            }}
          >
            Step event
          </button>
          <button
            disabled={!enhanced}
            onClick={() => {
              dispatch({ type: 'reset' });
              setSelected(null);
            }}
          >
            Reset replay
          </button>
        </div>
        <label>
          Playback pace
          <select
            disabled={!enhanced}
            aria-label="Playback pace"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </label>
      </div>
      <p className="ew-note">
        {enhanced
          ? 'Select an observed event to inspect its payload. Events are ordinal, not measured latency.'
          : 'Controls need JavaScript. A successful example validates a request, calls get_price_data and returns prepared public fields.'}
      </p>
      <div className="eq-execution">
        <nav aria-label="Observed replay events">
          <p className="lab-eyebrow">EVENT LEDGER / {s.events.length} OBSERVED</p>
          <ol>
            {s.events.map((e) => (
              <li key={e.index}>
                <button
                  disabled={!enhanced}
                  aria-pressed={current?.index === e.index}
                  onClick={() => setSelected(e.index)}
                >
                  <span>{String(e.index + 1).padStart(2, '0')}</span>
                  <strong>{e.title}</strong>
                  <small>
                    {e.stage}
                    {e.outcome ? ` · ${e.outcome}` : ''}
                  </small>
                </button>
              </li>
            ))}
          </ol>
          {!s.events.length && (
            <p className="eq-empty">
              Nothing has run.
              <br />
              Start, or inspect one event at a time.
            </p>
          )}
        </nav>
        <div className="eq-packet">
          <p className="lab-eyebrow">PUBLIC PAYLOAD / NOT A MODEL TRANSCRIPT</p>
          <h3>{current?.title ?? 'Follow the request, not the reasoning.'}</h3>
          <p>
            {current?.note ??
              'The tool contract, returned data and response boundary are observable. A plausible-looking result is still something to check.'}
          </p>
          {current ? (
            <>
              <p className={current.outcome === 'failed' ? 'ew-error' : ''}>
                {current.extension ? 'EDUCATIONAL EXTENSION' : `Stage: ${current.stage}`}
              </p>
              <div className="eq-receipt">
                <span className="lab-eyebrow">
                  {current.outcome
                    ? `PUBLIC CHECK / ${current.outcome.toUpperCase()}`
                    : 'OBSERVED PAYLOAD'}
                </span>
                <p>
                  {current.stage === 'tool_result' && s.scenario === 'success'
                    ? 'Fictional price 99.50 · previous close 100.00 · change −0.50%.'
                    : 'Inspect the declared fields and prepared values below.'}
                </p>
              </div>
              <details className="eq-raw">
                <summary>
                  Inspect exact public payload <span aria-hidden="true">＋</span>
                </summary>
                <pre>{JSON.stringify(current.payload, null, 2)}</pre>
              </details>
            </>
          ) : (
            <div className="eq-envelope" aria-hidden="true">
              <span>REQUEST</span>
              <span>TOOL CALL</span>
              <span>PUBLIC RESPONSE</span>
            </div>
          )}
        </div>
      </div>
      <div className="eq-boundaries">
        <p>
          <strong>Source-grounded:</strong> required ticker, custom Anthropic loop, get_price_data
          registry call, dictionary result and public response fields.
        </p>
        <p>
          <strong>Illustrative:</strong> FICT, all numbers, prepared selection/output and the
          explicit provider-error stop. No live-agent reliability is established.
        </p>
      </div>
    </section>
  );
}
