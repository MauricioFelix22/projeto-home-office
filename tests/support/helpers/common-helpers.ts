import { Page, expect } from '@playwright/test';

/**
 * Helpers comuns para testes
 */

/**
 * Aguarda elemento estar visível e clicável
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Preenche campo de forma segura (limpa antes de preencher)
 */
export async function safeFill(
  page: Page,
  selector: string,
  text: string
): Promise<void> {
  await page.fill(selector, '');
  await page.fill(selector, text);
}

/**
 * Clica em elemento após garantir que está visível
 */
export async function safeClick(
  page: Page,
  selector: string
): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible' });
  await page.click(selector);
}

/**
 * Verifica se texto está presente na página
 */
export async function verifyText(
  page: Page,
  text: string,
  exact: boolean = false
): Promise<void> {
  if (exact) {
    await expect(page.locator('text=' + text)).toBeVisible();
  } else {
    await expect(page.getByText(text, { exact: false })).toBeVisible();
  }
}

/**
 * Gera email aleatório para testes
 */
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `teste${timestamp}@automacao.com`;
}

/**
 * Aguarda carregamento completo da página
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Faz scroll até elemento
 */
export async function scrollToElement(
  page: Page,
  selector: string
): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Tira screenshot com nome customizado
 */
export async function takeScreenshot(
  page: Page,
  name: string
): Promise<void> {
  await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
}
