# Auditoria visual 6D.1 — Painel GSDs

**Status:** COMPLETE — 6D.1.1 documentary normalization — stop for external audit  
**Iteração:** 6D.1 (auditoria visual) + 6D.1.1 (normalização documental)  
**Autoridade visual:** `docs/implementation/ESPECIFICACAO_VISUAL_INSTITUCIONAL_6D.md` (6D.0; única cópia canônica)  
**Produção alterada:** 0 arquivos

Nenhuma fonte, ícone, CSS, componente, dado, screenshot ou copy de produção foi modificado. A 6D.1.1 corrige apenas schemas e enquadramento dos artefatos em `docs/audits/6d1/`.

---

## A. Executive summary

O Painel GSDs em `origin/main` (`11f4f7b77bb4f1d9f9ad2ec7fedc728e57ef4b35`, 6C aprovada) é um produto funcional com identidade **Design System v0.2**: Inter no corpo, **Manrope** nos títulos, paleta **teal/ink/paper**, marca gráfica genérica em CSS (círculo teal `.brand__mark`, não institucional) e favicon padrão Astro.

A 6D.0 exige identidade digital Einstein: **Work Sans** em headings, **Inter** em UI, azuis `#00539A` / `#0096D2` / `#00DBFF`, neutros `#212121`–`#FFFFFF`, e **assets oficiais** (lockup Eretz.bio × Einstein se autorizado). Nenhum desses azuis institucionais aparece no CSS de produção. Work Sans e Montserrat não estão instalados. O lockup oficial **não está no repositório**.

A distância é de **identidade**, não de arquitetura. Layout, filtros, drawers, agregações e copy da 6C podem permanecer. A maior parte dos componentes é **RESTYLE** via tokens. O que não pode ser “deixado com cara do Einstein” por interpretação livre:

1. **BLOCKER** — fonte display Manrope ≠ Work Sans (`MANDATORY_BRAND`). Swap real de fonte = `6D.2_FOUNDATION` **BLOCKED_BY_ASSET**.
2. **BLOCKER** — paleta teal ≠ azuis Einstein (`MANDATORY_BRAND`). Introdução de primitivos/aliases = 6D.2 `READY_NOW`; recoloração das superfícies = 6D.3/6D.4.
3. **HIGH** — `.brand__mark` é marca gráfica genérica em CSS, não uma assinatura institucional autorizada. **Não** é reconstrução da estrela/wordmark/lockup Einstein. Substituição = 6D.3 com asset autorizado.
4. **BLOCKER** — lockup ausente (`PENDING_ASSET_IMPORT` + `AUTHORIZATION_STATUS_PENDING_VALIDATION`).
5. **HIGH** — cores semânticas (evidência, charts, success/warning/danger) **não** devem virar os três azuis (`NEEDS_SEMANTIC_COLOR_DECISION`).
6. **HIGH** — menu mobile: o diálogo sobrepõe o conteúdo com transparência suficiente para comprometer leitura (`home-menu-mobile-375.png`). Correção visual = 6D.3; opacidade final = decisão de produto.

**6D.2** é foundation **additive / non-rollout**: contrato de tokens em `tokens.css` (e aliases em `global.css` se necessário), **sem** remapear as quatro superfícies. Work Sans / `LocalFonts.astro` = **BLOCKED_BY_ASSET**. **6D.3** é o piloto da Home (hero, header/footer, métricas, portais, menu, favicon se autorizado). Clínica / Socio / Observatório ficam para **6D.4**.

---

## B. Baseline

