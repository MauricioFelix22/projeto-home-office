import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object para a página de Login
 */
export class LoginPage extends BasePage {

  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('#email, input[type="email"]');
    this.passwordInput = page.locator('#password, input[type="password"]');

    this.loginButton = page
      .getByRole('button', { name: /login|entrar|acessar|sign in|log in/i })
      .or(page.locator('button').filter({ hasText: /login|entrar|acessar|sign in|log in/i }));

    this.errorMessage = page.locator('.error, .alert-danger, [role="alert"]');
    this.successMessage = page.locator('.success, .alert-success');
  }

  /**
   * Navega para a página de login
   */
  async goto(): Promise<void> {
    await this.page.goto('https://iadashsales.bubbleapps.io/login');
  }

  /**
   * Realiza login
   */
  async login(email: string, password: string): Promise<void> {
    await this.goto();

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.loginButton.click();

    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verifica se está na página de login
   */
  async isLoginPage(): Promise<boolean> {
    return await this.emailInput.isVisible();
  }

  /**
   * Verifica mensagem de erro
   */
  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Verifica mensagem de sucesso
   */
  async verifySuccessMessage(expectedMessage: string): Promise<void> {
    await expect(this.successMessage).toContainText(expectedMessage);
  }
}

