import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/DashboardPage';

type PomFixtures = {
  homePage: HomePage;
  dashboardpage: DashboardPage;
};

export const test = baseTest.extend<PomFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  dashboardpage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});
