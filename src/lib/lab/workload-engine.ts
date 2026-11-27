import { createJobs } from '@/content/lab/workload-fixtures';
import type {
  WorkloadAction,
  WorkloadConfig,
  WorkloadEvent,
  WorkloadState,
} from './workload-types';

export function validateConfig(config: WorkloadConfig): void {
  if (
    !Number.isInteger(config.jobs) ||
    config.jobs < 0 ||
    config.jobs > 36 ||
    !Number.isInteger(config.workers) ||
    config.workers < 1 ||
    config.workers > 6 ||
    !['steady', 'mixed', 'timeout'].includes(config.scenario)
  )
    throw new RangeError('Use 0–36 jobs, 1–6 workers and a supported scenario.');
}
export function createWorkload(config: WorkloadConfig): WorkloadState {
  validateConfig(config);
  return {
    config: { ...config },
    status: 'ready',
    time: 0,
    jobs: createJobs(config),
    events: [],
    peakQueue: 0,
  };
}
// One virtual-second boundary: finish executions, finish intake, receive arrivals, dispatch FIFO.
// Clone before mutation: the reducer never changes the supplied state or fixture records.
function boundary(source: WorkloadState, time: number): WorkloadState {
  const state: WorkloadState = {
    ...source,
    time,
    jobs: source.jobs.map((j) => ({ ...j })),
    events: [...source.events],
  };
  const emit = (event: Omit<WorkloadEvent, 'id' | 'time'>) =>
    state.events.push({ ...event, time, id: state.events.length });
  for (const job of state.jobs) {
    if (job.status === 'running' && time >= job.startedAt! + Math.min(job.duration, job.limit)) {
      job.status = job.duration > job.limit ? 'failed' : 'completed';
      job.finishedAt = time;
      emit({
        kind: job.status === 'failed' ? 'timeout' : 'completed',
        job: job.id,
        worker: job.worker,
      });
    }
  }
  for (const job of state.jobs) {
    if (job.status === 'received' && time >= job.receivedAt! + 1) {
      job.status = 'queued';
      job.queuedAt = time;
      emit({ kind: 'queued', job: job.id });
    }
  }
  for (const job of state.jobs) {
    if (job.status === 'pending' && job.arrival <= time) {
      job.status = 'received';
      job.receivedAt = time;
      emit({ kind: 'received', job: job.id });
    }
  }
  const queue = state.jobs
    .filter((j) => j.status === 'queued')
    .sort((a, b) => a.queuedAt! - b.queuedAt! || a.arrival - b.arrival || a.id.localeCompare(b.id));
  for (let worker = 1; worker <= state.config.workers; worker++) {
    if (state.jobs.some((j) => j.status === 'running' && j.worker === worker)) continue;
    const job = queue.shift();
    if (!job) break;
    job.status = 'running';
    job.worker = worker;
    job.startedAt = time;
    emit({ kind: 'assigned', job: job.id, worker });
    emit({ kind: 'started', job: job.id, worker });
  }
  state.peakQueue = Math.max(state.peakQueue, queue.length);
  if (state.jobs.every((j) => j.status === 'completed' || j.status === 'failed')) {
    state.status = 'completed';
    emit({ kind: 'finished' });
  }
  return state;
}
export function workloadReducer(state: WorkloadState, action: WorkloadAction): WorkloadState {
  switch (action.type) {
    case 'reset':
      return createWorkload(action.config ?? state.config);
    case 'start':
    case 'step': {
      if (action.type === 'start' && state.status !== 'ready') return state;
      if (action.type === 'step' && !['ready', 'paused'].includes(state.status)) return state;
      const starting = state.status === 'ready';
      return boundary(
        {
          ...state,
          status: action.type === 'start' ? 'running' : 'paused',
          events: starting ? [{ id: 0, time: 0, kind: 'submitted' }] : state.events,
        },
        starting ? 0 : state.time + 1,
      );
    }
    case 'tick':
      return state.status === 'running' ? boundary(state, state.time + 1) : state;
    case 'pause':
      return state.status === 'running' ? { ...state, status: 'paused' } : state;
    case 'resume':
      return state.status === 'paused' ? { ...state, status: 'running' } : state;
  }
}
