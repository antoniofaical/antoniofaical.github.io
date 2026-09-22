# PUBLIC_COPY_AUDIT — 7A.0

## 1. Escopo e baseline inspecionado

- Rodada: **7A.0 — Public Copy Inventory**.
- Repositório: raiz `antoniofaical.github.io-7a` (worktree local).
- Branch: `audit/gsd-7a-0-public-copy-inventory`.
- HEAD inspecionado: `fb9f15d79252c5950d29fe36c5b45ab437613c41` (igual ao baseline autoritativo).
- `6D visual = FROZEN`. Nenhuma copy, dado, lógica ou visual foi alterada.
- Escopo editorial: Home, Bases clínicas, Impacto socioeconômico, Observatório (camada estrutural).

## 2. Metodologia real executada

1. Preflight git + convenção `painel-gsds/docs/audits/`.
2. Mapa de rotas a partir de `src/pages/`, `astro.config.mjs` e `siteNav.ts`.
3. Passagem source: páginas, layouts, componentes globais, explorers, JSON clínico/socio e coverage do snapshot.
4. Passagem runtime inicial: `npm install` + `npx astro dev`; HTML das rotas; no-results do observatório com consulta `zzzz-no-match-7a0`.
5. **Rodada corretiva:** `npm run build` (5 pages) e comparação HTML estático ↔ inventário nas quatro rotas. Nós extraídos após remover `script`/`style`/`noscript`/SVG/toolbar; whitespace normalizado; cada nó confrontado com unidades da rota + `GLOBAL`.
6. Unidades agregadas usam o separador documentado `|` na ordem de leitura, sem pontuação inventada. `current_text` é round-trip literal ao DOM/source (não substring). Reflete pós-`publicSocioText` / `publicSocioSecondaryText` / `sanitizeHomeCopy`.
7. Classificação, claims atômicos, evidência local (SoTs + claims.json + snapshot coverage + código). Sem pesquisa externa.
8. QA do CSV/relatórios por script reproduzível (não commitado). Prettier apenas nos quatro Markdown da 7A.0.

## 3. Mapa de rotas

| Rota                                | Entrypoint                               | Copy providers                                                      | SEO                  | Estados                                   | Origem dinâmica                                       | Runtime                                          |
| ----------------------------------- | ---------------------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `/`                                 | `painel-gsds/src/pages/index.astro`      | Home* + GlobalHeader/Footer/Skip/MobileNav + KeyMetric/SourceAnchor | title/description/og | menu mobile; footer notice hidden         | métricas/claims/sources                               | inspecionado                                     |
| `/analises/bases-clinicas/`         | `.../bases-clinicas/index.astro`         | Research* + GSDExplorer + JSON clínico                              | title/description    | filtros explorer; empty filter            | gsd-types, pathway, patterns, epi, dx, mgmt, tx, gaps | inspecionado                                     |
| `/analises/impacto-socioeconomico/` | `.../impacto-socioeconomico/index.astro` | Research* + Burden/Caregiver/Cost/Brazil/Segments/Sizing/Gaps       | title/description    | empty caregiver/sizing (não atuais)       | burden, cost-layers, brazil-evidence, market-segments | inspecionado                                     |
| `/inovacao/startups/`               | `.../inovacao/startups/index.astro`      | ResearchHeader + Startup* + ObservatoryAnalytics                    | title/description    | empty snapshot; no-results; detail drawer | snapshot coverage/counts; **não** nomes de org        | inspecionado (drawer bloqueado pela dev toolbar) |
| `/design-system/`                   | `.../design-system/index.astro`          | fixtures                                                            | noindex              | fora do escopo 7A.0                       | fixtures                                              | 200, excluída                                    |
| `/metodologia/`                     | nenhum page file                         | nav `available:false`                                               | n/a                  | 404 se URL digitada                       | n/a                                                   | 404                                              |

## 4. Matriz de cobertura por rota/categoria

| Categoria                     | Home                   | Clínica                 | Socio                           | Observatório                                  | Global                        |
| ----------------------------- | ---------------------- | ----------------------- | ------------------------------- | --------------------------------------------- | ----------------------------- |
| SEO/metadata                  | sim                    | sim                     | sim                             | sim                                           | n/a                           |
| hero/títulos                  | sim                    | sim                     | sim                             | sim                                           | nav/footer                    |
| metodologia/caveats           | sim                    | sim                     | sim                             | sim                                           | research meta                 |
| notices                       | footer hidden          | notice médico + dx/mgmt | AIH notice                      | empty/no-results                              | notice default source-only    |
| UI labels/CTAs/filtros        | CTAs portais           | explorer                | table headers                   | search/sort/filters/charts                    | skip/nav/menu                 |
| tabelas/charts captions       | n/a visual layers      | matriz órgãos           | segmentos                       | 4 charts                                      | n/a                           |
| empty/error/no-results        | n/a                    | explorer empty (source) | caregiver/sizing empty (source) | empty snapshot (source); no-results (runtime) | n/a                           |
| a11y (aria/alt/placeholder)   | sim                    | sim                     | sim                             | sim                                           | skip, brand aria, breadcrumbs |
| templates dinâmicos           | métricas, datas        | explorer count          | DATASUS values                  | counts/status                                 | footer year                   |
| condicionais não reproduzidos | evidence badges hidden | explorer empty          | empty caregiver                 | empty snapshot; detail (toolbar)              | mobile menu open              |

