import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { validReplayRequest, validPublicResponse } from '../src/lib/lab/equity-replay';
const slugs = ['equityguard', 'mediquery', 'returns-agent', 'daita'];
test('public shape checks enforce only their declared structure', () => {
  expect(validReplayRequest({ ticker: '' })).toBe(true);
  expect(validReplayRequest({ ticker: 17 })).toBe(false);
  expect(validReplayRequest({})).toBe(false);
  expect(
    validPublicResponse({
      ticker: 'FICT',
      risk_score: null,
      risk_label: 'demo',
      explanation: 'prepared',
      tools_called: ['get_price_data'],
    }),
  ).toBe(true);
  expect(validPublicResponse({ ticker: 'FICT', risk_score: 'none' })).toBe(false);
});
test('complete collection routes, metadata, assets, schemas and navigation are local', async ({
  page,
  request,
}) => {
  const errors: string[] = [],
    external: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url());
  });
  for (const slug of slugs) {
    await page.goto(`/lab/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      `https://ibrahimsheriiff.com/lab/${slug}/`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `https://ibrahimsheriiff.com/lab-${slug}-og.png`,
    );
    expect((await request.get(`/lab-${slug}-og.png`)).status()).toBe(200);
    await expect(
      page.getByRole('navigation', { name: 'Other experiments' }).getByRole('link'),
    ).toHaveCount(4);
    const schema = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).find((t) => t.includes('WebApplication'))!;
    expect(JSON.parse(schema).url).toBe(`https://ibrahimsheriiff.com/lab/${slug}/`);
    const study = page.locator(`a[href="/work/${slug}/"]`).first();
    await study.click();
    await page.locator(`a[href="/lab/${slug}/"]`).first().click();
    await expect(page).toHaveURL(`/lab/${slug}/`);
  }
  await page.goto('/lab/');
  for (const slug of ['automark', ...slugs])
    await expect(page.locator(`a[href="/lab/${slug}/"]`).first()).toBeVisible();
  await expect(page.locator('main')).not.toContainText('PLANNED');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const slug of slugs) expect(sitemap).toContain(`/lab/${slug}/`);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
test('every new experiment supports enlarged text, reduced motion and no-JavaScript explanation', async ({
  page,
  browser,
}) => {
  for (const slug of slugs) {
    await page.goto(`/lab/${slug}/`);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto');
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${slug}/200%/${width}`,
      ).toBeTruthy();
    }
  }
  const c = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    }),
    p = await c.newPage();
  for (const slug of slugs) {
    await p.goto(`http://127.0.0.1:4173/lab/${slug}/`);
    await expect(p.locator('.lab-nojs')).toBeVisible();
    expect(await p.locator('.experiment-workspace button:enabled').count()).toBe(0);
    await expect(p.getByRole('heading', { level: 1 })).toBeVisible();
  }
  await c.close();
});
test('collection landing and significant error/review states meet accessibility checks', async ({
  page,
}) => {
  for (const route of ['/lab/', ...slugs.map((s) => `/lab/${s}/`)]) {
    await page.goto(route);
    if (route.includes('equityguard')) {
      await page.getByLabel('Replay scenario').selectOption('invalid');
      await page.getByRole('button', { name: 'Step event' }).click();
      await page.getByRole('button', { name: 'Step event' }).click();
    }
    if (route.includes('returns-agent')) {
      await page.getByLabel('Request scenario').selectOption('missing');
      await page.getByRole('button', { name: 'Next step', exact: true }).click();
      await page.getByRole('button', { name: 'Next step', exact: true }).click();
      await page.getByRole('button', { name: 'Supply details and resume' }).click();
    }
    if (route.includes('daita')) {
      await page.getByLabel('Amount column').selectOption('Value');
      await page.getByRole('button', { name: 'Q02', exact: false }).click();
      await page.getByLabel('Description correction').fill('Prepared subscription');
      await page.getByRole('button', { name: 'Confirm record review' }).click();
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
        route,
      ).toEqual([]);
    }
  }
});
test('new experiment bundles stay off the homepage and landing, including hover', async ({
  browser,
}) => {
  const c = await browser.newContext(),
    p = await c.newPage();
  let scripts: Promise<string>[] = [];
  p.on('response', (r) => {
    if (r.url().includes('/_next/') && r.url().includes('.js')) scripts.push(r.text());
  });
  for (const route of ['/', '/lab/']) {
    scripts = [];
    await p.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
    if (route === '/') await p.locator('#lab').scrollIntoViewIfNeeded();
    else for (const slug of slugs) await p.locator(`a[href="/lab/${slug}/"]`).first().hover();
    await p.waitForLoadState('networkidle');
    const text = (await Promise.all(scripts)).join('\n');
    for (const marker of [
      'Prepared success',
      'North bed notebook',
      'Invalid prepared input',
      'Fictional ledger A',
    ])
      expect(text).not.toContain(marker);
  }
  await c.close();
});
test('EquityGuard playback has one timer, rapid controls remain coherent and navigation cleans up', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-11-28T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-28T00:00:01Z'));
  await page.goto('/lab/equityguard/');
  await page.getByRole('button', { name: 'Start replay' }).click();
  for (let i = 0; i < 10; i++) {
    await page.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.getByRole('button', { name: 'Resume', exact: true }).click();
  }
  await page.clock.runFor(1200);
  await expect(page.locator('.eq-execution li')).toHaveCount(2);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.clock.runFor(6000);
  await expect(page.locator('.eq-execution li')).toHaveCount(2);
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await page.getByRole('link', { name: 'Back to the Engineering Lab', exact: true }).click();
  await page.clock.runFor(6000);
  await page.locator('a[href="/lab/equityguard/"]').first().click();
  await expect(page.locator('.eq-execution li')).toHaveCount(0);
});

