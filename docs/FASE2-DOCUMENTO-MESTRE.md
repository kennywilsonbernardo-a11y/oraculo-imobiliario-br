# Documento-Mestre — Fase 2: Teste de Transversalidade e Raio-X Documental
## Oráculo Imobiliário BR — Consolidação Conceitual

**Natureza:** Consolidação de todo o material conceitual produzido na Fase 2 (5 documentos de trabalho + arbitragem de 2 tensões pela Mesa). Não altera VIS-001, ADR-002 ou código. Não é ADR.
**Base congelada:** VIS-001 (identidade, pipeline §2, Rural/Urbano §3, Status §4, Biblioteca §5, BCR §6, advogado §7, limites §8 — todos preservados sem alteração)

**Mesa Deliberante:**
- Kenny Wilson
- ChatGPT
- Gemini

**Colaboradores/Auditores sem voto:**
- Claude — auditor técnico e consolidador dos artefatos sob instrução da Mesa
- Manus — verificador independente de evidências e governança documental

> *Nota de reconciliação histórica: a composição aqui registrada passa a ser a composição de governança vigente para a documentação produzida a partir desta data. Os registros históricos anteriores permanecem inalterados e não têm seu conteúdo histórico retroativamente modificado. Os changelogs históricos do VIS-001 e do ADR-002 permanecem como registros históricos do processo.*

**Documentos-fonte desta consolidação:** Fase 2 A-J, Segunda Sabatina, Reflexão Complementar, Addendum, Validação, Arbitragem de Tensões pela Mesa

**Legenda de classificação usada em todo o documento:**
- 🟢 **PRINCÍPIO CONSOLIDADO** — testado, validado pela mesa, pronto para especificação futura
- 🔵 **REFINAMENTO** — ajuste aceito sobre algo já consolidado
- 🟡 **HIPÓTESE** — proposta ainda não confirmada ou testada de forma insuficiente
- ⚪ **LACUNA** — questão real identificada, sem resposta ainda
- 🔴 **PROBLEMA** — tensão ou risco que exige atenção antes de avançar

---

## 1. Identidade — Camada Zero

🟢 Antes de qualquer verificação, o sistema estabelece a **Identidade do Imóvel**: matrícula, inscrição municipal, endereço, área, lote/quadra, unidade autônoma, cadastro rural, identificadores de concessionária, geometria/coordenadas quando disponível.

🟢 A Identidade não é um domínio de auditoria — é pré-requisito de todos. Nenhuma verificação roda sem ela estar minimamente estabelecida.

🔵 **Refinamento (Tensão 1 arbitrada):** existe **um mecanismo comum de comparação/reconciliação de evidências**, usado para duas finalidades de domínio distintas — não dois mecanismos paralelos:
1. **Identidade do ativo:** "essas evidências pertencem ao mesmo imóvel?"
2. **Coerência da verificação:** "as evidências que já se sabe serem do mesmo ativo concordam sobre o fato verificado?"

Nomenclatura de implementação (ex: "Diff Engine") **não formalizada ainda** — fica para a especificação técnica.

---

## 2. Perfil, Uso e Contexto

🟢 Três eixos independentes:
- **Perfil** — o que o imóvel é fisicamente/legalmente (apartamento, fazenda, galpão)
- **Uso** — o que está acontecendo ali de fato (residencial, comercial, produtivo, misto)
- **Contexto da Operação** — por que o Oráculo roda agora (venda, financiamento, regularização)

```
IMÓVEL (Identidade) → PERFIL × USO × CONTEXTO → determina quais domínios entram em Pertinência
                                                → determina quais Etapas do pipeline são ativadas
```

🟢 Confirmado pelo cenário 2 da Fase A-J: Uso muda Pertinência mesmo com Perfil idêntico (casa residencial vs. casa com atividade comercial) — os três eixos precisam ser genuinamente independentes, não um decorrendo do outro.

---

## 3. Taxonomia de Domínios

