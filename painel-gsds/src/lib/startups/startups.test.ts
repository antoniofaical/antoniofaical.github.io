import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  buildPublishedSnapshotRegistry,
  listPublishedSnapshotIds,
  loadPublishedSnapshot,
  loadPublishedSnapshotById,
  parseStartupPublishedSnapshot,
} from './loadPublishedSnapshot';
import { queryStartups, getStartupBySlug, type StartupListItem } from './queryStartups';
import { computeStartupStats } from './startupStats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(__dirname, '../../../tests/fixtures/startups');
const publishedSnapshotsDir = path.resolve(__dirname, '../../data/startups/published/snapshots');

function readFixture(name: string): unknown {
  return JSON.parse(readFileSync(path.join(fixturesDir, name), 'utf8'));
}

function idsFromPublishedSnapshotFiles(): string[] {
  return readdirSync(publishedSnapshotsDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      const raw = JSON.parse(readFileSync(path.join(publishedSnapshotsDir, name), 'utf8')) as {
        id: string;
      };
      return raw.id;
    })
    .sort();
}

describe('startup published snapshot schema', () => {
  it('accepts the empty production snapshot artifact', () => {
    const empty = parseStartupPublishedSnapshot(
      JSON.parse(readFileSync(path.join(publishedSnapshotsDir, 'initial-empty.json'), 'utf8')),
    );
    expect(empty.organizations).toHaveLength(0);
    expect(empty.coverage.status).toBe('not-yet-populated');
  });

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

  it('rejects assessment without rationale/evidence', () => {
    const raw = structuredClone(readFixture('synthetic-valid-snapshot.json')) as {
      relevanceAssessments: Array<{ rationale: string; evidenceRefs: unknown[] }>;
    };
    raw.relevanceAssessments[0].rationale = 'too short';
    raw.relevanceAssessments[0].evidenceRefs = [];
    expect(() => parseStartupPublishedSnapshot(raw)).toThrow();
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

describe('production loader auto-discovery', () => {
  it('registers every published snapshot JSON discovered at build time by id', () => {
    const fromDisk = idsFromPublishedSnapshotFiles();
    const fromRegistry = listPublishedSnapshotIds();
    expect(fromDisk.length).toBeGreaterThan(0);
    expect(fromRegistry).toEqual(fromDisk);
  });

  it('resolves the current selector without a manual per-id registry entry', () => {
    const production = loadPublishedSnapshot();
    expect(production.id).toBe('snap-brazil-indirect-2026-08-14');
    expect(listPublishedSnapshotIds()).toContain(production.id);
    expect(listPublishedSnapshotIds()).toContain('snap-initial-empty-2026-08-14');
    expect(production.organizations).toHaveLength(33);
  });

  it('fails clearly when the selector points to a missing snapshot id', () => {
    expect(() => loadPublishedSnapshotById('snap-does-not-exist')).toThrow(
      /not registered|Available/i,
    );
  });

  it('rejects duplicate snapshot ids when constructing the registry', () => {
    const sample = parseStartupPublishedSnapshot(
      JSON.parse(readFileSync(path.join(publishedSnapshotsDir, 'initial-empty.json'), 'utf8')),
    );
    expect(() =>
      buildPublishedSnapshotRegistry({
        'virtual://a.json': sample,
        'virtual://b.json': { ...sample },
      }),
    ).toThrow(/Duplicate published snapshot id/i);
  });

  it('never includes fixture ids or synthetic markers in the production registry', () => {
    const ids = listPublishedSnapshotIds();
    expect(ids.some((id: string) => /synth|fixture/i.test(id))).toBe(false);

    const production = loadPublishedSnapshot();
    const blob = JSON.stringify(production);
    expect(blob).not.toMatch(/HelixGlyph Labs \(SYNTHETIC FIXTURE\)/);
    expect(blob).not.toMatch(/Amazon Care Bridge \(SYNTHETIC FIXTURE\)/);
    expect(blob).not.toMatch(/tests\/fixtures/);
  });

  it('discovers an additional published module without editing the loader code', () => {
    const empty = parseStartupPublishedSnapshot(
      JSON.parse(readFileSync(path.join(publishedSnapshotsDir, 'initial-empty.json'), 'utf8')),
    );
    const extra = {
      ...empty,
      id: 'snap-auto-discovery-proof-extra',
      coverage: {
        ...empty.coverage,
        status: 'limited' as const,
        summary: 'Proof-only virtual module for auto-discovery unit test.',
      },
    };
    const registry = buildPublishedSnapshotRegistry({
      'virtual://initial-empty.json': empty,
      'virtual://extra.json': extra,
    });
    expect(Object.keys(registry).sort()).toEqual(
      ['snap-auto-discovery-proof-extra', empty.id].sort(),
    );
  });
});
