import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  createQuality,
  qualityReducer as reduce,
  deriveQuality,
  qualityTotals,
  qualityExport,
} from '../src/lib/lab/quality-review';
import { qualityRecords } from '../src/content/lab/quality-fixtures';
test('quality mapping, correction, duplicate decisions and review conserve records', () => {
  const raw = structuredClone(qualityRecords);
  let s = createQuality();
  expect(qualityTotals(s).held).toBe(4);
  s = reduce(s, { type: 'mapping', field: 'amount', value: 'Value' });
  expect(deriveQuality(s).find((r) => r.id === 'Q03')?.duplicateOf).toBe('Q01');
  expect(qualityTotals(s).held).toBe(3);
  s = reduce(s, { type: 'confirm', id: 'Q01' });
  expect(qualityExport(s)).toContain('Q01');
  s = reduce(s, {
    type: 'edit',
    id: 'Q02',
    field: 'description',
    value: 'Prepared subscription record',
  });
  s = reduce(s, { type: 'confirm', id: 'Q02' });
  s = reduce(s, { type: 'edit', id: 'Q03', field: 'duplicate', value: 'exclude' });
  s = reduce(s, { type: 'edit', id: 'Q04', field: 'date', value: '2026-02-28' });
  s = reduce(s, { type: 'edit', id: 'Q04', field: 'category', value: 'Equipment review' });
  s = reduce(s, { type: 'confirm', id: 'Q04' });
  expect(qualityTotals(s)).toEqual({ total: 4, held: 0, ready: 0, reviewed: 3, excluded: 1 });
  expect(qualityExport(s)).not.toContain('Q03');
  s = reduce(s, { type: 'edit', id: 'Q02', field: 'description', value: 'Changed' });
  expect(deriveQuality(s).find((r) => r.id === 'Q02')?.reviewed).toBe(false);
  s = reduce(s, { type: 'mapping', field: 'date', value: 'Entry' });
  expect(qualityTotals(s).reviewed).toBe(0);
  expect(qualityRecords).toEqual(raw);
  expect(reduce(s, { type: 'reset' })).toEqual(createQuality());
  expect(reduce(s, { type: 'edit', id: 'unknown', field: 'date', value: 'x' })).toBe(s);
});
test('review workspace mappings, corrections and export reflect actual state', async ({ page }) => {
  await page.goto('/lab/daita/');
  await page.getByLabel('Amount column').selectOption('Value');
  await page.getByRole('button', { name: 'Q02', exact: false }).click();
  await page.getByLabel('Description correction').fill('Prepared subscription');
  await page.getByRole('button', { name: 'Confirm record review' }).click();
  await expect(page.getByRole('status')).toContainText('1 reviewed');
  await page.getByRole('button', { name: 'Q03', exact: false }).click();
  await page.getByLabel('Possible duplicate').selectOption('exclude');
  await expect(page.getByRole('status')).toContainText('1 excluded');
  await page.getByRole('button', { name: 'Q04', exact: false }).click();
  await page.getByLabel('Date correction').fill('2026-02-28');
  await page.getByLabel('Fictional review category').selectOption('Equipment review');
  await page.getByRole('button', { name: 'Confirm record review' }).click();
  await page.getByText('Fictional export preview', { exact: false }).click();
  await expect(page.locator('.qr-export pre')).toContainText('Equipment review');
  await expect(page.locator('.qr-ledger li')).toHaveCount(4);
  await page.getByRole('button', { name: 'Reset review' }).click();
  await expect(page.getByRole('status')).toContainText('4 held');
});
test('quality workspace reflows and passes accessibility', async ({ page }) => {
  await page.goto('/lab/daita/');
  await page.getByLabel('Amount column').selectOption('Value');
  await page.getByRole('button', { name: 'Q03', exact: false }).click();
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy();
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
