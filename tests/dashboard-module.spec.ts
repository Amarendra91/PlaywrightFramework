import { test, expect } from '../fixtures/hooks-fixture';
import dashboardModuleTestData from '../test-data/dashboard-module.json';

test('Verify user navigated to OrangeHRM dashbaord page and logout from OrangeHRM application.', async ({
  dashboardpage,
  homePage,
}) => {
  await expect(dashboardpage.headerTitle).toContainText(
    dashboardModuleTestData.header_title
  );
  await expect(dashboardpage.userIconMenu).toBeVisible();
  await expect(dashboardpage.userIconMenu).toBeEnabled();
  await dashboardpage.logout();
  await expect(homePage.loginHeader).toBeVisible();
});
