# Auditoria final 6D.4.4 — QA transversal do rollout institucional

**Status:** 6D.4 transversal QA ready for human audit
**Iteração:** 6D.4.4 (QA transversal; não é redesign)
**Produção alterada:** 0 arquivos (`ZERO_PRODUCTION_CHANGES`)
**Stop:** `WAIT_FOR_HUMAN_FINAL_6D4_APPROVAL`
**Commit / push / PR / merge / Deploy Pages:** não executados

Este relatório não declara autorização institucional.

---

## 1. Baseline

| Item                            | Valor                                                          |
| ------------------------------- | -------------------------------------------------------------- |
| Branch                          | `cursor/iteracao-6d44-final-transversal-qa`                    |
| HEAD (unmodified)               | `59f22297d26fdf20556b889e77dfa5fe4650583a`                     |
| `origin/main`                   | `59f22297d26fdf20556b889e77dfa5fe4650583a`                     |
| Working tree produção           | limpo (`src/**`, `public/**` intactos)                         |
| `format:check` na baseline main | PASS (antes da branch)                                         |
| Path-set desta iteração         | `tests/e2e/brand-rollout.spec.ts` + `docs/audits/6d4/final/**` |

Preview temporário em `http://127.0.0.1:4321/` (`BASE_PATH=/`) foi usado só para captura; o processo foi encerrado antes do E2E.

---

## 2. Escopo

Superfícies públicas auditadas em conjunto:

```text
/
analises/bases-clinicas/
analises/impacto-socioeconomico/
inovacao/startups/
```

`/design-system/` permanece referência interna/técnica e **não** faz parte do rollout público 6D. O hub raiz fora de `painel-gsds/` não foi redesenhado.

Expectativa cumprida: `ZERO_PRODUCTION_CHANGES`. Nenhum blocker exigiu editar `src/**` ou `public/**`.

---

## 3. Matriz das quatro superfícies

| Invariante                | Home                    | Clínica                  | Socio                    | Observatório             |
| ------------------------- | ----------------------- | ------------------------ | ------------------------ | ------------------------ |
| `body.brand-pilot`        | true                    | true                     | true                     | true                     |
| `img.brand__lockup`       | 1                       | 1                        | 1                        | 1                        |
| `.brand__mark`            | 0                       | 0                        | 0                        | 0                        |
| H1                        | Work Sans               | Work Sans                | Work Sans                | Work Sans                |
| body                      | Inter                   | Inter                    | Inter                    | Inter                    |
| favicon                   | `brand/gsd-favicon.svg` | `brand/gsd-favicon.svg`  | `brand/gsd-favicon.svg`  | `brand/gsd-favicon.svg`  |
| ResearchHeader            | 0 (N/A)                 | `research-header--brand` | `research-header--brand` | `research-header--brand` |
| `surface-executive`       | 0                       | 0                        | 0                        | 0                        |
| `research-header__notice` | 0                       | 1                        | 0                        | 0                        |
| `.footer-note`            | 0                       | 0                        | 0                        | 0                        |
| GlycogenBranchVisual      | 0                       | 0                        | 0                        | 0                        |
| EvidenceBadge             | 0                       | 0                        | 0                        | 0                        |

Diferenças semânticas entre páginas (notice clínico; Home sem ResearchHeader) foram preservadas.

Navegação pública same-origin: Home, Clínica, Socio, Observatório e âncoras de página. Nenhum `href` aponta para `/design-system/`, `docs/source-of-truth` ou `docs/audits`. Crawl same-origin: 0 status ≥ 400.

---

## 4. Assets / tipografia / lockup

| Asset                            | SHA-256                                                            | Status                                                                            |
| -------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `eretz-einstein-lockup.svg`      | `75002e60572743ba2c6a408e2d8cb5c4eee3a539abcb7d348245b90f59188443` | 1 lockup atômico no header; sem `.brand__mark`; sem reconstrução CSS              |
| `work-sans-latin-variable.woff2` | `1dd49afc07fb2231b2ff686cbf007725fb2742271bb1f28ebd98f22a0d817343` | local                                                                             |
| `work-sans-OFL.txt`              | `749aca05078664ce682dce1b1b10096ac397cb088c1a6df4e1bb56f0092a9272` | local                                                                             |
| `gsd-favicon.svg`                | `b033677f20a9ca7de88bbd374861923da261de403ca8d12cb0d3d3da5443be05` | `PRODUCT_UTILITY_ICON` / `NOT_INSTITUTIONAL_LOGO` / `FAVICON_DEFERRED_REFINEMENT` |

Network nas quatro rotas: 0 requests a `fonts.googleapis.com` ou `fonts.gstatic.com`. Inter e Work Sans são locais. Manrope permanece no bundle (não removido).

