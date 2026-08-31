import StartupBarChart from './StartupBarChart';
import {
  aggregateDirectGsdActivityCounts,
  aggregateDirectOrganizationStatusCounts,
  aggregateOrgGeographyIncidence,
  aggregateOrgRelationCounts,
} from '../../lib/startups/aggregateObservatoryCharts';
import {
  startupDirectGsdActivityLabels,
  startupDirectGsdActivityValues,
  startupDirectOrganizationStatusLabels,
  startupDirectOrganizationStatusValues,
  startupGeographyLabels,
  startupGeographyValues,
  startupRelationLabels,
  startupRelationValues,
} from '../../data/startups/taxonomies';
import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';

export default function ObservatoryAnalytics({ snapshot }: { snapshot: StartupPublishedSnapshot }) {
  const relationCounts = aggregateOrgRelationCounts(snapshot);
  const geography = aggregateOrgGeographyIncidence(snapshot);
  const activity = aggregateDirectGsdActivityCounts(snapshot);
  const status = aggregateDirectOrganizationStatusCounts(snapshot);

  const relationData = startupRelationValues.map((key) => ({
    key,
    label: startupRelationLabels[key],
    value: relationCounts[key],
  }));

  const geographyData = startupGeographyValues.map((key) => ({
    key,
    label: startupGeographyLabels[key],
    value: geography.counts[key],
  }));

  const activityData = startupDirectGsdActivityValues.map((key) => ({
    key,
    label: startupDirectGsdActivityLabels[key],
    value: activity.counts[key],
  }));

  const statusData = startupDirectOrganizationStatusValues.map((key) => ({
    key,
    label: startupDirectOrganizationStatusLabels[key],
    value: status.counts[key],
  }));

  return (
    <section
      className="observatory-analytics"
      aria-labelledby="observatory-analytics-title"
      data-testid="observatory-analytics"
    >
      <header className="observatory-analytics__header">
        <h2 id="observatory-analytics-title">Visão analítica da base publicada</h2>
        <p>
          Distribuições derivadas da base publicada. Esta visão considera toda a base publicada e
          não muda com os filtros do explorador.
        </p>
      </header>

      <div className="observatory-analytics__group">
        <h3 className="observatory-analytics__group-title">Ecossistema publicado</h3>
        <div className="observatory-analytics__grid">
          <StartupBarChart
            id="viz-01-relations"
            title="Organizações por relação com GSDs"
            description="Contagem de organizações únicas por tipo de relação."
            data={relationData}
            caveat="Uma organização é contada uma vez em cada relação que possui. Na base atual, nenhuma organização aparece em mais de uma categoria de relação."
          />
          <StartupBarChart
            id="viz-02-geography"
            title="Organizações por escopo geográfico"
            description="Incidência de escopos Brasil e Global entre as organizações publicadas."
            data={geographyData}
            caveat="Brasil e Global não são categorias mutuamente exclusivas: uma organização aparece nos dois escopos."
          />
        </div>
      </div>

      <div className="observatory-analytics__group">
        <h3 className="observatory-analytics__group-title">
          Players com relação direta (n={activity.directTotal})
        </h3>
        <p className="observatory-analytics__direct-note">
          As duas visualizações abaixo consideram apenas os {activity.directTotal} players com
          relação direta às GSDs. Presença no mapeamento não implica programa ativo atualmente.
        </p>
        <div className="observatory-analytics__grid">
          <StartupBarChart
            id="viz-03-direct-activity"
            title="Atividade GSD dos players diretos"
            description={`Somente o recorte direto (n=${activity.directTotal}).`}
            data={activityData}
          />
          <StartupBarChart
            id="viz-04-direct-status"
            title="Status corporativo dos players diretos"
            description={`Status corporativo do recorte direto (n=${status.directTotal}), distinto do status operacional das 120 organizações.`}
            data={statusData}
          />
        </div>
      </div>

      <style>{`
        .observatory-analytics {
          display: grid;
          gap: var(--space-6);
          width: 100%;
          max-width: 100%;
        }
        .observatory-analytics__header {
          display: grid;
          gap: var(--space-2);
          max-width: 48rem;
        }
        .observatory-analytics__header h2 {
          margin: 0;
          font-family: var(--font-display);
          font-size: var(--heading-2);
          color: var(--ink-800);
        }
        .observatory-analytics__header p {
          margin: 0;
          color: var(--ink-600);
        }
        .observatory-analytics__group {
          display: grid;
          gap: var(--space-4);
        }
        .observatory-analytics__group-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: var(--heading-3);
          color: var(--ink-800);
        }
        .observatory-analytics__direct-note {
          margin: 0;
          color: var(--ink-600);
          max-width: 48rem;
        }
        .observatory-analytics__grid {
          display: grid;
          gap: var(--space-5);
          grid-template-columns: 1fr;
          width: 100%;
        }
        @media (min-width: 48rem) {
          .observatory-analytics__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
