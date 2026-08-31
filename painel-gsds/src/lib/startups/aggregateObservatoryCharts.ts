import {
  startupDirectGsdActivityValues,
  startupDirectOrganizationStatusValues,
  startupGeographyValues,
  startupRelationValues,
  type StartupDirectGsdActivity,
  type StartupDirectOrganizationStatus,
  type StartupGeography,
  type StartupRelation,
} from '../../data/startups/taxonomies';
import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';

export type RelationCounts = Record<StartupRelation, number>;

export type GeographyIncidence = {
  counts: Record<StartupGeography, number>;
  bothCount: number;
};

export type DirectActivityCounts = {
  counts: Record<StartupDirectGsdActivity, number>;
  directTotal: number;
  missingCount: number;
};

export type DirectOrganizationStatusCounts = {
  counts: Record<StartupDirectOrganizationStatus, number>;
  directTotal: number;
  missingCount: number;
};

function emptyRelationCounts(): RelationCounts {
  return Object.fromEntries(startupRelationValues.map((value) => [value, 0])) as RelationCounts;
}

function emptyGeographyCounts(): Record<StartupGeography, number> {
  return Object.fromEntries(startupGeographyValues.map((value) => [value, 0])) as Record<
    StartupGeography,
    number
  >;
}

function emptyActivityCounts(): Record<StartupDirectGsdActivity, number> {
  return Object.fromEntries(startupDirectGsdActivityValues.map((value) => [value, 0])) as Record<
    StartupDirectGsdActivity,
    number
  >;
}

function emptyStatusCounts(): Record<StartupDirectOrganizationStatus, number> {
  return Object.fromEntries(
    startupDirectOrganizationStatusValues.map((value) => [value, 0]),
  ) as Record<StartupDirectOrganizationStatus, number>;
}

/** VIZ-01: incidência de relation tags distintas por organização única. */
export function aggregateOrgRelationCounts(snapshot: StartupPublishedSnapshot): RelationCounts {
  const byOrg = new Map<string, Set<StartupRelation>>();

  for (const assessment of snapshot.relevanceAssessments) {
    const set = byOrg.get(assessment.organizationId) ?? new Set<StartupRelation>();
    set.add(assessment.relationship);
    byOrg.set(assessment.organizationId, set);
  }

  const counts = emptyRelationCounts();
  for (const org of snapshot.organizations) {
    const relations = byOrg.get(org.id);
    if (!relations) continue;
    for (const relation of relations) {
      counts[relation] += 1;
    }
  }

  return counts;
}

/** VIZ-02: incidência geográfica por organização; bothCount é caveat, não barra. */
export function aggregateOrgGeographyIncidence(
  snapshot: StartupPublishedSnapshot,
): GeographyIncidence {
  const byOrg = new Map<string, Set<StartupGeography>>();

  for (const assessment of snapshot.relevanceAssessments) {
    const set = byOrg.get(assessment.organizationId) ?? new Set<StartupGeography>();
    for (const geo of assessment.geographicScopes) {
      set.add(geo);
    }
    byOrg.set(assessment.organizationId, set);
  }

  const counts = emptyGeographyCounts();
  let bothCount = 0;

  for (const org of snapshot.organizations) {
    const geos = byOrg.get(org.id);
    if (!geos) continue;
    for (const geo of geos) {
      counts[geo] += 1;
    }
    if (geos.has('brazil') && geos.has('global')) {
      bothCount += 1;
    }
  }

  return { counts, bothCount };
}

function directAssessments(snapshot: StartupPublishedSnapshot) {
  return snapshot.relevanceAssessments.filter(
    (assessment) => assessment.relationship === 'direct-gsd',
  );
}

/** VIZ-03: currentGsdActivity somente em assessments direct-gsd. */
export function aggregateDirectGsdActivityCounts(
  snapshot: StartupPublishedSnapshot,
): DirectActivityCounts {
  const directs = directAssessments(snapshot);
  const counts = emptyActivityCounts();
  let missingCount = 0;

  for (const assessment of directs) {
    const value = assessment.directContext?.currentGsdActivity;
    if (!value) {
      missingCount += 1;
      continue;
    }
    counts[value] += 1;
  }

  return {
    counts,
    directTotal: directs.length,
    missingCount,
  };
}

/** VIZ-04: organizationStatus do directContext — não usa operationalStatus. */
export function aggregateDirectOrganizationStatusCounts(
  snapshot: StartupPublishedSnapshot,
): DirectOrganizationStatusCounts {
  const directs = directAssessments(snapshot);
  const counts = emptyStatusCounts();
  let missingCount = 0;

  for (const assessment of directs) {
    const value = assessment.directContext?.organizationStatus;
    if (!value) {
      missingCount += 1;
      continue;
    }
    counts[value] += 1;
  }

  return {
    counts,
    directTotal: directs.length,
    missingCount,
  };
}
