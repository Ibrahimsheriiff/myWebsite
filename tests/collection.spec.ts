import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  retrievalDocuments as docs,
  retrievalQuery as query,
} from '../src/content/retrieval-fixtures';
import { cosineSimilarity, mmrSelect, similaritySelect } from '../src/lib/retrieval';
import { initialPolicyInput } from '../src/content/policy-fixtures';
import { evaluateDemoPolicy as decide } from '../src/lib/demo-policy';

test('synthetic MMR computes deterministic scores, ties and weighting boundaries', () => {
  const snapshot = structuredClone(docs);
  expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1);
  expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1);
  expect(() => cosineSimilarity([0, 0], [1, 0])).toThrow(RangeError);
  expect(() => cosineSimilarity([1], [1, 0])).toThrow(RangeError);
  expect(() => cosineSimilarity([NaN, 1], [1, 0])).toThrow(RangeError);
  const ids = (s: ReturnType<typeof mmrSelect>) => s.map((d) => d.id);
  expect(ids(similaritySelect(docs, query, 3))).toEqual(['A', 'B', 'C']);
  expect(ids(mmrSelect(docs, query, 3, 0.5))).toEqual(['A', 'D', 'B']);
  expect(ids(mmrSelect(docs, query, 3, 0))).toEqual(['A', 'E', 'D']);
  expect(ids(mmrSelect(docs, query, 3, 1))).toEqual(['A', 'B', 'C']);
  const balanced = mmrSelect(docs, query, 3, 0.5);
  expect(balanced[1].score).toBeCloseTo(
    0.5 * balanced[1].similarity - 0.5 * balanced[1].redundancy,
    10,
  );
  const tied = [
    { id: 'Z', vector: [1, 0] },
    { id: 'A', vector: [1, 0] },
    { id: 'B', vector: [1, 0] },
  ];
  expect(ids(mmrSelect(tied, query, 3, 0.5))).toEqual(['Z', 'A', 'B']);
  expect(ids(similaritySelect(tied, query, 3))).toEqual(['Z', 'A', 'B']);
  expect(mmrSelect(docs, query, 0, 0.5)).toEqual([]);
  expect(mmrSelect(docs, query, 99, 0.5)).toHaveLength(5);
  expect(() => mmrSelect(docs, query, 3, -0.1)).toThrow(RangeError);
  expect(() => mmrSelect(docs, query, 1.5, 0.5)).toThrow(RangeError);
  expect(mmrSelect(docs, query, 3, 0.5)).toEqual(mmrSelect(docs, query, 3, 0.5));
  expect(docs).toEqual(snapshot);
});

test('fictional policy covers every rule and its numerical boundaries without mutating input', () => {
  const base = { ...initialPolicyInput };
  expect(decide(base).rule).toBe('E');
  for (const days of ['0', '21']) expect(decide({ ...base, days }).code).toBe('RETURN_PATH');
  for (const days of ['22', '365']) expect(decide({ ...base, days }).rule).toBe('C');
  for (const days of ['', '-1', '1.5', '366', 'not a number'])
    expect(decide({ ...base, days }).code).toBe('CHECK_INPUT');
  expect(decide({ ...base, reference: '  ' }).rule).toBe('A');
  expect(decide({ ...base, condition: 'damaged', days: '200' }).rule).toBe('B');
  expect(decide({ ...base, condition: 'opened' }).rule).toBe('D');
  expect(decide({ ...base, condition: 'opened', days: '22' }).rule).toBe('C');
  expect(decide({ ...base, reference: '', days: '' }).rule).toBe('V');
  expect(base).toEqual(initialPolicyInput);
});

