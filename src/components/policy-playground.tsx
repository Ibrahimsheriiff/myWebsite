'use client';
import { useState, useSyncExternalStore } from 'react';
import { demoPolicyRules, initialPolicyInput, type PolicyInput } from '@/content/policy-fixtures';
import { evaluateDemoPolicy } from '@/lib/demo-policy';
const subscribe = () => () => {};
export function PolicyPlayground() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [input, setInput] = useState<PolicyInput>({ ...initialPolicyInput });
  const result = evaluateDemoPolicy(input);
  return (
    <div className="policy-playground">
      <p className="pp-disclaimer">
        FICTIONAL POLICY DEMONSTRATION · Not the project’s assessment policy or a statement of
        customer rights. No model or order service is called.
      </p>
      <div className="pp-grid">
        <div className="pp-input">
          <p className="mono">01 / STRUCTURED INPUT</p>
          <h3>A small request record.</h3>
          {enhanced ? (
            <>
              <label htmlFor="pp-reference">Reference</label>
              <input
                id="pp-reference"
                value={input.reference}
                onChange={(e) => setInput({ ...input, reference: e.target.value })}
                maxLength={40}
              />
              <label htmlFor="pp-days">Days since delivery</label>
              <input
                id="pp-days"
                type="number"
                min="0"
                max="365"
                step="1"
                value={input.days}
                onChange={(e) => setInput({ ...input, days: e.target.value })}
              />
              <label htmlFor="pp-condition">Item condition</label>
              <select
                id="pp-condition"
                value={input.condition}
                onChange={(e) =>
                  setInput({ ...input, condition: e.target.value as PolicyInput['condition'] })
                }
              >
                <option value="sealed">Sealed</option>
                <option value="opened">Opened</option>
                <option value="damaged">Damaged</option>
              </select>
              <div className="pp-presets">
                <button
                  type="button"
                  onClick={() => setInput({ ...initialPolicyInput, days: '21' })}
                >
                  At 21 days
                </button>
                <button
                  type="button"
                  onClick={() => setInput({ ...initialPolicyInput, reference: '' })}
                >
                  Missing reference
                </button>
                <button
                  type="button"
                  onClick={() => setInput({ ...initialPolicyInput, condition: 'damaged' })}
                >
                  Needs a person
                </button>
              </div>
              <button
                className="text-link pp-reset"
                type="button"
                onClick={() => setInput({ ...initialPolicyInput })}
              >
                Reset example ↺
              </button>
            </>
          ) : (
            <dl>
              <div>
                <dt>Reference</dt>
                <dd>DEMO-42</dd>
              </div>
              <div>
                <dt>Days since delivery</dt>
                <dd>7</dd>
              </div>
              <div>
                <dt>Condition</dt>
                <dd>Sealed</dd>
              </div>
            </dl>
          )}
        </div>
        <div className="pp-result" role="status" aria-live="polite">
          <p className="mono">02 / DETERMINISTIC RESULT</p>
          <p className="pp-rule-id">
            Rule {result.rule} · {demoPolicyRules.find((r) => r[0] === result.rule)![1]}
          </p>
          <h3>{result.label}</h3>
          <code>{result.code}</code>
          <p>{result.explanation}</p>
          <p className="pp-rule-note">
            Applicable illustrative rule: {demoPolicyRules.find((r) => r[0] === result.rule)![2]}
          </p>
        </div>
      </div>
      <details className="pp-rules" open={!enhanced}>
        <summary>
          The fictional rules, in priority order <span aria-hidden="true">＋</span>
        </summary>
        <ol>
          {demoPolicyRules.map(([id, title, text]) => (
            <li key={id} data-applies={id === result.rule}>
              <span className="mono">{id}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
