'use client';
import { useState, useSyncExternalStore } from 'react';
import {
  rawRecords,
  reviewCategories,
  workbenchStages,
  type ReviewCategory,
} from '@/content/daita-fixtures';
import {
  formatDemoAmount,
  mapRecord,
  prepareRecords,
  type ProcessedRecord,
} from '@/lib/daita-workbench';
const subscribe = () => () => {};
function RecordStatus({ record, stage }: { record: ProcessedRecord; stage: number }) {
  if (stage < 2) return <span>{stage === 0 ? 'Original' : 'Normalised'}</span>;
  if (record.issues.length) return <strong className="dw-held">! Incomplete</strong>;
  if (record.duplicateOf) return <strong className="dw-held">↳ Possible repeat</strong>;
  if (stage < 3) return <span>✓ Checks passed</span>;
  if (record.reviewed && stage === 4) return <strong>✓ Reviewed by you</strong>;
  return <span>○ Ready for review</span>;
}
function WorkbenchRecords({
  stage,
  category,
  reviewed,
}: {
  stage: number;
  category: ReviewCategory;
  reviewed: boolean;
}) {
  const records = prepareRecords(category, reviewed);
  function fields(record: ProcessedRecord, index: number) {
    const raw = mapRecord(rawRecords[index]);
    return {
      date: stage === 0 ? raw.date : (record.date ?? 'Missing'),
      description: stage === 0 ? raw.description : record.description,
      amount: stage === 0 ? raw.amount : formatDemoAmount(record.cents),
    };
  }
  return (
    <>
      <table className="dw-table">
        <caption>
          {stage === 0 ? 'Original fictional source rows' : 'Processed fictional records'} — all
          five records retained
        </caption>
        <thead>
          <tr>
            <th scope="col">Record / source</th>
            <th scope="col">{stage === 0 ? 'Date / Posted' : 'Date'}</th>
            <th scope="col">{stage === 0 ? 'Details / Memo / Narrative' : 'Description'}</th>
            <th scope="col">{stage === 0 ? 'Value / Debit / Total' : 'Amount · AUD'}</th>
            <th scope="col">{stage < 3 ? 'State' : 'Review category / state'}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, i) => {
            const f = fields(record, i);
            return (
              <tr
                key={record.id}
                data-record={record.id}
                data-held={stage >= 2 && (record.issues.length > 0 || !!record.duplicateOf)}
              >
                <th scope="row">
                  <span className="mono">{record.id}</span>
                  <small>{record.source}</small>
                  <small>{record.reference}</small>
                </th>
                <td data-changed={stage > 0 && f.date !== mapRecord(rawRecords[i]).date}>
                  {f.date}
                </td>
                <td
                  className={stage === 0 ? 'dw-raw-value' : undefined}
                  data-changed={stage > 0 && f.description !== mapRecord(rawRecords[i]).description}
                >
                  {f.description || <em>Missing description</em>}
                </td>
                <td data-changed={stage > 0 && f.amount !== mapRecord(rawRecords[i]).amount}>
                  {f.amount}
                </td>
                <td>
                  {stage >= 3 && record.category && (
                    <span className="dw-category">{record.category}</span>
                  )}
                  <RecordStatus record={record} stage={stage} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ol className="dw-mobile-records" aria-label="Five fictional records">
        {records.map((record, i) => {
          const f = fields(record, i);
          return (
            <li key={record.id} data-record={record.id}>
              <div className="dw-mobile-record-top">
                <strong>{record.id}</strong>
                <span className="mono">
                  {record.source} / {record.reference}
                </span>
              </div>
              <dl>
                <div>
                  <dt>{stage === 0 ? rawRecords[i].columns.date : 'Date'}</dt>
                  <dd>
                    {f.date}
                    {stage > 0 && f.date !== mapRecord(rawRecords[i]).date && (
                      <small className="dw-normalised">From {mapRecord(rawRecords[i]).date}</small>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{stage === 0 ? rawRecords[i].columns.description : 'Description'}</dt>
                  <dd className={stage === 0 ? 'dw-raw-value' : undefined}>
                    {f.description || 'Missing description'}
                    {stage > 0 && f.description !== mapRecord(rawRecords[i]).description && (
                      <small className="dw-normalised">Whitespace trimmed</small>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{stage === 0 ? rawRecords[i].columns.amount : 'Amount · AUD'}</dt>
                  <dd>
                    {f.amount}
                    {stage > 0 && f.amount !== mapRecord(rawRecords[i]).amount && (
                      <small className="dw-normalised">
                        From {mapRecord(rawRecords[i]).amount}
                      </small>
                    )}
                  </dd>
                </div>
                {stage >= 3 && record.category && (
                  <div>
                    <dt>Category</dt>
                    <dd>{record.category}</dd>
                  </div>
                )}
              </dl>
              <p>
                <RecordStatus record={record} stage={stage} />
              </p>
            </li>
          );
        })}
      </ol>
    </>
  );
}
export function DaitaWorkbench() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [stage, setStage] = useState(0);
  const [inspect, setInspect] = useState<'R03' | 'R04'>('R03');
  const [category, setCategory] = useState<ReviewCategory>('General supplies');
  const [reviewed, setReviewed] = useState(false);
  if (!enhanced)
    return (
      <div className="dw-fallback">
        <h3>Five rows, followed through the process.</h3>
        <p>
          This illustrative portfolio simulation uses fictional records. It does not run original
          DAITA code or make tax decisions.
        </p>
        {workbenchStages.map((item, i) => (
          <details key={item.name} open={i === 0}>
            <summary>
              {i + 1}. {item.name}
              <span aria-hidden="true">＋</span>
            </summary>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p>{item.change}</p>
          </details>
        ))}
        <WorkbenchRecords stage={3} category="General supplies" reviewed={false} />
        <p>
          In the interactive illustration, R05 can be changed from General supplies to Equipment
          review. The repeated and incomplete records remain held.
        </p>
      </div>
    );
  const current = workbenchStages[stage];
  return (
    <div className="dw-workbench">
      <div className="dw-topline">
        <p className="mono">ILLUSTRATIVE PORTFOLIO SIMULATION</p>
        <button
          className="dw-reset"
          type="button"
          onClick={() => {
            setStage(0);
            setInspect('R03');
            setCategory('General supplies');
            setReviewed(false);
          }}
        >
          Reset illustration ↺
        </button>
      </div>
      <p className="dw-disclaimer">
        Fictional data. Original DAITA code is not executed. No uploads, tax rules or eligibility
        decisions.
      </p>
      <nav className="dw-stage-nav" aria-label="Document processing stages">
        <ol>
          {workbenchStages.map((item, i) => (
            <li key={item.name}>
              <button
                type="button"
                aria-current={stage === i ? 'step' : undefined}
                onClick={() => setStage(i)}
              >
                <span className="mono">0{i + 1}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className="dw-stage-intro">
        <span className="dw-stage-number serif" aria-hidden="true">
          0{stage + 1}
        </span>
        <div>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
        </div>
      </div>
      <p className="dw-change-note">
        <span className="mono">{stage === 0 ? 'SOURCE NOTE' : 'WHAT CHANGED'}</span>
        {current.change}
      </p>
      <WorkbenchRecords stage={stage} category={category} reviewed={reviewed} />
      <p className="dw-data-note">
        Dates use ISO or day + English month. Amounts are AUD. ¹ PDF rows are fictional extracted
        text; no PDF or OCR is processed.
      </p>
      {stage >= 2 && (
        <div className="dw-attention">
          <div>
            <h4>Two rows need attention.</h4>
            <div className="dw-inspect-controls">
              <button
                type="button"
                aria-pressed={inspect === 'R03'}
                onClick={() => setInspect('R03')}
              >
                Inspect R03 · repeat
              </button>
              <button
                type="button"
                aria-pressed={inspect === 'R04'}
                onClick={() => setInspect('R04')}
              >
                Inspect R04 · incomplete
              </button>
            </div>
          </div>
          <div role="region" aria-label="Record check explanation">
            <strong>{inspect === 'R03' ? 'R03 → matches R01' : 'R04 → description missing'}</strong>
            <p>
              {inspect === 'R03'
                ? 'The normalised date, description (ignoring case), amount and reference match R01. This fixture rule flags a possible repeat for review; it does not delete the row.'
                : 'A date and amount do not explain a transaction. The required description is blank, so this row is held rather than assigned a category.'}
            </p>
          </div>
        </div>
      )}
      {stage === 4 && (
        <div className="dw-human-editor">
          <div>
            <p className="mono">YOUR TURN / R05</p>
            <h4>Studio desk replacement</h4>
            <p>
              Suggested: General supplies.
              <br />
              Choose a review category, then confirm it.
            </p>
          </div>
          <div>
            <label htmlFor="demo-category">Review category for R05</label>
            <select
              id="demo-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as ReviewCategory);
                setReviewed(false);
              }}
            >
              {reviewCategories.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button
              className="button button-dark"
              type="button"
              disabled={reviewed}
              onClick={() => setReviewed(true)}
            >
              {reviewed ? 'Category confirmed' : 'Confirm R05 review'}
            </button>
            <p className="dw-review-result" role="status">
              {reviewed
                ? `R05: ${category}. Reviewed in this illustration. R03 and R04 remain held.`
                : 'R05 is awaiting your review.'}
            </p>
          </div>
        </div>
      )}
      <div className="dw-pagination">
        <button type="button" disabled={stage === 0} onClick={() => setStage(stage - 1)}>
          ← Previous
        </button>
        <p role="status" aria-live="polite">
          Step {stage + 1} of 5 · {current.name}
        </p>
        <button type="button" disabled={stage === 4} onClick={() => setStage(stage + 1)}>
          Next step →
        </button>
      </div>
    </div>
  );
}
