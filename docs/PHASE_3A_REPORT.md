# Phase 3A — The Engineering Lab and AutoMark Workload Simulator

Implemented locally on `codex/portfolio-2-phase-1`, 27 November 2026. No commit, push, merge or deployment. The five primary case studies remain complete; only AutoMark’s experiment is implemented. Other Lab experiments, recruiter mode, command palette, journal and skill map remain outside this phase.

## Delivered experience

- `/lab/`: deep-forest editorial workbench, prominent working AutoMark entry, responsibility sketch, planned questions with real case-study links, personal sign-off.
- `/lab/automark/`: browser-only workload configuration, virtual-time playback, sequential intake/queue/worker/outcome model, derived metrics, all submission records and filterable real model-event history.
- Steady grading, mixed-duration and one-timeout scenarios. Native job/worker/scenario/speed controls plus start, pause, resume, step and reset. No code uploads, service, credentials, database, original repository or Docker daemon.
- Homepage `#lab` retained with working Lab/experiment links; shared navigation opens `/lab/`. AutoMark article links to its simulator; Lab and experiment provide return paths. The approved homepage/article compositions are preserved.
- Returns’ ambiguous oversized E/D/etc. is replaced with a concise named rule label, e.g. “Rule E · Offer a return path”. Its actual policy logic remains unchanged.
- Route-specific metadata/canonical, sitemap entries, original PNG social artwork and WebApplication structured data for the experiment. No unfinished experiment destinations.

## Prerequisite review and preservation

Reviewed AGENTS, persistent brief/design/content records, all five article structures, Phase 2D delivery/test/performance baseline, AutoMark evidence and ten-component logical architecture, existing interactions/pure demonstrations and established tests. The current graduate résumé remains authoritative. Existing Phase 2D results established the 54-check baseline; all 54 are retained in the expanded suite.

Before editing, captured **129 source/config/document/asset files plus a binary working-tree patch** in ignored `.local/recovery/pre-phase-3a.zip`; `phase-3a-manifest.json` records hashes. Existing dirty legacy source and the untracked original HTML draft were preserved. Older recovery archives/reports/screenshots were not replaced.

Final scan verifies **9/9 original hashes** and protected lockfile, source résumé, base/editorial CSS, three flagship route styles, four non-AutoMark article pages, AutoMark content/diagram records and earlier demonstration engines/components. Only authorised integration files and the Returns rule presentation changed. [Preservation/privacy results](../artifacts/phase-3a/preservation-privacy.json).

## Architecture and model

[Detailed simulation contract](LAB_SIMULATION.md) records configuration bounds, transitions, exact tick ordering, metric definitions, playback and limits.