🟢 **7 macrodomínios operacionais**, reduzidos dos 10 originalmente propostos:

| Domínio | Pergunta que responde | Autoridade típica |
|---|---|---|
| Registral/Dominial | Quem é o titular e que ônus recaem sobre o bem? | Cartório / INCRA (rural) |
| Fiscal/Tributário | Há obrigação pecuniária perante o Fisco? | Fazenda municipal/estadual/federal |
| Urbanístico/Edilício | A construção/uso do solo está conforme? | Prefeitura |
| Condominial | Há obrigação perante o condomínio? | Administração condominial |
| Serviços/Utilidades | Há débito de consumo perante concessionária? | Concessionárias |
| Ambiental/Hídrico | Há restrição/autorização de uso de recurso natural? | Órgãos ambientais |
| Licenciamento/Operação | A atividade está autorizada a operar? | Bombeiros, vigilância sanitária, prefeitura |

🔵 **Refinamento:** Fiscal/Tributário, Condominial e Serviços/Utilidades fazem, em tese, a mesma pergunta estrutural ("há dívida vinculada ao bem perante credor X?") — não foram fundidos porque o credor determina consequência jurídica distinta (penhora/leilão vs. rito de cobrança condominial vs. corte de serviço). Decisão de engenharia, registrada como tal.

⚪ **Lacuna aberta desde a primeira rodada, não resolvida:** "Capacidade das Partes" (inventário, procuração, recuperação judicial/falência do vendedor) não tem lar claro nos 7 domínios — é uma pergunta sobre a **parte transacionando**, não sobre o **bem**. Candidata a 8º domínio ou camada transversal própria. Motivada pelo próprio caso real testado na Fase 1 (Vale Verde — Cerutti Engenharia em recuperação judicial).

---

## 4. Rural — três camadas, não um domínio

🟢
| Conceito | Camada | O que é |
|---|---|---|
| Perfil Rural | Camada Zero (dado do imóvel) | Atributo: este imóvel é fazenda/sítio/chácara |
| Motor Rural | Implementação (já existe, v9.2.1-RC) | Especialista que traduz fontes rurais (INCRA, MF/FMP, CCIR, SIGEF) para o vocabulário dos domínios existentes |
| Domínio de Auditoria | Os 7 macrodomínios | Categorias documentais, cortam Rural e Urbano igualmente |

```
Perfil = Rural → ativa Motor Rural → Motor Rural popula:
   Registral/Dominial   ← CCIR, SIGEF, matrícula rural
   Fiscal/Tributário    ← ITR
   Ambiental/Hídrico    ← CAR, Reserva Legal, outorga
```

Nenhum domínio "Fundiário/Rural" próprio — evita recriar a fragmentação que a redução de 10→7 domínios já corrigiu.

---

## 5. Motores Especializados — subordinados ao núcleo

🟢 Generalização do princípio do Motor Rural: qualquer motor especializado (Rural, e futuros — Urbanístico, Condominial, Fiscal, Hídrico) é um **populador de domínios**, nunca sistema paralelo.

```
NÚCLEO UNIVERSAL (Pertinência → Verificação → Evidência → Cruzamento)
      ↓ quando o domínio exige conhecimento especializado
MOTOR ESPECIALIZADO (ex: Motor Rural)
      ↓ retorna Fato/Verificação/Evidência no vocabulário do domínio
Volta ao pipeline universal, que não precisa saber que um motor foi consultado
```

🟢 **Consequência para o PEI:** reforça ADR-001-04 (permanece desacoplado). Quando reaproveitado, deve ser refeito como motor especializado subordinado — não reintegrado como está, com sua própria lógica de score.

---

## 6. O Pipeline Completo — cadeia validada pela Mesa (Tensão 2 arbitrada)

🟢 **Cadeia conceitual completa, oficialmente validada:**

```
FATO/CONDIÇÃO ANTECEDENTE
        ↓
PERTINÊNCIA → VERIFICAÇÃO → EVIDÊNCIA → SUFICIÊNCIA → RESULTADO → STATUS DOCUMENTAL
```

