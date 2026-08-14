export type SiteNavItem = {
  label: string;
  href: string;
  available?: boolean;
};

/** Single source of truth for desktop and mobile primary navigation (F1). */
export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: 'Visão geral', href: '/', available: true },
  { label: 'Bases clínicas', href: '/analises/bases-clinicas/', available: true },
  { label: 'Impacto socioeconômico', href: '/analises/impacto-socioeconomico/', available: true },
  { label: 'Observatório de startups', href: '/inovacao/startups/', available: true },
  { label: 'Metodologia', href: '/metodologia/', available: false },
];
