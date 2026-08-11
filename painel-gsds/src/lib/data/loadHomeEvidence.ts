import sourcesJson from '../../data/sources.json';
import claimsJson from '../../data/claims.json';
import metricsJson from '../../data/metrics.json';
import { sourceSchema, type Source } from '../../schemas/source';
import { claimSchema, type Claim } from '../../schemas/claim';
import { metricSchema, type Metric } from '../../schemas/metric';

export type ResolvedHomeMetric = {
  metric: Metric;
  claim: Claim;
  sources: Source[];
};

export type HomeEvidence = {
  sources: Source[];
  claims: Claim[];
  metrics: Metric[];
  homeMetrics: ResolvedHomeMetric[];
  byMetricId: Record<string, ResolvedHomeMetric>;
};

const HOME_METRIC_IDS = [
  'met-clinical-001',
  'met-market-001',
  'met-datasus-001',
  'met-mcardle-001',
] as const;

function assertUniqueIds(ids: string[], label: string) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) {
      throw new Error(`Duplicate ${label} id: ${id}`);
    }
    seen.add(id);
  }
}

export function loadHomeEvidence(): HomeEvidence {
  const sources = sourcesJson.map((item) => sourceSchema.parse(item));
  const claims = claimsJson.map((item) => claimSchema.parse(item));
  const metrics = metricsJson.map((item) => metricSchema.parse(item));

  assertUniqueIds(
    sources.map((s) => s.id),
    'source',
  );
  assertUniqueIds(
    claims.map((c) => c.id),
    'claim',
  );
  assertUniqueIds(
    metrics.map((m) => m.id),
    'metric',
  );

  const sourcesById = new Map(sources.map((source) => [source.id, source]));
  const claimsById = new Map(claims.map((claim) => [claim.id, claim]));

  for (const claim of claims) {
    for (const ref of claim.sourceRefs) {
      if (!sourcesById.has(ref.sourceId)) {
        throw new Error(`Claim ${claim.id} references missing source ${ref.sourceId}`);
      }
    }
  }

  const homeMetrics: ResolvedHomeMetric[] = [];

  for (const metric of metrics) {
    const claim = claimsById.get(metric.claimId);
    if (!claim) {
      throw new Error(`Metric ${metric.id} references missing claim ${metric.claimId}`);
    }

    for (const sourceId of metric.sourceIds) {
      if (!sourcesById.has(sourceId)) {
        throw new Error(`Metric ${metric.id} references missing source ${sourceId}`);
      }
    }

    if (!metric.sourceIds.length || !metric.claimId) {
      throw new Error(`Metric ${metric.id} must reference source and claim`);
    }

    if (HOME_METRIC_IDS.includes(metric.id as (typeof HOME_METRIC_IDS)[number])) {
      if (!claim.approvedForPublication) {
        throw new Error(`Home metric ${metric.id} depends on unapproved claim ${claim.id}`);
      }

      homeMetrics.push({
        metric,
        claim,
        sources: metric.sourceIds.map((id) => sourcesById.get(id)!),
      });
    }
  }

  for (const requiredId of HOME_METRIC_IDS) {
    if (!homeMetrics.some((item) => item.metric.id === requiredId)) {
      throw new Error(`Missing required Home metric ${requiredId}`);
    }
  }

  // Stable order for the Home
  homeMetrics.sort(
    (a, b) =>
      HOME_METRIC_IDS.indexOf(a.metric.id as (typeof HOME_METRIC_IDS)[number]) -
      HOME_METRIC_IDS.indexOf(b.metric.id as (typeof HOME_METRIC_IDS)[number]),
  );

  const byMetricId = Object.fromEntries(
    homeMetrics.map((item) => [item.metric.id, item]),
  ) as Record<string, ResolvedHomeMetric>;

  return { sources, claims, metrics, homeMetrics, byMetricId };
}

export function getApprovedHomeClaims(evidence: HomeEvidence = loadHomeEvidence()): Claim[] {
  return evidence.claims.filter((claim) => claim.approvedForPublication);
}
