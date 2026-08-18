export default function StartupCoverageNotice({
  statusLabel,
  summary,
  limitations,
}: {
  statusLabel: string;
  summary: string;
  limitations: string[];
}) {
  return (
    <aside
      className="startup-coverage"
      aria-labelledby="startup-coverage-title"
      data-testid="startup-coverage-notice"
    >
      <h2 id="startup-coverage-title">Cobertura e limitações</h2>
      <p className="startup-coverage__status">
        Status de cobertura: <strong>{statusLabel}</strong>
      </p>
      <p className="startup-coverage__summary">{summary}</p>
      <ul>
        {limitations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <style>{`
        .startup-coverage {
          display: grid;
          gap: var(--space-3);
          padding: var(--space-5) 0;
          border-top: 3px solid var(--teal-500);
        }
        .startup-coverage h2 {
          margin: 0;
          font-size: var(--heading-3);
        }
        .startup-coverage__status,
        .startup-coverage__summary {
          margin: 0;
          color: var(--ink-700);
          max-width: 48rem;
        }
        .startup-coverage ul {
          margin: 0;
          padding-left: 1.15rem;
          color: var(--ink-600);
          max-width: 48rem;
          display: grid;
          gap: var(--space-2);
        }
      `}</style>
    </aside>
  );
}
