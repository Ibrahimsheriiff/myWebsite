# Phase 2A — AutoMark flagship case study

Historical report. Current professional content, architecture and measurements are documented in [Phase 2A.1 reconciliation](PHASE_2A1_RECONCILIATION.md); do not treat older source limitations as current.
Completed locally on 27 November 2026 on `codex/portfolio-2-phase-1`. No commit, push, merge or deployment. The approved homepage remains intact apart from its prominent AutoMark case-study link and the shared navigation/image options required by the article.

## Result

The static route `/work/automark/` now contains seven chapters: the problem, individual ownership, system architecture, engineering decisions, the Docker-volume demonstration reflection, verification/results and looking back. It is written for a recruiter to understand the contribution and for an engineer to explore the system's relationships.

The opening establishes Backend Lead, WSU team capstone, July–November 2025 and the core stack. An authentic lecturer-dashboard product plate and editorial achievement strip follow. First-person contribution is distinguished from collective delivery. The article retains 97/100, 200 concurrent submissions tested, 43 API endpoints and the best-project nomination, with their user-confirmed status recorded internally.

The case study has a chapter index, original-image enlargement, plain-language terminology disclosure, routes back to selected work, contact and résumé access. No unfinished project links, source-code destinations, Lab controls or fabricated execution traces were added.

## Architecture and authoring

Next.js App Router still produces a complete static export in `out/`, including `out/work/automark/index.html`. The route can be visited directly through an ordinary static HTTP server. No rewrite-to-homepage dependency, production server, API key or runtime external request is required.

`src/content/automark.ts` contains typed article copy, contribution/decision records, component notes, connections and internal evidence. The page uses Server Components for its editorial composition and existing typography. MDX and a diagram framework were unnecessary; no dependencies or lockfile changed.

`AutoMarkExplorer` is the only new Client Component. Eight selectable components show purpose, technology, inputs, outputs, engineering boundaries and neighbouring components. The map distinguishes:

- Browser → FastAPI → database/result-file access.
- SVN submission → post-commit hook/poller → worker → Docker execution.
- Marker scripts fetched by the worker and output files written by the sandbox.

Marker-script storage and submission/output volumes are grouped under one illustrated node for readability, with that grouping explained in its note. The drawing does not introduce an undocumented message broker, worker-to-API connection or AWS placement.

Native buttons support pointer, touch, Tab, arrows, Home and End. Up/down follows the current two- or four-column layout. Selected components and their neighbours receive distinct emphasis; related wires become clearer. Explanation panels reserve the tallest content height, so switching components does not move the page. No automatic selection or simulated grading occurs. A separate server-rendered HTML fallback exposes every component explanation when JavaScript is disabled.

Shared navigation can link from the article back to homepage fragments without changing homepage behaviour. The dashboard retains its full original in the native dialog and through a direct image link. The article's near-fold product image is eagerly loaded with appropriate priority and responsive sizing; the homepage keeps its original lazy-loading default.

Route-specific canonical, description, Article structured data, Open Graph/Twitter metadata, a real 1200×630 PNG social image and a sitemap entry are included. The shared favicon, Person schema and original asset URLs remain available.

## Design rationale and rendered iteration

The article extends The Curious Engineer rather than introducing a new theme. Large sans-serif type and Instrument Serif establish the opening. Sage frames the genuine product; the dark forest architecture chapter creates a technical change of atmosphere; ruled editorial rows explain decisions; sandstone gives the demonstration reflection its own pace. Reading columns are constrained while the image and system map use the full composition width.

The first complete export was captured at 1440, 1280, 1024, 768, 390 and 320px before refinement. Both full-page rhythm and normal-size sections were inspected. The following observed issues were corrected:

1. Desktop wire directions were hard to read because endpoints disappeared beneath nodes. Connection endpoints and arrowheads now sit in the gaps, with separate submission and application paths.
2. Mobile needed explicit neighbour relationships after the wire drawing was removed. Every selected note now names its connected components; two-column controls retain readable labels.
3. The narrowest layout exposed a lane label overlapping controls. The label now follows the actual submission group instead of a fixed vertical coordinate.
4. The first no-JavaScript fallback did not expose all notes reliably. It was replaced with complete readable fallback sections and verified in a JavaScript-disabled browser context.
5. Testing every selection found panel-height changes that a simple first/last check missed. Overlapping grid panels now reserve the maximum height for all eight notes; all selections are tested.
6. Enlarged text overflowed the rotated demonstration annotation. It now uses a narrower-screen composition, appropriate text wrapping and constrained type. Selected-note text aligns to the top rather than stretching vertical spacing.
7. The return-to-work action now uses the portfolio's existing primary-action styling. The authentic product image receives priority suitable to its position in the article.

