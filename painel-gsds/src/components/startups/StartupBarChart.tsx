export type BarDatum = {
  key: string;
  label: string;
  value: number;
};

export type StartupBarChartProps = {
  id: string;
  title: string;
  description?: string;
  data: BarDatum[];
  caveat?: string;
};

export default function StartupBarChart({
  id,
  title,
  description,
  data,
  caveat,
}: StartupBarChartProps) {
  const max = Math.max(0, ...data.map((item) => item.value));
  const titleId = `${id}-title`;
  const descId = description ? `${id}-desc` : undefined;
  const caveatId = caveat ? `${id}-caveat` : undefined;

  return (
    <figure
      className="startup-bar-chart"
      data-testid={id}
      aria-labelledby={titleId}
      aria-describedby={[descId, caveatId].filter(Boolean).join(' ') || undefined}
    >
      <figcaption className="startup-bar-chart__caption">
        <h3 id={titleId} className="startup-bar-chart__title">
          {title}
        </h3>
        {description ? (
          <p id={descId} className="startup-bar-chart__description">
            {description}
          </p>
        ) : null}
      </figcaption>

      <dl className="startup-bar-chart__list">
        {data.map((item) => {
          const ratio = max === 0 ? 0 : item.value / max;
          return (
            <div key={item.key} className="startup-bar-chart__row">
              <dt className="startup-bar-chart__label">{item.label}</dt>
              <dd className="startup-bar-chart__value">{item.value}</dd>
              <div className="startup-bar-chart__track" aria-hidden="true">
                <span
                  className="startup-bar-chart__bar"
                  style={{ ['--bar-ratio' as string]: String(ratio) }}
                />
              </div>
            </div>
          );
        })}
      </dl>

      {caveat ? (
        <p id={caveatId} className="startup-bar-chart__caveat">
          {caveat}
        </p>
      ) : null}

      <style>{`
        .startup-bar-chart {
          margin: 0;
          display: grid;
          gap: var(--space-3);
          width: 100%;
          max-width: 100%;
        }
        .startup-bar-chart__caption {
          display: grid;
          gap: var(--space-2);
        }
        .startup-bar-chart__title {
          margin: 0;
          font-family: var(--font-display);
          font-size: var(--heading-3);
          color: var(--ink-800);
        }
        .startup-bar-chart__description {
          margin: 0;
          color: var(--ink-600);
          max-width: 40rem;
        }
        .startup-bar-chart__list {
          margin: 0;
          display: grid;
          gap: var(--space-3);
        }
        .startup-bar-chart__row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          grid-template-areas:
            'label value'
            'track track';
          gap: var(--space-1) var(--space-3);
          align-items: baseline;
          width: 100%;
        }
        .startup-bar-chart__label {
          grid-area: label;
          margin: 0;
          color: var(--ink-700);
          overflow-wrap: anywhere;
        }
        .startup-bar-chart__value {
          grid-area: value;
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--teal-700);
          font-variant-numeric: tabular-nums;
        }
        .startup-bar-chart__track {
          grid-area: track;
          width: 100%;
          height: 0.65rem;
          background: var(--paper-100);
          border: var(--border-thin) solid var(--line-200);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .startup-bar-chart__bar {
          display: block;
          height: 100%;
          max-width: 100%;
          width: calc(var(--bar-ratio, 0) * 100%);
          background: var(--teal-500);
        }
        .startup-bar-chart__caveat {
          margin: 0;
          font-size: var(--annotation);
          color: var(--ink-600);
          max-width: 40rem;
        }
      `}</style>
    </figure>
  );
}
