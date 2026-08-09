# Gap Epistemológico Identificado — Teste Vale Verde
## Registro de achado conceitual (não é decisão arquitetural)

**Status:** Achado registrado — aguardando confirmação em um segundo caso de teste antes de virar decisão
**Data:** 2026-08-08
**Origem:** Auditoria A×B do pipeline (Vale Verde vs. VIS-001 §2) + análise específica sobre a natureza de Inferência
**Relação com outros documentos:** Não faz parte do ADR-002 (que trata exclusivamente dos Gaps 1 e 2 do vocabulário de status). Não altera o VIS-001. Não é uma decisão — é um achado preservado para reavaliação futura.

---

## O achado

> O VIS-001 §5 apresenta uma taxonomia de níveis de evidência que atualmente combina dimensões de natureza distinta: origem do conteúdo e modo de produção da proposição. O teste Vale Verde demonstrou a necessidade de avaliar formalmente a separação dessas dimensões, especialmente para distinguir informação diretamente declarada por uma fonte de conclusões inferidas pelo sistema a partir do cruzamento de evidências.

## Evidência que sustenta o achado (caso Vale Verde)

- *"A matrícula registra Cerutti Engenharia Ltda como proprietária"* — declarado diretamente por uma única fonte, sem cruzamento.
- *"Há divergência entre o titular registral e o vendedor contratual"* — não declarado por nenhuma fonte isoladamente; produzido pelo cruzamento de duas fontes (matrícula + contrato).

A taxonomia atual do §5 (normativa / oficial / institucional / jurisprudencial / empírica / hipótese) classifica bem o primeiro caso, mas não tem categoria adequada para o segundo — e "hipótese", ao ser examinada de perto, já não pertence à mesma família dos outros cinco itens (que descrevem origem/fonte), porque descreve um modo de produção sem lastro documental, não uma origem.

## Por que não vira decisão agora

A engenharia aqui pede cautela: desenhar uma estrutura epistemológica definitiva com base em um único caso é o mesmo risco que motivou toda essa metodologia de teste — fixar classificação cedo demais. A decisão da mesa foi observar se o mesmo padrão se repete num segundo caso de natureza diferente antes de tratar isso como decisão arquitetural.

## Próximo passo combinado

O caso da outorga de água/CADIN, ao ser testado (depois que o ADR-002 for aprovado e o VIS-001 §4 atualizado), deve ser observado especificamente quanto a este ponto: surgem informações que são inferência de cruzamento, distintas de declaração direta de fonte? Se sim, e se o padrão se repetir de forma consistente, este achado se torna candidato a um ADR específico sobre epistemologia da evidência — não antes disso.

---

*Documento de registro. Não altera VIS-001. Não altera ADR-002. Não programado. Nenhuma taxonomia nova foi criada — a distinção fica documentada como observação, não como estrutura.*
