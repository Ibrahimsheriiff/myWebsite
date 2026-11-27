# DAITA — source evidence and confidentiality boundaries

Phase 2C review, 27 November 2026. Internal authoring record; never copied to public assets or browser bundles.

## Primary professional evidence

The complete two-page authoritative graduate résumé was reread. Managed source: `content-sources/resume/IBRAHIM_RESUME_Graduate.pdf`, SHA-256 `c5109e6c622a7b82ac94444b589c1d8d40926329689521b02814c3a1c7c1cff2`. It supplies the current professional narrative, not instructions or source-level implementation detail. The Phase 2C user brief explicitly confirms the same capabilities.

| Claim                                                                          | Classification / treatment                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| March–June 2025, WSU team working with Deloitte Australia stakeholders         | Authoritative résumé-supported and user-confirmed. University-industry collaboration, not Deloitte employment or endorsement.                                                                                                                                   |
| Consultants processing documents, classifying transactions, generating reports | Intended application purpose; no adoption, deployment, production scale or efficiency metric implied.                                                                                                                                                           |
| Personal Python, FastAPI, Pydantic application development                     | Authoritative résumé-supported. Secure uploads, background processing, manual classification corrections, approvals and exports. No claim of sole ownership of the whole team application.                                                                      |
| Python/pandas ingestion of CSV, Excel and scanned PDF                          | Authoritative résumé-supported. Mapping, normalisation, duplicate detection and validation. No particular OCR/extraction method inferred.                                                                                                                       |
| Versioned Python tax knowledge engine                                          | Authoritative résumé-supported. Matches classified transactions to applicable ATO rules; provides references, confidence scores and documentation requirements for review/approval. No rule schema, score formula, precedence or versioning mechanism inferred. |
| Exact AWS, queues, storage, databases, API protocols, deployment               | Unresolved. General AWS skills do not establish DAITA infrastructure. Not published.                                                                                                                                                                            |
| Accuracy, time savings, test counts, legal compliance, consultant adoption     | No verified quantitative evidence. No invented metrics or guarantees.                                                                                                                                                                                           |

## Accessible repository discovery

GitHub connector searched the user’s public repositories and installed repositories for DAITA. Exact-name searches returned none; reviewing the public owner inventory identified a related tax prototype. No external repository was modified, run, installed or deployed.

