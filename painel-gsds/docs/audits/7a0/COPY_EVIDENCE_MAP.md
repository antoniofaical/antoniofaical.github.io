# COPY_EVIDENCE_MAP — 7A.0

Índice de evidências e claims atômicos. Após a R3: **192** `CLAIM_ID` únicos; **31** `EVIDENCE_ID` usados no CSV, todos indexados abaixo.

## Índice de EVIDENCE_ID

### EV-SOT-MED-001

- Caminho/URL: `painel-gsds/docs/source-of-truth/Glicogenose Resumo Médico Executivo.md`
- Título: SoT médica executiva
- Tipo: source-of-truth
- Limitações: hash SHA-256 37e3fbea2513ff57f42937273622fee8592ce1d9df955c7467ef78f947866389

### EV-SOT-SOC-001

- Caminho/URL: `painel-gsds/docs/source-of-truth/Glicogenose Estudo Socioeconômico Mercadológico.md`
- Título: SoT socioeconômica-mercadológica
- Tipo: source-of-truth
- Limitações: hash SHA-256 489fd652f5ce6853908f59c18745c18282a65e946af59ab4dff3a142c210c3d2

### EV-CLAIM-JSON

- Caminho/URL: `painel-gsds/src/data/claims.json`
- Título: Claims estruturados já associados no projeto
- Tipo: project-claim-index
- Limitações: Usado como ponte source→claim; não substitui a SoT.

### EV-METRIC-JSON

- Caminho/URL: `painel-gsds/src/data/metrics.json`
- Título: Métricas da Home
- Tipo: project-metric-index
- Limitações: displayValue/period/limitations alimentam KeyMetric.

### EV-SNAP-COV-001

- Caminho/URL: `painel-gsds/src/data/startups/published/snapshots/ecosystem-cumulative-direct-2026-08-24.json`
- Título: Coverage + counts do snapshot publicado
- Tipo: published-snapshot
- Limitações: Campos de entidade (nome, HQ, website, etc.) não foram inventariados.

### EV-CODE-001

- Caminho/URL: `painel-gsds/src/components/layout/GlobalFooter.astro`
- Título: Nome de produto no footer
- Tipo: production-code
- Limitações: Claim onomástico, não científico.

### EV-CODE-002

- Caminho/URL: `painel-gsds/src/components/research/ResearchHeader.astro`
- Título: Template de revisão/corte
- Tipo: production-code
- Limitações: Observatório usa publishedAt como cutoff.

### EV-CODE-003

- Caminho/URL: `painel-gsds/src/pages/index.astro`
- Título: Arquitetura de informação da Home
- Tipo: production-code
- Limitações: Descreve as três frentes do painel.

### EV-CODE-004

- Caminho/URL: `painel-gsds/src/pages/index.astro`
- Título: Framing dos quatro números da Home
- Tipo: production-code
- Limitações: Alinhado às quatro métricas HOME_METRIC_IDS.

### EV-CODE-CHARTS

- Caminho/URL: `painel-gsds/src/lib/startups/aggregateObservatoryCharts.ts`
- Título: Agregadores dos charts
- Tipo: production-code
- Limitações: Caveats dos charts descrevem a regra de contagem, não os totais.

### EV-RUNTIME-001

- Caminho/URL: `runtime local (astro dev) das quatro rotas do dashboard`
- Título: Inspeção runtime em 2026-09-19
- Tipo: runtime-inspection
- Limitações: Servidor de desenvolvimento; copy conferida nas 4 rotas + no-results do observatório. Sem URL absoluta nos demais campos.

Cada alias `EV-CLAIM-CLM-*` e `EV-METRIC-MET-*` usado no CSV tem entrada individual abaixo. Os índices `EV-CLAIM-JSON` / `EV-METRIC-JSON` permanecem como ponte de arquivo.

### EV-CLAIM-CLM-CLINICAL-001

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-001`
- Título: GSD não é um diagnóstico único: há mais de 20 tipos e subtipos reconhecidos.
- Tipo: project-claim
- Locator/source refs: Visão geral / src-sot-medical-exec-2026
- Limitações: A nomenclatura histórica não é uniforme; “mais de 20” descreve diversidade reconhecida, não um censo fechado de todos os fenótipos.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-002

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-002`
- Título: Tecido e etapa metabólica afetados diferenciam as jornadas clínicas.
- Tipo: project-claim
- Locator/source refs: Lógica fisiopatológica e apresentação clínica / src-sot-medical-exec-2026
- Limitações: Agrupamentos clínicos são pedagógicos; fenótipos formam contínuos e variam entre pacientes do mesmo tipo molecular.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-003

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-003`
- Título: Falha na via do glicogênio altera reservas e disponibilidade de glicose/energia.
- Tipo: project-claim
- Locator/source refs: Visão geral / Lógica fisiopatológica / src-sot-medical-exec-2026
- Limitações: Padrões clínicos variam; o fenótipo forma um contínuo entre pacientes do mesmo tipo molecular.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-004

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-004`
- Título: Classificação essencial: tipos, genes e elementos distintivos da tabela da SoT.
- Tipo: project-claim
- Locator/source refs: Classificação essencial / src-sot-medical-exec-2026
- Limitações: A tabela é recorte essencial, não inventário exaustivo de todos os fenótipos. Órgãos e herança só devem ser registrados quando explicitados na SoT.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-005

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-005`
- Título: Nomenclatura: Ic/Id→Ib; reorg. fosforilase-quinase; ambiguidade de GSD XI.
- Tipo: project-claim
- Locator/source refs: Evolução da nomenclatura / src-sot-medical-exec-2026
- Limitações: Não inventar datas de transição além do que a SoT reporta. A nomenclatura do grupo X–XV permanece não uniforme.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-006

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-006`
- Título: Epi ilustrativa por tipo; incidência ≠ prevalência clínica ≠ genética.
- Tipo: project-claim
- Locator/source refs: Epidemiologia: o que os números permitem concluir / src-sot-medical-exec-2026
- Limitações: Epidemiologia incompleta por raridade, subdiagnóstico e ausência de registros sustentáveis. Variantes fundadoras produzem diferenças marcantes entre populações.
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-CLINICAL-007

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-007`
- Título: Diagnóstico: fenótipo + bioquímica + imagem + genética; biópsia reservada; NBS Pompe.
- Tipo: project-claim
- Locator/source refs: Diagnóstico / src-sot-medical-exec-2026
- Limitações: Não é algoritmo diagnóstico nem substitui avaliação especializada. Implantação e interpretação da triagem neonatal para Pompe variam entre locais.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-008

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-008`
- Título: Manejo por padrão; ERT Pompe não curativa; empagliflozina Ib; sacarose V≠VII.
- Tipo: project-claim
- Locator/source refs: Manejo atual / src-sot-medical-exec-2026
- Limitações: Não constitui orientação terapêutica individual. Uso de empagliflozina exige supervisão especializada (riscos como hipoglicemia e infecções geniturinárias).
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-009

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-009`
- Título: Terapia gênica (Koeberl 2024): status reportado, não regulatório atual.
- Tipo: project-claim
- Locator/source refs: Terapias emergentes / Koeberl et al. (2024) / src-sot-medical-exec-2026
- Limitações: Não interpretar como status regulatório ou comercial contemporâneo. Edição genômica permanece dependente de comprovação de durabilidade e segurança em longo prazo.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-CLINICAL-010

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-clinical-010`
- Título: Cinco prioridades clínicas da seção Lacunas — sem empresas.
- Tipo: project-claim
- Locator/source refs: Lacunas e prioridades / src-sot-medical-exec-2026
- Limitações: Prioridades do campo, não roadmap comercial ou inventário de empresas.
- SoT associada: EV-SOT-MED-001

### EV-CLAIM-CLM-SOCIO-001

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-socio-001`
- Título: A carga inclui manejo diário, cuidado e acesso — não só sintomas.
- Tipo: project-claim
- Locator/source refs: 1.1 A carga socioeconômica é distribuída de forma desigual / src-sot-socioeconomic-2026
- Limitações: Estimativas quantitativas de cuidado informal estão melhor documentadas em Pompe; ausência de mensuração em outros tipos não significa ausência de impacto.
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-SOCIO-002

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-socio-002`
- Título: McArdle: atraso diagnóstico mediano de 29 anos no estudo documentado.
- Tipo: project-claim
- Locator/source refs: 1.1 / McArdle — atraso mediano de 29 anos [CAR-010 a CAR-013] / src-sot-socioeconomic-2026
- Limitações: Não generalizar o atraso de 29 anos a todas as glicogenoses. O desenho e a população do estudo original condicionam a interpretação.
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-SOCIO-003

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-socio-003`
- Título: Carga desigual: horas Pompe documentadas; lacuna de mensuração em outros tipos.
- Tipo: project-claim
- Locator/source refs: 1.1 A carga socioeconômica é distribuída de forma desigual / src-sot-socioeconomic-2026
- Limitações: Manter escopo de amostra/subtipo; não agregar horários ou atrasos entre tipos. Estimativas quantitativas de cuidado informal estão melhor documentadas em Pompe.
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-SOCIO-004

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-socio-004`
- Título: Segmentos não farmacêuticos: fragmentados/conceituais; só Pompe é monetariamente observável.
- Tipo: project-claim
- Locator/source refs: 1.2 / segmentos não farmacêuticos; 1.6 síntese estratégica / src-sot-socioeconomic-2026
- Limitações: Necessidade clínica não constitui automaticamente mercado validado. Receitas adjacentes não são atribuíveis às glicogenoses com os dados públicos disponíveis.
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-SOCIO-005

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-socio-005`
- Título: Custos em camadas incomparáveis; Brasil sem cobertura nacional inferível.
- Tipo: project-claim
- Locator/source refs: 1.5 Brasil; 5.x custos; DATASUS VAL_TOT / src-sot-socioeconomic-2026
- Limitações: Custos internacionais não são diretamente transferíveis ao Brasil. QALY e razões de custo-efetividade são sensíveis a preço/dose e contexto do estudo. Comparar VAL_TOT hospitalar com contratação farmacêutica mistura camadas distintas.
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-MARKET-001

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-market-001`
- Título: Receita observada em Pompe (≈ €1,4 bi em 2024) não é necessidade total nem TAM.
- Tipo: project-claim
- Locator/source refs: 1.2 O mercado farmacêutico realizado está concentrado em Pompe / src-sot-socioeconomic-2026
- Limitações: Valor consolidado depende da conversão USD/EUR da receita Amicus pela taxa média anual de 2024 reportada na SoT. Concentração em Pompe não implica ausência de necessidade em outras GSDs (diagnóstico, nutrição, monitoramento, reabilitação e suporte).
- SoT associada: EV-SOT-SOC-001

