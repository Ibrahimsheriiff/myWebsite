# Phase 1 — implementation and design review

Historical report. Current professional content, architecture and measurements are documented in [Phase 2A.1 reconciliation](PHASE_2A1_RECONCILIATION.md); do not treat older source limitations as current.
Historical Phase 1 baseline. For the current refinement and its separate before/after captures and measurements, see [Phase 1B design review](PHASE_1B_DESIGN_REVIEW.md).

The AutoMark case study is delivered separately in [Phase 2A](PHASE_2A_REPORT.md), with its own evidence inventory, captures and two-route measurements.

Completed locally on 26 November 2026, on `codex/portfolio-2-phase-1`. Nothing was committed, pushed, merged or deployed.

## Repository audit and preservation

The original site is a static root `index.html`, one stylesheet and one JavaScript file. It has no package manifest, build tooling, tests, checked-in deployment configuration or existing AGENTS instructions. It contains three AutoMark images and a résumé. The live domain responds behind Cloudflare; the origin hosting configuration cannot be established from this checkout. Do not infer a deployment provider from the response headers.

The initial working tree had modified `index.html`, `assets/css/styles.css`, `assets/js/main.js` and an untracked `ibrahim-portfolio-seo-content.html`. All remain untouched. Nine original files, including those drafts, project images and résumé, were captured in `.local/recovery/pre-phase-1.zip`. The archive also contains the pre-existing binary Git diff. `.local/recovery/manifest.json` records SHA-256 hashes; final verification matched **9/9 files**. Recovery files are ignored and must remain private.

Reusable material: project descriptions, genuine AutoMark imagery, résumé and contact details, the idea of an architecture map and image enlargement. The new implementation replaces the old interaction code with accessible React/native controls. The old cursor particles, animated gradients, magnetic buttons and glitch effects are not loaded by the new site. Original functionality and files remain available as legacy source.

The old draft misidentifies the AutoMark dashboard as EquityGuard. The new attribution is grounded in the image itself. The full LinkedIn path from the résumé replaces the shortened, unsupported URL in the draft.

## Architecture and implementation

Next.js App Router with strict TypeScript, Tailwind and CSS tokens. The application is mostly build-time Server Components and exports complete static files to `out/`. Client Components are limited to the notebook, native navigation disclosure, image dialog and Sydney clock. No production server, database, API key, live GitHub request or paid model call is required.

Content, editorial paragraphs and internal evidence references live in `src/content/portfolio.ts`. Essential professional content is present in initial HTML. There are no unfinished case-study routes or fake Lab launch controls. Existing fragments and original asset URLs remain available. Static responsive WebP images, self-hosted licensed fonts, metadata, Person schema, social preview, icon, sitemap and robots file are included.

Implemented: four-stage interactive hero notebook; individually composed AutoMark, EquityGuard and Deloitte presentations; four secondary project disclosures; personal introduction and ongoing KafelaOS note; dark Lab architecture preview; email, professional links and résumé; responsive navigation; keyboard-accessible image enlargement; local Sydney time with daylight-saving handling.

## Design rationale and rendered iteration

The hero combines an expressive serif phrase with direct sans-serif typography and an irregular, drawn notebook. Pointer, touch and keyboard selection reveal the engineering approach without timed progression or invented system activity. The notebook is an introduction, not a gate to professional information.

AutoMark uses a sage environment, authentic interface imagery and contextual achievements. EquityGuard uses a more open radial agent/tool composition. Deloitte uses a quieter sandstone document-to-rules workflow. The About section changes rhythm again, while the dark forest Lab creates a clear transition into an engineering workspace. No portrait or travel photography has been fabricated.

The first production render was inspected at desktop, tablet and mobile sizes. Actual refinements included:

- Raised body copy to 16px and technical metadata to a readable minimum; strengthened secondary contrast.
- Reworked tablet layouts instead of compressing desktop columns: wider project imagery, separately composed agent architecture and a different About layout.
- Stabilised notebook panels using overlapping grid areas, so stage changes do not resize the sheet.
- Corrected agent labels and centre alignment as the illustration changes size.
- Made the capstone seal scale with enlarged text; verified 200% text without page overflow.
- Improved architecture connections and differentiated validation, queue, execution and persistence symbols.
- Reframed hero screenshots to include navigation and margins; corrected capture-time exposure of an off-screen skip link.

The final full-page desktop, tablet and mobile images and individual hero, featured-work and Lab images were visually inspected. Draft captures remain locally in ignored `.local/design-draft/`.

## Validation results

| Check                        | Result                                                                |
| ---------------------------- | --------------------------------------------------------------------- |
| `npm run build`              | Pass; homepage, 404, robots and sitemap statically generated          |
| `npm run lint`               | Pass; no warnings or errors                                           |
| `npm run typecheck`          | Pass                                                                  |
| `npm run format:check`       | Pass                                                                  |
| `npm test`                   | **10/10 passed**, desktop Chromium and touch-emulated mobile Chromium |
| Axe WCAG-tagged checks       | No detected violations at 1440px and 390px                            |
| Responsive overflow          | Pass at 320, 390, 768 and 1440px; 200% root text at 390px             |
| Original source/asset hashes | **9/9 unchanged**                                                     |

Browser scenarios cover notebook pointer/touch/arrow/Home/End operation and stable panels; native modal opening, Escape and focus return; mobile navigation; archive disclosures; local assets and résumé; legacy fragments; reduced motion; console/network errors; and essential content with JavaScript disabled. Native modal-dialog semantics provide background inertness and focus containment. The static preview serves a real 404 page for missing paths.

