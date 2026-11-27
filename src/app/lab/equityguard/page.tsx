import { ExperimentFrame } from '@/components/lab/experiment-frame';
import { EquityReplay } from '@/components/lab/equity-replay';
import { experimentMetadata } from '@/lib/lab/metadata';
export const metadata = experimentMetadata('equityguard');
export default function Page() {
  return (
    <ExperimentFrame
      slug="equityguard"
      headline={
        <>
          A tool call.
          <br />
          <span className="serif">Something you can inspect.</span>
        </>
      }
      lesson="A schema checks structure; a returned dictionary can still contain an error. This replay makes those boundaries visible without inventing model reasoning."
      example="The prepared success path accepts a string ticker, dispatches get_price_data, observes synthetic data and returns public response fields. A missing ticker stops before the tool. A provider error uses an explicitly educational stop."
    >
      <EquityReplay />
    </ExperimentFrame>
  );
}
