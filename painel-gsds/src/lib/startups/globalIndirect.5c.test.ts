import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  GLOBAL_INDIRECT_MAIN_EDITORIAL_IDS,
  GLOBAL_INDIRECT_NON_PUBLIC_EDITORIAL_IDS,
  globalEditorialIdToOrgId,
} from '../../data/startups/globalIndirectLineage';
import {
  listPublishedSnapshotIds,
  loadCurrentSelector,
  loadPublishedSnapshot,
  loadPublishedSnapshotById,
} from './loadPublishedSnapshot';
import { queryStartups } from './queryStartups';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const snapshotsDir = path.resolve(__dirname, '../../data/startups/published/snapshots');

function sha256File(filePath: string): string {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

function canonicalizeUrl(raw: string): string {
  const url = new URL(raw);
  let host = url.hostname.toLowerCase();
  if (host.startsWith('www.')) host = host.slice(4);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  return `${url.protocol}//${host}${pathname}${url.search}`;
}

describe('Iteration 5C indirect-cumulative snapshot', () => {
  const snapshot = loadPublishedSnapshot();
  const brazil = loadPublishedSnapshotById('snap-brazil-indirect-2026-08-14');

  it('publishes cumulative counts and selector', () => {
    expect(snapshot.id).toBe('snap-indirect-cumulative-2026-08-18');
    expect(snapshot.schemaVersion).toBe('1.1.0');
    expect(snapshot.protocolVersion).toBe('startup-public-cumulative-v1');
    expect(snapshot.previousSnapshotId).toBe('snap-brazil-indirect-2026-08-14');
    expect(snapshot.organizations).toHaveLength(92);
    expect(snapshot.relevanceAssessments).toHaveLength(93);
    expect(snapshot.publicSources).toHaveLength(217);
    expect(snapshot.productsOrPrograms).toEqual([]);
    expect(snapshot.counts).toEqual({
      organizations: 92,
      productsOrPrograms: 0,
      relevanceAssessments: 93,
      publicSources: 217,
      directGsd: 0,
      adjacentGsd: 82,
      ecosystemSupport: 0,
      relevanceUnconfirmed: 11,
      brazil: 33,
      global: 60,
    });
    expect(snapshot.coverage.status).toBe('partial');

    const selector = loadCurrentSelector();
    expect(selector.currentSnapshotId).toBe('snap-indirect-cumulative-2026-08-18');
    expect(selector.selectedAt).toBe(snapshot.generatedAt);
    expect(selector.selectedAt).toBe(snapshot.publishedAt);
  });

  it('maps Global main lineage with Saventic dedupe', () => {
    expect(GLOBAL_INDIRECT_MAIN_EDITORIAL_IDS).toHaveLength(60);
    expect(globalEditorialIdToOrgId('GSDI-002')).toBe('org-gsd-br-002');
    expect(globalEditorialIdToOrgId('GSDI-001')).toBe('org-gsdi-001');
    expect(globalEditorialIdToOrgId('GSDI-072')).toBe('org-gsdi-072');

    const mappedOrgIds = GLOBAL_INDIRECT_MAIN_EDITORIAL_IDS.map(globalEditorialIdToOrgId);
    expect(new Set(mappedOrgIds).size).toBe(60);
    expect(mappedOrgIds.filter((id) => id === 'org-gsd-br-002')).toEqual(['org-gsd-br-002']);
    expect(mappedOrgIds).not.toContain('org-gsdi-002');
    expect(mappedOrgIds.filter((id) => id.startsWith('org-gsdi-'))).toHaveLength(59);

    const globalAssessments = snapshot.relevanceAssessments.filter((a) =>
      a.id.startsWith('rel-gsdi-'),
    );
    expect(globalAssessments).toHaveLength(60);
    expect(globalAssessments.every((a) => a.relationship === 'adjacent-gsd')).toBe(true);
    expect(globalAssessments.every((a) => a.geographicScopes.length === 1)).toBe(true);
    expect(globalAssessments.every((a) => a.geographicScopes[0] === 'global')).toBe(true);

    const conf = { high: 0, medium: 0, low: 0 };
    for (const assessment of globalAssessments) {
      conf[assessment.confidence] += 1;
    }
    expect(conf).toEqual({ high: 46, medium: 14, low: 0 });
  });

  it('keeps manual/excluded/withdrawn out of the public projection', () => {
    expect(GLOBAL_INDIRECT_NON_PUBLIC_EDITORIAL_IDS).toHaveLength(12);
    const orgIds = new Set(snapshot.organizations.map((o) => o.id));
    const assessmentIds = new Set(snapshot.relevanceAssessments.map((a) => a.id));
    for (const editorialId of GLOBAL_INDIRECT_NON_PUBLIC_EDITORIAL_IDS) {
      const nnn = editorialId.slice('GSDI-'.length);
      expect(orgIds.has(`org-gsdi-${nnn}`)).toBe(false);
      expect(assessmentIds.has(`rel-gsdi-${nnn}`)).toBe(false);
      expect(GLOBAL_INDIRECT_MAIN_EDITORIAL_IDS).not.toContain(editorialId);
    }
  });

  it('deduplicates Saventic Health as one org with Brazil + Global assessments', () => {
    const named = snapshot.organizations.filter((o) => o.preferredName === 'Saventic Health');
    expect(named).toHaveLength(1);
    expect(named[0].id).toBe('org-gsd-br-002');
    expect(snapshot.organizations.some((o) => o.id === 'org-gsdi-002')).toBe(false);

    const assessments = snapshot.relevanceAssessments.filter(
      (a) => a.organizationId === 'org-gsd-br-002',
    );
    expect(assessments.map((a) => a.id).sort()).toEqual(['rel-gsd-br-002', 'rel-gsdi-002']);
    expect(assessments.find((a) => a.id === 'rel-gsd-br-002')?.geographicScopes).toEqual([
      'brazil',
    ]);
    expect(assessments.find((a) => a.id === 'rel-gsdi-002')?.geographicScopes).toEqual(['global']);

    const brazilOrg = brazil.organizations.find((o) => o.id === 'org-gsd-br-002');
    expect(brazilOrg).toBeDefined();
    expect(named[0]).toEqual(brazilOrg);

    const item = queryStartups(snapshot, { query: 'Saventic' })[0];
    expect(item.organization.id).toBe('org-gsd-br-002');
    expect([...item.geographies].sort()).toEqual(['brazil', 'global']);
  });

  it('keeps ThinkGenetic without inventing a website and retains CheckRare evidence', () => {
    const org = snapshot.organizations.find((o) => o.id === 'org-gsdi-003');
    expect(org).toBeDefined();
    expect(org?.website).toBeUndefined();
    expect(org?.preferredName).toMatch(/ThinkGenetic/i);

    const assessment = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsdi-003');
    expect(assessment).toBeDefined();
    const sourceIds = new Set(assessment!.evidenceRefs.map((e) => e.sourceId));
    const checkRare = snapshot.publicSources.filter(
      (s) => typeof s.url === 'string' && /checkrare/i.test(s.url),
    );
    expect(checkRare.length).toBeGreaterThanOrEqual(1);
    expect(checkRare.some((s) => sourceIds.has(s.id))).toBe(true);
    expect(checkRare.every((s) => s.sourceType === 'other')).toBe(true);
  });

  it('publishes 217 unique sources with Saventic reuse and Mirae www collapse', () => {
    expect(new Set(snapshot.publicSources.map((s) => s.id)).size).toBe(217);
    const urls = snapshot.publicSources
      .map((s) => s.url)
      .filter((url): url is string => Boolean(url));
    expect(urls).toHaveLength(217);
    const canons = urls.map((url) => canonicalizeUrl(url));
    expect(new Set(canons).size).toBe(217);

    const saventicHome = snapshot.publicSources.find(
      (s) => typeof s.url === 'string' && canonicalizeUrl(s.url) === 'https://saventic.com/',
    );
    expect(saventicHome?.id).toBe('sps-gsd-br-002-02');
    expect(snapshot.publicSources.some((s) => s.id === 'sps-gsdi-002-01')).toBe(false);

    const miraeHomes = snapshot.publicSources.filter(
      (s) => typeof s.url === 'string' && canonicalizeUrl(s.url) === 'https://miraehealth.com/',
    );
    expect(miraeHomes).toHaveLength(1);

    for (const source of snapshot.publicSources) {
      if (source.publisher !== undefined) {
        expect(source.sourceType).toBe('company-site');
      }
      if (source.sourceType === 'company-site') {
        expect(source.publisher).toBeTruthy();
      }
    }
  });

  it('preserves historical snapshots byte-for-byte and discovers all three ids', () => {
    expect(sha256File(path.join(snapshotsDir, 'brazil-indirect-2026-08-14.json'))).toBe(
      '9abc630a91df0f4adbfaae8b1e1bb108fa5d06aa8a0bc654ada3c195e68192f6',
    );
    expect(sha256File(path.join(snapshotsDir, 'initial-empty.json'))).toBe(
      'dfd58ea625a49825c402e7f61bafd52f29bd48d62cb9bbf9a22a5031f79aea81',
    );
    expect(listPublishedSnapshotIds()).toEqual([
      'snap-brazil-indirect-2026-08-14',
      'snap-indirect-cumulative-2026-08-18',
      'snap-initial-empty-2026-08-14',
    ]);
  });

  it('supports organization-level query facets and search', () => {
    expect(queryStartups(snapshot, {})).toHaveLength(92);
    expect(queryStartups(snapshot, { geographies: ['global'] })).toHaveLength(60);
    expect(queryStartups(snapshot, { geographies: ['brazil'] })).toHaveLength(33);
    expect(queryStartups(snapshot, { relations: ['adjacent-gsd'] })).toHaveLength(81);
    expect(queryStartups(snapshot, { relations: ['relevance-unconfirmed'] })).toHaveLength(11);

    expect(queryStartups(snapshot, { query: 'ThinkGenetic' })).toHaveLength(1);
    const mendelics = queryStartups(snapshot, { query: 'Abracadabra' });
    expect(mendelics).toHaveLength(1);
    expect(mendelics[0].organization.preferredName).toMatch(/Mendelics/i);

    expect(queryStartups(snapshot, { query: 'GSDI-017' })).toHaveLength(0);
    expect(queryStartups(snapshot, { query: 'org-gsdi-017' })).toHaveLength(0);
  });
});
