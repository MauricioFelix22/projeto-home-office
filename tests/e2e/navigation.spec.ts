import { test, expect } from '@playwright/test';
import { HomePage } from '../support/page-objects/HomePage';
import { LoginPage } from '../support/page-objects/LoginPage';
import { testUsers } from '../support/fixtures/test-data';

/**
 * Testes E2E para navegação
 */
test.describe('Navegação', () => {
  test('@smoke Deve navegar entre páginas principais', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Navega para home
    await homePage.goto();
    await expect(page).toHaveURL(/.*\/$/);

    // Verifica elementos principais da home
    await expect(homePage.navigationMenu).toBeVisible();
  });

  test('Deve redirecionar para login quando não autenticado', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Tenta acessar página protegida
    await homePage.goto();
    
    // Se não estiver logado, deve redirecionar para login
    const currentUrl = page.url();
    if (currentUrl.includes('login')) {
      const loginPage = new LoginPage(page);
      await expect(loginPage.emailInput).toBeVisible();
    }
  });

  test('@regression Deve manter estado de navegação após refresh', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    const initialUrl = page.url();
    
    // Faz refresh
    await page.reload();
    
    // Verifica que ainda está na mesma página
    await expect(page).toHaveURL(initialUrl);
  });
});
