# Pacote de implementação — Painel Global de Inovação em Glicogenoses

**Versão:** 0.1  
**Data:** 10 de agosto de 2026  
**Finalidade:** orientar a primeira implementação do painel no Cursor sem alterar o conteúdo científico das fontes de verdade.

## Fontes de verdade iniciais

1. `Glicogenose Resumo Médico Executivo(1).md` — bases clínicas e médicas;
2. `Glicogenose Estudo Socioeconômico Mercadológico(1).md` — carga humana, econômica, estrutura de mercado, dimensionamento e Brasil;
3. `Design_System_Painel_Glicogenoses(1).md` — decisões visuais e especificação original da página clínica.

Os arquivos acima devem ser copiados para `docs/source-of-truth/` do projeto e permanecer inalterados. Conteúdo publicado no site deve ser derivado deles com rastreabilidade explícita.

## Conteúdo do pacote

| Arquivo                                     | Função                                                        |
| ------------------------------------------- | ------------------------------------------------------------- |
| `01_Design_System_v0.2.md`                  | Sistema visual atualizado, Home e páginas analíticas iniciais |
| `02_Arquitetura_da_Informacao.md`           | Rotas, navegação, hierarquia e estados de disponibilidade     |
| `03_Modelo_de_Dados_e_Rastreabilidade.md`   | Schemas para métricas, alegações, fontes e futuras startups   |
| `04_Stack_Estrutura_e_Decisoes_Tecnicas.md` | Stack, diretórios, deploy, qualidade e limites técnicos       |
| `05_Criterios_de_Aceite.md`                 | Critérios globais e da primeira iteração                      |
| `06_Regras_Permanentes_Cursor.md`           | Conteúdo recomendado para `AGENTS.md` e regras do projeto     |
| `07_Instrucoes_Cursor_Iteracao_1.md`        | Execução detalhada da fundação técnica e visual               |
| `08_Prompt_Curto_Iteracao_1.md`             | Mensagem curta para iniciar o agente junto das instruções     |

## Sequência de uso

1. Criar um repositório ou uma nova pasta no repositório do GitHub Pages.
2. Copiar as três fontes de verdade e este pacote para o repositório.
3. Colocar `06_Regras_Permanentes_Cursor.md` na raiz como `AGENTS.md`, removendo apenas o preâmbulo explicativo.
4. Entregar `07_Instrucoes_Cursor_Iteracao_1.md` ao Cursor.
5. Enviar o conteúdo de `08_Prompt_Curto_Iteracao_1.md` no chat do Cursor.
6. Validar a Iteração 1 antes de autorizar a Home ou qualquer página científica.

## Regra de escopo

A primeira iteração cria apenas a fundação do produto e uma página interna de demonstração do sistema visual. Ela não publica interpretações científicas, não cria o mapa de startups e não tenta finalizar a Home.