| Item                                           | Valor                                                                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branch                                         | `main`                                                                                                                                                            |
| HEAD                                           | `11f4f7b77bb4f1d9f9ad2ec7fedc728e57ef4b35`                                                                                                                        |
| `origin/main`                                  | `11f4f7b77bb4f1d9f9ad2ec7fedc728e57ef4b35`                                                                                                                        |
| Commit                                         | Merge pull request #12 (6C.1.3)                                                                                                                                   |
| Spec 6D.0                                      | `painel-gsds/docs/implementation/ESPECIFICACAO_VISUAL_INSTITUCIONAL_6D.md` (canônica; SHA-256 `88b23f8944a50dcffa97ea4cae9ec08c6042fae96929082cb279507d04aee4f4`) |
| Build `BASE_PATH=/`                            | OK (2026-09-17)                                                                                                                                                   |
| Build `BASE_PATH=/painel-gsds/`                | OK; preview `http://127.0.0.1:4321/painel-gsds/` usado para screenshots                                                                                           |
| Freeze orgs / assessments / sources / products | 120 / 121 / 217 / 0                                                                                                                                               |
| VIZ01                                          | 81 / 28 / 11 / 0                                                                                                                                                  |
| VIZ02                                          | 88 / 33                                                                                                                                                           |
| VIZ03                                          | 13 / 4 / 11                                                                                                                                                       |
| VIZ04                                          | 8 / 9 / 9 / 2                                                                                                                                                     |
| Snapshot checksum                              | `4e72dfe49fce8b06ac8ad1379cf7cc9dc83943b56d969b15693d6bacbd3fe75c`                                                                                                |
| `data:validate`                                | OK → `snap-ecosystem-cumulative-direct-2026-08-24`                                                                                                                |
| SoT Design System SHA-256                      | `634a782dedac32d63b20fb7988e1bdc0c39db9c41187cbe92c2e5113cb2a7bd6`                                                                                                |
| SoT Socio SHA-256                              | `489fd652f5ce6853908f59c18745c18282a65e946af59ab4dff3a142c210c3d2`                                                                                                |
| SoT Medical SHA-256                            | `37e3fbea2513ff57f42937273622fee8592ce1d9df955c7467ef78f947866389`                                                                                                |
| SoT INVENTORY SHA-256                          | `266a341bf7f3d2e92d247b56554958edd027b4607db98642577c05da8923ae5c`                                                                                                |

Screenshots (somente `docs/audits/6d1/screenshots/`; `tests/visual/**` não tocado):

```text
home-1440.png
home-375.png
home-menu-mobile-375.png
clinical-1440.png
clinical-375.png
clinical-filtered-1440.png
socio-1440.png
socio-375.png
observatory-1440.png
observatory-375.png
observatory-filtered-1440.png
observatory-drawer-1440.png
```

Helper de captura (não é produção): `docs/audits/6d1/capture-baseline.mjs`.

Working tree além da produção: spec 6D.0 canônica em `docs/implementation/` + pasta `docs/audits/6d1/`. Diff de `src/`, `public/`, `tests/` = vazio. A duplicata da spec na raiz do repositório foi removida na 6D.1.1.

---

## C. Foundations

### Tipografia

**FACT**

- Faces locais: Inter variable 100–900 (roman + italic) e Manrope variable 200–800, WOFF2 em `public/fonts/`, licenças OFL em `public/fonts/licenses/`.
- Tokens: `--font-display: Manrope…`; `--font-body: Inter…`.
- `global.css` aplica Inter no `body` e Manrope em `h1, h2, h3, .display` (line-height 1.15, letter-spacing −0.02em).
- Work Sans: 0 arquivos. Montserrat: 0 arquivos.
- Escala: `--display-xl` até `--annotation` (clamps). Não congelada pela 6D.0 (`PENDING_VALIDATION`).

**Classificação por função**

| Função                                      | Face atual                     | 6D.0                           | Ação                                            |
| ------------------------------------------- | ------------------------------ | ------------------------------ | ----------------------------------------------- |
| H1–H6 / display                             | Manrope                        | Work Sans                      | `RESTYLE_FONT`                                  |
| Corpo / labels / inputs / tabelas / filtros | Inter                          | Inter                          | `KEEP_STRUCTURE`                                |
| Weights                                     | variáveis; headings 700 comuns | evitar >2 pesos na mesma frase | `KEEP_STRUCTURE` + checar no piloto             |
| Scale / tracking                            | clamp + −0.02em                | não especificado               | `NEEDS_DECISION` / `RESTYLE_SCALE` só após Home |

**INFERENCE:** troca Manrope → Work Sans pode alterar wrapping do H1 da Home (“Glicogenoses: uma família…”), altura de cards, labels de gráficos e menu mobile. Não medido com Work Sans porque a fonte não foi instalada.

### Cores

**FACT**

