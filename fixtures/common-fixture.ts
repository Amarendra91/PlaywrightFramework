import { test as basetest } from './pom-fixture';
import CommonUtils from '../utils/CommonUtils';

type CommonFixtureType = {
  commonUtils: CommonUtils;
};

export const test = basetest.extend<CommonFixtureType>({
  commonUtils: async ({}, use) => {
    await use(new CommonUtils());
  },
});
