# Regras permanentes do Cursor — Painel GSDs

Este conteúdo deve ser usado como `AGENTS.md` na raiz do projeto. Regras muito específicas podem posteriormente ser divididas em `.cursor/rules/`.

## 1. Missão

Construir um painel estático, mobile-first, acessível e rastreável sobre glicogenoses, combinando leitura executiva e evidência aprofundada. O produto é informativo e não substitui avaliação médica.

## 2. Autoridade dos documentos

Ordem de precedência:

1. solicitação atual e explícita do usuário;
2. instruções da iteração em `docs/implementation/`;
3. critérios de aceite;
4. Design System e arquitetura técnica;
5. fontes de verdade em `docs/source-of-truth/`;
6. convenções existentes no código.

Se houver conflito científico entre fontes ou instruções, pare e reporte. Não escolha silenciosamente.

## 3. Fontes de verdade

- Não editar arquivos de `docs/source-of-truth/`.
- Não corrigir, resumir ou modernizar conteúdo científico sem autorização.
- Não criar números, datas, empresas, status terapêuticos ou referências.
- Não ampliar uma evidência específica para todas as GSDs.
- Não transformar ausência em zero.
- Não chamar receita realizada de TAM/SAM/SOM.
- Não chamar AIH do SIH/SUS de paciente ou indivíduo único.
- Não usar dados fictícios fora de fixtures isoladas e claramente rotuladas.

## 4. Escopo

- Implemente apenas a iteração autorizada.
- Não avance para a próxima página ou etapa sem validação do usuário.
- Não adicione backend, CMS, autenticação, analytics, cookies ou formulários sem solicitação.
- Não altere branding institucional ou use logotipos sem autorização.
- Preserve mudanças existentes que não pertençam à tarefa.

## 5. Checkpoints diretos obrigatórios

Envie reports no chat, nunca apenas em arquivo.

Formato:

> **Checkpoint:** concluí X; encontrei Y; agora vou fazer Z.

Frequência:

- após inventário inicial;
- após cada marco das instruções;
- antes de qualquer decisão que mude arquitetura ou escopo;
- a cada 15 minutos se nenhum marco tiver sido concluído;
- no encerramento.

Um checkpoint deve ser curto, factual e mencionar bloqueios. Não salve checkpoints periódicos em `.md`. Documentos técnicos permanentes, ADRs e relatórios finais continuam permitidos.

## 6. Bloqueios e decisões

Pare e peça validação quando:

- faltar uma escolha que altere arquitetura, conteúdo ou identidade;
- uma SoT não estiver disponível ou seu hash mudar inesperadamente;
- a implementação exigir interpretação científica;
- um requisito não puder ser atendido sem expandir escopo;
- uma operação puder apagar ou sobrescrever trabalho relevante;
- testes críticos falharem sem causa segura e localizada.

Não pare por decisões reversíveis pequenas: adote a opção mais simples, registre-a e reporte no checkpoint seguinte.

## 7. Engenharia

- TypeScript estrito; evite `any`.
- Astro como padrão; React apenas para interatividade real.
- Conteúdo e dados fora dos componentes.
- Componentes pequenos, sem abstração prematura.
- Dependências novas exigem justificativa no report.
- Use caminhos compatíveis com `base` do GitHub Pages.
- Não use caminhos absolutos de máquina.
- Não desative lint, typecheck ou testes para obter build verde.
- Não edite arquivos gerados ou `dist/` manualmente.
- Não faça commits, push ou deploy sem autorização explícita.

## 8. Design

- Use os tokens do Design System; não invente uma segunda identidade.
- Evite `card soup`, gradientes genéricos, glassmorphism excessivo e animações decorativas.
- Não comprima tabelas desktop no mobile; transforme a interação.
- Não dependa somente de cor, hover ou movimento.
- Componentes executivos podem ser expressivos; conteúdo científico deve permanecer sóbrio.
- Nenhum elemento decorativo pode parecer dado ou controle.

## 9. Evidência e dados

- Cada métrica deve ter fonte, período, geografia/universo e estado de evidência.
- Componentes recebem dados tipados; não incorporar números científicos diretamente no JSX.
- Registros temporais possuem `lastReviewedAt`/data de verificação.
- `not-calculable` usa valor nulo e explicação.
- Proxies e estimativas são rotulados na interface.
- Toda visualização possui insight, fonte, método e alternativa acessível.

## 10. Acessibilidade e responsividade

- Meta WCAG 2.2 AA.
- Semântica HTML primeiro; ARIA apenas quando necessário.
- Navegação por teclado e foco visível.
- `SkipLink` e landmarks.
- Alvos de toque de pelo menos 44 × 44px.
- Suporte a `prefers-reduced-motion`.
- Testar 320px, 375px, 768px, 1024px e 1440px quando a alteração afetar layout.

## 11. Verificação

Antes de encerrar uma iteração:

1. revisar diff;
2. executar format check, lint, typecheck, testes e build;
3. testar rotas relevantes com o base path;
4. inspecionar desktop e mobile;
5. testar teclado e redução de movimento;
6. confirmar que SoTs não foram alteradas;
7. reportar limitações e pendências.

## 12. Report final

Entregar no chat:

1. status geral;
2. o que foi criado/alterado;
3. testes e resultados;
4. screenshots ou caminhos para revisão;
5. decisões e divergências;
6. pendências;
7. confirmação de preservação de escopo e SoTs;
8. próximo passo sugerido, sem executá-lo.

