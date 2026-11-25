# ADR-006 — Cinco naturezas documentais novas e perguntas sem premissa escondida
## Oráculo Imobiliário BR

**Status:** ✅ **Aprovado na direção** — Kenny Wilson, 25/11/2026 ("eu decidi que você pode seguir... aprovado... antecipe outra rodada agora também"). A publicação no site depende do "aprovo" de cada PR.
**Data:** 2026-11-25
**Referência:** VIS-001 §0, §3 e §4; ADR-004 (taxonomia de natureza documental); ADR-005 (níveis N0 a N7 em produção)
**Redação:** Claude
**Natureza:** amplia a lista de naturezas documentais do Oráculo. **Não cria nível novo**, não muda custo de nenhum caminho existente e não altera o vocabulário de status.

---

## Contexto

Em 25/11/2026 o Kenny apontou, na tela do Raio-X, que a pergunta do contrato de gaveta ("Quem vendeu (o dono que está na matrícula) vai assinar a escritura?") supõe que o imóvel tem matrícula e que quem vendeu é o dono registrado. A revisão de todas as 26 naturezas encontrou dois tipos de lacuna:

1. **Perguntas com premissa escondida** (gaveta, recibo, cessão, troca, fração ideal, imóvel na planta). Corrigidas no PR "perguntas dos documentos sem supor matrícula nem vendedor-dono" (site, etapa 1): as respostas novas levam só a caminhos que já existem (N0, N1, N3.5).
2. **Documentos comuns em Alagoas que não estavam na lista**, o que fazia o usuário escolher uma natureza errada. O caso mais grave: quem tem "escritura de posse" escolhia "escritura de compra e venda" e recebia o caminho do registro (N2).

## Decisão — cinco naturezas novas

| Natureza (id) | Pergunta | Caminhos | Base legal (texto lido no planalto.gov.br em 25/11/2026) |
|---|---|---|---|
| Escritura de cessão de posse (`escritura_posse`) | Existe matrícula do imóvel? | N0 (usucapião); N1 se o dono da matrícula for quem passou a posse | CC arts. 1.245 e 1.243 |
| Registro antigo em transcrição, sem matrícula (`transcricao_antiga`) | Quem vende é quem está na transcrição? | PLENO (com abertura de matrícula); N2.5 se faleceu; N1 se só há contrato | Lei 6.015/1973, art. 176, § 1º, I (redação da Lei 14.382/2022), e art. 228 |
| Título do INCRA ou do ITERAL (`titulo_reforma_agraria`) | Que título é? | PLENO (domínio registrado há mais de 10 anos); **sem caminho de venda** para domínio com menos de 10 anos e concessão de uso | Constituição, art. 189. **ITERAL: regras estaduais NÃO VERIFICADAS** |
| Compra por procuração (`procuracao_causa_propria`) | Como está hoje? | N1 (falta a escritura); N2; PLENO | CC arts. 682 e 685; CC art. 1.245 |
| Contrato de financiamento do banco (`contrato_financiamento_banco`) | O contrato está registrado na matrícula? | N4 (alienação fiduciária ativa ou não baixada); PLENO (baixada); N2 (sem registro) | Lei 9.514/1997, arts. 38 e 25, § 2º |

Regras mantidas:
- Cada natureza nova tem a opção **"Não sei"**, que manda conferir no cartório ou no órgão e mostra o caminho mais comum.
- O texto de lei citado nas notas é literal, com a redação vigente lida no Planalto; o que não foi conferido aparece como NÃO VERIFICADO.
- O Oráculo não indica advogado (ADR-003): onde o caminho exige advogado, a natureza só marca "precisa de advogado".

## Fora desta decisão (pendente)

- Somar o ato de **abertura de matrícula** (ato 231) ao custo da transcrição antiga: hoje só aparece em nota.
- Regras dos títulos do **ITERAL**: depende de ler a lei estadual e um título real.
- Cessão de posse de imóvel **rural** com CCIR/CAR: segue o caminho N0 com a marcação N6.

## Consequências

- As matrizes deste repositório (biblioteca/matrizes) não têm ainda estas cinco naturezas; a fonte de verdade delas, por enquanto, é `data/oraculo-calculadora.json` e `data/oraculo-raiox.json` do site. Levar para as matrizes na próxima consolidação.
- Testes no site: `tests/naturezas.test.mjs` garante que toda resposta leva a um caminho com custo e etapa, e que as naturezas novas existem na calculadora e no Raio-X. O golden de custos foi ampliado sem alterar nenhum caso anterior.
