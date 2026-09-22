# CURRENT_DATA_ARCHITECTURE — 7B.0 Reverse engineering do modelo de dados atual

**Status do draft:** Checkpoint 3<br />
**Rodada:** 7B.0 apenas (descritiva; sem stack, banco, schema futuro ou alteração de dados)<br />
**Rótulos:** `FACT` | `INFERENCE` | `PENDING` | `CONFLICT` | `PENDING_7A_COPY`

Nenhuma afirmação `FACT` abaixo está sem lastro. Referências usam `caminho:linha` ou `caminho + símbolo/chave`.

**Camada raw:** `FACT` — este repositório **não versiona** uma camada de aquisição não interpretada (CSV/ZIP de scouting, dumps brutos, `ResearchRun`). Pacote citado como fora do repositório em `docs/implementation/12_Guia_Importacao_Observatorio_Startups.md:18`; `ResearchRun`/staging/`ChangeSet` fora de escopo em `docs/decisions/ADR-0005-published-snapshot-observatorio.md:20` e `AGENTS.md:38`. Por isso o corpo do snapshot publicado **não** é classificado como `RAW_DATA` só por estar em JSON. Ver `ENTITY_FIELD_INVENTORY.csv`.

---

## 1. Escopo, baseline, branch e worktree

| Item                     | Valor                                            | Evidência                                      |
| ------------------------ | ------------------------------------------------ | ---------------------------------------------- |
| Repositório              | `C:/github-projects/antoniofaical.github.io-7b`  | `git rev-parse --show-toplevel` (Checkpoint 0) |
| App                      | `painel-gsds/`                                   | `painel-gsds/AGENTS.md`                        |
| Branch                   | `audit/gsd-7b-0-observatory-reverse-engineering` | Checkpoint 0                                   |
| `HEAD` / baseline        | `fb9f15d79252c5950d29fe36c5b45ab437613c41`       | Checkpoint 0; idênticos                        |
| Worktree inicial         | limpo                                            | `git status --short` vazio no Checkpoint 0     |
| Entregáveis desta rodada | somente esta pasta                               | convenção `docs/audits/` (6d1/6d3/6d4)         |

`FACT`: a 7B.0 investiga o Observatório publicado. Home clínica/socio usa outro grafo (`src/lib/data/loadHomeEvidence.ts:1-3`).

Não foi feito commit, push, merge, rebase, deploy, instalação de dependências nem escolha de stack.

---

## 2. Definição operacional de “base publicada”

`FACT`: a página pública do Observatório é `src/pages/inovacao/startups/index.astro`. Ela chama `loadPublishedSnapshot()` em `index.astro:10-14`.

`FACT`: `loadPublishedSnapshot()` resolve `published/current.json` → corpo imutável indexado pelo `id` interno (`src/lib/startups/loadPublishedSnapshot.ts:1`, `:13-16`, `:46-64`).

Duas camadas, ambas por consumo:

1. **Projeção corrente (renderizada):** `current.json` + o snapshot cujo `id` iguala `currentSnapshotId`.
2. **Registry publicado (glob eager):** todos os `published/snapshots/*.json` são parseados no import (`loadPublishedSnapshot.ts:13-16`, `:40`). A página corrente não os exibe; testes chamam `loadPublishedSnapshotById`.

Fora da base publicada (consumo verificado): fixtures `tests/fixtures/startups/`; `*Lineage.ts` (só testes); `src/data/sources.json` / `claims.json` / `metrics.json`; CSV/ZIP de scouting (ausentes).

---

## 3. Inventário dos artefatos físicos e papéis

