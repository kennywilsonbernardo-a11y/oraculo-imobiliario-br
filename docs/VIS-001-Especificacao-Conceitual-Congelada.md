# VIS-001 — Especificação Conceitual Congelada
## Oráculo Imobiliário BR

**Status:** Congelado — aprovado por Kenny Wilson, com revisão de Claude, ChatGPT e Gemini
**Data:** 2026-08-07 (§4 emendado em 2026-08-08 via ADR-002, aprovação unânime da mesa)
**Natureza do documento:** Arquitetura de produto/domínio (não é decisão de software — para isso, ver família ADR)
**Regra de alteração:** Qualquer mudança no núcleo conceitual definido aqui exige um novo ADR formal, referenciando este documento. Nenhuma reformulação de identidade deve acontecer fora desse processo.

---

## 0. Por que este documento existe

Ao longo desta sessão, a identidade do Oráculo foi proposta três vezes: (1) consulta de módulo fiscal rural, (2) copiloto comercial com Índice de Segurança da Negociação e Base de Casos Reais, (3) motor universal de verificação documental. Cada reformulação foi mais madura que a anterior — mas sem um ponto de congelamento, o projeto correria o risco de nunca sair da fase conceitual.

Este documento é esse ponto de congelamento. A partir daqui, a discussão sai de "o que o Oráculo é?" para "como construímos a primeira versão comercializável do que já decidimos que ele é?".

---

## 1. Identidade oficial

> **Oráculo Imobiliário BR — Motor de Verificação Documental e Apoio à Tomada de Decisão Imobiliária.**

O produto não é um buscador de dados, nem um gerador de laudo, nem um substituto de análise jurídica. É um sistema que organiza documentos, verifica informações contra fontes, identifica pendências e aponta o que falta para uma operação avançar com segurança — em qualquer etapa, não só antes do sinal.

Rural e Urbano **não são produtos diferentes**. São domínios especializados dentro da mesma identidade, compartilhando o mesmo núcleo conceitual.

---

## 2. Núcleo universal — o pipeline

Toda verificação no Oráculo, seja Rural ou Urbano, segue a mesma cadeia conceitual:

> `ETAPA → DOCUMENTO → VERIFICAÇÃO → FONTE → EVIDÊNCIA → PENDÊNCIA → CONSEQUÊNCIA → CONDIÇÃO → PRÓXIMA AÇÃO → RESPONSÁVEL → STATUS`

**Definição de cada elo:**

| Elo | O que significa |
|---|---|
| Etapa | Em qual momento da operação a verificação acontece (captação, anúncio, proposta, sinal, financiamento, escritura, registro, regularização) |
| Documento | Qual documento/certidão está sendo verificado |
| Verificação | O que exatamente está sendo checado nesse documento |
| Fonte | De onde vem a informação (órgão, cartório, banco, base pública) |
| Evidência | O dado concreto encontrado (com nível de confiabilidade — ver seção 6) |
| Pendência | O que foi identificado como não resolvido |
| Consequência | O que pode acontecer se a pendência não for tratada (nunca uma ordem, uma descrição de efeito possível) |
| Condição | O que precisa ser comprovado ou regularizado para a pendência deixar de existir |
| Próxima ação | O passo concreto seguinte |
| Responsável | Quem deve executar essa próxima ação (vendedor, comprador, corretor, advogado, cartório) |
| Status | O estado documental da operação nessa etapa, nesse momento — não um veredito |

**Exemplo (baseado no caso real que motivou esta discussão, já anonimizado):**

> Etapa: financiamento  
> Documento: certidão de regularidade fiscal  
> Verificação: existência de débito impeditivo  
> Fonte: órgão competente (cadastro público)  
> Evidência: registro de débito relacionado a outorga de uso de água [nível: empírico/institucional]  
> Pendência: débito identificado, natureza a esclarecer  
> Consequência: financiamento pode não prosseguir enquanto a situação não for esclarecida  
> Condição: comprovação de regularização ou orientação jurídica específica  
> Próxima ação: proprietário apresentar documentação atualizada  
> Responsável: vendedor  
> Status: PENDÊNCIA IDENTIFICADA — avanço condicionado à regularização/comprovação

Repare: o Oráculo nunca diz "não compre". Ele descreve o que foi verificado, o que falta, e para quem é a próxima ação.

