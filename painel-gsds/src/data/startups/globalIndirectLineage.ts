/**
 * Editorial lineage for Iteration 5C Global indirect main longlist (GSDI-* → org-gsdi-*).
 *
 * GSDI-002 (Saventic Health) is an identity dedupe against the Brazil snapshot:
 * it maps to the already-published org-gsd-br-002 rather than creating org-gsdi-002.
 * This is not a renumbering of the Global series.
 */
export const GLOBAL_INDIRECT_MAIN_EDITORIAL_IDS = [
  'GSDI-001',
  'GSDI-002',
  'GSDI-003',
  'GSDI-004',
  'GSDI-005',
  'GSDI-006',
  'GSDI-007',
  'GSDI-008',
  'GSDI-009',
  'GSDI-010',
  'GSDI-011',
  'GSDI-012',
  'GSDI-013',
  'GSDI-014',
  'GSDI-015',
  'GSDI-016',
  'GSDI-019',
  'GSDI-020',
  'GSDI-021',
  'GSDI-022',
  'GSDI-024',
  'GSDI-025',
  'GSDI-026',
  'GSDI-027',
  'GSDI-028',
  'GSDI-030',
  'GSDI-031',
  'GSDI-032',
  'GSDI-033',
  'GSDI-034',
  'GSDI-035',
  'GSDI-037',
  'GSDI-038',
  'GSDI-039',
  'GSDI-040',
  'GSDI-041',
  'GSDI-042',
  'GSDI-043',
  'GSDI-044',
  'GSDI-045',
  'GSDI-046',
  'GSDI-047',
  'GSDI-048',
  'GSDI-049',
  'GSDI-050',
  'GSDI-051',
  'GSDI-052',
  'GSDI-053',
  'GSDI-054',
  'GSDI-055',
  'GSDI-056',
  'GSDI-057',
  'GSDI-058',
  'GSDI-066',
  'GSDI-067',
  'GSDI-068',
  'GSDI-069',
  'GSDI-070',
  'GSDI-071',
  'GSDI-072',
] as const;

/** Manual review / excluded / withdrawn — never public in 5C. */
export const GLOBAL_INDIRECT_NON_PUBLIC_EDITORIAL_IDS = [
  'GSDI-017',
  'GSDI-018',
  'GSDI-023',
  'GSDI-029',
  'GSDI-036',
  'GSDI-059',
  'GSDI-060',
  'GSDI-061',
  'GSDI-062',
  'GSDI-063',
  'GSDI-064',
  'GSDI-065',
] as const;

export function globalEditorialIdToOrgId(editorialId: string): string {
  const match = /^GSDI-(\d+)$/.exec(editorialId);
  if (!match) throw new Error(`Invalid global editorial id ${editorialId}`);
  const nnn = match[1].padStart(3, '0');
  if (nnn === '002') {
    // Identity dedupe: Saventic Health already published as Brazil org-gsd-br-002.
    return 'org-gsd-br-002';
  }
  return `org-gsdi-${nnn}`;
}
