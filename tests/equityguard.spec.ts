import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { financialTools } from '../src/content/equityguard';

test('EquityGuard has a direct static route, source-grounded content and named navigation', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (req) => {
    if (!req.url().startsWith('http://127.0.0.1:4173')) external.push(req.url());
  });
  await page.goto('/work/equityguard/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('And boundaries.');
  await expect(page.locator('.eq-facts')).toContainText('React + FastAPI');
  await expect(page.locator('#agent-loop')).toContainText('up to six iterations');
  await expect(page.locator('#agent-loop')).toContainText('not built on LangChain');
  await expect(page.locator('#evaluation .eq-test-group')).toHaveCount(3);
  await expect(page.locator('.eq-test-count > strong')).toHaveText(['09', '07', '07']);
  await expect(page.locator('#evaluation')).toContainText('23/23 passed');
  await expect(page.locator('#evaluation')).toContainText('Test-local helpers');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://ibrahimsheriiff.com/work/equityguard/',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://ibrahimsheriiff.com/equityguard-og.png',
  );
  const article = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').allTextContents()).find((text) =>
      text.includes('"Article"'),
    )!,
  );
  expect(article.mainEntityOfPage).toBe('https://ibrahimsheriiff.com/work/equityguard/');
  expect(article.author.name).toBe('Ibrahim Sharif');
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/work/equityguard/');
  for (const asset of [
    '/equityguard-og.png',
    '/assets/equityguard/react-watchlist.png',
    '/assets/equityguard/watchlist-800.webp',
    '/assets/equityguard/watchlist-1600.webp',
  ])
    expect((await request.get(asset)).status()).toBe(200);
  expect(
    await page
      .locator('img')
      .evaluateAll((imgs) =>
        imgs.every(
          (img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBeTruthy();
  await page.getByRole('link', { name: 'Explore AutoMark' }).click();
  await expect(page).toHaveURL('/work/automark/');
  await page.getByRole('link', { name: 'Next study: EquityGuard' }).click();
  await expect(page).toHaveURL('/work/equityguard/');
  await page.getByRole('link', { name: 'Back to selected work' }).click();
  await page.getByRole('link', { name: 'Inside EquityGuard' }).click();
  await expect(page).toHaveURL('/work/equityguard/');
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('six actual tool contracts support keyboard, touch and stable panel dimensions', async ({
  page,
}, testInfo) => {
  await page.goto('/work/equityguard/#tool-inspector');
  await page.evaluate(() => document.fonts.ready);
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(6);
  const height = await page
    .getByRole('tabpanel')
    .evaluate((el) => el.getBoundingClientRect().height);
  for (let i = 0; i < 6; i++) {
    if (testInfo.project.name === 'mobile') await tabs.nth(i).tap();
    else await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toContainText(financialTools[i].name);
    expect(
      await page.getByRole('tabpanel').evaluate((el) => el.getBoundingClientRect().height),
    ).toBeCloseTo(height, 1);
  }
  await expect(page.getByRole('tabpanel')).toContainText('without importing it');
  await tabs.last().press('ArrowDown');
  await expect(tabs.first()).toBeFocused();
  await tabs.first().press('End');
  await expect(tabs.last()).toBeFocused();
  await tabs.last().press('ArrowUp');
  await expect(tabs.nth(4)).toBeFocused();
  await tabs.nth(4).press('Home');
  await expect(tabs.first()).toBeFocused();
  await tabs.first().press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await tabs.nth(1).press('ArrowLeft');
  await expect(tabs.first()).toBeFocused();
  const outline = await tabs.first().evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});

test('article and every tool reflow without overflow and meet automated accessibility checks', async ({
  page,
}) => {
  await page.goto('/work/equityguard/');
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (let i = 0; i < 6; i++) {
      await page.getByRole('tab').nth(i).click();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `overflow ${width}/${i}`,
      ).toBeTruthy();
    }
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.getByRole('tab').first().click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  await page.getByRole('tab').last().click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page
      .getByRole('tab')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe('0s');
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

test('all six contracts and essential narrative remain usable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/work/equityguard/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.eq-static-tools details')).toHaveCount(6);
  for (let i = 0; i < 6; i++) {
    const detail = page.locator('.eq-static-tools details').nth(i);
    if (i > 0) await detail.locator('summary').click();
    await expect(detail).toContainText(financialTools[i].name);
    await expect(detail.getByRole('heading')).toBeVisible();
  }
  await expect(
    page.getByRole('link', { name: 'Open original EquityGuard React watchlist capture' }),
  ).toBeVisible();
  await expect(page.locator('#evaluation')).toContainText('23/23 passed');
  await expect(page.getByRole('link', { name: 'Explore AutoMark' })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  await context.close();
});
