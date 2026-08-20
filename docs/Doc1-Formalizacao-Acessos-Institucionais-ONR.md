# Documento 1 — Formalização de Acessos Institucionais e Cronograma das APIs dos Cartórios Digitais (ONR)
Plano Paralelo de Refinamento Comercial — Documento 1 de 3 (16/08/2026)
De: Manus — verificador independente de evidências e governança documental
Para: Mesa de Governança — Kenny Wilson, ChatGPT, Gemini
Classificação: 🔵 Refinamento — roadmap institucional; sem alteração de VIS-001, ADR-002, PVB-001, código ou repositório
Status: ARTEFATO DE CONHECIMENTO EM VALIDAÇÃO — roadmap de relacionamento institucional, não especificação técnica executável. Nenhuma integração entra no código antes da deliberação da Mesa sobre a nova direção (Atos 1–5) e do gate das 20 auditorias repetíveis (trava T4).

## 1. O mapa das três camadas de acesso
A formalização de acessos institucionais do Oráculo organiza-se em três camadas, cada uma com um instrumento jurídico próprio. A regra de ouro é a que o Kenny formulou na conversa: as camadas 1 e 2 não exigem formalização e cobrem a maior parte da matriz; a camada 3 é crescimento, não pré-requisito.

| Camada | Instrumento jurídico | Instrumentos que a Oráculo usa hoje |
|---|---|---|
| 1. Dados públicos abertos | LAI (Lei 12.527/2011) — acesso livre por direito | Validação em lote da base AL (MF/FMP), diários oficiais, portais de transparência |
| 2. Consulta pública não estruturada | Acesso lícito de qualquer cidadão, sem contrato | Consultas por browser: SEFAZ-AL, prefeituras sem API, certidões estaduais |
| 3. Integração formal (API/parceria) | Cadastro com termos de adesão, convênio ou licenciamento | ONR/RI Digital (cronograma abaixo), SEFAZ-AL (futuro), prefeituras (futuro) |
## 2. O alvo prioritário: ONR e o RI Digital
O Operador Nacional do Sistema de Registro Eletrônico de Imóveis (ONR) é hoje o portal oficial de acesso digital aos registros de imóveis do Brasil, operado sob a chancela da Corregedoria Nacional de Justiça. A plataforma RI Digital (ridigital.org.br) é o ponto de entrada para proprietários, corretores, advogados e imobiliárias — exatamente os perfis do Oráculo — oferecendo emissão de certidões digitais com validade jurídica, visualização de matrículas, e-protocolo e acompanhamento registral, mediante sistema de créditos pré-pagos 1 2.

A descoberta de evidência mais relevante para o cronograma: a ONR disponibiliza credenciamento com geração de chave de API, com processo documentado (tutoriais oficiais ONR/CNB) e canal técnico dedicado (suporte.dev@onr.org.br) 3 4. A API da Certidão Automatizada já opera em 531 Registros de Imóveis em todo o país 5. Para o Oráculo, isso significa: um único credenciamento formal dá acesso programático às certidões de mais de metade dos cartórios do Brasil — o que, em Alagoas, cobre a maior parte das comarcas com registro eletrônico.

O mecanismo de contratação é o modelo de créditos pré-pagos do RI Digital: a conta institucional do Oráculo compra créditos, e cada certidão emitida via API consome o crédito correspondente ao valor tabelado do cartório. Nada é gratuito, mas tudo é previsível — e o custo é repassável ao usuário final dentro do modelo de precificação da Frente 5.

## 3. O cronograma detalhado (fases, entregas e responsáveis)
O cronograma assume o ponto de partida em setembro de 2026 e é compatível com o gate da trava T4 (o Oráculo só consome certidões em escala após as 20 auditorias repetíveis):

| Fase | Período | Entregas | Responsável |
|---|---|---|---|
| F0 — Mapeamento | Set/2026 (semanas 1–2) | Lista das comarcas de AL com registro na ONR; tabela de preços por certidão no RI Digital; contato com suporte.dev@onr.org.br; levantamento do percentual de cobertura das comarcas-alagoanas na API | Kenny + Manus |
| F1 — Conta institucional | Set/2026 (semanas 3–4) | Cadastro da pessoa jurídica no RI Digital como perfil profissional/institucional; aceite dos Termos de Acesso; compra de lote inicial de créditos (orçamento mínimo para o piloto) | Kenny |
| F2 — Credenciamento API | Out/2026 (semanas 1–3) | Solicitação formal do credenciamento com chave de API; envio dos documentos institucionais (CNPJ, contrato social, responsável técnico); acompanhamento até ativação | Kenny + Manus (supporte técnico) |
| F3 — Integração de conhecimento | Out–Nov/2026 | Especificação dos endpoints ONR/RI Digital usados pelo Oráculo (consulta de matrícula, certidão de ônus, acompanhamento registral); registro no artefato de conhecimento de quais verificações da Matriz Nível 1 passam a ter modo Extraído (fonte: ONR) em vez de modo Declarado | Manus |
| F4 — Piloto controlado | Nov–Dez/2026 | 20 consultas reais via API no RI Digital, comparando custo, tempo e completude contra o método manual por browser; registro de evidências (hash, data, origem) | Mesa (validação) |
| F5 — Decisão de escala | Dez/2026 | Deliberação da Mesa: manter, expandir ou substituir a integração (comparativo API × manual); atualização do orçamento de créditos na precificação da Frente 5 | Mesa |
## 4. As fontes alternativas mapeadas (camada 3, além da ONR)
A ONR é o primeiro alvo porque concentra a verificação mais crítica da matriz (matrícula e ônus). As demais formalizações seguem a mesma lógica de adesão/convênio, em ordem de prioridade: SEFAZ-AL (consulta de débitos estaduais, ITCMD — inicialmente por consulta pública; convênio quando houver volume), prefeituras das ondas 1–2 da validação (ITBI, cadastro imobiliário — via portals abertos onde existirem, contato institucional via rede do Kenny onde não existirem), e Receita Federal (CNDs federais, GCAP — consulta pública gratuita via gov.br; a formalização futura é o cadastro de aplicativo no portal e-CAC, quando houver volume comercial). Nenhuma dessas entra no código antes da deliberação dos Atos 1–5; todas entram no artefato de conhecimento como roadmap de relacionamento.

## 5. Trancas de governança (o que este documento não autoriza)
Este cronograma não altera a sequência dos Atos 1–5 nem a trava T4: a Fase 3 (integração de conhecimento) só ocorre depois do gate das 20 auditorias repetíveis, e o F4 (piloto controlado) é a entrega que alimenta a deliberação da Mesa — não um ponto de partida comercial. Os créditos pré-pagos do RI Digital são custo operacional do piloto, não investimento antecipado de escala. O documento também registra a precaução já aprovada: dados do RI Digital têm validade temporal (a certidão vale na data da emissão), e o Raio-X sempre exibirá a data da consulta junto com a proveniência ONR.

## 6. Síntese para o Rito de Convergência
DECISÃO CONVERGIDA
Decisão: APROVAR o cronograma F0–F5 como roadmap institucional em validação, com a ONR/RI Digital como alvo prioritário da camada 3.
Pendências bloqueadoras: nenhuma — nenhuma fase altera VIS-001, ADR-002, PVB-001, código ou repositório; F4 e F5 dependem da deliberação da Mesa.
Próximo passo único: iniciar a Fase F0 (mapeamento das comarcas AL na ONR) — a primeira tarefa que não depende de nenhuma pendência deliberativa.

References