First-render captures remain privately in `.local/phase-2a-first-render/`. Final captures are separate in `artifacts/phase-2a/`. The approved Phase 1B screenshot baseline is retained.

## Screenshots and interaction examples

- [Updated full desktop homepage](../artifacts/phase-2a/homepage-full-1440.png)
- [Full desktop case study, 1440px](../artifacts/phase-2a/automark-full-1440.png)
- [Full mobile case study, 390px](../artifacts/phase-2a/automark-full-390.png)
- [Full tablet case study, 768px](../artifacts/phase-2a/automark-full-768.png)
- [Desktop opening](../artifacts/phase-2a/opening-1440.png) · [Product and achievements](../artifacts/phase-2a/product-1440.png)
- [Desktop architecture](../artifacts/phase-2a/architecture-1440.png) · [Mobile architecture](../artifacts/phase-2a/architecture-390.png) · [320px architecture](../artifacts/phase-2a/architecture-320.png)
- [FastAPI selected with related connections](../artifacts/phase-2a/architecture-api-selected.png)
- [Docker selected through keyboard navigation, visible focus](../artifacts/phase-2a/architecture-keyboard-sandbox.png)

Full pages and individual opening, product, architecture, decisions and demonstration-reflection captures exist at all six review widths. [Layout measurements](../artifacts/phase-2a/measurements.json) record the document width, article height and explanation-panel height.

To try the interaction: select FastAPI to see its application connections; select the worker to inspect job coordination; press End to reach the sandbox, Home for the browser, and arrows to move through the responsive map. Tab remains available for every component. Selection is always manual. The image dialog closes with Escape and restores focus to its trigger.

## Validation

| Check                     | Final result                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Production build          | Pass; homepage and AutoMark prerendered as static pages                                                            |
| ESLint                    | Pass, no warnings                                                                                                  |
| Strict TypeScript         | Pass                                                                                                               |
| Formatting and whitespace | Pass                                                                                                               |
| Playwright                | **18/18 passed**, desktop Chromium and emulated mobile touch                                                       |
| Automated accessibility   | No Axe violations in tested homepage/article desktop and mobile views                                              |
| Responsive overflow       | Pass at 1440, 1280, 1024, 768, 390 and 320px                                                                       |
| Enlarged text             | 200% root-font checks pass at 390px                                                                                |
| Reduced motion            | Pass; transitions disabled and smooth scrolling removed                                                            |
| No JavaScript             | Essential article and all eight component notes remain readable                                                    |
| Static navigation         | Direct article route, homepage link/back links, chapters, résumé, image sources, social image and sitemap verified |
| Original preservation     | **9/9** original hashes match; dependency lockfile unchanged                                                       |

The suite retains all ten homepage tests and adds eight case-study tests across two browser projects. It checks every explorer selection for stable height, keyboard movement, touch operation, dialog Escape/focus return, direct export access, metadata and local assets. Rendered review additionally checks line breaks, contrast, focus visibility, label readability and page rhythm.

These are Chromium/emulation and automated-accessibility results, not a claim of complete WCAG certification or physical-device coverage. Browser/OS zoom combinations beyond the tested root-font enlargement remain release-preparation work.

## Production Lighthouse

Final results are recorded in [the Phase 2A measurement summary](../artifacts/phase-2a/performance-summary.json). Lighthouse 13.6.0 measured the local exported homepage and article with mobile simulated throttling and the desktop configuration. Raw HTML/JSON reports are retained locally in ignored `artifacts/phase-2a/audits/`.

Final run: 27 November 2026, approximately 02:50 Sydney time.

| Route / mode       | Performance | Accessibility | Best practices | SEO | LCP  | CLS | TBT  |
| ------------------ | ----------- | ------------- | -------------- | --- | ---- | --- | ---- |
| Homepage / mobile  | 100         | 100           | 100            | 100 | 1.5s | 0   | 20ms |
| Homepage / desktop | 100         | 100           | 100            | 100 | 0.3s | 0   | 0ms  |
| AutoMark / mobile  | 99          | 100           | 100            | 100 | 1.7s | 0   | 10ms |
| AutoMark / desktop | 98          | 100           | 100            | 100 | 1.1s | 0   | 0ms  |

Targets remain performance ≥90, LCP ≤2.5s and CLS ≤0.1. These are laboratory results, not field measurements; INP was not measured. The final run is reported directly rather than selecting the highest score from earlier iterations.

## Preservation and evidence

