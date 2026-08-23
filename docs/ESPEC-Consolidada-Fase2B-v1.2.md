ESPEC Consolidada — Fase 2B · Oráculo Imobiliário BR (v1.2 — RASCUNHO PARA REVISÃO ARQUITETURAL FINAL)

Autor da consolidação original (v1.1): Manus AI (Auditor)
Autor da alteração controlada (v1.2): Claude, sob instrução direta do Arquiteto (GPT), com os 48 requisitos originais preservados integralmente e apenas as 4 correções abaixo acrescentadas.
Mandato: Deliberação da Mesa de 20/08/2026 (v1.1), com trava adicional do Arquiteto (GPT): a consolidação não resolve lacunas por inferência — tudo o que não é sustentado pelos artefatos existentes aparece como LACUNA / PENDENTE DE DELIBERAÇÃO. Parecer arquitetural do GPT sobre a v1.1 registrado em 22/08/2026, com 4 achados confirmados por conferência textual (Claude) contra o documento-fonte.
Data: 22/08/2026
Estado: RASCUNHO — v1.2 aguarda revisão arquitetural final (GPT) e, se sem conflito, emissão de "APTA PARA CONGELAMENTO" pelo GPT, seguida de deliberação da Mesa e congelamento (versão + hash do arquivo real + registro de governança). Não autoriza implementação.

---

REGISTRO DE ALTERAÇÃO — v1.1 → v1.2

Esta versão é uma alteração controlada sobre o texto integral da v1.1, não uma reconstrução de memória. Nenhum dos 48 requisitos F2B-001 a F2B-048 foi reescrito, removido ou renumerado. Nenhuma das 10 LACUNAS (LAC-001 a LAC-010) foi resolvida ou preenchida por inferência — permanecem exatamente como estavam.

Quatro correções foram acrescentadas, todas originadas do parecer arquitetural do GPT sobre a v1.1 e confirmadas por conferência textual direta do Claude contra o documento-fonte (não por inferência):

| Achado do GPT | O que confirma | Correção incorporada |
|---|---|---|
| A-01 — Enriquecimento | Confirmado: nenhuma cláusula da v1.1 impede que "enriquecimento" produza efeito decisório | Seção 0.1, Correção A-01 |
| A-04 — status_fechamento | Confirmado: a v1.1 declara a existência do campo (F2B-029) mas nunca define seu vocabulário de valores | Seção 0.1, Correção A-04 |
| A-05 — Confiança/score | Parcialmente confirmado: a v1.1 já usa "confiança" de forma qualitativa nos dois lugares em que aparece, mas só proíbe "score de segurança" nominalmente, não qualquer valor numérico de confiança sob outro nome | Seção 0.1, Correção A-05 |
| A-07 — config.json | Confirmado: a tabela de ativos congelados (Seção 12 da v1.1) lista config.json na mesma tabela de "nenhum tocado", mas com regra textualmente mais fraca ("Metadados atuais") que os demais itens | Seção 0.1, Correção A-07; Seção 12 reestruturada |

Os achados A-02, A-03, A-06 e A-09/LAC-XXX do parecer do GPT são pontos de julgamento arquitetural, não de checagem textual — permanecem em aberto, para deliberação futura, e não foram incorporados nesta v1.2.

---

0. Natureza desta peça — ler antes de tudo

Esta ESPEC Consolidada não cria regra nova. Ela reúne, organiza e rastreia exclusivamente o que já está decidido ou especificado nos artefatos congelados e em validação do Oráculo. Cada requisito recebe um ID com origem identificável (qual artefato, qual seção), permitindo que a implementação seja interrogada em qualquer ponto: "onde está a regra que autoriza esse comportamento?" — se não houver ID/origem, o implementador não inventa.

Os artefatos-fonte utilizados nesta consolidação:

| # | Artefato | Estado | Rastro |
|---|---|---|---|
| A1 | Documento-Mestre da Fase 2, v1.1 | ✅ Congelado (AL-FASE2-001) | hash e0a75cfb... |
| A2 | VIS-001 — Especificação Conceitual Congelada | ✅ Congelado | sem alteração desde a Fase 1 |
| A3 | ADR-002 — Correção de Vocabulário de Status | ✅ Congelado | aprovado, sem mudança |
| A4 | ESPEC do Algoritmo das 3 Camadas de Gatilhos de Exceção (17/08/2026) | 🔵 Em validação | 390 linhas |
| A5 | Suíte de Testes de Estresse — Fixture Bulgarelli (16 cenários + fixture de regressão) | 🔵 Em validação | commit 7c66263 |
| A6 | Catálogo de Padrões Conhecidos v1 | ✅ Publicado | commit 9cf3635 |
| A7 | Manifesto da Biblioteca de Casos v3 | ✅ Publicado — norma permanente | commit 462bf30 |
| A8 | Motor Rural MVP (config.json + alagoas.json) | ✅ Congelado (AL-IBGE-001) | hash b6752c4a... / a4cf59b6... |
| A9 | Protótipo de interface 4 etapas (aprovado pelo Presidente) | 🟡 Fora do repositório | protótipo funcional |