| Caminho                                                     | Formato         | Papel                                          | Consumo                                          |
| ----------------------------------------------------------- | --------------- | ---------------------------------------------- | ------------------------------------------------ |
| `src/data/startups/published/current.json`                  | JSON seletor    | `currentSnapshotId`, `selectedAt`, `note`      | `loadPublishedSnapshot.ts:1`, `:46-48`           |
| `.../snapshots/ecosystem-cumulative-direct-2026-08-24.json` | JSON snapshot   | Corpo canônico corrente                        | seletor `current.json:2` + `id` na L1 do arquivo |
| `.../snapshots/indirect-cumulative-2026-08-18.json`         | JSON snapshot   | Histórico 5C; `previousSnapshotId` do corrente | glob; `ecosystem-…json:7`                        |
| `.../snapshots/brazil-indirect-2026-08-14.json`             | JSON snapshot   | Histórico 5B                                   | glob                                             |
| `.../snapshots/initial-empty.json`                          | JSON snapshot   | Infra vazia; checksum `reserved-not-computed`  | glob                                             |
| `src/data/startups/taxonomies.ts`                           | TS enums+labels | Vocabulário da projeção                        | schemas, UI, aggregators                         |
| `src/schemas/startups/*.ts`                                 | Zod             | Contrato de forma                              | loader `:28`, `parseStartupPublishedSnapshot`    |
| `src/lib/startups/loadPublishedSnapshot.ts`                 | TS              | Loader / registry                              | página `:10`                                     |
| `src/lib/startups/queryStartups.ts`                         | TS              | Join + filtro + sort                           | `StartupExplorer.tsx:3,40`                       |
| `src/lib/startups/startupStats.ts`                          | TS              | Totais do explorer                             | `StartupExplorer.tsx:4,56-58`                    |
| `src/lib/startups/aggregateObservatoryCharts.ts`            | TS              | VIZ01–04                                       | `ObservatoryAnalytics.tsx:2-7,21-24`             |
| `scripts/validate-startup-data.ts`                          | TS              | Validator checksum+schema                      | `package.json` script `data:validate`            |
| `src/data/startups/*Lineage.ts`                             | TS              | Mapas editoriais `GSD-*`→`org-*`               | **somente** `*.5b/5c/5d.test.ts`                 |
| `tests/fixtures/startups/*.json`                            | JSON            | Fixtures                                       | testes; fora do glob                             |

Campos das estruturas: `ENTITY_FIELD_INVENTORY.csv`.

---

## 4. Fluxo atual (upstream → frontend), sem arquitetura futura

```text
[scouting/handoff fora do Git — PENDING]
        │
        ▼  (não demonstrável neste repo, salvo mapas *Lineage.ts usados só em testes)
*Lineage.ts  ──testes──►  IDs públicos org-/rel-
        │
        ▼
published/snapshots/*.json  (imutáveis)
        ▲
current.json  (seletor; não duplica o corpo)
        │
        ▼
loadPublishedSnapshot()  →  Zod  →  snapshot corrente
        │
        ├─ index.astro
        │     isEmpty = coverage.status==='not-yet-populated' OR organizations.length===0
        │     A30_ECHO reescreve coverage.summary / filtra limitations  →  PENDING_7A_COPY
        ├─ StartupExplorer → queryStartups → cards / drawer / resumo
        └─ ObservatoryAnalytics(snapshot completo) → VIZ01–04
```

`FACT`: charts recebem o snapshot inteiro, não o recorte filtrado (`ObservatoryAnalytics.tsx:20-24` vs explorer em `StartupExplorer.tsx:40`).

---

## 5. Schemas, types, loaders, aggregators, validators, taxonomias

- Schemas: `publishedSnapshot.ts`, `publishedOrganization.ts`, `publishedRelations.ts`.
- Types inferidos: `StartupPublishedSnapshot`, `PublishedOrganization`, `PublishedGSDRelevanceAssessment`, `PublishedDirectContext`, `PublishedProductOrProgram`, `StartupPublicSource`, `StartupPublicEvidenceRef`, `StartupCurrentSelector`.
- Loader: `loadPublishedSnapshot`, `loadPublishedSnapshotById`, `loadCurrentSelector`, `buildPublishedSnapshotRegistry`, `parseStartupPublishedSnapshot`.
- Query: `buildStartupList`, `queryStartups`, `getStartupBySlug`, `getStartupById`.
- Aggregators: `aggregateOrgRelationCounts` (VIZ01), `aggregateOrgGeographyIncidence` (VIZ02), `aggregateDirectGsdActivityCounts` (VIZ03), `aggregateDirectOrganizationStatusCounts` (VIZ04).
- Stats: `computeStartupStats`.
- Validator: `scripts/validate-startup-data.ts` (`computeSnapshotChecksum`, parse Zod de todos os snapshots publicados). **`PENDING`:** `npm run data:validate` não executado (`node_modules` ausente). Digest independente = `INDEPENDENT_DIGEST_MATCH` (Checkpoint 1).
- Taxonomias: `taxonomies.ts` — `relationship`, geografia, confidence, `organizationStatus`, `currentGsdActivity`, `assetRole`, `operationalStatus`, `organizationType`, `publicationState`, product stage, source type, evidence role, coverage status.

