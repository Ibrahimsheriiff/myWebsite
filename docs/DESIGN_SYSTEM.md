# Design system

## AutoMark article extension

The `/work/automark/` route extends the approved identity through a large editorial opening, sage product plate, constrained reading columns, a dark system-map chapter, ruled decision rows and a sandstone demonstration reflection. Chapter composition follows the story rather than a shared card template. Route CSS is scoped to article-specific classes.

The explorer uses native buttons, selection/neighbour emphasis, directional connections and input/output notes. Tab reaches every component; arrows follow the rendered geometry; Home and End reach all ten components' ends. Selection never advances automatically. Overlapping explanation panels reserve the tallest content height to avoid jumps. A separate readable HTML fallback exposes all notes without JavaScript. Narrow screens use larger two-column controls and explicit neighbouring-component text instead of shrinking wire labels. Keep the muted linework, visible focus and reduced-motion behaviour.

## Identity

The Curious Engineer. A personal editorial introduction, distinct evidence-led work compositions and a darker engineering workspace. The absence of a portrait is intentional: real diagrams and typography carry the composition.

## Foundation

| Token          | Value     | Purpose                      |
| -------------- | --------- | ---------------------------- |
| Paper          | `#F4F1E8` | Main canvas                  |
| Ink            | `#171B1A` | Primary copy                 |
| Forest         | `#263D30` | Actions and emphasis         |
| Sage           | `#A8C5B0` | Restrained accent            |
| Sand           | `#C8AD8D` | Document/workflow atmosphere |
| Muted          | `#5B625A` | Readable secondary copy      |
| Lab background | `#20382C` | Environment change           |

Use Geist for body/interface, Instrument Serif for editorial emphasis, Geist Mono for secondary technical notation. Fonts are self-hosted, with fallback families and `font-display: swap`.

Spacing uses a 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Content max-width is 1200px. Gutters: 64px desktop, 40px tablet, 24px mobile (20px at 320px). Section spacing and type scale reduce deliberately on mobile. Do not hide overflow to conceal layout defects.

## Compositions

- Hero: large personal introduction and asymmetrically drawn notebook; four selectable stages with a stable explanation area.
- AutoMark: sage environment, authentic interface, architecture strip and contextual achievements.
- EquityGuard: open editorial copy and radial agent/tool illustration, with evaluation evidence.
- Deloitte DAITA: sandstone editorial layout and document/rules/report drawing.
- About: personal story and an illustrative Chittagong–Sydney connection; no invented geographical map or travel photo.
- Lab: dark forest, dotted drawing surface, explicit in-development status. Horizontal architecture becomes vertical on mobile.
- Contact: generous typography, direct email, professional links, personal sign-off.

## Interaction

Notebook tabs: click/touch, arrow keys, Home/End, roving focus; no timed progression or hover-driven content replacement. Menu and archive use native disclosures. Dashboard enlarges in a native modal dialog with Escape and focus return. Sydney clock uses IANA timezone data, not hardcoded UTC offsets. No live-announcing clock.

Motion is limited to short hover/selection transitions. Respect reduced motion; no custom cursors, looping decoration, scroll hijacking or essential scroll reveals. Focus stays visible. Essential professional content is server-rendered and requires no interaction.

## Phase 1B refinement

`editorial.css` refines the approved foundation rather than replacing it. The hero aligns the introduction and notebook at the top; intermediate-width typography prevents an isolated “them.” line. The selected-work top gap is reduced from 96px to 76.8px on desktop. Body copy remains 16px; technical labels receive selective size and contrast improvements.

The notebook uses a stronger selected label, visible stage numbers, subtle paper linework, binding marks and an indexed explanation. All panels still contribute to the same grid area, keeping selection height stable. No automatic advancement. Hover and press feedback are short and disabled under reduced motion.

AutoMark's thumbnail clips only the source image's browser toolbar through CSS; the source and full-image dialog remain unchanged. Role, architecture, sponsor-demo outcome and confirmed achievements are connected within the composition.

EquityGuard's static radial diagram now shows request, tool orchestration and Pydantic response validation. Its schema illustration describes API response shape, not verified financial correctness. Deloitte's illustrated workflow spans documents, extraction, deterministic classification and reviewable reporting; it is clearly conceptual. Mobile uses compact illustrated rows rather than miniature desktop labels.

Container queries reflow notebook stages and the agent diagram when text enlargement makes fixed drawing coordinates unsuitable. Geist Mono is preloaded because technical notation is now prominent above the fold. Review widths: 1440, 1280, 1024, 768, 390 and 320px.

## Phase 2A.1 reconciliation

The identity is retained. The explorer now has three logical lanes: four intake components, three execution responsibilities and three application/data responsibilities. Orthogonal SVG paths use measured node positions; edge labels occupy channels outside nodes. The SVN commit is an input event, the repository is storage/service, and the hook reacts to the event. Dashed paths abstract undocumented handoffs instead of inventing deployment detail. Mobile recomposes the lanes and expands the last item in three-component groups to use the available row. Enlarged-text container queries reflow controls/achievements.

Benchmark typography separates 18.17s acceptance from P95/P99 grading completion. Use a real two-row percentile table, not a fabricated distribution or a combined timeline. Case-study headings now vary: direct engineering questions, a compact demo heading and a factual results heading. DAITA retains sandstone with a richer document/data-quality/tax-knowledge/human-review storyboard.

