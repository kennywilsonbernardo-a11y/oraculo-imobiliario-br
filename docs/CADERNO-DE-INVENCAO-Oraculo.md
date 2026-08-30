# Caderno de Invenção — Oráculo Imobiliário BR

**Autor:** Kenny Wilson Bernardo, CRECI 2468-AL
**Início do registro:** 30/08/2026
**Natureza deste documento:** Registro interno de evolução técnica, para fins de estratégia futura de propriedade intelectual (marca, software, segredo empresarial e eventual patente de invenção implementada por computador). **Não é** parecer jurídico, não substitui avaliação de agente de propriedade industrial antes de qualquer depósito.

---

## 0. Por que este documento existe

Duas consultorias de IA (Meta e ChatGPT), em 30/08/2026, recomendaram de forma convergente que o valor do Oráculo não está apenas no código publicado, mas na combinação de arquitetura + evidências + auditabilidade — e que essa combinação precisa existir documentada, datada e com autoria clara, **antes** de qualquer decisão sobre patente.

Este caderno não é o pedido de patente. É a matéria-prima para, no futuro, um agente de propriedade industrial avaliar se existe uma **Invenção Implementada por Computador (IIC)** patenteável dentro do Oráculo — distinta de "um método de corretagem organizado por software" (não patenteável, art. 10, Lei 9.279/96).

**Nota de segurança jurídica:** a Lei 9.279/96, art. 12, prevê período de graça de 12 meses — divulgações feitas pelo próprio inventor (como os commits públicos no GitHub) não destroem a novidade, desde que o depósito de patente ocorra dentro desses 12 meses e a autoria seja comprovável. A disciplina de hash/commit/protocolo abaixo é exatamente essa prova.

---

## 1. Visão de longo prazo (norte, não plano de ação imediato)

> O Oráculo não é uma ferramenta de checklist. É a base — o sistema operacional documental — sobre o qual a verificação de qualquer operação imobiliária no Brasil pode rodar, independente de qual corretor está usando.

Essa visão ainda não orienta nenhuma decisão técnica de curto prazo (o projeto está em Fase de Validação, não de Escala). Ela existe aqui só para que, quando a arquitetura evoluir, cada decisão seja tomada sabendo pra onde aponta.

---

## 2. Linha de Proveniência da Invenção

| Marco | Evidência | Data (aprox.) |
|---|---|---|
| VIS-001 — vocabulário e identidade congelados | commit + hash | Fase inicial |
| Documento-Mestre (Fase 2) | commit + hash | Fase inicial |
| ESPEC-Consolidada-Fase2B v1.2 (motor E1) | commit + hash | Fase inicial |
| ADR-002 — proibição de score/percentual | commit | Fase inicial |
| casos-especiais.js — motor `avaliarGatilho` | commit + 7 testes | Ciclo 3 |
| Matriz de casos especiais: 10 → 23 casos, todos sourced | commits sucessivos | Ciclos 3–5 |
| ADR-003 — não-vínculo com advogado | commit, aprovado por Kenny Wilson | 30/08/2026 |
| Fixture Bulgarelli (G-DIVIDA, G-REGISTRO, G-OCUPANTE) | especificação de testes de estresse | Fase E1 |
| Correção do gatilho condicional de exigência de advogado (natureza do título → `requerAdvogado`) | commit no widget de produção | 30/08/2026 |
| Widget de produção com protocolo `PEI-AL-...` + hash de auditoria por caso gerado | rodando em produção | 30/08/2026 |
| Este Caderno de Invenção | commit + hash | 30/08/2026 |

Essa tabela deve ser atualizada a cada marco técnico relevante — é ela que sustenta o período de graça, se for necessário provar quando cada peça nasceu.

---

## 3. Entradas de invenção

### 3.1 — Motor de gatilhos condicionais (avaliação dinâmica de exigência documental)

**Problema técnico.** Sistemas de checklist documental imobiliário convencionais apresentam uma lista fixa de documentos por tipo de operação, independente das respostas específicas do usuário — não distinguem, por exemplo, se o vendedor é casado em regime que exige outorga, se o imóvel tem ônus, ou se a natureza do título exige acompanhamento jurídico por determinação legal específica.

**Estado da técnica.** Formulários e checklists imobiliários digitais existentes (sites de cartório, plataformas de due diligence) tipicamente apresentam campos estáticos ou, no máximo, mostram/escondem campos por uma única condição simples (ex: "se PJ, mostra campo CNPJ").

