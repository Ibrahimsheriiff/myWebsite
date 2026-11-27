import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  createResolution,
  resolutionReducer as reduce,
  validResolution,
} from '../src/lib/lab/resolution-workflow';
test('resolution branching preserves trusted data and guards missing/invalid inputs', () => {
  for (const scenario of ['complete', 'missing', 'invalid', 'human'] as const) {
    let s = createResolution(scenario);
    const original = structuredClone(s);
    s = reduce(s, { type: 'next' });
    expect(original).toEqual(createResolution(scenario));
    s = reduce(s, { type: 'next' });
    if (scenario === 'missing') {
      expect(s.stage).toBe('waiting');
      expect(s.policy).toBeNull();
      expect(reduce(s, { type: 'provide', reference: 'wrong' }).stage).toBe('waiting');
      s = reduce(s, { type: 'provide', reference: 'DEMO-42' });
    }
    if (scenario === 'invalid') {
      expect(s.stage).toBe('invalid');
      expect(s.order).toBeNull();
      s = reduce(s, { type: 'repair' });
      s = reduce(s, { type: 'next' });
    }
    for (let n = 0; s.stage !== 'completed' && n < 10; n++) s = reduce(s, { type: 'next' });
    expect(s.stage).toBe('completed');
    expect(s.policy?.code).toBe(scenario === 'human' ? 'HUMAN_REVIEW' : 'RETURN_PATH');
    expect(validResolution(s.output, s.policy)).toBe(true);
    expect(validResolution({ ...s.output!, decision: 'wrong' }, s.policy)).toBe(false);
    expect(reduce(s, { type: 'next' })).toBe(s);
    expect(reduce(s, { type: 'reset' })).toEqual(createResolution(scenario));
  }
});
test('missing detail, correction, policy, representative reply and reset work', async ({
  page,
}) => {
  await page.goto('/lab/returns-agent/');
  await page.getByLabel('Request scenario').selectOption('missing');
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Next step', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Waiting');
  await page.getByRole('button', { name: 'Supply details and resume' }).click();
  await expect(page.locator('.resolution-workspace').getByRole('alert')).toContainText(
    'listed fictional reference',
  );
  await page.getByLabel('Fictional order reference').fill('DEMO-77');
  await page.getByRole('button', { name: 'Supply details and resume' }).click();
  for (let i = 0; i < 3; i++)
    await page.getByRole('button', { name: 'Next step', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Completed');
  await expect(page.locator('.rw-policy')).toContainText('HUMAN_REVIEW');
  await page.getByLabel('Request scenario').selectOption('invalid');
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Next step', exact: true }).click();
  await page.getByRole('button', { name: 'Load corrected prepared input' }).click();
  await expect(page.getByRole('status')).toHaveText('interpreted');
  await page.getByRole('button', { name: 'Reset workflow' }).click();
  await expect(page.locator('.rw-ledger li')).toHaveCount(0);
});
test('resolution workspace reflows and remains accessible', async ({ page }) => {
  await page.goto('/lab/returns-agent/');
  await page.getByLabel('Request scenario').selectOption('missing');
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Next step', exact: true }).click();
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
