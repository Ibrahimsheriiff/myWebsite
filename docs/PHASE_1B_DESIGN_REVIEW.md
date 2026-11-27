# Phase 1B — rendered design review and refinement

Historical report. Current professional content, architecture and measurements are documented in [Phase 2A.1 reconciliation](PHASE_2A1_RECONCILIATION.md); do not treat older source limitations as current.
Completed locally on 26 November 2026, on `codex/portfolio-2-phase-1`. No commit, push, merge or deployment. This report supersedes the Phase 1 report for the current design and measurements; the earlier report remains a historical baseline.

## Review and preservation

The existing production export was inspected before app code changed, at 1440, 1280, 1024, 768, 390 and 320px. Full pages established rhythm; individual sections were also inspected at normal viewing scale. The supplied brief ends mid-sentence after “Capture before-and-after screenshots using”; the existing Playwright capture workflow was extended to provide those captures.

An ignored local recovery snapshot, `.local/recovery/pre-phase-1b.zip`, preserves 61 source, configuration, public and original files. Its SHA-256 inventory is `.local/recovery/phase-1b-manifest.json`. The earlier recovery snapshot and nine-entry original-file inventory remain intact. All nine original hashes still match, including the untracked HTML draft, original images and résumé. Existing dirty legacy files were not overwritten. No dependency was added or updated; the lockfile is unchanged from the Phase 1B baseline.

## Findings and resulting changes

| Observed weakness                                                                                      | Refinement                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| At 1024px, “them.” became an isolated headline line. The notebook felt detached from the introduction. | Preserve every headline word; adjust fluid type and alignment at intermediate widths. Keep the final phrase together on narrow screens.                                              |
| Notebook selection was understated, with a large, weak explanation area.                               | Strong dark selected labels, numbered stages, clearer instruction, paper linework, binding marks and an indexed explanation. Keep stable panels, keyboard tabs and manual selection. |
| Hero and selected-work transition felt distant.                                                        | Desktop hero is 84px shorter; selected-work top spacing changes from 96px to 76.8px, a targeted 20% reduction. No blanket spacing reduction.                                         |
| Body text was already readable at normal size; small diagram labels needed help.                       | Retain 16px body text. Selectively strengthen technical notation, labels and contrast.                                                                                               |
| AutoMark's individual contribution and outcome were easy to overlook.                                  | Visible “My role / Backend Lead”, clearer architecture labels and a sponsor-demo outcome alongside the product illustration. All four confirmed achievements remain.                 |
| Browser chrome distracted from the authentic AutoMark interface.                                       | Crop only the original browser toolbar in the thumbnail using CSS. Preserve the entire original in the accessible enlargement dialog. No application pixels were fabricated.         |
| EquityGuard's attractive radial drawing lacked input and output boundaries.                            | Connect the input request, custom ReAct loop, four tool groups, response schema and documented 23-test suite. Retain the open radial composition.                                    |
| Deloitte's miniature graphic added little practical meaning.                                           | A three-act document-processing storyboard: source documents, explicit processing/rules, reviewable results. Clearly labelled as a conceptual university prototype.                  |
| About repeated the professional introduction.                                                          | Lead with Chittagong and Sydney, retain WSU, and use the supplied Docker-demo reflection and actual travel/business interests. Preserve the approved heading.                        |

The Engineering Lab and contact compositions remain substantially as approved. No simulations, fake logs, launch controls or unfinished case-study destinations were introduced. Existing link focus, image-dialog focus restoration, native disclosures and mobile navigation remain functional.

## Meaningful design iteration

The first revised render was reviewed as a draft. Its Deloitte workflow became excessively tall on mobile, so the illustration was recomposed into compact visual/text rows rather than simply shrinking desktop labels. An enlarged-text browser check exposed overflow; container queries now reflow notebook stages and the agent figure when typography no longer fits diagram coordinates. The full browser suite then passed.

Normal-size section review prompted further improvements to document labels, AutoMark role/outcome placement and screenshot framing. A production audit identified a small shift caused by the late-loading mono font; preloading this now-prominent above-fold font removed the measured shift. Final captures settle transitions and allow sufficient viewport room for complete section crops. Full-page desktop, tablet and mobile screenshots were inspected again after refinement.

The result has a stronger signature object in the hero and more purposeful differences between project compositions. It preserves the original identity rather than applying a new visual theme.

## Before and after captures

These are actual exported-site browser screenshots. Before captures were taken before app edits. Full-page screenshots are useful for rhythm; use individual sections to judge normal-size text. Sydney clock times differ naturally between captures.

