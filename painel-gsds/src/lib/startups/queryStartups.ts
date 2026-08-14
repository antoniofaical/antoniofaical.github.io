import type {
  PublishedGSDRelevanceAssessment,
  PublishedOrganization,
  PublishedProductOrProgram,
  StartupPublishedSnapshot,
  StartupPublicSource,
} from '../../schemas/startups/publishedSnapshot';
import type {
  StartupConfidence,
  StartupGeography,
  StartupOperationalStatus,
  StartupRelation,
} from '../../data/startups/taxonomies';

export type StartupListItem = {
  organization: PublishedOrganization;
  assessments: PublishedGSDRelevanceAssessment[];
  products: PublishedProductOrProgram[];
  sources: StartupPublicSource[];
  relations: StartupRelation[];
  geographies: StartupGeography[];
  confidences: StartupConfidence[];
  lastReviewedAt: string;
};

export type StartupQueryInput = {
  query?: string;
  relations?: StartupRelation[];
  geographies?: StartupGeography[];
  gsdRefs?: string[];
  clinicalNeedRefs?: string[];
  socioeconomicNeedRefs?: string[];
  confidences?: StartupConfidence[];
  operationalStatuses?: StartupOperationalStatus[];
  sort?: 'name-asc' | 'name-desc' | 'reviewed-desc' | 'reviewed-asc';
};

function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

export function buildStartupList(snapshot: StartupPublishedSnapshot): StartupListItem[] {
  const sourcesById = new Map(snapshot.publicSources.map((source) => [source.id, source]));
  return snapshot.organizations.map((organization) => {
    const assessments = snapshot.relevanceAssessments.filter(
      (item) => item.organizationId === organization.id,
    );
    const products = snapshot.productsOrPrograms.filter(
      (item) => item.organizationId === organization.id,
    );
    const sourceIds = new Set<string>();
    for (const assessment of assessments) {
      for (const evidence of assessment.evidenceRefs) sourceIds.add(evidence.sourceId);
    }
    for (const product of products) {
      for (const evidence of product.evidenceRefs) sourceIds.add(evidence.sourceId);
    }
    const sources = [...sourceIds]
      .map((id) => sourcesById.get(id))
      .filter((item): item is StartupPublicSource => Boolean(item));

    const relations = [...new Set(assessments.map((item) => item.relationship))];
    const geographies = [
      ...new Set(assessments.flatMap((item) => item.geographicScopes)),
    ] as StartupGeography[];
    const confidences = [...new Set(assessments.map((item) => item.confidence))];
    const lastReviewedAt = [organization.lastReviewedAt, ...assessments.map((a) => a.assessedAt)]
      .sort()
      .at(-1)!;

    return {
      organization,
      assessments,
      products,
      sources,
      relations,
      geographies,
      confidences,
      lastReviewedAt,
    };
  });
}

export function queryStartups(
  snapshot: StartupPublishedSnapshot,
  input: StartupQueryInput = {},
): StartupListItem[] {
  const {
    query = '',
    relations = [],
    geographies = [],
    gsdRefs = [],
    clinicalNeedRefs = [],
    socioeconomicNeedRefs = [],
    confidences = [],
    operationalStatuses = [],
    sort = 'name-asc',
  } = input;

  const needle = normalize(query);
  let items = buildStartupList(snapshot);

  if (needle) {
    items = items.filter((item) => {
      const haystack = normalize(
        [
          item.organization.preferredName,
          ...item.organization.aliases,
          item.organization.description,
          ...item.products.map((product) => `${product.name} ${product.modality}`),
          ...item.assessments.map((assessment) => assessment.rationale),
        ].join(' '),
      );
      return haystack.includes(needle);
    });
  }

  if (relations.length > 0) {
    items = items.filter((item) => relations.some((value) => item.relations.includes(value)));
  }

  if (geographies.length > 0) {
    items = items.filter((item) => geographies.some((value) => item.geographies.includes(value)));
  }

  if (gsdRefs.length > 0) {
    items = items.filter((item) =>
      item.assessments.some((assessment) =>
        gsdRefs.some((ref) => assessment.gsdRefs.includes(ref)),
      ),
    );
  }

  if (clinicalNeedRefs.length > 0) {
    items = items.filter((item) =>
      item.assessments.some((assessment) =>
        clinicalNeedRefs.some((ref) => assessment.clinicalNeedRefs.includes(ref)),
      ),
    );
  }

  if (socioeconomicNeedRefs.length > 0) {
    items = items.filter((item) =>
      item.assessments.some((assessment) =>
        socioeconomicNeedRefs.some((ref) => assessment.socioeconomicNeedRefs.includes(ref)),
      ),
    );
  }

  if (confidences.length > 0) {
    items = items.filter((item) => confidences.some((value) => item.confidences.includes(value)));
  }

  if (operationalStatuses.length > 0) {
    items = items.filter((item) =>
      operationalStatuses.includes(item.organization.operationalStatus),
    );
  }

  const sorted = [...items].sort((a, b) => {
    if (sort === 'name-asc' || sort === 'name-desc') {
      const cmp = a.organization.preferredName.localeCompare(b.organization.preferredName, 'pt');
      return sort === 'name-asc' ? cmp : -cmp;
    }
    const cmp = a.lastReviewedAt.localeCompare(b.lastReviewedAt);
    return sort === 'reviewed-asc' ? cmp : -cmp;
  });

  return sorted;
}

export function getStartupBySlug(
  snapshot: StartupPublishedSnapshot,
  slug: string,
): StartupListItem | undefined {
  return buildStartupList(snapshot).find((item) => item.organization.slug === slug);
}

export function getStartupById(
  snapshot: StartupPublishedSnapshot,
  id: string,
): StartupListItem | undefined {
  return buildStartupList(snapshot).find((item) => item.organization.id === id);
}
