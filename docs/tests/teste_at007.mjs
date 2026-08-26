// docs/tests/teste_at007.mjs
// Suíte de regressão AT-007 — ver README-AT-007.md nesta mesma pasta para contexto completo.
// Roda com: node docs/tests/teste_at007.mjs (Node >= 18, sem dependências externas).
//
// Simula o fetch relativo que motor_rural.js usa, apontando para uma biblioteca de teste
// fixa (não a biblioteca real de produção), para isolar o teste de qualquer estado externo.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const BIBLIOTECA_TESTE = [
  { municipio: 'MACEIÓ', modulo_fiscal_ha: 10, fracao_minima_parcelamento_ha: 2, fonte: 'INCRA/PGT (fixture de teste)' }
];

global.fetch = async (url) => {
  if (url.includes('/AL/')) {
    return { ok: true, status: 200, json: async () => BIBLIOTECA_TESTE };
  }
  return { ok: false, status: 404, json: async () => { throw new Error('not found'); } };
};

const { analisarRural } = await import(path.join(REPO_ROOT, 'src/motores/motor_rural.js'));
const { analisarPEI } = await import(path.join(REPO_ROOT, 'src/core/analisador-8-itens.js'));

let falhas = 0;
let total = 0;

function assert(cond, msg) {
  total++;
  if (!cond) {
    console.log(`❌ FALHOU [${total}]:`, msg);
    falhas++;
  } else {
    console.log(`✅ [${total}]`, msg);
  }
}

console.log('--- motor_rural.js: validação de entrada (AT-007 item 2) ---');

const r1 = await analisarRural({ municipio: 'MACEIÓ', uf: 'AL', area_ha: 0 });
assert(r1.status === 'erro', 'área 0 retorna status=erro (antes virava minifúndio silencioso)');

const r2 = await analisarRural({ municipio: 'MACEIÓ', uf: 'AL', area_ha: -5 });
assert(r2.status === 'erro', 'área negativa retorna status=erro');

const r3 = await analisarRural({ municipio: 'MACEIÓ', uf: 'AL', area_ha: NaN });
assert(r3.status === 'erro', 'área NaN retorna status=erro');

const r4 = await analisarRural({ municipio: 'MACEIÓ', uf: 'ZZ', area_ha: 10 });
assert(r4.status === 'erro', 'UF inválida retorna status=erro tratado, sem exceção não capturada');

console.log('\n--- motor_rural.js: fronteira legal de 4 MF (AT-007 item 3, Lei 8.629/93 art. 4º) ---');

const r5 = await analisarRural({ municipio: 'MACEIÓ', uf: 'AL', area_ha: 40 }); // 40/10 = exatamente 4 MF
assert(r5.resultado?.classificacao === 'pequena_propriedade', `exatamente 4 MF é pequena_propriedade (veio: ${r5.resultado?.classificacao})`);

const r6 = await analisarRural({ municipio: 'MACEIÓ', uf: 'AL', area_ha: 40.1 }); // 4.01 MF
assert(r6.resultado?.classificacao === 'media_propriedade', `4.01 MF é media_propriedade (veio: ${r6.resultado?.classificacao})`);

const r7 = await analisarRural({ municipio: 'MACEIÓ', uf: 'AL', area_ha: 5 }); // 0.5 MF
assert(r7.status === 'ok' && r7.resultado?.classificacao === 'minifundio', 'caso normal (0.5 MF) continua funcionando, como minifundio');

console.log('\n--- analisador-8-itens.js: precedência lógica do "2025" (AT-007 item 4) ---');

const doc1 = 'CERTIDÃO EMITIDA EM 2025. Consta ônus de INDISPONIBILIDADE averbada e cancelada em 2019 (AV.5).';
const p1 = analisarPEI(doc1);
assert(p1[4].status !== 'Consta apontamento ATIVO', '"2025" isolado (sem INDISPONIVEL ativo) NÃO dispara mais o alerta crítico');

const doc2 = 'Consta AV.23 de INDISPONIBILIDADE datada de 17/09/2025, ainda INDISPONIVEL, sem baixa.';
const p2 = analisarPEI(doc2);
assert(p2[4].status === 'Consta apontamento ATIVO', 'INDISPONIVEL + 2025 real ainda dispara o alerta corretamente');

console.log('\n--- analisador-8-itens.js: normalização de acentos (AT-007 item 5) ---');

const doc3 = 'Imóvel objeto da MATRÍCULA nº 12.345 do Cartório de Registro de Imóveis.';
const p3 = analisarPEI(doc3);
assert(p3[1].status === 'Apresentada', 'MATRÍCULA acentuada é reconhecida');

const doc4 = 'Processo em trâmite na 3ª VARA CÍVEL da comarca.';
const p4 = analisarPEI(doc4);
assert(p4[5].status === 'Consta histórico', 'VARA CÍVEL acentuada é reconhecida');

console.log(`\n${'='.repeat(50)}`);
console.log(falhas === 0
  ? `🎉 TODOS OS ${total} TESTES PASSARAM`
  : `❌ ${falhas} de ${total} teste(s) falharam`);
process.exit(falhas === 0 ? 0 : 1);
