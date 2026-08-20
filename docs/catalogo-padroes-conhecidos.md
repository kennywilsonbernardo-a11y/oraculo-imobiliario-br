# Catálogo de Padrões Conhecidos — Oráculo Imobiliário BR (v1)

**Autor:** Kenny Wilson (Presidente da Mesa), com curadoria técnica de Manus AI (Auditor)
**Origem das contribuições:** conversa com fonte externa (amigo, 20/08/2026), incorporadas sob deliberação da Mesa de 20/08/2026
**Data:** 20/08/2026
**Estado:** v1 — documento normativo de conhecimento documental

---

## 0. Natureza deste documento — ler antes de tudo

Este documento é um **catálogo educativo de padrões conhecidos do mercado imobiliário brasileiro**. Ele reúne conhecimento geral de mercado, jurisprudência e normativa pública, **sem proveniência de caso real**. Cada item aqui é "o que o mercado reconhece como padrão de risco" — não é um caso que o Oráculo auditou.

> **Regra de leitura (deliberação da Mesa, 20/08/2026):** este catálogo alimenta a camada educativa do Oráculo (o Raio-X Documental ensinando o usuário final). Ele NÃO é a Biblioteca de Casos do Manifesto v3. A Biblioteca de Casos nasce exclusivamente de casos reais com proveniência, autorização de estudo e regime duplo (repositório privado + registro público anonimizado). Nenhum item deste catálogo pode ser apresentado como "caso do Oráculo".

A deliberação que deu origem a este documento partiu de uma pergunta feita por Kenny a uma fonte externa: *"é possível pre-determinar a cadeia de casos imobiliários existentes no Brasil, para criar uma biblioteca de casos?"*. A fonte respondeu com três contribuições (matriz em quatro eixos, primitivas de risco com herança normativa e proposta técnica com APIs e fluxo de entrada). A Mesa incorporou os seis pontos tecnicamente válidos (Seções 4 a 9), rejeitou os três erros estruturais (Seção 10) e fixou o que este catálogo NÃO pode virar (Seção 11).

## 1. A estrutura-base: a matriz em quatro eixos

Todo caso de due diligence imobiliária no Brasil pode ser classificado pelo cruzamento de quatro eixos. Esta classificação serve para **ensinar o usuário a identificar a natureza do próprio caso** e para organizar o material educativo — não para gerar casos.

| Eixo | Categorias | O que muda no risco |
|---|---|---|
| **Perfil do Transmitente (quem vende)** | Pessoa física solteira/casada; pessoa jurídica; espólio; menor ou incapaz; procurador | Regime de bens, outorga conjugal, alvará judicial, poderes da procuração, fraude à execução de PJ |
| **Natureza do Bem (o imóvel)** | Urbano pronto; condomínio; na planta/em construção; rural; de marinha | IPTU/taxa de lixo; quitação condominial; incorporação e saúde da construtora; CCIR/ITR/CAR/reserva legal; laudêmio/CAT/foro |
| **Situação da Matrícula (o ônus)** | Livre; alienado/financiado; com penhora ou arresto; com usufruto vitalício; com promessa de compra e venda não cumprida | Interveniente anuente; risco de leilão judicial; renúncia/extinção de usufruto; direito real de aquisição de terceiros |
| **Cadeia Sucessória (como chegou)** | Leilão; doação; usucapião (judicial ou extrajudicial); compra e venda | Ações anulatórias do leilão; adiantamento de legítima e cláusulas de inalienabilidade; confrontantes na usucapião |

O método educativo decorrente desta matriz é o mesmo do coração do Oráculo: o sistema cruza as seleções e gera o **checklist de documentos obrigatórios** e a **matriz de risco específica da combinação** (por exemplo: PJ + imóvel rural = certidões ambientais + CNDs federais + CCIR). Este é o padrão de travamento pedagógico: quem não tem o documento que decide, recebe a lista do que pedir.

## 2. Os três pilares decisórios (primitivas de risco)

Para além da matriz combinatória — que é estática — o catálogo registra três eixos dinâmicos de modelagem, úteis para explicar ao usuário final como o risco se compõe:

1. **O Transmitente.** Entidades atômicas isoladas: pessoa física casada sob comunhão parcial, pessoa jurídica em recuperação judicial, espólio com herdeiro menor. Cada entidade tem documentos e autorizações próprios.
2. **O Objeto.** Vetores de restrição física e territorial: terreno de marinha em área urbana, imóvel rural com CAR suspenso, fração ideal não localizada.
3. **A Cadeia Sucessória.** Linhas do tempo de contaminação retroativa: aquisição via leilão extrajudicial há menos de 2 anos, doação com cláusula de reversão.

