import { z } from 'zod';
import { startupCoverageStatusValues } from '../../data/startups/taxonomies';
import { publishedOrganizationSchema } from './publishedOrganization';
import {
  publishedGSDRelevanceAssessmentSchema,
  publishedProductOrProgramSchema,
  startupPublicSourceSchema,
} from './publishedRelations';

export { publishedOrganizationSchema, type PublishedOrganization } from './publishedOrganization';
export {
  publishedGSDRelevanceAssessmentSchema,
  publishedProductOrProgramSchema,
  startupPublicEvidenceRefSchema,
  startupPublicSourceSchema,
  type PublishedGSDRelevanceAssessment,
  type PublishedProductOrProgram,
  type StartupPublicEvidenceRef,
  type StartupPublicSource,
} from './publishedRelations';

const isoDateTime = z.string().datetime({ offset: true });

export const startupPublishedCountsSchema = z.object({
  organizations: z.number().int().nonnegative(),
  productsOrPrograms: z.number().int().nonnegative(),
  relevanceAssessments: z.number().int().nonnegative(),
  publicSources: z.number().int().nonnegative(),
  directGsd: z.number().int().nonnegative(),
  adjacentGsd: z.number().int().nonnegative(),
  ecosystemSupport: z.number().int().nonnegative(),
  relevanceUnconfirmed: z.number().int().nonnegative(),
  brazil: z.number().int().nonnegative(),
  global: z.number().int().nonnegative(),
});