**Limitação dos sistemas existentes.** Não avaliam combinações de condições para determinar, dinamicamente, (a) quais documentos adicionais são necessários, (b) se a exigência de acompanhamento jurídico é uma obrigação legal específica daquele caso (não uma recomendação genérica), e (c) qual fonte legal sustenta cada exigência.

**Solução técnica do Oráculo.** Um motor que recebe como entrada um conjunto de respostas estruturadas (`dados`), avalia cada uma contra uma matriz de gatilhos com funções de condição (`gatilho: d => d.campo === valor`, incluindo combinações `&&`), e para cada gatilho disparado, retorna: situação identificada, documento adicional exigido, cuidado específico, fonte legal rastreável, e uma flag binária de necessidade de acompanhamento jurídico (`requerAdvogado`) — que altera dinamicamente o texto final apresentado ao usuário (Bloco C), sem intervenção humana.

**Arquitetura.**
```
respostas do usuário (dados)
  ↓
matriz de casos (situação + gatilho + documento + fonte + requerAdvogado)
  ↓
avaliarGatilho(dados) para cada caso
  ↓
lista de casos disparados
  ↓
renderização condicional (checklist + texto legal condicional)
```

**Fluxo.** Entrada estruturada → avaliação paralela de N condições independentes → filtragem dos disparados → composição de saída textual e de checklist, incluindo texto legal que muda de conteúdo (não só de visibilidade) conforme o resultado.

**Efeito técnico.** Redução de exigência documental genérica para exigência documental específica e rastreável por fonte legal, incluindo a determinação automática — não pré-fixada — de quando uma obrigação legal de acompanhamento jurídico existe, evitando tanto a omissão (risco ao usuário) quanto a superexigência indiscriminada (fricção comercial e sugestão incorreta de vínculo profissional).

**Variantes.** O mesmo motor pode ser aplicado a: (a) triagem fiscal, (b) triagem de risco de crédito, (c) qualquer domínio onde exigências regulatórias variem por combinação de atributos do caso.

**Exemplo concreto.** Caso real, 30/08/2026: usuário seleciona "Escritura Pública de Compra e Venda" → Bloco C não menciona advogado. Usuário troca para "Ação de adjudicação compulsória em andamento" → Bloco C atualiza, sem recarregar página, para incluir menção obrigatória a advogado, citando Provimento CNJ 150/2023 como fonte. Confirmado por captura de tela em produção.

**Data:** 30/08/2026. **Versão:** widget de produção, commit do dia.

---

### 3.2 — Separação estrutural entre triagem automatizada e conferência humana (Trilha A / Trilha E1)

**Problema técnico.** Ferramentas de triagem documental automatizada correm o risco de serem interpretadas (pelo usuário ou por terceiros) como emissão de parecer jurídico ou certificação de regularidade, gerando responsabilidade indevida e resultado potencialmente enganoso, especialmente quando o "score" ou "índice" de completude é confundido com avaliação de risco jurídico.

**Estado da técnica.** Ferramentas comerciais de "verificação de imóvel" comumente apresentam índices, percentuais de segurança ou classificações de risco sem distinguir claramente a fonte da avaliação (algoritmo vs. revisão humana).

**Limitação dos sistemas existentes.** A ausência dessa separação estrutural cria ambiguidade sobre o que a ferramenta efetivamente garante, comprometendo tanto a segurança jurídica do usuário quanto a do operador da ferramenta.

**Solução técnica do Oráculo.** Arquitetura com dois trilhos formalmente distintos: Trilha A (self-service, avaliação puramente baseada em regras declarativas e dados fornecidos pelo usuário, sem verificação de autenticidade) e Trilha E1 (motor de avaliação por evidências, com conferência humana obrigatória nos planos pagos). O vocabulário de saída é congelado por especificação (VIS-001) para impedir termos que sugiram certificação (proibição de "score", "percentual de segurança", "aprovado/reprovado").

**Efeito técnico.** Determinação automática e consistente do limite entre o que o sistema pode concluir sozinho e o que exige revisão humana, evitando resultado juridicamente ambíguo sem exigir revisão humana em 100% dos casos (o que inviabilizaria escala).

**Data:** especificação congelada, ADR-002. **Versão:** vigente desde a formalização do VIS-001.

---

## 4. Nota final

Nenhuma das entradas acima foi avaliada quanto a novidade ou atividade inventiva — isso exige busca de anterioridade profissional. Este caderno serve para que, quando essa avaliação acontecer, a matéria-prima já exista organizada, datada e com autoria comprovável.