> *"FATO não integra o pipeline estrutural congelado no VIS-001 §2. Trata-se de antecedente conceitual utilizado para determinar Pertinência."*
>
> *Nota de origem: a arbitragem formal da Tensão 2 foi expressa a partir de PERTINÊNCIA. O conceito de FATO como antecedente conceitual foi desenvolvido nas discussões da Fase 2 e consolidado posteriormente no Documento-Mestre. Portanto, FATO deve ser identificado como síntese conceitual da Mesa, e não como elo do pipeline ou como formulação literal da arbitragem da Tensão 2.*

Três camadas de classificação **distintas e não substituíveis entre si**:

| Camada | Pergunta | Vocabulário |
|---|---|---|
| **Pertinência** | Isso deve ser auditado? | 🟢 PERTINENTE / 🟡 CONDICIONAL / ⚪ NÃO APLICÁVEL / 🔵 EVIDÊNCIA INSUFICIENTE (nível de pertinência) |
| **Suficiência Probatória** | As evidências respondem adequadamente à verificação? | Suficiente / Parcial / **suficiência probatória insuficiente** / Conflitante |
| **Status Documental** | Qual o estado da etapa, segundo o VIS-001 §4? | `status INSUFICIENTE (VIS-001 §4)` / `NÃO APTO` / `PENDÊNCIA IDENTIFICADA` / `VERIFICADO` |

🟢 **Nenhum novo Status entra no VIS-001 §4.** As camadas de Pertinência e Suficiência existem *antes* e *ao redor* do Status, nunca o substituem.

🔵 **Refinamento (arbitrado):** a colisão lexical de "INSUFICIENTE" aparecendo em duas camadas (Suficiência da Evidência e Status Documental) será resolvida por **namespaces semânticos futuros** na especificação técnica (ex: `evidencia.suficiencia.insuficiente` vs. `status.insuficiente`) — sem alterar o VIS-001 agora.

🟡 **Hipótese não congelada:** `CONTEXTO_INCOMPLETO` foi levantado como possível estado adicional de Pertinência, mas **não está aprovado**. `CONDICIONAL` permanece como o estado conceitual aprovado para essa situação até novos testes trazerem um caso que `CONDICIONAL` não consiga representar.

### 6.1 FATO × VERIFICAÇÃO — posição corrigida ao longo da Fase 2

🟢 Fato e Verificação **não são a mesma coisa** (posição inicial da Fase 2 corrigida após a Segunda Sabatina):
- **Fato**: proposição sobre o mundo, existe fora do pipeline, na camada de Pertinência (*"existe captação própria de água?"*)
- **Verificação**: procedimento que testa conformidade documental, pressupondo que o Fato já é conhecido (*"existe outorga compatível com a captação identificada?"*)

Um Fato pode ser estabelecido por presunção da Camada Zero, ou **descoberto como Evidência de um domínio, virando Fato de outro** — esse é o mecanismo de Pertinência Dinâmica (Seção 8).

### 6.2 Cardinalidade — Verificação como unidade central

🟢 **Documento/Fonte não é a unidade central da auditoria — Verificação é.**

```
Uma VERIFICAÇÃO pode consumir N pares (Documento, Fonte), cada um produzindo sua própria Evidência.
Todas as Evidências de uma Verificação se combinam em UM conjunto de Suficiência,
que sustenta UM Resultado → Status para aquela Verificação.
```

Exemplo: Verificação "Titularidade" pode exigir Matrícula + Contrato + Cadastro Municipal + IPTU — um conjunto, não quatro verificações isoladas.

---

## 7. Pertinência Dinâmica

🟢 **Necessária, com regra de contenção.** Uma Evidência descoberta durante a auditoria pode revelar um Fato novo e ativar Pertinência em outro domínio — evidenciado pelo próprio caso real Vale Verde (divergência de titularidade revelou necessidade de investigar capacidade do vendedor).

