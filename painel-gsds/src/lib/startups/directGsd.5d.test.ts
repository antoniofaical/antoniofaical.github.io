import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  DIRECT_GSD_EDITORIAL_IDS,
  directEditorialIdToOrgId,
} from '../../data/startups/directGsdLineage';
import {
  listPublishedSnapshotIds,
  loadCurrentSelector,
  loadPublishedSnapshot,
  loadPublishedSnapshotById,
  parseStartupPublishedSnapshot,
} from './loadPublishedSnapshot';
import { queryStartups } from './queryStartups';
import {
  startupDirectAssetRoleLabels,
  startupDirectGsdActivityLabels,
  startupOperationalStatusLabels,
} from '../../data/startups/taxonomies';
import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const snapshotsDir = path.resolve(__dirname, '../../data/startups/published/snapshots');

function sha256File(filePath: string): string {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

/** 5D.1 audit gates used by mutation matrix. */
function auditCumulativeDirectSnapshot(
  candidate: StartupPublishedSnapshot,
  previousIndirect: StartupPublishedSnapshot,
): string[] {
  const failures: string[] = [];
  if (candidate.publicSources.length !== 217) {
    failures.push(`publicSources=${candidate.publicSources.length}`);
  }
  if (candidate.counts.directGsd !== 28) failures.push('directGsd != 28');
  if (candidate.counts.global !== 88) failures.push('global != 88');
  if (candidate.publicSources.some((s) => s.id.startsWith('sps-gsd-dir-'))) {
    failures.push('fabricated sps-gsd-dir sources');
  }
  if (JSON.stringify(candidate.publicSources) !== JSON.stringify(previousIndirect.publicSources)) {
    failures.push('indirect sources drifted');
  }
  for (const assessment of candidate.relevanceAssessments.filter(
    (a) => a.relationship === 'direct-gsd',
  )) {
    if (assessment.evidenceRefs.length !== 0) {
      failures.push(`${assessment.id} evidenceRefs not empty`);
    }
    for (const evidence of assessment.evidenceRefs) {
      const source = candidate.publicSources.find((s) => s.id === evidence.sourceId);
      if (evidence.role === 'supports' && source?.sourceType === 'company-site') {
        failures.push(`${assessment.id} website used as supports`);
      }
    }
  }
  if (
    candidate.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-014')?.directContext
      ?.assetRole !== 'historical-owner'
  ) {
    failures.push('Maze role');
  }
  if (
    candidate.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-020')?.directContext
      ?.assetRole !== 'historical-owner'
  ) {
    failures.push('Valerion role');
  }
  if (
    candidate.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-026')?.directContext
      ?.assetRole !== 'historical-association-ownership-unverified'
  ) {
    failures.push('Kriya role');
  }
  for (const org of candidate.organizations.filter((o) => o.id.startsWith('org-gsd-dir-'))) {
    if (org.operationalStatus === 'acquired') failures.push(`${org.id} acquired overclaim`);
    if (org.operationalStatus === 'apparently-active') {
      failures.push(`${org.id} private overclaim`);
    }
  }
  if (startupDirectAssetRoleLabels.outlicensed === 'Licenciado') {
    failures.push('AUG label ambiguous');
  }
  if (!/terceiro/i.test(startupDirectAssetRoleLabels.outlicensed)) {
    failures.push('AUG label direction');
  }
  if (
    candidate.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-028')?.directContext
      ?.assetRole === 'owner'
  ) {
    failures.push('Parasail owner');
  }
  const coverageBlob = JSON.stringify(candidate.coverage);
  for (const banned of [
    'ResearchRun',
    'ChangeSet',
    'PublishedSnapshot',
    'CB Insights',
    'protocolVersion',
    'Iteração 5B',
  ]) {
    if (coverageBlob.includes(banned)) failures.push(`coverage has ${banned}`);
  }
  return failures;
}

describe('Iteration 5D/5D.1 ecosystem-cumulative-direct snapshot', () => {
  const snapshot = loadPublishedSnapshot();
  const previous = loadPublishedSnapshotById('snap-indirect-cumulative-2026-08-18');

  it('publishes cumulative counts with 28 direct assessments and 217 real sources', () => {
    expect(snapshot.id).toBe('snap-ecosystem-cumulative-direct-2026-08-24');
    expect(snapshot.previousSnapshotId).toBe('snap-indirect-cumulative-2026-08-18');
    expect(snapshot.protocolVersion).toBe('startup-public-cumulative-direct-v1');
    expect(snapshot.organizations).toHaveLength(120);
    expect(snapshot.relevanceAssessments).toHaveLength(121);
    expect(snapshot.publicSources).toHaveLength(217);
    expect(snapshot.productsOrPrograms).toEqual([]);
    expect(snapshot.counts).toEqual({
      organizations: 120,
      productsOrPrograms: 0,
      relevanceAssessments: 121,
      publicSources: 217,
      directGsd: 28,
      adjacentGsd: 82,
      ecosystemSupport: 0,
      relevanceUnconfirmed: 11,
      brazil: 33,
      global: 88,
    });
    expect(loadCurrentSelector().currentSnapshotId).toBe(
      'snap-ecosystem-cumulative-direct-2026-08-24',
    );
    expect(auditCumulativeDirectSnapshot(snapshot, previous)).toEqual([]);
  });

  it('maps exactly GSD-DIR-001–028 with empty evidenceRefs and no fabricated sources', () => {
    expect(DIRECT_GSD_EDITORIAL_IDS).toHaveLength(28);
    expect([...DIRECT_GSD_EDITORIAL_IDS]).toEqual(
      Array.from({ length: 28 }, (_, i) => `GSD-DIR-${String(i + 1).padStart(3, '0')}`),
    );
    const orgIds = DIRECT_GSD_EDITORIAL_IDS.map(directEditorialIdToOrgId);
    expect(new Set(orgIds).size).toBe(28);
    const directs = snapshot.relevanceAssessments.filter((a) => a.relationship === 'direct-gsd');
    expect(directs).toHaveLength(28);
    expect(directs.every((a) => a.geographicScopes.includes('global'))).toBe(true);
    expect(directs.every((a) => a.confidence === 'not-assigned')).toBe(true);
    expect(directs.every((a) => a.evidenceRefs.length === 0)).toBe(true);
    expect(directs.map((a) => a.organizationId).sort()).toEqual([...orgIds].sort());
    expect(snapshot.publicSources.every((s) => !s.id.startsWith('sps-gsd-dir-'))).toBe(true);
    expect(JSON.stringify(snapshot.publicSources)).toBe(JSON.stringify(previous.publicSources));
  });

  it('preserves institutional websites without treating them as GSD evidence', () => {
    const directOrgs = snapshot.organizations.filter((o) => o.id.startsWith('org-gsd-dir-'));
    expect(directOrgs.filter((o) => Boolean(o.website))).toHaveLength(20);
    const maze = snapshot.organizations.find((o) => o.id === 'org-gsd-dir-014')!;
    expect(maze.website).toBe('https://mazetx.com/');
    const mazeAssessment = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-014')!;
    expect(mazeAssessment.evidenceRefs).toEqual([]);
  });

  it('preserves the 92 indirect organizations and 93 prior assessments', () => {
    const prevOrgIds = new Set(previous.organizations.map((o) => o.id));
    const currOrgIds = new Set(snapshot.organizations.map((o) => o.id));
    expect(prevOrgIds.size).toBe(92);
    for (const id of prevOrgIds) expect(currOrgIds.has(id)).toBe(true);
    const prevAsmt = new Set(previous.relevanceAssessments.map((a) => a.id));
    const currAsmt = new Set(snapshot.relevanceAssessments.map((a) => a.id));
    expect(prevAsmt.size).toBe(93);
    for (const id of prevAsmt) expect(currAsmt.has(id)).toBe(true);
    for (const assessment of previous.relevanceAssessments) {
      const current = snapshot.relevanceAssessments.find((a) => a.id === assessment.id)!;
      expect(current.evidenceRefs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('keeps historical snapshots byte-identical and discoverable', () => {
    expect(sha256File(path.join(snapshotsDir, 'brazil-indirect-2026-08-14.json'))).toBe(
      '9abc630a91df0f4adbfaae8b1e1bb108fa5d06aa8a0bc654ada3c195e68192f6',
    );
    expect(sha256File(path.join(snapshotsDir, 'initial-empty.json'))).toBe(
      'dfd58ea625a49825c402e7f61bafd52f29bd48d62cb9bbf9a22a5031f79aea81',
    );
    expect(sha256File(path.join(snapshotsDir, 'indirect-cumulative-2026-08-18.json'))).toBe(
      'ef2a1131c6f2ed080947bf1bfb99b0609406e9547d9dc510ce3161ac543c1322',
    );
    expect(listPublishedSnapshotIds()).toEqual([
      'snap-brazil-indirect-2026-08-14',
      'snap-ecosystem-cumulative-direct-2026-08-24',
      'snap-indirect-cumulative-2026-08-18',
      'snap-initial-empty-2026-08-14',
    ]);
  });

  it('exposes all 28 directs in query filters including historical/uncertain', () => {
    expect(queryStartups(snapshot, { relations: ['direct-gsd'] })).toHaveLength(28);
    expect(queryStartups(snapshot, { geographies: ['global'] })).toHaveLength(88);
    expect(queryStartups(snapshot, { geographies: ['brazil'] })).toHaveLength(33);
    expect(queryStartups(snapshot, {})).toHaveLength(120);
  });

  it('maps operational status without overclaiming acquired or private activity', () => {
    const directs = snapshot.organizations.filter((o) => o.id.startsWith('org-gsd-dir-'));
    const byStatus = Object.fromEntries(
      ['private', 'public', 'acquired-or-inactive', 'identity-unresolved'].map((status) => [
        status,
        directs.filter((o) => o.operationalStatus === status).length,
      ]),
    );
    expect(byStatus).toEqual({
      private: 8,
      public: 9,
      'acquired-or-inactive': 9,
      'identity-unresolved': 2,
    });
    expect(directs.every((o) => o.operationalStatus !== 'acquired')).toBe(true);
    expect(directs.every((o) => o.operationalStatus !== 'apparently-active')).toBe(true);
    expect(startupOperationalStatusLabels['acquired-or-inactive']).toBe('Adquirida ou inativa');
    expect(startupOperationalStatusLabels.private).toBe('Privada');
    expect(startupOperationalStatusLabels['identity-unresolved']).toBe(
      'Identidade/status não resolvido',
    );
  });

  it('preserves sensitive semantics for Cometa, Actus, AskBio, Reneo, AUG, Parasail, GHF', () => {
    const byEditorial = Object.fromEntries(
      DIRECT_GSD_EDITORIAL_IDS.map((id) => [id, directEditorialIdToOrgId(id)]),
    );
    const cometa = snapshot.organizations.find((o) => o.id === byEditorial['GSD-DIR-004'])!;
    expect(cometa.website).toBeUndefined();
    expect(cometa.foundedYear).toBeUndefined();
    expect(cometa.headquarters).toBeUndefined();
    expect(cometa.preferredName).toMatch(/Cometa/);

    const actusOrg = snapshot.organizations.find((o) => o.id === byEditorial['GSD-DIR-016'])!;
    const actus = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-016')!;
    expect(actus.directContext?.currentGsdActivity).toBe('historical-only');
    expect(actus.directContext?.assetRole).toBe('acquired-entity');
    expect(actusOrg.operationalStatus).toBe('acquired-or-inactive');

    const askbioOrg = snapshot.organizations.find((o) => o.id === byEditorial['GSD-DIR-017'])!;
    const askbio = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-017')!;
    expect(askbioOrg.operationalStatus).toBe('acquired-or-inactive');
    expect(askbio.directContext?.currentGsdActivity).toBe('confirmed-current');

    const reneoOrg = snapshot.organizations.find((o) => o.id === byEditorial['GSD-DIR-025'])!;
    const reneo = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-025')!;
    expect(reneo.directContext?.currentGsdActivity).toBe('historical-only');
    expect(reneoOrg.foundedYear).toBe(2014);

    const aug = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-027')!;
    expect(aug.directContext?.assetRole).toBe('outlicensed');
    expect(aug.directContext?.currentGsdActivity).toBe('current-uncertain');
    expect(startupDirectAssetRoleLabels.outlicensed).toBe('Licenciado a terceiro');

    const parasail = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-028')!;
    expect(parasail.directContext?.assetRole).toBe('license-holder');
    expect(parasail.directContext?.currentGsdActivity).toBe('current-uncertain');

    const ghf = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-001')!;
    expect(ghf.directContext?.assetRole).toBe('owner');
    expect(snapshot.organizations.some((o) => /AdRes/i.test(o.preferredName))).toBe(false);
  });

  it('keeps Maze/Valerion as historical-owner and Kriya neutralized', () => {
    const maze = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-014')!;
    const valerion = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-020')!;
    const kriya = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-026')!;
    expect(maze.directContext?.assetRole).toBe('historical-owner');
    expect(valerion.directContext?.assetRole).toBe('historical-owner');
    expect(valerion.directContext?.currentGsdActivity).toBe('historical-only');
    expect(kriya.directContext?.assetRole).toBe('historical-association-ownership-unverified');
    expect(startupDirectAssetRoleLabels['historical-owner']).toBe('Titular histórico do ativo');
  });

  it('never implies Duke patent ownership for Kriya and uses neutral role language', () => {
    const kriyaOrg = snapshot.organizations.find((o) => o.id === 'org-gsd-dir-026')!;
    const kriya = snapshot.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-026')!;
    expect(kriyaOrg.preferredName).toMatch(/Kriya/);
    expect(kriya.directContext?.currentGsdActivity).toBe('current-uncertain');
    expect(kriya.directContext?.assetRole).toBe('historical-association-ownership-unverified');
    const label = startupDirectAssetRoleLabels[kriya.directContext!.assetRole!];
    expect(label).toMatch(/titularidade não estabelecida/i);
    const publicBlob = JSON.stringify({
      name: kriyaOrg.preferredName,
      description: kriyaOrg.description,
      rationale: kriya.rationale,
      indication: kriya.directContext?.indication,
      assetOrProgram: kriya.directContext?.assetOrProgram,
      modality: kriya.directContext?.modality,
      developmentStage: kriya.directContext?.developmentStage,
      activityLabel: startupDirectGsdActivityLabels[kriya.directContext!.currentGsdActivity!],
      roleLabel: label,
    });
    for (const banned of [
      'HISTORICAL_OWNER',
      'historical owner',
      'historical-owner',
      'proprietária histórica',
      'titular histórica',
      'titular histórico do ativo',
      'dona das patentes',
      'patent owner',
    ]) {
      expect(publicBlob.toLowerCase()).not.toContain(banned.toLowerCase());
    }
    expect(label.toLowerCase()).not.toMatch(/\bowner\b/);
    expect(label.toLowerCase()).not.toContain('proprietár');
  });

  it('does not expose pipeline/editorial tokens in public projection fields', () => {
    const directs = snapshot.organizations.filter((o) => o.id.startsWith('org-gsd-dir-'));
    const assessments = snapshot.relevanceAssessments.filter((a) =>
      a.id.startsWith('rel-gsd-dir-'),
    );
    const blob = JSON.stringify({
      coverage: snapshot.coverage,
      orgs: directs.map((o) => ({
        preferredName: o.preferredName,
        description: o.description,
      })),
      assessments: assessments.map((a) => ({
        rationale: a.rationale,
        directContext: a.directContext,
      })),
    });
    for (const banned of [
      'GSD-DIR-',
      'ENR-SRC-',
      'SCOUTING_APPROVED',
      'CB_GAP_ENRICHMENT_APPROVED',
      'DIRECT_ACTIVE',
      'DIRECT_STATUS_UNCERTAIN',
      'DIRECT_ACQUIRED_OR_INACTIVE',
      'HISTORICAL_OWNER',
      'evidence_id',
      'source_layer',
      'GSD_DIRECT_DASHBOARD_MINIMAL.csv',
      'ResearchRun',
      'ChangeSet',
      'PublishedSnapshot',
      'CB Insights',
      'protocolVersion',
      'Iteração 5B',
    ]) {
      expect(blob).not.toContain(banned);
    }
  });

  it('rejects audit false-positive mutations', () => {
    const base = structuredClone(snapshot) as StartupPublishedSnapshot;
    expect(auditCumulativeDirectSnapshot(base, previous)).toEqual([]);

    const synthetic = structuredClone(base);
    synthetic.publicSources.push({
      id: 'sps-gsd-dir-999-01',
      title: 'Registro público curado sem URL oficial verificada',
      sourceType: 'other',
      accessedAt: '2026-08-24',
      availability: 'restricted-summary-only',
    });
    synthetic.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-001')!.evidenceRefs = [
      { sourceId: 'sps-gsd-dir-999-01', role: 'supports' },
    ];
    synthetic.counts.publicSources = synthetic.publicSources.length;
    expect(auditCumulativeDirectSnapshot(synthetic, previous).join(' ')).toMatch(
      /fabricated|evidenceRefs/,
    );

    const mazeSupports = structuredClone(base);
    mazeSupports.publicSources = [
      ...mazeSupports.publicSources,
      {
        id: 'sps-gsd-dir-014-01',
        title: 'Fonte pública (mazetx.com)',
        sourceType: 'company-site',
        url: 'https://mazetx.com/',
        accessedAt: '2026-08-24',
        availability: 'public',
        publisher: 'Maze Therapeutics',
      },
    ];
    mazeSupports.relevanceAssessments.find((a) => a.id === 'rel-gsd-dir-014')!.evidenceRefs = [
      { sourceId: 'sps-gsd-dir-014-01', role: 'supports' },
    ];
    mazeSupports.counts.publicSources = mazeSupports.publicSources.length;
    expect(auditCumulativeDirectSnapshot(mazeSupports, previous).join(' ')).toMatch(
      /website used as supports|fabricated|evidenceRefs/,
    );

    const indirectNoEvidence = structuredClone(base);
    indirectNoEvidence.relevanceAssessments.find((a) => a.id === 'rel-gsd-br-001')!.evidenceRefs =
      [];
    expect(() => parseStartupPublishedSnapshot(indirectNoEvidence)).toThrow(/evidenceRef/i);

    expect(() => parseStartupPublishedSnapshot(structuredClone(base))).not.toThrow();
    expect(auditCumulativeDirectSnapshot(structuredClone(base), previous)).toEqual([]);

    const acquired = structuredClone(base);
    acquired.organizations.find((o) => o.id === 'org-gsd-dir-017')!.operationalStatus = 'acquired';
    expect(auditCumulativeDirectSnapshot(acquired, previous).join(' ')).toMatch(
      /acquired overclaim/,
    );

    const privateActive = structuredClone(base);
    privateActive.organizations.find((o) => o.id === 'org-gsd-dir-027')!.operationalStatus =
      'apparently-active';
    expect(auditCumulativeDirectSnapshot(privateActive, previous).join(' ')).toMatch(
      /private overclaim/,
    );

    const mazeNeutral = structuredClone(base);
    mazeNeutral.relevanceAssessments.find(
      (a) => a.id === 'rel-gsd-dir-014',
    )!.directContext!.assetRole = 'historical-association-ownership-unverified';
    expect(auditCumulativeDirectSnapshot(mazeNeutral, previous).join(' ')).toMatch(/Maze role/);

    const valerionNeutral = structuredClone(base);
    valerionNeutral.relevanceAssessments.find(
      (a) => a.id === 'rel-gsd-dir-020',
    )!.directContext!.assetRole = 'historical-association-ownership-unverified';
    expect(auditCumulativeDirectSnapshot(valerionNeutral, previous).join(' ')).toMatch(
      /Valerion role/,
    );

    const kriyaOwner = structuredClone(base);
    kriyaOwner.relevanceAssessments.find(
      (a) => a.id === 'rel-gsd-dir-026',
    )!.directContext!.assetRole = 'historical-owner';
    expect(auditCumulativeDirectSnapshot(kriyaOwner, previous).join(' ')).toMatch(/Kriya role/);

    const parasailOwner = structuredClone(base);
    parasailOwner.relevanceAssessments.find(
      (a) => a.id === 'rel-gsd-dir-028',
    )!.directContext!.assetRole = 'owner';
    expect(auditCumulativeDirectSnapshot(parasailOwner, previous).join(' ')).toMatch(
      /Parasail owner/,
    );

    const coverageLeak = structuredClone(base);
    coverageLeak.coverage.summary += ' ResearchRun PublishedSnapshot';
    expect(auditCumulativeDirectSnapshot(coverageLeak, previous).join(' ')).toMatch(
      /ResearchRun|PublishedSnapshot/,
    );

    const globalWrong = structuredClone(base);
    globalWrong.counts.global = 87;
    expect(auditCumulativeDirectSnapshot(globalWrong, previous).join(' ')).toMatch(/global/);

    const directWrong = structuredClone(base);
    directWrong.counts.directGsd = 27;
    expect(auditCumulativeDirectSnapshot(directWrong, previous).join(' ')).toMatch(/directGsd/);
  });
});
