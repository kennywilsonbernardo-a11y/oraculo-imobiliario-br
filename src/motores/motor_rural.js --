// MOTOR RURAL v7.0 - Consulta Biblioteca Oficial
// Principio: MOTOR NUNCA SABE MF. QUEM SABE E A BIBLIOTECA.

export async function analisarRural({ municipio, uf, area_ha }) {
  // 1. Carrega Biblioteca
  // AT-006: path relativo (./) em vez de absoluto (/) - path absoluto quebra em GitHub Pages
  // de projeto, que publica sob /nome-do-repo/ e não na raiz do domínio (mesmo bug já corrigido
  // no index.html via AT-004).
  const biblioteca = await fetch(`./biblioteca/BR/${uf}/${uf.toLowerCase() === 'al' ? 'alagoas' : uf.toLowerCase()}.json`).then(r=>r.json());
  
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
  
  // AT-006: classificação alinhada ao Estatuto da Terra (Lei 4.504/64, art. 4º):
  // minifúndio < 1 MF | pequena propriedade 1 a 4 MF | média propriedade 4 a 15 MF | latifúndio > 15 MF
  // Antes: "media_propriedade" cobria indevidamente de 1 a 15 MF, misturando pequena e média propriedade.
  let classificacao = "minifundio";
  if (qtdMF > 15) classificacao = "latifundio";
  else if (qtdMF >= 4) classificacao = "media_propriedade";
  else if (qtdMF >= 1) classificacao = "pequena_propriedade";

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
