import { useEffect, useId, useRef, useState } from 'react';
import { withBase } from '../../lib/paths/withBase';

export type MobileNavItem = {
  label: string;
  href: string;
  available?: boolean;
};

export type MobileNavigationProps = {
  title?: string;
  items?: MobileNavItem[];
};

const DEFAULT_ITEMS: MobileNavItem[] = [
  { label: 'Visão geral', href: '/', available: true },
  { label: 'Bases clínicas', href: '/analises/bases-clinicas/', available: false },
  { label: 'Impacto socioeconômico', href: '/analises/impacto-socioeconomico/', available: false },
  { label: 'Metodologia', href: '/metodologia/', available: false },
];

export default function MobileNavigation({
  title = 'Menu',
  items = DEFAULT_ITEMS,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = buttonRef.current;
    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        previouslyFocused?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-nav__toggle-label">{open ? 'Fechar' : 'Menu'}</span>
        <span className="mobile-nav__icon" aria-hidden="true">
          {open ? '✕' : '☰'}
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="mobile-nav__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          ref={panelRef}
        >
          <div className="mobile-nav__panel-inner">
            <h2 id={titleId} className="mobile-nav__title">
              {title}
            </h2>
            <ul className="mobile-nav__list">
              {items.map((item) => {
                if (item.available === false) {
                  return (
                    <li key={item.label}>
                      <span className="mobile-nav__link mobile-nav__link--soon">
                        {item.label}
                        <span>Em breve</span>
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <a
                      className="mobile-nav__link"
                      href={withBase(item.href)}
                      onClick={() => {
                        setOpen(false);
                        buttonRef.current?.focus();
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              className="mobile-nav__close"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
            >
              Fechar menu
            </button>
          </div>
        </div>
      ) : null}

      <style>{`
        .mobile-nav {
          display: block;
        }
        @media (min-width: 64rem) {
          .mobile-nav {
            display: none;
          }
        }
        .mobile-nav__toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 2.75rem;
          min-width: 2.75rem;
          padding: 0.5rem 0.85rem;
          border-radius: 12px;
          border: 2px solid #0d6870;
          color: #0d6870;
          font-weight: 600;
        }
        .mobile-nav__panel {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgb(7 27 37 / 55%);
        }
        .mobile-nav__panel-inner {
          position: absolute;
          top: 0;
          right: 0;
          width: min(100%, 22rem);
          height: 100%;
          background: #f6f8f7;
          color: #16313b;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 2px 4px rgb(7 27 37 / 10%), 0 12px 24px rgb(7 27 37 / 8%);
        }
        .mobile-nav__title {
          font-family: Manrope, 'Segoe UI', sans-serif;
          font-size: 1.25rem;
        }
        .mobile-nav__list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .mobile-nav__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 2.75rem;
          padding: 0.75rem 0.85rem;
          border-radius: 12px;
          text-decoration: none;
          color: #16313b;
          font-weight: 600;
        }
        .mobile-nav__link:hover,
        .mobile-nav__link:focus-visible {
          background: #edf2f0;
          color: #0d6870;
        }
        .mobile-nav__link--soon {
          color: #45616a;
          cursor: default;
        }
        .mobile-nav__close {
          margin-top: auto;
          min-height: 2.75rem;
          border-radius: 12px;
          border: 2px solid #0d6870;
          color: #0d6870;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
