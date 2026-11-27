'use client';
import { useEffect, useRef, useState } from 'react';
import {
  systemComponents,
  systemConnections,
  systemLanes,
  type SystemComponent,
} from '@/content/automark-system';

type Wire = { id: string; path: string; x: number; y: number };
type Graph = { width: number; height: number; wires: Wire[] };
const componentName = (id: string) => systemComponents.find((node) => node.id === id)!.name;
function ComponentNotes({ component }: { component: SystemComponent }) {
  return (
    <div className="component-prose">
      <p>{component.purpose}</p>
      <dl>
        <div>
          <dt>In</dt>
          <dd>{component.input}</dd>
        </div>
        <div>
          <dt>Out</dt>
          <dd>{component.output}</dd>
        </div>
      </dl>
      <p className="component-boundary">{component.boundary}</p>
      <div className="component-connections">
        <span className="mono">CONNECTED FLOW</span>
        <ul>
          {systemConnections
            .filter((edge) => edge.from === component.id || edge.to === component.id)
            .map((edge) => (
              <li key={`${edge.from}-${edge.to}`}>
                {edge.bidirectional ? 'With' : edge.from === component.id ? 'To' : 'From'}{' '}
                {componentName(edge.from === component.id ? edge.to : edge.from)}
                <span>{edge.label}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
function SystemIcon({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {id === 'records' || id === 'results' || id === 'queue' ? (
        <>
          <ellipse cx="16" cy="7" rx="10" ry="4" />
          <path d="M6 7v18c0 5 20 5 20 0V7M6 15c0 5 20 5 20 0M6 22c0 5 20 5 20 0" />
        </>
      ) : id === 'sandbox' ? (
        <path d="m16 3 12 7v13l-12 7-12-7V10l12-7Zm0 14v13M4 10l12 7 12-7M10 7l12 7" />
      ) : id === 'workspace' ? (
        <>
          <rect x="3" y="5" width="26" height="21" rx="1" />
          <path d="M3 11h26M8 8h1m3 0h1M8 16h8m-8 5h15" />
        </>
      ) : id === 'api' ? (
        <path d="m10 7-7 9 7 9m12-18 7 9-7 9M19 4l-6 24" />
      ) : id === 'worker' ? (
        <>
          <rect x="5" y="4" width="22" height="9" rx="1" />
          <rect x="5" y="19" width="22" height="9" rx="1" />
          <path d="M9 8h2m-2 15h2M16 13v6" />
        </>
      ) : id === 'hook' ? (
        <>
          <path d="M5 7h13v7h8m-5-5 5 5-5 5M18 14v11H5" />
          <circle cx="5" cy="7" r="2" />
          <circle cx="5" cy="25" r="2" />
        </>
      ) : (
        <>
          <path d="M9 3h10l6 6v20H9V3Zm10 0v7h6M13 16h8m-8 5h8" />
          <path d="M5 8v18" />
        </>
      )}
    </svg>
  );
}

export function AutoMarkExplorer() {
  const [selected, setSelected] = useState(0);
  const [graph, setGraph] = useState<Graph | null>(null);
  const plot = useRef<HTMLDivElement>(null);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = systemComponents[selected];
  const neighbours = systemConnections.flatMap((edge) =>
    edge.from === active.id ? [edge.to] : edge.to === active.id ? [edge.from] : [],
  );
  useEffect(() => {
    let disposed = false;
    const measure = () => {
      const root = plot.current;
      if (!root || disposed) return;
      const base = root.getBoundingClientRect();
      const boxes = Object.fromEntries(
        systemComponents.map((node) => {
          const box = buttons.current[node.id]!.getBoundingClientRect();
          return [
            node.id,
            {
              left: box.left - base.left,
              right: box.right - base.left,
              top: box.top - base.top,
              bottom: box.bottom - base.top,
              width: box.width,
              height: box.height,
            },
          ];
        }),
      );
      const wires = systemConnections.map((edge) => {
        const a = boxes[edge.from],
          b = boxes[edge.to];
        let path = '',
          x = 0,
          y = 0;
        if (edge.route === 'adjacent') {
          const sx = a.left + a.width * 0.75,
            tx = b.left + b.width * 0.25,
            track = Math.max(a.bottom, b.bottom) + 22;
          path = `M${sx},${a.bottom + 3}V${track}H${tx}V${b.bottom + 3}`;
          x = (sx + tx) / 2;
          y = track + 19;
        } else if (edge.route === 'queue') {
          const sx = a.left + a.width * 0.75,
            track = a.bottom + 74;
          path = `M${sx},${a.bottom + 3}V${track}H14V${b.top + b.height / 2}H${b.left - 4}`;
          x = (sx + 14) / 2;
          y = track - 9;
        } else if (edge.route === 'results') {
          const sx = a.left + a.width * 0.75,
            tx = b.left + b.width * 0.25,
            track = a.bottom + 74;
          path = `M${sx},${a.bottom + 3}V${track}H${tx}V${b.top - 4}`;
          x = (sx + tx) / 2;
          y = track - 9;
        } else {
          const track = base.width - 10,
            tx = b.left + b.width * 0.75,
            top = b.top - 10;
          path = `M${a.right + 3},${a.top + a.height / 2}H${track}V${top}H${tx}V${b.top - 4}`;
          x = (track + tx) / 2;
          y = top - 8;
        }
        return { id: `${edge.from}-${edge.to}`, path, x, y };
      });
      setGraph({ width: base.width, height: base.height, wires });
    };
    const observer = new ResizeObserver(measure);
    if (plot.current) observer.observe(plot.current);
    Object.values(buttons.current).forEach((button) => {
      if (button) observer.observe(button);
    });
    document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);
  function move(index: number, key: string) {
    const count = systemComponents.length;
    if (key === 'Home') return 0;
    if (key === 'End') return count - 1;
    if (key === 'ArrowRight') return (index + 1) % count;
    if (key === 'ArrowLeft') return (index + count - 1) % count;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const source = buttons.current[systemComponents[index].id]!.getBoundingClientRect();
      const candidates = systemComponents
        .map((node, i) => ({ i, box: buttons.current[node.id]!.getBoundingClientRect() }))
        .filter(({ box }) =>
          key === 'ArrowDown' ? box.top > source.top + 10 : box.top < source.top - 10,
        );
      candidates.sort(
        (a, b) =>
          Math.abs(a.box.top - source.top) - Math.abs(b.box.top - source.top) ||
          Math.abs(a.box.left + a.box.width / 2 - source.left - source.width / 2) -
            Math.abs(b.box.left + b.box.width / 2 - source.left - source.width / 2),
      );
      return candidates[0]?.i ?? index;
    }
    return null;
  }
  return (
    <div className="system-explorer explorer-v2" id="architecture-explorer">
      <div className="explorer-toolbar">
        <span className="mono">AUTOMARK / LOGICAL SYSTEM MAP</span>
        <span className="explorer-instruction">Select a component. Follow the responsibility.</span>
      </div>
      <div
        className="system-map reconciled-map"
        ref={plot}
        role="group"
        aria-label="AutoMark architecture components"
        aria-describedby="explorer-help"
      >
        {graph && (
          <svg
            className="reconciled-wires"
            width="100%"
            height="100%"
            viewBox={`0 0 ${graph.width} ${graph.height}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="system-arrow-v2"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="m1 1 7 4-7 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </marker>
            </defs>
            {systemConnections.map((edge, i) => {
              const wire = graph.wires[i];
              const related = edge.from === active.id || edge.to === active.id;
              return (
                <g
                  key={wire.id}
                  data-edge={wire.id}
                  data-related={related}
                  className={`map-connection${related ? ' wire-active' : ''}${edge.logical ? ' wire-logical' : ''}`}
                >
                  <path
                    d={wire.path}
                    markerEnd="url(#system-arrow-v2)"
                    markerStart={edge.bidirectional ? 'url(#system-arrow-v2)' : undefined}
                  />
                  <text x={wire.x} y={wire.y} textAnchor="middle">
                    {edge.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
        {systemLanes.map((lane) => (
          <div
            className={`system-lane lane-${lane.id}`}
            key={lane.id}
            role="group"
            aria-labelledby={`lane-${lane.id}-title`}
          >
            <div className="lane-header">
              <p id={`lane-${lane.id}-title`}>{lane.title}</p>
              <span>{lane.context}</span>
            </div>
            <div className={`lane-nodes lane-count-${lane.nodes.length}`}>
              {lane.nodes.map((id) => {
                const index = systemComponents.findIndex((node) => node.id === id);
                const component = systemComponents[index];
                return (
                  <button
                    key={id}
                    data-component={id}
                    type="button"
                    ref={(el) => {
                      buttons.current[id] = el;
                    }}
                    className={`system-node${selected === index ? ' is-selected' : ''}${neighbours.includes(id) ? ' is-connected' : ''}`}
                    aria-pressed={selected === index}
                    aria-controls="component-notes"
                    onClick={() => setSelected(index)}
                    onKeyDown={(event) => {
                      const next = move(index, event.key);
                      if (next === null) return;
                      event.preventDefault();
                      setSelected(next);
                      buttons.current[systemComponents[next].id]?.focus();
                    }}
                  >
                    <span className="node-drawing">
                      <SystemIcon id={id} />
                      <span className="node-kind">{component.kind}</span>
                    </span>
                    <strong>{component.name}</strong>
                    <span>{component.short}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div id="explorer-help" className="explorer-help">
        <p>
          Solid lines show the main relationships; dashed lines abstract handoffs and data access.
          No specific AWS service or transport is implied.
        </p>
        <p>
          Use pointer, touch, Tab, arrows, Home or End.{' '}
          <a className="text-link" href="#component-notes">
            Read the selected component
          </a>
        </p>
      </div>
      <div
        className="architecture-panel"
        id="component-notes"
        role="region"
        aria-label="Selected component explanation"
      >
        {systemComponents.map((component, index) => (
          <section
            key={component.id}
            aria-hidden={selected !== index}
            id={`component-${component.id}`}
          >
            <div className="component-heading">
              <span className="component-number serif" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="mono">{component.technology}</p>
                <h3>{component.name}</h3>
              </div>
            </div>
            <ComponentNotes component={component} />
          </section>
        ))}
      </div>
      <noscript>
        <style>{`.system-map,.explorer-help,.explorer-instruction,.architecture-panel{display:none!important}`}</style>
        <div className="architecture-static">
          {systemComponents.map((component) => (
            <section key={component.id}>
              <p className="mono">{component.technology}</p>
              <h3>{component.name}</h3>
              <ComponentNotes component={component} />
            </section>
          ))}
        </div>
      </noscript>
      <details className="connection-disclosure">
        <summary>
          Read all connections as text<span aria-hidden="true">＋</span>
        </summary>
        <ol>
          {systemConnections.map((edge) => (
            <li key={`${edge.from}-${edge.to}`}>
              <strong>
                {componentName(edge.from)} → {componentName(edge.to)}
              </strong>
              <span>
                {edge.label}
                {edge.logical ? ' · logical relationship' : ''}
              </span>
            </li>
          ))}
        </ol>
      </details>
      <div className="explorer-footer">
        <span>Reconciled logical view · graduate résumé + earlier project drawing.</span>
        <a href="/assets/img/system%20architecture.png" className="text-link">
          Earlier architecture drawing
        </a>
      </div>
    </div>
  );
}
