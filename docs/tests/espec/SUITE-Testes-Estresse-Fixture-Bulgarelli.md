<!-- CABEÇALHO ADICIONADO PELO CICLO C4 — NÃO FAZ PARTE DA ESPECIFICAÇÃO ORIGINAL -->
<!--
STATUS: ESPECIFICAÇÃO DE TESTES PENDENTE DE IMPLEMENTAÇÃO DO MOTOR
Vinculação: ESPEC-Gatilhos-Excecao-Algoritmo (17/08/2026); FASE2-DOCUMENTO-MESTRE v1.1 (AL-FASE2-001)
Contagem real: 17 testes (F1×3, F2×3, F3×3, F4×4, F5×4)
Execução: BLOQUEADA até a implementação do Algoritmo das 3 Camadas de Gatilhos de Exceção
Motivo: verificação no repositório (ciclo C4) não encontrou executarMotor, G-DIVIDA, G-REGISTRO,
        G-OCUPANTE, G-PRESCRICAO, gatilhos, ha_divida_ativa, valor_total_debt nem ordenação
        topológica. O único motor existente é src/core/analisador-8-itens.js (85 linhas, regex),
        conceitualmente distinto. Não há comportamento existente a registrar.
Implementação: candidata à Fase 2B, com deliberação própria da Mesa. Esta suíte versionada
               será o critério de aceite dessa implementação.
Sem código executável. Texto original abaixo, não editado.
-->

<!-- NOTA DE RECONCILIAÇÃO — CAMADA DE METADADOS DO CICLO C4 — NÃO FAZ PARTE DA ESPECIFICAÇÃO ORIGINAL -->
<!--
O corpo original registra "16 cenários tabelados" na Seção 9; a contagem real dos testes do
documento é 17 (F1×3, F2×3, F3×3, F4×4, F5×4). O valor "16" do corpo original é preservado;
a contagem de 17 é o número de testes da versão publicada e o critério de aceite da
implementação futura. Nenhuma palavra do corpo original foi alterada.
-->

# Suíte de Testes de Estresse — Fixture Bulgarelli
## Validação dos Limites do Algoritmo das 3 Camadas de Gatilhos de Exceção

**Autor:** Manus AI — Auditor do Oráculo
**Data:** 17/08/2026
**Classificação:** Especificação de teste — rascunho de auditoria, submetido à Mesa
**Vinculação:** Complementa a ESPEC-Gatilhos-Excecao-Algoritmo (17/08/2026); fixture Bulgarelli como caso de regressão permanente
**Princípio:** nenhum teste altera VIS-001, ADR-002 ou a camada AL-IBGE-001 (congelada)

## 1. Filosofia de Teste

O fixture Bulgarelli é um caso feliz de complexidade: os três gatilhos de criticidade alta (G-DIVIDA, G-REGISTRO, G-OCUPANTE) ativam simultaneamente e produzem o roteiro esperado. Isso prova que o algoritmo funciona no centro do espaço de possibilidades. Os testes de estresse, porém, devem atacar as bordas — onde os algoritmos costumam quebrar: dados faltantes, dados conflitantes, ciclagem entre estágios, e extração imperfeita de PDF. A suíte está organizada em cinco famílias de teste, com o comportamento esperado e o critério de reprovação para cada uma.

| Família | O que ataca | Por que é o ponto fraco |
|---|---|---|
| F1 — Vacância de dados | Campos null / evidências ausentes | Extração de PDF real é imperfeita; o MVP depende de null semântico |
| F2 — Conflito entre evidências | Documentos que se contradizem | O Oráculo nunca deve decidir sozinho; deve exigir documento adicional |
| F3 — Ciclagem e idempotência | Reavaliação iterativa, gatilhos recursivos | Risco de loop infinito ou mudança de saída sem mudança de entrada |
| F4 — Injeção adversarial | Dados malformados, CPF trocado, documento de outro imóvel | Robustez de segurança + proteção contra fraude de entrada |
| F5 — Decisão de fronteira | Casos limítrofes entre gatilhos | Calibragem fina: onde exatamente um gatilho liga/desliga |

## 2. Família F1 — Vacância de Dados

### T1.1 — Extração parcial do BCI (simula falha do pdf.js)

