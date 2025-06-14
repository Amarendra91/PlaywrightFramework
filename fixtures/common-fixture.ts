import { test as basetest } from '../fixtures/pom-fixture';
import CommonUtils from '../utils/CommonUtils';

type CommonFixtureType = {
  commonUtils: CommonUtils;
};

export const test = basetest.extend<CommonFixtureType>({
  commonUtils: async ({}, use) => {
    use(new CommonUtils());
  },
});

export { expect } from '@playwright/test';
