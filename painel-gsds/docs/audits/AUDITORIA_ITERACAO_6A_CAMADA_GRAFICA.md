# Auditoria — Iteração 6A · Camada gráfica do GSD Dashboard

**Modo:** auditoria e especificação apenas (sem implementação).  
**Branch:** `cursor/iteracao-6a-auditoria-camada-grafica`  
**Baseline `main`:** `a2fb231ec63ff8041212167b56f8b8e226aa3e22`  
**Snapshot corrente:** `snap-ecosystem-cumulative-direct-2026-08-24`  
**Data da auditoria:** 2026-08-30  
**Ambiente:** profiling em `/tmp` (fora do repositório); nenhum dado/schema/componente alterado.

---

## 1. Baseline

| Item                                              | Valor verificado                                                                                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `HEAD` / `origin/main`                            | `a2fb231ec63ff8041212167b56f8b8e226aa3e22`                                                                                        |
| Worktree                                          | limpo (apenas docs 6A novos ao final)                                                                                             |
| `currentSnapshotId`                               | `snap-ecosystem-cumulative-direct-2026-08-24`                                                                                     |
| organizations                                     | **120**                                                                                                                           |
| relevanceAssessments                              | **121**                                                                                                                           |
| publicSources                                     | **217**                                                                                                                           |
| productsOrPrograms                                | **0**                                                                                                                             |
| directGsd / adjacentGsd / unconfirmed / ecosystem | **28 / 82 / 11 / 0** (por assessment)                                                                                             |
| brazil / global                                   | **33 / 88** (por assessment)                                                                                                      |
| Biblioteca de charts em `package.json`            | **nenhuma**                                                                                                                       |
| Gates baseline                                    | format/lint/typecheck/test(63)/data:validate/build root+subpath — **PASS** (hints Zod deprecated pré-existentes, não bloqueantes) |

Checksum canônico do snapshot (inalterado): `4e72dfe49fce8b06ac8ad1379cf7cc9dc83943b56d969b15693d6bacbd3fe75c`.

---

## 2. Inventário de páginas e componentes

### 2.1 Classificação do que já existe

Não há componente de **quantitative chart** no app. Visualizações atuais:

| Página                              | Componentes / padrões                                                     | Classe                                   |
| ----------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| `/`                                 | `KeyMetric` / `HomeMetrics`                                               | metric card                              |
| `/`                                 | `GlycogenBranchVisual`                                                    | diagram (decorativo)                     |
| `/`                                 | `MechanismToLife`, `ObservedVsNeed`                                       | flow / other                             |
| `/`                                 | `ProblemInOneMinute`, `BrazilOverview`, `HomeMethodology`                 | table/list / other                       |
| `/analises/bases-clinicas/`         | pathway/flow, timeline, órgãos (tabela), patterns                         | flow / timeline / matrix / table/list    |
| `/analises/bases-clinicas/`         | `GSDExplorer`                                                             | explorer                                 |
| `/analises/impacto-socioeconomico/` | `BurdenOverview`, `BurdenPathway`, `CostLayers`, `MarketSegmentMap`, etc. | flow / table/list / metric-like callouts |
| `/inovacao/startups/`               | `StartupCoverageNotice`, `StartupSummary`, `StartupExplorer`              | other / metric card / explorer           |

### 2.2 O que já comunica bem

- Home: quatro métricas com escopo/período/qualificador (`metrics.json`).
- Clínica: diagramas e explorer adequados a material qualitativo/categórico (13 tipos GSD).
- Socioeconômico: camadas e guardrails textuais que **impedem** agregação indevida.
- Observatório: filtros + contagens em `StartupSummary` já expõem totais por relação/geografia no recorte.

### 2.3 Onde gráfico acrescentaria informação

Principalmente no Observatório, acima do explorer: distribuições controladas dos 120 e do subconjunto direto (28), com unidade de análise explícita.

### 2.4 Onde gráfico seria ornamentação

- Comparar estimativas epidemiológicas heterogêneas.
- Empilhar camadas de custo com moedas/perspectivas diferentes.
- Mapas mundiais com HQ majoritariamente ausente.
- Funil de estágio clínico a partir de `developmentStage` free-text.

---

## 3. Perfil quantitativo — Observatório

### 3.1 Organizations (n=120)

| Dimensão            | Distribuição                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `organizationType`  | `unconfirmed` = **120** (100%)                                                                         |
| `operationalStatus` | `apparently-active` 92 · `public` 9 · `acquired-or-inactive` 9 · `private` 8 · `identity-unresolved` 2 |
| website             | preenchido **111** / ausente **9**                                                                     |
| headquarters        | preenchido **29** / ausente **91**                                                                     |
| foundedYear         | preenchido **66** / ausente **54** (min 1993 · max 2026)                                               |