---

## 3. Motor Rural e Motor Urbano — relação com o núcleo

- **Motor Rural** — já implementado e publicado (v9.2.1-RC). É o primeiro domínio especializado, e funcionou como laboratório: foi nele que os princípios de fonte única, evidência, validação e auditoria foram testados e corrigidos ao longo desta sessão. Especializa o pipeline universal para o vocabulário fundiário (Módulo Fiscal, Fração Mínima de Parcelamento, classificação de propriedade).
- **Motor Urbano** — não implementado. Especializará o mesmo pipeline universal para o vocabulário urbano (matrícula, ônus, titularidade, tributário, condomínio, urbanístico, financiamento).
- **Motor Documental** (mencionado nas discussões anteriores, ex: OCR/leitura de PDF) — não implementado, não especificado neste documento. Fica registrado apenas como possibilidade de médio prazo, sujeita a um ADR próprio quando (e se) for priorizado.

Nenhum motor tem lógica de decisão própria fora do pipeline universal — todos alimentam e consultam a mesma estrutura ETAPA→...→STATUS.

---

## 4. Status documental — o que é e o que não é

**O que é:** o estado documental da operação, naquela etapa, naquele momento de verificação. Pode mudar conforme documentos são apresentados ou pendências resolvidas.

**O que não é:** um veredito jurídico, uma recomendação de "compre/não compre", uma certificação de que o imóvel está "regular" de forma absoluta.

**Vocabulário de status permitido (atualizado via ADR-002):**
- 🔵 `INSUFICIENTE — Verificações Essenciais Pendentes` — a etapa não tem documentação básica suficiente para que qualquer um dos outros três estados possa ser determinado. Representa insuficiência de evidência, não irregularidade.
- 🔴 `NÃO APTO PARA A PRÓXIMA ETAPA` — conforme verificações realizadas
- 🟡 `PENDÊNCIA IDENTIFICADA` — avanço condicionado à regularização/comprovação
- 🟢 `DOCUMENTAÇÃO VERIFICADA NO ESCOPO DESTA ETAPA`

**Vocabulário explicitamente proibido no núcleo:** percentuais de segurança/risco (ex: "87% seguro"), qualquer veredito com verbo de decisão ("avance", "não avance", "recomendo"), qualquer linguagem que simule parecer jurídico fechado.

O antigo conceito de "Índice de Segurança da Negociação" (percentual + veredito) fica **fora do núcleo congelado**. Um "Painel de Pendências e Riscos Identificados" pode existir como componente futuro, desde que respeite o vocabulário de status acima.

### Estado Documental ≠ Estado da Operação (princípio incorporado via ADR-002)

O Estado Documental (vocabulário acima) representa exclusivamente o que se sabe sobre a documentação do imóvel/operação naquela etapa. **Ele não deve ser utilizado para representar o grau de compromisso ou exposição já existente na operação** — pagamento, posse, vínculo anterior entre as partes, ou qualquer outro compromisso assumido. Essas são informações de uma dimensão separada: **Estado da Operação**.

As duas dimensões são independentes e podem estar em valores diferentes ao mesmo tempo — por exemplo, um imóvel pode estar `NÃO APTO PARA A PRÓXIMA ETAPA` (Estado Documental) enquanto a operação ainda não envolveu nenhum compromisso financeiro consumado (Estado da Operação), ou o inverso.

**A taxonomia detalhada do Estado da Operação não está definida neste documento.** Uma primeira proposta simplificada foi considerada e descartada durante a revisão do ADR-002 — casos reais mostraram que "exposição" envolve múltiplos fatores (valor pago, posse, vínculo locatício anterior, compromisso jurídico assumido), não apenas dinheiro. A taxonomia será definida em ADR futuro específico, com base em mais casos reais testados.

---

## 5. Governança da Biblioteca — níveis de evidência

Todo conhecimento na biblioteca do Oráculo (regras, valores de referência, interpretações normativas) deve ser classificado por origem:

