# GSD Dashboard — 6D.0

# Especificação Visual Institucional para Rebranding

**Status:** DRAFT FOR AUDIT  
**Iteração:** 6D.0 — Brand extraction / specification  
**Escopo:** especificação; nenhuma alteração de produção  
**Base documental:** Guia de Marca Einstein — versão interna, abril/2026; lockup Eretz.bio × Einstein fornecido para o projeto; orientação operacional recebida sobre Flaticon.

---

## 1. Objetivo

Traduzir as diretrizes institucionais disponíveis em regras operacionais para o rebranding do GSD Dashboard, antes de qualquer alteração de UI.

A 6D deve ser tratada como:

> **rebrand institucional sobre produto funcional existente**, não como redesign funcional.

Dados, conteúdo aprovado, arquitetura informacional, agregações, busca, filtros, drawers e comportamento funcional permanecem congelados durante o rebranding, salvo correção formalmente aberta fora desta iteração.

---

## 2. Método e níveis de autoridade

Toda regra deste documento pertence a uma das três classes abaixo.

### `MANDATORY_BRAND`

Regra explicitamente sustentada pelo Guia de Marca Einstein ou por asset institucional fornecido. Deve ser obedecida na implementação.

### `DASHBOARD_DECISION`

Decisão de design do GSD Dashboard criada para operacionalizar espaços que o guia não especifica. Não deve ser apresentada como regra institucional Einstein.

### `PENDING_VALIDATION`

Ponto para o qual o material disponível não fornece autoridade suficiente. Não inventar regra; preservar como pendência até confirmação documental/humana.

### Regra de precedência

Em caso de conflito:

```text
Guia de Marca / asset institucional oficial
> especificação 6D
> implementação atual do Dashboard
```

Quando duas diretrizes do guia tiverem escopos diferentes, deve prevalecer a regra mais específica para o meio em questão.

---

# 3. Princípio de identidade

## 3.1 Papel das marcas

### `MANDATORY_BRAND`

O Einstein possui arquitetura de marca formal e proíbe a criação arbitrária de novos logotipos, reconstruções e composições não autorizadas.

Consequências para o Dashboard:

- não criar um novo “logo do GSD Dashboard”;
- não combinar manualmente estrela Einstein + nome do projeto;
- não reconstruir o logotipo Einstein em HTML/CSS/SVG;
- não alterar cores, proporções, orientação ou tipografia do logo;
- não destacar partes isoladas da marca fora dos usos previstos;
- utilizar arquivos oficiais como assets atômicos.

## 3.2 Lockup Eretz.bio × Einstein

### `PENDING_VALIDATION`

Foi fornecido ao projeto um lockup visual contendo:

```text
eretz.bio | EINSTEIN Hospital Israelita
```

Para a 6D, ele deve ser tratado como **asset fornecido**, não como composição a ser reconstruída.

Até haver confirmação de sua origem/aprovação pelo Núcleo de Marca:

- não inferir que o guia Einstein autoriza genericamente essa composição;
- não separar seus elementos;
- não recriar o divisor;
- não ajustar proporções internamente;
- não recolorir;
- não gerar versões alternativas.

### `DASHBOARD_DECISION`

Se o lockup for validado como asset autorizado, ele será a assinatura de co-branding preferencial do Dashboard em header/footer ou outra superfície institucional definida na 6D.3.

---

# 4. Tipografia

## 4.1 Regra institucional geral

### `MANDATORY_BRAND`

A família institucional do Einstein é **Montserrat**.

Pesos apresentados pelo guia:

```text
Light
Regular
Medium
Bold
```

A orientação institucional incentiva combinação coerente de pesos, hierarquia clara e uso de Light/Regular para contribuir para sensação de leveza e limpeza.

Arial é a alternativa indicada pelo guia quando Montserrat não estiver disponível em comunicação institucional geral.

## 4.2 Interfaces digitais

### `MANDATORY_BRAND`

O Guia de Marca contém uma regra mais específica para canais digitais:

```text
Work Sans
→ títulos e cabeçalhos de website e aplicativos

Inter
→ corpo de texto e elementos de interface
```

