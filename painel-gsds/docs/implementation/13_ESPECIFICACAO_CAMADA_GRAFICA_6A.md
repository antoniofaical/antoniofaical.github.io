# Especificação — Camada gráfica (saída da Iteração 6A → implementação 6B)

**Status:** especificação fechada para implementação na 6B.  
**Baseline de dados:** `snap-ecosystem-cumulative-direct-2026-08-24` (`main` `a2fb231…`).  
**Documento irmão:** `docs/audits/AUDITORIA_ITERACAO_6A_CAMADA_GRAFICA.md`.  
**Proibido nesta 6A:** implementar charts, alterar dados/schemas/CSS/deps.

---

## 1. Objetivo da camada

Acrescentar um bloco analítico **pequeno e metodologicamente seguro** no Observatório de startups, respondendo perguntas de distribuição com:

- unidade de análise explícita;
- denominador explícito;
- caveats públicos;
- tokens do Design System existentes;
- zero dependência nova de charts, salvo inviabilidade demonstrada (não é o caso).

Não redesenhar o dashboard. Não obrigar gráficos em Clínica/Socio/Home.

---

## 2. Princípios

1. **Fato antes de gráfico** — só eixos com enum/cobertura completa ou regra de tag auditada.
2. **Separar unidades** — nunca misturar silenciosamente Organization × Assessment × Product × directContext.
3. **Categorias não exclusivas ≠ 100%** — incidência, não pie/donut.
4. **Protocolos diferentes não são série única** — diretos vs indiretos em painéis separados.
5. **Sem inferência** — proibido normalizar free-text na 6B.
6. **Acessibilidade** — valor não só por cor; fallback textual; resumo para leitores de tela.
7. **Escopo máximo 3–5 visualizações** na 6B.

---

## 3. Lista final aprovada para 6B

| ID     | Título público                            | Status         | Prioridade | Escopo filtros                                                 |
| ------ | ----------------------------------------- | -------------- | ---------- | -------------------------------------------------------------- |
| VIZ-01 | Organizações por relação com GSDs         | GO             | **P0**     | `scope = snapshot` (v1); filtered opcional só se labels claros |
| VIZ-02 | Organizações por escopo geográfico        | GO_WITH_CAVEAT | **P0**     | `scope = snapshot`                                             |
| VIZ-03 | Atividade GSD — players diretos (28)      | GO             | **P0**     | `scope = snapshot` · subset direto fixo                        |
| VIZ-04 | Status corporativo — players diretos (28) | GO             | **P0**     | `scope = snapshot` · subset direto fixo                        |
| VIZ-05 | Papel no ativo — players diretos (28)     | GO             | **P1**     | `scope = snapshot` · subset direto fixo                        |

**Fora da 6B (adiados/rejeitados):** VIZ-06…VIZ-18 da auditoria (ver §15).

**Teto da 6B:** implementar **P0 (4)**; incluir **VIZ-05 (P1)** somente se o esforço couber sem expandir escopo. Não implementar P2 (confidence indireta) na 6B.

---

## 4. Chart specs

### Convenções comuns (todas as VIZ)

- Tipo: **barras horizontais** compactas (HTML/CSS ou SVG), uma barra por categoria.
- Mostrar **valor absoluto** em cada barra; percentual só quando a spec da VIZ autorizar explicitamente (VIZ-01 v1: **sem percentual**).
- Ordem: taxa de taxonomia existente (`taxonomies.ts`) quando enum; senão ordem decrescente de contagem.
- Zero: omitir categoria com 0 **somente** se o enum completo for listado em nota; preferência: mostrar 0 para enums curtos.
- Missing/unknown: não inventar bucket; se um campo opcional faltar, a VIZ não é GO.
- Cores: tokens `--teal-*` / neutros existentes; padrão adicional textural/padrão (não só cor).
- Breakpoints: empilhar barras em coluna única; em **320px**, barras full-width, labels acima ou à esquerda com wrap.
- Tooltip: opcional; se houver, espelhar o texto já visível (não esconder o único número no tooltip).
- Fallback textual: `<table>` ou lista `dl` imediatamente abaixo / `visually-hidden` summary.
- `aria`: `figure` + `figcaption`; resumo em texto (“X organizações: …”).
- Interação com explorer: **v1 não reativa** (`scope = snapshot`) para não mudar denominador sem UX explícita.

