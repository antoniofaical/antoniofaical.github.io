# DERIVATION_MAP — saídas públicas e transformações (7B.0)

**Draft Checkpoint 3.** Se a saída é lida diretamente, `IDENTITY / NO_TRANSFORMATION`. Sem stack futura.

Camada raw **não** versionada: as entradas abaixo já são a projeção publicada.

Toda linha de status `FACT` aponta evidência.

---

## D01 — Seletor → snapshot corrente

| Coluna                | Valor                                                                 |
| --------------------- | --------------------------------------------------------------------- |
| output                | Snapshot usado pela página                                            |
| consumer              | `loadPublishedSnapshot` → `index.astro:14`                            |
| input artifact(s)     | `current.json`; `published/snapshots/*.json`                          |
| input field(s)        | `currentSnapshotId`; `snapshot.id`                                    |
| transformation        | Lookup no registry por id (`loadPublishedSnapshot.ts:61-64`)          |
| filters               | nenhum                                                                |
| unknown/null handling | Throw se id ausente (`:52-56`)                                        |
| ordering              | n/a                                                                   |
| determinism risks     | Glob eager inclui históricos no bundle; a página só usa o selecionado |
| evidence              | `loadPublishedSnapshot.ts:1,13-16,46-64`; `current.json:2`            |
| status                | FACT                                                                  |

---

## D02 — Envelope do snapshot na página (datas / vazio)

| Coluna                | Valor                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| output                | `updatedAt`; `isEmpty`; props de empty/coverage                                                           |
| consumer              | `index.astro`                                                                                             |
| input artifact(s)     | snapshot corrente                                                                                         |
| input field(s)        | `publishedAt`; `coverage.status`; `organizations.length`                                                  |
| transformation        | `publishedAt.slice(0, 10)`; `isEmpty = coverage.status==='not-yet-populated' OR organizations.length===0` |
| filters               | se `isEmpty`, não monta explorer nem charts (`index.astro:65-86`)                                         |
| unknown/null handling | corrente não vazio (`coverage.status` `partial`, L10; 120 orgs)                                           |
| ordering              | n/a                                                                                                       |
| determinism risks     | nenhum material                                                                                           |
| evidence              | `index.astro:14-17,65-86`                                                                                 |
| status                | FACT                                                                                                      |

---

## D03 — Coverage exibida (A30_ECHO)

| Coluna                | Valor                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| output                | `coverageSummary`; `coverageLimitations` na UI                                                   |
| consumer              | `StartupCoverageNotice`; `StartupEmptyState`                                                     |
| input artifact(s)     | snapshot `coverage`                                                                              |
| input field(s)        | `coverage.summary`; `coverage.limitations`                                                       |
| transformation        | regex remove frase de “presença no recorte…” do summary; filtra limitations que casam `A30_ECHO` |
| filters               | `A30_ECHO` (`index.astro:19-20,28`)                                                              |
| unknown/null handling | n/a (strings obrigatórias no schema)                                                             |
| ordering              | ordem original das limitations remanescentes                                                     |
| determinism risks     | copy da UI ≠ copy do JSON                                                                        |
| evidence              | `index.astro:19-28`; snapshot L11 e L14                                                          |
| status                | FACT; **`PENDING_7A_COPY`**                                                                      |

Não alterar copy nesta rodada.

---

## D04 — Lista de cards (`StartupListItem`)

| Coluna                | Valor                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| output                | cards: nome, description, badges, botão detalhe                                                            |
| consumer              | `StartupCard.tsx`; lista em `StartupExplorer.tsx:103-110`                                                  |
| input artifact(s)     | snapshot via `queryStartups`                                                                               |
| input field(s)        | `preferredName`, `operationalStatus`, `description`, Sets `relations`/`geographies`/`confidences`          |
| transformation        | `buildStartupList` join + `queryStartups` filtro/sort                                                      |
| filters               | ver D05                                                                                                    |
| unknown/null handling | `ConfidenceBadge` retorna `null` se `not-assigned` (`StartupBadges.tsx:35-36`); website não entra no card  |
| ordering              | default `name-asc` `localeCompare(..., 'pt')` (`queryStartups.ts:84-98,160-167`; `StartupExplorer.tsx:24`) |
| determinism risks     | locale `pt`; empates de nome não têm tie-break por id                                                      |
| evidence              | `queryStartups.ts:42-81,160-167`; `StartupCard.tsx:17-35`                                                  |
| status                | FACT                                                                                                       |