Portanto, para o GSD Dashboard, por ser uma interface web:

```text
DISPLAY / H1–H6 / page headings      Work Sans
BODY / labels / inputs / controls    Inter
TABLES / charts / filters / UI       Inter
```

Montserrat **não deve substituir automaticamente Work Sans + Inter na UI** apenas por ser a família institucional geral.

## 4.3 Política de fallback

### `DASHBOARD_DECISION`

Implementar stacks robustos:

```css
--font-heading: 'Work Sans', 'Montserrat', Arial, sans-serif;
--font-interface: 'Inter', 'Montserrat', Arial, sans-serif;
--font-institutional: 'Montserrat', Arial, sans-serif;
```

Não utilizar mais de uma família na mesma função sem fallback técnico.

## 4.4 Restrições

### `MANDATORY_BRAND`

Evitar:

- mais de dois pesos na mesma frase;
- mais de duas cores na mesma frase;
- gradiente aplicado a texto Light;
- elementos decorativos sobrepostos ao texto;
- perda de hierarquia entre heading e corpo.

---

# 5. Paleta cromática

## 5.1 Cores Einstein para digital

### `MANDATORY_BRAND`

| Token semântico 6D  | Nome no guia |         RGB | HEX       |
| ------------------- | ------------ | ----------: | --------- |
| `brand-blue-dark`   | Azul-escuro  |  0, 83, 154 | `#00539A` |
| `brand-blue-medium` | Azul-médio   | 0, 150, 210 | `#0096D2` |
| `brand-blue-light`  | Azul-claro   | 0, 219, 255 | `#00DBFF` |

O guia estabelece os tons de azul como cores preferenciais e indica que devem permear a comunicação.

Referência de participação visual apresentada no guia:

```text
Azul-escuro   60%
Azul-médio    25%
Azul-claro    15%
```

Essa proporção é referência de identidade, não obrigação matemática por viewport.

## 5.2 Escala neutra

### `MANDATORY_BRAND`

| Token 6D      | HEX       |
| ------------- | --------- |
| `neutral-900` | `#212121` |
| `neutral-700` | `#545454` |
| `neutral-500` | `#ABABAB` |
| `neutral-400` | `#BABABA` |
| `neutral-300` | `#D4D4D4` |
| `neutral-100` | `#EDEDED` |
| `neutral-50`  | `#F2F2F2` |
| `white`       | `#FFFFFF` |

## 5.3 Uso semântico proposto

### `DASHBOARD_DECISION`

A implementação deverá mapear a paleta institucional para **tokens semânticos**, evitando hardcodes por componente.

Baseline proposto:

```text
--color-brand-primary       #00539A
--color-brand-secondary     #0096D2
--color-brand-accent        #00DBFF

--color-text-primary        #212121
--color-text-secondary      #545454
--color-border              #D4D4D4
--color-surface-subtle      #F2F2F2
--color-surface             #FFFFFF
```

Estados funcionais como `success`, `warning`, `danger`, `focus`, `selected` e categorias dos gráficos **não devem ser inventados a partir da paleta Einstein nesta etapa**.

Devem ser definidos posteriormente com:

- necessidade semântica;
- contraste;
- consistência;
- não dependência exclusiva de cor.

## 5.4 Gradiente

### `MANDATORY_BRAND`

O Einstein possui gradiente oficial construído a partir dos três azuis institucionais e orientação definida pelo guia.

### `PENDING_VALIDATION`

A extração textual disponível do guia não é suficiente para converter com segurança o diagrama institucional em uma fórmula CSS exata de `linear-gradient()` sem interpretação.

Portanto:

- não inventar stops;
- não aproximar visualmente como se fosse regra oficial;
- obter asset/original eletrônico ou parametrização inequívoca antes da implementação exata.

### `DASHBOARD_DECISION`

Quando validado, reservar o gradiente para superfícies institucionais/de destaque, como:

- hero;
- faixa institucional;
- pequenos accents.

Evitar seu uso indiscriminado em:

