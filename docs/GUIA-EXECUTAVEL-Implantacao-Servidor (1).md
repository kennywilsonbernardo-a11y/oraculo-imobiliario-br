# Guia Executável — Implantação do Servidor de Atendimento

**Status: pronto pra executar, aguardando o momento certo (caixa + validação de preço).**
Complementa `ARQUITETURA-ATENDIMENTO-WHATSAPP-PAGAMENTO.md`.

## Nota importante sobre quem faz o quê

O código de tudo abaixo pode ser **escrito pela IA**, do mesmo jeito que o widget do Elementor foi escrito nesta sessão. A diferença real está em **onde esse código roda**:

- **Editar o formulário do Elementor** → cola numa caixa, igual sempre — a IA escreve, você cola, funciona.
- **Rodar o servidor num VPS** → precisa ficar ligado 24h, instalado remotamente por linha de comando. A IA escreve o código inteiro, mas **colocar ele rodando** no servidor de verdade precisa de alguém — um desenvolvedor na primeira montagem (recomendado, por envolver dinheiro de cliente), ou você mesmo seguindo instrução comando por comando, mais devagar e com mais risco de erro no meio do caminho.

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

### Fase 2 — Infraestrutura básica

- [ ] Contratar VPS (Hostinger KVM 1 é suficiente pro início — mesmo provedor do seu WordPress, facilita)
- [ ] Contratar o BSP escolhido, verificar número dedicado (não pode ser o do seu celular pessoal)
- [ ] Servidor mínimo: registrar caso, receber mensagem (webhook), enviar mensagem — **a IA escreve o código completo; colocar rodando no VPS precisa de desenvolvedor ou de você seguindo comando por comando**
- [ ] Canal "meus dados" — **mesma coisa: código pronto pela IA, execução no servidor precisa de mão humana**. Obrigatório antes de qualquer teste com dado real

### Fase 3 — Pagamento

- [ ] Escolher gateway Pix (Mercado Pago, Asaas ou Efí — comparar taxa por transação)
- [ ] Integração de cobrança + webhook de confirmação — **código pronto pela IA; execução no servidor precisa de mão humana**

### Fase 4 — Conectar ao site

- [ ] Alterar o formulário do Elementor pra mandar dados pro servidor, não só montar link `wa.me` — **essa parte é igual ao que fizemos hoje: a IA escreve, você cola na caixa do Elementor, sem precisar de servidor remoto pra essa etapa específica**

### Fase 5 — Portão de saída (obrigatório, não pula)

- [ ] Revisão de advogado do `Doc3-Termos-LGPD-Frente3.md`
- [ ] Só depois disso: primeiro teste com usuário real

---

## Se você decidir contratar um desenvolvedor pra Fase 2-4

O bloco de cláusulas já está pronto: `CLAUSULA-PI-Contrato-Desenvolvedor.md`, no mesmo `docs/`. Anexa direto no contrato, sem precisar redigir do zero.

---

*Guia criado em 30/08/2026. Execução real fica pra quando caixa e validação de preço destravarem — este documento existe pra não precisar reconstruir o raciocínio do zero quando esse dia chegar.*