- 13 hex no DS: ink 950/800/600, paper 50/100, teal 700/500, cyan 300, amber 500, coral 500, green 500, line 200, white.
- Einstein `#00539A` `#0096D2` `#00DBFF` e neutros `#212121`–`#F2F2F2`: **0 ocorrências** em `src/`.
- RGB hardcoded fora de tokens: 5 (header translúcido, anel do mark, hover de botão, borda ghost, notice do ResearchHeader). Elevações/scrim usam `rgb(7 27 37 / …)` dentro de tokens.
- `--ink-700` é **referenciado e não definido** (FACT de buraco; valor de substituição = `NEEDS_DECISION`, não pré-determinado nesta auditoria).
- `--focus-ring` = teal-500; `:focus-visible` 2px / offset 3px existe.

**Mapeamento vs 6D.0**

| Papel atual                | Token atual  | 6D.0                          | Status                            |
| -------------------------- | ------------ | ----------------------------- | --------------------------------- |
| Brand / links / charts     | teal-500/700 | brand-blue-dark/medium        | `CONFLICTS`                       |
| Accent hero                | cyan-300     | brand-blue-light              | `CONFLICTS` (não são o mesmo hex) |
| Texto                      | ink-*        | neutral-900/700               | `CONFLICTS`                       |
| Superfície                 | paper-*      | white / neutral-50            | `CONFLICTS`                       |
| Borda                      | line-200     | #D4D4D4                       | `CONFLICTS`                       |
| White                      | --white      | #FFFFFF                       | `MATCHES_6D0`                     |
| Evidence estimated/limited | amber-500    | não mapear para azul          | `NEEDS_SEMANTIC_COLOR_DECISION`   |
| Success/danger tokens      | green/coral  | não inventar a partir do guia | `NEEDS_SEMANTIC_COLOR_DECISION`   |

### Spacing, radii, shadows, motion, z-index, containers

**FACT**

- Spacing `--space-1`…`--space-11` (0.25rem–8rem).
- Raios distintos: 12 / 16 / 18 / 999px (pills) / 4px (página DS) + `--radius-sm` **indefinido** (FACT de buraco; valor = `NEEDS_DECISION`).
- Shadows: 2 elevações tokenizadas + anel do mark + underline inset da nav + inset do badge not-calculable.
- Breakpoints: 48rem (grid 8) e 64rem (nav desktop / grid 12).
- Widths: 80 / 73.75 / 48 rem.
- Motion: 180/220/260ms; `prefers-reduced-motion` honrado.
- Z-index documentado até `--z-skip: 1000`.
- `--touch-min: 2.75rem` (44px).

**INFERENCE:** 6D.0 classifica scale/radii/shadows como `PENDING_VALIDATION`. Recomendação operacional: **KEEP** a escala atual na 6D.2 e só ajustar se o piloto Home quebrar hierarquia — isso é `DASHBOARD_DECISION`, não regra Einstein.

### Charts

**FACT:** `StartupBarChart` pinta todas as barras com `var(--teal-500)`; valores numéricos e labels estão visíveis (cor não é o único discriminador). `GlycogenBranchVisual` usa gradiente cyan→teal autoral. `DataAbsentState` usa hatch com tokens de paper.

**DECISION_NEEDED:** paleta categórica dos VIZ; fórmula CSS do gradiente Einstein (`PENDING_VALIDATION` na spec).

Quantitativos pedidos:

| Métrica                         | Contagem                                             |
| ------------------------------- | ---------------------------------------------------- |
| Hex no DS (`tokens.css`)        | 13                                                   |
| Hex Einstein em `src/`          | 0                                                    |
| RGB hardcoded em componentes    | 5                                                    |
| RGB em tokens (elevação/scrim)  | 3 definições                                         |
| `font-family` matches em `src/` | 23 (3 literais Inter/Manrope; resto `var(--font-*)`) |
| Shadows distintas               | 5 (2 tokens + 3 locais)                              |
| Radii distintos                 | 6 incluindo sm ausente                               |

---

## D. Brand assets

### Logos / marks

