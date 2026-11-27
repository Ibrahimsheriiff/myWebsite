'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { stages } from '@/content/identity';

function StageDrawing({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 88 78" fill="none" aria-hidden="true">
      {index === 0 && (
        <>
          <circle cx="37" cy="31" r="20" />
          <circle cx="37" cy="31" r="14" className="sketch-faint" />
          <path d="m52 47 19 19M29 28q7-9 15-2M33 36h9M12 10l-4-5m55 7 6-5M9 46l-6 2" />
          <circle cx="65" cy="20" r="2" className="sketch-fill" />
        </>
      )}
      {index === 1 && (
        <>
          <path d="m14 20 28-12 30 13-30 14-28-15Zm0 15 28 14 30-14M14 49l28 15 30-15M42 35v29" />
          <path d="m19 18 24 10 24-9M77 57l3 7-8 1" className="sketch-faint" />
        </>
      )}
      {index === 2 && (
        <>
          <path d="m27 21-17 17 17 18m34-35 17 17-17 18M51 12 37 65" />
          <path d="M9 67h19m31-60h18M6 15l4-4m64 53 4 5" className="sketch-faint" />
          <circle cx="71" cy="13" r="2" className="sketch-fill" />
        </>
      )}
      {index === 3 && (
        <>
          <path d="m19 14 47 2-2 50-47-2 2-50Z" />
          <path d="m28 29 6 6 15-15M27 49h26m-26 6h18M72 23l6-3m-5 15 7 2M10 4l-3 6" />
          <path d="m51 40 11 10 17-21" className="sketch-check" />
        </>
      )}
    </svg>
  );
}

export function Notebook() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % stages.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index + stages.length - 1) % stages.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stages.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="notebook-wrap">
      <div className="notebook-caption">
        <span className="tiny-cross" aria-hidden="true">
          +
        </span>{' '}
        Notes on how I work
        <span className="notebook-invitation">Select a stage</span>
      </div>
      <div className="notebook">
        <div className="notebook-top">
          <span className="mono">FIELD NOTES / ENGINEERING</span>
          <span className="notebook-binding" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="notebook-map">
          <svg
            className="notebook-connections"
            viewBox="0 0 440 292"
            fill="none"
            aria-hidden="true"
          >
            <path d="M115 75C175 7 228 20 295 63M329 91c75 59 19 106-20 126M265 240c-70 47-122 6-147-19M78 186C24 146 28 99 66 79" />
            <path className="connection-return" d="m55 90 11-11-15-1M185 147q25-17 54-2" />
          </svg>
          <div role="tablist" aria-label="My engineering approach" className="notebook-stages">
            {stages.map((stage, i) => (
              <button
                type="button"
                key={stage.id}
                ref={(node) => {
                  tabs.current[i] = node;
                }}
                role="tab"
                id={`tab-${stage.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${stage.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(event) => handleKey(event, i)}
                className={`notebook-stage stage-${i}${active === i ? ' is-active' : ''}`}
              >
                <span className="stage-art">
                  <StageDrawing index={i} />
                </span>
                <span className="stage-name">
                  <span className="stage-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="stage-word">{stage.name}</span>
                </span>
              </button>
            ))}
          </div>
          <span className="notebook-centre serif" aria-hidden="true">
            stay
            <br />
            curious.
          </span>
        </div>
        <div className="notebook-panels">
          {stages.map((stage, i) => (
            <div
              role="tabpanel"
              key={stage.id}
              id={`panel-${stage.id}`}
              aria-labelledby={`tab-${stage.id}`}
              hidden={active !== i}
              tabIndex={0}
            >
              <span className="panel-index serif" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h2>{stage.label}</h2>
                <p>{stage.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="notebook-bottom">
          <span>Understand. Design. Build. Verify.</span>
          <span className="notebook-dots" aria-hidden="true">
            {stages.map((stage, i) => (
              <i key={stage.id} className={i === active ? 'active' : ''} />
            ))}
          </span>
        </div>
      </div>
      <div className="notebook-note serif">
        <svg width="45" height="31" viewBox="0 0 45 31" fill="none" aria-hidden="true">
          <path d="M43 3C28 3 33 27 7 23m0 0 6-6m-6 6 8 5" />
        </svg>
        {stages[active].note}
      </div>
    </div>
  );
}
