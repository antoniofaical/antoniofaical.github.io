# ADR-0006 — API de runtime para o Observatório

## Status

Aceita em 2026-09-24. Substitui a fronteira de publicação local definida na ADR-0005.

## Decisão

O dashboard deixa de empacotar o seletor e os snapshots publicados. O repositório
`antoniofaical/gsd-data-platform` passa a ser responsável por PostgreSQL, migrações, seeds,
seleção corrente e API pública somente leitura.

O Astro permanece estático. A página do Observatório monta uma ilha React que consulta o snapshot
corrente em runtime, valida a resposta com o schema Zod compartilhado pelo frontend e renderiza
estados explícitos de carregamento, falha com retry, vazio e pronto.

## Consequências

- Atualizações de dados compatíveis não exigem rebuild do dashboard.
- Dados reais de organizações deixam de existir no repositório e no bundle do frontend.
- O endpoint público, HTTPS, CORS e disponibilidade da API tornam-se dependências operacionais.
- Fixtures sintéticas continuam locais para testes determinísticos de interface e contrato.
- A validação de snapshots reais e da importação passa a ocorrer no repositório de dados.
