import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createWorkload, workloadReducer as reduce } from '../src/lib/lab/workload-engine';
import { workloadMetrics } from '../src/lib/lab/workload-metrics';
import type { Scenario, WorkloadConfig, WorkloadState } from '../src/lib/lab/workload-types';
const base: WorkloadConfig = { jobs: 6, workers: 3, scenario: 'steady' };
function finish(config: WorkloadConfig) {
  let state = reduce(createWorkload(config), { type: 'start' });
  for (let limit = 0; state.status === 'running' && limit < 1000; limit++)
    state = reduce(state, { type: 'tick' });
  expect(state.status).toBe('completed');
  return state;
}

test('workload initial state, zero workload, configuration limits and guarded transitions', () => {
  const initial = createWorkload(base),
    snapshot = structuredClone(initial);
  expect(initial.status).toBe('ready');
  expect(initial.jobs.every((j) => j.status === 'pending')).toBeTruthy();
  expect(initial.events).toEqual([]);
  expect(workloadMetrics(initial).utilisation).toBe(0);
  expect(reduce(initial, { type: 'tick' })).toBe(initial);
  expect(reduce(initial, { type: 'pause' })).toBe(initial);
  const first = reduce(initial, { type: 'start' });
  expect(first.status).toBe('running');
  expect(first.time).toBe(0);
  expect(workloadMetrics(first)).toMatchObject({ received: 3, accepted: 3, queued: 0, running: 0 });
  expect(reduce(first, { type: 'start' })).toBe(first);
  expect(reduce(first, { type: 'step' })).toBe(first);
  const paused = reduce(first, { type: 'pause' });
  expect(reduce(paused, { type: 'tick' })).toBe(paused);
  expect(reduce(paused, { type: 'step' }).time).toBe(1);
  expect(reduce(paused, { type: 'resume' }).status).toBe('running');
  expect(reduce(first, { type: 'reset' })).toEqual(initial);
  expect(initial).toEqual(snapshot);
  const empty = finish({ ...base, jobs: 0 });
  expect(empty.time).toBe(0);
  expect(empty.events.map((e) => e.kind)).toEqual(['submitted', 'finished']);
  expect(workloadMetrics(empty).utilisation).toBe(0);
  expect(reduce(empty, { type: 'resume' })).toBe(empty);
  for (const change of [
    { jobs: -1 },
    { jobs: 37 },
    { jobs: 1.5 },
    { jobs: NaN },
    { workers: 0 },
    { workers: 7 },
    { workers: 1.5 },
    { scenario: 'unknown' as Scenario },
  ])
    expect(() => createWorkload({ ...base, ...change })).toThrow(RangeError);
  expect(createWorkload({ ...base, jobs: 36, workers: 6 }).jobs).toHaveLength(36);
});

test('FIFO allocation, concurrency, conservation, terminal completion and deterministic replay across boundaries', () => {
  for (const scenario of ['steady', 'mixed', 'timeout'] as const)
    for (const jobs of [0, 1, 6, 12, 36])
      for (const workers of [1, 3, 6]) {
        const config = { scenario, jobs, workers };
        let state = reduce(createWorkload(config), { type: 'start' });
        for (let i = 0; state.status === 'running' && i < 1000; i++) {
          const prior = structuredClone(state);
          const next = reduce(state, { type: 'tick' });
          expect(state).toEqual(prior);
          const m = workloadMetrics(next);
          expect(m.pending + m.received + m.queued + m.running + m.completed + m.failed).toBe(jobs);
          expect(m.running).toBeLessThanOrEqual(workers);
          expect(
            new Set(next.jobs.filter((j) => j.status === 'running').map((j) => j.worker)).size,
          ).toBe(m.running);
          expect(m.utilisation).toBeGreaterThanOrEqual(0);
          expect(m.utilisation).toBeLessThanOrEqual(1);
          state = next;
        }
        expect(state.status).toBe('completed');
        expect(state).toEqual(finish(config));
        expect(state.jobs.every((j) => ['completed', 'failed'].includes(j.status))).toBeTruthy();
        const assignments = state.events.filter((e) => e.kind === 'assigned');
        expect(assignments.map((e) => e.job)).toEqual(state.jobs.map((j) => j.id));
        expect(new Set(assignments.map((e) => e.job)).size).toBe(jobs);
        expect(state.events.filter((e) => e.kind === 'finished')).toHaveLength(1);
        expect(state.events.map((e) => e.id)).toEqual(state.events.map((_, i) => i));
        for (const job of state.jobs) {
          expect(job.receivedAt).toBe(job.arrival);
          expect(job.queuedAt).toBe(job.receivedAt! + 1);
          expect(job.startedAt!).toBeGreaterThanOrEqual(job.queuedAt!);
          expect(job.finishedAt! - job.startedAt!).toBe(Math.min(job.duration, job.limit));
          for (const kind of ['received', 'queued', 'assigned', 'started'])
            expect(state.events.filter((e) => e.job === job.id && e.kind === kind)).toHaveLength(1);
          expect(
            state.events.filter(
              (e) => e.job === job.id && ['completed', 'timeout'].includes(e.kind),
            ),
          ).toHaveLength(1);
        }
        expect(reduce(state, { type: 'reset' })).toEqual(createWorkload(config));
      }
});

