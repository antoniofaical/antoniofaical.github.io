# Modelo de dados e rastreabilidade

**Versão:** 0.3  
**Estado:** contrato lógico das Iterações 3–5

## 1. Princípios

1. identidade, alegação, evidência e observação temporal são entidades distintas;
2. dados brutos não são sobrescritos por curadoria;
3. ausência tem estado explícito;
4. toda publicação é derivada de registros validados;
5. snapshots são imutáveis;
6. classificações são versionadas;
7. uma fonte pode sustentar várias alegações, mas cada alegação conserva localizador;
8. dados proprietários e públicos têm camadas separadas.

## 2. Identificadores

| Entidade          | Padrão                 | Exemplo                   |
| ----------------- | ---------------------- | ------------------------- |
| fonte             | `src-{slug}`           | `src-cb-insights-2026-08` |
| alegação          | `clm-{dominio}-{nnn}`  | `clm-startup-001`         |
| métrica           | `met-{dominio}-{nnn}`  | `met-datasus-001`         |
| GSD               | `gsd-{slug}`           | `gsd-ia`                  |
| segmento          | `seg-{slug}`           | `seg-diagnostico`         |
| organização       | `org-{slug}`           | `org-ghf`                 |
| produto/programa  | `prd-{org}-{slug}`     | `prd-ghf-apbd`            |
| observação        | `obs-{dominio}-{uuid}` | `obs-headcount-...`       |
| revisão           | `rev-{data}-{slug}`    | `rev-2026-08-ghf`         |
| snapshot          | `snp-{yyyy-mm}`        | `snp-2026-08`             |
| execução de fonte | `run-{fonte}-{data}`   | `run-cbi-2026-08-10`      |

IDs não são reciclados. Rename altera nome, não ID.

## 3. Entidades centrais de evidência

### 3.0 Compatibilidade com o status quo

A Iteração 2 já implementou `sourceSchema`, `claimSchema`, `metricSchema` e `loadHomeEvidence`. O v0.3 **estende** esses contratos; não autoriza substituí-los por uma segunda camada incompatível.

Estado implementado:

- 2 fontes: `src-sot-medical-exec-2026`, `src-sot-socioeconomic-2026`;
- 6 claims aprovadas;
- 4 métricas da Home;
- `Source.authorsOrInstitution: string[]`;
- `Claim.sourceRefs` com `supports: direct | contextual | method`;
- `Claim.sotRefs` e `approvedForPublication`;
- regras negativas para AIH e TAM/SAM/SOM no schema de métrica.

As interfaces abaixo são o **modelo lógico alvo**. Na implementação, adicionar campos opcionais e novos schemas de domínio, mantendo os campos existentes e migrações testadas. Não renomear os contratos da Home durante as Iterações 3–5 sem ADR.

### 3.1 `Source`

```ts
type SourceExtension = {
  id: string;
  title: string;
  // campos vigentes de Source permanecem
  publisher?: string;
  identifier?: string;
  publishedAt?: string;
  temporalScope?: string;
  geographicScope?: string[];
  accessLevel: 'public' | 'institutional' | 'restricted';
  licenseOrTerms?: string;
  reliabilityTier?: 'primary' | 'authoritative-secondary' | 'secondary' | 'discovery-only';
  notes?: string;
};
```

### 3.2 `Claim`

```ts
type ClaimExtension = {
  id: string;
  domain: 'clinical' | 'socioeconomic' | 'market' | 'startup';
  subjectRef: string;
  attribute: string;
  statement: string;
  shortStatement?: string;
  evidenceState: EvidenceState;
  // sourceRefs e sotRefs vigentes permanecem
  evidenceRefs?: EvidenceRef[];
  limitations: string[];
  validFrom?: string;
  validTo?: string;
  lastReviewedAt: string;
};
```

### 3.3 `EvidenceRef`

```ts
type EvidenceRef = {
  sourceId: string;
  locator?: string;
  excerptOrSummary?: string;
  supports: 'supports' | 'partially-supports' | 'contradicts' | 'context-only';
  collectedAt: string;
};
```

### 3.4 Estados

