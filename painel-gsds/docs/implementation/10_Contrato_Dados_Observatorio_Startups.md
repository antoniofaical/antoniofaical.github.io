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

### Semântica de datas (5B)

- `lastReviewedAt` / `assessedAt`: data da Evidence QA do baseline (`2026-08-13`).
- `firstDiscoveredAt`: data do **primeiro registro no baseline público importado** (`2026-08-13`), não a descoberta histórica original da organização.
- `generatedAt` / `publishedAt` / `selectedAt`: instante UTC da geração/seleção da projeção 5B.

### Checksum (5B+)

Quando `checksum` ≠ `reserved-not-computed`, o valor deve ser o SHA-256 do JSON canônico do snapshot **excluindo** o próprio campo `checksum`. `npm run data:validate` verifica essa igualdade.

## `StartupPublishedSnapshot`

Campos mínimos: `id`, `schemaVersion`, `period`, `generatedAt`, `publishedAt`, `protocolVersion`, `previousSnapshotId?`, `coverage`, `counts`, `organizations`, `productsOrPrograms`, `relevanceAssessments`, `publicSources`, `checksum`.

- `checksum` na 5A é placeholder documentado (`reserved-not-computed`), não um digest calculado.
- `coverage.status = not-yet-populated` exige coleções vazias e comunica infraestrutura pronta sem censo.

## Contagens

`counts.*` deve coincidir com o derivado das coleções. Contagens zeradas no snapshot vazio descrevem o artefato, não “zero startups no mundo”.

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
