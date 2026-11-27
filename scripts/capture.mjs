import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const draft = process.argv.includes('--draft');
const directory = draft ? '.local/design-draft' : 'artifacts/screenshots';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: `${directory}/desktop-full.png`, fullPage: true });
async function captureHero(name, width, originalHeight) {
  await page.evaluate(() => window.scrollTo(0, 0));
  const box = await page.locator('.hero').boundingBox();
  if (!box) throw new Error('Hero is missing');
  await page.setViewportSize({ width, height: Math.ceil(box.y + box.height) });
  await page.screenshot({ path: `${directory}/${name}.png` });
  await page.setViewportSize({ width, height: originalHeight });
}
await captureHero('hero-desktop', 1440, 1000);
for (const [name, selector] of Object.entries({
  'featured-work': '#automark',
  equityguard: '#equityguard',
  about: '#about',
  'engineering-lab': '#lab',
})) {
  await page.locator(selector).screenshot({ path: `${directory}/${name}-desktop.png` });
}
await page.setViewportSize({ width: 768, height: 1024 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: `${directory}/tablet-full.png`, fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: `${directory}/mobile-full.png`, fullPage: true });
await captureHero('hero-mobile', 390, 844);
for (const [name, selector] of Object.entries({
  'featured-work': '#automark',
  'engineering-lab': '#lab',
}))
  await page.locator(selector).screenshot({ path: `${directory}/${name}-mobile.png` });
console.log(`Screenshots saved to ${directory}`);
console.log(
  await page.evaluate(() => ({
    pageWidth: innerWidth,
    contentWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  })),
);
await browser.close();
