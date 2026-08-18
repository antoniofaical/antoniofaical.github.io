/** Editorial lineage for Iteration 5B Brazil indirect longlist (GSD-BR-* → org-gsd-br-*). */
export const BRAZIL_INDIRECT_EDITORIAL_IDS = [
  'GSD-BR-001',
  'GSD-BR-002',
  'GSD-BR-007',
  'GSD-BR-008',
  'GSD-BR-009',
  'GSD-BR-010',
  'GSD-BR-011',
  'GSD-BR-012',
  'GSD-BR-013',
  'GSD-BR-014',
  'GSD-BR-015',
  'GSD-BR-016',
  'GSD-BR-017',
  'GSD-BR-022',
  'GSD-BR-025',
  'GSD-BR-026',
  'GSD-BR-030',
  'GSD-BR-032',
  'GSD-BR-033',
  'GSD-BR-035',
  'GSD-BR-036',
  'GSD-BR-037',
  'GSD-BR-038',
  'GSD-BR-041',
  'GSD-BR-043',
  'GSD-BR-045',
  'GSD-BR-046',
  'GSD-BR-047',
  'GSD-BR-048',
  'GSD-BR-053',
  'GSD-BR-054',
  'GSD-BR-061',
  'GSD-BR-081',
] as const;

export function editorialIdToOrgId(editorialId: string): string {
  const match = /^GSD-BR-(\d+)$/.exec(editorialId);
  if (!match) throw new Error(`Invalid editorial id ${editorialId}`);
  return `org-gsd-br-${match[1].padStart(3, '0')}`;
}
