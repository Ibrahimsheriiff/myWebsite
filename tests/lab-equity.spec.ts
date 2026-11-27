import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createReplay, replayReducer as reduce, replayPlan } from '../src/lib/lab/equity-replay';
test('replay transitions are deterministic, guarded and preserve error boundaries', () => {
  for (const scenario of ['success', 'provider', 'invalid'] as const) {
    let s = createReplay(scenario);
    expect(reduce(s, { type: 'tick' })).toBe(s);
    const original = structuredClone(s);
    s = reduce(s, { type: 'step' });
    expect(original).toEqual(createReplay(scenario));
    while (s.status !== 'completed') s = reduce(s, { type: 'step' });
    expect(s.events).toEqual(replayPlan(scenario));
    expect(s.events.at(-1)?.outcome).toBe(scenario === 'success' ? 'passed' : 'failed');
    expect(reduce(s, { type: 'start' })).toBe(s);
    expect(reduce(s, { type: 'reset' })).toEqual(createReplay(scenario));
  }
  expect(replayPlan('invalid').some((e) => e.stage === 'tool_use')).toBe(false);
  expect(replayPlan('provider').at(-1)?.extension).toBe(true);
});
test('replay controls, inspection, failure and reset operate on actual events', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-28T00:00:01Z'));
  await page.goto('/lab/equityguard/');
  await page.getByRole('button', { name: 'Step event' }).click();
  await expect(page.locator('.eq-packet')).toContainText('Request received');
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.getByLabel('Playback pace').selectOption('2');
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await page.clock.runFor(4000);
  await expect(page.getByRole('status')).toContainText('Prepared response ready');
  await page.getByRole('button', { name: 'Prepared tool call', exact: false }).click();
  await page.getByText('Inspect exact public payload').click();
  await expect(page.locator('.eq-packet pre')).toContainText('get_price_data');
  await page.getByRole('button', { name: 'Reset replay' }).click();
  await page.getByLabel('Replay scenario', { exact: true }).selectOption('provider');
  await page.getByRole('button', { name: 'Start replay' }).click();
  await page.clock.runFor(4000);
  await expect(page.locator('.eq-packet')).toContainText('EDUCATIONAL EXTENSION');
  await page.getByRole('button', { name: 'Reset replay' }).click();
  await page.getByLabel('Replay scenario', { exact: true }).selectOption('invalid');
  await page.getByRole('button', { name: 'Start replay' }).click();
  await page.clock.runFor(1200);
  await expect(page.locator('.eq-packet')).toContainText('Required field missing');
});
test('equity workspace reflows and passes accessibility', async ({ page }) => {
  await page.goto('/lab/equityguard/');
  await page.getByRole('button', { name: 'Step event' }).click();
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