**Split por camada (derivado):**

| Campo               | Diretos (28)                                                                         | Indiretos (92)                |
| ------------------- | ------------------------------------------------------------------------------------ | ----------------------------- |
| HQ preenchido       | 27                                                                                   | 2                             |
| foundedYear         | 25                                                                                   | 41                            |
| website             | 20                                                                                   | 91                            |
| `operationalStatus` | vocabularização 5D (`private`/`public`/`acquired-or-inactive`/`identity-unresolved`) | **todos** `apparently-active` |

### 3.2 RelevanceAssessments (n=121)

| Dimensão                              | Contagem                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| relationship                          | adjacent **82** · direct **28** · relevance-unconfirmed **11** · ecosystem **0** |
| geography (incidência em assessments) | global **88** · brazil **33**                                                    |
| confidence                            | high **53** · medium **40** · not-assigned **28** (todos os diretos) · low **0** |

Assessments por organização:

- 119 orgs com **1** assessment;
- **1** org com **2** assessments: Saventic (`org-gsd-br-002`) — ambas `adjacent-gsd`, uma `brazil` e uma `global`.

`gsdRefs`: **vazios em 121/121** assessments (0 valores canônicos).  
`modalities`: **0** assessments vazias; **113** strings distintas (alta fragmentação free-text).

### 3.3 Tags por organização única (unidade correta para “como as orgs se distribuem”)

| Tag                              | Orgs únicas        |
| -------------------------------- | ------------------ |
| relation `adjacent-gsd`          | **81**             |
| relation `direct-gsd`            | **28**             |
| relation `relevance-unconfirmed` | **11**             |
| Σ relation tags                  | **120** (= n orgs) |
| geography `global`               | **88**             |
| geography `brazil`               | **33**             |
| ambas geographies                | **1** (Saventic)   |
| Σ geography tags                 | **121** (> n orgs) |

**Fato:** neste snapshot, nenhuma organização possui duas _relações distintas_, então as incidências de relação somam 120. O modelo de dados, porém, **permite** múltiplas assessments/relações por org; geografia **não** é exclusiva.

**Implicação para VIZ-01:** agregar como **incidência de relation tags** por `unique_organization` (mesma lógica de VIZ-02). No snapshot auditado: 81 / 28 / 11 / 0. Em snapshots futuros, `sum(incidências)` pode exceder 120 — a agregação não deve assumir exclusividade nem falhar nesse caso.

`StartupSummary` / `computeStartupStats` já contam tags por org filtrada (não assessments): alinhado a incidência por `unique_organization`. Na 6B, `ObservatoryAnalytics` (estático ao snapshot) e `StartupSummary` (reativo ao Explorer) têm papéis distintos — ver especificação.

### 3.4 Subconjunto direto (28/28)

| Campo `directContext`                    | Cobertura          | Distribuição / notas                                                                                                                                              |
| ---------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| organizationStatus                       | 28/28              | public-biotech 9 · acquired-or-inactive 9 · private-startup 8 · identity-unresolved 2                                                                             |
| currentGsdActivity                       | 28/28              | confirmed-current 13 · historical-only 11 · current-uncertain 4                                                                                                   |
| assetRole                                | 28/28              | developer 15 · acquired-entity 6 · historical-owner 2 · owner 1 · unresolved 1 · historical-association-ownership-unverified 1 · outlicensed 1 · license-holder 1 |
| indication                               | 28/28              | **17** strings literais (heterogêneas; multi-indicação em texto)                                                                                                  |
| modality                                 | 28/28              | **20** strings; AAV gene therapy = 8; resto cauda longa                                                                                                           |
| developmentStage                         | 28/28              | **28** strings distintas (narrativa clínica, não ordinal)                                                                                                         |
| assetOrProgram                           | 28/28              | 28 strings distintas                                                                                                                                              |
| confidence                               | 28/28              | `not-assigned`                                                                                                                                                    |
| evidenceRefs                             | 28/28              | `[]`                                                                                                                                                              |
| geographicScopes                         | 28/28              | `['global']`                                                                                                                                                      |
| gsdRefs                                  | 0/28               | todos vazios                                                                                                                                                      |
| `modalities` vs `directContext.modality` | 28/28 consistentes | match literal                                                                                                                                                     |

### 3.5 Sources (217)

