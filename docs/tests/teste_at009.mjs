// docs/tests/teste_at009.mjs
// Suíte de regressão AT-009 — ver README-AT-009.md nesta mesma pasta para contexto completo.
// Roda com: node docs/tests/teste_at009.mjs (Node >= 18, sem dependências externas).
//
// Objeto: normalizeBusca() em index.html (busca de município tolerante a apóstrofo/
// hífen/espaço) + remoção do campo redundante municipio_busca em alagoas.json e
// config.json (era código morto — nunca era lido, pois 'municipio' vem primeiro no
// fallback e está sempre presente nos 102 registros).

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

// Extrai normalizeBusca() diretamente do index.html (garante que o teste valida
// a função que está de fato publicada, não uma cópia que possa divergir).
const htmlPath = path.join(REPO_ROOT, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const match = html.match(/function normalizeBusca[\s\S]*?\n}/);
if (!match) {
  console.log('❌ ERRO FATAL: normalizeBusca() não encontrada em index.html');
  process.exit(1);
}
const normalizeBusca = eval('(' + match[0] + ')'); // eslint-disable-line no-eval -- extração controlada de código próprio do repo

console.log('--- normalizeBusca() (AT-009 item 1: apóstrofo/espaço/hífen) ---');

const canonicoOlhoDagua = normalizeBusca("Olho d'Água das Flores");
assert(normalizeBusca('olho dagua das flores') === canonicoOlhoDagua,
  '"olho dagua das flores" (sem apóstrofo) casa com "Olho d\'Água das Flores"');
assert(normalizeBusca('olho d agua das flores') === canonicoOlhoDagua,
  '"olho d agua das flores" (espaço no lugar do apóstrofo) casa com o nome oficial');
assert(normalizeBusca('OLHO D\'ÁGUA DAS FLORES') === canonicoOlhoDagua,
  'maiúsculas variadas não afetam o resultado');
assert(normalizeBusca('olho d’agua das flores') === canonicoOlhoDagua,
  'apóstrofo curvo (’) é tratado igual ao reto (\')');

const canonicoTanque = normalizeBusca("Tanque d'Arca");
assert(normalizeBusca('tanque darca') === canonicoTanque,
  '"tanque darca" casa com "Tanque d\'Arca"');
assert(normalizeBusca('tanque  d arca') === canonicoTanque,
  'espaços duplicados/extras não quebram a comparação');

assert(normalizeBusca('Sao Miguel dos Campos') === normalizeBusca('São Miguel dos Campos'),
  'acento (São -> Sao) continua tratado corretamente (regressão do comportamento antigo)');

console.log('\n--- Base real de Alagoas (AT-009 item 2: zero colisão, zero dependência de municipio_busca) ---');

const alagoasPath = path.join(REPO_ROOT, 'biblioteca/BR/AL/alagoas.json');
const alagoas = JSON.parse(fs.readFileSync(alagoasPath, 'utf8'));

assert(alagoas.length === 102, `base de Alagoas tem 102 municípios (encontrado: ${alagoas.length})`);

const semMunicipioBusca = alagoas.every(m => !('municipio_busca' in m));
assert(semMunicipioBusca, 'nenhum dos 102 registros possui mais o campo municipio_busca (removido por ser código morto)');

const chaves = new Map();
let colisoes = 0;
alagoas.forEach(m => {
  const chave = normalizeBusca(m.municipio);
  if (chaves.has(chave)) colisoes++;
  chaves.set(chave, m.municipio);
});
assert(colisoes === 0, `zero colisões entre os 102 municípios normalizados (encontrado: ${colisoes})`);

console.log('\n--- Sentinelas do diagnóstico 10/10 (AT-009 item 3: config.json sem municipio_busca) ---');

const configPath = path.join(REPO_ROOT, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const sentinelasSemCampo = Object.values(config.checks).every(c => !('municipio_busca' in c));
assert(sentinelasSemCampo, 'as 4 sentinelas em config.json.checks não possuem mais municipio_busca');

const getField = (m, keys) => { for (const k of keys) { if (m[k] !== undefined) return m[k]; } return undefined; };
const findMun = (nomeNorm) => alagoas.find(x => normalizeBusca(getField(x, ['municipio', 'nome', 'municipio_nome'])) === nomeNorm);

Object.keys(config.checks).forEach(nome => {
  const esperado = config.checks[nome];
  const reg = findMun(nome);
  const ok = !!reg
    && Number(reg.modulo_fiscal_ha) === esperado.modulo_fiscal_ha
    && Number(reg.fracao_minima_parcelamento_ha) === esperado.fracao_minima_parcelamento_ha;
  assert(ok, `sentinela "${nome}" encontrada e com MF/FMP corretos, sem depender de municipio_busca`);
});

console.log(`\n${'='.repeat(50)}`);
console.log(falhas === 0
  ? `🎉 TODOS OS ${total} TESTES PASSARAM`
  : `❌ ${falhas} de ${total} teste(s) falharam`);
process.exit(falhas === 0 ? 0 : 1);
