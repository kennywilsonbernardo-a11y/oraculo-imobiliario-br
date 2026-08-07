# ATR-003 (Revisada) - Auditoria de Segurança, Arquitetura e Integridade
## Oráculo Imobiliário BR - v9.2.1 RC

**Data:** 2026-08-06
**Metodologia:** Auditoria baseada em código real (arquivos do ZIP do repositório), não em interpretação de relatório de terceiros.
**Motivo da revisão:** A versão anterior desta ATR-003 (gerada por outra IA, "Meta AI") citava arquivos inexistentes (`app.js`, `utils.js`, `storage.js`, `search.js`, `main.js`, pasta `/lib/`) e um caso validador (Pão de Açúcar, MF=70) que não corresponde ao dado real da base (`modulo_fiscal_ha: 30`, status `PROVISORIO`). Esta versão substitui aquela integralmente.

### Status
- ✅ **Confirmado** = conferido diretamente no código/dado real, com trecho citado
- ⚠️ **Hipótese** = plausível, mas depende de teste que não foi rodado nesta revisão
- ❌ **Refutado** = a alegação original foi checada e está incorreta
- 🔬 **Teste** = exige reprodução prática (ex: abrir no navegador)

---

## 1. Nota estrutural — antes de tudo

A ATR-003 original descreve uma arquitetura modular (`app.js`, `storage.js`, `search.js`, `main.js`, `utils.js`, pasta `/lib/`). **Essa arquitetura não existe no repositório.** O projeto real é:

- Um único `index.html` (444 linhas) contendo toda a lógica: busca, escape, diagnóstico, ficha, QR, histórico, logs.
- Uma pasta `libs/` (com "s") contendo `qrcode.min.js`.
- Uma pasta `src/` com três módulos (`analisador-8-itens.js`, `motor_rural.js`, `upload-model.js`) que implementam o produto "PEI" descrito no README — **mas que não são importados pelo `index.html` publicado**. São órfãos: existem no repo, não rodam na página real.

Toda evidência abaixo foi conferida contra esses arquivos reais.

---

## 2. Segurança

### ATR-003-001 — XSS

| Alegação original | Realidade conferida |
|---|---|
| "textContent usado em 100% da renderização" | ❌ Refutado. O código usa `innerHTML` (11 ocorrências em `index.html`), não `textContent`. |
| "escapeHTML() implementado em utils.js" | ⚠️ Parcialmente correto: `escapeHTML()` existe, mas em `index.html` linha 171 — não em `utils.js` (arquivo inexistente). |
| "innerHTML sem dados de usuário" | ❌ Refutado. Há `innerHTML` **com** dados de usuário/base em várias linhas (ex.: linha 328, 372, 412) — só que todo valor dinâmico passa por `escapeHTML()` antes de entrar no template string. |

**Status real:** ✅ **Confirmado, mas por outro mecanismo do descrito.** A mitigação de XSS é real e funcional — `escapeHTML()` (linha 171) é aplicado sistematicamente a toda variável antes de compor `innerHTML` — mas a estratégia é "innerHTML + escape manual", não "textContent". Isso é uma mitigação válida, só não é a que o relatório original descreveu.

**Criticidade:** ALTA. **Conclusão:** Seguro na prática, desde que `escapeHTML()` continue sendo aplicado a toda nova inserção dinâmica futura — é uma responsabilidade manual, não automática como `textContent` seria.

---

### ATR-003-002 — Abandono de `onclick="abrirFicha(JSON.stringify(...))"`

| Alegação original | Realidade conferida |
|---|---|
| "crypto.randomUUID() em storage.js linha 45" | ❌ Arquivo errado. Real: `index.html` linha 319. |
| "Map de fichas por ID, sem onclick inline" | ✅ Confirmado. `resultados = {}` (linha 129 comentário / uso ao longo do arquivo) associado a `crypto.randomUUID()` por item, sem `JSON.stringify` em atributo HTML. |

**Status real:** ✅ **Confirmado** (arquitetura correta), com a citação de arquivo corrigida.
**Criticidade:** ALTA. **Conclusão:** Decisão de design correta e efetivamente implementada.

---

## 3. Busca

### ATR-003-003 — Normalização (`normalizeBusca`)

