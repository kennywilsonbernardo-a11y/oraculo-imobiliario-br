// src/core/casos-especiais.js
// Avalia os "gatilho" de biblioteca/matrizes/matriz_casos_especiais.json contra os dados
// informados pelo corretor, e traduz cada caso disparado para o vocabulário de status
// permitido pela VIS-001 §4 (ADR-002) — SEM percentual, SEM score, SEM veredito.
//
// TRILHA A (self-service). Nenhum rótulo F2B-XXX deve entrar neste arquivo.
//
// LIMITAÇÃO CONHECIDA (documentada, não escondida): o schema atual de
// matriz_casos_especiais.json guarda "documento_adicional" como um texto único por caso,
// não como uma lista de itens individualmente marcáveis (diferente do checklist de
// matriz_urbano_residencial_condominio.json, que tem "id"/"obrigatorio" por item).
// Por isso, hoje, quando um gatilho dispara, só é possível mapear para
// PENDENCIA_IDENTIFICADA (existe uma exigência documental adicional a cumprir) — não é
// possível, com o schema atual, distinguir automaticamente "já apresentou tudo" (verde) de
// "ainda falta algo" sem perguntar ao corretor documento por documento. Ver nota no fim do
// arquivo sobre o que seria necessário para chegar ao verde/azul automaticamente.

// Vocabulário de status - espelha exatamente VIS-001 §4 (ADR-002). Não adicionar estado novo
// aqui sem que a Mesa aprove um ADR alterando VIS-001.
export const STATUS = Object.freeze({
  INSUFICIENTE: "INSUFICIENTE — Verificações Essenciais Pendentes",
  NAO_APTO: "NÃO APTO PARA A PRÓXIMA ETAPA",
  PENDENCIA: "PENDÊNCIA IDENTIFICADA",
  VERIFICADO: "DOCUMENTAÇÃO VERIFICADA NO ESCOPO DESTA ETAPA",
});

/**
 * Avaliador de expressão de gatilho, sem eval(). Suporta:
 *   campo == valor | campo != valor | && | || | true | false
 * Precedência: && antes de ||  (mesma precedência do JS - evita repetir o bug do AT-007).
 * Identificador sozinho (não seguido de == / !=) é tratado como "campo verdadeiro?" via truthy
 * dos dados — isso é o que EXPÕE o bug de "|| penhora" citado acima, propositalmente, em vez
 * de mascará-lo.
 */
export function avaliarGatilho(expressao, dados) {
  const termos = expressao.split(/\s*\|\|\s*/).map((grupoAnd) =>
    grupoAnd.split(/\s*&&\s*/).map((cond) => avaliarCondicaoUnica(cond.trim(), dados))
  );
  // OR entre grupos, AND dentro de cada grupo
  return termos.some((grupo) => grupo.every(Boolean));
}

function avaliarCondicaoUnica(cond, dados) {
  if (cond === "true") return true;
  if (cond === "false") return false;

  const igual = cond.match(/^([\w.]+)\s*==\s*(.+)$/);
  if (igual) {
    const [, campo, valorBruto] = igual;
    return String(dados[campo] ?? "") === normalizarValor(valorBruto);
  }

  const diferente = cond.match(/^([\w.]+)\s*!=\s*(.+)$/);
  if (diferente) {
    const [, campo, valorBruto] = diferente;
    return String(dados[campo] ?? "") !== normalizarValor(valorBruto);
  }

  // Identificador isolado (ex.: o "penhora" solto no gatilho com bug conhecido) -> truthy
  return Boolean(dados[cond]);
}

function normalizarValor(v) {
  const limpo = v.trim();
  if (limpo === "true") return "true";
  if (limpo === "false") return "false";
  return limpo;
}

/**
 * Carrega a matriz e retorna os casos cujo gatilho disparou, já traduzidos para o
 * vocabulário VIS-001. Não decide "verde" sozinho — ver limitação documentada acima.
 */
export async function avaliarCasosEspeciais(dados) {
  let matriz;
  try {
    // path relativo (./) — mesmo cuidado do motor_rural.js (AT-006), GitHub Pages de projeto
    // quebra com path absoluto.
    const resp = await fetch("./biblioteca/matrizes/matriz_casos_especiais.json");
    if (!resp.ok) {
      return {
        status: STATUS.INSUFICIENTE,
        alertas: [],
        erro: `matriz_casos_especiais.json não encontrada (HTTP ${resp.status})`,
      };
    }
    matriz = await resp.json();
  } catch (e) {
    return {
      status: STATUS.INSUFICIENTE,
      alertas: [],
      erro: `Falha ao carregar matriz de casos especiais: ${e.message}`,
    };
  }

  const disparados = (matriz.casos || []).filter((caso) =>
    avaliarGatilho(caso.gatilho, dados)
  );

  const alertas = disparados.map((caso) => ({
    status: STATUS.PENDENCIA,
    situacao: caso.situacao,
    documento_adicional: caso.documento_adicional,
    cuidado: caso.cuidado,
    fonte: caso.fonte || null,
  }));

  return {
    // Se nada disparou, não é "verificado" (não confundir ausência de alerta com aprovação) -
    // é apenas ausência de pendência conhecida nesta camada. Deixe explícito ao corretor.
    status: alertas.length > 0 ? STATUS.PENDENCIA : null,
    alertas,
  };
}

// PRÓXIMO PASSO (não implementado aqui, pendente de decisão da Mesa/Kenny):
// Para chegar a DOCUMENTAÇÃO VERIFICADA (verde) automaticamente por caso, o schema de
// matriz_casos_especiais.json precisaria virar uma lista de documentos individuais por
// situação (como já é em matriz_urbano_residencial_condominio.json, com "id"/"obrigatorio"
// por item), e a tela precisaria coletar do corretor "documento X foi apresentado? sim/não"
// por item. Isso é uma mudança de schema, não uma mudança deste módulo — não fiz isso agora
// porque não foi pedido e mudaria a estrutura de um arquivo que você talvez use em outro lugar.
