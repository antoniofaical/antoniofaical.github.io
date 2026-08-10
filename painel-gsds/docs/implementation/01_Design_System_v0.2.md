# Design System — Painel Global de Inovação em Glicogenoses

**Versão:** 0.2  
**Estado:** pronto para fundação técnica  
**Escopo:** sistema visual global; especificação da Home; bases clínicas; análise socioeconômico-mercadológica; reservas funcionais para o futuro ecossistema de inovação.

## 1. Princípio editorial

O painel opera em duas camadas conectadas:

- **executiva:** rápida, visual e orientada a decisão;
- **evidencial:** sóbria, verificável e confortável para leitura prolongada.

Cada página analítica segue a progressão:

```text
Abertura visual → síntese executiva → evidência essencial → análise → limitações → fontes
```

O design não pode transformar ausência de evidência em certeza, população potencial em mercado ou AIHs em pacientes.

## 2. Princípios de produto

1. Toda visualização responde a uma pergunta explícita.
2. Toda métrica visível possui escopo, período, fonte e qualificador.
3. O conteúdo continua compreensível sem animações e sem hover.
4. Mobile é uma composição própria, não uma miniatura do desktop.
5. Impacto visual concentra-se nas entradas, sínteses e transições; evidências extensas permanecem editoriais.
6. A interface distingue `observado`, `estimado`, `proxy`, `conceitual` e `não calculável`.
7. Conteúdo científico nunca é alterado silenciosamente por exigência de layout.

## 3. Identidade visual

### 3.1 Paleta

| Token         |     Valor | Uso                                              |
| ------------- | --------: | ------------------------------------------------ |
| `--ink-950`   | `#071B25` | Hero, fechamento e superfícies de alto contraste |
| `--ink-800`   | `#16313B` | Texto primário                                   |
| `--ink-600`   | `#45616A` | Texto secundário                                 |
| `--paper-50`  | `#F6F8F7` | Fundo editorial                                  |
| `--paper-100` | `#EDF2F0` | Seções alternadas                                |
| `--teal-700`  | `#0D6870` | Ciência, seleção e categoria principal           |
| `--teal-500`  | `#1695A0` | Interação e séries principais                    |
| `--cyan-300`  | `#78D9D6` | Realce sobre fundos escuros                      |
| `--amber-500` | `#E9A63A` | Oportunidade ou evidência incompleta             |
| `--coral-500` | `#D8675A` | Risco, complicação ou evidência negativa         |
| `--green-500` | `#439B72` | Tratamento estabelecido ou desfecho favorável    |
| `--line-200`  | `#D7E0DD` | Bordas, divisores e eixos                        |

Regras:

- nenhum significado depende somente de cor;
- âmbar exige rótulo que diferencie “oportunidade” de “incerteza”;
- coral não é usado para decoração;
- áreas extensas usam baixa saturação;
- modo escuro integral não pertence ao MVP.

### 3.2 Tipografia

| Função            | Família | Regra                                         |
| ----------------- | ------- | --------------------------------------------- |
| Display e títulos | Manrope | no máximo duas linhas em aberturas executivas |
| Corpo e interface | Inter   | peso 400–500 no texto corrido                 |
| Dados             | Inter   | `font-variant-numeric: tabular-nums`          |

Escala:

```css
--display-xl: clamp(2.75rem, 7vw, 6.5rem);
--display-lg: clamp(2.25rem, 5vw, 4.5rem);
--heading-1: clamp(2rem, 4vw, 3.5rem);
--heading-2: clamp(1.5rem, 3vw, 2.5rem);
--heading-3: clamp(1.25rem, 2vw, 1.5rem);
--body: clamp(1rem, 0.4vw + 0.92rem, 1.125rem);
--editorial: clamp(1.0625rem, 0.45vw + 0.95rem, 1.1875rem);
--annotation: 0.75rem;
```

Colunas editoriais usam aproximadamente 65–75 caracteres. Genes seguem convenção científica em itálico quando o conteúdo os identifica como genes.

### 3.3 Grid e ritmo

