# Changelog — Iteração 5C (Snapshot cumulativo Brazil + Global indirect)

## FATOS

- Fonte autoritativa Global: `gsd_indirect_scouting-integrity-fixed-pre5C-v2.zip` (89 539 bytes; SHA-256 `817f0fa65e970079b111e98c75a3eeca883a56f8bf284301dfb1bff92fa58c5e`).
- Validador fonte: QA PASS (`main=60`, `manual=6`, `excluded=2`, `withdrawn=4`).
- Snapshot cumulativo `snap-indirect-cumulative-2026-08-18` (`indirect-cumulative-2026-08-18.json`):
  - checksum `6704943f803a1b3a23fa3adfca424ea77cdf89e07ab05daafa8cbd9ee0ba0663`
  - `generatedAt` / `publishedAt` / `selectedAt` = `2026-08-18T12:37:11.000Z`
  - 92 organizations / 93 relevanceAssessments / 217 publicSources / 0 products
  - assessments: adjacent 82, relevance-unconfirmed 11, brazil 33, global 60
- Snapshots históricos preservados byte a byte:
  - `brazil-indirect-2026-08-14.json` → `9abc630a91df0f4adbfaae8b1e1bb108fa5d06aa8a0bc654ada3c195e68192f6`
  - `initial-empty.json` → `dfd58ea625a49825c402e7f61bafd52f29bd48d62cb9bbf9a22a5031f79aea81`

## TRANSFORMAÇÕES MECÂNICAS

- Publicação somente das 60 entradas main; manual/excluded/withdrawn fora do bundle público.
- `GSDI-NNN` → `org-gsdi-NNN` / `rel-gsdi-NNN` / `sps-gsdi-NNN-XX`, exceto Saventic.
- Dedupe explícita: `GSDI-002` → `org-gsd-br-002` (organização Brazil preservada) + nova `rel-gsdi-002` com `geographicScopes: ["global"]`.
- `Adjacent solution` → `adjacent-gsd`; confiança High/Medium → high/medium (46/14 no Global).
- Sources: 176 novas após collapse Mirae www/non-www e reuso de `sps-gsd-br-002-02` para `saventic.com`; `accessedAt=2026-08-12`.
- `organizationType: unconfirmed`; `operationalStatus: apparently-active`; `businessModels: []`; HQ Global não estruturado.
- `foundedYear` somente quando `^\d{4}$` (35 nos 59 novos orgs).
- ThinkGenetic (`GSDI-003`): sem website; CheckRare apenas como evidência/`other`.

## DECISÕES DE PUBLICAÇÃO

- `coverage.status: partial` com limitações listando ausência do Global direct, CB Insights pendente, staging Global não público, HQ Global não estruturado e Saventic dual-assessment.
- `current.json` aponta para o snapshot cumulativo; Brazil 5B permanece carregável por id.
- Lineage explícita em `globalIndirectLineage.ts`; `brazilIndirectLineage.ts` inalterado.
- Nenhuma outra fusão organizacional além de Saventic.

## LIMITAÇÕES / PENDÊNCIAS

- `gsd_direct_global_scouting` ainda não integra o Observatório.
- CB Insights pendente no Global indirect; CB Insights e filtro etário pendentes no Brazil indirect.
- 6 entradas Global em manual review; excluded/withdrawn Global não públicos.
- Produtos/programas não modelados separadamente.
- Headquarters Global não estruturados nesta ingestão.
- Adjacent solution ≠ solução GSD-direta nem evidência de eficácia clínica.