test('metrics measure intake and completion separately, timeout releases a worker and exact deadline completes', () => {
  const one = finish({ ...base, workers: 1 }),
    three = finish(base);
  expect(one.time).toBe(49);
  expect(three.time).toBe(21);
  expect(workloadMetrics(one)).toMatchObject({
    accepted: 6,
    completionTime: 49,
    acceptanceTime: 1,
    busySeconds: 48,
    utilisation: 48 / 49,
  });
  expect(one.peakQueue).toBe(5);
  expect(three.peakQueue).toBe(3);
  expect(workloadMetrics(three).utilisation).toBeCloseTo(48 / 63);
  const failed = finish({ jobs: 6, workers: 1, scenario: 'timeout' });
  const job = failed.jobs.find((j) => j.status === 'failed')!;
  expect(job.id).toBe('J05');
  expect(job.finishedAt! - job.startedAt!).toBe(8);
  expect(failed.jobs[5].startedAt).toBe(job.finishedAt);
  expect(workloadMetrics(failed)).toMatchObject({ completed: 5, failed: 1, running: 0, queued: 0 });
  let exact: WorkloadState = createWorkload({ jobs: 1, workers: 1, scenario: 'steady' });
  exact.jobs[0].duration = 20;
  exact = reduce(exact, { type: 'start' });
  while (exact.status === 'running') exact = reduce(exact, { type: 'tick' });
  expect(exact.jobs[0].status).toBe('completed');
  const mixed = finish({ jobs: 6, workers: 3, scenario: 'mixed' });
  expect(mixed.events.filter((e) => e.kind === 'completed').map((e) => e.job)).not.toEqual(
    mixed.jobs.map((j) => j.id),
  );
});

