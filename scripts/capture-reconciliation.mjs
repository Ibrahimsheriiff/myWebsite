import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const draft = process.argv.includes('--draft');
const directory = draft ? '.local/phase-2a1-first-render' : 'artifacts/phase-2a1';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4173/work/automark/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  const measurements = [];
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('[data-component="svn"]').click();
    await page.mouse.move(0, 0);
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `${directory}/automark-full-${width}.png`,
      fullPage: true,
      animations: 'disabled',
    });
    for (const [name, selector] of Object.entries({
      architecture: '#architecture-explorer',
      benchmark: '#benchmark',
      opening: '.case-opening',
    })) {
      const box = await page.locator(selector).boundingBox();
      await page.setViewportSize({ width, height: Math.max(1000, Math.ceil(box.height) + 200) });
      await page
        .locator(selector)
        .screenshot({ path: `${directory}/${name}-${width}.png`, animations: 'disabled' });
    }
    const ids = await page
      .locator('.system-node')
      .evaluateAll((nodes) => nodes.map((node) => node.dataset.component));
    for (const id of ids) {
      await page.locator(`[data-component="${id}"]`).click();
      await page.mouse.move(0, 0);
      await page
        .locator('#architecture-explorer')
        .screenshot({ path: `${directory}/selected-${id}-${width}.png`, animations: 'disabled' });
    }
    measurements.push(
      await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        componentCount: document.querySelectorAll('.system-node').length,
        articleHeight: document.querySelector('article').getBoundingClientRect().height,
        panelHeight: document.querySelector('.architecture-panel').getBoundingClientRect().height,
      })),
    );
  }
  const detail = await browser.newPage({
    viewport: { width: 1440, height: 2600 },
    deviceScaleFactor: 2,
  });
  await detail.goto('http://127.0.0.1:4173/work/automark/', { waitUntil: 'networkidle' });
  await detail.evaluate(() => document.fonts.ready);
  await detail.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await detail.locator('[data-component="hook"]').click();
  await detail
    .locator('#architecture-explorer')
    .screenshot({ path: `${directory}/architecture-high-resolution.png`, animations: 'disabled' });
  const map = await detail.locator('.system-map').boundingBox(),
    lane = await detail.locator('.lane-intake').boundingBox();
  await detail.screenshot({
    path: `${directory}/svn-commit-hook-closeup.png`,
    clip: { x: map.x, y: lane.y, width: map.width, height: lane.height + 100 },
    animations: 'disabled',
  });
  await detail.close();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => scrollTo(0, 0));
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `${directory}/homepage-full-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    for (const [name, selector] of Object.entries({
      daita: '#daita',
      hero: '.hero',
      lab: '#lab',
    })) {
      const box = await page.locator(selector).boundingBox();
      await page.setViewportSize({ width, height: Math.max(1000, Math.ceil(box.height) + 200) });
      await page
        .locator(selector)
        .screenshot({ path: `${directory}/${name}-${width}.png`, animations: 'disabled' });
    }
  }
  await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2) + '\n');
  console.log(`Reconciliation captures: ${directory}`);
  console.log(measurements);
} finally {
  await browser.close();
}
