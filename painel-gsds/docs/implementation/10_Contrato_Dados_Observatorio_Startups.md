# Contrato de dados — Observatório de Startups

## Fronteira de runtime

O dashboard consulta:

```text
GET https://api.antoniofaical.dev.br/v1/observatory/current
```

A API devolve o snapshot publicado corrente. O cliente verifica `response.ok`, desserializa JSON e
valida integralmente o payload com `startupPublishedSnapshotSchema`. Uma resposta inválida não é
renderizada como dado público.

## Responsabilidades

| Responsabilidade                                   | Local                                            |
| -------------------------------------------------- | ------------------------------------------------ |
| PostgreSQL, migrações, seeds e seleção corrente    | `antoniofaical/gsd-data-platform`                |
| API pública somente leitura                        | `antoniofaical/gsd-data-platform`                |
| Cliente HTTP e validação Zod                       | `src/lib/startups/startupApi.ts`                 |
| Estado de carregamento, erro, retry e renderização | `src/components/startups/StartupObservatory.tsx` |
| Taxonomias e rótulos de interface                  | `src/data/startups/taxonomies.ts`                |
| Fixtures sintéticas                                | `tests/fixtures/startups/`                       |

Não existem snapshots de produção nem seletor corrente em `src/data/startups/`.

## `StartupPublishedSnapshot`

Campos mínimos: `id`, `schemaVersion`, `period`, `generatedAt`, `publishedAt`,
`protocolVersion`, `previousSnapshotId?`, `coverage`, `counts`, `organizations`,
`productsOrPrograms`, `relevanceAssessments`, `publicSources`, `checksum`.

`counts.*` deve coincidir com o derivado das coleções. `coverage.status = not-yet-populated`
não pode conter organizações. Referências entre organizações, avaliações, produtos e fontes são
verificadas pelo schema.

## Cache e atualização

A API publica `ETag` e `Cache-Control`. O browser trata revalidação e cache. Quando o backend
seleciona um novo snapshot, visitantes passam a recebê-lo sem novo build ou deploy do dashboard.

## Configuração

`PUBLIC_GSD_API_BASE_URL` pode substituir a origem da API no build. Se ausente, o cliente usa
`https://api.antoniofaical.dev.br`.

## Testes

Testes unitários usam apenas fixtures sintéticas. A validação dos snapshots reais, da importação
relacional e da paridade da API pertence ao repositório de dados.
