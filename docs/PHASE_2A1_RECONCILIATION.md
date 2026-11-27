# Phase 2A.1 — authoritative content reconciliation

Completed locally on 27 November 2026 on `codex/portfolio-2-phase-1`. No commit, push, merge or deployment. No Phase 2B case studies or working Lab simulation were started. The approved identity, hero headline, fonts, palette, personal narrative and static-export architecture are retained.

## Source and preservation

The supplied graduate résumé was read completely: both pages, education/experience/projects/certifications and embedded professional links. Both pages were also rendered and visually inspected. It is now the authoritative professional source at [content-sources/resume/IBRAHIM_RESUME_Graduate.pdf](../content-sources/resume/IBRAHIM_RESUME_Graduate.pdf), SHA-256 `c5109e6c622a7b82ac94444b589c1d8d40926329689521b02814c3a1c7c1cff2`. The source is a byte-identical copy of the supplied Downloads file, which remains unchanged. The brief's `(6)` suffix was not present on the actual supplied filename; the reviewed two-page contents match the new facts.

An 81-file recovery snapshot and binary working-tree diff were captured before implementation in ignored `.local/recovery/pre-phase-2a1.zip`, with `.local/recovery/phase-2a1-manifest.json`. Previous recovery snapshots remain intact. All nine preserved legacy-file hashes still match. Original HTML, CSS/JS, old résumé, images and unrelated working-tree changes were not overwritten. The dependency lockfile is unchanged.

Current download: `/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf`. The previous public v4 URL remains a compatibility alias serving the same new PDF. Asset preparation copies the managed source to both **generated public destinations**; it does not overwrite the older original at `assets/resume/Ibrahim Sharif Resume v4.pdf`. All current page download links use the new destination. Browser checks compare downloaded bytes with the authoritative source, including the retained URL. Internal docs, recovery directories, content-source directories and evidence classifications are absent from the static export; only the managed public PDF is copied.

Embedded LinkedIn now points to `https://www.linkedin.com/in/ibrahim-sharif-au`; GitHub, email and canonical website remain the supplied destinations. Shared navigation, contact links, metadata and structured data use these current values. These are source-aligned destination checks, not a claim that LinkedIn's access controls or every external service was independently availability-tested.

## What the old résumé missed or understated

| Area                            | Previous account                                        | Reconciled account                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Professional identity           | Predominantly backend/applied AI                        | Full-stack engineering, distributed workflows, architecture, cloud, reliability/testing and applied AI                                                             |
| Education                       | Older end date/profile                                  | WSU Bachelor of Computer Science, March 2023–January 2026; relevant High Distinctions used selectively                                                             |
| AutoMark contribution           | Backend with team-owned interface                       | Core services **and personal HTML/CSS/JavaScript development/API integration**, without claiming sole product ownership                                            |
| AutoMark application scope      | General auth/schema                                     | JWT, RBAC, enrolment, assignments and submission tracking, with dashboards for submissions, feedback and reporting                                                 |
| Job processing                  | Earlier background queue/thread diagram                 | Durable queue and independent AWS grading workers explicitly established by the graduate résumé                                                                    |
| Verification                    | Only 200-concurrency headline                           | All 200 accepted/graded, 18.17s SVN acceptance, P95/P99 completion 155s/157s                                                                                       |
| Prior workflow                  | Unquantified manual marking                             | Approximately 15 minutes per submission, retained only as problem context                                                                                          |
| Achievements                    | Four user-confirmed headlines, documents pending        | 97/100 and Best Capstone nomination now résumé-supported; 43 endpoints remains additionally user-confirmed                                                         |
| DAITA                           | Small Streamlit-style rules/report prototype            | FastAPI/Pydantic tax decision-support app, heterogeneous ingestion/data quality, versioned ATO knowledge and human correction/approval/reporting                   |
| EquityGuard                     | Agent/tool illustration and stale retrieval description | Full-stack React/FastAPI application, six tools, validation/error handling, 23 tests and CI; retrieval source differences reconciled separately                    |
| MediQuery                       | Concise literature assistant                            | Full-stack biomedical research, modular PubMed ingestion, embeddings, MMR and source-cited answers                                                                 |
| Returns                         | General deterministic-policy prototype                  | Customer/order workflow, Pydantic decisions, 13-test résumé baseline, LangSmith tracing; later repository test expansion recorded                                  |
| Other experience/certifications | Some claims previously unresolved                       | Current résumé supports 7-Eleven responsibilities, AI Engineer certificate and ACS Professional Year; recorded without turning the homepage into a CV reproduction |

