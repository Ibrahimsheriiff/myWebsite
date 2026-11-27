import { evidenceSources, journeyQuery } from '@/content/lab/evidence-journey';
import { cosineSimilarity, mmrSelect, similaritySelect } from '@/lib/retrieval';
export function evidenceChunks() {
  return evidenceSources.flatMap((source) =>
    source.paragraphs.map((text, i) => ({
      id: `${source.id}-C${i + 1}`,
      sourceId: source.id,
      title: source.title,
      text,
      vector: [source.vector[0], source.vector[1] + i * 0.015],
      claim: text,
    })),
  );
}
export function selectEvidence(method: 'similarity' | 'mmr', weight: number) {
  if (!['similarity', 'mmr'].includes(method)) throw new RangeError('Unknown selection method');
  const chunks = evidenceChunks();
  return method === 'mmr'
    ? mmrSelect(chunks, journeyQuery, 3, weight)
    : similaritySelect(chunks, journeyQuery, 3);
}
export function evidenceContext(ids: readonly string[]) {
  const chunks = evidenceChunks();
  return ids.map((id) => {
    const chunk = chunks.find((c) => c.id === id);
    if (!chunk) throw new RangeError('Unknown chunk');
    return { id: chunk.id, sourceId: chunk.sourceId, text: chunk.text };
  });
}
export function chunkCosine(id: string) {
  const chunk = evidenceChunks().find((c) => c.id === id);
  if (!chunk) throw new RangeError('Unknown chunk');
  return cosineSimilarity(chunk.vector, journeyQuery);
}
