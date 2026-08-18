# Guia futuro de importação — Observatório de Startups

## Status

A ingestão de organizações **reais** ocorre a partir da **Iteração 5B**. A 5A entrega apenas infraestrutura, snapshot vazio e fixtures sintéticas de teste. A **5C** publica o snapshot cumulativo Brazil indirect + Global indirect main.

## Fluxo 5B (executado)

1. Pacote auditado fora de `src/` (hashes verificados; validadores 31/54/49).
2. Transformação determinística das **33** linhas da longlist → novo snapshot imutável.
3. Atualização de `published/current.json`.
4. `npm run data:validate` → CI → build Pages.

Não copiar CSV bruto, fila CB ou histórico para o bundle público. Classe C, unresolved e exclusões (ex.: Kidopi) permanecem fora da projeção.

## Fluxo 5C (executado)

1. Pacote Global auditado `gsd_indirect_scouting-integrity-fixed-pre5C-v2.zip` (SHA-256 `817f0fa…58c5e`) fora do repositório.
2. Transformação determinística das **60** entradas main → novo snapshot cumulativo imutável, preservando o snapshot Brazil 5B.
3. Dedupe explícita Saventic (`GSDI-002` → `org-gsd-br-002`); nenhuma outra fusão.
4. Atualização de `published/current.json` para `snap-indirect-cumulative-2026-08-18`.
5. `npm run data:validate` → gates → ZIP de auditoria (sem commit nesta etapa Cloud).

Não copiar MD/CSV bruto do scouting Global. Manual review, excluded e withdrawn permanecem fora da projeção. Não ingerir `gsd_direct_global_scouting` nesta etapa.

## Fluxo previsto (continua para enriquecimentos futuros)

1. Coleta externa / bot / planilha → staging fora de `src/` (ou fora do grafo de imports do app).
2. Revisão humana (aprovação, exclusão, pedidos de evidência).
3. Geração de **novo** arquivo imutável em `src/data/startups/published/snapshots/`.
4. Atualização de `published/current.json` para o novo `currentSnapshotId`.
5. `npm run data:validate` → CI → build Pages.

O registry público é montado por descoberta automática em build time dos JSON em `published/snapshots/`. Não é necessário editar o loader ao adicionar um snapshot novo.

## Regras

- Nunca editar in-place um snapshot já publicado.
- Nunca apontar o seletor para fixtures.
- Nunca importar CSVs/MDs brutos ou artefatos proprietários diretamente no bundle público.
- Contagens e UI devem continuar derivadas do snapshot, sem hardcode.

## Entidades ainda não implementadas

`ResearchRun`, `StartupCandidate` / `DiscoveryCandidate`, `SourceRun`, `ChangeSet`, fila `ReviewDecision` e staging operacional permanecem documentados (ADR-0003 / ADR-0005) e fora do app estático.
