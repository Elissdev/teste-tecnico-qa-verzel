# Cenários de Teste - VZS-142 (Cupom de desconto e frete grátis)

> **TEMPLATE.** Escreva os cenários em **Gherkin** (dado/quando/então) - é diferencial no teste.
> Use um bloco por cenário. Sugestão de estrutura:

## Convenções

- **ID:** `CT-001`, `CT-002`, ...
- **Cobre:** qual critério de aceite (CA01 - CA11) e/ou regra.
- **Tipo:** Funcional / Borda / Negativo / Exploratório / API.
- **Prioridade:** Alta / Média / Baixa.

---

## CT-001 - <nome curto do cenário>

- **Cobre:** CA01
- **Tipo:** Funcional
- **Prioridade:** Alta

```gherkin
Cenário: aplicar cupom BEMVINDO10
  Dado que tenho <produto/quantidade> no carrinho
  Quando aplico o cupom "BEMVINDO10"
  Então o desconto deve ser de 10% sobre o subtotal
  E o total deve ser subtotal - desconto + frete
```

---

<!-- TODO: adicione os demais cenários abaixo, cobrindo os 11 critérios de aceite,
     as bordas (R$200, R$199,90), os casos negativos (cupom inválido/expirado),
     o limite de 5 unidades e os casos de API.
     Não esqueça: CA08 (frete usa subtotal ANTES do desconto) e CA09 (desconto não incide no frete). -->
