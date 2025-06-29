import { test as baseTest } from './common-fixture';

type HooksFixtureType = {
  goToDashbaordPage: any;
};

export const test = baseTest.extend<HooksFixtureType>({
  goToDashbaordPage: async ({ homePage }, use: any) => {
    await homePage.goToLoginPage();
    await use();
  },
});

export { expect } from '@playwright/test';
