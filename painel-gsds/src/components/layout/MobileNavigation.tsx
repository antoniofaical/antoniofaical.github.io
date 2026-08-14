import { useEffect, useId, useRef, useState } from 'react';
import { withBase } from '../../lib/paths/withBase';
import { SITE_NAV_ITEMS, type SiteNavItem } from '../../lib/navigation/siteNav';

export type MobileNavItem = SiteNavItem;

export type MobileNavigationProps = {
  title?: string;
  items?: MobileNavItem[];
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
  );
}

export default function MobileNavigation({
  title = 'Menu de navegação',
  items = SITE_NAV_ITEMS,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const opener = buttonRef.current;
    const panel = panelRef.current;
    if (!panel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = getFocusable(panel);
    const first = focusable[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;

      const nodes = getFocusable(panel);
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }

      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === firstNode || !panel.contains(active)) {
          event.preventDefault();
          lastNode.focus();
        }
        return;
      }

      if (active === lastNode || !panel.contains(active)) {
        event.preventDefault();
        firstNode.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
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
        aria-haspopup="dialog"
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
          <div className="mobile-nav__backdrop" aria-hidden="true" onClick={closeMenu} />
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
                    <a className="mobile-nav__link" href={withBase(item.href)} onClick={closeMenu}>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button type="button" className="mobile-nav__close" onClick={closeMenu}>
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
          min-height: var(--touch-min);
          min-width: var(--touch-min);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          border: var(--border-strong) solid var(--teal-700);
          color: var(--teal-700);
          background: transparent;
          font-weight: 600;
          font-family: var(--font-body);
        }
        .mobile-nav__panel {
          position: fixed;
          inset: 0;
          z-index: var(--z-overlay);
        }
        .mobile-nav__backdrop {
          position: absolute;
          inset: 0;
          background: var(--overlay-scrim);
        }
        .mobile-nav__panel-inner {
          position: absolute;
          top: 0;
          right: 0;
          width: min(100%, 22rem);
          height: 100%;
          background: var(--paper-50);
          color: var(--ink-800);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: var(--elevation-2);
          z-index: 1;
        }
        .mobile-nav__title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin: 0;
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
          min-height: var(--touch-min);
          padding: 0.75rem 0.85rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--ink-800);
          font-weight: 600;
          font-family: var(--font-body);
        }
        .mobile-nav__link:hover,
        .mobile-nav__link:focus-visible {
          background: var(--paper-100);
          color: var(--teal-700);
        }
        .mobile-nav__link--soon {
          color: var(--ink-600);
          cursor: default;
        }
        .mobile-nav__close {
          margin-top: auto;
          min-height: var(--touch-min);
          border-radius: var(--radius-md);
          border: var(--border-strong) solid var(--teal-700);
          color: var(--teal-700);
          background: transparent;
          font-weight: 600;
          font-family: var(--font-body);
        }
      `}</style>
    </div>
  );
}