| Layer                                         | Responsibility                                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/lib/lab/workload-types.ts`               | Typed configuration, job/run states, events and actions                                                      |
| `src/content/lab/workload-fixtures.ts`        | Public synthetic job fixtures, deterministic durations and scenario explanations                             |
| `src/lib/lab/workload-engine.ts`              | Configuration validation, immutable reducer, virtual boundary processing, FIFO assignment and event emission |
| `src/lib/lab/workload-metrics.ts`             | Counts, acceptance/completion times, busy seconds/utilisation and event wording                              |
| `src/components/lab/use-workload-playback.ts` | One interval, speed, tab-visibility pause and teardown                                                       |
| `src/components/lab/workload-simulator.tsx`   | Native controls, observable flow, records, timeline and progressive enhancement                              |
| `lab-foundations.tsx`, Lab layout/CSS         | Small shared environment, breadcrumbs, boundaries and logical drawing; no rigid multi-experiment framework   |

The engine is the source of truth. No animation, DOM geometry, real-time timestamp or random value schedules work. Given the same configuration/actions, output records and events are identical. Fixtures, pure scheduling, metric derivation, playback and presentation remain separate. Simulation-specific code is route-local; prefetch is disabled at experiment entry links. A browser regression checks that homepage/landing visits and hover do not load the workload bundle, then verifies it loads when opened. No dependency or lockfile change.

### State transitions and scheduling

Run: ready → running ⇄ paused → completed; reset returns to ready. Step opens at t=0, then advances one virtual second while paused. Duplicate start/resume/tick actions outside valid phases are ignored. Empty workloads finish coherently at t=0.

Jobs: pending → received → queued → running → completed or failed. Three jobs arrive each virtual second. Each spends one second in intake. Every tick finishes executions, finishes intake, receives new arrivals and dispatches FIFO jobs to available workers in stable worker-number order. Completion order can differ from submission order.

Synthetic durations repeat 6/8/10 seconds (steady), or 3/12/5/9/4/16 (mixed). One timeout gives J05, or the final job of a smaller workload, 14 seconds of required work and an 8-second limit. It fails and releases its worker at the limit. No retries or invented recovery policy. These choices do not claim AutoMark’s exact queue semantics.

Metrics count actual state records. Peak queue is waiting work remaining after dispatch at integer boundaries. Utilisation is accumulated busy worker-seconds divided by configured workers × elapsed virtual seconds, including intake; zero at t=0. No arbitrary efficiency score. Six steady jobs are accepted by t=1; one worker finishes at 49s and three workers at 21s. Those examples are calculated by the same engine and are not historical measurements.

### Authenticity boundary

The current résumé supports SVN submissions, a durable queue, independent AWS workers and isolated Docker execution. Its reported 200 accepted/graded submissions, 18.17s intake and P95/P99 completion of 155/157s remain in a **separate historical context note**. The model is not calibrated to them and does not reproduce deployment, broker, retry/delivery, network, persistence, autoscaling, storage or sandbox behaviour. It executes no student or visitor code and establishes no production capacity.

## Rendered design iteration

Initial drafts and final captures cover **1440, 1024, 768, 390 and 320px**. Normal-scale openings, previews, queue/worker lanes, outcomes and controls were inspected alongside complete desktop/mobile pages. Drafts remain separately retained.

The landing uses a large, asymmetrical editorial opening and a sage responsibility sketch. The simulator is a single light scheduling sheet within the forest environment, rather than a dashboard card grid. It combines intake’s acceptance count, actual waiting tokens, independent labelled worker lanes and terminal results. Technical detail moves into native records/timeline/assumption disclosures rather than competing with the main flow.

Findings and actual refinements:

1. Initial mobile controls disappeared above the worker lanes. Added a compact sticky transport bar, so playback remains accessible while inspecting the flow. At very narrow effective widths it returns to normal flow to avoid obstructing enlarged text.
2. A timeout could disappear behind newer outcomes and fall outside the recent-event window. The result lane now retains **all failures** alongside the latest four completions; complete records/history remain inspectable.
3. The landing sketch’s outcome symbols caused a small enlarged-text overflow. Allowed wrapping and used font-relative container reflow. Normal phone sketch uses two columns; narrower effective widths become one column. No clipping used to conceal overflow.
4. Tightened mobile empty queue/outcome spacing and transport sizing. Tablet uses a deliberate two-by-two flow; mobile follows intake → waiting → execution → outcome at readable sizes.
5. Idle worker bars briefly retained transitional fill at a terminal boundary. Idle lanes now clear immediately; active progress and fresh job/outcome entry remain short state-driven transitions. Captures settle finite motion rather than recording an arbitrary fade midpoint.
6. Completion instructions now tell visitors to reset or change configuration. Returns rule identifiers now include both rule and meaningful title; the default oversized E no longer looks like a grade.
7. Found route prefetch could undermine the requirement to keep workload code local. Disabled it at entry links and verified the actual loaded JavaScript in a fresh browser context.

The timeline never scrolls automatically. Screen readers receive phase/terminal aggregate status, not every job event. State words, identifiers, progress values and records accompany colour. Reduced motion removes visual transitions while retaining playback and stepping. Without JavaScript controls stay disabled and a server-computed six-job example explains the same learning objective.

## Validation

- Production build passed; homepage, five studies and two Lab pages export directly to static HTML in `out/`.
- ESLint, strict TypeScript and Prettier passed. No dependencies or lockfile changes.
- Full suite: **74/74 passed** in 58.0s (desktop Chromium and iPhone-emulated Chromium), retaining all 54 prior executions and adding 20 Lab executions. Final sketch typography was followed by **2/2 additional responsive/Axe/enlarged-text passes**.
- Source preservation/privacy: **9/9 originals preserved**, all protected files unchanged; **76 exported text/code files scanned, zero flagged issues**. Résumé checks now cover all eight public pages and both current/retained download URLs.
- Both Lab routes inspected at all five requested widths; 200% text tested at 1440/768/390/320px without horizontal overflow. No external runtime requests or browser page errors in route/navigation checks.
- No-JavaScript representative example, reduced motion, visible keyboard focus, touch controls, terminal failure visibility and actual timer cleanup verified.

[Machine-readable verification summary](../artifacts/phase-3a/verification-summary.json).

Mathematical/state assertions cover initial/empty/invalid configurations, all 45 combinations of three scenarios × five job counts × three worker counts, FIFO order, worker availability, concurrent bound, state immutability, conservation, exactly-once assignment/start/terminal events, no lost jobs, replay equality, terminal completion, reset, acceptance/finish timing, peak queue, busy time/utilisation, timeout release and exact-limit success.

Browser checks cover direct static routes/metadata/assets/schema/sitemap, navigation between homepage/Lab/article, start/pause/resume/step/reset, configuration lock, speed, empty/failing completion, filters/records, keyboard/touch, reduced motion, five viewport widths, enlarged 200% text, Axe and no-JavaScript examples. Timer instrumentation confirms one interval, replacement on speed changes, clearing on tab hiding and client navigation; rapid pause/resume does not duplicate virtual ticks.

Automated accessibility checks have zero Axe violations in the tested desktop/mobile states against WCAG 2 A/AA, 2.1 AA and 2.2 AA tags. Visible keyboard focus, contrast, aggregate announcements, semantic records and reduced motion were reviewed. This is not complete WCAG certification or physical-device testing. Chromium desktop and iPhone-emulated Chromium are the browser coverage; Safari/Firefox and assistive-technology testing remain useful release work.

### Local performance

Targets: performance ≥90, LCP ≤2.5s, CLS ≤0.1. Field INP target ≤200ms is not measured here. Lighthouse 13.6.0 uses the local production static export and simulated throttling, after other browser work finishes; results are laboratory measurements.

| Route         | Performance mobile / desktop | LCP mobile / desktop | CLS mobile / desktop | TBT mobile / desktop |
| ------------- | ---------------------------- | -------------------- | -------------------- | -------------------- |
| homepage      | 100 / 100                    | 1.5 s / 0.3 s        | 0 / 0                | 20 ms / 0 ms         |
| automark      | 98 / 98                      | 1.8 s / 1.2 s        | 0 / 0                | 20 ms / 0 ms         |
| equityguard   | 99 / 100                     | 1.7 s / 0.4 s        | 0 / 0                | 10 ms / 0 ms         |
| daita         | 99 / 100                     | 1.7 s / 0.4 s        | 0 / 0                | 0 ms / 0 ms          |
| mediquery     | 100 / 99                     | 1.4 s / 1.0 s        | 0 / 0                | 20 ms / 0 ms         |
| returns-agent | 100 / 100                    | 1.4 s / 0.3 s        | 0 / 0                | 20 ms / 0 ms         |
| lab           | 100 / 100                    | 1.5 s / 0.3 s        | 0 / 0                | 20 ms / 0 ms         |
| lab-automark  | 100 / 100                    | 1.4 s / 0.3 s        | 0 / 0                | 10 ms / 0 ms         |

Both Lab routes scored **100 in all four categories on both devices**. Across all 16 measurements, accessibility/best-practices/SEO were 100; performance ranged 98–100. Every route met the stated performance, LCP and CLS targets. Homepage performance was 100/100 in this run; no comparative speed-up is inferred from run-to-run variation. Field INP remains unmeasured.

[All eight routes / machine-readable summary](../artifacts/phase-3a/performance-summary.json). Full HTML/JSON audits remain ignored under `artifacts/phase-3a/audits/`; earlier phase baselines remain retained.

The [recorded local playback measurement](../artifacts/phase-3a/runtime-measurement.json) used 12 mixed-duration jobs, three workers and 4× viewing speed: all 12 completed at **42 virtual seconds**, peak waiting queue **8 jobs**. Real playback plus the manual pause took **11.54s**; recording duration is **13.76s**, 1440×1000 WebM. The clip was decoded and two intermediate frames inspected. **No tasks over 50ms** were observed; maximum document size sampled was **553 nodes**. This single local desktop run includes recording overhead and does not establish worst-case, mobile or field performance.

## Screenshots and recording

[Final screenshot directory](../artifacts/phase-3a/screenshots/) contains 64 PNGs: both full pages, opening/preview, ready/intake/queue/workers/paused/failure/completed/timeline states at all five widths, plus homepage integration and corrected Returns labels at desktop/mobile. [Layout findings](../artifacts/phase-3a/screenshots/layout-review.json). Initial drafts remain under `artifacts/phase-3a/draft/`.

| Deliverable                    | Desktop                                                                       | Mobile                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Lab landing, full page         | [1440px](../artifacts/phase-3a/screenshots/lab-1440-full.png)                 | [390px](../artifacts/phase-3a/screenshots/lab-390-full.png)                 |
| AutoMark experiment, full page | [1440px](../artifacts/phase-3a/screenshots/automark-experiment-1440-full.png) | [390px](../artifacts/phase-3a/screenshots/automark-experiment-390-full.png) |
| Ready / configuration          | [Ready](../artifacts/phase-3a/screenshots/sim-ready-1440.png)                 | [Ready](../artifacts/phase-3a/screenshots/sim-ready-390.png)                |
| Active intake                  | [Intake](../artifacts/phase-3a/screenshots/sim-intake-1440.png)               | [Intake](../artifacts/phase-3a/screenshots/sim-intake-390.png)              |
| Populated queue                | [Queue](../artifacts/phase-3a/screenshots/sim-queue-1440.png)                 | [Queue](../artifacts/phase-3a/screenshots/sim-queue-390.png)                |
| Independent workers            | [Workers](../artifacts/phase-3a/screenshots/sim-workers-1440.png)             | [Workers](../artifacts/phase-3a/screenshots/sim-workers-390.png)            |
| Paused                         | [Paused](../artifacts/phase-3a/screenshots/sim-paused-1440.png)               | [Paused](../artifacts/phase-3a/screenshots/sim-paused-390.png)              |
| Timeout                        | [Failure](../artifacts/phase-3a/screenshots/sim-failure-1440.png)             | [Failure](../artifacts/phase-3a/screenshots/sim-failure-390.png)            |
| Terminal workload              | [Completed](../artifacts/phase-3a/screenshots/sim-completed-1440.png)         | [Completed](../artifacts/phase-3a/screenshots/sim-completed-390.png)        |
| Homepage Lab invitation        | [Desktop](../artifacts/phase-3a/screenshots/homepage-lab-1440.png)            | [Mobile](../artifacts/phase-3a/screenshots/homepage-lab-390.png)            |
| Returns rule correction        | [Desktop](../artifacts/phase-3a/screenshots/returns-rule-label-1440.png)      | [Mobile](../artifacts/phase-3a/screenshots/returns-rule-label-390.png)      |

[Representative run recording](../artifacts/phase-3a/recording/automark-representative-run.webm): actual browser playback, mixed durations, 12 jobs, three workers, 4× viewing speed and a manual pause/resume. No fabricated trace or stitched execution.

## Local preview

```sh
npm run dev
# http://127.0.0.1:3000/lab/
# http://127.0.0.1:3000/lab/automark/