Campos do card **não** usam `directContext.*`.

---

## D05 — Filtros, busca, defaults

| Coluna                | Valor                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| output                | subconjunto de `StartupListItem`                                                                                             |
| consumer              | `StartupExplorer`                                                                                                            |
| input artifact(s)     | snapshot                                                                                                                     |
| input field(s)        | nome, aliases, description, product name/modality, rationale; Sets relation/geo/confidence; `organization.operationalStatus` |
| transformation        | AND entre grupos; OR dentro do grupo (`some`); busca `normalize` NFD+lower (`queryStartups.ts:38-40,103-116`)                |
| filters               | defaults todos `[]` / query `''` = sem filtro (`:88-98`)                                                                     |
| unknown/null handling | arrays vazios = pass-through; aliases vazios ok                                                                              |
| ordering              | `sort` default `name-asc`; opções reviewed-* usam `lastReviewedAt` derivado                                                  |
| determinism risks     | `gsdRefs`/`clinicalNeedRefs`/`socioeconomicNeedRefs` implementados (`:126-147`) e **não** ligados à UI                       |
| evidence              | `StartupExplorer.tsx:14-40`; `StartupFilters.tsx`; `queryStartups.ts:84-169`                                                 |
| status                | FACT                                                                                                                         |

Filtro de relação usa Set por org: “Adjacente” = 81 orgs, não 82 assessments.

---

## D06 — `lastReviewedAt` do list item

| Coluna                | Valor                                                             |
| --------------------- | ----------------------------------------------------------------- |
| output                | `StartupListItem.lastReviewedAt`                                  |
| consumer              | sort reviewed-*; não exibido no card                              |
| input artifact(s)     | org + assessments                                                 |
| input field(s)        | `organization.lastReviewedAt`; `assessment.assessedAt`            |
| transformation        | max lexicográfico ISO date após concat (`queryStartups.ts:67-69`) |
| filters               | n/a                                                               |
| unknown/null handling | schema exige as datas; `at(-1)!` assume não vazio                 |
| ordering              | string sort                                                       |
| determinism risks     | mistura data de org e de assessment                               |
| evidence              | `queryStartups.ts:67-69`                                          |
| status                | FACT                                                              |

---

## D07 — Resumo quantitativo do explorer

| Coluna                | Valor                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| output                | “N organizações nesta base” ou “X de Y no recorte filtrado”; breakdown só com filtro           |
| consumer              | `StartupSummary.tsx`                                                                           |
| input artifact(s)     | snapshot + items filtrados                                                                     |
| input field(s)        | `organizations.length`; Sets relation/geo do item                                              |
| transformation        | `computeStartupStats` (`startupStats.ts:13-44`); breakdown org-level (mesmo espírito VIZ01/02) |
| filters               | `showBreakdown` só se `hasActiveFilters` (`StartupExplorer.tsx:49-58,33`)                      |
| unknown/null handling | n/a                                                                                            |
| ordering              | `Object.entries` (ordem de inserção dos Sets)                                                  |
| determinism risks     | unfiltered **não** mostra 81/28/11 (só total 120)                                              |
| evidence              | `startupStats.ts`; `StartupSummary.tsx:28-47`                                                  |
| status                | FACT                                                                                           |

---

## D08 — Drawer de detalhe