| Width  | Before                                                          | After                                                          |
| ------ | --------------------------------------------------------------- | -------------------------------------------------------------- |
| 1440px | [Full desktop](../artifacts/phase-1b/before/full-1440.png)      | [Full desktop](../artifacts/phase-1b/after/full-1440.png)      |
| 1280px | [Full page](../artifacts/phase-1b/before/full-1280.png)         | [Full page](../artifacts/phase-1b/after/full-1280.png)         |
| 1024px | [Full page](../artifacts/phase-1b/before/full-1024.png)         | [Full page](../artifacts/phase-1b/after/full-1024.png)         |
| 768px  | [Full tablet](../artifacts/phase-1b/before/full-768.png)        | [Full tablet](../artifacts/phase-1b/after/full-768.png)        |
| 390px  | [Full mobile](../artifacts/phase-1b/before/full-390.png)        | [Full mobile](../artifacts/phase-1b/after/full-390.png)        |
| 320px  | [Full narrow mobile](../artifacts/phase-1b/before/full-320.png) | [Full narrow mobile](../artifacts/phase-1b/after/full-320.png) |

| Section, 1440px | Before                                                       | After                                                                                                                    |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Hero            | [Section](../artifacts/phase-1b/before/hero-1440.png)        | [Section](../artifacts/phase-1b/after/hero-1440.png) · [Framed introduction](../artifacts/phase-1b/after/intro-1440.png) |
| AutoMark        | [Section](../artifacts/phase-1b/before/automark-1440.png)    | [Section](../artifacts/phase-1b/after/automark-1440.png)                                                                 |
| EquityGuard     | [Section](../artifacts/phase-1b/before/equityguard-1440.png) | [Section](../artifacts/phase-1b/after/equityguard-1440.png)                                                              |
| Deloitte DAITA  | [Section](../artifacts/phase-1b/before/daita-1440.png)       | [Section](../artifacts/phase-1b/after/daita-1440.png)                                                                    |
| About           | [Section](../artifacts/phase-1b/before/about-1440.png)       | [Section](../artifacts/phase-1b/after/about-1440.png)                                                                    |
| Lab             | [Section](../artifacts/phase-1b/before/lab-1440.png)         | [Section](../artifacts/phase-1b/after/lab-1440.png)                                                                      |
| Contact         | [Section](../artifacts/phase-1b/before/contact-1440.png)     | [Section](../artifacts/phase-1b/after/contact-1440.png)                                                                  |

The same seven section files exist at every review width. Additional interaction captures: [Design selection](../artifacts/phase-1b/after/notebook-design.png), [Build selection with keyboard focus](../artifacts/phase-1b/after/notebook-keyboard-focus.png). [Before measurements](../artifacts/phase-1b/before/measurements.json) and [after measurements](../artifacts/phase-1b/after/measurements.json) record layout dimensions. Document width equals viewport width in all six final captures.

## Evidence and content boundaries

EquityGuard source was inspected directly before finalising diagram labels. The custom loop, registry, news tool, API route and Pydantic schemas support the displayed architecture. News is described as headlines and summaries, not an invented numerical sentiment classifier. Pydantic validates response shape; the illustration does not promise correct financial conclusions. No private model reasoning is displayed. The 23-test count is documented by the project README; these project tests were not rerun as part of portfolio validation. Exact source links and file SHAs are recorded in [the content inventory](CONTENT_INVENTORY.md).

Deloitte processing and reporting claims come from the supplied résumé: PDF/CSV/Excel processing, rule-based classification, expense breakdowns, risk flags and downloadable reports. The drawing explains a conceptual workflow, not a reproduced production deployment. It remains a university-industry collaboration and prototype.

AutoMark's 97/100, 200 concurrent submissions tested, 43 API endpoints and best-project nomination remain user-confirmed and publishable; supporting documents are pending. The original screenshot remains the best available authentic image. No personal photo exists in the supplied materials, and none was invented.

## Verification

| Check                      | Result                                                      |
| -------------------------- | ----------------------------------------------------------- |
| Production `npm run build` | Pass; static export in `out/`                               |
| ESLint                     | Pass, no warnings                                           |
| Strict TypeScript          | Pass                                                        |
| Playwright                 | 10/10 passing, desktop Chromium and emulated mobile touch   |
| Automated accessibility    | No Axe violations in the tested desktop and mobile pages    |
| Responsive overflow        | Pass at 320, 390, 768, 1024, 1280 and 1440px                |
| Enlarged text and motion   | 200% root-font check at 390px and reduced-motion check pass |
| Original preservation      | Nine of nine original SHA-256 entries match                 |

Browser tests cover pointer/touch and keyboard notebook selection, stable panel dimensions, mobile navigation, disclosures, image-dialog Escape and focus restoration, legacy anchors, résumé/local assets, metadata files, content without JavaScript and responsive overflow. Rendered review includes hierarchy, line breaks, focus, diagram readability and page rhythm. Browser emulation is not a physical-device test; root-font enlargement is not every browser/OS zoom configuration.