**Injeção:** remover do fixture o campo ha_divida_ativa (mantendo valor_total_debt: 10004.12).

**Comportamento esperado:** G-DIVIDA não ativa (cláusula ha_divida_ativa == true falha em null), mas o motor detecta valor_total_debt > 0 em evidência parcial e exige o extrato completo via verificação de suficiência — o roteiro resultante muda (volta à matriz base + pendência de suficiência), sem produzir falso negativo silencioso.

**Critério de reprovação:** se o motor aceitar null como "sem dívida" e retornar matriz base limpa → falha crítica, pois o usuário pagaria um IPTU com dívida ativa sem saber.

### T1.2 — Ausência total de evidências (perfil puro, sem PDF)

**Injeção:** fixture com perfil completo (urbano, condomínio, ocupante terceiro) e evidencias: [].

**Comportamento esperado:** matriz base + G-OCUPANTE ativa (a condição opera sobre perfil.ocupante, não sobre evidências) + aviso de que nenhuma evidência foi submetida (suficiência global = insuficiente). O roteiro é exibido, mas com status "diagnóstico preliminar — pendente de documentos".

**Critério de reprovação:** se o motor travar, ou se produzir roteiro de 7 documentos sem avisar que está trabalhando sem evidência → falha de contrato de suficiência.

### T1.3 — Evidência sem proveniência

**Injeção:** evidência com fonte: null e data_emissao: null.

**Comportamento esperado:** a evidência é rejeitada no estágio de normalização (pré-Estágio 1) com mensagem explícita de proveniência ausente. Nenhuma verificação é afetada.

**Critério de reprovação:** aceitar evidência sem proveniência violaria VIS-001 diretamente — falha epistemológica, não apenas técnica.

## 3. Família F2 — Conflito entre Evidências

### T2.1 — BCI vs. Extrato de Dívida: divergência de proprietário

**Injeção:** fixture com CPF do BCI = Bulgarelli e CPF do extrato de dívida = terceiro qualquer.

**Comportamento esperado:** o motor executa a verificação de coerência interna (mesma que fizemos manualmente no caso real) e aciona alerta de divergência cadastral — adiciona verificação "CONFIRMAR_TITULARIDADE_CADASTRAL" e marca o caso como "inconsistência detectada; análise suspensa até resolução".

**Critério de reprovação:** se o motor ignorar a divergência e seguir com o roteiro normal → falha crítica. Esta verificação é exatamente o que protege contra fraude ou erro de emissão.

### T2.2 — Matrícula futura revela usucapião de terceiro (ciclo iterativo)

**Injeção:** no ciclo 2 do motor, adicionar evidência "MATRICULA" com averbacao_usucapiao_terceiro: true.

**Comportamento esperado:** o motor re-executa os 3 estágios (idempotente para a mesma entrada, mas reativo para nova entrada) e reordena o roteiro: o Bloco Decisão ganha verificação "AVALIAR_ANULATORIA" com bloqueio comportamental ("não realize pagamentos ou negociações — propriedade possivelmente transferida"). G-DIVIDA pode desativar retroativamente se a nova evidência mostrar que o imóvel já não pertence a Bulgarelli (a dívida fica, mas a rota muda).

**Critério de reprovação:** se o roteiro não reagir à nova evidência ou mantiver o Bloco Custo em primeiro lugar → falha de reatividade.

### T2.3 — Documento de outro imóvel submetido por engano

**Injeção:** BCI com inscrição imobiliária 290099 (não-confere com a do perfil).

**Comportamento esperado:** rejeição com mensagem de incompatibilidade de inscrição — o motor exige que todos os documentos do mesmo ciclo refiram-se ao mesmo imóvel identificado pelo perfil.

## 4. Família F3 — Ciclagem e Idempotência

### T3.1 — Idempotência pura

**Execução:** rodar executarMotor(fixture_bulgarelli) dez vezes seguidas.

**Comportamento esperado:** dez saídas idênticas byte a byte (roteiro, gatilhos ativos, bloqueios).

**Critério de reprovação:** qualquer variação → violação do invariante central da ESPEC.

### T3.2 — Ciclo iterativo sem convergência

