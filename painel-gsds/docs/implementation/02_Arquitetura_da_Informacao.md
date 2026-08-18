# Arquitetura da informação

**Versão:** 0.3  
**Estado:** baseline das Iterações 3–5

## 1. Objetivos de leitura

| Público             | Pergunta principal                                         | Entrada preferencial    |
| ------------------- | ---------------------------------------------------------- | ----------------------- |
| ADM/gestor          | Qual é o problema, sua escala e as lacunas?                | Home                    |
| Equipe de inovação  | Onde necessidades e soluções se conectam?                  | análises → observatório |
| Clínico/pesquisador | Como verificar mecanismo, escopo e fontes?                 | bases clínicas          |
| Mercado/ATS         | O que é observado, calculável ou ausente?                  | impacto socioeconômico  |
| Paciente/rede       | Como compreender o panorama sem aconselhamento individual? | Home e sínteses         |

## 2. Navegação global

```text
Início
Análises
  Bases clínicas
  Impacto socioeconômico
Inovação
  Observatório de startups
    Visão consolidada
    Diretas
    Tecnologias adjacentes
Metodologia e fontes
```

Brasil/global são filtros e vistas do mesmo observatório, não bases duplicadas. Se um recorte precisar de narrativa própria no futuro, poderá ganhar rota sem duplicar entidades.

## 3. Rotas

| Rota                                | Iteração | Estado                           |
| ----------------------------------- | -------: | -------------------------------- |
| `/`                                 |        2 | implementada                     |
| `/design-system/`                   |        1 | interna                          |
| `/analises/bases-clinicas/`         |        3 | implementada                     |
| `/analises/impacto-socioeconomico/` |        4 | implementada                     |
| `/inovacao/startups/`               |       5B | implementada (Brasil indireto)   |
| `/inovacao/startups/diretas/`       |       5+ | vista filtrada ou rota opcional  |
| `/inovacao/startups/adjacentes/`    |       5+ | vista filtrada ou rota opcional  |
| `/inovacao/startups/{slug}/`        |       5B | contrato reservado; drawer na 5A |
| `/metodologia/`                     |       5+ | consolidada progressivamente     |
| `/fontes/`                          |       5+ | catálogo público filtrável       |

Todas respeitam `BASE_PATH=/painel-gsds/`.

## 4. Progressão narrativa do produto

```text
O que são GSDs
→ como afetam organismos
→ como reorganizam vidas e recursos
→ onde a resposta atual falha
→ quais organizações e soluções foram identificadas
→ quão sólida e atual é a evidência
```

Uma página não deve repetir integralmente a anterior. Use síntese + link contextual.

## 5. Home

Manter a narrativa implementada. Alterações permitidas nas próximas iterações:

- habilitar portais quando a rota estiver pronta;
- atualizar status e última revisão;
- incluir acesso ao observatório quando houver dados validados;
- não redesenhar nem aumentar densidade sem ADR.

## 6. Bases clínicas

Ordem:

```text
Visão geral → metabolismo → padrões clínicos → tipos/subtipos
→ nomenclatura → órgãos → epidemiologia → diagnóstico
→ manejo → terapias emergentes → lacunas → fontes
```

O índice interno usa âncoras estáveis. A classificação vem depois do mecanismo para não iniciar por uma tabela opaca.

## 7. Impacto socioeconômico

Ordem:

```text
Carga desigual → jornada e cuidado → custos
→ estrutura mercadológica → dimensionamento responsável
→ Brasil/DATASUS → lacunas → fontes
```

Receita realizada, TAM, SAM, SOM, população potencial e mercado alcançável nunca são sinônimos.

## 8. Observatório de startups

### 8.1 Entrada

A página abre com cobertura e atualização, não com um número absoluto de “startups globais”. Deve mostrar:

- escopo da busca;
- data do snapshot;
- fontes monitoradas;
- registros descobertos;
- organizações únicas;
- validadas, pendentes e excluídas;
- diretas, adjacentes, ecossistema e relevância não confirmada.

### 8.2 Exploração

Filtros combináveis:

- relação com GSD;
- recorte geográfico;
- modalidade;
- necessidade atendida;
- GSD/grupo clínico;
- maturidade do produto;
- status operacional;
- validação/confiança;
- ciclo de atualização.

Filtros sem variância ficam ocultos ou desabilitados com explicação.

### 8.3 Ficha

```text
Identidade → relevância para GSD → produtos/programas
→ evidências → observações históricas → fontes → revisão
```

### 8.4 Escopo CB Insights inicial

Os quatro resultados são exibidos como “organizações recuperadas no Advanced Company Search do CB Insights, agosto de 2026”. O painel não os denomina universo global.

## 9. Estados de conteúdo

| Estado             | Uso                                            |
| ------------------ | ---------------------------------------------- |
| `published`        | conteúdo validado e público                    |
| `in-development`   | rota planejada sem conteúdo final              |
| `limited-coverage` | resultado válido, cobertura incompleta         |
| `pending-review`   | registro não publicado nas métricas principais |
| `stale`            | revisão vencida                                |
| `archived`         | histórico, não vigente                         |

## 10. Busca, filtros e compartilhamento

- Busca global só após justificar indexação e escopo.
- Filtros do observatório devem refletir URL.
- Links compartilhados preservam filtros reconhecidos e ignoram parâmetros inválidos.
- Conteúdo essencial funciona sem JavaScript; filtros podem ter fallback server-rendered/estático.
- Comparações: até 3 itens desktop e 2 mobile.

## 11. Breadcrumbs e rodapé

Breadcrumbs obrigatórios nas páginas internas. Rodapé inclui:

- propósito e não aconselhamento médico;
- metodologia e fontes;
- última atualização;
- limitações de cobertura;
- contato institucional apenas quando aprovado.

## 12. Limites

O painel não é:

- ferramenta diagnóstica;
- recomendação terapêutica;
- catálogo exaustivo;
- ranking automático;
- due diligence;
- recomendação de investimento;
- evidência de que ausência na base equivale a inexistência.
