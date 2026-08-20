# Documento 3 — Termos de Consentimento e Finalidade Exigidos pela LGPD (para a Especificação da Frente 3)
Plano Paralelo de Refinamento Comercial — Documento 3 de 3 (16/08/2026)
De: Manus — verificador independente de evidências e governança documental
Para: Mesa de Governança — Kenny Wilson, ChatGPT, Gemini
Classificação: 🔵 Refinamento — especificação jurídica-comercial; sem alteração de VIS-001, ADR-002, PVB-001, código ou repositório
Status: ARTEFATO DE CONHECIMENTO EM VALIDAÇÃO — minuta pronta para revisão de advogado antes de publicação. Aprovação por advogado é condição de publicação (o Oráculo não publica política de privacidade sem revisão jurídica humana).

## 1. A base legal: o que a LGPD exige de cada termo
A Lei 13.709/2018 estabelece requisitos específicos que se aplicam diretamente ao Oráculo. O artigo 9º exige que o tratamento de dados observe informações claras e adequadas sobre a finalidade, a forma, a duração e a identificação do controlador 1. O artigo 10º exige que o consentimento seja específico, destacado e para finalidades determinadas — vedado o consentimento genérico 2. O artigo 18 garante ao titular os direitos de acesso, correção, eliminação, portabilidade, revogação do consentimento e oposição ao tratamento 3. E o artigo 7º lista as bases legais — o consentimento é apenas uma delas: obrigação legal, execução de contrato, legítimo interesse e proteção do crédito são bases que o Oráculo usará para não depender exclusivamente de consentimento 4.

A consequência prática para a especificação da Frente 3: o WhatsApp do Oráculo terá dois blocos de tratamento com bases legais diferentes — o tratamento dos dados do imóvel (públicos, base legal: execução de contrato + legítimo interesse) e o tratamento dos dados pessoais do usuário (nome, WhatsApp, CPF quando necessário, base legal: execução de contrato + consentimento para finalidades opcionais como a BCR). Separar os dois blocos desde o primeiro mensaje do WhatsApp é a diferença entre conformidade estrutural e remendo posterior.

## 2. O texto do primeiro mensaje do WhatsApp (obrigatório, na abertura de toda conversa)
ORÁCULO IMOBILIÁRIO BR — Identificação e Transparência
Olá! Você está falando com o Oráculo, sistema de auditoria documental imobiliária operado por [razão social], CNPJ [•].
O que somos: ferramenta de verificação documental e apoio à decisão. Não substituímos advogado, cartório nem órgãos públicos.
O que faremos com seus dados: seu nome e contato (WhatsApp) serão usados exclusivamente para conduzir sua auditoria e responder suas dúvidas. Dados do imóvel consultado serão tratados para produzir seu Raio-X Documental.
Finalidades do tratamento: (i) executar a auditoria solicitada; (ii) emitir o relatório em PDF; (iii) [se optante] manter histórico dos seus casos.
Duração: seus dados são mantidos pelo período de [•] meses após o último uso; depois são eliminados.
Seus direitos:a qualquer momento você pode pedir acesso, correção, exclusão dos seus dados ou revogar o consentimento — basta responder "meus dados".Para continuar, responda:ACEITO (concorda com esta política) ou NÃO CONCORDO (encerramos a conversa sem armazenar nada).

Este mensaje cumpre, em formato conversacional, os requisitos do art. 9º (identificação, finalidade, forma, duração) e do art. 10º (consentimento específico e destacado para finalidades determinadas). A resposta do usuário fica registrada com timestamp — é a prova do consentimento.

## 3. O Registro de Operações de Tratamento (o documento interno que a ANPD pode pedir)
Além do mensaje externo, a LGPD exige que o controlador mantenha registro das operações de tratamento de dados pessoais (art. 37 e regulamentos da ANPD) 5. O Oráculo já produz esse registro por natureza arquitetural — cada verificação declara fonte, propósito e responsável — mas o registro LGPD exige campos específicos:

