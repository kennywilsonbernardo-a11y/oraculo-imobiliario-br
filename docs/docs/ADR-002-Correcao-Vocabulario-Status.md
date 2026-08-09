# ADR-002 — Correção do Vocabulário de Status (pós-teste Vale Verde)
## Oráculo Imobiliário BR

**Status:** ✅ **Aprovado** — voto unânime da mesa (Kenny Wilson: SIM, ChatGPT: SIM, Gemini: SIM) em 2026-08-08
**Data:** 2026-08-08
**Referencia:** VIS-001-Especificacao-Conceitual-Congelada.md (Seção 4 — Status documental)
**Origem:** Fase 1 — Teste de Estresse Conceitual: Caso Vale Verde
**Escopo desta correção:** Exclusivamente o vocabulário de status da Seção 4 do VIS-001. Identidade do produto, núcleo Rural/Urbano, papel do advogado e governança da biblioteca **não são reabertos** por este ADR.

---

## Contexto

O caso Vale Verde foi usado como caso-base para testar se a arquitetura congelada no VIS-001 conseguia representar uma operação imobiliária urbana real, seguindo a metodologia definida: procurar ativamente onde a arquitetura falha, não confirmar que ela funciona.

O teste confirmou que o pipeline universal e a metodologia de descoberta progressiva representam adequadamente o caso real. Mas encontrou duas lacunas específicas no vocabulário de status definido no VIS-001 §4, que motivam este ADR.

**Nota de precisão factual:** durante a revisão deste ADR, uma referência ao caso Vale Verde (em mensagem de revisão) afirmou que "R$ 300 mil" teriam sido pagos. Isso está incorreto — o sinal previsto no contrato **não foi pago**, conforme confirmado diretamente por Kenny Wilson. Este ADR usa apenas os fatos confirmados, não a referência incorreta.

**Nota sobre a auditoria A×B do pipeline:** a matriz usada para executar o teste Vale Verde empregava uma nomenclatura diferente da congelada no VIS-001 §2 (usava FATO/INFERÊNCIA em vez de ETAPA/VERIFICAÇÃO, entre outras diferenças). Uma auditoria comparativa, elemento por elemento, concluiu que **o pipeline oficial do VIS-001 §2 permanece correto e inalterado** — ETAPA e VERIFICAÇÃO são estruturais e não devem ser removidos; FATO e INFERÊNCIA não devem virar novos elos do pipeline. Essa auditoria também revelou um achado epistemológico separado (sobre a taxonomia de níveis de evidência do §5), que **fica registrado à parte, fora do escopo deste ADR** — ver documento `GAP-EPISTEMOLOGICO-Evidencia-Vale-Verde.md`. O caso Vale Verde permanece válido como teste; suas conclusões materiais (divergência de titularidade, indisponibilidades ativas, os dois gaps abaixo) não são afetadas por esta nota. O caso deverá ser remapeado com a nomenclatura oficial do pipeline antes de servir como matriz de referência para o MVP.

---

## Decisão 1 — Adicionar um quarto estado ao vocabulário: `INSUFICIENTE`

**Situação identificada:** o VIS-001 §4 define três estados (🔴 NÃO APTO / 🟡 PENDÊNCIA IDENTIFICADA / 🟢 VERIFICADO). Na simulação do "primeiro dia" do caso Vale Verde (quando só o contrato existia, sem a matrícula ainda obtida), nenhum dos três se aplicava: não havia problema identificado (não é NÃO APTO), não havia pendência específica conhecida (não é PENDÊNCIA IDENTIFICADA), e obviamente não havia verificação concluída (não é VERIFICADO). O que existia era **ausência de informação suficiente para avaliar**.

**Decisão:** adicionar um quarto estado:

> 🔵 `INSUFICIENTE — Verificações Essenciais Pendentes`

Usado quando a etapa não tem documentação básica suficiente para que qualquer um dos outros três estados possa ser determinado — representa insuficiência de evidência, não irregularidade.

**Consequência:** o vocabulário de status do VIS-001 §4 passa de 3 para 4 estados. Nenhuma outra seção do documento é afetada.

---

## Decisão 2 — Separar Estado Documental de Estado da Operação (princípio, sem taxonomia detalhada ainda)

