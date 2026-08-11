import { z } from 'zod';

export const claimDomainSchema = z.enum([
  'clinical',
  'epidemiology',
  'socioeconomic',
  'market',
  'brazil',
]);

export const claimEvidenceStateSchema = z.enum([
  'observed',
  'estimated',
  'proxy',
  'conceptual',
  'limited',
]);

export const claimSchema = z.object({
  id: z.string().regex(/^clm-[a-z0-9-]+$/),
  statement: z.string().min(1),
  shortStatement: z.string().optional(),
  domain: claimDomainSchema,
  scope: z.object({
    gsdIds: z.array(z.string()).optional(),
    population: z.string().optional(),
    geography: z.array(z.string()).optional(),
    period: z.string().optional(),
  }),
  evidenceState: claimEvidenceStateSchema,
  sourceRefs: z
    .array(
      z.object({
        sourceId: z.string(),
        locator: z.string().optional(),
        supports: z.enum(['direct', 'contextual', 'method']),
      }),
    )
    .min(1),
  sotRefs: z
    .array(
      z.object({
        file: z.string().min(1),
        heading: z.string().min(1),
      }),
    )
    .min(1),
  limitations: z.array(z.string()).optional(),
  approvedForPublication: z.boolean(),
  lastReviewedAt: z.string().min(1),
});

export type Claim = z.infer<typeof claimSchema>;
