# Suíte de Regressão — AT-008

**Objeto:** correções em `docs/gerar-pdf.js` (escape de HTML/XSS, path relativo, tratamento de erro, exportação sem efeito colateral).

**Origem:** auditoria interna de 26/08/2026, no mesmo espírito da auditoria externa que originou o AT-007 — arquivo nunca havia sido revisado antes, apesar de ser citado repetidamente no `index.html` como o mecanismo de geração do PDF oficial ("via endpoint dedicado, a implementar").

**Status:** implementado e testado — bug fix concluído, não pendente de deliberação de Mesa.

**Como rodar:** `node docs/tests/teste_at008.mjs` (Node ≥ 18, sem dependências externas).

**Limitação importante:** esta suíte testa apenas `montarHTML()` e `escapeHTML()` — lógica pura, sem navegador. As funções `renderizarPDF()` e `gerarPDF()` dependem do pacote `puppeteer` e de um binário do Chrome, **indisponíveis no ambiente onde esta suíte foi escrita e validada**. Isso não é uma omissão: as funções que dependiam de Chrome foram deliberadamente separadas das que não dependem (refatoração que também corrige o item de arquitetura do AT-008), justamente para que a parte mais crítica — o escape de HTML contra XSS — pudesse ser testada sem essa dependência. Antes de considerar este arquivo pronto para produção, alguém com Puppeteer instalado deve rodar `node docs/gerar-pdf.js` manualmente e confirmar que um PDF válido é gerado.

| Caso | O que verifica | Referência |
|---|---|---|
| 1-3 | `escapeHTML()` escapa `<`, `>`, `&`, `"` corretamente; não quebra com números | AT-008 item 1 |
| 4-6 | `montarHTML()` substitui placeholders corretamente no caminho feliz | Regressão — não quebrar o caminho feliz |
| 7-9 | Conteúdo malicioso (`<script>`, `<img onerror>`) em campos de texto livre NÃO entra cru no HTML final | AT-008 item 1 (o mais importante desta suíte) |
| 10 | `montarHTML()` funciona independente do diretório de onde o processo é executado | AT-008 item 2 |

**Não coberto por esta suíte (requer Chrome/Puppeteer, testar manualmente):**
- Geração real do arquivo PDF (`renderizarPDF()`)
- Fechamento garantido do browser em caso de falha (`try/finally`)
- Comportamento de `gerarPDF()` ponta a ponta
