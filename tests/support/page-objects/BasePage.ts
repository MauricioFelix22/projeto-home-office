import { Page, Locator, expect } from '@playwright/test';

/**
 * Classe base para Page Objects
 * Contém métodos comuns que podem ser reutilizados
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega para uma URL
   */
  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Retorna o título da página
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Retorna a URL atual
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Aguarda elemento estar visível
   */
  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Clica em um elemento
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Preenche um campo
   */
  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Verifica se texto está presente
   */
  async verifyText(text: string): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  /**
   * Tira screenshot
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}
