# AUD-2026-09-23 — Auditoria da Base de Alagoas e das Matrizes da Trilha A

Escopo: somente leitura e verificação. **Nenhum dado da base ou das matrizes foi alterado.** Decisões de correção cabem ao responsável (Kenny) e, onde aplicável, à Mesa.

---

## PARTE 1 — Base `biblioteca/BR/AL/alagoas.json` × INCRA

### Fontes oficiais usadas (baixadas direto do gov.br em 23/09/2026)
1. **INCRA — Tabela de Índices Básicos do SNCR, 2013, por município** — `gov.br/incra/pt-br/acesso-a-informacao/indices_basicos_2013_por_municipio.pdf` (150 págs; 102 municípios de AL extraídos).
2. **INCRA — tabela-fmp_alterado.xls ("NOVA FMP")**, publicada na notícia "Reclassificação de imóveis rurais beneficia produtores de todo o país" — altera a FMP de 10 municípios de AL (todos de 4 → 2 ha) e **repete o MF**, que permanece igual ao de 2013.

**Limite desta verificação:** a consulta atual da PGT (`pro-pgt-incra.estaleiro.serpro.gov.br/pgt/indices-basicos`) exige hCaptcha, então **não foi consultada** — resolver captcha é tarefa humana. Se houver revisão de MF posterior a essas duas tabelas, ela não está refletida aqui.

### Resultado
- **102/102** municípios encontrados (códigos IBGE batem).
- **78 municípios** batem com o INCRA (MF e FMP).
- **As 10 FMP alteradas pelo INCRA** (tabela NOVA FMP) estão corretas na base.
- **Os 4 sentinelas** do diagnóstico (Japaratinga, Maceió, Maragogi, Arapiraca) batem com o INCRA.
- **24 municípios divergem** do INCRA:

| Município | Base Oráculo (MF/FMP) | INCRA oficial (MF/FMP) | Status na base | Valor provisório antigo (PVB-001) |
|---|---|---|---|---|
| Água Branca | 35 / 4 | 70 / 4 | VALIDADO | 35 / 4 |
| Anadia | 16 / 4 | 35 / 4 | VALIDADO | 16 / 4 |
| Atalaia | 12 / 2 | 16 / 4 | VALIDADO | 12 / 2 |
| Barra de Santo Antônio | 30 / 4 | 18 / 2 | CORRIGIDO | 10 / 2 |
| Barra de São Miguel | 10 / 2 | 30 / 2 | VALIDADO | 10 / 2 |
| Batalha | 30 / 4 | 70 / 4 | VALIDADO | 30 / 4 |
| Belém | 16 / 4 | 35 / 4 | CORRIGIDO | 20 / 4 |
| Belo Monte | 30 / 4 | 70 / 4 | VALIDADO | 30 / 4 |
| Boca da Mata | 16 / 4 | 30 / 4 | VALIDADO | 16 / 4 |
| Branquinha | 12 / 2 | 16 / 4 | VALIDADO | 12 / 2 |
| Cajueiro | 12 / 2 | 16 / 4 | VALIDADO | 12 / 2 |
| Campestre | 12 / 2 | 16 / 4 | VALIDADO | 12 / 2 |
| Campo Alegre | 16 / 4 | 30 / 4 | VALIDADO | 16 / 4 |
| Campo Grande | 30 / 4 | 35 / 2 | VALIDADO | 30 / 4 |
| Canapi | 35 / 4 | 70 / 4 | VALIDADO | 35 / 4 |
| Capela | 14 / 2 | 16 / 4 | VALIDADO | 14 / 2 |
| Carneiros | 30 / 4 | 70 / 4 | VALIDADO | 30 / 4 |
| Coité do Nóia | 18 / 4 | 15 / 2 | VALIDADO | 18 / 4 |
| Colônia Leopoldina | 14 / 2 | 16 / 4 | VALIDADO | 14 / 2 |
| Coqueiro Seco | 10 / 2 | 12 / 2 | VALIDADO | 10 / 2 |
| Coruripe | 24 / 4 | 30 / 4 | CORRIGIDO | 20 / 4 |
| Craíbas | 20 / 4 | 15 / 2 | VALIDADO | 20 / 4 |
| Mar Vermelho | 20 / 4 | 35 / 4 | VALIDADO | 20 / 4 |
| Mata Grande | 35 / 4 | 70 / 4 | VALIDADO | 35 / 4 |

### Padrão observado (fato, não conclusão)
- **21 dos 24** valores divergentes são **idênticos** aos valores **provisórios antigos** ("INCRA IE 5/2022 — regra genérica") listados na tabela do `docs/PVB-001-Plano-Validacao-Base-Alagoas.md`.
- As divergências se concentram na **ordem alfabética de Água Branca a Craíbas** (+ Mar Vermelho e Mata Grande).
- Mesmo assim, esses registros estão marcados **VALIDADO/CORRIGIDO** e o campo `fonte` diz *"INCRA PGT … consulta 2026-08-16 … MF x / FMP y"* com os valores divergentes.