| Dimensão                | Valor                                         |
| ----------------------- | --------------------------------------------- |
| sourceType              | company-site **176** · other **41**           |
| availability            | public **217**                                |
| URL                     | 217/217                                       |
| Orgs com ≥1 evidenceRef | **92** (todas indiretas)                      |
| Orgs sem evidenceRef    | **28** (todas diretas — intencional pós-5D.1) |

**Não** usar “% com fonte” como qualidade comparável entre camadas: protocolos de evidência diferem.

### 3.6 Products

`productsOrPrograms = 0` → qualquer portfolio/pipeline global baseado nessa entidade é **NO_GO**.  
`directContext.assetOrProgram` **não** substitui produto modelado para as 120.

---

## 4. Missingness (resumo)

| Campo                           | Missingness                | Impacto em gráfico              |
| ------------------------------- | -------------------------- | ------------------------------- |
| `gsdRefs`                       | 121/121 vazios             | bloqueia eixo GSD canônico      |
| HQ                              | 91/120                     | bloqueia mapa                   |
| foundedYear                     | 54/120 + viés de protocolo | enviesa “idade do ecossistema”  |
| evidence nos diretos            | 28/28 vazios               | bloqueia coverage comparativa   |
| `organizationType`              | constante `unconfirmed`    | sem sinal                       |
| modalities / indication / stage | free-text                  | agregação sem taxonomia = risco |

---

## 5. Unidades de análise

| Unidade                | Quando usar                              | Armadilha                                   |
| ---------------------- | ---------------------------------------- | ------------------------------------------- |
| `unique_organization`  | “quantas organizações…”                  | Saventic não deve ser contada 2× em relação |
| `relevance_assessment` | counts oficiais do snapshot (`counts.*`) | adjacent=82 ≠ 81 orgs                       |
| `direct_assessment`    | campos `directContext`                   | só n=28; não misturar com indiretos         |
| `product_or_program`   | —                                        | n=0                                         |
| `claim` / `metric`     | Home / socioeconômico                    | não agregar métricas heterogêneas           |

---

## 6. Overlaps e dupla contagem

1. **Saventic:** 1 org · 2 assessments · 2 geos → geography tags somam 121.
2. **Relação org vs assessment:** adjacent orgs 81 vs assessments 82.
3. **operationalStatus:** não comparável entre 92 indiretos e 28 diretos (protocolos distintos).
4. **confidence:** `not-assigned` nos diretos ≠ “baixa”; comparar com high/medium dos indiretos é enganoso.
5. **Brasil/Global:** não mutuamente exclusivos → proibir pie/donut/100% stacked.

---

## 7. Auditoria clínica — fichas metodológicas

Campos ausentes no JSON são marcados como **não estruturado no dataset** (sem inferência).

### 7.1 `gsd-types.json` (lista, n=13)

| Campo                        | Conteúdo verificado                                                         |
| ---------------------------- | --------------------------------------------------------------------------- |
| Natureza                     | categórico / qualitativo (ficha por tipo)                                   |
| Unidade                      | tipo GSD (`id` / `preferredName`)                                           |
| Geografia                    | **não estruturado no dataset**                                              |
| Período / data de referência | `lastReviewedAt` = `2026-08-12` (por item)                                  |
| Source IDs                   | `src-sot-medical-exec-2026`                                                 |
| Claim IDs                    | `clm-clinical-001`, `002`, `004`, `005` (por item)                          |
| Denominador                  | **não estruturado** (não é amostra populacional)                            |
| Missingness                  | 13/13 com órgãos descritos; campos narrativos preenchidos                   |
| Comparabilidade              | tipos são categorias clínicas, não magnitudes                               |
| Agregável?                   | só contagem categórica trivial (n=13); multi-órgão exigiria regra explícita |
| Conclusão gráfica            | **DEFER** / baixo valor vs explorer existente — sem chart novo na 6B        |

### 7.2 `pathway.json`

| Campo             | Conteúdo verificado                                        |
| ----------------- | ---------------------------------------------------------- |
| Natureza          | ordinal qualitativo (passos da via)                        |
| Unidade           | passo (`steps[]`, n=4)                                     |
| Geografia         | **não estruturado no dataset**                             |
| Período           | `lastReviewedAt` = `2026-08-12`                            |
| Source IDs        | `src-sot-medical-exec-2026`                                |
| Claim IDs         | `clm-clinical-002`, `clm-clinical-003` (+ claims por step) |
| Denominador       | **não aplicável**                                          |
| Missingness       | 4 steps presentes; sem métricas numéricas                  |
| Comparabilidade   | sequência conceitual, não série quantitativa               |
| Agregável?        | não                                                        |
| Conclusão gráfica | manter flow existente — **sem chart**                      |