- cards de dados;
- tabelas;
- campos;
- grandes áreas analíticas;
- texto.

---

# 6. Marca Einstein — aplicação na interface

## 6.1 Assets

### `MANDATORY_BRAND`

Sempre utilizar arquivos oficiais.

Proibido:

- redesenhar o logo;
- alterar a tipografia;
- alterar proporções;
- rotacionar;
- distorcer;
- trocar cores;
- adicionar outline ou efeitos;
- sobrepor elementos;
- agregar títulos/descritivos diretamente ao símbolo;
- criar novo logotipo para projeto/área.

## 6.2 Fundos

### `MANDATORY_BRAND`

Preferir a versão colorida sobre fundo branco/claro quando possível.

Usar versões negativas/monocromáticas somente conforme os arquivos e contextos autorizados.

Contraste deve ser preservado.

## 6.3 Área de reserva da marca-mãe

### `MANDATORY_BRAND`

A área livre da marca-mãe corresponde a:

```text
2 × altura da letra “E” de EINSTEIN
```

Nenhum texto, imagem ou elemento gráfico deve invadir essa área.

## 6.4 Redução em ambiente digital

### `MANDATORY_BRAND`

O guia define mínimos de redução digital para as versões oficiais da marca.

Referências apresentadas:

```text
marca vertical:   60 px
marca horizontal: 23 px
```

A unidade é determinada pela largura conforme a versão especificada no guia.

### `PENDING_VALIDATION`

Esses mínimos pertencem às assinaturas Einstein oficiais, não necessariamente ao lockup Eretz.bio × Einstein fornecido. O lockup combinado precisa de regra própria/autorizada de redução e área de reserva antes de ser tratado como equivalente.

---

# 7. Símbolo Einstein

### `MANDATORY_BRAND`

A estrela/símbolo pode aparecer isoladamente somente nos usos autorizados pelo sistema de marca.

O guia permite símbolo isolado em determinados contextos digitais como avatars/ícones oficiais, mas determina que a peça contenha a marca completa em algum local quando aplicável.

No Dashboard:

- não usar a estrela como bullet;
- não usar como textura;
- não usar como pattern;
- não usar como ícone funcional genérico;
- não rotacionar;
- não modificar;
- não recolorir fora das versões oficiais;
- não anexar o nome “GSD Dashboard” ao símbolo.

---

# 8. Iconografia

## 8.1 Fonte operacional

### `DASHBOARD_DECISION`

Foi informado que o ecossistema utiliza frequentemente **Flaticon**.

Isso autoriza Flaticon como **fonte candidata de assets**, mas não significa que qualquer ícone da plataforma seja institucionalmente aprovado.

## 8.2 Sistema

Antes de baixar ícones, definir uma linguagem única:

```text
estilo          outline ou equivalente consistente
stroke          consistente entre famílias
corner style    consistente
optical size    consistente
canvas          normalizado
```

Evitar misturar:

- filled + outline;
- strokes de larguras muito diferentes;
- ilustrações + pictogramas;
- estilos 3D/duotone com ícones utilitários simples.

## 8.3 Taxonomia inicial

Ícones só devem ser incorporados quando melhorarem reconhecimento ou navegação.

Conjunto inicial candidato:

```text
Clínica
Socioeconômico
Organizações / inovação
Busca
Filtro
Dados / base
Fonte / referência
Informação
Alerta / limitação
Abrir detalhe
Fechar
Menu
Navegação
```

Não atribuir ícones a categorias científicas ou estados de evidência sem necessidade de produto demonstrada.

## 8.4 Governança

### `PENDING_VALIDATION`

Antes da implementação final, verificar para cada asset:

```text
fonte
autor
licença
necessidade de atribuição
arquivo original
versão
```

Manter `ICON_MANIFEST` no repositório se ícones externos forem incorporados.

## 8.5 Acessibilidade

### `DASHBOARD_DECISION`

- ícone decorativo: oculto da árvore de acessibilidade;
- botão icon-only: `aria-label` obrigatório;
- informação crítica não pode depender apenas do ícone;
- não depender apenas de cor + ícone para estados de evidência.