| Nível | Natureza | Exemplo |
|---|---|---|
| Normativa | Lei, resolução, decreto vigente | Resolução CNJ 571/2024 |
| Oficial | Dado de órgão público | MF/FMP do INCRA |
| Institucional | Cartório, banco, prefeitura | Exigência de documentação de uma instituição específica |
| Jurisprudencial | Entendimento de tribunal | Precedente sobre um tipo de cláusula |
| Empírico | Caso real anonimizado (ver BCR, seção 7) | O caso da outorga de água |
| Hipótese | Inferência de IA, ainda sem fonte/evidência formal | Uma correlação sugerida mas não verificada |

**Regra fundamental de governança (não negociável):** uma IA pode propor conhecimento novo para a biblioteca. Uma IA não pode promover esse conhecimento a regra oficial sem fonte, evidência e processo de validação humana. Isso é a generalização direta da lição aprendida com o `config.json` divergente nesta sessão — nenhum dado entra como "verdade" sem rastro de onde veio.

**Nota de implementação (ver seção 9 — o que fica fora):** este modelo de níveis de evidência está **definido, não implementado**. Aplicar isso como campo estruturado na base de dados atual tem o mesmo risco já registrado em ADR-001-05 (`nivel_confianca`): schema novo sem atualizar o código de leitura no mesmo ciclo recria divergência silenciosa. Quando for implementado, código, schema, leitura, validação e migração entram juntos, no mesmo commit.

---

## 6. Base de Casos Reais (BCR)

Repositório de conhecimento empírico, anonimizado por design desde o primeiro registro — não como correção posterior.

**Estrutura de um caso:**
> CASO BCR-000N  
> Tipo: [Rural/Urbano]  
> Etapa: [qual etapa da operação]  
> Evento: [o que aconteceu]  
> Gatilho: [o que revelou o problema]  
> Documento/evidência: [que documento comprovou]  
> Efeito: [consequência real observada]  
> Lição operacional: [o que deveria ter sido verificado antes]  
> Fonte: [caso relatado / confirmado documentalmente, se houver]  
> Status da regra: [caso de referência interna / promovido a regra, se aplicável]

**Regra de anonimização:** nenhum campo pode conter nome de pessoa física ou jurídica, CPF/CNPJ, endereço específico, número de matrícula, número de processo judicial. Identificação das partes é sempre "removida" por padrão — nunca "a remover depois".

**Status:** conceito definido. Nenhum caso foi registrado na BCR ainda. Estrutura de dados e local de armazenamento não decididos (ver seção 9).

---

## 7. Papel do advogado — camada profissional independente

> Corretor → coleta documentos  
> ↓  
> Oráculo → organiza, verifica, cruza, evidencia, aponta pendências (pipeline da seção 2)  
> ↓  
> Advogado → realiza sua própria análise jurídica, quando a operação exigir  
> ↓  
> Advogado → emite/assina sua manifestação profissional, se cabível  
> ↓  
> Partes → tomam a decisão negocial

O Oráculo **não transfere responsabilidade** ao advogado, e a manifestação do advogado **não é uma validação automática** do que o Oráculo apresentou. São duas atividades distintas: o Oráculo organiza e verifica documentalmente; o advogado exerce sua própria atividade profissional, usando o relatório do Oráculo como um dos insumos.

**Não decidido ainda:** qual documento será assinado, por quem, com qual finalidade, e qual tipo de assinatura (gov.br, e-Notariado, ou outra) é juridicamente adequada para cada caso. Isso é definido depois, não faz parte deste congelamento conceitual.

---

## 8. Limites explícitos do Oráculo

O Oráculo **não é e não faz**:
- Não é PTAM (Parecer Técnico de Avaliação Mercadológica) — exige CRECI + CNAI (Res. COFECI 1066/2007)
- Não é laudo jurídico
- Não substitui certidão oficial
- Não emite veredito de "compre/não compre/avance/não avance"
- Não promove conhecimento de IA a regra oficial sem processo de validação
- Não garante que ausência de pendência identificada significa "imóvel juridicamente perfeito" — significa apenas que, nas fontes consultadas até o momento, nada foi encontrado

---

## 9. Matriz de escopo — o que está em cada estágio

