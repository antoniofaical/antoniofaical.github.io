---
title: 'Páginas analíticas clínicas e socioeconômicas'
status: accepted
date: 2026-08-12
---

# ADR-0004 — Iterações 3 e 4: análises clínicas e socioeconômicas

## Contexto

O pacote v0.3 define a documentação vigente e a matriz das páginas `/analises/bases-clinicas/` e `/analises/impacto-socioeconomico/`. A Home e a camada `source → claim → metric` já existem. O observatório de startups (ADR-0003) permanece futuro.

## Decisão

1. Integrar documentação v0.3 em `docs/implementation/`, arquivando v0.2 em `docs/implementation/archive/`.
2. Preservar ADR-0001/0002; adicionar ADR-0003 como proposta futura.
3. Estender schemas/loaders sem quebrar IDs da Home.
4. Publicar as duas rotas analíticas com dados tipados derivados apenas das SoTs.
5. Habilitar portais/navegação para essas rotas; manter inovação/startups como “Em desenvolvimento”.

## Consequências

- Home permanece estável; apenas links/portais mudam.
- Componentes analíticos são sóbrios e editoriais.
- Sem entidades Startup, CSV, DB ou pipeline nesta rodada.
