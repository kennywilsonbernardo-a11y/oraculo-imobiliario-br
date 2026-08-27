// docs/tests/teste_at008.mjs
// Suíte de regressão AT-008 — ver README-AT-008.md nesta mesma pasta para contexto completo.
// Roda com: node docs/tests/teste_at008.mjs (Node >= 18, sem dependências externas).
//
// IMPORTANTE: testa apenas montarHTML() e escapeHTML() (lógica pura, sem navegador).
// renderizarPDF() e gerarPDF() dependem do Puppeteer/Chrome, indisponível neste ambiente de
// teste — precisam ser testados manualmente ou em CI com Chrome instalado (ver README).

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const require = createRequire(import.meta.url);

const { montarHTML, escapeHTML } = require(path.join(REPO_ROOT, 'docs/gerar-pdf.js'));

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

console.log('--- escapeHTML() (AT-008 item 1: segurança) ---');

assert(escapeHTML('<script>alert(1)</script>') === '&lt;script&gt;alert(1)&lt;/script&gt;',
  'tag <script> é escapada corretamente');

assert(escapeHTML('João & Maria "teste"') === 'João &amp; Maria &quot;teste&quot;',
  '&, " são escapados corretamente');

assert(escapeHTML(123) === '123',
  'valores não-string (número) são convertidos e tratados sem quebrar');

console.log('\n--- montarHTML() (AT-008 itens 1 e 2: escape aplicado + path correto) ---');

const dadosBase = {
  protocolo: 'PEI-AL-TESTE-0001',
  data: '26/08/2026',
  verificacoes_concluidas: '3',
  verificacoes_total: '5',
  percentual_cobertura: '60',
  tipo_imovel: 'Apartamento',
  cidade: 'Maceió',
  uf: 'AL',
  impostos_alerta: 'ITBI 3%',
  alerta_conjuge: 'N/A',
  casos_especiais_lista: 'Nenhum',
  hash_auditoria: 'sha256:teste',
  hash_auditoria_curto: 'teste1',
  checklist: [
    { id: 'doc1', nome: 'Documento Normal', obrigatorio: true, enviado: true, onde_emitir: 'Cartório' }
  ]
};

const html1 = montarHTML(dadosBase);
assert(html1.includes('PEI-AL-TESTE-0001'), 'protocolo é inserido corretamente no HTML');
assert(html1.includes('Documento Normal'), 'nome do documento do checklist aparece na tabela');
assert(!html1.includes('{{'), 'nenhum placeholder {{...}} sobra sem substituir no caminho feliz');

// Caso adversarial: dado com HTML/script embutido em um campo de texto livre
const dadosMaliciosos = {
  ...dadosBase,
  alerta_conjuge: '<img src=x onerror=alert(1)>',
  checklist: [
    { id: 'doc1', nome: '<script>alert("xss")</script>', obrigatorio: true, enviado: true, onde_emitir: 'Cartório' }
  ]
};
const html2 = montarHTML(dadosMaliciosos);
assert(!html2.includes('<img src=x onerror=alert(1)>'),
  'campo de texto livre com HTML embutido NÃO entra cru no PDF (estava vulnerável antes do AT-008)');
assert(!html2.includes('<script>alert("xss")</script>'),
  'nome de documento com HTML embutido NÃO entra cru no PDF (estava vulnerável antes do AT-008)');
assert(html2.includes('&lt;script&gt;'),
  'a versão escapada do conteúdo malicioso aparece como texto visível, não como HTML executável');

console.log('\n--- path via __dirname (AT-008 item 2: funciona independente do diretório de execução) ---');

const cwdOriginal = process.cwd();
try {
  process.chdir('/tmp');
  const html3 = montarHTML(dadosBase);
  assert(html3.includes('PEI-AL-TESTE-0001'), 'montarHTML() funciona mesmo executando de fora do diretório docs/ (path via __dirname, não relativo ao CWD)');
} finally {
  process.chdir(cwdOriginal);
}

console.log(`\n${'='.repeat(50)}`);
console.log(falhas === 0
  ? `🎉 TODOS OS ${total} TESTES PASSARAM (nota: renderizarPDF()/gerarPDF() não testados aqui — exigem Chrome/Puppeteer, ver README-AT-008.md)`
  : `❌ ${falhas} de ${total} teste(s) falharam`);
process.exit(falhas === 0 ? 0 : 1);
