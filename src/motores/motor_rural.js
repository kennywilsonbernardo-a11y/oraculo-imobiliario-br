// MOTOR RURAL v7.0 - Consulta Biblioteca Oficial
// Principio: MOTOR NUNCA SABE MF. QUEM SABE E A BIBLIOTECA.

export async function analisarRural({ municipio, uf, area_ha }) {
  // 1. Carrega Biblioteca
  const biblioteca = await fetch(`/biblioteca/BR/${uf}/${uf.toLowerCase() === 'al' ? 'alagoas' : uf.toLowerCase()}.json`).then(r=>r.json());
  
  // 2. Consulta
  const dadosConsultados = biblioteca.find(m => 
    m.municipio === municipio.toUpperCase()
  );
  
  if (!dadosConsultados) {
    return {
      motor: "rural", versao: "7.0", status: "erro",
      resultado: null,
      fundamentos: [], alertas: ["Município não encontrado na biblioteca"],
      confianca: 0
    };
  }

  // 3. Aplica regras (sem fixar numero)
  const mf = dadosConsultados.modulo_fiscal_ha;
  const fmp = dadosConsultados.fracao_minima_parcelamento_ha;
  const qtdMF = area_ha / mf;
  
  let classificacao = "minifundio";
  if (qtdMF > 15) classificacao = "latifundio";
  else if (qtdMF >= 1) classificacao = "media_propriedade";

  // 4. Retorna JSON padronizado
  return {
    motor: "rural",
    versao: "7.0",
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
      `${dadosConsultados.fonte_normativa}`,
      `INCRA MF=${mf}ha para ${municipio}`
    ],
    alertas: area_ha < fmp ? [`Área abaixo da FMP de ${fmp}ha`] : [],
    limitacoes: ["Consulta apenas AL. Outros estados em expansao"],
    confianca: 0.95,
    dependencias: ["biblioteca/BR/AL/alagoas.json v2022.1"]
  };
}