### Duas leituras possíveis (Regra 4 — não resolvida aqui)
- **Leitura A:** a PGT atual mostra valores diferentes das tabelas oficiais de 2013/NOVA FMP (revisão de MF não localizada nesta auditoria).
- **Leitura B:** esses 24 registros **não foram de fato atualizados**; mantiveram o valor provisório e receberam o texto de fonte "PGT 2026-08-16" sem a consulta correspondente.

**Como decidir (tarefa humana, ~10 min):** consultar na PGT, resolvendo o captcha, 3 municípios de controle — **Água Branca** (base 35 × INCRA 70), **Atalaia** (base 12/2 × INCRA 16/4) e **Coruripe** (base 24 × INCRA 30). Se a PGT mostrar os valores do INCRA, vale a Leitura B e os 24 precisam ser corrigidos antes de qualquer selamento.

### Consequência para o produto
Até a decisão, **a base não deve ser selada** (AT-011) e o rótulo "VALIDADO" desses 24 municípios **não deve ser apresentado ao usuário como confirmado**. O diagnóstico 10/10 não detectou o problema porque os 4 sentinelas estão fora do bloco afetado — recomenda-se incluir pelo menos 1 sentinela desse bloco (ex.: Água Branca) depois de resolvida a divergência.

---

## PARTE 2 — Matrizes da Trilha A (`biblioteca/matrizes/`)

| Matriz | Situação | Achados |
|---|---|---|
| `matriz_urbano_residencial_condominio.json` | Status "pronta_para_self_service_trilha_A". Base legal citada: Lei 7.433/85, Decreto 93.240/86, Lei 4.591/64. | Coerente. Observações: (a) "certidão de casamento 90 dias" é **prática cartorária**, não prazo legal — sugerir rótulo "prática usual, confirmar com o cartório"; (b) matrícula 30 dias bate com o CNNR-AL citado na matriz de casos especiais. |
| `Matriz-Rural.json` | Status **"depende LAC-001 - rascunho baseado no seu texto"**; vários itens com `base: "Seu texto"`. | **Regra 5:** itens sem origem rastreável — manter como rascunho, **não** liberar para produção. **Georreferenciamento:** a matriz diz que o Decreto 12.689/2025 *"suspendeu por 4 anos a exigência para imóveis menores"*. Fontes consultadas indicam que o decreto (21/10/2025) **prorrogou até 21/10/2029 o prazo de certificação para todos os imóveis, unificando o escalonamento por tamanho**. Há divergência de terminologia entre as fontes ("prorrogação" × "suspensão"). O texto "para imóveis menores" aparenta estar **desatualizado/impreciso** — revisar com a fonte primária (texto do decreto no Planalto). |
| `matriz_casos_especiais.json` | 23 casos, **todos com fonte citada**. | Boa rastreabilidade. Pontos para conferência: (a) **Permuta** — o critério "torna acima de 50% vira compra e venda" **não está no art. 533 do CC** (a fonte citada); é critério tributário/doutrinário e precisa de fonte própria; (b) **Outorga conjugal** — citar também o art. 1.649 do CC (prazo de 2 anos para anular), que sustenta o "convalesce com o tempo"; (c) **RET 4%** e **estrangeiros 25%/40%** batem com a legislação conhecida (Lei 10.931/2004; Lei 5.709/71) — Lei 5.709/71 não está citada, só o CNNR-AL. |
| `matriz_emolumentos_al.json` | Coleta 28/08/2026 pelo simulador do TJAL; Lei 9.778/2025. | A Lei 9.778 **existe e é de 23/12/2025** (LegisWeb). **Não confirmado nesta auditoria:** início de vigência 29/03/2026, TSNR 26% e reajuste pelo INPC — a página da lei não pôde ser lida (limite de acesso). Manter a matriz, mas com esses 3 itens marcados "a reconferir no texto da lei". |

---

## Posição do responsável (registrada em 23/09/2026)
Kenny Wilson (CRECI-AL 2468), responsável pela base, informou que **pesquisou pessoalmente os valores** e decidiu **manter a base e as matrizes como estão**. Nenhum dado foi alterado por esta auditoria.

Para fechar a rastreabilidade dos 24 municípios da Parte 1, fica **pendente anexar a evidência** dessa pesquisa (print/PDF da consulta na PGT, com data), no mínimo de **Água Branca, Atalaia e Coruripe**, em `docs/auditoria/evidencias/`. Com a evidência anexada, este item passa a ser considerado resolvido pela Leitura A.

---

## Pendências consolidadas (para decisão)
1. **Base AL:** valores mantidos por decisão do responsável — anexar evidência da consulta PGT (3 municípios de controle) antes do selamento.
2. **Matriz Rural:** manter como rascunho; corrigir o texto do georreferenciamento com base no texto oficial do Decreto 12.689/2025.
3. **Casos especiais:** incluir fonte própria para o critério dos 50% na permuta; citar CC art. 1.649 e Lei 5.709/71.
4. **Emolumentos:** reconferir vigência, TSNR e índice de reajuste no texto da Lei 9.778/2025.

*Auditoria feita por Claude a pedido de Kenny Wilson (CRECI-AL 2468), em 23/09/2026. Trilha A apenas — nada aqui se aplica à Trilha E1.*
