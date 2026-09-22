# COPY_ISSUES_REGISTER — 7A.0

Issues: **9**. Totais alinhados ao inventário R3 (252 `COPY_ID`, 192 `CLAIM_ID`).

## ISSUE-7A0-001

- Severidade: `high`
- Categoria: `contradiction`
- COPY_ID: `COPY-HOME-ANALISES-003`
- CLAIM_ID: `COPY-HOME-ANALISES-003.C01`
- Descrição: A Home descreve o observatório como "primeiro recorte do mapeamento indireto Brasil", enquanto o snapshot publicado e o portal da própria Home falam em núcleos indiretos Brasil/Global e 28 organizações diretas.
- Evidência: Runtime Home #analises lede vs #inovacao lede; snapshot snap-ecosystem-cumulative-direct-2026-08-24 coverage.summary.
- Impacto público: Leitor executivo pode achar que o observatório público ainda é só o recorte Brasil indireto.
- Ação recomendada (não executada): Revisar o lede de Análises para refletir o recorte publicado, sem inventar censo.
- Dependência humana: yes
- PENDING_7B_DATA_MODEL: no
- CSV: `status=unsupported`, `proposed_action=revise`, `human_validation=required` → QUESTION-7A0-002

## ISSUE-7A0-002

- Severidade: `high`
- Categoria: `internal_leakage`
- COPY_ID: `COPY-SOCIO-COST-AMOUNT-002`
- CLAIM_ID: `COPY-SOCIO-COST-AMOUNT-002.C01`
- Descrição: Após scrub de VAL_TOT, o escopo público ainda exibe o identificador interno DIAG_PRINC: "AIHs com DIAG_PRINC E74.0". O valor e o recorte E74.0 estão sustentados; o problema é linguagem/leakage, não a afirmação factual.
- Evidência: Runtime socio CostLayers amount; publicSocioText.scrubValTotFrames substitui "Soma de VAL_TOT das AIHs com DIAG_PRINC E74.0" por "AIHs com DIAG_PRINC E74.0".
- Impacto público: Jargão de microdado SIH vaza para a interface pública.
- Ação recomendada (não executada): Em rodada posterior, substituir por linguagem pública (diagnóstico principal E74.0) sem alterar o número.
- Dependência humana: yes
- PENDING_7B_DATA_MODEL: no
- CSV: `status=needs_review`, `proposed_action=revise`, `human_validation=required` → QUESTION-7A0-003. O grau de evidência do claim é `supports`.

## ISSUE-7A0-003

- Severidade: `medium`
- Categoria: `terminology_inconsistency`
- COPY_ID: `COPY-GLOBAL-HEADER-001`
- CLAIM_ID: `NONE`
- Descrição: Aria-label do lockup usa "GSD Dashboard" enquanto o footer e os titles usam "Painel GSDs" / "Painel Global de Inovação em Glicogenoses".
- Evidência: Runtime link name "Início — GSD Dashboard" em todas as rotas inspecionadas.
- Impacto público: Usuários de leitor de tela ouvem um nome de produto diferente do visual.
- Ação recomendada (não executada): Alinhar o acessível ao nome público aprovado.
- Dependência humana: yes
- PENDING_7B_DATA_MODEL: no
- CSV: `status=needs_review`, `proposed_action=revise`, `human_validation=required` → QUESTION-7A0-001

## ISSUE-7A0-004

- Severidade: `low`
- Categoria: `redundancy`
- COPY_ID: `COPY-OBS-COVERAGE-006 | COPY-OBS-ABOUT-005`
- CLAIM_ID: `COPY-OBS-COVERAGE-006.C01 | COPY-OBS-ABOUT-005.C01`
- Descrição: A frase sobre registros diretos sem fonte pública vinculada aparece na lista de limitações de cobertura e de novo em "Sobre os dados". Esta rodada classifica a repetição como **contextual e intencional** (cobertura vs metodologia), não como redundância a mesclar.
- Evidência: Runtime observatory coverage limitations vs about-data list; `duplicate_group=DUP-OBS-NO-PUBLIC-SOURCE`.
- Impacto público: Ênfase repetida; função distinta por seção.
- Ação recomendada (não executada): Manter. Não usar `status=redundant` nem `proposed_action=merge`.
- Dependência humana: no
- PENDING_7B_DATA_MODEL: no
- CSV: ambas as unidades permanecem `status=supported`, `proposed_action=keep`. O problema **não é o texto literal**.

## ISSUE-7A0-005