### 7.3 `clinical-patterns.json` (n=3)

| Campo             | Conteúdo verificado                |
| ----------------- | ---------------------------------- |
| Natureza          | categórico / qualitativo           |
| Unidade           | padrão clínico (`pattern`)         |
| Geografia         | **não estruturado no dataset**     |
| Período           | `lastReviewedAt` = `2026-08-12`    |
| Source IDs        | `src-sot-medical-exec-2026`        |
| Claim IDs         | `clm-clinical-002`                 |
| Denominador       | **não estruturado**                |
| Missingness       | 3/3 com `examples` + `limitations` |
| Comparabilidade   | categorias narrativas              |
| Agregável?        | não (sem magnitudes)               |
| Conclusão gráfica | cards OK — **sem chart**           |

### 7.4 `nomenclature.json`

| Campo             | Conteúdo verificado                                                               |
| ----------------- | --------------------------------------------------------------------------------- |
| Natureza          | temporal qualitativo                                                              |
| Unidade           | evento de nomenclatura (`events[]`, n=3)                                          |
| Geografia         | **não estruturado no dataset**                                                    |
| Período           | `lastReviewedAt` = `2026-08-12`; datas históricas **não estruturadas** por evento |
| Source IDs        | `src-sot-medical-exec-2026`                                                       |
| Claim IDs         | `clm-clinical-005`                                                                |
| Denominador       | **não aplicável**                                                                 |
| Missingness       | 3 eventos; sem timestamps ISO por evento                                          |
| Comparabilidade   | timeline conceitual                                                               |
| Agregável?        | não                                                                               |
| Conclusão gráfica | timeline existente — **sem chart**                                                |

### 7.5 `epidemiology.json` (5 `estimates`)

| Campo             | Conteúdo verificado                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Natureza          | quantitativo **heterogêneo** (incidência / prevalência / genética predita)                                 |
| Unidade           | estimativa por rótulo (`epi-gsd-i`, Pompe, III, IV, VI/IX)                                                 |
| Geografia         | **não estruturado no dataset** (texto de `scope`/`limitations` cita populações específicas pontualmente)   |
| Período           | `lastReviewedAt` = `2026-08-12`; período da estimativa original **não estruturado** além do escopo textual |
| Source IDs        | `src-sot-medical-exec-2026`                                                                                |
| Claim IDs         | `clm-clinical-006` (dataset + itens)                                                                       |
| Denominador       | **não estruturado de forma única** — cada estimate declara `scope` distinto; guardrail proíbe equivalência |
| Missingness       | 5/5 com `displayValue` + `limitations`; sem campos numéricos tipados separados do texto                    |
| Comparabilidade   | **baixa** — medidas diferentes (incidência vs prevalência vs genética; populações especiais)               |
| Agregável?        | **não** para ranking/barras comparativas                                                                   |
| Conclusão gráfica | **NO_GO**                                                                                                  |

### 7.6 `diagnosis.json`

| Campo             | Conteúdo verificado                   |
| ----------------- | ------------------------------------- |
| Natureza          | flow / qualitativo                    |
| Unidade           | estágio diagnóstico (`stages[]`, n=7) |
| Geografia         | **não estruturado no dataset**        |
| Período           | `lastReviewedAt` = `2026-08-12`       |
| Source IDs        | `src-sot-medical-exec-2026`           |
| Claim IDs         | `clm-clinical-007`                    |
| Denominador       | **não aplicável**                     |
| Missingness       | 7 stages; disclaimer presente         |
| Comparabilidade   | sequência clínica, não magnitudes     |
| Agregável?        | não                                   |
| Conclusão gráfica | flow existente — **sem chart**        |

### 7.7 `management.json`

| Campo             | Conteúdo verificado                             |
| ----------------- | ----------------------------------------------- |
| Natureza          | qualitativo por trilha                          |
| Unidade           | trilha de manejo (`tracks[]`, n=3)              |
| Geografia         | **não estruturado no dataset**                  |
| Período           | `lastReviewedAt` = `2026-08-12`                 |
| Source IDs        | `src-sot-medical-exec-2026`                     |
| Claim IDs         | `clm-clinical-008`                              |
| Denominador       | **não estruturado**                             |
| Missingness       | 3 tracks com `summary`                          |
| Comparabilidade   | trilhas por padrão clínico, sem eixos numéricos |
| Agregável?        | não                                             |
| Conclusão gráfica | cards/tracks — **sem chart**                    |

### 7.8 `therapy-horizon.json`