test('touch and keyboard operate the four different workspaces with visible focus', async ({
  page,
}, info) => {
  const activate = async (name: string) => {
    const b = page.getByRole('button', { name, exact: true });
    if (info.project.name === 'mobile') await b.tap();
    else {
      await b.focus();
      await page.keyboard.press('Enter');
    }
  };
  await page.goto('/lab/equityguard/');
  await activate('Step event');
  await expect(page.locator('.eq-execution li')).toHaveCount(1);
  await page.keyboard.press('Tab');
  await page.getByRole('button', { name: 'Step event' }).focus();
  expect(
    await page
      .getByRole('button', { name: 'Step event' })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).toBe('solid');
  await page.goto('/lab/mediquery/');
  await activate('Select');
  await page.getByLabel('Similarity only').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByLabel('MMR', { exact: true })).toBeChecked();
  await page.goto('/lab/returns-agent/');
  await activate('Next step');
  await expect(page.getByRole('status')).toContainText('interpreted');
  await page.goto('/lab/daita/');
  await page.getByLabel('Amount column').selectOption('Value');
  const row = page.getByRole('button', { name: 'Q02', exact: false });
  if (info.project.name === 'mobile') await row.tap();
  else await row.click();
  await page.getByLabel('Description correction').fill('Prepared touch example');
  await page.getByRole('button', { name: 'Confirm record review' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('1 reviewed');
});

test('EquityGuard interval is replaced once and removed on tab hiding and navigation', async ({
  page,
}) => {
  await page.goto('/lab/equityguard/');
  await page.evaluate(() => {
    const active = new Set<number>(),
      set = window.setInterval.bind(window),
      clear = window.clearInterval.bind(window);
    Object.assign(window, {
      setInterval: (handler: TimerHandler, delay?: number, ...args: unknown[]) => {
        const id = set(handler, delay, ...args);
        if ([600, 1200].includes(delay ?? 0)) active.add(id);
        return id;
      },
      clearInterval: (id?: number) => {
        active.delete(id ?? -1);
        clear(id);
      },
      equityTimerCount: () => active.size,
    });
  });
  const count = () =>
    page.evaluate(() =>
      (window as unknown as { equityTimerCount: () => number }).equityTimerCount(),
    );
  await page.getByRole('button', { name: 'Start replay' }).click();
  await expect.poll(count).toBe(1);
  await page.getByLabel('Playback pace').selectOption('2');
  await expect.poll(count).toBe(1);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(count).toBe(0);
  await page.evaluate(() => {
    delete (document as unknown as { hidden?: boolean }).hidden;
  });
  await page.getByRole('button', { name: 'Resume', exact: true }).click();
  await expect.poll(count).toBe(1);
  await page.getByRole('link', { name: 'Back to the Engineering Lab', exact: true }).click();
  await expect.poll(count).toBe(0);
});
