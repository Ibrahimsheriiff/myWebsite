import type { Job, Scenario, WorkloadConfig } from '@/lib/lab/workload-types';
export const defaultWorkload: WorkloadConfig = { jobs: 12, workers: 3, scenario: 'steady' };
export const scenarios: { id: Scenario; label: string; description: string }[] = [
  {
    id: 'steady',
    label: 'Steady grading',
    description: 'Synthetic executions take 6, 8 or 10 virtual seconds.',
  },
  {
    id: 'mixed',
    label: 'Mixed durations',
    description:
      'Synthetic executions take 3–16 virtual seconds. A short job can finish ahead of an earlier long job.',
  },
  {
    id: 'timeout',
    label: 'One execution timeout',
    description:
      'One synthetic job needs 14 seconds but is stopped at its 8-second limit. Its worker then takes the next job.',
  },
];
export function createJobs(config: WorkloadConfig): Job[] {
  return Array.from({ length: config.jobs }, (_, i) => ({
    id: `J${String(i + 1).padStart(2, '0')}`,
    arrival: Math.floor(i / 3),
    duration:
      config.scenario === 'mixed'
        ? [3, 12, 5, 9, 4, 16][i % 6]
        : config.scenario === 'timeout' && i === Math.min(4, config.jobs - 1)
          ? 14
          : 6 + (i % 3) * 2,
    limit: config.scenario === 'timeout' && i === Math.min(4, config.jobs - 1) ? 8 : 20,
    status: 'pending',
  }));
}
