# Stack, estrutura e decisões técnicas

**Versão:** 0.1  
**Objetivo:** site estático, mobile-first, rastreável e compatível com GitHub Pages.

## 1. Stack recomendada

| Camada | Escolha | Motivo |
|---|---|---|
| framework | Astro, saída estática | conteúdo editorial como padrão e JavaScript seletivo |
| linguagem | TypeScript em modo estrito | schemas e contratos verificáveis |
| interatividade | React apenas para ilhas interativas | filtros, comparações, mapas e gráficos |
| conteúdo | Astro Content Collections + Markdown/MDX | validação, tipagem e separação editorial |
| validação | Zod | schemas de conteúdo e datasets |
| estilos | CSS variables + CSS Modules ou estilos Astro | preservar design autoral sem dependência visual excessiva |
| gráficos | Apache ECharts, carregado sob demanda | variedade de gráficos, responsividade e datasets |
| ícones | Lucide, importação seletiva | consistência e baixo custo |
| testes unitários | Vitest | validações de dados e utilidades |
| testes de interface | Playwright | rotas, responsividade, teclado e screenshots |
| acessibilidade | axe-core integrado ao Playwright | regressões automatizadas básicas |
| qualidade | ESLint + Prettier | consistência |
| deploy | GitHub Actions → GitHub Pages | alinhamento ao destino definido |

Não instalar Tailwind ou uma biblioteca completa de componentes na primeira iteração. O Design System já define tokens e padrões próprios; dependências podem ser adicionadas apenas quando resolverem um requisito concreto.

Referências técnicas:

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Integração React do Astro](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Deploy do Astro no GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)

## 2. Por que não começar com backend

O conteúdo inicial é versionado, revisado e atualizado por commits. GitHub Pages não fornece runtime de servidor. Um backend agora adicionaria autenticação, operação e segurança sem resolver necessidade do MVP.

Reavaliar backend/CMS quando houver:

- atualizações frequentes por não desenvolvedores;
- múltiplos revisores simultâneos;
- submissão externa de startups;
- dados privados;
- busca ou análise que não seja adequada ao cliente;
- necessidade de trilha editorial fora do Git.

## 3. Estrutura de pastas

```text
painel-gsds/
├── .cursor/
│   └── rules/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy-pages.yml
├── docs/
│   ├── implementation/
│   ├── source-of-truth/
│   └── decisions/
├── public/
│   ├── fonts/
│   ├── icons/
│   └── og/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── analytics/
│   │   ├── charts/
│   │   ├── evidence/
│   │   ├── executive/
│   │   ├── layout/
│   │   └── ui/
│   ├── content/
│   │   ├── analyses/
│   │   └── pages/
│   ├── data/
│   │   ├── datasus/
│   │   ├── claims.json
│   │   ├── gsd-types.json
│   │   ├── market-segments.json
│   │   ├── metrics.json
│   │   └── sources.json
│   ├── layouts/
│   ├── lib/
│   │   ├── data/
│   │   ├── evidence/
│   │   ├── formatting/
│   │   └── paths/
│   ├── pages/
│   ├── schemas/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   └── utilities.css
│   └── tests/
├── tests/
│   ├── e2e/
│   ├── fixtures/
│   └── visual/
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 4. Estratégia de componentes

### Astro por padrão

Usar `.astro` para:

- layouts;
- cabeçalho, rodapé e navegação simples;
- conteúdo editorial;
- cards sem estado complexo;
- shells de visualizações;
- metadados e páginas.

### React apenas quando necessário

Usar `.tsx` para:

- filtros combinados;
- comparação de GSDs;
- visualizações ECharts;
- mapas interativos;
- serialização de estado na URL;
- controles com estado relevante.

Diretivas de hidratação devem ser justificadas. Preferir `client:visible` ou `client:idle`; usar `client:load` somente quando a interação for necessária imediatamente.

## 5. Estratégia CSS

- tokens semânticos em `tokens.css`;
- estilos globais apenas para tipografia, elementos HTML e layout-base;
- estilos locais nos componentes;
- nenhuma cor hexadecimal em componentes fora do arquivo de tokens, salvo visualização que documente a exceção;
- `rem` para tipografia e espaçamento; `px` para bordas e limites técnicos;
- modo de redução de movimento centralizado;
- suporte a `:focus-visible` desde a fundação.

## 6. Fontes

Preferir Manrope e Inter hospedadas localmente, com subconjuntos e formatos modernos. Se licenças/arquivos ainda não estiverem no repositório durante a Iteração 1, usar fallbacks equivalentes e registrar a pendência; não baixar fontes de origem não validada.

## 7. Visualizações

- cada gráfico recebe dados tipados, nunca arrays soltos dentro do componente;
- ECharts é importado modularmente quando viável;
- visualização pesada carrega sob demanda;
- alternativa textual ou tabular existe no DOM;
- paleta vem dos tokens;
- `aria-label` do canvas/SVG não substitui a descrição dos dados;
- exportação de imagem não pertence ao MVP.

Diagramas clínicos explicativos podem ser SVG autoral em vez de ECharts.

## 8. GitHub Pages e caminhos

O projeto deve aceitar:

- site de usuário: `https://usuario.github.io/`;
- site de projeto: `https://usuario.github.io/nome-do-repositorio/`.

Configurar `site` e `base` via ambiente/build. Links internos e assets usam um helper central ou APIs do Astro; não concatenar caminhos manualmente em dezenas de componentes.

O workflow:

1. instala dependências com lockfile;
2. executa lint, typecheck e testes;
3. gera build estático;
4. publica `dist/` somente se as validações passarem.

## 9. Qualidade e testes

Comandos mínimos:

```text
npm run dev
npm run build
npm run preview
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run test:e2e
```

Cobertura prioritária:

- validação dos schemas;
- integridade de IDs e referências;
- semântica de métricas;
- rotas e base path;
- navegação por teclado;
- ausência de overflow em 320px;
- `prefers-reduced-motion`;
- screenshots em 375px, 768px e 1440px;
- links internos quebrados.

## 10. Performance

- build estático;
- imagens com dimensões explícitas;
- SVG otimizado;
- sem vídeo de fundo;
- fontes com `font-display: swap`;
- evitar hidratar componentes estáticos;
- carregar ECharts apenas em páginas/áreas que o utilizam;
- estabelecer relatório Lighthouse após a Home, não usar pontuação simulada na fundação.

## 11. Segurança e privacidade

O MVP não coleta dados pessoais. Não incluir analytics, cookies, formulários ou trackers sem decisão explícita. Links externos usam atributos seguros quando abertos em nova guia. Dados e fontes são públicos e revisados antes da publicação.

## 12. Versionamento do conteúdo

- SoTs permanecem imutáveis;
- alterações editoriais passam por Git diff;
- datasets recebem revisão humana;
- `lastReviewedAt` muda apenas após revisão real;
- status terapêuticos e empresariais são tratados como temporais;
- decisões relevantes ficam em `docs/decisions/ADR-XXXX.md`.

## 13. Decisões que permanecem abertas

Não bloquear a Iteração 1, mas registrar:

- nome público definitivo do painel;
- identidade institucional e uso de marcas;
- domínio/rota final no GitHub Pages;
- ferramenta final de mapas globais;
- necessidade futura de CMS;
- idioma adicional;
- analytics e política de privacidade.

