'use client';
import { useReducer, useState } from 'react';
import { createResolution, resolutionReducer } from '@/lib/lab/resolution-workflow';
import { resolutionScenarios, type ResolutionScenario } from '@/content/lab/resolution-fixtures';
import { useEnhanced } from './use-enhanced';
import '@/app/lab/returns-agent/resolution.css';
export function ResolutionWorkflow() {
  const enabled = useEnhanced(),
    [s, dispatch] = useReducer(resolutionReducer, undefined, () => createResolution()),
    [reference, setReference] = useState('');
  const fixture = resolutionScenarios.find((x) => x.id === s.scenario)!;
  const stages = [
    ['interpreted', 'Interpret'],
    ['waiting', 'Clarify'],
    ['lookup', 'Lookup'],
    ['policy', 'Policy'],
    ['reply', 'Reply'],
    ['completed', 'Validate'],
  ] as const;
  return (
    <section
      className="experiment-workspace resolution-workspace"
      aria-label="Resolution workflow workspace"
    >
      <div className="ew-top">
        <h2>Language meets a boundary.</h2>
        <p role="status">
          {s.stage === 'waiting'
            ? 'Waiting for a reference'
            : s.stage === 'invalid'
              ? 'Input needs correction'
              : s.stage === 'completed'
                ? 'Completed · output validated'
                : s.stage}
        </p>
      </div>
      <div className="rw-input-line">
        <label>
          Request scenario
          <select
            aria-label="Request scenario"
            disabled={!enabled}
            value={s.scenario}
            onChange={(e) => {
              dispatch({ type: 'reset', scenario: e.target.value as ResolutionScenario });
              setReference('');
            }}
          >
            {resolutionScenarios.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <div className="ew-actions">
          <button
            className="ew-primary"
            disabled={!enabled || ['waiting', 'invalid', 'completed'].includes(s.stage)}
            onClick={() => dispatch({ type: 'next' })}
          >
            Next step
          </button>
          <button
            disabled={!enabled}
            onClick={() => {
              dispatch({ type: 'reset' });
              setReference('');
            }}
          >
            Reset workflow
          </button>
        </div>
      </div>
      <div className="rw-responsibilities">
        <div>
          <span className="lab-eyebrow">PREPARED LANGUAGE INPUT</span>
          <blockquote>{fixture.request}</blockquote>
          <p>
            No arbitrary text is interpreted. The structured interpretation is a fixture you can
            inspect.
          </p>
          {s.interpretation && <pre>{JSON.stringify(s.interpretation, null, 2)}</pre>}
        </div>
        <div>
          <span className="lab-eyebrow">DETERMINISTIC SOFTWARE</span>
          <ol className="rw-path">
            {stages.map(([stage, label]) => (
              <li
                key={stage}
                data-active={s.stage === stage || (stage === 'waiting' && s.stage === 'invalid')}
              >
                <span>{stage === 'waiting' ? 'Clarify / correct' : label}</span>
                <small>
                  {s.events.some(
                    (e) => e.stage === stage || (stage === 'waiting' && e.stage === 'invalid'),
                  )
                    ? 'Observed'
                    : 'Not reached'}
                </small>
              </li>
            ))}
          </ol>
          <p>
            Lookup, clarification and policy remain separate responsibilities. The model does not
            own the business decision.
          </p>
        </div>
      </div>
      <div className="rw-decision-area">
        <div className="rw-current">
          <p className="lab-eyebrow">CURRENT BOUNDARY / {s.stage.toUpperCase()}</p>
          <h3>
            {s.stage === 'waiting'
              ? 'Ask before deciding.'
              : s.stage === 'invalid'
                ? 'Structure needs attention.'
                : s.stage === 'policy'
                  ? 'Rules own this outcome.'
                  : s.stage === 'completed'
                    ? 'A checked shape, not a guarantee.'
                    : 'Follow the next hand-off.'}
          </h3>
          {s.stage === 'waiting' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: 'provide', reference });
              }}
            >
              <label>
                Fictional order reference
                <input
                  aria-label="Fictional order reference"
                  disabled={!enabled}
                  value={reference}
                  maxLength={30}
                  onChange={(e) => setReference(e.target.value)}
                />
              </label>
              <p>Use a listed fictional order, then resume:</p>
              <div className="ew-actions rw-fixture-choices">
                <button type="button" disabled={!enabled} onClick={() => setReference('DEMO-42')}>
                  DEMO-42 · sealed
                </button>
                <button type="button" disabled={!enabled} onClick={() => setReference('DEMO-77')}>
                  DEMO-77 · opened
                </button>
              </div>
              <button disabled={!enabled} type="submit">
                Supply details and resume
              </button>
              {s.error && (
                <p className="ew-error" role="alert">
                  {s.error}
                </p>
              )}
            </form>
          )}
          {s.stage === 'invalid' && (
            <>
              <p>
                The reference must be text. No order lookup or policy decision follows an invalid
                interpretation.
              </p>
              <button disabled={!enabled} onClick={() => dispatch({ type: 'repair' })}>
                Load corrected prepared input
              </button>
              <p className="rw-small">
                This repair control is an educational extension, not a model retry.
              </p>
            </>
          )}
          {s.order && (
            <dl className="rw-order">
              <div>
                <dt>Fictional trusted reference</dt>
                <dd>{s.order.reference}</dd>
              </div>
              <div>
                <dt>Days / condition</dt>
                <dd>
                  {s.order.days} / {s.order.condition}
                </dd>
              </div>
            </dl>
          )}
          {s.policy && (
            <div className="rw-policy">
              <span>FICTIONAL POLICY / RULE {s.policy.rule}</span>
              <h4>{s.policy.label}</h4>
              <code>{s.policy.code}</code>
              <p>{s.policy.explanation}</p>
            </div>
          )}
          {s.output && (
            <details open>
              <summary>Representative public response</summary>
              <pre>{JSON.stringify(s.output, null, 2)}</pre>
            </details>
          )}
          {!s.order && !['waiting', 'invalid'].includes(s.stage) && (
            <p>
              {s.stage === 'ready'
                ? 'Choose a prepared request, then move one observable step at a time.'
                : 'The interpretation is ready for structural checks. A reference enables lookup; missing information takes the clarification branch.'}
            </p>
          )}
          <button
            className="rw-continue"
            disabled={!enabled || ['waiting', 'invalid', 'completed'].includes(s.stage)}
            onClick={() => dispatch({ type: 'next' })}
          >
            Continue workflow
          </button>
        </div>
        <aside className="rw-ledger">
          <p className="lab-eyebrow">OBSERVED TRANSITIONS</p>
          <ol>
            {s.events.map((e) => (
              <li key={e.id}>
                <span>
                  {String(e.id + 1).padStart(2, '0')} / {e.stage}
                </span>
                <p>{e.note}</p>
              </li>
            ))}
          </ol>
          {!s.events.length && <p>No transitions yet.</p>}
        </aside>
      </div>
      <p className="ew-note">
        {enabled
          ? 'The same fictional policy function powers the case study. This experience adds preparation, lookup, clarification, reply and validation around it. No original assessment rules or traces are reproduced.'
          : 'Controls require JavaScript. The complete-information fixture uses DEMO-42: seven days, sealed, a fictional return path. Missing references pause before policy.'}
      </p>
    </section>
  );
}
