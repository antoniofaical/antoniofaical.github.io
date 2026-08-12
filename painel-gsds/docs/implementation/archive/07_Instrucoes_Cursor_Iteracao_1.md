# Instruções detalhadas — Cursor — Iteração 1

## Fundação técnica e visual do Painel Global de Inovação em Glicogenoses

## 1. Objetivo

Criar a fundação técnica do site e uma página interna de demonstração do Design System. Não implementar a Home final nem publicar conteúdo científico nesta iteração.

## 2. Entradas obrigatórias

Localize antes de editar:

- as três SoTs fornecidas pelo usuário;
- o pacote de implementação completo;
- o repositório/pasta de destino;
- mudanças preexistentes no worktree.

Leia integralmente:

1. `README.md` deste pacote;
2. `01_Design_System_v0.2.md`;
3. `02_Arquitetura_da_Informacao.md`;
4. `03_Modelo_de_Dados_e_Rastreabilidade.md`;
5. `04_Stack_Estrutura_e_Decisoes_Tecnicas.md`;
6. `05_Criterios_de_Aceite.md`;
7. `AGENTS.md` ou `06_Regras_Permanentes_Cursor.md`.

Não precisa ler integralmente os dois relatórios científicos nesta iteração, pois não haverá transposição de conteúdo. Registre presença e hash das SoTs.

## 3. Checkpoint inicial obrigatório

Antes de editar, reporte diretamente:

> **Checkpoint:** inventário concluído; encontrei [entradas, estado do repositório e eventuais mudanças existentes]; agora vou [inicializar ou adaptar a fundação].

Se a pasta já possuir aplicação, não reinicialize nem sobrescreva. Avalie compatibilidade e reporte proposta de adaptação.

## 4. Escopo positivo

### Marco 1 — Fundação

1. Inicializar Astro com saída estática e TypeScript estrito.
2. Adicionar integração React.
3. Configurar ESLint, Prettier, Vitest e scripts mínimos.
4. Criar estrutura de diretórios prevista, sem arquivos vazios desnecessários.
5. Criar `README.md` do projeto com setup, comandos e escopo.
6. Configurar `site` e `base` de modo parametrizável para GitHub Pages.
7. Criar CI com format check, lint, typecheck, testes e build.
8. Não realizar deploy.

Checkpoint:

> **Checkpoint:** fundação concluída; [testes/decisões]; agora vou implementar tokens e estrutura visual.

### Marco 2 — Documentação e preservação

1. Colocar as SoTs em `docs/source-of-truth/` sem alteração de conteúdo.
2. Colocar o pacote em `docs/implementation/`.
3. Criar `docs/source-of-truth/INVENTORY.md` com:
   - nome do arquivo;
   - função;
   - SHA-256;
   - data de inclusão;
   - regra “não editar”.
4. Usar as regras permanentes como `AGENTS.md`.
5. Se já houver `AGENTS.md`, mesclar sem remover regras existentes e reportar conflitos.

Checkpoint:

> **Checkpoint:** SoTs e instruções preservadas; hashes [resumo]; agora vou materializar o Design System.

### Marco 3 — Tokens e fundação visual

Criar:

- `tokens.css`;
- reset mínimo;
- estilos globais;
- helpers de container/grid;
- estilos de foco;
- redução de movimento;
- tipografia com fallback.

Tokens mínimos:

- cores da v0.2;
- tipografia e escala fluida;
- espaçamento;
- larguras;
- raios;
- bordas;
- duração/easing;
- elevação funcional;
- z-index documentado.

Não baixar fontes de origem incerta. Se Manrope/Inter não forem adicionadas, use fallbacks e registre a pendência.

### Marco 4 — Componentes mínimos

Implementar:

- `SkipLink`;
- `GlobalHeader`;
- `MobileNavigation`;
- `PageContainer`;
- `HeroStatement`;
- `KeyMetric`;
- `EvidenceBadge`;
- `SourceAnchor`;
- `EvidenceCallout`;
- `SectionPortal`;
- `DataAbsentState`;
- `GlobalFooter`.

Requisitos:

- props tipadas;
- sem números científicos hardcoded;
- todos os estados de evidência;
- teclado e foco;
- toque ≥ 44 × 44px;
- sem dependência exclusiva de hover;
- sem biblioteca visual adicional.

Fixtures vivem em `tests/fixtures/design-system/` ou equivalente e são marcadas como demonstrativas.

Checkpoint:

> **Checkpoint:** componentes-base concluídos; encontrei [problemas ou ajustes]; agora vou montar a página interna e testar responsividade.

### Marco 5 — Página `/design-system/`

Criar uma página interna que demonstre:

1. paleta e combinações de contraste;
2. escala tipográfica;
3. grid e espaçamento;
4. botões/links e foco;
5. componentes mínimos;
6. estados de evidência;
7. estado de dado não calculável;
8. superfície executiva escura;
9. superfície editorial clara;
10. movimento e redução de movimento.

O conteúdo de demonstração deve dizer claramente `Fixture de interface — não é dado científico`.

A rota pode ser excluída da navegação pública e marcada `noindex`.

### Marco 6 — Validação

Executar:

- format check;
- lint;
- typecheck;
- testes unitários;
- build;
- teste de base path;
- navegação por teclado;
- redução de movimento;
- inspeção em 320, 375, 768, 1024 e 1440px.

Gerar screenshots de 375px, 768px e 1440px e informar seus caminhos. Testar menu mobile, Escape e retorno de foco.

Verificar hashes das SoTs novamente.

## 5. Escopo negativo

Não:

- implementar a Home final;
- converter relatórios em páginas;
- extrair ou reescrever afirmações científicas;
- criar gráficos científicos;
- criar startup fictícia;
- construir páginas de inovação;
- adicionar backend, banco de dados, CMS ou autenticação;
- instalar Tailwind, shadcn ou outra biblioteca visual sem bloqueio real e aprovação;
- configurar analytics;
- fazer commit, push, PR ou deploy;
- alterar arquivos fora do diretório do projeto.

## 6. Critério para decisões

Decisões reversíveis e locais: escolha a opção simples, registre e reporte.

Peça validação antes de:

- trocar a stack;
- adicionar dependência estrutural;
- alterar a arquitetura de informação;
- mudar tokens fundamentais;
- editar SoT;
- expandir o escopo.

## 7. Frequência dos checkpoints

Reports diretos no chat:

- após cada marco;
- antes de decisão bloqueante;
- a cada 15 minutos se um marco estiver demorando mais;
- no final.

Formato obrigatório:

> **Checkpoint:** concluí X; encontrei Y; agora vou fazer Z.

Não grave checkpoints periódicos em arquivo Markdown.

## 8. Report final esperado

Estruture o encerramento como:

1. **Status geral**;
2. **Arquivos criados e alterados**;
3. **Componentes implementados**;
4. **Testes e resultados**;
5. **Screenshots**;
6. **Decisões e divergências**;
7. **Pendências**;
8. **Preservação das SoTs e escopo**;
9. **Próximo passo sugerido**.

Pare ao concluir. Não comece a Iteração 2.
