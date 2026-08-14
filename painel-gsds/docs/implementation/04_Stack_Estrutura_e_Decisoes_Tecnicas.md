# Stack, estrutura e decisões técnicas

**Versão:** 0.3  
**Estado:** arquitetura implementada + evolução das Iterações 3–5

## 1. Stack vigente

| Camada     | Escolha                                 |
| ---------- | --------------------------------------- |
| framework  | Astro, saída estática                   |
| linguagem  | TypeScript estrito                      |
| interação  | React somente em ilhas justificadas     |
| validação  | Zod                                     |
| estilos    | CSS variables e estilos Astro/autoriais |
| testes     | Vitest, Playwright, axe-core            |
| qualidade  | ESLint, Prettier, `.gitattributes` LF   |
| fontes     | Inter e Manrope WOFF2 locais, OFL       |
| deploy     | GitHub Actions → GitHub Pages           |
| hospedagem | `antoniofaical.github.io/painel-gsds/`  |

Não adicionar framework visual, CMS ou biblioteca de gráficos sem requisito concreto e ADR.

## 2. Princípio arquitetural

O conteúdo científico e o snapshot público do observatório são estáticos e versionáveis. A ingestão mensal acontece fora da navegação pública:

```text
fontes → candidatos → reconciliação → alegações/evidências
→ revisão humana → snapshot validado → build → deploy
```

Credenciais e consultas às fontes nunca rodam no navegador.

## 3. Estrutura alvo

```text
painel-gsds/
  docs/
    decisions/
    implementation/
    source-of-truth/
  public/
    fonts/
  src/
    components/
      clinical/
      socioeconomic/
      startups/
      evidence/
      executive/
      layout/
    data/
      core/
      clinical/
      socioeconomic/
      startups/
        current/
        snapshots/
        taxonomies/
    schemas/
      core/
      clinical/
      socioeconomic/
      startups/
    pages/
      analises/
      inovacao/startups/
    lib/
      data/
      evidence/
      filters/
      paths/
    styles/
  scripts/
    validate-data/
    build-snapshots/
  tests/
```

Adaptar incrementalmente; não mover arquivos existentes apenas por estética.

## 4. Conteúdo e dados

- SoTs ficam em `docs/source-of-truth/` e não são importadas diretamente em runtime.
- Dados públicos são JSON tipado derivado e revisado.
- Schemas validam no build e em testes.
- Alegações conservam localizadores e fontes.
- Arquivos brutos/proprietários do CB Insights não são publicados automaticamente.
- O dataset público expõe apenas campos necessários e permitidos.

## 5. Observatório longitudinal

### 5.1 MVP estático

```text
src/data/startups/published/current.json          # seletor apenas
src/data/startups/published/snapshots/*.json      # corpos imutáveis
tests/fixtures/startups/*.json                    # sintéticos de teste
```

O nome legado `startups-current.json` / `snapshot-manifest.json` da especificação v0.3 foi consolidado no par `current.json` + `snapshots/` (ADR-0005). O estado público deriva exclusivamente do snapshot selecionado; não editar snapshots publicados in-place. O loader descobre automaticamente, em build time, todos os JSON em `published/snapshots/` e os indexa pelo `id` interno — publicar um snapshot novo não exige editar o código do registry.

### 5.2 Evolução futura

Um banco/API só será adotado se houver:

- edição simultânea por múltiplos revisores;
- autenticação e workflow de aprovação;
- volume que torne snapshots impraticáveis;
- atualização mais frequente que o ciclo de publicação;
- necessidade de consulta privada.

Até lá, Git + schemas + revisão humana são a SoT operacional.

## 6. Pipeline mensal

Estágios e artefatos:

1. `discover`: candidatos por fonte e query;
2. `reconcile`: canonicalização, aliases e duplicatas;
3. `extract`: claims e observações com fonte;
4. `validate`: schema, regras e conflitos;
5. `review`: decisão humana;
6. `publish`: snapshot público redigido;
7. `report`: cobertura, mudanças e pendências;
8. `deploy`: após aprovação.

Cada execução é idempotente e gera logs sem segredos. Falhas não substituem o último snapshot válido.

## 7. Componentes

- Astro por padrão para conteúdo editorial.
- React apenas para filtros, comparação ou interação complexa.
- Progressive enhancement: lista e evidência aparecem no HTML inicial.
- Estado de filtro serializável na URL.
- Componente não lê CSV bruto; recebe modelo validado.

## 8. Visualizações

SVG/CSS para diagramas clínicos e relações simples. Biblioteca de gráficos só quando existirem relações quantitativas suficientes. Com quatro startups:

- não usar mapa-múndi como peça principal;
- não usar pizza/distribuição percentual;
- preferir fichas, matriz necessidade–solução e disclosure de cobertura.

## 9. GitHub Pages

- `SITE_URL=https://antoniofaical.github.io`;
- `BASE_PATH=/painel-gsds/` em produção;
- helper `withBase` obrigatório;
- builds testados com `/` e `/painel-gsds/`;
- hub raiz preservado;
- workflows permanecem na raiz do repositório.

## 10. Performance

- LCP ≤ 2,5 s p75;
- CLS ≤ 0,1;
- INP ≤ 200 ms;
- JS inicial preferencialmente ≤ 150 kB comprimidos na Home;
- páginas editoriais prioritariamente estáticas;
- filtros carregam dataset público enxuto;
- listas grandes usam paginação/virtualização apenas quando necessário;
- sem logos remotos bloqueantes.

## 11. Segurança, privacidade e licenças

- nenhuma chave no client ou repositório;
- URLs e conteúdo externo sanitizados;
- não publicar endereço residencial, pessoas ou campos proprietários sem necessidade;
- registrar licença/termos das fontes;
- dados CB Insights são derivados/publicados apenas conforme permissão institucional;
- texto gerado automaticamente permanece marcado até revisão.

## 12. Decisões abertas

- formato de execução das 50–100 fontes;
- registro privado de evidências protegidas;
- SLA de revisão mensal;
- limiar de stale por tipo de atributo;
- ferramenta futura de curadoria.

Nenhuma dessas decisões autoriza acoplar o site a uma fonte externa em runtime.
