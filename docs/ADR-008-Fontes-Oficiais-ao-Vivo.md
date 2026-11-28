# ADR-008 — Fontes oficiais consultadas ao vivo: links de certidão, índices do Banco Central e processos no DataJud
## Oráculo Imobiliário BR

**Status:** ✅ **Aprovado e publicado** — Kenny Wilson, 28/11/2026 ("aprovo #127, #128 e #129").
**Data:** 2026-11-28
**Referência:** VIS-001; ADR-003 (o Oráculo não indica advogado); ADR-007
**Redação:** Claude

---

## Contexto

Em 27/11/2026 o Kenny trouxe uma análise feita por outra IA sugerindo APIs para o Oráculo. Garimpamos o que serve sem custo e sem risco, nesta ordem: (1) links oficiais de certidão por documento, (2) índices de correção do Banco Central, (3) consulta de processo no DataJud do CNJ. APIs pagas de due diligence e WhatsApp Cloud API ficaram de fora.

## Decisão

| Item | O que entra | Fonte conferida |
|---|---|---|
| 1. Links oficiais (PR #127 do site) | 21 endereços de órgãos oficiais (RI Digital, CNIB, Receita, CNDT, TRT19, TRF5, TJAL, protesto, SEFAZ-AL, JUCEAL, CENSEC, CCIR, CAR, SIGEF, IBAMA, SPU, Cadastur e outros), ligados a cada documento do Raio-X e da Conferência | Cada endereço aberto e conferido em 27/11/2026; endereços quebrados substituídos (ex.: registradores.onr.org.br → RI Digital) |
| 2. Índices ao vivo (PR #128) | Proposta parcelada busca INCC-M, IPCA e IGP-M no Banco Central quando a página abre; acumulado de 12 meses composto; mostra série, período e link; IGP-M como nova opção | SGS do Banco Central: séries 7456 (INCC-M), 433 (IPCA) e 189 (IGP-M), nomes lidos no próprio SGS em 28/11/2026 |
| 3. Processo no DataJud (PR #129) | Na Conferência, consulta pelo número único: tribunal, classe, assuntos, vara, ajuizamento, últimos 15 andamentos | Resolução CNJ 65/2008, art. 1º, §§ 2º, 4º e 5º (lida em atos.cnj.jus.br); wiki do DataJud (endpoints, acesso, exemplo 1, considerações finais) |

## Regras

1. **Reserva sempre.** Se o Banco Central não responder, a Proposta usa o último número conferido em `data/oraculo-indices.json` e avisa na tela. Dado incompleto, com mês faltando ou valor estranho é recusado.
2. **O passado não garante o futuro.** A tela diz que o acumulado de 12 meses é estimativa; a correção real é a do índice mês a mês.
3. **Chave fora do código.** A chave pública do DataJud é publicada pelo CNJ, mas muda quando o CNJ quiser. Fica só na variável `DATAJUD_API_KEY` da Vercel, cadastrada pelo Kenny. O Claude não digita nem recebe a chave. Um teste falha se aparecer chave no código.
4. **Nada é guardado.** A consulta de processo não grava o número nem o IP. Limite de 20 consultas por minuto por IP.
5. **Avisos obrigatórios na tela do DataJud:** base em fase Beta, pode estar atrasada (mostra a data da última atualização); processo sob sigilo não aparece; a base pública não traz nome das partes; não substitui certidão do distribuidor.
6. **Termo de Uso do DataJud, item 3.11:** não usar a API para coletar informações pessoais de terceiros sem consentimento. O uso no Oráculo é conferir processo que já apareceu numa certidão do próprio negócio.
7. **ADR-003 mantido:** processo encontrado não leva a indicação de advogado.

## Pendências

1. Cadastrar `DATAJUD_API_KEY` na Vercel e republicar (Kenny, 28/11/2026).
2. Levar a consulta de processo para o Raio-X do cliente, junto das certidões.
3. Conferir a cada mês se os 21 links continuam abrindo.