Regra de ouro desta peça: nada acima da seção 0 nesta tabela foi acrescentado por inferência. O que os artefatos não sustentam está marcado como LACUNA ou PENDENTE DE DELIBERAÇÃO, com o respectivo ID.

0.1 Correções obrigatórias incorporadas nesta versão (v1.2)

**Correção A-01 — Fronteira do enriquecimento.** Aplica-se a F2B-005, F2B-016 e F2B-031, que mencionam "enriquecimento" sem definir seu limite decisório.

> O enriquecimento não constitui decisão. Informações obtidas por enriquecimento podem ampliar o conjunto de evidências e verificações aplicáveis, mas não podem, por si mesmas, produzir, elevar, reduzir ou substituir um estado de decisão. Qualquer resultado decisório pertence exclusivamente à Camada C determinística.

**Correção A-04 — Vocabulário de status_fechamento.** Aplica-se a F2B-029, que declara o campo sem definir seus valores possíveis.

> status_fechamento é um estado técnico de processamento documental, não uma avaliação imobiliária, jurídica ou de segurança. Valores admitidos: PROCESSO (roteiro de verificações em andamento) e CONCLUIDO (roteiro de verificações finalizado). O campo não assume valores como APROVADO, REPROVADO, SEGURO, INSEGURO, RISCO ALTO ou equivalentes. Estados de bloqueio são representados exclusivamente pelo campo `bloqueio`, já presente no contrato do orquestrador (F2B-029) — não constituem um valor adicional de status_fechamento.

**Correção A-05 — Proibição explícita de confiança numérica.** Aplica-se a F2B-027, F2B-034, F2B-039(iv) e F2B-045, que já proíbem "score de segurança" e já usam "confiança" qualitativamente, mas sem proibição genérica de valor numérico sob outro nome.

> O motor não utiliza score, probabilidade, percentual ou valor numérico de confiança para produzir, priorizar ou alterar resultado documental. Qualquer referência à confiança deve permanecer qualitativa e descritiva, não constituindo variável decisória.

**Correção A-07 — Reclassificação dos ativos congelados.** Aplica-se à Seção 12, cuja tabela original lista config.json entre os ativos "nenhum tocado" com regra textualmente diferente dos demais.

> Os ativos passam a ser classificados em duas categorias: **Congelados estruturais** (alteração exige novo rito completo de auditoria e deliberação) e **Controlados** (podem ser alterados somente mediante escopo previamente autorizado pela Mesa, com registro de alteração, hash e validação de impacto sobre os contratos/congelados). config.json é reclassificado de "congelado" para **Controlado** — ver Seção 12 reestruturada.

---

1. Mapa dos 10 pontos solicitados pelo Arquiteto

| # | Ponto | Onde está nesta peça | Situação |
|---|---|---|---|
| 1 | Entradas | Seção 3 | Sustentado por A4 (perfil/evidência) + A6 (fluxo de entrada mista) |
| 2 | Classificação do caso | Seção 4 | Sustentado por A1 (identidade, perfil×uso×contexto, 7 domínios) + A4 |
| 3 | Gatilhos | Seção 5 | Sustentado por A4 (6 gatilhos + contratos) + A5 (gatilhos de fronteira) |
| 4 | Evidência exigida | Seção 6 | Sustentado por A1 (4 eixos, 3 modos, temporalidade) + A2 + A5 |
| 5 | Saída esperada | Seção 7 | Sustentado por A1 (Raio-X estruturado) + A4 (contrato do orquestrador) |
| 6 | Estados de exceção | Seção 8 | Sustentado por A4 (erros explícitos) + A5 (falha explícita, proveniência) |
| 7 | Proveniência e auditabilidade | Seção 9 | Sustentado por A2 (VIS-001) + A7 (regime duplo) |
| 8 | Critérios de aceite | Seção 10 | Sustentado por A5 (§8) — único arbitrador |
| 9 | Fora de escopo | Seção 11 | Sustentado por A1 (Seções 10-11) + A6 (Seções 6-11) + A7 |
| 10 | Regras de não alteração dos congelados | Seção 12 | Sustentado pela cadeia de âncoras AL-IBGE-001/AL-FASE2-001/VIS-001 |

