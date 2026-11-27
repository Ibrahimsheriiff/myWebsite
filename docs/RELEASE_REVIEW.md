# Portfolio 2.0 release review

28 November 2026. The user explicitly authorised review, commit, push, merge and deployment after Phase 3B. Earlier no-publication instructions describe historical implementation phases and are superseded for this release only.

## Reviewed scope

The current branch contains the complete, previously uncommitted Portfolio 2.0 application: editorial homepage, five case studies, Engineering Lab landing and five browser-side experiments. Review covered typed content/evidence boundaries, route metadata, navigation, native interaction semantics, deterministic transformations/reducers, playback ownership/cleanup, retained-run comparison and static-export packaging. No blocking source issue was identified. Detailed model/visual reviews and measured Lighthouse results remain in the phase reports.

All original legacy source files and earlier local edits remain untouched. The release excludes the existing dirty root HTML/CSS/JavaScript and untracked historical HTML draft. Generated screenshot/video evidence remains locally available; measurement JSON and documentation are included in Git. No recovery archive, original external repository archive, key or credential is included. Dependencies are unchanged by release preparation.

A recovery snapshot of the pre-publication workspace is retained locally in `.local/recovery/pre-release-2026-11-28.zip`, with a hash manifest. The original preservation and public-export privacy checks pass. Existing case-study and AutoMark scheduler protections pass.

## Release preparation changes

- Quality CI now checks formatting, and runs on main-branch pushes as well as pull requests/manual dispatch.
- Generated PNG/WebM capture artifacts are ignored to avoid publishing hundreds of megabytes of repeatable evidence in the source history. Small JSON measurements remain included. Existing captures are not deleted.
- Existing production hosting is Cloudflare Pages project **ibrahim**, confirmed by the Cloudflare GitHub check on the current main commit. The production domain is `https://ibrahimsheriiff.com`.
- `wrangler.toml` explicitly limits Pages publication to `out/`. A missing build therefore fails rather than publishing the repository root. `.node-version` selects Node 22 for build environments that honour it. Cloudflare's separate build command still needs verification in its dashboard.

## Verification and production boundary

Production build, ESLint, TypeScript and formatting passed during release review. The full desktop/mobile regression suite passed again: **118/118 executions, 1.4 minutes**. The Phase 3B report records the earlier successful full run, five-width visual review, accessibility/reduced-motion/no-JavaScript checks and all twelve route Lighthouse results (performance 98–100, measured CLS 0; field INP unmeasured).

Production must serve only `out/`, with build command `npm run build`, repository root as the working directory and Node 22 or newer. Serving the repository root would serve the preserved legacy homepage and expose source/documentation. Verify Cloudflare's settings before merging to its production branch; do not substitute a new hosting provider or infer the output directory from a green legacy deployment.

Cloudflare dashboard authentication is required to inspect/update the existing build settings. No production success is claimed until the deployment matching the merged commit succeeds and the new routes/current résumé are verified on the production domain.

## Remaining limits

Chromium desktop/mobile emulation and automated accessibility are not physical-device, Safari/Firefox, screen-reader or complete WCAG certification. The synthetic Lab models do not establish original-system reliability. See `PHASE_3B_REPORT.md` and the project evidence inventories for content/runtime evidence gaps. Existing production can be restored through Cloudflare's deployment rollback controls; preserve the previously successful deployment when releasing.
