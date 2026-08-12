# Instruções para o Cursor — Iteração 3: Bases clínicas e médicas

## 0. Objetivo

Implementar a página analítica **Bases clínicas das glicogenoses** no projeto `painel-gsds`, convertendo o resumo médico executivo em uma experiência editorial, responsiva, rastreável e visualmente consistente com a Home e com o Design System já aprovados.

Esta iteração deve entregar a rota:

```text
/analises/bases-clinicas/
```

A página deve permitir duas leituras simultâneas:

- uma leitura executiva, capaz de orientar um ADM sem exigir conhecimento prévio;
- uma leitura evidencial, capaz de preservar mecanismos, tipos, limitações, nomenclatura e fontes.

Não realizar pesquisa externa, não atualizar silenciosamente a ciência e não implementar as páginas socioeconômica ou de startups.

---

## 1. Working directory e base obrigatória

Trabalhar exclusivamente no repositório:

```text
C:\github-projects\antoniofaical.github.io
```

Aplicação:

```text
C:\github-projects\antoniofaical.github.io\painel-gsds
```

Antes de editar:

1. confirmar que a branch-base é `main` atualizada;
2. confirmar que a `main` contém as Iterações 1, 1.1, 2 e 2.1 já aprovadas, incluindo `.gitattributes`, Home executiva e workflows na raiz; registrar o SHA atual no checkpoint;
3. confirmar working tree limpa;
4. ler integralmente `painel-gsds/AGENTS.md` e `painel-gsds/CLAUDE.md`;
5. inventariar a fundação, a Home, schemas, componentes e testes existentes;
6. confirmar que `.gitattributes`, fontes locais, workflows e SoTs permanecem íntegros;
7. criar uma branch específica para a Iteração 3, sem commit inicial vazio.

Nome sugerido:

```text
cursor/iteracao-3-bases-clinicas
```

Se o ambiente não contiver o projeto completo ou estiver em uma branch incompatível, parar e reportar o bloqueio. Não recriar SoTs nem reconstruir arquivos ausentes por memória.

---

## 2. Fontes de verdade obrigatórias

Ler integralmente antes da implementação:

1. `painel-gsds/docs/source-of-truth/Glicogenose Resumo Médico Executivo.md`;
2. `painel-gsds/docs/implementation/01_Design_System_v0.3.md`;
3. `painel-gsds/docs/implementation/07_Matriz_de_Paginas_Componentes_e_Dados.md`;
4. `painel-gsds/docs/implementation/03_Modelo_de_Dados_e_Rastreabilidade.md`;
5. `painel-gsds/docs/implementation/05_Criterios_de_Aceite.md`;
6. `painel-gsds/docs/implementation/06_Regras_Permanentes_Cursor.md`;
7. `painel-gsds/docs/decisions/ADR-0002-home-content.md`;
8. `painel-gsds/docs/decisions/ADR-0001-app-subdirectory.md` e `ADR-0003-observatorio-longitudinal.md`, apenas para contexto arquitetural;
9. datasets, schemas e componentes da Home já implementados;
10. `painel-gsds/docs/source-of-truth/Design_System_Painel_Glicogenoses.md`, somente para detalhes clínicos não conflitantes com o v0.3.

Hierarquia em caso de conflito:

1. resumo médico executivo para conteúdo científico;
2. Design System v0.3 para princípios globais e decisões consolidadas;
3. matriz v0.3 para contratos de página, componente e dado;
4. especificação clínica anterior para detalhes funcionais não substituídos;
5. implementação existente para convenções técnicas.

As três SoTs são imutáveis. Não formatar, renomear, reorganizar ou corrigir esses arquivos.

Registrar os hashes antes e depois. Hash esperado do resumo médico em LF:

```text
37e3fbea2513ff57f42937273622fee8592ce1d9df955c7467ef78f947866389
```

---

## 3. Checkpoints obrigatórios no chat

Fornecer reports diretos no chat, nunca apenas em `.md`.

Frequência:

- no máximo a cada 15 minutos de trabalho contínuo;
- ao concluir cada bloco funcional relevante;
- imediatamente diante de bloqueio, inconsistência científica ou expansão de escopo.

Formato:

```text
Checkpoint: concluí [X]; encontrei [Y]; agora vou [Z].
```

Checkpoints mínimos:

