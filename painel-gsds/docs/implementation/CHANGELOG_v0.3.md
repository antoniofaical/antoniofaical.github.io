# Changelog — Implementation Package v0.3

## Contexto

O pacote anterior foi criado para a fundação. Desde então foram implementadas as Iterações 1, 1.1, 2 e 2.1; consolidaram-se as SoTs médica e socioeconômica; e foi produzido um primeiro mapeamento no Advanced Company Search do CB Insights.

## Mudanças

- estado implementado passa a ser fonte explícita;
- Home registrada com 2 fontes, 6 claims e 4 métricas;
- Design System atualizado de v0.2 para v0.3;
- páginas clínica e socioeconômica especificadas com dados reais;
- inovação deixa de ser “reserva” e vira observatório longitudinal;
- Brasil/global e direta/adjacente viram filtros da mesma base;
- `Startup` é decomposta em organização, relevância, produto, claim, evidência, observação e revisão;
- pipeline mensal e snapshots são definidos;
- cobertura é separada de contagem;
- visualizações dependem de densidade;
- critérios de aceite passam a cobrir Iterações 3–5;
- regras de Cursor incorporam checkpoint a cada 15 minutos;
- instrução da Iteração 1 é arquivada sem alteração;
- ADR-0001 e ADR-0002 são preservadas;
- ADR-0003 é proposta para o observatório.

## Limitações declaradas

- quatro resultados CB Insights não são censo global;
- taxonomia e protocolo mensal ainda exigem aprovação da equipe;
- lista final de 50–100 fontes não foi definida;
- backend/interface de curadoria continuam decisões futuras;
- classificações iniciais das quatro organizações são hipóteses pendentes de revisão.

## Migração documental

Os documentos v0.1/v0.2 deixam de ser baseline operacional, mas permanecem históricos. SoTs científicas não foram modificadas.
