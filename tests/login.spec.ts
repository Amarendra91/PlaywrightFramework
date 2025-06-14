import { expect, test } from '../fixtures/pom-fixture';

test('lunch url and login', async ({ loginPage }) => {
  await loginPage.lunchOrangeHrm();
  await expect(loginPage.brand).toBeVisible();
  await expect(loginPage.userNameLabel).toBeVisible();
  await expect(loginPage.userNameInput).toBeVisible();
  await expect(loginPage.userNameInput).toBeEnabled();
  await expect(loginPage.userNameInput).toBeEditable();
  await expect(loginPage.passwordLabel).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeEnabled();
  await expect(loginPage.passwordInput).toBeEditable();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await loginPage.loginToOrangeHrm('Admin', 'admin123');
});
