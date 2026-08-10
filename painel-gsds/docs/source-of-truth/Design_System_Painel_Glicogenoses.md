# Design System — Painel de Glicogenoses

**Status:** versão 0.1  
**Escopo desta versão:** sistema visual global, conceito da Home e especificação detalhada da página de bases clínicas.  
**Conteúdos futuros:** impacto socioeconômico, mercado, startups e oportunidades serão projetados após a consolidação de suas respectivas evidências.

---

## 1. Princípio central

O painel deve operar em duas camadas de leitura complementares:

1. **Camada executiva:** visual, rápida, memorável e orientada a decisão;
2. **Camada de evidência:** sóbria, aprofundada, rastreável e confortável para leitura prolongada.

Essas camadas não devem parecer dois sites diferentes. Elas compartilham tipografia, paleta, espaçamento, iconografia e linguagem de interação; diferem apenas em intensidade, densidade e movimento.

### Camada executiva

- alto contraste;
- títulos curtos e de grande escala;
- poucas métricas decisivas;
- visualizações com uma mensagem principal;
- movimento discreto;
- chamadas para exploração;
- fontes visíveis, mas não dominantes.

### Camada de evidência

- fundo claro;
- largura de leitura controlada;
- hierarquia editorial;
- tabelas e gráficos analíticos;
- citações próximas às afirmações;
- notas metodológicas;
- movimento mínimo;
- navegação interna por seções.

### Regra de transição

Cada página analítica segue a progressão:

```text
Abertura visual → síntese executiva → dados essenciais → análise aprofundada → limitações → fontes
```

O usuário deve poder compreender a mensagem central em menos de dois minutos e, se desejar, verificar toda a fundamentação.

---

## 2. Arquitetura global

### Navegação principal

```text
Visão geral | Análises | Startups | Oportunidades | Metodologia
```

`Análises` e `Startups` funcionam como menus agrupadores. Nesta versão, somente `Visão geral` e `Análises → Bases clínicas` recebem especificação de conteúdo.

### Cabeçalho desktop

- logotipo/nome do projeto à esquerda;
- navegação central ou à direita;
- estado ativo indicado por contraste e pequeno marcador inferior;
- fundo translúcido apenas sobre o hero;
- fundo sólido após rolagem;
- altura compacta, sem ocupar a área de conteúdo.

### Cabeçalho mobile

- nome curto do projeto;
- botão de menu claramente rotulado;
- menu em painel de tela inteira;
- itens agrupados por área;
- acesso direto a “Metodologia e fontes”.

### Rodapé

- objetivo do projeto em uma frase;
- data da última atualização;
- autoria/equipe;
- metodologia;
- fontes;
- aviso de que o conteúdo é informativo e não substitui orientação médica;
- eventual identidade institucional somente após aprovação de uso de marca.

---

## 3. Fundamentos visuais

## 3.1 Paleta

| Token | Cor | Uso principal |
|---|---|---|
| `ink-950` | `#071B25` | Hero, cabeçalhos escuros e textos de alto contraste |
| `ink-800` | `#16313B` | Texto primário em fundos claros |
| `ink-600` | `#45616A` | Texto secundário |
| `paper-50` | `#F6F8F7` | Fundo editorial |
| `paper-100` | `#EDF2F0` | Seções alternadas e superfícies suaves |
| `teal-700` | `#0D6870` | Ciência, categoria principal e seleção |
| `teal-500` | `#1695A0` | Interação e séries de dados |
| `cyan-300` | `#78D9D6` | Realces sobre fundos escuros |
| `amber-500` | `#E9A63A` | Oportunidades e pontos de atenção |
| `coral-500` | `#D8675A` | Risco, complicação ou alerta |
| `green-500` | `#439B72` | Tratamento estabelecido ou desfecho favorável |
| `line-200` | `#D7E0DD` | Divisores, eixos e bordas discretas |

### Uso semântico