- largura máxima global: `1280px`;
- visualizações amplas: até `1180px`;
- coluna editorial: `720–780px`;
- desktop: 12 colunas; tablet: 8; mobile: 4;
- margem mobile: `20px`;
- escala espacial: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128px`;
- seções executivas: `96–144px` no desktop e `64–88px` no mobile;
- seções analíticas: `72–112px` no desktop e `56–80px` no mobile.

### 3.4 Superfícies e forma

- raios principais: `12px`, `16px` e `18px`;
- bordas discretas; sombra apenas para elevação funcional;
- evitar envolver todo conteúdo em cards;
- tabelas e gráficos preferencialmente sem caixas externas;
- cards representam unidades de decisão ou comparação, não decoração.

### 3.5 Movimento

- transições funcionais: `180–260ms`;
- entrada por opacidade e deslocamento curto;
- animação só quando comunica sequência ou causalidade;
- suporte obrigatório a `prefers-reduced-motion`;
- nenhum gráfico reinicia ao rolar a página;
- nenhum conteúdo fica invisível aguardando animação.

## 4. Linguagem de evidência

### 4.1 Estados padronizados

| Estado           | Rótulo             | Interpretação visual                      |
| ---------------- | ------------------ | ----------------------------------------- |
| `observed`       | Observado          | sólido, sem marcador de incerteza         |
| `estimated`      | Estimado           | marcador e intervalo quando disponível    |
| `proxy`          | Proxy              | contorno pontilhado + explicação          |
| `conceptual`     | Conceitual         | diagrama, nunca número monetário aparente |
| `not-calculable` | Não calculável     | ausência explicada, nunca `0`             |
| `limited`        | Evidência limitada | âmbar + motivo                            |

### 4.2 `EvidenceBadge`

Exibe o estado em texto. Deve possuir nome acessível e explicação curta por acionamento, não apenas hover.

### 4.3 `SourceAnchor`

Campos visíveis ou acessíveis:

- autor/instituição e ano;
- tipo de fonte;
- link direto ou identificador interno;
- página, tabela ou seção quando disponível;
- data de verificação para estados temporais.

## 5. Componentes compartilhados

### Executivos

- `HeroStatement`: título, subtítulo, até duas ações e contexto temporal;
- `KeyMetric`: valor, unidade, contexto, evidência e fonte;
- `ExecutiveFinding`: conclusão, base resumida e acesso à evidência;
- `SectionPortal`: pergunta respondida, síntese e destino;
- `OpportunityBridge`: conecta uma lacuna documentada a uma futura área de inovação sem recomendar empresa.

### Analíticos

- `ResearchHeader`: escopo, corte temporal, síntese, metodologia e fontes;
- `ResearchSectionNav`: índice lateral, barra compacta ou seletor mobile;
- `EvidenceCallout`: consenso, limitação, implicação ou atenção metodológica;
- `ComparisonTable`: comparação responsiva com alternativa mobile;
- `ChartFrame`: pergunta, gráfico, insight, fonte, método e alternativa textual;
- `EvidenceFooter`: limitações, revisão e fontes da seção;
- `DefinitionPopover`: definição curta, acionável por teclado/toque;
- `DataAbsentState`: explica por que o dado não existe ou não é calculável.

### Navegação e utilidade

- `GlobalHeader`;
- `MobileNavigation`;
- `Breadcrumbs`;
- `PageStatus` para páginas futuras;
- `LastUpdated`;
- `SkipLink`;
- `GlossaryTerm`.

## 6. Padrões de visualização

Toda visualização inclui:

- pergunta analítica;
- título descritivo;
- unidade e período;
- legenda integrada;
- fonte próxima;
- nota metodológica;
- insight textual;
- alternativa tabular ou descritiva;
- estado de ausência de dados.

Transformações responsivas:

| Desktop             | Mobile                                    |
| ------------------- | ----------------------------------------- |
| Matriz completa     | seleção por linha/coluna                  |
| Timeline horizontal | timeline vertical                         |
| Painel lateral      | ficha inferior expansível                 |
| Tabela ampla        | cards comparáveis ou campos selecionáveis |
| Hover               | toque/clique e foco                       |
| Filtros em linha    | painel de filtros                         |

## 7. Home

### 7.1 Objetivo

Permitir que um ADM compreenda em menos de dois minutos:

1. que as GSDs constituem uma família heterogênea;
2. que sua carga alcança pacientes, cuidadores e sistemas de saúde;
3. que o mercado observado é desigual e concentrado;
4. que existem lacunas relevantes de diagnóstico, cuidado e evidência;
5. onde aprofundar cada perspectiva.

### 7.2 Sequência

1. **Hero — uma família de doenças, múltiplas jornadas.** Visual abstrato inspirado na ramificação do glicogênio.
2. **O problema em um minuto.** Três mensagens, sem tabela taxonômica.
3. **Do mecanismo à vida cotidiana.** Ponte visual entre bases clínicas e carga humana.
4. **Números que enquadram o problema.** No máximo quatro métricas heterogêneas e qualificadas.
5. **Mercado observado ≠ necessidade total.** Comparação conceitual entre população potencial, alcance e receita observada.
6. **Brasil.** Síntese de dados observáveis e lacunas de denominador.
7. **Explore as análises.** Portais para páginas médica e socioeconômica.
8. **Ecossistema de inovação.** Estado `em desenvolvimento` até existir base validada.
9. **Metodologia.** Acesso direto às fontes e limites.

### 7.3 Métricas candidatas

A seleção final deve usar apenas registros aprovados no modelo de dados. Candidatas:

- mais de vinte formas descritas de GSD;
- mercado farmacêutico Pompe observado em 2024, claramente rotulado como receita realizada;
- 997 AIHs E74.0 no SIH/SUS entre jan/2020 e mai/2026, explicitando que AIHs não são pacientes;
- 29 anos de mediana para diagnóstico em evidência específica de McArdle, sem generalizar para todas as GSDs.

Não exibir quatro números de escalas incomparáveis sem frase interpretativa.

### 7.4 Tom visual

Alternância controlada: hero escuro, sínteses claras, uma transição escura antes das lacunas. O movimento é mais expressivo que nas páginas analíticas, mas nunca decorativo.

## 8. Bases clínicas

A especificação funcional permanece a da v0.1, com as seguintes consolidações:

- rota: `/analises/bases-clinicas/`;
- componentes centrais: `GlycogenPathway`, `ClinicalSpectrum`, `GSDExplorer`, `NomenclatureTimeline`, `OrganMatrix`, `DiagnosticFlow`, `TreatmentCoverage`, `TherapyHorizon`, `ClinicalGapMap`;
- página editorial clara entre abertura e fechamento de alto contraste;
- estágios terapêuticos sempre acompanhados de data;
- comparações não podem sugerir que subtipos históricos sejam entidades contemporâneas independentes quando a SoT os reclassifica;
- nenhuma função diagnóstica individual.

Implementação detalhada deve consultar integralmente a v0.1 e a SoT médica. A v0.2 não substitui os requisitos clínicos mais específicos já definidos.

## 9. Impacto socioeconômico e estrutura mercadológica

### 9.1 Objetivo

Explicar como a carga das GSDs se distribui entre pacientes, cuidadores, serviços e pagadores; o que o mercado observado permite medir; e quais dimensões permanecem invisíveis.

### 9.2 Rota e metadados

- rota: `/analises/impacto-socioeconomico/`;
- título: `Impacto socioeconômico e estrutura de mercado`;
- descrição: `Carga sobre pacientes e cuidadores, custos, utilização de recursos, segmentos de mercado e limites do dimensionamento das glicogenoses.`;
- data de corte, escopo geográfico e metodologia visíveis.

### 9.3 Progressão narrativa

```text
Carga desigual → jornada cotidiana → custos visíveis e invisíveis
→ estrutura de mercado → dimensionamento responsável
→ Brasil → lacunas e implicações
```

### 9.4 Abertura — `BurdenOverview`

Pergunta: **Onde a carga das GSDs aparece — e onde ela permanece invisível?**

Composição:

- declaração executiva curta;
- quatro dimensões: paciente, cuidador, sistema de saúde e pagador;
- sem somar métricas incompatíveis;
- acesso direto à metodologia.

### 9.5 Jornada e carga — `BurdenPathway`

Pergunta: **Como a doença reorganiza a vida antes e depois do diagnóstico?**

Etapas didáticas:

1. reconhecimento tardio ou diagnóstico incorreto;
2. confirmação e navegação assistencial;
3. manejo cotidiano e noturno;
4. complicações e acompanhamento longitudinal;
5. impacto em educação, trabalho, sono e saúde mental.

Cada evidência deve conservar o subtipo e a população de origem. Não construir uma “jornada média” de todas as GSDs.

### 9.6 Carga do cuidador — `CaregiverBurden`

Exibe horas, saúde mental e dependência apenas onde houver denominador. Amostras distintas aparecem em pequenos múltiplos, nunca em um ranking universal.

### 9.7 Custos — `CostLayers`

Camadas:

- assistência médica direta;
- medicamentos e procedimentos;
- dieta e materiais domiciliares;
- deslocamento e gasto do próprio bolso;
- perda de produtividade e cuidado informal.

O componente diferencia moeda, ano, país, perspectiva e tipo de GSD. Não converte moedas automaticamente na primeira versão.

### 9.8 Estrutura mercadológica — `MarketSegmentMap`

Segmentos:

- farmacoterapia específica;
- diagnóstico;
- triagem neonatal;
- nutrição clínica e amidos;
- monitoramento glicêmico;
- dispositivos e suporte domiciliar;
- reabilitação e telemonitoramento;
- registros e geração de evidência;
- suporte ao paciente e cuidador.

Cada segmento recebe maturidade, beneficiário, comprador/pagador, canal e observabilidade. Não inclui empresas nesta página.

### 9.9 Dimensionamento — `MarketSizingGuardrails`

Pergunta: **O que é calculável, observável ou apenas conceitual?**

Três vistas:

1. receita farmacêutica Pompe observada;
2. dimensionamento populacional por ramo clínico;
3. matriz conceitual TAM/SAM/SOM dos segmentos sem monetização confiável.

Regras:

- receita realizada não recebe rótulo TAM;
- cenários rejeitados aparecem apenas na metodologia, não como headline;
- `não calculável` jamais é exibido como zero;
- valores convertidos exibem câmbio e data;
- projeções mecânicas de prevalência × preço são proibidas.

### 9.10 Brasil — `BrazilEvidencePanel`

Blocos:

- diagnóstico e população conhecida;
- acesso e rede assistencial;
- triagem neonatal;
- contratação pública observável;
- utilização hospitalar DATASUS;
- lacunas de denominador.

Para DATASUS, o cabeçalho visível deve afirmar: `AIHs com diagnóstico principal E74.0; AIHs não equivalem a pacientes`.

### 9.11 Encerramento — `EvidenceGapBridge`

Organiza lacunas em:

- denominadores e registros;
- diagnóstico e busca ativa;
- manejo noturno e monitoramento;
- nutrição e suporte domiciliar;
- reabilitação;
- coordenação, transição e cuidado do cuidador;
- evidência brasileira para avaliação de tecnologias.

Essas lacunas poderão alimentar o futuro scouting, mas a página não recomenda startups nem atribui atratividade comercial.

## 10. Reservas para páginas futuras

Existem rotas reservadas para:

- ecossistema de inovação;
- startups diretamente ligadas às GSDs;
- tecnologias adjacentes;
- oportunidades estratégicas.

Até os datasets correspondentes serem validados, essas páginas exibem apenas `PageStatus` com objetivo, estado e data prevista de atualização. Nenhum contador fictício, mapa vazio ou startup demonstrativa será publicado.

## 11. Acessibilidade

Meta mínima: WCAG 2.2 AA.

- navegação integral por teclado;
- foco visível;
- alvos de toque ≥ `44 × 44px`;
- landmarks e cabeçalhos semânticos;
- `SkipLink`;
- contraste validado;
- tabelas ou resumos equivalentes para gráficos;
- sem dependência de cor, hover ou movimento;
- glossário para linguagem técnica;
- texto mínimo de `12px` apenas para anotações não essenciais.

## 12. Breakpoints e comportamento

| Faixa         | Comportamento                                             |
| ------------- | --------------------------------------------------------- |
| `320–479px`   | composição de uma coluna; seletores em vez de matrizes    |
| `480–767px`   | mobile amplo; comparações de até dois itens               |
| `768–1023px`  | tablet; índice analítico compacto                         |
| `1024–1439px` | desktop; 12 colunas e índice lateral quando útil          |
| `≥1440px`     | largura limitada; conteúdo não se espalha indefinidamente |

## 13. Orçamento de performance

Metas de produção em mobile:

- LCP ≤ 2,5 s no percentil 75;
- CLS ≤ 0,1;
- INP ≤ 200 ms;
- JavaScript inicial da Home preferencialmente ≤ 150 kB comprimidos;
- visualizações pesadas carregadas sob demanda;
- fontes locais ou com fallback imediato;
- SVG preferencial para diagramas.

## 14. Registro de decisões v0.2

| Decisão                                     | Motivo                                                               |
| ------------------------------------------- | -------------------------------------------------------------------- |
| Manter duas camadas de leitura              | atender ADMs sem sacrificar a evidência                              |
| Especificar a página socioeconômica         | o conteúdo consolidado agora permite design baseado em evidência     |
| Separar receita observada de TAM            | evitar falsa precisão e superdimensionamento                         |
| Reservar, não desenhar, páginas de startups | o dataset ainda não está consolidado                                 |
| Manter conteúdo fora dos componentes        | facilitar atualização, revisão e reutilização                        |
| Transformar visualizações no mobile         | preservar legibilidade e interação real                              |
| Construir fundação antes da Home            | validar tokens e componentes sem cristalizar cedo uma direção visual |
