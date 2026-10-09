# Execução dos Testes - VZS-142

Registro do resultado de cada cenário executado. Um cenário por linha.

Status possíveis: Passou / Falhou / Bloqueado / Não executado.

## Resumo

- Data da execução: 08/10/2026
- Ambiente/versão: Verzel Store VZS-142 v2.3.0
- Navegador: Google Chrome (desktop)
- Total de cenários: 11 | Passou: 4 | Falhou: 0 | Bloqueado: 0 | Não executado: 7

Observação: o CT-002 também foi conferido pela API, como complemento, porque a tela normaliza o código digitado para maiúsculo e o print sozinho não prova a variação testada.

## 1. Testes manuais (interface)

| Cenário | Cobre | Status | Evidência | Observação |
|---|---|---|---|---|
| CT-001 | CA01, CA07, CA09 | Passou | [antes](evidencias/CT-001-antes.jpeg) e [depois](evidencias/CT-001-depois.jpeg) | Subtotal R$ 139,90, desconto R$ 13,99, frete R$ 19,90 e total R$ 145,81. |
| CT-002 | CA02 | Passou | [vídeo](evidencias/CT-002-variacoes-caixa-e-espacos.webm) | As três variações testadas no vídeo (bemvindo10, BemVindo10 e com espaços nas pontas) foram aceitas com desconto de R$ 13,99. A variação exata já havia sido coberta no CT-001. |
| CT-003 | CA03 | Passou | [print](evidencias/CT-003-cupom-inexistente.png) | Cupom DESCONTO10 recusado com a mensagem "Cupom inválido.", desconto R$ 0,00, frete R$ 19,90 e total R$ 159,80. |
| CT-004 | CA04 | Passou | [print](evidencias/CT-004-cupom-expirado.png) | Cupom VERAO2026 recusado com a mensagem "Cupom expirado.", desconto R$ 0,00, frete R$ 19,90 e total R$ 159,80. |
| CT-005 | CA05 | Não executado | | |
| CT-006 | CA06 | Não executado | | |
| CT-007 | CA07 | Não executado | | |
| CT-008 | CA08 | Não executado | | |
| CT-009 | CA10 | Não executado | | |
| CT-011 | CA11 | Não executado | | |

## 2. Testes de API

| Cenário | Endpoint | Status | Evidência | Observação |
|---|---|---|---|---|
| CT-002 (complemento) | POST /api/carrinho/calcular | Passou | saída do terminal | Variações de caixa e espaços nas pontas aceitas, com desconto de R$ 13,99. Código com espaço no meio (BEM VINDO10) é recusado com "Cupom inválido.". |
| CT-010 | POST /api/pedidos | Não executado | | Enviar 6 unidades de um produto deve retornar status 422 e código QUANTIDADE_MAXIMA_EXCEDIDA. |

## 3. Sessão exploratória

- **Charter:** investigar o comportamento do carrinho ao aplicar e remover cupom, com foco na dúvida do CA05 (segundo cupom) e no texto real das mensagens.
- **Duração:** achados obtidos durante a execução do CT-001 e do CT-002. Sessão exploratória dedicada ainda a realizar.
- **O que foi explorado:** aplicação e remoção de cupom na tela, desaparecimento do campo de digitação quando há cupom ativo, mensagem de cupom inválido e validação de caixa e espaços pela API.
- **Achados:** descritos em [`05-exploracao.md`](05-exploracao.md).

## 4. Falhas e desvios encontrados

Nenhum bug funcional encontrado até o momento. O único achado registrado é uma observação de usabilidade, detalhada em [`05-exploracao.md`](05-exploracao.md).

| Cenário | Bug | Link |
|---|---|---|
| - | Nenhum até o momento | - |
