export default function StartupSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="startup-search">
      <span>Buscar organizações</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nome, alias, descrição ou tecnologia"
        autoComplete="off"
        data-testid="startup-search"
      />
      <style>{`
        .startup-search {
          display: grid;
          gap: var(--space-1);
          font-size: var(--annotation);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink-600);
        }
        .startup-search input {
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