| Item | Status |
|---|---|
| Motor Rural (MF/FMP) | ✅ **IMPLEMENTADO** — publicado, v9.2.1-RC, fonte única ativa e verificada |
| Governança de dados do Motor Rural (PVB-001) | ✅ **IMPLEMENTADO** — processo definido e ativo, cobertura 1,96% |
| Pipeline universal (ETAPA→...→STATUS) | 📘 **DEFINIDO** — este documento, sem código |
| Vocabulário de status documental | 📘 **DEFINIDO** — vocabulário fechado, sem implementação de UI |
| Governança da Biblioteca (níveis de evidência) | 📘 **DEFINIDO** — modelo conceitual, sem schema |
| Motor Urbano | 🗺️ **ROADMAP** — v9.3, ainda sem especificação técnica |
| Base de Casos Reais (BCR) | 🗺️ **ROADMAP** — estrutura de caso definida, sem implementação |
| Camada de apoio jurídico / assinatura | 🗺️ **ROADMAP** — parcialmente definido (papel do advogado), mecanismo técnico não decidido |
| Painel de Pendências e Riscos (substituto do ISN) | 🗺️ **ROADMAP** — direção aprovada, sem desenho de interface |
| Motor Documental (OCR/leitura de PDF) | ❓ **NÃO DECIDIDO** — mencionado, não especificado, não priorizado |
| Modelo de monetização/planos | ❓ **NÃO DECIDIDO** — hipóteses de preço discutidas, nenhuma validada com mercado |
| Integração PEI existente (`src/core/analisador-8-itens.js` etc.) | ⚠️ Código corrigido, desacoplado da interface (ADR-001-04) — decisão de quando integrar ainda pendente, agora deve ser reavaliada à luz deste documento (o PEI é candidato natural a virar a primeira instância do Motor Urbano) |

---

## 10. O que fica explicitamente fora da primeira construção comercial (v9.3)

Para não repetir o padrão de "resolver o mercado imobiliário brasileiro inteiro antes de lançar algo":

- Motor Documental (OCR) — fora
- Integração automática com ONR/SREI, ARISP, CNIB, TJAL — fora (registrado como trabalho futuro no README do Módulo PEI)
- Assinatura eletrônica de manifestação do advogado — fora
- Implementação do campo estruturado de níveis de evidência na biblioteca — fora (fica só conceitual, como já registrado)
- Qualquer forma de percentual/score de segurança — fora, permanentemente, não é "fase futura", é vocabulário proibido no núcleo

**O que pode entrar num MVP Urbano bem delimitado (v9.3):** um subconjunto pequeno do pipeline universal aplicado a poucos documentos urbanos críticos (matrícula, ônus, situação fiscal básica), com status documental (vocabulário da seção 4), sem BCR, sem biblioteca com níveis de evidência implementados, sem camada jurídica de assinatura. Escopo técnico exato é decisão de uma próxima etapa, não deste documento.

---

## 11. Regra de congelamento

A partir da aprovação deste documento:

1. A identidade da seção 1 e o pipeline da seção 2 não mudam sem um ADR novo que referencie explicitamente este VIS-001.
2. Novas ideias entram como linha na matriz da seção 9 (roadmap, não decidido, etc.) — não como reformulação da seção 1.
3. Qualquer proposta futura (de qualquer IA ou pessoa) que altere o núcleo precisa demonstrar por que o núcleo atual é insuficiente — não apenas apresentar uma visão mais ambiciosa.

---

## 12. Changelog

- **2026-08-07:** Documento congelado na versão original (v1.0), após revisão de Claude, ChatGPT e Gemini, aprovação de Kenny Wilson.
- **2026-08-08:** §4 emendado via **ADR-002** (aprovação unânime da mesa: Kenny Wilson, ChatGPT, Gemini), após teste de estresse conceitual com o caso Vale Verde. Mudanças: adicionado o quarto estado `INSUFICIENTE — Verificações Essenciais Pendentes`; formalizado o princípio Estado Documental ≠ Estado da Operação (taxonomia detalhada do Estado da Operação permanece em aberto, para ADR futuro). Nenhuma outra seção deste documento foi alterada — identidade, pipeline (§2), relação Rural/Urbano (§3), biblioteca (§5), BCR (§6), papel do advogado (§7) e limites (§8) permanecem exatamente como congelados originalmente.

---

*Documento congelado em 2026-08-07, após três rodadas de revisão (Claude, ChatGPT, Gemini) e aprovação de Kenny Wilson. Sujeito apenas a alteração via ADR formal. Emendado uma vez, via ADR-002, em 2026-08-08.*
