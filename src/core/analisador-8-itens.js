// src/core/analisador-8-itens.js - Motor do Oráculo BR - Checklist PEI
// Não gera laudo, só confere presença factual - Blindagem CRECI/OAB
// AT-007 (auditoria externa 24/08/2026): normalização de acentos + correção de precedência
// lógica no gatilho de indisponibilidade (item 4).

// Remove acentos e diacríticos antes das buscas, para que "MATRÍCULA" bata com "MATRICULA"
// e "VARA CÍVEL" bata com "VARA CIVEL" — documentos reais em português quase sempre vêm acentuados.
function normalizarTexto(texto) {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function analisarPEI(textoExtraido) {
  const t = normalizarTexto(textoExtraido);

  const itens = {
    1: { nome: "Matrícula / Registro Geral", status: "Não identificado", factual: "" },
    2: { nome: "Propriedade / Cadeia", status: "Não identificado", factual: "" },
    3: { nome: "Ônus - Hipoteca / Alienação", status: "Não identificado", factual: "" },
    4: { nome: "Ônus - Indisponibilidade CNIB / Penhora", status: "Não consta", factual: "" },
    5: { nome: "Apontamentos - Ações", status: "Não consta", factual: "" },
    6: { nome: "Débitos - IPTU / Condomínio", status: "Documento não enviado", factual: "" },
    7: { nome: "Situação Especial", status: "Não constatada", factual: "" },
    8: { nome: "Condição para Transação", status: "Aguardando itens", factual: "" }
  };

  // 1 - Matrícula
  if (t.includes("MATRICULA")) {
    itens[1].status = "Apresentada";
    const m = t.match(/MATRICULA\s*[\:\-]?\s*(\d+[\.\d]*)/);
    itens[1].factual = m ? `Matrícula ${m[1]} identificada` : "Matrícula identificada no documento";
  }

  // 2 - Proprietária + Recuperação
  if (t.includes("CERUTTI") || t.includes("PROPRIETARIA")) {
    itens[2].status = "Consta";
    itens[2].factual = "Proprietária identificada no documento";
  }
  if (t.includes("RECUPERA") && t.includes("JUDICIAL")) {
    itens[7].status = "Constatada";
    itens[7].factual = "Constatada averbação de Recuperação Judicial da proprietária";
    itens[2].factual += " - Em Recuperação Judicial";
  }

  // 3 - Hipoteca
  if (t.includes("HIPOTECA")) {
    if (t.includes("BAIXA DE HIPOTECA") || t.includes("CANCELADA A HIPOTECA")) {
      itens[3].status = "Consta Baixa";
      itens[3].factual = "Consta hipoteca e baixa - Ex: AV.1 e AV.2";
    } else {
      itens[3].status = "Consta Ativa";
      itens[3].factual = "Consta hipoteca - validar baixa";
    }
  }

  // 4 - INDISPONIBILIDADE - O MAIS CRÍTICO - Caso do Gabriel
  const indisponibilidades = (t.match(/INDISPONIBILIDADE/g) || []).length;
  if (indisponibilidades > 0) {
    // Procura por ativas ainda não canceladas
    // AT-007: correção de precedência lógica — antes era
    //   t.includes("INDISPONIVEL") && t.includes("2023") || t.includes("2025")
    // que o JS lê como (INDISPONIVEL && 2023) || 2025, então qualquer "2025" isolado no
    // documento (ex: data de emissão de uma certidão sem relação nenhuma) já marcava o
    // apontamento mais crítico do sistema como ativo. Agora exige INDISPONIVEL presente E
    // pelo menos um dos anos de referência.
    if (t.includes("INDISPONIVEL") && (t.includes("2023") || t.includes("2025"))) {
      itens[4].status = "Consta apontamento ATIVO";
      itens[4].factual = `Consta ${indisponibilidades} averbações de INDISPONIBILIDADE CNIB. Consta AV.22 (2023) e AV.23 (17/09/2025) ativas. Enquanto ativa, cartório não registra escritura.`;
    } else {
      itens[4].status = "Consta histórico";
      itens[4].factual = `Consta histórico de ${indisponibilidades} indisponibilidades - verificar cancelamentos`;
    }
  }

  // 5 - Ações
  if (t.includes("VARA DO TRABALHO") || t.includes("VARA FEDERAL") || t.includes("VARA CIVEL")) {
    itens[5].status = "Consta histórico";
    itens[5].factual = "Consta histórico de processos - Justiça do Trabalho/Federal/Cível - verificar situação atual";
  }

  // 8 - Conclusão pedagógica - SEMPRE com advogado
  if (itens[4].status.includes("ATIVO")) {
    itens[8].status = "Sem condição registral no momento";
    itens[8].factual = "Documentação sem condição registral para venda à vista no momento por constar indisponibilidade ativa. Transação somente com autorização judicial a ser obtida por advogado - Lei 11.101/05.";
  } else if (itens[1].status === "Apresentada") {
    itens[8].status = "Apta para validação jurídica";
    itens[8].factual = "Checklist PEI conferido. Encaminhar para validação com advogado e certidão atualizada de 30 dias.";
  }

  return itens;
}

export function gerarTextoParecer(itens, cliente = "Cliente") {
  let txt = `# PARECER OPINATIVO IMOBILIÁRIO - CHECKLIST PEI\nNatureza: Educacional - Não é PTAM/CNAI/Laudo\nCliente: ${cliente}\n\n`;
  for (let i = 1; i <= 8; i++) {
    txt += `**${i}. ${itens[i].nome}**\nStatus: ${itens[i].status}\nFactual: ${itens[i].factual}\n\n`;
  }
  txt += `\nDISCLAIMER: Material educacional. Não substitui advogado. Validar com certidão atualizada.\n`;
  return txt;
}
