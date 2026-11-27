import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const draft = process.argv.includes('--draft');
const directory = `artifacts/phase-2c/${draft ? 'draft' : 'screenshots'}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const layout = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:4173/work/daita/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/daita-${width}-full.png`, fullPage: true });
    for (const [name, selector] of [
      ['opening', '.dt-opening'],
      ['documents', '.dt-document-spread'],
      ['contribution', '#contribution'],
      ['knowledge', '#knowledge'],
      ['human-review', '#human-review'],
      ['closing', '#reflection'],
    ])
      await page.locator(selector).screenshot({ path: `${directory}/${name}-${width}.png` });
    const steps = page
      .getByRole('navigation', { name: 'Document processing stages' })
      .getByRole('button');
    const states = [];
    for (let i = 0; i < 5; i++) {
      await steps.nth(i).click();
      await page
        .locator('#workbench')
        .screenshot({ path: `${directory}/workbench-${i + 1}-${width}.png` });
      states.push({
        step: i + 1,
        overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      });
    }
    await page.getByRole('button', { name: 'Inspect R04' }).click();
    await page
      .locator('.dw-attention')
      .screenshot({ path: `${directory}/invalid-record-${width}.png` });
    await page.getByLabel('Review category for R05').selectOption('Equipment review');
    await page.getByRole('button', { name: 'Confirm R05 review' }).click();
    await page
      .locator('#workbench')
      .screenshot({ path: `${directory}/review-confirmed-${width}.png` });
    layout.push({ width, states });
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.locator('#daita').screenshot({ path: `${directory}/homepage-daita-${width}.png` });
  }
  await writeFile(`${directory}/layout-review.json`, JSON.stringify(layout, null, 2) + '\n');
  console.log('Saved five widths, five stages, exception and correction states.');
} finally {
  await browser.close();
}
