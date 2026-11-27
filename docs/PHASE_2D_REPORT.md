# Phase 2D — complete, compact case-study collection

Completed locally on `codex/portfolio-2-phase-1`, 27 November 2026. No commit, push, merge, deployment or external repository change. All five primary case studies are now implemented. The full Engineering Lab remains out of scope.

## DAITA prerequisite

Before new implementation, rebuilt the approved site and reran ESLint, strict TypeScript, formatting and the entire **40/40 established regression suite**. DAITA’s stage transformations, review correction, responsive/enlarged-text layouts, no-JavaScript content and accessibility checks passed. No outstanding regression was found. Its previous report and screenshots remain retained under Phase 2C.

A pre-edit snapshot captured **106 source/config/document/asset files plus a binary working-tree patch** in ignored `.local/recovery/pre-phase-2d.zip`; `phase-2d-manifest.json` records hashes. Earlier recoveries and artifacts remain. Existing dirty legacy files were preserved.

## What was built

- `/work/mediquery/`: serif-led scientific notebook, authentic unchanged React landing capture, concise source pipeline, deterministic Retrieval Explorer, precise citation boundary and reflection.
- `/work/returns-agent/`: forest opening, source-grounded workflow, fictional Policy Playground, test-evidence ledger and concise reflection.
- Working study links inside the existing homepage project disclosures, alongside verified GitHub links. The approved closed-row composition is preserved.
- Small native inline “More systems” links connect all five completed studies from every article. No large navigation feature, unfinished destination or global redesign.
- Route-specific metadata, canonical, Article JSON-LD, original social PNGs and sitemap entries for both routes.

Each new page has an opening and four substantive sections. At 1440px the final articles are approximately 3.6k and 3.3k pixels tall, substantially shorter than the retained AutoMark full-page capture. These are portfolio layout measurements, not project-performance claims. Technical details are grouped into responsibilities rather than expanded into separate chapters.

## Source revisions and real external outcomes

| Project       | Reviewed revision                                       | Verification                                                                                                                                                                  |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MediQuery     | `2d68d497ac46bd4f4129b7e5d93f4629418a3415`, 4 June 2026 | Four API tests passed under explicit vector/ingestion/generation service doubles. No real embedding, store, ingestion or model run. 43 source files unchanged.                |
| Returns Agent | `d61617e6b6b554294a27a781b468bcab0427fd29`, 2 July 2026 | 19 collected: 16 passed offline with deterministic injected models, 3 live-model tests skipped. Original graph/policy functions were not replaced. 28 source files unchanged. |

[Detailed MediQuery evidence](MEDIQUERY_EVIDENCE.md) and [Returns evidence/confidentiality](RETURNS_AGENT_EVIDENCE.md) record source paths, exact configuration, test method and limitations. [Sanitised external-test summary](../artifacts/phase-2d/source-test-summary.json). Raw JUnit files remain private because source test names/data can expose assessment scenarios.

The authoritative résumé was reread completely. MediQuery’s full-stack/PubMed/BioBERT/MMR claims are reconciled with code. The Returns résumé’s **13-test accomplishment remains a historical baseline**, separate from the current 19 collected and actual 16/3 outcome. No anecdotal retrieval improvement, latency, accuracy, production adoption, private trace or original company policy is published.

## Design and rendered iteration

The first complete pages were captured at **1440, 1024, 768, 390 and 320px**, including normal-scale openings, interactions and technical sections. Drafts remain under `artifacts/phase-2d/draft/`. Final captures repeat all widths and meaningful states.

MediQuery uses an ivory research opening, selective italic emphasis, an authentic product plate, sage source pipeline and a mathematical notebook. Returns uses a forest opening/responsibility strip, ruled graph explanation, a structured input/result sheet and a quiet test ledger. Neither copies the flagship map, contract inspector or document workbench. Shared CSS provides reading scale, not a repeated article template.

Actual findings and refinements:

