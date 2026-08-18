# Changelog — Iteração 5B (Primeiro snapshot real)

## Fatos importados

- 33 organizações da longlist `GSD_Brazil_Startup_Longlist.csv` (SHA-256 `e8e5c01c…52cdec`) do pacote auditado `gsd_indirect_scouting_brazil_csv_integrity_fix_2026-08-14.zip` (SHA-256 `6cb8b880…ee541d`).
- Campos projetados literalmente ou por síntese mecânica: nome, aliases, website, capacidade/contexto, PAGs, tipo de relação, confiança, fontes URL, rationale.
- Revisão editorial do baseline: `2026-08-13`.

## Transformações determinísticas

- `GSD-BR-NNN` → `org-gsd-br-nnn` / `rel-gsd-br-nnn` / `sps-gsd-br-nnn-xx`.
- `Adjacent solution` → `adjacent-gsd` (22); `Adaptation hypothesis` → `relevance-unconfirmed` (11).
- Geografia pública: somente `brazil` (33); `global` = 0.
- Confiança: High→high (7), Medium→medium (26).
- Status: `apparently-active` (não `active`).
- `organizationType: unconfirmed`.
- Slugs normalizados; checksum SHA-256 canônico do corpo do snapshot (excluindo o próprio campo).

## Decisões de publicação

- `productsOrPrograms: []` — capacidade não vira produto nominal.
- `coverage.status: limited` com limitações visíveis na UI.
- Headquarters só quando o CSV traz país inequívoco (`Brazil`/`Brasil`); demais HQ omitidos.
- `foundedYear` só com ano exato de 4 dígitos; `unknown`/`~`/vazio omitidos.
- `publisher` opcional em fontes que não são o site oficial.
- CSV bruto, fila CB, histórico, Classe C, unresolved e Kidopi (`GSD-BR-024`) fora do bundle público.

## Pendências

- Validação CB Insights das 33.
- Filtro etário.
- Mapeamento direto global.
- Modelagem futura de produtos/programas e enriquecimento sem inferência indevida.