| Coluna                | Valor                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| output                | nome, description, badges, lista de assessments + directContext, produtos, website, fontes                                                                                 |
| consumer              | `StartupDetail.tsx`                                                                                                                                                        |
| input artifact(s)     | `StartupListItem` selecionado **no conjunto filtrado** (`StartupExplorer.tsx:41,113`)                                                                                      |
| input field(s)        | assessments.*, `directContext` sete subcampos, products, website, sources+roles                                                                                            |
| transformation        | IDENTITY dos campos de assessment; labels de taxonomia; evidence flatten (`StartupDetail.tsx:72-87`)                                                                       |
| filters               | `directContext` bloco só se `ctx` truthy (`:131`); website seção só se presente (`:204`); produtos: se length 0, copy estrutural (`:185-189`)                              |
| unknown/null handling | fontes vazias → “Sem fontes públicas vinculadas neste recorte.” (`StartupEvidenceList.tsx:15-16`); URL ausente → “URL não disponível” (`:37-38`); `not-assigned` sem badge |
| ordering              | ordem dos arrays no list item (= ordem no snapshot para assessments da org)                                                                                                |
| determinism risks     | se o item filtrado some, o drawer não resolve por slug global (`getStartupBySlug` existe e a página não usa)                                                               |
| evidence              | `StartupDetail.tsx:105-217`                                                                                                                                                |
| status                | FACT                                                                                                                                                                       |

---

## D09 — Fontes no detalhe

| Coluna                | Valor                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- |
| output                | lista de fontes públicas                                                                  |
| consumer              | `StartupEvidenceList`                                                                     |
| input artifact(s)     | `publicSources` ∩ ids em evidenceRefs de assessments/produtos da org                      |
| input field(s)        | title, publisher, sourceType, url, role, locator                                          |
| transformation        | join; se source ligada sem role match, ainda emite `{source}` (`StartupDetail.tsx:72-87`) |
| filters               | só sources referenciadas pelo item                                                        |
| unknown/null handling | 28 diretos → lista vazia / empty copy                                                     |
| ordering              | ordem de primeira descoberta dos ids                                                      |
| determinism risks     | website institucional **não** entra como source (Maze `:1609` vs evidenceRefs `:4639`)    |
| evidence              | `queryStartups.ts:51-60`; `StartupDetail.tsx:72-87`; `StartupEvidenceList.tsx`            |
| status                | FACT                                                                                      |

---

## D10 — VIZ01 relação com GSD

| Coluna                | Valor                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| output                | barras adjacent 81, direct 28, unconfirmed 11, ecosystem 0                                                            |
| consumer              | `ObservatoryAnalytics` → `StartupBarChart` `viz-01-relations`                                                         |
| input artifact(s)     | snapshot completo (não filtrado)                                                                                      |
| input field(s)        | `relevanceAssessments.relationship`; `organizations.id`                                                               |
| transformation        | Map orgId→Set(relationship); para cada org do array organizations, +1 por tag (`aggregateObservatoryCharts.ts:56-75`) |
| filters               | assessments de orgs não listadas são ignorados no loop de orgs (corrente: 0)                                          |
| unknown/null handling | org sem assessment: skip (`:69`); `ecosystem-support` permanece 0 se nenhum Set o contém                              |
| ordering              | ordem `startupRelationValues` (`ObservatoryAnalytics.tsx:26-30`; `taxonomies.ts:6-11`)                                |
| determinism risks     | **não** usa `counts.adjacentGsd` (82). Saventic duas vezes adjacent → 1 org (`:1883-1886`, `:2623-2626`)              |
| evidence              | `aggregateObservatoryCharts.ts:56-75`; `ObservatoryAnalytics.tsx:21,64-69`                                            |
| status                | FACT                                                                                                                  |

Caveat UI: “Uma organização é contada uma vez em cada relação que possui…” (`ObservatoryAnalytics.tsx:69`).

---

## D11 — VIZ02 geografia

