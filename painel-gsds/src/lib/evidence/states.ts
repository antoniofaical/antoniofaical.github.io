/**
 * Tipos de evidência compartilhados (Iteração 1 — fundação).
 * Sem números científicos hardcoded.
 */

export const EVIDENCE_STATES = [
  'observed',
  'estimated',
  'proxy',
  'conceptual',
  'not-calculable',
  'limited',
] as const;

export type EvidenceState = (typeof EVIDENCE_STATES)[number];

export const EVIDENCE_LABELS: Record<EvidenceState, string> = {
  observed: 'Observado',
  estimated: 'Estimado',
  proxy: 'Proxy',
  conceptual: 'Conceitual',
  'not-calculable': 'Não calculável',
  limited: 'Evidência limitada',
};

export const EVIDENCE_DESCRIPTIONS: Record<EvidenceState, string> = {
  observed: 'Valor derivado de medição ou registro observável no escopo declarado.',
  estimated: 'Valor estimado; intervalo ou incerteza devem acompanhar a leitura.',
  proxy: 'Indicador indireto; não representa o fenômeno-alvo de forma direta.',
  conceptual: 'Construção conceitual para enquadramento; não é número monetário aparente.',
  'not-calculable': 'Não há denominador ou método confiável; ausência explicada, nunca zero.',
  limited: 'Evidência incompleta ou restrita; o motivo deve permanecer visível.',
};
