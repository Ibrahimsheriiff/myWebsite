# Phase 2B — EquityGuard engineering case study

Completed locally on `codex/portfolio-2-phase-1`, 27 November 2026. No commit, push, merge, deployment or external EquityGuard change.

## Result

`/work/equityguard/` is a directly exported static route about engineering a complete application around a model: React interaction, FastAPI requests/responses, custom Python orchestration, six registered tools and explicit verification limits.

The page adds a distinct research-publication composition, authentic React watchlist capture, source-grounded application drawing/control flow, accessible six-tool inspector and a 9/7/7 test inventory. Homepage has a prominent “Inside EquityGuard” link alongside GitHub. AutoMark links to “Next study: EquityGuard”; EquityGuard links to “Explore AutoMark”. No unfinished destination or simulation was introduced.

For source revision, attribution, detailed contracts, résumé reconciliation, test method and defects see [EquityGuard evidence](EQUITYGUARD_EVIDENCE.md). The reviewed revision is `6801099818177cb1aad758c7880dbb94901be129`.

## Architecture and privacy

- Next.js App Router, strict TypeScript, existing design tokens/fonts and `output: 'export'` remain. No new portfolio dependency or lockfile change. No backend, paid model, market feed or runtime external request is needed.
- `src/content/equityguard.ts` contains typed tool contracts, observed control flow and test inventory. Editorial presentation is a Server Component. Only the inspector is a new Client Component.
- The inspector uses tabs with click/tap, arrows, Home/End, visible focus and automatic activation on keyboard movement; selection never advances itself. Six overlaid panels reserve the largest contract's height. Inactive panels use `aria-hidden`, `visibility:hidden` and a negative tab index. No-JavaScript content uses six native disclosures.
- Client imports previously allowed an internal résumé path to enter browser bundles. The review split public identity/notebook data into `identity.ts` and AutoMark logical graph data into `automark-system.ts`; existing authoring modules re-export their public records. Provenance remains in server-authored content. No approved visual treatment changed because of this separation.
- Metadata, canonical, Article JSON-LD, genuine 1200 × 630 PNG social preview and sitemap entry are included.
- Internal reports, source archive, recovery patches, private trace data, configuration secrets and absolute local paths are absent from the static export. The privacy scan checks compiled JS as well as HTML/text files; it is not limited to visible page copy.

## Creative decisions

The cover has an edition line, asymmetric oversized headline and a ruled application-boundary drawing. Its hierarchy makes the full-stack ownership clear before the reader reaches the tool detail. This differs from AutoMark's product-led opening, achievement strip and selectable system map.

The product plate uses the genuine source interface rather than stock finance imagery. Its zero-value offline fixture caption is adjacent and explicit. The application ledger describes responsibilities and actual request/response relationships; it is not presented as a physical deployment topology. The forest strip explains control flow rather than replaying an agent run. Selecting a tool changes its contract sheet, not a fabricated trace.

The sandstone test section combines precise 9/7/7 counts with what the assertions establish. It uses no invented coverage percentages, market chart or CI badge. Serif appears selectively in the cover and reflections; the architecture, flow and boundary sections use sans-serif headings rather than repeating a two-line template everywhere.

## Rendered review and refinement

The first complete draft was captured at **1440, 1024, 768, 390 and 320px**, including normal-scale opening, architecture, inspector and evaluation sections. Draft captures remain under `artifacts/phase-2b/draft/`.

Observed problems and changes:

1. At 768px the cover and architecture sidebar became narrow and visually heavy. Moved these to a single reading column; retained the offset drawing where space permits. The 1024px reading composition remains two columns.
2. Native `hidden` interacted with Tailwind preflight, so the inspector initially changed height. Replaced that layout mechanism with an accessibility-hidden, invisible panel stack. Final heights are identical across all six selections at each reviewed width.
3. At 320px the model/tools label wrapped awkwardly and the cover headline crowded its edge. Refined its scale and put the small schematic below the label. At 390px a narrower schematic preserves the label on one line.
4. At 200% text size, intrinsic grid minima constrained the contract/test/boundary layouts. Added zero-minimum columns and one-column layouts at narrow effective widths; no horizontal overflow remains down to 320px.
5. The existing desktop navigation overflowed at an enlarged 768px viewport. Added a font-relative shared navigation container boundary. Normal desktop navigation retains its approved appearance.
6. Reviewed full-page rhythm and normal section captures after refinement, including the approved homepage EquityGuard section and AutoMark opening. The article alternates cover, product plate, responsibility ledger, forest loop, contract sheet and test inventory without copying AutoMark's map/chapter rhythm.

Final screenshot layout inventory: no document overflow at five widths. Inspector panel height is stable at 562.33 / 606.95 / 768.02 / 796.59 / 925.27px for 1440 / 1024 / 768 / 390 / 320px respectively. These are layout measurements, not performance metrics.