The complete corrected claim list, source classifications and remaining questions are in [the content inventory](CONTENT_INVENTORY.md) and [AutoMark evidence](AUTOMARK_EVIDENCE.md). Supplier Risk Pulse and Practice Interview AI remain as earlier secondary work; MediQuery and Returns retain priority. KafelaOS remains ongoing, with no commercial deployment claim.

## Architecture correction

The explorer expands from eight components to ten responsibilities in three groups:

1. Submission intake: SVN repository, post-commit hook, logical submission intake, durable job queue.
2. Asynchronous grading: independent AWS workers, Docker execution, results/feedback.
3. Application/data: student and lecturer dashboards, FastAPI services, grouped records/grading-file responsibilities.

A commit is an input/event. The repository stores the revision; the hook reacts to it. Those concepts no longer share an ambiguous label. The queue and workers are explicit. The API includes access control and application responsibilities beyond grading. Browser requests and result retrieval are distinguished from intake and execution.

The diagram is labelled a **logical view**, reconciled from the graduate résumé and earlier drawing. It does not pretend to be a verified physical AWS deployment. Dashed paths abstract handoffs/data access. No SQS, EC2, Lambda, ECS, S3, worker count, retry guarantee, delivery semantics or transport protocol was inferred from the general skills section. The older image is linked as an **earlier architecture drawing**. Records and file access are grouped responsibilities, not one asserted physical store.

Orthogonal SVG paths use measured rendered node positions and dedicated label channels outside nodes. Arrowheads terminate outside component bounds. Main and related paths remain legible, with stronger selection emphasis. The layout uses a `ResizeObserver` and font readiness; it adds no diagram framework. Mobile uses recomposed lane controls, readable connection notes and native all-connections text disclosure. Input/output notes and all relationships remain readable without JavaScript.

Pointer, touch, Tab, left/right, geometry-aware up/down, Home and End work. Panels reserve the tallest note height, avoiding selection-driven movement. Reduced motion disables transitions. This is an explorer, not a simulator or an artificial activity display.

## Benchmark storytelling

The new benchmark separates **submission acceptance** from **grading completion**. It presents exactly the reported observations: all 200 jobs accepted/graded; all SVN commits accepted in 18.17 seconds; P95 completion 155 seconds; P99 157 seconds. A two-row percentile table and plain-language explanation replace the old “methodology unavailable, headline only” treatment.

No average/P50, synthetic latency distribution, throughput curve, worker count, hardware, utilisation or production load was invented. Intake is not added to completion, because exact timing origins remain unspecified. The approximate 15-minute manual context is not converted into a speed-up percentage. These are **résumé-supported project-test results**, not new AutoMark benchmarks run by the portfolio browser suite. Raw logs and methodology remain desirable supporting evidence.

## Whole-site reconciliation

Hero support copy, About education, technology records, metadata, Person knowledge areas and social-preview captions now reflect full-stack/distributed/cloud interests. The protected hero headline is unchanged. AutoMark's homepage summary and Lab preview include the queue, AWS workers and Docker execution; no unfinished launch action appears.

DAITA retains its sandstone composition. Its revised storyboard covers secure heterogeneous ingestion, mapping/normalisation/deduplication/validation, versioned deterministic ATO-rule knowledge and corrections/review/approval/export. References, confidence and documentation requirements are explicit. The project remains a WSU university-industry collaboration with Deloitte stakeholders, not employment. No client documents, proprietary rules or project-specific AWS architecture are published.

EquityGuard retains the open agent illustration. Its six registry tools are grouped into four labelled areas. Current vector-search and ChromaDB ingestion code exist, while a separate ticker/document lookup remains non-vector. The README still describes an older keyword/upgrade model. The reviewed vector retriever also references `chromadb` without importing it, so operational readiness is unresolved. Public copy retains ChromaDB in the stack without claiming a working deployed vector path or calling the direct custom loop a LangChain framework implementation. No private reasoning or fabricated traces are shown.

MediQuery is described as a biomedical research application, not a clinically validated medical product. Returns' 13-test résumé accomplishment is retained as a baseline; its current README documents a later expected 16-passed/3-skipped suite. External project suites were not rerun. No assessment policies were reproduced.

