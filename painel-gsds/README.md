# Painel Global de Inovação em Glicogenoses

Dashboard público em Astro + TypeScript estrito, hospedado no Netlify sob
`https://antoniofaical.dev.br/gsd/`.

O Observatório de startups é uma ilha React carregada no navegador. Ela consulta a API pública
`https://api.antoniofaical.dev.br/v1/observatory/current` e valida a resposta com Zod antes de
renderizar. Dados editoriais de organizações e snapshots não ficam no bundle do dashboard.

## Setup

```bash
cd painel-gsds
npm install
npm run dev
```

## Comandos

| Comando                | Função              |
| ---------------------- | ------------------- |
| `npm run dev`          | servidor local      |
| `npm run build`        | build estático      |
| `npm run preview`      | preview do `dist/`  |
| `npm run lint`         | ESLint              |
| `npm run format:check` | Prettier            |
| `npm run typecheck`    | Astro check + `tsc` |
| `npm run test`         | Vitest              |
| `npm run test:e2e`     | Playwright          |
| `npm run ci`           | pipeline local      |

## Build e publicação

`site` e `base` são parametrizáveis:

```bash
SITE_URL=https://antoniofaical.dev.br BASE_PATH=/gsd/ npm run build
```

`PUBLIC_GSD_API_BASE_URL` é opcional; o padrão é `https://api.antoniofaical.dev.br`.
O padrão local de `BASE_PATH` é `/`.

## Documentação

- SoTs: `docs/source-of-truth/` (imutáveis)
- Pacote: `docs/implementation/`
- Regras: `AGENTS.md`

## Responsabilidade pelos dados

- Schemas e apresentação: este repositório.
- Snapshots publicados, migrações, seeds e API: `antoniofaical/gsd-data-platform`.
- Fixtures sintéticas: `tests/fixtures/startups/`, usadas somente em testes.