| Campo             | Conteúdo verificado                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Natureza          | qualitativo datado                                                                                                                  |
| Unidade           | item terapêutico (`items[]`, n=3) + obstáculo (`obstacles[]`, n=7)                                                                  |
| Geografia         | **não estruturado no dataset**                                                                                                      |
| Período           | `lastReviewedAt` = `2026-08-12`; `datedQualifier` = situação reportada por Koeberl et al. (2024) — **não** status regulatório atual |
| Source IDs        | `src-sot-medical-exec-2026`                                                                                                         |
| Claim IDs         | `clm-clinical-009`                                                                                                                  |
| Denominador       | **não aplicável**                                                                                                                   |
| Missingness       | itens/obstáculos narrativos; sem estágio tipado agregável                                                                           |
| Comparabilidade   | horizonte descritivo                                                                                                                |
| Agregável?        | não                                                                                                                                 |
| Conclusão gráfica | lista — **sem chart**                                                                                                               |

### 7.9 `clinical-gaps.json`

| Campo             | Conteúdo verificado                                      |
| ----------------- | -------------------------------------------------------- |
| Natureza          | qualitativo / prioritário                                |
| Unidade           | lacuna (`gaps[]`, n=5)                                   |
| Geografia         | **não estruturado no dataset**                           |
| Período           | `lastReviewedAt` = `2026-08-12`                          |
| Source IDs        | `src-sot-medical-exec-2026`                              |
| Claim IDs         | `clm-clinical-010`                                       |
| Denominador       | **não estruturado**                                      |
| Missingness       | 5 gaps com `priority` textual                            |
| Comparabilidade   | prioridades narrativas, sem scores numéricos comparáveis |
| Agregável?        | não                                                      |
| Conclusão gráfica | lista — **sem chart**                                    |

**Conclusão clínica (inalterada):** zero gráficos quantitativos novos com valor metodológico alto na 6B; preservar diagramas/explorer existentes.

---

## 8. Auditoria socioeconômica — fichas metodológicas

### 8.1 `burden.json`

| Campo                             | Conteúdo verificado                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Natureza                          | findings qualitativos (+ % embutidos em prosa de estudos específicos)                                                                 |
| Unidade                           | finding (`findings[]`, n=7) por `actor` / `gsdScope`                                                                                  |
| Geografia                         | **não estruturado no dataset** como campo tipado; `gsdScope` e `limitations` citam estudos/geografias pontuais (ex.: adultos alemães) |
| Período                           | `lastReviewedAt` = `2026-08-12`; período do estudo original **não estruturado** além do texto                                         |
| Moeda                             | **não aplicável** / **não estruturado**                                                                                               |
| Source IDs                        | `src-sot-socioeconomic-2026`                                                                                                          |
| Claim IDs                         | `clm-socio-001`, `002`, `003`                                                                                                         |
| Metric IDs                        | **não estruturado neste dataset**                                                                                                     |
| Denominador                       | **não estruturado** (amostras de estudos citados nas limitations)                                                                     |
| Missingness / ausência estrutural | sem magnitudes tipadas homogêneas; % só em prosa                                                                                      |
| Comparabilidade                   | baixa entre findings / GSDs                                                                                                           |
| Agregável?                        | **não**                                                                                                                               |
| Conclusão gráfica                 | **NO_GO** chart de magnitude                                                                                                          |

### 8.2 `cost-layers.json`

| Campo             | Conteúdo verificado                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| Natureza          | camadas mistas: monetário observado + QALY + qualitativo                                                 |
| Unidade           | camada (`layers[]`, n=5) com `perspective`                                                               |
| Geografia         | **não estruturado no dataset** como campo tipado; scopes textuais (global / Brasil / EU / Japão / NIHR)  |
| Período           | `lastReviewedAt` = `2026-08-12`; períodos nos `amounts[].scope` (ex.: 2024; fev/2025; jan/2020–mai/2026) |
| Moeda / unidade   | EUR, BRL, GBP, “por QALY”; duas camadas **sem** `amounts` (dieta; indiretos)                             |
| Source IDs        | `src-sot-socioeconomic-2026`                                                                             |
| Claim IDs         | `clm-socio-005`, `clm-brasil-001`, `clm-market-001`                                                      |
| Denominador       | **heterogêneo / não unificado** (receita; AIHs; QALY contextuais)                                        |
| Missingness       | `cost-household-diet-care` e `cost-indirect` sem sizing monetário estruturado                            |
| Comparabilidade   | **proibida** entre camadas (limitations explícitas)                                                      |
| Agregável?        | **não somar**                                                                                            |
| Conclusão gráfica | **NO_GO** barras comparativas                                                                            |

### 8.3 `market-segments.json`