### EV-CLAIM-CLM-BRASIL-001

- Caminho/URL: `painel-gsds/src/data/claims.json`
- ID real no JSON: `clm-brasil-001`
- Título: Brasil: sem denominador nacional confiável; 997 AIHs E74.0 são proxy hospitalar, não pacientes.
- Tipo: project-claim
- Locator/source refs: Brasil / SIH/SUS — 997 AIHs E74.0 / src-sot-socioeconomic-2026
- Limitações: AIHs não correspondem a pacientes únicos. O CID E74.0 não distingue tipos de GSD. Ausência de registros administrativos não equivale à ausência de pacientes.
- SoT associada: EV-SOT-SOC-001

### EV-METRIC-MET-CLINICAL-001

- Caminho/URL: `painel-gsds/src/data/metrics.json`
- ID real no JSON: `met-clinical-001`
- Título: Diversidade clínica reconhecida
- Tipo: project-metric
- Locator/source refs: period `síntese da SoT médica (corte 2026-08-10)`; sourceIds src-sot-medical-exec-2026; claimId `clm-clinical-001`
- Limitações: Não é um inventário fechado; a nomenclatura histórica permanece heterogênea. Não implica homogeneidade de gravidade, prevalência ou opções terapêuticas.
- SoT associada: EV-SOT-MED-001

### EV-METRIC-MET-MARKET-001

- Caminho/URL: `painel-gsds/src/data/metrics.json`
- ID real no JSON: `met-market-001`
- Título: Receita farmacêutica observada (Pompe)
- Tipo: project-metric
- Locator/source refs: period `2024`; sourceIds src-sot-socioeconomic-2026; claimId `clm-market-001`
- Limitações: Trata-se de mercado/receita observada, não de TAM, SAM ou SOM. A concentração em Pompe não dimensiona necessidades de outras GSDs.
- SoT associada: EV-SOT-SOC-001

### EV-METRIC-MET-DATASUS-001

- Caminho/URL: `painel-gsds/src/data/metrics.json`
- ID real no JSON: `met-datasus-001`
- Título: AIHs com diagnóstico principal E74.0
- Tipo: project-metric
- Locator/source refs: period `janeiro de 2020 a maio de 2026`; sourceIds src-sot-socioeconomic-2026; claimId `clm-brasil-001`
- Limitações: AIHs não equivalem a pacientes, indivíduos ou internações únicas deduplicadas. E74.0 não distingue tipos de GSD. Observa utilização hospitalar, não prevalência nacional.
- SoT associada: EV-SOT-SOC-001

### EV-METRIC-MET-MCARDLE-001

- Caminho/URL: `painel-gsds/src/data/metrics.json`
- ID real no JSON: `met-mcardle-001`
- Título: Atraso diagnóstico mediano (McArdle)
- Tipo: project-metric
- Locator/source refs: period `estudo documentado na SoT socioeconômica`; sourceIds src-sot-socioeconomic-2026; claimId `clm-socio-002`
- Limitações: Evidência específica de McArdle — não é mediana universal das GSDs. População e desenho do estudo original devem acompanhar a leitura.
- SoT associada: EV-SOT-SOC-001

## Claims

### COPY-GLOBAL-FOOTER-001.C01

- COPY_ID: `COPY-GLOBAL-FOOTER-001`
- Claim atômico: O produto público se denomina Painel Global de Inovação em Glicogenoses.
- Evidência: EV-CODE-001
- Grau: `supports`
- Limitações: Nome de produto, não claim científico.
- Pendência: NONE

### COPY-GLOBAL-RESEARCHMETA-001.C01

- COPY_ID: `COPY-GLOBAL-RESEARCHMETA-001`
- Claim atômico: As páginas de análise declaram uma data de última revisão editorial e um corte de fontes.
- Evidência: EV-CODE-002
- Grau: `supports`
- Limitações: A semântica de "corte das fontes" no Observatório usa a data do snapshot, não das SoTs.
- Pendência: QUESTION-7A0-005

### COPY-HOME-SEO-002.C01

- COPY_ID: `COPY-HOME-SEO-002`
- Claim atômico: A Home apresenta GSDs como família heterogênea, com carga socioeconômica, mercado observado e limites dos dados brasileiros.
- Evidência: EV-SOT-MED-001 | EV-SOT-SOC-001
- Grau: `supports`
- Limitações: Classificado pelo que a frase afirma. A omissão de um caveat do Observatório é stylistic_only (ISSUE-7A0-006), não falha de evidência.
- Pendência: NONE

### COPY-HOME-HERO-002.C01

- COPY_ID: `COPY-HOME-HERO-002`
- Claim atômico: As glicogenoses são uma família de doenças com jornadas distintas, não um único percurso clínico.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-HERO-003.C01

- COPY_ID: `COPY-HOME-HERO-003`
- Claim atômico: O painel público combina contexto clínico, impacto socioeconômico e organizações relacionadas às GSDs.
- Evidência: EV-CODE-003
- Grau: `supports`
- Limitações: Descreve a arquitetura de informação do site; não afirma censo de organizações.
- Pendência: NONE

### COPY-HOME-PROBLEM-002.C01

- COPY_ID: `COPY-HOME-PROBLEM-002`
- Claim atômico: Glicogenose não é um diagnóstico único.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: “Mais de 20” descreve diversidade reconhecida, não censo fechado (limitação do clm-clinical-001).
- Pendência: NONE

### COPY-HOME-PROBLEM-002.C02

- COPY_ID: `COPY-HOME-PROBLEM-002`
- Claim atômico: Mais de 20 tipos e subtipos são reconhecidos.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: “Mais de 20” descreve diversidade reconhecida, não censo fechado (limitação do clm-clinical-001).
- Pendência: NONE

### COPY-HOME-PROBLEM-002.C03

- COPY_ID: `COPY-HOME-PROBLEM-002`
- Claim atômico: O tipo molecular orienta manifestação, prognóstico e manejo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: “Mais de 20” descreve diversidade reconhecida, não censo fechado (limitação do clm-clinical-001).
- Pendência: NONE

### COPY-HOME-PROBLEM-003.C01

- COPY_ID: `COPY-HOME-PROBLEM-003`
- Claim atômico: Formas hepáticas, musculares e multissistêmicas geram necessidades clínicas distintas ao longo da vida.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-PROBLEM-004.C01

- COPY_ID: `COPY-HOME-PROBLEM-004`
- Claim atômico: A carga inclui manejo diário, cuidado informal e barreiras de acesso, mensurados de forma desigual entre tipos.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-MECH-002.C01

- COPY_ID: `COPY-HOME-MECH-002`
- Claim atômico: A sequência mecanismo→vida é pedagógica e não substitui fluxograma clínico causal.
- Evidência: EV-SOT-MED-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-MECH-003.C01

- COPY_ID: `COPY-HOME-MECH-003`
- Claim atômico: Defeito metabólico: Enzima ou transportador do metabolismo do glicogênio comprometido.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: Ponte executiva; não é algoritmo.
- Pendência: NONE

### COPY-HOME-MECH-004.C01

- COPY_ID: `COPY-HOME-MECH-004`
- Claim atômico: Órgãos e funções: Fígado, músculo, coração, respiração ou múltiplos sistemas conforme o tipo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: Ponte executiva; não é algoritmo.
- Pendência: NONE

### COPY-HOME-MECH-005.C01

- COPY_ID: `COPY-HOME-MECH-005`
- Claim atômico: Manejo cotidiano: Dieta, monitoramento, reabilitação, infusões ou vigilância de complicações.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: Ponte executiva; não é algoritmo.
- Pendência: NONE

### COPY-HOME-MECH-006.C01

- COPY_ID: `COPY-HOME-MECH-006`
- Claim atômico: Paciente, rede e sistema: Carga familiar, atraso diagnóstico, utilização hospitalar e acesso desigual.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: Ponte executiva; não é algoritmo.
- Pendência: NONE

### COPY-HOME-METRICS-002.C01

- COPY_ID: `COPY-HOME-METRICS-002`
- Claim atômico: Os quatro números da Home medem dimensões distintas e não podem ser somados como escala única.
- Evidência: EV-SOT-MED-001 | EV-SOT-SOC-001 | EV-CODE-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-METRICS-003.C01

- COPY_ID: `COPY-HOME-METRICS-003`
- Claim atômico: As glicogenoses constituem um grupo heterogêneo de doenças metabólicas hereditárias; mais de 20 tipos e subtipos são reconhecidos, e o tipo molecular determina manifestação, prognóstico, vigilância e tratamento.
- Evidência: EV-CLAIM-CLM-CLINICAL-001 | EV-METRIC-MET-CLINICAL-001
- Grau: `supports`
- Limitações: A nomenclatura histórica não é uniforme; “mais de 20” descreve diversidade reconhecida, não um censo fechado de todos os fenótipos.
- Pendência: NONE

### COPY-HOME-METRICS-004.C01