## Rendered review and meaningful refinement

The earlier export was captured separately before rebuilding. The first reconciled render was reviewed at normal scale, including its architecture, benchmark, hero and DAITA section. Captures exist at 1440, 1024, 768, 390 and 320px, with all ten component selections at every width. Automated rendered geometry checks exercise every selection and check text/node, text/text and wire/node clearance at desktop/tablet sizes; mobile uses its alternate composition.

The first revised render exposed an awkward empty cell in each three-item mobile lane and a longer nomination overflowing at 200% text. Those were corrected with a full-width final lane item and an enlarged-text achievement reflow. Component notes were tightened to reduce repeated source/target names and boundary wording while retaining purpose, inputs, outputs and relationships. The source-to-hook connection remains isolated in its own labelled channel. A duplicate text locator in the homepage test was made exact; the content itself remains available in prose and the evidence emphasis.

Case-study headings now vary between questions, direct engineering statements, a short demo heading and the factual test outcome. A repeated access-control aside was removed because ownership, decisions and the API note already explain it. The article became more substantive without repeating the same two-line serif treatment in every chapter. Final full pages, normal-size sections, selected states and narrow layouts were reviewed after refinement.

The final article is approximately 9,974px high at 1440px and 13,731px at 390px. It is longer than Phase 2A because it now explains genuinely additional engineering work and measured results; the chapter index and selectable architecture keep detail discoverable. These dimensions are layout observations, not reading-time or usability measurements.

## Delivery screenshots

- [Updated full desktop homepage](../artifacts/phase-2a1/homepage-full-1440.png) · [Full mobile homepage](../artifacts/phase-2a1/homepage-full-390.png)
- [Full desktop AutoMark article](../artifacts/phase-2a1/automark-full-1440.png) · [Full mobile article](../artifacts/phase-2a1/automark-full-390.png) · [Tablet](../artifacts/phase-2a1/automark-full-768.png)
- [High-resolution architecture](../artifacts/phase-2a1/architecture-high-resolution.png) · [Normal desktop](../artifacts/phase-2a1/architecture-1440.png) · [Narrow mobile](../artifacts/phase-2a1/architecture-320.png)
- [Corrected SVN commit / hook close-up](../artifacts/phase-2a1/svn-commit-hook-closeup.png)
- [Benchmark desktop](../artifacts/phase-2a1/benchmark-1440.png) · [Benchmark mobile](../artifacts/phase-2a1/benchmark-390.png)
- [DAITA desktop](../artifacts/phase-2a1/daita-1440.png) · [DAITA mobile](../artifacts/phase-2a1/daita-390.png)

| Selected responsibility | Desktop                                                    | Mobile                                                    |
| ----------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| SVN repository          | [View](../artifacts/phase-2a1/selected-svn-1440.png)       | [View](../artifacts/phase-2a1/selected-svn-390.png)       |
| Post-commit hook        | [View](../artifacts/phase-2a1/selected-hook-1440.png)      | [View](../artifacts/phase-2a1/selected-hook-390.png)      |
| Submission intake       | [View](../artifacts/phase-2a1/selected-intake-1440.png)    | [View](../artifacts/phase-2a1/selected-intake-390.png)    |
| Durable queue           | [View](../artifacts/phase-2a1/selected-queue-1440.png)     | [View](../artifacts/phase-2a1/selected-queue-390.png)     |
| AWS workers             | [View](../artifacts/phase-2a1/selected-worker-1440.png)    | [View](../artifacts/phase-2a1/selected-worker-390.png)    |
| Docker execution        | [View](../artifacts/phase-2a1/selected-sandbox-1440.png)   | [View](../artifacts/phase-2a1/selected-sandbox-390.png)   |
| Results/feedback        | [View](../artifacts/phase-2a1/selected-results-1440.png)   | [View](../artifacts/phase-2a1/selected-results-390.png)   |
| Dashboards              | [View](../artifacts/phase-2a1/selected-workspace-1440.png) | [View](../artifacts/phase-2a1/selected-workspace-390.png) |
| FastAPI services        | [View](../artifacts/phase-2a1/selected-api-1440.png)       | [View](../artifacts/phase-2a1/selected-api-390.png)       |
| Records/files           | [View](../artifacts/phase-2a1/selected-records-1440.png)   | [View](../artifacts/phase-2a1/selected-records-390.png)   |