test('Lab routes, eight-route metadata/assets and working project discovery remain local', async ({
  page,
  request,
}) => {
  const errors: string[] = [],
    external: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url());
  });
  for (const path of ['/lab/', '/lab/automark/']) {
    expect((await request.get(path)).status()).toBe(200);
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      `https://ibrahimsheriiff.com${path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `https://ibrahimsheriiff.com/${path === '/lab/' ? 'lab' : 'lab-automark'}-og.png`,
    );
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation', includeHidden: true })
        .getByRole('link', { name: 'Lab', exact: true, includeHidden: true }),
    ).toHaveAttribute('href', '/lab/');
    expect(
      (await request.get(`/${path === '/lab/' ? 'lab' : 'lab-automark'}-og.png`)).status(),
    ).toBe(200);
  }
  const schema = (await page.locator('script[type="application/ld+json"]').allTextContents()).find(
    (s) => s.includes('WebApplication'),
  )!;
  expect(JSON.parse(schema).url).toBe('https://ibrahimsheriiff.com/lab/automark/');
  await page.getByRole('link', { name: 'Back to the Engineering Lab', exact: true }).click();
  await expect(page).toHaveURL('/lab/');
  await page.getByRole('link', { name: 'Open the workload simulator', exact: false }).click();
  await expect(page).toHaveURL('/lab/automark/');
  await page.getByRole('link', { name: 'AutoMark case study', exact: true }).click();
  await expect(page).toHaveURL('/work/automark/');
  await page.getByRole('link', { name: 'Try the AutoMark workload simulator' }).click();
  await expect(page).toHaveURL('/lab/automark/');
  await page.goto('/#lab');
  await expect(page.locator('#lab')).toBeVisible();
  await page.getByRole('link', { name: 'Try the workload simulator', exact: true }).click();
  await expect(page).toHaveURL('/lab/automark/');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/lab/automark/');
  expect(sitemap).toContain('https://ibrahimsheriiff.com/lab/');
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('playback supports start, pause, resume, step, speed and reset without duplicated time', async ({
  page,
}, info) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-28T00:00:01Z'));
  await page.goto('/lab/automark/');
  await expect(page.getByRole('button', { name: 'Start workload' })).toBeEnabled();
  await page.getByLabel('Submitted jobs', { exact: true }).selectOption('6');
  await page.getByLabel('Playback speed').selectOption('1');
  if (info.project.name === 'mobile')
    await page.getByRole('button', { name: 'Start workload' }).tap();
  else {
    await page.getByRole('button', { name: 'Start workload' }).focus();
    await page.keyboard.press('Enter');
  }
  await expect(page.getByTestId('accepted-count')).toHaveText('3 / 6');
  await expect(page.getByLabel('Submitted jobs', { exact: true })).toBeDisabled();
  await page.clock.fastForward(1000);
  await expect(page.getByTestId('virtual-time')).toHaveText('1s');
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.clock.fastForward(5000);
  await expect(page.getByTestId('virtual-time')).toHaveText('1s');
  await page.getByRole('button', { name: 'Step', exact: false }).click();
  await expect(page.getByTestId('virtual-time')).toHaveText('2s');
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await page.getByLabel('Playback speed').selectOption('4');
  await page.clock.fastForward(250);
  await expect(page.getByTestId('virtual-time')).toHaveText('3s');
  for (let i = 0; i < 20; i++) {
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.getByRole('button', { name: 'Resume', exact: true }).click();
  }
  await page.clock.fastForward(250);
  await expect(page.getByTestId('virtual-time')).toHaveText('4s');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.clock.fastForward(3000);
  await expect(page.locator('.simulator')).toHaveAttribute('data-run-status', 'ready');
  await expect(page.getByTestId('virtual-time')).toHaveText('0s');
  await expect(page.getByLabel('Submitted jobs', { exact: true })).toBeEnabled();
  await expect(page.locator('.sim-events li')).toHaveCount(0);
});

test('failure, terminal summaries, event filtering, empty workload and leaving clean up playback', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-28T00:00:01Z'));
  await page.goto('/lab/automark/');
  await page.getByLabel('Scenario', { exact: true }).selectOption('timeout');
  await page.getByLabel('Playback speed').selectOption('4');
  await page.getByRole('button', { name: 'Start workload' }).click();
  for (let i = 0; i < 80; i++) await page.clock.runFor(250);
  await expect(page.locator('.simulator')).toHaveAttribute('data-run-status', 'completed');
  await expect(page.getByTestId('failed-count')).toHaveText('1');
  await expect(page.getByTestId('completed-count')).toHaveText('11');
  await expect(page.getByRole('status')).toContainText('11 jobs graded, 1 failed');
  await page.getByLabel('Filter events').selectOption('outcomes');
  await page.getByText('Read the complete chronological timeline').click();
  await expect(page.locator('.sim-events').last()).toContainText('timed out');
  await expect(page.locator('.sim-outcomes')).toContainText('Timed out');
  await page.getByText('Inspect all 12 submission records').click();
  await expect(page.locator('.sim-records li')).toHaveCount(12);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByLabel('Submitted jobs', { exact: true }).selectOption('0');
  await page.getByRole('button', { name: 'Start workload' }).click();
  await expect(page.getByRole('status')).toContainText('Completed');
  await expect(page.getByTestId('completion-time')).toHaveText('0s');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByLabel('Submitted jobs', { exact: true }).selectOption('6');
  await page.getByRole('button', { name: 'Start workload' }).click();
  await page.getByRole('link', { name: 'Back to the Engineering Lab', exact: true }).click();
  await page.clock.runFor(3000);
  await page.getByRole('link', { name: 'Open the workload simulator', exact: false }).click();
  await expect(page.locator('.simulator')).toHaveAttribute('data-run-status', 'ready');
  await expect(page.getByTestId('virtual-time')).toHaveText('0s');
});

