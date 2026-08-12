# Status quo e divergências reconciliadas

**Data de corte:** 2026-08-12

## 1. Estado implementado reconhecido

- Astro/React/TypeScript em `painel-gsds/`;
- hub mínimo na raiz;
- workflows GitHub Pages na raiz do repositório;
- fontes Inter/Manrope WOFF2 locais;
- Design System interno em `/design-system/`;
- Home executiva em `/` do app;
- camada `source → claim → metric`;
- 2 fontes internas, 6 claims e 4 métricas;
- acessibilidade do menu e e2e;
- `.gitattributes` LF;
- deploy em `/painel-gsds/`.

## 2. Decisões preservadas

- ADR-0001: app em subdiretório;
- ADR-0002: conteúdo/evidência da Home;
- instrução da Iteração 1: arquivo histórico.

## 3. Divergências documentais

### 3.1 ADR-0002

O texto da decisão menciona “cinco alegações”, mas a implementação e sua matriz utilizam seis IDs:

```text
clm-clinical-001
clm-clinical-002
clm-socio-001
clm-market-001
clm-brasil-001
clm-socio-002
```

O v0.3 adota o estado implementado de seis claims. A ADR histórica não é reescrita.

### 3.2 ADR-0001 e workflows

A ADR registra que workflows dentro do app não seriam lidos pelo repositório pai. A Iteração 1.1 resolveu isso movendo-os para `.github/workflows/` na raiz. A consequência histórica permanece correta; o status atual é o workflow na raiz.

### 3.3 Design System original/v0.2

O Design System original especifica detalhadamente a página clínica. O v0.2 consolida fundamentos e socioeconomia. O v0.3 é a baseline vigente e consulta os anteriores somente quando não houver conflito.

## 4. Conteúdo disponível

- resumo médico: suficiente para Iteração 3, com regra de não inferência;
- estudo socioeconômico: suficiente para Iteração 4;
- CSV CB Insights: quatro resultados e 75 colunas; suficiente como seed e disclosure do Observatório, não como censo global;
- mapeamentos Brasil/indiretos: serão incorporados por novos snapshots quando validados.

## 5. Não autorizado por este pacote

- alterar SoTs;
- considerar quatro resultados como total global;
- publicar hipótese de curadoria como fato;
- ativar ingestão automática sem protocolo aprovado;
- introduzir backend sem ADR;
- apagar decisões históricas.

> Nota de integração (2026-08-12): ADRs permanecem em `docs/decisions/` (não em `docs/implementation/decisions/`). O MANIFEST.sha256 preserva a autenticidade do pacote; validar ADRs pelos arquivos em `../decisions/`.
