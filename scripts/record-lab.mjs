import { chromium } from '@playwright/test';
import { mkdir, rename, writeFile } from 'node:fs/promises';
const dir = 'artifacts/phase-3a';
await mkdir(`${dir}/recording`, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    recordVideo: { dir: `${dir}/recording`, size: { width: 1440, height: 1000 } },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/lab/automark/', { waitUntil: 'networkidle' });
  await page.getByLabel('Scenario', { exact: true }).selectOption('mixed');
  await page.getByLabel('Playback speed').selectOption('4');
  await page
    .locator('.simulator')
    .evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await page.evaluate(() => {
    const measurements = {
      longTasks: [],
      start: performance.now(),
      maxNodes: document.querySelectorAll('*').length,
    };
    const observer = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) measurements.longTasks.push(e.duration);
    });
    observer.observe({ type: 'longtask' });
    const timer = setInterval(
      () =>
        (measurements.maxNodes = Math.max(
          measurements.maxNodes,
          document.querySelectorAll('*').length,
        )),
      100,
    );
    Object.assign(window, {
      labMeasurements: measurements,
      stopLabMeasurement: () => {
        clearInterval(timer);
        observer.disconnect();
      },
    });
  });
  await page.getByRole('button', { name: 'Start workload' }).click();
  await page.waitForFunction(
    () => parseInt(document.querySelector('[data-testid="virtual-time"]').textContent) >= 8,
  );
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.waitForTimeout(900);
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector('.simulator').dataset.runStatus === 'completed',
    {},
    { timeout: 30000 },
  );
  const metrics = await page.evaluate(() => {
    window.stopLabMeasurement();
    const m = window.labMeasurements;
    return {
      scenario: 'mixed',
      jobs: 12,
      workers: 3,
      speed: 4,
      wallSecondsIncludingPause: (performance.now() - m.start) / 1000,
      virtualCompletion: document.querySelector('[data-testid="virtual-time"]').textContent,
      peakQueue: document.querySelector('[data-testid="peak-queue"]').textContent,
      completed: document.querySelector('[data-testid="completed-count"]').textContent,
      failed: document.querySelector('[data-testid="failed-count"]').textContent,
      longTasksOver50ms: m.longTasks.length,
      maxLongTaskMs: m.longTasks.length ? Math.max(...m.longTasks) : 0,
      maxDocumentNodes: m.maxNodes,
      measurement:
        'Local desktop Chromium during recorded real playback, includes pause and recording overhead. Not field performance.',
    };
  });
  await page.waitForTimeout(1200);
  const video = page.video();
  await context.close();
  const original = await video.path();
  await rename(original, `${dir}/recording/automark-representative-run.webm`);
  await writeFile(`${dir}/runtime-measurement.json`, JSON.stringify(metrics, null, 2) + '\n');
  console.log(metrics);
} finally {
  await browser.close();
}