## Screenshots

All captures are in [the Phase 2B screenshot directory](../artifacts/phase-2b/screenshots/). The screenshot script retains five widths and all six selections.

| Deliverable                  | Capture                                                                                                                                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full desktop                 | [1440px full page](../artifacts/phase-2b/screenshots/equityguard-1440-full.png)                                                                                                                                                                                                        |
| Full mobile                  | [390px full page](../artifacts/phase-2b/screenshots/equityguard-390-full.png)                                                                                                                                                                                                          |
| Opening                      | [Desktop](../artifacts/phase-2b/screenshots/opening-1440.png), [mobile](../artifacts/phase-2b/screenshots/opening-390.png)                                                                                                                                                             |
| Architecture                 | [Desktop](../artifacts/phase-2b/screenshots/architecture-1440.png), [tablet](../artifacts/phase-2b/screenshots/architecture-768.png)                                                                                                                                                   |
| Tool inspector               | [Desktop](../artifacts/phase-2b/screenshots/tool-inspector-1440.png), [mobile](../artifacts/phase-2b/screenshots/tool-inspector-390.png)                                                                                                                                               |
| Evaluation                   | [Desktop](../artifacts/phase-2b/screenshots/evaluation-1440.png), [mobile](../artifacts/phase-2b/screenshots/evaluation-390.png)                                                                                                                                                       |
| Selected states              | [Technicals](../artifacts/phase-2b/screenshots/tool-2-1440.png), [news](../artifacts/phase-2b/screenshots/tool-3-1440.png), [vector boundary](../artifacts/phase-2b/screenshots/tool-6-1440.png), [keyboard focus](../artifacts/phase-2b/screenshots/inspector-keyboard-focus-390.png) |
| Updated homepage             | [Desktop](../artifacts/phase-2b/screenshots/homepage-1440-full.png), [mobile](../artifacts/phase-2b/screenshots/homepage-390-full.png), [targeted section](../artifacts/phase-2b/screenshots/homepage-section-1440.png)                                                                |
| AutoMark preservation review | [Opening](../artifacts/phase-2b/screenshots/automark-section-1440.png), [full page](../artifacts/phase-2b/screenshots/automark-1440-full.png)                                                                                                                                          |

Additional 1024/768/320px full pages and normal sections are named consistently in that directory. There are 61 final PNGs, including thirty selected-tool captures and a keyboard-focus state. The full mobile image is a long article capture; use normal-scale section files to judge type and spacing.

## Verification

- Production static build: passed; all three public routes exported directly with trailing-slash paths.
- ESLint: passed without warnings. Strict TypeScript: passed. Prettier: passed.
- Browser suite: **30/30 passed**, desktop Chromium and iPhone-emulated Chromium, including all existing homepage/AutoMark regressions and eight new EquityGuard executions. No runtime browser errors or external application requests in the new route/navigation check.
- Accessibility: zero Axe violations in tested desktop/mobile states against WCAG 2 A/AA, 2.1 AA and 2.2 AA rules. Reviewed selection/focus, contrast, semantic structure and reduced-motion behaviour. Automated checks are not a complete accessibility certification.
- Responsive: 1440/1024/768/390/320px; all six selections; enlarged 200% text at 1440/768/390/320px; no overflow. Stable panel checks, keyboard wrapping/Home/End, touch, native disclosures and no-JavaScript essentials passed.
- Shared regressions: notebook, navigation, image-dialog Escape/focus restoration, project disclosures, legacy section fragments, all ten AutoMark architecture states and current résumé access/retained alias passed.
- Assets/SEO: direct route, canonical, social PNG, Article author/URL, sitemap, responsive images and original image link passed. Current and retained résumé URLs match the authoritative PDF by SHA-256.
- Preservation: **9/9 original hashes unchanged**, including legacy root drafts, CSS/JS, images and old résumé. Authoritative source résumé and portfolio lockfile unchanged. Earlier recovery/artifact directories retained. Pre-existing dirty legacy work was not reset.
- Privacy: **43 exported text/code files scanned, zero flagged internal-source paths, report names, API-key configuration or private thought markers**. See [preservation/privacy results](../artifacts/phase-2b/preservation-privacy.json).
- External project: **23/23 source tests passed offline**, with 109/109 reviewed source files unchanged. No live evaluator, provider, model, vector model/store or external API was executed. This is separate from the portfolio's 30 browser tests.

### Lighthouse

Local production export; Lighthouse 13.6.0, simulated throttling. Targets are performance ≥90, LCP ≤2.5s, CLS ≤0.1; field INP target ≤200ms is not measurable here. Measured results from the final audit: [Machine-readable summary](../artifacts/phase-2b/performance-summary.json); full HTML/JSON reports are retained locally in `artifacts/phase-2b/audits/` and ignored by Git.

