# Engineering Lab collection — models and publication boundaries

Phase 3B, 28 November 2026. Internal authoring document; never a browser import or public asset. New experiments were implemented sequentially, with focused tests and screenshot-led refinement before the next experience.

## Source hierarchy

The graduate résumé remains the professional authority. AutoMark's logical model and reported results remain unchanged; see `AUTOMARK_EVIDENCE.md` and `LAB_SIMULATION.md`. The new experiences build on the pinned reviews in `EQUITYGUARD_EVIDENCE.md`, `MEDIQUERY_EVIDENCE.md`, `RETURNS_AGENT_EVIDENCE.md` and `DAITA_EVIDENCE.md`. No original project was modified or executed, no paid/model/provider calls were made and no hosted traces were accessed in this phase.

EquityGuard's pinned `6801099818177cb1aad758c7880dbb94901be129` schemas, price tool and custom loop were reread from the preserved source archive. The exact public price-field names and tool input come from those files. The other project evidence inventories were reviewed against their existing public portfolio functions and fixtures; no new unsupported source details were added.

External test results are historical independent evidence, not Lab verification: EquityGuard's prior 23 offline tests have the documented limited scope; MediQuery's four API checks used service doubles; Returns previously collected 19, passed 16 offline and skipped three live-provider tests, separate from its 13-test résumé baseline. Current DAITA source/runtime remains unverified beyond résumé-supported professional facts and related historical prototype evidence. These were not rerun or silently promoted into integration guarantees.

## Shared foundation

`experiments.ts` contains public names, descriptions and boundaries only. The Server Component frame supplies metadata, breadcrumb, concise introduction, no-JavaScript representative example, case-study link and available-experiment navigation. Each client workspace owns its own interaction structure and route CSS. Fixtures, pure functions, state, playback and presentation remain separate. No generic simulation framework forces the five concepts into one state machine.

Every experiment entry disables prefetch. Browser checks inspect downloaded scripts on homepage/Lab visits and hover to ensure the workload/replay/journey/workflow/review code is not loaded there. Navigation and metadata do not import internal evidence. Static export needs no runtime service, API key, database or original application dependency.

## AutoMark — retained completed runs

The original scheduling engine, fixtures, metrics and playback hook are unchanged. `completedRun` accepts terminal runs only and copies configuration plus derived metrics. A visitor explicitly retains a snapshot; it survives resets within the mounted experiment and clears on navigation or the clear action. No localStorage/database.

The comparison lists jobs, workers, scenario, acceptance/completion virtual time, peak waiting queue, completed/failed counts and rounded utilisation. Only a sole worker-count change is described as isolating worker count. Multiple changed variables are named and explicitly do not establish that causal effect. Identical settings identify deterministic replay. Worker activity is derived from matching actual started/completed/timeout events of the current run, not fabricated sequences or wall time. Retained summaries contain no event history.

The existing 0–36-job, 1–6-worker model and historical-result separation remain as documented in `LAB_SIMULATION.md`. A completed-run sticky bar no longer obscures the comparison; active playback controls retain their approved behaviour.

## EquityGuard — observable replay

Public fixtures: fictional ticker FICT, synthetic price values, prepared request/tool selection/response. The percent price change is calculated from its two fixture prices. Registered name `get_price_data`, required string ticker, returned dictionary fields and public response names are source-grounded. No real instrument assessment or investment recommendation.

Ready → running ⇄ paused → completed. Step appends one ordinal event and leaves the replay paused; ticks only act while running. Duplicate start/resume actions outside their phases are ignored. Reset clears events/selection. Playback uses one 1,200ms or 600ms viewing interval; hiding the tab pauses, route exit clears the interval/listener. Event numbers are order, not synthetic latency measurements.

- Success: prepared request → request shape check → prepared tool_use → synthetic tool_result → observation using the same call ID → prepared public response and public-field shape check.
- Missing ticker: real TypeScript presence/type check stops before any tool call. This reflects the source's required request boundary, without claiming complete Pydantic coercion parity.
- Provider error: the source price tool can return an error dictionary. The original custom loop sends dictionaries back to the model; it does not guarantee general recovery. The Lab's explicit terminal inspection stop is labelled an **educational extension**.

`validPublicResponse` checks only the displayed public-field types (including a nullable integer score). It does not recreate the full original response/trace model, enforce an instrument's existence, assess numerical truth or prove financial correctness. Private trace content and hidden reasoning are neither copied nor reconstructed. The exact-payload disclosure contains only these authored public fixtures.