Home `source.ts` / `claim.ts` **não** são o Observatório (`loadHomeEvidence.ts:1-2`).

---

## 6. Organização e assessment (estado real)

`FACT`: organização publicada = elemento de `organizations` validado por `publishedOrganizationSchema` (`publishedOrganization.ts:10-36`).

`FACT`: assessment = elemento de `relevanceAssessments` = `PublishedGSDRelevanceAssessment` (`publishedRelations.ts:35-61`). Não se chama `OrganizationAssessment` no código.

`INFERENCE` (fatos: IDs persistidos entre 5C e 5D nos testes inspecionados `directGsd.5d.test.ts:168-180`; um arquivo por snapshot): o assessment é a **interpretação vigente dentro de um snapshot**, não um log de eventos. Nova versão exige novo arquivo.

`FACT`: `productsOrPrograms` existe como array vazio no corrente (`ecosystem-…json:1860`). Schema em `publishedRelations.ts:63-74`. Limitação editorial: “Ativos e programas ainda não estão modelados como entidades estruturadas separadas.” (`ecosystem-…json:17`).

---

## 7. IDs e ligação

| Entidade      | Padrão                           | Evidência                        |
| ------------- | -------------------------------- | -------------------------------- |
| Snapshot      | `^snap-[a-z0-9-]+$`              | `publishedSnapshot.ts:39`        |
| Org           | `^org-[a-z0-9-]+$`               | `publishedOrganization.ts:11`    |
| Assessment    | `^rel-[a-z0-9-]+$`               | `publishedRelations.ts:37`       |
| Source        | `^sps-[a-z0-9-]+$`               | `publishedRelations.ts:78`       |
| Product       | `^prd-[a-z0-9-]+$`               | `publishedRelations.ts:64`       |
| Slug          | `^[a-z0-9]+(?:-[a-z0-9]+)*$`     | `publishedOrganization.ts:12-15` |
| Evidence join | `sourceId` + `role` + `locator?` | `publishedRelations.ts:16-20`    |

Ligação org←assessment: `assessment.organizationId` (`publishedRelations.ts:38`).<br />
Ligação assessment→source: `evidenceRefs[].sourceId` (`publishedRelations.ts:48`).<br />
Ligação produto→org: `product.organizationId` (`publishedRelations.ts:65`).

`FACT`: produção **não** chama `editorialIdToOrgId` / `globalEditorialIdToOrgId` / `directEditorialIdToOrgId`. Os únicos imports de `*Lineage` no app estão em testes (`brazilIndirect.5b.test.ts:5`; `globalIndirect.5c.test.ts:10`; `directGsd.5d.test.ts:9`).

Prefixos observados no corrente: `org-gsd-br-*` (33), `org-gsdi-*` (59), `org-gsd-dir-*` (28); `rel-gsd-br-*` (33), `rel-gsdi-*` (60), `rel-gsd-dir-*` (28). Saventic: uma org `org-gsd-br-002` (`ecosystem-…json:51`) e dois assessments `rel-gsd-br-002` (`:1883`) + `rel-gsdi-002` (`:2623`).

---

## 8. Provenance e histórico

Envelope do corrente (`ecosystem-…json:1-7`): `id`, `schemaVersion` `1.1.0`, `period` `2026-08`, `generatedAt`/`publishedAt` `2026-08-24T14:10:00.000Z`, `protocolVersion` `startup-public-cumulative-direct-v1`, `previousSnapshotId` `snap-indirect-cumulative-2026-08-18`.

Cadeia: empty → brazil-indirect → indirect-cumulative → ecosystem-cumulative-direct.

Protocolos nos assessments (observados): `startup-public-brazil-indirect-v1`, `startup-public-global-indirect-v1`, `startup-public-direct-global-v1`.

Org: `firstDiscoveredAt`, `lastReviewedAt` (`publishedOrganization.ts:33-34`). Assessment: `assessedAt`, `protocolVersion` (`publishedRelations.ts:49-50`). Source: `accessedAt`; `publishedAt` opcional e **ausente** no corrente.

Não há `validFrom`/`validTo`, `sourceRuns` nem log de campo. Sobrescrita de um `rel-*` **dentro** do mesmo arquivo apagaria o wording anterior desse snapshot. Histórico observável = arquivo imutável anterior.

