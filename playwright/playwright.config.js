// Configuração do Playwright para o teste técnico QA Júnior - Verzel Store.
//
// - baseURL aponta para a loja de teste.
// - 1 worker, porque o ambiente é compartilhado entre candidatos.
// - Roda no Chromium por padrão.

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Ambiente é COMPARTILHADO entre candidatos: evite rodar muitos testes em paralelo
  // se isso puder interferir. Para este teste, 1 worker é uma escolha segura.
  workers: 1,
  retries: 0,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'https://verzel-store.qa-test-verzel-store.workers.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Para rodar também em Firefox/WebKit, descomente as linhas abaixo.
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
