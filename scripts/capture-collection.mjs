import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const draft = process.argv.includes('--draft');
const dir = `artifacts/phase-2d/${draft ? 'draft' : 'screenshots'}`;
await mkdir(dir, { recursive: true });
const b = await chromium.launch({ headless: true });
const layout = [];
try {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width, height: 1000 });
    for (const [slug, opening, interaction, evidence] of [
      ['mediquery', '.mq-opening', '#retrieval', '#citations'],
      ['returns-agent', '.ra-opening', '#policy-playground', '#workflow'],
    ]) {
      await p.goto(`http://127.0.0.1:4173/work/${slug}/`, { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: `${dir}/${slug}-${width}-full.png`, fullPage: true });
      for (const [name, selector] of [
        ['opening', opening],
        ['interaction', interaction],
        ['evidence', evidence],
      ])
        await p.locator(selector).screenshot({ path: `${dir}/${slug}-${name}-${width}.png` });
      if (slug === 'mediquery') {
        await p.getByLabel('MMR', { exact: true }).check();
        for (const [label, value] of [
          ['balanced', '0.5'],
          ['diversity', '0'],
          ['relevance', '1'],
        ]) {
          await p.locator('#re-weight').press('Home');
          for (let tick = 0; tick < Math.round(Number(value) * 10); tick++)
            await p.locator('#re-weight').press('ArrowRight');
          await p.locator('#retrieval').screenshot({ path: `${dir}/mmr-${label}-${width}.png` });
        }
      } else {
        for (const [label, reference, days, condition] of [
          ['missing', '', '7', 'sealed'],
          ['invalid', 'DEMO-42', '', 'sealed'],
          ['damaged', 'DEMO-42', '7', 'damaged'],
          ['opened', 'DEMO-42', '7', 'opened'],
          ['outside', 'DEMO-42', '22', 'sealed'],
        ]) {
          await p.getByLabel('Reference', { exact: true }).fill(reference);
          await p.getByLabel('Days since delivery').fill(days);
          await p.getByLabel('Item condition').selectOption(condition);
          await p
            .locator('#policy-playground')
            .screenshot({ path: `${dir}/policy-${label}-${width}.png` });
        }
        await p.getByRole('button', { name: 'Reset example' }).click();
        await p.locator('.pp-rules summary').click();
        await p
          .locator('#policy-playground')
          .screenshot({ path: `${dir}/policy-rules-${width}.png` });
      }
      layout.push({
        slug,
        width,
        overflow: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      });
    }
  }
  for (const width of [1440, 390]) {
    await p.setViewportSize({ width, height: 1000 });
    await p.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await p.locator('.more-work details').nth(0).locator('summary').click();
    await p.locator('.more-work details').nth(1).locator('summary').click();
    await p.locator('.more-work').screenshot({ path: `${dir}/homepage-discovery-${width}.png` });
  }
  await writeFile(`${dir}/layout-review.json`, JSON.stringify(layout, null, 2) + '\n');
  console.log(
    'Captured both articles at five widths, retrieval/policy states and project discovery.',
  );
} finally {
  await b.close();
}
