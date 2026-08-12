# Design System — Painel Global de Inovação em Glicogenoses

**Versão:** 0.3  
**Estado:** especificação consolidada das Iterações 3–5

## 1. Conceito

O painel combina três linguagens sem fragmentar a marca:

- **ciência:** mecanismo, heterogeneidade e evidência;
- **impacto:** jornada, recursos, mercado e invisibilidades;
- **inovação:** organizações, soluções, cobertura e mudança no tempo.

Progressão comum:

```text
Abertura visual → síntese executiva → evidência → análise
→ limitações → ponte para a próxima perspectiva → fontes
```

## 2. Princípios

1. visualização responde a pergunta;
2. impacto visual não substitui precisão;
3. ausência não vira zero;
4. densidade visual acompanha densidade dos dados;
5. mobile é composição própria;
6. conteúdo essencial existe sem JS;
7. fonte, estado e data acompanham dados temporais;
8. coverage disclosure precede métricas do observatório;
9. nenhuma página recomenda diagnóstico, investimento ou empresa;
10. componentes servem decisões reais, não decoração.

## 3. Fundamentos preservados

### 3.1 Cores

| Token         |     Valor | Semântica                       |
| ------------- | --------: | ------------------------------- |
| `--ink-950`   | `#071B25` | aberturas/fechamentos           |
| `--ink-800`   | `#16313B` | texto primário                  |
| `--ink-600`   | `#45616A` | texto secundário                |
| `--paper-50`  | `#F6F8F7` | fundo editorial                 |
| `--paper-100` | `#EDF2F0` | alternância                     |
| `--teal-700`  | `#0D6870` | ciência/seleção                 |
| `--teal-500`  | `#1695A0` | interação/série                 |
| `--cyan-300`  | `#78D9D6` | realce escuro                   |
| `--amber-500` | `#E9A63A` | limitação/oportunidade rotulada |
| `--coral-500` | `#D8675A` | risco/complicação               |
| `--green-500` | `#439B72` | estabelecido/validado           |
| `--line-200`  | `#D7E0DD` | bordas/eixos                    |

Cor nunca é o único código. Coral não é decorativo; verde não significa “bom investimento”.

### 3.2 Tipografia

- Manrope: display/títulos;
- Inter: corpo/interface/dados;
- números tabulares;
- coluna editorial 65–75 caracteres;
- genes em itálico quando identificados como genes.

Escalas e grid do v0.2 permanecem. Largura global `1280px`, editorial `720–780px`, margem mobile `20px`.

### 3.3 Forma e movimento

- raios 12/16/18 px;
- cards só para unidade comparável;
- movimento 180–260 ms, causal/funcional;
- reduced motion obrigatório;
- nada invisível esperando animação.

## 4. Linguagem de evidência, cobertura e revisão

### 4.1 Evidência

| Estado           | Rótulo             |
| ---------------- | ------------------ |
| `observed`       | Observado          |
| `estimated`      | Estimado           |
| `proxy`          | Proxy              |
| `conceptual`     | Conceitual         |
| `not-calculable` | Não calculável     |
| `limited`        | Evidência limitada |
| `unverified`     | Não verificado     |
| `stale`          | Revisão vencida    |
| `conflicting`    | Fontes divergentes |

### 4.2 Curadoria de startup

| Estado                       | Tratamento                        |
| ---------------------------- | --------------------------------- |
| `validated`                  | sólido + data de revisão          |
| `validated-with-limitations` | sólido + ressalva                 |
| `pending`                    | não entra em contadores validados |
| `needs-review`               | âmbar + motivo                    |
| `excluded`                   | apenas metodologia/histórico      |
| `stale`                      | relógio/rótulo + última revisão   |

### 4.3 Cobertura

`CoverageDisclosure` exibe fonte, estratégia, período, geografias, limitações e denominador dos contadores. Deve aparecer antes de mapas/distribuições.

## 5. Componentes compartilhados

### Executivos

`HeroStatement`, `KeyMetric`, `ExecutiveFinding`, `SectionPortal`, `OpportunityBridge`.

### Evidenciais

