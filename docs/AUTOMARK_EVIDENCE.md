# AutoMark — reconciled evidence inventory

Updated 27 November 2026 for Phase 2A.1. This supersedes the earlier eight-component evidence model. Historical snapshots and the Phase 2A report retain the previous interpretation; they are not the current source of professional content.

## Source hierarchy

1. **Authoritative résumé-supported:** the supplied two-page graduate résumé, read in full including embedded links. The supplied path was `Downloads/IBRAHIM_RESUME_Graduate.pdf`; the brief calls it `IBRAHIM_RESUME_Graduate(6).pdf`. The actual supplied file is retained byte-for-byte at [the current source](../content-sources/resume/IBRAHIM_RESUME_Graduate.pdf). Its contents match the supplied updated professional facts.
2. **Repository-supported:** actual project source/documentation or supplied authentic assets, with scope/version recorded.
3. **User-confirmed:** direct confirmation in the portfolio briefs, including details not present in the PDF.
4. **Historical:** the older résumé and development drawing. Useful for historical context; not authority for the current cloud architecture.
5. **Unresolved/unsupported:** details for which the reviewed sources do not establish an answer. These are not silently filled in.

Résumé support is a traceable professional source, not an independent source-code audit or raw benchmark log.

## Sources and fingerprints

| ID    | Source                                                                                      | Status / coverage                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| AM-G  | [Graduate résumé](../content-sources/resume/IBRAHIM_RESUME_Graduate.pdf), pages 1–2         | Authoritative; AutoMark on page 1, education result/nomination, full-stack professional positioning                         |
| AM-U  | Phase 2A.1 brief and earlier supplied experiences                                           | User-confirmed Backend Lead, 43 endpoints and Docker-volume demo reflection                                                 |
| AM-H1 | [Earlier architecture drawing](../assets/img/system%20architecture.png)                     | Historical development view: SVN post-commit behaviour, application requests, marker/script/output storage responsibilities |
| AM-H2 | [Earlier résumé](../assets/resume/Ibrahim%20Sharif%20Resume%20v4.pdf)                       | Historical context, including Compose/NGINX/Linux and sponsor acceptance after demonstration; not default public résumé     |
| AM-I  | [Original dashboard](../assets/img/dashboard.png) and [login](../assets/img/login%20UI.png) | Authentic interface evidence; source images preserved                                                                       |

```text
AM-G  c5109e6c622a7b82ac94444b589c1d8d40926329689521b02814c3a1c7c1cff2
AM-H1 94fb17336239bbee702f9270a9b6b7d84d6d83ffb8db37e470296a8b1a51fc11
AM-H2 c81d53779d4f713b5decc89c1b88773d4a16d4f34f349d3533ddd75c4b7bdc97
AM-I dashboard bf5fbd10d720e10937c72e71cb2dca5d9169660bf9b9a3429fe03f7a7e0df8b9
AM-I login e79260adecc5a939e224694e2104d30b522c059395c7b5d2a6bc1abe52fca9f7
```

## Corrected claims

