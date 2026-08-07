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

COBERTURA DE VALIDAÇÃO DOCUMENTAL — BASE ALAGOAS
(revisão de 2026-08-06)

Municípios totais: 102
Validados oficialmente: 2 (Arapiraca, Maragogi)
Em validação (provisório): 100
Cobertura de validação: 1,96%


Leitura correta deste número: "1,96% dos municípios já têm conferência documental registrada contra fonte oficial." Leitura incorreta: "98% da base está errada" — isso o indicador não mede.

**Recomendação:** expor esse indicador diretamente na interface do `index.html` (já existe o badge `badgeVigencia` — pode ser estendido para mostrar o percentual, em vez do texto genérico atual "vigente conforme fonte cadastrada - validar fonte oficial").

**Nota sobre interpretação do indicador:** `PROVISORIO` significa que o registro ainda não passou por conferência individual contra fonte oficial — não que o valor esteja incorreto. O indicador abaixo mede **cobertura do processo de validação documental**, não a qualidade ou confiabilidade geral da base ou do software. Ele não deve ser citado, isolado, como métrica de "quanto do sistema está certo ou errado".

### Projeção de evolução (a preencher conforme o trabalho avançar)

| Mês | Validados | Cobertura |
|---|---|---|
| 2026-08 | 2 | 1,96% |
| 2026-09 | — | — |
| 2026-10 | — | — |
| 2026-11 | — | — |
| 2026-12 | — | — |

---

## 3. Processo de validação proposto

Município
↓
Consulta PGT/INCRA (pro-pgt-incra.estaleiro.serpro.gov.br)
↓
Comparação com valor provisório atual (MF/FMP)
↓
Registro da evidência (fonte, data de consulta, link/print)
↓
Atualização do campo fmp_status → "VALIDADO - PGT INCRA {data}"
↓
Atualização do campo fonte → referência específica (não mais a regra genérica IE 5/2022)
↓
Hash do commit + entrada no changelog


Esse é exatamente o padrão já usado nos dois registros validados (Arapiraca e Maragogi) — o processo já existe, só precisa ser aplicado sistematicamente aos outros 100.

### Critério formal para mudança PROVISÓRIO → VALIDADO

Um município só recebe status `VALIDADO` quando **todos** os itens abaixo estiverem satisfeitos — isso evita que a mudança de status seja um julgamento subjetivo de quem está validando:

- [ ] Consulta realizada em fonte oficial nomeada (ex: PGT/INCRA)
- [ ] Data da consulta registrada
- [ ] Fonte registrada com referência específica (não a regra genérica de IE 5/2022)
- [ ] Evidência arquivada (link, print ou documento anexo)
- [ ] Revisão humana concluída (não é uma inferência automática de outro campo)
- [ ] Commit identificado (hash do commit que alterou o registro)
- [ ] Changelog atualizado

Enquanto qualquer item estiver pendente, o registro permanece `PROVISORIO`, mesmo que o valor numérico já esteja correto por coincidência.

### Proposta de estrutura de dados (roadmap — não aplicar ainda)

Hoje o status vive como texto livre dentro de `fmp_status` (ex: `"VALIDADO - PGT INCRA 2026-08-05"`), o que funciona para leitura humana mas não é parseável de forma confiável para relatórios automáticos. A evolução natural é um campo estruturado:

```json
"nivel_confianca": {
  "status": "VALIDADO",
  "evidencia": "PGT INCRA",
  "data_validacao": "2026-08-05",
  "responsavel": "Kenny Wilson",
  "metodo": "Consulta manual"
}
```

**Ressalva importante antes de aplicar isso:** o `index.html` hoje lê os campos da base de forma direta e plana (`getField(reg, ['modulo_fiscal_ha','MF','modulo_fiscal'])` etc.) e o `fmp_status` como texto simples exibido na ficha. Introduzir `nivel_confianca` como objeto aninhado em produção **sem atualizar o código de leitura ao mesmo tempo** recria exatamente o problema que motivou a ATR-003 revisada: um campo novo no JSON que o `index.html` não sabe ler, ou dois formatos de status coexistindo (o texto livre antigo e o objeto novo) até a migração completar. Antes de aplicar:

- [ ] Definir se `nivel_confianca` substitui `fmp_status`/`fonte` ou convive com eles
- [ ] Atualizar a função de leitura no `index.html` para o novo formato
- [ ] Migrar os 102 registros de uma vez (não deixar formato misto no mesmo arquivo)
- [ ] Testar a ficha técnica de um município validado e um provisório após a migração

Recomendação: tratar isso como item da **Fase B avançada** do roadmap (seção 8), não como próxima ação imediata — a prioridade agora é rodar o processo de validação em cima do formato atual, que já funciona.

---

## 4. Critério de priorização — a decidir

Ainda não há dado de população, área ou atividade imobiliária na base atual para ordenar objetivamente quais municípios validar primeiro. Opções possíveis:

