# Documento 2 — Estrutura do Piloto em Alagoas: Rede de Relacionamentos + Fontes Abertas (Camadas 1 e 2)
Plano Paralelo de Refinamento Comercial — Documento 2 de 3 (16/08/2026)
De: Manus — verificador independente de evidências e governança documental
Para: Mesa de Governança — Kenny Wilson, ChatGPT, Gemini
Classificação: 🔵 Refinamento — plano de execução do piloto; sem alteração de VIS-001, ADR-002, PVB-001, código ou repositório
Status: ARTEFATO DE CONHECIMENTO EM VALIDAÇÃO — estrutura organizacional do piloto, não especificação técnica executável.
Histórico de revisão: REV1 (16/08) aplicou a delimitação sem consumo de dados, a correção do órgão ambiental e a seção de referências rechecáveis. REV2 (16/08) aplica as seis correções identificadas pelo ChatGPT e validadas em consenso pelo Manus (documento de confronto anexo): re-enquadramento da âncora institucional (ponto 1), separação funcional dos grupos (ponto 2), reenquadramento de DIMOB/GCAP (ponto 3), ITCMD condicional (ponto 4), competência hídrica na outorga (ponto 5) e separação entre alvará municipal e declaração condominial (ponto 6).

## 1. O princípio: a âncora institucional do piloto
O piloto de Alagoas tem uma vantagem que nenhum piloto de SaaS tem: ele se apoia em uma âncora de domínio e relacionamento já existente. O fundador acumula delegação no CRECI, passagem pela superintendência do IBAMA, direção de obras e nome reconhecido entre os corretores do estado — uma combinação que resolve, de uma vez, os três problemas que matam piloto de software imobiliário: distribuição (a rede abre as portas), credibilidade (o nome blinda o disclaim) e autoridade de domínio (o conhecimento de dentro do Estado qualifica a matriz). O piloto, portanto, não é "um teste de mercado" — é a demonstração do modelo em casa, exatamente como o Kenny formulou: provar a capacidade local antes de ambicionar a escala. A âncora é pessoal, mas o ativo que ela sustenta é institucional: o Oráculo opera como produto, não como extensão do fundador.

## 2. A composição do piloto: 20 assentos, duas funções
O protocolo de 20 fundadores (Frente 5) ganha a estrutura de composição validada no desfecho de entendimento (trava T5: corretores experientes + advogados de due diligence) e a âncora institucional do Kenny. Os 20 assentos permanecem em três grupos de recrutamento, mas agora com funções claramente separadas: de um lado, os usuários do piloto, que executam auditorias reais; de outro, os interlocutores institucionais, que não executam auditorias — facilitam o acesso a fontes e fornecem o ambiente institucional do teste.

| Grupo | Assentos | Função | Papel no piloto |
|---|---|---|---|
| G1 — Corretores experientes | 10 | Usuários do piloto | Usar o Oráculo em operações reais; alimentar a comparação "o que o corretor sabe × o que o Oráculo acha"; indicar colegas |
| G2 — Advogados de due diligence | 5 | Usuários do piloto | Validar o rigor da matriz contra o padrão advocatício; apontar o que falta para o Raio-X ser útil num parecer |
| G3 — Institucionais | 5 | Interlocutores institucionais | Um cartório de registro, um representante da SEFAZ-AL, um gestor municipal de tributos, dois corretores de imóveis rurais (fronteira poço/outorga). Não executam auditorias: abrem as portas das fontes (camada 2 institucional) e validam o caso ambiental (GAP-Epistemológico) |
O recrutamento dos G1 e G2 sai da rede direta do Kenny (CRECI-AL, imobiliárias parceiras, fórum). O G3 é o grupo estratégico: é ele que transforma fonte pública em fonte de relacionamento — o cartório que conhece o piloto trata o Oráculo como parceiro, não como scraping; o gestor de tributos indica os portais municipais reais de ITBI. A distinção funcional protege a qualidade dos dados: os entregáveis quantitativos do piloto (auditorias, gate, funil) vêm exclusivamente dos usuários G1/G2; as contribuições do G3 são qualitativas e ambientais, e entram na BCR como registro de contexto, não como medição.

## 3. As fontes abertas que sustentam o piloto (camadas 1 e 2)
O piloto opera, inicialmente, sem nenhuma API formal — só com o que a LAI e o acesso público garantem. O mapa de fontes por verificação da Matriz Nível 1:

