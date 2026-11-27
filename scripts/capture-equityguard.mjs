import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const draft = process.argv.includes('--draft');
const directory = `artifacts/phase-2b/${draft ? 'draft' : 'screenshots'}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const findings = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:4173/work/equityguard/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/equityguard-${width}-full.png`, fullPage: true });
    for (const [name, selector] of [
      ['opening', '.eq-opening'],
      ['architecture', '#application'],
      ['tool-inspector', '#tool-inspector'],
      ['evaluation', '#evaluation'],
    ]) {
      await page.locator(selector).screenshot({ path: `${directory}/${name}-${width}.png` });
    }
    const heights = [];
    for (let i = 0; i < 6; i++) {
      await page.getByRole('tab').nth(i).click();
      heights.push(
        await page.getByRole('tabpanel').evaluate((el) => el.getBoundingClientRect().height),
      );
      if (!draft)
        await page
          .locator('.eq-inspector')
          .screenshot({ path: `${directory}/tool-${i + 1}-${width}.png` });
    }
    findings.push({
      width,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      panelHeights: heights,
    });
    await page.getByRole('tab').first().click();
  }
  for (const [name, route, section] of [
    ['homepage', '/', '#equityguard'],
    ['automark', '/work/automark/', '.case-opening'],
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${directory}/${name}-1440-full.png`, fullPage: true });
    await page.locator(section).screenshot({ path: `${directory}/${name}-section-1440.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${directory}/homepage-390-full.png`, fullPage: true });
  await page.goto('http://127.0.0.1:4173/work/equityguard/', { waitUntil: 'networkidle' });
  await page.getByRole('tab').first().focus();
  await page
    .locator('.eq-inspector')
    .screenshot({ path: `${directory}/inspector-keyboard-focus-390.png` });
  await writeFile(`${directory}/layout-review.json`, JSON.stringify(findings, null, 2) + '\n');
  console.log(findings);
} finally {
  await browser.close();
}
