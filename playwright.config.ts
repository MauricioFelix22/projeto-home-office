import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para automação de testes
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Tempo máximo para executar um teste */
  timeout: 30 * 1000,
  
  /* Tempo de espera para cada ação (click, fill, etc) */
  expect: {
    timeout: 5000
  },
  
  /* Executar testes em paralelo */
  fullyParallel: true,
  
  /* Falhar o build se houver testes com only ou skip */
  forbidOnly: !!process.env.CI,
  
  /* Não executar testes em CI se não houver testes */
  retries: process.env.CI ? 2 : 0,
  
  /* Número de workers para execução paralela */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter para usar */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Configurações compartilhadas para todos os projetos */
  use: {
    /* URL base para usar em navegação */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    /* Coletar trace quando retentar o teste falho */
    trace: 'on-first-retry',
    
    /* Screenshot apenas quando falhar */
    screenshot: 'only-on-failure',
    
    /* Video apenas quando falhar */
    video: 'retain-on-failure',
    
    /* Headless mode */
    headless: true,
    
    /* Timeout para ações */
    actionTimeout: 15000,
    
    /* Timeout para navegação */
    navigationTimeout: 30000,
  },

  /* Configurar projetos para diferentes navegadores */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Testes mobile */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Servidor de desenvolvimento local (opcional) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
