import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Carrega variáveis do arquivo .env
dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './tests',

  /* Tempo máximo de execução por teste */
  timeout: 30000,

  /* Expect timeout */
  expect: {
    timeout: 15000,
  },

  /* Executa testes em paralelo */
  fullyParallel: true,

  /* Falha se existir test.only no código */
  forbidOnly: !!process.env.CI,

  /* Retries em CI */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* Relatório */
  reporter: 'html',

  /* Configurações padrão de execução */
  use: {
    baseURL: 'https://iadashsales.bubbleapps.io',

    // viewport grande para evitar elementos fora da tela
    viewport: { width: 1920, height: 1080 },

    // grava trace quando falhar
    trace: 'on-first-retry',

    // screenshot quando falhar
    screenshot: 'only-on-failure',

    // grava vídeo quando falhar
    video: 'retain-on-failure',
  },

  /* Browsers */
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

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
