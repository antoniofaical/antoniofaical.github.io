import { useEffect, useState } from 'react';
import { startupCoverageStatusLabels } from '../../data/startups/taxonomies';
import { fetchCurrentPublishedSnapshot } from '../../lib/startups/startupApi';
import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';
import ObservatoryAnalytics from './ObservatoryAnalytics';
import StartupCoverageNotice from './StartupCoverageNotice';
import StartupEmptyState from './StartupEmptyState';
import StartupExplorer from './StartupExplorer';

type SnapshotLoader = typeof fetchCurrentPublishedSnapshot;

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; snapshot: StartupPublishedSnapshot };

const A30_ECHO =
  /presença no recorte(?: direto)? não (?:equivale a um programa ativo hoje|significa programa GSD ativo hoje)/i;

export default function StartupObservatory({
  apiBaseUrl,
  loadSnapshot = fetchCurrentPublishedSnapshot,
}: {
  apiBaseUrl: string;
  loadSnapshot?: SnapshotLoader;
}) {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoadState({ status: 'loading' });

    void loadSnapshot({ baseUrl: apiBaseUrl, signal: controller.signal })
      .then((snapshot) => setLoadState({ status: 'ready', snapshot }))
      .catch((error: unknown) => {
        if (
          controller.signal.aborted ||
          (error instanceof DOMException && error.name === 'AbortError')
        ) {
          return;
        }
        setLoadState({ status: 'error' });
      });

    return () => controller.abort();
  }, [apiBaseUrl, loadSnapshot, requestVersion]);

  if (loadState.status === 'loading') {
    return (
      <section className="section-space surface-editorial" aria-labelledby="startup-explorer-title">
        <div className="container stack stack--lg">
          <h2 id="startup-explorer-title">Organizações publicadas</h2>
          <p role="status" aria-live="polite">
            Carregando a base publicada…
          </p>
        </div>
      </section>
    );
  }

  if (loadState.status === 'error') {
    return (
      <section className="section-space surface-editorial" aria-labelledby="startup-explorer-title">
        <div className="container stack stack--lg">
          <h2 id="startup-explorer-title">Organizações publicadas</h2>
          <div className="stack stack--md" role="alert">
            <p>Não foi possível consultar a base publicada neste momento.</p>
            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => setRequestVersion((version) => version + 1)}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  const { snapshot } = loadState;
  const isEmpty =
    snapshot.coverage.status === 'not-yet-populated' || snapshot.organizations.length === 0;
  const updatedAt = snapshot.publishedAt.slice(0, 10);
  const coverageSummary = snapshot.coverage.summary
    .replace(/\s*;?\s*presença no recorte não equivale a um programa ativo hoje\.?/i, '.')
    .replace(/\.\s*\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const coverageLimitations = snapshot.coverage.limitations.filter((item) => !A30_ECHO.test(item));

  return (
    <>
      <section className="section-space surface-editorial" aria-labelledby="startup-explorer-title">
        <div className="container stack stack--lg">
          <header className="stack stack--tight">
            <h2 id="startup-explorer-title">Organizações publicadas</h2>
          </header>
          {isEmpty ? (
            <StartupEmptyState
              publishedAt={snapshot.publishedAt}
              summary={coverageSummary}
              limitations={coverageLimitations}
            />
          ) : (
            <StartupExplorer snapshot={snapshot} />
          )}
        </div>
      </section>

      {!isEmpty ? (
        <>
          <section className="section-space">
            <div className="container">
              <ObservatoryAnalytics snapshot={snapshot} />
            </div>
          </section>
          <section className="section-space" aria-label="Cobertura da base">
            <div className="container">
              <StartupCoverageNotice
                statusLabel={startupCoverageStatusLabels[snapshot.coverage.status]}
                summary={coverageSummary}
                limitations={coverageLimitations}
              />
            </div>
          </section>
        </>
      ) : null}

      <section className="section-space" aria-labelledby="startup-about-data">
        <div className="container stack stack--md">
          <h2 id="startup-about-data">Sobre os dados</h2>
          <ul className="startup-page__notes">
            <li>A base não é um censo nem um inventário global de organizações.</li>
            <li>
              Classificações direta / adjacente / ecossistema / relevância não confirmada e Brasil /
              global pertencem às avaliações de relevância ligadas a cada organização — não são
              bases separadas.
            </li>
            <li>
              Os dados públicos são consultados na plataforma de dados e atualizados quando uma nova
              base publicada é selecionada. Última atualização:{' '}
              <time dateTime={snapshot.publishedAt}>{updatedAt}</time>.
            </li>
            <li>
              Quando uma fonte pública está vinculada ao registro, ela aparece no detalhe da
              organização. Alguns registros diretos ainda não possuem uma fonte pública vinculada
              nesta versão.
            </li>
          </ul>
        </div>
      </section>

      <style>{`
        .startup-page__notes {
          margin: 0;
          padding-left: 1.15rem;
          display: grid;
          gap: var(--space-2);
          color: var(--ink-700);
          max-width: 48rem;
        }
      `}</style>
    </>
  );
}
