import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const stage = process.argv.includes('--draft') ? 'draft' : 'after';
const directory = stage === 'draft' ? '.local/design-review-phase-1b' : 'artifacts/phase-1b/after';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  const measurements = [];
  for (const width of [1440, 1280, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `${directory}/full-${width}.png`,
      fullPage: true,
      animations: 'disabled',
    });
    const hero = await page.locator('.hero').boundingBox();
    if (!hero) throw new Error('Hero is missing');
    await page.setViewportSize({ width, height: Math.ceil(hero.y + hero.height) });
    await page.screenshot({ path: `${directory}/intro-${width}.png`, animations: 'disabled' });
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
    for (const [name, selector] of Object.entries({
      hero: '.hero',
      automark: '#automark',
      equityguard: '#equityguard',
      daita: '#daita',
      about: '#about',
      lab: '#lab',
      contact: '#contact',
    })) {
      const box = await page.locator(selector).boundingBox();
      const height = width < 500 ? 844 : 1000;
      // Allow for the document's scroll-padding so long sections are fully inside the capture viewport.
      if (box)
        await page.setViewportSize({
          width,
          height: Math.max(height, Math.ceil(box.height) + 200),
        });
      await page
        .locator(selector)
        .screenshot({ path: `${directory}/${name}-${width}.png`, animations: 'disabled' });
      await page.setViewportSize({ width, height });
    }
    measurements.push(
      await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        heroHeight: document.querySelector('.hero').getBoundingClientRect().height,
        workOffset: document.querySelector('.work-section').getBoundingClientRect().top + scrollY,
        workHeadingTop: document.querySelector('#work-title').getBoundingClientRect().top + scrollY,
        bodyCopy: getComputedStyle(document.querySelector('.hero-description')).fontSize,
        notebookHeight: document.querySelector('.notebook').getBoundingClientRect().height,
        daitaHeight: document.querySelector('#daita').getBoundingClientRect().height,
      })),
    );
  }
  await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2) + '\n');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('tab', { name: 'Design', exact: true }).click();
  await page
    .locator('.notebook-wrap')
    .screenshot({ path: `${directory}/notebook-design.png`, animations: 'disabled' });
  await page.getByRole('tab', { name: 'Design', exact: true }).press('ArrowRight');
  await page
    .locator('.notebook-wrap')
    .screenshot({ path: `${directory}/notebook-keyboard-focus.png`, animations: 'disabled' });
  console.log(`Six-width design review captured in ${directory}`);
  console.log(measurements);
} finally {
  await browser.close();
}
