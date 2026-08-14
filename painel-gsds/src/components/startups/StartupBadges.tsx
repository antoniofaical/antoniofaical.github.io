import type {
  StartupConfidence,
  StartupGeography,
  StartupOperationalStatus,
  StartupRelation,
} from '../../data/startups/taxonomies';
import {
  startupConfidenceLabels,
  startupGeographyLabels,
  startupOperationalStatusLabels,
  startupRelationLabels,
} from '../../data/startups/taxonomies';

type BadgeKind = 'relation' | 'geography' | 'confidence' | 'status';

const KIND_CLASS: Record<BadgeKind, string> = {
  relation: 'startup-badge--relation',
  geography: 'startup-badge--geography',
  confidence: 'startup-badge--confidence',
  status: 'startup-badge--status',
};

export function RelationBadge({ value }: { value: StartupRelation }) {
  return (
    <span className={`startup-badge ${KIND_CLASS.relation}`}>{startupRelationLabels[value]}</span>
  );
}

export function GeographyBadge({ value }: { value: StartupGeography }) {
  return (
    <span className={`startup-badge ${KIND_CLASS.geography}`}>{startupGeographyLabels[value]}</span>
  );
}

export function ConfidenceBadge({ value }: { value: StartupConfidence }) {
  return (
    <span className={`startup-badge ${KIND_CLASS.confidence}`}>
      Confiança: {startupConfidenceLabels[value]}
    </span>
  );
}

export function StatusBadge({ value }: { value: StartupOperationalStatus }) {
  return (
    <span className={`startup-badge ${KIND_CLASS.status}`}>
      {startupOperationalStatusLabels[value]}
    </span>
  );
}

export const startupBadgeStyles = `
  .startup-badge {
    display: inline-flex;
    align-items: center;
    min-height: 1.75rem;
    padding: 0.15rem 0.55rem;
    border-radius: var(--radius-sm);
    border: var(--border-thin) solid var(--line-200);
    background: var(--paper-100);
    color: var(--ink-800);
    font-size: var(--annotation);
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .startup-badge--relation { border-color: var(--teal-500); color: var(--teal-700); }
  .startup-badge--geography { border-color: var(--ink-600); }
  .startup-badge--confidence { background: var(--paper-50); }
  .startup-badge--status { text-transform: none; }
`;
