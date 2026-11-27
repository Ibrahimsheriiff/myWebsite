import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('case study exports directly and connects to homepage, images and metadata', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/work/automark/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering a better way');
  await expect(page.locator('.case-facts')).toContainText('Backend Lead');
  await expect(page.locator('.case-facts')).toContainText('2025');
  for (const id of [
    'problem',
    'ownership',
    'system',
    'decisions',
    'demo',
    'results',
    'reflection',
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.locator(`.case-index a[href="#${id}"]`)).toHaveCount(1);
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://ibrahimsheriiff.com/work/automark/',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://ibrahimsheriiff.com/automark-og.png',
  );
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/work/automark/');
  expect((await request.get('/automark-og.png')).status()).toBe(200);
  for (const href of await page
    .locator('main a[href^="/assets/"]')
    .evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).getAttribute('href')!)))
    expect((await request.get(href)).status()).toBe(200);
  const trigger = page.getByRole('button', { name: 'Enlarge the AutoMark lecturer dashboard' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await page.getByRole('link', { name: 'All work', exact: true }).click();
  await expect(page).toHaveURL('/#work');
  await page.getByRole('link', { name: 'Read the engineering case study' }).click();
  await expect(page).toHaveURL('/work/automark/');
  expect(errors).toEqual([]);
});

test('architecture supports pointer, touch, keyboard and stable explanation panels', async ({
  page,
}, testInfo) => {
  await page.goto('/work/automark/#system');
  const controls = page.locator('.system-node');
  const panel = page.getByRole('region', { name: 'Selected component explanation' });
  await expect(controls).toHaveCount(10);
  await expect(controls.nth(0)).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => document.fonts.ready);
  const height = await panel.evaluate((el) => el.getBoundingClientRect().height);
  for (let i = 0; i < 10; i++) {
    await controls.nth(i).click();
    expect(await panel.evaluate((el) => el.getBoundingClientRect().height)).toBeCloseTo(height, 1);
  }
  if (testInfo.project.name === 'mobile') await controls.nth(8).tap();
  else await controls.nth(8).click();
  await expect(panel.getByRole('heading', { name: 'FastAPI services' })).toBeVisible();
  await controls.nth(8).press('ArrowLeft');
  await expect(controls.nth(7)).toBeFocused();
  await expect(controls.nth(7)).toHaveAttribute('aria-pressed', 'true');
  await controls.nth(7).press('Home');
  await expect(controls.nth(0)).toBeFocused();
  await controls.nth(0).press('End');
  await expect(controls.nth(9)).toBeFocused();
  await expect(panel.getByRole('heading', { name: 'Records & grading files' })).toBeVisible();
  await controls.nth(9).press('ArrowRight');
  await expect(controls.nth(0)).toBeFocused();
  await controls.nth(0).press('ArrowDown');
  const below = testInfo.project.name === 'mobile' ? 2 : 4;
  await expect(controls.nth(below)).toBeFocused();
  await controls.nth(below).press('ArrowUp');
  await expect(controls.nth(0)).toBeFocused();
  expect(await panel.evaluate((el) => el.getBoundingClientRect().height)).toBeCloseTo(height, 1);
  await page.getByText('A few terms, in plain language').click();
  await expect(
    page.getByText('An action triggered after code is committed to the repository.'),
  ).toBeVisible();
});

test('case study reflows and meets automated accessibility checks', async ({ page }) => {
  await page.goto('/work/automark/');
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `overflow at ${width}`,
    ).toBeTruthy();
  }
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page
      .locator('.system-node')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe('0s');
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    '200% text overflow',
  ).toBeTruthy();
});

test('case study explains all architecture components without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/work/automark/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const name of [
    'SVN repository',
    'Post-commit hook',
    'Submission intake',
    'Durable job queue',
    'AWS grading workers',
    'Docker execution',
    'Results & feedback',
    'Student & lecturer dashboards',
    'FastAPI services',
    'Records & grading files',
  ])
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open original image' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Earlier architecture drawing' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to selected work' })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  await context.close();
});