---

### VIZ-01 — Organizações por relação (incidência · future-safe)

**Pergunta:** Quais relações com GSDs aparecem entre as organizações publicadas?

| Campo                        | Valor                                                                                                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNIT_OF_ANALYSIS             | `unique_organization`                                                                                                                                                                    |
| Dataset                      | snapshot corrente · `relevanceAssessments` + `organizations`                                                                                                                             |
| Campos                       | `assessment.relationship` → `Set` por `organizationId`                                                                                                                                   |
| Agregação                    | **incidência de relation tags** distintas por organização                                                                                                                                |
| Denominador                  | 120 organizações no snapshot auditado; Σ de incidências **pode** exceder 120 em snapshots futuros                                                                                        |
| Exclusivas?                  | **neste** snapshot sim (81+28+11=120); o modelo **não** garante exclusividade futura                                                                                                     |
| Tipo                         | barras horizontais                                                                                                                                                                       |
| Percentual (6B v1)           | **não mostrar** — apenas contagens absolutas                                                                                                                                             |
| Caveat                       | “Incidência de relações por organização. No snapshot atual: 81 adjacentes, 28 diretas, 11 não confirmadas. O modelo permite múltiplas relações por organização em atualizações futuras.” |
| Expected (snapshot auditado) | adjacent-gsd **81** · direct-gsd **28** · relevance-unconfirmed **11** · ecosystem-support **0**                                                                                         |

**Pseudo-código:**

```text
counts = { rel: 0 for rel in startupRelationValues }
for org in organizations:
  rels = unique(relationship for a in assessments if a.organizationId == org.id)
  for r in rels:
    counts[r] += 1
# NÃO assertar sum(counts) == organizations.length
# A função deve aceitar sum(counts) > organizations.length em snapshots futuros
render_bars_absolute_only(labels=startupRelationLabels, values=counts)
```

**Teste de baseline (snapshot auditado atual):**

```text
counts == {
  adjacent-gsd: 81,
  direct-gsd: 28,
  relevance-unconfirmed: 11,
  ecosystem-support: 0
}
```

**Não fazer:** usar `counts.adjacentGsd` (82) como se fosse número de organizações; percentual na v1; falhar se Σ incidências > n orgs.

---

### VIZ-02 — Escopo geográfico (incidência)

**Pergunta:** Quantas organizações têm avaliação Brasil e/ou Global?

| Campo            | Valor                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| UNIT_OF_ANALYSIS | `unique_organization`                                                                                |
| Campos           | `assessment.geographicScopes`                                                                        |
| Agregação        | incidência de tags por org                                                                           |
| Denominador      | 120 orgs; Σ tags pode ser 121                                                                        |
| Exclusivas?      | **não**                                                                                              |
| Tipo             | barras de incidência (proibir pie/donut/100% stack)                                                  |
| Percentual       | **não** apresentar como partição do total; opcional “% das orgs com a tag” com wording de incidência |
| Caveat           | “Brasil e Global não são mutuamente exclusivos. Uma organização (Saventic) aparece nos dois.”        |
| Expected         | global **88** · brazil **33** · ambas **1**                                                          |

**Pseudo-código:**

```text
tag = { brazil: 0, global: 0 }; both = 0
for org in organizations:
  geos = unique(flatten(geographicScopes for a in assessments(org)))
  for g in geos: tag[g] += 1
  if {brazil, global} ⊆ geos: both += 1
render_bars(tag)
show_note(both)
```

---

### VIZ-03 — Atividade GSD (28 diretos)

