'use client';
import { useState } from 'react';
import { evidenceSources, journeyStages } from '@/content/lab/evidence-journey';
import {
  evidenceChunks,
  selectEvidence,
  evidenceContext,
  chunkCosine,
} from '@/lib/lab/evidence-journey';
import { useEnhanced } from './use-enhanced';
import '@/app/lab/mediquery/journey.css';
export function EvidenceJourney() {
  const enabled = useEnhanced();
  const [stage, setStage] = useState(0),
    [source, setSource] = useState<string>('S01'),
    [chunk, setChunk] = useState('S01-C1'),
    [method, setMethod] = useState<'similarity' | 'mmr'>('similarity'),
    [weight, setWeight] = useState(0.5);
  const chunks = evidenceChunks(),
    selected = selectEvidence(method, weight),
    context = evidenceContext(selected.map((c) => c.id)),
    active = chunks.find((c) => c.id === chunk)!;
  const record = evidenceSources.find((s) => s.id === source)!;
  const inspect = (id: string) => {
    setChunk(id);
    setSource(chunks.find((c) => c.id === id)!.sourceId);
  };
  return (
    <section
      className="experiment-workspace evidence-journey"
      data-stage={stage}
      aria-label="Evidence journey workspace"
    >
      <div className="ew-top">
        <h2>Keep the reference attached.</h2>
        <p role="status">
          {journeyStages[stage]} · {selected.length} selected chunks
        </p>
      </div>
      <nav className="mq-stage-tabs" aria-label="Evidence journey stages">
        {journeyStages.map((label, i) => (
          <button
            key={label}
            disabled={!enabled}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="mq-controls">
        <p>Question: How do these fictional notes describe garden watering?</p>
        <button
          disabled={!enabled}
          onClick={() => {
            setStage(0);
            setSource('S01');
            setChunk('S01-C1');
            setMethod('similarity');
            setWeight(0.5);
          }}
        >
          Reset journey
        </button>
      </div>
      <div className="mq-journey-body">
        <aside className="mq-source-drawer">
          <p className="lab-eyebrow">SOURCE REGISTER / FICTIONAL</p>
          {evidenceSources.map((s) => (
            <button
              disabled={!enabled}
              key={s.id}
              aria-pressed={source === s.id}
              onClick={() => {
                setSource(s.id);
                setChunk(`${s.id}-C1`);
              }}
            >
              <span>{s.id}</span>
              <strong>{s.title}</strong>
            </button>
          ))}
          <p className="mq-provenance">
            Identity stays attached:
            <br />
            <code>
              {active.sourceId} → {active.id}
            </code>
          </p>
        </aside>
        <div className="mq-working-paper">
          <p className="lab-eyebrow">
            {journeyStages[stage].toUpperCase()} / {record.title}
          </p>
          {stage === 0 && (
            <>
              <h3>A record before it becomes context.</h3>
              <p>New fictional research notes, prepared for this demonstration.</p>
              <article className="mq-source-text">
                <h4>
                  {record.title} <span>{record.id}</span>
                </h4>
                {record.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </article>
            </>
          )}
          {stage === 1 && (
            <>
              <h3>Small pieces. Same source.</h3>
              <p>
                This model splits on authored paragraph boundaries, not MediQuery’s original
                512/64-character chunker.
              </p>
              <div className="mq-chunk-list">
                {chunks
                  .filter((c) => c.sourceId === source)
                  .map((c) => (
                    <button
                      key={c.id}
                      disabled={!enabled}
                      aria-pressed={chunk === c.id}
                      aria-controls="journey-inspected-reference"
                      onClick={() => inspect(c.id)}
                    >
                      <code>{c.id}</code>
                      <span>{c.text}</span>
                      <small>
                        {c.text.length} characters · source {c.sourceId}
                      </small>
                    </button>
                  ))}
              </div>
            </>
          )}
          {stage === 2 && (
            <>
              <h3>A direction, not a medical embedding.</h3>
              <p>
                Fixed synthetic coordinates illustrate cosine similarity to query [1, 0]. No
                embedding model runs.
              </p>
              <table className="ew-table">
                <caption>Eight chunks, computed cosine values</caption>
                <thead>
                  <tr>
                    <th>Chunk</th>
                    <th>x / y</th>
                    <th>Cosine</th>
                  </tr>
                </thead>
                <tbody>
                  {chunks.map((c) => (
                    <tr key={c.id}>
                      <th scope="row">{c.id}</th>
                      <td>{c.vector.map((n) => n.toFixed(3)).join(' / ')}</td>
                      <td>{chunkCosine(c.id).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {stage === 3 && (
            <>
              <h3>Choose relevance, or a trade-off.</h3>
              <fieldset className="mq-method">
                <legend>Retrieval method</legend>
                {(['similarity', 'mmr'] as const).map((m) => (
                  <label key={m}>
                    <input
                      type="radio"
                      name="journey-method"
                      checked={method === m}
                      disabled={!enabled}
                      onChange={() => setMethod(m)}
                    />
                    {m === 'similarity' ? 'Similarity only' : 'MMR'}
                  </label>
                ))}
              </fieldset>
              <label>
                Relevance weight λ: {weight.toFixed(1)}
                <input
                  aria-label="Journey relevance weight"
                  type="range"
                  min="0"
                  max="1"
                  step=".1"
                  value={weight}
                  disabled={!enabled || method !== 'mmr'}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </label>
              <p>
                MMR seeds by query similarity, then penalises similarity to already-selected chunks.
                At 0 diversity dominates; at 1 selection matches similarity. This does not guarantee
                better answers.
              </p>
              <ol className="ew-list">
                {selected.map((c, i) => (
                  <li key={c.id}>
                    {i + 1}. <code>{c.id}</code> · cosine {c.similarity.toFixed(3)}
                    {method === 'mmr' && i > 0 ? ` · MMR score ${c.score.toFixed(3)}` : ''}
                  </li>
                ))}
              </ol>
            </>
          )}
          {stage === 4 && (
            <>
              <h3>Assemble only what was selected.</h3>
              <p>
                These same chunk IDs feed both this context and the prepared statements in the next
                stage.
              </p>
              {context.map((c) => (
                <blockquote key={c.id}>
                  <code>
                    [{c.sourceId} / {c.id}]
                  </code>
                  <p>{c.text}</p>
                </blockquote>
              ))}
            </>
          )}
          {stage === 5 && (
            <>
              <h3>An answer fixture, with references.</h3>
              <p className="mq-answer-label">PREPARED STATEMENTS · NOT GENERATED</p>
              <ol className="mq-answer">
                {context.map((c) => (
                  <li key={c.id}>
                    <p>{chunks.find((x) => x.id === c.id)!.claim}</p>
                    <button
                      disabled={!enabled}
                      aria-controls="journey-inspected-reference"
                      onClick={() => inspect(c.id)}
                    >
                      Inspect reference {c.id}
                    </button>
                  </li>
                ))}
              </ol>
              <p className="ew-error">
                This authored mapping highlights provenance. It is not an automatic citation-support
                check. Original MediQuery retrieves its displayed source list separately from
                generation context.
              </p>
            </>
          )}
          <div
            className="mq-excerpt"
            id="journey-inspected-reference"
            role="region"
            aria-label="Inspected reference"
            aria-live="polite"
          >
            <span className="lab-eyebrow">INSPECTED REFERENCE / {active.id}</span>
            <p>
              <mark>{active.text}</mark>
            </p>
            <span>
              Source {active.sourceId} · {active.title}
            </span>
          </div>
        </div>
      </div>
      <div className="mq-context-strip">
        <strong>Selected evidence</strong>
        <span>{selected.map((c) => c.id).join(' → ')}</span>
        <div className="ew-actions">
          <button disabled={!enabled || stage === 0} onClick={() => setStage((n) => n - 1)}>
            Previous stage
          </button>
          <button disabled={!enabled || stage === 5} onClick={() => setStage((n) => n + 1)}>
            Next stage
          </button>
        </div>
      </div>
      <p className="ew-note">
        {enabled
          ? 'Selection reuses the tested cosine/MMR functions from the case study. No source or chunk IDs are replaced between stages.'
          : 'JavaScript is required to change stages. The source register and first fictional source remain readable; an example journey is explained below.'}
      </p>
    </section>
  );
}