| Alegação original | Realidade conferida |
|---|---|
| "normalize('NFD')... em search.js" | ❌ Arquivo errado. Real: `index.html` linha 177 (função inline, sem nome `normalizeBusca` — é usada diretamente). |
| Comportamento acento/caixa | ✅ Confirmado no código: `.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()` |

**Status real:** ✅ **Confirmado** (comportamento correto), com a citação de arquivo corrigida.
**Criticidade:** MÉDIA. **Conclusão:** Busca resiliente a acento/caixa, como afirmado — só não está no arquivo citado.

---

## 4. Integridade dos dados — o item mais crítico desta revisão

### ATR-003-004 — Fonte Única da Verdade / Caso Validador

| Alegação original | Realidade conferida |
|---|---|
| "alagoas.json com MF=70 para PÃO DE AÇÚCAR" | ❌ **Refutado.** Valor real: `modulo_fiscal_ha: 30`. |
| "Validado com Espelho SNCR: 59ha / 70 = 0,84 MF (bate exato)" | ❌ **Refutado.** Com o valor real, 59 ÷ 30 = **1,97 MF**, não 0,84. A conta não bate com nenhuma versão real do dado. |
| Implícito: dado confirmado/validado | ❌ **Refutado.** O próprio registro de Pão de Açúcar traz `"fmp_status": "PROVISORIO - VALIDAR NO INCRA gov.br"` e `"fonte": "... PRECISA VALIDAR"` — é dado explicitamente não-validado na própria base. |

**Status real:** ❌ **Refutado.** Este era o item central de evidência "✅ Confirmado, criticidade ALTA" do relatório original, e não resiste à conferência contra o arquivo real. Recomendo **não usar Pão de Açúcar como caso validador** em nenhuma comunicação pública ou peça de auditoria até que o dado saia do status provisório.

**Caso validador substituto (real e validado):** Maragogi.

"municipio_display": "Maragogi",
"modulo_fiscal_ha": 14,
"fracao_minima_parcelamento_ha": 2,
"fmp_status": "VALIDADO - PGT INCRA 2026-08-05",
"fonte": "INCRA IE 05/2022 - pro-pgt-incra.estaleiro.serpro.gov.br - consulta 2026-08-05 - MF 14 / FMP 2"

Este é, junto com Arapiraca, um dos únicos dois registros da base com status `VALIDADO` (fonte oficial nomeada, data de consulta, referência normativa). Se vocês querem um caso público de "conta que bate", usem este.

---

## 5. Diagnóstico 10/10

### ATR-003-005 — Reprodutibilidade

| Alegação original | Realidade conferida (pós-correção AT-006, já aplicada nesta sessão) |
|---|---|
| "Regra <4 MF vem de alagoas.json + config.json, não hardcoded" | ⚠️ Era **falso** na versão auditada pela Meta: o diagnóstico usava uma constante `SENTINELAS` hardcoded no JS, com valores desalinhados do `config.json` (Maragogi e Arapiraca divergiam). **Já corrigido**: o diagnóstico agora lê `CONFIG.checks` diretamente — fonte única real, sem cópia paralela. |
| "GUT/GEE ... precisa cross-check" | ⚠️ Hipótese mantida — não há dado de GUT/GEE na base `alagoas.json` atual para conferir. Este ponto genuinamente depende de teste externo, como a Meta apontou. |

**Status real:** ✅ **Confirmado, após correção.** Antes desta sessão, a alegação era falsa (fonte dupla e divergente). Agora é verdadeira.
**Criticidade:** ALTA. **Conclusão:** Reproduzível e alinhado a uma única fonte — mas isso só passou a ser verdade depois da correção aplicada em 2026-08-06, não era o estado do código quando a Meta auditou.

---

## 6. QR Code

### ATR-003-006 — Biblioteca local

| Alegação original | Realidade conferida |
|---|---|
| "qrcode.min.js local em /lib/" | ⚠️ Pasta errada: é `libs/` (com "s"), linha 54 do `index.html`. Fora isso, confirmado. |
| "Sem CDN, offline-first" | ✅ Confirmado — `<script src="./libs/qrcode.min.js?v=9.2.1">`, path relativo, sem dependência externa. Há até tratamento de erro `onerror` específico para o caso do arquivo não publicar no Pages (AT-004). |

**Status real:** ✅ **Confirmado**, com a grafia da pasta corrigida.
**Criticidade:** MÉDIA. **Conclusão:** Offline-first real e bem tratado (inclusive com fallback de erro).

---

