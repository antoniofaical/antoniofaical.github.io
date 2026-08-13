# Critérios de aceite

**Versão:** 0.3

## 1. Gates globais

Uma alteração só é concluída quando:

- escopo e SoTs foram respeitados;
- fontes, claims e métricas resolvem;
- ausência/limitação estão explícitas;
- funciona em 320, 375, 768 e 1440 px;
- teclado, foco, reduced motion e alternativas foram validados;
- não há overflow horizontal;
- URLs funcionam com `/` e `/painel-gsds/`;
- `format:check`, lint, typecheck, unit, build e e2e passam;
- screenshots foram revisados;
- não houve regressão material de performance;
- report final e hashes foram entregues.

## 2. Definition of Done por dado

Um registro publicável possui:

- ID estável;
- schema válido;
- fonte e localizador;
- escopo e data;
- estado de evidência;
- limitações;
- revisão humana quando aplicável;
- nenhuma informação privada/proprietária indevida.

## 3. Iteração 3 — Bases clínicas

- rota e portal da Home funcionam;
- narrativa começa por mecanismo, não taxonomia;
- padrões clínicos são contínuos;
- classificação mínima está presente;
- nomenclatura histórica é explicada;
- matriz de órgãos distingue não descrito de ausência;
- epidemiologia não mistura medidas;
- fluxo diagnóstico é educativo;
- manejo não extrapola entre GSDs;
- terapia emergente é datada e qualificada;
- aviso médico e fontes estão visíveis;
- nenhuma empresa aparece.

## 4. Iteração 4 — Impacto socioeconômico

- carga conserva subtipo, população e denominador;
- paciente, cuidador, sistema e pagador são distinguíveis;
- custos exibem país, perspectiva, moeda, ano e período;
- receita observada não é TAM;
- dimensionamento monetário, populacional e conceitual são separados;
- `não calculável` não aparece como zero;
- DATASUS explicita AIH ≠ paciente e local da internação;
- Brasil não recebe denominador inventado;
- lacuna não é automaticamente oportunidade comercial;
- nenhuma empresa aparece.

## 5. Iteração 5 — Observatório MVP

### 5.1 Cobertura

- página declara fonte, busca, data e não exaustividade;
- quatro resultados CB Insights não são denominados universo global;
- contadores distinguem descoberto, único, validado, pendente e excluído;
- filtros Brasil/global e direta/adjacente não duplicam registros.

### 5.2 Dados

- organização, relevância, produto, claim, evidência, observação e revisão são separados;
- status CB Insights não substitui validação do projeto;
- estágio de produto tem data/fonte;
- dados ausentes não são preenchidos;
- campos sensíveis/proprietários são excluídos da camada pública;
- GlycoGenesys não é validada apenas pelo nome;
- candidatos não publicados não entram nos totais validados.

### 5.3 Interface

- cards e fichas funcionam com poucos registros;
- filtros sem variância não poluem a interface;
- comparação 3 desktop/2 mobile;
- URL preserva filtros;
- estado sem resultados é explicativo;
- visualizações quantitativas obedecem limiares de densidade;
- fonte, revisão e completude são acessíveis.

## 6. Pipeline mensal

- catálogo de fontes versionado;
- cada execução registra query, data, cobertura e erros;
- reconciliação é reproduzível;
- snapshots são imutáveis e checksummed;
- último snapshot válido não é substituído em falha;
- mudança entre snapshots gera changelog;
- nenhum candidato é publicado sem revisão;
- logs não contêm credenciais.

## 7. Gates técnicos

```text
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
SITE_URL=... BASE_PATH=/ npm run build
SITE_URL=... BASE_PATH=/painel-gsds/ npm run build
npm run test:e2e
```

Dependência nova, mudança de schema ou migração exige teste negativo e ADR quando estrutural.

## 8. Acessibilidade

- WCAG 2.2 AA;
- axe sem violações críticas/sérias;
- headings e landmarks corretos;
- leitor de tela entende estado/fonte;
- filtros anunciam resultado;
- gráficos têm equivalentes;
- drawer/modal trata Escape, trap e retorno de foco;
- toque ≥ 44×44 px.

## 9. Performance

- Home preserva orçamento;
- páginas editoriais não hidratam sem necessidade;
- observatório usa JSON público enxuto;
- LCP/CLS/INP monitorados;
- nenhuma fonte/logo remoto bloqueia render;
- bundles adicionais são reportados.

## 10. Aceite documental

- documentação vigente e código não divergem;
- instruções históricas preservadas;
- SoTs sem diff;
- ADRs registram divergências;
- report final permite auditoria sem ler todo o chat.
