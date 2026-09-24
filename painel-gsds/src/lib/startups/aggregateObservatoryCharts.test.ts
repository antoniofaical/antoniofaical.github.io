import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  aggregateDirectGsdActivityCounts,
  aggregateDirectOrganizationStatusCounts,
  aggregateOrgGeographyIncidence,
  aggregateOrgRelationCounts,
} from './aggregateObservatoryCharts';
import { parseStartupPublishedSnapshot } from './startupApi';
import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readSyntheticRaw(): StartupPublishedSnapshot {
  return JSON.parse(
    readFileSync(
      path.resolve(__dirname, '../../../tests/fixtures/startups/synthetic-valid-snapshot.json'),
      'utf8',
    ),
  ) as StartupPublishedSnapshot;
}

describe('aggregateObservatoryCharts — synthetic contract fixture', () => {
  const snapshot = parseStartupPublishedSnapshot(readSyntheticRaw());

  it('counts unique organizations by relation', () => {
    const counts = aggregateOrgRelationCounts(snapshot);
    expect(counts).toEqual({
      'adjacent-gsd': 1,
      'direct-gsd': 1,
      'relevance-unconfirmed': 0,
      'ecosystem-support': 0,
    });
  });

  it('counts geography incidence independently', () => {
    const { counts, bothCount } = aggregateOrgGeographyIncidence(snapshot);
    expect(counts.global).toBe(2);
    expect(counts.brazil).toBe(1);
    expect(bothCount).toBe(1);
  });

  it('isolates direct activity and organization status', () => {
    const result = aggregateDirectGsdActivityCounts(snapshot);
    expect(result.directTotal).toBe(1);
    expect(result.missingCount).toBe(1);
    const status = aggregateDirectOrganizationStatusCounts(snapshot);
    expect(status.directTotal).toBe(1);
    expect(status.missingCount).toBe(1);
  });
});

describe('aggregateObservatoryCharts — future-safe / isolation', () => {
  it('organização com duas relation tags distintas conta uma vez em cada', () => {
    const raw = structuredClone(readSyntheticRaw()) as {
      counts: Record<string, number>;
      relevanceAssessments: Array<Record<string, unknown>>;
      organizations: unknown[];
    };

    raw.relevanceAssessments.push({
      id: 'rel-synth-hgl-adjacent-extra',
      organizationId: 'org-synth-helix-glyph-labs',
      relationship: 'adjacent-gsd',
      geographicScopes: ['global'],
      modalities: ['enzyme-replacement'],
      gsdRefs: [],
      clinicalNeedRefs: [],
      socioeconomicNeedRefs: [],
      rationale:
        'SYNTHETIC multi-relation case: same organization also tagged adjacent for aggregator isolation.',
      confidence: 'medium',
      evidenceRefs: [{ sourceId: 'sps-synth-hgl-site', role: 'supports' }],
      assessedAt: '2026-08-01',
      protocolVersion: 'startup-public-v1',
    });
    raw.counts.relevanceAssessments = 3;
    raw.counts.adjacentGsd = 2;
    // assessment-level geography: HelixGlyph direct(global) + HelixGlyph adjacent(global) + ACB(brazil,global)
    raw.counts.global = 3;

    const snapshot = parseStartupPublishedSnapshot(raw);
    const counts = aggregateOrgRelationCounts(snapshot);

    expect(counts['direct-gsd']).toBe(1);
    expect(counts['adjacent-gsd']).toBe(2); // HelixGlyph + Amazon Care Bridge
    const sum =
      counts['direct-gsd'] +
      counts['adjacent-gsd'] +
      counts['ecosystem-support'] +
      counts['relevance-unconfirmed'];
    expect(sum).toBeGreaterThan(snapshot.organizations.length);
    expect(sum).toBe(3);
    expect(() => aggregateOrgRelationCounts(snapshot)).not.toThrow();
  });

  it('VIZ-03/04 isolam direct-gsd e ignoram operationalStatus / indiretos', () => {
    const raw = structuredClone(readSyntheticRaw()) as {
      organizations: Array<Record<string, unknown>>;
      relevanceAssessments: Array<Record<string, unknown>>;
      counts: Record<string, number>;
    };

    // Indireto com directContext “poluente” e operationalStatus enganoso.
    raw.organizations[1].operationalStatus = 'public';
    raw.relevanceAssessments[1].directContext = {
      organizationStatus: 'public-biotech',
      currentGsdActivity: 'confirmed-current',
    };

    // Direto com valores conhecidos (e operationalStatus diferente do status direto).
    raw.organizations[0].operationalStatus = 'apparently-active';
    raw.relevanceAssessments[0].directContext = {
      organizationStatus: 'private-startup',
      currentGsdActivity: 'historical-only',
    };
    // Diretos podem ter evidenceRefs vazios.
    raw.relevanceAssessments[0].evidenceRefs = [];

    const snapshot = parseStartupPublishedSnapshot(raw);
    const activity = aggregateDirectGsdActivityCounts(snapshot);
    const status = aggregateDirectOrganizationStatusCounts(snapshot);

    expect(activity.directTotal).toBe(1);
    expect(activity.missingCount).toBe(0);
    expect(activity.counts['historical-only']).toBe(1);
    expect(activity.counts['confirmed-current']).toBe(0);

    expect(status.directTotal).toBe(1);
    expect(status.missingCount).toBe(0);
    expect(status.counts['private-startup']).toBe(1);
    expect(status.counts['public-biotech']).toBe(0);
  });
});
