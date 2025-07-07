import { test as basetest } from './pom-fixture';
import CommonUtils from '../utils/CommonUtils';
import CommonApiUtils from '../utils/CommonApiUtils';

type CommonFixtureType = {
  commonUtils: CommonUtils;
  commonApiUtils: CommonApiUtils;
};

export const test = basetest.extend<CommonFixtureType>({
  commonUtils: async ({}, use) => {
    await use(new CommonUtils());
  },
  commonApiUtils: async ({ request }, use) => {
    await use(new CommonApiUtils(request));
  },
});