| Verificação | Fonte pública (camada 1–2) | Método de acesso |
|---|---|---|
| MF/FMP dos 102 municípios | Base catalogada alagoas.json + portais municipais | Consulta pública / telefone oficial |
| Matrícula e ônus | RI Digital (consulta avulsa por créditos) e cartórios sem portal (presencial/declarada) | Créditos pontuais + modo Declarado |
| ITBI e cadastro imobiliário | Portais das prefeituras (Maceió, Arapiraca têm portal) | Consulta pública por browser |
| IPTU e BCI | Portais municipais de tributos | Consulta pública por browser |
| ITCMD — condicional | SEFAZ-AL / Alagoas Digital | Consulta pública no portal estadual; pertinente apenas em transmissão causa mortis e doação (ver seção 3.1) |
| CNDs federais (vendedor) | gov.br / Receita Federal | Consulta pública gratuita |
| CNDs municipais/estaduais | Portais das prefeituras e SEFAZ-AL | Consulta pública por browser |
| Outorga de água / restrições ambientais | Fonte definida pela competência hídrica (ver seção 3.2) | Consulta pública — terreno do ex-IBAMA |
| Declaração condominial de quitação | Síndico / administradora | Modo Declarado (ver seção 3.3) |
| Alvará de funcionamento — com gatilho | Portais municipais | Consulta pública; pertinente apenas em imóveis de uso comercial (ver seção 3.3) |
A regra operativa do piloto: consulta direta na fonte sempre que existir; documento anexado pelo usuário (modo Declarado) apenas quando a fonte não disponibiliza consulta. Cada consulta registra data, fonte e proveniência no Raio-X — é isso que transforma o piloto em lastro, e não em opinião. As fontes públicas citadas foram verificadas em 16/08/2026 e constam na seção de Referências deste documento.

O piloto opera exclusivamente sobre mapeamento institucional e consulta pública das camadas 1 e 2 — sem consumo de dados em escala, em coerência com a delimitação da Fase F0 do Documento 1.

## 3.1. ITCMD: verificação condicional
O ITCMD é pertinente apenas em transmissão causa mortis e doação — não integra a Matriz Base de compra e venda de apartamento ou casa residencial. No piloto, ele entra como verificação com gatilho: o gatilho é a natureza da operação (inventário, partilha ou doação), e a execução acontece pela consulta pública na SEFAZ-AL / Alagoas Digital, com registro de proveniência. O acréscimo fiscal trazido na conversa de 16/08 permanece como conhecimento incorporado ao repertório do Oráculo — mas condicionado ao gatilho, coerente com o nível de complexidade (inventário é caso próprio, fora do Nível 1 puro).

## 3.2. Outorga de água: fonte definida pela competência hídrica
A competência de outorga no Brasil é dividida: corpos hídricos de domínio federal → ANA; corpos de domínio estadual → órgão estadual. Em Alagoas, o órgão competente é a SEMARH (Superintendência do Meio Ambiente e Recursos Hídricos), com o serviço de solicitação de outorga operando via Alagoas Digital (serviço nº 61). A fonte correta de cada consulta é definida pela competência hídrica do imóvel — e a fonte efetivamente consultada fica registrada na proveniência do Raio-X, para que a leitura não encontre consulta feita no órgão errado.

## 3.3. DIMOB/GCAP e declarações: modo de evidência correto
Duas verificações da tabela original foram reenquadradas por não serem consultas públicas avulsas. DIMOB é obrigação declaratória da incorporadora junto à Receita Federal — o corretor não a "consulta"; o piloto a trata como verificação com gatilho (operações envolvendo incorporadora), com evidência tipicamente modo Declarado (documento apresentado pelo vendedor/incorporadora) ou certidão que a comprove. GCAP é declaração do vendedor sobre o ganho de capital — mesmo tratamento: gatilho de venda por pessoa física, evidência tipicamente Declarada. O mesmo princípio separa a tabela na linha das declarações privadas: a declaração condominial de quitação (síndico/administradora — comum a apartamentos) vive no modo Declarado e pertence à Matriz Nível 1; o alvará de funcionamento (prefeitura — uso comercial) é consulta pública com gatilho. Duas verificações, duas fontes, dois gatilhos, dois modos de evidência.

## 4. O roteiro de execução em quatro ciclos
O piloto roda em ciclos de 30 dias, cada um com um objetivo distinto, começando após a aprovação do Documento-Mestre (Atos 1–2). As auditorias quantitativas são executadas exclusivamente pelos usuários G1/G2; o G3 atua como facilitador institucional e contexto.

Ciclo 1 — Calibragem da matriz (dias 1–30). Os usuários G1/G2 recebem acesso à triagem gratuita e à matriz Nível 1 (apartamento + casa). Cada um audita um imóvel real e devolve o formulário de 3 perguntas da Frente 5. Saída: a matriz ganha as correções do mercado alagoano (exclusões identificadas pelo Kenny, acréscimos condicionais como ITCMD) e as divergências "corretor × Oráculo" entram na BCR com fonte.

