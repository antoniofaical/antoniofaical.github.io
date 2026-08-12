# Modelo de dados e rastreabilidade

**Versão:** 0.1  
**Princípio:** uma afirmação publicada deve ser rastreável até a SoT e, quando disponível, até sua fonte original.

## 1. Separação de camadas

```text
Fonte de verdade imutável
        ↓
Registros estruturados de evidência
        ↓
Conteúdo editorial aprovado
        ↓
Componentes e visualizações
```

- **SoT:** relatórios originais preservados em `docs/source-of-truth/`;
- **evidência:** fontes, alegações e métricas em dados estruturados;
- **editorial:** textos de página em Markdown/MDX;
- **interface:** apresenta os dados, sem redefini-los.

## 2. Identificadores

IDs são estáveis, legíveis e nunca reciclados.

| Entidade       | Padrão                | Exemplo                     |
| -------------- | --------------------- | --------------------------- |
| fonte          | `src-{slug}`          | `src-datasus-sih-e740-2026` |
| alegação       | `clm-{dominio}-{nnn}` | `clm-brasil-001`            |
| métrica        | `met-{dominio}-{nnn}` | `met-datasus-001`           |
| GSD            | `gsd-{slug}`          | `gsd-ia`                    |
| segmento       | `seg-{slug}`          | `seg-diagnostico`           |
| startup futura | `org-{slug}`          | `org-exemplo`               |
| revisão        | `rev-{data}-{slug}`   | `rev-2026-08-10-medical`    |

Mudanças de nome não mudam o ID.

## 3. Fonte

Arquivo: `src/data/sources.json`.

```ts
type Source = {
  id: string;
  title: string;
  authorsOrInstitution: string[];
  publicationYear?: number;
  sourceType:
    | 'peer-reviewed'
    | 'regulatory'
    | 'government-data'
    | 'government-document'
    | 'clinical-guideline'
    | 'company-filing'
    | 'registry'
    | 'project-report'
    | 'other';
  url?: string;
  doi?: string;
  pmid?: string;
  localSotFile?: string;
  language?: string;
  accessedAt?: string;
  dataCutoff?: string;
  notes?: string;
};
```

Regras:

- ao menos um de `url`, `doi`, `pmid` ou `localSotFile` é obrigatório;
- URLs não são usadas como IDs;
- fonte empresarial é identificada como tal;
- patrocínio ou conflito relevante pertence a `notes` quando documentado.

## 4. Alegação

Arquivo: `src/data/claims.json`.

```ts
type Claim = {
  id: string;
  statement: string;
  shortStatement?: string;
  domain: 'clinical' | 'epidemiology' | 'socioeconomic' | 'market' | 'brazil';
  scope: {
    gsdIds?: string[];
    population?: string;
    geography?: string[];
    period?: string;
  };
  evidenceState: 'observed' | 'estimated' | 'proxy' | 'conceptual' | 'limited';
  sourceRefs: Array<{
    sourceId: string;
    locator?: string;
    supports: 'direct' | 'contextual' | 'method';
  }>;
  sotRefs: Array<{
    file: string;
    heading: string;
  }>;
  limitations?: string[];
  approvedForPublication: boolean;
  lastReviewedAt: string;
};
```

Uma alegação não pode ser publicada se:

- `sourceRefs` ou `sotRefs` estiver vazio;
- `approvedForPublication` for falso;
- tiver ultrapassado sua data de revisão definida para conteúdo temporal;
- a frase no componente ampliar população, geografia ou causalidade em relação a `statement`.

## 5. Métrica

Arquivo: `src/data/metrics.json`.

```ts
type Metric = {
  id: string;
  label: string;
  value: number | null;
  displayValue?: string;
  unit: string;
  currency?: 'BRL' | 'EUR' | 'USD' | null;
  priceYear?: number;
  geography: string[];
  period: string;
  gsdIds?: string[];
  population?: string;
  numerator?: number;
  denominator?: number;
  evidenceState: 'observed' | 'estimated' | 'proxy' | 'conceptual' | 'not-calculable' | 'limited';
  sourceIds: string[];
  claimId: string;
  method?: string;
  limitations: string[];
  lastReviewedAt: string;
};
```

Regras críticas:

- `value: null` + `evidenceState: not-calculable` representa não calculabilidade;
- ausência de dado nunca vira `0`;
- moeda exige ano/preço ou explicação;
- percentual exige denominador ou limitação explícita;
- valor convertido exige método e taxa de câmbio;
- estimativas populacionais registram a prevalência/incidência utilizada no método;
- AIHs DATASUS usam unidade `AIHs`, nunca `pacientes` ou `internações únicas`.

## 6. Registro de GSD

