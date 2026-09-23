# Varredura de 23/09/2026: pastas do computador do Kenny

**Modo:** somente leitura. Nenhum arquivo do computador foi alterado.
**Pastas autorizadas:** OneDrive\Documentos\{CLAUDE, CHATGPT, ORACULO, Testes site oraculo, kenny site novo}, OneDrive\Área de Trabalho\{oraculo, Oráculo Imobiliário BR, IA claude} e Downloads.

## 1. Onde está o código do widget WordPress

- `Documentos\CLAUDE\codigo elementor html hoje.txt`: 1.794 linhas, 06/09/2026. É a versão mais recente encontrada.
- `Documentos\CLAUDE\ultimo codigo oraculo for elementor.txt`: 1.601 linhas, 31/08/2026.
- `Documentos\CLAUDE\oraculo-widget-reorganizado*.html`: versões de 28/08.
- **O "Texto colado(4).txt" (2.027 linhas) não foi encontrado.** O documento de revisão de 07/09 cita esse arquivo, e ele é maior que qualquer versão salva. As referências de linha do documento não batem com os arquivos encontrados.

## 2. Conferência dos achados da revisão de 07/09 contra o código de 06/09

| Achado | Status | Evidência (arquivo de 06/09) |
|---|---|---|
| A. checklist salvo numa chave global | **CONFIRMADO no código** (falta o teste em execução) | chave fixa `oraculo_checks`, lida na linha 1526 e gravada na linha 1661 |
| B. ICD = marcados ÷ total | **CONFIRMADO** | linhas 1642–1657. A tela já mostra "X de Y itens informados" (linha 1657) e um aviso de que o ICD "não é nota de segurança" (linha 498) |
| C. hash com Date.now() e só os IDs | **CONFIRMADO** | linha 1767 |
| D. protocolo regenerado automaticamente | **NÃO CONFIRMADO nesta versão** | aqui o protocolo só é gerado no clique de "Gerar" (linha 1744). Pode existir na versão de 2.027 linhas |
| ITBI com fallback de Maceió | **CONFIRMADO, com a devida sinalização** | linha 1336: "estimativa padrão baseada em Maceió/AL — não confirmado para este município" |

## 3. Achado novo: erro jurídico no widget

Linha 1680: "EXIGE outorga — **venda nula** sem ela (art. 1.647 CC)".
Pelo CC, art. 1.649 (conferido no Planalto em 23/09), a falta de autorização torna o ato **anulável**, não nulo. A própria `matriz_casos_especiais.json` da base diz "ANULÁVEL - não nulo".
→ **O widget contradiz a matriz.** Corrigir o texto, porque é uma regra de negócio, não um ajuste de engenharia.

## 4. Material de naturezas encontrado (a pesquisa do Kenny)

1. **`NATUREZA_DOCUMENTAL` no widget** (linhas 733 a 1006): **24 naturezas em 4 categorias**:
   - **Título pleno:** registro imobiliário, escritura, carta de arrematação/adjudicação, formal de partilha, partilha em divórcio, legitimação fundiária, usucapião reconhecida, doação, outras sentenças;
   - **Instrumento preparatório:** promessa, cessão de direitos, recibo/sinal, permuta/dação, adjudicação compulsória, incorporação;
   - **Situação fática:** posse sem título, locação/comodato, comprovantes da cadeia, ata notarial de posse;
   - **Situação especial:** fração ideal, imóvel público, concessão de uso, inventário sem partilha, situação empresarial.
   Cada natureza traz descrição, destino, itens extras e gatilhos.
2. **`Downloads\naturezas_documentais_imoveis.pdf`** (27/08): um guia com a mesma estrutura em 3 grupos.
3. **`Área de Trabalho\oraculo\...\src\core\niveis.json`** (08/2026): uma versão numerada de **1 a 8** (o MAPA atual usa de 0 a 6).

## 5. Pontos de atenção para a conciliação

- **Duas taxonomias se complementam:** a do widget diz **"o que você tem na mão"** (o instrumento), e a do MAPA diz **"em que estágio o imóvel está"**. O Selo (ADR-004) pode usar as duas: o nível **e** a natureza específica.
- **Duas numerações diferentes** (MAPA de 0 a 6 e niveis.json de 1 a 8). Isso precisa de uma decisão para ficar uma só.
- **Rótulos de risco:** o niveis.json ("ALTISSIMO", "CRITICO") e o PDF ("Risco Médio", "Risco Crítico") usam classificação de risco. A matriz urbana registra o veto a "Baixo/Médio/Alto" (VIS-001), e o VIS-001 §10 proíbe score de segurança. Esses rótulos **não devem** ir para o produto.
- **A categoria da escritura:** tanto o widget quanto o PDF colocam "escritura de compra e venda" como título pleno / "nível máximo". Pelo CC 1.245, **sem registro** ela é N2 (o próprio texto do widget reconhece isso). Sugestão: tratar a escritura **registrada** como pleno e a **sem registro** como N2.
- **Números não conferidos** no niveis.json: "ITCMD 4%", "CAT 90d" e "Laudêmio 5%". Devem ser conferidos na fonte antes de qualquer uso (Regra 3).
- **ITBI municipal:** o widget tem as alíquotas de 9 municípios de AL com a fonte legal citada (linhas 1323 a 1331). É um insumo pronto para a Etapa 3, mas **cada alíquota precisa ser reconferida** na lei municipal antes de entrar na matriz.

## 6. O que o site publicado mostra hoje

Hoje o kennycorretorimoveis.com.br/oraculo é o app Next.js (projetos `kenny-imoveis-v*`), com Raio-X por tipo de imóvel e vendedor, e consulta MF/FMP. **Não tem** natureza, ICD, protocolo, hash nem PDF. O widget WordPress com esses recursos **não está no ar**.
