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
import { loadPublishedSnapshot, parseStartupPublishedSnapshot } from './loadPublishedSnapshot';
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

describe('aggregateObservatoryCharts — baseline snapshot auditado', () => {
  const snapshot = loadPublishedSnapshot();

  it('VIZ-01 relation incidence por unique organization = 81/28/11/0', () => {
    const counts = aggregateOrgRelationCounts(snapshot);
    expect(counts).toEqual({
      'adjacent-gsd': 81,
      'direct-gsd': 28,
      'relevance-unconfirmed': 11,
      'ecosystem-support': 0,
    });
    // Não assume exclusividade futura: neste snapshot a soma coincide com n orgs.
    expect(
      counts['adjacent-gsd'] +
        counts['direct-gsd'] +
        counts['relevance-unconfirmed'] +
        counts['ecosystem-support'],
    ).toBe(120);
    expect(snapshot.counts.adjacentGsd).toBe(82);
  });

  it('VIZ-02 geography incidence = global 88 / brazil 33 / both 1', () => {
    const { counts, bothCount } = aggregateOrgGeographyIncidence(snapshot);
    expect(counts.global).toBe(88);
    expect(counts.brazil).toBe(33);
    expect(bothCount).toBe(1);
    expect(counts.global + counts.brazil).toBeGreaterThan(snapshot.organizations.length);
  });

  it('VIZ-03 activity dos 28 diretos = 13/4/11', () => {
    const result = aggregateDirectGsdActivityCounts(snapshot);
    expect(result.directTotal).toBe(28);
    expect(result.missingCount).toBe(0);
    expect(result.counts).toEqual({
      'confirmed-current': 13,
      'current-uncertain': 4,
      'historical-only': 11,
    });
  });

  it('VIZ-04 status corporativo dos 28 diretos = 8/9/9/2', () => {
    const result = aggregateDirectOrganizationStatusCounts(snapshot);
    expect(result.directTotal).toBe(28);
    expect(result.missingCount).toBe(0);
    expect(result.counts).toEqual({
      'private-startup': 8,
      'public-biotech': 9,
      'acquired-or-inactive': 9,
      'identity-unresolved': 2,
    });
  });

  it('Saventic: 1 org · 2 assessments · relation adjacent 1 · geo both', () => {
    const saventicId = 'org-gsd-br-002';
    const assessments = snapshot.relevanceAssessments.filter(
      (a) => a.organizationId === saventicId,
    );
    expect(assessments).toHaveLength(2);
    expect(new Set(assessments.map((a) => a.relationship))).toEqual(new Set(['adjacent-gsd']));
    expect(new Set(assessments.flatMap((a) => a.geographicScopes))).toEqual(
      new Set(['brazil', 'global']),
    );

    const relations = aggregateOrgRelationCounts(snapshot);
    // Saventic contributes only once to adjacent despite 2 assessments.
    expect(relations['adjacent-gsd']).toBe(81);

    const geo = aggregateOrgGeographyIncidence(snapshot);
    expect(geo.bothCount).toBe(1);
    expect(geo.counts.brazil).toBe(33);
    expect(geo.counts.global).toBe(88);
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