A 71-file recovery snapshot was captured before implementation at ignored `.local/recovery/pre-phase-2a.zip`, with SHA-256 inventory `.local/recovery/phase-2a-manifest.json` and the existing binary working-tree diff. Original legacy files, the untracked HTML draft, résumé and images remain untouched. Finder metadata changes are unrelated to application work and were not reset. Earlier recovery snapshots remain available.

Read [the claim-level AutoMark evidence inventory](AUTOMARK_EVIDENCE.md) for source links, fingerprints and unresolved claims. The current résumé and original architecture support the technical narrative, but this was not an AutoMark source-code audit. Connected searches found no additional accessible AutoMark/grading/capstone repository.

The authoritative graduate résumé is still needed. The current résumé does not establish an AutoMark AWS deployment; cloud components remain unresolved pending authoritative material, not permanently excluded. Supporting achievement documents, endpoint inventory and concurrency methodology remain pending. The Docker-volume story preserves the supplied experience without invented commands, causes, logs or timelines. No fabricated benchmarks or time savings appear.

## Created and modified files

| File / group                                                                                       | Change                                                                                           |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/app/work/automark/page.tsx`                                                                   | New seven-chapter static article and route metadata                                              |
| `src/app/work/automark/automark.css`                                                               | New bespoke article, map, reading and responsive compositions                                    |
| `src/content/automark.ts`                                                                          | New typed narrative, system records and evidence references                                      |
| `src/components/automark-explorer.tsx`                                                             | New accessible component selection and readable fallback                                         |
| `src/app/page.tsx`, `src/content/portfolio.ts`                                                     | Targeted working AutoMark case-study link                                                        |
| `src/components/site-controls.tsx`                                                                 | Homepage-fragment navigation option and article image priority/sizing option; defaults preserved |
| `src/app/editorial.css`                                                                            | Spacing for the homepage case-study link                                                         |
| `src/app/sitemap.ts`                                                                               | Article entry                                                                                    |
| `scripts/prepare-assets.mjs`, `public/automark-og.png`                                             | Generate the route's real social-preview image                                                   |
| `scripts/capture-automark.mjs`                                                                     | New six-width captures and selected/focus examples                                               |
| `scripts/audit.mjs`                                                                                | Separate two-route Phase 2A measurement output                                                   |
| `tests/automark.spec.ts`                                                                           | New article, interaction, static-route, no-JavaScript and accessibility coverage                 |
| `package.json`, `.gitignore`                                                                       | Capture/audit commands and ignored raw audits; no dependencies changed                           |
| `docs/AUTOMARK_EVIDENCE.md`, `docs/PHASE_2A_REPORT.md`                                             | New evidence record and this report                                                              |
| `AGENTS.md`, `README.md`, portfolio brief, design system, inventory, roadmap and historical report | Persistent guidance and current-phase links                                                      |
| `artifacts/phase-2a/`                                                                              | Final screenshots, dimensions and Lighthouse summary                                             |

Generated `out/`, build caches, private recovery data and raw audits remain ignored. Earlier original files and the package lockfile were not changed.

## Local preview

```sh
npm run dev
# http://127.0.0.1:3000/work/automark/

npm run build
npm run preview
# http://127.0.0.1:4173/work/automark/
```

Use `npm run preview` for the actual export; `next start` is not appropriate for this project. With the preview running, `npm run screenshots:automark` regenerates captures and `npm run audit:automark` measures both routes. `npm test` can start or reuse the static preview. Stop a manually started server with Ctrl+C. The owned review server is stopped at handoff.

## Candid self-assessment

The page is strongest where authentic evidence and explanation meet: the wide dashboard, visible backend ownership, two-path system model and grounded demonstration reflection. The chapter environments change the reading rhythm without copying the homepage's section layouts. It feels like an engineering article rather than a project-card expansion.

The mobile article is deliberately substantial and requires scrolling. Its chapter index helps readers choose a depth; the architecture controls remain readable, though their spatial relationships are richer on desktop. Reserving the tallest component note prevents jumps but leaves some spare space beneath shorter explanations at 320px. That is a conscious stability trade-off, and could be revisited with real reader feedback.

The biggest technical-storytelling constraint is missing source material. Detailed job lifecycle, exact concurrency methodology, failure behaviour and infrastructure decisions cannot responsibly be reconstructed from one architecture image. The article explains what is established and invites useful questions rather than inventing depth. A higher-resolution authentic product capture, shareable code and test records would improve the next revision more than decorative interaction. The supplied login image was preserved but omitted because it adds less engineering value than the dashboard.

No independent design score is claimed for this case study. Physical-device and additional-browser review remain worthwhile before release. EquityGuard/Deloitte case studies and working Lab simulations have not been started.
