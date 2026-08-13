import { useMemo, useState } from 'react';

export type ExplorerGsd = {
  id: string;
  preferredName: string;
  gene?: string;
  proteinOrEnzyme?: string;
  clinicalPattern: Array<'hepatic' | 'muscular' | 'multisystemic'>;
  distinctiveFeatures: string;
  organsExplicitlyDescribed: Array<{ organ: string; state: string; note?: string }>;
};

const PATTERN_LABEL: Record<string, string> = {
  hepatic: 'Hepático',
  muscular: 'Muscular',
  multisystemic: 'Multissistêmico',
};

export default function GSDExplorer({ items }: { items: ExplorerGsd[] }) {
  const [pattern, setPattern] = useState<'all' | 'hepatic' | 'muscular' | 'multisystemic'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const patternOk = pattern === 'all' || item.clinicalPattern.includes(pattern);
      const queryOk =
        !q ||
        item.preferredName.toLowerCase().includes(q) ||
        (item.gene ?? '').toLowerCase().includes(q) ||
        item.distinctiveFeatures.toLowerCase().includes(q);
      return patternOk && queryOk;
    });
  }, [items, pattern, query]);

  return (
    <div className="gsd-explorer">
      <div className="gsd-explorer__controls">
        <label className="gsd-explorer__field">
          <span>Filtrar por padrão clínico</span>
          <select
            value={pattern}
            onChange={(event) =>
              setPattern(event.target.value as 'all' | 'hepatic' | 'muscular' | 'multisystemic')
            }
          >
            <option value="all">Todos</option>
            <option value="hepatic">Hepático</option>
            <option value="muscular">Muscular</option>
            <option value="multisystemic">Multissistêmico</option>
          </select>
        </label>
        <label className="gsd-explorer__field">
          <span>Buscar por nome, gene ou característica</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: Pompe, PYGM, second wind"
          />
        </label>
      </div>

      <p className="gsd-explorer__count" role="status" aria-live="polite">
        {filtered.length === 0
          ? 'Nenhuma GSD corresponde aos filtros.'
          : `${filtered.length} de ${items.length} condições na classificação essencial da SoT.`}
      </p>

      <ul className="gsd-explorer__list">
        {filtered.map((item) => (
          <li key={item.id}>
            <article className="gsd-card">
              <h3>{item.preferredName}</h3>
              <p className="gsd-card__meta">
                {item.gene && <span>Gene: {item.gene}</span>}
                {item.proteinOrEnzyme && <span>Proteína/enzima: {item.proteinOrEnzyme}</span>}
              </p>
              <p>Padrão: {item.clinicalPattern.map((p) => PATTERN_LABEL[p] ?? p).join(', ')}</p>
              <p>{item.distinctiveFeatures}</p>
              {item.organsExplicitlyDescribed.length > 0 && (
                <p className="gsd-card__organs">
                  Órgãos descritos na síntese:{' '}
                  {item.organsExplicitlyDescribed.map((o) => o.organ).join(', ')}.
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>

      <style>{`
        .gsd-explorer { display: grid; gap: var(--space-5); }
        .gsd-explorer__controls { display: grid; gap: var(--space-4); }
        @media (min-width: 48rem) {
          .gsd-explorer__controls { grid-template-columns: 1fr 1fr; }
        }
        .gsd-explorer__field {
          display: grid;
          gap: var(--space-1);
          font-size: var(--annotation);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink-600);
        }
        .gsd-explorer__field select,
        .gsd-explorer__field input {
          min-height: var(--touch-min);
          border: var(--border-strong) solid var(--teal-700);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-3);
          font: inherit;
          text-transform: none;
          letter-spacing: normal;
          font-weight: 500;
          color: var(--ink-800);
          background: var(--white);
        }
        .gsd-explorer__count { margin: 0; color: var(--ink-600); }
        .gsd-explorer__list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-4); }
        @media (min-width: 64rem) {
          .gsd-explorer__list { grid-template-columns: 1fr 1fr; }
        }
        .gsd-card {
          display: grid;
          gap: var(--space-2);
          padding: var(--space-5);
          border: var(--border-thin) solid var(--line-200);
          border-radius: var(--radius-lg);
          background: var(--white);
          height: 100%;
        }
        .gsd-card h3 { margin: 0; font-size: var(--heading-3); }
        .gsd-card p { margin: 0; color: var(--ink-600); max-width: none; }
        .gsd-card__meta { display: flex; flex-wrap: wrap; gap: var(--space-3); font-size: var(--annotation); }
        .gsd-card__organs { font-size: 0.875rem; }
      `}</style>
    </div>
  );
}