🔵 **Regra de contenção:** só reativa Pertinência quando a Evidência **contradiz diretamente uma premissa da Camada Zero** (Perfil, Uso ou Contexto declarados) — não por menção incidental a outro domínio. Evita cadeias de descoberta sem limite.

---

## 8. Qualidade da Evidência — quatro eixos independentes

⚪ **Lacuna registrada, recomendada para um único ADR futuro** (não quatro fragmentos separados):

| Eixo | Pergunta | Independência testada |
|---|---|---|
| **Confiabilidade da Fonte** | Quão confiável é quem emitiu? | Cartório = alta; autodeclaração = baixa |
| **Qualidade da Evidência** | O artefato está íntegro/legível/completo? | Independente de quem emitiu — PDF nativo vs. scan ilegível |
| **Suficiência** | Responde à Verificação específica, com atualidade? | Mesma fonte pode ser suficiente para um Fato e insuficiente para outro |
| **Escopo** | O que a evidência permite afirmar, e o que está fora do alcance? | Certidão negativa municipal não prova ausência de dívida estadual — risco real de falso positivo por extrapolação |

🟢 Adicionalmente, três **modos de geração** da evidência (eixo diferente, não conflitante):
- **Declarada** pela fonte diretamente (certidão afirma)
- **Extraída** de dentro de um documento (dado lido, não é o propósito central do documento)
- **Inferida por cruzamento** (não existe isolada em nenhuma fonte — só aparece ao comparar evidências, ex: divergência de titularidade)

🟢 E três **metadados de temporalidade** (confirmados contra o documento real da matrícula Vale Verde, que já os continha implicitamente):
- **Data de captura** — quando o Oráculo obteve a evidência
- **Período de referência** — até que data o conteúdo reflete a realidade
- **Validade/revalidação** — até quando pode ser usada sem nova captura

---

## 9. Cruzamento de Evidências e Raio-X Documental

🟢 O Cruzamento usa a Identidade (Seção 1) como chave, e o mecanismo comum de comparação/reconciliação (Tensão 1) para detectar divergências — seja de identidade entre domínios, seja de coerência dentro de uma mesma Verificação.

🟢 **Raio-X Documental é agregação estruturada, nunca pontuação.** Estrutura: lista por domínio, com Status individual de cada item, mais inconsistências de identidade encontradas — nunca um número único resumindo tudo.

🟢 **Cobertura da Auditoria ≠ Score de Segurança:**

> *Nota de nomenclatura: este indicador é distinto da "Cobertura de Validação da Base" definida no PVB-001 (percentual de municípios com fonte oficial validada). Para evitar ambiguidade, nunca usar "Cobertura" isoladamente quando houver risco de confusão entre os dois:*
> - ***Cobertura de Validação da Base*** *= indicador do PVB-001, sobre a maturidade da base de dados*
> - ***Cobertura da Auditoria*** *(ou Cobertura das Verificações) = indicador do caso auditado especificamente*

- **Score de segurança** (banido pelo VIS-001 §4, permanentemente): descreve o *resultado* — quão seguro é o imóvel
- **Cobertura da Auditoria** (aprovada, com guarda-corpo): descreve o *processo do caso auditado* — quantas verificações pertinentes já foram concluídas, independente do que foi encontrado

Guarda-corpo: Cobertura da Auditoria nunca aparece ao lado de linguagem de segurança ("70% coberto, portanto seguro" é proibido), e não deve ser confundida com percentuais de validação da base (PVB-001).

---

## 10. Client-Side como decisão de MVP

🟢 A arquitetura conceitual (Pertinência → Verificação → Evidência → Cruzamento → Raio-X) é **agnóstica de infraestrutura por design** — não presume backend nem o proíbe. Client-side é uma decisão válida de MVP.