```ts
type EvidenceState =
  | 'observed'
  | 'estimated'
  | 'proxy'
  | 'conceptual'
  | 'not-calculable'
  | 'limited'
  | 'unverified'
  | 'stale'
  | 'conflicting';
```

## 4. Domínio clínico

### 4.1 `GSD`

```ts
type GSD = {
  id: string;
  preferredName: string;
  alternativeNames: string[];
  gene?: string;
  proteinOrEnzyme?: string;
  inheritance?: string;
  clinicalPattern: ('hepatic' | 'muscular' | 'multisystemic')[];
  organsExplicitlyDescribed: OrganInvolvement[];
  distinctiveFeatures: ClaimRef[];
  nomenclatureNotes: ClaimRef[];
  diagnosisNotes: ClaimRef[];
  managementNotes: ClaimRef[];
  sourceRefs: string[];
  lastReviewedAt: string;
};
```

Não preencher herança ou órgão por conhecimento geral quando a SoT não sustentar o campo. `not-described` não significa ausência clínica.

### 4.2 `OrganInvolvement`

```ts
type OrganInvolvement = {
  organ: string;
  state: 'characteristic' | 'variable' | 'not-described-in-sot';
  claimRefs: string[];
};
```

## 5. Domínio socioeconômico e mercado

### 5.1 `BurdenFinding`

Conserva GSD, população, país, N, instrumento, desfecho, período, fonte e limitação. Amostras distintas não são agregadas sem método.

### 5.2 `CostObservation`

```ts
type CostObservation = {
  id: string;
  gsdRef: string;
  country: string;
  perspective: 'patient' | 'caregiver' | 'payer' | 'health-system' | 'societal';
  costType: string;
  amount: number;
  currency: string;
  priceYear: number;
  period: string;
  evidenceState: EvidenceState;
  sourceRefs: string[];
};
```

Moedas não são convertidas silenciosamente.

### 5.3 `MarketSegment`

```ts
type MarketSegment = {
  id: string;
  label: string;
  beneficiary: string[];
  buyerPayer: string[];
  channel: string[];
  maturity: 'established' | 'emerging' | 'fragmented' | 'conceptual';
  observability: 'monetary' | 'population-only' | 'conceptual-only' | 'absent';
  sizingRefs: string[];
};
```

### 5.4 `MarketSizing`

```ts
type MarketSizing = {
  id: string;
  segmentRef: string;
  sizingType:
    | 'observed-revenue'
    | 'tam'
    | 'sam'
    | 'som'
    | 'population-tam'
    | 'population-sam'
    | 'population-som'
    | 'conceptual';
  value?: number;
  unit?: string;
  geography: string;
  period?: string;
  assumptions: string[];
  rejectedMethods?: string[];
  evidenceState: EvidenceState;
  sourceRefs: string[];
};
```

## 6. Observatório de startups

### 6.1 Visão relacional

```text
Organization 1─* ProductOrProgram
Organization 1─* GSDRelevanceAssessment
Organization 1─* Observation
Organization 1─* Review
Organization *─* Claim *─* Source
Source 1─* SourceRun 1─* DiscoveryCandidate
Snapshot *─* OrganizationVersion
```

### 6.2 `Organization`

```ts
type Organization = {
  id: string;
  preferredName: string;
  aliases: string[];
  organizationType:
    | 'startup'
    | 'company'
    | 'nonprofit'
    | 'initiative'
    | 'supplier'
    | 'research-spinout'
    | 'other'
    | 'unconfirmed';
  website?: string;
  foundedYear?: number;
  headquarters?: { country: string; region?: string; city?: string };
  operationalStatus: 'active' | 'inactive' | 'acquired' | 'public' | 'closed' | 'unknown';
  description: string;
  sector?: string;
  industry?: string;
  businessModels: string[];
  externalIds: ExternalId[];
  firstDiscoveredAt: string;
  lastReviewedAt: string;
  publicationState: PublicationState;
};
```

Não publicar rua, CEP, pessoas ou identificadores proprietários sem justificativa.

### 6.3 `GSDRelevanceAssessment`