| Campo do registro | Conteúdo no Oráculo |
|---|---|
| Finalidade do tratamento | Executar a auditoria documental solicitada pelo usuário (contrato) |
| Categorias de titulares | Usuários (corretores, compradores, proprietários) |
| Categorias de dados | Dados de contato (nome, WhatsApp), dados do imóvel (endereço, matrícula), dados de terceiros mencionados em documentos (nomes de proprietários, vendedores — dados públicos de fonte oficial) |
| Compartilhamento | [•] (nenhum, inicialmente; se houver parceiro, declarar) |
| Duração da retenção | [•] meses após último uso; eliminação programada |
| Medidas de segurança | Criptografia em repouso e trânsito, acesso restrito por função, logs de auditoria de acesso |
| DPO / encarregado | [nome do encarregado] — canal: [e-mail] |
| Titular dos direitos | Endpoint "meus dados" no WhatsApp + e-mail do encarregado |
## 4. Os três consentimentos distintos que o Oráculo gerencia
O erro mais comum de produto é tratar consentimento como um clique único. O Oráculo gerencia três consentimentos separados, cada um com finalidade própria e revogável independentemente:

| Consentimento | Finalidade | Momento | Revogação |
|---|---|---|---|
| C1 — Execução do serviço | Conduzir a auditoria solicitada e entregar o Raio-X | Primeiro mensaje (ACEITO) | Encerra a conversa; dados da sessão eliminados |
| C2 — Histórico e monitoramento | Manter histórico de casos e enviar acompanhamento de pendências | Oferta explícita após a 1ª auditoria ("quer manter o histórico?") | Resposta "remover histórico" |
| C3 — BCR (caso anonimizado) | Usar o caso anonimizado na Base de Casos Reais (aprendizado coletivo) | Oferta explícita ao final de cada auditoria ("posso usar seu caso, anonimizado, para melhorar o sistema?") | Resposta "retirar meu caso" — remove da BCR |
O C3 é o mais sensível e o mais valioso: é ele que alimenta a BCR do VIS-001 §6 e torna o Oráculo mais inteligente a cada caso. A regra é clara: sem o C3 explícito, o caso não entra na BCR — mesmo anonimizado. Anonimização verdadeira (irreversível) dispensa consentimento tecnicamente, mas o Oráculo adota a postura mais protetiva: pede o C3 sempre, porque a confiança do mercado alagoano é o ativo que nenhuma otimização técnica recupera.

## 5. Os disclaims que acompanham todo PDF e toda conversa paga
Dois disclaims são condição de publicação, herdados do VIS-001 §8 e da trava T3 (argumento comercial = tempo + padrão + diligência, nunca garantia):

Disclaimer de identidade: O Oráculo Imobiliário BR é um sistema de verificação documental e apoio à decisão. Os resultados desta auditoria refletem as evidências consultadas na data da emissão e não constituem parecer jurídico, laudo técnico, garantia de regularidade ou aconselhamento jurídico. Para decisões que exijam juízo jurídico, consulte advogado habilitado.

Disclaimer de temporalidade: As fontes consultadas (cartórios, prefeituras, órgãos estaduais e federais) podem atualizar seus registros após a data desta consulta. A validade deste Raio-X refere-se à data e hora da emissão, registradas no cabeçalho e no hash SHA-256 deste documento.

## 6. Trancas e condições de publicação
Este documento não altera VIS-001, ADR-002, PVB-001, código ou repositório. Três condições de publicação: (a) os campos [•] (razão social, CNPJ, duração de retenção, DPO) devem ser preenchidos com os dados reais da operação — a minuta não publica com placeholder; (b) a revisão de advogado é obrigatória antes da publicação de qualquer política de privacidade — a LGPD tem sanções de até 2% do faturamento, com teto de R$ 50 milhões por infração, e o custo de uma revisão preventiva é ordens de magnitude menor; (c) o canal "meus dados" (exercício de direitos do art. 18) precisa existir operacionalmente antes do primeiro ACEITO — não se coleta consentimento sem ter o mecanismo de revogação funcionando.

## 7. Síntese para o Rito de Convergência
DECISÃO CONVERGIDA
Decisão: APROVAR a estrutura de consentimento em três blocos (C1 execução / C2 histórico / C3 BCR), o mensaje de abertura LGPD-compliant e o registro de operações de tratamento, como especificação para a Frente 3 — condicionada à revisão jurídica e ao preenchimento dos campos [•].
Pendências bloqueadoras: revisão de advogado (condição de publicação); preenchimento dos dados reais da operação.
Próximo passo único: submeter esta minuta, junto com os Documentos 1 e 2, à deliberação da Mesa; após aprovação, encaminhar à revisão jurídica.

References
