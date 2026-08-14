import { z } from 'zod';
import {
  startupOperationalStatusValues,
  startupOrganizationTypeValues,
  startupPublicationStateValues,
} from '../../data/startups/taxonomies';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const publishedOrganizationSchema = z.object({
  id: z.string().regex(/^org-[a-z0-9-]+$/),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(1),
  preferredName: z.string().min(1),
  aliases: z.array(z.string()),
  organizationType: z.enum(startupOrganizationTypeValues),
  website: z.string().url().optional(),
  foundedYear: z.number().int().min(1800).max(2100).optional(),
  headquarters: z
    .object({
      country: z.string().min(1),
      region: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
  operationalStatus: z.enum(startupOperationalStatusValues),
  description: z.string().min(1),
  sector: z.string().optional(),
  industry: z.string().optional(),
  businessModels: z.array(z.string()),
  firstDiscoveredAt: isoDate,
  lastReviewedAt: isoDate,
  publicationState: z.enum(startupPublicationStateValues),
});

export type PublishedOrganization = z.infer<typeof publishedOrganizationSchema>;
