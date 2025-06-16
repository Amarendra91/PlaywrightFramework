import { test, expect } from '../fixtures/hooks-fixture';

test('Verify user navigated to OrangeHRM dashbaord page and logout from OrangeHRM application.', async ({
  goToLoginPage,
  dashboardpage,
  homePage,
}) => {
  await expect(dashboardpage.userIconMenu).toBeVisible();
  await expect(dashboardpage.userIconMenu).toBeEnabled();
  await dashboardpage.logout();
  await expect(homePage.loginHeader).toBeVisible();
});
