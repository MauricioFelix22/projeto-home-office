import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { testUsers } from './test-data';

/**
 * Fixtures customizadas para reutilização em testes
 */

type CustomFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  authenticatedPage: LoginPage;
};

export const test = base.extend<CustomFixtures>({
  // Fixture para LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture para HomePage
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Fixture para página já autenticada
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      testUsers.validUser.email,
      testUsers.validUser.password
    );
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
