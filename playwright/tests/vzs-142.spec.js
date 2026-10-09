// Automação dos cenários da entrega VZS-142 (cupom de desconto e frete grátis).
//
// Seletores usados:
//  - produtos: article[aria-labelledby="nome-<id>"] e botão "Adicionar ao carrinho"
//  - resumo do pedido: [data-valor="subtotal" | "desconto" | "frete" | "total"]
//  - cupom: input #campo-cupom, botão "Aplicar cupom" e mensagem #mensagem-cupom
//
// O carrinho fica no sessionStorage, então cada teste começa com o carrinho vazio.

const { test, expect } = require('@playwright/test');

const PRODUTOS = {
  camiseta: { id: 'P001', nome: 'Camiseta Essencial' },
  calca: { id: 'P002', nome: 'Calça Jeans Slim' },
  tenis: { id: 'P003', nome: 'Tênis Casual Urbano' },
  bone: { id: 'P004', nome: 'Boné Aba Curva' },
  mochila: { id: 'P005', nome: 'Mochila Urbana 20L' },
  garrafa: { id: 'P008', nome: 'Garrafa Térmica 750ml' },
};

async function adicionarProduto(page, produto, vezes = 1) {
  const botao = page
    .locator(`article[aria-labelledby="nome-${produto.id}"]`)
    .getByRole('button', { name: 'Adicionar ao carrinho' });

  for (let i = 0; i < vezes; i++) {
    await botao.click();
  }
}

async function abrirCarrinho(page) {
  await page.goto('/carrinho');
  await expect(page.getByRole('heading', { name: 'Carrinho', level: 1 })).toBeVisible();
}

async function aplicarCupom(page, codigo) {
  await page.locator('#campo-cupom').fill(codigo);
  await page.getByRole('button', { name: 'Aplicar cupom' }).click();
}

test.describe('Cupom e frete - VZS-142', () => {
  test('CT-001 - aplicar o cupom BEMVINDO10 e conferir desconto, frete e total', async ({ page }) => {
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.calca);
    await abrirCarrinho(page);
    await aplicarCupom(page, 'BEMVINDO10');

    await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 139,90');
    await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 13,99');
    await expect(page.locator('[data-valor="frete"]')).toHaveText('R$ 19,90');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 145,81');
  });

  test('CT-003 - cupom inexistente mostra a mensagem e nao aplica desconto', async ({ page }) => {
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.calca);
    await abrirCarrinho(page);
    await aplicarCupom(page, 'DESCONTO10');

    await expect(page.locator('#mensagem-cupom')).toHaveText('Cupom inválido.');
    await expect(page.locator('[data-valor="desconto"]')).toHaveText('R$ 0,00');
    await expect(page.locator('[data-valor="frete"]')).toHaveText('R$ 19,90');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 159,80');
  });

  test('CT-005 - remover o cupom aplicado e voltar sem desconto', async ({ page }) => {
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.calca);
    await abrirCarrinho(page);
    await aplicarCupom(page, 'BEMVINDO10');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 145,81');

    await page.getByRole('button', { name: 'Remover cupom' }).click();

    await expect(page.locator('[data-valor="desconto"]')).toHaveText('R$ 0,00');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 159,80');
  });

  test('CT-006 - frete gratis com subtotal a partir de R$ 200,00', async ({ page }) => {
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.tenis);
    await adicionarProduto(page, PRODUTOS.bone);
    await abrirCarrinho(page);

    await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 239,80');
    await expect(page.locator('[data-valor="frete"]')).toHaveText('Grátis');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 239,80');
  });

  test('CT-009 - bloquear a sexta unidade do mesmo produto', async ({ page }) => {
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.camiseta);
    await abrirCarrinho(page);

    const aumentar = page.getByRole('button', { name: 'Aumentar quantidade de Camiseta Essencial' });
    for (let i = 0; i < 4; i++) {
      await aumentar.click();
    }

    await expect(page.getByText('Limite de 5 unidades por produto.')).toBeVisible();
    await expect(aumentar).toBeDisabled();
    await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 299,50');
  });

  test('CT-011 - exibir os valores com duas casas decimais', async ({ page }) => {
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.tenis);
    await abrirCarrinho(page);
    await aplicarCupom(page, 'BEMVINDO10');

    await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 189,90');
    await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 18,99');
    await expect(page.locator('[data-valor="frete"]')).toHaveText('R$ 19,90');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 190,81');
  });

  // Os dois testes abaixo documentam bugs conhecidos e estão marcados como falha esperada.
  // Enquanto o bug existir, eles aparecem como "expected to fail". Quando o bug for corrigido,
  // o Playwright acusa que o teste passou, o que mostra que a correção chegou.

  test('CT-006 (borda) - frete gratis com subtotal exatamente R$ 200,00 [BUG-001]', async ({ page }) => {
    test.fail();
    await page.goto('/');
    await adicionarProduto(page, PRODUTOS.mochila);
    await adicionarProduto(page, PRODUTOS.garrafa, 2);
    await abrirCarrinho(page);

    await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 200,00');
    await expect(page.locator('[data-valor="frete"]')).toHaveText('Grátis');
    await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 200,00');
  });

  test('CT-010 - API deve recusar 6 unidades do mesmo produto [BUG-002]', async ({ request }) => {
    test.fail();
    const resposta = await request.post('/api/pedidos', {
      data: {
        cliente: {
          nome: 'Elissandra Silva',
          email: 'elissandra.teste@example.com',
          cep: '01001000',
        },
        itens: [{ produtoId: 'P001', quantidade: 6 }],
      },
    });

    expect(resposta.status()).toBe(422);
    const corpo = await resposta.json();
    expect(corpo.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
  });
});
