# Suíte de Regressão — AT-007

**Objeto:** correções de auditoria externa em `src/motores/motor_rural.js` e `src/core/analisador-8-itens.js` (validação de entrada, fronteira legal de 4 módulos fiscais, precedência lógica do gatilho de indisponibilidade, normalização de acentos).

**Origem:** auditoria externa de 24/08/2026 sobre a RC v9.2.1, revisada linha a linha contra o código real em 25/08/2026.

**Status:** implementado e passando — não é especificação pendente de motor futuro (diferente da suíte Bulgarelli, que é sobre a ESPEC-Gatilhos-Excecao-Algoritmo, ainda não implementada). Esta suíte cobre bug fix já mergeado, não decisão pendente de Mesa.

**Como rodar:** `node docs/tests/teste_at007.mjs` (Node ≥ 18, sem dependências externas).

**Critério de aceite:** os 11 casos abaixo devem passar. Se qualquer um deles voltar a falhar no futuro (ex: alguém reintroduzir a fronteira `>= 4` ou o operador `||` solto), a suíte falha explicitamente na saída do processo (`exit code 1`), servindo de teste de regressão em CI ou execução manual.

| Caso | Arquivo alvo | O que verifica | Referência |
|---|---|---|---|
| 1-4 | `motor_rural.js` | Validação de entrada (área 0, negativa, NaN, UF inválida) retorna `status:"erro"` tratado | AT-007 item 2 |
| 5-6 | `motor_rural.js` | Fronteira exata de 4 MF: `pequena_propriedade` inclusive, `media_propriedade` só acima | AT-007 item 3, Lei 8.629/93 art. 4º (red. Lei 13.465/2017) |
| 7 | `motor_rural.js` | Caso normal (0.5 MF) continua classificando como `minifundio` | Regressão — não quebrar o caminho feliz |
| 8-9 | `analisador-8-itens.js` | "2025" isolado não ativa indisponibilidade; INDISPONIVEL+2025 real ainda ativa | AT-007 item 4 |
| 10-11 | `analisador-8-itens.js` | "MATRÍCULA" e "VARA CÍVEL" acentuados são reconhecidos | AT-007 item 5 |