`ResearchHeader`, `ResearchSectionNav`, `EvidenceBadge`, `SourceAnchor`, `EvidenceCallout`, `ChartFrame`, `ComparisonTable`, `EvidenceFooter`, `DefinitionPopover`, `DataAbsentState`, `LastUpdated`, `Breadcrumbs`.

### Observatório

`CoverageDisclosure`, `LastUpdateSummary`, `ValidationFunnel`, `FilterPanel`, `ActiveFilterSummary`, `SortControl`, `CompareTray`, `DataCompleteness`, `ReviewStatus`, `SnapshotSelector`.

## 6. Padrões de visualização

Toda visualização inclui pergunta, título, escopo, unidade/período, fonte, método, insight e alternativa textual/tabular.

Transformações:

| Desktop             | Mobile                   |
| ------------------- | ------------------------ |
| matriz              | seletor por linha/coluna |
| timeline horizontal | vertical                 |
| painel lateral      | ficha inferior           |
| tabela ampla        | cards/fichas             |
| filtros em linha    | drawer acessível         |
| comparação 3        | comparação 2             |

Visualização condicionada à densidade:

- `n < 10`: fichas e matriz qualitativa;
- `10–30`: barras simples/segmentos com contagem;
- `>30`: distribuições, mapa e tendências, se cobertura permitir;
- nenhum percentual sem denominador explícito.

## 7. Home

Preservar Iteração 2. Habilitar portais progressivamente e inserir observatório somente quando o snapshot estiver publicado. Não transformar a Home em dashboard.

## 8. Página clínica

### 8.1 Tom

Abertura e lacunas em alto contraste; corpo claro e editorial. Ilustração termina cedo; evidência domina o restante.

### 8.2 Sequência e componentes

| Pergunta                          | Componente                               |
| --------------------------------- | ---------------------------------------- |
| O que são GSDs?                   | `ClinicalHero`                           |
| Onde a via falha?                 | `GlycogenPathway`                        |
| Por que os quadros diferem?       | `ClinicalSpectrum`                       |
| Quais tipos/subtipos?             | `GSDExplorer`                            |
| Por que a nomenclatura varia?     | `NomenclatureTimeline`                   |
| Quais órgãos aparecem na síntese? | `OrganMatrix`                            |
| O que a epidemiologia permite?    | `EpidemiologyGuardrails`                 |
| Como se confirma?                 | `DiagnosticFlow`                         |
| O que já é manejável?             | `ManagementTracks` + `TreatmentCoverage` |
| O que tenta modificar a doença?   | `TherapyHorizon`                         |
| Onde inovar?                      | `ClinicalGapMap`                         |

### 8.3 Limites

- `OrganMatrix` é recorte dos envolvimentos explicitados, não ontologia;
- padrões clínicos são contínuos;
- fluxo diagnóstico é educativo;
- status terapêutico é “reportado pela fonte” e datado;
- sem empresas.

## 9. Página socioeconômico-mercadológica

### 9.1 Tom

Editorial analítico, menos ilustrativo que a Home. Destaques numéricos só quando comparáveis. Mercado usa linguagem de observabilidade, não entusiasmo comercial.

### 9.2 Sequência

| Pergunta                              | Componente               |
| ------------------------------------- | ------------------------ |
| Onde a carga aparece?                 | `BurdenOverview`         |
| Como reorganiza a vida?               | `BurdenPathway`          |
| O que recai no cuidador?              | `CaregiverBurden`        |
| Quais custos são visíveis/invisíveis? | `CostLayers`             |
| Como o mercado se estrutura?          | `MarketSegmentMap`       |
| O que é calculável?                   | `MarketSizingGuardrails` |
| O que se observa no Brasil?           | `BrazilEvidencePanel`    |
| Quais lacunas importam?               | `EvidenceGapBridge`      |

### 9.3 TAM/SAM/SOM

Três vistas distintas:

1. monetária observável — receita realizada, contratação e limites;
2. populacional — potencial, alcançável e atendido;
3. conceitual — segmentos sem monetização confiável.

