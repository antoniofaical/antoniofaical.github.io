# Arquitetura da informação

**Versão:** 0.1  
**Produto:** Painel Global de Inovação em Glicogenoses

## 1. Públicos e necessidades

| Público                   | Necessidade principal                                        | Profundidade padrão      |
| ------------------------- | ------------------------------------------------------------ | ------------------------ |
| ADMs e gestores           | entender problema, escala, lacunas e caminhos de exploração  | executiva                |
| Equipe de inovação        | relacionar necessidades a segmentos e, futuramente, soluções | executiva + analítica    |
| Pesquisadores e clínicos  | verificar escopo, fontes, definições e limitações            | evidencial               |
| Pacientes e rede de apoio | compreender o panorama sem receber orientação individual     | introdutória e acessível |

O painel não é prontuário, ferramenta diagnóstica, aconselhamento médico, catálogo comercial nem ranking automático de empresas.

## 2. Navegação global

```text
Visão geral
Análises
  Bases clínicas
  Impacto socioeconômico
Inovação
  Ecossistema global          [futuro]
  Startups GSD                [futuro]
  Tecnologias adjacentes      [futuro]
Oportunidades                 [futuro]
Metodologia
```

No mobile, `Análises` e `Inovação` são grupos expansíveis. `Metodologia e fontes` permanece acessível diretamente.

## 3. Mapa de rotas

| Rota                                | Estado inicial | Função                                           |
| ----------------------------------- | -------------- | ------------------------------------------------ |
| `/`                                 | Iteração 2     | visão executiva e portais                        |
| `/analises/bases-clinicas/`         | Iteração 3     | mecanismo, tipos, diagnóstico, manejo e lacunas  |
| `/analises/impacto-socioeconomico/` | Iteração 4     | carga, custos, mercado, dimensionamento e Brasil |
| `/metodologia/`                     | Iteração 2–4   | métodos, definições, fontes e limitações         |
| `/glossario/`                       | Iteração 3     | termos clínicos, econômicos e metodológicos      |
| `/inovacao/`                        | Reservada      | síntese futura do ecossistema                    |
| `/inovacao/startups-gsd/`           | Reservada      | soluções diretamente ligadas às GSDs             |
| `/inovacao/tecnologias-adjacentes/` | Reservada      | soluções aplicáveis às necessidades mapeadas     |
| `/oportunidades/`                   | Reservada      | síntese estratégica posterior ao scouting        |
| `/design-system/`                   | Interna        | demonstração e QA de componentes                 |

Rotas reservadas não entram na navegação principal como destinos ativos até terem conteúdo validado. Se forem publicadas, usam `noindex` e `PageStatus`.

## 4. Hierarquia da Home

| Ordem | Bloco                 | Pergunta respondida                              | Destino               |
| ----: | --------------------- | ------------------------------------------------ | --------------------- |
|     1 | Hero                  | O que é este painel?                             | análises              |
|     2 | Problema em um minuto | Por que GSD não é uma única doença?              | bases clínicas        |
|     3 | Mecanismo → cotidiano | Como a biologia se transforma em carga humana?   | duas análises         |
|     4 | Métricas essenciais   | Quais números enquadram o problema?              | fontes específicas    |
|     5 | Mercado observado     | O que conseguimos e não conseguimos dimensionar? | socioeconômico        |
|     6 | Brasil                | O que os dados nacionais mostram e omitem?       | socioeconômico/Brasil |
|     7 | Portais               | Onde aprofundar?                                 | páginas analíticas    |
|     8 | Inovação              | Em que etapa está o mapeamento?                  | futura inovação       |
|     9 | Metodologia           | Como verificar?                                  | metodologia           |

## 5. Hierarquia das páginas analíticas

```text
Breadcrumbs
ResearchHeader
Síntese executiva
Índice da análise
Seções de evidência
Limitações
Referências
Próxima análise relacionada
```

Cada seção possui âncora estável. Filtros ou comparações relevantes podem ser serializados na query string, mas o conteúdo essencial nunca depende dela.

## 6. Convenções de URL

- português sem acentos na rota;
- `kebab-case`;
- barra final consistente;
- âncoras sem números de ordem: `#diagnostico`, não `#secao-7`;
- filtros: `?gsd=ia&comparar=ib`, apenas quando compartilháveis;
- a mudança de título editorial não deve quebrar âncoras publicadas.

## 7. Busca e descoberta

O MVP não precisa de busca global. A primeira busca funcional pertence ao futuro catálogo de startups. Até lá:

- índice interno em análises;
- filtros locais no explorador de GSDs;
- glossário navegável;
- metadados SEO e sociais por página.

## 8. Estados do conteúdo

| Estado      | Uso                                          |
| ----------- | -------------------------------------------- |
| `draft`     | disponível apenas localmente                 |
| `review`    | implementado, aguardando revisão de conteúdo |
| `published` | aprovado e visível                           |
| `stale`     | requer nova verificação temporal             |
| `reserved`  | rota futura sem conteúdo                     |

Datas separadas:

- `publishedAt`: primeira publicação;
- `lastReviewedAt`: última revisão editorial/científica;
- `dataCutoff`: limite temporal das evidências.

## 9. Breadcrumbs

Exemplos:

```text
Visão geral / Análises / Bases clínicas
Visão geral / Análises / Impacto socioeconômico
Visão geral / Metodologia
```

Na Home não há breadcrumbs.

## 10. Rodapé e conteúdo institucional

Inclui:

- propósito do painel;
- autoria/equipe, após definição institucional;
- última atualização;
- metodologia e fontes;
- aviso médico;
- declaração de escopo;
- identidade institucional somente após autorização de marca.

## 11. Conteúdo deliberadamente fora do MVP

- login;
- banco de dados remoto;
- CMS;
- comentários;
- personalização clínica;
- recomendações automáticas;
- ranking público de startups;
- formulário de submissão de empresas;
- traduções;
- exportação dinâmica de relatórios.
