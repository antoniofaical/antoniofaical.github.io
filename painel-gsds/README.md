# Painel Global de Inovação em Glicogenoses

Fundação técnica e demonstração interna do Design System (Iteração 1).

## Escopo desta iteração

Inclui:

- Astro estático + TypeScript estrito + React (ilhas);
- tokens e componentes mínimos;
- página interna `/design-system/`;
- preservação das SoTs e do pacote de implementação.

Não inclui:

- Home final;
- páginas científicas;
- gráficos de dados reais;
- deploy.

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

## GitHub Pages

`site` e `base` são parametrizáveis:

```bash
SITE_URL=https://usuario.github.io BASE_PATH=/nome-do-repositorio/ npm run build
```

Padrão local: `SITE_URL=https://example.github.io`, `BASE_PATH=/`.

## Documentação

- SoTs: `docs/source-of-truth/` (imutáveis)
- Pacote: `docs/implementation/`
- Regras: `AGENTS.md`

## Pendências conhecidas

- Fontes Manrope/Inter ainda não hospedadas localmente (fallbacks ativos).
- Deploy Pages permanece desabilitado até aprovação.
