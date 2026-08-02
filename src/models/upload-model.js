// src/models/upload-model.js - Modelo de Upload para os 8 itens - PEI
// Recebe arquivo e envia para o motor analisador-8-itens.js

import { analisarPEI } from '../core/analisador-8-itens.js';

// Função que o front-end chama quando cliente faz upload
export async function processarUploadPEI(file) {
  // 1. Validação simples
  if (!file) return { erro: "Nenhum arquivo enviado" };
  
  // 2. Lê o texto do arquivo (para PDF precisa de lib pdfjs, aqui MVP em texto)
  const textoExtraido = await extrairTexto(file);
  
  // 3. Chama o motor dos 8 itens
  const resultado = analisarPEI(textoExtraido);
  
  // 4. Formata para o MODELO-PARECER-PEI.md
  return {
    nomeArquivo: file.name,
    data: new Date().toLocaleString('pt-BR'),
    checklist: resultado.itens,
    resumoFactual: resultado.resumo,
    parecerPronto: gerarTextoParecer(resultado)
  };
}

async function extrairTexto(file) {
  // MVP: se for .txt ou .md lê direto. Se for PDF, usar pdfjs no futuro
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(file);
  });
}

function gerarTextoParecer(resultado) {
  // Gera o texto já no formato do seu docs/MODELO-PARECER-PEI.md
  let texto = `PARECER OPINATIVO IMOBILIÁRIO - CHECKLIST PEI\n\n`;
  resultado.itens.forEach((item, i) => {
    texto += `${i+1}. ${item.nome} - Status: ${item.status}\nFactual: ${item.factual}\n\n`;
  });
  texto += `Orientação pedagógica: ${resultado.orientacao}\n\n`;
  texto += `Disclaimer: Material educacional, não é parecer jurídico, PTAM ou laudo.`;
  return texto;
}