| Asset                       | Arquivo                             | Formato | Dimensões         | Uso              | Tipo                                             | Duplicado?            | Área livre                                           | Mobile             |
| --------------------------- | ----------------------------------- | ------- | ----------------- | ---------------- | ------------------------------------------------ | --------------------- | ---------------------------------------------------- | ------------------ |
| Brand mark header           | `GlobalHeader.astro` `.brand__mark` | CSS     | 0.75rem × 0.75rem | todas as páginas | marca gráfica genérica em CSS, não institucional | não                   | gap `--space-3`; regra 2×E não se aplica a este disc | visível 375        |
| Wordmark                    | texto “Painel GSDs”                 | HTML    | type              | header           | nome de produto, não lockup Einstein             | footer tem nome longo | n/a                                                  | wrapping ok em 375 |
| Favicon SVG                 | `public/favicon.svg`                | SVG     | viewBox 128       | tab + `og:image` | Astro default rocket                             | ico separado          | n/a                                                  | n/a                |
| Favicon ICO                 | `public/favicon.ico`                | ICO     | 655 bytes         | legacy           | não institucional                                | sim vs svg            | n/a                                                  | n/a                |
| Lockup Eretz.bio × Einstein | **ausente**                         | —       | —                 | —                | —                                                | —                     | —                                                    | —                  |
| Estrela Einstein            | **ausente**                         | —       | —                 | —                | —                                                | —                     | —                                                    | —                  |

**FACT:** `PENDING_ASSET_IMPORT`.  
**FACT:** `AUTHORIZATION_STATUS_PENDING_VALIDATION` para o lockup combinado.  
**FACT:** `.brand__mark` é um círculo teal CSS (`aria-hidden`); não reproduz estrela Einstein, wordmark Einstein nem lockup Eretz/Einstein.  
Não importado, não separado, não recriado a partir do asset oficial (ausente).

### Iconografia

| icon                 | purpose             | source             | style                | size      | accessible_name                             | consistency                     | action                           |
| -------------------- | ------------------- | ------------------ | -------------------- | --------- | ------------------------------------------- | ------------------------------- | -------------------------------- |
| ☰                   | abrir menu          | Unicode            | glyph                | ~1em      | botão tem texto “Menu”; ícone `aria-hidden` | único padrão de ícone de chrome | `REPLACE_WITH_SYSTEM_ICON`       |
| ✕                    | fechar menu         | Unicode            | glyph                | ~1em      | “Fechar”; ícone `aria-hidden`               | idem                            | `REPLACE_WITH_SYSTEM_ICON`       |
| `.brand__mark`       | identidade          | CSS circle         | filled disc + glow   | 12px      | `aria-hidden`                               | não é ícone de sistema          | `REPLACE` (asset oficial)        |
| EvidenceBadge mark   | estado de evidência | CSS disc / dotted  | filled or dotted     | 0.55rem   | label textual no botão                      | consistente no badge            | `RESTYLE` + `NEEDS_DECISION` cor |
| GlycogenBranchVisual | metáfora hero       | SVG inline autoral | stroke round + nodes | max 28rem | title+desc                                  | único ilustrativo               | `NEEDS_DECISION`                 |
| Flaticon / lib       | —                   | —                  | —                    | —         | —                                           | ausente                         | não pesquisar / não baixar       |

Onde iconografia será necessária na 6D (candidato da spec, **não** baixado): Clínica, Socioeconômico, Organizações, Busca, Filtro, Dados, Fonte, Informação, Alerta, Abrir detalhe, Fechar, Menu, Navegação.

**FACT:** drawer e filtros do Observatório usam texto (“Ver detalhe”, checkboxes nomeados), não ícones. Menu mobile é o único chrome unicode.

---

## E. Component inventory

Síntese de `COMPONENT_INVENTORY_6D1.csv` (56 registros).

| classification | count                                                  |
| -------------- | ------------------------------------------------------ |
| KEEP           | 2                                                      |
| RESTYLE        | 45                                                     |
| REPLACE        | 5                                                      |
| REMOVE         | 0                                                      |
| NEEDS_DECISION | 3                                                      |
| DEFER          | 1 (`BurdenPathway.astro` existe e **não é importado**) |

**KEEP:** `PageContainer` (fase `DEFER` — sem mudança foundation), `SkipLink` (estrutura KEEP; revalidar contraste no piloto 6D.3).

**REPLACE:** `LocalFonts` (Manrope → Work Sans quando houver arquivo), `GlobalHeader` (mark), `MobileNavigation` (ícones), `favicon.svg`, `favicon.ico`.

**NEEDS_DECISION:** `GlycogenBranchVisual`, `EvidenceBadge` (cores semânticas), `StartupBarChart` (paleta).

