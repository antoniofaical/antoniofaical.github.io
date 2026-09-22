# RELATIONSHIP_MAP — modelo relacional observado (7B.0)

**Draft Checkpoint 3.** Presente apenas; não é um ERD futuro. Sem recomendação de stack.

Rótulos: `FACT` | `INFERENCE` | `PENDING`.

**Camada raw não versionada:** não há tabelas de aquisição bruta no Git. As relações abaixo são do snapshot publicado e do código que o lê.

---

## 1. Estruturas físicas

| Estrutura                         | Persistência                      | Owner                 | Evidência                                                              |
| --------------------------------- | --------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| `StartupCurrentSelector`          | `current.json`                    | publicação (ponteiro) | `publishedSnapshot.ts:244-248`; `current.json:1-4`                     |
| `StartupPublishedSnapshot`        | `published/snapshots/*.json`      | publicação            | `publishedSnapshot.ts:37-62`                                           |
| `PublishedOrganization`           | `snapshot.organizations[]`        | snapshot              | `publishedOrganization.ts:10-36`                                       |
| `PublishedGSDRelevanceAssessment` | `snapshot.relevanceAssessments[]` | snapshot              | `publishedRelations.ts:35-61`                                          |
| `PublishedDirectContext`          | nested opcional no assessment     | assessment            | `publishedRelations.ts:23-33`                                          |
| `StartupPublicEvidenceRef`        | nested em assessment ou produto   | assessment/produto    | `publishedRelations.ts:16-20`                                          |
| `StartupPublicSource`             | `snapshot.publicSources[]`        | snapshot              | `publishedRelations.ts:76-97`                                          |
| `PublishedProductOrProgram`       | `snapshot.productsOrPrograms[]`   | snapshot              | `publishedRelations.ts:63-74`; corrente `[]` em `ecosystem-…json:1860` |
| `StartupListItem`                 | memória                           | `buildStartupList`    | `queryStartups.ts:15-24,42-81`                                         |

Home `Source` (`src-*`) e `Claim` (`clm-*`) **não** participam destas relações (`loadHomeEvidence.ts:1-3`).

---

## 2. Relações observadas

### R1. Selector → Snapshot

- Lados: `currentSnapshotId` → `snapshot.id`
- Cardinalidade imposta: 1 seletor → 1 id existente no registry (`loadPublishedSnapshot.ts:61-64`; validator `validate-startup-data.ts:80-84`)
- Observada: `snap-ecosystem-cumulative-direct-2026-08-24` (`current.json:2`; snapshot L1)
- Chave: string `snap-…`
- Ownership: seletor não contém o corpo (`ADR-0005`; `10_Contrato_Dados_Observatorio_Startups.md` tabela Artefatos)
- Confiança: `FACT`

### R2. Snapshot → Organization (contenção)

- 1 snapshot * N orgs (`publishedSnapshot.ts:56`)
- Observado corrente: 120 (`ecosystem-…json:23`)
- IDs únicos e slugs únicos: schema `publishedSnapshot.ts:64-82`
- Ownership: snapshot
- `FACT`

### R3. Snapshot → Assessment (contenção)

- 1 * N (`publishedSnapshot.ts:58`); observado 121 (`ecosystem-…json:25`)
- `FACT`

### R4. Snapshot → PublicSource (contenção)

- 1 * N (`publishedSnapshot.ts:59`); observado 217 (`ecosystem-…json:26`)
- `FACT`

### R5. Snapshot → ProductOrProgram (contenção)

- 1 * N (`publishedSnapshot.ts:57`); observado 0 (`ecosystem-…json:1860`, `:24`)
- Schema existe; instâncias ausentes. `FACT` da coleção vazia; `INFERENCE` de que Asset/Program estruturado não está materializado (limitação `:17`)

### R6. Assessment → Organization (FK)

- Lados: `relevanceAssessments.organizationId` → `organizations.id`
- Imposta: todo assessment referencia org existente; toda org tem ≥1 assessment (`publishedSnapshot.ts:124-130,150-157`)
- Observada: 119 orgs com 1 assessment; 1 org (Saventic `org-gsd-br-002`) com 2 (`:51`, `:1883`, `:2623`)
- Direção: assessment aponta para org; org não guarda array de ids
- Opcionalidade: assessment obrigatório para org publicada
- Integridade: ENFORCED_IN_CODE (Zod); teste de órfão inspecionado em `startups.test.ts:56-58` (`NOT_EXECUTED_IN_7B_0`)
- `FACT`

