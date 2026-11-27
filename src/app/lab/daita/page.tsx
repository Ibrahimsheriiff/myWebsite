import { ExperimentFrame } from '@/components/lab/experiment-frame';
import { QualityReview } from '@/components/lab/quality-review';
import { experimentMetadata } from '@/lib/lab/metadata';
export const metadata = experimentMetadata('daita');
export default function Page() {
  return (
    <ExperimentFrame
      slug="daita"
      headline={
        <>
          Messy on arrival.
          <br />
          <span className="serif">Reviewable by design.</span>
        </>
      }
      lesson="Normalisation makes records comparable. It should not make exceptions disappear. A correction, a duplicate decision and a review each leave the source identity intact."
      example="Mapping Value enables integer-cent amounts. Q03 then matches Q01, Q02 still needs a description and Q04 has an invalid date. Correcting a field does not silently approve a record: a person must confirm review before it enters the fictional export."
    >
      <QualityReview />
    </ExperimentFrame>
  );
}