- Teal nunca significa simultaneamente “hepático” e “tratamento aprovado”.
- Coral é reservado para risco clínico, complicação ou evidência negativa.
- Âmbar significa oportunidade, atenção ou evidência incompleta, conforme legenda explícita.
- Nenhuma conclusão deve depender somente da cor.
- Grandes superfícies usam baixa saturação; cores intensas ficam em marcas, seleção e destaques.

### Modo escuro

Não é prioridade da primeira versão. A Home pode ter seções escuras, mas as páginas científicas permanecem claras para leitura e projeção. Um modo escuro integral só será considerado após validação da versão principal.

## 3.2 Tipografia

| Função | Família sugerida | Característica |
|---|---|---|
| Display e títulos | **Manrope** | Contemporânea, precisa e institucional |
| Corpo e interface | **Inter** | Legível em diferentes densidades |
| Dados numéricos | Inter com `tabular-nums` | Alinhamento consistente |

### Escala responsiva

- `display-xl`: `clamp(2.75rem, 7vw, 6.5rem)`;
- `display-lg`: `clamp(2.25rem, 5vw, 4.5rem)`;
- `heading-1`: `clamp(2rem, 4vw, 3.5rem)`;
- `heading-2`: `clamp(1.5rem, 3vw, 2.5rem)`;
- `heading-3`: `1.25–1.5rem`;
- corpo principal: `1rem–1.125rem`;
- texto editorial: `1.0625–1.1875rem`;
- anotação: nunca inferior a `0.75rem`/12 px.

### Regras

- Títulos executivos podem ocupar até duas linhas.
- Parágrafos científicos usam aproximadamente 65–75 caracteres por linha.
- Caixa alta é restrita a rótulos curtos.
- Texto corrido não usa peso superior a 500.
- Genes são grafados em itálico; proteínas e enzimas seguem convenção científica da fonte.

## 3.3 Grid e espaçamento

- Grid desktop: 12 colunas;
- Tablet: 8 colunas;
- Mobile: 4 colunas;
- Conteúdo máximo: 1280 px;
- Coluna de leitura: 720–780 px;
- Visualizações amplas: até 1180 px;
- Margem mobile: 20 px;
- Ritmo de espaçamento: múltiplos de 4 px;
- Seções executivas: 96–144 px vertical no desktop;
- Seções científicas: 72–112 px vertical no desktop;
- Mobile: 56–80 px entre seções.

## 3.4 Superfícies

- Cantos moderados: 12–18 px;
- Cards não devem envolver todo bloco de conteúdo;
- Bordas finas e pouco contrastadas;
- Sombras pequenas, usadas apenas para elevação funcional;
- Gráficos e tabelas preferencialmente sem caixas externas;
- Evitar “card soup”: repetição indiscriminada de retângulos arredondados.

## 3.5 Iconografia

- Ícones lineares com espessura consistente;
- Ícones de órgãos com anatomia simplificada, sem aparência infantil;
- Ícones nunca substituem rótulos;
- Não usar emojis;
- Ilustrações biomédicas devem ser autorais, licenciadas ou construídas como diagramas, nunca copiadas sem rastreabilidade.

## 3.6 Movimento

- Entrada suave por opacidade e deslocamento curto;
- Transições de filtros entre 180–260 ms;
- Animações explicativas somente quando revelam sequência ou causalidade;
- Nada importante depende de animação;
- Suporte obrigatório a `prefers-reduced-motion`;
- Gráficos não devem reiniciar animações a cada pequena rolagem.

---

## 4. Componentes compartilhados

## 4.1 Componentes executivos

### `HeroStatement`

- título de uma ou duas linhas;
- subtítulo com no máximo 180 caracteres;
- até duas ações principais;
- visualização ou arte abstrata com função narrativa;
- data da última atualização quando relevante.

### `KeyMetric`

- número ou proporção;
- unidade explícita;
- frase contextual;
- fonte acessível imediatamente;
- estado de incerteza quando o valor for estimado.

### `ExecutiveFinding`

