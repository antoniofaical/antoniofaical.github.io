import type { EvidenceState } from '../../../src/lib/evidence/states';

/**
 * Fixtures exclusivamente para `/design-system/`.
 * Não importar em páginas públicas futuras.
 */

export const FIXTURE_NOTICE = 'Fixture de interface — não é dado científico';

export type FixtureMetric = {
  label: string;
  value: string | null;
  unit?: string;
  context: string;
  evidenceState: EvidenceState;
  evidenceReason?: string;
  period: string;
  geography: string;
  source: {
    authorsOrInstitution: string;
    publicationYear: number;
    sourceType: string;
    href: string;
    identifier: string;
    locator: string;
    verifiedAt: string;
  };
};

export const fixtureMetrics: FixtureMetric[] = [
  {
    label: 'Métrica observada (fixture)',
    value: '42',
    unit: 'unidades ilustrativas',
    context: 'Exemplo de valor observado com escopo declarado.',
    evidenceState: 'observed',
    period: '2024',
    geography: 'Universo fictício de demonstração',
    source: {
      authorsOrInstitution: 'Fixture Lab',
      publicationYear: 2026,
      sourceType: 'project-report',
      href: '#fixture-source-observed',
      identifier: 'fixture-observed',
      locator: 'Tabela A',
      verifiedAt: '2026-08-10',
    },
  },
  {
    label: 'Métrica estimada (fixture)',
    value: '10–20',
    unit: 'faixa ilustrativa',
    context: 'Exemplo de estimativa com incerteza explícita.',
    evidenceState: 'estimated',
    evidenceReason: 'Estimativa ilustrativa para demonstrar o estado visual.',
    period: '2020–2024',
    geography: 'Universo fictício de demonstração',
    source: {
      authorsOrInstitution: 'Fixture Lab',
      publicationYear: 2026,
      sourceType: 'other',
      href: '#fixture-source-estimated',
      identifier: 'fixture-estimated',
      locator: 'Seção B',
      verifiedAt: '2026-08-10',
    },
  },
  {
    label: 'Proxy (fixture)',
    value: '7',
    unit: 'eventos-proxy',
    context: 'Indicador indireto; não representa o fenômeno-alvo.',
    evidenceState: 'proxy',
    evidenceReason: 'Proxy ilustrativo com contorno pontilhado.',
    period: 'jan–mai/2026',
    geography: 'Universo fictício de demonstração',
    source: {
      authorsOrInstitution: 'Fixture Lab',
      publicationYear: 2026,
      sourceType: 'government-data',
      href: '#fixture-source-proxy',
      identifier: 'fixture-proxy',
      locator: 'Painel C',
      verifiedAt: '2026-08-10',
    },
  },
  {
    label: 'Conceitual (fixture)',
    value: 'Diagrama',
    unit: undefined,
    context: 'Construção conceitual — não é número monetário aparente.',
    evidenceState: 'conceptual',
    period: 'n/a',
    geography: 'Demonstração',
    source: {
      authorsOrInstitution: 'Fixture Lab',
      publicationYear: 2026,
      sourceType: 'other',
      href: '#fixture-source-conceptual',
      identifier: 'fixture-conceptual',
      locator: 'Figura D',
      verifiedAt: '2026-08-10',
    },
  },
  {
    label: 'Evidência limitada (fixture)',
    value: '3',
    unit: 'amostras ilustrativas',
    context: 'Amostra restrita; motivo permanece visível.',
    evidenceState: 'limited',
    evidenceReason: 'Evidência limitada por amostra pequena (fixture).',
    period: '2023',
    geography: 'Subconjunto fictício',
    source: {
      authorsOrInstitution: 'Fixture Lab',
      publicationYear: 2026,
      sourceType: 'peer-reviewed',
      href: '#fixture-source-limited',
      identifier: 'fixture-limited',
      locator: 'p. 12',
      verifiedAt: '2026-08-10',
    },
  },
  {
    label: 'Não calculável (fixture)',
    value: null,
    context: 'Sem denominador confiável no exemplo de interface.',
    evidenceState: 'not-calculable',
    evidenceReason: 'Não calculável neste escopo ilustrativo.',
    period: 'n/a',
    geography: 'Demonstração',
    source: {
      authorsOrInstitution: 'Fixture Lab',
      publicationYear: 2026,
      sourceType: 'other',
      href: '#fixture-source-absent',
      identifier: 'fixture-absent',
      locator: 'Nota E',
      verifiedAt: '2026-08-10',
    },
  },
];

export const paletteSwatches = [
  { token: '--ink-950', value: '#071B25', on: 'light' as const },
  { token: '--ink-800', value: '#16313B', on: 'light' as const },
  { token: '--ink-600', value: '#45616A', on: 'light' as const },
  { token: '--paper-50', value: '#F6F8F7', on: 'dark' as const },
  { token: '--paper-100', value: '#EDF2F0', on: 'dark' as const },
  { token: '--teal-700', value: '#0D6870', on: 'light' as const },
  { token: '--teal-500', value: '#1695A0', on: 'light' as const },
  { token: '--cyan-300', value: '#78D9D6', on: 'dark' as const },
  { token: '--amber-500', value: '#E9A63A', on: 'dark' as const },
  { token: '--coral-500', value: '#D8675A', on: 'light' as const },
  { token: '--green-500', value: '#439B72', on: 'light' as const },
  { token: '--line-200', value: '#D7E0DD', on: 'dark' as const },
];
