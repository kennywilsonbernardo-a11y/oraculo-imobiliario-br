# ADR-001 — Decisões Arquiteturais
## Oráculo Imobiliário BR

**Status:** Aceito
**Data:** 2026-08-06/07
**Versão do documento:** v1.0
**Autor:** Registrado por Claude a partir de decisões tomadas em sessão com Kenny Wilson
**Relacionado a:** ATR-003-REVISADA.md, PVB-001-Plano-Validacao-Base-Alagoas.md

---

## O que é este documento

Um ADR (Architectural Decision Record) registra **por que** uma decisão de arquitetura foi tomada, não apenas o quê. O objetivo é que, daqui a meses, alguém não precise adivinhar a intenção por trás de uma escolha — ou pior, revertê-la sem saber que ela já foi considerada e descartada por um motivo específico.

Cada decisão abaixo segue o formato: Contexto → Decisão → Alternativas consideradas → Consequências.

---

## ADR-001-01 — Diagnóstico lê `CONFIG.checks` em vez de constante hardcoded

**Contexto:** O `index.html` continha uma constante `SENTINELAS` hardcoded no JavaScript, com valores de MF/FMP para 4 municípios de referência. O `config.json` também tinha um bloco `checks` com os mesmos 4 municípios — mas os valores haviam divergido (Maragogi e Arapiraca desalinhados) sem que nada detectasse isso, porque o diagnóstico nunca lia o `config.json` para essa parte.

**Decisão:** Remover `SENTINELAS` do JavaScript. O diagnóstico agora itera sobre `CONFIG.checks` (lido de `config.json`) diretamente.

**Alternativas consideradas:** Manter as duas fontes e adicionar um teste de consistência entre elas. Rejeitada — resolve o sintoma, não a causa; ainda permite que as duas voltem a divergir no futuro se alguém editar só uma.

**Consequências:** Editar `config.json` agora é suficiente para adicionar/alterar sentinelas — não é mais necessário tocar em `index.html` para isso. Reduz a superfície de erro humano em uma unidade (uma fonte a menos pra manter sincronizada).

---

## ADR-001-02 — Mitigação de XSS via `innerHTML` + `escapeHTML()` manual (não `textContent`)

**Contexto:** A ATR-003 original descrevia a mitigação de XSS como baseada em `textContent`. Ao conferir o código real, o mecanismo é outro: `innerHTML` é usado para montar os templates de ficha/histórico/logs, com `escapeHTML()` aplicado a cada valor dinâmico antes de entrar no template string.

**Decisão:** Manter o mecanismo atual (`innerHTML` + `escapeHTML()`), documentado corretamente na ATR-003 Revisada. Não migrar para `textContent` nesta sessão.

**Por que não migrar agora:** Isso não foi uma decisão de preferência técnica — é reconhecimento de que uma migração para `textContent` exigiria reescrever a forma como cada bloco de HTML é montado (hoje são templates com marcação misturada a dados), o que é um trabalho de escopo maior do que corrigir os bugs pontuais desta sessão. É candidato a entrar na fase de arquitetura (ver roadmap), não a ser decidido às pressas.

**Consequências:** A mitigação atual é válida e funcional, mas depende de disciplina manual — todo novo trecho de código que insere dado dinâmico via `innerHTML` precisa lembrar de aplicar `escapeHTML()`. Isso é uma dívida de processo, não de segurança imediata: deveria constar em qualquer guia de contribuição futuro do projeto.

---

## ADR-001-03 — PVB (governança de dados) separado de ATR (auditoria de software)

**Contexto:** Ao investigar a cobertura de validação da base (2 de 102 municípios com status `VALIDADO`), a tentação inicial foi tratar isso como mais um item de auditoria técnica (ATR-00X).

**Decisão:** Criar uma categoria de documento separada — PVB (Plano de Validação da Base) — em vez de estender a numeração ATR.

**Alternativas consideradas:** Registrar como "ATR-008 — Integridade da Base". Rejeitada por sugestão do ChatGPT e aceita nesta sessão: dado provisório não é bug de código, é estado de maturidade de dado; misturar as duas categorias sob o mesmo prefixo confundiria "isso é uma falha a corrigir" com "isso é um processo a executar ao longo do tempo".

**Consequências:** O projeto agora tem duas trilhas de documentação com cadências diferentes — ATR muda quando o código muda; PVB muda conforme municípios são validados, um processo manual e gradual que não depende de deploy.

---

## ADR-001-04 — Módulo PEI permanece desacoplado da interface publicada

**Contexto:** O README descrevia o Checklist PEI (upload → 8 itens → score) como funcionalidade do produto, mas o `index.html` publicado nunca importou os módulos que o implementam (`analisador-8-itens.js`, `motor_rural.js`, `upload-model.js`). Os bugs de runtime desses módulos foram corrigidos nesta sessão, mas a integração à interface não foi feita.

**Decisão:** Manter o Módulo PEI desacoplado por enquanto. O README foi corrigido para declarar isso explicitamente (tabela "Status por módulo"), em vez de prometer uma funcionalidade que não está acessível.

**Por quê:** A página do Módulo 1 (Biblioteca MF/FMP) está estável e com diagnóstico 10/10 confirmado. Integrar um módulo novo e maior — com upload de arquivo, novo fluxo de UI, novo tratamento de erro — abre uma superfície de risco desproporcional ao estado atual de maturidade do projeto, especialmente logo após uma sessão de correção de bugs.

**Consequências:** Planejar a integração como um marco de versão separado (sugestão: v9.2.x fecha o ciclo de governança atual; v9.3 integra o PEI; v9.4 trata refatoração de arquitetura mais ampla, incluindo o item ADR-001-02 acima).

---

## ADR-001-05 — `nivel_confianca` estruturado fica em roadmap, não implementado agora

**Contexto:** Proposta (do ChatGPT) de substituir o campo de texto livre `fmp_status` por um objeto estruturado `nivel_confianca` (status, evidência, data, responsável, método), o que tornaria o dado parseável para relatórios automáticos.

**Decisão:** Documentar a proposta no PVB-001 como item de roadmap, com uma lista explícita de pré-requisitos. Não implementar nesta sessão.

**Por quê:** O `index.html` lê os campos da base de forma plana e específica (`getField(reg, ['modulo_fiscal_ha', ...])`). Introduzir um campo aninhado no JSON sem atualizar o código de leitura no mesmo commit recriaria exatamente o tipo de divergência silenciosa que motivou a ATR-003 Revisada (schema e código dessincronizados). Além disso, migrar 102 registros de uma vez, mantendo formato misto durante a transição, é uma operação que merece ser feita isolada — não como efeito colateral de uma sessão de correção de bugs.

**Ordem recomendada quando for feito:** (1) estabilizar o schema atual, (2) atualizar a função de leitura do `index.html`, (3) migrar os 102 registros de uma vez, (4) testar ficha de um município validado e um provisório antes de publicar.

---

## Estado das decisões (resumo)

| Item | Estado |
|---|---|
| ADR-001-01 (CONFIG.checks) | ✅ Implementado e verificado em produção |
| ADR-001-02 (innerHTML+escapeHTML) | ✅ Mantido como está, documentado |
| ADR-001-03 (PVB separado de ATR) | ✅ Implementado |
| ADR-001-04 (PEI desacoplado) | ✅ Decisão vigente — reavaliar na v9.3 |
| ADR-001-05 (nivel_confianca) | 📋 Roadmap — não implementado |

---

*Este documento deve ser atualizado (não substituído) conforme novas decisões arquiteturais forem tomadas — cada nova decisão relevante ganha um item ADR-001-0N, preservando o histórico.*
