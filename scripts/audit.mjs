import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const phase3b = process.argv.includes('--phase-3b');
const phase3a = process.argv.includes('--phase-3a');
const phase2d = process.argv.includes('--phase-2d');
const phase2c = process.argv.includes('--phase-2c');
const phase2b = process.argv.includes('--phase-2b');
const phase1b = process.argv.includes('--phase-1b');
const phase2a1 = process.argv.includes('--phase-2a1');
const phase2a =
  process.argv.includes('--phase-2a') ||
  phase2a1 ||
  phase2b ||
  phase2c ||
  phase2d ||
  phase3a ||
  phase3b;
const reportDirectory = phase3b
  ? 'artifacts/phase-3b/audits'
  : phase3a
    ? 'artifacts/phase-3a/audits'
    : phase2d
      ? 'artifacts/phase-2d/audits'
      : phase2c
        ? 'artifacts/phase-2c/audits'
        : phase2b
          ? 'artifacts/phase-2b/audits'
          : phase2a1
            ? 'artifacts/phase-2a1/audits'
            : phase2a
              ? 'artifacts/phase-2a/audits'
              : phase1b
                ? 'artifacts/phase-1b/audits'
                : 'artifacts/audits';
const summaryPath = phase3b
  ? 'artifacts/phase-3b/performance-summary.json'
  : phase3a
    ? 'artifacts/phase-3a/performance-summary.json'
    : phase2d
      ? 'artifacts/phase-2d/performance-summary.json'
      : phase2c
        ? 'artifacts/phase-2c/performance-summary.json'
        : phase2b
          ? 'artifacts/phase-2b/performance-summary.json'
          : phase2a1
            ? 'artifacts/phase-2a1/performance-summary.json'
            : phase2a
              ? 'artifacts/phase-2a/performance-summary.json'
              : phase1b
                ? 'artifacts/phase-1b/performance-summary.json'
                : 'artifacts/performance-summary.json';
await mkdir(reportDirectory, { recursive: true });
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless', '--no-sandbox'],
  logLevel: 'silent',
});
const summary = {};
try {
  for (const [route, pathname] of phase3b
    ? [
        ['homepage', '/'],
        ...['automark', 'equityguard', 'mediquery', 'returns-agent', 'daita'].map((s) => [
          s,
          `/work/${s}/`,
        ]),
        ['lab', '/lab/'],
        ...['automark', 'equityguard', 'mediquery', 'returns-agent', 'daita'].map((s) => [
          `lab-${s}`,
          `/lab/${s}/`,
        ]),
      ]
    : phase3a
      ? [
          ['homepage', '/'],
          ['automark', '/work/automark/'],
          ['equityguard', '/work/equityguard/'],
          ['daita', '/work/daita/'],
          ['mediquery', '/work/mediquery/'],
          ['returns-agent', '/work/returns-agent/'],
          ['lab', '/lab/'],
          ['lab-automark', '/lab/automark/'],
        ]
      : phase2d
        ? [
            ['homepage', '/'],
            ['automark', '/work/automark/'],
            ['equityguard', '/work/equityguard/'],
            ['daita', '/work/daita/'],
            ['mediquery', '/work/mediquery/'],
            ['returns-agent', '/work/returns-agent/'],
          ]
        : phase2c
          ? [
              ['homepage', '/'],
              ['automark', '/work/automark/'],
              ['equityguard', '/work/equityguard/'],
              ['daita', '/work/daita/'],
            ]
          : phase2b
            ? [
                ['homepage', '/'],
                ['automark', '/work/automark/'],
                ['equityguard', '/work/equityguard/'],
              ]
            : phase2a
              ? [
                  ['homepage', '/'],
                  ['automark', '/work/automark/'],
                ]
              : [['homepage', '/']]) {
    const routeSummary = {};
    for (const mode of ['mobile', 'desktop']) {
      const result = await lighthouse(
        `http://127.0.0.1:4173${pathname}`,
        {
          port: chrome.port,
          output: ['json', 'html'],
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        },
        mode === 'desktop' ? desktopConfig : undefined,
      );
      if (!result) throw new Error('Lighthouse returned no result');
      const filename = phase2a ? `${route}-${mode}` : mode;
      await writeFile(`${reportDirectory}/${filename}.json`, result.report[0]);
      await writeFile(`${reportDirectory}/${filename}.html`, result.report[1]);
      routeSummary[mode] = {
        measuredAt: result.lhr.fetchTime,
        lighthouseVersion: result.lhr.lighthouseVersion,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round((value.score ?? 0) * 100),
          ]),
        ),
        lcp: result.lhr.audits['largest-contentful-paint'].displayValue,
        cls: result.lhr.audits['cumulative-layout-shift'].displayValue,
        totalBlockingTime: result.lhr.audits['total-blocking-time'].displayValue,
        notes:
          'Local production static export. Simulated throttling; not field data. INP was not measured.',
      };
      console.log(route, mode, routeSummary[mode]);
    }
    if (phase2a) summary[route] = routeSummary;
    else Object.assign(summary, routeSummary);
  }
  await writeFile(summaryPath, JSON.stringify(summary, null, 2) + '\n');
} finally {
  await chrome.kill();
}
