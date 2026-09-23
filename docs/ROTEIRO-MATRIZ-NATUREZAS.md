# Roteiro — Matriz de Naturezas do Título (KW Oráculo Imobiliário BR)

**Trilha:** A (self-service). Não se mistura com a E1.
**Início:** 23/09/2026
**Objetivo:** qualquer cidadão descobre a **natureza documental** do imóvel dele e recebe o **caminho**: onde ir, quanto custa, que riscos corre e quando chamar um advogado.

**Regra de ouro:** nenhum campo é preenchido sem fonte primária. O que não tiver fonte fica **PENDENTE**.

---

## Etapa 1: Esqueleto ✅ (23/09)

Arquivo `biblioteca/matrizes/matriz_naturezas_titulo.json`, montado **só com o que já existia na base**:

- os 9 níveis do MAPA-COMPLETO-8-NIVEIS (N0 a N6);
- a ligação de cada nível com os 23 casos especiais que já têm fonte;
- os órgãos que já constam nas matrizes (INCRA, SPU e Receita);
- 3 lacunas abertas para decisão: direito de laje, adjudicação extrajudicial e tributação por natureza.

## Etapa 2: Conferir os artigos do mapa

Conferir no Planalto cada artigo citado no mapa: CC 1.238, 1.242, 1.245 e 1.793. Depois preencher "o que significa" e "passo a passo" para cada nível, **um nível por sessão**.

**Ordem sugerida:** N0 (posse), N1 (gaveta), N2 (escritura sem registro), N2.5 (herança) e depois os demais. Os primeiros níveis são os mais comuns em Alagoas.

## Etapa 3: Custos por natureza

Com fonte para cada item:

- ITBI: se incide ou não conforme a natureza, e a alíquota por município;
- IPTU do possuidor;
- emolumentos, ligando à `matriz_emolumentos_al.json`;
- laudêmio.

**Começar por Maceió e pelos municípios da Rota dos Milagres.**

## Etapa 4: Decisões de Kenny sobre as lacunas

- **Direito de laje:** vira natureza própria ou caso especial?
- **REURB-E:** confirmar a fonte.
- **Conflito do georreferenciamento:** registrado na AUD-2026-09-23.

## Etapa 5: Triagem cidadã

Criar de 5 a 7 perguntas simples que levam ao nível. Exemplos:

- "Você tem escritura?"
- "Ela está registrada na matrícula?"
- "O nome do vendedor é o mesmo da matrícula?"

Escrever tudo em linguagem de balcão, sem juridiquês.

## Etapa 6: Teste com casos reais

Rodar a triagem nos casos da biblioteca. O Vale Verde, por exemplo, deve cair em **N4 (ônus/CNIB) com divergência entre o titular e o vendedor**.

⚠️ Pelo Manifesto (Etapa 1 do protocolo), cada caso só vira teste com **autorização de uso para estudo**.

## Etapa 7: Publicar no site

Criar a ferramenta "Qual é a natureza do seu imóvel?" no kennycorretorimoveis.com.br/oraculo, com o aviso PEI.

---

*Material educacional PEI. Não é PTAM/CNAI nem laudo jurídico. Não substitui certidão oficial. Valide com advogado.*