## 3. Os três "gaps" que as IAs genéricas não enxergam

Três anomalias sistêmicas do ecossistema brasileiro que o material educativo do Oráculo deve destacar, pois são exatamente onde a consulta superficial falha:

**O Fator Provimento Local.** O CNJ dita regras gerais (a Resolução 571/2024 para inventários, por exemplo), mas a Corregedoria de Justiça de cada estado emite provimentos locais que alteram a validade de certidões e prazos de escrituração. No material de Alagoas, o provimento da Corregedoria-GEJUS de Alagoas funciona como camada de override estadual. Este catálogo registra os provimentos aplicáveis à camada documental de fontes — nunca como regra silenciosa do motor.

**O Limiar da Fraude à Execução.** A certidão positiva do vendedor não trava a venda por si só. O que define o risco é a **solvência do vendedor**: um processo de R$ 50 mil contra um vendedor com patrimônio remanescente de R$ 2 milhões é classificável como risco baixo com ressalva; o mesmo processo contra um vendedor sem patrimônio é impeditivo. O princípio jurídico subjacente é o da fraude à execução (art. 792 do CPC) — e a lição educativa é que certidão negativa não significa vendedor solvente.

**A Contaminação da Cadeia (concentração na matrícula).** A Lei 13.097/2015 protege o terceiro de boa-fé se o ônus não constar da matrícula. O STJ, porém, flexibiliza essa proteção quando provado que o comprador tinha meios de saber da insolvência — a chamada due diligence negligenciada. A lição educativa: o Oráculo pontua o "nível de exposição" do comprador com base no perfil do vendedor anterior; a proteção legal não substitui a investigação documental.

## 4. Determinismo do motor — regra de engenharia

**LLM (IA generativa) apenas para ler e extrair:** reconhecer textos de certidões em PDF e estruturá-los em JSON (função OCR/extrator). **Engenharia de regras determinística para decidir:** o cruzamento de riscos roda em motor lógico puro, sem probabilismo, garantindo auditoria jurídica e impedindo alucinação. A IA não decide se um imóvel é seguro; ela aplica as regras que o método validou. Esta regra é um insumo de especificação para a Fase 2B — não é código, e não toca a Suíte de 17 testes nem a ESPEC do Algoritmo das 3 Camadas de Gatilhos de Exceção.

## 5. Herança normativa: Nacional → Estadual → Municipal → Cartorário

As regras de due diligence herdam escopo hierarquicamente. A lei federal (CC, CPC, Lei 13.097/2015, Lei de Registros Públicos) define o chão; o provimento estadual (Corregedoria de Alagoas) altera validade e prazos; o município define a camada fiscal e o cadastro; o cartório define a prática registral local. O padrão do Oráculo (`config.json` com `fontes.AL` hierarquizada, pilotado em 102 municípios de Alagoas sob AL-IBGE-001) já implementa essa herança para a camada de fontes — e este catálogo a registra como princípio documental geral.

## 6. APIs públicas e credenciamentos

O catálogo registra as vias oficiais de consulta automática, sempre com a ressalva de verificação prévia (fonte ≠ evidência):

| Fonte | O que fornece | Condição real de acesso |
|---|---|---|
| DataJud (CNJ) | Metadados processuais de mais de 90 tribunais | Token de acesso; exigências de uso da API Pública |
| ConectaGov / Serpro (PGFN) | Emissão e validação em tempo real de CND Federal e Dívida Ativa | Credenciamento (CNPJ, contrato) — não é "gratuito e aberto" |
| APIs municipais de IPTU/certidões | Situação fiscal municipal do imóvel | Portais de dados abertos variam por município (capitais e grandes cidades têm Swagger/REST) |
| ONR (Operador Nacional do Registro) | Certidões e registros imobiliários digitalizados | Em implantação progressiva — Doc1-ONR já estabelece o regime de integração |

O modelo recomendado é **híbrido**: APIs oficiais para validações de barreira (CNDs federais, consultas históricas) e integrações pagas de busca complexa (múltiplos CPFs/CNPJs retroativos) somente quando o caso exigir — e cada integração nasce como deliberação própria de integração, com verificação independente de disponibilidade antes de qualquer promessa comercial.

## 7. Fluxo de entrada mista (o coração pedagógico da entrada)

O fluxo educativo do Oráculo, aplicável a qualquer caso, tem três estágios:

