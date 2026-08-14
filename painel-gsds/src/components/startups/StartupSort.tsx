import type { StartupQueryInput } from '../../lib/startups/queryStartups';

export type StartupSortValue = NonNullable<StartupQueryInput['sort']>;

const OPTIONS: Array<{ value: StartupSortValue; label: string }> = [
  { value: 'name-asc', label: 'Nome (A–Z)' },
  { value: 'name-desc', label: 'Nome (Z–A)' },
  { value: 'reviewed-desc', label: 'Última revisão (mais recente)' },
  { value: 'reviewed-asc', label: 'Última revisão (mais antiga)' },
];

export default function StartupSort({
  value,
  onChange,
}: {
  value: StartupSortValue;
  onChange: (value: StartupSortValue) => void;
}) {
  return (
    <label className="startup-sort">
      <span>Ordenar</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as StartupSortValue)}
        data-testid="startup-sort"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <style>{`
        .startup-sort {
          display: grid;
          gap: var(--space-1);
          font-size: var(--annotation);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink-600);
        }
        .startup-sort select {
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
      `}</style>
    </label>
  );
}
