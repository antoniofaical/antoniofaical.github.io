# Contrato de dados — Observatório de Startups (projeção pública)

## Escopo

Contrato da **projeção pública** consumida pelo site estático. Não cobre staging, candidatos, `ResearchRun` nem `ChangeSet`.

## Artefatos

| Artefato          | Caminho                                        | Papel                                            |
| ----------------- | ---------------------------------------------- | ------------------------------------------------ |
| Seletor corrente  | `src/data/startups/published/current.json`     | Apenas `currentSnapshotId`, `selectedAt`, `note` |
| Snapshot imutável | `src/data/startups/published/snapshots/*.json` | Corpo completo validado                          |
| Taxonomias        | `src/data/startups/taxonomies.ts`              | Enums + rótulos PT                               |
| Schemas           | `src/schemas/startups/*.ts`                    | Zod + tipos TypeScript                           |
| Fixtures          | `tests/fixtures/startups/`                     | Somente testes; nunca no registry de produção    |

## Resolução do snapshot corrente

O loader de produção descobre **automaticamente**, em build time, todos os JSON em `published/snapshots/` (via `import.meta.glob`) e indexa pelo `id` interno de cada snapshot. Não há registry manual por arquivo.

Publicar uma nova versão exige somente:

1. novo arquivo imutável em `published/snapshots/`;
2. atualização de `published/current.json` para o novo `currentSnapshotId`;
3. `npm run data:validate` e demais gates.

Fixtures sob `tests/fixtures/` ficam fora desse glob.

### Semântica de datas (5B / 5C)

- Brazil indirect (`snap-brazil-indirect-2026-08-14`): `lastReviewedAt` / `assessedAt` / `firstDiscoveredAt` = Evidence QA do baseline (`2026-08-13`); timestamps de geração 5B preservados no snapshot histórico.
- Global indirect (projeção 5C): `firstDiscoveredAt` / `lastReviewedAt` / `assessedAt` = `2026-08-12` (baseline do pacote Global auditado).
- Snapshot cumulativo 5C: `generatedAt` / `publishedAt` / `selectedAt` = instante UTC único da geração/seleção (`2026-08-18T12:37:11.000Z`).

### Checksum (5B+)

Quando `checksum` ≠ `reserved-not-computed`, o valor deve ser o SHA-256 do JSON canônico do snapshot **excluindo** o próprio campo `checksum`. `npm run data:validate` verifica essa igualdade.

## `StartupPublishedSnapshot`

Campos mínimos: `id`, `schemaVersion`, `period`, `generatedAt`, `publishedAt`, `protocolVersion`, `previousSnapshotId?`, `coverage`, `counts`, `organizations`, `productsOrPrograms`, `relevanceAssessments`, `publicSources`, `checksum`.

- `checksum` na 5A é placeholder documentado (`reserved-not-computed`), não um digest calculado.
- `coverage.status = not-yet-populated` exige coleções vazias e comunica infraestrutura pronta sem censo.
- A 5C publica `snap-indirect-cumulative-2026-08-18` (`coverage.status = partial`) preservando os snapshots históricos Brazil e empty.
- A 5D / 5D.1 publica `snap-ecosystem-cumulative-direct-2026-08-24` adicionando 28 assessments `direct-gsd` com `directContext` opcional (status da organização, atividade GSD e papel no ativo separados). Confidence pode ser `not-assigned`. Assessments `direct-gsd` podem ter `evidenceRefs = []` quando não há URL pública mapeável; assessments não-diretas continuam exigindo ≥1. Organizações exclusivamente diretas podem não vincular `publicSources`.

## Contagens

`counts.*` deve coincidir com o derivado das coleções. Contagens zeradas no snapshot vazio descrevem o artefato, não “zero startups no mundo”.

No snapshot cumulativo, `counts.adjacentGsd` / `counts.brazil` / `counts.global` / `counts.directGsd` são **por assessment**. A UI consolida por organização (Saventic conta em Brazil e Global), então facetas organizacionais podem somar acima do total de organizações.

### `directContext` (5D / 5D.1)

Campo opcional em `PublishedGSDRelevanceAssessment`, usado somente no mapeamento direto. Não colapsar `organizationStatus`, `currentGsdActivity` e `assetRole`. `HISTORICAL_OWNER` publica-se como `historical-owner` (Maze/Valerion); Kriya permanece `historical-association-ownership-unverified`. `OUTLICENSED` usa label público inequívoco (`Licenciado a terceiro`). Status operacional dos 28 não mapeia `ACQUIRED_OR_INACTIVE`→`acquired` nem `PRIVATE_STARTUP`→`apparently-active`.

## Validação

```bash
npm run data:validate
```

Falha com exit ≠ 0 se o seletor apontar para snapshot ausente/inválido ou se algum snapshot publicado violar o schema.

## Fronteira

```text
(futuro) bot/staging → revisão humana → PublishedSnapshot → build Astro → GitHub Pages
```

Na 5A apenas `PublishedSnapshot → dashboard` está implementado.