| Route / mode          | Performance | Accessibility | Best practices | SEO | LCP   | CLS | TBT   |
| --------------------- | ----------: | ------------: | -------------: | --: | ----- | --- | ----- |
| homepage / mobile     |         100 |           100 |            100 | 100 | 1.5 s | 0   | 30 ms |
| homepage / desktop    |         100 |           100 |            100 | 100 | 0.4 s | 0   | 80 ms |
| automark / mobile     |          99 |           100 |            100 | 100 | 1.7 s | 0   | 10 ms |
| automark / desktop    |          98 |           100 |            100 | 100 | 1.1 s | 0   | 0 ms  |
| equityguard / mobile  |         100 |           100 |            100 | 100 | 1.5 s | 0   | 10 ms |
| equityguard / desktop |         100 |           100 |            100 | 100 | 0.4 s | 0   | 0 ms  |

These laboratory measurements are not production guarantees, financial-system benchmarks or field INP evidence.

## Local preview

```sh
npm ci                 # only if portfolio dependencies are absent
npm run assets
npm run dev
# http://127.0.0.1:3000/work/equityguard/

npm run build
npm run preview
# http://127.0.0.1:4173/work/equityguard/
```

The preview serves `out/`; do not use `next start`. No EquityGuard Python environment, model key or database is needed. Stop a preview you start with Ctrl+C. The task-owned temporary review/preview servers were stopped after validation.

```sh
npm run lint
npm run typecheck
npm run format:check
npm test
# With exported preview running:
npm run screenshots:equityguard
npm run audit:equityguard
```

## File inventory

Created:

- `src/app/work/equityguard/page.tsx`, `equityguard.css`: metadata, article, composition and responsive rules.
- `src/components/equityguard-inspector.tsx`: progressively enhanced tool contracts.
- `src/content/equityguard.ts`: typed source-grounded public content.
- `src/content/identity.ts`, `automark-system.ts`: public browser data separated from provenance.
- `content-sources/equityguard/react-watchlist.png`: authentic source UI capture with offline fixtures.
- `public/assets/equityguard/` (original PNG + two generated WebPs), `public/equityguard-og.png`: static product/social assets.
- `scripts/capture-equityguard.mjs`, `tests/equityguard.spec.ts`: five-width/state captures and route/interaction/accessibility regression coverage.
- `docs/EQUITYGUARD_EVIDENCE.md`, this report; `artifacts/phase-2b/` (draft/final PNGs, layout/verification/performance summaries and ignored full audits).

Modified:

- Homepage and AutoMark page: only named project navigation; homepage stack omits LangChain as an implemented orchestration technology.
- `src/app/sitemap.ts`: case-study entry.
- `src/app/editorial.css`: targeted homepage link grouping and navigation reflow correction.
- `src/content/portfolio.ts`, `automark.ts`: pinned evidence/current tool-test distinctions; re-export public records from isolated modules.
- `src/components/site-controls.tsx`, `notebook.tsx`, `automark-explorer.tsx`: public-data import paths only; no interaction redesign.
- `scripts/prepare-assets.mjs`, `audit.mjs`: product/social image preparation and separate three-route audit mode.
- `tests/reconciliation.spec.ts`: résumé checks include EquityGuard.
- `package.json`: two reproducible scripts; `.gitignore`: Phase 2B full audit exclusion. No lockfile/dependency change.
- `AGENTS.md`, `README.md`, brief, design system, inventory and roadmap: persistent authoring/verification records.

Ignored local recovery/source-review environments, fixtures/capture harness and source-test outputs were created under `.local/`. OS `.DS_Store` changes are not implementation work and were not reset. Legacy originals, fonts, approved AutoMark CSS, existing source résumé and earlier reports were not edited.

## Candid assessment and remaining work

The cover, precise control-flow strip, contract inspector and test inventory give EquityGuard an individual identity while retaining the portfolio's type and colour system. The strongest result is that the visual interaction teaches real engineering boundaries without inventing a demonstration. The refined tablet/mobile layouts have a coherent reading order and no need for horizontal technical diagrams.

The product image is a genuine watchlist, not evidence of successful financial analysis. On mobile, its details require opening the original. A sanitised authentic results capture would add a stronger visual payoff once it can be obtained without publishing private reasoning. The inspector reserves some blank space for shorter contracts to keep selection stable; that is deliberate, but future editorial shortening could reduce its maximum height. The article remains denser than a recruiter summary; its opening facts and tool labels provide the shorter reading path. Adding more charts or a simulator would not improve this phase.

Remaining external evidence: operational retrieval with declared dependencies, production-function tests, mocked provider failures, API/tool-contract/end-to-end checks, and a verified remote CI result. Source résumé coverage language is broader than the inspected suite; that distinction remains explicit. No model accuracy, production safety, comprehensive validation or deployment performance is established. Future work should resolve those software boundaries before presenting a live Lab replay. No Deloitte, MediQuery or Returns case study was started.
