import { test, expect } from '../fixtures/hooks-fixture';
import dashboardModuleTestData from '../test-data/dashboard-module.json';

test.describe('Verify Dashbaoard page functionality.', async () => {
  test(
    'Verify user navigated to OrangeHRM dashbaord page and logout from OrangeHRM application.',
    { tag: '@Smoke' },
    async ({ goToDashbaordPage, dashboardpage, homePage }) => {
      await test.step('Verify header title on dashboard page.', async () => {
        await expect(dashboardpage.headerTitle).toContainText(
          dashboardModuleTestData.header_title
        );
      });

      await test.step('Verify user dropdown menu functionality on page header.', async () => {
        await expect(dashboardpage.userIconMenu).toBeVisible();
        await expect(dashboardpage.userIconMenu).toBeEnabled();
      });

      await test.step('Verify Logout functionality. ', async () => {
        await dashboardpage.logout();
        await expect(homePage.loginHeader).toBeVisible();
      });
    }
  );
});