- COPY_ID: `COPY-HOME-METRICS-004`
- Claim atômico: O mercado farmacêutico específico e publicamente observável das GSDs em 2024 concentra-se na doença de Pompe, com receita observada de aproximadamente €1,4 bilhão; isso não equivale a TAM, SAM ou SOM nem à necessidade total das glicogenoses.
- Evidência: EV-CLAIM-CLM-MARKET-001 | EV-METRIC-MET-MARKET-001
- Grau: `supports`
- Limitações: Valor consolidado depende da conversão USD/EUR da receita Amicus pela taxa média anual de 2024 reportada na SoT.
- Pendência: NONE

### COPY-HOME-METRICS-005.C01

- COPY_ID: `COPY-HOME-METRICS-005`
- Claim atômico: Não foi localizada estimativa de prevalência nacional com denominador populacional para qualquer GSD; nos microdados do SIH/SUS há 997 AIHs com diagnóstico principal E74.0 entre janeiro de 2020 e maio de 2026, o que demonstra utilização hospitalar limitada e não conta pacientes únicos.
- Evidência: EV-CLAIM-CLM-BRASIL-001 | EV-METRIC-MET-DATASUS-001
- Grau: `supports`
- Limitações: AIHs não correspondem a pacientes únicos.
- Pendência: NONE

### COPY-HOME-METRICS-006.C01

- COPY_ID: `COPY-HOME-METRICS-006`
- Claim atômico: Na doença de McArdle, foi relatado atraso diagnóstico mediano de 29 anos, com elevada frequência de diagnóstico incorreto prévio; o achado é específico do estudo e do subtipo, não uma mediana universal das GSDs.
- Evidência: EV-CLAIM-CLM-SOCIO-002 | EV-METRIC-MET-MCARDLE-001
- Grau: `supports`
- Limitações: Não generalizar o atraso de 29 anos a todas as glicogenoses.
- Pendência: NONE

### COPY-HOME-NEED-001.C01

- COPY_ID: `COPY-HOME-NEED-001`
- Claim atômico: Receita/mercado observado não equivale a necessidade total das GSDs.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-NEED-002.C01

- COPY_ID: `COPY-HOME-NEED-002`
- Claim atômico: O mercado farmacêutico observado concentra-se em Pompe e não equivale a população potencial, elegibilidade ou necessidade total.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-NEED-004.C01

- COPY_ID: `COPY-HOME-NEED-004`
- Claim atômico: População potencial: Teto epidemiológico ou genético possível; inclui incerteza de penetrância e não equivale a demanda atendível.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-NEED-005.C01

- COPY_ID: `COPY-HOME-NEED-005`
- Claim atômico: Diagnosticada / elegível / alcançável: Camada intermediária que exige confirmação, critérios clínicos e capacidade de acesso — ainda incompleta para a maioria das GSDs.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-NEED-006.C01

- COPY_ID: `COPY-HOME-NEED-006`
- Claim atômico: Cuidado ou mercado observado: O que é publicamente mensurável hoje, como receita farmacêutica em Pompe ou AIHs hospitalares no Brasil.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-NEED-007.C01

- COPY_ID: `COPY-HOME-NEED-007`
- Claim atômico: Dimensões não mensuradas: Diagnóstico, nutrição, monitoramento, reabilitação e suporte permanecem necessidades centrais sem mercado estruturado comparável.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-NEED-009.C01

- COPY_ID: `COPY-HOME-NEED-009`
- Claim atômico: A receita observada de aproximadamente €1,4 bilhão no período exibido não é TAM, SAM ou SOM.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-BR-002.C01

- COPY_ID: `COPY-HOME-BR-002`
- Claim atômico: Não há denominador nacional confiável de prevalência para as glicogenoses.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-BR-003.C01

- COPY_ID: `COPY-HOME-BR-003`
- Claim atômico: Acesso e capacidade assistencial permanecem fragmentados entre territórios e tipos.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-BR-004.C01

- COPY_ID: `COPY-HOME-BR-004`
- Claim atômico: O SIH/SUS oferece observação hospitalar limitada (AIHs E74.0), não um censo de pacientes.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-BR-005.C01

- COPY_ID: `COPY-HOME-BR-005`
- Claim atômico: Existe capacidade clínica e científica no país; isso não autoriza inferir cobertura nacional.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-ANALISES-003.C01

- COPY_ID: `COPY-HOME-ANALISES-003`
- Claim atômico: O observatório público atual é um primeiro recorte do mapeamento indireto Brasil.
- Evidência: EV-SNAP-COV-001
- Grau: `contradicts`
- Limitações: Snapshot atual inclui indiretos Brasil+Global e 28 diretos (120 organizações).
- Pendência: NONE

### COPY-HOME-OBS-002.C01

- COPY_ID: `COPY-HOME-OBS-002`
- Claim atômico: O recorte publicado inclui núcleos indiretos Brasil e Global e 28 organizações com relação direta do mapeamento global.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-OBS-002.C02

- COPY_ID: `COPY-HOME-OBS-002`
- Claim atômico: A cobertura é parcial e não equivale a um censo.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-OBS-003.C01

- COPY_ID: `COPY-HOME-OBS-003`
- Claim atômico: Relações diretas publicadas podem ser atuais, históricas ou ainda incertas.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-OBS-003.C02

- COPY_ID: `COPY-HOME-OBS-003`
- Claim atômico: Cobertura parcial não equivale a censo.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-HOME-METH-004.C01

- COPY_ID: `COPY-HOME-METH-004`
- Claim atômico: Achados de um subtipo não se generalizam automaticamente a todas as GSDs.
- Evidência: EV-SOT-MED-001 | EV-SOT-SOC-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-HEADER-001.C01

- COPY_ID: `COPY-CLINICAL-HEADER-001`
- Claim atômico: GSDs são uma família de doenças metabólicas hereditárias cujas jornadas dependem do tipo molecular, tecido e momento do diagnóstico.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001 | EV-CLAIM-CLM-CLINICAL-002
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-VISAO-001.C01

- COPY_ID: `COPY-CLINICAL-VISAO-001`
- Claim atômico: GSDs são um grupo heterogêneo causado por defeitos em enzimas ou transportadores da via do glicogênio.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-VISAO-001.C02

- COPY_ID: `COPY-CLINICAL-VISAO-001`
- Claim atômico: Mais de 20 tipos e subtipos são reconhecidos.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-VISAO-001.C03

- COPY_ID: `COPY-CLINICAL-VISAO-001`
- Claim atômico: Diagnóstico e tratamento precoces alteram a história natural.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-PATH-001.C01

- COPY_ID: `COPY-CLINICAL-PATH-001`
- Claim atômico: Defeitos em enzimas ou transportadores da síntese, degradação ou utilização do glicogênio alteram reservas e a capacidade de disponibilizar glicose ou energia.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-PATH-002.C01

- COPY_ID: `COPY-CLINICAL-PATH-002`
- Claim atômico: Defeitos em enzimas ou transportadores envolvidos na síntese, degradação ou utilização do glicogênio.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-PATH-003.C01

- COPY_ID: `COPY-CLINICAL-PATH-003`
- Claim atômico: Conforme a etapa afetada, pode haver armazenamento excessivo ou estruturalmente anormal, ou redução das reservas — como na GSD 0.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-PATH-004.C01

- COPY_ID: `COPY-CLINICAL-PATH-004`
- Claim atômico: Incapacidade de disponibilizar glicose ou energia adequadamente durante jejum ou exercício.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-PATH-005.C01

- COPY_ID: `COPY-CLINICAL-PATH-005`
- Claim atômico: Fígado e músculo esquelético são os órgãos mais frequentemente afetados; coração, rins, intestino, sistema nervoso e células hematopoiéticas também podem estar envolvidos.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-003
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-PATTERN-001.C01

- COPY_ID: `COPY-CLINICAL-PATTERN-001`
- Claim atômico: A deficiência compromete a manutenção da glicemia durante o jejum. O padrão típico combina hepatomegalia, hipoglicemia, atraso de crescimento, hipertransaminasemia e dislipidemia. A presença de cetose, lactato elevado, hiperuricemia, neutropenia ou fibrose ajuda a distinguir os tipos.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002
- Grau: `supports`
- Limitações: Exemplos centrais diferem substancialmente em gravidade e complicações.
- Pendência: NONE

### COPY-CLINICAL-PATTERN-002.C01

- COPY_ID: `COPY-CLINICAL-PATTERN-002`
- Claim atômico: O defeito limita a produção de energia durante o exercício. Sinais característicos incluem intolerância ao esforço, fadiga, dor, cãibras, fraqueza, elevação de creatinoquinase, rabdomiólise e mioglobinúria. Na GSD V, o fenômeno de second wind é particularmente sugestivo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002
- Grau: `supports`
- Limitações: Algumas formas de GSD IX pertencem a este grupo sem detalhamento adicional na síntese.
- Pendência: NONE

### COPY-CLINICAL-PATTERN-003.C01

- COPY_ID: `COPY-CLINICAL-PATTERN-003`
- Claim atômico: Não se encaixam na divisão simples hepática/muscular. A doença de Pompe é simultaneamente glicogenose e doença de depósito lisossômico, com comprometimento de músculos esquelético, respiratório e cardíaco. A GSD IV varia de doença hepática progressiva na infância a doença neurodegenerativa de início adulto. A síndrome de Fanconi–Bickel combina armazenamento hepatorrenal com tubulopatia proximal por deficiência do transportador GLUT2.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002
- Grau: `supports`
- Limitações: Formas multissistêmicas ilustram contínuos fenotípicos; não esgotam todas as GSDs.
- Pendência: NONE

### COPY-CLINICAL-EXPLORER-001.C01

- COPY_ID: `COPY-CLINICAL-EXPLORER-001`
- Claim atômico: A tabela/explorador é recorte essencial da síntese médica, não inventário exaustivo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-EXPLORER-006.C01