`checksum` (`ecosystem-…json:6903`): SHA-256 canônico excluindo o próprio campo (`validate-startup-data.ts:42-47`, `10_Contrato_Dados_Observatorio_Startups.md` § Checksum). Ver `INVARIANTS.md` INV-CHK-1.

---

## 9. Validação humana

`FACT`: Observatório **não** tem `approvedForPublication`, `ReviewDecision` nem revisor. `publicationState` só admite `'published'` (`taxonomies.ts:151-152`; `publishedOrganization.ts:35`).

`FACT`: Home `Claim.approvedForPublication` existe em outro domínio (`src/schemas/claim.ts:49`).

`lastReviewedAt` / `assessedAt` são datas de proveniência, não um workflow humano tipado. `PENDING`: se registram revisão humana.

---

## 10. Fronteira publicação vs upstream/staging

| Classe                | Artefatos                                                      | Por quê                                            |
| --------------------- | -------------------------------------------------------------- | -------------------------------------------------- |
| Publicação corrente   | `current.json` + `ecosystem-cumulative-direct-2026-08-24.json` | Página chama `loadPublishedSnapshot()`             |
| Registry publicado    | 3 snapshots históricos                                         | glob eager `loadPublishedSnapshot.ts:13-16`        |
| Runtime de publicação | schemas, taxonomias, loaders, aggregators                      | importados pela página/componentes                 |
| Upstream in-repo      | `*Lineage.ts`                                                  | só testes; UI não importa                          |
| Fora do Git           | zips/CSV de scouting                                           | não encontrados; changelog não é prova de conteúdo |
| Outra publicação      | `sources.json`, `claims.json`, clínicos, socio                 | `loadHomeEvidence` / `loadAnalysisEvidence`        |
| Fixtures              | `tests/fixtures/startups/`                                     | glob exclui                                        |

`ResearchRun` / `ChangeSet` / staging: `NOT_OBSERVED` como tipos ou dados. Testes e2e inspecionados afirmam ausência no bundle (`tests/e2e/startups.spec.ts:28-29`) — `verification_status = NOT_EXECUTED_IN_7B_0`.

---

## 11. Dependências concretas do frontend

Página: `index.astro` → snapshot, `isEmpty`, `publishedAt` (data), coverage (após A30_ECHO), `StartupExplorer`, `ObservatoryAnalytics`, `StartupCoverageNotice`.

Explorer (`StartupExplorer.tsx`): query default `''`; filtros `[]`; sort `'name-asc'`; `queryStartups`; cards; drawer por slug no **conjunto filtrado**.

Campos de card (`StartupCard.tsx`): `preferredName`, `operationalStatus`, `description`, `relations`, `geographies`, `confidences` (badge omite `not-assigned` — `StartupBadges.tsx:35-36`).

Drawer (`StartupDetail.tsx`): assessments + `directContext` (indication, assetOrProgram, modality, developmentStage, organizationStatus, currentGsdActivity, assetRole); produtos ou copy de vazio (`:185-189`); website se presente; `StartupEvidenceList`.

Filtros UI: relation, geography, confidence, operationalStatus (`StartupFilters.tsx`). `gsdRefs` / `clinicalNeedRefs` / `socioeconomicNeedRefs` existem em `queryStartups.ts:31-33,126-147` e **não** na UI.

`PENDING_7A_COPY`: `A30_ECHO` em `index.astro:19-28`.

---

## 12. Reprodução do freeze, charts e checksum

Coleções do corrente (arrays, não o objeto `counts`): organizations 120, relevanceAssessments 121, publicSources 217, productsOrPrograms 0 (`ecosystem-…json:23-26` declara o mesmo; Checkpoint 1 reproduziu `length`).

Schema deriva `counts.directGsd/adjacentGsd/…` **por assessment** (`publishedSnapshot.ts:142-147,212-223`).

| Saída | Unidade                                        | Resultado           | Evidência da regra                    |
| ----- | ---------------------------------------------- | ------------------- | ------------------------------------- |
| VIZ01 | org × Set(relationship)                        | 81 / 28 / 11 / 0    | `aggregateObservatoryCharts.ts:56-75` |
| VIZ02 | org × Set(geo); bothCount caveat               | 88 / 33 / overlap 1 | `:78-106`                             |
| VIZ03 | assessment `direct-gsd` × `currentGsdActivity` | 13 / 4 / 11         | `:115-136`                            |
| VIZ04 | assessment `direct-gsd` × `organizationStatus` | 8 / 9 / 9 / 2       | `:139-160`                            |

