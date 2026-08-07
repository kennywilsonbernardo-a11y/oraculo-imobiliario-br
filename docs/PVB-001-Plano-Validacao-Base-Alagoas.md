# PVB-001 — Plano de Validação da Base Alagoas
## Oráculo Imobiliário BR

**Tipo de documento:** Plano de Governança da Base (não é auditoria técnica — ver nota abaixo)
**Data de criação:** 2026-08-06
**Escopo:** `biblioteca/BR/AL/alagoas.json` — 102 municípios de Alagoas

> **Nota de nomenclatura:** este documento não usa o prefixo `ATR` (Auditoria Técnica) porque não está auditando código ou arquitetura — está planejando a evolução de um conjunto de dados. `ATR` fica reservado para auditorias de software (segurança, arquitetura, performance, UX). `PVB`/`GOV` é a família de documentos que trata da maturidade e validação da base de dados em si.

---

## 1. Por que este documento existe

Na revisão da base utilizada nesta versão do projeto (`biblioteca/BR/AL/alagoas.json`, conferida em 2026-08-06), foram identificados **2 registros com status `VALIDADO`** e **100 registros com status `PROVISORIO`**. Este indicador representa o estado da base especificamente nesta revisão — deve ser recalculado a cada nova revisão da base, não tratado como constante do projeto.

**Isso não é um defeito de qualidade dos dados.** É o próprio sistema declarando, de forma explícita e auditável, em qual estágio de maturidade cada registro está. O problema não é o número — é que esse número não estava visível como indicador de governança até agora, e o nome do produto ("Candidata ao Selamento") pode sugerir uma maturidade maior do que a base realmente tem hoje.

Este plano torna esse indicador público, rastreável e com um caminho claro de evolução.

---

## 2. Indicador oficial — Cobertura de Validação Documental
