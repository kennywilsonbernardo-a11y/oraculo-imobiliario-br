# ADR-007 — Imóvel comercial em funcionamento, construção fora da matrícula (N7 no Raio-X) e venda junto com o negócio
## Oráculo Imobiliário BR

**Status:** ✅ **Aprovado na direção** — Kenny Wilson, 27/11/2026 ("vamos corrigir nosso oráculo, e adicionar este tipo de imóvel comercial"). A publicação depende do "aprovo" do PR #123 do site.
**Data:** 2026-11-27
**Referência:** VIS-001; ADR-003 (o Oráculo não indica advogado); ADR-005 (níveis N0 a N7); ADR-006
**Redação:** Claude

---

## Contexto

Caso real em 27/11/2026, levado pelo Kenny sem dados pessoais no repositório: uma pousada em funcionamento em São Miguel dos Milagres, cujo dono quer vender. O documento de propriedade é só do terreno. O projeto aprovado pelos Bombeiros em 2007 informa 422,61 m² construídos, e hoje existe um prédio de dois andares. O imóvel é de pessoa física, e a pousada funciona no CNPJ de uma empresa.

Ao rodar o caso no Oráculo, apareceram três lacunas:

1. **Bug:** na calculadora, a resposta "Tem casa ou construção que não aparece na matrícula" leva ao caminho N7 (ADR-005), mas o Raio-X não tinha o nível N7. O resultado ficava sem nível, sem passos e sem fontes.
2. **Não havia tipo de imóvel comercial.** Pousada, hotel, loja e restaurante caíam em "Casa de rua". Habite-se e certidão da obra apareciam como documentos não obrigatórios.
3. **Não se separava a venda do imóvel da venda do negócio** que funciona nele.

## Decisão

| Item | O que entra | Base legal (texto lido no planalto.gov.br em 27/11/2026, versão compilada) |
|---|---|---|
| Nível N7 no Raio-X | Reconhecer, passos, órgãos, cuidados, advogado | Lei 6.015/1973, art. 167, II, 4 (averbação da edificação); Lei 8.212/1991, art. 47, II (CND da obra para averbar); Lei 6.015/1973, art. 247-A (dispensa de habite-se só para residencial unifamiliar de um pavimento, de baixa renda, pronta há mais de 5 anos) |
| Tipo "Imóvel comercial em funcionamento" | Construção averbada (obrigatório); alvará; Bombeiros; Cadastur; Vigilância Sanitária; empresa que opera | Lei 13.425/2017, arts. 3º e 4º, V e § 2º; Lei 11.771/2008, arts. 21, I, e 22, caput e § 4º |
| Situação 23 — construção que não está na matrícula | Pergunta para todos os tipos de imóvel | Mesmas leis do N7 |
| Situação 24 — venda do imóvel junto com o negócio | Dois contratos; trespasse averbado na Junta e publicado; dívidas que o comprador herda; advogado e contador | CC arts. 1.144, 1.146 e 1.147; CTN art. 133; CLT art. 448-A |

**O que não muda:**
- os custos dos caminhos e a calculadora;
- os outros tipos de imóvel e as situações 0 a 22 (a fotografia de regressão dos 50 cenários anteriores ficou idêntica);
- o vocabulário de status.

**Regra do ADR-003 mantida:** a situação 24 diz que o caso "pede advogado (e contador)", sem indicar nomes.

## Pendências

1. Levar o N7, as situações 23 e 24 e o checklist comercial para as matrizes deste repositório. Por enquanto foram editados direto no `data/oraculo-raiox.json` do site, como no ADR-006.
2. Na calculadora, separar o preço do imóvel do preço do negócio (móveis, marca, ponto). A base do ITBI é o imóvel; a regra de cada município fica NÃO VERIFICADA.
3. Licença sanitária e alvará: a exigência e o prazo variam por município (NÃO VERIFICADO para São Miguel dos Milagres).
4. Lei 14.195/2021, art. 41: as EIRELI existentes foram transformadas em sociedade limitada unipessoal (texto conferido). Ainda não entrou no Oráculo; avaliar se vale uma ficha na busca.