### Measured Lighthouse results

Lighthouse 13.6.0 against the local production static export, 26 November 2026 at approximately 17:48 Sydney time. [Machine-readable summary](../artifacts/phase-1b/performance-summary.json). Raw HTML/JSON audits remain locally in ignored `artifacts/phase-1b/audits/`.

| Metric              | Mobile | Desktop |
| ------------------- | ------ | ------- |
| Performance         | 100    | 100     |
| Accessibility       | 100    | 100     |
| Best practices      | 100    | 100     |
| SEO                 | 100    | 100     |
| LCP                 | 1.5s   | 0.3s    |
| CLS                 | 0      | 0       |
| Total blocking time | 20ms   | 0ms     |

Targets remain LCP below 2.5s and CLS below 0.1. These are simulated local laboratory measurements, not guarantees of real visitor experience. Field INP was not measured. The earlier Phase 1 mobile run measured LCP 1.2s, CLS 0 and TBT 30ms; current mobile LCP is 0.3s higher while remaining comfortably within target. The historical baseline is preserved separately rather than overwritten.

## Implementation inventory

No architecture change: build-time editorial content and Server Components still produce the static homepage, with the existing small Client Components for browser behaviour. The new diagrams are Server Components; no diagram runtime or animation dependency was introduced.

| File                                                              | Phase 1B change                                                                                 |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/app/editorial.css`                                           | New scoped refinements, notebook styling, project diagrams, responsive and enlarged-text reflow |
| `src/components/project-diagrams.tsx`                             | New evidence-based agent and document workflow drawings                                         |
| `src/app/page.tsx`                                                | Composition, visible role/outcome, revised diagram placement                                    |
| `src/app/layout.tsx`                                              | Refined stylesheet import and Geist Mono preload                                                |
| `src/components/notebook.tsx`                                     | Discoverable stages, indexed explanation and annotations                                        |
| `src/components/site-controls.tsx`                                | Explicit full-original image action label                                                       |
| `src/content/portfolio.ts`                                        | Specific supporting copy and typed diagram content                                              |
| `tests/portfolio.spec.ts`                                         | Six-width responsive coverage                                                                   |
| `scripts/review.mjs`                                              | New six-width full/section and interaction capture workflow                                     |
| `scripts/audit.mjs`                                               | Separate Phase 1B output option                                                                 |
| `package.json`                                                    | Review capture/audit commands; dependencies unchanged                                           |
| `.gitignore`                                                      | Ignore raw Phase 1B Lighthouse reports                                                          |
| `AGENTS.md`, `README.md`                                          | Persistent refinement guidance and commands                                                     |
| `docs/DESIGN_SYSTEM.md`, `docs/CONTENT_INVENTORY.md`              | Composition decisions and source verification                                                   |
| `docs/IMPLEMENTATION_REPORT.md`, `docs/IMPLEMENTATION_ROADMAP.md` | Historical baseline notice and current phase status                                             |
| `docs/PHASE_1B_DESIGN_REVIEW.md`                                  | This review and handoff                                                                         |
| `artifacts/phase-1b/`                                             | Before/after captures, dimensions and final audit summary                                       |

## Local preview and reproduction

```sh
npm run dev
# Development: http://127.0.0.1:3000

npm run build
npm run preview
# Exported production site: http://127.0.0.1:4173
```

With the static preview running, `npm run screenshots:review` regenerates final captures and `npm run audit:review` generates separate audits. `npm test` can start or reuse the preview. Stop a manually started server with Ctrl+C. The review server was stopped at handoff.

## Candid design assessment and next iteration

The notebook now reads as a deliberate object, with an obvious selected stage and explanation hierarchy. The hero is more specific about the engineer behind the site. The three projects offer materially different reading experiences: product evidence, system relationships and practical document processing. The quieter About section now adds personal context instead of repeating a role description.

I consider this a substantial improvement over the first draft, but a 90+/100 design score is a subjective aspiration, not a measured or independently certified result. The mobile homepage remains a long editorial read. Native disclosures keep secondary work compact; future case studies can move deeper detail off the homepage once those destinations are real. The notebook and architecture drawings share a visual language; real project materials are the best way to add further variety without decoration.

The largest remaining asset limitation is AutoMark's screenshot: its application UI is small and dated, especially on mobile. The enlarged original remains available. A genuine higher-resolution capture or focused authentic detail could improve this further. Optional real personal photography may add warmth, but the current About composition is complete without it.

Remaining content needs: the authoritative graduate résumé; documentary support for the four AutoMark achievements; richer AutoMark and Deloitte project material where shareable; project evaluation evidence for later case studies. Keep user-confirmed claims distinct from repository evidence internally. Detailed case studies, working Lab experiences and other Phase 2 features remain future work.
