# OPEN_EDITORIAL_QUESTIONS — 7A.0

Perguntas: **5**. Toda unidade com `human_validation=required` aponta para uma pergunta abaixo.

Unidades `needs_review` sem pergunta: apenas `COPY-OBS-CHART-008` (ISSUE-7A0-008), porque o desalinhamento `{directTotal}` vs "28" hardcodado é objetivo e não exige decisão de redação. `COPY-OBS-DETAIL-002` tem `COPY-OBS-DETAIL-002.C01` (modelo de dados) e permanece na QUESTION-7A0-004.

## QUESTION-7A0-001

- Contexto: Nome acessível do lockup institucional
- Relacionados: COPY-GLOBAL-HEADER-001 / ISSUE-7A0-003
- Por que a evidência não resolve sozinha: Não há SoT de branding textual que fixe "GSD Dashboard" versus "Painel GSDs" no aria-label.
- Opções: A) Início — Painel GSDs; B) Início — Painel Global de Inovação em Glicogenoses; C) manter GSD Dashboard
- Impacto: A/B alinham a11y à marca visível; C preserva o inglês interno.
- Recomendação: A, por ser curto e já usado no title da Home ("Painel GSDs").
- Responsável sugerido: editor + dono de marca

## QUESTION-7A0-002

- Contexto: Lede da seção Análises na Home ainda descreve observatório Brasil-indireto
- Relacionados: COPY-HOME-ANALISES-003 / ISSUE-7A0-001
- Por que a evidência não resolve sozinha: Há duas frases na mesma Home com recortes diferentes; a evidência mostra qual é o snapshot atual, mas a escolha de quão explícita a Home deve ser é editorial.
- Opções: A) atualizar o lede de Análises para o recorte cumulativo+direto; B) remover menção ao observatório desse lede; C) manter como histórico do "primeiro recorte"
- Impacto: A reduz contradição; B evita o observatório nessa seção; C exige justificar "primeiro recorte" como história.
- Recomendação: A, porque o portal imediatamente abaixo já descreve o recorte atual.
- Responsável sugerido: editor da Home

## QUESTION-7A0-003

- Contexto: DIAG_PRINC visível após scrub de VAL_TOT
- Relacionados: COPY-SOCIO-COST-AMOUNT-002 / ISSUE-7A0-002
- Por que a evidência não resolve sozinha: A substituição atual foi desenhada para remover VAL_TOT, não o nome do campo SIH. O quanto de jargão metodológico é aceitável na página socioeconômica é decisão humana. O número e o recorte E74.0 estão sustentados.
- Opções: A) "AIHs com diagnóstico principal E74.0"; B) manter DIAG_PRINC como transparência metodológica; C) mover o identificador só para fonte/localizador
- Impacto: A reduz leakage; B privilegia rastreabilidade para analistas; C separa público leigo vs especialista.
- Recomendação: A no corpo, C se houver âncora de fonte.
- Responsável sugerido: editor socioeconômico

## QUESTION-7A0-004

- Contexto: Limitação pública sobre produtos/programas não estruturados
- Relacionados: COPY-OBS-COVERAGE-007 / COPY-OBS-DETAIL-002 / ISSUE-7A0-005
- Por que a evidência não resolve sozinha: A frase descreve uma lacuna de modelo. Tirar, suavizar ou manter afeta a expectativa 7B. O fallback do drawer diz a mesma coisa em outro registro.
- Opções: A) manter como caveat de cobertura; B) mover para documentação interna; C) antecipar modelagem 7B
- Impacto: A é transparente; B reduz leakage de roadmap; C está fora desta rodada.
- Recomendação: A até 7B; marcar PENDING_7B_DATA_MODEL.
- Responsável sugerido: editor do Observatório

## QUESTION-7A0-005

- Contexto: Semântica de "Corte das fontes" no Observatório
- Relacionados: COPY-GLOBAL-RESEARCHMETA-001 / ISSUE-7A0-009
- Por que a evidência não resolve sozinha: O código mostra que o Observatório usa a data do snapshot, mas o rótulo é o mesmo das páginas clínicas/socioeconômicas, cujo corte é o das SoTs (2026-08-10).
- Opções: A) rótulo distinto no Observatório ("Data da base publicada"); B) manter o rótulo e explicitar que o corte é o do snapshot; C) alinhar o cutoff do Observatório ao das SoTs (sem alterar o publishedAt)
- Impacto: A/B evitam ler 2026-08-24 como corte médico; C misturaria duas datas de natureza diferente.
- Recomendação: A.
- Responsável sugerido: editor do Observatório