---

2. Visão geral do motor — a cadeia que nada nesta peça altera

FATO/CONDIÇÃO ANTECEDENTE → PERTINÊNCIA → VERIFICAÇÃO → EVIDÊNCIA → SUFICIÊNCIA → RESULTADO → STATUS DOCUMENTAL
— Documento-Mestre v1.1, Seção 6, cadeia validada pela Mesa (Tensão 2 arbitrada). FATO não integra o pipeline estrutural congelado no VIS-001 §2; é antecedente conceitual usado para determinar Pertinência. [A1 §6]

O motor da Fase 2B implementa essa cadeia de forma determinística: LLM (IA generativa) apenas para ler e extrair documentos (função OCR/extrator); a decisão de risco roda em motor lógico de regras, sem probabilismo, garantindo auditoria jurídica e impedindo alucinação. [A6 §4]

A arquitetura conceitual é agnóstica de infraestrutura por design — não presume backend nem o proíbe. O MVP permanece client-side; qualquer componente de servidor (persistência, credenciais, integrações externas, processamento pesado) é decisão de roadmap/infraestrutura, fora do VIS-001 e fora desta Fase 2B. [A1 §10]

---

3. Entradas

F2B-001 — Perfil do caso (JSON declarativo). O motor recebe um perfil estruturado com: tipo (urbano | rural | misto), natureza (residencial | comercial), regime (condomínio | fração independente | rural), titulo_declarado (proprietário | possuidor | não_sei), e ocupante {igual_titular, ha_terceiro_ocupando, possui_contrato_escrito}. [A4 §1.2 — DECIDIDO]

F2B-002 — Evidências submetidas (JSON, contrato VIS-001). Cada documento submetido traz: documento_tipo, fonte, data_emissao, autenticidade, campos{} e suficiencia (parcial | completa | insuficiente). Sem proveniência, a evidência é rejeitada — nunca aceita silenciosamente. [A4 §1.3 — DECIDIDO; teste T1.3 — CRITÉRIO DE ACEITE]

F2B-003 — Camada Zero (identidade prévia). Antes de qualquer verificação, o motor deve ter estabelecido minimamente a Identidade do Imóvel: matrícula, inscrição municipal, endereço, área, lote/quadra, unidade autônoma, cadastro rural, identificadores de concessionária, geometria/coordenadas quando disponível. A Identidade não é um domínio de auditoria — é pré-requisito de todos; nenhuma verificação roda sem ela. [A1 §1 — DECIDIDO]

F2B-004 — Três eixos de classificação do imóvel. Perfil (o que o imóvel é fisicamente/legalmente), Uso (o que acontece ali de fato) e Contexto da Operação (por que o Oráculo roda agora). Os três eixos são genuinamente independentes e determinam quais domínios entram em Pertinência e quais etapas do pipeline são ativadas. [A1 §2 — DECIDIDO]

F2B-005 — Fluxo de entrada mista (camada de produto sobre o motor). O fluxo educativo do Oráculo tem três estágios: (1) entrada semi-automática — o usuário fornece os três dados mestres de barreira (CPF/CNPJ do vendedor, inscrição municipal, número da matrícula); (2) leitura automática — upload de PDFs com extração de texto e localização de termos restritivos (penhora, arresto, alienação); (3) enriquecimento automático — consulta às fontes oficiais em segundo plano para riscos não constantes dos papéis enviados. [A6 §7 — DECIDIDO como princípio documental; implementação como fase subsequente à do motor] *[v1.2: o estágio 3 está sujeito à Correção A-01, Seção 0.1 — enriquecimento não produz decisão]*

---

4. Classificação do caso

F2B-006 — Taxonomia de 7 macrodomínios. Registral/Dominial, Fiscal/Tributário, Urbanístico/Edilício, Condominial, Serviços/Utilidades, Ambiental/Hídrico, Licenciamento/Operação. A taxonomia foi validada nos cenários testados, é sujeita a novos testes de cobertura — não é dogma universal. [A1 §3 — DECIDIDO]

F2B-007 — Verificação como unidade central. Um documento/fonte não é a unidade da auditoria — a Verificação é. Uma Verificação consome N pares (documento, fonte), cada um produzindo sua Evidência; as Evidências de uma Verificação combinam-se em UM conjunto de Suficiência, que sustenta UM Resultado → Status. [A1 §6.2 — DECIDIDO]

