# Plano de Testes - VZS-142

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
- Análise de valor limite (ex.: R$ 199,90 / R$ 200,00 / R$ 209,40)
- Tabela de decisão (cupom válido/expirado/inexistente vs frete)
- Teste exploratório (sessão com tempo definido e objetivo)
- Teste de API (contrato e códigos de erro)

## Tipos de teste

- Manual (interface)
- Exploratório
- API
- Automatizado (Playwright)

## Matriz de rastreabilidade (CA x Cenário)

| Critério | Descrição | Cenário(s) |
|---|---|---|
| CA01 | BEMVINDO10 = 10% | CT-001 |
| CA02 | aceitar variações de caixa e espaços nas pontas | CT-002 |
| CA03 | cupom inexistente não aplica desconto | CT-003 |
| CA04 | cupom expirado não aplica desconto | CT-004 |
| CA05 | apenas um cupom por vez | CT-005 |
| CA06 | frete grátis a partir de R$ 200,00 | CT-006 |
| CA07 | frete de R$ 19,90 e faltante para frete grátis | CT-001, CT-007 |
| CA08 | frete usa o subtotal antes do desconto | CT-008 |
| CA09 | desconto não incide sobre o frete | CT-001 |
| CA10 | máximo de 5 unidades (interface e API) | CT-009, CT-010 |
| CA11 | valores exibidos com 2 casas decimais | CT-011 |

## Riscos, premissas e limitações

### Riscos

- O ambiente é compartilhado com outros candidatos, então pode haver instabilidade momentânea durante a execução.
- O carrinho fica apenas na aba do navegador. Trocar de aba, navegador ou abrir janela anônima reinicia o carrinho, o que pode dificultar a reprodução de um passo.
- Valores com arredondamento podem gerar divergência de 1 centavo, então os cálculos precisam ser conferidos com atenção.

### Premissas

- A loja é fictícia e não guarda pedidos. O carrinho existe somente na aba do navegador. Tratei esse comportamento como esperado, conforme a documentação.
- Nenhum e-mail é enviado e nenhuma cobrança é feita, então esses fluxos não foram avaliados.
- Existe apenas um cupom válido (BEMVINDO10) e um expirado (VERAO2026). Por isso, não foi possível testar o acúmulo de dois cupons válidos ao mesmo tempo.
- Os produtos, preços e cupons são fixos e iguais para todos, e não há controle de estoque.

### Limitações

- Não existe combinação de produtos cujo subtotal resulte em R$ 200,10. Usei R$ 209,40 como o menor valor possível acima de R$ 200,00.
- Testes de carga, estresse e segurança ficaram fora do escopo, pois o ambiente é compartilhado com outros candidatos.
- A loja possui apenas 8 produtos fixos, o que limita a variedade de dados de teste.
- A API não guarda estado entre chamadas, então não validei cenários que dependam de dados de uma chamada anterior.
- Os preços da loja terminam em ,90 ou ,00. Por isso, não encontrei nenhuma combinação que gerasse mais de 2 casas decimais, e não foi possível forçar um arredondamento. O CA11 foi verificado apenas quanto à exibição dos valores com 2 casas.