**RESTYLE:** chrome, cards, explorer clínico, socio, observatório, botões, headers analíticos — via tokens, sem mudar comportamento.

Fase (após 6D.1.1):

- **6D.2_FOUNDATION READY_NOW:** `src/styles/tokens.css` (primitivos Einstein + aliases novos; preservar legacy tokens consumidos). `src/styles/global.css` só se aliases não mudarem o output visual.
- **6D.2_FOUNDATION BLOCKED_BY_ASSET:** `LocalFonts.astro` (Work Sans). Inter permanece; Manrope não troca globalmente até o arquivo/licença.
- **6D.3_HOME_PILOT:** BaseLayout, SkipLink (revalidar contraste), GlobalHeader/nav/footer, Home*, KeyMetric, EvidenceBadge, SectionPortal, SourceAnchor, UtilitiesButtons, favicons (`BLOCKED_BY_ASSET / AUTHORIZATION`), RGB do GlobalHeader, overlay do menu mobile.
- **6D.4_ROLLOUT:** Clínica, Socio, Observatório (inclui StartupBarChart, StartupBadges), ResearchHeader (RGB restante), EvidenceFooter.
- **DEFER:** `HeroStatement` (só Design System), `BurdenPathway` (órfão), `PageContainer` (KEEP, sem mudança foundation).

---

## F. Page audits

Toda conclusão marcada. Preferência estética não é evidência.

### Home (`/`)

**Hierarquia**

- **FACT:** H1 display no hero escuro; H2 nas seções editoriais; kickers uppercase annotation. Contraste hero (paper sobre ink-950) visualmente alto no screenshot 1440; contraste editorial ink sobre paper-50 também.
- **INFERENCE:** Work Sans no H1 pode reflow a linha “múltiplas jornadas”.
- **DECISION_NEEDED:** manter faixa executiva escura mapeada para `brand-blue-dark` ou ir para chrome claro como a spec sugere para header.

**Grid**

- **FACT:** `.container` 80rem; hero 2 colunas no 1440; 1 coluna no 375 com visual abaixo do copy (`home-375.png`). Ritmo `section-space` / `stack`.

**Superfícies**

- **FACT:** hero `surface-executive`; resto `paper-50` cards `radius-lg` sombras leves. Identidade teal/cyan.

**Controls**

- **FACT:** `btn--on-dark` ciano e ghost; portais `btn--secondary` teal. Alvos ≥ `--touch-min`.

**Responsividade**

- **FACT:** 375 empilha seções sem overflow horizontal visível no screenshot full-page. Menu: ver abaixo.

**Identidade**

- **FACT:** maior distância à 6D.0 das quatro superfícies (hero + mark + Manrope + teal).
- **INFERENCE:** piloto correto (spec §16).

**A11y visual**

- **FACT:** skip link, focus-visible global, reduced-motion no SVG.
- **FACT:** `home-menu-mobile-375.png` — o menu/dialog sobrepõe o conteúdo subjacente com transparência suficiente para comprometer a leitura (H1 do hero permanece legível através do painel). Severity **HIGH** (legibilidade/usabilidade atual, não preferência estética). Target **6D.3_HOME_PILOT**. Não corrigir produção nesta iteração.
- **DECISION_NEEDED:** qual opacidade/cor final usar no scrim/painel.

### Clínica (`/analises/bases-clinicas/`)

**Hierarquia**

- **FACT:** ResearchHeader escuro + H1 “Bases clínicas das glicogenoses”; nav de seções; explorer com select+search; cards `h3`; tabelas depois. Kickers uppercase.

**Grid**

- **FACT:** container global; explorer controls 2 colunas ≥48rem; cards em lista.

**Superfícies**

- **FACT:** mais sóbria que Home abaixo do header; cards claros borda `line-200`.

**Controls**

- **FACT:** `clinical-filtered-1440.png` — filtro “Hepático” aplicado; count live. Select/input tokenizados `radius-md`.

**Responsividade**

- **FACT:** `clinical-375.png` captura full-page sem corte de chrome; tabelas longas são risco 320px (gate 6D.4), não medido aqui além de 375.

**Identidade**

- **FACT:** herda Manrope + header teal/ink; conteúdo científico já “sóbrio” (alinhado à direção 6D.0 §14). Distância menor que Home.

**A11y**