### R7. EvidenceRef → PublicSource (FK)

- `evidenceRefs[].sourceId` → `publicSources.id` (`publishedRelations.ts:17`; check `publishedSnapshot.ts:132-139`)
- Imposta para refs presentes; direto pode ter `evidenceRefs: []` (`publishedRelations.ts:53-60`)
- Observada: 93 assessments com ≥1 ref; 28 diretos com `[]`; 0 refs órfãs (Checkpoint 1)
- Uma source pode servir N assessments: `sps-gsd-br-002-02` em Saventic BR e Global (`:1899`, `:2637`, definição `:5008`)
- `FACT`

### R8. Product → Organization (FK)

- `organizationId` (`publishedRelations.ts:65`; check `:170-176`)
- Observada: 0 produtos. Relação **imposta no schema, não instanciada**. `FACT`

### R9. Product → PublicSource (FK)

- `evidenceRefs` min 1 no schema de produto (`publishedRelations.ts:73`)
- Não observada (coleção vazia). `NOT_OBSERVED`

### R10. Assessment contém DirectContext

- Nested, não entidade com id (`publishedRelations.ts:51,23-33`)
- Observada: 28/28 `direct-gsd` têm o objeto; 0/93 indiretos
- Schema: opcional. Não ENFORCED para diretos. `OBSERVED_IN_DATA`
- Subcampos `organizationStatus`, `currentGsdActivity`, `assetRole` são **três relações semânticas distintas**, não colapsáveis. `FACT` (`taxonomies.ts:40-97`; `publishedRelations.ts:25-27`)

### R11. Snapshot.previousSnapshotId → Snapshot

- Opcional (`publishedSnapshot.ts:45-49`)
- Corrente → `snap-indirect-cumulative-2026-08-18` (`ecosystem-…json:7`)
- Integridade referencial **não** verificada pelo Zod contra o registry (só regex). `PENDING` se o id apontado deve existir no glob
- `FACT` do valor; `INFERENCE` da cadeia empty→5B→5C→5D a partir dos campos `previousSnapshotId` dos arquivos + changelogs (changelogs não são prova da cadeia física além dos JSON)

### R12. ListItem join (derivado, não armazenado)

- `buildStartupList` (`queryStartups.ts:42-81`): org + assessments filtrados + products filtrados + sources via union de evidenceRefs
- Cardinalidade de leitura: 1 list item por org do snapshot
- Sources omitidas se `sourceId` não achar mapa (filter Boolean) — no corrente 0 missings
- `FACT`

### R13. Lineage editorial → org id (upstream)

- `GSD-BR-*` → `org-gsd-br-*` (`brazilIndirectLineage.ts:38-42`)
- `GSDI-*` → `org-gsdi-*` exceto `GSDI-002` → `org-gsd-br-002` (`globalIndirectLineage.ts:87-96`)
- `GSD-DIR-*` → `org-gsd-dir-*` (`directGsdLineage.ts:33-37`)
- Demonstrável **só** porque testes importam lineage e comparam com snapshot (`brazilIndirect.5b.test.ts:21-27`; `globalIndirect.5c.test.ts:65-90`; `directGsd.5d.test.ts:142-154`). UI não importa. Testes `NOT_EXECUTED_IN_7B_0`.
- Scouting zip: **não** no repo. Semelhança de conteúdo **não** usada.
- Publicação: `UPSTREAM_ONLY`

---

## 3. Cardinalidade org–assessment–geo–relation

| Padrão                           | Imposto       | Observado corrente             |
| -------------------------------- | ------------- | ------------------------------ |
| Org : assessment                 | 1 : 1..*      | 119 : 1 e 1 : 2                |
| Assessment : relation            | 1 : 1 enum    | 121                            |
| Assessment : geographicScopes    | 1 : 1..*      | **todos** length 1             |
| Org : relations distintas (Set)  | não exclusiva | 0 orgs com relations mistas    |
| Org : geos distintas (Set)       | não exclusiva | 1 org (Saventic) brazil+global |
| Assessment não-direto : evidence | 1 : 1..*      | 93                             |
| Assessment direto : evidence     | 1 : 0..*      | 28 × 0                         |
| Source : assessments             | 1 : 0..*      | 216×1, 1×2                     |

---

## 4. Duplicação / denormalização (não fundir)

