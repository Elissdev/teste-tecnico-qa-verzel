# Plano de Testes - VZS-142

## Objetivo

Validar a entrega do card VZS-142 da Verzel Store, que adiciona ao carrinho a aplicação de cupom de desconto e a regra de frete grátis, conferindo os 11 critérios de aceite da documentação. Quero conferir se os cálculos de desconto, frete e total estão certos e se as validações de cupom, limite de unidades e dados do cliente funcionam na tela e na API.

## Escopo

**Dentro do escopo:**
- Aplicação, remoção e validação de cupom de desconto (cupom válido, inexistente e expirado)
- Regra de frete grátis e cálculo do valor faltante para o frete grátis
- Cálculo de subtotal, desconto, frete e total
- Limite de 5 unidades por produto, na interface e na API
- Exibição dos valores com 2 casas decimais
- Comportamento e códigos de erro da API

**Fora do escopo** 
- Testes de carga, estresse e segurança
- Login, cadastro, pagamento online, consulta de pedidos

## Técnicas de teste que vou usar

- **Partição de equivalência:** separar os carrinhos em duas faixas, abaixo e a partir de R$ 200,00, para o teste do frete.
- **Análise de valor limite:** testar os valores R$ 199,90, R$ 200,00 e R$ 209,40, que ficam em volta do limite do frete grátis.
- **Tabela de decisão:** cruzar cupom válido, expirado e inexistente com a regra de frete, para cobrir as combinações dos critérios.
- **Teste exploratório:** sessão com tempo definido e objetivo, para investigar comportamentos não descritos na documentação, como a tentativa de aplicar um segundo cupom.
- **Teste de API:** conferir o contrato dos endpoints e os códigos de erro documentados (status 400, 404, 405 e 422).

## Tipos de teste

- Manual (Na interface)
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