1. inventário, branch e integridade;
2. matriz de evidências e modelo de dados clínico;
3. estrutura editorial, cabeçalho, metabolismo e espectro clínico;
4. explorador de GSDs, nomenclatura e envolvimento de órgãos;
5. diagnóstico, manejo, terapias emergentes e lacunas;
6. acessibilidade, responsividade, testes e screenshots;
7. report final.

Não criar arquivo de checkpoint. Não permanecer mais de 15 minutos sem sinal de vida.

---

## 4. Escopo científico

A página deve cobrir, sem acrescentar fatos externos:

1. visão geral das GSDs;
2. papel do glicogênio e lógica fisiopatológica;
3. padrões hepático, muscular e multissistêmico;
4. classificação essencial;
5. evolução da nomenclatura;
6. epidemiologia e seus limites;
7. reconhecimento e diagnóstico;
8. manejo atual;
9. terapias emergentes;
10. lacunas clínicas;
11. limitações e referências.

Não transformar a página em:

- ferramenta diagnóstica;
- orientação terapêutica individual;
- protocolo clínico;
- inventário empresarial;
- atualização regulatória contemporânea;
- revisão enciclopédica de todas as GSDs existentes.

Adicionar aviso visível e semanticamente associado ao conteúdo:

> Conteúdo informativo e não substitutivo de avaliação médica especializada.

---

## 5. Regra de não inferência

Implementar somente campos e relações sustentados pelo resumo médico.

Não inferir, completar ou pesquisar automaticamente:

- herança específica de cada condição quando não estiver explicitada;
- envolvimento de órgão não descrito;
- prevalência de condição sem estimativa na SoT;
- estágio terapêutico atual além do status reportado nas fontes;
- disponibilidade regulatória ou comercial por país;
- eficácia comparativa entre tratamentos;
- superioridade entre modalidades;
- correspondência entre ausência na SoT e ausência clínica real.

Quando faltar granularidade:

- omitir o campo, se ele não for necessário;
- usar `Evidência limitada` ou `Não informado na síntese`;
- transformar a visualização em recorte representativo;
- explicar a limitação em texto;
- nunca usar zero, traço ou célula vazia como sinônimo automático de ausência clínica.

A `OrganMatrix` não pode parecer uma ontologia exaustiva. Se os dados só sustentarem um recorte, rotular como **envolvimentos explicitamente descritos na síntese** e oferecer alternativa textual.

---

## 6. Modelo de evidência e dados

Reutilizar a cadeia já existente:

```text
source → claim → metric/entidade clínica → componente
```

Antes da interface, construir uma matriz de conteúdo interna contendo:

- ID da alegação;
- texto aprovado;
- seção/localizador da SoT;
- estado da evidência;
- GSD ou domínio relacionado;
- componente consumidor;
- limitação;
- data de revisão.

Estender schemas existentes em vez de criar uma segunda arquitetura paralela.

Estruturas esperadas, ajustáveis ao padrão real do repositório:

```text
src/data/clinical/
  gsd-types.json
  pathway.json
  clinical-patterns.json
  nomenclature.json
  organ-involvement.json
  diagnosis.json
  management.json
  therapy-horizon.json
  clinical-gaps.json

src/schemas/clinical/
  gsdType.ts
  pathway.ts
  organInvolvement.ts
  therapy.ts
```

Campos mínimos úteis de uma GSD, apenas quando sustentados:

```text
id
preferredName
alternativeNames
gene
proteinOrEnzyme
clinicalPattern
organsExplicitlyDescribed
distinctiveFeatures
nomenclatureNotes
sourceRefs
evidenceState
lastReviewedAt
```

Não inserir campos vazios apenas para satisfazer uma interface idealizada.

As referências dos artigos podem ser apresentadas conforme a bibliografia da SoT. Não inventar DOI, PMID ou URL. Para rastreabilidade de alegações, usar a própria SoT médica e seu localizador de seção quando a atribuição artigo a artigo não estiver explicitada.

Criar testes de schema e integridade que garantam:

- IDs únicos;
- referências resolvíveis;
- GSDs da classificação mínima presentes;
- nenhuma métrica sem fonte;
- nenhum status experimental sem data/qualificador;
- nenhum órgão codificado sem base explícita;
- ausência de campos proibidos ou placeholders fictícios.

---

## 7. Rota, metadados e integração

Implementar:

```text
/analises/bases-clinicas/
```

Metadados:

- título: `Bases clínicas das glicogenoses`;
- descrição: `Mecanismos, classificação, manifestações, diagnóstico, manejo e terapias emergentes nas doenças de armazenamento do glicogênio.`;
- data de corte coerente com as fontes da SoT;
- data da última revisão do conteúdo;
- breadcrumb: `Início → Análises → Bases clínicas`.

