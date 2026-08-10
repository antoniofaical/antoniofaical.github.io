# Critérios de aceite

**Versão:** 0.1  
**Uso:** checklist de revisão humana e validação automatizada.

## 1. Critérios globais do produto

### Conteúdo e evidência

- [ ] Nenhuma métrica aparece sem fonte, período, geografia/universo e estado de evidência.
- [ ] Ausência de dado não é representada como zero.
- [ ] Receita realizada não é chamada de TAM, SAM ou SOM.
- [ ] Estimativas e proxies são visualmente e textualmente identificados.
- [ ] Afirmações preservam o subtipo, população e contexto da evidência original.
- [ ] Conteúdo temporal exibe data de corte ou verificação.
- [ ] Limitações aparecem próximas de interpretações sensíveis.
- [ ] SoTs permanecem inalteradas.
- [ ] Toda página publicada passa por revisão humana do conteúdo.

### Experiência

- [ ] Um ADM identifica a mensagem central de cada página em até dois minutos.
- [ ] Um leitor técnico consegue chegar da afirmação à fonte.
- [ ] O texto profundo permanece legível e não é fragmentado em excesso.
- [ ] A navegação diferencia conteúdo disponível de conteúdo futuro.
- [ ] Não há elementos decorativos que pareçam métricas ou controles.

### Responsividade

- [ ] Funciona entre 320px e desktop amplo.
- [ ] Não existe rolagem horizontal da página.
- [ ] Tabelas e matrizes possuem transformação mobile.
- [ ] Alvos de toque têm pelo menos 44 × 44px.
- [ ] Elementos fixos não ocultam título ou conteúdo.

### Acessibilidade

- [ ] Meta WCAG 2.2 AA.
- [ ] Navegação integral por teclado.
- [ ] Ordem de foco corresponde à ordem visual e semântica.
- [ ] Foco é visível.
- [ ] Hierarquia de títulos é válida.
- [ ] Landmarks e `SkipLink` existem.
- [ ] Cor, hover e animação não são canais únicos.
- [ ] Gráficos possuem alternativa textual ou tabular.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] Contrastes são verificados automaticamente e por inspeção.

### Performance e robustez

- [ ] Build estático funciona com o base path do GitHub Pages.
- [ ] Conteúdo principal existe sem hidratação JavaScript.
- [ ] Visualizações pesadas são carregadas sob demanda.
- [ ] Não há erros no console nas rotas publicadas.
- [ ] CI bloqueia build com schema inválido ou referência quebrada.
- [ ] Lockfile está versionado.

## 2. Definition of Done por alteração

Uma alteração só está concluída quando:

1. escopo solicitado foi implementado sem mudanças extras;
2. lint, typecheck, testes e build passam;
3. foram inspecionados os breakpoints afetados;
4. conteúdo científico alterado foi explicitamente listado;
5. limitações e pendências foram reportadas;
6. diff foi revisado;
7. usuário aprovou o checkpoint correspondente.

## 3. Critérios da Iteração 1 — fundação

### Repositório e stack

- [ ] Astro estático inicializado com TypeScript estrito.
- [ ] React instalado, mas usado somente na demonstração de interação se necessário.
- [ ] Estrutura de pastas segue a especificação ou divergências são justificadas.
- [ ] scripts de dev, build, lint, format, typecheck e test funcionam.
- [ ] GitHub Actions possui CI; deploy pode ficar parametrizado até a definição do repositório final.
- [ ] `site`/`base` não estão presos a um caminho pessoal de máquina.

### SoT e documentação

- [ ] Três SoTs copiadas para `docs/source-of-truth/` sem alterações de conteúdo.
- [ ] Pacote de implementação copiado para `docs/implementation/`.
- [ ] hashes das SoTs registrados em inventário local.
- [ ] `AGENTS.md` contém as regras permanentes.
- [ ] README explica execução, build e escopo da Iteração 1.

### Design System

- [ ] tokens de cor, tipografia, escala, grid, raio e movimento definidos.
- [ ] página interna `/design-system/` demonstra tokens e componentes.
- [ ] demonstração inclui superfícies claras e escuras.
- [ ] estados de evidência aparecem com texto e não só cor.
- [ ] tipografia usa fallback robusto se as fontes finais não estiverem disponíveis.

### Componentes mínimos

- [ ] `SkipLink`.
- [ ] `GlobalHeader` desktop e mobile.
- [ ] `PageContainer`/grid base.
- [ ] `HeroStatement`.
- [ ] `KeyMetric` com todos os estados de evidência.
- [ ] `EvidenceBadge`.
- [ ] `SourceAnchor` com dado fictício explicitamente rotulado como fixture na página interna.
- [ ] `EvidenceCallout`.
- [ ] `SectionPortal`.
- [ ] `DataAbsentState`.
- [ ] `GlobalFooter`.

Fixtures da página interna não podem ser importadas por páginas públicas futuras.

### Validação visual

- [ ] screenshots de 375px, 768px e 1440px.
- [ ] sem overflow em 320px.
- [ ] menu mobile acessível por teclado e fecha com Escape.
- [ ] redução de movimento testada.
- [ ] temas claro/escuro de seção mantêm contraste.

### Limites da Iteração 1

- [ ] Home final não foi implementada.
- [ ] Conteúdo médico não foi transformado em página.
- [ ] Conteúdo socioeconômico não foi transformado em página.
- [ ] Nenhuma startup ou empresa fictícia foi criada.
- [ ] Nenhum gráfico de dados científicos foi publicado.
- [ ] Nenhum CMS/backend foi adicionado.

## 4. Saída de validação esperada do agente

O report final inclui:

- arquivos criados e alterados;
- comandos executados e resultados;
- screenshots e viewports;
- divergências justificadas;
- pendências;
- confirmação da preservação das SoTs;
- sugestão objetiva para a Iteração 2, sem iniciá-la.