- conclusão em uma frase;
- evidência resumida;
- link “Explorar evidências”;
- não mais de três achados em uma mesma linha.

### `SectionPortal`

- porta de entrada para uma análise;
- título, pergunta respondida e visual de apoio;
- funciona como navegação, não como card decorativo.

## 4.2 Componentes científicos

### `ResearchHeader`

- título da análise;
- escopo;
- data de corte;
- quantidade e tipo de fontes;
- resumo em três pontos;
- botão para metodologia e referências.

### `EvidenceCallout`

Variações semânticas:

- `consenso`;
- `evidência limitada`;
- `nomenclatura histórica`;
- `implicação clínica`;
- `atenção metodológica`.

### `SourceAnchor`

- autor e ano;
- tipo de fonte;
- link direto;
- opcionalmente, página ou tabela;
- tooltip ou expansão com referência completa.

### `ResearchSectionNav`

- índice lateral fixo apenas no desktop amplo;
- barra compacta abaixo do cabeçalho em tablet;
- seletor de seção no mobile;
- indica progresso de leitura sem dominar a página.

### `ComparisonTable`

- primeira coluna fixada no desktop;
- linhas alternadas muito sutis;
- cabeçalhos claros;
- abreviações explicadas;
- no mobile, converte-se em comparação por seleção ou cards, não em tabela ilegível.

### `EvidenceFooter`

- limitações;
- fontes da seção;
- data da última revisão;
- responsável pela revisão do conteúdo.

---

## 5. Visualizações: padrões gerais

Cada visualização deve responder a uma pergunta explícita. A pergunta aparece antes do gráfico; a conclusão principal aparece depois, sem duplicar todos os valores.

### Elementos obrigatórios

- título descritivo;
- pergunta analítica;
- unidade;
- legenda integrada;
- fonte;
- data;
- nota metodológica quando necessário;
- alternativa textual acessível;
- estado de ausência de dados.

### Interação

- Hover nunca é a única forma de obter informação;
- seleção por clique, toque e teclado;
- tooltips curtos;
- filtros preservam contexto;
- ação de reset visível quando há múltiplos filtros;
- URL pode refletir filtros relevantes para compartilhamento.

### Mobile

Uma visualização desktop não será simplesmente reduzida. Cada tipo possui uma versão responsiva:

| Desktop | Mobile |
|---|---|
| Matriz completa | Seleção de linhas/colunas ou pequenos múltiplos |
| Timeline horizontal | Timeline vertical |
| Painel lateral | Ficha inferior expansível |
| Tabela ampla | Cards comparáveis ou colunas selecionadas |
| Tooltip por hover | Detalhe por toque |
| Navegação lateral | Seletor superior compacto |

---

## 6. Home — conceito preliminar

Esta seção permanece propositalmente breve até que todas as análises estejam prontas.

## 6.1 Função

A Home oferece um entendimento executivo do problema e direciona para as análises. Ela não deve tentar condensar toda a literatura nem apresentar conclusões mercadológicas ainda não validadas.

## 6.2 Estrutura provisória

1. **Hero:** título, propósito e visual abstrato inspirado na ramificação do glicogênio;
2. **O problema em um minuto:** definição curta e três mensagens fundamentais;
3. **Duas perspectivas:** paciente/rede de apoio e ecossistema de soluções;
4. **Portais das análises:** bases clínicas, impacto socioeconômico e mercado;
5. **Portais do scouting:** soluções diretamente relacionadas e tecnologias aplicáveis;
6. **Oportunidades:** área reservada para síntese estratégica futura;
7. **Metodologia e fontes:** convite à verificação.

## 6.3 Tom

- mais visual que textual;
- linguagem executiva;
- nenhuma métrica sem fonte;
- no máximo uma visualização dominante por viewport;
- chamadas claras para aprofundamento;
- não antecipar conclusões ainda não sustentadas.

---

# 7. Página detalhada — Bases clínicas e médicas

## 7.1 Objetivo