| Campo            | Valor                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| UNIT_OF_ANALYSIS | `direct_assessment`                                                                    |
| Filtro           | `relationship == 'direct-gsd'`                                                         |
| Campo            | `directContext.currentGsdActivity`                                                     |
| Cobertura        | 28/28                                                                                  |
| Expected         | confirmed-current **13** · historical-only **11** · current-uncertain **4**            |
| Labels           | `startupDirectGsdActivityLabels`                                                       |
| Caveat           | “Apenas os 28 players do mapeamento direto. Presença não implica programa ativo hoje.” |
| Percentual       | permitido (base 28)                                                                    |

---

### VIZ-04 — Status corporativo (28 diretos)

| Campo            | Valor                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| UNIT_OF_ANALYSIS | `direct_assessment`                                                                                   |
| Campo            | `directContext.organizationStatus`                                                                    |
| Cobertura        | 28/28                                                                                                 |
| Expected         | public-biotech **9** · acquired-or-inactive **9** · private-startup **8** · identity-unresolved **2** |
| Labels           | `startupDirectOrganizationStatusLabels`                                                               |
| Caveat           | “Status do mapeamento direto — distinto do status operacional publicado das organizações indiretas.”  |
| Proibição        | misturar com `organization.operationalStatus` dos 120                                                 |

---

### VIZ-05 — Papel no ativo (28 diretos) · P1

| Campo            | Valor                                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNIT_OF_ANALYSIS | `direct_assessment`                                                                                                                                               |
| Campo            | `directContext.assetRole`                                                                                                                                         |
| Cobertura        | 28/28                                                                                                                                                             |
| Expected         | developer 15 · acquired-entity 6 · historical-owner 2 · owner 1 · unresolved 1 · historical-association-ownership-unverified 1 · outlicensed 1 · license-holder 1 |
| Labels           | `startupDirectAssetRoleLabels` (Kriya permanece neutra; AUG = “Licenciado a terceiro”)                                                                            |
| Caveat           | “Papel no ativo GSD no mapeamento direto; associação histórica não estabelece titularidade automaticamente.”                                                      |
| Ordem            | seguir ordem do enum em `taxonomies.ts` (não só por frequência), **ou** frequência com enum completo listado                                                      |

---

## 5. Data mapping exato

Fonte única de verdade em runtime 6B:

```text
loadPublishedSnapshot()  // current.json → snap-ecosystem-cumulative-direct-2026-08-24
```

Funções puras sugeridas (novas, testáveis):

```text
aggregateOrgRelationCounts(snapshot) -> Record<StartupRelation, number>
aggregateOrgGeographyIncidence(snapshot) -> { tags, bothCount }
aggregateDirectContextCounts(snapshot, key) -> Record<enum, number>
```

Reutilizar labels de `src/data/startups/taxonomies.ts`.  
Não ler CSV/handoff/scouting.

---

## 6. Localização na página

Página: `src/pages/inovacao/startups/index.astro` (+ componentes React sob `src/components/startups/`).

### Wireframe textual

```text
ResearchHeader
↓
Nota metodológica
↓
StartupCoverageNotice
↓
[NOVO] Camada analítica do Observatório
  Título: “Visão analítica da base publicada”
  Intro curta (1 frase) + denominadores
  VIZ-01 (relações)
  VIZ-02 (geografia + caveat de overlap)
  Subtítulo: “Players com relação direta (28)”
  VIZ-03 (atividade)
  VIZ-04 (status corporativo)
  VIZ-05 (papel no ativo) — se P1 incluso
  Nota de escopo snapshot (não reflete filtros do explorer na v1)
↓
Explorer existente (busca/filtros/cards/drawer)
↓
Sobre os dados
```

Home / Clínica / Socioeconômico: **sem** novos charts na 6B.

---

## 7. Comportamento com filtros

| Opção                     | Decisão 6B                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| A — estáticos ao snapshot | **Adotada na v1**                                                                           |
| B — reativos ao explorer  | Adiada (P2+); exigiria copy do denominador dinâmico (“X de 120 no recorte”) e testes extras |