Não usar círculos concêntricos como se todos os níveis fossem números comparáveis. Receita Pompe recebe rótulo `receita observada`, nunca TAM.

### 9.4 DATASUS

Cabeçalho permanente:

> AIHs com diagnóstico principal E74.0; AIHs não equivalem a pacientes.

Mapa/serie só com notas de local da internação, longa permanência e cobertura inferida.

## 10. Observatório de startups

### 10.1 Conceito visual

Dashboard sóbrio de evidência, não vitrine comercial. A unidade principal é a organização validada, mas produto, claim e fonte permanecem visíveis.

### 10.2 Abertura

`EcosystemOverview` + `CoverageDisclosure` + `LastUpdateSummary`.

No snapshot CB Insights:

> Busca no Advanced Company Search, agosto de 2026; quatro organizações recuperadas; cobertura não exaustiva.

### 10.3 Exploração

`StartupExplorer` contém:

- busca por nome;
- filtros úteis;
- resumo de filtros;
- cards/lista;
- comparação;
- estado sem resultados;
- URL compartilhável.

Com quatro registros, filtros vazios ficam ocultos e o layout prioriza fichas.

### 10.4 Cartão

`StartupCard` mostra:

- nome/tipo;
- país;
- relação com GSD;
- modalidade/necessidade;
- status de revisão;
- data;
- evidência resumida;
- dados ausentes explicitados somente quando relevantes.

Não mostrar endereço, pessoas, IDs proprietários ou campos vazios em massa.

### 10.5 Ficha

`StartupProfileHeader`, `RelevanceSummary`, `ProductPortfolio`, `EvidenceLedger`, `CompanyTimeline`, `DataCompleteness`, `SourceList`, `ReviewHistory`.

### 10.6 Visualizações progressivas

| Componente               | Condição                              |
| ------------------------ | ------------------------------------- |
| `NeedSolutionMatrix`     | ≥ 2 necessidades e relações validadas |
| `SolutionSegmentMap`     | taxonomia validada                    |
| `GeographicDistribution` | volume/cobertura suficientes          |
| `MaturityDistribution`   | estágio de produto preenchido         |
| `UpdateTimeline`         | ≥ 2 snapshots comparáveis             |
| `EvidenceCoverage`       | sempre, inclusive base pequena        |

### 10.7 Relação direta/adjacente

Não usar apenas cor. Rótulos:

- Diretamente relacionada a GSD;
- Tecnologia adjacente aplicável;
- Suporte ao ecossistema;
- Relevância ainda não confirmada.

Brasil/global são chips de escopo geográfico, não sinais de qualidade.

## 11. Atualização mensal

`SnapshotSelector` e `LastUpdateSummary` só aparecem quando houver histórico. O dashboard mostra:

- data do snapshot;
- alterações desde o anterior;
- fontes verificadas;
- registros adicionados/atualizados/excluídos;
- itens aguardando revisão.

Não animar números como gamificação.

## 12. Acessibilidade

WCAG 2.2 AA; teclado; foco; 44×44 px; headings/landmarks; alternativas; reduced motion; sem dependência de cor/hover; glossário; tabelas responsivas; filtros anunciados; contagem de resultados em região `aria-live` moderada.

## 13. Performance

- HTML estático como base;
- React apenas em explorer/comparação;
- JSON público enxuto;
- SVG/CSS;
- sem mapa pesado para base pequena;
- carregamento sob demanda;
- fontes locais;
- metas Web Vitals do v0.2 preservadas.

## 14. Registro v0.3

| Decisão                         | Motivo                                    |
| ------------------------------- | ----------------------------------------- |
| Unificar observatório           | evitar bases Brasil/global divergentes    |
| Separar cobertura de contagem   | quatro resultados não são universo global |
| Modelar produto e observação    | estágio/headcount mudam no tempo          |
| Visualizações condicionais      | evitar dashboards vazios ou enganosos     |
| Pipeline fora do runtime        | segurança, custo e auditabilidade         |
| Preservar páginas editoriais    | ciência e carga exigem leitura longa      |
| Curadoria independente da fonte | status da base não valida relevância GSD  |
