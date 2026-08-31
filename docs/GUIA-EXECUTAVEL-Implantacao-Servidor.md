# Guia Executável — Implantação do Servidor de Atendimento

**Status: pronto pra executar, aguardando o momento certo (caixa + validação de preço).**
Complementa `ARQUITETURA-ATENDIMENTO-WHATSAPP-PAGAMENTO.md`.

---

## ⚠️ Resolver antes de contratar qualquer coisa

**A maioria dos provedores da API oficial do WhatsApp exige CNPJ** para aprovar a conta empresarial — pessoa física geralmente não é aceita para esse processo específico (diferente do registro de marca no INPI, que aceita CPF). Antes do passo 1, decidir: abrir CNPJ (MEI já resolveria isso, geralmente), ou pesquisar se existe algum BSP que aceite CPF pro seu volume (existem exceções, mas são a minoria e geralmente mais limitadas).

## Custo mensal realista (pesquisado, não estimado de cabeça)

| Item | Faixa de valor |
|---|---|
| VPS (Hostinger KVM 1) | R$28-40/mês no início; ~R$60/mês após 2 anos (preço de renovação) |
| BSP (intermediário Meta) | R$97-300/mês, operação pequena |
| Mensagens Meta | Praticamente grátis no seu caso (cliente inicia, você responde em até 24h) |
| Setup inicial (alguns BSPs) | R$500-2.000, taxa única — perguntar antes de fechar |
| **Total mensal estimado** | **R$130-350/mês**, fora setup |

---

## Sequência de execução

### Fase 1 — Decisões (você, sozinho, sem gastar nada)

- [ ] Decidir: CNPJ (MEI) ou buscar BSP que aceite CPF
- [ ] Escolher o BSP (comparar pelo menos 3, perguntando: mensalidade, taxa de setup, se repassam preço da Meta sem markup, suporte em português)
- [ ] Decidir se contrata um desenvolvedor pra essa etapa, ou se você mesmo vai aprender a montar (isso muda o próximo passo)

### Fase 2 — Infraestrutura básica (com ou sem desenvolvedor)

- [ ] Contratar VPS (Hostinger KVM 1 é suficiente pro início — mesmo provedor do seu WordPress, facilita)
- [ ] Contratar o BSP escolhido, verificar número dedicado (não pode ser o do seu celular pessoal)
- [ ] **[Precisa de programação]** Construir o servidor mínimo: registrar caso, receber mensagem (webhook), enviar mensagem
- [ ] **[Precisa de programação]** Implementar o canal "meus dados" — obrigatório antes de qualquer teste com dado real

### Fase 3 — Pagamento

- [ ] Escolher gateway Pix (Mercado Pago, Asaas ou Efí — comparar taxa por transação)
- [ ] **[Precisa de programação]** Integrar geração de cobrança + webhook de confirmação

### Fase 4 — Conectar ao site

- [ ] **[Precisa de programação]** Alterar o formulário do Elementor pra mandar dados pro servidor, não só montar link `wa.me`

### Fase 5 — Portão de saída (obrigatório, não pula)

- [ ] Revisão de advogado do `Doc3-Termos-LGPD-Frente3.md`
- [ ] Só depois disso: primeiro teste com usuário real

---

## Se você decidir contratar um desenvolvedor pra Fase 2-4

O bloco de cláusulas já está pronto: `CLAUSULA-PI-Contrato-Desenvolvedor.md`, no mesmo `docs/`. Anexa direto no contrato, sem precisar redigir do zero.

---

*Guia criado em 30/08/2026. Execução real fica pra quando caixa e validação de preço destravarem — este documento existe pra não precisar reconstruir o raciocínio do zero quando esse dia chegar.*