npm run build
npm run preview
# http://127.0.0.1:4173/lab/
# http://127.0.0.1:4173/lab/automark/

npm run lint
npm run typecheck
npm run format:check
npm test
# With the exported preview running:
npm run screenshots:lab
npm run record:lab
npm run audit:lab
```

Preview serves `out/`; do not use `next start`. Original AutoMark infrastructure and keys are never required. Stop your preview with Ctrl+C. The task-owned server was stopped after final verification.

## Created / modified inventory

Created:

- `src/app/lab/layout.tsx`, `lab.css`, `page.tsx`, `automark/page.tsx`.
- `src/components/lab/lab-foundations.tsx`, `use-workload-playback.ts`, `workload-simulator.tsx`.
- `src/content/lab/workload-fixtures.ts`.
- `src/lib/lab/workload-types.ts`, `workload-engine.ts`, `workload-metrics.ts`, `metadata.ts`.
- `tests/lab.spec.ts`; `scripts/capture-lab.mjs`, `record-lab.mjs`.
- `public/lab-og.png`, `lab-automark-og.png`; original art prepared by the existing asset command.
- `docs/LAB_SIMULATION.md`, this report and Phase 3A draft/final screenshots, recording, layout/privacy/verification/runtime/performance artifacts.

Modified:

- `src/app/page.tsx`, `src/content/portfolio.ts`: targeted homepage Lab wording/discovery only.
- `src/components/site-controls.tsx`: Lab destination.
- `src/app/work/automark/page.tsx`: experiment link only.
- `src/components/policy-playground.tsx`, `src/app/work/compact.css`: meaningful named rule label only; policy engine/fixtures unchanged.
- `src/app/sitemap.ts`, `scripts/prepare-assets.mjs`: new route/social assets.
- `scripts/audit.mjs`: separate eight-route Phase 3A audit mode.
- `tests/portfolio.spec.ts`, `collection.spec.ts`: update expected authorised copy; all prior checks retained. `reconciliation.spec.ts`: résumé checks include both Lab routes.
- `package.json`: three local capture/record/audit commands; `.gitignore`: full audit directory. Dependencies and lockfile unchanged.
- AGENTS, README, brief, content inventory, design system and roadmap: current model and delivered phase.

Recovery and verification helpers stay ignored under `.local/phase-3a/`. No external repository changes or calls, and no original asset, legacy CSS/JS/HTML, source résumé or earlier case-study content was overwritten.

## Candid assessment and next work

The strongest result is correspondence between controls, actual model state and explanation: acceptance can finish while the queue is still full, a timeout releases a worker visibly, and event timestamps match records. The forest environment and paper scheduling sheet form a recognisable workspace without synthetic live activity. Failures now stay discoverable after the run.

Mobile intentionally presents a sequence rather than a tiny system diagram. This is readable but requires scrolling between stages; compact controls help at normal phone widths, while very narrow/enlarged text uses normal flow. A future focused-job view or pinned compact aggregate could improve that experience after usability testing. Side-by-side completed-run comparison would make worker-count consequences easier to retain, but is not necessary for this first model.

The engine is deterministic and thoroughly checked within its bounded model, not a production scheduler. Its homogeneous workers, whole-second arrivals, small workloads and one timeout deliberately omit distributed delivery/retry/persistence/security behaviour. Adding those needs explicit semantics and new tests, not visual embellishment. Safari/Firefox, physical touch devices, screen-reader sessions and broader visitor usability remain worthwhile release verification. Additional historical benchmark methodology/source is still desirable; this Lab introduces no new factual project claims. Future experiments should preserve public/private boundaries and keep their own creative composition.