```ts
type GSDRelevanceAssessment = {
  id: string;
  organizationId: string;
  relationship:
    'direct-gsd' | 'adjacent-gsd' | 'ecosystem-support' | 'relevance-unconfirmed' | 'excluded';
  geographicScopes: ('brazil' | 'global')[];
  modalities: string[];
  gsdRefs: string[];
  clinicalNeedRefs: string[];
  socioeconomicNeedRefs: string[];
  rationale: string;
  confidence: 'high' | 'medium' | 'low';
  evidenceRefs: EvidenceRef[];
  assessedAt: string;
  protocolVersion: string;
};
```

A classificação é avaliação do projeto, não campo original do CB Insights.

### 6.4 `ProductOrProgram`

```ts
type ProductOrProgram = {
  id: string;
  organizationId: string;
  name: string;
  modality: string;
  indicationOrNeed: string[];
  gsdRefs: string[];
  stage:
    | 'concept'
    | 'research'
    | 'preclinical'
    | 'clinical-1'
    | 'clinical-2'
    | 'clinical-3'
    | 'approved'
    | 'commercial'
    | 'discontinued'
    | 'unknown';
  stageObservedAt?: string;
  territories: string[];
  claimRefs: string[];
};
```

Estágio pertence ao programa e exige data/fonte.

### 6.5 `Observation`

Valores mutáveis são append-only:

```ts
type Observation = {
  id: string;
  subjectRef: string;
  attribute:
    | 'headcount'
    | 'funding'
    | 'valuation'
    | 'revenue-range'
    | 'operational-status'
    | 'product-stage'
    | 'location'
    | 'other';
  value: unknown;
  unit?: string;
  observedAt: string;
  sourceRefs: string[];
  confidence: 'high' | 'medium' | 'low';
};
```

### 6.6 `Review`

```ts
type Review = {
  id: string;
  subjectRef: string;
  status:
    'pending' | 'validated' | 'validated-with-limitations' | 'needs-review' | 'excluded' | 'stale';
  reviewer: string;
  reviewedAt: string;
  rationale: string;
  nextReviewAt?: string;
  protocolVersion: string;
};
```

### 6.7 Descoberta e execução

`SourceRun` registra fonte, query/parâmetros, início/fim, páginas verificadas, candidatos, erros, cobertura e artefato bruto. `DiscoveryCandidate` mantém o registro original antes da reconciliação.

## 7. Caso inicial CB Insights

O snapshot inicial contém quatro resultados recuperados, não quatro startups globais confirmadas. Campos originais são armazenados na camada de ingestão; a camada pública recebe somente campos selecionados após revisão.

As organizações devem iniciar com revisão explícita, por exemplo:

- potencial relação direta: GHF;
- adjacente: TRADELINK;
- suporte/ecossistema: ChocolateBarBook.com;
- relevância não confirmada: GlycoGenesys.

Esses rótulos são hipóteses editoriais iniciais e só viram publicação após revisão documentada.

## 8. Snapshots

```ts
type SnapshotManifest = {
  id: string;
  period: string;
  generatedAt: string;
  protocolVersion: string;
  sourceRuns: string[];
  counts: {
    discovered: number;
    unique: number;
    validated: number;
    pending: number;
    excluded: number;
  };
  previousSnapshotId?: string;
  checksum: string;
};
```

Snapshots publicados são imutáveis. Correção gera novo snapshot ou errata rastreável.

## 9. Métricas públicas

Contadores derivam do snapshot e exibem denominador/estado. Não contar como “startup validada”:

- candidato não reconciliado;
- excluído;
- relevância não confirmada;
- duplicata;
- registro stale sem regra explícita.

## 10. Validação automatizada

- schema e tipos;
- IDs únicos;
- referências resolvíveis;
- URLs válidas;
- datas ISO;
- enumerações controladas;
- produto com organização válida;
- claim com fonte;
- estágio com data/fonte;
- observação temporal append-only;
- snapshot coerente com contagens;
- ausência de campos privados no público;
- nenhuma SoT alterada.

## 11. Revisão e atualização

```text
candidato → reconciliado → extraído → validado tecnicamente
→ revisão humana → publicado → monitorado → stale/atualizado
```

Conflitos permanecem visíveis até resolução. O último snapshot válido continua público quando o ciclo seguinte falha.