export const startupPublishedSnapshotSchema = z
  .object({
    id: z.string().regex(/^snap-[a-z0-9-]+$/),
    schemaVersion: z.string().min(1),
    period: z.string().min(1),
    generatedAt: isoDateTime,
    publishedAt: isoDateTime,
    protocolVersion: z.string().min(1),
    previousSnapshotId: z
      .string()
      .regex(/^snap-[a-z0-9-]+$/)
      .nullable()
      .optional(),
    coverage: z.object({
      status: z.enum(startupCoverageStatusValues),
      summary: z.string().min(1),
      limitations: z.array(z.string()).min(1),
    }),
    counts: startupPublishedCountsSchema,
    organizations: z.array(publishedOrganizationSchema),
    productsOrPrograms: z.array(publishedProductOrProgramSchema),
    relevanceAssessments: z.array(publishedGSDRelevanceAssessmentSchema),
    publicSources: z.array(startupPublicSourceSchema),
    /** Reserved field: documented placeholder; not a computed digest in 5A. */
    checksum: z.string().min(1),
  })
  .superRefine((snapshot, ctx) => {
    const orgIds = new Set<string>();
    const slugs = new Set<string>();
    for (const org of snapshot.organizations) {
      if (orgIds.has(org.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate organization id ${org.id}`,
          path: ['organizations'],
        });
      }
      orgIds.add(org.id);
      if (slugs.has(org.slug)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate organization slug ${org.slug}`,
          path: ['organizations'],
        });
      }
      slugs.add(org.slug);
      if (org.publicationState !== 'published') {
        ctx.addIssue({
          code: 'custom',
          message: `Organization ${org.id} is not published`,
          path: ['organizations'],
        });
      }
    }

    const sourceIds = new Set<string>();
    for (const source of snapshot.publicSources) {
      if (sourceIds.has(source.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate public source id ${source.id}`,
          path: ['publicSources'],
        });
      }
      sourceIds.add(source.id);
    }

    const assessmentIds = new Set<string>();
    let directGsd = 0;
    let adjacentGsd = 0;
    let ecosystemSupport = 0;
    let relevanceUnconfirmed = 0;
    let brazil = 0;
    let global = 0;
    const orgsWithAssessment = new Set<string>();

    for (const assessment of snapshot.relevanceAssessments) {
      if (assessmentIds.has(assessment.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate relevance assessment id ${assessment.id}`,
          path: ['relevanceAssessments'],
        });
      }
      assessmentIds.add(assessment.id);
      orgsWithAssessment.add(assessment.organizationId);

      if (!orgIds.has(assessment.organizationId)) {
        ctx.addIssue({
          code: 'custom',
          message: `Relevance assessment ${assessment.id} references missing organization ${assessment.organizationId}`,
          path: ['relevanceAssessments'],
        });
      }

      for (const evidence of assessment.evidenceRefs) {
        if (!sourceIds.has(evidence.sourceId)) {
          ctx.addIssue({
            code: 'custom',
            message: `Relevance assessment ${assessment.id} references missing source ${evidence.sourceId}`,
            path: ['relevanceAssessments'],
          });
        }
      }

      if (assessment.relationship === 'direct-gsd') directGsd += 1;
      if (assessment.relationship === 'adjacent-gsd') adjacentGsd += 1;
      if (assessment.relationship === 'ecosystem-support') ecosystemSupport += 1;
      if (assessment.relationship === 'relevance-unconfirmed') relevanceUnconfirmed += 1;
      if (assessment.geographicScopes.includes('brazil')) brazil += 1;
      if (assessment.geographicScopes.includes('global')) global += 1;
    }

    for (const org of snapshot.organizations) {
      if (!orgsWithAssessment.has(org.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Published organization ${org.id} lacks a relevance assessment`,
          path: ['organizations'],
        });
      }
    }

    const productIds = new Set<string>();
    for (const product of snapshot.productsOrPrograms) {
      if (productIds.has(product.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate product id ${product.id}`,
          path: ['productsOrPrograms'],
        });
      }
      productIds.add(product.id);
      if (!orgIds.has(product.organizationId)) {
        ctx.addIssue({
          code: 'custom',
          message: `Product ${product.id} references missing organization ${product.organizationId}`,
          path: ['productsOrPrograms'],
        });
      }
      for (const evidence of product.evidenceRefs) {
        if (!sourceIds.has(evidence.sourceId)) {
          ctx.addIssue({
            code: 'custom',
            message: `Product ${product.id} references missing source ${evidence.sourceId}`,
            path: ['productsOrPrograms'],
          });
        }
      }
    }

    for (const org of snapshot.organizations) {
      const linkedSourceIds = new Set<string>();
      for (const assessment of snapshot.relevanceAssessments) {
        if (assessment.organizationId !== org.id) continue;
        for (const evidence of assessment.evidenceRefs) linkedSourceIds.add(evidence.sourceId);
      }
      for (const product of snapshot.productsOrPrograms) {
        if (product.organizationId !== org.id) continue;
        for (const evidence of product.evidenceRefs) linkedSourceIds.add(evidence.sourceId);
      }
      if (linkedSourceIds.size === 0) {
        ctx.addIssue({
          code: 'custom',
          message: `Published organization ${org.id} must link to at least one public source`,
          path: ['organizations'],
        });
      }
    }

    const expected = {
      organizations: snapshot.organizations.length,
      productsOrPrograms: snapshot.productsOrPrograms.length,
      relevanceAssessments: snapshot.relevanceAssessments.length,
      publicSources: snapshot.publicSources.length,
      directGsd,
      adjacentGsd,
      ecosystemSupport,
      relevanceUnconfirmed,
      brazil,
      global,
    };

    for (const [key, value] of Object.entries(expected) as Array<[keyof typeof expected, number]>) {
      if (snapshot.counts[key] !== value) {
        ctx.addIssue({
          code: 'custom',
          message: `counts.${key} is ${snapshot.counts[key]} but derived count is ${value}`,
          path: ['counts', key],
        });
      }
    }

    if (snapshot.coverage.status === 'not-yet-populated' && snapshot.organizations.length > 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'not-yet-populated coverage cannot include organizations',
        path: ['coverage', 'status'],
      });
    }
  });

export const startupCurrentSelectorSchema = z.object({
  currentSnapshotId: z.string().regex(/^snap-[a-z0-9-]+$/),
  selectedAt: isoDateTime,
  note: z.string().min(1),
});

export type StartupPublishedSnapshot = z.infer<typeof startupPublishedSnapshotSchema>;
export type StartupCurrentSelector = z.infer<typeof startupCurrentSelectorSchema>;
