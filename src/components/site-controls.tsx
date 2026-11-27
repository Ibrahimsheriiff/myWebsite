'use client';

/* eslint-disable @next/next/no-img-element -- Responsive images are generated at build time for server-free static hosting. */

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/content/identity';

export function Navigation({ homeLinks = false }: { homeLinks?: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const fragment = (id: string) => `${homeLinks ? '/' : ''}#${id}`;
  const links = (
    <>
      <a href={fragment('work')}>Work</a>
      <a href={fragment('about')}>About</a>
      <a href="/lab/">Lab</a>
      <a href={fragment('contact')}>Contact</a>
      <a className="resume-link" href={profile.resume}>
        Résumé <span className="file-label">PDF</span>
      </a>
    </>
  );
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          href={fragment('top')}
          className="wordmark"
          aria-label={homeLinks ? 'Ibrahim Sharif, homepage' : 'Ibrahim Sharif, back to top'}
        >
          is<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <details
          className="mobile-menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              menu.current?.removeAttribute('open');
              menu.current?.querySelector('summary')?.focus();
            }
          }}
        >
          <summary>
            Menu <span aria-hidden="true">＋</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) menu.current?.removeAttribute('open');
            }}
          >
            {links}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SydneyTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Sydney',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="sydney-time">
      <span className="location-dot" aria-hidden="true" />
      <span className="city">Sydney, Australia</span>
      <span className="time-separator" aria-hidden="true">
        /
      </span>
      <span className="clock-value">{time ?? 'Local time'}</span>
    </span>
  );
}

export function ProjectImage({ priority = false }: { priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={trigger}
        className="project-image-button"
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label="Enlarge the AutoMark lecturer dashboard"
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/assets/optimized/automark-800.webp 800w, /assets/optimized/automark-1600.webp 1600w"
            sizes={priority ? '(max-width: 1328px) 90vw, 1200px' : '(max-width: 767px) 90vw, 65vw'}
          />
          <img
            src="/assets/img/dashboard.png"
            width="2904"
            height="1499"
            alt="AutoMark lecturer dashboard with assignments, student submissions and grading controls"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
          />
        </picture>
        <span className="image-expand">
          View full original <span aria-hidden="true">＋</span>
        </span>
      </button>
      <dialog
        className="image-dialog"
        ref={dialog}
        aria-label="AutoMark lecturer dashboard"
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button className="dialog-close" onClick={() => dialog.current?.close()} autoFocus>
          Close preview <span aria-hidden="true">×</span>
        </button>
        <img
          src="/assets/img/dashboard.png"
          width="2904"
          height="1499"
          alt="Expanded AutoMark lecturer dashboard showing assignment management and grading controls"
        />
      </dialog>
    </>
  );
}