Razão: evitar que filtrar “Direta” esvazie VIZ-03/04 ou mude a base sem o usuário perceber a mudança de pergunta.

### 7.1 Responsabilidades: ObservatoryAnalytics vs StartupSummary

```text
ObservatoryAnalytics
= visão analítica estática do snapshot publicado;
= responde perguntas estruturais da base (VIZ-01…05);
= não reage aos filtros na 6B v1;
= denominadores fixos do snapshot auditado / corrente.

StartupSummary
= estado atual do Explorer;
= informa quantas organizações estão no recorte filtrado;
= continua reativo aos filtros (lead + breakdowns do recorte).
```

### 7.2 Estratégia anti-duplicação (produto · 6B)

No estado inicial (nenhum filtro ativo), `StartupSummary` e `ObservatoryAnalytics` exporiam os mesmos breakdowns de relação/geografia.

**Opção recomendada para a 6B (não implementar nesta 6A.1):**

1. Manter o **lead/count reativo** do `StartupSummary` (“N organizações…” / “N de 120 no recorte”).
2. Quando **nenhum filtro** estiver ativo: **não repetir** a grade de breakdown relação/geografia do `StartupSummary` imediatamente abaixo/ao lado dos novos gráficos estáticos — os breakdowns estruturais ficam em `ObservatoryAnalytics`.
3. Quando houver **filtro ativo**: permitir breakdown filtrado no `StartupSummary` se acrescentar informação sobre o recorte (denominador dinâmico explícito).

Isso pode exigir props/`StartupSummary` na 6B; **fora do escopo da 6A.1**.

Alternativa aceitável: manter breakdowns no Summary o tempo todo, mas rotular explicitamente “Recorte do explorer” vs “Base publicada (snapshot)” — menos preferida por densidade visual.

Não remover funcionalidade do explorer nesta etapa.

---

## 8. Acessibilidade

- Cada chart em `<figure aria-labelledby=…>`.
- Resumo textual sempre presente (visível ou `visually-hidden` + tabela de dados).
- Contraste WCAG com tokens existentes; não depender só de cor (valor numérico adjacente).
- Se foco/teclado em barras: cada barra como elemento não interativo na v1 (preferência: **não** clicáveis para não competir com filtros).
- axe limpo na rota `/inovacao/startups/`.

---

## 9. Responsividade

- Desktop: grid 1–2 colunas para pares VIZ-01/02; bloco direto em 1 coluna ou 2.
- ≤640px: uma coluna.
- 320px: sem overflow horizontal (reusar gate E2E existente); labels não truncar semanticamente (wrap).

---

## 10. Recomendação técnica

| Opção                                 | Avaliação                                                                |
| ------------------------------------- | ------------------------------------------------------------------------ |
| A. HTML/CSS + SVG nativo (Astro-only) | Viável, mas stats já vivem no mundo React do explorer                    |
| B. **React + HTML/CSS/SVG nativo**    | **Recomendado**                                                          |
| C. Nova lib (Recharts/D3/ECharts/…)   | **Não** — barras simples não justificam dependência (`04_Stack`, AGENTS) |

**Dependência nova:** **não**.  
Bundle: componentes leves; dados já no payload do snapshot.

---

## 11. Componentes previstos para 6B

```text
src/lib/startups/aggregateObservatoryCharts.ts   # funções puras + tipos
src/lib/startups/aggregateObservatoryCharts.test.ts
src/components/startups/ObservatoryAnalytics.tsx  # container da camada
src/components/startups/StartupBarChart.tsx       # primitivo acessível de barras
(+ CSS modules ou style tag seguindo tokens)
```

Integração: importar `ObservatoryAnalytics` em `inovacao/startups/index.astro` com `client:load` ou `client:visible` **somente se** houver JS necessário; se puramente derivado no build, pode ser server-side React via Astro sem hidratação — preferir **sem hidratação** se não houver interação.

---

## 12. Testes exigidos na 6B

