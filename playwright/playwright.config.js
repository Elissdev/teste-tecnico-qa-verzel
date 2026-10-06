// Configuração base do Playwright.
// TODO (você vai ajustar junto comigo no Dia 5):
//  - baseURL é o endereço da loja (deixei pronto)
//  - escolha os navegadores que quer rodar (projects)
//  - documente no README como rodar

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
    // TODO: descomente se quiser rodar em outros navegadores
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
