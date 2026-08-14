export default function StartupNoResultsState({
  onClear,
  query,
}: {
  onClear: () => void;
  query: string;
}) {
  return (
    <div
      className="startup-no-results"
      role="status"
      aria-live="polite"
      data-testid="startup-no-results"
    >
      <h3>Nenhuma organização corresponde aos filtros</h3>
      <p>
        A consulta{query ? ` “${query}”` : ''} e os filtros ativos não encontraram correspondências
        neste snapshot. Isso não significa que não existam soluções no mundo — apenas que o recorte
        publicado não cobre o critério.
      </p>
      <button type="button" className="btn btn--secondary" onClick={onClear}>
        Limpar busca e filtros
      </button>
      <style>{`
        .startup-no-results {
          display: grid;
          gap: var(--space-3);
          padding: var(--space-5) 0;
        }
        .startup-no-results h3 { margin: 0; font-size: var(--heading-3); }
        .startup-no-results p { margin: 0; color: var(--ink-600); max-width: 40rem; }
      `}</style>
    </div>
  );
}