- **FACT:** labels no explorer; count `role="status"`. Focus teal.

### Socio (`/analises/impacto-socioeconomico/`)

**Hierarquia**

- **FACT:** mesmo ResearchHeader; seções Carga → Cuidador → Custos → Brasil → Segmentos → Dimensionamento → Lacunas → Fontes. Cards content-first.

**Grid / superfícies**

- **FACT:** `socio-1440.png` e `socio-375.png` — cards `radius-lg`, pouco teal de acento, densidade editorial. Não há gráficos de barras nesta página.

**Controls**

- **FACT:** quase só navegação in-page; sem drawer.

**Identidade**

- **FACT:** menor carga de marca institucional no miolo; o gap dominante é o par header+tipos Manrope/Inter e tokens teal residuais em links.

**A11y**

- **FACT:** `BrazilEvidencePanel` permanece `dl` (6C); visual não reabre copy.

### Observatório (`/inovacao/startups/`)

**Hierarquia**

- **FACT:** ResearchHeader + H2 “Organizações publicadas” + lista densa + “Visão analítica” com `StartupBarChart`.

**Grid**

- **FACT:** lista full-width; `observatory-1440.png` é extremamente alto (120 cards) — densidade operacional, não gap de marca (`severity NONE` na matrix).

**Controls**

- **FACT:** search, checkboxes, sort, “Ver detalhe”. `observatory-filtered-1440.png` — “Direta às GSDs” reduz a lista (28 no recorte visível no drawer shot). `observatory-drawer-1440.png` — painel direito “Actus Therapeutics”, botão “Fechar detalhe”, badges teal.

**Responsividade**

- **FACT:** `observatory-375.png` full-page gerado; lista continua o elemento principal (spec §14).

**Identidade**

- **FACT:** badges relation usam borda teal; barras analytics teal único. `--ink-700` indefinido nestes componentes.

**A11y**

- **FACT:** drawer com backdrop; labels de filtro nominais. Cor das barras não é único discriminador (número ao lado).
- **DECISION_NEEDED:** paleta categórica se 6D.4 colorir séries.

---

## G. Cross-cutting gaps

Repetidos nas quatro superfícies:

1. Manrope em todo heading.
2. Teal como cor de ação/foco/badge/chart.
3. Mark CSS genérico (`.brand__mark`) + título “Painel GSDs” no header sticky translúcido — não é lockup Einstein.
4. ResearchHeader / Home hero em ink-950 (três páginas analíticas + Home).
5. Inter no corpo (compatível).
6. Focus visível teal (existe; cor a remapear).
7. Hardcodes RGB de paper/teal: 2 em `utilities.css` (6D.2 só se o output permanecer idêntico), 2 em `GlobalHeader.astro` (6D.3), 1 em `ResearchHeader.astro` (6D.4).
8. Favicon foguete em todas as abas (substituição = 6D.3, `BLOCKED_BY_ASSET`).
9. Menu mobile: sobreposição com transparência que compromete leitura (HIGH, 6D.3).

Não são gaps de marca (não usar severidade estética):

- Densidade da lista do Observatório.
- Quantidade de cards no Socio.
- Preferência por mais/menos sombra.

Bugs de token (produção atual, **não corrigidos** nesta iteração):

- `--ink-700` indefinido — FACT; valor de substituição `NEEDS_DECISION`.
- `--radius-sm` indefinido — FACT; valor de substituição `NEEDS_DECISION`.

---

## H. Human decisions required

Somente o que a 6D.0 não resolve:

1. **Autorização do lockup** Eretz.bio × Einstein (origem Núcleo de Marca). `AUTHORIZATION_STATUS_PENDING_VALIDATION`.
2. **Arquivo/licença Work Sans** (e se Montserrat entra só como fallback).
3. **Fórmula CSS do gradiente Einstein** — não inventar stops.
4. **Paleta semântica** success / warning / danger / evidence states — `NEEDS_SEMANTIC_COLOR_DECISION`.
5. **Paleta categórica dos charts** — não colapsar VIZ em três azuis.
6. **Hero executivo escuro** vs chrome claro institucional na Home/header.
7. **Colocação do lockup** (header, footer, ambos) após mins de redução do lockup combinado.
8. **GlycogenBranchVisual:** restyle de stroke para tokens semânticos vs manter metáfora autoral vs reduzir no piloto.
9. **Opacidade do menu mobile** — FACT da sobreposição já observado; a decisão humana é só o valor final de opacidade/cor (6D.3).
10. **Favicon / OG** — qual asset oficial, se algum, substitui o foguete Astro (`BLOCKED_BY_ASSET`).
11. **Estratégia de compatibilidade** para `--ink-700` e `--radius-sm` (não pré-determinada).

