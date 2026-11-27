import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

test('current résumé and retained public alias serve the authoritative PDF', async ({
  page,
  request,
}) => {
  const source = await readFile('content-sources/resume/IBRAHIM_RESUME_Graduate.pdf');
  const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  for (const url of [
    '/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf',
    '/assets/resume/Ibrahim%20Sharif%20Resume%20v4.pdf',
  ]) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect(digest(await response.body())).toBe(digest(source));
  }
  for (const route of [
    '/',
    '/work/automark/',
    '/work/equityguard/',
    '/work/daita/',
    '/work/mediquery/',
    '/work/returns-agent/',
    '/lab/',
    '/lab/automark/',
    '/lab/equityguard/',
    '/lab/mediquery/',
    '/lab/returns-agent/',
    '/lab/daita/',
  ]) {
    await page.goto(route);
    const downloads = page.locator('a[href$=".pdf"]');
    expect(await downloads.count()).toBeGreaterThan(0);
    for (const href of await downloads.evaluateAll((links) =>
      links.map((a) => a.getAttribute('href')),
    ))
      expect(href).toBe('/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf');
    expect(
      await page.locator('script[type="application/ld+json"]').allTextContents(),
    ).toContainEqual(expect.stringContaining('https://www.linkedin.com/in/ibrahim-sharif-au'));
  }
  await page.goto('/');
  await expect(page.locator('#daita')).toContainText('Pydantic');
  await expect(page.locator('#daita')).toContainText('ATO rules');
  await expect(page.locator('#daita')).not.toContainText('Streamlit');
  await expect(page.locator('#about')).toContainText('January 2026');
  await page.goto('/work/automark/');
  await expect(page.locator('#benchmark')).toContainText('18.17');
  await expect(page.locator('#benchmark')).toContainText('155');
  await expect(page.locator('#benchmark')).toContainText('157');
});

test('every component selection preserves routing, label clearance and panel stability', async ({
  page,
}) => {
  await page.goto('/work/automark/#system');
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    const controls = page.locator('.system-node');
    const panel = page.locator('.architecture-panel');
    const height = await panel.evaluate((el) => el.getBoundingClientRect().height);
    for (let index = 0; index < 10; index++) {
      await controls.nth(index).click();
      await expect(controls.nth(index)).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('.system-node[aria-pressed="true"]')).toHaveCount(1);
      expect(
        await panel.evaluate((el) => el.getBoundingClientRect().height),
        `panel stability ${width}/${index}`,
      ).toBeCloseTo(height, 1);
    }
    if (width <= 600) {
      await expect(page.locator('.reconciled-wires')).not.toBeVisible();
      await expect(page.locator('.component-connections').last()).toBeVisible();
      continue;
    }
    const collisions = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll('.system-node')].map((el) =>
        el.getBoundingClientRect(),
      );
      const labels = [...document.querySelectorAll('.map-connection text')].map((el) => ({
        name: el.textContent,
        box: el.getBoundingClientRect(),
      }));
      const overlap = (a: DOMRect, b: DOMRect) =>
        a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      const problems: string[] = [];
      labels.forEach((a, i) => {
        if (nodes.some((node) => overlap(a.box, node))) problems.push(`label/node: ${a.name}`);
        labels.slice(i + 1).forEach((b) => {
          if (overlap(a.box, b.box)) problems.push(`labels: ${a.name}/${b.name}`);
        });
      });
      document.querySelectorAll<SVGPathElement>('.map-connection>path').forEach((path) => {
        const length = path.getTotalLength(),
          matrix = path.getScreenCTM()!;
        for (let at = 0; at <= length; at += 4) {
          const point = path.getPointAtLength(at);
          const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
          if (
            nodes.some(
              (node) =>
                screen.x > node.left + 1 &&
                screen.x < node.right - 1 &&
                screen.y > node.top + 1 &&
                screen.y < node.bottom - 1,
            )
          ) {
            problems.push(`wire/node: ${path.parentElement?.getAttribute('data-edge')}`);
            break;
          }
        }
      });
      return problems;
    });
    expect(collisions, `diagram clearance at ${width}`).toEqual([]);
    await controls.nth(0).click();
    await expect(page.locator('[data-edge="svn-hook"]')).toHaveAttribute('data-related', 'true');
    await controls.nth(3).click();
    await expect(page.locator('[data-edge="queue-worker"]')).toHaveAttribute(
      'data-related',
      'true',
    );
    await expect(page.locator('[data-edge="svn-hook"]')).toHaveAttribute('data-related', 'false');
  }
});
