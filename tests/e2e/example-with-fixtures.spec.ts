import { test, expect } from '../support/fixtures/custom-fixtures';

/**
 * Exemplo de testes usando fixtures customizadas
 * Demonstra como usar as fixtures pré-configuradas
 */
test.describe('Exemplo com Fixtures Customizadas', () => {
  test('Deve usar fixture de LoginPage', async ({ loginPage }) => {
    await loginPage.goto();
    expect(await loginPage.isLoginPage()).toBeTruthy();
  });

  test('Deve usar fixture de HomePage', async ({ homePage }) => {
    await homePage.goto();
    // Verifica elementos da home
    await expect(homePage.navigationMenu).toBeVisible();
  });

  test('Deve usar página já autenticada', async ({ authenticatedPage, page }) => {
    // Esta fixture já faz login automaticamente
    // Você pode começar o teste já autenticado
    await expect(page).toHaveURL(/.*home|.*dashboard|.*\/$/);
  });
});
