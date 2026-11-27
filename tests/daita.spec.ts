import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { rawRecords } from '../src/content/daita-fixtures';
import {
  checkRecords,
  mapRecord,
  normaliseRecord,
  parseDemoAmount,
  parseDemoDate,
  prepareRecords,
} from '../src/lib/daita-workbench';

test('fictional transformations preserve identity, validate dates/money and retain exceptions', () => {
  const snapshot = structuredClone(rawRecords);
  expect(mapRecord(rawRecords[1])).toMatchObject({
    date: '04 Apr 2025',
    description: '  Studio subscription  ',
    amount: 'AUD 48.00',
    reference: 'F-105',
  });
  expect(normaliseRecord(rawRecords[1])).toMatchObject({
    id: 'R02',
    date: '2025-04-04',
    description: 'Studio subscription',
    cents: 4800,
  });
  for (const [raw, expected] of [
    ['2025-04-03', '2025-04-03'],
    ['06 Apr 2025', '2025-04-06'],
    ['2024-02-29', '2024-02-29'],
    ['2025-02-29', null],
    ['2025-04-31', null],
    ['03/04/2025', null],
    ['', null],
  ] as const)
    expect(parseDemoDate(raw)).toBe(expected);
  for (const [raw, expected] of [
    ['$120.00', 12000],
    ['AUD 48.00', 4800],
    ['$1,234.50', 123450],
    ['0.05', 5],
    ['0', 0],
    ['1,23.00', null],
    ['12.345', null],
    ['', null],
    ['hello', null],
  ] as const)
    expect(parseDemoAmount(raw)).toBe(expected);
  const checked = checkRecords(rawRecords.map(normaliseRecord));
  expect(checked.map((r) => r.id)).toEqual(['R01', 'R02', 'R03', 'R04', 'R05']);
  expect(checked[2].duplicateOf).toBe('R01');
  expect(checked[3].issues).toEqual(['Description missing']);
  expect(checked[4].duplicateOf).toBeNull();
  expect(prepareRecords().filter((r) => r.category).length).toBe(3);
  const corrected = prepareRecords('Equipment review', true);
  expect(corrected[4]).toMatchObject({ category: 'Equipment review', reviewed: true });
  expect(corrected[2]).toMatchObject({ category: null, reviewed: false, duplicateOf: 'R01' });
  expect(corrected[3]).toMatchObject({
    category: null,
    reviewed: false,
    issues: ['Description missing'],
  });
  expect(rawRecords).toEqual(snapshot);
});

test('DAITA exports directly with accurate context, metadata, assets and project navigation', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url());
  });
  await page.goto('/work/daita/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Less manual review.');
  await expect(page.locator('.dt-opening')).toContainText('March–June 2025');
  await expect(page.locator('#context')).toContainText('not employment with Deloitte');
  await expect(page.locator('#contribution')).toContainText('FastAPI and Pydantic');
  await expect(page.locator('#knowledge')).toContainText('versioned knowledge');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://ibrahimsheriiff.com/work/daita/',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://ibrahimsheriiff.com/daita-og.png',
  );
  const ld = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').allTextContents()).find((s) =>
      s.includes('"Article"'),
    )!,
  );
  expect(ld.mainEntityOfPage).toBe('https://ibrahimsheriiff.com/work/daita/');
  expect((await request.get('/daita-og.png')).status()).toBe(200);
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/work/daita/');
  await page.getByRole('link', { name: 'Explore EquityGuard' }).click();
  await expect(page).toHaveURL('/work/equityguard/');
  await page.getByRole('link', { name: 'Next study: DAITA' }).click();
  await expect(page).toHaveURL('/work/daita/');
  await page.getByRole('link', { name: 'All selected work' }).click();
  await page.getByRole('link', { name: 'Inside DAITA' }).click();
  await expect(page).toHaveURL('/work/daita/');
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('workbench follows the same rows, explains exceptions and preserves a manual review', async ({
  page,
}, info) => {
  await page.goto('/work/daita/#workbench');
  const steps = page
    .getByRole('navigation', { name: 'Document processing stages' })
    .getByRole('button');
  await expect(steps).toHaveCount(5);
  await expect(steps.first()).toHaveAttribute('aria-current', 'step');
  await expect(page.locator('.dw-table')).toContainText('04 Apr 2025');
  await steps.first().focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(steps.nth(1)).toHaveAttribute('aria-current', 'step');
  await expect(page.locator('.dw-table tr[data-record="R02"]')).toContainText('2025-04-04');
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.locator('.dw-table tr[data-record="R03"]')).toContainText('Possible repeat');
  if (info.project.name === 'mobile') await page.getByRole('button', { name: 'Inspect R04' }).tap();
  else await page.getByRole('button', { name: 'Inspect R04' }).click();
  await expect(page.getByRole('region', { name: 'Record check explanation' })).toContainText(
    'description is blank',
  );
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.locator('.dw-table tr[data-record="R05"]')).toContainText('General supplies');
  await page.getByRole('button', { name: 'Next step' }).click();
  await page.getByLabel('Review category for R05').selectOption('Equipment review');
  await page.getByRole('button', { name: 'Confirm R05 review' }).click();
  await expect(page.locator('.dw-review-result')).toContainText('R03 and R04 remain held');
  await expect(page.locator('.dw-table tr[data-record="R05"]')).toContainText('Equipment review');
  await expect(page.locator('.dw-table tr[data-record="R05"]')).toContainText('Reviewed by you');
  await page.getByRole('button', { name: 'Previous' }).click();
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.getByRole('button', { name: 'Category confirmed' })).toBeDisabled();
  expect(await page.locator('.dw-table tbody tr').count()).toBe(5);
  await page.getByRole('button', { name: 'Reset illustration' }).click();
  await expect(steps.first()).toHaveAttribute('aria-current', 'step');
  await steps.last().click();
  await expect(page.getByLabel('Review category for R05')).toHaveValue('General supplies');
  await expect(page.getByRole('button', { name: 'Confirm R05 review' })).toBeEnabled();
});

test('all workbench stages reflow, expose visible focus and pass accessibility checks', async ({
  page,
}) => {
  await page.goto('/work/daita/');
  const steps = page
    .getByRole('navigation', { name: 'Document processing stages' })
    .getByRole('button');
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (let i = 0; i < 5; i++) {
      await steps.nth(i).click();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `overflow ${width}/${i}`,
      ).toBeTruthy();
    }
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const i of [0, 2, 4]) {
      await steps.nth(i).click();
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
  }
  await page.getByLabel('Review category for R05').focus();
  expect(
    await page
      .getByLabel('Review category for R05')
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await steps.first().evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s');
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `200% overflow ${width}`,
    ).toBeTruthy();
  }
});

test('DAITA explanations and fictional record outcomes remain accessible without JavaScript', async ({
  browser,
}) => {
  const c = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const p = await c.newPage();
  await p.goto('http://127.0.0.1:4173/work/daita/');
  await expect(p.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(p.locator('.dw-fallback')).toContainText('does not run original DAITA code');
  await expect(p.locator('.dw-fallback details')).toHaveCount(5);
  await p.locator('.dw-fallback details').last().locator('summary').click();
  await expect(p.getByRole('heading', { name: 'A suggestion is a starting point.' })).toBeVisible();
  await expect(p.locator('.dw-mobile-records')).toContainText('Possible repeat');
  await expect(p.locator('.dw-mobile-records')).toContainText('Incomplete');
  await expect(p.getByRole('link', { name: 'Explore AutoMark' })).toBeVisible();
  expect(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await c.close();
});
