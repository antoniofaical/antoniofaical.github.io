import { z } from 'zod';

export const marketSegmentSchema = z.object({
  id: z.string().regex(/^seg-[a-z0-9-]+$/),
  label: z.string().min(1),
  beneficiary: z.array(z.string()).min(1),
  buyerPayer: z.array(z.string()).min(1),
  maturity: z.enum(['established', 'emerging', 'fragmented', 'conceptual']),
  observability: z.enum(['monetary', 'population-only', 'conceptual-only', 'absent']),
  summary: z.string().min(1),
  claimIds: z.array(z.string()).min(1),
  limitations: z.array(z.string()).min(1),
});

export const burdenFindingSchema = z.object({
  id: z.string().regex(/^brd-[a-z0-9-]+$/),
  actor: z.enum(['patient', 'caregiver', 'family', 'health-system']),
  gsdScope: z.string().min(1),
  summary: z.string().min(1),
  evidenceState: z.enum(['observed', 'estimated', 'proxy', 'conceptual', 'limited']),
  claimIds: z.array(z.string()).min(1),
  limitations: z.array(z.string()).min(1),
});

export type MarketSegment = z.infer<typeof marketSegmentSchema>;
export type BurdenFinding = z.infer<typeof burdenFindingSchema>;
