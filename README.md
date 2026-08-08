# Oráculo Imobiliário BR
Governança fundiária + Checklist PEI - 8 Itens | Material Educacional - Não é PTAM/CNAI nem Laudo
> Projeto com dois módulos em estágios diferentes de maturidade. Veja "Status por módulo" abaixo antes de assumir o que está disponível na página publicada.

**Status:** MVP educativo em Alagoas | **Licença:** MIT

### ⚠️ AVISO LEGAL - O QUE É E O QUE NÃO É
**NÃO É:** PTAM (precisa CRECI + CNAI - Res. COFECI 1066/2007), laudo jurídico, substituto de certidão oficial.
**É:** PEI - Parecer Educativo e Interpretativo da Condição do Imóvel - Checklist de pontos de atenção.

> Material educacional. Não substitui análise jurídica, PTAM com CNAI ou certidões oficiais. Valide com advogado.

---

### Status por módulo

O repositório contém **dois módulos independentes**. Eles não devem ser lidos como uma coisa só — têm maturidade e disponibilidade diferentes.

| Módulo | O que faz | Está na página publicada (`index.html`)? | Status |
|---|---|---|---|
| **1. Biblioteca MF/FMP** | Consulta de Módulo Fiscal e Fração Mínima de Parcelamento por município de Alagoas | ✅ **Sim** — é o que está no link publicado hoje | Em produção (Release Candidate, base em validação — ver `docs/PVB-001`) |
| **2. Checklist PEI (8 itens)** | Upload de documento → análise de 8 categorias de risco → Score Educativo 0-100 | ❌ **Não** — código existe em `src/core/analisador-8-itens.js`, `src/motores/motor_rural.js` e `src/models/upload-model.js`, mas nenhum arquivo é carregado pelo `index.html` publicado | Código-fonte disponível no repositório; ainda não integrado à interface pública |

Se você abrir o link do GitHub Pages hoje, vai ver **apenas o Módulo 1**. O Módulo 2 existe como código para quem for ler o repositório diretamente, mas não tem tela, botão ou fluxo de upload acessível na página.

---

### Módulo 1 — Biblioteca MF/FMP (publicado)
1. Carrega a base `biblioteca/BR/AL/alagoas.json`
2. Busca por município (normalização de acento/caixa)
3. Exibe ficha técnica com MF, FMP, QR code offline e hash de auditoria
4. Diagnóstico 10/10 confere a base contra `config.json`

A cobertura de validação documental da base está detalhada em `docs/PVB-001-Plano-Validacao-Base-Alagoas.md`.

### Módulo 2 — Checklist PEI (código-fonte, não publicado)
1. Recebe dados básicos do imóvel (via upload de arquivo texto)
2. Aplica checklist de 8 categorias de risco comuns em AL
3. Gera Relatório de Pontos de Atenção com Score Educativo 0-100 e indica onde consultar cada certidão

Ainda NÃO faz consulta automática em ONR/SREI, ARISP, CNIB, TJAL. É um motor de checklist educativo em construção, e **ainda não está acessível na página publicada** — só rodando localmente a partir dos arquivos-fonte em `src/`.

### Autor
Kenny Wilson - Corretor de Imóveis Creci 2468-AL- Maceió/AL - MIT open-source.