🔴 **Onde vira limitação real, não escondida:** Cruzamento entre múltiplos domínios com Gate de Identidade, e qualquer consulta automatizada a fontes externas (CORS, credenciais), começam a exigir componente de servidor — persistência, credenciais, integrações externas ou processamento pesado. Isso é decisão de roadmap/infraestrutura, não de arquitetura de domínio — fica fora do VIS-001 e desta Fase 2.

---

## 11. Tabela de Classificação Consolidada — todos os achados

| # | Achado | Classificação |
|---|---|---|
| 1 | 7 domínios operacionais (reduzidos de 10) | 🟢 Taxonomia validada nos cenários testados, sujeita a novos testes de cobertura — não é dogma universal |
| 2 | "Fundiário/Rural" não é domínio, é atributo de Perfil | 🟢 Consolidado |
| 3 | CAPACIDADE DAS PARTES / OPERAÇÃO — LACUNA ARQUITETURAL ABERTA | ⚪ Lacuna aberta (não criar 8º domínio agora) |
| 4 | Rural em 3 camadas (Perfil/Motor/Domínio) | 🟢 Consolidado |
| 5 | Motores especializados subordinados ao núcleo | 🟢 Consolidado |
| 6 | Cadeia FATO/CONDIÇÃO ANTECEDENTE → PERTINÊNCIA→VERIFICAÇÃO→EVIDÊNCIA→SUFICIÊNCIA→RESULTADO→STATUS | 🟢 Consolidado — cadeia a partir de PERTINÊNCIA é arbitrada pela Mesa; FATO como antecedente é síntese da Mesa (ver Seção 6, nota de origem) |
| 7 | Fato ≠ Verificação | 🟢 Consolidado (posição corrigida) |
| 8 | Verificação (não Documento) é unidade central; cardinalidade 1-para-N | 🟢 Consolidado |
| 9 | Pertinência Dinâmica, com regra de contenção | 🟢 Consolidado |
| 10 | "Fato Não Determinado" como estado novo | 🟡 Testado e rejeitado — mapeia para CONDICIONAL |
| 11 | `CONTEXTO_INCOMPLETO` como estado de Pertinência | 🟡 Hipótese não congelada |
| 11b | LACUNA ABERTA — CRITÉRIO DE ENTRADA E SAÍDA DO ESTADO CONDICIONAL | ⚪ Lacuna aberta — ainda não definido qual fato determina entrada em CONDICIONAL, qual evidência encerra a condição, quando se torna PERTINENTE, quando se torna NÃO APLICÁVEL. Não resolvida nesta revisão |
| 12 | Gate de Identidade obrigatório pré-cruzamento | 🟢 Consolidado |
| 13 | Mecanismo comum de comparação (Identidade + Coerência) | 🔵 Refinamento (Tensão 1 arbitrada) |
| 14 | Colisão lexical "INSUFICIENTE" (Suficiência × Status) | 🔵 Refinamento — namespace futuro, sem alterar VIS-001 |
| 15 | Confiabilidade da Fonte × Qualidade × Suficiência × Escopo | ⚪ Lacuna — candidato a ADR único futuro |
| 16 | Evidência Declarada/Extraída/Inferida | 🟢 Consolidado |
| 17 | Temporalidade (3 metadados) | 🟢 Consolidado |
| 18 | Cobertura da Auditoria ≠ Score de segurança ≠ Cobertura de Validação da Base (PVB-001) | 🟢 Consolidado, com guarda-corpo e distinção nominal |
| 19 | Client-side como decisão válida de MVP | 🟢 Consolidado, **com** o risco/limitação futura preservado (ver Seção 10, 🔴) — não perder essa nuance ao resumir |
| 20 | Risco de explosão combinatória (Domínios × Perfis × Usos) | 🟢 Avaliado como controlado, não estrutural |

---

## 12. O que permanece intocado (confirmação final)

- **VIS-001:** identidade (§1), pipeline (§2), Rural/Urbano (§3), Status (§4), Biblioteca (§5), BCR (§6), advogado (§7), limites (§8) — nenhuma alteração
- **ADR-002:** aprovado, sem mudança
- **Gap Epistemológico:** registrado, aguardando o segundo teste de estresse (outorga/CADIN) para eventual confirmação
- **Código:** nenhum arquivo tocado
- **Nenhum ADR novo** foi criado nesta consolidação

