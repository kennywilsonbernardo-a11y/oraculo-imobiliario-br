# ADR-004 (PROPOSTA): Selo KW de Natureza Documental

**Status:** CONCEITO APROVADO por Kenny Wilson (Presidente da Mesa) em 23/09/2026. Formato visual, texto fixo e consulta jurídica sobre responsabilidade seguem pendentes. Nada implementado no site ainda.
**Autor da ideia:** Kenny Wilson (23/09/2026)
**Redação:** Claude (auditor)
**Documento afetado:** VIS-001 §4 e §10. Alterações ao VIS-001 exigem ADR formal (§11).

---

## 1. A ideia

Cada imóvel analisado recebe um **Selo KW de Natureza Documental**, que indica em qual estágio do caminho até a matrícula plena ele está: **N0** (posse), **N1** (gaveta), **N2** (escritura sem registro) e assim por diante, até a matrícula plena.

## 2. A analogia de Kenny: os precatórios

Um crédito contra o poder público passa por estágios até ser pago:

1. direito creditório em discussão judicial;
2. crédito reconhecido;
3. ofício requisitório;
4. precatório expedido e inscrito.

A cada estágio a incerteza diminui, e o mercado negocia com um **deságio menor**.

Com o imóvel acontece o mesmo. Uma posse (N0) e uma matrícula plena descrevem o "mesmo" bem, mas carregam riscos, custos e prazos muito diferentes até virar propriedade segura. O selo torna esse estágio **visível e padronizado**. O mercado passa a precificar a diferença com base em evidência, e não mais na conversa do vendedor.

## 3. Onde a ideia é compatível com o que já foi congelado

| VIS-001 | Como o selo se encaixa |
|---|---|
| §4: status é "daquele momento", não é certificação | O selo traz **data e validade**: "Natureza N2, verificada em DD/MM/AAAA com a matrícula de DD/MM/AAAA". Ele vence junto com a certidão. |
| §10: **score ou percentual de segurança é proibido para sempre** | O selo **não é nota**. Ele descreve **em que estágio o imóvel está**, um fato documental, e não "quão seguro ele é". Não pode existir "selo 8/10" nem "selo ouro, prata ou bronze". |
| Aviso PEI: "não é PTAM" | O Oráculo **não define preço nem deságio**. Quem precifica é o mercado. Opinião de valor é PTAM (Res. COFECI 1066/2007), e o Oráculo declara que não é PTAM. |
| Manifesto, Fronteira 4 (independência) | O selo de um imóvel no qual o condutor tem interesse comercial **não pode** ser apresentado a terceiros como independente. |

## 4. Proposta de desenho (para a Mesa discutir)

**Escada aprovada por Kenny em 23/09/2026:** os estágios vão de N0 a N4, e o topo é **PLENO**. N5 (marinha) e N6 (rural) indicam o tipo do imóvel e se combinam com o estágio. O formato do selo fica assim: `N1 · N6 · cessão de direitos`.

- **O que o selo mostra:** o código da natureza (N0 a N6), a data da verificação, os documentos usados (com o hash SHA-256 de cada evidência, a mesma técnica do AT-011) e a validade.
- **O que o selo não mostra:** nota, cor de risco, valor do imóvel, "compre" ou "não compre".
- **Transição:** quando o imóvel sobe de estágio (por exemplo, N2 → matrícula plena), um novo selo é emitido. O histórico de selos vira a **trajetória documental** do imóvel.
- **Marca:** registrar o selo no INPI junto com a marca "KW Oráculo Imobiliário BR", que já é uma pendência do GUIA-PENDENCIAS.

### 4.1 Requisitos técnicos herdados da revisão de 07/09/2026

Estes requisitos vêm do documento "KW Oráculo — Documento para Revisão Claude", achados C e D, trazido por Kenny em 23/09/2026:

- **Hash canônico e determinístico.** O hash do selo é calculado sobre um conteúdo fixo: entradas + versão da matriz de naturezas + checklist + status de cada documento + natureza atribuída. A data e a hora entram como **metadado**, não no conteúdo. Assim, a mesma situação gera sempre o mesmo hash, e qualquer mudança de status muda o hash.
- **Protocolo só na emissão.** Um protocolo novo nasce **apenas** quando o usuário emite o selo, de forma explícita. Recalcular a tela durante o trabalho não gera protocolo.
- **Estado isolado por caso.** O selo de uma operação nunca herda marcações de outra.

## 5. Riscos a deliberar

1. **O selo ser lido como certificado de regularidade.** Isso fere o VIS-001 §4 e expõe o corretor. Mitigação: a validade e o aviso PEI ficam impressos no próprio selo.
2. **O selo ser lido como avaliação.** Isso invade o campo do PTAM. Mitigação: não mostrar valor nenhum.
3. **Responsabilidade:** se o selo errar a natureza e alguém pagar mais por isso, de quem é a responsabilidade? Isso precisa passar por advogado antes do lançamento.
4. **Fronteira com o CRECI:** a validação no CRECI pode dar legitimidade ao selo. Vale apresentar os dois juntos.

## 6. Decisão pedida à Mesa

- [ ] Aprovar o conceito de selo **como estágio documental** (não como nota).
- [ ] Definir o formato visual e o texto fixo do selo.
- [ ] Decidir se emenda o VIS-001 (§4) ou cria um anexo.

*Nada deste documento está implementado. Ele é um registro da ideia e de como ela se encaixa nas regras já congeladas.*
