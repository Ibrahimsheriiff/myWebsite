'use client';
import { useRef, useState, useSyncExternalStore } from 'react';
import { financialTools, equityguardStudy, type FinancialTool } from '@/content/equityguard';
const subscribe = () => () => {};
function ToolContract({ tool }: { tool: FinancialTool }) {
  return (
    <>
      <p className="eq-tool-kind mono">{tool.kind}</p>
      <h3>{tool.label}</h3>
      <code className="eq-function">{tool.name}</code>
      <p className="eq-tool-purpose">{tool.purpose}</p>
      <dl className="eq-contract">
        <div>
          <dt>Input</dt>
          <dd>
            <code>{tool.inputs}</code>
          </dd>
        </div>
        <div>
          <dt>Returns</dt>
          <dd>
            <code>{tool.outputs}</code>
          </dd>
        </div>
        <div>
          <dt>Boundary</dt>
          <dd>{tool.boundary}</dd>
        </div>
        <div>
          <dt>Test evidence</dt>
          <dd>{tool.verification}</dd>
        </div>
      </dl>
      <a
        className="text-link"
        href={`${equityguardStudy.repository}/blob/${equityguardStudy.revision}/${tool.source}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read this implementation <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
export function EquityGuardInspector() {
  const enhanced = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!enhanced)
    return (
      <div className="eq-static-tools">
        {financialTools.map((tool, i) => (
          <details key={tool.name} open={i === 0}>
            <summary>
              {String(i + 1).padStart(2, '0')} / {tool.label}
              <span aria-hidden="true">＋</span>
            </summary>
            <ToolContract tool={tool} />
          </details>
        ))}
      </div>
    );
  return (
    <div className="eq-inspector">
      <div
        className="eq-tool-selector"
        role="tablist"
        aria-label="Registered tools"
        aria-orientation="vertical"
      >
        {financialTools.map((tool, i) => (
          <button
            key={tool.name}
            type="button"
            role="tab"
            id={`tool-tab-${i}`}
            aria-controls={`tool-panel-${i}`}
            aria-selected={selected === i}
            tabIndex={selected === i ? 0 : -1}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
                next = (i + 1) % financialTools.length;
              else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
                next = (i + financialTools.length - 1) % financialTools.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = financialTools.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              refs.current[next]?.focus();
            }}
          >
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <span>
              {tool.label}
              <small>{i < 4 ? 'Market context' : 'Document context'}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
        <p className="eq-selector-note">
          Choose a tool to inspect its contract.
          <br />
          No financial analysis is executed.
        </p>
      </div>
      {financialTools.map((tool, i) => (
        <div
          key={tool.name}
          role="tabpanel"
          id={`tool-panel-${i}`}
          aria-labelledby={`tool-tab-${i}`}
          tabIndex={selected === i ? 0 : -1}
          aria-hidden={selected !== i}
          className="eq-tool-panel"
        >
          <ToolContract tool={tool} />
        </div>
      ))}
    </div>
  );
}
