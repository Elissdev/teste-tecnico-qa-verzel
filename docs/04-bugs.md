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
- Como o CA08 define que o frete grátis considera o subtotal antes do desconto, o cenário CT-008 usa esse mesmo carrinho e tende a falhar pelo mesmo motivo.
