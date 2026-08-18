# Guia futuro de importação — Observatório de Startups

## Status

A ingestão de organizações **reais** ocorre na **Iteração 5B**. A 5A entrega apenas infraestrutura, snapshot vazio e fixtures sintéticas de teste.

## Fluxo 5B (executado)

1. Pacote auditado fora de `src/` (hashes verificados; validadores 31/54/49).
2. Transformação determinística das **33** linhas da longlist → novo snapshot imutável.
3. Atualização de `published/current.json`.
4. `npm run data:validate` → CI → build Pages.

Não copiar CSV bruto, fila CB ou histórico para o bundle público. Classe C, unresolved e exclusões (ex.: Kidopi) permanecem fora da projeção.

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
- Nunca importar CSVs brutos ou artefatos proprietários diretamente no bundle público.
- Contagens e UI devem continuar derivadas do snapshot, sem hardcode.

## Entidades ainda não implementadas

`ResearchRun`, `StartupCandidate` / `DiscoveryCandidate`, `SourceRun`, `ChangeSet`, fila `ReviewDecision` e staging operacional permanecem documentados (ADR-0003 / ADR-0005) e fora do app estático.
