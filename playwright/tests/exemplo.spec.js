// TODO (Dia 5): aqui você escreve os testes automatizados (mínimo 3 cenários).
//
// Dica: comece pelos cenários mais "felizes" e estáveis, por exemplo:
//   1) aplicar cupom BEMVINDO10 e conferir o desconto/total
//   2) frete grátis a partir de R$ 200,00
//   3) mensagem de cupom inválido
//
// Use boas práticas de seletor: evite seletores frágeis; prefira getByRole /
// getByText / data-testid. Exemplo de esqueleto:

const { test, expect } = require('@playwright/test');

test.describe('Cupom e frete - VZS-142', () => {
  test.skip('CT-XXX - TODO: descreva o cenário aqui', async ({ page }) => {
    await page.goto('/');
    // TODO: seus passos e asserções
    await expect(page).toHaveTitle(/Verzel Store/);
  });
});