Atualizar a Home para que o portal de bases clínicas deixe de aparecer como indisponível e aponte para a nova rota. A página socioeconômica e as páginas de inovação permanecem `Em desenvolvimento`.

Atualizar navegação e rodapé somente na medida necessária para tornar a rota alcançável. Não redesenhar a Home.

Todas as URLs devem respeitar `BASE_PATH` e usar a utilidade existente, sem caminhos absolutos incompatíveis com GitHub Pages.

---

## 8. Progressão narrativa obrigatória

Usar a sequência:

```text
Uma família de doenças
→ papel do glicogênio
→ padrões clínicos
→ tipos e subtipos
→ nomenclatura
→ órgãos afetados
→ epidemiologia
→ diagnóstico
→ manejo
→ terapias emergentes
→ lacunas
→ limitações e referências
```

Não começar pela tabela taxonômica.

Cada seção deve responder a uma pergunta explícita e conter:

- síntese legível sem interação;
- visualização ou estrutura comparativa somente quando útil;
- fonte/localizador;
- limitação pertinente;
- âncora estável.

Âncoras sugeridas:

```text
#visao-geral
#metabolismo
#padroes-clinicos
#tipos-e-subtipos
#nomenclatura
#orgaos
#epidemiologia
#diagnostico
#manejo
#terapias-emergentes
#lacunas
#limitacoes-e-fontes
```

---

## 9. Componentes e comportamento

### 9.1 Estrutura editorial

Reutilizar ou implementar:

- `Breadcrumbs`;
- `ResearchHeader`;
- `ResearchSectionNav`;
- `LastUpdated`;
- `EvidenceFooter`;
- `GlossaryTerm` ou definição acessível equivalente.

Não criar uma biblioteca genérica excessiva. Extrair componentes compartilhados apenas quando já houver uso real ou contrato claro para as próximas páginas.

### 9.2 Abertura clínica

Hero de alto contraste com:

- título executivo;
- síntese curta;
- três mensagens: GSD não é diagnóstico final; fenótipo contínuo; precocidade importa;
- visual abstrato derivado da linguagem de ramificações já usada na Home, sem duplicá-la literalmente;
- ações para metabolismo e comparação de tipos.

### 9.3 `GlycogenPathway`

Diagrama didático simplificado com as etapas explicitadas na especificação clínica anterior.

Regras:

- legenda `Representação simplificada`;
- processo e consequências em linguagem acessível;
- seleção por teclado/toque;
- descrição textual equivalente;
- mobile vertical;
- sem obrigação de zoom ou arraste;
- não simular um mapa bioquímico exaustivo.

### 9.4 `ClinicalSpectrum`

Mostrar continuidade entre:

```text
predominantemente hepáticas ↔ multissistêmicas ↔ predominantemente musculares
```

Deixar explícito que é agrupamento didático, não classificação absoluta.

### 9.5 `GSDExplorer`

Incluir, no mínimo:

- GSD 0a e 0b;
- GSD Ia e Ib;
- GSD II/Pompe;
- GSD III;
- GSD IV;
- GSD V;
- GSD VI;
- GSD VII;
- GSD IX;
- grupo X–XV e condições relacionadas;
- síndrome de Fanconi–Bickel.

Desktop:

- tabela/matriz compacta;
- filtros por padrão clínico e órgão quando sustentados;
- expansão de detalhes;
- comparação de até três condições.

Mobile:

- lista filtrável;
- ficha por condição;
- comparação de até duas condições;
- sem tabela comprimida horizontalmente.

Se implementar estado por URL, usar query parameters robustos ao `BASE_PATH`. O conteúdo essencial deve permanecer acessível sem JavaScript.

### 9.6 `NomenclatureTimeline`

Representar mudanças conceituais, sem inventar datas:

1. classificação bioquímica/histológica;
2. identificação molecular;
3. nomenclatura orientada por gene, subunidade e tecido.

Casos obrigatórios:

- Ic/Id reinterpretadas majoritariamente como Ib;
- reorganização das formas relacionadas à fosforilase-quinase;
- ambiguidade histórica de GSD XI e Fanconi–Bickel.

### 9.7 `OrganMatrix`

Implementar como recorte responsável dos órgãos explicitamente documentados, não como mapa universal.

