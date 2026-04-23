import { test, expect } from '@playwright/test';
import { UserManagementPage } from '../support/page-objects/UserManagementPage';

test.only('Filtro de usuário Paulo na organização Ubistart', async ({ page }) => {

  const userManagementPage = new UserManagementPage(page);

  // abrir login
  await page.goto('https://iadashsales.bubbleapps.io/login');

  // login
  await page.getByRole('textbox', { name: /e-mail/i }).fill('Mauricio.felix08@yahoo.com');
  await page.getByRole('textbox', { name: /senha/i }).fill('Silva2837');

  await page.getByRole('button', { name: /acessar/i }).click();

  // aguardar login
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // abrir menu lateral
  const logoMenu = page.locator('img[src*="Logo_branco"]');

  await logoMenu.waitFor({ state: 'visible', timeout: 15000 });
  await logoMenu.click();

  await page.waitForTimeout(2000);

  // abrir Gestão de Usários
  const gestaoUsuarios = page.getByText('Gestão de Usários');

  await gestaoUsuarios.waitFor({ state: 'visible', timeout: 15000 });
  await gestaoUsuarios.click();

  // aguardar página carregar
  await page.waitForLoadState('networkidle');

  // aplicar filtro
  await userManagementPage.filterUserPauloUbistartAtivos();

  // esperar tabela atualizar
  await page.waitForTimeout(3000);

  // validação simples
  await expect(page.getByText(/paulo/i).first()).toBeVisible();

  console.log('Teste finalizado - navegador permanecerá aberto.');

  await page.pause();

});