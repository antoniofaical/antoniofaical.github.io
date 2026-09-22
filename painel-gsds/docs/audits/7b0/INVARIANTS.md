# INVARIANTS — regras observadas, impostas e não executadas (7B.0)

**Draft Checkpoint 3.**

## Convenção desta rodada

- `TESTED` = existe teste **codificado** que imporia a regra.
- `verification_status` desta rodada, para todo teste/validator não corrido: `NOT_EXECUTED_IN_7B_0`.
- **Não** se declara `PASS`.
- Checksum: distinguir `INDEPENDENT_DIGEST_MATCH` (digest reproduzido fora do script npm) de `VALIDATOR_NOT_EXECUTED` (`npm run data:validate` não rodou).
- Demais categorias: `ENFORCED_IN_CODE`, `OBSERVED_IN_DATA`, `DOCUMENTED_ONLY`, `ASSUMED`, `VIOLATED`.

Dependências **não** foram instaladas. `painel-gsds/node_modules` ausente.

---

## INV-ID-1 — unicidade de organization.id

- **Declaração:** nenhum `organizations[].id` duplicado no snapshot.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Escopo:** todo snapshot parseado por Zod / registry
- **Evidência:** `publishedSnapshot.ts:66-73`; fixture `tests/fixtures/startups/invalid-duplicate-ids.json`; `startups.test.ts:51-53`
- **Validator/teste/comando:** Zod `superRefine`; `parseStartupPublishedSnapshot` no teste citado
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado. Observação read-only do corrente: 120 ids únicos (Checkpoint 1)
- **Contraexemplos:** nenhum no corrente
- **Consequência:** export determinístico e joins por id
- **Pendência:** executar testes quando houver `node_modules` autorizado

## INV-ID-2 — unicidade de organization.slug

- **Declaração:** slugs únicos.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** snapshot
- **Evidência:** `publishedSnapshot.ts:75-82`
- **Validator/teste/comando:** Zod
- **verification_status:** `NOT_EXECUTED_IN_7B_0` (sem teste unitário específico localizado além do schema)
- **Resultado atual:** não executado; 120 slugs no corrente
- **Contraexemplos:** não observados
- **Consequência:** drawer/busca por slug
- **Pendência:** n/a

## INV-ID-3 — unicidade assessment.id e source.id

- **Declaração:** `relevanceAssessments[].id` e `publicSources[].id` únicos.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** snapshot
- **Evidência:** `publishedSnapshot.ts:92-101,114-121`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; 121 e 217 únicos observados
- **Contraexemplos:** não
- **Consequência:** FKs
- **Pendência:** n/a

## INV-ID-4 — padrões de prefixo

- **Declaração:** `org-`, `rel-`, `sps-`, `snap-`, `prd-` via regex.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** parse
- **Evidência:** `publishedOrganization.ts:11`; `publishedRelations.ts:37,64,78`; `publishedSnapshot.ts:39`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado
- **Contraexemplos:** n/a
- **Consequência:** colisão com Home `src-`/`clm-` evitada por prefixo
- **Pendência:** n/a

## INV-FK-1 — assessment → organization

- **Declaração:** `organizationId` existe em `organizations`.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Escopo:** snapshot
- **Evidência:** `publishedSnapshot.ts:124-130`; `startups.test.ts:56-58`; `invalid-orphan-refs.json`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; 0 órfãos observados no corrente
- **Contraexemplos:** fixture inválida (não publicada)
- **Consequência:** integridade do explorer
- **Pendência:** executar testes

## INV-FK-2 — evidenceRef → publicSource

- **Declaração:** `evidenceRefs[].sourceId` ∈ `publicSources`.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** assessments e produtos
- **Evidência:** `publishedSnapshot.ts:132-139,177-185`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; 0 missings observados
- **Contraexemplos:** não no corrente
- **Consequência:** lista de fontes
- **Pendência:** n/a

## INV-CARD-1 — org publicada tem ≥1 assessment

- **Declaração:** toda org em `organizations` aparece em algum `organizationId`.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** snapshot
- **Evidência:** `publishedSnapshot.ts:150-157`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; 0 orgs sem assessment
- **Contraexemplos:** não
- **Consequência:** VIZ01 loop de orgs
- **Pendência:** n/a

## INV-EV-1 — evidence mínima por tipo de relation

