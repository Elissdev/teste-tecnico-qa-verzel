# Cenários de Teste - VZS-142 (Cupom de desconto e frete grátis)

Cenários derivados dos critérios de aceite da entrega de cupom de desconto e frete grátis da Verzel Store. Cada cenário indica o critério de aceite que cobre, o tipo de teste e a prioridade.

## Convenções

- **ID:** CT-001, CT-002, ...
- **Cobre:** critério de aceite (CA01 a CA11) ou regra de negócio
- **Tipo:** Funcional / Borda / Negativo / Exploratório / API
- **Prioridade:** Alta / Média / Baixa

---

## CT-001 - Aplicar cupom BEMVINDO10

- **Cobre:** CA01, CA07, CA09
- **Tipo:** Funcional
- **Prioridade:** Alta

```gherkin
Cenário: aplicar cupom BEMVINDO10
  Dado que adicionei 1 unidade de "Calça Jeans Slim" (P002) no carrinho
  Quando aplico o cupom "BEMVINDO10"
  Então o desconto deve ser R$ 13,99
  E o frete deve ser R$ 19,90
  E o total deve ser R$ 145,81
```

---

## CT-002 - Aceitar cupom com variações de caixa e espaços

- **Cobre:** CA02
- **Tipo:** Funcional
- **Prioridade:** Média

```gherkin
Esquema do Cenário: aceitar o cupom com variações de caixa e espaços nas pontas
  Dado que adicionei 1 unidade de "Calça Jeans Slim" (P002) no carrinho
  Quando aplico o cupom "<codigo>"
  Então o desconto deve ser R$ 13,99

  Exemplos:
    | codigo           |
    | BEMVINDO10       |
    | bemvindo10       |
    | BemVindo10       |
    | "  BEMVINDO10  " |
```

---

## CT-003 - Cupom inexistente

- **Cobre:** CA03
- **Tipo:** Negativo
- **Prioridade:** Alta

```gherkin
Cenário: cupom inexistente não aplica desconto
  Dado que adicionei 1 unidade de "Calça Jeans Slim" (P002) no carrinho
  Quando aplico o cupom "DESCONTO10"
  Então a mensagem "Cupom inválido." é mostrada
  E o desconto deve ser R$ 0,00
  E o frete deve ser R$ 19,90
  E o total deve ser R$ 159,80
```

---

## CT-004 - Cupom expirado

- **Cobre:** CA04
- **Tipo:** Negativo
- **Prioridade:** Alta

```gherkin
Cenário: cupom expirado não aplica desconto
  Dado que adicionei 1 unidade de "Calça Jeans Slim" (P002) no carrinho
  Quando aplico o cupom "VERAO2026"
  Então a mensagem "Cupom expirado." é mostrada
  E o desconto deve ser R$ 0,00
  E o frete deve ser R$ 19,90
  E o total deve ser R$ 159,80
```

---

## CT-005 - Remover cupom aplicado

- **Cobre:** CA05
- **Tipo:** Funcional
- **Prioridade:** Alta

```gherkin
Cenário: remover o cupom aplicado e voltar sem desconto
  Dado que adicionei 1 unidade de "Calça Jeans Slim" (P002) no carrinho
  E apliquei o cupom "BEMVINDO10"
  Quando removo o cupom
  Então o desconto deve ser R$ 0,00
  E o total deve ser R$ 159,80
```

---

## CT-006 - Frete grátis a partir de R$ 200,00

- **Cobre:** CA06
- **Tipo:** Borda
- **Prioridade:** Alta

```gherkin
Esquema do Cenário: frete grátis a partir de R$ 200,00
  Dado que adicionei ao carrinho <carrinho>
  Quando o carrinho é calculado
  Então o frete deve ser R$ <frete>

  Exemplos:
    | carrinho                                                           | frete |
    | 1x Boné (P004) + 1x Mochila (P005) + 1x Garrafa (P008) = R$ 199,90 | 19,90 |
    | 1x Mochila (P005) + 2x Garrafa (P008) = R$ 200,00                  | 0,00  |
    | 1x Camiseta (P001) + 5x Meias (P006) = R$ 209,40                   | 0,00  |
```

---

## CT-007 - Informar quanto falta para o frete grátis

- **Cobre:** CA07
- **Tipo:** Funcional
- **Prioridade:** Alta

```gherkin
Cenário: informar quanto falta para o frete grátis
  Dado que adicionei 1 unidade de "Calça Jeans Slim" (P002) no carrinho
  Quando o carrinho é calculado
  Então o frete deve ser R$ 19,90
  E a mensagem "Faltam R$ 60,10 para o frete grátis." deve ser exibida
```

---

## CT-008 - Frete grátis considera o subtotal antes do desconto

- **Cobre:** CA08
- **Tipo:** Funcional
- **Prioridade:** Alta

```gherkin
Cenário: frete grátis considera o subtotal antes do desconto
  Dado que adicionei 1x "Mochila Urbana 20L" (P005) e 2x "Garrafa Térmica 750ml" (P008) no carrinho
  Quando aplico o cupom "BEMVINDO10"
  Então o desconto deve ser R$ 20,00
  E o frete deve ser R$ 0,00
  E o total deve ser R$ 180,00
```

---

## CT-009 - Bloquear a sexta unidade do mesmo produto

- **Cobre:** CA10
- **Tipo:** Borda
- **Prioridade:** Alta

```gherkin
Cenário: bloquear a sexta unidade do mesmo produto
  Dado que adicionei 5 unidades de "Camiseta Essencial" (P001) no carrinho
  Quando tento adicionar uma sexta unidade do mesmo produto
  Então não deve ser possível adicionar a sexta unidade
  E a mensagem "Limite de 5 unidades por produto." deve ser exibida
```

---

## CT-010 - Limite de 5 unidades na API

- **Cobre:** CA10
- **Tipo:** API
- **Prioridade:** Alta

```gherkin
Cenário: API deve responder com erro
  Dado que envio uma requisição para "POST /api/pedidos" com 6 unidades de "Camiseta Essencial" (P001)
  Quando a API processa a requisição
  Então a resposta deve ter status 422
  E o código do erro deve ser "QUANTIDADE_MAXIMA_EXCEDIDA"
```

---

## CT-011 - Exibir valores com duas casas decimais

- **Cobre:** CA11
- **Tipo:** Funcional
- **Prioridade:** Média

```gherkin
Cenário: exibir valores com duas casas decimais
  Dado que adicionei 1 unidade de "Tênis Casual Urbano" (P003) no carrinho
  Quando aplico o cupom "BEMVINDO10"
  Então o subtotal deve ser exibido como "R$ 189,90"
  E o desconto deve ser exibido como "R$ 18,99"
  E o frete deve ser exibido como "R$ 19,90"
  E o total deve ser exibido como "R$ 190,81"
```
