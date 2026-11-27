import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const draft = process.argv.includes('--draft');
const dir = `artifacts/phase-3a/${draft ? 'draft' : 'screenshots'}`;
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const layout = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:4173/lab/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      animations: 'disabled',
      path: `${dir}/lab-${width}-full.png`,
      fullPage: true,
    });
    await page
      .locator('.lab-cover')
      .screenshot({ animations: 'disabled', path: `${dir}/lab-opening-${width}.png` });
    await page
      .locator('.lab-available')
      .screenshot({ animations: 'disabled', path: `${dir}/lab-experiment-preview-${width}.png` });
    layout.push({
      route: 'lab',
      width,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    });
    await page.goto('http://127.0.0.1:4173/lab/automark/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      animations: 'disabled',
      path: `${dir}/automark-experiment-${width}-full.png`,
      fullPage: true,
    });
    const snap = async (name) =>
      page
        .locator('.simulator')
        .screenshot({ animations: 'disabled', path: `${dir}/sim-${name}-${width}.png` });
    await snap('ready');
    await page.getByRole('button', { name: 'Start workload' }).click();
    await snap('intake');
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await page.getByRole('button', { name: 'Step', exact: false }).click();
    for (let i = 0; i < 4; i++)
      await page.getByRole('button', { name: 'Step', exact: false }).click();
    await snap('queue');
    await page
      .locator('.sim-flow')
      .screenshot({ animations: 'disabled', path: `${dir}/sim-workers-${width}.png` });
    await snap('paused');
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await page.getByLabel('Scenario', { exact: true }).selectOption('timeout');
    await page.getByRole('button', { name: 'Step', exact: false }).click();
    for (let i = 0; i < 17; i++)
      await page.getByRole('button', { name: 'Step', exact: false }).click();
    await snap('failure');
    for (
      let i = 0;
      i < 80 && (await page.locator('.simulator').getAttribute('data-run-status')) !== 'completed';
      i++
    )
      await page.getByRole('button', { name: 'Step', exact: false }).click();
    await snap('completed');
    await page.getByLabel('Filter events').selectOption('outcomes');
    await page
      .locator('.sim-timeline')
      .screenshot({ animations: 'disabled', path: `${dir}/sim-outcome-timeline-${width}.png` });
    layout.push({
      route: 'lab/automark',
      width,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    });
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:4173/');
    await page
      .locator('#lab')
      .screenshot({ animations: 'disabled', path: `${dir}/homepage-lab-${width}.png` });
    await page.goto('http://127.0.0.1:4173/work/returns-agent/');
    await page
      .locator('.policy-playground')
      .screenshot({ animations: 'disabled', path: `${dir}/returns-rule-label-${width}.png` });
  }
  await writeFile(`${dir}/layout-review.json`, JSON.stringify(layout, null, 2) + '\n');
  console.log(`Captured Lab and simulator at five widths with major states in ${dir}`);
} finally {
  await browser.close();
}