F2B-008 — Três camadas de classificação distintas e não substituíveis entre si. (i) Pertinência — isso deve ser auditado? (PERTINENTE / CONDICIONAL / NÃO APLICÁVEL / EVIDÊNCIA INSUFICIENTE, nível de pertinência); (ii) Suficiência Probatória — as evidências respondem à verificação? (Suficiente / Parcial / suficiência probatória insuficiente / Conflitante); (iii) Status Documental — o vocabulário exato do VIS-001 §4, sem status novo. As camadas de Pertinência e Suficiência existem antes e ao redor do Status, nunca o substituem. [A1 §6 — DECIDIDO]

F2B-009 — Rural em três camadas, não um domínio. Perfil Rural (Camada Zero) ativa o Motor Rural, que popula os domínios existentes: Registral/Dominial (CCIR, SIGEF, matrícula rural), Fiscal/Tributário (ITR), Ambiental/Hídrico (CAR, Reserva Legal, outorga). Nenhum domínio "Fundiário/Rural" próprio. O CCIR é o identificador rural (INCRA) — verificado no protótipo de interface; não existe "BCI rural". [A1 §4 — DECIDIDO; protótipo validado]

F2B-010 — Motores especializados como populadores de domínios. Qualquer motor especializado (Rural, e futuros: Urbanístico, Condominial, Fiscal, Hídrico) é populador de domínios, nunca sistema paralelo — o núcleo universal (Pertinência → Verificação → Evidência → Cruzamento) não precisa saber que um motor foi consultado. [A1 §5 — DECIDIDO]

F2B-011 — Pertinência Dinâmica com regra de contenção. Uma Evidência descoberta durante a auditoria pode revelar um Fato novo e ativar Pertinência em outro domínio; a contenção só reativa Pertinência quando a Evidência contradiz diretamente uma premissa da Camada Zero (Perfil, Uso ou Contexto declarados), não por menção incidental. [A1 §7 — DECIDIDO]

F2B-012 — ⚪ LACUNA ARQUITETURAL ABERTA. "Capacidade das Partes / Operação" (inventário, procuração, recuperação judicial/falência do vendedor) não tem lar claro nos 7 domínios — é pergunta sobre a parte transacionando, não sobre o bem. Candidata a 8º domínio ou camada transversal própria, motivada pelo caso real Vale Verde (Cerutti Engenharia em recuperação judicial). A Mesa decidiu não criar o 8º domínio agora. [A1 §3 e §11 item 3 — LACUNA DELIBERADA]

---

5. Gatilhos

F2B-013 — Gatilhos são DADOS, não código. Cada gatilho é uma estrutura declarativa JSON com id, condicao (árvore declarativa de cláusulas com operadores e/ou e comparadores ==, !=, >=, existe, contem; alvos em perfil/ocupante/evidências) e efeito {adiciona_verificações, criticidade, bloqueia_bloco_anterior}. Só o interpretador é código; a Mesa pode adicionar, remover ou alterar gatilhos sem tocar no código. [A4 §2 — DECIDIDO (contrato de governança)]

F2B-014 — Gatilhos de referência da ESPEC (6). G-REGISTRO (matrícula ausente ou cadeia incompleta → Inteiro Teor, ITBI de transmissão, cadeia dominial; crítica alta); G-DIVIDA (dívida ativa declarada → CND/CDA oficial, consulta SEI, certidão de penhora; alta); G-OCUPANTE (terceiro ocupando → distribuição defensiva, distribuição real do imóvel, busca de editais, declaração de ocupante; alta); G-CONDOMÍNIO (regime condominial + terceiro ocupando → quitação condominial, regimento interno, atas; média); G-PRESCRIÇÃO (exercício mais antigo ≥ 2021 e ano atual ≥ 2026 → parecer de prescrição intercorrente; média); G-ALVARÁ (alvarás múltiplos ou habite-se divergente → regularização municipal; baixa). [A4 §2.3 — DECIDIDO como conjunto de referência]

F2B-015 — Gatilhos de fronteira mapeados pela Suíte. G-PRESCRIÇÃO na fronteira exata (exercício 2021/2022 → ativa/não ativa conforme a regra deliberada); G-OCUPANTE com ha_terceiro_ocupando: null (não ativa; verificação de completude); G-DIVIDA com dívida abaixo de limiar (R$ 50 → ativa, sem limiar de valor mínimo — desativar só com deliberação); três gatilhos simultâneos + matriz cheia (12+ verificações, sem duplicata, sem quebrar ordem). [A5 T5.1–T5.4 — CRITÉRIO DE ACEITE]

