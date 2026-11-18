# ADR-005 — Regularização: Leitor de Documentos e Níveis N0 a N7 já publicados
## Oráculo Imobiliário BR

**Status:** ✅ **Aprovado** — decisão de Kenny Wilson em 18/11/2026 ("Aprovo", em resposta à auditoria de 18/11/2026)
**Data:** 2026-11-18
**Referência:** VIS-001 §3, §4, §9 e §10; ADR-004 (Selo KW de Natureza Documental)
**Redação:** Claude (auditor)
**Natureza:** ADR de regularização. Registra no papel decisões que já estão em produção em www.kennycorretorimoveis.com.br/oraculo. **Não cria funcionalidade nova** e não reabre a identidade, o pipeline, o vocabulário de status nem o papel do advogado.

---

## Contexto

A auditoria de 18/11/2026 comparou o site publicado com os documentos congelados e encontrou duas divergências de governança:

1. O VIS-001 §9 classifica o **Motor Documental (leitura de PDF/foto)** como "❓ NÃO DECIDIDO" e o §10 o põe "fora" da primeira construção comercial. Mas a ferramenta **Ler meu documento** está publicada em `/oraculo/documento` desde 25/10/2026.
2. O ADR-004 diz "nada implementado no site ainda" sobre os níveis de natureza documental. Mas a calculadora e o Raio-X já usam os níveis **N0 a N7** como caminhos.

O VIS-001 §0 exige que mudanças no núcleo passem por ADR. As duas entraram no site sem esse registro. Este ADR corrige a falta.

## Decisão 1 — Leitor de documentos: escopo aprovado (o que está no ar)

O leitor de documentos passa de "não decidido" para **implementado**, com o escopo exatamente como publicado:

- **Leitura no aparelho do usuário.** O PDF ou a foto não é enviado ao servidor. Os programas de leitura (pdf.js e Tesseract) são baixados de serviços públicos de entrega (jsDelivr e cdnjs), como a Política de Privacidade informa.
- **O que faz:** reconhece o tipo de documento (matrícula, certidões, CCIR, CAR, IPTU etc.) e lê alguns campos de texto, como datas, validade, área e resultado da certidão. A partir disso, lista o que conferir.
- **O que não faz:** não lê nomes nem CPFs das partes. Não lê os atos da matrícula que vierem como imagem. Não valida a autenticidade do documento. Não emite status nem veredito.
- **Leitura que falha:** o resultado aparece como "Inconclusivo", com o aviso "não conseguir ler o papel não quer dizer que o imóvel tenha problema".

Fica fora deste escopo, e exige ADR próprio: envio de documento ao servidor, guarda de arquivos, leitura de nomes e CPFs, e qualquer conclusão automática sobre propriedade ou ônus.

## Decisão 2 — Níveis N0 a N7: a taxonomia está implementada; o Selo, não

A **taxonomia** do ADR-004 está em produção como lista única de caminhos, em `lib/oraculo-caminhos.js` (repositório do site):

| Código | Situação |
|---|---|
| N0 | Só a posse, sem documento (usucapião) |
| N1 | Contrato de gaveta (escritura ou adjudicação) |
| N2 | Escritura sem registro |
| N2.5 | Herança sem partilha (inventário) |
| N3 | Matrícula com erro (retificação) |
| N3.5 | Loteamento irregular (REURB) |
| N4 | Matrícula com ônus |
| N5 / N6 | Marcações que se somam a um caminho (terreno de marinha / imóvel rural) |
| N7 | Construção que não está na matrícula |
| PLENO | Matrícula em nome do vendedor, sem ônus |

Os níveis descrevem **em que ponto do caminho até a matrícula o documento está**. Não são status documental (VIS-001 §4), não são nota de risco e não formam ranking de "segurança".

**Não está implementado** e continua pendente, como o ADR-004 já dizia: o **Selo KW** como peça visual com texto fixo, e a consulta jurídica sobre a responsabilidade de quem emite o selo.

## Decisão 3 — Vocabulário de status do VIS-001 §4 continua sem interface

Os quatro status (INSUFICIENTE, NÃO APTO, PENDÊNCIA IDENTIFICADA, VERIFICADA NO ESCOPO) **não** serão colocados nas telas atuais. Com cores, eles seriam lidos como semáforo de risco, o que a auditoria de 18/11/2026 pede para evitar. O vocabulário fica reservado ao **Painel de Pendências** (VIS-001 §9, roadmap), que terá desenho próprio.

## Consequências

- O VIS-001 §9 deve ser lido com estas atualizações: Motor Documental → ✅ IMPLEMENTADO (escopo da Decisão 1); níveis de natureza documental → ✅ IMPLEMENTADOS como caminhos (Decisão 2).
- O ADR-004 continua como proposta **somente** quanto ao Selo visual e à consulta jurídica.
- Daqui em diante, qualquer nova funcionalidade do Oráculo que mude o núcleo entra **primeiro** como ADR e só depois vai para o site.
- O texto do VIS-001 não é reescrito: este ADR é a emenda, como manda o VIS-001 §0.
