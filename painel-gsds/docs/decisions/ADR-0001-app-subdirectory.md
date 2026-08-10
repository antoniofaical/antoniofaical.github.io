---
title: 'App sob monorepo de pesquisa'
status: accepted
date: 2026-08-10
---

# ADR-0001 — Localização do app em `painel-gsds/`

## Contexto

O repositório `glicogenose` já contém análises DATASUS, pesquisas e artefatos Python. Reinicializar Astro na raiz sobrescreveria ou misturaria escopos.

## Decisão

Criar o site em `painel-gsds/` na raiz do repositório existente, preservando arquivos preexistentes.

## Consequências

- Workflows em `painel-gsds/.github/` só passam a ser lidos pelo GitHub se este diretório for o root do repositório Pages, ou se forem espelhados no `.github` do monorepo.
- Imports e `base` permanecem relativos ao app.
