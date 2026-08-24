/** Editorial lineage for Iteration 5D Global direct players (GSD-DIR-* → org-gsd-dir-*). */
export const DIRECT_GSD_EDITORIAL_IDS = [
  'GSD-DIR-001',
  'GSD-DIR-002',
  'GSD-DIR-003',
  'GSD-DIR-004',
  'GSD-DIR-005',
  'GSD-DIR-006',
  'GSD-DIR-007',
  'GSD-DIR-008',
  'GSD-DIR-009',
  'GSD-DIR-010',
  'GSD-DIR-011',
  'GSD-DIR-012',
  'GSD-DIR-013',
  'GSD-DIR-014',
  'GSD-DIR-015',
  'GSD-DIR-016',
  'GSD-DIR-017',
  'GSD-DIR-018',
  'GSD-DIR-019',
  'GSD-DIR-020',
  'GSD-DIR-021',
  'GSD-DIR-022',
  'GSD-DIR-023',
  'GSD-DIR-024',
  'GSD-DIR-025',
  'GSD-DIR-026',
  'GSD-DIR-027',
  'GSD-DIR-028',
] as const;

export function directEditorialIdToOrgId(editorialId: string): string {
  const match = /^GSD-DIR-(\d+)$/.exec(editorialId);
  if (!match) throw new Error(`Invalid direct editorial id ${editorialId}`);
  return `org-gsd-dir-${match[1].padStart(3, '0')}`;
}
