# Consulta INCRA PGT — Alagoas — 24/10/2026

**Fonte:** INCRA, Plataforma de Governança Territorial, Índices Básicos (https://pro-pgt-incra.estaleiro.serpro.gov.br/pgt/indices-basicos), filtro UF = Alagoas, 102 índices, 50 por página.
**Quem consultou:** Claude, no navegador do Kenny (sessão aberta por ele; o captcha foi resolvido por ele).
**Quando:** 24/10/2026, entre 14:06 e 14:10 (horário de Brasília).

## Arquivos

Cada CSV tem as colunas `codigoIbge;Município;Módulo Fiscal (ha);FMP (ha)`, copiadas da tabela da página. O SHA-256 foi calculado dentro da página do INCRA no momento da captura e conferido de novo aqui, byte a byte.

| Arquivo | Linhas | SHA-256 |
|---|---|---|
| 2026-10-24_PGT_AL_pagina1.csv | 1 a 50 | ee7b2e7d9a8bcd07a661f74e4135a5bcd45a2744660e008ecfd8affd1804af5b |
| 2026-10-24_PGT_AL_pagina2.csv | 51 a 100 | 2adf0f0b54594426ece41336a481973fea35fd1e6bc48487af4f5d4147594a8a |
| 2026-10-24_PGT_AL_pagina3.csv | 101 a 102 | 1c316dff6e230e4c90a8048ce8efecd3ba5d82042074c33835e95d9ec7b53d68 |
| 2026-10-24_PGT_AL_pagina1_tela.jpg | print da página 1 | — |

## Comparação com biblioteca/BR/AL/alagoas.json

Os 102 códigos IBGE batem. **78 municípios conferem** (MF e FMP iguais). **24 municípios divergem** do PGT de hoje:

| IBGE | Município | Base MF/FMP | PGT hoje MF/FMP | Status na base |
|---|---|---|---|---|
| 2700102 | Água Branca | 35 / 4 | 70 / 4 | VALIDADO |
| 2700201 | Anadia | 16 / 4 | 35 / 4 | VALIDADO |
| 2700409 | Atalaia | 12 / 2 | 16 / 4 | VALIDADO |
| 2700508 | Barra De Santo Antônio | 30 / 4 | 18 / 2 | CORRIGIDO |
| 2700607 | Barra De São Miguel | 10 / 2 | 30 / 2 | VALIDADO |
| 2700706 | Batalha | 30 / 4 | 70 / 4 | VALIDADO |
| 2700805 | Belém | 16 / 4 | 35 / 4 | CORRIGIDO |
| 2700904 | Belo Monte | 30 / 4 | 70 / 4 | VALIDADO |
| 2701001 | Boca Da Mata | 16 / 4 | 30 / 4 | VALIDADO |
| 2701100 | Branquinha | 12 / 2 | 16 / 4 | VALIDADO |
| 2701308 | Cajueiro | 12 / 2 | 16 / 4 | VALIDADO |
| 2701357 | Campestre | 12 / 2 | 16 / 4 | VALIDADO |
| 2701407 | Campo Alegre | 16 / 4 | 30 / 4 | VALIDADO |
| 2701506 | Campo Grande | 30 / 4 | 35 / 2 | VALIDADO |
| 2701605 | Canapi | 35 / 4 | 70 / 4 | VALIDADO |
| 2701704 | Capela | 14 / 2 | 16 / 4 | VALIDADO |
| 2701803 | Carneiros | 30 / 4 | 70 / 4 | VALIDADO |
| 2702009 | Coité Do Nóia | 18 / 4 | 15 / 2 | VALIDADO |
| 2702108 | Colônia Leopoldina | 14 / 2 | 16 / 4 | VALIDADO |
| 2702207 | Coqueiro Seco | 10 / 2 | 12 / 2 | VALIDADO |
| 2702306 | Coruripe | 24 / 4 | 30 / 4 | CORRIGIDO |
| 2702355 | Craíbas | 20 / 4 | 15 / 2 | VALIDADO |
| 2704906 | Mar Vermelho | 20 / 4 | 35 / 4 | VALIDADO |
| 2705002 | Mata Grande | 35 / 4 | 70 / 4 | VALIDADO |

Nos 24 a base diz, no campo `fonte`, "consulta 2026-08-16" com os valores dela. Esta evidência não prova se o INCRA mudou os números depois de agosto ou se a base foi preenchida errado: prova só o que o PGT mostra hoje.

**Nada foi alterado na base.** alagoas.json é artefato congelado (AL-IBGE-001); corrigir os 24 depende de decisão da Mesa.

## Decisão D-05 (Mesa, 24/10/2026, 14:13)

Kenny Wilson (Presidente da Mesa) autorizou a correção dos 24 municípios com os números desta consulta.

- Cada registro corrigido recebeu `fmp_status: "CORRIGIDO"` e, no campo `fonte`, a data `consulta 2026-10-24` e o arquivo de evidência da página correspondente.
- Os outros 78 registros não foram alterados.
- Depois da correção, os 102 registros conferem com o PGT de 24/10/2026.
- SHA-256 de `alagoas.json` antes: `044616f641fbfca8823915390b4cb0819f5e33cd01bb2c3d8eb1ba6b43529441`
- SHA-256 de `alagoas.json` depois: `f4a33497b6c92e25520645a8f57baa35ad426287ddc314f008c70dd2d3712925`
- A base continua **não selada** (`alagoas.sha256` não existe). Selar é a decisão D-04, ainda pendente.

## Decisão D-04 (Mesa, 24/10/2026, 14:21): selamento da base

Kenny Wilson (Presidente da Mesa) autorizou selar a base corrigida.

- Publicado `biblioteca/BR/AL/alagoas.sha256` com `f4a33497b6c92e25520645a8f57baa35ad426287ddc314f008c70dd2d3712925`.
- O check 8 do diagnóstico passa de PENDENTE para "Íntegra" (nota 10/10).
- Qualquer alteração futura em `alagoas.json` aparece como DIVERGENTE até a Mesa aprovar um novo selo.
