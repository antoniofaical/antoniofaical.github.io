import {
  startupConfidenceLabels,
  startupConfidenceValues,
  startupGeographyLabels,
  startupGeographyValues,
  startupOperationalStatusLabels,
  startupOperationalStatusValues,
  startupRelationLabels,
  startupRelationValues,
  type StartupConfidence,
  type StartupGeography,
  type StartupOperationalStatus,
  type StartupRelation,
} from '../../data/startups/taxonomies';

export type StartupFilterState = {
  relations: StartupRelation[];
  geographies: StartupGeography[];
  confidences: StartupConfidence[];
  operationalStatuses: StartupOperationalStatus[];
};

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function StartupFilters({
  value,
  onChange,
}: {
  value: StartupFilterState;
  onChange: (next: StartupFilterState) => void;
}) {
  return (
    <fieldset className="startup-filters" data-testid="startup-filters">
      <legend>Filtros</legend>
      <div className="startup-filters__groups">
        <fieldset>
          <legend>Relação</legend>
          {startupRelationValues.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={value.relations.includes(item)}
                onChange={() =>
                  onChange({ ...value, relations: toggleValue(value.relations, item) })
                }
              />
              {startupRelationLabels[item]}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Geografia</legend>
          {startupGeographyValues.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={value.geographies.includes(item)}
                onChange={() =>
                  onChange({ ...value, geographies: toggleValue(value.geographies, item) })
                }
              />
              {startupGeographyLabels[item]}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Confiança</legend>
          {startupConfidenceValues.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={value.confidences.includes(item)}
                onChange={() =>
                  onChange({ ...value, confidences: toggleValue(value.confidences, item) })
                }
              />
              {startupConfidenceLabels[item]}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Status operacional</legend>
          {startupOperationalStatusValues.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={value.operationalStatuses.includes(item)}
                onChange={() =>
                  onChange({
                    ...value,
                    operationalStatuses: toggleValue(value.operationalStatuses, item),
                  })
                }
              />
              {startupOperationalStatusLabels[item]}
            </label>
          ))}
        </fieldset>
      </div>
      <style>{`
        .startup-filters {
          border: var(--border-thin) solid var(--line-200);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          margin: 0;
        }
        .startup-filters > legend {
          padding: 0 var(--space-2);
          font-weight: 700;
        }
        .startup-filters__groups {
          display: grid;
          gap: var(--space-4);
        }
        @media (min-width: 48rem) {
          .startup-filters__groups {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .startup-filters fieldset {
          border: 0;
          margin: 0;
          padding: 0;
          display: grid;
          gap: var(--space-2);
        }
        .startup-filters fieldset legend {
          font-size: var(--annotation);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-600);
          margin-bottom: var(--space-1);
        }
        .startup-filters label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          min-height: var(--touch-min);
          font-weight: 500;
        }
        .startup-filters input {
          width: 1.1rem;
          height: 1.1rem;
        }
      `}</style>
    </fieldset>
  );
}
