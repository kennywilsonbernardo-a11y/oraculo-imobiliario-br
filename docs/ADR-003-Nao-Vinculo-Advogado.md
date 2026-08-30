# ADR-003 — Não-Vínculo com Advogado: Confirmação e Retirada de Proposta de Encaminhamento
## Oráculo Imobiliário BR

**Status:** ✅ **Aprovado** — decisão de Kenny Wilson em 30/08/2026
**Data:** 2026-08-30
**Referência:** VIS-001-Especificacao-Conceitual-Congelada.md, §7 (Papel do advogado — camada profissional independente)
**Origem:** Deliberação de Kenny Wilson durante sessão de trabalho sobre precificação e funil comercial
**Escopo desta decisão:** Exclusivamente a relação entre o Oráculo e advogados terceiros (vínculo, indicação, parceria). Não reabre identidade do produto, pipeline, papel do corretor, biblioteca ou vocabulário de status — todos permanecem exatamente como já congelados.

---

## Contexto

O VIS-001 §7 já estabelece o princípio geral: o Oráculo não transfere responsabilidade ao advogado, e a manifestação do advogado não valida automaticamente o que o Oráculo apresentou — são duas atividades distintas e independentes.

Durante uma sessão de trabalho sobre precificação e desenho de funil comercial, foi proposta oralmente (nunca implementada em código ou arquivo) uma "Camada 6" do funil: reunião com encaminhamento jurídico, com indicação de advogado — inicialmente cogitada como indicação gratuita, sem comissão.

Kenny Wilson determinou explicitmente: o relatório do Oráculo (Panorama Educativo e Interpretativo) pode legitimamente chegar às mãos de um advogado — por iniciativa do próprio cliente, ou porque um gatilho do sistema aponta que aquele caso requer acompanhamento jurídico — mas o Oráculo **não estabelece vínculo** com nenhum advogado específico: nem indicação, nem parceria, nem encaminhamento direcionado, pago ou gratuito. Essa restrição não se aplica à categoria "corretor de imóveis" — o Oráculo continua operando via CRECI, essa é a identidade do produto.

## Decisão 1 — Confirmação por auditoria: os arquivos atuais já estão em conformidade

Foi feita varredura de toda menção a "advogado" nos arquivos que chegam ao usuário final (README.md, `matriz_casos_especiais.json`, `matriz_urbano_residencial_condominio.json`, `MODELO-PARECER-PEI.md`, `template-relatorio-3-blocos.html`, `index.html`, `analisador-8-itens.js`) — 8 ocorrências ao todo. Todas seguem padrão genérico e protetivo ("valide com advogado", "advogado de sua confiança", "não substitui advogado"), nunca nomeando ou recomendando um profissional específico. **Nenhuma alteração de arquivo foi necessária** — o padrão já vigente já está correto.

## Decisão 2 — Retirada formal da proposta de "Camada 6" do funil comercial

A proposta de reunião com encaminhamento jurídico indicado (cogitada, nunca implementada) é **retirada do roadmap**. Não entra em nenhuma versão futura do funil comercial, gratuita ou paga.

## Decisão 3 — Regra de redação para gatilhos e conteúdo futuro

Toda vez que um novo `caso_especial`, checklist ou relatório mencionar a necessidade de advogado, a redação deve descrever uma **exigência legal ou uma orientação genérica** ("a lei exige acompanhamento de advogado", "procure um advogado de sua confiança") — nunca nomear, recomendar ou sugerir um profissional ou escritório específico, e nunca implicar parceria comercial entre o Oráculo e qualquer advogado.

## Consequência

VIS-001 §7 permanece inalterado — este ADR o reafirma e o operacionaliza para o funil comercial, sem reabrir sua taxonomia. Nenhuma outra seção do VIS-001 é afetada.