## 5. Totais por rota, tipo, status e ação

COPY_ID: **252**. CLAIM_ID: **192**. Issues: **9**. Questions: **5**.

Por rota:

- `/`: 54
- `/analises/bases-clinicas/`: 73
- `/analises/impacto-socioeconomico/`: 57
- `/inovacao/startups/`: 41
- `GLOBAL`: 27

Por tipo:

- `caveat`: 23
- `editorial`: 14
- `factual`: 106
- `metodologia`: 35
- `notice`: 5
- `SEO`: 8
- `UI`: 61

Por status:

- `needs_review`: 6
- `supported`: 245
- `unsupported`: 1

Por ação:

- `keep`: 247
- `revise`: 5

IDs novos (14), sem renumeração em massa: `COPY-GLOBAL-SECTIONNAV-002`, `COPY-HOME-PROBLEM-005`, `COPY-HOME-METH-008`, `COPY-SOCIO-COST-AMOUNT-001` e `003`–`006`, `COPY-SOCIO-BR-005`, `COPY-SOCIO-GAPS-002`–`005`, `COPY-OBS-COVERAGE-010`. `COPY-SOCIO-COST-AMOUNT-002` permanece a unidade hospitalar DIAG_PRINC.

## 6. Principais achados

1. Contradição Home: lede de Análises ainda fala em "primeiro recorte do mapeamento indireto Brasil" enquanto o portal do Observatório e o snapshot descrevem Brasil+Global+28 diretos (`ISSUE-7A0-001`).
2. Leakage interno `DIAG_PRINC` na camada hospitalar após scrub de `VAL_TOT` (`ISSUE-7A0-002`). `VAL_TOT`, `SoT` e IDs `CAR-`/`ECO-` não apareceram no HTML público das 4 rotas.
3. Nome acessível do lockup: "GSD Dashboard" vs "Painel GSDs" (`ISSUE-7A0-003`).
4. `PENDING_7B_DATA_MODEL`: copy de cobertura e fallback de produtos/programas não estruturados.
5. Claims clínicos/socio da Home e páginas de análise estão, em geral, amarrados a `claims.json` + SoTs. Unidade unsupported material: o lede defasado do observatório na Home.
6. Repetição intencional (a11y) das camadas de necessidade na Home; repetição contextual intencional da limitação de fonte pública no Observatório (`ISSUE-7A0-004`, sem `redundant`/`merge`).
7. "Corte das fontes" no Observatório usa `publishedAt` do snapshot (`ISSUE-7A0-009`).

## 7. Divergências runtime versus source

- Footer notice médico: **source default existe; runtime hidden** nas 4 rotas.
- Evidence badges e estados de evidência da Home: **source existe; runtime desligado** (`showEvidenceBadge=false`, `showEvidenceStates=false`).
- Empty snapshot do Observatório: **source only**.
- Explorer clínico empty e empty caregiver/sizing: **source only** no estado atual dos dados.
- Detail drawer: labels confirmadas no source; clique runtime interceptado pela Astro dev toolbar.
- Nav "Visão geral" marca `aria-current` em rotas internas (bug de matching de `/`), não é texto diferente.
- Dev toolbar ("Inspect/Audit/Settings") **não** entra no inventário (não é copy do produto).

## 8. Exclusões de escopo

- Hub `index.html` da raiz do GitHub Pages.
- `/design-system/` (noindex, fixtures).
- `/metodologia/` (sem page).
- Campos de entidade do Observatório: nome, HQ, website, status corporativo da org, relação/atividade/directContext/confidence/asset role por registro, evidências específicas, rationale por org.
- Counts numéricos (`120`, barras dos charts) — só o framing.
- Comentários, testes, docs internas, `node_modules`, build.
- Componentes não ligados às 4 rotas: `GlycogenBranchVisual`, `BurdenPathway`, `EvidenceCallout`, `DataAbsentState` (este último só no design-system).
- Notas internas `gsd-types.json` com `(SoT)` — não renderizadas.

## 9. FATOS

