import { test as baseTest } from './common-fixture';

type HooksFixtureType = {
  goToLoginPage: any;
};

export const test = baseTest.extend<HooksFixtureType>({
  goToLoginPage: async ({ homePage }, use: any) => {
    await homePage.goToLoginPage();
    await use();
  },
});
