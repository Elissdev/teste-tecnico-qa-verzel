# Execução dos Testes - VZS-142

Registro do resultado de cada cenário executado. Um cenário por linha.

Status possíveis: Passou / Falhou / Bloqueado / Não executado.

## Resumo

- Data da execução: 08/10/2026
- Ambiente/versão: Verzel Store VZS-142 v2.3.0
- Navegador: Google Chrome (desktop)
- Total de cenários: 11 | Passou: 6 | Falhou: 3 | Bloqueado: 0 | Não executado: 2

Observação: o CT-002 também foi conferido pela API, como complemento, porque a tela normaliza o código digitado para maiúsculo e o print sozinho não prova a variação testada.

## 1. Testes manuais (interface)

| Cenário | Cobre | Status | Evidência | Observação |
|---|---|---|---|---|
| CT-001 | CA01, CA07, CA09 | Passou | [antes](evidencias/CT-001-antes.jpeg) e [depois](evidencias/CT-001-depois.jpeg) | Subtotal R$ 139,90, desconto R$ 13,99, frete R$ 19,90 e total R$ 145,81. |
| CT-002 | CA02 | Passou | [vídeo](evidencias/CT-002-variacoes-caixa-e-espacos.webm) | As três variações testadas no vídeo (bemvindo10, BemVindo10 e com espaços nas pontas) foram aceitas com desconto de R$ 13,99. A variação exata já havia sido coberta no CT-001. |
| CT-003 | CA03 | Passou | [print](evidencias/CT-003-cupom-inexistente.png) | Cupom DESCONTO10 recusado com a mensagem "Cupom inválido.", desconto R$ 0,00, frete R$ 19,90 e total R$ 159,80. |
| CT-004 | CA04 | Passou | [print](evidencias/CT-004-cupom-expirado.png) | Cupom VERAO2026 recusado com a mensagem "Cupom expirado.", desconto R$ 0,00, frete R$ 19,90 e total R$ 159,80. |
| CT-005 | CA05 | Passou | [antes](evidencias/CT-005-antes-de-remover-cupom.png) e [depois](evidencias/CT-005-cupom-removido.png) | Após remover o cupom, o desconto volta a R$ 0,00, frete R$ 19,90 e total R$ 159,80. |
| CT-006 | CA06 | Falhou | [199,90](evidencias/CT-006-carrinho-199-90.png), [200,00](evidencias/CT-006-carrinho-200-00.png) e [209,40](evidencias/CT-006-carrinho-209-40.png) | Subtotal R$ 199,90: frete R$ 19,90 (correto). Subtotal R$ 209,40: frete grátis (correto). Subtotal exatamente R$ 200,00: frete R$ 19,90, quando deveria ser grátis. Ver BUG-001. |
| CT-007 | CA07 | Passou | [print](evidencias/CT-007-faltante-frete-gratis.png) | Frete R$ 19,90 e mensagem "Faltam R$ 60,10 para o frete grátis." exibida corretamente. |
| CT-008 | CA08 | Falhou | [principal](evidencias/CT-008-frete-gratis-com-desconto.png) e [complemento](evidencias/CT-008-complemento-209-40.png) | No carrinho de R$ 200,00 com cupom, o desconto foi R$ 20,00, mas o frete veio R$ 19,90 e o total R$ 199,90, quando o esperado era frete grátis e total R$ 180,00. Mesma causa do BUG-001. No complemento com subtotal R$ 209,40, o desconto foi R$ 20,94, o frete grátis e o total R$ 188,46, confirmando que a regra em si funciona fora do valor de borda. |
| CT-009 | CA10 | Não executado | | |
| CT-011 | CA11 | Não executado | | |

## 2. Testes de API

| Cenário | Endpoint | Status | Evidência | Observação |
|---|---|---|---|---|
| CT-002 (complemento) | POST /api/carrinho/calcular | Passou | saída do terminal | Variações de caixa e espaços nas pontas aceitas, com desconto de R$ 13,99. Código com espaço no meio (BEM VINDO10) é recusado com "Cupom inválido.". |
| CT-010 | POST /api/pedidos | Falhou | [saída do terminal](evidencias/CT-010-api-6-unidades.txt) | Com 6 unidades de um produto a API respondeu HTTP 201 e criou o pedido, em vez de retornar 422 com QUANTIDADE_MAXIMA_EXCEDIDA. As demais validações (item duplicado, quantidade inválida e produto inexistente) retornam 422 corretamente. Ver BUG-002. |

## 3. Sessão exploratória

- **Charter:** investigar o comportamento do carrinho ao aplicar e remover cupom, com foco na dúvida do CA05 (segundo cupom) e no texto real das mensagens.
- **Duração:** achados obtidos durante a execução do CT-001 e do CT-002. Sessão exploratória dedicada ainda a realizar.
- **O que foi explorado:** aplicação e remoção de cupom na tela, desaparecimento do campo de digitação quando há cupom ativo, mensagem de cupom inválido e validação de caixa e espaços pela API.
- **Achados:** descritos em [`05-exploracao.md`](05-exploracao.md).

## 4. Falhas e desvios encontrados

Encontrei dois bugs funcionais: o frete grátis com subtotal exatamente R$ 200,00 (BUG-001) e o limite de 5 unidades não aplicado na API (BUG-002).

| Cenário | Bug | Link |
|---|---|---|
| CT-006 | BUG-001 | [ver](04-bugs.md#bug-001) |
| CT-008 | BUG-001 | [ver](04-bugs.md#bug-001) |
| CT-010 | BUG-002 | [ver](04-bugs.md#bug-002) |
