import { test, expect } from '../fixtures/hooks-fixture';
import loginModuleTestData from '../test-data/login-module.json';

/**
 * This test is to ignore global set up.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test('Verify OrangeHRM landing page.', async ({ goToLoginPage, homePage }) => {
  await expect(homePage.brand).toBeVisible();
  await expect(homePage.loginHeader).toBeVisible();
  await expect(homePage.usernameLabel).toBeVisible();
  await expect(homePage.usernameTextBox).toBeVisible();
  await expect(homePage.usernameTextBox).toBeEnabled();
  await expect(homePage.usernameTextBox).toBeEditable();
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

test('Verify user cannot log in with out providing both username and password.', async ({
  goToLoginPage,
  homePage,
  commonUtils,
}) => {
  const correctUsername: string = commonUtils.decryptData(
    process.env.USER_NAME!
  );
  const correctPassword: string = commonUtils.decryptData(
    process.env.PASSWORD!
  );
  // click log in button without providing username and password
  await homePage.loginButton.click();
  await expect(homePage.mandatoryFieldValidationError.first()).toBeVisible();
  await expect(homePage.mandatoryFieldValidationError.nth(1)).toBeVisible();
  await homePage.usernameTextBox.fill(correctUsername);
  await expect(homePage.mandatoryFieldValidationError).toBeVisible();
  await homePage.passwordTextBox.fill(correctPassword);
  await expect(homePage.mandatoryFieldValidationError).not.toBeVisible();
});

test('Verify user cannot log in by only providing username.', async ({
  goToLoginPage,
  homePage,
  commonUtils,
}) => {
  const correctUsername: string = commonUtils.decryptData(
    process.env.USER_NAME!
  );
  const correctPassword: string = commonUtils.decryptData(
    process.env.PASSWORD!
  );
  await homePage.usernameTextBox.fill(correctUsername);
  await homePage.loginButton.click();
  await expect(homePage.mandatoryFieldValidationError).toBeVisible();
  await homePage.passwordTextBox.fill(correctPassword);
  await expect(homePage.mandatoryFieldValidationError).not.toBeVisible();
});

test('Verify user cannot log in by only providing password.', async ({
  goToLoginPage,
  homePage,
  commonUtils,
}) => {
  const correctUsername: string = commonUtils.decryptData(
    process.env.USER_NAME!
  );
  const correctPassword: string = commonUtils.decryptData(
    process.env.PASSWORD!
  );
  await homePage.passwordTextBox.fill(correctPassword);
  await homePage.loginButton.click();
  await expect(homePage.mandatoryFieldValidationError).toBeVisible();
  await homePage.usernameTextBox.fill(correctUsername);
  await expect(homePage.mandatoryFieldValidationError).not.toBeVisible();
});