Permitir que um leitor não especialista compreenda:

1. o que são as GSDs;
2. por que não constituem uma única doença;
3. como o tecido e a etapa metabólica afetados determinam o fenótipo;
4. quais são os principais tipos;
5. como se manifestam, são diagnosticadas e tratadas;
6. por que ainda existem necessidades médicas não atendidas.

A página deve funcionar simultaneamente como introdução para ADMs e como documento técnico consultável.

## 7.2 Rota e metadados

- Rota sugerida: `/analises/bases-clinicas/`;
- Título: `Bases clínicas das glicogenoses`;
- Descrição: `Mecanismos, classificação, manifestações, diagnóstico, manejo e terapias emergentes nas doenças de armazenamento do glicogênio.`;
- Data de corte visível;
- Autores e revisores do conteúdo;
- Referências completas no final.

## 7.3 Progressão narrativa

```text
Uma família de doenças
→ o papel do glicogênio
→ três grandes padrões clínicos
→ tipos e subtipos
→ manifestações por órgão
→ reconhecimento e diagnóstico
→ manejo atual
→ terapias emergentes
→ lacunas clínicas
```

Essa sequência evita começar por uma tabela taxonômica incompreensível.

---

## 7.4 Seção 1 — Abertura clínica

### Pergunta respondida

**O que são as glicogenoses e por que elas importam?**

### Conteúdo

Título sugerido:

> **Uma mesma reserva energética. Mais de vinte formas de falhar.**

Síntese:

> As glicogenoses são doenças metabólicas hereditárias causadas por defeitos na síntese, degradação ou utilização do glicogênio. O efeito depende da etapa metabólica e dos tecidos envolvidos, produzindo desde hipoglicemia de jejum até doença hepática, muscular, cardíaca, renal ou neurológica.

Três mensagens executivas:

- Glicogenose não é um diagnóstico final;
- Os fenótipos formam um contínuo da vida fetal à adulta;
- Diagnóstico e tratamento precoces podem modificar a história natural.

### Design

- fundo `ink-950`;
- título em `paper-50`;
- realces em `cyan-300`;
- diagrama de ramificações à direita no desktop e abaixo no mobile;
- três mensagens surgem como anotações conectadas, não como cards isolados;
- ação principal: `Explorar o mecanismo`;
- ação secundária: `Comparar os tipos`.

### Movimento

As ramificações são reveladas gradualmente durante a entrada. O movimento cessa após a composição ser formada.

---

## 7.5 Seção 2 — O papel do glicogênio

### Pergunta respondida

**Onde os defeitos das GSDs interrompem o metabolismo?**

### Visualização principal: `GlycogenPathway`

Diagrama simplificado com:

- glicose;
- glicose-6-fosfato;
- glicose-1-fosfato;
- UDP-glicose;
- síntese do glicogênio;
- ramificação;
- glicogenólise;
- desramificação;
- glicólise;
- compartimento lisossômico;
- exportação hepática de glicose.

Cada etapa pode ser selecionada para revelar:

- enzima ou transportador;
- GSD associada;
- tecidos principais;
- consequência metabólica resumida.

### Limites do diagrama

- não reproduzir todas as reações bioquímicas;
- não sugerir causalidade linear quando houver múltiplas vias;
- manter legenda “representação simplificada”;
- disponibilizar descrição textual equivalente.

### Desktop

- diagrama central amplo;
- painel de detalhe discreto à direita após seleção;
- cores por processo, não por GSD individual.

### Mobile

- caminho vertical;
- nós selecionáveis;
- detalhe aparece abaixo do nó;
- sem zoom ou arraste obrigatório.

### Tom

Esta é a última seção mais ilustrativa antes da transição para o corpo científico.

---

## 7.6 Seção 3 — Três padrões clínicos

### Pergunta respondida

**Por que pacientes com GSD podem apresentar quadros tão diferentes?**

### Visualização: `ClinicalSpectrum`

Um espectro contínuo, não três caixas rígidas:

