# Plano / Estratégia de Testes - VZS-142

> **TEMPLATE.** Documento curto explicando COMO você vai testar. Ideal: 1 página.

## Objetivo

TODO: o que essa entrega resolve e o que você pretende validar.

## Escopo

**Dentro do escopo:**
- TODO: ex.: cupons, frete grátis, limite de 5 unidades, validação de dados do cliente, API...

**Fora do escopo** (o PDF diz explicitamente):
- Testes de carga, estresse e segurança
- Login, cadastro, pagamento online, consulta de pedidos

## Técnicas de teste que vou usar

TODO: explique brevemente e diga onde aplica. Sugestões:
- Partição de equivalência (ex.: subtotal < 200 vs >= 200)
- Análise de valor limite (ex.: R$ 199,90 / R$ 200,00 / R$ 200,10)
- Tabela de decisão (cupom válido/expirado/inexistente × frete)
- Teste exploratório (sessão com tempo definido e objetivo)
- Teste de API (contrato e códigos de erro)

## Tipos de teste

- Manual (UI)
- Exploratório
- API
- Automatizado (Playwright)

## Matriz de rastreabilidade (CA x Cenário)

> Mostra que seus testes cobrem todos os critérios. Preencha conforme criar os cenários.

| Critério | Descrição | Cenário(s) |
|---|---|---|
| CA01 | BEMVINDO10 = 10% | TODO |
| CA02 | case-insensitive + trim | TODO |
| CA03 | cupom inexistente | TODO |
| CA04 | cupom expirado | TODO |
| CA05 | 1 cupom por vez | TODO |
| CA06 | frete grátis >= R$200 | TODO |
| CA07 | frete R$19,90 + faltante | TODO |
| CA08 | frete usa subtotal antes do desconto | TODO |
| CA09 | desconto não incide no frete | TODO |
| CA10 | máx. 5 unidades (UI e API) | TODO |
| CA11 | arredondamento 2 casas | TODO |

## Riscos e premissas

TODO: o que pode dar errado, o que você assumiu como verdade.
