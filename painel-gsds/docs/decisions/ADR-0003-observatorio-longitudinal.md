---
title: 'Observatório longitudinal de startups'
status: proposed
date: 2026-08-12
---

# ADR-0003 — Observatório longitudinal de startups

## Contexto

O projeto precisa apresentar startups diretamente relacionadas às GSDs e tecnologias adjacentes, em recortes global e Brasil. O primeiro Advanced Company Search do CB Insights recuperou quatro organizações, mas não constitui censo global. A equipe pretende monitorar mensalmente 50–100 fontes confiáveis.

## Decisão

Construir uma base única e longitudinal de organizações, produtos, alegações, evidências, observações e revisões. Direta/adjacente e Brasil/global serão classificações/filtros, não bases duplicadas.

No MVP:

- ingestão e curadoria ocorrem fora do site público;
- o GitHub Pages consome snapshots JSON validados;
- candidatos não entram automaticamente na publicação;
- o snapshot inicial declara cobertura limitada ao CB Insights;
- valores mutáveis são observações append-only;
- produtos/programas conservam estágio e data próprios;
- visualizações só aparecem quando densidade e cobertura as sustentarem.

## Consequências

- o site permanece estático, barato e auditável;
- atualizações mensais exigem pipeline e revisão humana;
- a entidade `Startup` sozinha é insuficiente;
- será possível migrar para banco/API sem alterar o modelo conceitual;
- contadores públicos distinguem descoberta, reconciliação, validação e exclusão;
- o observatório não é ranking, censo, due diligence ou recomendação de investimento.

## Estado

Proposta no v0.3. Deve tornar-se `accepted` quando a equipe aprovar taxonomia, protocolo de publicação e governança da atualização mensal.
