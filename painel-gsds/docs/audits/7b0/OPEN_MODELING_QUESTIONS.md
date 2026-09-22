# OPEN_MODELING_QUESTIONS — 7B.0

**Draft Checkpoint 3.** Perguntas, não propostas de schema, banco ou stack.

Status típicos: `UNRESOLVED` | `PENDING` | `PENDING_7A_COPY`.

Camada raw de aquisição **não** está versionada neste repositório.

---

## Q01 — O que é hoje `Organization`

- **Questão:** A estrutura `PublishedOrganization` é identidade persistente, ficha editorial, ou ambos?
- **Motivo:** IDs `org-*` estáveis entre snapshots (testes 5D inspecionados) vs `organizationType` 120× `unconfirmed` e description editorial.
- **Fatos:** schema `publishedOrganization.ts:10-36`; 120 orgs no corrente (`ecosystem-…json` coleção); prefixos `org-gsd-br-*` / `org-gsdi-*` / `org-gsd-dir-*`.
- **Inferências:** é a identidade da **projeção pública**, não um cadastro operacional pré-publicação (lineage não entra na UI).
- **Evidência ausente:** entidade pré-snapshot no repo; camada raw.
- **Risco de decidir cedo:** tratar aliases/type como censo.
- **Decisão humana:** o que deve permanecer estável se o preferredName mudar.
- **Etapa potencialmente bloqueada:** prova de equivalência dos 120 ids (Q14).
- **Status:** `UNRESOLVED`

## Q02 — Natureza de assessment

- **Questão:** `PublishedGSDRelevanceAssessment` é estado, evento, interpretação ou versão?
- **Motivo:** um registro vigente por `rel-*` dentro do arquivo; Saventic tem dois assessments simultâneos (`:1883`, `:2623`).
- **Fatos:** schema `publishedRelations.ts:35-61`; IDs indiretos copiados 5C→5D segundo teste inspecionado `directGsd.5d.test.ts:168-180`.
- **Inferências:** interpretação vigente no snapshot; histórico = arquivo anterior, não evento append-only.
- **Evidência ausente:** log de revisão do mesmo `rel-*`.
- **Risco:** modelar como fato atômico ou como série temporal sem evidência.
- **Decisão humana:** se um novo recorte edita o mesmo `rel-*` ou mint novo id.
- **Etapa bloqueada:** histórico (Q08–Q10).
- **Status:** `UNRESOLVED`

## Q03 — Ligação fonte–claim

- **Questão:** Como fonte se liga a afirmação no Observatório?
- **Motivo:** não há `Claim` `clm-*` no snapshot; há `evidenceRefs` no assessment.
- **Fatos:** `publishedRelations.ts:16-20,48`; Home `claim.ts:19-51` é outro domínio (`loadHomeEvidence.ts:1-2`).
- **Inferências:** a unidade afirmada publicamente é o assessment (`rationale` + taxonomias), não um Claim separado.
- **Evidência ausente:** tabela claim do Observatório.
- **Risco:** fundir Home e Observatório.
- **Decisão humana:** se rationale deve virar claim endereçável.
- **Etapa bloqueada:** evidência histórica dos diretos (hoje `evidenceRefs=[]`).
- **Status:** `UNRESOLVED`

## Q04 — Múltiplas fontes para o mesmo fato

- **Questão:** Uma afirmação aceita N fontes?
- **Motivo:** 67 assessments com 2+ refs; `sps-gsd-br-002-02` em dois assessments Saventic (`:1899`, `:2637`).
- **Fatos:** array `evidenceRefs`; schema não limita unicidade source↔assessment.
- **Inferências:** sim, no modelo atual, ao nível do assessment.
- **Evidência ausente:** conflito tipado entre fontes.
- **Risco:** assumir 1:1.
- **Decisão humana:** n/a imediata.
- **Etapa bloqueada:** Q11.
- **Status:** parcialmente respondida como fato de cardinalidade; semântica de “mesmo fato” `UNRESOLVED`

## Q05 — Dado bruto versus interpretação

- **Questão:** Onde está o bruto?
- **Motivo:** JSON publicado já é curado.
- **Fatos:** scouting zips não estão no Git; `*Lineage.ts` só em testes; campos do snapshot classificados sem `RAW_DATA` (ver inventário).
- **Inferências:** a camada raw **não** está versionada no repo.
- **Evidência ausente:** dumps de aquisição.
- **Risco:** chamar o snapshot de raw.
- **Decisão humana:** se raw deve ser ingestado sem contaminar publicação (Q15).
- **Etapa bloqueada:** qualquer pipeline de refresh.
- **Status:** `UNRESOLVED` quanto ao destino; fato da ausência no Git