- COPY_ID: `COPY-CLINICAL-EXPLORER-006`
- Claim atômico: A classificação essencial publica nome preferido, gene, proteína/enzima, padrão clínico, traços distintivos e órgãos explicitados na síntese.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-NOM-001.C01

- COPY_ID: `COPY-CLINICAL-NOM-001`
- Claim atômico: A classificação histórica por algarismos romanos tornou-se insuficiente à medida que genes e mecanismos foram identificados; a prática contemporânea privilegia gene e tecido.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-NOM-002.C01

- COPY_ID: `COPY-CLINICAL-NOM-002`
- Claim atômico: No sistema antigo, GSD Ic e Id foram propostas como defeitos separados de transporte de fosfato e glicose no retículo endoplasmático; estudos moleculares mostraram que a maioria desses casos correspondia à GSD Ib. Na prática contemporânea, GSD I é dividida principalmente em Ia (G6PC1) e Ib (SLC37A4).
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-NOM-003.C01

- COPY_ID: `COPY-CLINICAL-NOM-003`
- Claim atômico: Houve reorganização das antigas GSD VIa, VIII, IX e X associadas à fosforilase-quinase. Atualmente, é mais informativo identificar a subunidade e o gene — por exemplo, GSD IX α2 por PHKA2 — do que depender somente da numeração histórica.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-NOM-004.C01

- COPY_ID: `COPY-CLINICAL-NOM-004`
- Claim atômico: A literatura já utilizou “GSD XI” tanto para deficiência de LDHA quanto para síndrome de Fanconi–Bickel; Hannah et al. (2023) reservam GSD XI para deficiência de LDHA e tratam Fanconi–Bickel separadamente.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-ORG-001.C01

- COPY_ID: `COPY-CLINICAL-ORG-001`
- Claim atômico: A matriz só registra órgãos explicitados na síntese; célula vazia não é ausência clínica.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-004
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-EPI-001.C01

- COPY_ID: `COPY-CLINICAL-EPI-001`
- Claim atômico: Incidência, prevalência clínica e prevalência genética predita não são medidas equivalentes.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-006
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-EPI-002.C01

- COPY_ID: `COPY-CLINICAL-EPI-002`
- Claim atômico: GSD I: ≈ 1 em 100.000 (incidência); cerca de 80% Ia e 20% Ib
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-006
- Grau: `supports`
- Limitações: Estimativa ilustrativa da heterogeneidade; não é prevalência clínica nem genética predita.
- Pendência: NONE

### COPY-CLINICAL-EPI-003.C01

- COPY_ID: `COPY-CLINICAL-EPI-003`
- Claim atômico: Pompe (GSD II): Histórica ≈ 1 em 40.000; genética populacional ≈ 1 em 23.232
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-006
- Grau: `supports`
- Limitações: Estimativa histórica e análise de genética populacional medem coisas diferentes e não devem ser fundidas.
- Pendência: NONE

### COPY-CLINICAL-EPI-004.C01

- COPY_ID: `COPY-CLINICAL-EPI-004`
- Claim atômico: GSD III: ≈ 1 em 100.000 (prevalência); cerca de 85% IIIa e 15% IIIb
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-006
- Grau: `supports`
- Limitações: Prevalências muito superiores em populações específicas (ex.: Inuit de Nunavik, Ilhas Faroé, judeus norte-africanos) não generalizam a média global.
- Pendência: NONE

### COPY-CLINICAL-EPI-005.C01

- COPY_ID: `COPY-CLINICAL-EPI-005`
- Claim atômico: GSD IV: ≈ 1 em 600.000–800.000
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-006
- Grau: `supports`
- Limitações: Faixa ampla; elevada incerteza epidemiológica do campo.
- Pendência: NONE

### COPY-CLINICAL-EPI-006.C01

- COPY_ID: `COPY-CLINICAL-EPI-006`
- Claim atômico: GSD VI e deficiência hepática de fosforilase-quinase: Melhores estimativas próximas de 1 em 100.000
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-006
- Grau: `supports`
- Limitações: A síntese assinala elevada incerteza para essas estimativas.
- Pendência: NONE

### COPY-CLINICAL-DX-001.C01

- COPY_ID: `COPY-CLINICAL-DX-001`
- Claim atômico: O diagnóstico moderno combina fenótipo, biomarcadores, imagem e genética molecular. A investigação deve começar pelo padrão predominante e ser direcionada pelas alterações metabólicas. Isto não é um algoritmo clínico.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-DX-003.C01

- COPY_ID: `COPY-CLINICAL-DX-003`
- Claim atômico: Hipoglicemia de jejum (especialmente com hepatomegalia); lactato, triglicerídeos ou ácido úrico elevados; hipertransaminasemia persistente sem explicação; intolerância ao exercício, cãibras, fraqueza, CK elevada ou rabdomiólise; cardiomiopatia hipertrófica ou insuficiência respiratória neuromuscular; associação entre doença hepática, renal, intestinal, hematológica ou neurológica.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-004.C01

- COPY_ID: `COPY-CLINICAL-DX-004`
- Claim atômico: Glicemia, cetonas, lactato, perfil lipídico, ácido úrico, transaminases, CK, função renal e marcadores específicos escolhidos conforme a hipótese ajudam a definir o mecanismo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-005.C01

- COPY_ID: `COPY-CLINICAL-DX-005`
- Claim atômico: Ultrassonografia e ressonância avaliam fígado, adenomas, fibrose e outros órgãos; eletrocardiograma, ecocardiograma, testes respiratórios e avaliações funcionais são importantes nas formas musculares e cardíacas.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-006.C01

- COPY_ID: `COPY-CLINICAL-DX-006`
- Claim atômico: O teste genético tornou-se a principal ferramenta confirmatória. Quando o fenótipo é altamente específico, pode-se testar um gene; diante de sobreposição clínica, painéis multigênicos, exoma ou genoma são mais eficientes.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-007.C01

- COPY_ID: `COPY-CLINICAL-DX-007`
- Claim atômico: Continua relevante, particularmente em Pompe e quando variantes genéticas têm interpretação incerta.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-008.C01

- COPY_ID: `COPY-CLINICAL-DX-008`
- Claim atômico: Biópsia hepática ou muscular, antes central, hoje é reservada para casos não resolvidos ou para responder a questões histológicas específicas.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-009.C01

- COPY_ID: `COPY-CLINICAL-DX-009`
- Claim atômico: Permite reconhecer casos antes da instalação de dano irreversível, embora sua implantação e interpretação ainda variem entre locais.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Não é algoritmo clínico.
- Pendência: NONE

### COPY-CLINICAL-MGMT-001.C01

- COPY_ID: `COPY-CLINICAL-MGMT-001`
- Claim atômico: O tratamento é específico para cada GSD e exige acompanhamento multidisciplinar. O objetivo transversal é evitar crises metabólicas, preservar órgãos e antecipar complicações crônicas.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-008
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-MGMT-003.C01

- COPY_ID: `COPY-CLINICAL-MGMT-003`
- Claim atômico: A base do tratamento é evitar jejum e manter glicemia estável com refeições programadas, carboidratos de liberação lenta e, em várias doenças, amido de milho cru. A composição da dieta varia; planos de emergência para doença intercorrente, cirurgia ou incapacidade de alimentação são essenciais. O controle metabólico reduz crises e melhora crescimento, mas não elimina todas as complicações. Na GSD I, é necessária vigilância de rins, pressão arterial, ossos e lesões hepáticas; adenomas podem surgir principalmente após a puberdade. Transplante hepático é reservado para situações como controle refratário, adenomas de alto risco, carcinoma, cirrose ou falência hepática — corrige o defeito metabólico hepático, mas pode não prevenir ou reverter integralmente doença renal e manifestações extra-hepáticas. Na GSD Ib, a empagliflozina (inibidor de SGLT2) reduz o metabólito tóxico 1,5-anidroglucitol-6-fosfato nos neutrófilos; estudos reunidos em 2023–2024 mostram melhora de neutropenia, função neutrofílica, infecções e manifestações intestinais, exigindo supervisão especializada.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-008
- Grau: `supports`
- Limitações: Não é orientação individual.
- Pendência: NONE

### COPY-CLINICAL-MGMT-004.C01

- COPY_ID: `COPY-CLINICAL-MGMT-004`
- Claim atômico: A reposição enzimática transformou a história natural da doença de Pompe. A alglucosidase alfa prolonga sobrevida, reduz cardiomiopatia e melhora desfechos motores, sobretudo quando iniciada precocemente; formulações de nova geração, como avalglucosidase alfa, buscam aumentar a captação celular. Apesar dos benefícios, a reposição enzimática não é curativa: requer infusões repetidas e pode apresentar resposta incompleta no músculo esquelético, além de reações infusionais e imunogenicidade. Monitoramento cardíaco, respiratório, motor, nutricional e reabilitação permanecem necessários.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-008
- Grau: `supports`
- Limitações: Não é orientação individual.
- Pendência: NONE

### COPY-CLINICAL-MGMT-005.C01

- COPY_ID: `COPY-CLINICAL-MGMT-005`
- Claim atômico: O manejo combina prevenção de rabdomiólise, exercício individualizado e estratégias nutricionais específicas. Inatividade completa é indesejável: treinamento aeróbico gradual e supervisionado pode melhorar capacidade oxidativa e tolerância. Na GSD V, aquecimento prolongado e reconhecimento do second wind ajudam a reduzir crises; ingestão de sacarose antes do exercício pode melhorar desempenho em situações selecionadas. Essa estratégia de sacarose pré-esforço não deve ser extrapolada à GSD VII, na qual carboidrato antes do esforço pode piorar a tolerância — o chamado out-of-wind phenomenon.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-008
- Grau: `supports`
- Limitações: Não é orientação individual.
- Pendência: NONE

