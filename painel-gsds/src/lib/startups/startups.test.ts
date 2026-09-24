import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseStartupPublishedSnapshot } from './startupApi';
import { queryStartups, getStartupBySlug, type StartupListItem } from './queryStartups';
import { computeStartupStats } from './startupStats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(__dirname, '../../../tests/fixtures/startups');

function readFixture(name: string): unknown {
  return JSON.parse(readFileSync(path.join(fixturesDir, name), 'utf8'));
}

describe('startup published snapshot schema', () => {
  it('accepts the synthetic valid fixture', () => {
    const raw = readFixture('synthetic-valid-snapshot.json');
    const parsed = parseStartupPublishedSnapshot(raw);
    expect(parsed.organizations).toHaveLength(2);
    expect(parsed.id).toContain('synth');
  });

  it('rejects duplicate organization ids', () => {
    const raw = readFixture('invalid-duplicate-ids.json');
    expect(() => parseStartupPublishedSnapshot(raw)).toThrow(/Duplicate organization id/i);
  });

  it('rejects orphan organization references', () => {
    const raw = readFixture('invalid-orphan-refs.json');
    expect(() => parseStartupPublishedSnapshot(raw)).toThrow(/missing organization/i);
  });

  it('rejects invalid relationship enum', () => {
    const raw = readFixture('synthetic-valid-snapshot.json') as {
      relevanceAssessments: Array<{ relationship: string }>;
    };
    raw.relevanceAssessments[0].relationship = 'not-a-real-relation';
    expect(() => parseStartupPublishedSnapshot(raw)).toThrow();
  });

  it('rejects assessment without rationale', () => {
    const raw = structuredClone(readFixture('synthetic-valid-snapshot.json')) as {
      relevanceAssessments: Array<{
        rationale: string;
        evidenceRefs: unknown[];
        relationship: string;
      }>;
    };
    raw.relevanceAssessments[0].rationale = 'too short';
    expect(() => parseStartupPublishedSnapshot(raw)).toThrow();
  });

  it('rejects indirect assessment without evidence but allows empty evidence for direct-gsd', () => {
    const indirect = structuredClone(readFixture('synthetic-valid-snapshot.json')) as {
      relevanceAssessments: Array<{ evidenceRefs: unknown[]; relationship: string }>;
    };
    const adjacent = indirect.relevanceAssessments.find((a) => a.relationship === 'adjacent-gsd')!;
    adjacent.evidenceRefs = [];
    expect(() => parseStartupPublishedSnapshot(indirect)).toThrow(/evidenceRef/i);

    const direct = structuredClone(readFixture('synthetic-valid-snapshot.json')) as {
      relevanceAssessments: Array<{
        evidenceRefs: unknown[];
        relationship: string;
        organizationId: string;
      }>;
      productsOrPrograms: Array<{ organizationId: string; evidenceRefs: unknown[] }>;
    };
    const directAssessment = direct.relevanceAssessments.find(
      (a) => a.relationship === 'direct-gsd',
    )!;
    directAssessment.evidenceRefs = [];
    // Product evidence may still link sources; empty direct evidenceRefs alone must pass.
    expect(
      direct.productsOrPrograms.some((p) => p.organizationId === directAssessment.organizationId),
    ).toBe(true);
    expect(() => parseStartupPublishedSnapshot(direct)).not.toThrow();
  });
});

describe('startup query and stats', () => {
  const snapshot = parseStartupPublishedSnapshot(readFixture('synthetic-valid-snapshot.json'));

  it('normalizes search across name, alias and description', () => {
    const byAlias = queryStartups(snapshot, { query: 'HGL Synthetic' });
    expect(byAlias).toHaveLength(1);
    expect(byAlias[0].organization.slug).toBe('synth-helix-glyph-labs');

    const byCaseInsensitive = queryStartups(snapshot, { query: 'HELIXGLYPH' });
    expect(byCaseInsensitive).toHaveLength(1);
  });

  it('filters by relation and geography in combination', () => {
    const filtered = queryStartups(snapshot, {
      relations: ['adjacent-gsd'],
      geographies: ['brazil'],
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].organization.slug).toBe('synth-amazon-care-bridge');
  });

  it('sorts deterministically by name', () => {
    const asc = queryStartups(snapshot, { sort: 'name-asc' }).map(
      (item: StartupListItem) => item.organization.slug,
    );
    const desc = queryStartups(snapshot, { sort: 'name-desc' }).map(
      (item: StartupListItem) => item.organization.slug,
    );
    expect(asc).toEqual(['synth-amazon-care-bridge', 'synth-helix-glyph-labs']);
    expect(desc).toEqual(['synth-helix-glyph-labs', 'synth-amazon-care-bridge']);
  });

  it('derives stats from the filtered set', () => {
    const filtered = queryStartups(snapshot, { relations: ['direct-gsd'] });
    const stats = computeStartupStats(snapshot, filtered);
    expect(stats.scope).toBe('filtered');
    expect(stats.filteredOrganizations).toBe(1);
    expect(stats.totalOrganizations).toBe(2);
    expect(stats.byRelation['direct-gsd']).toBe(1);
  });

  it('retrieves by slug', () => {
    const item = getStartupBySlug(snapshot, 'synth-helix-glyph-labs');
    expect(item?.organization.preferredName).toMatch(/SYNTHETIC FIXTURE/);
  });
});