**Injeção:** simular usuário que retorna, a cada ciclo, uma evidência que ativa um gatilho que por sua vez exige documento que, quando submetido, desativa o gatilho anterior (ex.: pagar IPTU → G-DIVIDA desativa → mas nova evidência de condomínio ativa G-CONDOMINIO → que exige ata que reativa algo).

**Comportamento esperado:** o motor sempre converge porque (a) gatilhos são avaliados sobre o conjunto atual de evidências, não sobre histórico; (b) verificações adicionadas nunca são removidas pelo motor — apenas o status muda de "pendente" para "completa". O número de verificações é monotonicamente não-decrescente por ciclo, e o espaço é finito → convergência garantida.

**Critério de reprovação:** qualquer cenário em que o motor alterne entre dois roteiros distintos sem mudança de entrada → falha de ciclo.

### T3.3 — Dependência circular entre verificações

**Injeção:** modificar declarativamente (em teste, não em produção) duas verificações com dependencias mútuas.

**Comportamento esperado:** a ordenação topológica do Estágio 3 falha explicitamente com "Ciclo de dependência detectado: V1, V2".

**Critério de reprovação:** gerar roteiro infinito ou ordem arbitrária → falha de segurança.

## 5. Família F4 — Injeção Adversarial

### T4.1 — CPF malformado

**Injeção:** cpf_proprietario: "652.238.617-8X" ou vazio.

**Comportamento esperado:** validação de formato rejeita o campo com mensagem clara; o gatilho que depende de CPF simplesmente não se aplica (cláusula falha em null) — nunca quebra com exceção não tratada.

### T4.2 — Valor de dívida negativo ou absurdo

**Injeção:** valor_total_debt: -5000 ou 1e9.

**Comportamento esperado:** validação de saneamento de dados corrige/rejeita; o motor nunca usa valor não-saneado em condição numérica.

### T4.3 — Documento com código de autenticidade inválido

**Injeção:** autenticidade: null em evidência municipal.

**Comportamento esperado:** a evidência é classificada como baixa confiança — o motor aceita (pois pode ser documento escaneado), mas exibe aviso de proveniência não verificável e não a usa para desativar verificações, apenas para adicionar contexto. Regra de segurança: evidência fraca nunca reduz o roteiro, só pode ampliá-lo ou enriquecê-lo.

### T4.4 — Múltiplos perfis na mesma sessão

**Injeção:** dois imóveis diferentes no mesmo contexto.

**Comportamento esperado:** o motor exige seleção de imóvel âncora antes de executar; nunca mistura matrizes de imóveis distintos.

## 6. Família F5 — Decisão de Fronteira

### T5.1 — G-PRESCRICAO na fronteira exata

**Injeção:** exercicio_mais_antigo: 2021 com ano de referência 2026 (diferença = 5 anos exatos).

**Comportamento esperado:** ativa (cláusula >=). Rodar também com 2022 (diferença = 4) → não ativa. O ponto exato da fronteira deve estar documentado na regra, não no código.

**Critério de reprovação:** comportamento diferente do documentado na regra → falha de rastreabilidade (a Mesa deliberou a regra, o código deve refleti-la exatamente).

### T5.2 — G-OCUPANTE com ha_terceiro_ocupando: null

**Injeção:** perfil não sabe se há ocupante.

**Comportamento esperado:** gatilho não ativa (null ≠ true), mas o motor registra "informação de ocupação pendente" como verificação de completude — não ignora a lacuna.

### T5.3 — G-DIVIDA com dívida abaixo de limiar

**Injeção:** valor_total_debt: 50.00 (dívida irrisória).

**Comportamento esperado:** gatilho ativa (a regra atual não tem limiar — dívida é dívida, e a fase da cobrança pode ser execução). Se a Mesa quiser introduzir limiar, isso é deliberação nova, registrada como mudança de regra — não ajuste silencioso de código.

### T5.4 — Três gatilhos simultâneos + matriz cheia

**Injeção:** fixture Bulgarelli completo + adicionar condição que ativa G-ALVARA (alvarás múltiplos confirmados nos dois documentos reais — o que já ocorre).