- **Declaração:** `relationship !== 'direct-gsd'` exige `evidenceRefs.length >= 1`; direto pode `[]`.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Escopo:** cada assessment
- **Evidência:** `publishedRelations.ts:53-60`; `startups.test.ts:81-105`; `directGsd.5d.test.ts:149-153,398-400`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; observado 93 com ≥1 e 28 `[]`
- **Contraexemplos:** não no corrente
- **Consequência:** 28 diretos sem fonte pública ligada
- **Pendência:** executar testes

## INV-EV-2 — org não exclusivamente direta precisa de fonte

- **Declaração:** se a org não é só `direct-gsd` e não liga source via assessment/produto, falha.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** org
- **Evidência:** `publishedSnapshot.ts:188-209`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; 28 exclusivamente diretas sem fonte, permitido
- **Contraexemplos:** não
- **Consequência:** publicação de diretos sem `sps-*`
- **Pendência:** n/a

## INV-EV-3 — website institucional não é evidence `supports`

- **Declaração (teste 5D):** diretos têm `evidenceRefs=[]`; não há `sps-gsd-dir-*`; website de Maze não vira source `supports`.
- **Categoria:** `TESTED` + `OBSERVED_IN_DATA`
- **Escopo:** snapshot 5D.1
- **Evidência:** `directGsd.5d.test.ts:49-60,142-166,376-395`; Maze website `:1609` vs evidence `:4639`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; JSON inspecionado concorda
- **Contraexemplos:** n/a no corrente
- **Consequência:** evidência GSD ≠ site
- **Pendência:** executar testes

## INV-CNT-1 — `counts.*` iguais às derivadas por assessment

- **Declaração:** `counts.organizations` = `organizations.length`, etc.; facetas relation/geo incrementadas **por assessment**.
- **Categoria:** `ENFORCED_IN_CODE`
- **Escopo:** snapshot
- **Evidência:** `publishedSnapshot.ts:142-147,212-232`
- **verification_status:** `NOT_EXECUTED_IN_7B_0` (Zod no loader/validator)
- **Resultado atual:** não executado; corrente `counts.adjacentGsd=82` (`ecosystem-…json:27`) = 82 assessments adjacent
- **Contraexemplos:** não (schema impede mismatch)
- **Consequência:** 82 ≠ VIZ01 81 é **consistente** com duas unidades
- **Pendência:** n/a

## INV-VIZ-1 — VIZ01 conta org × Set(relation)

- **Declaração:** barras 81/28/11/0 no snapshot corrente; Saventic conta 1 em adjacent.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Escopo:** `aggregateOrgRelationCounts` + snapshot atual
- **Evidência:** `aggregateObservatoryCharts.ts:56-75`; `aggregateObservatoryCharts.test.ts:28-44,77-90`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; reprodução independente CP1 = 81/28/11/0
- **Contraexemplos:** n/a
- **Consequência:** não usar `counts.adjacentGsd` no gráfico
- **Pendência:** executar testes

## INV-VIZ-2 — VIZ02 geo por org + bothCount

- **Declaração:** 88 global / 33 brazil / both 1.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Evidência:** `aggregateObservatoryCharts.ts:78-106`; `aggregateObservatoryCharts.test.ts:46-51`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; CP1 reproduziu
- **Contraexemplos:** n/a
- **Consequência:** overlap não é barra
- **Pendência:** executar testes

## INV-VIZ-3 — VIZ03/04 isolam directContext

- **Declaração:** só assessments `direct-gsd`; ignoram `operationalStatus` e indiretos; 13/4/11 e 8/9/9/2; missingCount.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Evidência:** `aggregateObservatoryCharts.ts:109-160`; `aggregateObservatoryCharts.test.ts:54-75,143-168`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; CP1 reproduziu; missingCount observado 0
- **Contraexemplos:** n/a
- **Consequência:** não colapsar `operationalStatus` com `organizationStatus`
- **Pendência:** executar testes

## INV-PUB-1 — publicationState somente `published`

- **Declaração:** enum de um valor; org com outro estado falha.
- **Categoria:** `ENFORCED_IN_CODE`
- **Evidência:** `taxonomies.ts:151-152`; `publishedSnapshot.ts:83-89`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; 120× `published`
- **Contraexemplos:** n/a
- **Consequência:** sem rascunho no snapshot público
- **Pendência:** n/a

## INV-PUB-2 — seletor aponta para snapshot registrado

- **Declaração:** `currentSnapshotId` ∈ registry.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Evidência:** `loadPublishedSnapshot.ts:61-64`; `validate-startup-data.ts:80-84`; `startups.test.ts:164-171`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; seletor L2 = id L1 do corrente
- **Contraexemplos:** n/a
- **Consequência:** build quebra se seletor órfão
- **Pendência:** executar testes / validator