### COPY-CLINICAL-MGMT-006.C01

- COPY_ID: `COPY-CLINICAL-MGMT-006`
- Claim atômico: A reposição enzimática em Pompe não é curativa segundo a síntese médica.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-008
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-001.C01

- COPY_ID: `COPY-CLINICAL-TX-001`
- Claim atômico: Terapia gênica e edição genômica procuram corrigir a deficiência de maneira mais duradoura e reduzir a dependência de dieta ou reposição enzimática. Vetores adeno-associados (AAV) são a plataforma mais avançada, com estudos pré-clínicos em GSD I, Pompe, III, IV e V.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Estágios refletem a situação reportada por Koeberl et al. (2024) e não devem ser interpretados como status regulatório atual.
- Pendência: NONE

### COPY-CLINICAL-TX-003.C01

- COPY_ID: `COPY-CLINICAL-TX-003`
- Claim atômico: Segundo Koeberl et al. (2024), a terapia gênica para GSD Ia havia avançado de um estudo de fase I/II com reposição de G6PC1 por AAV8 para um ensaio de fase III.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Status reportado em Koeberl 2024, não regulatório atual.
- Pendência: NONE

### COPY-CLINICAL-TX-004.C01

- COPY_ID: `COPY-CLINICAL-TX-004`
- Claim atômico: Em Pompe, estudos iniciais avaliavam estratégias hepáticas capazes de secretar GAA e abordagens direcionadas ao músculo (status conforme Koeberl et al., 2024).
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Status reportado em Koeberl 2024, não regulatório atual.
- Pendência: NONE

### COPY-CLINICAL-TX-005.C01

- COPY_ID: `COPY-CLINICAL-TX-005`
- Claim atômico: Pode oferecer expressão mais estável por integrar ou corrigir a sequência no DNA cromossômico, mas introduz riscos próprios, incluindo alterações fora do alvo e efeitos de quebras de dupla fita. Abordagens promissoras, porém dependentes de comprovação de durabilidade e segurança em longo prazo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Status reportado em Koeberl 2024, não regulatório atual.
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-001.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-001`
- Claim atômico: Perda de expressão do transgene, especialmente quando o fígado cresce após tratamento precoce.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-002.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-002`
- Claim atômico: Respostas imunes ao capsídeo viral ou ao produto do transgene.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-003.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-003`
- Claim atômico: Necessidade de doses elevadas para alcançar músculo esquelético e coração.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-004.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-004`
- Claim atômico: Anticorpos preexistentes que podem impedir o tratamento ou a redosagem.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-005.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-005`
- Claim atômico: Hepatotoxicidade e outras toxicidades relacionadas ao vetor.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-006.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-006`
- Claim atômico: Risco teórico de integração genômica e tumorigenicidade.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-TX-OBS-007.C01

- COPY_ID: `COPY-CLINICAL-TX-OBS-007`
- Claim atômico: Dificuldade de corrigir simultaneamente múltiplos órgãos.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-GAP-002.C01

- COPY_ID: `COPY-CLINICAL-GAP-002`
- Claim atômico: Prioridade 1: Diagnóstico mais precoce e equitativo
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-GAP-003.C01

- COPY_ID: `COPY-CLINICAL-GAP-003`
- Claim atômico: Prioridade 2: Registros longitudinais padronizados
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-GAP-004.C01

- COPY_ID: `COPY-CLINICAL-GAP-004`
- Claim atômico: Prioridade 3: Desfechos centrados no paciente
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-GAP-005.C01

- COPY_ID: `COPY-CLINICAL-GAP-005`
- Claim atômico: Prioridade 4: Protocolos de vigilância harmonizados
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-CLINICAL-GAP-006.C01

- COPY_ID: `COPY-CLINICAL-GAP-006`
- Claim atômico: Prioridade 5: Terapias multissistêmicas e duráveis
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BURDEN-001.C01

- COPY_ID: `COPY-SOCIO-BURDEN-001`
- Claim atômico: A carga das glicogenoses ultrapassa sintomas clínicos e incorpora manejo cotidiano, cuidado informal, restrição funcional e barreiras de acesso; a mensuração é desigual entre tipos.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BURDEN-003.C01

- COPY_ID: `COPY-SOCIO-BURDEN-003`
- Claim atômico: Parte expressiva do tratamento ocorre no domicílio; a tolerância ao jejum pode ser de apenas 2 a 4 horas, exigindo administração recorrente de amido de milho cru e, em alguns casos, alimentação ou vigilância noturna.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Evidência destacada para GSD I; não generalizar a todas as GSDs hepáticas sem suporte adicional.
- Pendência: NONE

### COPY-SOCIO-BURDEN-004.C01

- COPY_ID: `COPY-SOCIO-BURDEN-004`
- Claim atômico: Entre adultos alemães com GSD I, 41,2% dependiam de alimentação enteral noturna e 60,6% relataram hipoglicemia noturna em seis meses.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Amostra e geografia específicas (adultos alemães); não é taxa universal de GSD I.
- Pendência: NONE

### COPY-SOCIO-BURDEN-005.C01

- COPY_ID: `COPY-SOCIO-BURDEN-005`
- Claim atômico: Atraso diagnóstico mediano de 29 anos, com 90% dos pacientes recebendo diagnóstico incorreto anteriormente; o custo pode se manifestar menos por hospitalização e mais por atraso diagnóstico, restrição laboral e perda de autonomia.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Achado específico de McArdle e do estudo; não é mediana universal das GSDs.
- Pendência: NONE

### COPY-SOCIO-BURDEN-006.C01

- COPY_ID: `COPY-SOCIO-BURDEN-006`
- Claim atômico: Atrasos diagnósticos de aproximadamente 9 a 12 anos foram documentados; o diagnóstico tardio prolonga investigações, permite progressão funcional e posterga o acesso ao manejo apropriado.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Escopo restrito à forma de início tardio e aos estudos citados.
- Pendência: NONE

### COPY-SOCIO-BURDEN-007.C01

- COPY_ID: `COPY-SOCIO-BURDEN-007`
- Claim atômico: Para GSD I, III, V e IX, não foram localizadas estimativas comparáveis de horas de cuidado, perda de renda ou despertares noturnos. Essa ausência representa falta de mensuração, não ausência de impacto.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Ausência de mensuração não deve ser lida como ausência de carga.
- Pendência: NONE

### COPY-SOCIO-CARE-003.C01

- COPY_ID: `COPY-SOCIO-CARE-003`
- Claim atômico: Um estudo estimou 17,7 horas semanais de cuidado informal, chegando a 25,6 horas quando o paciente utilizava cadeira de rodas.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Carga sobre cuidadores é documentada principalmente em Pompe; não extrapolar horas a outros tipos.
- Pendência: NONE

### COPY-SOCIO-CARE-004.C01

- COPY_ID: `COPY-SOCIO-CARE-004`
- Claim atômico: Problemas de saúde mental em 50% dos cuidadores avaliados e sobrecarga moderada a grave em 57,1% de pais de crianças com Pompe.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Instrumentos e amostras dos estudos originais condicionam a interpretação.
- Pendência: NONE

### COPY-SOCIO-COST-001.C01

- COPY_ID: `COPY-SOCIO-COST-001`
- Claim atômico: Os custos disponíveis não representam uma única cesta de recursos. Dependendo da fonte, podem incluir medicamentos, internações, consultas, dispositivos, cuidado domiciliar ou produtividade. O custo mais visível não é necessariamente o maior componente social.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-LAYER-001.C01

- COPY_ID: `COPY-SOCIO-COST-LAYER-001`
- Claim atômico: Receita farmacêutica global observada em 2024 ≈ €1,4 bilhão (Pompe). No Brasil, uma contratação pública de Myozyme (fevereiro de 2025) somou R$78,4 milhões — âncora de gasto, não tamanho nacional total.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-LAYER-002.C01

- COPY_ID: `COPY-SOCIO-COST-LAYER-002`
- Claim atômico: R$533.796,75 nas 997 AIHs E74.0 (jan/2020–mai/2026). Mede hospitalização codificada, não terapia ambulatorial, dieta ou cuidado doméstico.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-LAYER-003.C01

- COPY_ID: `COPY-SOCIO-COST-LAYER-003`
- Claim atômico: Avaliações econômicas identificadas encontraram razões de custo-efetividade elevadas e sensíveis a preço e dose.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-LAYER-004.C01

- COPY_ID: `COPY-SOCIO-COST-LAYER-004`
- Claim atômico: Em GSDs hepáticas, o cuidado doméstico e o tratamento dietético podem ser economicamente relevantes mesmo quando internações e medicamentos específicos são limitados; dieta e insumos são capturados apenas parcialmente por bases de pagadores.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-LAYER-005.C01

- COPY_ID: `COPY-SOCIO-COST-LAYER-005`
- Claim atômico: Ausência no trabalho, redução de jornada, aposentadoria precoce, perda de produtividade e tempo de cuidado informal são descritos, mas raramente com estimativas comparáveis por tipo.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-AMOUNT-002.C01

- COPY_ID: `COPY-SOCIO-COST-AMOUNT-002`
- Claim atômico: Há soma pública de R$533.796,75 associada às AIHs E74.0 no recorte SIH/SUS da síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: O valor e o recorte estão sustentados. DIAG_PRINC é leakage editorial (ISSUE-7A0-002), não grau parcial de evidência.
- Pendência: QUESTION-7A0-003 (linguagem, não factualidade)

### COPY-SOCIO-BR-001.C01

- COPY_ID: `COPY-SOCIO-BR-001`
- Claim atômico: O Brasil combina potencial subdiagnóstico, acesso fragmentado e baixa visibilidade de dados. Não há denominador nacional confiável; proxies hospitalares e casuísticas não equivalem a prevalência.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BR-002.C01

