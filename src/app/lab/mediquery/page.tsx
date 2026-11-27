import { ExperimentFrame } from '@/components/lab/experiment-frame';
import { EvidenceJourney } from '@/components/lab/evidence-journey';
import { experimentMetadata } from '@/lib/lab/metadata';
export const metadata = experimentMetadata('mediquery');
export default function Page() {
  return (
    <ExperimentFrame
      slug="mediquery"
      headline={
        <>
          Follow the evidence.
          <br />
          <span className="serif">All the way to a sentence.</span>
        </>
      }
      lesson="Source identity makes inspection possible. It does not establish that a statement is complete, supported or correct. The authored links here are a teaching aid, not a capability added to MediQuery."
      example="S01 is the north bed notebook. Its two paragraph chunks retain IDs S01-C1 and S01-C2. Similarity selects S01-C1, S01-C2 and S02-C1; those IDs label context excerpts and prepared answer statements. Original MediQuery’s citations are not automatically verified."
    >
      <EvidenceJourney />
    </ExperimentFrame>
  );
}
