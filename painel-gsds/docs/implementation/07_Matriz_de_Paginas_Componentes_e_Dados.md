# Matriz de páginas, componentes e dados

**Versão:** 0.3

## 1. Home

| Seção    | Pergunta                       | Componente vigente     | Dados                |
| -------- | ------------------------------ | ---------------------- | -------------------- |
| Hero     | O que são GSDs?                | `GlycogenBranchVisual` | `clm-clinical-001`   |
| Problema | Por que jornadas diferem?      | `ProblemInOneMinute`   | claims clínica/socio |
| Ponte    | Como mecanismo vira carga?     | `MechanismToLife`      | claims conceituais   |
| Métricas | O que enquadra o problema?     | `HomeMetrics`          | 4 métricas aprovadas |
| Mercado  | Por que receita ≠ necessidade? | `ObservedVsNeed`       | Pompe observada      |
| Brasil   | O que é observável?            | `BrazilOverview`       | DATASUS proxy        |
| Portais  | Onde aprofundar?               | `SectionPortal`        | estados de rota      |
| Método   | Como ler?                      | `HomeMethodology`      | estados/limites      |

Regra: habilitar portais; não refazer a Home.

## 2. Bases clínicas

| Âncora        | Pergunta                  | Componente               | Dataset/claim    | Estado               |
| ------------- | ------------------------- | ------------------------ | ---------------- | -------------------- |
| visão-geral   | O que são?                | `ClinicalHero`           | overview claims  | obrigatório          |
| metabolismo   | Onde a via falha?         | `GlycogenPathway`        | `pathway.json`   | simplificado         |
| padrões       | Por que diferem?          | `ClinicalSpectrum`       | patterns         | didático             |
| tipos         | Quais formas?             | `GSDExplorer`            | `gsd-types.json` | obrigatório          |
| nomenclatura  | Por que nomes variam?     | `NomenclatureTimeline`   | events           | sem datas inventadas |
| órgãos        | Quais sistemas descritos? | `OrganMatrix`            | involvement      | recorte              |
| epidemiologia | O que números permitem?   | `EpidemiologyGuardrails` | estimates        | não ranking          |
| diagnóstico   | Como se confirma?         | `DiagnosticFlow`         | diagnosis        | não algoritmo        |
| manejo        | O que é manejável?        | `ManagementTracks`       | management       | por padrão clínico   |
| terapia       | O que emerge?             | `TherapyHorizon`         | therapy          | status datado        |
| lacunas       | Onde inovar?              | `ClinicalGapMap`         | gaps             | sem empresas         |

## 3. Impacto socioeconômico

| Âncora    | Pergunta                   | Componente               | Dados                    |
| --------- | -------------------------- | ------------------------ | ------------------------ |
| carga     | Onde aparece?              | `BurdenOverview`         | findings por ator        |
| jornada   | Como reorganiza a vida?    | `BurdenPathway`          | subtipo/população        |
| cuidador  | O que recai na rede?       | `CaregiverBurden`        | N/instrumento            |
| custos    | Quais camadas?             | `CostLayers`             | cost observations        |
| segmentos | Como mercado se estrutura? | `MarketSegmentMap`       | segments                 |
| sizing    | O que é calculável?        | `MarketSizingGuardrails` | monetary/pop/conceptual  |
| brasil    | O que se observa?          | `BrazilEvidencePanel`    | acesso/DATASUS/contratos |
| lacunas   | O que falta?               | `EvidenceGapBridge`      | gap taxonomy             |

## 4. Observatório

| Área        | Pergunta                       | Componente               | Entidade                         |
| ----------- | ------------------------------ | ------------------------ | -------------------------------- |
| cobertura   | O que foi buscado?             | `CoverageDisclosure`     | `SourceRun`                      |
| atualização | Quando mudou?                  | `LastUpdateSummary`      | `SnapshotManifest`               |
| funil       | Quantos chegaram à publicação? | `ValidationFunnel`       | reviews/counts                   |
| exploração  | Quem foi identificado?         | `StartupExplorer`        | Organization + assessment        |
| card        | Por que importa?               | `StartupCard`            | current projection               |
| comparação  | Como diferem?                  | `CompareTray`            | selected orgs/products           |
| necessidade | Que lacuna atendem?            | `NeedSolutionMatrix`     | relevance links                  |
| evidência   | Quão sólido?                   | `EvidenceCoverage`       | Claim/Evidence/Review            |
| geografia   | Onde estão?                    | `GeographicDistribution` | HQ; somente densidade suficiente |
| maturidade  | Em que estágio?                | `MaturityDistribution`   | products; não empresa            |
| histórico   | O que mudou?                   | `UpdateTimeline`         | observations/snapshots           |

## 5. Ficha de organização

| Bloco       | Componente             | Dados públicos                      |
| ----------- | ---------------------- | ----------------------------------- |
| identidade  | `StartupProfileHeader` | nome, tipo, site, HQ, status        |
| relação GSD | `RelevanceSummary`     | classificação, racional, confiança  |
| produtos    | `ProductPortfolio`     | programas, modalidade, estágio/data |
| claims      | `EvidenceLedger`       | alegações e fontes                  |
| histórico   | `CompanyTimeline`      | observações relevantes              |
| completude  | `DataCompleteness`     | campos esperados/ausentes           |
| fontes      | `SourceList`           | fontes permitidas                   |
| revisão     | `ReviewHistory`        | status/datas/protocolo              |

## 6. Quatro resultados CB Insights

| Organização          | Registro de origem                          | Hipótese de curadoria inicial | Exibição antes de revisão |
| -------------------- | ------------------------------------------- | ----------------------------- | ------------------------- |
| GHF                  | terapias para doenças de armazenamento/APBD | potencial direta              | pendente/limitada         |
| TRADELINK            | DME/nutrição para GSD                       | adjacente                     | pendente                  |
| ChocolateBarBook.com | awareness/fundraising                       | ecossistema                   | pendente                  |
| GlycoGenesys         | descrição sem vínculo GSD                   | relevância não confirmada     | não contar como validada  |

## 7. Fontes → publicação

| Camada       | Artefato              | Público?       |
| ------------ | --------------------- | -------------- |
| descoberta   | saída bruta por fonte | não            |
| candidato    | `DiscoveryCandidate`  | não            |
| reconciliado | Organization canônica | interno        |
| evidência    | claims/observações    | parcialmente   |
| revisão      | decisão e racional    | resumo público |
| snapshot     | projeção validada     | sim            |
| dashboard    | componentes derivados | sim            |

## 8. Componentes compartilháveis

`ResearchHeader`, `ResearchSectionNav`, `EvidenceBadge`, `SourceAnchor`, `EvidenceCallout`, `ComparisonTable`, `DataAbsentState`, `EvidenceFooter`, `LastUpdated`, `Breadcrumbs`.

Não generalizar componentes de domínio prematuramente. Compartilhar contratos de evidência, layout e interação; manter semântica clínica/mercadológica/startup específica.