| Campo             | Conteúdo verificado                                             |
| ----------------- | --------------------------------------------------------------- |
| Natureza          | qualitativo (maturidade / observabilidade)                      |
| Unidade           | segmento (`segments[]`, n=5)                                    |
| Geografia         | **não estruturado no dataset**                                  |
| Período           | `lastReviewedAt` = `2026-08-12`                                 |
| Moeda             | **não estruturado** (sem sizing tipado)                         |
| Source IDs        | `src-sot-socioeconomic-2026`                                    |
| Claim IDs         | `clm-market-001`, `clm-socio-004`                               |
| Denominador       | **não estruturado** (guardrail anti-TAM/SAM/SOM na experiência) |
| Missingness       | sem campos numéricos agregáveis                                 |
| Comparabilidade   | segmentos descritivos                                           |
| Agregável?        | **não**                                                         |
| Conclusão gráfica | mapa/segmentos textuais — **sem chart**                         |

### 8.4 `brazil-evidence.json`

| Campo             | Conteúdo verificado                                                     |
| ----------------- | ----------------------------------------------------------------------- |
| Natureza          | pontos qualitativos + referência a métrica DATASUS                      |
| Unidade           | ponto (`points[]`, n=4)                                                 |
| Geografia         | Brasil (implícito no título/conteúdo; campo tipado **não estruturado**) |
| Período           | `lastReviewedAt` = `2026-08-12`; detalhe DATASUS cita jan/2020–mai/2026 |
| Moeda             | VAL_TOT nominal R$ no detalhe textual do ponto AIH                      |
| Source IDs        | `src-sot-socioeconomic-2026`                                            |
| Claim IDs         | `clm-brasil-001`, `clm-socio-005`                                       |
| Metric IDs        | `met-datasus-001` (no ponto AIH); demais pontos com `metricIds: []`     |
| Denominador       | **ausente** — ponto explícito “Sem denominador nacional”                |
| Missingness       | sem prevalência nacional estruturada                                    |
| Comparabilidade   | utilização hospitalar ≠ epidemiologia                                   |
| Agregável?        | **não** além do card da métrica já publicada                            |
| Conclusão gráfica | **NO_GO** chart novo                                                    |

### 8.5 `metrics.json` (evidência transversal Home/Socio; n=4)

| Metric ID          | Natureza                 | Unidade                       | Geografia           | Período                               | Moeda/unidade | Claims / Sources                                 | Denominador                     | Agregável com as demais? | Conclusão                            |
| ------------------ | ------------------------ | ----------------------------- | ------------------- | ------------------------------------- | ------------- | ------------------------------------------------ | ------------------------------- | ------------------------ | ------------------------------------ |
| `met-clinical-001` | contagem ordinal textual | tipos/subtipos (`mais de 20`) | `global`            | síntese SoT médica (corte 2026-08-10) | tipos         | `clm-clinical-001` / `src-sot-medical-exec-2026` | **não estruturado** como censo  | **não**                  | manter **metric card**               |
| `met-market-001`   | receita observada        | ≈ €1,4 bi                     | `global`            | 2024                                  | bilhões EUR   | `clm-market-001` / `src-sot-socioeconomic-2026`  | mercado Pompe observado ≠ TAM   | **não**                  | card — **NO_GO** chart multi-métrica |
| `met-datasus-001`  | utilização               | 997 AIHs                      | `Brasil`            | jan/2020–mai/2026                     | AIHs          | `clm-brasil-001` / `src-sot-socioeconomic-2026`  | AIH ≠ paciente                  | **não**                  | card                                 |
| `met-mcardle-001`  | atraso diagnóstico       | 29 anos (mediana)             | `estudo específico` | estudo na SoT socioeconômica          | anos          | `clm-socio-002` / `src-sot-socioeconomic-2026`   | amostra do estudo (limitations) | **não**                  | card                                 |

**Conclusão socioeconômica/Home (inalterada):** nenhum gráfico quantitativo novo `GO` fora do Observatório; cards/camadas textuais já são a forma correta.

---

## 9. Riscos metodológicos (lista curta)

1. Misturar `Organization` e `RelevanceAssessment`.
2. Tratar Brasil/Global como partição.
3. Comparar diretos × indiretos em status/confidence/evidência.
4. Fabricar taxonomia de modalidade/indicação/estágio a partir de free-text.
5. Inferir GSD canônico via regex em `indication` sem tabela autoritativa.
6. Usar `assetOrProgram` como proxy de `productsOrPrograms`.
7. Introduzir biblioteca de charts sem necessidade (viola stack atual).

---

## 10. Matriz completa de viabilidade

