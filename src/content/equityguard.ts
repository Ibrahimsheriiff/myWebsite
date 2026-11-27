export const equityguardStudy = {
  title: 'EquityGuard — An agent with tools. And boundaries.',
  description:
    'An independent React and FastAPI financial risk application: six tools, a custom agent loop, structured responses and 23 automated checks.',
  repository: 'https://github.com/Ibrahimsheriiff/equityguard',
  revision: '6801099818177cb1aad758c7880dbb94901be129',
  stack: [
    'React',
    'FastAPI',
    'Python',
    'Claude API',
    'yfinance',
    'ChromaDB',
    'Docker',
    'GitHub Actions',
  ],
};

export type FinancialTool = {
  name: string;
  label: string;
  kind: string;
  purpose: string;
  inputs: string;
  outputs: string;
  boundary: string;
  verification: string;
  source: string;
};

// Contracts are editorial summaries of the pinned source, not runtime schemas or live data.
export const financialTools: FinancialTool[] = [
  {
    name: 'get_price_data',
    label: 'Price & volatility',
    kind: 'External data + calculation',
    purpose: 'Establish a market-data baseline before interpreting risk.',
    inputs: 'ticker: string (required)',
    outputs:
      'ticker, current_price, previous_close, day_change_pct, volume, avg_volume_10d, beta, volatility_30d_annualised_pct, 52w_high, 52w_low',
    boundary:
      'Fetches 30 days of history through yfinance. Annualises daily-return volatility using √252. Empty history or an exception returns an error dictionary; some missing fields use defaults.',
    verification: 'The inspected suite does not mock or exercise this external data path.',
    source: 'src/tools/price_data.py',
  },
  {
    name: 'get_technical_signals',
    label: 'Technical signals',
    kind: 'Calculation over external data',
    purpose: 'Turn price history into explicit momentum indicators.',
    inputs: 'ticker: string (required)',
    outputs: 'ticker, rsi_14, rsi_signal, macd_signal, bollinger_position_pct, bollinger_signal',
    boundary:
      'Fetches three months of history and requires at least 30 rows. Computes 14-period RSI, 12/26/9 MACD and 20-period Bollinger position. Empty or short history returns an error.',
    verification:
      'Seven tests check RSI and Bollinger examples using helpers defined inside the test file. They do not invoke this production tool or test MACD.',
    source: 'src/tools/technicals.py',
  },
  {
    name: 'get_news_sentiment',
    label: 'News context',
    kind: 'External retrieval',
    purpose: 'Bring recent headlines into the model’s analysis context.',
    inputs: 'ticker: string (required) · company_name: string (optional)',
    outputs: 'ticker, headline_count, headlines[{title, published, summary}]',
    boundary:
      'Returns up to eight yfinance news items with summaries truncated to 200 characters. The optional company name is unused. Despite its name, this tool does not compute a numerical sentiment score.',
    verification: 'The inspected suite does not test the news response or provider failures.',
    source: 'src/tools/news.py',
  },
  {
    name: 'get_earnings_risk',
    label: 'Earnings proximity',
    kind: 'External data + date rules',
    purpose: 'Describe proximity to an earnings event using deterministic thresholds.',
    inputs: 'ticker: string (required)',
    outputs: 'ticker, next_earnings_date, days_to_earnings, earnings_risk',
    boundary:
      'Reads the first calendar value and classifies dates at 7, 21 and 42 days. Missing or unexpected calendar data yields “unknown”; it does not predict an earnings result.',
    verification:
      'Calendar formats, thresholds and error paths are not covered by the inspected tests.',
    source: 'src/tools/earnings.py',
  },
  {
    name: 'retrieve_company_docs',
    label: 'Company documents',
    kind: 'Local filename lookup',
    purpose: 'Supply company-specific document context without a model-generated search.',
    inputs: 'ticker: string (required)',
    outputs: 'ticker, docs_found, result (combined document text)',
    boundary:
      'Strips the exchange suffix and matches the base ticker against local filenames. A missing store or no match returns zero documents. This is distinct from semantic vector retrieval.',
    verification:
      'No document-retrieval tests are present in the inspected suite. File reading has no enclosing exception handler.',
    source: 'src/tools/document_retrieval.py',
  },
  {
    name: 'search_company_knowledge',
    label: 'Semantic knowledge',
    kind: 'Vector retrieval · unresolved runtime',
    purpose: 'Search document chunks by an embedded natural-language query.',
    inputs: 'query: string (required) · ticker: string (optional)',
    outputs: 'query, ticker, chunks_found, result (source-labelled context or a readiness message)',
    boundary:
      'The retriever targets a ChromaDB collection with an optional ticker filter and three results by default. The reviewed file references chromadb without importing it; required retrieval packages are also absent from requirements.txt.',
    verification:
      'An isolated dependency-stub check reproduced the missing-name readiness response. No real embedding model or vector query was run.',
    source: 'src/rag/retriever.py',
  },
];

export const observedWorkflow = [
  {
    title: 'Receive',
    text: 'FastAPI trims and uppercases the ticker, builds a query and checks advice-request phrases.',
  },
  {
    title: 'Ask',
    text: 'Python sends the request, conversation and six tool schemas directly to the Claude API.',
  },
  {
    title: 'Dispatch',
    text: 'Named tool-use blocks are looked up in the registry. Returned dictionaries become JSON tool results.',
  },
  {
    title: 'Continue or stop',
    text: 'Tool results return to the model. An end_turn response finishes; the loop allows up to six iterations.',
  },
  {
    title: 'Respond',
    text: 'The API extracts a score from text, assigns a label and returns a RiskResponse for the React results view.',
  },
];

export const testInventory = [
  {
    count: 9,
    name: 'Financial guardrails',
    file: 'test_guardrails.py',
    scope:
      'Advice phrases, permitted risk questions, case handling and a non-empty refusal message.',
    limit: 'A phrase filter, not a comprehensive safety evaluation.',
  },
  {
    count: 7,
    name: 'Calculation examples',
    file: 'test_technicals.py',
    scope: 'RSI direction and range, short history, Bollinger position type and example ranges.',
    limit: 'Test-local helpers; no production tool or provider integration.',
  },
  {
    count: 7,
    name: 'Evaluation definitions',
    file: 'test_evaluation.py',
    scope: 'Required case fields, unique names and refusal/non-refusal classifications.',
    limit: 'Checks case definitions, not live agent execution or model accuracy.',
  },
];