```text
Predominantemente hepáticas ↔ multissistêmicas ↔ predominantemente musculares
```

Exemplos posicionados ao longo do espectro:

- Hepáticas: GSD 0a, I, IIIb, VI, IX hepática;
- Multissistêmicas: Pompe, IIIa, IV, Fanconi–Bickel;
- Musculares: GSD 0b, V, VII, IX muscular, X, XII, XIII.

### Detalhe associado

Ao selecionar uma região:

- padrão fisiopatológico;
- sinais típicos;
- principais órgãos;
- exemplos de GSDs;
- alertas de sobreposição.

### Nota científica

O texto explicará que a divisão é clínica e didática, não absoluta.

---

## 7.7 Seção 4 — Classificação essencial

### Pergunta respondida

**Quais são os principais tipos e como eles se diferenciam?**

### Componente principal: `GSDExplorer`

O explorador usa os campos:

- condição;
- gene;
- enzima ou transportador;
- herança;
- predomínio clínico;
- órgãos;
- manifestações distintivas;
- tratamento específico disponível;
- nível de aprofundamento.

### Vista padrão

Matriz compacta com uma linha por condição e colunas essenciais:

| GSD | Gene/proteína | Predomínio | Elemento distintivo |
|---|---|---|---|

### Interação

- filtro por predomínio clínico;
- filtro por órgão;
- seleção de até três GSDs para comparação;
- expansão de uma linha para detalhes;
- compartilhamento da comparação por URL.

### Mobile

- lista filtrável;
- cada GSD abre uma ficha;
- comparação limitada a duas condições por vez;
- campos alinhados verticalmente.

### Conteúdo inicial

Devem constar, no mínimo:

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

### Tratamento da incerteza

- “rara” não é exibido como frequência exata;
- nomenclaturas controversas recebem marcador explicativo;
- ausência de dado não é representada como zero.

---

## 7.8 Seção 5 — Evolução da nomenclatura

### Pergunta respondida

**Por que diferentes fontes usam nomes e números distintos?**

### Visualização: `NomenclatureTimeline`

Timeline curta com três transformações centrais:

1. classificação bioquímica/histológica;
2. identificação molecular de genes e proteínas;
3. nomenclatura contemporânea orientada por gene, subunidade e tecido.

Casos destacados:

- GSD Ic e Id reinterpretadas majoritariamente dentro de GSD Ib;
- reorganização das antigas GSD VIa, VIII, IX e X relacionadas à fosforilase-quinase;
- uso ambíguo de GSD XI para deficiência de LDHA e Fanconi–Bickel.

### Design

- fundo `paper-100`;
- estilo editorial;
- datas apenas quando sustentadas pelas fontes;
- foco em mudança conceitual, não em uma cronologia enciclopédica.

### Mobile

Timeline vertical com conexões simples.

---

## 7.9 Seção 6 — Manifestações por órgão

### Pergunta respondida

**Quais sistemas podem ser afetados em cada GSD?**

### Visualização principal: `OrganMatrix`

Linhas:

- GSDs;

Colunas:

- fígado;
- músculo esquelético;
- coração;
- rins;
- sistema nervoso;
- intestino/hematológico;
- sistema respiratório;
- ossos/crescimento.

### Codificação

- círculo preenchido: envolvimento característico;
- círculo parcial: envolvimento variável;
- traço: não característico ou sem evidência suficiente;
- cor indica natureza do envolvimento somente se houver legenda inequívoca.

### Interação

- selecionar órgão para destacar GSDs relacionadas;
- selecionar GSD para acompanhar o padrão transversal;
- tooltip com manifestação resumida;
- link para a ficha correspondente.

### Mobile

- usuário escolhe um órgão e recebe a lista de GSDs;
- alternativamente escolhe uma GSD e vê os órgãos;
- a matriz inteira não é comprimida em tela estreita.

### Conteúdo editorial associado

Três blocos curtos explicam:

