// MOTOR RURAL v7.1 - Consulta Biblioteca Oficial
// Principio: MOTOR NUNCA SABE MF. QUEM SABE E A BIBLIOTECA.
// AT-007 (auditoria externa 24/08/2026, fronteira legal confirmada 25/08/2026): validação de
// entrada, tratamento de erro HTTP, e correção da fronteira exata de 4 MF (Lei 8.629/93, art. 4º,
// na redação dada pela Lei 13.465/2017 — ver comentário na função para detalhe e fontes).

export async function analisarRural({ municipio, uf, area_ha }) {
  // 0. Validação de entrada — antes não existia, área 0/negativa/NaN e UF inválida
  // produziam resultado silenciosamente errado ou exceção não tratada.
  const erroValidacao = validarEntradaRural({ municipio, uf, area_ha });
  if (erroValidacao) {
    return {
      motor: "rural", versao: "7.1", status: "erro",
      resultado: null,
      fundamentos: [], alertas: [erroValidacao],
      confianca: 0
    };
  }

  // 1. Carrega Biblioteca
  // AT-006: path relativo (./) em vez de absoluto (/) - path absoluto quebra em GitHub Pages
  // de projeto, que publica sob /nome-do-repo/ e não na raiz do domínio (mesmo bug já corrigido
  // no index.html via AT-004).
  let biblioteca;
  try {
    const resp = await fetch(`./biblioteca/BR/${uf}/${uf.toLowerCase() === 'al' ? 'alagoas' : uf.toLowerCase()}.json`);
    if (!resp.ok) {
      return {
        motor: "rural", versao: "7.1", status: "erro",
        resultado: null,
        fundamentos: [], alertas: [`Biblioteca não encontrada para UF "${uf}" (HTTP ${resp.status}) - verifique se o estado está publicado`],
        confianca: 0
      };
    }
    biblioteca = await resp.json();
  } catch (e) {
    return {
      motor: "rural", versao: "7.1", status: "erro",
      resultado: null,
      fundamentos: [], alertas: [`Falha ao carregar biblioteca: ${e.message}`],
      confianca: 0
    };
  }

  // 2. Consulta
  const dadosConsultados = biblioteca.find(m => 
    m.municipio === municipio.toUpperCase()
  );
  
  if (!dadosConsultados) {
    return {
      motor: "rural", versao: "7.1", status: "erro",
      resultado: null,
      fundamentos: [], alertas: ["Município não encontrado na biblioteca"],
      confianca: 0
    };
  }

  // 3. Aplica regras (sem fixar numero)
  const mf = dadosConsultados.modulo_fiscal_ha;
  const fmp = dadosConsultados.fracao_minima_parcelamento_ha;
  const qtdMF = area_ha / mf;
  
  // AT-007: classificação corrigida conforme Lei 8.629/93, art. 4º, II "a" (redação vigente
  // dada pela Lei 13.465/2017: pequena propriedade = "área até quatro módulos fiscais" — inclui
  // o 4; redação anterior à 2017 dizia "compreendida entre 1 e 4", também incluindo o 4).
  // Média propriedade (art. 4º, III "a"): "área superior a quatro e até quinze módulos fiscais"
  // — exclui o 4 nas duas redações. Confirmado contra fonte primária em 25/08/2026.
  // minifúndio < 1 MF | pequena propriedade DE 1 A 4 MF (inclusive) | média propriedade
  // SUPERIOR a 4 MF e até 15 MF | latifúndio > 15 MF.
  // Antes (AT-006): "qtdMF >= 4" classificava exatamente 4 MF como média — errado tanto
  // pelo comentário interno ("pequena de 1 a 4") quanto pela redação da lei (pequena inclui o 4).
  let classificacao = "minifundio";
  if (qtdMF > 15) classificacao = "latifundio";
  else if (qtdMF > 4) classificacao = "media_propriedade";
  else if (qtdMF >= 1) classificacao = "pequena_propriedade";

  // 4. Retorna JSON padronizado
  return {
    motor: "rural",
    versao: "7.1",
    status: "ok",
    dadosEntrada: { municipio, uf, area_ha },
    dadosConsultados: dadosConsultados,
    resultado: {
      modulo_fiscal: mf,
      fmp: fmp,
      quantidade_modulos: Number(qtdMF.toFixed(2)),
      classificacao: classificacao,
      permite_desmembramento: area_ha >= fmp
    },
    fundamentos: [
      // AT-006: campo real no schema de alagoas.json é "fonte" (fonte_normativa não existe -> vinha "undefined")
      `${dadosConsultados.fonte}`,
      `INCRA MF=${mf}ha para ${municipio}`
    ],
    alertas: area_ha < fmp ? [`Área abaixo da FMP de ${fmp}ha`] : [],
    limitacoes: ["Consulta apenas AL. Outros estados em expansao"],
    confianca: 0.95,
    dependencias: ["biblioteca/BR/AL/alagoas.json v2022.1"]
  };
}

// AT-007: validação isolada, testável separadamente do fluxo assíncrono de fetch.
function validarEntradaRural({ municipio, uf, area_ha }) {
  if (!municipio || typeof municipio !== 'string' || !municipio.trim()) {
    return "Município não informado";
  }
  if (!uf || typeof uf !== 'string' || uf.trim().length !== 2) {
    return `UF inválida: "${uf}" - esperado sigla de 2 letras (ex: AL)`;
  }
  if (typeof area_ha !== 'number' || Number.isNaN(area_ha)) {
    return `Área informada não é um número válido: ${area_ha}`;
  }
  if (area_ha <= 0) {
    return `Área deve ser maior que zero (recebido: ${area_ha}ha)`;
  }
  if (!Number.isFinite(area_ha)) {
    return `Área deve ser um valor finito (recebido: ${area_ha})`;
  }
  return null;
}