1. Nearby synthetic A/B vectors produced overlapping plot labels. Kept their true vector positions, reduced point markers and introduced separated leader labels. Increased label size for mobile and moved the query annotation clear of the cluster. The equivalent HTML table/selection order remains authoritative and accessible.
2. Two Returns section headings took disproportionate space. Shortened them to “Policy owns the decision.” and “What the tests cover.” This reduced empty heading height and kept the article compact.
3. The 320px / 200% text check exposed a small MediQuery overflow. Allowed long technical words/captions to wrap, removed intrinsic grid minima and constrained narrow score-table columns without clipping overflow.
4. Rechecked normal-scale 768px/tablet diagrams and 390/320px interactions, complete desktop/mobile reading rhythm, product-image legibility and footer discovery. Phones stack plot/table and form/result; enlarged text retains readable labels and controls.
5. Corrected test/capture discovery selectors to open native project disclosures before locating their links. The website links themselves were present; no broken destination or permission flow was introduced.

The source caption explains that MediQuery’s image is an actual initial UI captured offline, with no generated answer. Existing source screenshots containing generated medical recommendations were inspected but not republished. Returns has source-grounded logical linework rather than a fabricated conversation or dashboard.

## Demonstration logic

### Retrieval Explorer

`retrieval-fixtures.ts` supplies five fictional document labels and synthetic 2D vectors. `retrieval.ts` computes cosine similarity and greedy MMR. First seed: most query-similar document. Subsequent score: `λ × query similarity − (1 − λ) × maximum similarity to selected`. Exact ties preserve fixture order. k=3. Similarity → A/B/C; MMR at .5 → A/D/B; λ=0 → A/E/D; λ=1 → A/B/C.

The native radio group/range changes actual calculated selections, visible points, table ranks and explanation. A disclosure exposes calculation terms. No-JavaScript HTML includes both computed comparison summaries. The plot is explicitly not actual BioBERT space. Scores do not measure evidence quality or answer correctness. The complete ingestion-to-generation replay is not implemented.

### Policy Playground

New fictional rules accept a reference, whole delivery age and item condition. Validation/missing information precede explicit fictional rule branches. A newly authored 21-day window and sealed/opened/damaged grouping produce a deterministic result with an applicable rule and explanation. This does not reproduce original assessment policy, customer fixtures, return rights or an authorised order action.

The labelled native fields and three small presets allow boundary/missing/person-review exploration; reset restores the original fixture. Rules are readable in priority order, including without JavaScript. No LLM interpretation, live lookup, private reasoning or comprehensive execution replay is required.

## Verification

- Production build: passed, homepage and all five articles exported directly as static routes. Existing Next.js App Router, strict TypeScript and local fonts/tokens retained.
- ESLint: passed, no warnings. TypeScript and formatting: passed. No portfolio dependency or lockfile change.
- Full portfolio suite: **54/54 passed** in desktop Chromium and iPhone-emulated Chromium. Existing 40 checks retained; 14 new executions cover mathematical/policy assertions, routes, interaction, discovery, accessibility and no-JavaScript summaries.
- MMR assertions: cosine same/orthogonal/opposite directions, invalid/zero vectors, deterministic selection, exact ties, weighting endpoints, score arithmetic, zero/oversized k, invalid k/weight and fixture immutability.
- Policy assertions: all six rule branches, rule priority, 0/21/22/365 boundaries, blank/negative/decimal/invalid ages, missing reference and immutable input. Browser checks cover edits, presets, explanations, conditions and reset.
- Responsive: both routes at 1440/1024/768/390/320px; enlarged 200% text at 1440/768/390/320px; no horizontal document overflow. Keyboard/touch, range Home/End, native radio navigation, focus and reduced-motion checks pass.
- Accessibility: zero Axe violations in tested desktop/mobile states against WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags. Semantic HTML, visible focus, contrast, synthetic labels and plot/table equivalents reviewed manually. This is not complete WCAG certification.
- Static/SEO: direct routes, canonical, Article URL, social PNGs, source image/derivative, sitemap and four other-study destinations from every article verified. No browser page errors or runtime external application requests in the new route/navigation checks.
- Résumé: all six public pages use the current PDF; current and retained v4 URL bytes match the authoritative source. Original old source PDF untouched.
- Preservation/privacy: **9/9 original hashes unchanged**. Lockfile, authoritative résumé, global base CSS, all three flagship route CSS files and DAITA demonstration code/fixtures unchanged. Export scan: **63 text/code files, zero flagged internal source paths, provenance, credentials, original assessment identifiers or private-thought markers**. See [results](../artifacts/phase-2d/preservation-privacy.json).
- External outcomes above are separate from portfolio tests. No paid calls, model downloads, remote traces or external source modifications.