Identity drift: `background-image: none` em `body`, header e `h1` das quatro rotas. Sem estrela Einstein ornamental, sem segunda marca, sem círculo genérico.

Lockup: exatamente 1 por superfície pública; sem crop/recoloração dinâmica observada nas capturas. Autorização institucional formal **não** é inferida.

---

## 5. Responsividade

Breakpoint 72rem, idêntico nas quatro rotas:

| Largura                | desktop nav                | Menu    |
| ---------------------- | -------------------------- | ------- |
| 1440 / 1152            | visível (`display: block`) | oculto  |
| 1024 / 768 / 375 / 320 | oculto                     | visível |

Overflow do documento (`scrollWidth > clientWidth + 1`) = **false** em 1440, 1152, 1024, 768, 375 e 320 nas quatro rotas.

Exceções internas autorizadas em 320:

| Região                | overflow-x | clientWidth | scrollWidth | tabIndex |
| --------------------- | ---------- | ----------- | ----------- | -------- |
| Clínica `.table-wrap` | auto       | 278         | 371         | 0        |
| Socio `.table-wrap`   | auto       | 278         | 698         | 0        |

Menu 320 (Home como representante do componente compartilhado): painel `rgb(255, 255, 255)`, alpha 1, `body` overflow hidden ao abrir. O teste transversal prova o mesmo chrome nas quatro rotas.

---

## 6. Acessibilidade

Hard gate `0 serious / 0 critical` nas quatro rotas em 1440, 375 e 320: **PASS**.

Sweep de **todas** as severidades (incluindo minor/moderate):

| Superfície                    | 1440 | 375  | 320  |
| ----------------------------- | ---- | ---- | ---- |
| Home                          | `[]` | `[]` | `[]` |
| Clínica                       | `[]` | `[]` | `[]` |
| Socio                         | `[]` | `[]` | `[]` |
| Observatório (página fechada) | `[]` | `[]` | `[]` |
| Observatório filtros 375      | —    | `[]` | —    |
| Observatório drawer 375       | —    | `[]` | —    |

Nada restou para triagem como defeito. O teste E2E do Observatório da 6D.4.3 **não** foi revertido para `results.violations = []`; continua a bloquear `serious/critical` em múltiplos estados. O teste transversal da 6D.4.4 replica o mesmo hard gate nas quatro rotas.

Console: 0 `console.error`. 0 `pageerror`. 0 request same-origin falho. 0 response same-origin ≥ 400.

Leakage no DOM renderizado (não no código-fonte): 0 ocorrências de `VAL_TOT`, `docs/source-of-truth`, `fonte de verdade`, `SoT`, `clm-`, `met-`, `CAR-`, `ECO-`, `Projeção pública`, `Base curada`, `Somente relação direta.`, `Somente o recorte direto`, `não muda com os filtros do explorador`.

---

## 7. Regressões funcionais

### Home

Hero institucional preservado nas capturas 1440 (hash idêntico ao aprovado). `GlycogenBranchVisual = 0`. `EvidenceBadge = 0`. Lockup = 1.

### Clínica

Notice médico = 1. Explorer, muscular 8/13, Pompe 1/13, empty/reset e scroll interno da tabela continuam cobertos pela suíte existente; o teste transversal confirma table-wrap rolável em 320 sem overflow de body.

### Socio

Oito seções no sumário. DATASUS amber `rgb(233, 166, 58)` / `#e9a63a`. Qualificadores AIH ≠ paciente/prevalência e sizing ≈ €1,4 bilhão permanecem na suíte Socio. MarketSegmentMap faz scroll interno (`tabIndex = 0`).

### Observatório

120 organizações visíveis. VIZ01 81 / 28 / 11 / 0. VIZ02 33 / 88. Charts permanecem snapshot-static após filtro Direta (28 organizações no status; VIZ01 ainda mostra 81). Search, sort, filters e drawer continuam na suíte `startups.spec.ts`.

---

## 8. Freeze de dados

Snapshot `ecosystem-cumulative-direct-2026-08-24.json`:

```text
organizations = 120
assessments   = 121
sources       = 217
products      = 0
checksum      = 4e72dfe49fce8b06ac8ad1379cf7cc9dc83943b56d969b15693d6bacbd3fe75c
```

Charts publicados (DOM):

```text
VIZ01: adjacent 81 / direct 28 / unconfirmed 11 / ecosystem 0
VIZ02: Global 88 / Brasil 33 (overlap 1 no freeze; rótulo público: não mutuamente exclusivos)
VIZ03: current 13 / uncertain 4 / historical 11
VIZ04: private 8 / public biotech 9 / acquired/inactive 9 / unresolved 2
```

