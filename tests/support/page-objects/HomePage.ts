import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object para a página Home
 */
export class HomePage extends BasePage {
  // Locators
  readonly welcomeMessage: Locator;
  readonly navigationMenu: Locator;
  readonly logoutButton: Locator;
  readonly userProfile: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('h1, .welcome, [data-testid="welcome"]');
    this.navigationMenu = page.locator('nav, .navbar, [role="navigation"]');
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sair"), [data-testid="logout"]');
    this.userProfile = page.locator('.user-profile, [data-testid="user-profile"]');
  }

  /**
   * Navega para a home
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Verifica se está logado
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.logoutButton.isVisible().catch(() => false);
  }

  /**
   * Realiza logout
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Verifica mensagem de boas-vindas
   */
  async verifyWelcomeMessage(message: string): Promise<void> {
    await expect(this.welcomeMessage).toContainText(message);
  }
}
