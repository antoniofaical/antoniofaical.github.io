# Changelog — Iteração 5D / 5D.1 (28 players diretos GSD)

## FATOS IMPORTADOS

- Fonte autoritativa: `gsd_direct_dashboard_handoff_final.zip` (24 946 bytes; SHA-256 `bb3e358d0e9f4b6f6a7a4773875dba0029c6173cb06f42395adea556f9f90606`).
- Payload mínimo `GSD_DIRECT_DASHBOARD_MINIMAL.csv` (SHA-256 `1EC98BAE…20ABAF`): exatamente `GSD-DIR-001`–`028`.
- QA handoff: PASS (2026-08-24); 13 current / 4 uncertain / 11 historical.
- Snapshot `snap-ecosystem-cumulative-direct-2026-08-24` (corrigido em 5D.1):
  - 120 organizations / 121 assessments / **217 publicSources** / 0 products
  - directGsd 28 · adjacent 82 · unconfirmed 11 · brazil 33 · global 88
  - 28 direct `evidenceRefs = []` (sem fontes sintéticas)
  - checksum `4e72dfe49fce8b06ac8ad1379cf7cc9dc83943b56d969b15693d6bacbd3fe75c`
  - `generatedAt`/`publishedAt`/`selectedAt` = `2026-08-24T14:10:00.000Z`

## TRANSFORMAÇÕES DETERMINÍSTICAS

- Cross-dedupe vs 92 orgs indiretas: 0 matches → 28 `org-gsd-dir-NNN` novas + 28 `rel-gsd-dir-NNN`.
- `relationship=direct-gsd`, `geographicScopes=["global"]`, `confidence=not-assigned`.
- `directContext` preserva `organizationStatus`, `currentGsdActivity`, `assetRole`, indicação, ativo, modalidade, estágio.
- `HISTORICAL_OWNER` → `historical-owner` (Maze/Valerion); Kriya permanece `historical-association-ownership-unverified`.
- `organization_status` → `operationalStatus` sem overclaim:
  - `PRIVATE_STARTUP` → `private`
  - `PUBLIC_BIOTECH_REVIEW` → `public`
  - `ACQUIRED_OR_INACTIVE` → `acquired-or-inactive`
  - `IDENTITY_UNRESOLVED` → `identity-unresolved`
- `OUTLICENSED` → label público `Licenciado a terceiro`.
- Website/HQ/founded omitidos quando vazios; websites institucionais **não** viram evidência `supports`.
- Tokens `GSD-DIR-*` e linguagem de pipeline scrubados da copy pública.

## Correção 5D.1 (pós-auditoria)

- Removidas 28 `publicSources` artificiais da 5D; mantidas as 217 fontes reais da 5C.
- Assessments diretos publicáveis com `evidenceRefs` vazios; indiretos continuam exigindo ≥1.
- Organizações exclusivamente diretas podem não ter fonte pública vinculada.
- Copy pública sem IDs/protocolo/pipeline/provenance técnica; site institucional fora da seção de evidências.

## DECISÕES DE PUBLICAÇÃO

- Snapshots históricos 5B/5C/empty byte-identical; `previousSnapshotId` = 5C.
- UI mínima: badge/filtro “Direta às GSDs”; drawer mostra contexto direto; badge de confiança omitido quando `not-assigned`.
- Sem AdRes como organização (não é um dos 28).

## LIMITAÇÕES / PENDÊNCIAS

- Confiança direta não atribuída.
- Ativos/programas não modelados como entidades estruturadas.
- Alguns websites/HQ/anos ausentes no payload.
- Alguns registros diretos sem fonte pública vinculada nesta versão.
- Associação histórica ≠ titularidade automática (exceção Kriya).
