import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  evidenceChunks,
  selectEvidence,
  evidenceContext,
  chunkCosine,
} from '../src/lib/lab/evidence-journey';
import { evidenceSources } from '../src/content/lab/evidence-journey';
test('source and chunk identity survives preparation, retrieval and context', () => {
  const chunks = evidenceChunks();
  expect(chunks).toHaveLength(8);
  expect(new Set(chunks.map((c) => c.id)).size).toBe(8);
  for (const s of evidenceSources)
    expect(chunks.filter((c) => c.sourceId === s.id).map((c) => c.text)).toEqual([...s.paragraphs]);
  const ids = (m: 'mmr' | 'similarity', w: number) => selectEvidence(m, w).map((c) => c.id);
  expect(ids('similarity', 0.5)).toEqual(['S01-C1', 'S01-C2', 'S02-C1']);
  expect(ids('mmr', 1)).toEqual(ids('similarity', 1));
  expect(ids('mmr', 0)).not.toEqual(ids('mmr', 1));
  expect(ids('mmr', 0.5)).toEqual(ids('mmr', 0.5));
  for (const c of evidenceContext(ids('mmr', 0.5)))
    expect(chunks.find((x) => x.id === c.id)?.text).toBe(c.text);
  expect(chunkCosine('S01-C1')).toBeCloseTo(1 / Math.hypot(1, 0.04));
  expect(() => evidenceContext(['missing'])).toThrow();
});
test('journey stages, actual retrieval, source references and reset stay connected', async ({
  page,
}) => {
  await page.goto('/lab/mediquery/');
  await page.getByRole('button', { name: 'Chunks', exact: true }).click();
  await page.getByRole('button', { name: 'S02 Morning watering notes', exact: false }).click();
  await expect(page.locator('.mq-chunk-list')).toContainText('S02-C1');
  await page.getByRole('button', { name: 'Vectors', exact: true }).click();
  await expect(page.getByRole('table')).toContainText('S04-C2');
  await page.getByRole('button', { name: 'Select', exact: true }).click();
  await page.getByLabel('MMR', { exact: true }).check();
  await page.getByLabel('Journey relevance weight').focus();
  await page.keyboard.press('Home');
  const order = await page.locator('.mq-context-strip>span').textContent();
  await page.getByRole('button', { name: 'Context', exact: true }).click();
  await expect(page.locator('.mq-working-paper blockquote')).toHaveCount(3);
  await page.getByRole('button', { name: 'Answer', exact: true }).click();
  await page.locator('.mq-answer button').last().click();
  await expect(page.locator('.mq-excerpt')).toContainText(order!.split(' → ').at(-1)!);
  await expect(page.locator('.mq-working-paper')).toContainText('not an automatic');
  await page.getByRole('button', { name: 'Reset journey' }).click();
  await expect(page.getByRole('status')).toContainText('Sources');
});
test('evidence journey reflows and passes accessibility', async ({ page }) => {
  await page.goto('/lab/mediquery/');
  for (const stage of ['Vectors', 'Select', 'Answer']) {
    await page.getByRole('button', { name: stage, exact: true }).click();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBeTruthy();
    }
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
});
