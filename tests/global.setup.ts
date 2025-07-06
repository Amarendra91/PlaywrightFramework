import { test } from '../fixtures/common-fixture';

test('Save login session storage.', async ({ page, homePage, cryptoUtils }) => {
  const decryptedUserName = cryptoUtils.decryptData(process.env.USER_NAME!);
  const decryptedPassword = cryptoUtils.decryptData(process.env.PASSWORD!);
  // Navigate to login page
  await homePage.goToLoginPage();
  await page.waitForURL(`${process.env.BASE_URL}/web/index.php/auth/login`);

  // Perform login with valid credentials
  await homePage.login(decryptedUserName, decryptedPassword);

  // Validate Dashboard page Navigation after successful login
  await page.waitForURL(
    `${process.env.BASE_URL}/web/index.php/dashboard/index`
  );

  // Save login session storage state
  await page.context().storageState({
    path: './.auth/auth.json',
  });
});
