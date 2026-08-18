import { useEffect, useId, useRef } from 'react';
import type { StartupListItem } from '../../lib/startups/queryStartups';
import { startupProductStageLabels, startupRelationLabels } from '../../data/startups/taxonomies';
import {
  ConfidenceBadge,
  GeographyBadge,
  RelationBadge,
  StatusBadge,
  startupBadgeStyles,
} from './StartupBadges';
import StartupEvidenceList from './StartupEvidenceList';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function StartupDetail({
  item,
  onClose,
}: {
  item: StartupListItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getAttribute('aria-hidden') !== 'true',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);

  const evidenceItems = item.sources.flatMap((source) => {
    const roles = [
      ...item.assessments.flatMap((assessment) =>
        assessment.evidenceRefs
          .filter((ref) => ref.sourceId === source.id)
          .map((ref) => ({ role: ref.role, locator: ref.locator })),
      ),
      ...item.products.flatMap((product) =>
        product.evidenceRefs
          .filter((ref) => ref.sourceId === source.id)
          .map((ref) => ({ role: ref.role, locator: ref.locator })),
      ),
    ];
    if (roles.length === 0) return [{ source }];
    return roles.map((role) => ({ source, ...role }));
  });

  return (
    <div className="startup-detail" role="presentation">
      <div className="startup-detail__backdrop" aria-hidden="true" onClick={onClose} />
      <div
        className="startup-detail__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
        data-testid="startup-detail"
      >
        <div className="startup-detail__toolbar">
          <button type="button" className="btn btn--secondary" ref={closeRef} onClick={onClose}>
            Fechar detalhe
          </button>
        </div>
        <h2 id={titleId}>{item.organization.preferredName}</h2>
        <p>{item.organization.description}</p>
        <div className="startup-detail__badges">
          <StatusBadge value={item.organization.operationalStatus} />
          {item.relations.map((value) => (
            <RelationBadge key={value} value={value} />
          ))}
          {item.geographies.map((value) => (
            <GeographyBadge key={value} value={value} />
          ))}
          {item.confidences.map((value) => (
            <ConfidenceBadge key={value} value={value} />
          ))}
        </div>

        <section aria-labelledby="startup-detail-assessments">
          <h3 id="startup-detail-assessments">Avaliações de relevância</h3>
          <ul className="startup-detail__list">
            {item.assessments.map((assessment) => (
              <li key={assessment.id}>
                <p>
                  <strong>{startupRelationLabels[assessment.relationship]}</strong> —{' '}
                  {assessment.rationale}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="startup-detail-products">
          <h3 id="startup-detail-products">Produtos e programas</h3>
          {item.products.length === 0 ? (
            <p>Produtos e programas não foram modelados separadamente neste snapshot.</p>
          ) : (
            <ul className="startup-detail__list">
              {item.products.map((product) => (
                <li key={product.id}>
                  <p>
                    <strong>{product.name}</strong> · {product.modality} ·{' '}
                    {startupProductStageLabels[product.stage]}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="startup-detail-evidence">
          <h3 id="startup-detail-evidence">Fontes públicas</h3>
          <StartupEvidenceList items={evidenceItems} />
        </section>

        <p className="startup-detail__note">
          Contrato preparado para futura rota{' '}
          <code>/inovacao/startups/{item.organization.slug}/</code>; nesta iteração o detalhe
          permanece em drawer acessível.
        </p>
      </div>
      <style>{`
        ${startupBadgeStyles}
        .startup-detail {
          position: fixed;
          inset: 0;
          z-index: var(--z-overlay);
        }
        .startup-detail__backdrop {
          position: absolute;
          inset: 0;
          background: var(--overlay-scrim);
        }
        .startup-detail__panel {
          position: absolute;
          top: 0;
          right: 0;
          width: min(100%, 32rem);
          height: 100%;
          overflow: auto;
          background: var(--paper-50);
          color: var(--ink-800);
          padding: var(--space-5);
          display: grid;
          gap: var(--space-4);
          align-content: start;
          box-shadow: var(--elevation-2);
          z-index: 1;
        }
        .startup-detail__toolbar {
          display: flex;
          justify-content: flex-end;
        }
        .startup-detail__badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .startup-detail__list {
          margin: 0;
          padding-left: 1.1rem;
          display: grid;
          gap: var(--space-2);
        }
        .startup-detail__note {
          margin: 0;
          color: var(--ink-600);
          font-size: 0.95rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .startup-detail__panel { scroll-behavior: auto; }
        }
      `}</style>
    </div>
  );
}
