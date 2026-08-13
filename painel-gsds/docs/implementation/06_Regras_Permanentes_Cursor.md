# Regras permanentes do Cursor — Painel GSDs

**Versão:** 0.3

## 1. Missão

Implementar um painel público rigoroso, acessível e sustentável, preservando a distinção entre evidência, inferência, cobertura e ausência de dados.

## 2. Autoridade

1. SoT do domínio;
2. pacote de implementação vigente;
3. ADRs aprovadas;
4. código e testes;
5. instrução específica da iteração.

Conflitos são reportados; não resolvidos silenciosamente.

## 3. Checkpoints diretos

Reportar no chat:

```text
Checkpoint: concluí [X]; encontrei [Y]; agora vou [Z].
```

Obrigatório:

- no início após inventário;
- a cada seção/lote relevante;
- no máximo a cada 15 minutos;
- antes de decisão irreversível ou mudança de escopo;
- ao encontrar bloqueio.

Não salvar checkpoint apenas em `.md`.

## 4. Antes de editar

- confirmar working directory, branch e status;
- ler `AGENTS.md` e instruções vigentes;
- inventariar implementação e SoTs;
- registrar hashes das SoTs;
- identificar alterações alheias;
- criar branch quando solicitado;
- não usar memória para recriar arquivo ausente.

## 5. Escopo e autorização

Não executar sem autorização explícita:

- pesquisa externa;
- alteração de SoT;
- mudança de stack;
- backend/CMS/analytics;
- commit, push, PR, merge ou deploy;
- publicação automática de candidatos;
- exclusão ou reescrita de histórico.

## 6. Evidência

- Toda métrica tem fonte, escopo, período e qualificador.
- Toda claim estruturada aponta para evidência.
- Ausência de dado não é zero.
- Ausência na base não é inexistência.
- Receita não é TAM.
- AIH não é paciente.
- Status de fonte não é validação editorial.
- Estágio pertence ao produto/programa quando aplicável.
- Atributos temporais têm `observedAt` e `lastReviewedAt`.

## 7. Startups

- Separar resultado recuperado, entidade reconciliada e registro publicado.
- Não promover menção lexical a relevância GSD.
- Classificação editorial é independente da categoria da fonte.
- Candidato só entra nas métricas públicas após revisão.
- Preservar aliases e histórico; não sobrescrever observações.
- Não produzir ranking/score sem metodologia aprovada.
- O CB Insights inicial é cobertura limitada e datada.

## 8. Engenharia

- TypeScript estrito e Zod na fronteira de dados.
- Astro estático por padrão; React apenas se necessário.
- `withBase` em URLs internas/assets.
- LF e `.gitattributes` preservados.
- não editar arquivos gerados;
- não duplicar arquitetura existente;
- alterações pequenas, coesas e testadas;
- dependência nova exige justificativa e ADR.

## 9. Design

- usar tokens; não criar cores/spacing arbitrários;
- mobile-first real;
- cards apenas como unidades de decisão;
- visualização responde a pergunta;
- densidade visual acompanha densidade dos dados;
- nenhuma informação depende só de cor/hover/animação;
- conteúdo não fica invisível aguardando JS.

## 10. Acessibilidade

- WCAG 2.2 AA;
- teclado, foco, landmarks e headings;
- alvo ≥ 44×44 px;
- reduced motion;
- alternativas textuais/tabulares;
- axe-core e overflow a 320 px;
- overlays com Escape, trap e retorno de foco.

## 11. Verificação

Executar, conforme escopo:

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
build com BASE_PATH=/
build com BASE_PATH=/painel-gsds/
npm run test:e2e
```

Não enfraquecer teste para fazê-lo passar. Revisar screenshots nas larguras acordadas.

## 12. Git e preservação

- nunca reset destrutivo;
- não incluir artefatos, cache ou credenciais;
- conferir diff e SoTs antes de commit;
- commits por escopo;
- não misturar limpeza ampla com feature;
- parar antes de publicar se a instrução assim determinar.

## 13. Report final

Incluir:

1. status e escopo;
2. arquivos e componentes;
3. dados, fontes e decisões;
4. limitações/não inferências;
5. a11y, responsividade e performance;
6. testes e screenshots;
7. hashes das SoTs;
8. estado do Git;
9. divergências e pendências;
10. confirmação de ações externas não executadas;
11. próximo passo sem iniciá-lo.

Se um gate falhar, não declarar conclusão.