Desktop: matriz legível ou pequenos múltiplos.  
Mobile: seleção por GSD ou órgão, nunca matriz esmagada.

Codificação deve distinguir:

- envolvimento explicitamente característico;
- envolvimento descrito como variável;
- dado não estabelecido na síntese.

Não usar um traço único para misturar `não característico` e `sem dados`.

### 9.8 Epidemiologia

Apresentar:

- incidência conjunta aproximada;
- estimativas específicas disponíveis para GSD I, Pompe, III, IV e VI/fosforilase-quinase;
- diferenças entre incidência, prevalência clínica e prevalência genética predita;
- exemplos de variantes fundadoras e populações, sem converter ancestralidade em critério diagnóstico.

Evitar ranking visual enganoso entre estimativas metodologicamente distintas.

### 9.9 `DiagnosticFlow`

Fluxo educativo:

```text
padrão clínico → exames bioquímicos → avaliação de órgãos
→ teste genético → dosagem enzimática quando indicada
→ biópsia em casos selecionados
```

Incluir sinais de alerta descritos na SoT e bloco separado sobre triagem neonatal de Pompe. Repetir que não é algoritmo diagnóstico individual.

### 9.10 Manejo e `TreatmentCoverage`

Organizar em três trilhas consecutivas:

- GSDs hepáticas;
- Pompe;
- GSDs musculares.

Apresentar objetivo, intervenções, monitoramento, limitações e tratamentos específicos documentados. Diferenciar:

- manejo preventivo/sintomático;
- terapia específica;
- transplante selecionado;
- terapia experimental.

Não produzir score de cobertura nem sugerir superioridade universal.

### 9.11 `TherapyHorizon`

Mostrar classes e princípios, não empresas:

- reposição enzimática;
- fármacos;
- terapia gênica;
- edição genômica.

Qualquer estágio deve carregar:

- `status reportado pela fonte`;
- ano da fonte;
- limitação de atualidade.

Não apresentar o panorama de 2024 como status contemporâneo verificado em 2026. Não pesquisar trials nesta iteração.

### 9.12 `ClinicalGapMap`

Fechamento executivo de alto contraste com cinco lacunas:

1. diagnóstico precoce e equitativo;
2. registros longitudinais;
3. desfechos centrados no paciente;
4. vigilância harmonizada;
5. terapias duráveis e multissistêmicas.

Conectar à futura página socioeconômica, ainda sem habilitar link se a rota não estiver implementada. Não recomendar empresas.

### 9.13 Limitações e referências

Seção editorial sem animações contendo:

- heterogeneidade;
- nomenclatura variável;
- epidemiologia incompleta;
- dependência temporal dos estágios terapêuticos;
- diferença entre evidência estabelecida e experimental;
- data de corte;
- bibliografia completa da SoT;
- aviso médico.

---

## 10. Identidade visual

Preservar tokens, fontes, grid e linguagem já aprovados.

Direção:

- abertura e fechamento de alto contraste;
- corpo analítico predominantemente claro;
- coluna editorial confortável;
- impacto visual concentrado em transições e sínteses;
- tabelas e evidências sem excesso de cards;
- teal para ciência e seleção;
- âmbar para evidência limitada ou oportunidade, sempre acompanhado por rótulo;
- coral apenas para risco/complicação real;
- verde apenas para tratamento estabelecido ou desfecho favorável documentado.

SVG e CSS são preferíveis a imagens raster. Não gerar ilustrações externas, fotografias ou ícones decorativos sem necessidade.

---

## 11. Responsividade, acessibilidade e progressive enhancement

Meta: WCAG 2.2 AA.

Obrigatório:

- funcionar a partir de 320 px;
- nenhum overflow horizontal da página;
- alvos de toque de pelo menos 44 × 44 px;
- foco visível;
- landmarks e headings coerentes;
- navegação por teclado;
- componentes interativos com nome e estado acessíveis;
- Escape e retorno de foco em overlays, se houver;
- nenhuma informação dependente apenas de cor, hover ou animação;
- `prefers-reduced-motion` respeitado;
- alternativa textual ou tabular para cada visualização;
- conteúdo científico essencial presente no HTML inicial;
- interações como aprimoramento, não requisito para leitura.

No mobile:

- `ResearchSectionNav` como controle compacto;
- pathway e diagnóstico verticais;
- timeline vertical;
- OrganMatrix transformada em seletor;
- GSDExplorer em fichas;
- trilhas de manejo consecutivas, não escondidas em abas.

