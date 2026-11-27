export type VectorDocument = { id: string; vector: readonly number[] };
export type RetrievalSelection = {
  id: string;
  similarity: number;
  redundancy: number;
  score: number;
};
export function cosineSimilarity(a: readonly number[], b: readonly number[]): number {
  if (!a.length || a.length !== b.length || ![...a, ...b].every(Number.isFinite))
    throw new RangeError('Vectors must have equal non-zero dimensions and finite coordinates.');
  const normA = Math.hypot(...a),
    normB = Math.hypot(...b);
  if (!normA || !normB) throw new RangeError('A zero vector has no cosine direction.');
  return Math.max(-1, Math.min(1, a.reduce((sum, n, i) => sum + n * b[i], 0) / (normA * normB)));
}
function validate(documents: readonly VectorDocument[], query: readonly number[], k: number) {
  if (!Number.isInteger(k) || k < 0) throw new RangeError('k must be a non-negative integer.');
  if (new Set(documents.map((d) => d.id)).size !== documents.length)
    throw new RangeError('Document IDs must be unique.');
  cosineSimilarity(query, query);
  documents.forEach((d) => cosineSimilarity(d.vector, query));
}
export function similaritySelect(
  documents: readonly VectorDocument[],
  query: readonly number[],
  k: number,
): RetrievalSelection[] {
  validate(documents, query, k);
  return documents
    .map((d, index) => ({
      id: d.id,
      similarity: cosineSimilarity(d.vector, query),
      redundancy: 0,
      score: cosineSimilarity(d.vector, query),
      index,
    }))
    .sort((a, b) => b.similarity - a.similarity || a.index - b.index)
    .slice(0, k)
    .map(({ id, similarity, redundancy, score }) => ({ id, similarity, redundancy, score }));
}
export function mmrSelect(
  documents: readonly VectorDocument[],
  query: readonly number[],
  k: number,
  weight: number,
): RetrievalSelection[] {
  validate(documents, query, k);
  if (!Number.isFinite(weight) || weight < 0 || weight > 1)
    throw new RangeError('Weight must be between zero and one.');
  const selected: RetrievalSelection[] = [];
  const remaining = documents.map((d) => ({ ...d }));
  // Seed with the most query-similar document; subsequent choices apply MMR.
  while (remaining.length && selected.length < k) {
    let bestIndex = 0,
      bestScore = -Infinity,
      bestRedundancy = 0;
    remaining.forEach((doc, index) => {
      const relevance = cosineSimilarity(doc.vector, query);
      const redundancy = selected.length
        ? Math.max(
            ...selected.map((s) =>
              cosineSimilarity(doc.vector, documents.find((d) => d.id === s.id)!.vector),
            ),
          )
        : 0;
      const score = selected.length ? weight * relevance - (1 - weight) * redundancy : relevance;
      // Strict > leaves exact ties in original fixture order.
      if (score > bestScore) {
        bestIndex = index;
        bestScore = score;
        bestRedundancy = redundancy;
      }
    });
    const [doc] = remaining.splice(bestIndex, 1);
    selected.push({
      id: doc.id,
      similarity: cosineSimilarity(doc.vector, query),
      redundancy: bestRedundancy,
      score: bestScore,
    });
  }
  return selected;
}
