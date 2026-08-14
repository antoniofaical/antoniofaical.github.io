# Pacote de implementação — Painel Global de Inovação em Glicogenoses

**Versão:** 0.3  
**Data:** 2026-08-12  
**Estado:** baseline documental para as Iterações 3–5

## 1. Finalidade

Este pacote é o contrato vigente entre conteúdo, design e implementação do Painel GSDs. Ele substitui como documentação operacional as versões 0.1/0.2, sem apagar o histórico das Iterações 1–2.

O produto possui duas camadas conectadas:

1. **painel científico-editorial:** bases clínicas e impacto socioeconômico-mercadológico;
2. **observatório de inovação:** base longitudinal de organizações, produtos, alegações e fontes, atualizada por ciclos.

## 2. Estado do produto

Concluído:

- Iteração 1: fundação técnica e Design System interno;
- Iteração 1.1: fontes locais, acessibilidade e GitHub Pages;
- Iteração 2: Home executiva e camada `source → claim → metric`;
- Iteração 2.1: normalização LF, portabilidade e gates.

Próximas entregas:

- Iteração 3: `/analises/bases-clinicas/`;
- Iteração 4: `/analises/impacto-socioeconomico/`;
- Iteração 5: primeira versão do Observatório de Startups.

## 3. Fontes de verdade

| Fonte                                                   | Autoridade                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------- |
| `Glicogenose Resumo Médico Executivo.md`                | conteúdo clínico e nomenclatura                                     |
| `Glicogenose Estudo Socioeconômico Mercadológico.md`    | carga humana, economia, mercado e Brasil                            |
| `Glicogenose_Resultados_Mapeamento_startups_global.csv` | resultado do Advanced Company Search do CB Insights, agosto de 2026 |
| Código em `painel-gsds/`                                | estado implementado                                                 |
| Este pacote v0.3                                        | contrato de arquitetura, design e implementação                     |

O CSV do CB Insights é um mapeamento concluído dentro da fonte e estratégia usadas, mas **não é um censo global**. Os quatro resultados são sementes do observatório e exigem curadoria editorial independente.

## 4. Conteúdo

| Arquivo                                       | Função                                          |
| --------------------------------------------- | ----------------------------------------------- |
| `00_README_Pacote.md`                         | orientação e autoridade documental              |
| `01_Design_System_v0.3.md`                    | sistema visual e funcional das páginas 3–5      |
| `02_Arquitetura_da_Informacao.md`             | rotas, navegação e estados                      |
| `03_Modelo_de_Dados_e_Rastreabilidade.md`     | entidades, IDs, proveniência e snapshots        |
| `04_Stack_Estrutura_e_Decisoes_Tecnicas.md`   | arquitetura técnica real e evolução prevista    |
| `05_Criterios_de_Aceite.md`                   | gates globais e DoD por iteração                |
| `06_Regras_Permanentes_Cursor.md`             | regras para agentes de implementação            |
| `07_Matriz_de_Paginas_Componentes_e_Dados.md` | vínculo página–pergunta–componente–dataset      |
| `08_Instrucoes_Cursor_Iteracao_3.md`          | execução da página clínica                      |
| `09_Status_Quo_e_Divergencias.md`             | reconciliação entre ADRs, código e documentação |
| `CHANGELOG_v0.3.md`                           | mudanças em relação ao pacote anterior          |
| `decisions/ADR-0001-app-subdirectory.md`      | decisão histórica sobre localização do app      |
| `decisions/ADR-0002-home-content.md`          | contrato aceito da Home e sua evidência         |
| `archive/07_Instrucoes_Cursor_Iteracao_1.md`  | registro histórico imutável                     |

## 5. Hierarquia de autoridade

Em conflito:

1. SoT do domínio para fatos;
2. este pacote v0.3 para arquitetura e design;
3. ADRs posteriores para decisões locais justificadas;
4. implementação existente para convenções técnicas;
5. instruções históricas apenas como registro.

Nenhum requisito visual autoriza alteração silenciosa de conteúdo científico.

## 6. Sequência de uso

1. ler este README e `06_Regras_Permanentes_Cursor.md`;
2. ler integralmente a SoT da iteração;
3. consultar arquitetura, modelo, Design System e matriz;
4. seguir as instruções específicas da iteração;
5. produzir checkpoints diretos no chat;
6. executar gates e screenshots;
7. parar antes de commit/push/deploy, salvo autorização explícita.

## 7. Política de atualização

- SoTs permanecem imutáveis; novas versões são explícitas.
- Conteúdo estruturado é revisado por alegação e fonte.
- Startups possuem estado atual e histórico de observações.
- Cada ciclo mensal gera snapshot, changelog e métricas de cobertura.
- Candidato automatizado não é publicado antes de validação humana.
- Documentos antigos vão para `archive/`; não são reescritos retroativamente.

## 8. Integridade do manifesto

Validar `MANIFEST.sha256` **a partir de** `painel-gsds/docs/implementation/`:

```bash
cd docs/implementation
sha256sum -c MANIFEST.sha256
```

Os ADRs usam caminhos relativos verificáveis `../decisions/...`. O próprio `MANIFEST.sha256` não entra no manifesto.

## 9. Decisões ainda abertas

- conjunto final das 50–100 fontes monitoradas;
- orquestrador do pipeline mensal;
- interface de curadoria/autenticação;
- necessidade de banco/serviço gerenciado após o MVP estático;
- taxonomia final após crescimento real da base.

Essas decisões não bloqueiam as Iterações 3–5 estáticas e schema-first.
