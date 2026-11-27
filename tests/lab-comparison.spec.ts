import { test, expect } from '@playwright/test';
import { createWorkload, workloadReducer as reduce } from '../src/lib/lab/workload-engine';
import { completedRun, comparisonNote, workerActivity } from '../src/lib/lab/workload-comparison';
function run(workers: number, jobs = 6) {
  let s = reduce(createWorkload({ jobs, workers, scenario: 'steady' }), { type: 'start' });
  while (s.status === 'running') s = reduce(s, { type: 'tick' });
  return s;
}
test('completed snapshots, comparison scope and activity use model records', () => {
  const a = run(1),
    b = run(3);
  expect(() => completedRun(createWorkload(a.config))).toThrow();
  expect(completedRun(a).completion).toBe(49);
  expect(comparisonNote(completedRun(a), completedRun(b))).toContain('Only worker count');
  expect(comparisonNote(completedRun(a), completedRun(run(3, 12)))).toContain('do not isolate');
  expect(comparisonNote(completedRun(a), completedRun(a))).toContain('Same configuration');
  expect(workerActivity(a)).toHaveLength(6);
  expect(workerActivity(a)[0]).toMatchObject({ job: 'J01', start: 1, end: 7 });
});
test('retain, change workers, compare and clear without changing scheduling', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-28T00:00:01Z'));
  await page.goto('/lab/automark/');
  await page.getByLabel('Submitted jobs', { exact: true }).selectOption('6');
  await page.getByLabel('Independent workers', { exact: true }).selectOption('1');
  await page.getByLabel('Playback speed').selectOption('4');
  await page.getByRole('button', { name: 'Start workload' }).click();
  await page.clock.runFor(13000);
  await page.getByRole('button', { name: 'Retain completed run', exact: true }).click();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByLabel('Independent workers', { exact: true }).selectOption('3');
  await page.getByRole('button', { name: 'Start workload' }).click();
  await page.clock.runFor(6000);
  await expect(page.locator('.comparison-note')).toContainText('Only worker count');
  await expect(page.locator('.sim-comparison table')).toContainText('49s');
  await expect(page.locator('.sim-comparison table')).toContainText('21s');
  await page.getByText('Worker activity from actual model events').click();
  await expect(page.locator('.comparison-activity')).toContainText('J01');
  await page.getByRole('button', { name: 'Clear retained run' }).click();
  await expect(page.locator('.sim-comparison')).toContainText('No completed run retained');
});
