import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage renders verified work, professional links and working static assets', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const failures: string[] = [];
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400)
      failures.push(response.url());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I like figuring');
  await expect(page.getByText('97', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('200', { exact: true })).toBeVisible();
  await expect(page.getByText('43', { exact: true })).toBeVisible();
  await expect(page.getByText('23 automated tests', { exact: true })).toBeVisible();
  await expect(page.getByText('OPEN TO EXPLORE', { exact: true })).toBeVisible();
  await expect(
    page.locator('a[href="https://www.linkedin.com/in/ibrahim-sharif-au"]').first(),
  ).toBeVisible();
  for (const url of [
    '/assets/resume/Ibrahim%20Sharif%20Resume%20v4.pdf',
    '/assets/img/dashboard.png',
    '/assets/img/system%20architecture.png',
    '/og-image.png',
    '/icon.svg',
    '/sitemap.xml',
    '/robots.txt',
  ])
    expect((await request.get(url)).status(), url).toBe(200);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});

test('notebook supports pointer, keyboard and stable panels', async ({ page }, testInfo) => {
  await page.goto('/');
  const understand = page.getByRole('tab', { name: 'Understand' });
  await expect(understand).toHaveAttribute('aria-selected', 'true');
  const panelHeight = await page
    .locator('.notebook-panels')
    .evaluate((el) => el.getBoundingClientRect().height);
  if (testInfo.project.name === 'mobile')
    await page.getByRole('tab', { name: 'Build', exact: true }).tap();
  else await page.getByRole('tab', { name: 'Build', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Turn an idea into a system.');
  await page.getByRole('tab', { name: 'Build', exact: true }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Verify' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Look beyond the happy path.');
  await page.getByRole('tab', { name: 'Verify' }).press('Home');
  await expect(understand).toBeFocused();
  await understand.press('End');
  await expect(page.getByRole('tab', { name: 'Verify' })).toBeFocused();
  await page.getByRole('tab', { name: 'Verify' }).press('ArrowRight');
  await expect(understand).toBeFocused();
  const finalHeight = await page
    .locator('.notebook-panels')
    .evaluate((el) => el.getBoundingClientRect().height);
  expect(finalHeight).toBeCloseTo(panelHeight, 1);
});

test('image dialog, project disclosures and mobile menu are operable', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    await page.getByText('Menu', { exact: false }).first().click();
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Work', exact: true })
      .click();
    await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
  }
  const trigger = page.getByRole('button', { name: 'Enlarge the AutoMark lecturer dashboard' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.locator('#mediquery summary').click();
  await expect(page.locator('#mediquery')).toHaveAttribute('open', '');
  await expect(
    page.locator('#mediquery').getByRole('link', { name: 'View source code' }),
  ).toBeVisible();
});

test('responsive layout, legacy fragments and accessibility', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `horizontal overflow at ${width}px`,
    ).toBeTruthy();
  }
  for (const id of [
    'projects',
    'about',
    'experience',
    'collaborations',
    'education',
    'resume',
    'equityguard',
    'automark',
    'contact',
    'top',
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 900 });
  const mobileResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(mobileResults.violations).toEqual([]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await page.setViewportSize({ width: 390, height: 900 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    'text enlargement should not cause page overflow',
  ).toBeTruthy();
});

test('essential content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore what I’ve built' })).toBeVisible();
  await expect(page.locator('#automark')).toBeVisible();
  await page.locator('#mediquery summary').click();
  await expect(page.locator('#mediquery .archive-details')).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  await context.close();
});