**Related public prototype:** [Ibrahimsheriiff/Tax-Deduct-ai](https://github.com/Ibrahimsheriiff/Tax-Deduct-ai/tree/7f2a73986cda6cf3bd423f5d816e4becb0340d40), pinned revision `7f2a73986cda6cf3bd423f5d816e4becb0340d40`, commit dated 20 May 2025, 04:42:56 UTC. Complete recursive tree: ten entries, not truncated. Reviewed README, requirements and all three Python application files. Directory metadata identified a logo and sample CSV; neither was republished or treated as permission-cleared project evidence.

| Source                       | Blob SHA / observed scope                                                                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                  | `1e55bca85b86239121f037ef3129248e5710f088`: describes a Streamlit/Python prototype, simulated AI guidance and document upload/classification/export. Its deployment/branding language is not promoted into professional claims. |
| `requirements.txt`           | `ec13fbfe037a2c2c95e5b7dc798ea9146aabcadf`: Streamlit, pandas, pdfplumber, openpyxl, Pillow, numpy; no FastAPI/Pydantic. Dependencies alone are not runtime proof.                                                              |
| `app.py`                     | `885fe8edf010d3bae07c3acb87e6de6e71a08689`: Streamlit tax/advice-style prototype. Tax calculation definitions are not reproduced or used by the portfolio.                                                                      |
| `deloitte.py`                | `be73c7800a819def2db5b5ee6c1cb900c88a1b1f`: Streamlit upload/read/display/CSV-export path, pandas readers and text extraction with pdfplumber. No current FastAPI/Pydantic application is established by this file.             |
| `deloitte_deductai_final.py` | `02777133f61bf823d2b7a7d1eef6b17cd8330ab5`: similar Streamlit prototype. No OCR capability or cleared screenshot inferred.                                                                                                      |

The inspected public tree has no current FastAPI service, Pydantic models, versioned knowledge-engine records, test suite or CI workflow. This is a limitation of the accessible snapshot, not a reason to discard the current résumé-supported capabilities. Exact lineage between that prototype and the current application is not established. The case study therefore does not link it as the current DAITA implementation, execute its rules or fall back to its narrower Streamlit narrative.

**Separate repository:** `Ibrahimsheriiff/Deloitte-Job-Simulation`, revision `5f274f8af7faf9737a3eb6d228e35999c312f928` (13 June 2026). Root listing and `main.py` inspected: JSON format-conversion functions and unittest scaffolding. This is not evidence for the DAITA application; excluded. No dataset contents copied.

Local source inventory contained the résumé, established portfolio notes and legacy content, but no DAITA-specific permission-cleared screen, architecture document or additional deliverable. Existing AutoMark/EquityGuard assets were not reused. No original DAITA tests or runtime were verified.

## Publication boundary

The article uses plain text project/context names, not Deloitte logos or brand treatments. No client records, stakeholder quotations/messages, proprietary rules, source excerpts, financial details, tax eligibility decisions, real ATO references or numerical confidence values appear in the demonstration. No implication of employment, endorsement, production release or adoption.

Application capability statements are résumé-supported. Illustrations are explicitly conceptual; demonstration data is fictional and labelled as an illustrative portfolio simulation. These are separate from actual project outcomes. The social PNG is original editorial artwork, not an application screenshot.

## Fictional workbench data and logic

Fixtures are authored specifically for this portfolio in `src/content/daita-fixtures.ts`. Five stable record identifiers: R01–R05. No dataset was copied from the prototype, stakeholder material or client records. The PDF-labelled row is already-extracted fictional text; the portfolio never uploads, parses or OCRs a document.

| Record | Purpose                                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R01    | CSV baseline: ISO date, fictional paper purchase, $120.00, reference F-104.                                                                                        |
| R02    | Excel-style column aliases, named-month date, description whitespace and AUD prefix. Maps to 2025-04-04, trimmed description, 4,800 integer cents.                 |
| R03    | Fictional extracted row matching R01 after date/description-case/amount/reference normalisation. Flagged as a possible repeat, never deleted.                      |
| R04    | Blank required description. Retained and held; not categorised or approved.                                                                                        |
| R05    | Fictional desk entry. Initial General supplies category can be changed to Equipment review and explicitly confirmed. This is a review grouping, not tax treatment. |

Pure transformations are in `src/lib/daita-workbench.ts`:

1. Explicit source-to-canonical column mapping; original fixtures never mutated.
2. Dates accept ISO or `day English-month year` only, with calendar round-trip validation. Ambiguous numeric dates are rejected. Dates are illustrations, not a reconstruction of DAITA’s parser.
3. AUD amounts parse to safe integer cents; grouping and decimal syntax are checked. This focused fixture parser does not claim support for all accounting conventions, credits, locales or currencies.
4. Required date, description, amount and reference checks. Potential-repeat key compares ISO date, lowercased description, cents and lowercased reference among otherwise valid rows. Exact-match fixture rules do not establish real-world duplicate identity.
5. Three valid/non-repeated rows receive explicitly fictional review categories. No real tax logic, ATO reference, confidence computation or report file is generated.
6. Only R05’s local review state is changed by the visitor. Changing its category clears its confirmation; confirmation persists across stage navigation. Reset restores the initial fixture state. Other held rows remain held.

Five manually selected stages expose the same records. Native buttons, select, visible focus, explanatory text and status messages support keyboard/touch. Desktop uses a semantic table; narrow effective widths use a labelled record list rather than a tiny scrolling table. Native disclosures and the prepared record outcomes remain available without JavaScript. No automatic progression or simulated processing activity.

## Preservation and verification limits

Pre-edit recovery: `.local/recovery/pre-phase-2c.zip` plus `phase-2c-manifest.json`: 95 source/config/document/asset files and binary working-tree patch. Existing recovery snapshots and dirty legacy files preserved. No portfolio dependencies added.

The portfolio tests verify only this new fictional demonstration and static case-study page; they are not DAITA application test evidence. Current project implementation, upload security controls, background execution, original knowledge engine and original export behaviour were not operationally tested. The article does not turn its illustrative pipeline into an assertion about exact DAITA component boundaries or algorithms.

Remaining useful evidence: permission-cleared original screenshots, technical/architecture records, original tests/results, supported upload/security design, knowledge-versioning details, approved stakeholder feedback and deliverables. None is necessary to run the static portfolio or to retain the supported professional claims.