`FACT`: `counts.adjacentGsd` = 82 (`ecosystem-…json:27`) porque Saventic tem dois assessments `adjacent-gsd` (`:1883-1886`, `:2623-2626`). VIZ01 conta a org uma vez. Não é erro de dado. Ver `DERIVATION_MAP.md`.

Checksum declarado `4e72dfe49fce8b06ac8ad1379cf7cc9dc83943b56d969b15693d6bacbd3fe75c` (`ecosystem-…json:6903`).

| Verificação                        | Status                                                        |
| ---------------------------------- | ------------------------------------------------------------- |
| Algoritmo no validator             | `validate-startup-data.ts:42-47`                              |
| `npm run data:validate`            | `PENDING` / `VALIDATOR_NOT_EXECUTED` (`node_modules` ausente) |
| Digest independente (Checkpoint 1) | `INDEPENDENT_DIGEST_MATCH`                                    |

Testes Vitest/e2e: inspecionados, **não executados** (`NOT_EXECUTED_IN_7B_0`). Não se declara PASS.

---

## 13. Nove casos sensíveis

Wording **literal** do snapshot corrente. Os quatro eixos permanecem separados: `organization.operationalStatus` ≠ `directContext.organizationStatus` ≠ `currentGsdActivity` ≠ `assetRole`.

Todos os nove: 1 org + 1 assessment `direct-gsd` + `geographicScopes: ["global"]` + `confidence: "not-assigned"` + `evidenceRefs: []` + sem produtos + sem sources ligadas + `organizationType: "unconfirmed"` + `publicationState: "published"` + `protocolVersion: "startup-public-direct-global-v1"`.

### Cometa — `org-gsd-dir-004` / `rel-gsd-dir-004`

- Org `ecosystem-…json:1424-1435`. preferredName “Cometa Therapeutics”. Sem website/ano/sede.
- `operationalStatus`: `identity-unresolved` (`:1429`)
- description (`:1430`): “GSD Ib — CMT-101 AAV gene therapy — AAV gene therapy”
- Assessment `:4389-4410`. rationale (`:4397`): “Relação direta com GSD Ib associada a CMT-101 AAV gene therapy.”
- `organizationStatus`: `identity-unresolved`; `currentGsdActivity`: `confirmed-current`; `assetRole`: `developer`
- indication: “GSD Ib”; assetOrProgram: “CMT-101 AAV gene therapy”; modality: “AAV gene therapy”
- developmentStage: “preclinical (STTR Phase I: dose-finding, biodistribution, pre-IND)”

### Maze — `org-gsd-dir-014` / `rel-gsd-dir-014`

- Org `:1598-1609`. preferredName “Maze Therapeutics”. website `https://mazetx.com/` (não é evidenceRef — assessment `:4639`).
- `operationalStatus`: `public` (`:1603`)
- description (`:1604`): “GSD II / Pompe — MZE001 (now S-606001 at Shionogi) — small molecule substrate reduction”
- Assessment `:4629-4650`. rationale (`:4637`): “Relação direta com GSD II / Pompe associada a MZE001 (now S-606001 at Shionogi).”
- `organizationStatus`: `public-biotech`; `currentGsdActivity`: `historical-only`; `assetRole`: `historical-owner`
- indication: “GSD II / Pompe”; assetOrProgram: “MZE001 (now S-606001 at Shionogi)”; modality: “small molecule substrate reduction”
- developmentStage: “Phase 1 completed under Maze; Phase 2 Esprit recruiting under Shionogi”
- Shionogi não é organização neste snapshot.

### Valerion — `org-gsd-dir-020` / `rel-gsd-dir-020`

- Org `:1704-1718`. preferredName “Valerion Therapeutics”. Sem website. `foundedYear`: 2010. `headquarters.country`: “United States”.
- `operationalStatus`: `acquired-or-inactive` (`:1709`)
- description (`:1710`): “GSD II / LOPD — VAL-1221 — antibody-enzyme fusion ERT”
- Assessment `:4773-4794`. rationale (`:4781`): “Relação direta com GSD II / LOPD associada a VAL-1221.”
- `organizationStatus`: `acquired-or-inactive`; `currentGsdActivity`: `historical-only`; `assetRole`: `historical-owner`
- indication: “GSD II / LOPD”; assetOrProgram: “VAL-1221”; modality: “antibody-enzyme fusion ERT”
- developmentStage: “Phase 1/2 terminated 2020 (NCT02898753); successor Parasail, LLC holds VAL-1221”
- Ligação com Parasail é texto, não FK.

