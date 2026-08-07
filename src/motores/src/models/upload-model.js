// src/models/upload-model.js - Modelo de Upload para os 8 itens - PEI
// Recebe arquivo e envia para o motor analisador-8-itens.js

import { analisarPEI, gerarTextoParecer } from '../core/analisador-8-itens.js';

// Função que o front-end chama quando cliente faz upload
export async function processarUploadPEI(file) {
  // 1. Validação simples
  if (!file) return { erro: "Nenhum arquivo enviado" };

  // 2. Lê o texto do arquivo (para PDF precisa de lib pdfjs, aqui MVP em texto)
  const textoExtraido = await extrairTexto(file);

  // 3. Chama o motor dos 8 itens
  // AT-006: analisarPEI() retorna o objeto "itens" (chaves 1-8) diretamente,
  // não um wrapper com { itens, resumo, orientacao }. O código antigo acessava
  // resultado.itens / resultado.resumo / resultado.orientacao, que sempre vinham
  // undefined e quebravam gerarTextoParecer() (forEach de undefined).
  const itens = analisarPEI(textoExtraido);

  // 4. Formata para o MODELO-PARECER-PEI.md
  // AT-006: reaproveita gerarTextoParecer() já exportado por analisador-8-itens.js
  // (havia uma segunda função de mesmo nome, duplicada e incompatível, só neste arquivo).
  return {
    nomeArquivo: file.name,
    data: new Date().toLocaleString('pt-BR'),
    checklist: itens,
    parecerPronto: gerarTextoParecer(itens, file.name)
  };
}

async function extrairTexto(file) {
  // MVP: se for .txt ou .md lê direto. Se for PDF, usar pdfjs no futuro
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error(`Falha ao ler o arquivo "${file.name}"`));
    reader.readAsText(file);
  });
}
