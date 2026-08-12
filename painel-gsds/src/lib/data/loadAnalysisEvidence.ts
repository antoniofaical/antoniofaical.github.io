import sourcesJson from '../../data/sources.json';
import claimsJson from '../../data/claims.json';
import metricsJson from '../../data/metrics.json';
import gsdTypesJson from '../../data/clinical/gsd-types.json';
import pathwayJson from '../../data/clinical/pathway.json';
import patternsJson from '../../data/clinical/clinical-patterns.json';
import nomenclatureJson from '../../data/clinical/nomenclature.json';
import epidemiologyJson from '../../data/clinical/epidemiology.json';
import diagnosisJson from '../../data/clinical/diagnosis.json';
import managementJson from '../../data/clinical/management.json';
import therapyJson from '../../data/clinical/therapy-horizon.json';
import gapsJson from '../../data/clinical/clinical-gaps.json';
import burdenJson from '../../data/socioeconomic/burden.json';
import segmentsJson from '../../data/socioeconomic/market-segments.json';
import brazilJson from '../../data/socioeconomic/brazil-evidence.json';
import costLayersJson from '../../data/socioeconomic/cost-layers.json';
import { sourceSchema, type Source } from '../../schemas/source';
import { claimSchema, type Claim } from '../../schemas/claim';
import { metricSchema, type Metric } from '../../schemas/metric';
import { gsdTypeSchema, type GsdType } from '../../schemas/clinical/gsdType';
import {
  burdenFindingSchema,
  marketSegmentSchema,
  type BurdenFinding,
  type MarketSegment,
} from '../../schemas/socioeconomic/domain';
import { loadHomeEvidence } from './loadHomeEvidence';

function assertUniqueIds(ids: string[], label: string) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) throw new Error(`Duplicate ${label} id: ${id}`);
    seen.add(id);
  }
}

function requireClaims(claimIds: string[], claimsById: Map<string, Claim>, owner: string) {
  for (const id of claimIds) {
    const claim = claimsById.get(id);
    if (!claim) throw new Error(`${owner} references missing claim ${id}`);
    if (!claim.approvedForPublication) {
      throw new Error(`${owner} references unapproved claim ${id}`);
    }
  }
}

export type AnalysisEvidence = {
  sources: Source[];
  claims: Claim[];
  metrics: Metric[];
  gsdTypes: GsdType[];
  pathway: typeof pathwayJson;
  patterns: typeof patternsJson;
  nomenclature: typeof nomenclatureJson;
  epidemiology: typeof epidemiologyJson;
  diagnosis: typeof diagnosisJson;
  management: typeof managementJson;
  therapyHorizon: typeof therapyJson;
  clinicalGaps: typeof gapsJson;
  burdenFindings: BurdenFinding[];
  marketSegments: MarketSegment[];
  brazilEvidence: typeof brazilJson;
  costLayers: typeof costLayersJson;
};

export function loadAnalysisEvidence(): AnalysisEvidence {
  // Retrocompatibility gate for Home
  loadHomeEvidence();

  const sources = sourcesJson.map((item) => sourceSchema.parse(item));
  const claims = claimsJson.map((item) => claimSchema.parse(item));
  const metrics = metricsJson.map((item) => metricSchema.parse(item));
  const gsdTypes = gsdTypesJson.map((item) => gsdTypeSchema.parse(item));

  const burdenRaw = Array.isArray(burdenJson) ? burdenJson : burdenJson.findings;
  const segmentsRaw = Array.isArray(segmentsJson) ? segmentsJson : segmentsJson.segments;
  const burdenFindings = burdenRaw.map((item) => burdenFindingSchema.parse(item));
  const marketSegments = segmentsRaw.map((item) => marketSegmentSchema.parse(item));

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
  assertUniqueIds(
    gsdTypes.map((g) => g.id),
    'gsd',
  );
  assertUniqueIds(
    burdenFindings.map((b) => b.id),
    'burden',
  );
  assertUniqueIds(
    marketSegments.map((s) => s.id),
    'segment',
  );

  const sourcesById = new Map(sources.map((s) => [s.id, s]));
  const claimsById = new Map(claims.map((c) => [c.id, c]));

  for (const claim of claims) {
    for (const ref of claim.sourceRefs) {
      if (!sourcesById.has(ref.sourceId)) {
        throw new Error(`Claim ${claim.id} missing source ${ref.sourceId}`);
      }
    }
  }

  for (const gsd of gsdTypes) {
    requireClaims(gsd.claimIds, claimsById, gsd.id);
    for (const sourceId of gsd.sourceIds) {
      if (!sourcesById.has(sourceId)) throw new Error(`${gsd.id} missing source ${sourceId}`);
    }
  }

  for (const finding of burdenFindings) {
    requireClaims(finding.claimIds, claimsById, finding.id);
  }
  for (const segment of marketSegments) {
    requireClaims(segment.claimIds, claimsById, segment.id);
  }

  // Forbidden wording checks on published metrics
  for (const metric of metrics) {
    const blob = `${metric.label} ${metric.unit} ${metric.limitations.join(' ')}`.toLowerCase();
    if (metric.id.includes('datasus') || metric.unit.toLowerCase().includes('aih')) {
      if (blob.includes('paciente') && metric.unit.toLowerCase().includes('paciente')) {
        throw new Error(`DATASUS metric ${metric.id} uses patient wording`);
      }
    }
    if (
      metric.marketClassification === 'TAM' ||
      metric.marketClassification === 'SAM' ||
      metric.marketClassification === 'SOM'
    ) {
      throw new Error(`Metric ${metric.id} classified as TAM/SAM/SOM`);
    }
  }

  return {
    sources,
    claims,
    metrics,
    gsdTypes,
    pathway: pathwayJson,
    patterns: patternsJson,
    nomenclature: nomenclatureJson,
    epidemiology: epidemiologyJson,
    diagnosis: diagnosisJson,
    management: managementJson,
    therapyHorizon: therapyJson,
    clinicalGaps: gapsJson,
    burdenFindings,
    marketSegments,
    brazilEvidence: brazilJson,
    costLayers: costLayersJson,
  };
}