test('Lab reflows, reduced motion retains operation and accessible states expose readable data', async ({
  page,
}) => {
  for (const route of ['/lab/', '/lab/automark/']) {
    await page.goto(route);
    if (route.includes('automark')) {
      await page.getByLabel('Submitted jobs', { exact: true }).selectOption('36');
      await page.getByLabel('Independent workers', { exact: true }).selectOption('6');
      await page.getByRole('button', { name: 'Step', exact: false }).click();
      for (let i = 0; i < 4; i++)
        await page.getByRole('button', { name: 'Step', exact: false }).click();
    }
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route}/${width}`,
      ).toBeTruthy();
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route}/200%/${width}`,
      ).toBeTruthy();
    }
  }
  await page.goto('/lab/automark/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Step', exact: false }).click();
  await page.getByRole('button', { name: 'Step', exact: false }).click();
  expect(
    await page
      .locator('.sim-progress>span')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe('0s');
  await page.keyboard.press('Tab');
  await page.getByRole('button', { name: 'Resume', exact: true }).focus();
  expect(
    await page
      .getByRole('button', { name: 'Resume', exact: true })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).toBe('solid');
});

test('Lab without JavaScript explains the model and displays a computed representative example', async ({
  browser,
}) => {
  const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    }),
    page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/lab/');
  await expect(
    page.getByRole('link', { name: 'Open the workload simulator', exact: false }),
  ).toBeVisible();
  await page.goto('http://127.0.0.1:4173/lab/automark/');
  await expect(page.getByRole('button', { name: 'Start workload' })).toBeDisabled();
  await expect(page.locator('.lab-nojs')).toContainText('49s');
  await expect(page.locator('.lab-nojs')).toContainText('21s');
  await page.getByText('Scheduling assumptions and limits').click();
  await expect(page.locator('.sim-assumptions')).toContainText('No retries');
  await context.close();
});

test('one playback timer is owned, tab hiding pauses, and client navigation clears it', async ({
  page,
}) => {
  await page.goto('/lab/automark/');
  await page.evaluate(() => {
    const active = new Set<number>();
    const set = window.setInterval.bind(window),
      clear = window.clearInterval.bind(window);
    const trackedSetInterval = (handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
      const id = set(handler, timeout, ...args);
      if ([250, 500, 1000].includes(timeout ?? 0)) active.add(id);
      return id;
    };
    const trackedClearInterval = (id?: number) => {
      active.delete(id ?? -1);
      clear(id);
    };
    Object.assign(window, {
      setInterval: trackedSetInterval,
      clearInterval: trackedClearInterval,
      labTimerCount: () => active.size,
    });
  });
  const count = () =>
    page.evaluate(() => (window as unknown as { labTimerCount: () => number }).labTimerCount());
  await page.getByRole('button', { name: 'Start workload' }).click();
  await expect.poll(count).toBe(1);
  await page.getByLabel('Playback speed').selectOption('4');
  await expect.poll(count).toBe(1);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('.simulator')).toHaveAttribute('data-run-status', 'paused');
  await expect.poll(count).toBe(0);
  await page.evaluate(() => {
    delete (document as unknown as { hidden?: boolean }).hidden;
  });
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await expect.poll(count).toBe(1);
  await page.getByRole('link', { name: 'Back to the Engineering Lab', exact: true }).click();
  await expect(page).toHaveURL('/lab/');
  await expect.poll(count).toBe(0);
});

test('simulation code is loaded only when the experiment is opened', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const scripts: Promise<string>[] = [];
  page.on('response', (r) => {
    if (r.url().includes('/_next/') && r.url().includes('.js')) scripts.push(r.text());
  });
  for (const route of ['/', '/lab/']) {
    scripts.length = 0;
    await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
    if (route === '/') await page.locator('#lab').scrollIntoViewIfNeeded();
    await page
      .getByRole('link', {
        name: route === '/' ? 'Try the workload simulator' : 'Open the workload simulator',
        exact: false,
      })
      .hover();
    await page.waitForLoadState('networkidle');
    expect((await Promise.all(scripts)).join('\n')).not.toContain('Steady grading');
  }
  scripts.length = 0;
  await page.getByRole('link', { name: 'Open the workload simulator', exact: false }).click();
  await expect(page.getByRole('button', { name: 'Start workload' })).toBeEnabled();
  expect((await Promise.all(scripts)).join('\n')).toContain('Steady grading');
  await context.close();
});