## MediQuery — document-to-statement provenance

Four fictional garden source records produce eight paragraph chunks. IDs S01–S04 and S01-C1 etc. survive every stage. This model splits on authored paragraph boundaries, not the original 512/64-character configuration. Synthetic 2D coordinates are fixed source directions plus a deterministic paragraph offset; they are not BioBERT embeddings.

The existing `cosineSimilarity`, `similaritySelect` and `mmrSelect` functions are reused. k=3, query [1,0], weight 0–1. First seed is query similarity; subsequent MMR choices apply the documented redundancy penalty, with fixture-order tie handling. All shown cosine/MMR values are calculated, not unrelated hardcoded rankings.

Sources → Chunks → Vectors → Select → Context → Answer are visitor-selected inspection stages, not a live ingestion/generation replay. Selected IDs assemble context; prepared statement fixtures use those IDs as authored references. Clicking a reference selects its actual chunk/source and highlights the excerpt. No arbitrary query, model, PubMed request, vector store or embedding download runs.

The highlighting is an authored teaching aid, **not** an existing automatic citation-verification capability. Original MediQuery retrieves its displayed source list separately from generation context, and does not automatically establish entailment/completeness/correctness. The Lab's shared context deliberately illustrates provenance without claiming that source implementation already provides this guarantee. No medical content or advice.

## Returns — branching resolution workflow

Four authored request fixtures: complete, missing reference, invalid prepared reference type, and opened-item human review. No visitor text is interpreted by a model. The fixture interpretation and fictional trusted order record occupy separate state fields.

Ready → interpreted → lookup → policy → reply → completed. Missing information branches to waiting before lookup/policy; invalid structure branches to invalid. Supplying a listed fictional reference resumes lookup. Unknown/blank detail input leaves the workflow waiting with a validation message. A corrected prepared fixture can repair invalid input; that control is explicitly an educational extension, not a model retry. Terminal next actions are ignored; reset/scenario change starts cleanly.

The same independently authored 21-day/sealed/opened/damaged policy used by the case-study playground is reused. Original assessment rules, customer records, fixtures, private scenarios and traces are absent. The policy outcome is stored separately; a representative reply is derived without modifying it. Final validation checks a nonblank reply/reference and policy-code consistency. It is a small educational public-output check, not proof of correct original interpretation or operational safety. No actual order action or consumer-rights determination.

Generic responsibilities reflect the verified LangGraph project: interpretation, tool lookup, clarification, policy, reply and final validation. The Lab is not an execution of the eight original nodes or confidential company assessment logic.

## DAITA — mapping, quality and human review

Four new records Q01–Q04 have immutable source identity, provenance and source fields. Existing `mapRecord`, `normaliseRecord`, `checkRecords`, date/amount parsers and AUD formatting are reused. New interactive mapping, editing, disposition, review and export-preview logic is educational, not source-level proof of current DAITA implementation.

The amount column starts unmapped. Selecting Value parses amounts to integer cents; wrong mappings retain explicit invalid fields. Q03 matches Q01 across normalised date/description/amount/reference. Q02 lacks a description; Q04 has an impossible date.

A separate edit map stores date/description/category corrections, duplicate disposition and review state. Every derivation reprocesses all four records. Rows partition into held, ready, reviewed or excluded; counts always conserve the original four. Possible repeats may remain held, be confirmed excluded, or be kept as distinct by a reviewer. Exclusion never deletes a source row.

Only quality-ready rows can be confirmed. Editing a field/category/disposition invalidates its review; mapping changes invalidate all reviews. Revert removes only the chosen record's local edits; Reset restores the initial mapping and empty edit map. No original field is overwritten. The quoted CSV text preview is derived from reviewed rows only, in source order, including stable IDs/provenance. It is not a real financial report/export service.

No uploads, actual financial documents, tax rules, eligibility, ATO references, numerical confidence or original client data. Categories describe fictional review buckets only.

## Verification limits

Portfolio pure/browser assertions establish these bounded educational models separately from original-project tests. Chromium desktop and iPhone-emulated Chromium, five widths, 200% text, reduced motion, native keyboard/touch, no-JavaScript examples, model identity/invariants and tested Axe states are covered. These do not establish full WCAG conformance, original application reliability, physical-device compatibility or Safari/Firefox behaviour. Local recordings/Lighthouse are lab measurements, not field INP or production performance.
