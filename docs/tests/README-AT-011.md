# AT-011 — Diagnóstico: verificação real do SHA-256 e pré-requisito

## Problema encontrado (auditoria de 23/09/2026)
O check 8/10 do diagnóstico (`index.html`) **aprovava em qualquer situação**:
- `alagoas.sha256` ausente → aprovado ("OK para RC");
- erro de leitura → aprovado;
- arquivo presente → só conferia se tinha 64 caracteres, **sem comparar com a base**;
- o hash era calculado sobre `JSON.stringify(BASE)` (JSON re-serializado), que nunca coincide com o hash do arquivo publicado.

Resultado: a nota "10/10" era exibida sem que a integridade da base tivesse sido de fato verificada.
Além disso, sem base carregada o diagnóstico acrescentava um 11º item a uma nota "de 10".

## Correção
- A base é lida como **bytes originais** (`arrayBuffer`); o SHA-256 é calculado sobre esses bytes.
- Check 8 só aprova se o hash oficial (`biblioteca/BR/AL/alagoas.sha256`) for **igual** ao calculado.
- Selo ausente → **PENDENTE**, não soma ponto, e mostra o hash calculado para conferência.
- Formato inválido, divergência ou erro → **reprovado**.
- Sem base/config carregados, o diagnóstico **não roda** e não exibe nota.

## Efeito esperado no site hoje
Como `alagoas.sha256` **não existe** no repositório, o diagnóstico passa a mostrar **9/10 — SHA-256 PENDENTE**.
Isso é o estado real: a base ainda **não foi selada**.

## Selamento (decisão do responsável / Mesa — não feito nesta AT)
Hash SHA-256 dos bytes atuais de `biblioteca/BR/AL/alagoas.json` (commit base 52b5d45):

```
044616f641fbfca8823915390b4cb0819f5e33cd01bb2c3d8eb1ba6b43529441
```

Publicar `alagoas.sha256` com esse valor equivale a **declarar esta versão da base como a oficial selada**.
Por isso o arquivo **não foi criado** nesta correção: é um ato de governança, não de código.

## Fora de escopo (registrado para acompanhamento)
- A pasta `e1/` prevista para isolar a Trilha E1 não existe; a ESPEC-F2B está em `docs/`. Decisão cabe à Mesa.
- `index.html` referencia `./fonts/*.woff2`, mas a pasta `fonts/` não existe no repositório (o navegador usa fonte reserva).

## Teste
`python3 docs/tests/teste_at011.py` — abre o `index.html` real em navegador headless, em 5 cenários
(sem selo, selo correto, selo divergente, selo inválido, sem base). Requer `playwright` + Chromium.