- padrão hepático;
- padrão muscular;
- sobreposição multissistêmica.

---

## 7.10 Seção 7 — Reconhecimento e diagnóstico

### Pergunta respondida

**Como uma suspeita clínica se transforma em diagnóstico molecular?**

### Visualização: `DiagnosticFlow`

Fluxo principal:

```text
Padrão clínico
→ exames bioquímicos
→ avaliação de órgãos
→ teste genético
→ dosagem enzimática quando indicada
→ biópsia em casos selecionados
```

Entradas clínicas:

- hipoglicemia de jejum e hepatomegalia;
- lactato, lipídios ou ácido úrico elevados;
- hipertransaminasemia;
- intolerância ao exercício;
- cãibras, fraqueza, CK elevada ou rabdomiólise;
- cardiomiopatia ou insuficiência respiratória neuromuscular;
- envolvimento multissistêmico.

### Princípio de design

O fluxo não deve funcionar como ferramenta diagnóstica individual nem fornecer recomendações clínicas personalizadas. Deve explicar a lógica geral da investigação.

### Destaque executivo

> O diagnóstico contemporâneo migrou de uma dependência de biópsias para uma abordagem predominantemente molecular.

### Triagem neonatal

Pompe aparece como estudo de caso em bloco separado, com nota sobre variação geográfica de implementação.

### Mobile

Etapas verticais com detalhes expansíveis.

---

## 7.11 Seção 8 — Manejo atual

### Pergunta respondida

**O que já é possível tratar e quais limitações permanecem?**

### Estrutura

Três trilhas paralelas no desktop:

1. GSDs hepáticas;
2. Doença de Pompe;
3. GSDs musculares.

Cada trilha mostra:

- objetivo do manejo;
- intervenções principais;
- monitoramento;
- complicações não totalmente prevenidas;
- tratamentos específicos;
- limitações.

### Conteúdo

#### GSDs hepáticas

- prevenção de jejum;
- refeições programadas;
- amido de milho cru quando indicado;
- ajustes de composição dietética;
- plano de emergência;
- vigilância renal, óssea e hepática;
- transplante em situações selecionadas;
- empagliflozina na GSD Ib como terapia específica para manifestações hematológicas e intestinais.

#### Pompe

- reposição enzimática;
- alglucosidase alfa;
- avalglucosidase alfa;
- início precoce;
- monitoramento cardíaco, respiratório e motor;
- limitações de distribuição muscular, infusões recorrentes e imunogenicidade.

#### GSDs musculares

- prevenção de rabdomiólise;
- exercício individualizado;
- condicionamento aeróbico gradual;
- estratégias nutricionais específicas;
- *second wind* na GSD V;
- risco de extrapolar estratégias da GSD V para a GSD VII.

### Visualização complementar: `TreatmentCoverage`

Mapa conceitual que diferencia:

- manejo sintomático/preventivo;
- terapia específica aprovada;
- transplante;
- terapia experimental.

Não usar escala ordinal que sugira que uma modalidade é universalmente “melhor”.

### Mobile

Trilhas apresentadas como seções consecutivas, não abas ocultas.

---

## 7.12 Seção 9 — Terapias emergentes

### Pergunta respondida

**Quais abordagens tentam modificar a doença de forma mais duradoura?**

### Visualização: `TherapyHorizon`

Eixos:

- modalidade: reposição enzimática, fármacos, RNA, terapia gênica, edição genômica;
- estágio: pesquisa, pré-clínico, clínico, aprovado.

Nesta página clínica, a visualização mostra classes e princípios, não um pipeline empresarial completo. O detalhamento de empresas ficará em páginas futuras.

### Conteúdo

- vetores AAV como plataforma avançada;
- GSD Ia e Pompe como casos clínicos mais avançados reportados pelas fontes de 2024;
- potencial de correção estável por edição genômica;
- desafios de distribuição multissistêmica;
- perda de expressão;
- respostas imunes;
- necessidade de doses elevadas;
- toxicidade;
- redosagem;
- risco de integração e alterações fora do alvo.