| Coluna                | Valor                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| output                | Global 88, Brasil 33; caveat overlap 1                                                                                                               |
| consumer              | `viz-02-geography`                                                                                                                                   |
| input artifact(s)     | snapshot completo                                                                                                                                    |
| input field(s)        | `geographicScopes`; `organizations.id`                                                                                                               |
| transformation        | Set de geos por org; +1 por geo; `bothCount` se brazil∩global (`:78-106`)                                                                            |
| filters               | n/a                                                                                                                                                  |
| unknown/null handling | min 1 geo no schema                                                                                                                                  |
| ordering              | `startupGeographyValues` brazil, global (`taxonomies.ts:22`)                                                                                         |
| determinism risks     | `counts.brazil/global` (por assessment, `:146-147`) coincidem numericamente com VIZ02 no corrente porque Saventic splita geos; não é a mesma unidade |
| evidence              | `aggregateObservatoryCharts.ts:78-106`; `ObservatoryAnalytics.tsx:22,71-77`                                                                          |
| status                | FACT                                                                                                                                                 |

`bothCount` **não** é barra (`ObservatoryAnalytics.tsx:76`).

---

## D12 — VIZ03 atividade GSD das diretas

| Coluna                | Valor                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------- |
| output                | current 13, uncertain 4, historical 11                                                        |
| consumer              | `viz-03-direct-activity`                                                                      |
| input artifact(s)     | snapshot                                                                                      |
| input field(s)        | assessments `relationship==='direct-gsd'` → `directContext.currentGsdActivity`                |
| transformation        | conta assessments, **não** orgs; missing incrementa `missingCount` e não a barra (`:115-136`) |
| filters               | só `direct-gsd` (`:109-112`)                                                                  |
| unknown/null handling | corrente missingCount=0                                                                       |
| ordering              | `startupDirectGsdActivityValues` (`taxonomies.ts:60-64`)                                      |
| determinism risks     | **não** lê `organization.operationalStatus`                                                   |
| evidence              | `aggregateObservatoryCharts.ts:115-136`; `ObservatoryAnalytics.tsx:23,89-93`                  |
| status                | FACT                                                                                          |

---

## D13 — VIZ04 status corporativo das diretas

| Coluna                | Valor                                                                                                                                                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| output                | private 8, public biotech 9, acquired/inactive 9, unresolved 2                                                                                                                                                                                            |
| consumer              | `viz-04-direct-status`                                                                                                                                                                                                                                    |
| input artifact(s)     | snapshot                                                                                                                                                                                                                                                  |
| input field(s)        | `directContext.organizationStatus` em assessments `direct-gsd`                                                                                                                                                                                            |
| transformation        | analog VIZ03 (`:139-160`)                                                                                                                                                                                                                                 |
| filters               | só diretos                                                                                                                                                                                                                                                |
| unknown/null handling | missingCount; corrente 0                                                                                                                                                                                                                                  |
| ordering              | `startupDirectOrganizationStatusValues` (`taxonomies.ts:41-46`)                                                                                                                                                                                           |
| determinism risks     | **não** usa `operationalStatus` (AskBio `operationalStatus` `acquired-or-inactive` `:1656` e `organizationStatus` `acquired-or-inactive` `:4715` — valores alinhados aqui, mas Cometa mostra o par identity-unresolved / confirmed-current em outro eixo) |
| evidence              | `aggregateObservatoryCharts.ts:139-160`; comentário `:139`                                                                                                                                                                                                |
| status                | FACT                                                                                                                                                                                                                                                      |

---

## D14 — Contagens estruturais `counts.*`

| Coluna                | Valor                                                           |
| --------------------- | --------------------------------------------------------------- |
| output                | 120 / 0 / 121 / 217 e facetas 28 / 82 / 0 / 11 / 33 / 88        |
| consumer              | schema de igualdade; **não** alimenta as barras VIZ             |
| input artifact(s)     | comprimentos das coleções + loop de assessments                 |
| input field(s)        | arrays; `relationship`; `geographicScopes.includes`             |
| transformation        | `publishedSnapshot.ts:212-223` (por **assessment**)             |
| filters               | n/a                                                             |
| unknown/null handling | n/a                                                             |
| ordering              | n/a                                                             |
| determinism risks     | `adjacentGsd` 82 ≠ VIZ01 81                                     |
| evidence              | `publishedSnapshot.ts:142-147,212-223`; `ecosystem-…json:22-32` |
| status                | FACT                                                            |

