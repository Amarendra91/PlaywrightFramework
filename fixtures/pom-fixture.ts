import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/DashboardPage';
import { LeftNavigationPage } from '../pages/LeftNavigationPage';
import { PimPage } from '../pages/PimPage';

type PomFixtures = {
  homePage: HomePage;
  dashboardpage: DashboardPage;
  leftNavPage: LeftNavigationPage;
  pimPage: PimPage;
};

export const test = baseTest.extend<PomFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  dashboardpage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  leftNavPage: async ({ page }, use) => {
    await use(new LeftNavigationPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },
});
