import { test, expect } from '@playwright/test';
import { LoginPage } from '../support/page-objects/LoginPage';
import { HomePage } from '../support/page-objects/HomePage';
import { testUsers } from '../support/fixtures/test-data';

/**
 * Testes E2E para funcionalidade de Login
 */
test.describe('Login', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
  });

  test('@smoke Deve fazer login com credenciais válidas', async ({ page }) => {
    await loginPage.login(
      testUsers.validUser.email,
      testUsers.validUser.password
    );

    // Verifica redirecionamento para home
    await expect(page).toHaveURL(/.*home|.*dashboard|.*\/$/);
    
    // Verifica se está logado
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('Deve exibir erro ao tentar login com credenciais inválidas', async ({ page }) => {
    await loginPage.login(
      testUsers.invalidUser.email,
      testUsers.invalidUser.password
    );

    // Verifica mensagem de erro
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Deve validar campos obrigatórios', async ({ page }) => {
    // Tenta fazer login sem preencher campos
    await loginPage.loginButton.click();

    // Verifica validação de campos
    const emailInput = loginPage.emailInput;
    const passwordInput = loginPage.passwordInput;

    // Verifica se campos estão marcados como inválidos
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('Deve fazer logout com sucesso', async ({ page }) => {
    // Faz login primeiro
    await loginPage.login(
      testUsers.validUser.email,
      testUsers.validUser.password
    );

    // Aguarda redirecionamento
    await page.waitForURL(/.*home|.*dashboard|.*\/$/);

    // Realiza logout
    await homePage.logout();

    // Verifica redirecionamento para login
    await expect(page).toHaveURL(/.*login/);
  });
});
