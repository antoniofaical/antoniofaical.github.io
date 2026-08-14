import type { StartupListItem } from '../../lib/startups/queryStartups';
import type { StartupStats } from '../../lib/startups/startupStats';
import {
  startupGeographyLabels,
  startupRelationLabels,
  type StartupGeography,
  type StartupRelation,
} from '../../data/startups/taxonomies';

export default function StartupSummary({
  stats,
  items,
}: {
  stats: StartupStats;
  items: StartupListItem[];
}) {
  const relationEntries = Object.entries(stats.byRelation) as Array<[StartupRelation, number]>;
  const geographyEntries = Object.entries(stats.byGeography) as Array<[StartupGeography, number]>;

  return (
    <section className="startup-summary" aria-labelledby="startup-summary-title">
      <h2 id="startup-summary-title" className="visually-hidden">
        Resumo quantitativo
      </h2>
      <p className="startup-summary__lead" data-testid="startup-summary-count">
        {stats.scope === 'filtered'
          ? `${stats.filteredOrganizations} de ${stats.totalOrganizations} organizações no recorte filtrado`
          : `${stats.totalOrganizations} organizações no snapshot publicado`}
      </p>
      {items.length > 0 ? (
        <dl className="startup-summary__grid">
          {relationEntries.map(([key, value]) => (
            <div key={key}>
              <dt>{startupRelationLabels[key]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          {geographyEntries.map(([key, value]) => (
            <div key={`geo-${key}`}>
              <dt>{startupGeographyLabels[key]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <style>{`
        .startup-summary {
          display: grid;
          gap: var(--space-3);
        }
        .startup-summary__lead {
          margin: 0;
          font-weight: 600;
          color: var(--ink-800);
        }
        .startup-summary__grid {
          display: grid;
          gap: var(--space-3);
          grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
          margin: 0;
        }
        .startup-summary__grid div {
          display: grid;
          gap: 0.15rem;
          padding-top: var(--space-2);
          border-top: var(--border-thin) solid var(--line-200);
        }
        .startup-summary__grid dt {
          font-size: var(--annotation);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-600);
        }
        .startup-summary__grid dd {
          margin: 0;
          font-family: var(--font-display);
          font-size: var(--heading-3);
          color: var(--teal-700);
        }
      `}</style>
    </section>
  );
}
