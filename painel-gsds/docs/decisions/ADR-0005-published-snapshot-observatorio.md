---
title: 'PublishedSnapshot estático, rota /inovacao/startups/ e vocabulário Organization'
status: accepted
date: 2026-08-14
---

# ADR-0005 — Fundação pública do Observatório (Iteração 5A)

## Contexto

A auditoria pré-5A (`AUDITORIA_PRE_ITERACAO_5A.md`) e o pacote v0.3 exigiam uma projeção pública do observatório sem pipeline operacional, sem startups reais e sem colisão com `Source`/`Claim` editoriais. A documentação de AI já apontava a rota `/inovacao/startups/`.

## Decisão

1. **Rota canônica:** `/inovacao/startups/` (com `withBase` / `BASE_PATH`). Não criar `/startups/` nem fichas `/inovacao/startups/{slug}/` vazias nesta iteração; o detalhe usa drawer acessível e reserva o contrato de slug para 5B+.
2. **Vocabulário:** identidade persistente `Organization` (`PublishedOrganization`); “startup” permanece rótulo editorial da seção.
3. **Namespacing:** schemas/tipos do domínio usam prefixos `Startup*` / `Published*` / IDs `org-`, `rel-`, `prd-`, `sps-`, `snap-`, evitando colisão com `src/schemas/source.ts` e `claim.ts`.
4. **Fronteira de publicação:** o app público lê **somente** `src/data/startups/published/current.json` → snapshot imutável em `published/snapshots/`. O seletor não duplica o corpo do snapshot. O loader descobre automaticamente, em build time, todos os JSON publicados (`import.meta.glob`) e os indexa pelo `id` interno — sem registry manual. Fixtures ficam em `tests/fixtures/startups/` e fora do glob de produção. A Iteração 5B adiciona o snapshot real `snap-brazil-indirect-2026-08-14` sem editar o snapshot vazio inicial. A Iteração 5C adiciona o snapshot cumulativo `snap-indirect-cumulative-2026-08-18` (Brazil + Global indirect main) sem editar os históricos.
5. **Modelo unificado:** uma organização, múltiplas `PublishedGSDRelevanceAssessment` (relação + geografia). Sem bases duplicadas direta/Brasil.
6. **Fora do escopo 5A (documentado, não implementado):** `ResearchRun`, candidatos, staging, `ChangeSet`, bot mensal, CB Insights, backend. Falha futura do bot não pode editar snapshots já publicados nem substituir silenciosamente o último seletor válido.

## Consequências

- dashboard e contagens derivam do snapshot selecionado;
- base vazia com `coverage.status = not-yet-populated` é válida e semanticamente distinta de “busca sem resultados”;
- ADR-0003 permanece a referência longitudinal; esta ADR aceita a fronteira pública entregue na 5A;
- ingestão real ocorre apenas na 5B via novo snapshot + atualização do seletor;
- a 5C estende a fronteira com snapshot cumulativo e dedupe editorial explícita (Saventic), sem mutar históricos.
