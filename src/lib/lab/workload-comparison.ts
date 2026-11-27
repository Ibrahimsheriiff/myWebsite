import type { WorkloadState } from './workload-types';
import { workloadMetrics } from './workload-metrics';
export function completedRun(state: WorkloadState) {
  if (state.status !== 'completed') throw new RangeError('Only completed runs can be retained.');
  const m = workloadMetrics(state);
  return {
    config: { ...state.config },
    acceptance: m.acceptanceTime!,
    completion: state.time,
    peakQueue: state.peakQueue,
    completed: m.completed,
    failed: m.failed,
    utilisation: m.utilisation,
  };
}
export type CompletedRun = ReturnType<typeof completedRun>;
export function comparisonNote(a: CompletedRun, b: CompletedRun): string {
  const changed = (['jobs', 'workers', 'scenario'] as const).filter(
    (key) => a.config[key] !== b.config[key],
  );
  if (!changed.length)
    return 'Same configuration. This deterministic model produces the same schedule.';
  if (changed.length === 1 && changed[0] === 'workers')
    return 'Only worker count changed. Workload and scenario match; individual execution durations are unchanged.';
  return `Changed: ${changed.join(', ')}. These runs do not isolate the effect of worker count.`;
}
export function workerActivity(state: WorkloadState) {
  return state.events
    .filter((e) => e.kind === 'started')
    .map((e) => {
      const end = state.events.find(
        (x) => x.job === e.job && ['completed', 'timeout'].includes(x.kind),
      );
      return {
        job: e.job!,
        worker: e.worker!,
        start: e.time,
        end: end?.time ?? state.time,
        failed: end?.kind === 'timeout',
      };
    });
}
