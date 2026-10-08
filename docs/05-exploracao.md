# Exploração e Ambiguidades - VZS-142

Este documento registra duas coisas:

1. Dúvidas que a documentação não responde com clareza (ambiguidades).
2. As sessões de teste exploratório (charter, tempo e achados).

## 1. Itens a confirmar

Perguntas em aberto. Cada item deve ser verificado na prática antes de virar cenário.

### CA05 - Cupom

- Com o cupom "BEMVINDO10" aplicado, o que acontece ao tentar aplicar um segundo cupom?
  - Aparece mensagem? Qual exatamente?
  - O segundo substitui o primeiro, ou é bloqueado?
  - A tela exige remover o cupom atual antes de aplicar outro?

**Verificado durante a execução do CT-001:** ao aplicar o cupom, o campo de digitação é substituído pela mensagem "Cupom BEMVINDO10 aplicado." e por um botão "Remover cupom". Não existe campo para digitar um segundo cupom enquanto um está ativo, então a troca só é possível removendo o atual. Isso confirma o comportamento descrito no CA05.

## 2. Sessões exploratórias

### Sessão 1

- **Charter:** (o que pretendo investigar e por quê)
- **Duração:** (ex.: 30 minutos)
- **O que foi explorado:**
- **Achados:**

## 3. Achados

### Observação de usabilidade - mensagem de cupom não some ao digitar

- **Onde:** carrinho, campo de cupom de desconto.
- **O que acontece:** após clicar em "Aplicar cupom" com um código inválido, a mensagem "Cupom inválido." permanece na tela enquanto o usuário continua digitando. Ela só desaparece quando o cupom é removido ou quando um cupom válido é aplicado.
- **Relação com os critérios:** não viola nenhum critério de aceite. É uma questão de usabilidade, não um bug funcional.
- **Evidência:** vídeo gravado durante a execução do CT-002.

### Confirmação - espaço no meio do código não é ignorado

- Um cupom digitado como "BEM VINDO10" (com espaço no meio) é recusado com "Cupom inválido.". Isso está de acordo com o CA02, que trata apenas de espaços no início e no fim do código.
