import { test } from '../fixtures/hooks-fixture';
import { expect } from '@playwright/test';

test('Navigate to OrangeHRM landing page.', async ({ page, homePage }) => {
  await page.context().clearCookies();
  await homePage.goToLoginPage();
  await page.waitForURL(`${process.env.BASE_URL}/web/index.php/auth/login`);
  await expect(homePage.brand).toBeVisible();
  await expect(homePage.loginHeader).toBeVisible();
  await expect(homePage.userNameLabel).toBeVisible();
  await expect(homePage.userNameTextBox).toBeVisible();
  await expect(homePage.userNameTextBox).toBeEnabled();
  await expect(homePage.userNameTextBox).toBeEditable();
  await expect(homePage.passwordLabel).toBeVisible();
  await expect(homePage.passwordTextBox).toBeVisible();
  await expect(homePage.passwordTextBox).toBeEnabled();
  await expect(homePage.passwordTextBox).toBeEditable();
  await expect(homePage.loginButton).toBeVisible();
  await expect(homePage.loginButton).toBeEnabled();
});

test('Navigate to OrangeHRM dashbaord page and logout from OrangeHRM application.', async ({
  goToLoginPage,
  dashboardpage,
  homePage,
}) => {
  await expect(dashboardpage.userIconMenu).toBeVisible();
  await expect(dashboardpage.userIconMenu).toBeEnabled();
  await dashboardpage.logout();
  await expect(homePage.loginHeader).toBeVisible();
});
