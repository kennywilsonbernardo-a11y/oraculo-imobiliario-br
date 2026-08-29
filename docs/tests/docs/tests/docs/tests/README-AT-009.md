# Suíte de Regressão — AT-009

**Objeto:** `normalizeBusca()` em `index.html` (busca de município tolerante a apóstrofo/hífen/espaço) + remoção do campo redundante `municipio_busca` em `biblioteca/BR/AL/alagoas.json` (102 registros) e em `config.json` (4 sentinelas do bloco `checks`).

**Origem:** Ciclo 2 do planejamento v9.2.2-RC (revisão de código e arquitetura de busca). A `normalizeBusca()` original removia apenas acento (`.normalize('NFD').replace(...)`), mas não tratava apóstrofo, hífen nem variações de espaçamento — na prática, um corretor digitando "olho dagua das flores" (sem apóstrofo, forma mais natural de digitar) não encontrava nenhum dos três municípios de Alagoas com apóstrofo no nome oficial (Olho d'Água das Flores, Olho d'Água do Casado, Olho d'Água Grande, além de Tanque d'Arca).

Paralelamente, foi identificado que o campo `municipio_busca` — presente nos 102 registros de `alagoas.json` e nas 4 sentinelas de `config.json` — é **código morto**: em todo ponto do `index.html` onde é referenciado, o campo `municipio` aparece antes dele na cadeia de fallback (`m.municipio || m.nome || m.municipio_busca`) e está sempre preenchido, portanto `municipio_busca` nunca chega a ser lido de fato. Sua remoção é independente da correção de `normalizeBusca()` — são dois problemas distintos que estavam relacionados na mesma frente de trabalho.

**Status:** implementado e testado — bug fix + limpeza de código morto concluídos, não pendente de deliberação de Mesa (mudança técnica pontual, sem impacto na identidade do produto ou no VIS-001).

**Como rodar:** `node docs/tests/teste_at009.mjs` (Node ≥ 18, sem dependências externas).

**O que a suíte valida:**

| Caso | O que verifica | Referência |
|---|---|---|
| 1-4 | `normalizeBusca()` trata apóstrofo (reto e curvo) e ausência de apóstrofo como equivalentes — "olho dagua das flores" casa com "Olho d'Água das Flores" | AT-009 item 1 |
| 5-6 | Mesmo tratamento para "Tanque d'Arca" + espaços duplicados/extras não quebram a comparação | AT-009 item 1 |
| 7 | Comportamento antigo (remoção de acento: São → Sao) continua funcionando — regressão | Não quebrar o caminho já correto |
| 8 | Base de Alagoas mantém os 102 municípios após a limpeza | Integridade dos dados |
| 9 | Nenhum dos 102 registros de `alagoas.json` possui mais `municipio_busca` | AT-009 item 2 |
| 10 | Zero colisões entre os 102 nomes normalizados (nenhum município passou a ser confundido com outro após a normalização mais agressiva) | AT-009 item 2 — sanidade crítica |
| 11 | As 4 sentinelas de `config.json.checks` não possuem mais `municipio_busca` | AT-009 item 3 |
| 12-15 | As 4 sentinelas do diagnóstico "10/10" (japaratinga, maceió, maragogi, arapiraca) continuam sendo encontradas corretamente, com MF/FMP batendo, sem depender do campo removido | AT-009 item 3 — garante que o diagnóstico continua dando 10/10 |

**Não coberto por esta suíte:**
- Teste manual da caixa de busca no navegador (a suíte testa a função extraída de `index.html`, não a interação de UI/DOM) — recomendado conferir manualmente digitando "olho dagua" na busca ao vivo do GitHub Pages e confirmar que os 3 municípios "Olho d'Água..." aparecem
- Impacto em outros estados além de Alagoas (o projeto ainda está no piloto AL; a normalização mais agressiva foi validada apenas contra os 102 nomes de AL — antes de expandir para outro estado, rodar a mesma verificação de zero colisão contra a nova base)

---

*Correção técnica registrada em 2026-08-29, decorrente do Ciclo 2 de refinamento planejado para v9.2.2-RC. Sem alteração de identidade do produto, sem reabertura do VIS-001.*