**Comportamento esperado:** os 4 gatilhos ativam; o roteiro final tem 12+ verificações; nenhuma duplicata; ordenação topológica intacta; bloqueio comportamental ativo.

**Critério de reprovação:** verificação duplicada no roteiro → falha do deduplicador do Estágio 2.

## 7. Matriz-Resumo dos Testes

| ID | Família | Cenário | Entrada alterada | Saída esperada | Falha crítica se |
|---|---|---|---|---|---|
| T1.1 | F1 | Extração parcial | ha_divida_ativa removido | Exigir extrato completo; não assumir "sem dívida" | Roteiro limpo com dívida oculta |
| T1.2 | F1 | Sem evidências | evidencias: [] | Roteiro preliminar + aviso de suficiência | Roteiro final sem aviso |
| T1.3 | F1 | Sem proveniência | fonte: null | Rejeição da evidência | Aceitação silenciosa |
| T2.1 | F2 | CPF divergente | CPF BCI ≠ CPF extrato | Alerta de divergência; análise suspensa | Roteiro normal |
| T2.2 | F2 | Usucapião na matrícula | Ciclo 2 com averbação | Reordenação; bloqueio comportamental | Não reagir |
| T2.3 | F2 | Imóvel errado | Inscrição 290099 | Rejeição por incompatibilidade | Mistura de matrizes |
| T3.1 | F3 | Idempotência | 10 execuções | Saídas idênticas byte a byte | Qualquer variação |
| T3.2 | F3 | Ciclo iterativo | Evidências alternadas | Convergência (verificações monotônicas) | Alterância de roteiros |
| T3.3 | F3 | Dep. circular | dependencias mútuas | Falha explícita com mensagem | Loop infinito |
| T4.1 | F4 | CPF malformado | CPF inválido | Rejeição limpa | Exceção não tratada |
| T4.2 | F4 | Valor absurdo | valor_total_debt: 1e9 | Saneamento/rejeição | Uso de valor não-saneado |
| T4.3 | F4 | Autenticidade nula | autenticidade: null | Baixa confiança; não reduz roteiro | Usar para desativar verificação |
| T4.4 | F4 | Dois imóveis | Contexto duplo | Exigir âncora única | Mistura de imóveis |
| T5.1 | F5 | Fronteira prescrição | exercicio: 2021/2022 | Ativa/não ativa conforme regra | Divergência da regra deliberada |
| T5.2 | F5 | Ocupante null | ha_terceiro_ocupando: null | Não ativa; verificação de completude | Ignorar lacuna |
| T5.3 | F5 | Dívida irrisória | valor: 50 | Ativa (sem limiar) | Desativar sem deliberação |
| T5.4 | F5 | Gatilhos máximos | Fixture + G-ALVARA | 12+ verificações, sem duplicata | Duplicata ou ordem quebrada |

## 8. Critérios de Aceitação da Suíte

Para a suíte ser considerada aprovada pela Mesa, três condições devem ser satisfeitas simultaneamente: (1) todos os testes com falha crítica devem estar implementados e passando; (2) o fixture Bulgarelli original deve passar como teste de regressão (roteiro de 7 documentos em 3 blocos, com bloqueio comportamental ativo); (3) nenhum teste pode ser "ajustado" para passar — se um teste revelar que o algoritmo aceita algo indevido, a correção é no algoritmo, não no teste.

A suíte, quando implementada, entra no repositório como testes/fixture-bulgarelli/ após deliberação da Mesa — junto com o código do motor da ESPEC. Até lá, este documento é artefato em validação, assim como a ESPEC.

## 9. Registro de Governança

| Item | Registro |
|---|---|
| Objeto | Suíte de estresse do fixture Bulgarelli (limites do algoritmo) |
| Famílias | 5 (F1 vacância, F2 conflito, F3 ciclagem, F4 adversarial, F5 fronteira) |
| Testes | 16 cenários tabelados, cada um com entrada, saída esperada e critério de reprovação |
| Invariantes protegidos | Idempotência, monotonicidade de verificações, falha explícita, proveniência obrigatória |
| Regra de segurança | Evidência fraca nunca reduz o roteiro — só pode ampliá-lo |
| Status | ARTEFATO EM VALIDAÇÃO — aguarda deliberação da Mesa |
