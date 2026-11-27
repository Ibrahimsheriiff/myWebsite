# Phase 2C — DAITA engineering case study

Completed locally on `codex/portfolio-2-phase-1`, 27 November 2026. No commit, push, merge, deployment or external repository change.

## Implementation

`/work/daita/` is a directly accessible static-export route. It explains DAITA as a WSU university-industry collaboration with Deloitte Australia stakeholders, March–June 2025. Personal contributions are separated from team outcomes: FastAPI/Pydantic application functionality, pandas document processing and a versioned Python tax knowledge engine. No employment, endorsement, production adoption, tax accuracy or efficiency metric is implied.

The page preserves “Less manual review. A clearer workflow.” It adds a conceptual document spread, concise business/ownership narrative, meaningful fictional Document Processing Workbench, conceptual review worksheet and human-oversight explanation. The homepage has “Inside DAITA”; EquityGuard links to “Next study: DAITA”; DAITA links to both completed studies by name. No unfinished destination or full Lab simulation was created.

The current graduate résumé was read in full, alongside current portfolio notes and both approved case studies. The accessible related public Streamlit prototype was reviewed at pinned revision `7f2a73986cda6cf3bd423f5d816e4becb0340d40`; it does not establish the current application architecture. See [source/evidence/confidentiality report](DAITA_EVIDENCE.md) for detailed reconciliation, source references and unknowns. Its narrower implementation was not substituted for the authoritative professional source.

## Architecture and fictional demonstration

Next.js App Router, strict TypeScript, static export, existing fonts/tokens and build-time article content remain. No portfolio dependency or lockfile change. No backend, uploads, database, paid model, financial feed or original DAITA runtime is required.

- `src/content/daita.ts`: typed editorial contribution content.
- `src/content/daita-fixtures.ts`: five fictional records, explicit per-source column mappings, stage copy and two visitor-selectable review categories. No internal provenance.
- `src/lib/daita-workbench.ts`: pure mapping, unambiguous date parsing, integer-cent AUD parsing, normalisation, required-field checks, possible-repeat detection and review preparation.
- `src/components/daita-workbench.tsx`: small Client Component for five explicitly selected stages, record inspection, R05 category correction/confirmation and reset. No automatic advancement or invented processing activity.
- Server-authored page: conceptual artwork, semantic narrative, route metadata, canonical, Article JSON-LD. Sitemap and original 1200 × 630 social PNG included.

The same R01–R05 identifiers remain visible at every stage. R02 demonstrates aliases, whitespace and date/amount formatting; R03 is a possible repeat of R01; R04 lacks a required description; R05 permits a local General supplies → Equipment review correction. Held rows are retained and excluded from fictional category preparation. A visitor confirmation changes only this illustration, not a tax claim or source application. No real ATO reference, confidence score, deduction decision or original-project report is generated.

Desktop/tablet uses an accessible table. Phones use labelled record lists, preserving meaningful field labels instead of shrinking a spreadsheet. Native step buttons, Previous/Next, inspect controls, a labelled select, status messages and visible focus support keyboard and touch. Text annotations supplement colour. Without JavaScript, five native disclosures and prepared outcomes remain available. See the evidence report for complete data/algorithm limitations.

## Design decisions and actual iteration

DAITA uses a wide sandstone opening and document-to-document composition rather than AutoMark’s product/achievement/map treatment or EquityGuard’s agent/contract layout. Ruled sheets, meaningful field labels and restrained annotations connect the subject matter to the visual language. There are no Deloitte logos, branded endorsement cues, generic dashboard cards or fabricated product screens. The knowledge section uses a quiet conceptual worksheet rather than another architecture explorer. Existing homepage and case-study designs remain intact apart from the requested links.

The first complete draft was captured at **1440, 1024, 768, 390 and 320px**, with normal-scale opening, workbench states, human review and closing. Approved-page baseline captures and original draft captures are retained in `artifacts/phase-2c/baseline/` and `draft/`.

Rendered findings and refinements:

1. The narrow opening spent too much vertical space on stacked document fields. Tightened document rows and type, preserving readable content and the source-to-review relationship; enlarged text still switches fields to one column.
2. Desktop normalisation highlights were clearer than mobile. Added explicit mobile original-value notes, whitespace annotations and matching desktop change markers. Raw whitespace is displayed faithfully. R03’s amount formatting change is now marked too.
3. Contribution heading scale and the workbench’s minimum intro height added unnecessary empty space. Reduced both and removed a repetitive closing paragraph about unavailable materials; evidence limitations remain in this report and the inventory.
4. At 768px, a full five-record list was readable but unnecessarily long. Compared an actual browser-rendered compact-table variant, confirmed no overflow and retained the table at intermediate effective widths. Phones keep the record-list composition.
5. Reviewed final normal-scale opening at desktop/tablet/mobile, mapping and confirmed-review states, knowledge/human-review sections and closing. No labels overlap or horizontal document overflow was concealed.

