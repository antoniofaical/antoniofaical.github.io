export default function StartupEmptyState({
  publishedAt,
  summary,
  limitations,
}: {
  publishedAt: string;
  summary: string;
  limitations: string[];
}) {
  return (
    <section
      className="startup-empty"
      aria-labelledby="startup-empty-title"
      data-testid="startup-empty-state"
    >
      <p className="startup-empty__kicker">Snapshot público</p>
      <h2 id="startup-empty-title">Observatório preparado — base ainda não populada</h2>
      <p className="startup-empty__lede">{summary}</p>
      <p className="startup-empty__meta">
        Dataset selecionado publicado em{' '}
        <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString('pt-BR')}</time>.
        Contagens zeradas descrevem o artefato vazio, não um censo de soluções no mundo.
      </p>
      <ul className="startup-empty__limits">
        {limitations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <style>{`
        .startup-empty {
          display: grid;
          gap: var(--space-4);
          padding: var(--space-6) 0;
          border-top: 3px solid var(--teal-500);
        }
        .startup-empty__kicker {
          margin: 0;
          font-size: var(--annotation);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink-600);
        }
        .startup-empty__lede,
        .startup-empty__meta {
          margin: 0;
          color: var(--ink-700);
          max-width: 42rem;
        }
        .startup-empty__limits {
          margin: 0;
          padding-left: 1.1rem;
          color: var(--ink-600);
          max-width: 42rem;
        }
      `}</style>
    </section>
  );
}
