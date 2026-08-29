// Teste isolado de src/core/casos-especiais.js — só a função avaliarGatilho, sem fetch.
// Rodar: node docs/tests/teste_casos_especiais.mjs

import { avaliarGatilho } from "../../src/core/casos-especiais.js";

let passou = 0, falhou = 0;
function t(nome, resultado, esperado) {
  const ok = resultado === esperado;
  console.log(`${ok ? "OK " : "FALHOU "} ${nome} -> got ${resultado}, esperado ${esperado}`);
  ok ? passou++ : falhou++;
}

// Achado 1 — REURB
t("REURB dispara com area_reurb=true",
  avaliarGatilho("area_reurb == true", { area_reurb: true }), true);
t("REURB não dispara com area_reurb=false",
  avaliarGatilho("area_reurb == true", { area_reurb: false }), false);

// Achado 2 — Usucapião rural (AND)
t("Usucapião rural dispara com os dois campos certos",
  avaliarGatilho("operacao == usucapiao_administrativa && tipo_imovel == rural",
    { operacao: "usucapiao_administrativa", tipo_imovel: "rural" }), true);
t("Usucapião rural NÃO dispara se tipo_imovel for urbano (AND precisa dos dois)",
  avaliarGatilho("operacao == usucapiao_administrativa && tipo_imovel == rural",
    { operacao: "usucapiao_administrativa", tipo_imovel: "urbano" }), false);

// Bug de precedência (mesmo padrão do AT-007 em motor_rural.js) corrigido em
// matriz_casos_especiais.json: "hipoteca || penhora" -> "matricula_tem_onus == hipoteca ||
// matricula_tem_onus == penhora". Testando a expressão JÁ CORRIGIDA:
t("Hipoteca/Penhora corrigido: NÃO dispara mais com 'penhora' truthy solto e sem onus real",
  avaliarGatilho("matricula_tem_onus == hipoteca || matricula_tem_onus == penhora",
    { matricula_tem_onus: "nenhum", penhora: true }),
  false);
t("Hipoteca/Penhora corrigido: dispara quando matricula_tem_onus == penhora de fato",
  avaliarGatilho("matricula_tem_onus == hipoteca || matricula_tem_onus == penhora",
    { matricula_tem_onus: "penhora" }),
  true);
t("Hipoteca/Penhora corrigido: dispara quando matricula_tem_onus == hipoteca de fato",
  avaliarGatilho("matricula_tem_onus == hipoteca || matricula_tem_onus == penhora",
    { matricula_tem_onus: "hipoteca" }),
  true);

console.log(`\n${passou} passaram, ${falhou} falharam`);
process.exit(falhou > 0 ? 1 : 0);
