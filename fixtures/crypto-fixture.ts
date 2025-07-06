import { test as basetest } from './pom-fixture';
import CryptoUtil from '../utils/CryptoUtil';

type CommonFixtureType = {
  cryptoUtil: CryptoUtil;
};

export const test = basetest.extend<CommonFixtureType>({
  cryptoUtil: async ({}, use) => {
    await use(new CryptoUtil());
  },
});