### Actus — `org-gsd-dir-016` / `rel-gsd-dir-016`

- Org `:1634-1648`. preferredName “Actus Therapeutics”. Sem website. `foundedYear`: 2017. `headquarters.country`: “United States”.
- `operationalStatus`: `acquired-or-inactive` (`:1639`)
- description (`:1640`): “GSD II / LOPD — ACTUS-101 / ACT-101 / AAV2/8-LSPhGAA — AAV gene therapy”
- Assessment `:4677-4698`. rationale (`:4685`): “Relação direta com GSD II / LOPD associada a ACTUS-101 / ACT-101 / AAV2/8-LSPhGAA.”
- `organizationStatus`: `acquired-or-inactive`; `currentGsdActivity`: `historical-only`; `assetRole`: `acquired-entity`
- indication: “GSD II / LOPD”; assetOrProgram: “ACTUS-101 / ACT-101 / AAV2/8-LSPhGAA”; modality: “AAV gene therapy”
- developmentStage: “Phase 1 completed; program discontinued by Bayer/AskBio in favor of AB-1009”

### AskBio — `org-gsd-dir-017` / `rel-gsd-dir-017`

- Org `:1651-1666`. preferredName “AskBio” (`:1653`). website `https://www.askbio.com/`. `foundedYear`: 2001. `headquarters.country`: “United States”.
- `operationalStatus`: `acquired-or-inactive` (`:1656`)
- description (`:1657`): “GSD II / LOPD — AB-1009 (PROGRESS-GT LOPD); historical ACTUS-101 — AAV gene therapy”
- Assessment `:4701-4722`. rationale (`:4709`): “Relação direta com GSD II / LOPD associada a AB-1009 (PROGRESS-GT LOPD); historical ACTUS-101.”
- `organizationStatus`: `acquired-or-inactive`; `currentGsdActivity`: `confirmed-current`; `assetRole`: `developer`
- indication: “GSD II / LOPD”; assetOrProgram: “AB-1009 (PROGRESS-GT LOPD); historical ACTUS-101”; modality: “AAV gene therapy”
- developmentStage: “Phase 1/2 recruiting under Bayer subsidiary (NCT07282847); first participant dosed 2026-05-11”
- Status corporativo adquirido/inativo não colapsa com atividade GSD atual.

### Reneo — `org-gsd-dir-025` / `rel-gsd-dir-025`

- Org `:1791-1805`. preferredName “Reneo Pharmaceuticals”. `foundedYear`: 2014. Sem website. `headquarters.country`: “United States”.
- `operationalStatus`: `acquired-or-inactive` (`:1796`)
- description (`:1797`): “GSD V / McArdle (historical) — REN001 (mavodelpar) oral PPARδ agonist; Phase 1b McArdle NCT04226274 — small molecule; PPARδ agonist; metabolic modulator”
- Assessment `:4893-4914`. rationale (`:4901`): “Relação direta com GSD V / McArdle (historical) associada a REN001 (mavodelpar) oral PPARδ agonist; Phase 1b McArdle NCT04226274.”
- `organizationStatus`: `acquired-or-inactive`; `currentGsdActivity`: `historical-only`; `assetRole`: `acquired-entity`
- indication: “GSD V / McArdle (historical)”; assetOrProgram: “REN001 (mavodelpar) oral PPARδ agonist; Phase 1b McArdle NCT04226274”; modality: “small molecule; PPARδ agonist; metabolic modulator”
- developmentStage: “Phase 1b COMPLETED 2021-10-11; company stated 2022 it will not pursue Phase 2 McArdle; all mavodelpar development suspended Dec 2023 after PMM STRIDE failure”

### AUG — `org-gsd-dir-027` / `rel-gsd-dir-027`

