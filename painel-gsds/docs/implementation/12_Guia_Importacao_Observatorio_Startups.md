# Guia futuro de importação — Observatório de Startups

## Status

A ingestão de organizações **reais** ocorre na **Iteração 5B**. A 5A entrega apenas infraestrutura, snapshot vazio e fixtures sintéticas de teste.

## Fluxo previsto (não operacional na 5A; alvo da 5B)

1. Coleta externa / bot / planilha → staging fora de `src/` (ou fora do grafo de imports do app).
2. Revisão humana (aprovação, exclusão, pedidos de evidência).
3. Geração de **novo** arquivo imutável em `src/data/startups/published/snapshots/`.
4. Atualização de `published/current.json` para o novo `currentSnapshotId`.
5. `npm run data:validate` → CI → build Pages.

O registry público é montado por descoberta automática em build time dos JSON em `published/snapshots/`. Não é necessário editar o loader ao adicionar um snapshot novo.

## Regras

- Nunca editar in-place um snapshot já publicado.
- Nunca apontar o seletor para fixtures.
- Nunca importar CSVs brutos ou artefatos proprietários diretamente no bundle público.
- Contagens e UI devem continuar derivadas do snapshot, sem hardcode.

## Entidades ainda não implementadas

`ResearchRun`, `StartupCandidate` / `DiscoveryCandidate`, `SourceRun`, `ChangeSet`, fila `ReviewDecision` e staging operacional permanecem documentados (ADR-0003 / ADR-0005) e fora do app estático.