- COPY_ID: `COPY-SOCIO-BR-002`
- Claim atômico: AIHs com diagnóstico principal E74.0 não equivalem a pacientes nem a prevalência.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BR-PT-001.C01

- COPY_ID: `COPY-SOCIO-BR-PT-001`
- Claim atômico: Sem denominador nacional
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BR-PT-002.C01

- COPY_ID: `COPY-SOCIO-BR-PT-002`
- Claim atômico: Acesso fragmentado
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BR-PT-003.C01

- COPY_ID: `COPY-SOCIO-BR-PT-003`
- Claim atômico: DATASUS / SIH — 997 AIHs E74.0
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-BR-PT-004.C01

- COPY_ID: `COPY-SOCIO-BR-PT-004`
- Claim atômico: Capacidade clínica sem inferência de cobertura
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-SEG-001.C01

- COPY_ID: `COPY-SOCIO-SEG-001`
- Claim atômico: O mercado farmacêutico específico e publicamente observável concentra-se em Pompe; segmentos não farmacêuticos existem como mercados adjacentes ou emergentes, fragmentados e raramente desagregados para GSD.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-SEG-004.C01

- COPY_ID: `COPY-SOCIO-SEG-004`
- Claim atômico: Em 2024, receita farmacêutica observada consolidada de aproximadamente €1,403 bilhão (Sanofi + Amicus). Representa receita realizada, não TAM/SAM/SOM.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Concentração em Pompe não dimensiona necessidade das demais GSDs.
- Pendência: NONE

### COPY-SOCIO-SEG-005.C01

- COPY_ID: `COPY-SOCIO-SEG-005`
- Claim atômico: Diagnóstico genético e enzimático e triagem neonatal existem como mercados adjacentes ou emergentes, mas suas receitas não podem ser atribuídas às glicogenoses com os dados públicos disponíveis na síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Observabilidade monetária GSD-específica ausente nos dados públicos citados.
- Pendência: NONE

### COPY-SOCIO-SEG-006.C01

- COPY_ID: `COPY-SOCIO-SEG-006`
- Claim atômico: Amidos, alimentos para fins especiais e manejo dietético doméstico são centrais em várias GSDs hepáticas; a atividade econômica é fragmentada e grande parcela do custo pode ser transferida às famílias.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Receitas não desagregadas para GSD nos dados públicos da síntese.
- Pendência: NONE

### COPY-SOCIO-SEG-007.C01

- COPY_ID: `COPY-SOCIO-SEG-007`
- Claim atômico: Monitorização contínua de glicose, bombas de alimentação e telemonitoramento existem como mercados adjacentes ou emergentes sem receita GSD-atribuível nos dados públicos disponíveis.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Sem sizing monetário GSD-específico na síntese.
- Pendência: NONE

### COPY-SOCIO-SEG-008.C01

- COPY_ID: `COPY-SOCIO-SEG-008`
- Claim atômico: GSDs musculares e ultrarraras apresentam necessidades de reabilitação, coordenação e geração de evidência sem mercado ou pagador estruturado conforme a síntese estratégica da síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Observabilidade monetária ausente; necessidade clínica não constitui automaticamente mercado validado.
- Pendência: NONE

### COPY-SOCIO-SIZE-001.C01

- COPY_ID: `COPY-SOCIO-SIZE-001`
- Claim atômico: TAM/SAM/SOM só aparecem quando a fonte os autoriza; receita observada não é intercambiável com população potencial.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-OBS-HEADER-001.C01

- COPY_ID: `COPY-OBS-HEADER-001`
- Claim atômico: O observatório é um mapeamento curado e não exaustivo.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-OBS-CHART-003.C01

- COPY_ID: `COPY-OBS-CHART-003`
- Claim atômico: Na base atual, nenhuma organização aparece em mais de uma categoria de relação.
- Evidência: EV-SNAP-COV-001 | EV-CODE-CHARTS
- Grau: `supports`
- Limitações: Afirmação sobre o snapshot vigente; pode mudar em snapshot futuro.
- Pendência: NONE

### COPY-OBS-CHART-004.C01

- COPY_ID: `COPY-OBS-CHART-004`
- Claim atômico: Brasil e Global não são mutuamente exclusivos no recorte publicado.
- Evidência: EV-CODE-CHARTS
- Grau: `supports`
- Limitações: A caveat diz "uma organização aparece nos dois escopos" como fato geral; o snapshot tem exatamente 1 org em both. Linguagem um pouco absoluta.
- Pendência: NONE

### COPY-OBS-CHART-005.C01

- COPY_ID: `COPY-OBS-CHART-005`
- Claim atômico: O recorte direto publicado neste snapshot tem 28 organizações.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Contagem do snapshot publicado; não é censo e pode mudar em outro snapshot.
- Pendência: NONE

### COPY-OBS-CHART-006.C01

- COPY_ID: `COPY-OBS-CHART-006`
- Claim atômico: Presença no mapeamento direto não implica programa GSD atualmente ativo.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-OBS-CHART-008.C01

- COPY_ID: `COPY-OBS-CHART-008`
- Claim atômico: O recorte direto publicado neste snapshot tem 28 organizações.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Número correto hoje; risco de deriva do template.
- Pendência: NONE

### COPY-OBS-COVERAGE-003.C01

- COPY_ID: `COPY-OBS-COVERAGE-003`
- Claim atômico: O observatório reúne recortes indiretos publicados e organizações com relação direta; a relação pode ser atual, histórica ou incerta.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-OBS-COVERAGE-007.C01

- COPY_ID: `COPY-OBS-COVERAGE-007`
- Claim atômico: Ativos e programas ainda não estão modelados como entidades estruturadas separadas.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Descreve lacuna de modelo; ação é 7B, não reescrita agora.
- Pendência: QUESTION-7A0-004

### COPY-OBS-ABOUT-002.C01

- COPY_ID: `COPY-OBS-ABOUT-002`
- Claim atômico: A base publicada não é censo global.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: NONE
- Pendência: NONE

### COPY-SOCIO-COST-AMOUNT-001.C01

- COPY_ID: `COPY-SOCIO-COST-AMOUNT-001`
- Claim atômico: Receita global Pompe 2024 (Sanofi + Amicus) é apresentada como ≈ €1,403 bilhão.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: Receita observada, não TAM/SAM/SOM; o eco TAM do caveat foi removido por publicSocioSecondaryText.
- Pendência: NONE

### COPY-SOCIO-COST-AMOUNT-003.C01

- COPY_ID: `COPY-SOCIO-COST-AMOUNT-003`
- Claim atômico: Contratação pública Myozyme 50 mg, fevereiro de 2025 (62.969 frascos) somou R$78,4 milhões.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: Âncora de gasto, não tamanho nacional total; equivalentes pacientes-ano não informam pacientes tratados.
- Pendência: NONE

### COPY-SOCIO-COST-AMOUNT-004.C01

- COPY_ID: `COPY-SOCIO-COST-AMOUNT-004`
- Claim atômico: Avaliação econômica da forma infantil em estudo europeu reporta ≈ €1.043.868 por QALY, com cenário de dose reduzida a €286.114.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: IDs ECO- removidos no runtime; resultados sensíveis a preço e dose; não transferir mecanicamente ao Brasil.
- Pendência: NONE

### COPY-SOCIO-COST-AMOUNT-005.C01

- COPY_ID: `COPY-SOCIO-COST-AMOUNT-005`
- Claim atômico: Forma tardia em estudo japonês reporta ≈ €3,2 milhões por QALY.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: Contexto japonês; sensível a premissas.
- Pendência: NONE

### COPY-SOCIO-COST-AMOUNT-006.C01

- COPY_ID: `COPY-SOCIO-COST-AMOUNT-006`
- Claim atômico: Reanálise independente do NIHR reporta > £2 milhões por QALY frente ao cuidado de suporte.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: Não equivale a preço de lista nem a gasto brasileiro.
- Pendência: NONE

### COPY-SOCIO-BR-005.C01

- COPY_ID: `COPY-SOCIO-BR-005`
- Claim atômico: No recorte SIH/SUS há 997 AIHs E74.0 entre janeiro de 2020 e maio de 2026, com soma aprovada associada na camada hospitalar; AIHs longas podem repetir a mesma pessoa e não há deduplicação.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001 | EV-METRIC-MET-DATASUS-001
- Grau: `supports`
- Limitações: Não é custo total das GSDs nem prevalência; E74.0 não distingue tipos.
- Pendência: NONE

### COPY-SOCIO-GAPS-002.C01

- COPY_ID: `COPY-SOCIO-GAPS-002`
- Claim atômico: Diagnóstico genético/enzimático e triagem constam como segmento com mensuração monetária limitada nesta síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Observabilidade monetária GSD-específica ausente nos dados públicos citados.
- Pendência: NONE

### COPY-SOCIO-GAPS-003.C01

- COPY_ID: `COPY-SOCIO-GAPS-003`
- Claim atômico: Nutrição e insumos dietéticos constam como segmento com mensuração monetária limitada nesta síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Receitas não desagregadas para GSD nos dados públicos da síntese.
- Pendência: NONE

### COPY-SOCIO-GAPS-004.C01

- COPY_ID: `COPY-SOCIO-GAPS-004`
- Claim atômico: Monitoramento e dispositivos constam como segmento com mensuração monetária limitada nesta síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Sem sizing monetário GSD-específico na síntese.
- Pendência: NONE

### COPY-SOCIO-GAPS-005.C01

- COPY_ID: `COPY-SOCIO-GAPS-005`
- Claim atômico: Reabilitação e suporte constam como segmento com mensuração monetária limitada nesta síntese.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Observabilidade monetária ausente; necessidade clínica não constitui automaticamente mercado validado.
- Pendência: NONE

## Claims adicionados na R2 (F8/F9)

### COPY-HOME-BR-006.C01