F2B-016 — Matriz base por perfil + enriquecimento. O motor seleciona uma matriz base de verificações pela chave de perfil (tipo × natureza × regime) e a enriquece com as verificações acionadas pelos gatilhos. A ESPEC declara explicitamente as matrizes de "urbano_residencial_condomínio" e deixa "urbano_comercial" e "rural" como conteúdo pendente ("..."). [A4 §2.4 — DECIDIDO o mecanismo; LACUNA o conteúdo das matrizes urbano_comercial e rural] *[v1.2: "enriquece" aqui está sujeito à Correção A-01, Seção 0.1]*

F2B-017 — ⚪ LACUNA — MATRIZES INCOMPLETAS. Conteúdo das matrizes base de urbano_comercial e rural não está definido em nenhum artefato. Não pode ser inferido pelo implementador. PENDENTE DE DELIBERAÇÃO (a deliberação pode usar o catálogo educativo e os casos reais da biblioteca como insumo, respeitando o regime duplo do Manifesto v3).

F2B-018 — ⚪ LACUNA — CATÁLOGO DE GATILHOS EXPANDIDO. Gatilhos mencionados em pareceres e no protótipo (G-RURAL, G-MARÍTIMO, G-EMPRESA, G-CADASTRAL) não estão definidos na ESPEC como estruturas formais. PENDENTE DE DELIBERAÇÃO antes de qualquer implementação.

F2B-019 — Perfil sem matriz = erro explícito. Se o perfil não tem matriz correspondente, o algoritmo erra com mensagem explícita — nunca responde com verificação genérica. Tradução em código do princípio "fonte confiável ≠ evidência suficiente". [A4 §2.4 — DECIDIDO; teste T2.3 — CRITÉRIO DE ACEITE]

F2B-020 — Ordenação em blocos e dependências topológicas. As verificações ordenam-se primeiro por bloco (decisão = 0 → custo = 1 → cadeia = 2) e depois topologicamente por dependências declarativas. [A4 §2.5 — DECIDIDO]

---

6. Evidência exigida

F2B-021 — Quatro eixos independentes de qualidade da evidência. Confiabilidade da Fonte (quem emitiu), Qualidade da Evidência (artefato íntegro/legível/completo), Suficiência (responde à Verificação específica, com atualidade — mesma fonte pode bastar para um Fato e não para outro), Escopo (o que a evidência permite afirmar — certidão negativa municipal não prova ausência de dívida estadual). [A1 §8 — DECIDIDO]

F2B-022 — Três modos de geração da evidência. Declarada (a fonte afirma diretamente), Extraída (dado lido de dentro de um documento) e Inferida por cruzamento (só aparece ao comparar evidências — ex.: divergência de titularidade). [A1 §8 — DECIDIDO]

F2B-023 — Metadados de temporalidade. Cada evidência carrega data de captura, período de referência e validade/revalidação. [A1 §8 — DECIDIDO]

F2B-024 — Regra de segurança da evidência fraca. Evidência fraca nunca reduz o roteiro — só pode ampliá-lo. Evidência sem proveniência é rejeitada. Extração parcial (falha do extrator) exige o documento completo; nunca assume "sem dívida" nem "sem restrição". [A5 §8, T1.1, T1.3, F4 — CRITÉRIO DE ACEITE + invariantes da Suíte]

F2B-025 — Divergência entre evidências = suspensão, não roteio normal. CPF de BCI divergente do extrato, imóvel errado submetido, usucapião de terceiro na matrícula futura: alerta de divergência, análise suspensa, reordenação com bloqueio comportamental quando aplicável. [A5 T2.1–T2.3 — CRITÉRIO DE ACEITE]

F2B-026 — ⚪ LACUNA — ADR DOS 4 EIXOS. Os 4 eixos de qualidade foram registrados como recomendação para um único ADR futuro (não quatro fragmentos). O ADR ainda não foi criado. PENDENTE DE DELIBERAÇÃO da Mesa.

---

7. Saída esperada

F2B-027 — Raio-X Documental: agregação estruturada, nunca pontuação. A saída é lista por domínio, com Status individual de cada item, mais inconsistências de identidade encontradas — nunca um número único resumindo tudo. Score de segurança é banido permanentemente pelo VIS-001 §4. [A1 §9 — DECIDIDO] *[v1.2: reforçado pela Correção A-05, Seção 0.1]*

F2B-028 — Cobertura da Auditoria com guarda-corpo. Pode existir um indicador de processo (quantas verificações pertinentes foram concluídas no caso auditado), mas ele nunca aparece ao lado de linguagem de segurança ("70% coberto, portanto seguro" é proibido) e não se confunde com a Cobertura de Validação da Base do PVB-001 (percentual de municípios com fonte validada). [A1 §9 — DECIDIDO]