## INV-PUB-3 — fixtures fora do glob

- **Declaração:** registry de produção não contém ids synth/fixture.
- **Categoria:** `ENFORCED_IN_CODE` + `TESTED`
- **Evidência:** glob `published/snapshots/*.json` (`loadPublishedSnapshot.ts:13-16`); `startups.test.ts:192-200`; validator nome de arquivo (`validate-startup-data.ts:86-88`)
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado
- **Contraexemplos:** n/a
- **Consequência:** fronteira publicação
- **Pendência:** executar testes

## INV-CHK-1 — checksum canônico

- **Declaração:** se `checksum !== 'reserved-not-computed'`, valor = SHA-256 do JSON canônico **sem** o campo `checksum`.
- **Categoria:** `ENFORCED_IN_CODE` (script `data:validate`)
- **Escopo:** snapshots publicados
- **Evidência:** `validate-startup-data.ts:42-72`; `10_Contrato_Dados_Observatorio_Startups.md` § Checksum; campo `ecosystem-…json:6903`
- **Validator/teste/comando tentado:** `cd painel-gsds && npm run data:validate`
- **verification_status:** `VALIDATOR_NOT_EXECUTED` (`PENDING`: `node_modules` / `tsx` ausentes; instalar dependências proibido)
- **Digest independente (CP1):** `INDEPENDENT_DIGEST_MATCH` com `4e72dfe49fce8b06ac8ad1379cf7cc9dc83943b56d969b15693d6bacbd3fe75c`
- **Resultado atual:** **não** se declara PASS do validator. Digest independente coincide. Empty snapshot usa placeholder (`initial-empty.json`).
- **Contraexemplos:** n/a para o corrente
- **Consequência:** prova de equivalência futura do corpo; arrays não são reordenados na canonicalização
- **Pendência:** `PENDING` executar `npm run data:validate` sem instalar nesta rodada

## INV-SNAP-1 — imutabilidade histórica (hash de arquivo)

- **Declaração (testes 5C/5D):** SHA-256 **do arquivo** (não o campo checksum) de brazil-indirect, empty e indirect-cumulative permanece o valor fixo no teste.
- **Categoria:** `TESTED`
- **Evidência:** `globalIndirect.5c.test.ts:175-181`; `directGsd.5d.test.ts:183-191`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado
- **Nota:** hash de arquivo ≠ campo `checksum` canônico
- **Consequência:** regressão de mutação in-place
- **Pendência:** executar testes

## INV-TAX-1 — quatro eixos não colapsam

- **Declaração:** `operationalStatus`, `organizationStatus`, `currentGsdActivity`, `assetRole` são campos/enums distintos.
- **Categoria:** `ENFORCED_IN_CODE` (schemas separados) + `TESTED` (casos 5D) + `OBSERVED_IN_DATA`
- **Evidência:** `publishedOrganization.ts:28`; `publishedRelations.ts:25-27`; `taxonomies.ts:40-148`; AskBio `:1656` vs `:4715-4717`; Cometa `:1429` vs `:4403-4405`
- **verification_status:** `NOT_EXECUTED_IN_7B_0` para os testes
- **Resultado atual:** JSON inspecionado mantém a separação
- **Contraexemplos:** n/a
- **Consequência:** VIZ03 vs VIZ04 vs badge de card
- **Pendência:** executar testes 5D

## INV-SENS-1 — Maze / Valerion `historical-owner`; Kriya não

- **Declaração:** `rel-gsd-dir-014` e `rel-gsd-dir-020` têm `assetRole=historical-owner`; `rel-gsd-dir-026` tem `historical-association-ownership-unverified`; Kriya não usa wording de titular/patente no blob de teste.
- **Categoria:** `TESTED` + `OBSERVED_IN_DATA`
- **Evidência:** `directGsd.5d.test.ts:62-78,271-315`; snapshot `:4645`, `:4789`, `:4933`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; wording JSON conferido no CP2/CP3
- **Contraexemplos:** n/a
- **Consequência:** copy e papel no ativo
- **Pendência:** executar testes

## INV-SENS-2 — Parasail não `owner`; AUG `outlicensed`