A regra 6D.0 de não reconstruir a marca Einstein permanece válida para a implementação futura. Ela **não** descreve o `.brand__mark` atual (círculo genérico). Não instalar Flaticon nesta iteração; freeze 6C de dados/copy.

---

## I. 6D.2 recommended scope

Foundation **additive / non-rollout**. Não recolorir as quatro superfícies. Não iniciar Home visual. Sem instalar fontes/ícones até autorização explícita.

### READY_NOW

Arquivo principal:

```text
src/styles/tokens.css
```

Opcional, só para organizar aliases **sem alterar consumo visual**:

```text
src/styles/global.css
```

Objetivo:

1. Introduzir primitivos `--einstein-blue-*` e `--einstein-neutral-*` + aliases `--color-brand-*` / `--color-text-*` / `--color-border-*` / `--color-surface-*` como na spec §11.
2. Preservar temporariamente os legacy tokens (`--ink-*`, `--teal-*`, `--paper-*`, `--font-display` Manrope) consumidos pelas páginas, para não remapear Home/Clínica/Socio/Observatório antes do piloto.
3. Documentar depreciação futura dos tokens teal/ink/paper.
4. **Não** remapear `--amber-500` / `--coral-500` / `--green-500` / barras de chart para azuis.
5. Não tocar páginas, explorers, dados, copy, testes visuais.

RGB: os 2 hardcodes de `utilities.css` podem ser tokenizados em 6D.2 **somente se** o output visual permanecer idêntico. Os 2 de `GlobalHeader.astro` = 6D.3. O 1 de `ResearchHeader.astro` = 6D.4. Não expandir a 6D.2 a esses componentes só para “zerar hardcodes”.

`--ink-700` e `--radius-sm`: buracos factuais. A 6D.2 escolhe a estratégia de compatibilidade (`NEEDS_DECISION`); esta auditoria **não** pré-determina alias temporário.

`--focus-ring`: pode ganhar alias de marca no contrato de tokens; o consumo visual nas páginas muda no piloto, após contraste WCAG.

### BLOCKED_BY_ASSET

```text
src/components/layout/LocalFonts.astro
```

Work Sans só entra quando arquivo/licença existir e for validado. Inter permanece. Não trocar Manrope globalmente antes dessa condição.

Favicon/lockup: **não copiar** para `public/` na 6D.2 (`BLOCKED_BY_ASSET / AUTHORIZATION` → 6D.3).

Fora de 6D.2: `GlobalHeader` mark, `BaseLayout` metadata, `EvidenceBadge` visual, `StartupBarChart`/`StartupBadges`, `UtilitiesButtons` aparência nova, Glycogen SVG, drawers, menu overlay.

---

## J. 6D.3 Home pilot recommended scope

Depois do freeze de tokens 6D.2 e da auditoria humana da 6D.1.

Arquivos/componentes:

```text
src/layouts/BaseLayout.astro
src/components/layout/GlobalHeader.astro
src/components/layout/MobileNavigation.tsx
src/components/layout/GlobalFooter.astro
src/pages/index.astro
src/components/home/GlycogenBranchVisual.astro
src/components/home/ProblemInOneMinute.astro
src/components/home/MechanismToLife.astro
src/components/home/HomeMetrics.astro
src/components/home/ObservedVsNeed.astro
src/components/home/BrazilOverview.astro
src/components/home/HomeMethodology.astro
src/components/executive/KeyMetric.astro
src/components/executive/SectionPortal.astro
src/components/evidence/EvidenceBadge.astro
src/components/evidence/SourceAnchor.astro
```

Incluir header/footer globais no piloto porque a Home os exerce; o efeito colateral nas outras páginas é esperado e deve ser re-screenshotado, **sem** restyle específico de Clínica/Socio/Observatório.