- **Por demanda real:** priorizar municípios mais buscados no `logAuditoria` do próprio sistema (dado que vocês já coletam).
- **Por porte:** priorizar municípios com maior população/PIB (precisaria de fonte externa, ex: IBGE).
- **Por proximidade geográfica dos sentinelas já validados:** validar a região metropolitana de Maceió e o litoral norte primeiro (onde já estão Maragogi e Arapiraca).
- **Ordem alfabética simples:** mais fácil de executar, sem viés, mas não prioriza onde há mais uso real.

**Recomendação:** usar o log de auditoria do próprio sistema (já implementado) para descobrir, depois de um período de uso real, quais municípios são mais consultados — e validar esses primeiro. Isso alinha o esforço de validação com o uso real, não com uma suposição.

---

## 5. Tabela de rastreamento — 100 municípios em validação
PARTE 2 — cole isso logo depois da parte 1, continuando o documento (a tabela toda dos 100 municípios + seções finais):

markdown

Colunas `Prioridade`, `Responsável` e `Evidência` estão em branco propositalmente — dependem da decisão da seção 4 e da atribuição de um responsável humano por município/lote.

| Município | Status atual | MF/FMP (provisório) | Fonte atual | Última revisão | Prioridade | Responsável | Evidência |
|---|---|---|---|---|---|---|---|
| Anadia | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Atalaia | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Barra de Santo Antônio | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Barra de São Miguel | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Batalha | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Belo Monte | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Belém | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Boca da Mata | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Branquinha | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Cacimbinhas | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Cajueiro | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Campestre | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Campo Alegre | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Campo Grande | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Canapi | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Capela | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Carneiros | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Chã Preta | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Coité do Nóia | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Colônia Leopoldina | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Coqueiro Seco | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Coruripe | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Craíbas | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Delmiro Gouveia | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Dois Riachos | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Estrela de Alagoas | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Feira Grande | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Feliz Deserto | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Flexeiras | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Girau do Ponciano | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Ibateguara | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Igaci | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Igreja Nova | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Inhapi | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Jacaré dos Homens | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Jacuípe | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Japaratinga | PROVISÓRIO | MF 7 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Jaramataia | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Jequiá da Praia | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Joaquim Gomes | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Jundiá | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Junqueiro | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Lagoa da Canoa | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Limoeiro de Anadia | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Maceió | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Major Isidoro | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Mar Vermelho | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Maravilha | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Marechal Deodoro | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Maribondo | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Mata Grande | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Matriz de Camaragibe | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Messias | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Minador do Negrão | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Monteirópolis | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Murici | PROVISÓRIO | MF 12 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Novo Lino | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Olho d'Água Grande | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Olho d'Água das Flores | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Olho d'Água do Casado | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Olivença | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Ouro Branco | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Palestina | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Palmeira dos Índios | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Pariconha | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Paripueira | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Passo de Camaragibe | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Paulo Jacinto | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Penedo | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Piaçabuçu | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Pilar | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Pindoba | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Piranhas | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Porto Calvo | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Porto Real do Colégio | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Porto de Pedras | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Poço das Trincheiras | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Pão de Açúcar | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Quebrangulo | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Rio Largo | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Roteiro | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Santa Luzia do Norte | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Santana do Ipanema | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Santana do Mundaú | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Satuba | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Senador Rui Palmeira | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São Brás | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São José da Laje | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São José da Tapera | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São Luís do Quitunde | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São Miguel dos Campos | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São Miguel dos Milagres | PROVISÓRIO | MF 10 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| São Sebastião | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Tanque d'Arca | PROVISÓRIO | MF 20 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Taquarana | PROVISÓRIO | MF 18 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Teotônio Vilela | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Traipu | PROVISÓRIO | MF 30 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| União dos Palmares | PROVISÓRIO | MF 14 / FMP 2 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Viçosa | PROVISÓRIO | MF 16 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |
| Água Branca | PROVISÓRIO | MF 35 / FMP 4 | INCRA IE 5/2022 (regra genérica) | — | *(a definir)* | *(a definir)* | *(pendente)* |

---

## 6. Municípios já validados (referência)

| Município | Status | MF/FMP | Fonte | Data de validação |
|---|---|---|---|---|
| Arapiraca | ✅ VALIDADO | MF 15 / FMP 2 | PGT INCRA - pro-pgt-incra.estaleiro.serpro.gov.br | 2026-08-05 |
| Maragogi | ✅ VALIDADO | MF 14 / FMP 2 | PGT INCRA - pro-pgt-incra.estaleiro.serpro.gov.br | 2026-08-05 |

---

## 7. Relação com o selamento

Este plano não bloqueia tecnicamente o selamento do software (a ATR-003 Revisada já cobre segurança/arquitetura/integridade de código). Mas recomenda-se que qualquer comunicação pública sobre o selamento **declare explicitamente a cobertura de validação da base** (1,96% em 2026-08-06), em vez de deixar essa informação implícita dentro dos registros JSON. Transparência sobre maturidade de dados é diferente de — e não deveria ser confundida com — reprovação de qualidade de software.

---

*Documento vivo — conforme municípios forem validados