- Org `:1826-1841`. preferredName “AUG Therapeutics”. website `https://www.augtx.com/`. `foundedYear`: 2020. `headquarters.country`: “United States”.
- `operationalStatus`: `private` (`:1831`)
- description (`:1832`): “GSD XIV / PGM1-CDG — AUG-801 / AVTX-801 oral D-galactose substrate replacement (medical-grade); historical CERC-801 ultra-pure D-galactose — substrate replacement; D-galactose”
- Assessment `:4941-4962`. rationale (`:4949`): “Relação direta com GSD XIV / PGM1-CDG associada a AUG-801 / AVTX-801 oral D-galactose substrate replacement (medical-grade); historical CERC-801 ultra-pure D-galactose.”
- `organizationStatus`: `private-startup`; `currentGsdActivity`: `current-uncertain`; `assetRole`: `outlicensed`
- Label `outlicensed`: “Licenciado a terceiro” (`taxonomies.ts:96`)
- indication: “GSD XIV / PGM1-CDG”; assetOrProgram: “AUG-801 / AVTX-801 oral D-galactose substrate replacement (medical-grade); historical CERC-801 ultra-pure D-galactose”; modality: “substrate replacement; D-galactose”
- developmentStage: “Phase 2b NCT05402332 NOT_YET_RECRUITING (estimated start 2026-10-01); academic sponsor not AUG”

### Parasail — `org-gsd-dir-028` / `rel-gsd-dir-028`

- Org `:1844-1857`. preferredName “Parasail, LLC”. Sem website/ano. `headquarters.country`: “United States”.
- `operationalStatus`: `identity-unresolved` (`:1849`)
- description (`:1850`): “GSD II / LOPD (VAL-1221 origin); current EAP is Lafora (boundary) — VAL-1221 antibody-enzyme fusion (Pompe origin); Lafora EAP NCT05930223 — antibody-enzyme fusion ERT”
- Assessment `:4965-4986`. rationale (`:4973`): “Relação direta com GSD II / LOPD (VAL-1221 origin); current EAP is Lafora (boundary) associada a VAL-1221 antibody-enzyme fusion (Pompe origin); Lafora EAP NCT05930223.”
- `organizationStatus`: `identity-unresolved`; `currentGsdActivity`: `current-uncertain`; `assetRole`: `license-holder` (não `owner`)
- indication: “GSD II / LOPD (VAL-1221 origin); current EAP is Lafora (boundary)”; assetOrProgram: “VAL-1221 antibody-enzyme fusion (Pompe origin); Lafora EAP NCT05930223”; modality: “antibody-enzyme fusion ERT”
- developmentStage: “Pompe Phase 1/2 terminated 2020 under Valerion; Parasail seeking further Pompe development per secondary; no 2026 Pompe NCT posted. Lafora EAP NCT05930223 Available.”
- Mesmo token textual VAL-1221 que Valerion; sem entidade Asset compartilhada.

### Kriya — `org-gsd-dir-026` / `rel-gsd-dir-026`

- Org `:1808-1823`. preferredName “Kriya Therapeutics”. website `https://kriyatherapeutics.com/`. `foundedYear`: 2019. `headquarters.country`: “United States”.
- `operationalStatus`: `private` (`:1813`)
- description (`:1814`): “GSD IX γ2 / PHKG2 (historical lead); GSD IX a2 / PHKA2; GSD VI / PYGL — preclinical AAV gene therapy for GSD IX γ2 (PHKG2) with related GSD IX a2 (PHKA2) and GSD VI (PYGL) plasmid programs; no public asset code — AAV gene therapy”
- Assessment `:4917-4938`. rationale (`:4925`): “Relação direta com GSD IX γ2 / PHKG2 (historical lead); GSD IX a2 / PHKA2; GSD VI / PYGL associada a preclinical AAV gene therapy for GSD IX γ2 (PHKG2) with related GSD IX a2 (PHKA2) and GSD VI (PYGL) plasmid programs; no public asset code.”
- `organizationStatus`: `private-startup`; `currentGsdActivity`: `current-uncertain`; `assetRole`: `historical-association-ownership-unverified`
- indication: “GSD IX γ2 / PHKG2 (historical lead); GSD IX a2 / PHKA2; GSD VI / PYGL”
- assetOrProgram: “preclinical AAV gene therapy for GSD IX γ2 (PHKG2) with related GSD IX a2 (PHKA2) and GSD VI (PYGL) plasmid programs; no public asset code”
- modality: “AAV gene therapy”
- developmentStage: “preclinical 2022-2024 (sponsored research + company ASGCT 2023); 2026 public pipeline status unresolved”
- **Não** usa `historical-owner`. Label: “Relação histórica; titularidade não estabelecida” (`taxonomies.ts:94`). Comentário de taxonomia distingue Maze/Valerion vs Kriya (`taxonomies.ts:72-75`).