| Grupo             | Campos                                                                    | Por que não consolidar                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DUP-STATUS-CORP` | `organization.operationalStatus` vs `directContext.organizationStatus`    | Enums diferentes (`taxonomies.ts:41-46` vs `:123-134`); AskBio: ambos `acquired-or-inactive` mas `currentGsdActivity` = `confirmed-current` (`:1656`, `:4715-4716`) |
| `DUP-ACTIVITY`    | `operationalStatus` vs `currentGsdActivity`                               | Cometa: identity-unresolved vs confirmed-current (`:1429`, `:4404`)                                                                                                 |
| `DUP-MODALITY`    | `assessment.modalities[]` vs `directContext.modality`                     | Array vs string; valores frequentemente iguais nos diretos, consumidores diferentes                                                                                 |
| `DUP-ASSET-TEXT`  | `organization.description` vs `indication` / `assetOrProgram` / rationale | Texto editorial repetido; não é o mesmo campo físico                                                                                                                |
| `DUP-COUNT-ADJ`   | `counts.adjacentGsd` vs VIZ01 adjacent                                    | Unidade assessment vs org (`publishedSnapshot.ts:143` vs `aggregateObservatoryCharts.ts:56-75`)                                                                     |
| `DUP-VAL-1221`    | Valerion `assetOrProgram` vs Parasail `assetOrProgram`                    | Mesmo token textual; **sem** ID de ativo (`:4791`, `:4983`)                                                                                                         |

---

## 5. Órfãos e ambiguidades

- Órfãos de FK no corrente: **não observados** (Checkpoint 1).
- Sources não referenciadas: 0.
- Orgs diretas sem source: 28, permitido se exclusivamente `direct-gsd` (`publishedSnapshot.ts:200-209`).
- `gsdRefs[]` sem alvo: 121 vazios; tipos clínicos existem em outro JSON sem join.
- `clinicalNeedRefs` `PAG-*`: strings sem entidade no app.
- Ativo compartilhado (VAL-1221, ACTUS-101): só wording. `PENDING` Q9/Q10.

---

## 6. Relação armazenada vs inferida

| Relação                                               | Tipo                                                |
| ----------------------------------------------------- | --------------------------------------------------- |
| organizationId, sourceId, previousSnapshotId, seletor | armazenada                                          |
| ListItem.relations / geographies / confidences        | inferida (Set)                                      |
| VIZ01–04, counts.*                                    | derivada                                            |
| “Parasail sucessor de Valerion”                       | inferida de texto (`:4793`)                         |
| Lineage GSD-DIR → org-gsd-dir                         | armazenada em TS de teste/upstream, não no snapshot |

---

## 7. Hipóteses de entidade do handoff

| Hipótese                              | Veredito                       | Evidência                                                       |
| ------------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| Organization                          | `CONFIRMED`                    | `PublishedOrganization`                                         |
| OrganizationAssessment                | `PARTIALLY_SUPPORTED`          | Nome físico `PublishedGSDRelevanceAssessment`                   |
| Source                                | `PARTIALLY_SUPPORTED`          | `StartupPublicSource` `sps-*` ≠ Home `src-*`                    |
| Evidence                              | `PARTIALLY_SUPPORTED`          | Join `evidenceRefs`, sem entidade Evidence                      |
| Claim                                 | `NOT_OBSERVED` no Observatório | `claim.ts` é Home; `rationale` não tem `clm-*`                  |
| GSDRelationship                       | `PARTIALLY_SUPPORTED`          | Campo `relationship`                                            |
| Geography                             | `PARTIALLY_SUPPORTED`          | `geographicScopes[]`                                            |
| CorporateStatus                       | `PARTIALLY_SUPPORTED`          | Dois campos físicos: `operationalStatus` e `organizationStatus` |
| ActivityStatus                        | `PARTIALLY_SUPPORTED`          | `currentGsdActivity`                                            |
| Asset                                 | `PARTIALLY_SUPPORTED`          | Texto `assetOrProgram`; coleção produto vazia                   |
| Program                               | `PARTIALLY_SUPPORTED`          | Mesmo campo `assetOrProgram`                                    |
| OrganizationAssetRole                 | `PARTIALLY_SUPPORTED`          | `assetRole`                                                     |
| OrganizationSourceLink                | `PARTIALLY_SUPPORTED`          | `evidenceRefs`                                                  |
| PublicationState                      | `PARTIALLY_SUPPORTED`          | Enum de um valor `published`                                    |
| Observation / ResearchRun / ChangeSet | `NOT_OBSERVED`                 | Ausentes como tipos/dados                                       |

Nenhum veredito acima é schema aprovado para o futuro.
