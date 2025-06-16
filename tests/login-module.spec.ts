import { test, expect } from '../fixtures/hooks-fixture';
import loginModuleTestData from '../test-data/login-module.json';

/**
 * This test is to ignore global set up.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test('Verify OrangeHRM landing page.', async ({ goToLoginPage, homePage }) => {
  await expect(homePage.brand).toBeVisible();
  await expect(homePage.loginHeader).toBeVisible();
  await expect(homePage.userNameLabel).toBeVisible();
  await expect(homePage.userNameTextBox).toBeVisible();
  await expect(homePage.userNameTextBox).toBeEnabled();
  await expect(homePage.userNameTextBox).toBeEditable();
  await expect(homePage.passwordLabel).toBeVisible();
  await expect(homePage.passwordTextBox).toBeVisible();
  await expect(homePage.passwordTextBox).toBeEnabled();
  await expect(homePage.passwordTextBox).toBeEditable();
  await expect(homePage.loginButton).toBeVisible();
  await expect(homePage.loginButton).toBeEnabled();
});

test('Verify user cannot log in with an incorrect username and correct password.', async ({
  goToLoginPage,
  homePage,
  commonUtils,
}) => {
  const correctPassword: string = commonUtils.decryptData(
    process.env.PASSWORD!
  );
  await homePage.login(loginModuleTestData.wrong_username, correctPassword);
  await expect(homePage.invalidCredentialsErrorAlert).toHaveText(
    loginModuleTestData.invalid_credentials_error_text
  );
});

test('Verify user cannot log in with an correct username and incorrect password.', async ({
  goToLoginPage,
  homePage,
  commonUtils,
}) => {
  const correctUsername: string = commonUtils.decryptData(
    process.env.USER_NAME!
  );
  await homePage.login(correctUsername, loginModuleTestData.wrong_password);
  await expect(homePage.invalidCredentialsErrorAlert).toHaveText(
    loginModuleTestData.invalid_credentials_error_text
  );
});

test('Verify user cannot log in with an incorrect username and incorrect password.', async ({
  goToLoginPage,
  homePage,
  commonUtils,
}) => {
  await homePage.login(
    loginModuleTestData.wrong_username,
    loginModuleTestData.wrong_password
  );
  await expect(homePage.invalidCredentialsErrorAlert).toHaveText(
    loginModuleTestData.invalid_credentials_error_text
  );
});

// Add test for empty username password
