# Ibrahim Sharif — Portfolio 2.0

Next.js App Router + TypeScript + Tailwind, exported as a static site. No production server, database or API key is required.

## Local development

Node.js 22 or newer and npm:

```sh
npm ci
npm run assets
npm run dev
```

Open http://127.0.0.1:3000. The original root `index.html` remains preserved legacy source; the new homepage is `src/app/page.tsx`.

## Build and preview the static site

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173. The `out/` directory is the complete static export. `next start` is not used. Stop the preview with Ctrl+C.

## Production release

The existing production host is Cloudflare Pages project `ibrahim`, serving `https://ibrahimsheriiff.com`. `wrangler.toml` restricts the public output to `out/`; Cloudflare's build command must be `npm run build` from the repository root. `.node-version` selects Node 22. Do not serve the repository root. See [release review and verification](docs/RELEASE_REVIEW.md). Publication requires explicit user authorisation. Generated screenshot/video evidence stays local under ignored artifact paths; small measurement JSON reports are retained in Git.

## Quality checks

```sh
npm run lint
npm run typecheck
npx playwright install chromium
npm test
```

Playwright starts or reuses the port-4173 static preview. Build before testing. CI runs quality checks only.

With the static preview running, `npm run screenshots` refreshes the desktop, tablet, mobile and section captures. `npm run audit` produces local Lighthouse reports and a concise metrics summary. `npm run format:check` checks the new source without touching preserved legacy files.

For the Phase 1B review, use `npm run screenshots:review` to capture all six review widths and notebook selection/focus states. `npm run audit:review` writes separate Phase 1B results. Original baseline screenshots and measurements are retained. See [the Phase 1B design review](docs/PHASE_1B_DESIGN_REVIEW.md).

The AutoMark case study is at http://127.0.0.1:4173/work/automark/ in the exported preview (port 3000 in development). `npm run screenshots:automark` forwards to the current five-width reconciliation capture, including all ten selections. `npm run audit:automark` measures both routes into the current Phase 2A.1 results directory. For current content and evidence see [Phase 2A.1 reconciliation](docs/PHASE_2A1_RECONCILIATION.md) and [AutoMark evidence](docs/AUTOMARK_EVIDENCE.md). Earlier Phase 2A captures/metrics are historical. Use `npm run screenshots:reconciliation` and `npm run audit:reconciliation` for the current five-width, ten-selection review without overwriting earlier artifacts.

## Content and preservation

Homepage content: `src/content/portfolio.ts`. AutoMark article content: `src/content/automark.ts`. Design: `src/app/globals.css`, `src/app/editorial.css` and route-scoped AutoMark styles. Project notes: `docs/`. Engineering/design instructions: `AGENTS.md`.

Original files in `assets/` and root HTML drafts are unchanged. The current authoritative résumé is managed separately at `content-sources/resume/IBRAHIM_RESUME_Graduate.pdf`. Asset preparation copies it to `/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf` and to the former v4 public URL as a compatibility alias. The original older PDF remains untouched in `assets/resume/`. Preparation also creates responsive images/social previews and copies licensed fonts; no network is required after `npm ci`. Internal inventories and recovery files are not public assets.

The original local working tree was captured in ignored `.local/recovery/pre-phase-1.zip`, including a binary Git patch; `.local/recovery/manifest.json` records original SHA-256 hashes. This snapshot is local and must not be published.

See `docs/IMPLEMENTATION_REPORT.md` for screenshots, audit, evidence gaps, validation results and next steps.

## EquityGuard / Phase 2B

The case study is at http://127.0.0.1:4173/work/equityguard/ (port 3000 in development). With the exported preview running:

```sh
npm run screenshots:equityguard
npm run audit:equityguard
```

These write five-width captures, all six inspector states and three-route Lighthouse results under `artifacts/phase-2b/`, preserving older phase artifacts. Read [the implementation and visual review](docs/PHASE_2B_REPORT.md) and [pinned source/tool/test evidence](docs/EQUITYGUARD_EVIDENCE.md). The portfolio never runs EquityGuard or requires its dependencies, API keys, market data or model calls. Its authentic React screenshot uses explicitly labelled offline fixtures. No production dependencies were added. Typed tool content is `src/content/equityguard.ts`; route-specific composition stays alongside its page.

## DAITA / Phase 2C

Open http://127.0.0.1:4173/work/daita/ after `npm run build` and `npm run preview` (port 3000 with `npm run dev`). This static article includes a clearly labelled fictional workbench; it requires no original DAITA service, uploads, database or tax API.

With the exported preview running, `npm run screenshots:daita` captures five widths, all five stages, held-record inspection and a confirmed manual correction. `npm run audit:daita` measures all four completed routes. Outputs stay in `artifacts/phase-2c/` without replacing earlier artifacts. Read [source/confidentiality evidence](docs/DAITA_EVIDENCE.md) and [implementation, design iteration and verification](docs/PHASE_2C_REPORT.md).

## Complete study collection / Phase 2D

MediQuery is at `/work/mediquery/`; Returns Agent is at `/work/returns-agent/` (port 4173 with the exported preview, 3000 in development). Both are static and need no original project service, key or database. The Retrieval Explorer and Policy Playground use labelled synthetic data and new TypeScript logic.

`npm run screenshots:collection` saves both articles at five widths and selected interaction states. `npm run audit:collection` measures the homepage and all five completed articles. Outputs remain under `artifacts/phase-2d/`, preserving previous phases. See [delivery/design/verification](docs/PHASE_2D_REPORT.md), [MediQuery evidence](docs/MEDIQUERY_EVIDENCE.md) and [Returns evidence](docs/RETURNS_AGENT_EVIDENCE.md). External project test outcomes are separate from portfolio tests. The full Engineering Lab has not been started.

## Engineering Lab / Phase 3A

Open `/lab/` or `/lab/automark/` after `npm run build` and `npm run preview` (port 4173; port 3000 with `npm run dev`). Everything runs locally in the browser; no original AutoMark runtime, backend, credentials, SVN repository or Docker daemon is used.

```sh
npm run screenshots:lab
npm run record:lab
npm run audit:lab
```

These commands use the running static preview. They capture five widths/major states, record one representative run and measure all eight routes, under `artifacts/phase-3a/`. Earlier artifacts remain retained. Read [the simulation model](docs/LAB_SIMULATION.md) and [delivery/design/verification](docs/PHASE_3A_REPORT.md). Workload timings are synthetic virtual seconds and are separate from historical AutoMark results. Other Lab experiments remain planned.

## Complete Engineering Lab / Phase 3B

All five experiments are available from `/lab/`: `/lab/automark/`, `/lab/equityguard/`, `/lab/mediquery/`, `/lab/returns-agent/`, `/lab/daita/`. Run `npm run build` and `npm run preview` for the static export on port 4173; `npm run dev` serves development on port 3000. No original project runtime, model, API key or external service is required.

With the exported preview running:

```sh
npm run screenshots:lab-collection
npm run record:lab-collection
npm run audit:lab-collection
```

Outputs stay under `artifacts/phase-3b/`, preserving all prior phases. Read [models and confidentiality boundaries](docs/LAB_COLLECTION_MODELS.md) and [delivery, design review and measured verification](docs/PHASE_3B_REPORT.md). The demonstrations are synthetic browser-side software, separate from original project execution and external test results.
