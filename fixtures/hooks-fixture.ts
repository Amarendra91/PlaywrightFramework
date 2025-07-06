import { test as baseTest } from './common-fixture';

type HooksFixtureType = {
  bypassLoginPage: any;
};

export const test = baseTest.extend<HooksFixtureType>({
  bypassLoginPage: async ({ homePage }, use: any) => {
    await homePage.goToLoginPage();
    await use();
  },
});

export { expect } from '@playwright/test';
