import { Page } from '@playwright/test';

export class UserManagementPage {

  readonly page: Page;
  readonly searchInput;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#pesquisar');
  }

  async filterUserPauloUbistartAtivos() {

    // aguardar campo aparecer
    await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });

    // buscar usuário
    await this.searchInput.fill('Paulo');

    // abrir filtros
    const filtrosButton = this.page.getByRole('button', { name: 'Filtros' });
    await filtrosButton.click();

    // campo organização
    const orgInput = this.page.locator('#organizacao2');

    await orgInput.waitFor({ state: 'visible', timeout: 10000 });

    // digitar Ubistart
    await orgInput.fill('Ubistart');

    // pressionar ENTER
    await orgInput.press('Enter');

    // esperar lista aparecer
    const ubistartOption = this.page.locator('div:has-text("Ubistart")').first();

    await ubistartOption.waitFor({ state: 'visible', timeout: 10000 });

    // clicar na primeira opção
    await ubistartOption.click();

    // clicar em aplicar
    const aplicarButton = this.page.locator('button:has-text("Aplicar")');

    await aplicarButton.waitFor({ state: 'visible', timeout: 10000 });
    await aplicarButton.click();

    // aguardar filtro aplicar
    await this.page.waitForTimeout(3000);
  }
}