# Report de Bugs - VZS-142

Um bug por seção.

Legenda:

- **Severidade** = impacto técnico (Crítica / Alta / Média / Baixa).
- **Prioridade** = urgência de correção (Alta / Média / Baixa).

---

## BUG-001 - Frete grátis não é aplicado com subtotal exatamente R$ 200,00

- **Severidade:** Alta
- **Prioridade:** Alta
- **Critério violado:** CA06
- **Ambiente:** Verzel Store v2.3.0 | Google Chrome (desktop) | 08/10/2026

**Pré-condição:** carrinho com subtotal exatamente R$ 200,00.

**Passos para reproduzir:**
1. Abra a loja e adicione 1x Mochila Urbana 20L (P005) e 2x Garrafa Térmica 750ml (P008) ao carrinho.
2. Abra a página do carrinho.
3. Confira o resumo do pedido.

**Resultado esperado:** frete grátis, total de R$ 200,00, conforme o CA06 ("O frete é grátis para compras com subtotal a partir de R$ 200,00, inclusive.").

**Resultado obtido:** frete de R$ 19,90 e total de R$ 219,90. A tela ainda exibe a mensagem "Faltam R$ 0,00 para o frete grátis.".

**Evidência:** [`evidencias/CT-006-carrinho-200-00.png`](evidencias/CT-006-carrinho-200-00.png)

**Observações:**
- Com subtotal de R$ 199,90 o frete é R$ 19,90 (correto) e com R$ 209,40 o frete é grátis (correto). A falha ocorre apenas no valor exatamente igual a R$ 200,00, o que indica uma comparação estrita na regra (maior que 200 em vez de maior ou igual a 200).
- O mesmo comportamento foi confirmado pela API `POST /api/carrinho/calcular`: para subtotal 200,00, a resposta traz `frete: 19.9` e `freteGratis: false`. O campo `valorFaltanteFreteGratis` retorna 0, o que é incoerente, pois informa que não falta nada para o frete grátis e mesmo assim cobra o frete.
- Como o CA08 define que o frete grátis considera o subtotal antes do desconto, o cenário CT-008 usa esse mesmo carrinho e falhou pelo mesmo motivo: com o cupom BEMVINDO10, o desconto foi R$ 20,00, mas o frete continuou R$ 19,90 e o total ficou R$ 199,90, em vez de frete grátis e total R$ 180,00. Evidência: [`evidencias/CT-008-frete-gratis-com-desconto.png`](evidencias/CT-008-frete-gratis-com-desconto.png).

---

## BUG-002 - API não aplica o limite de 5 unidades por produto

- **Severidade:** Alta
- **Prioridade:** Alta
- **Critério violado:** CA10
- **Ambiente:** Verzel Store v2.3.0 | API | 08/10/2026

**Pré-condição:** nenhuma.

**Passos para reproduzir:**
1. Envie uma requisição `POST /api/pedidos` com um cliente válido e um item com quantidade acima de 5, por exemplo 6 unidades de P001.

```bash
curl -i -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/pedidos" \
  -H "Content-Type: application/json" \
  -d '{"cliente":{"nome":"Elissandra Silva","email":"elissandra.teste@example.com","cep":"01001000"},"itens":[{"produtoId":"P001","quantidade":6}]}'
```

**Resultado esperado:** HTTP 422 com código `QUANTIDADE_MAXIMA_EXCEDIDA`, conforme o CA10 ("Cada produto pode ter no máximo 5 unidades por pedido. A regra vale para a interface e para a API.") e a tabela de erros da documentação ("A quantidade de um produto é maior que 5.").

**Resultado obtido:** HTTP 201 e o pedido é criado normalmente com as 6 unidades.

**Evidência:** [`evidencias/CT-010-api-6-unidades.txt`](evidencias/CT-010-api-6-unidades.txt)

**Observações:**
- O problema foi reproduzido também com 7, 50 e 100 unidades, sempre com HTTP 201.
- As outras validações da API funcionam: item duplicado, quantidade inválida (0 ou negativa) e produto inexistente retornam HTTP 422 com o código correspondente. A falha é específica da checagem de quantidade máxima.
- Na interface o limite funciona: ao chegar a 5 unidades, o botão de aumentar é bloqueado e aparece a mensagem "Limite de 5 unidades por produto." (ver CT-009). A divergência está apenas na API.
