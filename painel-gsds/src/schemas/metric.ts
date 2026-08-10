import { z } from 'zod';

export const metricEvidenceStateSchema = z.enum([
  'observed',
  'estimated',
  'proxy',
  'conceptual',
  'not-calculable',
  'limited',
]);

export const metricSchema = z
  .object({
    id: z.string().regex(/^met-[a-z0-9-]+$/),
    label: z.string().min(1),
    value: z.number().nullable(),
    displayValue: z.string().optional(),
    unit: z.string().min(1),
    currency: z.enum(['BRL', 'EUR', 'USD']).nullable().optional(),
    priceYear: z.number().int().optional(),
    geography: z.array(z.string()).min(1),
    period: z.string().min(1),
    gsdIds: z.array(z.string()).optional(),
    population: z.string().optional(),
    numerator: z.number().optional(),
    denominator: z.number().optional(),
    evidenceState: metricEvidenceStateSchema,
    sourceIds: z.array(z.string()).min(1),
    claimId: z.string().min(1),
    method: z.string().optional(),
    limitations: z.array(z.string()).min(1),
    lastReviewedAt: z.string().min(1),
    marketClassification: z.enum(['observed-revenue', 'TAM', 'SAM', 'SOM']).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.evidenceState === 'not-calculable' && value.value !== null) {
      ctx.addIssue({
        code: 'custom',
        message: 'not-calculable metrics must have value: null',
        path: ['value'],
      });
    }

    if (value.currency && !value.priceYear && !value.period) {
      ctx.addIssue({
        code: 'custom',
        message: 'Monetary metrics require priceYear or an explicit period',
        path: ['priceYear'],
      });
    }

    if (value.currency && value.marketClassification === undefined) {
      // allow non-market monetary metrics; Home Pompe revenue must set classification
    }

    if (
      value.marketClassification === 'TAM' ||
      value.marketClassification === 'SAM' ||
      value.marketClassification === 'SOM'
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Observed Home metrics must not be classified as TAM/SAM/SOM',
        path: ['marketClassification'],
      });
    }

    const unitLower = value.unit.toLowerCase();
    const labelLower = value.label.toLowerCase();
    if (value.id.includes('datasus') || unitLower.includes('aih') || labelLower.includes('aih')) {
      if (unitLower.includes('paciente') || labelLower.includes('paciente')) {
        ctx.addIssue({
          code: 'custom',
          message: 'DATASUS AIH metrics must not use patient wording',
          path: ['unit'],
        });
      }
      if (!unitLower.includes('aih')) {
        ctx.addIssue({
          code: 'custom',
          message: 'DATASUS metrics must use AIHs as unit',
          path: ['unit'],
        });
      }
    }
  });

export type Metric = z.infer<typeof metricSchema>;
