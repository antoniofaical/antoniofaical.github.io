import { z } from 'zod';

export const clinicalPatternSchema = z.enum(['hepatic', 'muscular', 'multisystemic']);

export const organInvolvementSchema = z.object({
  organ: z.string().min(1),
  state: z.enum(['characteristic', 'variable', 'not-described-in-sot']),
  note: z.string().optional(),
});

export const gsdTypeSchema = z.object({
  id: z.string().regex(/^gsd-[a-z0-9-]+$/),
  preferredName: z.string().min(1),
  alternativeNames: z.array(z.string()).default([]),
  gene: z.string().optional(),
  proteinOrEnzyme: z.string().optional(),
  clinicalPattern: z.array(clinicalPatternSchema).min(1),
  organsExplicitlyDescribed: z.array(organInvolvementSchema).default([]),
  distinctiveFeatures: z.string().min(1),
  nomenclatureNotes: z.string().optional(),
  claimIds: z.array(z.string()).min(1),
  sourceIds: z.array(z.string()).min(1),
  lastReviewedAt: z.string().min(1),
});

export type GsdType = z.infer<typeof gsdTypeSchema>;
