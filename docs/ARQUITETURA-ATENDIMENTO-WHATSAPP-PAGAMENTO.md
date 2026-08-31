# Arquitetura de Atendimento — WhatsApp, API e Pagamento

**Complementa:** `ARQUITETURA.md` (v7.0, camada de dados/regras) e `docs/Doc3-Termos-LGPD-Frente3.md` (camada de consentimento — já redigida, aguardando revisão de advogado).

**O que este documento resolve:** o Doc3 já define **o que** o WhatsApp deve dizer e **quais consentimentos** coletar. Este documento define **como** isso roda de verdade — o motor técnico por trás.

---

## 0. Estado atual (linha de base, 30/08/2026)

```
Site (Elementor) → gera link wa.me com mensagem pronta → abre WhatsApp pessoal do Kenny → 100% manual daqui pra frente
```

Nenhuma automação depois do clique. Nenhum backend. Nenhum pagamento processado automaticamente.

---

## 1. As 4 camadas que faltam

### Camada A — Canal (WhatsApp Business Platform)

O `wa.me` é um link, não uma API — não dá pra automatizar em cima dele. Automação de verdade exige a **WhatsApp Business Platform** (API oficial da Meta), que precisa de:
- Conta comercial verificada na Meta (WABA)
- Um número de telefone **dedicado só pra isso** — não pode ser o mesmo número com o app WhatsApp normal instalado no celular
- Um dos dois caminhos:
  - **Integração direta com a Meta** (Cloud API) — mais barato a longo prazo, mais trabalho técnico de configurar
  - **Um provedor intermediário (BSP)** — empresas como Zenvia, Take Blip, 360dialog, Gupshup, Twilio — cobram mensalidade, mas simplificam MUITO a configuração. Pra quem está começando sozinho, geralmente vale mais a pena começar por aqui.

### Camada B — Servidor (o "cérebro")

É o backend que ainda não existe. Ele:
- **Recebe** mensagens do WhatsApp (via webhook) e dados do formulário do site
- **Guarda** o estado de cada caso: protocolo (`PEI-AL-...`), o que já foi respondido, se pagou, quais documentos chegaram
- **Decide** o que responder sozinho e o que repassar pra você
- **Envia** mensagens de volta (via API) e cobranças Pix

Sem hospedagem decidida ainda — essa é uma pendência já identificada antes desta sessão (item 5 do guia, ligado à revisão do Doc3-LGPD).

### Camada C — Pagamento (Pix automatizado)

Gateways com Pix e webhook de confirmação: Mercado Pago, Asaas, Efí (Gerencianet), Pagar.me. Fluxo:
```
robô manda Pix (copia-e-cola ou QR code)
  ↓
gateway avisa o servidor quando o pagamento cai (webhook)
  ↓
servidor libera automaticamente o próximo passo (ex: link de upload de documento)
```

### Camada D — Conexão com o WordPress

Hoje o formulário só monta um link `wa.me`. Pra automatizar, ele precisa **primeiro** mandar os dados pro servidor (Camada B) — criando o registro do caso — e só depois abrir o WhatsApp (ou nem precisar abrir manualmente, o próprio servidor inicia a conversa).

---

## 2. O que deve ser automático, e o que continua sendo você

Mesma lógica que já vale pro resto do Oráculo (Trilha A automatizada, Trilha E1 com revisão humana obrigatória) — aplicada ao atendimento:

| Automático (robô) | Continua sendo você |
|---|---|
| Mensagem de abertura LGPD (já redigida no Doc3) | Qualquer dúvida sobre o caso específico |
| Coleta dos 3 consentimentos (C1/C2/C3) | Qualquer coisa que exija julgamento |
| Geração e cobrança do Pix | Conferência dos documentos (Trilha E1) |
| Confirmação de pagamento | Devolutiva final do Relatório PEI |
| Lembrete de documento pendente | |

### O ponto que trava tudo, tecnicamente: o canal "meus dados"

O Doc3 já exige, na letra: **"não se coleta consentimento sem ter o mecanismo de revogação funcionando"** — ou seja, antes do primeiro "ACEITO" real, o servidor já precisa saber responder quando alguém manda "meus dados" (mostrando o que guarda, ou apagando). Isso não é feature de luxo, é pré-requisito técnico do próprio Doc3, mencionado como bloqueante.

---

## 3. Ordem de construção sugerida

1. Decidir hospedagem do servidor (pendência já aberta)
2. Escolher BSP ou integração direta com a Meta
3. Construir o mínimo do servidor: registrar caso + receber mensagem + enviar mensagem
4. Implementar o canal "meus dados" — **obrigatório antes de qualquer coleta de consentimento real**
5. Integrar Pix
6. **Só então**: revisão de advogado do Doc3-LGPD, como condição de publicação — não é etapa que se pula, mesmo com tudo tecnicamente pronto

O trabalho técnico das etapas 1–5 pode começar em paralelo. A etapa 6 continua sendo o portão de saída — nenhum usuário real deve dar "ACEITO" de verdade antes disso.

---

*Documento criado em 30/08/2026, conectando `ARQUITETURA.md` e `Doc3-Termos-LGPD-Frente3.md` — que existiam sem essa camada técnica entre os dois.*
