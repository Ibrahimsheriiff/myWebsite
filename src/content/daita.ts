export const daitaStudy = {
  title: 'DAITA — Less manual review. A clearer workflow.',
  description:
    'A university-industry collaboration with Deloitte Australia: financial document processing, deterministic tax knowledge and human review. My work with Python, FastAPI, Pydantic and pandas.',
  contributions: [
    {
      number: '01',
      title: 'The application around the documents',
      text: 'I developed application functionality using Python, FastAPI and Pydantic: secure uploads, background processing, manual classification corrections, approvals and report exports.',
    },
    {
      number: '02',
      title: 'A common shape for inconsistent data',
      text: 'I built a Python and pandas pipeline for CSV, Excel and scanned PDFs, incorporating column mapping, normalisation, duplicate detection and validation.',
    },
    {
      number: '03',
      title: 'Domain knowledge that can be reviewed',
      text: 'I developed a versioned Python tax knowledge engine to match classified transactions with applicable ATO rules, providing references, confidence scores and documentation requirements for review and approval.',
    },
  ],
};
