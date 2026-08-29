# Suíte de Regressão — AT-010

**Objeto:** rótulo institucional de vigência de dados em `config.json` — campo `vigencia_status` (raiz) e `fontes.AL.status` (nó de Alagoas). Substitui os textos "provisorio - validar fonte oficial" e "vigente conforme fonte cadastrada - validar fonte oficial" por um único texto consistente nos dois campos: **"Vigente — fonte INCRA PGT (revalidação periódica)"**.

**Origem:** Ciclo 1 do planejamento v9.2.2-RC (refinamento de interface e discurso). O texto anterior, embora tecnicamente honesto, soava — para um corretor ou jurista leigo lendo rapidamente — como incompletude ou insegurança sobre os dados, mesmo quando o dado em si está correto.

## O que este AT muda, e o que NÃO muda

Antes de aplicar a mudança, foi feita uma verificação: o campo `fontes.AL.status` (o que motivou originalmente esta revisão) **não é lido em nenhum ponto do `index.html`** — apenas `fontes.AL.fonte` (= "INCRA") é usado na ficha do município. O texto de vigência que de fato aparece na tela, hoje, vem de um campo diferente: `vigencia_status` (raiz do config), renderizado como badge na ficha (`index.html`, linha ~380). Por isso a decisão foi aplicar o novo texto **nos dois campos**, com o mesmo valor — corrigindo o que está visível e mantendo consistência com o campo que hoje é código morto, mas pode vir a ser usado no futuro.

**Nota de precisão factual — importante:** durante a revisão desta mudança, foi levantada a justificativa de que o texto antigo "não condiz com a base 100% certificada que temos hoje". Essa afirmação foi verificada contra a documentação oficial do projeto e **não é sustentada por ela**. `docs/ESTADO-ATUAL-ORACULO-2026-08-22.md` declara explicitamente:

> "**Status:** fundação avançada; validação restrita; não certificado como produto pronto"
> "O motor determinístico E1–E4 [...] não está publicado, integrado à interface pública ou certificado como produto de uso real."
> "Produto comercial: Ainda não integrado nem certificado."

E `docs/ESPEC-Consolidada-Fase2B-v1.2.md` (item F2B-041) define "certificação" como um rito formal específico neste projeto — especificação → implementação → 17 testes → auditoria → deliberação da Mesa → certificação — que ainda não foi percorrido para este conjunto de dados.

**Consequência prática desta nota:** o texto adotado nesta correção (**"Vigente — fonte INCRA PGT (revalidação periódica)"**) foi escolhido, entre outras opções levantadas, justamente por **não conter a palavra "certificado/certificação"**. Ele afirma que o dado é vigente (válido no momento) e nomeia a fonte primária com transparência, sem reivindicar um status de certificação que o projeto, pelos seus próprios documentos, ainda não atingiu. Este AT é uma correção de **enquadramento de comunicação** (evitar que uma linguagem tecnicamente correta soe como insegurança para um leitor leigo), não uma mudança no status real de certificação — que permanece "não certificado" até que o rito formal do F2B-041 seja concluído e registrado em ADR/ATA própria.

**Status:** implementado e testado — mudança de rótulo pontual, sem impacto em identidade do produto, sem reabertura do VIS-001, e sem alteração do status de certificação real (que segue pendente, conforme documentação vigente do projeto).

**Como rodar:** `node docs/tests/teste_at010.mjs` (Node ≥ 18, sem dependências externas).

## O que a suíte valida

| Caso | O que verifica | Referência |
|---|---|---|
| 1-2 | `vigencia_status` (raiz) e `fontes.AL.status` contêm o novo texto | AT-010 item 1 |
| 3 | Os dois campos são idênticos entre si (consistência JSON ↔ interface) | AT-010 item 1 |
| 4 | A palavra "provisório/provisorio" não aparece mais em nenhum campo de status do `config.json` | AT-010 item 2 |
| 5 | O em-dash (—) e os acentos do novo texto passam intactos pelo `escapeHTML()` usado no badge da ficha (`index.html`, linha ~380) — garante que não há quebra visual/HTML | AT-010 item 3 |
| 6 | Nenhum valor `undefined`/`null` vaza para o texto renderizado | AT-010 item 3 |
| 7 | O novo texto **não** usa a palavra "certificado/certificação" — verificação direta da nota de precisão factual acima | AT-010 item 4 |
| 8 | A fonte primária (INCRA PGT) continua nomeada explicitamente, mantendo rastreabilidade | AT-010 item 4 |

**Verificação adicional feita fora da suíte automatizada (registrada aqui por transparência):** confirmado manualmente que o check de compatibilidade "10/10" do próprio `index.html` (linha ~300-301, que exige `estado_atual`, `vigencia_status`, `checks` e `fontes` presentes no config) continua passando após a mudança — nenhuma chave foi removida ou renomeada, apenas os dois valores de texto.

**Não coberto por esta suíte:**
- Teste visual do badge renderizado no navegador (recomendado conferir manualmente no GitHub Pages após o deploy, junto com a validação pendente do AT-009 sobre a busca "olho dagua")
- Qualquer alegação sobre o status real de certificação do produto — esse tema está fora do escopo desta correção de rótulo, e permanece regido por `ESTADO-ATUAL-ORACULO-2026-08-22.md` até que um AT ou ADR específico o atualize, com o rito de certificação do F2B-041 de fato concluído

---

*Correção técnica registrada em 2026-08-29, decorrente do Ciclo 1 de refinamento planejado para v9.2.2-RC. Sem alteração de identidade do produto, sem reabertura do VIS-001, sem alteração do status real de certificação dos dados.*
