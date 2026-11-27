import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const draft = process.argv.includes('--draft'),
  dir = `artifacts/phase-3b/${draft ? 'draft-collection' : 'screenshots'}`;
await mkdir(dir, { recursive: true });
const b = await chromium.launch({ headless: true });
const layout = [];
try {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await p.clock.install();
  const go = async (slug) => {
    await p.goto(`http://127.0.0.1:4173/lab/${slug}/`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
  };
  for (const width of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width, height: 1000 });
    await p.goto('http://127.0.0.1:4173/lab/', { waitUntil: 'networkidle' });
    await p.screenshot({
      path: `${dir}/lab-${width}-full.png`,
      fullPage: true,
      animations: 'disabled',
    });
    await p
      .locator('.lab-collection')
      .screenshot({ path: `${dir}/collection-${width}.png`, animations: 'disabled' });
    layout.push({
      slug: 'lab',
      width,
      overflow: await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    });
    for (const slug of ['equityguard', 'mediquery', 'returns-agent', 'daita']) {
      await go(slug);
      await p.screenshot({
        path: `${dir}/${slug}-${width}-full.png`,
        fullPage: true,
        animations: 'disabled',
      });
      const snap = async (state) =>
        p
          .locator('.experiment-workspace')
          .screenshot({ path: `${dir}/${slug}-${state}-${width}.png`, animations: 'disabled' });
      await snap('ready');
      if (slug === 'equityguard') {
        for (let i = 0; i < 3; i++) await p.getByRole('button', { name: 'Step event' }).click();
        await snap('tool-call');
        await p.getByRole('button', { name: 'Step event' }).click();
        await snap('tool-result');
        for (let i = 0; i < 2; i++) await p.getByRole('button', { name: 'Step event' }).click();
        await p.getByText('Inspect exact public payload').click();
        await snap('completed');
        await p.getByRole('button', { name: 'Reset replay' }).click();
        await p.getByLabel('Replay scenario').selectOption('provider');
        for (let i = 0; i < 5; i++) await p.getByRole('button', { name: 'Step event' }).click();
        await snap('provider-error');
        await p.getByRole('button', { name: 'Reset replay' }).click();
        await p.getByLabel('Replay scenario').selectOption('invalid');
        for (let i = 0; i < 2; i++) await p.getByRole('button', { name: 'Step event' }).click();
        await snap('invalid');
        await p.getByRole('button', { name: 'Reset replay' }).click();
        await snap('reset');
      }
      if (slug === 'mediquery') {
        for (const stage of ['Chunks', 'Vectors', 'Select', 'Context', 'Answer']) {
          await p.getByRole('button', { name: stage, exact: true }).click();
          if (stage === 'Select') await p.getByLabel('MMR', { exact: true }).check();
          if (stage === 'Answer') await p.locator('.mq-answer button').last().click();
          await snap(stage.toLowerCase());
        }
        await p.getByRole('button', { name: 'Reset journey' }).click();
        await snap('reset');
      }
      if (slug === 'returns-agent') {
        for (let i = 0; i < 5; i++)
          await p.getByRole('button', { name: 'Next step', exact: true }).click();
        await snap('completed');
        await p.getByLabel('Request scenario').selectOption('missing');
        for (let i = 0; i < 2; i++)
          await p.getByRole('button', { name: 'Next step', exact: true }).click();
        await snap('clarification');
        await p.getByRole('button', { name: 'Supply details and resume' }).click();
        await snap('missing-error');
        await p.getByRole('button', { name: 'DEMO-77 · opened' }).click();
        await p.getByRole('button', { name: 'Supply details and resume' }).click();
        for (let i = 0; i < 3; i++)
          await p.getByRole('button', { name: 'Next step', exact: true }).click();
        await snap('human-review');
        await p.getByLabel('Request scenario').selectOption('invalid');
        for (let i = 0; i < 2; i++)
          await p.getByRole('button', { name: 'Next step', exact: true }).click();
        await snap('invalid');
        await p.getByRole('button', { name: 'Load corrected prepared input' }).click();
        await snap('corrected');
        await p.getByRole('button', { name: 'Reset workflow' }).click();
        await snap('reset');
      }
      if (slug === 'daita') {
        await p.getByLabel('Amount column').selectOption('Value');
        await snap('mapped');
        await p.getByRole('button', { name: 'Q03', exact: false }).click();
        await snap('duplicate');
        await p.getByLabel('Possible duplicate').selectOption('exclude');
        await snap('excluded');
        await p.getByRole('button', { name: 'Q02', exact: false }).click();
        await p.getByLabel('Description correction').fill('Prepared subscription');
        await p.getByRole('button', { name: 'Confirm record review' }).click();
        await snap('corrected');
        await p.getByRole('button', { name: 'Q04', exact: false }).click();
        await p.getByLabel('Date correction').fill('2026-02-28');
        await p.getByLabel('Fictional review category').selectOption('Equipment review');
        await p.getByRole('button', { name: 'Confirm record review' }).click();
        await snap('date-review');
        await p.getByRole('button', { name: 'Q01', exact: false }).click();
        await p.getByRole('button', { name: 'Confirm record review' }).click();
        await p.getByText('Fictional export preview', { exact: false }).click();
        await snap('export');
        await p.getByRole('button', { name: 'Reset review' }).click();
        await snap('reset');
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
    await go('automark');
    await p.getByLabel('Submitted jobs', { exact: true }).selectOption('6');
    await p.getByLabel('Independent workers', { exact: true }).selectOption('1');
    await p.getByLabel('Playback speed').selectOption('4');
    await p.getByRole('button', { name: 'Start workload' }).click();
    await p.clock.runFor(13000);
    await p.getByRole('button', { name: 'Retain completed run', exact: true }).click();
    await p.getByRole('button', { name: 'Reset', exact: true }).click();
    await p.getByLabel('Independent workers', { exact: true }).selectOption('3');
    await p.getByRole('button', { name: 'Start workload' }).click();
    await p.clock.runFor(6000);
    await p.getByText('Worker activity from actual model events').click();
    await p
      .locator('.sim-comparison')
      .screenshot({ path: `${dir}/automark-comparison-${width}.png`, animations: 'disabled' });
    await p.getByRole('button', { name: 'Reset', exact: true }).click();
    await p.getByLabel('Submitted jobs', { exact: true }).selectOption('12');
    await p.getByRole('button', { name: 'Start workload' }).click();
    await p.clock.runFor(11000);
    await p
      .locator('.sim-comparison')
      .screenshot({ path: `${dir}/automark-mixed-variables-${width}.png`, animations: 'disabled' });
    await p.goto('http://127.0.0.1:4173/');
    await p
      .locator('#lab')
      .screenshot({ path: `${dir}/homepage-lab-${width}.png`, animations: 'disabled' });
  }
  await writeFile(`${dir}/layout-review.json`, JSON.stringify(layout, null, 2) + '\n');
  console.log(`Saved collection screenshots and meaningful states to ${dir}`);
} finally {
  await b.close();
}