### Estado temporal

Todo estágio clínico deve exibir:

- “status reportado pela fonte”;
- data da verificação;
- link para registro atualizado quando houver.

Isso evita transformar um panorama de 2024 em afirmação contemporânea permanente.

---

## 7.13 Seção 10 — Lacunas clínicas

### Pergunta respondida

**Por que ainda existe uma necessidade relevante de inovação?**

### Visualização: `ClinicalGapMap`

Cinco lacunas iniciais:

1. diagnóstico precoce e equitativo;
2. registros longitudinais;
3. desfechos centrados no paciente;
4. vigilância harmonizada de complicações;
5. terapias duráveis e multissistêmicas.

Cada lacuna contém:

- problema;
- consequência;
- estado atual;
- evidência;
- relação com as próximas análises.

### Design

- retorno controlado à linguagem executiva;
- fundo escuro ou teal profundo;
- âmbar para oportunidades;
- nenhuma recomendação empresarial nesta fase;
- ação: `Ver impacto sobre pacientes e cuidadores`, habilitada quando a página socioeconômica estiver pronta.

---

## 7.14 Seção 11 — Limitações e referências

### Conteúdo

- heterogeneidade das GSDs;
- diferenças de nomenclatura;
- dados epidemiológicos incompletos;
- status terapêuticos dependentes da data;
- distinção entre evidência estabelecida e abordagem experimental;
- referências utilizadas;
- data de corte;
- declaração de que a página não substitui avaliação médica.

### Design

- inteiramente editorial;
- sem animações;
- referências agrupadas por tema;
- links diretos;
- opção de copiar referência;
- opção de abrir o resumo executivo completo em Markdown/PDF quando disponível.

---

## 8. Navegação interna da página médica

### Desktop

Índice lateral:

```text
Visão geral
Metabolismo
Padrões clínicos
Tipos e subtipos
Nomenclatura
Órgãos afetados
Diagnóstico
Manejo
Terapias emergentes
Lacunas
Referências
```

### Mobile

- botão “Nesta análise” abaixo do cabeçalho;
- abre seletor de seções;
- título da seção atual permanece visível de forma compacta;
- sem barra lateral fixa.

### URLs âncora

Cada seção deve possuir âncora estável para compartilhamento e referência no relatório.

---

## 9. Responsividade da página médica

### Breakpoints orientativos

- `320–479 px`: mobile estreito;
- `480–767 px`: mobile amplo;
- `768–1023 px`: tablet;
- `1024–1439 px`: desktop;
- `1440 px+`: desktop amplo.

### Regras prioritárias

- nenhum texto essencial abaixo de 12 px;
- alvos de toque de pelo menos 44 × 44 px;
- sem rolagem horizontal da página;
- tabelas largas usam transformação responsiva;
- visualizações mantêm rótulos legíveis;
- filtros avançados abrem em painel;
- conteúdo textual aparece antes de visualizações pesadas em conexões lentas;
- diagramas possuem alternativa textual.

---

## 10. Acessibilidade

- WCAG 2.2 AA como meta mínima;
- navegação integral por teclado;
- foco visível;
- landmarks semânticos;
- hierarquia correta de cabeçalhos;
- contraste mínimo adequado;
- cores acompanhadas por forma, rótulo ou padrão;
- gráficos com tabela ou resumo textual equivalente;
- suporte a leitores de tela;
- respeito à redução de movimento;
- linguagem técnica acompanhada por glossário;
- termos em inglês identificados e explicados.

---

## 11. Estrutura de conteúdo e dados

O conteúdo não deve ficar acoplado aos componentes visuais.

Estrutura inicial sugerida:

```text
/content
  /clinical
    overview.md
    metabolism.md
    diagnosis.md
    management.md
    emerging-therapies.md
    limitations.md

/data
  gsd-types.json
  organ-involvement.json
  metabolic-pathway.json
  nomenclature-events.json
  treatment-modalities.json
  clinical-sources.json
```

