import { z } from 'zod';

export const sourceTypeSchema = z.enum([
  'peer-reviewed',
  'regulatory',
  'government-data',
  'government-document',
  'clinical-guideline',
  'company-filing',
  'registry',
  'project-report',
  'other',
]);

export const sourceSchema = z
  .object({
    id: z.string().regex(/^src-[a-z0-9-]+$/),
    title: z.string().min(1),
    authorsOrInstitution: z.array(z.string().min(1)).min(1),
    publicationYear: z.number().int().optional(),
    sourceType: sourceTypeSchema,
    url: z.string().url().optional(),
    doi: z.string().optional(),
    pmid: z.string().optional(),
    localSotFile: z.string().optional(),
    language: z.string().optional(),
    accessedAt: z.string().optional(),
    dataCutoff: z.string().optional(),
    notes: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.url && !value.doi && !value.pmid && !value.localSotFile) {
      ctx.addIssue({
        code: 'custom',
        message: 'Source requires at least one of url, doi, pmid, or localSotFile',
        path: ['localSotFile'],
      });
    }
  });

export type Source = z.infer<typeof sourceSchema>;
