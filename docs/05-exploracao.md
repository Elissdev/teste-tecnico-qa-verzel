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

(itens encontrados na exploração: comportamentos inesperados, bugs, confirmações)