---

## 13. Próximo passo (aguardando nova deliberação da Mesa)

Conforme instrução explícita: este documento-mestre encerra a rodada de aprofundamento conceitual. O segundo teste de transversalidade (caso outorga de água/CADIN) só é iniciado após nova deliberação formal da Mesa autorizando. A Fase 2B não se inicia com a entrega desta revisão — aguarda nova deliberação.

---

## 14. Changelog da Revisão

**Versão:** 1.1 (corrigida) — substitui a versão 1.0 como candidata a referência oficial da Fase 2.
**Data:** revisão pós-Parecer de Falsificação Ativa do Manus + deliberação da Mesa.
**A versão 1.0 (pré-correção) permanece como histórico** — não deve ser tratada como referência oficial definitiva.

| # | Correção | Fundamento/fonte |
|---|---|---|
| 1 | Cabeçalho: separada "Mesa Deliberante" (Kenny, ChatGPT, Gemini) de "Colaboradores/Auditores sem voto" (Claude, Manus); adicionada nota de reconciliação histórica | Deliberação da Mesa, item 1 |
| 2 | Seção 6: FATO deixou de aparecer como elo do pipeline (`FATO → PERTINÊNCIA →...`); passou a `FATO/CONDIÇÃO ANTECEDENTE` com seta separada para a cadeia arbitrada; nota de origem explicitando que é síntese da Mesa, não formulação literal da arbitragem da Tensão 2 | Deliberação da Mesa, itens 2 e 6; ADR-002 (FATO/INFERÊNCIA não são elos) |
| 3 | Seção 9 e item 18 da tabela: distinção nominal entre "Cobertura de Validação da Base" (PVB-001) e "Cobertura da Auditoria" (caso auditado); nota de nomenclatura explícita | Deliberação da Mesa, item 3; PVB-001 |
| 4 | Item 19 da tabela: corrigida para preservar o 🔴 (risco/limitação futura de client-side) que o corpo do texto já tinha e a tabela vinha omitindo | Deliberação da Mesa, item 4; auto-auditoria anterior |
| 5 | Item 11b da tabela (novo): registrada explicitamente "LACUNA ABERTA — CRITÉRIO DE ENTRADA E SAÍDA DO ESTADO CONDICIONAL", não resolvida | Deliberação da Mesa, item 5 |
| 6 | Seção 6, tabela de camadas: "Insuficiente" isolado qualificado em todas as ocorrências (`EVIDÊNCIA INSUFICIENTE (nível de pertinência)`, `suficiência probatória insuficiente`, `status INSUFICIENTE (VIS-001 §4)`) | Deliberação da Mesa, item 3 (regra editorial de ambiguidade lexical) |
| 7 | Item 3 da tabela: adotada a redação exata "CAPACIDADE DAS PARTES / OPERAÇÃO — LACUNA ARQUITETURAL ABERTA"; item 1 da tabela: adotada a redação "taxonomia validada nos cenários testados, sujeita a novos testes de cobertura" | Deliberação da Mesa, item 5 |

**Confirmação explícita:** nenhum código, VIS-001 ou ADR-002 foi alterado nesta revisão. Nenhum ADR novo foi criado. Nenhum conceito, domínio, estado ou requisito novo foi introduzido — todas as mudanças acima são correções de rotulagem, atribuição de autoridade e nomenclatura, dentro do escopo exato autorizado pela Mesa.

---

*Documento-mestre v1.1, consolidando 5 documentos de trabalho, a arbitragem de 2 tensões pela Mesa, e esta revisão de governança pós-auditoria (própria + Manus). Sem alteração de VIS-001, ADR-002 ou código. Sem novo ADR. Candidato único à aprovação formal da Mesa como referência da Fase 2.*
