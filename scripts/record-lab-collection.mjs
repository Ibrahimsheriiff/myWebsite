import { chromium } from '@playwright/test';
import { mkdir, rename, writeFile } from 'node:fs/promises';
const dir = 'artifacts/phase-3b/recordings';
await mkdir(dir, { recursive: true });
const b = await chromium.launch({ headless: true });
const results = [];
async function record(slug, operate) {
  const c = await b.newContext({
      viewport: { width: 1440, height: 1000 },
      recordVideo: { dir, size: { width: 1440, height: 1000 } },
    }),
    p = await c.newPage();
  await p.goto(`http://127.0.0.1:4173/lab/${slug}/`, { waitUntil: 'networkidle' });
  const workspace = p.locator(slug === 'automark' ? '.simulator' : '.experiment-workspace');
  await workspace.evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await p.evaluate(() => {
    const m = {
      start: performance.now(),
      longTasks: [],
      maxNodes: document.querySelectorAll('*').length,
    };
    const observer = new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => m.longTasks.push(e.duration)),
    );
    observer.observe({ type: 'longtask' });
    const timer = setInterval(
      () => (m.maxNodes = Math.max(m.maxNodes, document.querySelectorAll('*').length)),
      100,
    );
    Object.assign(window, {
      collectionMeasurement: m,
      stopCollectionMeasurement: () => {
        observer.disconnect();
        clearInterval(timer);
      },
    });
  });
  await operate(p);
  await p.waitForTimeout(900);
  const m = await p.evaluate(() => {
    window.stopCollectionMeasurement();
    const m = window.collectionMeasurement;
    return {
      wallSecondsIncludingDemonstrationPauses: (performance.now() - m.start) / 1000,
      longTasksOver50ms: m.longTasks.length,
      maxLongTaskMs: m.longTasks.length ? Math.max(...m.longTasks) : 0,
      maxDocumentNodes: m.maxNodes,
    };
  });
  results.push({
    slug,
    ...m,
    notes:
      'Local desktop Chromium, actual interaction recording. Includes deliberate reading pauses and video overhead; not field performance or processing latency.',
  });
  const video = p.video();
  await c.close();
  await rename(await video.path(), `${dir}/${slug}-interaction.webm`);
}
try {
  await record('equityguard', async (p) => {
    await p.getByLabel('Playback pace').selectOption('2');
    await p.getByRole('button', { name: 'Start replay' }).click();
    await p.waitForFunction(() => document.querySelectorAll('.eq-execution li').length >= 3);
    await p.getByRole('button', { name: 'Pause', exact: true }).click();
    await p.waitForTimeout(700);
    await p.getByRole('button', { name: 'Resume', exact: true }).click();
    await p.waitForFunction(
      () => document.querySelector('.equity-replay').dataset.state === 'completed',
    );
    await p.getByRole('button', { name: 'Prepared tool call', exact: false }).click();
    await p.getByText('Inspect exact public payload').click();
  });
  await record('mediquery', async (p) => {
    for (const stage of ['Chunks', 'Vectors', 'Select']) {
      await p.getByRole('button', { name: stage, exact: true }).click();
      await p.waitForTimeout(600);
    }
    await p.getByLabel('MMR', { exact: true }).check();
    await p.waitForTimeout(600);
    await p.getByRole('button', { name: 'Context', exact: true }).click();
    await p.waitForTimeout(600);
    await p.getByRole('button', { name: 'Answer', exact: true }).click();
    await p.locator('.mq-answer button').last().click();
  });
  await record('returns-agent', async (p) => {
    await p.getByLabel('Request scenario').selectOption('missing');
    for (let i = 0; i < 2; i++) {
      await p.getByRole('button', { name: 'Next step', exact: true }).click();
      await p.waitForTimeout(500);
    }
    await p.getByRole('button', { name: 'DEMO-77 · opened' }).click();
    await p.waitForTimeout(600);
    await p.getByRole('button', { name: 'Supply details and resume' }).click();
    for (let i = 0; i < 3; i++) {
      await p.getByRole('button', { name: 'Continue workflow' }).click();
      await p.waitForTimeout(600);
    }
  });
  await record('daita', async (p) => {
    await p.getByLabel('Amount column').selectOption('Value');
    await p.waitForTimeout(700);
    await p.getByRole('button', { name: 'Q02', exact: false }).click();
    await p.getByLabel('Description correction').fill('Prepared subscription');
    await p.waitForTimeout(700);
    await p.getByRole('button', { name: 'Confirm record review' }).click();
    await p.getByText('Fictional export preview', { exact: false }).click();
  });
  await record('automark', async (p) => {
    await p.getByLabel('Submitted jobs', { exact: true }).selectOption('6');
    await p.getByLabel('Independent workers', { exact: true }).selectOption('1');
    await p.getByLabel('Playback speed').selectOption('4');
    await p.getByRole('button', { name: 'Start workload' }).click();
    await p.waitForFunction(
      () => document.querySelector('.simulator').dataset.runStatus === 'completed',
    );
    await p.getByRole('button', { name: 'Retain completed run', exact: true }).click();
    await p.getByRole('button', { name: 'Reset', exact: true }).click();
    await p.getByLabel('Independent workers', { exact: true }).selectOption('3');
    await p.getByRole('button', { name: 'Start workload' }).click();
    await p.waitForFunction(
      () => document.querySelector('.simulator').dataset.runStatus === 'completed',
    );
    await p
      .locator('.sim-comparison')
      .evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  });
  await writeFile(
    'artifacts/phase-3b/runtime-measurements.json',
    JSON.stringify(results, null, 2) + '\n',
  );
  console.log(results);
} finally {
  await b.close();
}