Final Lighthouse 13.6.0 measurements, 26 November 2026 at approximately 16:04 Sydney time, against the production static export:

| Metric                   | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| Performance              | 100    | 100     |
| Accessibility            | 100    | 100     |
| Best practices           | 100    | 100     |
| SEO                      | 100    | 100     |
| Largest Contentful Paint | 1.2s   | 0.3s    |
| Cumulative Layout Shift  | 0      | 0       |
| Total Blocking Time      | 30ms   | 0ms     |

These are local lab measurements under Lighthouse's simulated throttling, not deployed or field data. INP was not measured. Automated accessibility scores are not a claim of complete WCAG certification. Physical devices, Safari/Firefox and screen-reader testing remain release-preparation work. Local validation used Node 25.8.2; CI is configured for Node 22 but has not run remotely.

Machine-readable results: [`performance-summary.json`](../artifacts/performance-summary.json). Full local Lighthouse HTML/JSON reports are in ignored `artifacts/audits/`.

## Screenshots

- [Full desktop, 1440px](../artifacts/screenshots/desktop-full.png)
- [Full mobile, 390px](../artifacts/screenshots/mobile-full.png)
- [Full tablet, 768px](../artifacts/screenshots/tablet-full.png)
- [Desktop hero](../artifacts/screenshots/hero-desktop.png) / [mobile hero](../artifacts/screenshots/hero-mobile.png)
- [Desktop featured work](../artifacts/screenshots/featured-work-desktop.png) / [mobile featured work](../artifacts/screenshots/featured-work-mobile.png)
- [Desktop Lab](../artifacts/screenshots/engineering-lab-desktop.png) / [mobile Lab](../artifacts/screenshots/engineering-lab-mobile.png)
- [EquityGuard composition](../artifacts/screenshots/equityguard-desktop.png) / [About composition](../artifacts/screenshots/about-desktop.png)

## Local preview and repeatable checks

```sh
npm ci
npm run assets
npm run dev
```

Development: `http://127.0.0.1:3000`. For the already generated production export:

```sh
npm run build
npm run preview
```

Static preview: `http://127.0.0.1:4173`. Stop with Ctrl+C. Preview processes started during implementation are stopped at handoff; restart with the command above.

Run `npx playwright install chromium` once, then `npm test`. With the static preview running, `npm run screenshots` refreshes screenshots and `npm run audit` repeats Lighthouse. These tools may require permission to launch local browsers outside a restricted sandbox. `npm run format:check` checks only new source/configuration/docs and deliberately excludes preserved legacy files.

## Created and modified files

**Modified existing file:** `.gitignore`, to exclude local recovery files, dependencies, build/test output and raw audit reports. Existing HTML/CSS/JS modifications visible in Git status predate this implementation and were not rewritten.

**New application files:**

- `src/app/page.tsx`, `layout.tsx`, `globals.css`, `not-found.tsx`, `robots.ts`, `sitemap.ts`.
- `src/components/notebook.tsx`, `site-controls.tsx`; `src/content/portfolio.ts`.
- `src/app/fonts/`: six local WOFF2 files and three OFL licence files.
- `public/assets/`: preserved copies of original images, résumé and legacy CSS/JS; two responsive AutoMark WebP derivatives. `public/icon.svg` and `public/og-image.png`.

**New tooling and configuration:**

- `package.json`, `package-lock.json`, `tsconfig.json`, generated `next-env.d.ts`.
- `next.config.mjs`, `postcss.config.mjs`, `eslint.config.mjs`, `playwright.config.ts`.
- `.prettierrc.json`, `.prettierignore`, `.github/workflows/quality.yml`.
- `scripts/prepare-assets.mjs`, `preview.mjs`, `capture.mjs`, `audit.mjs`.
- `tests/portfolio.spec.ts`.

**New documentation and deliverables:**

- `AGENTS.md`, `README.md`.
- `docs/PORTFOLIO_BRIEF.md`, `DESIGN_SYSTEM.md`, `CONTENT_INVENTORY.md`, `IMPLEMENTATION_ROADMAP.md`, this report.
- Eleven screenshot PNGs in `artifacts/screenshots/` and `artifacts/performance-summary.json`.

## Remaining evidence, limitations and Phase 2

The four AutoMark achievements are deliberately published as user-confirmed, with documentary verification pending in the internal inventory. Obtain the authoritative graduate résumé, result and nomination records, endpoint/concurrency documentation and permission-cleared case-study materials. KafelaOS is ongoing and currently supported by the supplied brief; Local ChatGPT remains unpublished pending source material. Deloitte is correctly presented as a collaboration, with no confidential policies or client material added.

**Design self-assessment:** the notebook gives the homepage an identifiable focal point, the featured projects have distinct rhythms, and mobile layouts retain readable copy and meaningful diagrams. The main opportunity for the next iteration is richer authentic evidence: a fresher AutoMark interface capture without browser chrome, actual EquityGuard interface imagery, and short first-person notes grounded in project records. The existing dashboard is authentic but its source capture contains browser chrome and small interface text; the enlargement control makes the full original available. Optional real personal photography could add another human dimension, but the current composition is designed to work without it.

Phase 2 should begin with AutoMark's dedicated engineering article, explaining contribution, architecture, constraints, failure handling, concurrency test methodology and the demonstration story. Follow with EquityGuard and Deloitte. Keep the homepage selective, use real source material, and introduce additional authoring/diagram dependencies only when the case-study work requires them.