F2B-029 — Contrato do orquestrador (saída técnica). A saída do motor é {roteiro, gatilhos_ativos, status_fechamento, bloqueio}: roteiro de verificações ordenado, lista de gatilhos que dispararam, status de fechamento e flag de bloqueio comportamental. [A4 §3 — DECIDIDO] *[v1.2: vocabulário de status_fechamento definido pela Correção A-04, Seção 0.1]*

F2B-030 — Três blocos do roteiro. Decisão (o que impede ou autoriza o negócio), Custo (o que pesa financeiramente), Cadeia (o que precisa se encadear depois). [A4 §1.1 — DECIDIDO]

F2B-031 — Estrutura do relatório educativo (produto visível). O relatório segue o modelo do catálogo: entrada (o que o usuário forneceu), leitura (o que o Oráculo extraiu), enriquecimento (o que as fontes confirmaram) — três estágios pedagógicos que ensinam o que pedir, por que pedir e o que acontece quando falta. Orientação educativa nunca promete resultado e sempre reenvia a decisão final ao profissional habilitado. [A6 §§7-8 — DECIDIDO como princípio; conteúdo do relatório de auditoria detalhado = LACUNA F2B-040] *[v1.2: "enriquecimento" aqui também sujeito à Correção A-01, Seção 0.1]*

---

8. Estados de exceção

F2B-032 — Falha explícita, nunca loop nem exceção silenciosa. Dependências circulares falham com mensagem explícita (nunca loop infinito); CPF malformado e valor absurdo (1e9) são rejeitados/saneados de forma limpa (nunca exceção não tratada nem uso de valor não-saneado). [A5 T3.3, T4.1, T4.2 — CRITÉRIO DE ACEITE]

F2B-033 — Contexto duplo = âncora única exigida. Múltiplos imóveis na mesma sessão: o motor exige âncora única (identidade única do caso); não mistura matrizes. [A5 T4.4 — CRITÉRIO DE ACEITE]

F2B-034 — Autenticidade nula = baixa confiança, não redução de roteiro. Código de autenticidade ausente rebaixa a confiança na evidência, mas não reduz verificações. [A5 T4.3 — CRITÉRIO DE ACEITE] *[v1.2: "confiança" aqui é qualitativa, conforme Correção A-05, Seção 0.1 — nunca numérica]*

F2B-035 — Idempotência como invariante. Dez execuções idênticas produzem saídas idênticas byte a byte; ciclos iterativos convergem (verificações monotônicas); nenhuma alternância de roteiros. [A5 T3.1, T3.2, §8 — CRITÉRIO DE ACEITE + invariante]

F2B-036 — ⚪ LACUNA — CRITÉRIO DE ENTRADA E SAÍDA DO ESTADO CONDICIONAL. O estado CONDICIONAL da camada de Pertinência está aprovado; os critérios exatos de entrada e saída dele foram registrados como "LACUNA ABERTA" pela Mesa no Documento-Mestre (item 11b). CONTEXTO_INCOMPLETO foi levantado como estado adicional possível, mas não está aprovado — CONDICIONAL permanece como o estado aprovado até novos testes. [A1 §6 e §11 item 11b — LACUNA DELIBERADA]

---

9. Proveniência e auditabilidade

F2B-037 — Regime VIS-001 integral. Identidade (§1), pipeline (§2), Rural/Urbano (§3), Status (§4), Biblioteca de Casos (§5), BCR (§6), advogado obrigatório (§7), limites (§8): nenhuma alteração. Toda evidência nasce com proveniência rastreada (quem trouxe, por qual elo, com qual autorização). [A2 — DECIDIDO, CONGELADO]

F2B-038 — Regime duplo da Biblioteca de Casos. Documento completo e íntegro no repositório privado de casos (acesso restrito às partes com legítimo interesse); registro anonimizado no repositório público, conforme VIS-001 §6. Consenso entre auditores não substitui cadeia de evidências; o rito permanece: demonstrar, não declarar. O estado padrão de entrada de todo caso é CASO-BIBLIOTECA (análise, revisão, pesquisa) — operação comercial nunca é presumida. [A7 — NORMA PERMANENTE]

F2B-039 — Invariantes de governança do algoritmo. (i) Gatilhos são dados deliberáveis pela Mesa — só o interpretador é código; (ii) toda alteração de gatilho passa pelo VIS-001 §11; (iii) idempotência é invariante e o fixture Bulgarelli é teste de regressão permanente; (iv) extração de PDF client-side via extrator determinístico (pdf.js com regex) — campo não extraído com confiança alta resulta em null, e gatilho não aplica; (v) o bloqueio comportamental é hipótese de produto, pendente de validação com os 20 fundadores CRECI-AL. [A4 §8 — DECIDIDO como contrato de governança] *[v1.2: item (iv), "confiança alta", permanece qualitativo conforme Correção A-05]*