## 7. Checks / Fonte Única (item extra da matriz original)

### ATR-003-007 — "Checks de FMP 4ha"

| Alegação original | Realidade conferida |
|---|---|
| "Checks usam alagoas.json ... FMP 4ha validado" | ❌ Refutado como descrito. Os `checks` reais do `config.json` cobrem **4 municípios sentinela**: Japaratinga, Maceió, Maragogi, Arapiraca — nenhum com FMP=4ha (todos têm FMP=2). Pão de Açúcar (FMP=4, mas provisório) **não está nem nunca esteve** na lista de checks. |

**Status real:** ❌ **Refutado.** O mecanismo de checks existe e agora está corretamente alinhado à fonte única (ver item 5), mas não valida o caso citado.
**Criticidade:** ALTA. **Conclusão:** Correto quanto à existência do mecanismo; incorreto quanto ao caso de uso citado como prova.

---

## 8. Matriz final consolidada

| ID | Item | Status na ATR-003 original | Status real (revisado) | Criticidade |
|---|---|---|---|---|
| 001 | XSS | ✅ Confirmado | ✅ Confirmado (mecanismo diferente do descrito) | ALTA |
| 002 | Arquitetura onclick→UUID | ✅ Confirmado | ✅ Confirmado (arquivo errado citado) | ALTA |
| 003 | Busca/normalização | ✅ Confirmado | ✅ Confirmado (arquivo errado citado) | MÉDIA |
| 004 | Fonte única / caso validador | ✅ Confirmado | ❌ **Refutado** (dado e conta errados) | ALTA |
| 005 | Diagnóstico 10/10 | ⚠️ Hipótese | ✅ Confirmado após correção aplicada | ALTA |
| 006 | QR Code local | ✅ Confirmado | ✅ Confirmado (pasta errada citada) | MÉDIA |
| 007 | Checks FMP | ✅ Confirmado | ❌ **Refutado** (caso não coberto pelos checks reais) | ALTA |

**Saldo:** 3 de 7 itens da auditoria original continham erro factual verificável (004, 007 refutados; 005 estava errado no momento da auditoria, hoje corrigido). Os outros 4 estavam tecnicamente corretos quanto ao comportamento, mas erravam sistematicamente a localização do código (arquivos/pastas que não existem no repositório real).

---

## 9. Recomendação para o selamento

**Não selar** com base na ATR-003 original — ela contém, no item 004, uma prova central não corroborada pelos artefatos do repositório (dado e conta incompatíveis com a base real), que, se citada publicamente ou usada como precedente jurídico/técnico, é um risco de credibilidade real para o projeto.

Próximos passos sugeridos:
1. Adotar esta ATR-003 revisada como versão de registro.
2. Trocar o caso validador de Pão de Açúcar por Maragogi (ou Arapiraca) em qualquer material futuro — são os únicos dois municípios com status `VALIDADO` na base atual.
3. Rodar o `grep -r innerHTML` que a própria Meta recomendou e nunca executou — os resultados estão na seção 2 deste documento.
4. Antes de aceitar qualquer futura auditoria gerada por IA (de qualquer modelo, incluindo eu), pedir que ela rode contra os arquivos reais do ZIP, não contra memória/inferência de como o projeto "provavelmente" está estruturado.

---

## 10. Changelog / rastreabilidade

- **ATR-001, ATR-002:** histórico, não revisados neste documento.
- **ATR-003 (Meta AI, original):** histórico. Mantida no repositório para rastreabilidade, mas **substituída por esta revisão** como documento de referência. Não deve ser citada isoladamente como evidência válida.
- **ATR-003 Revisada (este documento):** versão oficial de registro a partir de 2026-08-06.

> A ATR-003 foi revisada após confronto direto com o código-fonte do repositório. Foram identificadas inconsistências factuais na versão inicial da auditoria (itens 004 e 007, e o estado do item 005 no momento da auditoria original), corrigidas nesta revisão. As conclusões passam a refletir exclusivamente evidências verificadas nos artefatos do projeto.

---

*Documento gerado por revisão direta do código-fonte do repositório (ZIP fornecido em 2026-08-06), substituindo a ATR-003 - Parte 1 Consolidada anterior. Revisão de redação em 2026-08-06: linguagem que atribuía intenção ("fabricada") substituída por descrição técnica neutra ("não corroborada pelos artefatos"), a pedido de revisão editorial.*