The result stays focused: one illustration and one real fictional interaction, with no second long architecture diagram, invented metric strip or full application reproduction.

## Screenshots

There are **72 final PNGs** under [screenshots](../artifacts/phase-2c/screenshots/), covering five widths, five stages, exception inspection, confirmed correction and updated homepage sections.

| Deliverable                            | File                                                                                                                                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Full desktop                           | [1440px full page](../artifacts/phase-2c/screenshots/daita-1440-full.png)                                                                                                                                          |
| Full mobile                            | [390px full page](../artifacts/phase-2c/screenshots/daita-390-full.png)                                                                                                                                            |
| Opening                                | [Desktop](../artifacts/phase-2c/screenshots/opening-1440.png), [mobile](../artifacts/phase-2c/screenshots/opening-390.png)                                                                                         |
| Document composition                   | [Desktop](../artifacts/phase-2c/screenshots/documents-1440.png), [mobile](../artifacts/phase-2c/screenshots/documents-390.png)                                                                                     |
| Stage 1 / raw                          | [Desktop](../artifacts/phase-2c/screenshots/workbench-1-1440.png)                                                                                                                                                  |
| Stage 2 / mapped and normalised        | [Desktop](../artifacts/phase-2c/screenshots/workbench-2-1440.png), [mobile](../artifacts/phase-2c/screenshots/workbench-2-390.png)                                                                                 |
| Stage 3 / validation and repeat checks | [Desktop](../artifacts/phase-2c/screenshots/workbench-3-1440.png)                                                                                                                                                  |
| Stage 4 / review preparation           | [Desktop](../artifacts/phase-2c/screenshots/workbench-4-1440.png)                                                                                                                                                  |
| Stage 5 / human review                 | [Desktop](../artifacts/phase-2c/screenshots/workbench-5-1440.png)                                                                                                                                                  |
| Invalid-record explanation             | [Mobile](../artifacts/phase-2c/screenshots/invalid-record-390.png)                                                                                                                                                 |
| Confirmed correction                   | [Desktop](../artifacts/phase-2c/screenshots/review-confirmed-1440.png), [tablet](../artifacts/phase-2c/screenshots/review-confirmed-768.png), [mobile](../artifacts/phase-2c/screenshots/review-confirmed-390.png) |
| Human oversight / closing              | [Human review](../artifacts/phase-2c/screenshots/human-review-1440.png), [closing](../artifacts/phase-2c/screenshots/closing-1440.png)                                                                             |
| Updated homepage DAITA                 | [Desktop](../artifacts/phase-2c/screenshots/homepage-daita-1440.png), [mobile](../artifacts/phase-2c/screenshots/homepage-daita-390.png)                                                                           |

Every state also has 1024/768/320px captures with the same naming pattern. Use individual captures at normal scale to assess text; the full mobile article is intentionally a long image.

## Verification results

- Production build: passed, all four completed routes statically exported with direct trailing-slash access.
- ESLint: passed, zero warnings. Strict TypeScript: passed. Formatting: passed.
- Full established browser suite: **40/40 passed** in desktop Chromium and iPhone-emulated Chromium. Thirty previous checks remain; ten new executions include pure transformation assertions and DAITA route, interaction, accessibility and no-JavaScript checks. These are portfolio tests, not tests of the original DAITA application.
- Pure assertions verify source mapping, ISO/named-month/leap-date handling, rejection of ambiguous/invalid dates, integer cents and invalid amount syntax, fixture immutability, five retained identities, the exact repeated/incomplete records, category preparation and correction state.
- Browser assertions verify manual stage progression, keyboard activation, touch inspection, category update/confirmation, persistence across stages, reset and held records remaining held. No external application requests or page errors in route/navigation checks.
- Axe: zero violations in tested desktop/mobile raw, quality and human-review states, using WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags. This is not complete WCAG certification.
- All five stages checked at 1440/1024/768/390/320px, without horizontal document overflow. 200% text checked at 1440/768/390/320px. Reduced-motion, visible select/button focus and native no-JavaScript disclosures passed. Manual review covered contrast, type hierarchy, table/list semantics and colour-independent status labels.
- Existing notebook, mobile navigation, disclosures, AutoMark image dialog Escape/focus restoration, ten-component map, EquityGuard tools, legacy anchors and current résumé checks passed.
- Current public résumé and retained v4 URL alias match the authoritative source PDF by hash, including links from DAITA. Original older résumé remains untouched.
- **9/9 original file hashes preserved.** Source résumé, lockfile, AutoMark page/CSS, EquityGuard CSS and public identity/AutoMark-system records unchanged from Phase 2C snapshot. Existing dirty legacy work and prior recovery/artifacts retained.
- Export privacy scan: **50 text/code files, zero flagged internal source paths, provenance classifications, report filenames, key configuration, private-thought markers or historical prototype source identifiers.** No source archives, client files or logo republished. [Preservation/privacy results](../artifacts/phase-2c/preservation-privacy.json).

