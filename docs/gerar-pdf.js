// docs/gerar-pdf.js
// Gera o PDF oficial do Oráculo a partir do template Bloco A/B/C.
// AT-008 (auditoria interna 26/08/2026, mesmo padrão do AT-007): escapeHTML() em todo dado
// dinâmico (alinhado à disciplina de ADR-001-02, já aplicada no index.html mas ausente aqui),
// path absoluto via __dirname (mesma classe de bug de AT-004/AT-006), try/finally com
// fechamento garantido do browser, e exportação de gerarPDF() sem efeito colateral ao ser
// importado (necessário para o futuro endpoint dedicado citado no index.html).

const fs = require('fs');
const path = require('path');

// AT-008: mesma disciplina descrita em ADR-001-02 (mitigação de XSS via innerHTML +
// escapeHTML() manual). Estava presente no index.html mas ausente aqui — todo valor dinâmico
// que entra no HTML do PDF precisa passar por aqui antes.
function escapeHTML(valor) {
  return String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// AT-008: separado de renderizarPDF() para poder ser testado sem precisar do Puppeteer/Chrome
// — a montagem do HTML é lógica pura (string in, string out) e testável isoladamente, mesmo
// em ambientes sem navegador disponível.
function montarHTML(dados) {
  const templatePath = path.join(__dirname, 'template-relatorio-3-blocos.html');
  let html;
  try {
    html = fs.readFileSync(templatePath, 'utf-8');
  } catch (e) {
    throw new Error(`Template não encontrado em ${templatePath}: ${e.message}`);
  }

  for (const [k, v] of Object.entries(dados)) {
    if (k === 'checklist') continue; // tratado à parte abaixo, não é substituição direta de texto
    html = html.replaceAll(`{{${k}}}`, escapeHTML(v));
  }

  const linhas = (dados.checklist || []).map(item => {
    const tag = item.obrigatorio
      ? '<span class="tag-obrigatorio">OBRIGATÓRIO</span>'
      : '<span class="tag-recomendado">RECOMENDADO</span>';
    const status = item.enviado ? '✅ Enviado' : '⏳ Pendente';
    return `<tr><td><strong>${escapeHTML(item.nome)}</strong><br><span class="sub">${escapeHTML(item.id)}</span></td><td>${tag}</td><td>${status}</td><td class="onde">${escapeHTML(item.onde_emitir || '-')}</td></tr>`;
  }).join('\n');

  return html.replace('{{linhas_checklist}}', linhas);
}

// AT-008: try/finally garante que o browser feche mesmo se setContent()/page.pdf() falhar —
// antes, uma falha no meio do processo deixava processos órfãos do Chrome rodando.
// puppeteer é carregado aqui dentro (lazy), não no topo do arquivo, para que montarHTML() e
// escapeHTML() continuem importáveis/testáveis mesmo em ambientes sem Puppeteer instalado.
async function renderizarPDF(html, protocolo) {
  const puppeteer = require('puppeteer');
  if (!protocolo || typeof protocolo !== 'string') {
    throw new Error(`Protocolo inválido para nome de arquivo: ${protocolo}`);
  }
  const nomeArquivo = `relatorio-${protocolo.replace(/[^a-zA-Z0-9\-_.]/g, '_')}.pdf`;
  const caminhoSaida = path.join(__dirname, nomeArquivo);

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({ path: caminhoSaida, format: 'A4', printBackground: true });
    return caminhoSaida;
  } finally {
    if (browser) await browser.close();
  }
}

// AT-008: função pública, exportada, sem efeito colateral ao importar — necessária para o
// futuro endpoint dedicado citado no index.html ("PDF oficial... será gerado via endpoint
// dedicado"). Antes, este arquivo disparava a geração de um PDF de exemplo assim que fosse
// importado por qualquer código, o que quebraria um endpoint real.
async function gerarPDF(dados) {
  const html = montarHTML(dados);
  const caminho = await renderizarPDF(html, dados.protocolo);
  console.log('PDF gerado:', caminho);
  return caminho;
}

module.exports = { gerarPDF, montarHTML, escapeHTML };

// AT-008: só roda o exemplo abaixo se este arquivo for executado diretamente
// (node docs/gerar-pdf.js) — não quando importado como módulo por outro código.
if (require.main === module) {
  const exemplo = {
    protocolo: 'PEI-AL-2026-001',
    data: '23/08/2026',
    verificacoes_concluidas: '6',
    verificacoes_total: '11',
    percentual_cobertura: '54',
    tipo_imovel: 'Apartamento em condomínio',
    cidade: 'Maceió',
    uf: 'AL',
    impostos_alerta: 'ITBI previsto - alíquota Maceió 3% (padrão) - exceção SFH: 0,5% financiado + 2% restante - verificar Prefeitura',
    alerta_conjuge: 'Vendedor casado comunhão parcial - exige outorga uxória - sem outorga venda nula',
    casos_especiais_lista: 'Nenhum - imóvel padrão urbano',
    hash_auditoria: 'sha256:a1b2c3d4e5f6...',
    hash_auditoria_curto: 'a1b2c3',
    checklist: [
      {id:'matricula_atualizada', nome:'Matrícula Atualizada + Ônus Reais', obrigatorio:true, enviado:true, onde_emitir:'CRI Maceió - registradores.onr.org.br'},
      {id:'cnd_iptu', nome:'CND IPTU', obrigatorio:true, enviado:true, onde_emitir:'Prefeitura Maceió'},
      {id:'cnd_condominio', nome:'CND Condominial + Ata síndico', obrigatorio:true, enviado:false, onde_emitir:'Administradora'},
      {id:'cnd_vendedor_pf', nome:'CNDs Vendedor - Cível, Criminal, Trabalhista, Federal', obrigatorio:true, enviado:false, onde_emitir:'TJAL - tjal.jus.br (apenas link)'},
      {id:'habitese', nome:'Habite-se', obrigatorio:false, enviado:true, onde_emitir:'Prefeitura'}
    ]
  };
  gerarPDF(exemplo).catch(e => {
    console.error('Falha ao gerar PDF de exemplo:', e.message);
    process.exit(1);
  });
}