Legenda de status: `GO` · `GO_WITH_CAVEAT` · `DEFER` · `NO_GO`.

| ID      | Página       | Pergunta                                    | Unidade              | Dataset / campos                    | Agregação                   | Denominador                                     | Exclusivas?                                | Missingness                                 | Protocolo                             | Tipo visual                             | Interação                | Risco                                     | Caveat público                                                     | Status                  | Prioridade |
| ------- | ------------ | ------------------------------------------- | -------------------- | ----------------------------------- | --------------------------- | ----------------------------------------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------- | --------------------------------------- | ------------------------ | ----------------------------------------- | ------------------------------------------------------------------ | ----------------------- | ---------- |
| VIZ-01  | Observatório | Como as orgs se distribuem por relação GSD? | unique_organization  | assessments→set(relationship)       | incidência de relation tags | 120 orgs; Σ tags pode >120 em snapshots futuros | **neste** snapshot sim; modelo não garante | 0                                           | misto, enum compartilhado             | barras horizontais (só absolutos na v1) | snapshot                 | confusão com counts.adjacent=82; % frágil | “Incidência de relações por organização; neste snapshot 81/28/11.” | **GO**                  | **P0**     |
| VIZ-02  | Observatório | Quantas orgs tocam Brasil vs Global?        | unique_organization  | assessments→set(geographicScopes)   | incidência de tags          | 120 orgs; tags podem >120                       | **não**                                    | 0                                           | misto                                 | barras de incidência (não pie)          | snapshot                 | parecer partição                          | “Categorias não mutuamente exclusivas (1 org em ambas).”           | **GO_WITH_CAVEAT**      | **P0**     |
| VIZ-03  | Observatório | Qual a atividade GSD dos 28 diretos?        | direct_assessment    | directContext.currentGsdActivity    | count                       | 28                                              | sim (enum)                                 | 0/28                                        | só direto                             | barras                                  | snapshot · subset direto | generalizar a 120                         | “Somente mapeamento direto (n=28).”                                | **GO**                  | **P0**     |
| VIZ-04  | Observatório | Status corporativo dos 28 diretos?          | direct_assessment    | directContext.organizationStatus    | count                       | 28                                              | sim                                        | 0/28                                        | só direto                             | barras                                  | snapshot · subset direto | misturar com operationalStatus            | “Não compara com status dos indiretos.”                            | **GO**                  | **P0**     |
| VIZ-05  | Observatório | Papel no ativo (28)?                        | direct_assessment    | directContext.assetRole             | count                       | 28                                              | sim                                        | 0/28                                        | só direto                             | barras                                  | snapshot · subset direto | labels sensíveis (Kriya)                  | Usar labels públicas da taxonomia                                  | **GO**                  | **P1**     |
| VIZ-06  | Observatório | Indicação / GSD nos diretos?                | direct_assessment    | gsdRefs / indication                | —                           | —                                               | —                                          | gsdRefs 28/28 vazios; indication 17 strings | só direto                             | —                                       | —                        | free-text / multi-indicação               | Precisa refs canônicos ou taxonomia                                | **DEFER**               | —          |
| VIZ-07  | Observatório | Modalidades dos diretos?                    | direct_assessment    | modalities / directContext.modality | —                           | —                                               | —                                          | 20 strings / cauda                          | só direto                             | —                                       | —                        | fragmentação                              | Normalização prévia                                                | **DEFER**               | —          |
| VIZ-08  | Observatório | Estágio de desenvolvimento (28)?            | direct_assessment    | developmentStage                    | —                           | —                                               | —                                          | 28/28 únicos                                | só direto                             | —                                       | —                        | falso funil ordinal                       | Não fabricar ordem clínica                                         | **DEFER**               | —          |
| VIZ-09  | Observatório | Status operacional das 120?                 | unique_organization  | operationalStatus                   | —                           | —                                               | —                                          | 0 missing mas **semântica mista**           | protocolos diferentes                 | —                                       | —                        | falsa homogeneidade                       | 92× apparently-active vs vocabulário direto                        | **NO_GO**               | —          |
| VIZ-10  | Observatório | Confidence do ecossistema?                  | mixed                | confidence                          | —                           | —                                               | —                                          | diretos not-assigned                        | não comparável                        | —                                       | —                        | not-assigned≠baixa                        | Separar camadas                                                    | **NO_GO** (conjunto)    | —          |
| VIZ-10b | Observatório | Confidence só indiretos (93)?               | relevance_assessment | confidence onde relationship≠direct | count                       | 93                                              | sim (high/medium)                          | 0 low                                       | só indireto                           | barras                                  | snapshot                 | parecer qualidade dos diretos             | “Exclui os 28 diretos (confiança não atribuída).”                  | **GO_WITH_CAVEAT**      | **P2**     |
| VIZ-11  | Observatório | Mapa / HQ mundial?                          | unique_organization  | headquarters                        | —                           | —                                               | —                                          | 91/120 ausentes                             | Global indirect deliberadamente fraco | —                                       | —                        | falsa geografia                           | —                                                                  | **NO_GO**               | —          |
| VIZ-12  | Observatório | Ano de fundação / idade?                    | unique_organization  | foundedYear                         | histograma                  | 66 com dado                                     | —                                          | 54 ausentes + viés                          | cobertura desigual                    | —                                       | —                        | viés de amostra                           | —                                                                  | **DEFER**               | —          |
| VIZ-13  | Observatório | Pipeline de produtos (120)?                 | product_or_program   | productsOrPrograms                  | —                           | 0                                               | —                                          | n=0                                         | —                                     | —                                       | —                        | inventar portfolio                        | —                                                                  | **NO_GO**               | —          |
| VIZ-14  | Observatório | Cobertura de fontes %?                      | unique_organization  | evidenceRefs                        | —                           | —                                               | —                                          | diretos 0 por design                        | protocolos diferentes                 | —                                       | —                        | julgamento de qualidade                   | —                                                                  | **NO_GO**               | —          |
| VIZ-15  | Clínica      | Ranking epidemiológico?                     | estimate             | epidemiology.estimates              | —                           | heterogêneo                                     | não                                        | N/A                                         | métodos diferentes                    | —                                       | —                        | falsa equivalência                        | guardrail já no dataset                                            | **NO_GO**               | —          |
| VIZ-16  | Clínica      | Contagem de tipos GSD?                      | gsd type             | gsd-types                           | count=13                    | 13                                              | sim                                        | 0                                           | canônico                              | KPI textual já implícito                | —                        | baixo valor vs explorer                   | —                                                                  | **DEFER** (baixo valor) | —          |
| VIZ-17  | Socio        | Barras de custo comparativas?               | cost layer           | cost-layers.amounts                 | —                           | —                                               | não                                        | —                                           | EUR/BRL/QALY mistos                   | —                                       | —                        | soma indevida                             | —                                                                  | **NO_GO**               | —          |
| VIZ-18  | Socio/Home   | Chart das 4 métricas?                       | metric               | metrics.json                        | —                           | —                                               | não                                        | —                                           | unidades/geos diferentes              | metric cards já corretos                | —                        | falsa série                               | —                                                                  | **NO_GO**               | —          |