### Performance

Target performance ≥90, LCP ≤2.5s, CLS ≤0.1. Field INP target ≤200ms is not measured here. Final Lighthouse 13.6.0 runs use the local production export with simulated throttling, after browser capture/tests finish; results are laboratory measurements, not production guarantees.

| Route         | Performance mobile / desktop | LCP mobile / desktop | CLS mobile / desktop |
| ------------- | ---------------------------- | -------------------- | -------------------- |
| homepage      | 96 / 100                     | 1.5 s / 0.3 s        | 0 / 0                |
| automark      | 98 / 98                      | 1.8 s / 1.2 s        | 0 / 0                |
| equityguard   | 99 / 100                     | 1.7 s / 0.4 s        | 0 / 0                |
| daita         | 100 / 100                    | 1.5 s / 0.4 s        | 0 / 0                |
| mediquery     | 100 / 99                     | 1.4 s / 1.0 s        | 0 / 0                |
| returns-agent | 100 / 100                    | 1.4 s / 0.3 s        | 0 / 0                |

Accessibility, best practices and SEO scored **100 in all 12 measurements**. All six routes met the stated performance, LCP and CLS targets in this local run. Field INP remains unmeasured.

[Machine-readable performance summary](../artifacts/phase-2d/performance-summary.json). Full HTML/JSON audits remain in ignored `artifacts/phase-2d/audits/`; all previous phase measurements remain separately retained.

[Machine-readable verification summary](../artifacts/phase-2d/verification-summary.json).

## Screenshots

[Final screenshot directory](../artifacts/phase-2d/screenshots/) contains 87 PNGs and includes five widths of both full pages, openings/interactions/evidence, three MMR weights, five policy states, the rule sheet and updated homepage discovery. Original drafts remain separate.

| Deliverable                   | Capture                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MediQuery full desktop/mobile | [1440px](../artifacts/phase-2d/screenshots/mediquery-1440-full.png), [390px](../artifacts/phase-2d/screenshots/mediquery-390-full.png)                                                                                                                                                                                                                                                                                                    |
| Returns full desktop/mobile   | [1440px](../artifacts/phase-2d/screenshots/returns-agent-1440-full.png), [390px](../artifacts/phase-2d/screenshots/returns-agent-390-full.png)                                                                                                                                                                                                                                                                                            |
| MediQuery opening / retrieval | [Opening](../artifacts/phase-2d/screenshots/mediquery-opening-1440.png), [explorer](../artifacts/phase-2d/screenshots/mediquery-interaction-1440.png), [mobile](../artifacts/phase-2d/screenshots/mediquery-interaction-390.png)                                                                                                                                                                                                          |
| MMR selected states           | [Balanced](../artifacts/phase-2d/screenshots/mmr-balanced-1440.png), [diversity](../artifacts/phase-2d/screenshots/mmr-diversity-1440.png), [relevance](../artifacts/phase-2d/screenshots/mmr-relevance-1440.png)                                                                                                                                                                                                                         |
| Returns opening / policy      | [Opening](../artifacts/phase-2d/screenshots/returns-agent-opening-1440.png), [playground](../artifacts/phase-2d/screenshots/returns-agent-interaction-1440.png), [mobile](../artifacts/phase-2d/screenshots/returns-agent-interaction-390.png)                                                                                                                                                                                            |
| Policy selected states        | [Missing](../artifacts/phase-2d/screenshots/policy-missing-1440.png), [invalid](../artifacts/phase-2d/screenshots/policy-invalid-1440.png), [person review](../artifacts/phase-2d/screenshots/policy-damaged-1440.png), [opened](../artifacts/phase-2d/screenshots/policy-opened-1440.png), [outside window](../artifacts/phase-2d/screenshots/policy-outside-1440.png), [rules](../artifacts/phase-2d/screenshots/policy-rules-1440.png) |
| Homepage discovery            | [Desktop](../artifacts/phase-2d/screenshots/homepage-discovery-1440.png), [mobile](../artifacts/phase-2d/screenshots/homepage-discovery-390.png)                                                                                                                                                                                                                                                                                          |