Não se usou `counts.adjacentGsd = 82` isolado como valor do chart.

---

## 9. SoTs

Não editados. SHA-256 reconfirmados:

```text
Socio:         489fd652f5ce6853908f59c18745c18282a65e946af59ab4dff3a142c210c3d2
Medical:       37e3fbea2513ff57f42937273622fee8592ce1d9df955c7467ef78f947866389
Design System: 634a782dedac32d63b20fb7988e1bdc0c39db9c41187cbe92c2e5113cb2a7bd6
INVENTORY:     266a341bf7f3d2e92d247b56554958edd027b4607db98642577c05da8923ae5c
```

---

## 10. CI readiness

| Gate                            | Resultado                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `format:check`                  | PASS                                                                                  |
| lint                            | PASS                                                                                  |
| typecheck                       | PASS (0 errors)                                                                       |
| unit                            | PASS — 82 tests / 13 files                                                            |
| `data:validate`                 | PASS — selector `snap-ecosystem-cumulative-direct-2026-08-24`                         |
| build `BASE_PATH=/`             | PASS — 5 pages                                                                        |
| build `BASE_PATH=/painel-gsds/` | PASS — 5 pages                                                                        |
| E2E `BASE_PATH=/`               | PASS — 69 tests (inclui 12 transversais novos)                                        |
| E2E `BASE_PATH=/painel-gsds/`   | PASS — 69 tests                                                                       |
| `git diff --check 59f2229`      | PASS após intent-to-add dos arquivos novos aprovados; index resetado após a validação |

`npm run format:check = PASS` também na baseline main, antes da branch, e de novo após os artefatos.

Artefatos de captura:

```text
docs/audits/6d4/final/screenshots/home-1440.png
docs/audits/6d4/final/screenshots/home-320.png
docs/audits/6d4/final/screenshots/clinical-1440.png
docs/audits/6d4/final/screenshots/clinical-320.png
docs/audits/6d4/final/screenshots/socio-1440.png
docs/audits/6d4/final/screenshots/socio-320.png
docs/audits/6d4/final/screenshots/observatory-1440.png
docs/audits/6d4/final/screenshots/observatory-320.png
docs/audits/6d4/final/screenshots/menu-320.png
```

Comparação SHA-256:

| Captura          | SHA-256                                                            | vs aprovado                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| home-1440        | `ae8d13f4fffe79c5083ade476442eee02fe3eeaba978f73192e534977b2426b4` | MATCH                                                                                                                                                               |
| clinical-1440    | `b5ce8d4ee6614b0f59cbf357931fa264b433eea110247c5a64aa09f7343a7911` | MATCH                                                                                                                                                               |
| socio-1440       | `e1893095280c5281c5d5b011013c587f0969c9a120a138fde094a4c788553fc8` | MATCH                                                                                                                                                               |
| observatory-1440 | `41cc9a445066170ef0d79bef4cf540120ac6724786ecba76f6262f5c27bb509a` | diverge do full-page 6D.4.3 `b1f7db6c…` — inspeção visual sem regressão de conteúdo/layout/shell; raster não determinístico de PNG longo; histórico não substituído |
| observatory-320  | `bbac3b522dfe6c7f1b394f77d3087eee553f1c772cdbc5e3c8cf7a0faf42f362` | MATCH vs `observatory-320-top.png` da 6D.4.3                                                                                                                        |
| menu-320         | `c606759c180375d9e190f193502662bf46871f9926850d02acdfbe6c5adb7fe9` | MATCH vs menu-320 Socio/Observatório                                                                                                                                |

Teste durável adicionado: `painel-gsds/tests/e2e/brand-rollout.spec.ts` (`TRANSVERSAL_REGRESSION_TEST_ADDED`). Codifica invariantes transversais; não duplica a suíte funcional já existente.

---

## 11. Pendências

Preservadas (não resolvidas nesta iteração):

```text
FORMAL_INSTITUTIONAL_AUTHORIZATION_PENDING
PENDING_OG_ASSET
FAVICON_DEFERRED_REFINEMENT
```

Nenhuma pendência nova comprovada. Nenhum blocker de produção.

---

## 12. Conclusão técnica

As quatro superfícies públicas compartilham o mesmo shell institucional (`brand-pilot`, lockup atômico, Work Sans / Inter locais, favicon de produto). Overflow, nav 72rem, axe (todas as severidades no sweep), leakage, fontes externas, freeze e SoTs passaram sem exigir correção de produção.

```text
6D.4 transversal QA ready for human audit
```

Stop:

```text
WAIT_FOR_HUMAN_FINAL_6D4_APPROVAL
```