---

## 12. Performance

- saída estática Astro;
- React somente em ilhas com interação justificável;
- evitar nova biblioteca de gráficos nesta iteração;
- SVG/CSS para diagramas;
- visualizações pesadas carregadas sob demanda;
- fontes locais já existentes;
- sem dependência de CDN;
- preservar funcionamento com `BASE_PATH=/` e `/painel-gsds/`;
- não degradar materialmente o orçamento de JavaScript da Home.

Registrar no report o JavaScript hidratado adicional e justificar cada ilha React nova.

---

## 13. Testes e critérios de aceite

### 13.1 Gates obrigatórios

Executar:

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build com BASE_PATH=/
npm run build com BASE_PATH=/painel-gsds/
npm run test:e2e
```

Não corrigir falha com exclusão ou enfraquecimento de teste.

### 13.2 Testes de conteúdo e dados

Cobrir:

- schemas clínicos;
- IDs e referências;
- classificação mínima;
- integridade dos localizadores;
- estados de evidência;
- qualificação temporal das terapias emergentes;
- ausência de inferências proibidas;
- link da Home para a página clínica;
- preservação das SoTs.

### 13.3 E2E

Cobrir ao menos:

- carregamento da rota com `BASE_PATH`;
- navegação Home → Bases clínicas;
- âncoras internas;
- teclado nos principais controles;
- filtros e comparação do GSDExplorer;
- alternativa mobile da OrganMatrix;
- ausência de overflow a 320 px;
- menu mobile;
- reduced motion;
- axe-core sem violações críticas/sérias;
- conteúdo essencial disponível com JavaScript desabilitado, quando tecnicamente viável no teste.

### 13.4 Screenshots

Gerar e revisar:

```text
clinical-375.png
clinical-768.png
clinical-1440.png
clinical-explorer-375.png
clinical-explorer-1440.png
clinical-mobile-menu-375.png
```

Verificar visualmente hierarquia, densidade, contraste, truncamentos e legibilidade das visualizações.

### 13.5 Aceite editorial

A página só está pronta se:

- um ADM entende a lógica clínica antes de chegar à classificação;
- um leitor técnico consegue localizar a base das alegações;
- hepáticas, musculares e multissistêmicas não aparecem como caixas absolutas;
- tipos e subtipos podem ser compreendidos e comparados;
- mudanças de nomenclatura estão explícitas;
- diagnóstico, manejo e inovação se conectam ao mecanismo;
- ausência de evidência não vira ausência clínica;
- terapias emergentes estão temporalmente qualificadas;
- limitações e aviso médico estão visíveis;
- nenhuma empresa ou recomendação comercial foi incluída.

---

## 14. Preservação de escopo e Git

Não executar sem autorização posterior:

- pesquisa externa;
- atualização científica das SoTs;
- página socioeconômica;
- página de startups;
- backend, CMS ou analytics;
- redesign da Home;
- commit;
- push;
- PR;
- merge;
- deploy.

Manter o trabalho não commitado ao final e aguardar revisão.

Não alterar o hub `index.html` da raiz nem os workflows, salvo se houver falha diretamente causada pela nova rota e a correção for mínima e reportada antes.

---

## 15. ADR e documentação

Criar `ADR-0004-bases-clinicas.md`, registrando:

- narrativa adotada;
- granularidade dos dados clínicos;
- tratamento da OrganMatrix como recorte não exaustivo;
- estratégia de progressive enhancement;
- ilhas React adicionadas;
- decisões de não inferência;
- qualificação temporal de terapias emergentes;
- divergências justificadas em relação à especificação anterior.

Atualizar README apenas se necessário para documentar nova rota ou comandos. Não duplicar o conteúdo científico em documentação técnica.

---

## 16. Report final obrigatório

Entregar no chat:

1. status geral;
2. narrativa implementada;
3. arquivos criados e alterados;
4. componentes e visualizações;
5. datasets, schemas, alegações e fontes;
6. decisões de não inferência e limitações;
7. acessibilidade e responsividade;
8. performance e JavaScript adicional;
9. testes e resultados;
10. screenshots e caminhos;
11. hashes das SoTs antes/depois;
12. estado do Git;
13. divergências da especificação;
14. pendências;
15. confirmação de que não houve pesquisa externa, commit, push, PR, merge ou deploy;
16. próximo passo sugerido, sem iniciá-lo.

Se qualquer gate falhar, não declarar a Iteração 3 concluída.
