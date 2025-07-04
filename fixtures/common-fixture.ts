import { test as basetest } from './pom-fixture';
import CryptoUtils from '../utils/CryptoUtils';

type CommonFixtureType = {
  cryptoUtils: CryptoUtils;
};

export const test = basetest.extend<CommonFixtureType>({
  cryptoUtils: async ({}, use) => {
    await use(new CryptoUtils());
  },
});