test('new static routes have metadata, original assets, résumé access and complete study discovery', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url());
  });
  for (const slug of ['mediquery', 'returns-agent']) {
    await page.goto(`/work/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://ibrahimsheriiff.com/work/${slug}/`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `https://ibrahimsheriiff.com/${slug}-og.png`,
    );
    const article = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').allTextContents()).find((s) =>
        s.includes('"Article"'),
      )!,
    );
    expect(article.mainEntityOfPage).toBe(`https://ibrahimsheriiff.com/work/${slug}/`);
    expect((await request.get(`/${slug}-og.png`)).status()).toBe(200);
    await expect(
      page.getByRole('navigation', { name: 'Other case studies' }).getByRole('link'),
    ).toHaveCount(4);
    await expect(
      page.getByRole('link', { name: 'Résumé PDF', exact: true }).last(),
    ).toHaveAttribute('href', '/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf');
  }
  expect((await request.get('/assets/mediquery/landing-offline.png')).status()).toBe(200);
  expect((await request.get('/assets/mediquery/landing-1000.webp')).status()).toBe(200);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/work/mediquery/');
  expect(sitemap).toContain('/work/returns-agent/');
  for (const slug of ['automark', 'equityguard', 'daita']) {
    await page.goto(`/work/${slug}/`);
    await expect(
      page.getByRole('navigation', { name: 'Other case studies' }).getByRole('link'),
    ).toHaveCount(4);
  }
  await page.goto('/');
  for (const name of ['MediQuery', 'Returns Agent']) {
    const link = page.getByRole('link', { name: `Read the ${name} study` });
    await page
      .locator(name === 'MediQuery' ? '#mediquery summary' : '#returns-agent summary')
      .click();
    await link.click();
    await expect(page).toHaveURL(
      name === 'MediQuery' ? '/work/mediquery/' : '/work/returns-agent/',
    );
    await page.goto('/');
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('retrieval supports native keyboard/touch controls and actual MMR boundary states', async ({
  page,
}, info) => {
  await page.goto('/work/mediquery/#retrieval');
  await expect(page.locator('.re-selection')).toContainText('A → B → C');
  if (info.project.name === 'mobile') await page.getByLabel('MMR', { exact: true }).tap();
  else {
    await page.getByLabel('Similarity only').focus();
    await page.keyboard.press('ArrowRight');
  }
  await expect(page.locator('.re-selection')).toContainText('A → D → B');
  const weight = page.getByLabel('Relevance weight λ');
  await weight.focus();
  await page.keyboard.press('Home');
  await expect(weight).toHaveValue('0');
  await expect(page.locator('.re-selection')).toContainText('A → E → D');
  await page.keyboard.press('End');
  await expect(weight).toHaveValue('1');
  await expect(page.locator('.re-selection')).toContainText('A → B → C');
  await page.getByText('The calculation, in plain sight').click();
  await expect(page.locator('.re-math')).toContainText('Exact ties retain fixture order');
  await page.getByLabel('Similarity only').check();
  await expect(weight).toBeDisabled();
});

test('policy input, rule, explanation and reset reflect every relevant state', async ({
  page,
}, info) => {
  await page.goto('/work/returns-agent/#policy-playground');
  const result = page.locator('.pp-result');
  await expect(result).toContainText('RETURN_PATH');
  await page.getByRole('button', { name: 'At 21 days' }).click();
  await expect(page.getByLabel('Days since delivery')).toHaveValue('21');
  await expect(result).toContainText('RETURN_PATH');
  await page.getByLabel('Days since delivery').fill('22');
  await expect(result).toContainText('OUTSIDE_DEMO_WINDOW');
  if (info.project.name === 'mobile')
    await page.getByRole('button', { name: 'Needs a person' }).tap();
  else await page.getByRole('button', { name: 'Needs a person' }).click();
  await expect(result).toContainText('HUMAN_REVIEW');
  await page.getByRole('button', { name: 'Missing reference' }).click();
  await expect(result).toContainText('REQUEST_DETAILS');
  await page.getByLabel('Days since delivery').fill('');
  await expect(result).toContainText('CHECK_INPUT');
  await page.getByRole('button', { name: 'Reset example' }).click();
  await page.getByLabel('Item condition').selectOption('opened');
  await expect(result).toContainText('HUMAN_REVIEW');
  await expect(result.locator('.pp-rule-id')).toHaveText('Rule D · Inspect opened items');
  await page.getByRole('button', { name: 'Reset example' }).click();
  await expect(result).toContainText('RETURN_PATH');
  await expect(page.getByLabel('Reference', { exact: true })).toHaveValue('DEMO-42');
  await page.getByText('The fictional rules, in priority order').click();
  await expect(page.locator('.pp-rules li')).toHaveCount(6);
});

test('both compact articles reflow and pass automated accessibility in meaningful states', async ({
  page,
}) => {
  for (const slug of ['mediquery', 'returns-agent']) {
    await page.goto(`/work/${slug}/`);
    if (slug === 'mediquery') await page.getByLabel('MMR', { exact: true }).check();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${slug}/${width}`,
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
    await page.emulateMedia({ reducedMotion: 'reduce' });
    if (slug === 'returns-agent')
      expect(
        await page
          .locator('.pp-presets button')
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
        `${slug} 200%/${width}`,
      ).toBeTruthy();
    }
  }
});

test('both articles retain essential explanations and demonstration summaries without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const p = await context.newPage();
  await p.goto('http://127.0.0.1:4173/work/mediquery/');
  await expect(p.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(p.locator('.re-fallback')).toContainText('A, D, B');
  await expect(p.getByRole('table')).toBeVisible();
  await p.goto('http://127.0.0.1:4173/work/returns-agent/');
  await expect(p.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(p.locator('.pp-rules li')).toHaveCount(6);
  await expect(p.locator('.pp-rules li').last()).toBeVisible();
  await expect(p.locator('.pp-result')).toContainText('RETURN_PATH');
  await expect(
    p.getByRole('navigation', { name: 'Other case studies' }).getByRole('link'),
  ).toHaveCount(4);
  await context.close();
});
