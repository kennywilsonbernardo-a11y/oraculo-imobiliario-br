# GOVERNANÇA DE TRILHAS — Oráculo Imobiliário BR

> Regra de ouro: Trilha A e Trilha E1 são independentes. Não misturar nomenclatura, arquivos ou status.

## Trilha A — Self-Service Sem Atalho (LIBERADA)

**Status:** LIBERADA PARA PRODUÇÃO. Não depende de A4, motor, nem Mesa.

**Arquivos ativos:**
- biblioteca/matrizes/matriz_urbano_residencial_condominio.json → pronta_para_self_service_trilha_A
- biblioteca/matrizes/matriz_rural.json → Lei 10.267/01 + Decreto 12.689/2025
- biblioteca/matrizes/matriz_casos_especiais.json
- docs/template-relatorio-3-blocos.html → 3 blocos sem F2B
- docs/gerar-pdf.js → ITBI Maceió 3%

**Relatório 3 blocos (SEM F2B):**
- Bloco A: "X de Y verificações concluídas" — Indicador de Cobertura - Padrão Trilha A
- Bloco B: Checklist customizado — Raio-X Documental (Padrão de produto Trilha A)
- Bloco C: Termo PEI — educacional, não é PTAM/CNAI - VIS-001 §8

## Trilha E1 — Motor Fase 2B (BLOQUEADA)
Status: BLOQUEADA. Esperando artefato A4 real.

## Correções aplicadas 23/08/2026 - Auditoria
1. matriz_rural.json linha 34: obs agora "Obrigatório conforme tamanho da área - Lei 10.267/01 - Decreto 12.689/2025 suspendeu por 4 anos a exigência para imóveis menores - verificar enquadramento atual"
2. gerar-pdf.js linha 41: "ITBI previsto - alíquota Maceió 3% (padrão) - exceção SFH: 0,5% financiado + 2% restante - verificar Prefeitura"
3. template-relatorio-3-blocos.html linhas 39 e 53: removidos (F2B-028) e (F2B-027) - agora "Indicador de Cobertura - Padrão Trilha A" e "Raio-X Documental (Padrão de produto Trilha A)"
4. ITBI Maceió 3% padrão corrige erro de R$3.700