- Severidade: `medium`
- Categoria: `PENDING_7B_DATA_MODEL`
- COPY_ID: `COPY-OBS-COVERAGE-007 | COPY-OBS-DETAIL-002`
- CLAIM_ID: `COPY-OBS-COVERAGE-007.C01 | COPY-OBS-DETAIL-002.C01`
- Descrição: A copy pública afirma que ativos e programas ainda não estão modelados como entidades estruturadas separadas, e o detalhe usa fallback correspondente quando `productsOrPrograms` está vazio.
- Evidência: snapshot.coverage.limitations; StartupDetail products.length===0 fallback.
- Impacto público: Expectativa de modelo de dados futuro é comunicada ao público.
- Ação recomendada (não executada): Não alterar o DB nesta rodada. Tratar como PENDING_7B_DATA_MODEL.
- Dependência humana: yes
- PENDING_7B_DATA_MODEL: yes
- CSV: ambas `status=needs_review`, `proposed_action=keep`, `human_validation=required` → QUESTION-7A0-004. COVERAGE-007 tem `problem` explícito (não NONE).

## ISSUE-7A0-006

- Severidade: `low`
- Categoria: `stylistic_only`
- COPY_ID: `COPY-HOME-SEO-002`
- CLAIM_ID: `COPY-HOME-SEO-002.C01`
- Descrição: Reclassificado nesta correção. A meta description afirma família heterogênea, carga socioeconômica, mercado observado e limites dos dados brasileiros — o que as SoTs sustentam. A omissão de um caveat sobre cobertura parcial do Observatório **não** torna parcialmente sustentadas as afirmações que a frase realmente contém.
- Evidência: BaseLayout description em `painel-gsds/src/pages/index.astro`; SoT médica e socioeconômica.
- Impacto público: Nenhum defeito factual no texto afirmado. Recomendação puramente editorial, se alguma.
- Ação recomendada (não executada): Não tratar como falha de evidência. Manter a meta.
- Dependência humana: no
- PENDING_7B_DATA_MODEL: no
- CSV: `status=supported`, `proposed_action=keep`, `human_validation=NONE`. Falso positivo F5. O problema **não é o texto literal afirmado**.

## ISSUE-7A0-007

- Severidade: `low`
- Categoria: `accessibility_copy`
- COPY_ID: `COPY-GLOBAL-NAV-001`
- CLAIM_ID: `NONE`
- Descrição: aria-current="page" em "Visão geral" permanece verdadeiro em rotas internas porque currentPath.endsWith("/") casa com o item href "/". O **texto literal** "Visão geral" está correto.
- Evidência: Runtime clinical/socio/observatory: Visão geral states:[current] junto com a rota real.
- Impacto público: Leitor de tela pode anunciar a página errada como atual. 6D visual está frozen; isto é estado acessível, não texto.
- Ação recomendada (não executada): Corrigir matching de rota em rodada de a11y, sem reabrir visual 6D.
- Dependência humana: no
- PENDING_7B_DATA_MODEL: no
- CSV: `status=supported`, `proposed_action=keep`. Issue de interação/estado; o problema **não é o texto literal**.

## ISSUE-7A0-008

- Severidade: `low`
- Categoria: `imprecise_language`
- COPY_ID: `COPY-OBS-CHART-008`
- CLAIM_ID: `COPY-OBS-CHART-008.C01`
- Descrição: O título do grupo usa template "{directTotal}" mas a description do chart de status hardcoda "Status dos 28 com relação direta."
- Evidência: ObservatoryAnalytics.tsx heading vs StartupBarChart description viz-04.
- Impacto público: Risco de deriva se o recorte direto mudar e só o heading for dinâmico.
- Ação recomendada (não executada): Unificar para template {directTotal} na description.
- Dependência humana: no
- PENDING_7B_DATA_MODEL: no
- CSV: `status=needs_review`, `proposed_action=revise`, `human_validation=NONE` (não exige pergunta editorial; o desalinhamento de template é objetivo).

## ISSUE-7A0-009

- Severidade: `medium`
- Categoria: `imprecise_language`
- COPY_ID: `COPY-GLOBAL-RESEARCHMETA-001`
- CLAIM_ID: `COPY-GLOBAL-RESEARCHMETA-001.C01`
- Descrição: O template "Última revisão / Corte das fontes" é o mesmo nas três páginas de pesquisa, mas no Observatório `cutoff` recebe `publishedAt` do snapshot (2026-08-24), não o corte das SoTs clínicas (2026-08-10).
- Evidência: `inovacao/startups/index.astro` passa `cutoff={updatedAt}` com `updatedAt = snapshot.publishedAt.slice(0, 10)`; clínicas/socio usam corte 2026-08-10.
- Impacto público: "Corte das fontes" pode ser lido como corte das SoTs em todas as páginas.
- Ação recomendada (não executada): Diferenciar o rótulo no Observatório ou documentar que o corte ali é o da base publicada.
- Dependência humana: yes
- PENDING_7B_DATA_MODEL: no
- CSV: `status=needs_review`, `proposed_action=revise`, `human_validation=required` → QUESTION-7A0-005
