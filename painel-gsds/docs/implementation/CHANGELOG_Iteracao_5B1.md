# CHANGELOG — Iteração 5B.1 (microcorreção pós-auditoria)

**Data de referência:** 2026-08-17  
**Escopo:** harness Playwright dual-`BASE_PATH` + empacotamento path-faithful do ZIP de auditoria.  
**Não altera:** snapshot 5B, `current.json`, `initial-empty.json`, SoTs, dados/fontes ou UI de produção.

## Correções

1. **E2E nos dois `BASE_PATH`**
   - `playwright.config.ts` lê `BASE_PATH` do ambiente, normaliza com `/` inicial e final, propaga ao `webServer`/`build`/`preview` e define `baseURL` com o mesmo prefixo.
   - Specs navegando com caminhos relativos (`./…`) para não descartar `/painel-gsds/`.
   - `reuseExistingServer: false` para impedir falso verde por servidor de outro prefixo.
   - Asserção negativa no cenário `/painel-gsds/`: URL deve conter `/painel-gsds/inovacao/startups/`.
   - Runs obrigatórios e separados: `BASE_PATH=/` e `BASE_PATH=/painel-gsds/` (cada um 30 PASS).

2. **ZIP de auditoria path-faithful**
   - Empacotamento temporário (fora do repositório) preserva filenames UTF-8 canônicos dos SoTs (sem `#U00…`) e o symlink `painel-gsds/CLAUDE.md` → `AGENTS.md`.

## Não incluído

- Qualquer regeneração ou edição do snapshot 5B.
- Commit, push, PR, merge ou deploy (parada para auditoria humana).
