/**
 * Taxonomias controladas do Observatório de Startups (projeção pública).
 * Valores internos em inglês; rótulos de UI em português.
 */

export const startupRelationValues = [
  'direct-gsd',
  'adjacent-gsd',
  'ecosystem-support',
  'relevance-unconfirmed',
] as const;

export type StartupRelation = (typeof startupRelationValues)[number];

export const startupRelationLabels: Record<StartupRelation, string> = {
  'direct-gsd': 'Direta às GSDs',
  'adjacent-gsd': 'Adjacente às GSDs',
  'ecosystem-support': 'Suporte ao ecossistema',
  'relevance-unconfirmed': 'Relevância não confirmada',
};

export const startupGeographyValues = ['brazil', 'global'] as const;
export type StartupGeography = (typeof startupGeographyValues)[number];

export const startupGeographyLabels: Record<StartupGeography, string> = {
  brazil: 'Brasil',
  global: 'Global',
};

export const startupConfidenceValues = ['high', 'medium', 'low', 'not-assigned'] as const;
export type StartupConfidence = (typeof startupConfidenceValues)[number];

export const startupConfidenceLabels: Record<StartupConfidence, string> = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
  'not-assigned': 'Não atribuída',
};

/** Status corporativo do mapeamento direto (distinto de operationalStatus e de atividade GSD). */
export const startupDirectOrganizationStatusValues = [
  'private-startup',
  'public-biotech',
  'acquired-or-inactive',
  'identity-unresolved',
] as const;
export type StartupDirectOrganizationStatus =
  (typeof startupDirectOrganizationStatusValues)[number];
export const startupDirectOrganizationStatusLabels: Record<
  StartupDirectOrganizationStatus,
  string
> = {
  'private-startup': 'Startup / privada',
  'public-biotech': 'Biotecnologia de capital aberto',
  'acquired-or-inactive': 'Adquirida ou inativa',
  'identity-unresolved': 'Status atual incerto',
};

/** Atividade GSD atual vs histórica (não colapsar com organization_status). */
export const startupDirectGsdActivityValues = [
  'confirmed-current',
  'current-uncertain',
  'historical-only',
] as const;
export type StartupDirectGsdActivity = (typeof startupDirectGsdActivityValues)[number];
export const startupDirectGsdActivityLabels: Record<StartupDirectGsdActivity, string> = {
  'confirmed-current': 'Atividade GSD atual',
  'current-uncertain': 'Atividade atual incerta',
  'historical-only': 'Histórica',
};

/**
 * Papel no ativo GSD.
 * `HISTORICAL_OWNER` mapeia para `historical-owner` (Maze/Valerion),
 * exceto Kriya → `historical-association-ownership-unverified`.
 */
export const startupDirectAssetRoleValues = [
  'owner',
  'developer',
  'license-holder',
  'historical-owner',
  'historical-association-ownership-unverified',
  'acquired-entity',
  'outlicensed',
  'unresolved',
] as const;
export type StartupDirectAssetRole = (typeof startupDirectAssetRoleValues)[number];
export const startupDirectAssetRoleLabels: Record<StartupDirectAssetRole, string> = {
  owner: 'Titular',
  developer: 'Desenvolvedor / operador',
  'license-holder': 'Detentor de licença',
  'historical-owner': 'Titular histórico do ativo',
  'historical-association-ownership-unverified': 'Relação histórica; titularidade não estabelecida',
  'acquired-entity': 'Entidade adquirida',
  outlicensed: 'Licenciado a terceiro',
  unresolved: 'Papel não resolvido',
};

export const startupOrganizationTypeValues = [
  'startup',
  'company',
  'nonprofit',
  'initiative',
  'supplier',
  'research-spinout',
  'other',
  'unconfirmed',
] as const;

export type StartupOrganizationType = (typeof startupOrganizationTypeValues)[number];

export const startupOrganizationTypeLabels: Record<StartupOrganizationType, string> = {
  startup: 'Startup',
  company: 'Empresa',
  nonprofit: 'Organização sem fins lucrativos',
  initiative: 'Iniciativa',
  supplier: 'Fornecedor',
  'research-spinout': 'Spinout de pesquisa',
  other: 'Outro',
  unconfirmed: 'Não confirmado',
};

export const startupOperationalStatusValues = [
  'apparently-active',
  'active',
  'inactive',
  'acquired',
  'acquired-or-inactive',
  'private',
  'public',
  'closed',
  'identity-unresolved',
  'unknown',
] as const;

export type StartupOperationalStatus = (typeof startupOperationalStatusValues)[number];

export const startupOperationalStatusLabels: Record<StartupOperationalStatus, string> = {
  'apparently-active': 'Aparentemente ativa',
  active: 'Ativa',
  inactive: 'Inativa',
  acquired: 'Adquirida',
  'acquired-or-inactive': 'Adquirida ou inativa',
  private: 'Privada',
  public: 'De capital aberto',
  closed: 'Encerrada',
  'identity-unresolved': 'Identidade/status não resolvido',
  unknown: 'Desconhecido',
};

export const startupPublicationStateValues = ['published'] as const;
export type StartupPublicationState = (typeof startupPublicationStateValues)[number];

export const startupProductStageValues = [
  'concept',
  'research',
  'preclinical',
  'clinical-1',
  'clinical-2',
  'clinical-3',
  'approved',
  'commercial',
  'discontinued',
  'unknown',
] as const;

export type StartupProductStage = (typeof startupProductStageValues)[number];

export const startupProductStageLabels: Record<StartupProductStage, string> = {
  concept: 'Conceito',
  research: 'Pesquisa',
  preclinical: 'Pré-clínico',
  'clinical-1': 'Clínico — fase 1',
  'clinical-2': 'Clínico — fase 2',
  'clinical-3': 'Clínico — fase 3',
  approved: 'Aprovado',
  commercial: 'Comercial',
  discontinued: 'Descontinuado',
  unknown: 'Desconhecido',
};

export const startupPublicSourceTypeValues = [
  'company-site',
  'registry',
  'peer-reviewed',
  'regulatory',
  'news',
  'project-report',
  'other',
] as const;

export type StartupPublicSourceType = (typeof startupPublicSourceTypeValues)[number];

export const startupPublicSourceTypeLabels: Record<StartupPublicSourceType, string> = {
  'company-site': 'Site institucional',
  registry: 'Registro',
  'peer-reviewed': 'Artigo revisado por pares',
  regulatory: 'Documento regulatório',
  news: 'Notícia',
  'project-report': 'Relatório de projeto',
  other: 'Outro',
};

export const startupEvidenceRoleValues = ['supports', 'contextual', 'method'] as const;
export type StartupEvidenceRole = (typeof startupEvidenceRoleValues)[number];

export const startupEvidenceRoleLabels: Record<StartupEvidenceRole, string> = {
  supports: 'Suporte direto',
  contextual: 'Contexto',
  method: 'Método',
};

export const startupCoverageStatusValues = [
  'not-yet-populated',
  'limited',
  'partial',
  'complete-for-protocol',
] as const;

export type StartupCoverageStatus = (typeof startupCoverageStatusValues)[number];

export const startupCoverageStatusLabels: Record<StartupCoverageStatus, string> = {
  'not-yet-populated': 'Ainda não populado',
  limited: 'Cobertura limitada',
  partial: 'Cobertura parcial',
  'complete-for-protocol': 'Completo para o protocolo vigente',
};
