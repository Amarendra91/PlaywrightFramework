import { expect } from '@playwright/test';
import { test } from '../fixtures/common-fixture';

test('Login session storage for reusability.', async ({
  page,
  homePage,
  commonUtils,
}) => {
  const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
  const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

  await homePage.goToLoginPage();
  await homePage.login(decryptedUserName, decryptedPassword);
  await page.waitForURL(
    `${process.env.BASE_URL}/web/index.php/dashboard/index`
  );
  await page.context().storageState({
    path: './.auth/auth.json',
  });
});