## Q06 — Campos derivados

- **Questão:** Quais derivados devem ser persistidos vs calculados?
- **Motivo:** `counts.*` persistidos (por assessment) e VIZ calculados (por org) divergem em adjacent 82 vs 81.
- **Fatos:** `publishedSnapshot.ts:212-223`; `aggregateObservatoryCharts.ts:56-75`; `DERIVATION_MAP.md` D10/D14.
- **Inferências:** persistir só uma unidade sem documentar a outra gera gráfico errado.
- **Evidência ausente:** n/a para o presente.
- **Risco:** “corrigir” 82 para 81 no JSON.
- **Decisão humana:** não nesta rodada.
- **Etapa bloqueada:** regeneração determinística (Q13).
- **Status:** fato da divergência de unidade; persistência futura `UNRESOLVED` (sem proposta)

## Q07 — Campos editoriais

- **Questão:** O que é copy editorial vs dado estruturado?
- **Motivo:** coverage, rationale, description, `assetOrProgram`, labels; A30_ECHO reescreve coverage na página.
- **Fatos:** `index.astro:19-28`; `ecosystem-…json:9-20`; `PENDING_7A_COPY`.
- **Inferências:** parte da “verdade” pública vive no front, não só no JSON.
- **Evidência ausente:** dono de copy vs dono de snapshot.
- **Risco:** 7A e 7B divergirem.
- **Decisão humana:** 7A sobre A30_ECHO.
- **Etapa bloqueada:** 7A copy.
- **Status:** `PENDING_7A_COPY`

## Q08 — O que precisa de histórico

- **Questão:** Quais mudanças devem preservar estado anterior?
- **Motivo:** snapshots imutáveis existem; campos não têm versão.
- **Fatos:** `previousSnapshotId` `:7`; testes de hash de arquivo inspecionados (`directGsd.5d.test.ts:183-191`) `NOT_EXECUTED_IN_7B_0`.
- **Inferências:** hoje o histórico é o arquivo inteiro.
- **Evidência ausente:** requisitos de granularidade (campo vs snapshot).
- **Risco:** editar in-place o corrente e perder wording dos nove casos.
- **Decisão humana:** granularidade.
- **Etapa bloqueada:** Q09–Q10, Q14.
- **Status:** `UNRESOLVED`

## Q09 — Nome, aquisição, status, atividade, ownership, licensing, programas

- **Questão:** Como o presente representa essas mudanças?
- **Motivo:** AskBio acquired-or-inactive + confirmed-current; Maze historical-owner + texto Shionogi; Parasail license-holder vs Valerion historical-owner do mesmo VAL-1221 textual.
- **Fatos:** quatro campos separados (INV-TAX-1); wording §13 de `CURRENT_DATA_ARCHITECTURE.md`.
- **Inferências:** mudanças vivem em enums + prosa, sem grafo de eventos nem ID de ativo.
- **Evidência ausente:** entidade Asset/Program; org sucessora.
- **Risco:** colapsar eixos; promover Parasail a owner.
- **Decisão humana:** se sucessão deve ser relação.
- **Etapa bloqueada:** modelagem futura (não nesta rodada).
- **Status:** `UNRESOLVED`

## Q10 — Preservação da evidência histórica

- **Questão:** Onde fica a evidência de um assessment direto hoje sem URL?
- **Motivo:** 28 `evidenceRefs=[]` (`INV-EV-1`); testes 5D inspecionados proíbem `sps-gsd-dir-*`.
- **Fatos:** `directGsd.5d.test.ts:142-155`; assessments `:4639` etc.
- **Inferências:** evidência de diretos, se existir, está fora da projeção (e fora do Git).
- **Evidência ausente:** raw/handoff.
- **Risco:** fabricar `publicSources` a partir de website (proibido em `AGENTS.md` e testes).
- **Decisão humana:** se diretos podem permanecer sem fonte pública.
- **Etapa bloqueada:** Q03, Q15.
- **Status:** `UNRESOLVED`

## Q11 — Conflitos entre fontes

- **Questão:** Há estrutura de conflito?
- **Motivo:** N refs sem objeto de discordância; um `confidence` por assessment.
- **Fatos:** `evidenceRefs` array; sem campo de conflito.
- **Inferências:** conflito, se houver, está linearizado no `rationale`.
- **Evidência ausente:** casos de sources contraditórias tipadas.
- **Risco:** inventar resolução automática.
- **Decisão humana:** n/a agora.
- **Etapa bloqueada:** curadoria.
- **Status:** `UNRESOLVED`

## Q12 — Validação humana

