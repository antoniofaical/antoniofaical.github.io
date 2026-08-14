# Auditoria de prontidão pré-Iteração 5A

**Data:** 2026-08-14  
**Escopo:** Diagnóstico exclusivo do repositório antes da Iteração 5A (Fundação do Observatório de Startups). Sem implementação, sem correções, sem mutação de arquivos versionados além deste relatório.  
**Adendo:** §13 — prontidão para bot de atualização mensal/sob demanda (entidades Candidate→PublishedSnapshot), sem implementação.

**Contrato:** `Instrucoes_Cursor_Auditoria_Pre_Iteracao_5A.md`

---

## 1. Estado Git autoritativo (inicial)

| Campo                         | Valor                                                                     |
| ----------------------------- | ------------------------------------------------------------------------- |
| Raiz do repositório           | `/workspace`                                                              |
| App                           | `/workspace/painel-gsds`                                                  |
| Branch                        | `cursor/iteracoes-3-4-analises-13a9`                                      |
| HEAD                          | `0476d8853a18132e25a3c267ee7203fbc88edae0`                                |
| Mensagem                      | `Implement clinical and socioeconomic analysis pages with v0.3 docs.`     |
| Upstream                      | `origin/cursor/iteracoes-3-4-analises-13a9` (sincronizado)                |
| Remote                        | `origin` → `github.com/antoniofaical/antoniofaical.github.io`             |
| `git status --short` inicial  | _(vazio — working tree limpa)_                                            |
| Staged / unstaged / untracked | nenhum                                                                    |
| Iterações 3–4 presentes       | sim (`623968b`, `0476d88`; PR #3 **merged** em `origin/main` = `f5daa92`) |
| Último commit 3–4             | `0476d88`                                                                 |

**Observação:** o ponteiro local de `main` (`48dc6c1`) está atrasado em relação a `origin/main` (`f5daa92`). Nenhum sync/merge/rebase foi executado nesta auditoria. O conteúdo das Iterações 3–4 está na branch atual e já foi incorporado a `origin/main` via PR #3.

Artefatos locais pré-existentes (ignorados pelo Git): `painel-gsds/dist/`, `painel-gsds/.astro/`, `painel-gsds/playwright-report/`, `painel-gsds/test-results/`, `painel-gsds/node_modules/`.

---

## 2. Inventário estrutural

### Presente e coerente

- `AGENTS.md`, `package.json`, `package-lock.json`
- Configs: `astro.config.mjs`, `tsconfig.json`, `eslint.config.js`, `prettier.config.mjs`, `vitest.config.ts`, `playwright.config.ts`
- Workflows na raiz: `.github/workflows/ci.yml`, `deploy-pages.yml` (manual `workflow_dispatch`)
- Docs v0.3 em `docs/implementation/` (`00`–`09`, `CHANGELOG_v0.3.md`, `MANIFEST.sha256`)
- Legacy v0.2 apenas em `docs/implementation/archive/`
- ADRs em `docs/decisions/` (0001–0004)
- SoTs em `docs/source-of-truth/`
- Schemas/loaders/datasets clínicos e socioeconômicos
- Componentes layout, evidence, home, clinical, socioeconomic, research
- Rotas: `/`, `/design-system/`, `/analises/bases-clinicas/`, `/analises/impacto-socioeconomico/`
- Hub raiz: `/workspace/index.html` → `/painel-gsds/`
- Testes unitários (5 arquivos) e e2e (`home`, `design-system`, `analises`)
- Fontes WOFF2 rastreadas em `public/fonts/` (intencional)

### Ausente (esperado nesta fase)

- Rota `/startups/` ou `/inovacao/startups/`
- Schemas/dados/entidades Startup
- Domínio `src/data/startups/`

### Anomalias verificadas (sem achado bloqueador)

- Sem ZIPs rastreados
- Sem caminhos absolutos Windows/Linux em `src/` ou `tests/`
- Screenshots PNG em `tests/visual/` ignorados (`.gitignore`)
- `CLAUDE.md` → symlink para `AGENTS.md` (pré-existente)

---

## 3. Integridade das SoTs

| Arquivo                                              | SHA-256 calculado | INVENTORY.md                | `git diff` vs HEAD |
| ---------------------------------------------------- | ----------------- | --------------------------- | ------------------ |
| `Glicogenose Resumo Médico Executivo.md`             | `37e3fbea…866389` | coincide (case-insensitive) | limpo              |
| `Glicogenose Estudo Socioeconômico Mercadológico.md` | `489fd652…10c3d2` | coincide                    | limpo              |
| `Design_System_Painel_Glicogenoses.md`               | `634a782d…2a7bd6` | coincide                    | limpo              |
| `INVENTORY.md`                                       | `266a341b…23ae5c` | n/a (metadado)              | limpo              |

**Resultado:** SoTs científicas **preservadas byte a byte** relativamente a HEAD. Nenhuma divergência bloqueadora.

---

## 4. Auditoria funcional — Iterações 1–4

### 4.1 Fundação e Home

- Shell global, `LocalFonts` + WOFF2, `GlobalHeader` / `MobileNavigation`, SkipLink: presentes
- `/design-system/`: presente e coberta por e2e (fontes Inter/Manrope, reduced motion, overflow)
- Home `/` com `loadHomeEvidence` (`source → claim → metric`); métricas da UI derivadas dos datasets (`met-clinical-001`, `met-market-001`, `met-datasus-001`, `met-mcardle-001`)
- Guardrails explícitos: AIH ≠ paciente; receita observada ≠ TAM/SAM/SOM
- Links via `withBase` / `withHash`; build `/painel-gsds/` gera hrefs prefixados corretamente
- Portais de análises habilitados; bloco `#inovacao` permanece **Em desenvolvimento**

### 4.2 Bases clínicas (Iteração 3)

- Rota `/analises/bases-clinicas/` buildada e e2e OK
- Narrativa: visão geral → metabolismo → padrões → tipos → nomenclatura → órgãos → epidemiologia → diagnóstico → manejo → terapias → lacunas → fontes
- `GSDExplorer` (React) com filtro/busca por teclado
- **13** registros em `gsd-types.json` (contagem autoritativa atual)
- Loader `loadAnalysisEvidence` + schema `gsdType`; claims rastreáveis
- axe / overflow 320 / screenshots 375–1440: OK no e2e

### 4.3 Impacto socioeconômico (Iteração 4)

- Rota `/analises/impacto-socioeconomico/` buildada e e2e OK
- Componentes: BurdenOverview, BurdenPathway, CaregiverBurden, CostLayers, MarketSegmentMap, MarketSizingGuardrails, BrazilEvidencePanel, EvidenceGapBridge
- Dados: 7 burden findings, 5 segments; schemas Zod; loader compartilhado
- DATASUS: **997 AIHs**, unidade `AIHs`, `met-datasus-001`, callout E74.0 / VAL_TOT / local do estabelecimento / sem deduplicação
- Teste negativo e2e: ausência de equivalências `AIH=paciente` e `receita=TAM`
- Sem rota/dados de startups

**Contagens vigentes:** sources 2 · claims 17 · metrics 4 · gsdTypes 13 · burden 7 · segments 5

---

## 5. Resultado dos gates

Diretório: `/workspace/painel-gsds`. Preferido `npm ci` (exit 0, ~5s; `package-lock.json` inalterado).

| Comando                                 | Exit | Duração approx. | Síntese                                                                       |
| --------------------------------------- | ---: | --------------: | ----------------------------------------------------------------------------- |
| `npm ci`                                |    0 |              5s | 657 pacotes; 0 vulnerabilities                                                |
| `npm run format:check`                  |    0 |              2s | Prettier OK                                                                   |
| `npm run lint`                          |    0 |              3s | ESLint OK                                                                     |
| `npm run typecheck`                     |    0 |              6s | 0 errors; 1 hint: `z.string().url()` deprecated em `src/schemas/source.ts:22` |
| `npm test`                              |    0 |              1s | 5 files / **16** tests passed                                                 |
| `BASE_PATH=/ npm run build`             |    0 |              1s | 4 páginas                                                                     |
| `BASE_PATH=/painel-gsds/ npm run build` |    0 |              1s | 4 páginas; hrefs `/painel-gsds/...`                                           |
| `npm run test:e2e`                      |    0 |              9s | **24/24** passed (Chromium)                                                   |
| Smoke `site-output` (hub + dist Pages)  |    0 |             <1s | hub + rotas clínicas/socio + fontes                                           |

Nenhuma falha de projeto. Limitação ambiental: nenhuma (browser Playwright disponível).

**Nota:** `test:e2e` reconstrói `dist/` com `BASE_PATH=/` (playwright.config). Artefato de Pages deve ser recomposto a partir de build `/painel-gsds/` — comportamento já refletido nos workflows.

---

## 6. Auditoria visual, responsiva e de acessibilidade

Base: execução e2e + inspeção do HTML buildado (sem alterar snapshots oficiais).

| Rota                   | Overflow 320 | Axe         | Viewports 375/768/1440          | Notas                               |
| ---------------------- | ------------ | ----------- | ------------------------------- | ----------------------------------- |
| Home                   | OK           | 0 violações | screenshots e2e                 | menu mobile Escape/foco OK          |
| Design System          | OK           | coberto     | screenshots e2e                 | fontes locais WOFF2; reduced motion |
| Bases clínicas         | OK           | 0 violações | screenshots + explorer filtrado | headings/landmarks presentes        |
| Impacto socioeconômico | OK           | 0 violações | screenshots e2e                 | callout DATASUS visível             |

Screenshots de auditoria/e2e em `tests/visual/*.png` permaneceram **gitignored** (17 PNGs locais; não versionados).

---

## 7. Consistência documentação × implementação

| Tema                                                           | Situação                                                                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pacote v0.3 vigente vs archive v0.2                            | coerente                                                                                                                                         |
| ADR-0003 status `proposed` / startups futuros                  | coerente com código (sem implementação)                                                                                                          |
| AGENTS.md proíbe startups sem autorização                      | coerente                                                                                                                                         |
| AI documenta rota **`/inovacao/startups/`**                    | **não implementada** (esperado); nome pode divergir de uma 5A em `/startups/`                                                                    |
| Modelo de dados documenta taxonomias Startup                   | só em docs; schemas de código ainda ausentes (escopo 5A)                                                                                         |
| `MANIFEST.sha256` vs arquivos atuais em `docs/implementation/` | **múltiplos MISMATCH** (Prettier pós-integração) + ADRs listados em `./decisions/` mas vivem em `docs/decisions/` (já notado em `09_Status_Quo`) |
| Home “Em desenvolvimento” para inovação                        | coerente                                                                                                                                         |
| Funcionalidade de startups descrita como concluída             | **não encontrada**                                                                                                                               |

---

## 8. Preparação arquitetural para a 5A

### Base adequada (sem implementar)

- Domínio de dados por pasta (`clinical/`, `socioeconomic/`) → padrão extensível a `startups/`
- Zod + loaders tipados + Vitest de evidência
- React island isolado já usado (`GSDExplorer`, `MobileNavigation`)
- Home/`SectionPortal` + nav com flag `available`
- Builds estáticos dual `BASE_PATH`; CI cobre ambos
- Fixtures/testes podem permanecer separados da produção (padrão atual)

### Conflitos / atritos reais (não bloqueiam iniciar)

1. **Navegação duplicada** em `GlobalHeader.astro` e `MobileNavigation.tsx` (listas paralelas).
2. **Rota documentada** `/inovacao/startups/` vs possível `/startups/` da 5A — decisão de AI necessária na implementação.
3. **Placeholder Home** `#inovacao` / status “Em desenvolvimento” precisará atualização ao publicar a fundação.
4. **e2e** `design-system.spec.ts` assume contagem/ordem de links disponíveis no menu mobile (já ajustado para 3 links; quebrará ao habilitar o 4º sem atualizar o teste).
5. **Taxonomias** de relevância/maturidade de startups existem no modelo documental, não no código.
6. **Loader** `loadAnalysisEvidence` acopla-se a `loadHomeEvidence` como gate — padrão aceitável, mas startups devem ter loader próprio sem acoplamento desnecessário.
7. **Sem script npm** dedicado ainda para validar fixtures de startups (a criar na 5A).

---

## 9. Achados classificados

### BLOCKER

_Nenhum._

### FIX_IN_5A

| ID  | Achado                                                                                      | Evidência                                                                                                 |
| --- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| F1  | Unificar fonte de itens de navegação ao habilitar rota do observatório                      | `GlobalHeader.astro` L19–28; `MobileNavigation.tsx` L15–19                                                |
| F2  | Decidir e documentar path canônico (`/inovacao/startups/` vs `/startups/`) e alinhar AI/ADR | `docs/implementation/02_Arquitetura_da_Informacao.md` L41–44; ausência de `src/pages/**/startups`         |
| F3  | Atualizar portal/status Home `#inovacao` e nav `available` quando a fundação for publicada  | `src/pages/index.astro` seção `#inovacao`; nav `Metodologia` ainda `available: false`                     |
| F4  | Atualizar e2e de foco do menu mobile ao adicionar novo link disponível                      | `tests/e2e/design-system.spec.ts` L59–71 (Tab até close assume 3 links)                                   |
| F5  | Introduzir schemas/loader/fixtures do domínio startups + comando de validação npm           | ausência em `src/schemas`, `src/data`, `package.json` scripts; modelo em `03_Modelo_de_Dados…` § startups |

### BACKLOG

| ID  | Achado                                                                                                   | Evidência                                                                                 |
| --- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| B1  | Regenerar/`MANIFEST.sha256` após formatação; reconciliar paths de ADRs no manifesto                      | check: 10 MISMATCH + 3 MISSING `./decisions/*`; nota em `09_Status_Quo_e_Divergencias.md` |
| B2  | Substituir `z.string().url()` deprecated (hint TypeScript)                                               | `src/schemas/source.ts:22`; `astro check` hint                                            |
| B3  | Nome genérico `schemas/socioeconomic/domain.ts` — considerar nomes mais específicos em refactors futuros | arquivo presente; sem impacto na 5A                                                       |
| B4  | Atualizar ponteiro local `main` para `origin/main` em ambientes de desenvolvimento                       | local `main=48dc6c1` vs `origin/main=f5daa92`                                             |

### NO_ACTION

| ID  | Achado                                               | Motivo                                                         |
| --- | ---------------------------------------------------- | -------------------------------------------------------------- |
| N1  | ADR-0003 proposto sem código de startups             | intencional; contrato futuro                                   |
| N2  | WOFF2 rastreados em `public/fonts/`                  | requisito de fontes locais                                     |
| N3  | `dist`/`playwright-report`/`test-results`/PNG locais | gitignored; não mutam Git                                      |
| N4  | Playwright rebuild com `BASE_PATH=/`                 | configuração documentada; workflows fazem build Pages separado |

---

## 10. Veredito

### `READY_WITH_FIXES_IN_5A`

Não há bloqueadores de integridade (SoTs), build, deploy estático, gates ou base arquitetural. A 5A pode iniciar, desde que incorpore naturalmente os ajustes F1–F5 (navegação única, rota canônica, Home/nav, e2e e domínio de dados/validação) e os contratos de fronteira F6–F9 do adendo do bot (snapshot publicado vs staging).

O futuro bot mensal/sob demanda **não precisa existir na 5A**. A arquitetura atual **permite** incorporá-lo depois **sem reconstruir o dashboard**, desde que a 5A publique apenas projeções derivadas de `PublishedSnapshot` e não misture candidatos/staging no bundle público.

---

## 11. Lista mínima ordenada antes/durante a 5A

1. **Na abertura da 5A:** escolher path canônico do observatório e registrar em AI/ADR (F2).
2. Extrair/centralizar itens de navegação e atualizar Home + flags `available` (F1, F3).
3. Criar domínio público do observatório lendo **somente** fixture/`PublishedSnapshot` (schemas, loader, validação npm) — sem CSV bruto nem candidatos no client (F5, F6, F8).
4. Namespaces explícitos para não colidir `Source`/`Claim` editoriais com entidades do pipeline (F7).
5. Atualizar e2e de menu mobile e smoke de rota nova (F4).
6. Declarar no ADR/contrato que `ResearchRun` / `ChangeSet` / staging ficam fora do site (F9; backlog de pipeline).
7. _(Backlog, não pré-requisito)_ reconciliar `MANIFEST.sha256` / hint Zod (B1, B2).

Nenhuma ação corretiva é exigida **antes** de abrir a 5A além do alinhamento de rota e da fronteira snapshot/staging (podem ser as primeiras decisões da própria 5A).

---

## 12. Confirmações finais

- **Iteração 5A não foi implementada** (sem rota, schema, DB, CSV ou entidades Startup).
- **Nenhum defeito foi corrigido** nesta rodada.
- **Nenhum** `format --write`, install de novas deps, commit, push, PR, merge, rebase ou deploy.
- `git status --short` **após gates** (antes deste relatório): limpo — igual ao inicial.
- Único arquivo versionado novo autorizado: este relatório em `painel-gsds/docs/audits/AUDITORIA_PRE_ITERACAO_5A.md`.
- Artefatos gerados pelos testes (`dist`, `playwright-report`, `test-results`, PNGs em `tests/visual/`): permanecem ignorados pelo Git.
- **Adendo do bot:** nenhuma entidade/pipeline/`ResearchRun`/`ChangeSet` foi criada em código; apenas avaliada no §13.

---

## 13. Adendo — prontidão para bot de atualização mensal/sob demanda

**Data do adendo:** 2026-08-14  
**Caráter:** read-only (somente este relatório). Sem schemas, diretórios ou código do sistema de ingestão.

### 13.1 Modelo futuro avaliado (contrato do adendo)

| Entidade futura     | Papel                                                |
| ------------------- | ---------------------------------------------------- |
| `StartupCandidate`  | candidato descoberto, ainda não publicado            |
| `Startup`           | identidade canônica da organização                   |
| `Source`            | fonte coletada (pipeline)                            |
| `Claim`             | alegação extraída e temporal (pipeline)              |
| `Evidence`          | relação claim ↔ fonte                                |
| `ReviewDecision`    | decisão humana/editorial                             |
| `PublishedSnapshot` | versão aprovada que alimenta o dashboard             |
| `ResearchRun`       | execução mensal ou manual                            |
| `ChangeSet`         | diferenças propostas vs. snapshot publicado anterior |

Mapeamento documental já existente (v0.3, **não implementado em código**): `DiscoveryCandidate` ≈ candidato; `Organization` ≈ Startup canônica; `SourceRun` ≈ fatia de execução por fonte; `Review` ≈ ReviewDecision; `SnapshotManifest` ≈ manifesto de PublishedSnapshot; pipeline `discover→…→publish` em `04_Stack…` §6.  
**`ResearchRun` e `ChangeSet` nomeados neste adendo ainda não aparecem como tipos explícitos no pacote** (há “report/changelog” e `previousSnapshotId`, mas não o objeto `ChangeSet`).

### 13.2 A arquitetura atual permite incorporar isso sem reconstruir o dashboard?

**Sim, com fronteiras claras.** Evidências:

- ADR-0003: ingestão fora do site; Pages consome **snapshots JSON validados**; candidatos não entram automaticamente.
- Stack (`04_Stack…`): site estático; componente **não lê CSV bruto**; falhas de pipeline não substituem o último snapshot válido; sem acoplamento runtime a fontes externas.
- Código vigente: loaders Zod + JSON importados no build (`loadHomeEvidence`, `loadAnalysisEvidence`) — padrão idêntico ao consumo de um `PublishedSnapshot` versionado.
- UI já separa evidência editorial (`source → claim → metric`) do futuro domínio de organizações; Home reserva `#inovacao` sem dados de empresas.

Não há BLOCKER estrutural ao bot. O risco principal é a **5A misturar staging com o bundle público** (F6/F8).

### 13.3 Componentes / padrões existentes reutilizáveis

| Recurso atual                                                          | Reuso no observatório + bot                                    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Zod + loaders + testes de IDs/refs/`approvedForPublication`            | Validar projeção pública do snapshot                           |
| `withBase` + dual `BASE_PATH` + CI/deploy Pages                        | Manter site 100% estático após publish                         |
| Research chrome (`ResearchHeader`, `EvidenceFooter`, badges, callouts) | Disclosure de cobertura, limitações, datas                     |
| `SectionPortal` / nav `available`                                      | Expor rota quando houver snapshot mínimo                       |
| `GSDExplorer` (island React)                                           | Padrão para futuro explorer sobre dataset público enxuto       |
| Modelo v0.3 §§6–10 + ADR-0003                                          | Contrato conceitual Organization/Candidate/Review/Snapshot     |
| Gate `approvedForPublication` em claims editoriais                     | Analogia a “só entra no PublishedSnapshot após ReviewDecision” |

### 13.4 Acoplamentos ou conflitos

| Conflito                                                                          | Detalhe                                                                                                                                      | Classificação      |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Homônimos `Source` / `Claim`                                                      | Já existem em `src/schemas/{source,claim}.ts` para SoTs; o bot usa os mesmos nomes para coleta/extração. Colisão de tipos/IDs se misturados. | FIX_IN_5A (F7)     |
| `claimDomainSchema`                                                               | Domínios atuais sem inovação/startup; expandir sem poluir claims SoT.                                                                        | FIX_IN_5A (F7)     |
| Docs: `Organization`/`DiscoveryCandidate` vs adendo: `Startup`/`StartupCandidate` | Sinônimos; 5A deve fixar vocabulário canônico.                                                                                               | FIX_IN_5A (F2/F7)  |
| `ResearchRun` / `ChangeSet`                                                       | Pipeline documenta estágios e `previousSnapshotId`, mas não tipa Run agregado nem ChangeSet.                                                 | BACKLOG (pipeline) |
| Nav/Home duplicadas                                                               | Já F1/F3 — afetam exposição pós-publish.                                                                                                     | FIX_IN_5A          |

### 13.5 Mudanças necessárias dentro da 5A

1. **Contrato público = `PublishedSnapshot` (ou fixture equivalente)** como única entrada dos componentes do dashboard (F6).
2. **Namespaces/caminhos** separados (ex.: published vs fixtures de teste); nunca importar candidatos no client (F8).
3. **Schemas da projeção pública** mínimos — não o grafo completo do bot (F5).
4. **Vocabulário e path de rota** alinhados (F2, F7).
5. **Validação npm** da projeção pública (F5).
6. **Registro explícito** de que staging/`ResearchRun`/`ChangeSet` ficam fora do app Pages (F9).

### 13.6 Mudanças que devem ficar para o pipeline futuro (não 5A)

- Orquestrador do bot; `ResearchRun` completo; execução idempotente mensal/manual
- Persistência de `StartupCandidate`, artefatos brutos, logs sem segredos
- Extração temporal de `Claim`/`Evidence` do pipeline; reconciliação de aliases/duplicatas
- `ReviewDecision` operacional (fila humana, SLA, protocolo)
- Geração automática de `ChangeSet` + changelog + métricas de cobertura
- Autenticação/CMS/DB se volume exigir (`04_Stack…` §5)
- Leitura de 50–100 fontes; importação CB Insights bruta no runtime

### 13.7 Riscos de misturar staging e dados publicados

| Risco                                               | Se ocorrer                           | Mitigação na 5A                                  | Classe                  |
| --------------------------------------------------- | ------------------------------------ | ------------------------------------------------ | ----------------------- |
| CSV/candidatos em `src/data` importados pelo Astro  | Vazam no bundle GitHub Pages         | Só `PublishedSnapshot`/fixture redigida no build | FIX_IN_5A (F8)          |
| Contar candidatos como “startups validadas”         | Falsa precisão                       | Contadores do snapshot com estados explícitos    | FIX_IN_5A (F6)          |
| Bot escrever direto sobre o JSON que a UI importa   | Corrompe publish; sem ReviewDecision | Publish gera artefato novo imutável              | BACKLOG (pipeline) + F9 |
| Reusar `claims.json`/`sources.json` SoT para coleta | Contamina rastreabilidade científica | Domínios/arquivos separados                      | FIX_IN_5A (F7)          |

### 13.8 Capacidade: site estático lendo apenas `PublishedSnapshot`

**Adequada.** SSG Astro; CI/deploy sem backend; ADR-0003/stack mandam Pages consumir snapshot validado; loaders já leem JSON tipado no build.  
**Condição:** a 5A não introduza fetch runtime a APIs de staging nem autenticação no client (não observado agora → NO_ACTION; acoplar fonte externa em runtime seria BLOCKER futuro, não atual).

### 13.9 Capacidade: proveniência, temporalidade e histórico

| Necessidade                  | Estado atual                                                       | Conclusão                                                                                           |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Proveniência editorial SoT   | `sourceRefs` / `sotRefs` / method+limitations                      | Padrão reutilizável                                                                                 |
| Proveniência do observatório | Documentada (`sourceRuns`, reviews, checksum); **não codificada**  | Projeção mínima na 5A; grafo completo no pipeline                                                   |
| Temporalidade                | Docs: Observation append-only; Claim editorial só `lastReviewedAt` | Histórico append-only = pipeline (BACKLOG); snapshot imutável + `previousSnapshotId` = base pública |
| Histórico de publicações     | `previousSnapshotId`; `SnapshotSelector` só com histórico          | Contrato OK; UI multi-snapshot = BACKLOG de produto                                                 |

### 13.10 Achados adicionais classificados

#### BLOCKER

_Nenhum adicional._

#### FIX_IN_5A (adendo)

| ID  | Achado                                                                                          | Evidência                                                        |
| --- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| F6  | `PublishedSnapshot` (fixture inicial) como **única** fonte do dashboard; contadores com estados | ADR-0003; `03_Modelo…` §§8–9; `05_Criterios…`                    |
| F7  | Evitar colisão com `Source`/`Claim` editoriais; namespacar domínio startups                     | `src/schemas/source.ts`, `claim.ts`; `claimDomainSchema`         |
| F8  | Não versionar/importar `StartupCandidate`, CSV bruto ou staging no client/build público         | `04_Stack…` L138; oportunidade enquanto staging ainda não existe |
| F9  | Documentar fronteira: bot/`ResearchRun`/`ChangeSet`/review operacional fora do app estático     | `04_Stack…` §6; ADR-0003 `proposed`                              |

#### BACKLOG (pipeline / pós-5A)

| ID  | Achado                                                                                            | Evidência                           |
| --- | ------------------------------------------------------------------------------------------------- | ----------------------------------- |
| B5  | Tipar `ResearchRun` e `ChangeSet` além de `SourceRun` + changelog narrativo                       | `03_Modelo…` §6.7–8; `04_Stack…` §6 |
| B6  | Observation append-only, fila `ReviewDecision`, idempotência, “falha não derruba último snapshot” | ADR-0003; `04_Stack…` L130          |
| B7  | `SnapshotSelector` / histórico multi-snapshot na UI após ≥2 publicações                           | `01_Design_System_v0.3.md` §11      |

#### NO_ACTION

| ID  | Achado                                              | Motivo                                                 |
| --- | --------------------------------------------------- | ------------------------------------------------------ |
| N5  | Bot ainda não existe no repositório                 | Esperado; auditoria não o cria                         |
| N6  | Modelo documental já separa discover→review→publish | Base suficiente para não redesenhar o dashboard depois |
| N7  | Site sem fetch runtime a fontes externas            | Compatível com leitura exclusiva de PublishedSnapshot  |

### 13.11 Implicação no veredito

O adendo **não altera** o veredito `READY_WITH_FIXES_IN_5A`. Reforça que a 5A deve estabelecer a **fronteira PublishedSnapshot ↔ staging** (F6–F9) para o bot futuro encaixar sem reconstrução do dashboard.

---

_Fim da auditoria (com adendo do bot). Aguardar revisão humana antes de corrigir achados ou iniciar a Iteração 5A._