- HEAD = baseline `fb9f15d`; working tree de produto inalterado por esta rodada além dos artefatos em `docs/audits/7a0/`.
- Quatro rotas públicas do dashboard respondem 200; `/metodologia/` responde 404; design-system é noindex.
- Snapshot publicado: `snap-ecosystem-cumulative-direct-2026-08-24`, coverage `partial`.
- Runtime da Home, Clínica e Socio corresponde ao source estático inspecionado, com as divergências da seção 7.
- `DIAG_PRINC` está visível no runtime socioeconômico.
- SoT médica hash `37e3fbea…6389`; SoT socio hash `489fd652…c3d2`.

## 10. INFERÊNCIAS

- O lede de Análises na Home é texto residual de um recorte anterior (5B), não uma descrição do snapshot 5D.1.
- O aria-label "GSD Dashboard" parece leftover de nomenclatura interna/piloto de marca.
- A caveat geográfica dos charts ("uma organização aparece nos dois escopos") descreve a regra de incidência, com um caso both no snapshot.

## 11. PENDÊNCIAS

- Decisões humanas em `OPEN_EDITORIAL_QUESTIONS.md`.
- Drawer de detalhe não clicado nesta sessão (toolbar).
- Menu mobile aberto não exercitado (labels confirmadas no source).
- Sem pesquisa externa além das SoTs locais.

## 12. Limitações da auditoria

- Inventário usa templates para registros repetidos (13 GSDs via `COPY-CLINICAL-EXPLORER-006`; N organizações). Não lista cada preferredName/org.
- Comparação R2 usou HTML de `npm run build` e comparador **estrito** (igualdade de átomo ↔ parte de `current_text`, não substring). Preview `BASE_PATH=/painel-gsds/` não alimenta o round-trip; o build de verificação com esse BASE_PATH só confirma o produto.
- Ano do footer depende de `Date#getFullYear` do processo.
- Classificação editorial é julgamento do executor sobre o texto inspecionado, não prova científica nova.
- og:url / og:image / og:type=website não entram como copy editorial.
- Labels de catálogo não renderizados no default (atores unused, fallbacks de órgão, papéis de ativo, toggle "Ocultar filtros", no-results) são source-alternatives, não observação runtime do HTML default.

## 13. Comandos/validadores e resultados

| Comando                                         | Resultado                                                                                                                                |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `git rev-parse HEAD`                            | `fb9f15d79252c5950d29fe36c5b45ab437613c41`                                                                                               |
| `git status --short` inicial                    | vazio                                                                                                                                    |
| `npm install` em `painel-gsds/`                 | 662 packages; exit 0 (não altera source)                                                                                                 |
| `npx astro dev` (host local, porta 4321)        | ready; GET `/` 200                                                                                                                       |
| fetch rotas                                     | `/` `/analises/bases-clinicas/` `/analises/impacto-socioeconomico/` `/inovacao/startups/` `/design-system/` = 200; `/metodologia/` = 404 |
| `npm run build` (rodada corretiva)              | 5 pages; HTML comparado ao inventário                                                                                                    |
| comparação HTML↔inventário                      | round-trip estrito R2: 0 átomo in-scope sem unidade/template/exclusão; 0 literal runtime sem átomo (ver §15)                             |
| validador 7A.0 (script temporário fora do repo) | CSV RFC4180; colunas na ordem; COPY_ID únicos; CLAIM_ID do CSV = mapa; EVIDENCE_ID usados indexados                                      |

## 14. Rodada corretiva (auditoria material)

ZIP auditado: SHA-256 `a63038708225023a41fe70033c7d30565759dc6ed8bcd71bf2a4616d80bd1278`. Veredito original: REPROVADA.

Correções (somente os cinco arquivos em `painel-gsds/docs/audits/7a0/`):

- F1: `current_text` pós-transformação (`Observado` / `Evidência limitada`; pontuação após remoção de IDs; estado evidencial e limitações do cuidador).
- F2: metadados e SourceAnchor de cada KeyMetric; cabeçalhos `Atualização` e `Limitações gerais desta Home`; amounts/caveats/limitações de CostLayers; DATASUS período/população/soma/bullets; beneficiários/compradores/maturidade/observabilidade; sizing ativo; gaps gerados.
- F3: build + comparador por rota. Nós restantes classificados: template clínico (`COPY-CLINICAL-EXPLORER-006`); entidades do Observatório; contagens de chart; metadados técnicos og:\*.
- F4: toda unidade `needs_review`/`unsupported` tem `problem` + issue; `human_validation=required` aponta a pergunta; ISSUE-7A0-004/006/007 declaram que o problema não é o texto literal quando o CSV fica `supported`.
- F5: NAV-005 falso positivo removido; SEO-002 `supports` + stylistic_only; AMOUNT-002.C01 `supports` (leakage editorial separado); redundância OBS classificada como repetição intencional.
- F6: 21 aliases `EV-CLAIM-CLM-*` / `EV-METRIC-MET-*` indexados individualmente.
- F7: Prettier nos quatro Markdown; `npm run ci` na verificação final.

