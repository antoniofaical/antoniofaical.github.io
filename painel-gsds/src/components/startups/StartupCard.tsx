import type { StartupListItem } from '../../lib/startups/queryStartups';
import {
  ConfidenceBadge,
  GeographyBadge,
  RelationBadge,
  StatusBadge,
  startupBadgeStyles,
} from './StartupBadges';

export default function StartupCard({
  item,
  onOpen,
}: {
  item: StartupListItem;
  onOpen: (slug: string) => void;
}) {
  const { organization } = item;
  return (
    <article className="startup-card" data-testid="startup-card">
      <header className="startup-card__header">
        <h3>{organization.preferredName}</h3>
        <StatusBadge value={organization.operationalStatus} />
      </header>
      <p className="startup-card__desc">{organization.description}</p>
      <div className="startup-card__badges" aria-label="Classificações">
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
      <button
        type="button"
        className="btn btn--secondary"
        onClick={() => onOpen(organization.slug)}
        aria-haspopup="dialog"
      >
        Ver detalhe
      </button>
      <style>{`
        ${startupBadgeStyles}
        .startup-card {
          display: grid;
          gap: var(--space-3);
          padding: var(--space-5) 0;
          border-top: var(--border-thin) solid var(--line-200);
        }
        .startup-card__header {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          align-items: center;
          justify-content: space-between;
        }
        .startup-card__header h3 {
          margin: 0;
          font-size: var(--heading-3);
        }
        .startup-card__desc {
          margin: 0;
          color: var(--ink-700);
        }
        .startup-card__badges {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
      `}</style>
    </article>
  );
}