Arquivo: `src/data/gsd-types.json`.

```ts
type Gsd = {
  id: string;
  preferredName: string;
  number?: string;
  subtype?: string;
  alternativeNames: string[];
  historicalNames: string[];
  genes: string[];
  proteinsOrEnzymes: string[];
  inheritance?: string;
  clinicalPattern: Array<'hepatic' | 'muscular' | 'multisystemic' | 'other'>;
  organs: Array<{
    organId: string;
    involvement: 'characteristic' | 'variable' | 'not-characteristic' | 'unknown';
    claimIds: string[];
  }>;
  distinctiveFeatures: string[];
  diagnosisSummary?: string;
  currentManagement?: string[];
  specificTherapies?: string[];
  experimentalModalities?: string[];
  nomenclatureNotes?: string[];
  claimIds: string[];
  lastReviewedAt: string;
};
```

`unknown` não é equivalente a `not-characteristic`. Nomenclaturas históricas devem ser recuperáveis na busca e exibidas com contexto.

## 7. Segmento mercadológico

Arquivo: `src/data/market-segments.json`.

```ts
type MarketSegment = {
  id: string;
  name: string;
  definition: string;
  maturity: 'established' | 'emerging' | 'adjacent' | 'need-without-structured-market';
  beneficiaries: string[];
  buyers: string[];
  payers: string[];
  channels: string[];
  monetarySizing: {
    status: 'observed' | 'partial' | 'not-calculable';
    metricIds: string[];
    explanation: string;
  };
  populationSizing: {
    tamConcept: string;
    samConcept: string;
    somConcept: string;
    metricIds: string[];
  };
  claimIds: string[];
  lastReviewedAt: string;
};
```

O nome `TAM/SAM/SOM` em uma vista populacional recebe sempre o qualificador `populacional` ou `conceitual`.

## 8. DATASUS

Arquivos derivados podem permanecer CSV em `src/data/datasus/`, acompanhados de `metadata.json`:

```ts
type DatasusMetadata = {
  diagnosisCode: 'E740';
  diagnosisField: 'DIAG_PRINC';
  geographyDefinition: 'local-da-internacao';
  recordUnit: 'AIH-RD';
  valueField: 'VAL_TOT';
  longStayIncluded: true;
  patientDeduplication: false;
  periodStart: string;
  periodEnd: string;
  coverage: {
    withCases: number;
    verifiedZero: number;
    inferredZero: number;
  };
  sourceIds: string[];
  limitations: string[];
};
```

Componentes só podem consumir o CSV por uma função que também importe esses metadados.

## 9. Startup futura

O schema é reservado para orientar a coleta; não deve ser preenchido com exemplos fictícios.

```ts
type Startup = {
  id: string;
  legalName: string;
  brandName: string;
  website?: string;
  countryHq?: string;
  foundedYear?: number;
  status: 'active' | 'inactive' | 'acquired' | 'unknown';
  relationToGsd: 'direct' | 'adjacent';
  targetGsdIds: string[];
  problemIds: string[];
  segmentIds: string[];
  solutionSummary: string;
  technology: string[];
  beneficiaries: string[];
  evidenceStage: string;
  regulatoryStatus?: string;
  businessModel?: string[];
  geographies?: string[];
  sourceRefs: Array<{
    sourceId: string;
    field: string;
    verifiedAt: string;
  }>;
  lastVerifiedAt: string;
};
```

Não criar `score`, `ranking` ou `fitEinstein` até existir metodologia aprovada.

## 10. Conteúdo editorial

Frontmatter mínimo das páginas Markdown/MDX:

```yaml
title: Bases clínicas das glicogenoses
description: ...
status: review
dataCutoff: 2024-12-31
lastReviewedAt: 2026-08-10
reviewers: []
claimIds:
  - clm-clinical-001
```

Textos editoriais referenciam `claimIds`; números são renderizados a partir de `metricIds`, evitando duplicação manual.

## 11. Validação automatizada

O build deve falhar quando:

- houver ID duplicado;
- referência apontar para entidade inexistente;
- métrica publicável não possuir fonte e alegação;
- `not-calculable` tiver valor numérico;
- moeda não possuir ano ou justificativa;
- página publicada usar alegação não aprovada;
- data de revisão estiver ausente;
- registro DATASUS denominar AIH como paciente;
- URL interna ignorar o `base path`.

## 12. Fluxo de revisão

```text
Extrair da SoT
→ criar/editar alegação
→ vincular fonte e localização
→ revisão humana do escopo
→ aprovar para publicação
→ usar no conteúdo
→ validar no build
```

Uma correção científica atualiza primeiro a evidência estruturada e a SoT correspondente; só depois os componentes derivados.