Equivalent 1024/768/320px state files use the same naming pattern. Inspect normal-scale sections for detailed typography; full mobile captures are long images.

## Local commands

```sh
npm ci                 # only if dependencies are absent
npm run assets
npm run dev
# http://127.0.0.1:3000/work/mediquery/
# http://127.0.0.1:3000/work/returns-agent/

npm run build
npm run preview
# Same routes on http://127.0.0.1:4173

npm run lint
npm run typecheck
npm run format:check
npm test
# With exported preview running:
npm run screenshots:collection
npm run audit:collection
```

Preview serves `out/`; do not use `next start`. Original project runtimes, credentials and databases are not required. Stop a preview you start with Ctrl+C. Task-owned UI/portfolio preview servers were stopped after final verification.

## Created / modified files

Created:

- Two route pages: `src/app/work/mediquery/page.tsx`, `returns-agent/page.tsx`; compact route styling in `src/app/work/compact.css`.
- Client interactions: `src/components/retrieval-explorer.tsx`, `policy-playground.tsx`.
- Public data: `src/content/retrieval-fixtures.ts`, `policy-fixtures.ts`, `compact-studies.ts`, `case-studies.ts`.
- Pure functions: `src/lib/retrieval.ts`, `demo-policy.ts`; public metadata/schema helper `study-metadata.ts`.
- Native footer index: `src/components/case-study-links.tsx`.
- `content-sources/mediquery/landing-offline.png`; generated original/derivative under `public/assets/mediquery/`; two original social PNGs.
- `tests/collection.spec.ts`, `scripts/capture-collection.mjs`.
- `docs/MEDIQUERY_EVIDENCE.md`, `RETURNS_AGENT_EVIDENCE.md`, this report; Phase 2D screenshots/layout/source-test/privacy/verification/performance artifacts.

Modified:

- `src/app/page.tsx`, `src/content/portfolio.ts`: two disclosure study links, pinned evidence/current test wording; GitHub destinations retained.
- Three flagship pages: footer index only. Their article CSS/compositions/interactions remain unchanged.
- `src/app/editorial.css`: inline study/footer link layout only; `sitemap.ts`: two entries.
- `scripts/prepare-assets.mjs`, `audit.mjs`: authentic image/social preparation and separate six-route audit mode.
- `tests/reconciliation.spec.ts`: current résumé checks include both new routes.
- `package.json`: capture/audit commands only; `.gitignore`: ignored audit directory. No dependency/lockfile change.
- AGENTS, README, brief, design system, inventory and roadmap: current authoring/evidence/verification state.

Read-only source archives, isolated Python/frontend environments, original JUnit, capture/test harnesses and recovery snapshots stay ignored under `.local/`. Original root drafts, CSS/JS/images/old résumé and prior reports were not edited.

## Candid assessment and remaining work

Both studies are recognisably part of the same portfolio and meaningfully smaller than the flagships. The scientific selection comparison and structured policy sheet teach different engineering ideas. The strongest result is the visible link between actual deterministic calculations and plain-language explanations, with evidence limitations kept precise.

MediQuery’s authentic landing capture is modest product evidence; it does not demonstrate successful generation. A sanitised research-results capture and measured citation/retrieval evaluation would strengthen it. The 2D plot intentionally prioritises explanation; its HTML comparison is more informative than pretending to show real high-dimensional geometry. Returns has source-grounded workflow evidence and a successful offline graph suite, but no live product conversation or hosted trace is presented. Operational reliability still needs broader failure testing and service verification.

The next iteration should improve those evidence gaps before adding more article length or simulations. The ingestion-to-generation replay, agent execution replay and full Engineering Lab remain future work. Five primary case studies are complete without those later experiences.
