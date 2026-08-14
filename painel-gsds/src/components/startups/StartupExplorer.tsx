import { useMemo, useState } from 'react';
import type { StartupListItem, StartupQueryInput } from '../../lib/startups/queryStartups';
import { queryStartups } from '../../lib/startups/queryStartups';
import { computeStartupStats } from '../../lib/startups/startupStats';
import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';
import StartupSearch from './StartupSearch';
import StartupFilters, { type StartupFilterState } from './StartupFilters';
import StartupSort, { type StartupSortValue } from './StartupSort';
import StartupSummary from './StartupSummary';
import StartupCard from './StartupCard';
import StartupDetail from './StartupDetail';
import StartupNoResultsState from './StartupNoResultsState';

const EMPTY_FILTERS: StartupFilterState = {
  relations: [],
  geographies: [],
  confidences: [],
  operationalStatuses: [],
};

export default function StartupExplorer({ snapshot }: { snapshot: StartupPublishedSnapshot }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<StartupFilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<StartupSortValue>('name-asc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const input: StartupQueryInput = useMemo(
    () => ({
      query,
      relations: filters.relations,
      geographies: filters.geographies,
      confidences: filters.confidences,
      operationalStatuses: filters.operationalStatuses,
      sort,
    }),
    [query, filters, sort],
  );

  const items = useMemo(() => queryStartups(snapshot, input), [snapshot, input]);
  const stats = useMemo(() => computeStartupStats(snapshot, items), [snapshot, items]);
  const selected = items.find((item) => item.organization.slug === selectedSlug) ?? null;

  const clearAll = () => {
    setQuery('');
    setFilters(EMPTY_FILTERS);
    setSort('name-asc');
  };

  const hasActiveFilters =
    Boolean(query.trim()) ||
    filters.relations.length > 0 ||
    filters.geographies.length > 0 ||
    filters.confidences.length > 0 ||
    filters.operationalStatuses.length > 0;

  return (
    <div className="startup-explorer" data-testid="startup-explorer">
      <StartupSummary stats={stats} items={items as StartupListItem[]} />

      <div className="startup-explorer__controls">
        <StartupSearch value={query} onChange={setQuery} />
        <StartupSort value={sort} onChange={setSort} />
        <button
          type="button"
          className="startup-explorer__filters-toggle btn btn--secondary"
          aria-expanded={filtersOpen}
          aria-controls="startup-filters-panel"
          onClick={() => setFiltersOpen((value) => !value)}
        >
          {filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>
      </div>

      <div
        id="startup-filters-panel"
        hidden={!filtersOpen}
        className="startup-explorer__filters-panel"
      >
        <StartupFilters value={filters} onChange={setFilters} />
      </div>

      <p className="startup-explorer__count" role="status" aria-live="polite">
        {items.length === 0
          ? hasActiveFilters
            ? 'Nenhuma organização corresponde aos filtros atuais.'
            : 'Nenhuma organização neste snapshot.'
          : `${items.length} organização${items.length === 1 ? '' : 'ões'} no recorte.`}
      </p>

      {items.length === 0 && hasActiveFilters ? (
        <StartupNoResultsState query={query} onClear={clearAll} />
      ) : (
        <div className="startup-explorer__list">
          {items.map((item) => (
            <StartupCard
              key={item.organization.id}
              item={item}
              onOpen={(slug) => setSelectedSlug(slug)}
            />
          ))}
        </div>
      )}

      {selected ? <StartupDetail item={selected} onClose={() => setSelectedSlug(null)} /> : null}

      <style>{`
        .startup-explorer {
          display: grid;
          gap: var(--space-5);
        }
        .startup-explorer__controls {
          display: grid;
          gap: var(--space-3);
        }
        @media (min-width: 48rem) {
          .startup-explorer__controls {
            grid-template-columns: 1fr minmax(12rem, 16rem) auto;
            align-items: end;
          }
          .startup-explorer__filters-toggle {
            display: none;
          }
          .startup-explorer__filters-panel[hidden] {
            display: block !important;
          }
        }
        .startup-explorer__count {
          margin: 0;
          color: var(--ink-600);
        }
        .startup-explorer__list {
          display: grid;
          gap: 0;
        }
      `}</style>
    </div>
  );
}
