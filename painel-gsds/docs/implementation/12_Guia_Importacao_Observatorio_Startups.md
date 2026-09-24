# Guia de publicação — Observatório de Startups

Dados reais não são importados neste repositório.

## Fluxo

1. Preparar ou revisar o seed versionado em `antoniofaical/gsd-data-platform`.
2. Executar os testes de schema e importação nesse repositório.
3. Importar o snapshot no PostgreSQL.
4. Validar `observatory.validate_snapshot(...)`.
5. Selecionar o snapshot corrente.
6. Executar os testes de contrato e paridade da API.
7. Verificar `GET https://api.antoniofaical.dev.br/v1/observatory/current`.
8. Abrir o dashboard e confirmar a renderização.

O dashboard não precisa ser reconstruído para uma troca de snapshot compatível com o schema
publicado.