Ciclo 2 — Gate das 20 auditorias (dias 31–60). Os fundadores G1/G2 executam auditorias completas até atingir 20 auditorias com qualidade repetível — o gate da trava T4. Cada auditoria gera: Raio-X com statuses, PDF com hash SHA-256, e registro BCR anonimizado. A saída do ciclo é a resposta formal à pergunta-gate: "o Oráculo executa 20 auditorias de apartamento/casa com qualidade repetível?" Se sim, o canal WhatsApp entra em construção (Frente 3).

Ciclo 3 — Teste do funil (dias 61–90). Com a matriz calibrada e o gate atingido, o piloto testa os três degraus: conversão gratuito → avulso (com os créditos reais do RI Digital, custo controlado), avulso → indicação, e as primeiras conversas de preço com os fundadores (o teste de disposição a pagar da Frente 5). Saída: dados reais de funil e o preço-âncora definitivo para a abertura comercial.

Ciclo 4 — Consolidação e deliberação (dias 91–120). A Mesa analisa os quatro entregáveis: matriz calibrada, gate atingido, funil medido, preço testado. Delibera: abrir a camada gratuita pública em Alagoas, estender o piloto, ou recalibrar. É também neste ciclo que o cronograma ONR (Documento 1) chega à Fase F4 — piloto controlado da API com os dados do piloto.

## 5. Trancas de governança
O piloto respeita quatro trancas. Primeiro, congelamento: nenhuma frente altera VIS-001, ADR-002, PVB-001, código ou repositório; o piloto opera sobre os documentos congelados e os artefatos em validação. Segundo, a distinção nominal: os resultados do piloto medem a maturidade da camada fiscal e da matriz documental separadamente — nunca "cobertura" isolada. Terceiro, anonimização: todos os casos do piloto entram na BCR anonimizados, com consentimento registrado conforme o Documento 3 (LGPD). Quarto, gatilho preservado: o piloto não antecipa a abertura comercial pública — a abertura pública continua exigindo os 70% de validação da base, o PEI com PDF e a deliberação da Mesa.

## 6. Síntese para o Rito de Convergência
DECISÃO CONVERGIDA
Decisão: APROVAR a estrutura do piloto em Alagoas: 20 assentos em três grupos com funções separadas (G1/G2 usuários do piloto / G3 interlocutores institucionais), fontes abertas das camadas 1 e 2 como método inicial, ITCMD e alvará como verificações condicionais, DIMOB/GCAP e quitação condominial no modo Declarado, outorga regida pela competência hídrica, e quatro ciclos de 30 dias (calibragem → gate das 20 auditorias → funil → consolidação).
Pendências bloqueadoras: nenhuma — o piloto começa após os Atos 1–2; o Ciclo 2 é o gate que destrava o canal (trava T4).
Próximo passo único: após a aprovação do Documento-Mestre, o Kenny inicia o recrutamento dos 20 assentos pela rede CRECI-AL e parceiros institucionais.

## 7. Referências (fontes rechecáveis — verificadas em 16/08/2026)
| Fonte | URL | O que comprova |
|---|---|---|
| RI Digital — plataforma oficial do ONR | https://www.ridigital.org.br/ | Consulta avulsa de certidões por créditos pré-pagos, com validade jurídica de 30 dias |
| ONR — Operador Nacional | https://app.onr.org.br/ | Portal de acesso institucional e credenciamento de empresas |
| SEFAZ-AL — ITCD | https://www.sefaz.al.gov.br/itcd | Consulta e declaração do imposto estadual sobre transmissão causa mortis e doação |
| Alagoas Digital — Inventário Administrativo (ITCD) | https://alagoasdigital.al.gov.br/servico/1705 | Serviço estadual para apuração do ITCD |
| Alagoas Digital — Doação (ITCD) | https://alagoasdigital.al.gov.br/servico/1704 | Declaração do ITCD sobre doações |
| Alagoas Digital — Outorga de direito de uso da água | https://alagoasdigital.al.gov.br/servico/61 | Solicitação de outorga ou isenção no estado de Alagoas |
| SEMARH Alagoas | https://www.semarh.al.gov.br/ | Órgão ambiental estadual — restrições e licenciamentos |
| Certidões federais (CNDs) | https://solucoes.receita.fazenda.gov.br/ | Consultas públicas gratuitas às certidões da Receita Federal |

Manus — verificador de evidência. O piloto é a demonstração do modelo em casa: se o Oráculo audita com lastro em Alagoas, o playbook está pronto para ser repetido em qualquer praça. As fontes acima foram consultadas e confirmadas em 16/08/2026. As seis correções desta revisão foram propostas pelo ChatGPT e validadas em consenso pelo Manus (confronto de 16/08/2026).