Participação nas derivações: os nove entram em VIZ01 `direct-gsd`, VIZ03 e VIZ04 (28 diretos). Website, se houver, é seção de detalhe, não evidência GSD.

---

## 14. Lacunas e conflitos

- `CONFLICT` documental vs código: `docs/implementation/03_Modelo_de_Dados_e_Rastreabilidade.md` descreve `excluded`, `claimRefs`, confidence sem `not-assigned`, IDs `snp-` — o schema vigente diverge. O snapshot corrente **não** viola o schema Zod atual.
- `gsdRefs` 121/121 vazios; tipos clínicos `gsd-ia` etc. existem em `src/data/clinical/gsd-types.json` sem FK.
- `clinicalNeedRefs` `PAG-*` nos indiretos sem entidade alvo versionada.
- `sector` / `industry` / `headquarters.region|city` / `evidenceRefs.locator` / `source.publishedAt|notes`: schema opcional, **NOT_OBSERVED** no corrente.
- `PENDING_7A_COPY`: A30_ECHO.
- `PENDING`: `npm run data:validate` e testes não executados.

---

## 15. Índice de evidências

| Símbolo / chave                         | Onde                                                |
| --------------------------------------- | --------------------------------------------------- |
| `loadPublishedSnapshot`                 | `src/lib/startups/loadPublishedSnapshot.ts:61`      |
| `import.meta.glob` snapshots            | `loadPublishedSnapshot.ts:13-16`                    |
| `startupPublishedSnapshotSchema`        | `src/schemas/startups/publishedSnapshot.ts:37`      |
| `publishedOrganizationSchema`           | `src/schemas/startups/publishedOrganization.ts:10`  |
| `publishedGSDRelevanceAssessmentSchema` | `src/schemas/startups/publishedRelations.ts:35`     |
| `publishedDirectContextSchema`          | `publishedRelations.ts:23-33`                       |
| `aggregateOrgRelationCounts`            | `src/lib/startups/aggregateObservatoryCharts.ts:57` |
| `computeSnapshotChecksum`               | `scripts/validate-startup-data.ts:43`               |
| `A30_ECHO`                              | `src/pages/inovacao/startups/index.astro:19`        |
| `currentSnapshotId`                     | `src/data/startups/published/current.json:2`        |
| Snapshot canônico `id`                  | `.../ecosystem-cumulative-direct-2026-08-24.json:1` |
| `counts`                                | mesmo arquivo `:22-32`                              |
| `checksum`                              | mesmo arquivo `:6903`                               |
| `productsOrPrograms`                    | mesmo arquivo `:1860`                               |
| Saventic org/assessments                | `:51`, `:1883`, `:2623`                             |
| Nove casos                              | §13 deste arquivo                                   |
| `DIRECT_GSD_EDITORIAL_IDS`              | `src/data/startups/directGsdLineage.ts:2`           |
| Claim Home                              | `src/schemas/claim.ts:19`                           |

Inventário campo a campo: `ENTITY_FIELD_INVENTORY.csv`. Relações: `RELATIONSHIP_MAP.md`. Derivações: `DERIVATION_MAP.md`. Invariantes: `INVARIANTS.md`. Perguntas: `OPEN_MODELING_QUESTIONS.md`.

---

## 16. Comandos read-only (7B.0)

| Comando                                            | Resultado essencial                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `git rev-parse HEAD`                               | `fb9f15d79252c5950d29fe36c5b45ab437613c41`                                               |
| `git status --short` (CP0–CP2)                     | vazio                                                                                    |
| Reprodução de coleções/VIZ (Node descartável, CP1) | 120/121/217/0; VIZ 81/28/11/0; 88/33/1; 13/4/11; 8/9/9/2                                 |
| Digest SHA-256 canônico independente (CP1)         | `INDEPENDENT_DIGEST_MATCH` com `:6903`                                                   |
| `npm run data:validate`                            | **não executado** (`tsx`/ `node_modules` ausentes). `PENDING` / `VALIDATOR_NOT_EXECUTED` |
| Vitest / e2e / axe                                 | **não executados** (`NOT_EXECUTED_IN_7B_0`)                                              |

Nenhuma recomendação de stack. Nenhum banco criado.