---

# 9. Acessibilidade cromática

### `MANDATORY_BRAND`

O guia exige atenção explícita à legibilidade e apresenta relações permitidas/evitadas entre texto e cores da paleta.

### `DASHBOARD_DECISION`

A implementação deve manter gates técnicos independentes da percepção visual:

```text
WCAG contrast
axe
focus visible
keyboard navigation
320 px viewport
root/subpath
```

Nenhuma combinação é aprovada apenas por “usar cores oficiais”.

Para gráficos:

- cor não pode ser único discriminador quando isso impedir leitura;
- labels/legendas devem permanecer suficientes;
- contraste deve ser testado no contexto real.

---

# 10. Sistema de componentes do Dashboard

O guia define identidade visual, não a arquitetura completa de um dashboard analítico. Portanto, os itens abaixo são `DASHBOARD_DECISION`.

## 10.1 Princípios

```text
conteúdo antes de decoração
hierarquia clara
baixa densidade ornamental
superfícies claras
azul institucional como identidade, não ruído
consistência transversal
componentização
responsividade
acessibilidade
```

## 10.2 Elementos a normalizar

A 6D deverá normalizar:

```text
Header
Navigation
Footer
Hero
Section headings
Buttons
Links
Cards
Metric cards
Badges
Inputs
Search
Filters
Selects
Checkboxes
Drawers
Tables
Notices
Source blocks
Charts
Empty states
Tooltips
Focus states
Loading/error states (quando existentes)
```

## 10.3 Regra de implementação

Nenhum componente deve possuir identidade própria desconectada do sistema.

Preferir:

```text
design tokens
→ primitives
→ components
→ page composition
```

em vez de:

```text
page-specific CSS
→ hardcoded colors
→ ajustes locais repetidos
```

---

# 11. Design tokens — contrato inicial

A 6D.2 deve criar ou adaptar uma camada central de tokens.

Estrutura conceitual:

```css
/* BRAND PRIMITIVES */
--einstein-blue-dark: #00539a;
--einstein-blue-medium: #0096d2;
--einstein-blue-light: #00dbff;

--einstein-neutral-900: #212121;
--einstein-neutral-700: #545454;
--einstein-neutral-500: #ababab;
--einstein-neutral-400: #bababa;
--einstein-neutral-300: #d4d4d4;
--einstein-neutral-100: #ededed;
--einstein-neutral-50: #f2f2f2;
--einstein-white: #ffffff;

/* TYPOGRAPHY */
--font-heading: 'Work Sans', 'Montserrat', Arial, sans-serif;
--font-interface: 'Inter', 'Montserrat', Arial, sans-serif;
--font-institutional: 'Montserrat', Arial, sans-serif;

/* SEMANTIC — aliases, not new brand colors */
--color-brand-primary: var(--einstein-blue-dark);
--color-brand-secondary: var(--einstein-blue-medium);
--color-brand-accent: var(--einstein-blue-light);

--color-text-primary: var(--einstein-neutral-900);
--color-text-secondary: var(--einstein-neutral-700);
--color-border: var(--einstein-neutral-300);
--color-surface-subtle: var(--einstein-neutral-50);
--color-surface: var(--einstein-white);
```

### `PENDING_VALIDATION`

Não congelar ainda:

- gradient token;
- semantic success/warning/danger colors;
- chart categorical palette;
- spacing scale;
- radii;
- shadows;
- motion;
- exact type scale.

Esses itens exigem auditoria da UI existente e/ou necessidade funcional.

---

# 12. Charts e visualização de dados

### `DASHBOARD_DECISION`

Rebranding dos charts deve ser puramente visual.

Congelar:

```text
agregações
counts
labels factuais
universos
caveats
ordem semântica
```

A 6D poderá alterar:

```text
fontes
cores
gridlines
borders
spacing
legend styling
tooltip styling
```

desde que acessibilidade e distinção semântica sejam preservadas.

### Proibição

Não converter automaticamente todos os dados em três tons de azul se isso eliminar distinção entre categorias.