- **Questão:** Quais campos são reservados à validação humana?
- **Motivo:** Observatório sem `approvedForPublication`; Home tem (`claim.ts:49`).
- **Fatos:** `publicationState` só `published` (`taxonomies.ts:151-152`); `lastReviewedAt`/`assessedAt` são datas.
- **Inferências:** a publicação já ocorreu; o ato humano não está modelado aqui.
- **Evidência ausente:** ReviewDecision / revisor.
- **Risco:** usar `lastReviewedAt` como proxy de aprovação.
- **Decisão humana:** se o Observatório precisa de campos reservados.
- **Etapa bloqueada:** pipeline humano (Q15).
- **Status:** `UNRESOLVED`

## Q13 — Regeneração determinística do snapshot

- **Questão:** O corrente pode ser regenerado byte-a-byte?
- **Motivo:** checksum canônico definido; gerador não está no repo.
- **Fatos:** algoritmo `validate-startup-data.ts:31-47`; `VALIDATOR_NOT_EXECUTED`; `INDEPENDENT_DIGEST_MATCH`; arrays não são sortados na canonicalização.
- **Inferências:** verificar o digest ≠ reproduzir a geração.
- **Evidência ausente:** script de build do snapshot 5D.1.
- **Risco:** “regenerar” a partir de lineage e obter 120 orgs diferentes.
- **Decisão humana:** o que conta como prova (campo checksum vs hash de arquivo vs gerador).
- **Etapa bloqueada:** Q14.
- **Status:** `UNRESOLVED`; `PENDING` validator

## Q14 — Prova futura de equivalência dos 120 registros

- **Questão:** Como provar que “os mesmos 120” persistiram após uma migração?
- **Motivo:** ids org/rel observados; testes 5D inspecionados fixam 120/121/217 e ids indiretos.
- **Fatos:** `directGsd.5d.test.ts:116-140`; INV-ID-*; Saventic dual assessment.
- **Inferências:** equivalência por id é o lastro atual, não por nome.
- **Evidência ausente:** execução dos testes nesta rodada; gerador.
- **Risco:** reordenar arrays e falhar checksum; fundir Saventic assessments.
- **Decisão humana:** chave canônica (id vs slug vs nome).
- **Etapa bloqueada:** qualquer export.
- **Status:** `UNRESOLVED`; testes `NOT_EXECUTED_IN_7B_0`

## Q15 — Integração futura de scouting/enrichment sem contaminar publicação

- **Questão:** Como candidatos entram sem virar base pública?
- **Motivo:** ADR-0005 e `AGENTS.md` excluem ResearchRun/staging/CSV bruto; lineage existe só como mapa de ids em testes.
- **Fatos:** UI não importa `*Lineage.ts`; glob só `published/snapshots/*.json`; 12 GSDI não públicos listados em `globalIndirectLineage.ts:72-85`.
- **Inferências:** a fronteira atual é “não importar”; não há staging implementado (`NOT_OBSERVED`).
- **Evidência ausente:** artefatos de scouting no Git.
- **Risco:** copiar CSV para `src/data`.
- **Decisão humana:** autorização explícita (já na política vigente).
- **Etapa bloqueada:** pipeline; não é objeto da 7B.0.
- **Status:** `UNRESOLVED` como mecanismo; `FACT` da exclusão atual

---

## Índice das 15 perguntas centrais

| #   | Tema                         | Status                                        |
| --- | ---------------------------- | --------------------------------------------- |
| 1   | Organization                 | UNRESOLVED                                    |
| 2   | Assessment                   | UNRESOLVED                                    |
| 3   | Fonte–claim                  | UNRESOLVED                                    |
| 4   | Múltiplas fontes             | cardinalidade FACT; semântica UNRESOLVED      |
| 5   | Bruto vs interpretação       | raw ausente no Git                            |
| 6   | Derivados                    | unidades FACT; persistência futura UNRESOLVED |
| 7   | Editoriais                   | PENDING_7A_COPY                               |
| 8   | Histórico                    | UNRESOLVED                                    |
| 9   | Mudanças de status/ownership | UNRESOLVED                                    |
| 10  | Evidência histórica          | UNRESOLVED                                    |
| 11  | Conflitos                    | UNRESOLVED                                    |
| 12  | Validação humana             | UNRESOLVED                                    |
| 13  | Regeneração                  | UNRESOLVED + PENDING validator                |
| 14  | Equivalência 120             | UNRESOLVED + testes não executados            |
| 15  | Scouting sem contaminação    | fronteira FACT; mecanismo UNRESOLVED          |

Nenhuma pergunta acima é respondida com escolha de PostgreSQL, SQLite, ORM ou schema futuro.
