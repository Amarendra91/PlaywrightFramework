import { expect, test } from '../fixtures/common-fixture';

test('Navigate to application url and login.', async ({
  loginPage,
  commonUtils,
}) => {
  const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
  const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);
  await loginPage.lunchOrangeHrm();
  await expect(loginPage.brand).toBeVisible();
  await expect(loginPage.userNameLabel).toBeVisible();
  await expect(loginPage.userNameTextBox).toBeVisible();
  await expect(loginPage.userNameTextBox).toBeEnabled();
  await expect(loginPage.userNameTextBox).toBeEditable();
  await expect(loginPage.passwordLabel).toBeVisible();
  await expect(loginPage.passwordTextBox).toBeVisible();
  await expect(loginPage.passwordTextBox).toBeEnabled();
  await expect(loginPage.passwordTextBox).toBeEditable();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await loginPage.loginToOrangeHrm(decryptedUserName, decryptedPassword);
});