**Situação identificada:** o caso Vale Verde mostrou que "o que sabemos sobre a documentação do imóvel" e "o que já foi comprometido/assumido na operação" são dimensões independentes, que podem estar em estados diferentes ao mesmo tempo. O imóvel pode estar 🔴 NÃO APTO enquanto a operação, numa dimensão diferente, ainda não envolveu nenhum compromisso consumado — ou o inverso.

**Decisão:** estabelecer o princípio, sem fixar taxonomia detalhada agora:

> **Estado Documental ≠ Estado da Operação.**
> O Estado Documental (vocabulário da Decisão 1 + VIS-001 §4) não deve ser utilizado para representar o grau de compromisso ou exposição já existente na operação — pagamento, posse, vínculo anterior entre as partes, ou qualquer outro compromisso assumido. Essas são informações de uma dimensão separada.

**Por que não fixar a taxonomia detalhada agora:** uma primeira proposta (sem exposição / parcialmente exposta / integralmente exposta) foi levantada e descartada nesta revisão — o caso Vale Verde já mostra que "exposição" envolve múltiplos fatores (valor pago, posse, vínculo locatício anterior, compromisso jurídico assumido), não apenas dinheiro. Definir a taxonomia agora, com um único caso real testado, seria repetir o erro que este processo inteiro existe para evitar: fixar uma classificação antes de ter evidência suficiente.

**Consequência:** o VIS-001 ganha, na Seção 4, uma nota de que existe uma segunda dimensão de status (Estado da Operação), com princípio definido mas taxonomia em aberto — a ser definida com base em mais casos reais, em ADR futuro específico para isso.

---

## Decisão 3 — Gap 3 (regra de atribuição de "Responsável") fica como roadmap, sem alteração estrutural

**Situação identificada:** o pipeline do VIS-001 tem "Responsável" como elo da cadeia, mas não define regra de atribuição quando isso não está previamente combinado entre as partes.

**Decisão:** registrar como item de roadmap — não bloqueia nem exige mudança estrutural neste ADR. Fica pendente de modelagem própria (possíveis responsáveis identificados no teste: comprador, vendedor, corretor, advogado, cartório, instituição financeira, órgão público).

---

## O que este ADR explicitamente NÃO altera

- Identidade do produto (VIS-001 §1)
- Pipeline universal ETAPA→DOCUMENTO→VERIFICAÇÃO→FONTE→EVIDÊNCIA→PENDÊNCIA→CONSEQUÊNCIA→CONDIÇÃO→PRÓXIMA AÇÃO→RESPONSÁVEL→STATUS (VIS-001 §2) — confirmado inalterado pela auditoria A×B; os 11 elos permanecem os mesmos. A mudança deste ADR é só no vocabulário de valores possíveis do elo "Status" (Decisão 1)
- Relação Motor Rural / Motor Urbano (VIS-001 §3)
- Governança da Biblioteca / níveis de evidência (VIS-001 §5) — o achado epistemológico sobre a taxonomia de evidência (origem/fonte vs. modo de produção da proposição) fica registrado separadamente, não decidido neste ADR
- Base de Casos Reais (VIS-001 §6)
- Papel do advogado (VIS-001 §7)
- Limites do Oráculo (VIS-001 §8)
- Regra de congelamento (VIS-001 §11) — este ADR é, na verdade, essa regra funcionando como desenhada: uma correção pontual e formalmente registrada, não uma reabertura.

---

## Sequência combinada para a próxima etapa
VIS-001 (baseline)
↓
Teste Vale Verde (Fase 1)
↓
Gaps 1 e 2 identificados
↓
ADR-002 (este documento)
↓
Aprovação (Kenny + ChatGPT + Gemini)
↓
Atualização controlada do VIS-001 §4
↓
Novo teste de estresse: caso outorga de água/CADIN, contra o vocabulário já corrigido
↓
Matriz do MVP Urbano
↓
Especificação técnica
↓
Código


O caso da outorga de água/CADIN **não é testado ainda** — só depois que este ADR for aprovado e o VIS-001 §4 for atualizado, para não reencontrar os mesmos dois gaps sem gerar informação nova.

---

*ADR aprovado por unanimidade (Kenny Wilson, ChatGPT, Gemini) em 2026-08-08, a partir do teste conceitual do caso Vale Verde. Sem código, sem alteração no GitHub além da publicação documental autorizada, sem reabertura de identidade.*


