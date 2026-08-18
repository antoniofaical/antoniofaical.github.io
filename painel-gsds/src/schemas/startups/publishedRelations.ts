import { z } from 'zod';
import {
  startupConfidenceValues,
  startupEvidenceRoleValues,
  startupGeographyValues,
  startupProductStageValues,
  startupPublicSourceTypeValues,
  startupRelationValues,
} from '../../data/startups/taxonomies';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const startupPublicEvidenceRefSchema = z.object({
  sourceId: z.string().regex(/^sps-[a-z0-9-]+$/),
  locator: z.string().optional(),
  role: z.enum(startupEvidenceRoleValues),
});

export const publishedGSDRelevanceAssessmentSchema = z.object({
  id: z.string().regex(/^rel-[a-z0-9-]+$/),
  organizationId: z.string().regex(/^org-[a-z0-9-]+$/),
  relationship: z.enum(startupRelationValues),
  geographicScopes: z.array(z.enum(startupGeographyValues)).min(1),
  modalities: z.array(z.string()),
  gsdRefs: z.array(z.string()),
  clinicalNeedRefs: z.array(z.string()),
  socioeconomicNeedRefs: z.array(z.string()),
  rationale: z.string().min(20),
  confidence: z.enum(startupConfidenceValues),
  evidenceRefs: z.array(startupPublicEvidenceRefSchema).min(1),
  assessedAt: isoDate,
  protocolVersion: z.string().min(1),
});

export const publishedProductOrProgramSchema = z.object({
  id: z.string().regex(/^prd-[a-z0-9-]+$/),
  organizationId: z.string().regex(/^org-[a-z0-9-]+$/),
  name: z.string().min(1),
  modality: z.string().min(1),
  indicationOrNeed: z.array(z.string()).min(1),
  gsdRefs: z.array(z.string()),
  stage: z.enum(startupProductStageValues),
  stageObservedAt: isoDate.optional(),
  territories: z.array(z.string()),
  evidenceRefs: z.array(startupPublicEvidenceRefSchema).min(1),
});

export const startupPublicSourceSchema = z
  .object({
    id: z.string().regex(/^sps-[a-z0-9-]+$/),
    title: z.string().min(1),
    /** Optional: set only when the URL is the organization's official site. */
    publisher: z.string().min(1).optional(),
    url: z.string().url().optional(),
    sourceType: z.enum(startupPublicSourceTypeValues),
    publishedAt: isoDate.optional(),
    accessedAt: isoDate,
    availability: z.enum(['public', 'registration', 'restricted-summary-only']),
    notes: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.url && value.availability === 'public') {
      ctx.addIssue({
        code: 'custom',
        message: 'Public sources should include a URL when availability is public',
        path: ['url'],
      });
    }
  });

export type PublishedGSDRelevanceAssessment = z.infer<typeof publishedGSDRelevanceAssessmentSchema>;
export type PublishedProductOrProgram = z.infer<typeof publishedProductOrProgramSchema>;
export type StartupPublicSource = z.infer<typeof startupPublicSourceSchema>;
export type StartupPublicEvidenceRef = z.infer<typeof startupPublicEvidenceRefSchema>;
