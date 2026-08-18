import { describe, expect, it } from 'vitest';
import {
  BRAZIL_INDIRECT_EDITORIAL_IDS,
  editorialIdToOrgId,
} from '../../data/startups/brazilIndirectLineage';
import { loadPublishedSnapshot, listPublishedSnapshotIds } from './loadPublishedSnapshot';
import { queryStartups } from './queryStartups';
import { computeStartupStats } from './startupStats';

describe('Iteration 5B brazil-indirect snapshot', () => {
  const snapshot = loadPublishedSnapshot();

  it('publishes exactly 33 organizations with unique ids and slugs', () => {
    expect(snapshot.id).toBe('snap-brazil-indirect-2026-08-14');
    expect(snapshot.schemaVersion).toBe('1.1.0');
    expect(snapshot.organizations).toHaveLength(33);
    expect(new Set(snapshot.organizations.map((o) => o.id)).size).toBe(33);
    expect(new Set(snapshot.organizations.map((o) => o.slug)).size).toBe(33);
  });

  it('maps editorial lineage GSD-BR-* → org-gsd-br-* without Kidopi', () => {
    expect(BRAZIL_INDIRECT_EDITORIAL_IDS).toHaveLength(33);
    const expectedOrgIds = BRAZIL_INDIRECT_EDITORIAL_IDS.map(editorialIdToOrgId);
    expect(snapshot.organizations.map((o) => o.id).sort()).toEqual([...expectedOrgIds].sort());
    expect(expectedOrgIds).not.toContain('org-gsd-br-024');
    expect(snapshot.organizations.some((o) => o.id === 'org-gsd-br-024')).toBe(false);
  });

  it('requires assessment and public source for every organization', () => {
    for (const org of snapshot.organizations) {
      const assessments = snapshot.relevanceAssessments.filter((a) => a.organizationId === org.id);
      expect(assessments.length).toBeGreaterThanOrEqual(1);
      const sourceIds = new Set(assessments.flatMap((a) => a.evidenceRefs.map((e) => e.sourceId)));
      expect(sourceIds.size).toBeGreaterThanOrEqual(1);
    }
  });

  it('enforces relation, geography and confidence distributions', () => {
    expect(snapshot.counts.adjacentGsd).toBe(22);
    expect(snapshot.counts.relevanceUnconfirmed).toBe(11);
    expect(snapshot.counts.directGsd).toBe(0);
    expect(snapshot.counts.ecosystemSupport).toBe(0);
    expect(snapshot.counts.brazil).toBe(33);
    expect(snapshot.counts.global).toBe(0);

    const conf = { high: 0, medium: 0, low: 0 };
    for (const assessment of snapshot.relevanceAssessments) {
      conf[assessment.confidence] += 1;
      expect(assessment.geographicScopes).toEqual(['brazil']);
      expect(['direct-gsd', 'ecosystem-support']).not.toContain(assessment.relationship);
    }
    expect(conf).toEqual({ high: 7, medium: 26, low: 0 });
  });

  it('does not publish products/programs in 5B', () => {
    expect(snapshot.productsOrPrograms).toEqual([]);
    expect(snapshot.counts.productsOrPrograms).toBe(0);
  });

  it('uses apparently-active operational status', () => {
    expect(snapshot.organizations.every((o) => o.operationalStatus === 'apparently-active')).toBe(
      true,
    );
  });

  it('supports search/filter against the real snapshot', () => {
    const mendelics = queryStartups(snapshot, { query: 'Mendelics' });
    expect(mendelics.length).toBeGreaterThanOrEqual(1);
    const adjacent = queryStartups(snapshot, { relations: ['adjacent-gsd'] });
    expect(adjacent).toHaveLength(22);
    const stats = computeStartupStats(snapshot, adjacent);
    expect(stats.filteredOrganizations).toBe(22);
  });

  it('keeps empty snapshot discoverable while current points to brazil-indirect', () => {
    expect(listPublishedSnapshotIds()).toEqual([
      'snap-brazil-indirect-2026-08-14',
      'snap-initial-empty-2026-08-14',
    ]);
  });
});
