# Changelog — Iteração 5A (Fundação do Observatório)

## Entregue

- Contrato Zod namespaced + taxonomias controladas.
- `published/current.json` + snapshot imutável vazio `snap-initial-empty-2026-08-14`.
- Loader/consulta/estatísticas; `npm run data:validate` no CI.
- Rota `/inovacao/startups/` com estado vazio intencional.
- Navegação única (`SITE_NAV_ITEMS`) incluindo Observatório; portal honesto na Home.
- Explorer (busca/filtros/ordenação/resumo/cards/detalhe) hidratado só quando houver organizações.
- Fixtures sintéticas isoladas em `tests/fixtures/startups/` + teste negativo de ausência no `dist`.
- ADR-0005; ADR-0003 → `accepted` para a fronteira pública; docs de contrato/taxonomia/importação.

## Explicitamente fora

- Startups reais; pesquisa externa; backend; pipeline mensal; `ResearchRun`/candidatos/staging/`ChangeSet`.

## Microcorreção 5A.1

- Registry de snapshots publicados passou a descoberta automática em build time (`import.meta.glob` em `published/snapshots/`).
- `MANIFEST.sha256` regenerado com hashes atuais e caminhos verificáveis `../decisions/...` para os ADRs.

## Pendências 5B

- Popular novo snapshot com organizações curadas.
- Opcionalmente fichas `/inovacao/startups/{slug}/`.
- Protocolo mensal operacional fora do site.