| Claim                                                                                      | Current classification                                        | Treatment                                                                                                                 |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| WSU capstone, July–November 2025                                                           | Authoritative résumé-supported                                | Retained; no internship/employment inflation                                                                              |
| Backend Lead                                                                               | User-confirmed; résumé corroborates core backend work         | Retained role, with concrete full-stack contribution                                                                      |
| FastAPI, JWT, role-based access, subject enrolment, assignments, submission tracking       | Authoritative résumé-supported                                | Added explicit application responsibilities                                                                               |
| HTML/CSS/JavaScript development and dashboard-to-REST integration                          | Authoritative résumé-supported                                | Corrects the previous backend-only account. Personal integration work is distinguished from collective product ownership. |
| SVN → grading workflow → isolated Docker code/script execution → scores/feedback           | Authoritative résumé-supported                                | Retained, with commit, repository and hook separated                                                                      |
| Durable job queue and independent grading workers on AWS                                   | **Authoritative résumé-supported**                            | Added explicitly. The earlier queue/thread model is no longer presented as the current complete architecture.             |
| About 15 minutes per manually graded submission                                            | Authoritative résumé-supported                                | Problem context only; no derived percentage or speed-up ratio                                                             |
| 200 concurrent submissions; all 200 jobs accepted and graded                               | **Authoritative résumé-supported**                            | End-to-end project test, not a production-capacity guarantee                                                              |
| All SVN commits accepted in 18.17 seconds                                                  | **Authoritative résumé-supported**                            | Intake observation, separate from completion percentiles                                                                  |
| P95 grading completion 155s; P99 157s                                                      | **Authoritative résumé-supported**                            | Two reported percentile observations, not a reconstructed latency distribution                                            |
| 97/100; nominated for Best Capstone Project                                                | **Authoritative résumé-supported**, previously user-confirmed | No longer marked as lacking résumé support. Raw assessment/nomination records remain optional stronger corroboration.     |
| Backend containing 43 API endpoints                                                        | **User-confirmed**                                            | Retained publicly and internally; endpoint inventory not supplied                                                         |
| Docker-volume demo interruption, investigation/fix and successful demonstration afterwards | **User-confirmed**                                            | Preserved without commands, exact root cause, recovery timeline or invented emotions                                      |
| Sponsor acceptance after demonstration                                                     | Historical résumé-supported                                   | Retained historical outcome; not attributed to the new PDF                                                                |
| Exact queue product, AWS services, protocols, worker count and deployment boundaries       | **Unresolved**                                                | No inferred SQS, EC2, ECS, Lambda, S3 or broker topology                                                                  |

## Logical architecture model

The new explorer contains ten selectable responsibilities in three spatial groups:

- Submission intake: SVN repository, post-commit hook, logical intake boundary, durable job queue.
- Asynchronous grading: independent AWS workers, Docker execution, results/feedback responsibility.
- Application: student/lecturer dashboards, FastAPI services, grouped records/grading-file responsibilities.

A student's commit is an **event/input**, not another name for the repository or hook. The post-commit integration is grounded in AM-H1; the durable queue and independent AWS workers are established by AM-G. Intake is a logical responsibility, not a claim of an extra physical service. Records, code and scripts are grouped for explanation, not asserted to share one physical database or AWS volume.

Solid lines identify the main relationships; dashed lines abstract handoffs/data access whose exact transport or physical placement is not established. This legend does not claim that any particular network protocol or deployment boundary was verified. Code/script access and result retrieval are shown as logical relationships, with readable HTML explanations available without JavaScript. The earlier diagram is explicitly linked as historical rather than silently re-labelled as an AWS architecture.

The 43-endpoint count does not imply 43 independent features or that Ibrahim alone authored every product component. The current résumé establishes individual frontend development and integration, which must not be reduced to a disclaimer of team ownership.

## Benchmark interpretation

The benchmark shows acceptance and grading completion in different columns/sections. It does not add 18.17 to 155 or 157, infer average/P50 latency, calculate submissions per second, invent a full chart, infer worker count or compare the test directly with the approximate manual baseline.

P95/P99 are explained as percentile completion observations. Exact timing origins, workload shape, hardware, software version, test duration, infrastructure limits and raw logs remain desirable evidence. The measured observations are **résumé-supported now**; missing methodology does not justify discarding them.

## AWS reconciliation

The old résumé lacked project-specific AWS information. The new résumé explicitly establishes AWS grading workers and a durable queue. That prior content limitation is resolved at the responsibility level.

General skills list EC2, S3, Lambda and IAM; those do **not** establish their use in AutoMark. No specific queue implementation, storage product, autoscaling mechanism, retry semantics or delivery guarantee is published. Connected repository searches again returned no accessible AutoMark source repository. Deeper implementation claims remain pending source/technical documentation.

## Public résumé management

Current URL: `/assets/resume/Ibrahim-Sharif-Graduate-Resume.pdf`.

The former public URL `/assets/resume/Ibrahim%20Sharif%20Resume%20v4.pdf` is retained as a byte-identical alias of the current public résumé. `scripts/prepare-assets.mjs` copies the managed source to both URLs after preparing legacy assets. The original older PDF remains untouched in `assets/resume/`; it is preserved as history, not destructively replaced.

No recovery archives or internal inventories are copied into `public/` or `out/`.
