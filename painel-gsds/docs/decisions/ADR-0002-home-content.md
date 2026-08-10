---
title: 'Home executiva — matriz de conteúdo e evidência'
status: accepted
date: 2026-08-10
---

# ADR-0002 — Conteúdo e rastreabilidade da Home

## Contexto

A Iteração 2 substitui o placeholder de `/` por uma Home executiva. Números publicados precisam sair de uma camada tipada `source → claim → metric`, rastreável às SoTs, sem pesquisa externa.

## Decisão

Publicar exatamente **quatro métricas** e **cinco alegações** aprovadas, todas ancoradas nas SoTs médicas e socioeconômicas. Implementar apenas `sources.json`, `claims.json`, `schemas` e loader necessários à Home.

### Matriz por seção

| seção                           | mensagem central                                                        | alegações                                                               | métricas                                                                   | SoT / heading                                                      | qualificador         | limitação                                                    | componente                               |
| ------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| Hero                            | GSDs são uma família heterogênea, não um diagnóstico único              | `clm-clinical-001`                                                      | —                                                                          | Resumo Médico · Visão geral                                        | observado (síntese)  | Não generalizar gravidade entre tipos                        | `HeroStatement` + `GlycogenBranchVisual` |
| Problema em um minuto           | Tipo molecular, tecido e carga cotidiana diferenciam jornadas           | `clm-clinical-001`, `clm-clinical-002`, `clm-socio-001`                 | —                                                                          | Resumo Médico · Visão geral / Lógica fisiopatológica; Estudo · 1.1 | limitado             | Carga de cuidadores melhor documentada em Pompe              | `ProblemInOneMinute`                     |
| Mecanismo → vida                | Biologia vira carga humana por órgãos, manejo e sistema                 | `clm-clinical-002`, `clm-socio-001`                                     | —                                                                          | Resumo Médico · Lógica fisiopatológica; Estudo · 1.1               | conceitual (ponte)   | Não é fluxograma causal clínico completo                     | `MechanismToLife`                        |
| Números que enquadram           | Quatro dimensões distintas, não somáveis                                | `clm-clinical-001`, `clm-market-001`, `clm-brasil-001`, `clm-socio-002` | `met-clinical-001`, `met-market-001`, `met-datasus-001`, `met-mcardle-001` | Ver localizadores por métrica abaixo                               | misto                | Não usar como escala única do problema                       | `HomeMetrics` + `KeyMetric`              |
| Mercado observado ≠ necessidade | Receita observada ≠ população potencial ≠ necessidade total             | `clm-market-001`                                                        | `met-market-001` (referência)                                              | Estudo · 1.2 / 1.4                                                 | conceitual           | Sem áreas proporcionais; sem TAM/SAM/SOM monetário           | `ObservedVsNeed`                         |
| Brasil                          | Há observação hospitalar e capacidade clínica, sem denominador nacional | `clm-brasil-001`                                                        | `met-datasus-001` (mesma métrica)                                          | Estudo · Brasil / SIH                                              | limitado / proxy     | AIH ≠ paciente; ausência de registro ≠ ausência de pacientes | `BrazilOverview`                         |
| Explore as análises             | Duas profundidades futuras                                              | —                                                                       | —                                                                          | Arquitetura da informação                                          | editorial            | Portais `Em desenvolvimento`, sem links quebrados            | `SectionPortal`                          |
| Ecossistema                     | Reserva editorial do mapeamento futuro                                  | —                                                                       | —                                                                          | Arquitetura · inovação                                             | editorial            | Sem empresas, logos ou contadores                            | bloco estático                           |
| Como ler                        | Distinção observado/estimado/proxy/conceito + limites                   | todas as alegações aprovadas da Home                                    | —                                                                          | SoTs + estados de evidência                                        | metodologia compacta | Não substitui `/metodologia/`                                | `HomeMethodology`                        |

### Métricas validadas nas SoTs

1. **`met-clinical-001` — diversidade clínica**  
   Valor editorial: “mais de 20”.  
   SoT: `Glicogenose Resumo Médico Executivo.md` · “Visão geral” · “Mais de 20 tipos e subtipos são reconhecidos.”  
   Estado: `observed` (síntese da literatura consolidada na SoT).  
   Limitação: nomenclatura histórica não é uniforme; “mais de 20” não é censo fechado.

2. **`met-market-001` — receita farmacêutica observada Pompe (2024)**  
   Valor: ≈ €1,4 bilhão (`displayValue`; base documental ≈ €1,403 bi = Sanofi €1,338 bi + Amicus convertida).  
   SoT: `Glicogenose Estudo Socioeconômico Mercadológico.md` · “1.2 O mercado farmacêutico realizado está concentrado em Pompe”.  
   Estado: `observed`. Moeda `EUR`, `priceYear` 2024.  
   **Nunca** rotular como TAM/SAM/SOM.

3. **`met-datasus-001` — AIHs E74.0**  
   Valor: `997`, unidade **`AIHs`**.  
   Período: jan/2020–maio/2026. Geografia: Brasil (SIH/SUS).  
   SoT: Estudo · Brasil / SIH (“997 AIHs com diagnóstico principal E74.0”).  
   Estado: `proxy` (utilização hospitalar, não epidemiologia).  
   Limitação permanente: AIH ≠ paciente único; E74.0 não distingue tipos.

4. **`met-mcardle-001` — atraso diagnóstico mediano McArdle**  
   Valor: `29`, unidade `anos` (mediana).  
   SoT: Estudo · 1.1 / seção McArdle (“atraso diagnóstico mediano de 29 anos”).  
   Estado: `observed` no estudo específico; escopo restrito a McArdle e à população do estudo.  
   Limitação: não generalizar a todas as GSDs.

### Ajustes de schema em relação ao doc 03

- `Source.authorsOrInstitution` permanece `string[]`.
- Fontes da Home usam `sourceType: 'project-report'` + `localSotFile` (SoTs imutáveis); não inventar DOIs/URLs externas além do que a SoT já identifica no texto.
- Loader da Home rejeita claims com `approvedForPublication: false` e valida relações e regras DATASUS/TAM.

## Consequências

- Componentes da Home recebem apenas registros resolvidos pelo loader.
- Fixtures do Design System continuam isoladas e rotuladas.
- Páginas analíticas futuras reutilizarão a mesma camada sem republicar números soltos.