1. Unit: agregações = valores esperados da auditoria no snapshot atual (81/28/11/0; 88/33/both=1; 13/11/4; 9/9/8/2; assetRole counts).
2. Unit: Saventic não cria segunda _relação distinta_; cria overlap geográfico.
3. Unit: subset direto ignora indiretos.
4. Unit (sintético / future-safe): organização com **duas relation tags distintas** é contada uma vez em cada relação; agregador **não crasha**; **não** assume `sum(relation incidences) == organizations.length`.
5. E2E: textos de caveat visíveis; ausência de pie; VIZ-01 sem percentual na v1; markers de não-exclusividade em VIZ-02.
6. E2E: 320px sem overflow; axe na página.
7. Negativo: build público sem `ResearchRun` / IDs de pipeline (gates existentes).
8. Não alterar snapshot/checksum.

---

## 13. Escopo fechado da 6B

**Inclui:**

- VIZ-01, VIZ-02, VIZ-03, VIZ-04 (P0);
- VIZ-05 opcional (P1) se couber;
- primitivos + testes + copy/caveats;
- atualização mínima de docs de implementação **somente se a instrução 6B autorizar**.

**Não inclui:**

- lib de charts;
- gráficos reativos a filtro;
- clínica/socio/home charts;
- normalização de modality/indication/stage;
- popular `gsdRefs`;
- mapa HQ;
- pipeline de produtos;
- redesign do explorer;
- merge/deploy (a menos que instrução 6B diga o contrário).

---

## 14. Critérios de aceite da 6B

1. Quatro (ou cinco) barras renderizam com contagens auditadas.
2. Unidade e denominador legíveis na UI.
3. Caveats de VIZ-02 e bloco direto presentes.
4. Nenhuma agregação free-text.
5. Nenhuma dependência nova de chart.
6. Gates format/lint/typecheck/test/data:validate/E2E root+subpath verdes.
7. Snapshot byte-identical / checksum inalterado.

---

## 15. Itens explicitamente adiados / rejeitados

| ID                           | Motivo                                                  |
| ---------------------------- | ------------------------------------------------------- |
| VIZ-06 indicação/GSD         | `gsdRefs` vazios; indication free-text                  |
| VIZ-07 modalidade            | fragmentação free-text                                  |
| VIZ-08 developmentStage      | 28 narrativas distintas; risco de funil falso           |
| VIZ-09 operationalStatus 120 | protocolos mistos                                       |
| VIZ-10 confidence mista      | `not-assigned` ≠ baixa                                  |
| VIZ-10b confidence indireta  | P2 — fora do teto 6B                                    |
| VIZ-11 mapa HQ               | 91/120 missing                                          |
| VIZ-12 foundedYear           | missingness + viés                                      |
| VIZ-13 products              | n=0                                                     |
| VIZ-14 source coverage %     | protocolos não comparáveis                              |
| VIZ-15…18 clínica/socio/home | dados qualitativos/heterogêneos; cards/diagramas bastam |

---

## 16. Arquivos que a 6B provavelmente alterará

```text
painel-gsds/src/pages/inovacao/startups/index.astro
painel-gsds/src/components/startups/ObservatoryAnalytics.tsx          (novo)
painel-gsds/src/components/startups/StartupBarChart.tsx               (novo)
painel-gsds/src/lib/startups/aggregateObservatoryCharts.ts            (novo)
painel-gsds/src/lib/startups/aggregateObservatoryCharts.test.ts       (novo)
painel-gsds/tests/e2e/startups.spec.ts
(+ docs/CHANGELOG se a 6B autorizar)
```

**Não alterar:** snapshots, `current.json`, schemas, taxonomias (salvo necessidade de label já existente), scouting/enrichment/handoff, SoTs.

---

## 17. Riscos restantes

1. Usuário interpretar VIZ-01 com o número 82 do `counts` oficial — mitigar copy.
2. Pressão para “clicar na barra = filtrar” — fora da v1.
3. Tentativa de incluir funil de estágio — rejeitar sem taxonomia.
4. Expansão de escopo para Home/Clínica — fora desta especificação.