### Lighthouse

Targets: performance ≥90, LCP ≤2.5s and CLS ≤0.1. Field INP target ≤200ms is not measurable here. Final measurements use Lighthouse 13.6.0 against the local production export with simulated throttling; they are laboratory results, not production guarantees.

| Route / mode          | Performance | Accessibility | Best practices | SEO | LCP   | CLS | TBT   |
| --------------------- | ----------: | ------------: | -------------: | --: | ----- | --- | ----- |
| homepage / mobile     |         100 |           100 |            100 | 100 | 1.5 s | 0   | 20 ms |
| homepage / desktop    |         100 |           100 |            100 | 100 | 0.3 s | 0   | 0 ms  |
| automark / mobile     |          98 |           100 |            100 | 100 | 1.8 s | 0   | 20 ms |
| automark / desktop    |          99 |           100 |            100 | 100 | 0.9 s | 0   | 0 ms  |
| equityguard / mobile  |          99 |           100 |            100 | 100 | 1.7 s | 0   | 10 ms |
| equityguard / desktop |         100 |           100 |            100 | 100 | 0.4 s | 0   | 0 ms  |
| daita / mobile        |          99 |           100 |            100 | 100 | 1.7 s | 0   | 10 ms |
| daita / desktop       |         100 |           100 |            100 | 100 | 0.4 s | 0   | 0 ms  |

[Machine-readable results](../artifacts/phase-2c/performance-summary.json). Full HTML/JSON audit reports remain local under ignored `artifacts/phase-2c/audits/`. Earlier phase reports are preserved separately.

## Local preview and commands

```sh
npm ci                  # only when portfolio dependencies are absent
npm run assets
npm run dev
# http://127.0.0.1:3000/work/daita/

npm run build
npm run preview
# http://127.0.0.1:4173/work/daita/

npm run lint
npm run typecheck
npm run format:check
npm test
# With exported preview running:
npm run screenshots:daita
npm run audit:daita
```

Preview serves `out/`; do not use `next start`. No original DAITA environment or service is needed. Stop a preview you start with Ctrl+C. The task-owned preview was stopped after final verification.

## Created / modified inventory

Created:

- `src/app/work/daita/page.tsx`, `daita.css`: article, conceptual documents, metadata and responsive composition.
- `src/components/daita-workbench.tsx`: progressive fictional interaction and semantic table/list/fallback.
- `src/content/daita.ts`, `daita-fixtures.ts`, `src/lib/daita-workbench.ts`: typed article content, public fixtures and deterministic transformations.
- `public/daita-og.png`: original code-native editorial social artwork.
- `tests/daita.spec.ts`, `scripts/capture-daita.mjs`: transformation/route/interaction regression checks and reproducible five-width/state capture.
- `docs/DAITA_EVIDENCE.md`, this report, `artifacts/phase-2c/`: evidence, baseline/draft/final renders, layout review, verification and audit summaries.

Modified:

- `src/app/page.tsx`: homepage DAITA link; `src/app/editorial.css`: its spacing only.
- `src/app/work/equityguard/page.tsx`: named next-study link only. AutoMark page/CSS and EquityGuard CSS unchanged.
- `src/app/sitemap.ts`: DAITA entry.
- `scripts/prepare-assets.mjs`: social PNG generation; `scripts/audit.mjs`: separate four-route Phase 2C mode.
- `tests/reconciliation.spec.ts`: authoritative résumé checks include DAITA.
- `package.json`: screenshot/audit commands only; `.gitignore`: ignored full audit directory. Lockfile and dependencies unchanged.
- `AGENTS.md`, README, persistent brief, design system, content inventory and roadmap: current Phase 2C authoring/evidence/verification records.

Ignored recovery, baseline-comparison scripts and preservation checks are under `.local/`. A 95-file pre-edit recovery and binary working-tree patch preserve the starting source state. No original legacy files, existing project images, source résumé or earlier report was edited.

## Self-assessment and remaining evidence

The strongest visual result is the correspondence between subject and form: documents become comparable records, exceptions stay visible and review remains explicit. The workbench demonstrates actual deterministic behaviour while making its fictional status clear. The tablet refinement preserves useful side-by-side comparison; mobile uses readable fields and original-value notes.

The mobile workbench still takes several screens because all five records remain present. That continuity is useful, though future testing could explore a focused-record view if visitors find the progression too long. The page has conceptual visual evidence rather than original product imagery. Permission-cleared screenshots and original deliverables would make the account more personal and specific; fabricated replacements would not improve it.

The demonstration intentionally handles a small set of date/amount conventions and two review categories. It is not a general document parser, OCR system, tax engine, original approval audit trail or report exporter. Original DAITA source/runtime tests, upload-security implementation, background infrastructure, exact rule/version/score mechanisms and production outcomes remain unverified. Additional source does not need to be public, but any public material must be permission-cleared. No MediQuery/Returns case study or full Engineering Lab was started.
