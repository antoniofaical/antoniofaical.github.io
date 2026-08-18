import type { StartupPublicSource } from '../../schemas/startups/publishedSnapshot';
import {
  startupEvidenceRoleLabels,
  startupPublicSourceTypeLabels,
  type StartupEvidenceRole,
} from '../../data/startups/taxonomies';

type EvidenceLink = {
  source: StartupPublicSource;
  role?: StartupEvidenceRole;
  locator?: string;
};

export default function StartupEvidenceList({ items }: { items: EvidenceLink[] }) {
  if (items.length === 0) {
    return (
      <p className="startup-evidence__empty">Sem fontes públicas vinculadas neste snapshot.</p>
    );
  }

  return (
    <ul className="startup-evidence">
      {items.map(({ source, role, locator }) => (
        <li key={`${source.id}-${role ?? 'none'}-${locator ?? ''}`}>
          <p className="startup-evidence__title">{source.title}</p>
          <p className="startup-evidence__meta">
            {[
              source.publisher,
              startupPublicSourceTypeLabels[source.sourceType],
              role ? startupEvidenceRoleLabels[role] : undefined,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          {source.url ? (
            <a href={source.url} rel="noopener noreferrer">
              Abrir fonte
            </a>
          ) : (
            <span>URL não disponível ({source.availability})</span>
          )}
        </li>
      ))}
      <style>{`
        .startup-evidence {
          display: grid;
          gap: var(--space-3);
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .startup-evidence__title { margin: 0; font-weight: 700; }
        .startup-evidence__meta { margin: 0; color: var(--ink-600); font-size: 0.95rem; }
        .startup-evidence__empty { margin: 0; color: var(--ink-600); }
      `}</style>
    </ul>
  );
}