### Campos mínimos de uma GSD

```text
id
preferred_name
alternative_names
gene
protein_or_enzyme
inheritance
clinical_pattern
organs
distinctive_features
diagnosis
current_management
specific_therapies
experimental_therapies
nomenclature_notes
sources
last_reviewed_at
```

### Proveniência

Cada afirmação estruturada deve apontar para uma ou mais fontes. Alterações em conteúdo clínico precisam atualizar a data de revisão.

---

## 12. Desempenho e implementação

- arquitetura estática compatível com GitHub Pages;
- caminhos relativos e `base path` configurável;
- carregamento progressivo de visualizações;
- JavaScript somente onde acrescenta interação real;
- SVG para diagramas e gráficos vetoriais;
- fontes preferencialmente locais ou com fallback robusto;
- imagens responsivas;
- orçamento inicial de desempenho para a Home e a página médica;
- conteúdo principal disponível mesmo se scripts falharem;
- suporte a compartilhamento por URL e âncoras;
- metadados sociais e de busca por página.

---

## 13. Critérios de aceite da página médica

A página será considerada pronta quando:

- um ADM compreender o problema sem abrir as seções profundas;
- um leitor técnico conseguir verificar as afirmações;
- a distinção entre GSDs hepáticas, musculares e multissistêmicas estiver clara;
- tipos e subtipos puderem ser comparados;
- mudanças de nomenclatura estiverem explicadas;
- diagnóstico, manejo e terapias emergentes estiverem conectados ao mecanismo;
- limitações e data de corte estiverem visíveis;
- todas as visualizações tiverem alternativa textual;
- a experiência funcionar entre 320 px e desktop amplo;
- nenhuma métrica ou estágio terapêutico aparecer sem fonte e data;
- o design mantiver equilíbrio entre impacto executivo e seriedade científica.

---

## 14. Páginas futuras — reserva de arquitetura

As seguintes áreas permanecem apenas reservadas:

- impacto socioeconômico;
- mercado e inovação;
- startups diretamente relacionadas às GSDs — global;
- startups diretamente relacionadas às GSDs — Brasil;
- tecnologias aplicáveis às GSDs — global;
- tecnologias aplicáveis às GSDs — Brasil;
- oportunidades para Einstein/Eretz;
- metodologia consolidada.

O design detalhado dessas páginas será definido a partir de seus conteúdos reais, tipos de evidência, métricas disponíveis e limitações. Não serão aplicados gráficos ou layouts antes de determinar quais relações os dados permitem comunicar.

---

## 15. Processo de atualização deste documento

Quando a análise socioeconômica e mercadológica estiver disponível:

1. inventariar conclusões, métricas, tabelas e limitações;
2. separar conteúdo executivo de evidência detalhada;
3. identificar as perguntas que cada visualização deve responder;
4. definir visualizações somente para relações sustentadas pelos dados;
5. adicionar os sistemas das páginas socioeconômica e mercadológica;
6. revisar a Home para refletir os achados consolidados;
7. preservar tokens, componentes e princípios já definidos;
8. atualizar versão e registro de decisões.

---

## 16. Registro inicial de decisões

| Decisão | Justificativa |
|---|---|
| Duas camadas de leitura | Atender ADMs e preservar rigor científico |
| Home pouco teórica | Priorizar entendimento rápido e navegação |
| Página médica editorial e interativa | Traduzir complexidade sem diluir evidência |
| Fundo claro nas análises | Melhor leitura prolongada e projeção |
| Hero e lacunas com alto contraste | Criar pontos memoráveis de entrada e saída |
| Visualizações orientadas por perguntas | Evitar decoração e falsa precisão |
| Conteúdo desacoplado da interface | Facilitar atualização e reutilização |
| Mobile com transformação de visualizações | Garantir uso real, não apenas redução do desktop |
| Páginas futuras ainda não detalhadas | Alinhar o design ao conteúdo antes de implementar |
