# Teste Técnico QA Júnior - Verzel Store

## Sobre

- **Candidata:** Elissandra Santos da Silva
- **Vaga:** QA Júnior - Verzel
- **Data:** 09/10/2026
- **Entrega avaliada:** Card `VZS-142` - Cupom de desconto e frete grátis (versão 2.3.0)

## Ambiente testado

- Loja: https://verzel-store.qa-test-verzel-store.workers.dev/
- Documentação: https://verzel-store.qa-test-verzel-store.workers.dev/documentacao
- API: https://verzel-store.qa-test-verzel-store.workers.dev/api

## Onde encontrar cada entrega

| Entrega | Arquivo |
|---|---|
| Cenários de teste (Gherkin) | [`docs/01-cenarios-de-teste.md`](docs/01-cenarios-de-teste.md) |
| Plano de testes | [`docs/02-plano-de-testes.md`](docs/02-plano-de-testes.md) |
| Execução dos testes (manual + exploratório + API) | [`docs/03-execucao.md`](docs/03-execucao.md) |
| Report de bugs | [`docs/04-bugs.md`](docs/04-bugs.md) |
| Exploração e ambiguidades | [`docs/05-exploracao.md`](docs/05-exploracao.md) |
| Evidências (screenshots/vídeos) | [`docs/evidencias/`](docs/evidencias/) |
| Automação Playwright | [`playwright/`](playwright/) |

## Resultado dos testes

- 11 cenários executados: **8 passaram** e **3 falharam**.
- Encontrei 2 bugs:
  - **BUG-001:** frete grátis não é aplicado com subtotal exatamente R$ 200,00 (afeta CT-006 e CT-008).
  - **BUG-002:** a API não aplica o limite de 5 unidades por produto (afeta CT-010).
- Detalhes e evidências em [`docs/04-bugs.md`](docs/04-bugs.md) e [`docs/03-execucao.md`](docs/03-execucao.md).

## Como rodar a automação

```bash
cd playwright
npm install
npx playwright install chromium
npm test
```

Outros comandos:

```bash
npm run test:headed   # roda com o navegador visível
npm run test:ui       # abre o modo interativo do Playwright
npm run report        # abre o relatório HTML da última execução
```

A suíte cobre 6 cenários (CT-001, CT-003, CT-005, CT-006, CT-009 e CT-011) e mais 2 testes que documentam os bugs conhecidos com falha esperada (`test.fail()`), um para o BUG-001 e outro para o BUG-002. Enquanto os bugs existirem, esses dois aparecem como "expected to fail"; quando forem corrigidos, o Playwright acusa que passaram, o que indica que a correção chegou.

## Ferramentas usadas

- Playwright com Node.js (automação)
- Google Chrome (execução manual)
- curl (testes de API)
- Markdown (documentação)
- Git e GitHub (versionamento)

## Uso de IA

Usei IA como apoio durante o teste. Ela me ajudou a entender a documentação, a montar e revisar os cenários em Gherkin, a conferir as contas e a escrever a automação. Os testes de API também saíram daí, com a IA me ajudando a montar os comandos no curl.

A execução na loja, com prints e vídeos, a escolha dos carrinhos, a decisão do que testar e a conferência dos resultados fui eu que fiz.

## Observações e premissas

- O ambiente é compartilhado com outros candidatos, mas cada pessoa tem o próprio carrinho. O carrinho fica apenas na aba do navegador (sessionStorage), então trocar de aba ou de navegador começa com o carrinho vazio.
- Existe apenas um cupom válido (BEMVINDO10) e um expirado (VERAO2026). Por isso, não foi possível testar o acúmulo de dois cupons válidos ao mesmo tempo.
- Os preços da loja terminam em ,90 ou ,00. Não encontrei nenhuma combinação que gerasse mais de 2 casas decimais, então não foi possível forçar um arredondamento. O CA11 foi verificado apenas quanto à exibição dos valores com 2 casas.
- Não existe combinação de produtos que resulte em R$ 200,10. Usei R$ 209,40 como o menor valor possível acima de R$ 200,00.
- O cupom com espaço no meio do código (por exemplo, "BEM VINDO10") é recusado. O CA02 trata apenas de espaços no início e no fim, então considerei esse comportamento correto.
- As ambiguidades que encontrei e como interpretei cada uma estão em [`docs/05-exploracao.md`](docs/05-exploracao.md).
