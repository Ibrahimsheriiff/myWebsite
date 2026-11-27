export type Scenario = 'steady' | 'mixed' | 'timeout';
export type WorkloadConfig = { jobs: number; workers: number; scenario: Scenario };
export type RunStatus = 'ready' | 'running' | 'paused' | 'completed';
export type JobStatus = 'pending' | 'received' | 'queued' | 'running' | 'completed' | 'failed';
export type Job = {
  id: string;
  arrival: number;
  duration: number;
  limit: number;
  status: JobStatus;
  receivedAt?: number;
  queuedAt?: number;
  startedAt?: number;
  finishedAt?: number;
  worker?: number;
};
export type EventKind =
  | 'submitted'
  | 'received'
  | 'queued'
  | 'assigned'
  | 'started'
  | 'completed'
  | 'timeout'
  | 'finished';
export type WorkloadEvent = {
  id: number;
  time: number;
  kind: EventKind;
  job?: string;
  worker?: number;
};
export type WorkloadState = {
  config: WorkloadConfig;
  status: RunStatus;
  time: number;
  jobs: Job[];
  events: WorkloadEvent[];
  peakQueue: number;
};
export type WorkloadAction =
  | { type: 'start' | 'pause' | 'resume' | 'tick' | 'step' }
  | { type: 'reset'; config?: WorkloadConfig };