1. **Entrada semi-automática (o usuário fornece):** três dados mestres de barreira — CPF/CNPJ do vendedor, inscrição municipal (IPTU) e número único da matrícula.
2. **Leitura automática (o Oráculo extrai):** upload de PDFs (certidão de matrícula, CNDs emitidas) com extração de texto e localização de termos restritivos (penhora, arresto, alienação).
3. **Enriquecimento automático (o Oráculo cruza):** chamada às fontes oficiais em segundo plano para verificar riscos não constantes dos papéis enviados.

Este fluxo preserva a arquitetura client-side do MVP (decisão de governança da Fase 1) e é a base sobre a qual qualquer futura integração de API será deliberada.

## 8. A estrutura do relatório (o produto visível do Raio-X)

O parecer do Oráculo se organiza em três partes hierárquicas, alinhadas ao VIS-001 (fonte → proveniência → evidência → suficiência → verificação → resultado):

**I. Painel Executivo (score de risco).** Termômetro geral em cores — verde (transação segura), amarelo (atenção/ressalvas), vermelho (alto risco/impeditivos) — e os fatores críticos em uma frase ("Identificada execução fiscal ativa contra a empresa vendedora, valor R$ 350.000,00").

**II. Matriz de análise.** Tabela consolidada do motor: cada nível analisado com status de risco e despacho técnico automatizado (exemplo: "Propriedade (matrícula) — verde — matrícula atualizada sem ônus reais vigentes"; "Regularidade fiscal — vermelho — IPTU atrasado e CND Federal com efeito positivo").

**III. Checklist de segurança e próximos passos.** Documentos validados com sucesso e instruções jurídicas claras de mitigação (exemplo: "exigir retenção do saldo devedor do IPTU no ato da assinatura da escritura pública"). Esta terceira parte é o coração pedagógico: é ela que ensina o usuário a se defender.

## 9. Registro de atribuição

As Seções 1 a 3 (matriz de quatro eixos, três pilares, três gaps) e as Seções 6 a 8 (APIs, fluxo de entrada, estrutura de relatório) incorporam contribuições de fonte externa (conversa de 20/08/2026). A Seção 4 (determinismo) e a Seção 5 (herança) coincidem com a especificação interna da Fase 2 do Oráculo (ESPEC do Algoritmo das 3 Camadas, 17/08/2026) e a arquitetura do `config.json` (16/08/2026). Este catálogo foi curado pelo Auditor Independente (Manus) e aprovado pela Mesa (Kenny) em 20/08/2026, dentro da gaveta 1 da decisão de arquitetura em duas camadas.

## 10. Os três erros da fonte externa — registrados para memória institucional

Para que este catálogo sirva de referência futura, registram-se também os erros da fonte que a Mesa rejeitou:

1. **Motor errado.** A fonte propôs injetar as regras no `analisador-8-itens.js` (camada legada do Módulo 1). O motor real da Fase 2 (Algoritmo das 3 Camadas de Gatilhos de Exceção) ainda não está implementado e será construído contra a Suíte de 17 testes como critério de aceite. Nenhuma injetiva no analisador legado.
2. **Caso sem proveniência.** A fonte modelou "casos pré-determinados" (`BR-AL-RURAL-PJ-001`) sem fonte, elo ou autorização. Tais modelos são casos teóricos — entram aqui como conhecimento documental, mas nunca na Biblioteca de Casos do Manifesto v3.
3. **APIs "gratuitas" sem prova.** DataJud exige token; Serpro/PGFN exige credenciamento. O catálogo (Seção 6) registra as condições reais de acesso.

## 11. O que este catálogo NÃO pode virar

Este documento não substitui a Biblioteca de Casos; não gera fixtures de teste; não alimenta o motor da Fase 2B (que será alimentado pelos casos reais do Manifesto v3, na Etapa 5 do protocolo); não contém dados de terceiros; não altera VIS-001, ADR-002, AL-IBGE-001 nem AL-FASE2-001. Ele é o material educativo que responde à pergunta do usuário final — "quais são os casos que existem no Brasil e o que pedir em cada um" — enquanto a Biblioteca de Casos responde à pergunta do método — "o que a experiência real nos ensinou".

---

*Catálogo v1 emitido conforme deliberação da Mesa de 20/08/2026 (gaveta 1: `docs/catalogo-padroes-conhecidos.md`). Contribuições externas incorporadas com atribuição (Seção 9) e erros registrados (Seção 10). Não constitui parecer jurídico, oferta ou anúncio de venda.*
