import { equityArchitecture, financialWorkflow } from '@/content/portfolio';

function ToolSymbol({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 36 30" fill="none" aria-hidden="true">
      {id === 'market' && (
        <>
          <path d="M3 25h30M6 20l6-6 6 3L29 5" />
          <path d="M6 8v12m6-12v6m6-5v8m11-15v9" className="diagram-faint" />
        </>
      )}
      {id === 'technicals' && (
        <>
          <path d="M3 15h30" className="diagram-faint" />
          <path d="M3 22c6 0 4-16 10-16s4 18 10 18 4-14 10-14" />
        </>
      )}
      {id === 'news' && (
        <>
          <path d="M6 3h24v24H6V3Zm5 6h14M11 14h14m-14 5h8" />
          <path d="M3 8v19h23" className="diagram-faint" />
        </>
      )}
      {id === 'context' && (
        <>
          <path d="M5 5h22v20H5V5Zm5-3v6m12-6v6M5 12h22m-17 5h4m4 0h4m-12 4h4" />
          <path d="M30 9h3v19H11" className="diagram-faint" />
        </>
      )}
    </svg>
  );
}

export function AgentDiagram() {
  return (
    <figure className="agent-drawing agent-drawing-refined" aria-labelledby="agent-caption">
      <figcaption id="agent-caption" className="diagram-heading">
        <span className="mono">EQUITYGUARD / SYSTEM NOTES</span>
        <span>Request to response</span>
      </figcaption>
      <div className="equity-input">
        <span className="mono">INPUT REQUEST</span>
        <span>{equityArchitecture.request}</span>
      </div>
      <div
        className="equity-map"
        role="img"
        aria-label="A custom ReAct loop chooses from market data, technical signals, news headlines, earnings and two company-document retrieval tools. Each tool result returns to the loop before its next selection."
      >
        <svg
          className="equity-connections equity-connections-wide"
          viewBox="0 0 520 290"
          fill="none"
          aria-hidden="true"
        >
          <path d="M260 0v82m0 150v58M194 119l-67-41m199 41 67-41M192 193l-64 43m200-43 64 43" />
          <circle cx="260" cy="157" r="70" />
          <circle cx="260" cy="157" r="79" strokeDasharray="2 6" />
          <path
            d="m257 63 3 6 3-6m-6 204 3 6 3-6M175 109l8 1-3-7m160 7-8 1 3-7M180 210l3-7-8 1m158 0 7 1-2-7"
            className="diagram-direction"
          />
        </svg>
        <svg
          className="equity-connections equity-connections-narrow"
          viewBox="0 0 340 268"
          fill="none"
          aria-hidden="true"
        >
          <path d="M170 0v81m0 128v59M123 111 74 51m143 60 49-60M122 176l-48 56m144-56 48 56" />
          <circle cx="170" cy="145" r="56" />
          <circle cx="170" cy="145" r="64" strokeDasharray="2 6" />
          <path d="m167 64 3 6 3-6m-6 189 3 6 3-6" className="diagram-direction" />
        </svg>
        <div className="equity-orchestrator">
          <span className="serif">
            custom
            <br />
            ReAct loop
          </span>
        </div>
        {equityArchitecture.tools.map((tool) => (
          <div className={`equity-tool equity-tool-${tool.id}`} key={tool.id}>
            <ToolSymbol id={tool.id} />
            <strong>{tool.title}</strong>
            <span>{tool.detail}</span>
          </div>
        ))}
      </div>
      <div className="equity-response">
        <div>
          <span className="mono">RESPONSE VALIDATION</span>
          <strong>Pydantic response schema</strong>
        </div>
        <div className="response-fields">
          {equityArchitecture.response.map((field) => (
            <span key={field}>{field}</span>
          ))}
        </div>
      </div>
      <p className="equity-loop-note">{equityArchitecture.note}</p>
      <div className="equity-evidence">
        <span className="evaluation-symbol" aria-hidden="true">
          ✓
        </span>
        <div>
          <strong>
            <span>23</span> automated tests
          </strong>
          <p>Regression checks · GitHub Actions CI</p>
        </div>
      </div>
    </figure>
  );
}

export function FinancialWorkflow() {
  return (
    <figure className="financial-workflow" aria-labelledby="financial-caption">
      <figcaption id="financial-caption">
        <span className="mono">FROM DOCUMENTS TO DECISIONS</span>
        <span>Deterministic tax logic · human review</span>
      </figcaption>
      <ol className="financial-stages">
        {financialWorkflow.map((stage, i) => (
          <li key={stage.title}>
            <div className={`financial-visual financial-visual-${i}`} aria-hidden="true">
              {i === 0 && (
                <div className="financial-documents">
                  <div>
                    <span className="mono">PDF</span>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div>
                    <span className="mono">CSV</span>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div>
                    <span className="mono">XLSX</span>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              )}
              {i === 1 && (
                <div className="financial-processing">
                  <div>
                    <span className="process-glyph">{'{ }'}</span>
                    <span>
                      Map & validate<small>Normalise · deduplicate · check</small>
                    </span>
                  </div>
                  <div>
                    <span className="process-glyph">≡</span>
                    <span>
                      Versioned tax knowledge<small>ATO rules · references</small>
                    </span>
                  </div>
                </div>
              )}
              {i === 2 && (
                <div className="financial-report">
                  <span className="mono">REVIEW & APPROVAL</span>
                  <p>
                    <span>Manual corrections</span>
                    <i />
                  </p>
                  <p>
                    <span>References & confidence</span>
                    <i />
                  </p>
                  <p>
                    <span>Approved report exports</span>
                    <i />
                  </p>
                </div>
              )}
            </div>
            <div className="financial-stage-caption">
              <span className="mono">0{i + 1}</span>
              <div>
                <h4>{stage.title}</h4>
                <p>{stage.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