The same selected-state files exist at 1024, 768 and 320px. There are 89 delivered PNGs, including extra full pages, hero/Lab/DAITA/benchmark captures and high-resolution details. [Measurements](../artifacts/phase-2a1/measurements.json) record width, document width, component count, article height and panel height. Before and first-revised captures remain private in `.local/phase-2a1-before/` and `.local/phase-2a1-first-render/`. Prior phase artifacts are retained.

## Verification

| Check                                                | Result                                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Production build                                     | Pass; complete homepage and `/work/automark/` static exports                                 |
| ESLint / strict TypeScript / formatting / whitespace | Pass                                                                                         |
| Browser suite                                        | **22/22 passing**, desktop Chromium and emulated mobile touch                                |
| Supplemental up/down keyboard assertions             | Pass on desktop and mobile                                                                   |
| Automated accessibility                              | No Axe violations in tested homepage/article desktop and mobile views                        |
| Overflow                                             | Pass at all five required widths, plus existing 1280px regression coverage                   |
| 200% text / reduced motion                           | Pass                                                                                         |
| No JavaScript                                        | Essential article, all ten component notes, relationships, disclosures and navigation usable |
| Static route/assets/metadata                         | Direct route, canonical/social metadata, sitemap, original image URLs and résumé access pass |
| Authoritative résumé                                 | Source, current public URL and retained alias match byte-for-byte                            |
| Preservation                                         | Original 9/9 hashes match; older résumé and images unchanged; lockfile unchanged             |
| Internal-source privacy                              | No recovery/source/inventory directories or evidence-status serialisation in export          |

The 22 portfolio browser tests are distinct from the résumé's AutoMark load test and the external projects' reported test counts. This review did not rerun AutoMark or the independent project suites. Chromium emulation is not physical-device coverage; automated Axe results are not complete WCAG certification. Root-font enlargement does not cover every browser/OS zoom setting.

## Production Lighthouse measurements

Final Lighthouse 13.6.0 run against the static export, approximately 03:22 Sydney time on 27 November 2026. [Machine-readable results](../artifacts/phase-2a1/performance-summary.json); raw reports remain locally in ignored `artifacts/phase-2a1/audits/`.

| Route / mode       | Performance | Accessibility | Best practices | SEO | LCP  | CLS | TBT  |
| ------------------ | ----------- | ------------- | -------------- | --- | ---- | --- | ---- |
| Homepage / mobile  | 100         | 100           | 100            | 100 | 1.5s | 0   | 20ms |
| Homepage / desktop | 100         | 100           | 100            | 100 | 0.3s | 0   | 0ms  |
| AutoMark / mobile  | 98          | 100           | 100            | 100 | 1.8s | 0   | 10ms |
| AutoMark / desktop | 98          | 100           | 100            | 100 | 1.2s | 0   | 0ms  |

Targets remain performance ≥90, LCP ≤2.5s and CLS ≤0.1. These are simulated local laboratory measurements, not field results. INP was not measured. Scores are the final run, not the best selected from several iterations. Relative to Phase 2A, the article adds content/interaction while maintaining excellent measured performance and zero measured layout shift; small local LCP differences should not be treated as field conclusions.

## Created and modified inventory