---

## 11. FATOS

1. Baseline e counts do Observatório conferem com o esperado da 5D.2.
2. Não existe biblioteca de charts; visualização quantitativa atual = cards/listas/diagramas CSS/SVG.
3. Relação por org única: 81 / 28 / 11; assessment adjacent = 82 por causa de Saventic.
4. Geografia por org: 88 global + 33 brazil com **1** overlap.
5. `directContext` está completo (28/28) nos três eixos controlados: status / atividade / papel.
6. `gsdRefs` está vazio em todo o snapshot publicado.
7. `productsOrPrograms = 0`.
8. Gates de qualidade do baseline passaram sem alteração de código.

## 12. INFERÊNCIAS (não usadas como dado)

1. Uma taxonomia de modalidade/indicação/estágio _poderia_ ser criada em iteração futura — **fora da 6A/6B** até existir fonte autoritativa.
2. Regex sobre `indication` produziria eixos GSD aproximados, mas seria inferência → rejeitada para `GO`.
3. A maior densidade analítica “pronta” está no Observatório; clínica/socio já têm forma adequada ao tipo de evidência.

## 13. PENDÊNCIAS

1. Popular `gsdRefs` (ou taxonomia de indicação) antes de gráfico de GSD nos diretos.
2. Normalizar modalidades/estágios se desejados como eixos.
3. Decisão editorial futura sobre HQ estruturado (hoje insuficiente).
4. Empacotamento/auditoria externa desta 6A (sem ZIP nesta rodada, conforme instrução).

---

## Apêndice A — Regras de stack relevantes

De `04_Stack_Estrutura_e_Decisoes_Tecnicas.md` e `AGENTS.md`:

- não adicionar biblioteca de charts sem necessidade concreta + ADR;
- preferir SVG/CSS; ausência ≠ zero; AIH ≠ paciente; receita ≠ TAM;
- não informar só por cor.

## Apêndice B — Comando de profiling

Profiling executado via Python ad hoc em sessão (stdout/`/tmp`), **não** versionado no repositório.