Allowlist de exclusão (nós HTML restantes, todos justificados):

| Classe                                                  | Rotas        | Representação                                                   |
| ------------------------------------------------------- | ------------ | --------------------------------------------------------------- |
| og:url, og:image, og:type=website                       | 4            | identificador técnico, não copy editorial                       |
| preferredName/gene/proteína/features/órgãos das 13 GSDs | clínica      | template `COPY-CLINICAL-EXPLORER-006`                           |
| nome, description e demais campos por organização       | observatório | exclusão de entidade 7A                                         |
| números de barras dos charts                            | observatório | counts; só o framing foi inventariado                           |
| linhas da matriz de órgãos (nome/órgãos/estado)         | clínica      | instâncias cobertas pelo template explorer + chrome ORG-002/003 |

## 15. Rodada corretiva R2 (literalidade e claims)

ZIP da segunda auditoria externa: SHA-256 `f5b73ddfa3de6d57c2866219d0a6e83497d57e8c14456a368b65c89eac0626a6`. Veredito: AINDA REPROVADA / CORRECTIVE ROUND R2 REQUIRED.

Bloqueios materiais da auditoria (F8/F9/F10) corrigidos somente nos cinco artefatos:

- F8: `current_text` reconstruído a partir dos átomos do `npm run build` (jsdom, sem script/style/noscript/SVG/toolbar). Separador `|`; sem ponto/dois-pontos/barra/espaço inventados; `AIHs·` preservado; SourceAnchor como pares `Fonte` \| valor; cinco `Perspectiva: …` em COST-003; breadcrumbs sem `/` de CSS; `<time>` separado do rótulo.
- F9: 55 claims novos em 45 unidades que tinham cláusula verificável com `claim_count=0` (metodologia/caveat/notice/SEO/UI), sem inferir ausência a partir de `type != factual`. Total 192 `CLAIM_ID`. `{directTotal}` em `COPY-OBS-CHART-005` continua sendo template de literalidade, mas o valor numérico público `28` tem claim próprio (`COPY-OBS-CHART-005.C01`). Issues/perguntas permanecem 9/5; DETAIL-002 e COVERAGE-006/ABOUT-005 agora têm claim próprio.
- F10: comparador estrito (não substring). O relatório não declara cobertura por inclusão parcial de frase.

Round-trip R2 (HTML default de `dist/`):

| Rota                                | Átomos | Literal exato | Template | Exclusão autorizada | Sem resolução |
| ----------------------------------- | -----: | ------------: | -------: | ------------------: | ------------: |
| `/`                                 |    185 |           183 |        2 |                   0 |             0 |
| `/analises/bases-clinicas/`         |    364 |           256 |       94 |                  14 |             0 |
| `/analises/impacto-socioeconomico/` |    216 |           213 |        3 |                   0 |             0 |
| `/inovacao/startups/`               |   1151 |           897 |      242 |                  12 |             0 |

Templates: KeyMetric/footer dates, explorer clínico, counts do Observatório, `{directTotal}`, `{statusLabel}`. Exclusões: instâncias GSD/matriz; entidades do Observatório; números de barra; og técnico. Headings puramente funcionais continuam com zero claim.

QA R2 (produto intocado): `format:check` PASS; lint PASS; typecheck 0 erros / 4 hints preexistentes; 82/82 testes; `data:validate` PASS; build `BASE_PATH=/` 5 pages; build `BASE_PATH=/painel-gsds/` 5 pages; `npm run ci` exit 0; `npm run test:e2e` 69 passed; `git diff --check` limpo; `git status --short` somente `?? painel-gsds/docs/audits/7a0/`. HEAD `fb9f15d`. Sem commit/push/PR/merge/rebase/deploy. 7A.1 não iniciada.

## 16. Rodada corretiva R3 (claim de `{directTotal}`)

ZIP da auditoria externa da R2: SHA-256 `45b35cb056c846e6d075cf04320ff5664b3d1197d9f837ab6f04203a0f82b42a`. Bloqueio remanescente: `COPY-OBS-CHART-005` tinha o total público `28` (`{directTotal}`) sem claim. R3 adiciona `COPY-OBS-CHART-005.C01` (`supports`, `EV-SNAP-COV-001`). `COPY-OBS-CHART-008` e `ISSUE-7A0-008` permanecem inalterados. Total: 192 `CLAIM_ID`, 31 `EVIDENCE_ID` usados.
