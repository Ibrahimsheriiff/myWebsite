'use client';
import { useState, useSyncExternalStore } from 'react';
import {
  retrievalDocuments as documents,
  retrievalQuery as query,
} from '@/content/retrieval-fixtures';
import { cosineSimilarity, mmrSelect, similaritySelect } from '@/lib/retrieval';
const subscribe = () => () => {};
export function RetrievalExplorer() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [method, setMethod] = useState<'similarity' | 'mmr'>('similarity');
  const [weight, setWeight] = useState(0.5);
  const selected =
    method === 'mmr'
      ? mmrSelect(documents, query, 3, weight)
      : similaritySelect(documents, query, 3);
  return (
    <div className="retrieval-explorer">
      <div className="re-intro">
        <p className="mono">SYNTHETIC RETRIEVAL DEMONSTRATION / k = 3</p>
        <p>
          Five fictional documents, two-dimensional vectors. No biomedical findings or original
          MediQuery pipeline are executed.
        </p>
      </div>
      {enhanced ? (
        <div className="re-controls">
          <fieldset>
            <legend>Selection method</legend>
            <label>
              <input
                type="radio"
                name="retrieval-method"
                checked={method === 'similarity'}
                onChange={() => setMethod('similarity')}
              />{' '}
              Similarity only
            </label>
            <label>
              <input
                type="radio"
                name="retrieval-method"
                checked={method === 'mmr'}
                onChange={() => setMethod('mmr')}
              />{' '}
              MMR
            </label>
          </fieldset>
          <div>
            <label htmlFor="re-weight">
              Relevance weight λ <output htmlFor="re-weight">{weight.toFixed(1)}</output>
            </label>
            <input
              id="re-weight"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={weight}
              disabled={method !== 'mmr'}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            <p>0: favour different directions · 1: favour query similarity</p>
          </div>
        </div>
      ) : (
        <p className="re-fallback">
          Without JavaScript: similarity selects A, B, C. The same MMR calculation at λ = 0.5
          selects{' '}
          {mmrSelect(documents, query, 3, 0.5)
            .map((d) => d.id)
            .join(', ')}
          .
        </p>
      )}
      <div className="re-body">
        <figure>
          <svg viewBox="0 0 420 320" aria-hidden="true">
            <circle cx="190" cy="160" r="122" fill="none" stroke="#aebba3" strokeDasharray="3 6" />
            <path d="M35 160h330M190 20v280" stroke="#c4ccb9" />
            <path d="M190 160h122m-8-5 8 5-8 5" stroke="#263d30" fill="none" strokeWidth="1.5" />
            <text x="330" y="205" className="re-query-label">
              query
            </text>
            {documents.map((d) => {
              const norm = Math.hypot(...d.vector),
                x = 190 + (d.vector[0] / norm) * 122,
                y = 160 - (d.vector[1] / norm) * 122;
              const rank = selected.findIndex((s) => s.id === d.id);
              const labelX = x + 13;
              const labelY = y + (d.id === 'A' ? 23 : -12);
              return (
                <g key={d.id} data-selected={rank >= 0}>
                  <path d={`M190 160L${x} ${y}`} stroke={rank >= 0 ? '#758a63' : '#ccd1c0'} />
                  <circle
                    cx={x}
                    cy={y}
                    r={rank >= 0 ? 3.2 : 2.7}
                    fill={rank >= 0 ? '#263d30' : '#f4f1e8'}
                    stroke="#758a63"
                  />
                  <path
                    d={`M${x + 3} ${y}L${labelX - 3} ${labelY - 3}`}
                    stroke="#758a63"
                    fill="none"
                  />
                  <text
                    data-point-label={d.id}
                    x={labelX}
                    y={labelY}
                    fill="#263d30"
                    fontWeight={rank >= 0 ? '600' : '400'}
                    fontSize="18"
                  >
                    {d.id}
                  </text>
                </g>
              );
            })}
          </svg>
          <figcaption>
            Directions on a unit circle, simplified for this demonstration. This is not actual
            BioBERT embedding space.
          </figcaption>
        </figure>
        <div>
          <table>
            <caption>Fictional documents and computed cosine similarity</caption>
            <thead>
              <tr>
                <th scope="col">Document</th>
                <th scope="col">Cosine</th>
                <th scope="col">Selected</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} data-selected={selected.some((s) => s.id === d.id)}>
                  <th scope="row">
                    <span>{d.id}</span> {d.title}
                  </th>
                  <td>{cosineSimilarity(d.vector, query).toFixed(3)}</td>
                  <td>
                    {selected.findIndex((s) => s.id === d.id) >= 0
                      ? `#${selected.findIndex((s) => s.id === d.id) + 1}`
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="re-selection" role="status">
        <span className="mono">SELECTED IN ORDER</span>
        <strong>{selected.map((d) => d.id).join(' → ')}</strong>
        <p>
          {method === 'similarity'
            ? 'A and B both point close to the query. Similarity alone does not penalise how close they are to each other.'
            : weight === 1
              ? 'At λ = 1 the redundancy penalty disappears, so the ranking matches similarity-only selection.'
              : weight === 0
                ? 'After the most relevant seed, λ = 0 favours the least redundant direction. That can include a document with little query similarity.'
                : 'After the first query-similar document, each MMR choice balances query similarity against its greatest similarity to any already-selected document.'}
        </p>
      </div>
      <details className="re-math">
        <summary>
          The calculation, in plain sight <span aria-hidden="true">＋</span>
        </summary>
        <p>
          <code>
            λ × similarity(query, candidate) − (1 − λ) × max similarity(candidate, selected)
          </code>
        </p>
        <p>
          The first choice is the most query-similar document. Exact ties retain fixture order.
          Scores are not probabilities or evidence quality.
        </p>
        <ol>
          {selected.map((d, i) => (
            <li key={d.id}>
              {d.id}:{' '}
              {i === 0
                ? 'query-similar seed'
                : method === 'mmr'
                  ? `${weight.toFixed(1)} × ${d.similarity.toFixed(3)} − ${(1 - weight).toFixed(1)} × ${d.redundancy.toFixed(3)} = ${d.score.toFixed(3)}`
                  : `cosine ${d.similarity.toFixed(3)}`}
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