A paleta categórica dos charts deve ser especificada em etapa própria após teste de contraste e discriminabilidade.

---

# 13. Layout e densidade

### `DASHBOARD_DECISION`

O guia institucional não fornece uma grid completa para dashboards.

A 6D deverá preservar o layout funcional atual inicialmente e ajustar apenas após auditoria visual.

Princípios:

- max-width consistente;
- alinhamento transversal entre páginas;
- ritmo vertical previsível;
- cards com densidade compatível com leitura analítica;
- mobile não pode ser versão “espremida” do desktop;
- evitar excesso de caixas quando hierarquia tipográfica resolve.

### `PENDING_VALIDATION`

Spacing scale, container width, border radius e elevation só serão congelados após 6D.1.

---

# 14. Arquitetura de páginas

Durante o rebranding, preservar a arquitetura informacional aprovada ao final da 6C.

## Home

Identidade institucional + entrada para as análises.

## Clínica

Leitura científica/assistencial com alta legibilidade e menor ornamentação.

## Socioeconômico

Leitura content-first com hierarquia explícita entre carga, evidência Brasil, segmentos e dimensionamento.

## Observatório

Interface mais densa e operacional; busca/filtros/lista continuam como elemento principal, seguida por analytics.

Não usar rebranding para reabrir decisões editoriais da 6C.

---

# 15. Header / Footer — direção para 6D.3

### `DASHBOARD_DECISION`

A primeira proposta deverá testar:

```text
Header:
- assinatura institucional/co-brand validada
- navegação principal
- fundo claro preferencial
- azul-escuro como cor funcional principal
- comportamento responsivo preservado

Footer:
- assinatura institucional autorizada, se aplicável
- informações essenciais
- sem duplicar branding desnecessariamente
```

### `PENDING_VALIDATION`

A posição definitiva do lockup Eretz × Einstein depende de:

- status de aprovação do asset;
- dimensões disponíveis;
- área de reserva;
- comportamento mobile.

---

# 16. Página piloto

### `DASHBOARD_DECISION`

A **Home** será a página piloto da 6D.3.

Razões metodológicas:

- exerce hero;
- header/footer;
- métricas;
- cards;
- CTAs;
- hierarchy;
- múltiplas superfícies;
- responsividade;
- menos risco operacional que filtros/drawers do Observatório.

Sequência:

```text
Home pilot
→ auditoria visual humana
→ ajustes no sistema
→ freeze dos components/tokens
→ rollout Clínica
→ rollout Socio
→ rollout Observatório
```

Não propagar o design para todas as páginas antes de aprovar o piloto.

---

# 17. QA visual da 6D

A 6D.4 deverá validar, no mínimo:

```text
desktop
tablet quando relevante
320 px
root
subpath
keyboard
focus visible
axe
contrast
header/nav
footer
drawers
filters
search
tables
charts
long labels
empty states
overflow
font loading/fallback
logo integrity
logo clear space
```

Também rodar todos os testes funcionais existentes.

## Regressões proibidas

```text
alteração de counts
alteração de dados
alteração de conteúdo editorial aprovado
mudança de universo analítico
mudança de comportamento dos filtros
mudança de busca
mudança de drawer
perda de source/evidence content
```

---

# 18. Inventário de fatos, decisões e pendências

## 18.1 FATOS / `MANDATORY_BRAND`

- Guia analisado: versão interna, abril/2026.
- Montserrat é família institucional.
- Work Sans é exclusiva para títulos/cabeçalhos em website e aplicativos.
- Inter é exclusiva para corpo e elementos de interface digital.
- Azul-escuro digital: `#00539A`.
- Azul-médio digital: `#0096D2`.
- Azul-claro digital: `#00DBFF`.
- O guia fornece escala secundária de cinzas.
- Existe gradiente institucional.
- O guia contém regras explícitas de acessibilidade cromática.
- Logos devem usar originais oficiais.
- Não se deve reconstruir, redesenhar, distorcer, recolorir ou criar novas composições da marca.
- Existe área de reserva e redução mínima para assinaturas Einstein.
- O símbolo Einstein possui regras próprias e não é elemento decorativo livre.

