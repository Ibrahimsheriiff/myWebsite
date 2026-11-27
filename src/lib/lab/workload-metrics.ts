import type { JobStatus, WorkloadEvent, WorkloadState } from './workload-types';
export function workloadMetrics(state: WorkloadState) {
  const counts: Record<JobStatus, number> = {
    pending: 0,
    received: 0,
    queued: 0,
    running: 0,
    completed: 0,
    failed: 0,
  };
  state.jobs.forEach((j) => counts[j.status]++);
  const busySeconds = state.jobs.reduce(
    (total, j) =>
      total +
      (j.startedAt === undefined ? 0 : Math.max(0, (j.finishedAt ?? state.time) - j.startedAt)),
    0,
  );
  return {
    ...counts,
    accepted: state.jobs.length - counts.pending,
    busySeconds,
    utilisation: state.time ? busySeconds / (state.config.workers * state.time) : 0,
    acceptanceTime:
      counts.pending || state.status === 'ready'
        ? null
        : Math.max(0, ...state.jobs.map((j) => j.receivedAt ?? 0)),
    completionTime: state.status === 'completed' ? state.time : null,
  };
}
export function eventDescription(event: WorkloadEvent, total: number): string {
  switch (event.kind) {
    case 'submitted':
      return `Workload submitted: ${total} synthetic jobs`;
    case 'received':
      return `${event.job} received by intake`;
    case 'queued':
      return `${event.job} queued for grading`;
    case 'assigned':
      return `${event.job} assigned to worker ${event.worker}`;
    case 'started':
      return `${event.job} execution started on worker ${event.worker}`;
    case 'completed':
      return `${event.job} completed on worker ${event.worker}`;
    case 'timeout':
      return `${event.job} timed out on worker ${event.worker}`;
    case 'finished':
      return 'Workload finished; no queued or running jobs';
  }
}