- COPY_ID: `COPY-HOME-BR-006`
- Claim atômico: A referência hospitalar da Home exibe 997 AIHs no recorte E74.0.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001 | EV-METRIC-MET-DATASUS-001
- Grau: `supports`
- Limitações: AIHs não são pacientes; o nó de unidade/período é AIHs· janeiro de 2020 a maio de 2026, sem espaço ao redor do ponto médio.
- Pendência: NONE

### COPY-HOME-BR-006.C02

- COPY_ID: `COPY-HOME-BR-006`
- Claim atômico: O período associado a essa referência é janeiro de 2020 a maio de 2026.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001 | EV-METRIC-MET-DATASUS-001
- Grau: `supports`
- Limitações: Período bruto de metrics.json, sem sanitizeHomeCopy.
- Pendência: NONE

### COPY-HOME-BR-006.C03

- COPY_ID: `COPY-HOME-BR-006`
- Claim atômico: A Home declara que 997 AIHs E74.0 são proxy hospitalar, não pacientes, na ausência de denominador nacional confiável.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001 | EV-METRIC-MET-DATASUS-001
- Grau: `supports`
- Limitações: Mesma afirmação de COPY-HOME-METRICS-005 / clm-brasil-001.
- Pendência: NONE

### COPY-HOME-METH-002.C01

- COPY_ID: `COPY-HOME-METH-002`
- Claim atômico: A última revisão editorial da Home está datada de 2026-08-10.
- Evidência: EV-CODE-003 | EV-RUNTIME-001
- Grau: `supports`
- Limitações: Valor do <time> imediatamente após o rótulo; o ponto final é um átomo próprio.
- Pendência: NONE

### COPY-HOME-METH-002.C02

- COPY_ID: `COPY-HOME-METH-002`
- Claim atômico: O corte das fontes da Home está datado de 2026-08-10.
- Evidência: EV-CODE-003 | EV-RUNTIME-001
- Grau: `supports`
- Limitações: sotCutoff da página index.astro.
- Pendência: NONE

### COPY-HOME-METH-006.C01

- COPY_ID: `COPY-HOME-METH-006`
- Claim atômico: A fonte médica da Home é o Resumo Médico Executivo do Projeto Painel GSDs (2026).
- Evidência: EV-SOT-MED-001 | EV-CODE-003
- Grau: `supports`
- Limitações: Título e autoria/ano vêm de sources.json; são átomos separados no DOM.
- Pendência: NONE

### COPY-HOME-METH-007.C01

- COPY_ID: `COPY-HOME-METH-007`
- Claim atômico: A fonte socioeconômica da Home é o Estudo Socioeconômico Mercadológico do Projeto Painel GSDs (2026).
- Evidência: EV-SOT-SOC-001 | EV-CODE-003
- Grau: `supports`
- Limitações: Título e autoria/ano vêm de sources.json; são átomos separados no DOM.
- Pendência: NONE

### COPY-HOME-NEED-003.C01

- COPY_ID: `COPY-HOME-NEED-003`
- Claim atômico: A visualização de necessidade é marcada como conceitual e declara não usar áreas proporcionais nem funil monetário falso.
- Evidência: EV-CODE-003 | EV-SOT-SOC-001
- Grau: `supports`
- Limitações: Afirmação sobre construção visual, não sobre magnitude de mercado.
- Pendência: NONE

### COPY-GLOBAL-KEYMETRIC-001.C01

- COPY_ID: `COPY-GLOBAL-KEYMETRIC-001`
- Claim atômico: Cada KeyMetric da Home declara período, universo e uma limitação essencial.
- Evidência: EV-CODE-004 | EV-METRIC-JSON
- Grau: `supports`
- Limitações: Este COPY_ID cobre só os rótulos; valores e limitações concretas estão em COPY-HOME-METRICS-003–006.
- Pendência: NONE

### COPY-HOME-METH-003.C01

- COPY_ID: `COPY-HOME-METH-003`
- Claim atômico: Sínteses executivas da Home não substituem as análises aprofundadas.
- Evidência: EV-CODE-003
- Grau: `supports`
- Limitações: Limitação de leitura do produto, não um achado clínico.
- Pendência: NONE

### COPY-GLOBAL-FOOTER-002.C01

- COPY_ID: `COPY-GLOBAL-FOOTER-002`
- Claim atômico: O rodapé publica o ano civil do build e a data de última revisão da página.
- Evidência: EV-CODE-001 | EV-RUNTIME-001
- Grau: `supports`
- Limitações: year = getFullYear() do processo; lastReviewedAt é prop da página. Observado 2026 com datas 2026-08-10/12/24.
- Pendência: NONE

### COPY-CLINICAL-PATH-006.C01

- COPY_ID: `COPY-CLINICAL-PATH-006`
- Claim atômico: Os agrupamentos hepático, muscular e multissistêmico são pedagógicos; o fenótipo forma um contínuo com gravidade e órgãos variáveis na mesma doença.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-002
- Grau: `supports`
- Limitações: Não esgota todas as GSDs; fonte da linha é a síntese médica.
- Pendência: NONE

### COPY-CLINICAL-NOM-005.C01

- COPY_ID: `COPY-CLINICAL-NOM-005`
- Claim atômico: A linha do tempo de nomenclatura é editorial e segue a narrativa da síntese médica, sem datas inventadas nem calendário externo.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-005
- Grau: `supports`
- Limitações: Procedimento editorial da página, não cronologia primária.
- Pendência: NONE

### COPY-CLINICAL-TX-002.C01

- COPY_ID: `COPY-CLINICAL-TX-002`
- Claim atômico: Os estágios terapêuticos emergentes refletem a situação reportada por Koeberl et al. (2024) e não são status regulatório atual.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Não atualiza ANVISA/FDA; recorte temporal da síntese médica.
- Pendência: NONE

### COPY-CLINICAL-GAP-001.C01

- COPY_ID: `COPY-CLINICAL-GAP-001`
- Claim atômico: As lacunas clínicas listadas são as prioridades da seção correspondente da síntese médica, sem mapeamento a empresas ou produtos comerciais.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: Não é ranking de mercado.
- Pendência: NONE

### COPY-CLINICAL-FOOT-001.C01

- COPY_ID: `COPY-CLINICAL-FOOT-001`
- Claim atômico: A página clínica é síntese editorial da síntese médica, não protocolo clínico.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Não substitui avaliação médica.
- Pendência: NONE

### COPY-CLINICAL-FOOT-001.C02

- COPY_ID: `COPY-CLINICAL-FOOT-001`
- Claim atômico: Achados de um subtipo não se generalizam a todas as GSDs.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Mesma regra de não generalização das demais páginas.
- Pendência: NONE

### COPY-CLINICAL-FOOT-001.C03

- COPY_ID: `COPY-CLINICAL-FOOT-001`
- Claim atômico: Ausência de órgão ou prevalência na matriz não significa ausência clínica.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: A matriz só lista órgãos mencionados na síntese.
- Pendência: NONE

### COPY-CLINICAL-FOOT-001.C04

- COPY_ID: `COPY-CLINICAL-FOOT-001`
- Claim atômico: O status de terapia emergente reflete o panorama datado da síntese médica, não atualização regulatória.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-009
- Grau: `supports`
- Limitações: Alinhado a COPY-CLINICAL-TX-002.
- Pendência: NONE

### COPY-CLINICAL-NOTICE-001.C01

- COPY_ID: `COPY-CLINICAL-NOTICE-001`
- Claim atômico: O conteúdo clínico é informativo e não substitui avaliação médica especializada.
- Evidência: EV-SOT-MED-001
- Grau: `supports`
- Limitações: Notice de produto, não achado clínico.
- Pendência: NONE

### COPY-CLINICAL-DX-002.C01

- COPY_ID: `COPY-CLINICAL-DX-002`
- Claim atômico: A jornada diagnóstica publicada não constitui algoritmo diagnóstico.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-007
- Grau: `supports`
- Limitações: Disclaimer da página; não descreve um fluxo clínico prescritivo.
- Pendência: NONE

### COPY-CLINICAL-MGMT-002.C01

- COPY_ID: `COPY-CLINICAL-MGMT-002`
- Claim atômico: Os eixos de manejo publicados não constituem orientação terapêutica individual.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-008
- Grau: `supports`
- Limitações: Disclaimer da página.
- Pendência: NONE

### COPY-CLINICAL-EXPLORER-004.C01

- COPY_ID: `COPY-CLINICAL-EXPLORER-004`
- Claim atômico: No estado default publicado, 13 de 13 condições da classificação essencial da síntese médica estão listadas.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-004
- Grau: `supports`
- Limitações: Contagem do recorte essencial, não censo de todas as GSDs existentes.
- Pendência: NONE

### COPY-CLINICAL-GAP-007.C01

- COPY_ID: `COPY-CLINICAL-GAP-007`
- Claim atômico: A seção de lacunas clínicas não lista empresas, rankings ou oportunidades comerciais.
- Evidência: EV-SOT-MED-001 | EV-CLAIM-CLM-CLINICAL-010
- Grau: `supports`
- Limitações: Escopo da seção, não afirmação de que não existam empresas no mundo.
- Pendência: NONE

### COPY-CLINICAL-SEO-002.C01

- COPY_ID: `COPY-CLINICAL-SEO-002`
- Claim atômico: A página clínica cobre mecanismos, classificação, manifestações, diagnóstico, manejo e terapias emergentes nas GSDs.
- Evidência: EV-SOT-MED-001
- Grau: `supports`
- Limitações: Meta description; o detalhe está no corpo da página.
- Pendência: NONE

### COPY-SOCIO-CARE-001.C01

- COPY_ID: `COPY-SOCIO-CARE-001`
- Claim atômico: Quando a evidência de cuidador descreve horas ou impacto mental, o recorte de doença e instrumento permanece explícito, sem extrapolação a toda a família das GSDs.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-003
- Grau: `supports`
- Limitações: Regra de leitura da seção; achados concretos estão em CARE-003/004.
- Pendência: NONE