## 18.2 DECISÕES DO DASHBOARD / `DASHBOARD_DECISION`

- Rebrand ≠ redesign funcional.
- Work Sans será heading family e Inter interface/body family.
- Cores serão operacionalizadas por tokens semânticos.
- Flaticon será fonte candidata, com estilo único e manifesto de licença.
- O gradiente será usado com parcimônia.
- Home será piloto visual.
- UI será migrada por foundations → components → pilot → rollout.
- Charts terão rebranding visual sem alteração de dados/agregações.
- 6C permanecerá congelada durante 6D.

## 18.3 PENDÊNCIAS / `PENDING_VALIDATION`

- confirmar status institucional/autorização do lockup Eretz.bio × Einstein fornecido;
- obter versões eletrônicas oficiais apropriadas para web;
- definir regra de área de reserva/redução específica do lockup combinado;
- obter parametrização inequívoca/original eletrônico do gradiente antes de codificá-lo;
- validar disponibilidade/licenciamento web das fontes no ambiente do projeto;
- definir licença/atribuição dos ícones Flaticon usados;
- definir semantic colors de estados;
- definir paleta categórica acessível dos charts;
- definir spacing/radii/shadows/type scale após auditoria visual 6D.1.

---

# 19. Fases seguintes

## 6D.0 — Brand extraction / specification

**Este documento.**

Saída:

```text
ESPECIFICACAO_VISUAL_INSTITUCIONAL_6D.md
```

Nenhuma alteração de produção.

## 6D.1 — Auditoria visual do estado atual

Objetivo:

- inventariar componentes/tokens/CSS;
- screenshots das quatro superfícies;
- mapear inconsistências;
- classificar:
  - `KEEP`
  - `RESTYLE`
  - `REPLACE`
  - `REMOVE`
  - `NEEDS_DECISION`

Nenhuma mudança ampla de UI nesta fase.

## 6D.2 — Foundations

Implementar:

- fontes;
- brand primitives;
- semantic tokens;
- focus/contrast foundations;
- assets de marca validados.

## 6D.3 — Components + Home pilot

Implementar:

- shell;
- components;
- página Home piloto.

Parar para validação visual humana.

## 6D.4 — Rollout + visual QA

Após aprovação:

- Clínica;
- Socio;
- Observatório;
- charts;
- QA transversal.

---

# 20. Gates antes de iniciar 6D.1

Obrigatório:

```text
[ ] 6C.1.1 aprovada e congelada
[ ] novo SHA main registrado
[ ] working tree limpo
[ ] dados e charts congelados
[ ] este documento revisado
[ ] asset Eretz × Einstein preservado sem reconstrução
[ ] pendências de marca explicitadas
```

A 6D.1 não deve começar com regressões ou correções editoriais ainda abertas.

---

# 21. Fontes documentais

## Guia de Marca Einstein — abril/2026

Referências principais utilizadas:

```text
pp. 8, 14–19
regras de marca-mãe, integridade, versões e usos indevidos

pp. 22–27
símbolo Einstein

pp. 29–35
tipografia: Montserrat, Work Sans e Inter

pp. 36–40
paleta, gradiente e acessibilidade

pp. 42
pacote gráfico/originais eletrônicos

pp. 44–45
arquitetura de marca e proibição de composições arbitrárias

pp. 49–51
marca-mãe

pp. 70–78
marcas de atuação, incluindo Inovação

pp. 112–114
produtos, serviços, programas e projetos

pp. 116–118
governança e Núcleo de Marca
```

## Asset Eretz.bio × Einstein

Lockup fornecido pelo projeto em imagem/PDF.

Status para 6D.0:

```text
ASSET_RECEIVED
AUTHORIZATION_STATUS_PENDING_VALIDATION
```

## Flaticon

Informação operacional fornecida pelo projeto:

```text
frequentemente utilizado como fonte de ícones
```

Não identificado no Guia de Marca Einstein analisado; portanto não classificado como regra institucional oficial neste documento.
