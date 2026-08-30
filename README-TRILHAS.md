# GOVERNANÇA DE TRILHAS — Oráculo Imobiliário BR

> Regra de ouro: Trilha A e Trilha E1 são independentes. Não misturar nomenclatura, arquivos ou status.

## Trilha A — Self-Service Sem Atalho (LIBERADA)

**Status:** LIBERADA PARA PRODUÇÃO. Não depende de A4, motor, nem Mesa.

**Arquivos ativos:**
- biblioteca/matrizes/matriz_urbano_residencial_condominio.json → pronta_para_self_service_trilha_A
- biblioteca/matrizes/Matriz-Rural.json → Lei 10.267/01 + Decreto 12.689/2025
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

## Reorganização de UX 28/08/2026 - Interface pública (WordPress, não repositório)

**Escopo:** apenas a camada de apresentação do produto Trilha A publicado em kennycorretorimoveis.com.br/oraculo/ (widget Elementor "Editar HTML", post 46425). Nenhum arquivo deste repositório foi alterado — a lógica do checklist, matrizes e cálculos permanece a mesma; o `matriz`/`NATUREZA_DOCUMENTAL` embutidos no widget continuam espelhando as mesmas regras de negócio já vigentes.

Mudanças aplicadas:
1. Reordenação do fluxo: planos pagos deixaram de aparecer antes do formulário — agora só surgem depois que o usuário gera o Raio-X gratuito e vê seu checklist.
2. Consolidação de captura de lead: existiam dois pontos de envio para WhatsApp (formulário de nome/WhatsApp + botão solto no rodapé); ficou só um, reposicionado logo após o checklist.
3. Identidade visual: eyebrow e rodapé passaram a exibir "KW Oráculo Imobiliário AL → BR", com bandeira de Alagoas (vermelho/branco/azul, Lei Estadual 2.628/1963) e bandeira do Brasil, valorizando a origem alagoana do projeto.
4. Colibri (símbolo oficial da categoria, Resolução COFECI nº 126/81) adicionado em posição de destaque no topo do hero.
5. Tipografia do título principal ajustada (Fraunces, peso mais leve, destaque em itálico dourado na frase-chave).
6. Dedicatória pessoal adicionada ao rodapé: "Este projeto existe pela graça de Deus, em nome de Biel e Lelê ✦".

**Não altera:** ESPEC-F2B, matrizes JSON, Trilha E1, ou qualquer artefato certificado deste repositório.
