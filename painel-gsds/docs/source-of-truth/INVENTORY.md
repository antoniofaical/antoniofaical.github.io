# Inventário das fontes de verdade

**Data de inclusão:** 2026-08-10  
**Regra:** não editar arquivos em `docs/source-of-truth/`. Conteúdo publicado deve ser derivado com rastreabilidade explícita.

| Arquivo                                              | Função                                                            | SHA-256                                                            | Data de inclusão | Regra      |
| ---------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------- | ---------- |
| `Glicogenose Resumo Médico Executivo.md`             | Bases clínicas e médicas (SoT)                                    | `37E3FBEA2513FF57F42937273622FEE8592CE1D9DF955C7467EF78F947866389` | 2026-08-10       | Não editar |
| `Glicogenose Estudo Socioeconômico Mercadológico.md` | Carga humana, econômica, mercado, dimensionamento e Brasil (SoT)  | `489FD652F5CE6853908F59C18745C18282A65E946AF59AB4DFF3A142C210C3D2` | 2026-08-10       | Não editar |
| `Design_System_Painel_Glicogenoses.md`               | Decisões visuais e especificação original da página clínica (SoT) | `634A782DEDAC32D63B20FB7988E1BDC0C39DB9C41187CBE92C2E5113CB2A7BD6` | 2026-08-10       | Não editar |

## Verificação

Recompute hashes com:

```powershell
Get-FileHash docs/source-of-truth/* -Algorithm SHA256
```

Qualquer divergência inesperada deve interromper a iteração e ser reportada ao usuário.
