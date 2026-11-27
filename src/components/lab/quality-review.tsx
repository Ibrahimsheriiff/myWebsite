'use client';
import { useReducer, useState } from 'react';
import { qualityRecords, qualityCategories } from '@/content/lab/quality-fixtures';
import {
  createQuality,
  qualityReducer,
  deriveQuality,
  qualityTotals,
  qualityExport,
} from '@/lib/lab/quality-review';
import { formatDemoAmount, mapRecord } from '@/lib/daita-workbench';
import { useEnhanced } from './use-enhanced';
import '@/app/lab/daita/quality.css';
export function QualityReview() {
  const enabled = useEnhanced(),
    [s, dispatch] = useReducer(qualityReducer, undefined, createQuality),
    [selected, setSelected] = useState('Q01');
  const rows = deriveQuality(s),
    totals = qualityTotals(s),
    row = rows.find((r) => r.id === selected)!,
    raw = qualityRecords.find((r) => r.id === selected)!,
    mapped = mapRecord({ ...raw, columns: { ...raw.columns, ...s.mapping } }),
    edit = s.edits[selected] ?? {};
  return (
    <section
      className="experiment-workspace quality-workspace"
      aria-label="Document quality workspace"
    >
      <div className="ew-top">
        <h2>Keep the awkward rows.</h2>
        <p role="status">
          {totals.reviewed} reviewed · {totals.held} held · {totals.excluded} excluded
        </p>
      </div>
      <div className="qr-mapping">
        <div>
          <p className="lab-eyebrow">MAP SOURCE COLUMNS</p>
          <p>The amount column starts unmapped. Try Value, then inspect what remains held.</p>
        </div>
        <label>
          Date column
          <select
            aria-label="Date column"
            disabled={!enabled}
            value={s.mapping.date}
            onChange={(e) => dispatch({ type: 'mapping', field: 'date', value: e.target.value })}
          >
            <option value="When">When → date</option>
            <option value="Entry">Entry → date (wrong shape)</option>
          </select>
        </label>
        <label>
          Amount column
          <select
            aria-label="Amount column"
            disabled={!enabled}
            value={s.mapping.amount}
            onChange={(e) => dispatch({ type: 'mapping', field: 'amount', value: e.target.value })}
          >
            <option value="">Not mapped</option>
            <option value="Value">Value → amount</option>
            <option value="Entry">Entry → amount (wrong shape)</option>
          </select>
        </label>
        <button
          disabled={!enabled}
          onClick={() => {
            dispatch({ type: 'reset' });
            setSelected('Q01');
          }}
        >
          Reset review
        </button>
      </div>
      <nav className="qr-register" aria-label="Review record register">
        {rows.map((r) => (
          <button
            disabled={!enabled}
            key={r.id}
            aria-pressed={selected === r.id}
            onClick={() => setSelected(r.id)}
          >
            <strong>{r.id}</strong>
            <span>{r.status}</span>
            <small>{r.source}</small>
          </button>
        ))}
      </nav>
      <div className="qr-spread">
        <article className="qr-original">
          <span className="lab-eyebrow">SOURCE SHEET / {selected}</span>
          <h3>The original stays here.</h3>
          <dl>
            {Object.entries(raw.fields).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value || 'Blank in source'}</dd>
              </div>
            ))}
          </dl>
          <p>
            Provenance: {raw.source}. Corrections are kept separately; the original fields never
            change.
          </p>
        </article>
        <section className="qr-review">
          <p className="lab-eyebrow">REVIEW SHEET / {selected}</p>
          <h3>
            {row.status === 'held'
              ? 'Something needs attention.'
              : row.status === 'reviewed'
                ? 'Reviewed, with provenance.'
                : row.status === 'excluded'
                  ? 'Excluded, still visible.'
                  : 'Ready for a person.'}
          </h3>
          <p className={row.status === 'held' ? 'ew-error' : 'qr-disposition'}>{row.disposition}</p>
          <label>
            Date correction{' '}
            {edit.date !== undefined && edit.date !== mapped.date && (
              <span className="qr-changed">Changed locally</span>
            )}
            <input
              aria-label="Date correction"
              disabled={!enabled}
              maxLength={40}
              value={edit.date ?? mapped.date}
              onChange={(e) =>
                dispatch({ type: 'edit', id: selected, field: 'date', value: e.target.value })
              }
            />
          </label>
          <p className="qr-normalised">Normalised date: {row.date ?? 'Invalid or missing'}</p>
          <label>
            Description correction{' '}
            {edit.description !== undefined && edit.description !== mapped.description && (
              <span className="qr-changed">Changed locally</span>
            )}
            <input
              aria-label="Description correction"
              disabled={!enabled}
              maxLength={100}
              value={edit.description ?? mapped.description}
              onChange={(e) =>
                dispatch({
                  type: 'edit',
                  id: selected,
                  field: 'description',
                  value: e.target.value,
                })
              }
            />
          </label>
          <p className="qr-amount">
            <span>Source amount column: {s.mapping.amount || 'not mapped'}</span>
            Normalised amount: <strong>{formatDemoAmount(row.cents)}</strong>
            <span>
              {row.cents === null ? 'No valid integer cents' : `${row.cents} integer cents`}
            </span>
          </p>
          {row.duplicateOf && (
            <label>
              Possible duplicate
              <select
                aria-label="Possible duplicate"
                disabled={!enabled}
                value={edit.duplicate ?? 'hold'}
                onChange={(e) =>
                  dispatch({
                    type: 'edit',
                    id: selected,
                    field: 'duplicate',
                    value: e.target.value,
                  })
                }
              >
                <option value="hold">Hold for review</option>
                <option value="exclude">Confirm repeat · exclude from output</option>
                <option value="keep">Keep as a distinct entry</option>
              </select>
            </label>
          )}
          <label>
            Fictional review category
            <select
              aria-label="Fictional review category"
              disabled={!enabled}
              value={row.category!}
              onChange={(e) =>
                dispatch({ type: 'edit', id: selected, field: 'category', value: e.target.value })
              }
            >
              {qualityCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="ew-actions">
            <button
              className="ew-primary"
              disabled={!enabled || row.status !== 'ready'}
              onClick={() => dispatch({ type: 'confirm', id: selected })}
            >
              Confirm record review
            </button>
            <button disabled={!enabled} onClick={() => dispatch({ type: 'revert', id: selected })}>
              Revert record edits
            </button>
          </div>
          <p className="qr-review-note">
            Edits invalidate the review. Mapping changes invalidate every review. No category makes
            a tax decision.
          </p>
        </section>
      </div>
      <div className="qr-ledger">
        <h3>Every row has an outcome.</h3>
        <p>
          {totals.total} retained source records = {totals.ready} ready + {totals.reviewed} reviewed
          + {totals.held} held + {totals.excluded} excluded.
        </p>
        <ol>
          {rows.map((r) => (
            <li key={r.id}>
              <strong>{r.id}</strong>
              <span>{r.status}</span>
              <p>{r.disposition}</p>
            </li>
          ))}
        </ol>
      </div>
      <details className="qr-export">
        <summary>
          Fictional export preview · reviewed records only <span aria-hidden="true">＋</span>
        </summary>
        <p>
          This text reflects the current reviewed rows. Held and excluded records remain in the
          ledger above. No real financial report is generated.
        </p>
        <pre>{qualityExport(s)}</pre>
      </details>
      <p className="ew-note">
        {enabled
          ? 'Date/amount parsing and duplicate checks reuse the case-study functions. These interactive mappings, edits and review controls are new educational behaviour, not a replay of original DAITA code.'
          : 'JavaScript is required to edit mappings and review records. All four source identities and the initial exception ledger remain readable; the example below explains the transformations.'}
      </p>
    </section>
  );
}