Também no piloto: RGB do `GlobalHeader`, overlay/legibilidade do menu mobile (FACT já observado; DECISION de opacidade), favicon/og se o asset estiver autorizado (`BLOCKED_BY_ASSET` até lá), `EvidenceBadge` (Home o exerce).

Preservar: copy 6C, CTAs `href`, evidência, ausência ≠ zero, `withBase`.

Não incluir: `GSDExplorer`, socio components, `StartupExplorer` / drawer / `StartupBarChart` / `StartupBadges`.

---

## K. Do-not-touch

```text
docs/source-of-truth/**
dados / snapshots / checksum
copy editorial 6C
agregações VIZ01–VIZ04
comportamento de filtros / busca / drawer
schemas Zod
CMS / backend / analytics / cookies / forms
branding institucional files (inexistentes — não inventar)
tests/visual/** (não sobrescrever)
commit / push / PR / merge / deploy
instalação de fontes ou ícones nesta iteração
A02 / A13 / A14 / A15 / A31 / A32
```

`CLAUDE.md` format fail pré-existente: não editar.

---

## L. FACTS / INFERENCES / PENDINGS

### FACTS

- HEAD == `origin/main` == `11f4f7b77bb4f1d9f9ad2ec7fedc728e57ef4b35`.
- Freeze 120 / 121 / 217 / 0 e checksum `4e72dfe4…3fe75c` intactos; `data:validate` OK.
- Builds `BASE_PATH=/` e `/painel-gsds/` OK.
- 12 screenshots baseline em `docs/audits/6d1/screenshots/`.
- Produção (`src/`, `public/`, `tests/`) diff vazio.
- Identidade atual: Inter + Manrope + teal/ink/paper; marca gráfica genérica em CSS (`.brand__mark`); favicon Astro.
- Einstein blues e Work Sans ausentes no código/fontes.
- Lockup oficial ausente no repo.
- `.brand__mark` não reproduz estrela, wordmark ou lockup Einstein.
- `--ink-700` e `--radius-sm` indefinidos mas referenciados; valores `NEEDS_DECISION`.
- 5 RGB hardcoded em componentes (2 utilities / 2 GlobalHeader / 1 ResearchHeader); 13 hex no DS.
- Menu mobile: FACT de sobreposição com transparência que compromete leitura; severity HIGH; 6D.3.
- Spec 6D.0 canônica apenas em `docs/implementation/` (duplicata da raiz removida na 6D.1.1).
- `BurdenPathway.astro` não é usado.

### INFERENCES

- 6D.2 `READY_NOW` = contrato additive em `tokens.css`, sem rollout visual.
- 6D.2 `BLOCKED_BY_ASSET` = Work Sans / `LocalFonts.astro`.
- 6D.3 Home é o piloto correto (hero + chrome + métricas + menu + mark).
- Mapear executive dark para azul-escuro Einstein é decisão de dashboard, não obrigação do guia.
- Work Sans pode alterar wrapping; precisa prova no piloto, não na auditoria.

### PENDINGS

- Autorização e arquivo do lockup (`AUTHORIZATION_STATUS_PENDING_VALIDATION`).
- Arquivos/licença Work Sans (e política Montserrat fallback).
- Gradiente oficial (stops).
- Cores semânticas e paleta de charts.
- Colocação e min-size do lockup combinado.
- Destino do GlycogenBranchVisual.
- Overlay do menu mobile.
- Asset de favicon/OG.
- Sem commit/push/PR/merge/deploy nesta iteração.

---

## Gate 6D.1 / 6D.1.1

- [x] produção não mudou
- [x] dados não mudaram
- [x] copy não mudou
- [x] screenshots das 4 superfícies intactos (12 arquivos; hashes inalterados na 6D.1.1)
- [x] foundations inventariadas
- [x] componentes inventariados
- [x] gap matrix criada
- [x] gaps separados de preferências
- [x] brand facts separados de dashboard decisions
- [x] CSV schemas respeitados (6D.1.1)
- [x] `.brand__mark` não descrito como reconstrução Einstein
- [x] 6D.2 additive / path-set não contradiz RGB
- [x] phases foundations → Home pilot → rollout
- [x] menu mobile HIGH / 6D.3
- [x] spec 6D.0 canônica única
- [x] pendências humanas explícitas

**Handoff:** parar. Aguardar auditoria externa. Não iniciar 6D.2.