## EquityGuard / research publication

Route styles stay in `src/app/work/equityguard/equityguard.css`. Its identity uses an edition line, large asymmetric cover, ruled application-boundary drawing, authentic product plate, logical responsibility ledger, forest control-flow strip, sage contract inspector and sandstone test inventory. It does not reuse AutoMark's map, benchmark treatment or seven-chapter component.

The six-tool selector uses automatic-activation tabs with arrows/Home/End; selection never advances itself. Invisible panels share a grid area to reserve the maximum content height at each width. `aria-hidden` plus `visibility:hidden` keeps inactive contracts out of the accessibility tree and tab order; native hidden was avoided because Tailwind's important preflight rule removed layout reservation. Without JavaScript, all six contracts are native disclosures. No live analysis or fake trace state is present.

At tablet widths the cover and narrative switch to a single reading column. Font-relative container boundaries also support enlarged text. At very narrow effective widths the tool list becomes one column. Technical output names wrap without horizontal scrolling. Exact test counts are encoded by nine/seven/seven marks with text equivalents; the marks are decorative to assistive technology.

A production-bundle privacy review separated public identity/notebook copy and AutoMark diagram data from server-authored provenance (`identity.ts`, `automark-system.ts`). Browser code does not need local source paths or internal claim notes. This changes module boundaries, not approved designs.

## DAITA / document processing

The article is a quiet sandstone document spread. Its wide opening, source/review sheets, three contribution columns, ruled workbench and conceptual review worksheet differ from AutoMark’s map/product presentation and EquityGuard’s agent/contract composition. No brand logos, invented product screens or decorative market charts.

Keep the workbench’s stable record identifiers and explicit stage labels. Native step buttons and Previous/Next controls give visitors control; there is no timed progression. Semantic tables carry desktop records. Narrow screens use labelled record lists, preserving data rather than shrinking a spreadsheet. Normalised fields use text annotations as well as colour. Held rows remain visible with named reasons, and visitor correction is explicitly local/illustrative. No fake tax references or confidence values.

Rendered refinement tightened the mobile opening, reduced contribution/intro typography and added mobile original-value annotations. Effective-width container queries accommodate enlarged text. Native disclosures explain all stages without JavaScript. Route CSS remains scoped to `dt-`/`dw-` classes.

## Compact studies / MediQuery and Returns

`work/compact.css` supplies a restrained shared reading scale, not a shared article template. MediQuery uses serif-led research typography, authentic source UI, a sage pipeline and synthetic vector notebook. Returns opens in forest with a responsibility strip, source-grounded graph linework and an editable decision sheet. Both are substantially shorter than AutoMark. Avoid expanding each implementation detail into another section.

Retrieval uses real cosine/MMR calculations with labelled synthetic directions and an equivalent HTML score/selection table. Nearby A/B vectors keep their real positions; leader labels separate the labels without falsifying geometry. Policy inputs/results/rules are portfolio inventions and explicitly labelled. Native radios/range/buttons/select/inputs support keyboard/touch, reduced motion and visible focus. No-JavaScript summaries stay useful. A small inline completed-study footer index connects the collection without a new global navigation feature.

## Engineering Lab / Phase 3A

The Lab uses a deep-forest environment with ivory typography, a selective serif voice and a sage logical sketch. The landing page is an editorial workbench invitation, not a dashboard grid. Available AutoMark and planned questions are clearly distinguished. The experiment uses a single light scheduling sheet: controls, four responsibility columns, defined metrics, records and an actual model-event ledger. Desktop flow becomes two-by-two on tablet, then sequential on mobile. Font-relative container queries handle enlarged text.

Rendered iteration kept playback controls visible while scrolling, retained every failure alongside recent completions, tightened mobile empty states and clarified completion instructions. Sticky controls return to normal flow at very narrow effective widths so enlarged text is not obstructed. The landing sketch preserves a compact two-column phone composition and becomes one column only at narrower effective widths. Worker progress is derived from virtual state, and idle lanes clear immediately. Finite entry/progress transitions respect reduced motion. Status changes announce aggregates; individual tick events do not announce continuously. The Returns outcome’s oversized single letter is now a named rule label.

## Complete Lab / Phase 3B

Preserve the forest opening, sign-off and AutoMark feature. A small available-experiment index makes every destination discoverable immediately. Lower editorial previews differ: stepped public packets, source/chunk paper, a clarification fork and a document-review spread. No identical five-card dashboard.

EquityGuard uses an ordinal event ledger and a public-payload receipt/disclosure. MediQuery uses a scientific source register, six inspection stages, computed retrieval values and reference excerpts. Returns separates prepared language and deterministic responsibilities, with clarification/correction visibly branching before policy. DAITA uses sandstone original fields beside an editable review sheet, named local changes, an exception ledger and a derived export preview. Shared typography/colour/navigation carry identity; workspaces retain individual layout.

Screenshot-led refinements compacted the mobile replay ledger, separated exact JSON, reduced the evidence register's dominance in later stages, kept effective-width stage controls accessible, exposed the clarification branch and in-context continuation, corrected DAITA contrast and marked changed fields. AutoMark's completed sticky transport no longer covers comparison reading. Native controls, textual states, source identities, meaningful focus, reduced motion and accessible HTML remain essential.