---

10. Critérios de aceite

F2B-040 — A Suíte de Testes de Estresse é o único árbitro da implementação. Três condições simultâneas: (1) todos os testes com falha crítica implementados e passando; (2) o fixture Bulgarelli original passa como teste de regressão (roteiro de 7 documentos em 3 blocos, com bloqueio comportamental ativo); (3) nenhum teste pode ser "ajustado" para passar — se um teste revelar que o algoritmo aceita algo indevido, a correção é no algoritmo, nunca no teste. [A5 §8 — CRITÉRIO DE ACEITE EXCLUSIVO]

F2B-041 — A Suíte NÃO é prova de que o motor existe. Ela é o critério de aceite da implementação. A sequência válida é: especificação → implementação → execução dos 17 testes → auditoria → certificação. Nunca: testes → código improvisado até passar. [Deliberação da Mesa + posição do Arquiteto, 20/08/2026 — DECIDIDO]

F2B-042 — ⚪ LACUNA — CRITÉRIOS DE ACEITE DE FASE (fora da Suíte). A Suíte cobre os limites do algoritmo, mas não define critérios de aceite de engenharia de fase (ex.: cobertura mínima de extração de PDFs por tipo de documento; desempenho em arquivos grandes; acessibilidade da camada de produto). PENDENTE DE DELIBERAÇÃO da Mesa antes do início da implementação.

---

11. Fora de escopo da Fase 2B

F2B-043 — Integrações de API ficam fora do MVP. DataJud (token CNJ), ConectaGov/Serpro (credenciamento PGFN), APIs municipais (variam por município) e ONR (em implantação progressiva) só entram como deliberações próprias de integração, com verificação independente de disponibilidade antes de qualquer promessa comercial. [A6 §6 — DECIDIDO]

F2B-044 — Backend e infraestrutura. Persistência, credenciais, CORS, integrações externas e processamento pesado são decisão de roadmap/infraestrutura — fora do VIS-001 e fora desta Fase 2B. [A1 §10 — DECIDIDO]

F2B-045 — Pontuação/score de segurança. Permanentemente banido pelo VIS-001 §4. [A1 §9, A2 — DECIDIDO, CONGELADO] *[v1.2: extensão explícita a qualquer valor numérico de confiança, conforme Correção A-05, Seção 0.1]*

F2B-046 — 8º domínio "Capacidade das Partes". Lacuna arquitetural aberta, decisão da Mesa de não criar agora. [F2B-012 — LACUNA DELIBERADA]

F2B-047 — Alteração de qualquer congelado. index.html, alagoas.json (AL-IBGE-001), VIS-001, ADR-002, Documento-Mestre v1.1 (AL-FASE2-001): nenhum arquivo tocado. Qualquer tentativa toca a Regra de Ouro: o implementador para e reporta. [Cadeia de âncoras + Regra de Ouro da Mesa — DECIDIDO] *[v1.2: lista de congelados estruturais confirmada e reorganizada na Seção 12]*

F2B-048 — Interface de produto (UI) não está nesta ESPEC. O protótipo de 4 etapas aprovado pelo Presidente (reatividade por tipo de imóvel, CCIR como identificador rural, sem matrícula de IPTU no checklist rural) é a base para uma especificação formal de UI da Fase 2B, a ser produzida separadamente e deliberada pela Mesa. Esta ESPEC cobre o motor, não o casco. [A9 — VÍNCULO REGISTRADO; ESPEC DE UI = LACUNA DE PIEÇA]

---

12. Regras de não alteração dos ativos — reestruturado pela Correção A-07

A cadeia de congelamentos é o chão desta ESPEC. A v1.2 separa os ativos em duas categorias, conforme a Correção A-07 (Seção 0.1): **Congelados estruturais** (alteração exige novo rito completo de auditoria e deliberação formal da Mesa) e **Controlados** (podem ser alterados mediante escopo previamente autorizado pela Mesa, com registro de alteração, hash e validação de impacto).

**12.1 Congelados estruturais**

| Ativo | Âncora | Hash | Regra |
|---|---|---|---|
| VIS-001 | Norma fundacional | d5558cd4... | Parágrafo nenhum alterado |
| ADR-002 | ADR aprovado | — | Sem mudança |
| alagoas.json | AL-IBGE-001 | a4cf59b6... | 102 municípios, reconciliados |
| index.html | Motor MVP | 9ac698f9... | Linha vermelha — nunca tocado |
| Documento-Mestre v1.1 | AL-FASE2-001 | e0a75cfb... | Íntegro, sem edição |

