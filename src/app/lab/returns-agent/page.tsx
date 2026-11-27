import { ExperimentFrame } from '@/components/lab/experiment-frame';
import { ResolutionWorkflow } from '@/components/lab/resolution-workflow';
import { experimentMetadata } from '@/lib/lab/metadata';
export const metadata = experimentMetadata('returns-agent');
export default function Page() {
  return (
    <ExperimentFrame
      slug="returns-agent"
      headline={
        <>
          First, ask.
          <br />
          <span className="serif">Then let rules decide.</span>
        </>
      }
      lesson="A request can be conversational while its policy outcome remains deterministic. Validation protects an interface; it cannot guarantee the interpretation, policy or wording is right."
      example="A missing reference takes the clarification branch. Supplying the fictional DEMO-42 record resumes lookup, then the 21-day demonstration policy, a prepared reply and final shape checks. An opened DEMO-77 fixture routes to a person. These are not consumer-rights decisions."
    >
      <ResolutionWorkflow />
    </ExperimentFrame>
  );
}