`productsOrPrograms: 0` = `array.length` de coleção materializada vazia (`:1860`), não campo ausente e não “zero ativos no texto” (28 `assetOrProgram` preenchidos).

---

## D15 — Checksum

| Coluna                | Valor                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| output                | `checksum` hex                                                                                   |
| consumer              | `validate-startup-data.ts`; campo publicado                                                      |
| input artifact(s)     | corpo do snapshot                                                                                |
| input field(s)        | todos exceto `checksum`                                                                          |
| transformation        | canonicalize (sort keys) + SHA-256 utf8 (`validate-startup-data.ts:31-47`)                       |
| filters               | se valor `reserved-not-computed`, não compara (`:65-74`) — caso do empty                         |
| unknown/null handling | n/a                                                                                              |
| ordering              | `localeCompare` nas chaves                                                                       |
| determinism risks     | ordem de arrays **não** é reordenada (só chaves de objeto)                                       |
| evidence              | `validate-startup-data.ts:31-47`; `ecosystem-…json:6903`                                         |
| status                | FACT do algoritmo; verificação: `INDEPENDENT_DIGEST_MATCH`; `VALIDATOR_NOT_EXECUTED` / `PENDING` |

---

## D16 — Labels e aliases de taxonomia

| Coluna                | Valor                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------- |
| output                | rótulos PT na UI                                                                        |
| consumer              | badges, filtros, charts, drawer                                                         |
| input artifact(s)     | `taxonomies.ts`                                                                         |
| input field(s)        | `*Labels` maps                                                                          |
| transformation        | lookup IDENTITY                                                                         |
| filters               | n/a                                                                                     |
| unknown/null handling | enum inválido falha no Zod na carga, não na UI                                          |
| ordering              | ordem dos `*Values` arrays                                                              |
| determinism risks     | `outlicensed` → “Licenciado a terceiro” (`taxonomies.ts:96`); Kriya label longo (`:94`) |
| evidence              | `taxonomies.ts`; `StartupBadges.tsx`; `StartupDetail.tsx:157-174`                       |
| status                | FACT                                                                                    |

---

## D17 — Empty states

| Coluna                | Valor                                                                               |
| --------------------- | ----------------------------------------------------------------------------------- |
| output                | empty de base vs no-results de filtro                                               |
| consumer              | `StartupEmptyState`; `StartupNoResultsState`                                        |
| input artifact(s)     | `isEmpty`; `items.length`; `hasActiveFilters`                                       |
| input field(s)        | coverage; organizations                                                             |
| transformation        | ramificação de UI (`index.astro:65`; `StartupExplorer.tsx:91-101`)                  |
| filters               | n/a                                                                                 |
| unknown/null handling | copy de empty enfatiza que zeros descrevem artefato (`StartupEmptyState.tsx:20-22`) |
| ordering              | n/a                                                                                 |
| determinism risks     | n/a                                                                                 |
| evidence              | arquivos citados                                                                    |
| status                | FACT                                                                                |

---

## Defaults / fallbacks (resumo)

| Superfície              | Default                             |
| ----------------------- | ----------------------------------- |
| sort                    | `name-asc`                          |
| filtros                 | arrays vazios                       |
| query                   | `''`                                |
| confidence badge        | oculto se `not-assigned`            |
| charts                  | snapshot inteiro                    |
| produtos UI             | parágrafo editorial se `[]`         |
| fontes UI               | empty string se 0                   |
| checksum empty snapshot | placeholder `reserved-not-computed` |

Nenhuma destas derivações escolhe banco ou schema futuro.