| File / group                                                                          | Change                                                                                                                                                      |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content-sources/resume/IBRAHIM_RESUME_Graduate.pdf`                                  | New managed authoritative source, byte-identical to supplied PDF                                                                                            |
| `src/content/portfolio.ts`                                                            | Source classifications, current profile/links/education, broader identity, reconciled featured/secondary project records                                    |
| `src/content/automark.ts`                                                             | Ten components, three lanes, typed relationships, reported benchmark observations and updated narrative                                                     |
| `src/components/automark-explorer.tsx`                                                | Measured orthogonal routing, responsive geometric keyboard movement, selected/related emphasis, compact notes, all-connections disclosure and HTML fallback |
| `src/components/automark-benchmark.tsx`                                               | New server-rendered editorial benchmark and accessible percentile table                                                                                     |
| `src/components/project-diagrams.tsx`                                                 | DAITA data-quality/tax/review storyboard and six-tools/four-groups EquityGuard explanation                                                                  |
| `src/app/page.tsx`                                                                    | Targeted copy, technology, date and Lab/AutoMark flow updates; protected hero headline/composition retained                                                 |
| `src/app/layout.tsx`                                                                  | Updated professional metadata and Person knowledge areas                                                                                                    |
| `src/app/work/automark/page.tsx`                                                      | Full-stack narrative, varied headings, benchmark placement and reduced repetition                                                                           |
| `src/app/work/automark/automark.css`                                                  | Logical-lane map, benchmark, mobile full-width lane items and enlarged-text reflow                                                                          |
| `scripts/prepare-assets.mjs`                                                          | Current public PDF/legacy alias management and current social-preview captions                                                                              |
| `public/assets/resume/`                                                               | Current PDF and managed legacy URL alias; original source PDF untouched                                                                                     |
| `public/og-image.png`, `public/automark-og.png`                                       | Regenerated editorial social previews with current positioning                                                                                              |
| `scripts/capture-reconciliation.mjs`                                                  | New five-width and all-selected-state capture workflow                                                                                                      |
| `scripts/capture-automark.mjs`                                                        | Compatibility entry point forwards to current capture instead of overwriting historical results                                                             |
| `scripts/audit.mjs`, `package.json`, `.gitignore`                                     | Separate reconciliation audit/capture commands and ignored raw audit output                                                                                 |
| `tests/portfolio.spec.ts`, `tests/automark.spec.ts`                                   | Updated destinations, ten components and keyboard coverage                                                                                                  |
| `tests/reconciliation.spec.ts`                                                        | New PDF byte checks, content checks, selection/routing clearance and panel stability                                                                        |
| `docs/PHASE_2A1_RECONCILIATION.md`                                                    | This delivery/source reconciliation report                                                                                                                  |
| `AGENTS.md`, `README.md`, brief, design system, inventory, AutoMark evidence, roadmap | Current source authority, decisions, commands, remaining evidence and persistent guidance                                                                   |
| Earlier implementation/review reports                                                 | Explicit historical/superseded banners; original measured results retained                                                                                  |
| `artifacts/phase-2a1/`                                                                | Current screenshots, measurements and performance summary                                                                                                   |

No packages were added or updated. Original legacy files and uncommitted user work remain preserved. Current export/build caches, private snapshots and raw audits remain ignored.

## Local preview

```sh
npm run dev
# http://127.0.0.1:3000

npm run build
npm run preview
# http://127.0.0.1:4173/work/automark/
```

Use `npm run screenshots:reconciliation` and `npm run audit:reconciliation` with the exported preview running. The existing `screenshots:automark`/`audit:automark` commands now target current reconciliation outputs rather than overwriting historical Phase 2A results. Stop the server with Ctrl+C. The owned review server is stopped at handoff.

## Remaining details and candid assessment

The biggest correction is substantive: the portfolio now represents the full-stack, distributed and cloud work actually established by the current résumé. The architecture makes intake, independent execution and application responsibilities understandable, and the benchmark says more with real observations than a fabricated chart could. DAITA now describes a meaningful engineering application rather than the older simplified prototype account. The approved visual identity remains coherent.

The article is still a substantial mobile read. The native chapter index and selectable architecture provide different depths; reserving the longest note avoids jumps but leaves spare space under shorter notes, particularly at 320px. Repeated connection names and boundary wording were tightened to reduce that cost. Desktop preserves richer spatial relationships; mobile favours legibility and explicit text over tiny wires. Real reader feedback would help judge further shortening without losing technical value.

The explorer is a reconciled logical model, not a substitute for current AutoMark source/deployment documentation. Exact AWS services, broker, protocols, storage, worker count and delivery/retry behaviour remain unresolved. Raw benchmark logs, timing origins, workload/hardware and endpoint inventory remain desirable. The Docker-volume cause/resolution is intentionally no more specific than the supplied experience.

EquityGuard's vector code and README disagree, and the reviewed retriever has an import/readiness issue; this is recorded without making a deployment claim or modifying the external repository. Returns' current README suite expansion is distinguished from the 13-test résumé accomplishment. DAITA source detail is limited to the résumé; no client data or proprietary tax logic was invented.

Improved authentic product captures, permission-cleared source excerpts and physical-device/additional-browser review are worthwhile next steps. No independent design score or production scalability certification is claimed. Phase 2B remains unstarted.