- **Declaração:** `rel-gsd-dir-028.assetRole !== 'owner'` (teste recusa `owner`); observado `license-holder`. AUG `outlicensed` com label contendo “terceiro”.
- **Categoria:** `TESTED` + `OBSERVED_IN_DATA`
- **Evidência:** `directGsd.5d.test.ts:92-97,257-264,438-444`; `:4961`, `:4981`; `taxonomies.ts:89-96`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; JSON `:4981` = `license-holder`
- **Contraexemplos:** n/a
- **Consequência:** VAL-1221 sem titularidade estruturada
- **Pendência:** executar testes

## INV-SENS-3 — diretos sem overclaim `acquired` / `apparently-active`

- **Declaração:** orgs `org-gsd-dir-*` não usam `operationalStatus` `acquired` nem `apparently-active`; distribuição 8/9/9/2 em private/public/acquired-or-inactive/identity-unresolved.
- **Categoria:** `TESTED` + `OBSERVED_IN_DATA`
- **Evidência:** `directGsd.5d.test.ts:80-84,208-223,405-416`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado; CP2 observou a distribuição
- **Contraexemplos:** n/a
- **Consequência:** badge de card ≠ VIZ04 enum
- **Pendência:** executar testes

## INV-LINE-1 — lineage 5B/5C/5D casa com ids públicos (testes)

- **Declaração:** listas editoriais mapeiam para os ids do snapshot correspondente; `GSDI-002` → `org-gsd-br-002`; 12 GSDI não públicos ausentes.
- **Categoria:** `TESTED`
- **Evidência:** `brazilIndirect.5b.test.ts:21-27`; `globalIndirect.5c.test.ts:65-101`; `directGsd.5d.test.ts:142-154`
- **verification_status:** `NOT_EXECUTED_IN_7B_0`
- **Resultado atual:** não executado
- **Contraexemplos:** n/a
- **Consequência:** fronteira upstream; UI não importa lineage
- **Pendência:** executar testes; scouting zip continua fora do Git

## INV-GSDREF-1 — gsdRefs vazios

- **Declaração:** schema permite array de strings; corrente 121/121 `[]`.
- **Categoria:** `OBSERVED_IN_DATA` (não ENFORCED vazio)
- **Evidência:** `publishedRelations.ts:42`; snapshot assessments (ex. `:4394`)
- **verification_status:** n/a (observação de dado)
- **Resultado atual:** vazio
- **Contraexemplos:** n/a
- **Consequência:** sem eixo GSD canônico
- **Pendência:** `OPEN_MODELING_QUESTIONS` Q5/Q6

## INV-DOC-1 — contrato v0.3 vs schema vigente

- **Declaração documental:** `03_Modelo_de_Dados_e_Rastreabilidade.md` §6.3 inclui `excluded`, confidence sem `not-assigned`, produto com `claimRefs`, IDs `snp-`.
- **Categoria:** `DOCUMENTED_ONLY` em **conflito** com o código (`startupRelationValues` sem `excluded` — `taxonomies.ts:6-11`; `publishedRelations.ts:73` usa `evidenceRefs`)
- **Não** classificado `VIOLATED` no snapshot (o snapshot obedece o Zod atual, não o doc legado)
- **Evidência:** `03_Modelo_de_Dados_e_Rastreabilidade.md:268-315`; schemas citados
- **verification_status:** n/a
- **Resultado atual:** divergência documental
- **Contraexemplos:** o próprio schema implementado
- **Consequência:** não usar o v0.3 como prova do presente
- **Pendência:** fora de 7B.0

## INV-PREV-1 — previousSnapshotId existe no glob

- **Declaração possível:** o id anterior deveria resolver no registry.
- **Categoria:** `ASSUMED` / `PENDING`
- **Evidência:** valor presente `ecosystem-…json:7`; Zod só checa regex (`publishedSnapshot.ts:45-49`), **não** existência no glob
- **verification_status:** n/a
- **Resultado atual:** o id aponta para arquivo existente, mas isso é observação, não ENFORCED
- **Contraexemplos:** n/a neste freeze
- **Consequência:** cadeia histórica pode quebrar silenciosamente no schema
- **Pendência:** Q13

---

## Resumo de execução 7B.0

| Comando                                               | verification_status                  |
| ----------------------------------------------------- | ------------------------------------ |
| `npm run data:validate`                               | `VALIDATOR_NOT_EXECUTED` (`PENDING`) |
| Digest SHA-256 independente do algoritmo do validator | `INDEPENDENT_DIGEST_MATCH`           |
| `vitest` / testes `*.test.ts`                         | `NOT_EXECUTED_IN_7B_0`               |
| Playwright e2e                                        | `NOT_EXECUTED_IN_7B_0`               |

Nenhum `PASS` atribuído.