### COPY-SOCIO-BR-004.C01

- COPY_ID: `COPY-SOCIO-BR-004`
- Claim atômico: O campo Local do proxy SIH refere-se ao local da internação/estabelecimento nos microdados, não à residência do paciente.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-BRASIL-001
- Grau: `supports`
- Limitações: Definição de campo, não geocodificação de pacientes.
- Pendência: NONE

### COPY-SOCIO-SIZE-003.C01

- COPY_ID: `COPY-SOCIO-SIZE-003`
- Claim atômico: A receita farmacêutica observada em Pompe de ≈ €1,4 bilhão é classificada como receita observada, não TAM/SAM/SOM nem necessidade total.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: Branch observedRevenue; não dimensiona as demais GSDs.
- Pendência: NONE

### COPY-SOCIO-SIZE-003.C02

- COPY_ID: `COPY-SOCIO-SIZE-003`
- Claim atômico: Ausência de dado monetário na síntese não significa mercado igual a zero.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: Guardrail de lacuna de mensuração; reabilitação/suporte listados nessa coluna.
- Pendência: NONE

### COPY-SOCIO-GAPS-001.C01

- COPY_ID: `COPY-SOCIO-GAPS-001`
- Claim atômico: A síntese ainda não oferece mensuração monetária comparável para os segmentos listados nesta seção.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-004
- Grau: `supports`
- Limitações: Ausência na síntese, não inexistência de mercado.
- Pendência: NONE

### COPY-SOCIO-FOOT-001.C01

- COPY_ID: `COPY-SOCIO-FOOT-001`
- Claim atômico: Contratação, preço de lista, gasto público e receita empresarial não são intercambiáveis.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: Distinção metodológica da página socioeconômica.
- Pendência: NONE

### COPY-SOCIO-FOOT-001.C02

- COPY_ID: `COPY-SOCIO-FOOT-001`
- Claim atômico: Ausência de dado monetário não significa mercado igual a zero.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: Mesma regra de COPY-SOCIO-SIZE-003.C02.
- Pendência: NONE

### COPY-SOCIO-FOOT-001.C03

- COPY_ID: `COPY-SOCIO-FOOT-001`
- Claim atômico: Achados de Pompe, McArdle ou GSD hepática não se generalizam a toda a família sem suporte explícito.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: Regra de não generalização.
- Pendência: NONE

### COPY-SOCIO-FOOT-001.C04

- COPY_ID: `COPY-SOCIO-FOOT-001`
- Claim atômico: Camadas de custo em moedas, anos e perspectivas distintas não devem ser somadas sem normalização autorizada.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005 | EV-CLAIM-CLM-MARKET-001
- Grau: `supports`
- Limitações: Alinhado a COPY-SOCIO-COST-002.
- Pendência: NONE

### COPY-SOCIO-COST-002.C01

- COPY_ID: `COPY-SOCIO-COST-002`
- Claim atômico: Camadas monetárias não devem ser somadas entre moedas, anos ou perspectivas sem normalização autorizada pela fonte.
- Evidência: EV-SOT-SOC-001 | EV-CLAIM-CLM-SOCIO-005
- Grau: `supports`
- Limitações: Regra de CostLayers; não implica comparabilidade após normalização.
- Pendência: NONE

### COPY-SOCIO-SEO-002.C01

- COPY_ID: `COPY-SOCIO-SEO-002`
- Claim atômico: A página socioeconômica cobre carga sobre pacientes e cuidadores, camadas de custo, estrutura de mercado observada e limites da evidência brasileira.
- Evidência: EV-SOT-SOC-001
- Grau: `supports`
- Limitações: Meta description.
- Pendência: NONE

### COPY-SOCIO-HEADER-001.C01

- COPY_ID: `COPY-SOCIO-HEADER-001`
- Claim atômico: O resumo da página socioeconômica afirma carga sobre pacientes, cuidadores e sistemas de saúde e pergunta o que o mercado observado realmente captura.
- Evidência: EV-SOT-SOC-001
- Grau: `supports`
- Limitações: Framing editorial da página, não sizing.
- Pendência: NONE

### COPY-OBS-SUM-001.C01

- COPY_ID: `COPY-OBS-SUM-001`
- Claim atômico: O snapshot publicado contém 120 organizações nesta base no recorte default.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Contagem do artefato publicado, não censo mundial. Template filtrado não está ativo no default.
- Pendência: NONE

### COPY-OBS-COUNT-001.C01

- COPY_ID: `COPY-OBS-COUNT-001`
- Claim atômico: No recorte default publicado há 120 organizações no recorte.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Live region do explorer; não é censo.
- Pendência: NONE

### COPY-OBS-COVERAGE-002.C01

- COPY_ID: `COPY-OBS-COVERAGE-002`
- Claim atômico: O status de cobertura do Observatório no snapshot publicado é Cobertura parcial.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Label de startupCoverageStatusLabels.partial; não afirma cobertura mundial.
- Pendência: NONE

### COPY-OBS-COVERAGE-004.C01

- COPY_ID: `COPY-OBS-COVERAGE-004`
- Claim atômico: Relações diretas no Observatório podem ser atuais, históricas ou de atividade ainda incerta.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Limitação de coverage do snapshot.
- Pendência: NONE

### COPY-OBS-COVERAGE-005.C01

- COPY_ID: `COPY-OBS-COVERAGE-005`
- Claim atômico: Alguns campos de identidade (website, sede, ano de fundação) permanecem não confirmados neste recorte.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Não inventaria os campos por organização.
- Pendência: NONE

### COPY-OBS-COVERAGE-006.C01

- COPY_ID: `COPY-OBS-COVERAGE-006`
- Claim atômico: Alguns registros diretos ainda não possuem uma fonte pública vinculada nesta versão.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Repetido em COPY-OBS-ABOUT-005; mesma evidência de cobertura.
- Pendência: NONE

### COPY-OBS-COVERAGE-008.C01

- COPY_ID: `COPY-OBS-COVERAGE-008`
- Claim atômico: Confiança das avaliações diretas não foi atribuída neste recorte.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Estado do snapshot, não juízo sobre as organizações.
- Pendência: NONE

### COPY-OBS-COVERAGE-009.C01

- COPY_ID: `COPY-OBS-COVERAGE-009`
- Claim atômico: Papel no ativo usa linguagem pública; associação histórica não estabelece titularidade automaticamente.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Regra de leitura do campo, não ownership histórico renderizado.
- Pendência: NONE

### COPY-OBS-EMPTY-001.C01

- COPY_ID: `COPY-OBS-EMPTY-001`
- Claim atômico: Contagens zeradas no estado vazio descrevem o artefato vazio, não um censo de soluções no mundo.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Source-only; snapshot atual está populado.
- Pendência: NONE

### COPY-OBS-NORESULTS-001.C01

- COPY_ID: `COPY-OBS-NORESULTS-001`
- Claim atômico: Zero correspondências a consulta/filtros significa que a base publicada não cobre o critério, não que não existam soluções no mundo.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Estado condicional; reproduzido com consulta sem match.
- Pendência: NONE

### COPY-OBS-DETAIL-002.C01

- COPY_ID: `COPY-OBS-DETAIL-002`
- Claim atômico: Ativos e programas são apresentados no contexto da organização e ainda não possuem seção estruturada própria.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: PENDING_7B_DATA_MODEL; fallback do drawer quando productsOrPrograms está vazio.
- Pendência: NONE

### COPY-OBS-ABOUT-003.C01

- COPY_ID: `COPY-OBS-ABOUT-003`
- Claim atômico: Classificações direta/adjacente/ecossistema/relevância não confirmada e Brasil/global pertencem às avaliações de relevância de cada organização, não a bases separadas.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Metodologia de classificação do snapshot.
- Pendência: NONE

### COPY-OBS-ABOUT-004.C01

- COPY_ID: `COPY-OBS-ABOUT-004`
- Claim atômico: A base pública selecionada teve última atualização em 2026-08-24.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Data do <time> após o rótulo; o ponto final é átomo próprio. publishedAt do snapshot.
- Pendência: NONE

### COPY-OBS-ABOUT-005.C01

- COPY_ID: `COPY-OBS-ABOUT-005`
- Claim atômico: Fonte pública vinculada aparece no detalhe da organização; alguns registros diretos ainda não possuem fonte pública nesta versão.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Segunda cláusula coincide com COPY-OBS-COVERAGE-006.
- Pendência: NONE

### COPY-OBS-SEO-002.C01

- COPY_ID: `COPY-OBS-SEO-002`
- Claim atômico: O Observatório descreve organizações com relevância direta, adjacente ou ainda não confirmada, em base pública estática sujeita a atualização editorial.
- Evidência: EV-SNAP-COV-001
- Grau: `supports`
- Limitações: Meta description; não é censo.
- Pendência: NONE

### COPY-GLOBAL-FOOTER-003.C01

- COPY_ID: `COPY-GLOBAL-FOOTER-003`
- Claim atômico: O notice médico default do BaseLayout afirma que o conteúdo é informativo e não substitui avaliação médica.
- Evidência: EV-CODE-001
- Grau: `supports`
- Limitações: Source-only nas 4 rotas in-scope (hideFooterMedicalNotice).
- Pendência: NONE

### COPY-GLOBAL-EVIDENCEFOOTER-003.C01

- COPY_ID: `COPY-GLOBAL-EVIDENCEFOOTER-003`
- Claim atômico: O notice médico default do EvidenceFooter afirma que o conteúdo é informativo e não substitui avaliação médica individual.
- Evidência: EV-SOT-MED-001
- Grau: `supports`
- Limitações: Prop unused nas páginas in-scope.
- Pendência: NONE
