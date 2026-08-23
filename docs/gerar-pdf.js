
const puppeteer = require('puppeteer');
const fs = require('fs');

async function gerarPDF(dados) {
  const template = fs.readFileSync('./template-relatorio-3-blocos.html','utf-8');
  let html = template;
  
  // Substitui variáveis simples
  for (const [k,v] of Object.entries(dados)) {
    html = html.replaceAll(`{{${k}}}`, v);
  }
  
  // Gera linhas da tabela Bloco B a partir da matriz
  const linhas = dados.checklist.map(item => {
    const tag = item.obrigatorio ? '<span class="tag-obrigatorio">OBRIGATÓRIO</span>' : '<span class="tag-recomendado">RECOMENDADO</span>';
    const status = item.enviado ? '✅ Enviado' : '⏳ Pendente';
    return `<tr><td><strong>${item.nome}</strong><br><span class="sub">${item.id}</span></td><td>${tag}</td><td>${status}</td><td class="onde">${item.onde_emitir || '-'}</td></tr>`;
  }).join('\n');
  
  html = html.replace('{{linhas_checklist}}', linhas);

  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.setContent(html, {waitUntil:'networkidle0'});
  await page.pdf({path: `relatorio-${dados.protocolo}.pdf`, format:'A4', printBackground:true});
  await browser.close();
  console.log('PDF gerado: relatorio-'+dados.protocolo+'.pdf');
}

// Exemplo de uso - self-service sem atalho
const exemplo = {
  protocolo: 'PEI-AL-2026-001',
  data: '23/08/2026',
  verificacoes_concluidas: '6',
  verificacoes_total: '11',
  percentual_cobertura: '54',
  tipo_imovel: 'Apartamento em condomínio',
  cidade: 'Maceió',
  uf: 'AL',
  impostos_alerta: 'ITBI previsto - alíquota Maceió 2% - verificar Prefeitura',
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

gerarPDF(exemplo);
