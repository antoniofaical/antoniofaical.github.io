# Regras permanentes do Cursor — Painel GSDs

Este arquivo combina as regras permanentes do produto (v0.3) com as orientações do scaffold Astro e fatos específicos deste repositório.

## 1. Missão

Implementar um painel público rigoroso, acessível e sustentável sobre glicogenoses, preservando a distinção entre evidência, inferência, cobertura e ausência de dados. O produto é informativo e não substitui avaliação médica.

## 2. Autoridade

1. solicitação atual e explícita do usuário;
2. SoT do domínio em `docs/source-of-truth/`;
3. pacote de implementação vigente em `docs/implementation/`;
4. ADRs em `docs/decisions/`;
5. código e testes;
6. instrução específica da iteração.

Conflitos são reportados; não resolvidos silenciosamente.

## 3. Fontes de verdade

- Não editar arquivos de `docs/source-of-truth/`.
- Não corrigir, resumir ou modernizar conteúdo científico sem autorização.
- Não criar números, datas, empresas, status terapêuticos ou referências.
- Não ampliar uma evidência específica para todas as GSDs.
- Não transformar ausência em zero.
- Não chamar receita realizada de TAM/SAM/SOM.
- Não chamar AIH do SIH/SUS de paciente ou indivíduo único.
- Não usar dados fictícios fora de fixtures isoladas e claramente rotuladas.

## 4. Escopo e autorização

- Implemente apenas a iteração autorizada.
- Não avance para a próxima página ou etapa sem validação do usuário.
- Não adicione backend, CMS, autenticação, analytics, cookies ou formulários sem solicitação.
- Não altere branding institucional ou use logotipos sem autorização.
- Preserve mudanças existentes que não pertençam à tarefa.
- Observatório de startups: 5A (infraestrutura), 5B (Brazil indirect, 33 organizações) e 5C (snapshot cumulativo Brazil + Global indirect main, 92 organizações) autorizadas. Não importar CSV/MD bruto de scouting, Classe C, unresolved, filas CB, mapeamento direto global, manual/excluded/withdrawn Global, bot, `ResearchRun`, candidatos, staging ou `ChangeSet` sem nova autorização.

Não executar sem autorização explícita: pesquisa externa; alteração de SoT; mudança de stack; commit, push, PR, merge ou deploy; publicação automática de candidatos.

## 5. Checkpoints diretos obrigatórios

Envie reports no chat, nunca apenas em arquivo.

Formato:

> **Checkpoint:** concluí X; encontrei Y; agora vou fazer Z.

Frequência: inventário; cada marco; no máximo a cada 15 minutos; antes de decisão de arquitetura/escopo; ao encontrar bloqueio.

## 6. Evidência

- Toda métrica tem fonte, escopo, período e qualificador.
- Toda claim estruturada aponta para evidência.
- Ausência de dado não é zero; ausência na base não é inexistência.
- Receita não é TAM; AIH não é paciente.
- Estender `source → claim → metric` de forma retrocompatível com a Home.

## 7. Engenharia

- TypeScript estrito; Zod na fronteira de dados.
- Astro estático por padrão; React apenas se necessário.
- `withBase` em URLs internas/assets.
- LF e `.gitattributes` preservados.
- Não editar arquivos gerados; não desativar lint/typecheck/testes.
- Dependência nova exige justificativa.
- App em `painel-gsds/`; hub na raiz; Pages em `/painel-gsds/`.

## 8. Design

- Usar tokens do Design System vigente; não inventar segunda identidade.
- Home pode ser mais expressiva; páginas analíticas mais sóbrias.
- Evitar card soup; Inter corpo/interface; Manrope display.
- Nenhuma informação depende só de cor, hover ou animação.

## 9. Acessibilidade e responsividade

- Meta WCAG 2.2 AA; teclado; foco; landmarks; alvos ≥ 44×44 px.
- `prefers-reduced-motion`; overflow a 320 px; axe-core nas páginas novas.

## 10. Verificação

Antes de encerrar uma iteração: format, lint, typecheck, testes, builds com `BASE_PATH=/` e `/painel-gsds/`, e2e, hashes das SoTs, screenshots.

## 11. Report final

Status; arquivos; dados; limitações; a11y; testes; hashes; Git; pendências; confirmação de ações externas não executadas; próximo passo sem iniciá-lo.

## 12. Desenvolvimento Astro (scaffold preservado)

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Full documentation: https://docs.astro.build