**12.2 Controlados**

| Ativo | Âncora | Hash | Regra |
|---|---|---|---|
| config.json | Pós-C3 | b6752c4a... | Alteração somente mediante escopo previamente autorizado pela Mesa, com registro de alteração, hash e validação de impacto sobre os contratos/congelados |

Qualquer modificação em ativo Congelado estrutural exige nova auditoria completa e deliberação formal da Mesa — não é "corrigir e avisar", é parar e deliberar. Modificação em ativo Controlado exige autorização de escopo prévia da Mesa e registro formal, mas não o rito completo de auditoria dos congelados estruturais. O hash sela o estado que a Mesa decidiu oficializar; o hash não valida o conteúdo por si só.

---

13. Resumo de LACUNAS — pendentes de deliberação da Mesa

| ID | Lacuna | Consequência se não deliberada |
|---|---|---|
| LAC-001 | Matrizes base de urbano_comercial e rural (conteúdo) | Implementador não pode preencher; motor só cobre urbano_residencial_condomínio |
| LAC-002 | Gatilhos G-RURAL, G-MARÍTIMO, G-EMPRESA, G-CADASTRAL (definição formal) — = F2B-018 | Não entram na implementação; apenas os 6 gatilhos da ESPEC |
| LAC-003 | Critérios de entrada e saída do estado CONDICIONAL | CONDICIONAL permanece com semântica de escopo aberto |
| LAC-004 | ADR único dos 4 eixos de qualidade da evidência | Eixos registrados no Documento-Mestre, sem ADR formal |
| LAC-005 | 8º domínio / camada "Capacidade das Partes" | Fora da Fase 2B por deliberação |
| LAC-006 | Critérios de aceite de fase de engenharia (extração, desempenho, acessibilidade) | Suíte cobre limites do algoritmo, não engenharia de fase |
| LAC-007 | Especificação formal de UI da Fase 2B | Protótipo aprovado vinculado, mas UI não está nesta ESPEC |
| LAC-008 | Gap Epistemológico (outorga/CADIN — segundo teste de transversalidade) | Aguarda deliberação da Mesa para iniciar o teste |
| LAC-009 | Bloqueio comportamental (validação com 20 fundadores CRECI-AL) | Hipótese de produto: manter/remover/endurecer/bloqueio duro |
| LAC-010 | Nomenclatura técnica do mecanismo comum de comparação/reconciliação ("Diff Engine") | Não formalizada — deixa para a especificação técnica |

Nenhuma LACUNA acima foi alterada, resolvida ou preenchida nesta v1.2. Permanecem idênticas à v1.1.

---

14. Rastreabilidade — como interrogar qualquer requisito

Cada requisito F2B-XXX desta peça cita sua origem (A1–A9 + seção). Na implementação, a regra de verificação é direta: para cada comportamento do código, perguntar "onde está a regra que autoriza esse comportamento?" — a resposta deve ser um ID F2B com origem em artefato, ou uma das 4 Correções da Seção 0.1. Se a resposta não existir, o comportamento não entra e vira proposta de deliberação (nova linha na seção 13), nunca código.

O Claude, quando autorizado a implementar, receberá esta peça congelada (versão + hash + registro de governança) como instrução fechada, com os arquivos autorizados e os critérios de aceite da Seção 10. A auditoria pós-commit será independente: código × especificação × testes, com conferência de hashes dos artefatos congelados a cada rodada.

---

Esta peça v1.1 foi produzida por Manus AI (Auditor) sob mandato da Mesa de 20/08/2026. A v1.2 foi produzida por Claude, sob instrução direta e cláusulas ditadas pelo Arquiteto (GPT), a partir do parecer arquitetural do GPT sobre a v1.1 e da conferência textual de 4 achados contra o documento-fonte. Nenhuma regra foi criada por inferência do Claude — as 4 correções reproduzem o texto proposto pelo próprio GPT. Tudo o que não está sustentado pelos artefatos A1–A9 ou pelas Correções da Seção 0.1 permanece marcado como LACUNA.

Aguarda: revisão arquitetural final da v1.2 (GPT) → se sem conflito, "APTA PARA CONGELAMENTO" → deliberação da Mesa → cálculo do SHA-256 do arquivo real (não de resumo, cópia ou conversão) → registro de versão + hash + data + decisão → só então autorização ao Claude para análise de impacto sobre o E1 existente (sem escrever ou commitar nada) → retorno da análise à Mesa/Arquiteto → autorização específica para correção do E1 → auditoria (Manus, quando retornar) → certificação.
