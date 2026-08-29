// docs/tests/teste_at010.mjs
// Suíte de regressão AT-010 — ver README-AT-010.md nesta mesma pasta para contexto completo.
// Roda com: node docs/tests/teste_at010.mjs (Node >= 18, sem dependências externas).
//
// Objeto: rótulo institucional de vigência de dados em config.json (Ciclo 1 do
// planejamento v9.2.2-RC). Troca "provisorio - validar fonte oficial" e "vigente
// conforme fonte cadastrada - validar fonte oficial" por um único texto consistente
// nos dois campos: "Vigente — fonte INCRA PGT (revalidação periódica)".
//
// IMPORTANTE: esta é uma mudança de ENQUADRAMENTO DE COMUNICAÇÃO, não de status real
// de certificação. Conforme docs/ESTADO-ATUAL-ORACULO-2026-08-22.md, o produto segue
// "não certificado como produto pronto" — este AT não altera esse fato nem o texto
// usado aqui reivindica certificação (ver README-AT-010.md para a análise completa).

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

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

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

const configPath = path.join(REPO_ROOT, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const TEXTO_ESPERADO = 'Vigente — fonte INCRA PGT (revalidação periódica)';

console.log('--- Rótulo institucional (AT-010 item 1: texto correto nos dois campos) ---');

assert(config.vigencia_status === TEXTO_ESPERADO,
  `vigencia_status (raiz) contém o novo texto (encontrado: "${config.vigencia_status}")`);

assert(config.fontes?.AL?.status === TEXTO_ESPERADO,
  `fontes.AL.status contém o mesmo texto (encontrado: "${config.fontes?.AL?.status}")`);

assert(config.vigencia_status === config.fontes.AL.status,
  'os dois campos são idênticos entre si (consistência JSON <-> interface)');

console.log('\n--- Ausência do vocabulário antigo (AT-010 item 2: nada de "provisório" solto) ---');

const configTexto = JSON.stringify(config).toLowerCase();
assert(!configTexto.includes('provisorio') && !configTexto.includes('provisório'),
  'a palavra "provisório/provisorio" não aparece mais em nenhum campo de status do config.json');

console.log('\n--- Compatibilidade com o front-end (AT-010 item 3: escapeHTML não quebra o texto) ---');

const escapado = escapeHTML(TEXTO_ESPERADO);
assert(escapado === TEXTO_ESPERADO,
  'o em-dash (—) e os acentos passam intactos pelo escapeHTML() usado no badge da ficha (index.html linha ~380)');

assert(!escapado.includes('undefined') && !escapado.includes('null'),
  'nenhum valor undefined/null vaza para o texto renderizado');

console.log('\n--- Honestidade documental (AT-010 item 4: não é uma alegação de certificação) ---');

const textoMinusculo = TEXTO_ESPERADO.toLowerCase();
assert(!textoMinusculo.includes('certific'),
  'o novo texto NÃO usa a palavra "certificado/certificação" — termo reservado neste projeto ' +
  'para o rito formal definido em ESPEC-Consolidada-Fase2B-v1.2.md (F2B-041), ainda não ' +
  'concluído para este conjunto de dados conforme ESTADO-ATUAL-ORACULO-2026-08-22.md');

assert(textoMinusculo.includes('incra'),
  'a fonte primária (INCRA PGT) continua nomeada explicitamente no texto, mantendo rastreabilidade');

console.log(`\n${'='.repeat(50)}`);
console.log(falhas === 0
  ? `🎉 TODOS OS ${total} TESTES PASSARAM`
  : `❌ ${falhas} de ${total} teste(s) falharam`);
process.exit(falhas === 0 ? 0 : 1);
