---
title: 'Observatório longitudinal de startups'
status: accepted
date: 2026-08-12
updated: 2026-08-14
---

# ADR-0003 — Observatório longitudinal de startups

## Contexto

O projeto precisa apresentar organizações diretamente relacionadas às GSDs e tecnologias adjacentes, em recortes global e Brasil. A equipe pretende, no futuro, monitorar periodicamente fontes confiáveis fora do site público.

## Decisão

Construir uma base única e longitudinal de organizações, produtos, alegações, evidências, observações e revisões. Direta/adjacente e Brasil/global serão classificações/filtros, não bases duplicadas.

Fronteira de publicação (aceita na Iteração 5A; detalhada em ADR-0005):

- ingestão e curadoria ocorrem fora do site público;
- o GitHub Pages consome snapshots JSON validados selecionados por manifesto explícito;
- candidatos, staging, `ResearchRun` e `ChangeSet` não entram automaticamente na publicação;
- snapshots publicados são imutáveis; republicação = novo artefato + troca do seletor;
- produtos/programas conservam estágio e data próprios;
- visualizações só aparecem quando densidade e cobertura as sustentarem.

Ainda futuros (não operacionais na 5A):

- pipeline mensal automatizado e catálogo de 50–100 fontes;
- ingestão de seeds externos (ex.: buscas proprietárias);
- contadores de funil de descoberta/reconciliação distintos da projeção pública;
- migração eventual para banco/API sem alterar o modelo conceitual.

## Consequências

- o site permanece estático, barato e auditável;
- atualizações exigem revisão humana e novo snapshot;
- a entidade `Startup` sozinha é insuficiente — usa-se `Organization`;
- o observatório não é ranking, censo, due diligence ou recomendação de investimento.

## Estado

`accepted` na Iteração 5A para a fronteira `PublishedSnapshot ↔` staging/pipeline futuro. Protocolo mensal completo e população com dados reais permanecem pendentes (5B+).
