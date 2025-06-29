import { test, expect } from '../fixtures/hooks-fixture';
import loginModuleTestData from '../test-data/login-module.json';

/**
 * This test is to ignore global set up.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Verify Login page functionality.', async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goToLoginPage();
  });

  test(
    'Verify OrangeHRM login page.',
    { tag: '@Smoke' },
    async ({ homePage }) => {
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
    }
  );

  test(
    'Verify user cannot log in with an incorrect username and correct password.',
    { tag: '@Regression' },
    async ({ homePage, commonUtils }) => {
      const correctPassword: string = commonUtils.decryptData(
        process.env.PASSWORD!
      );
      await test.step('Initiate Login with credentials.', async () => {
        await homePage.login(
          loginModuleTestData.wrong_username,
          correctPassword
        );
      });

      await test.step('Validate error message.', async () => {
        await expect(homePage.invalidCredentialsErrorAlert).toHaveText(
          loginModuleTestData.invalid_credentials_error_text
        );
      });
    }
  );

  test(
    'Verify user cannot log in with an correct username and incorrect password.',
    { tag: '@Regression' },
    async ({ homePage, commonUtils }) => {
      const correctUsername: string = commonUtils.decryptData(
        process.env.USER_NAME!
      );

      await test.step('Initiate Login with credentials.', async () => {
        await homePage.login(
          correctUsername,
          loginModuleTestData.wrong_password
        );
      });

      await test.step('Validate error message.', async () => {
        await expect(homePage.invalidCredentialsErrorAlert).toHaveText(
          loginModuleTestData.invalid_credentials_error_text
        );
      });
    }
  );

  test(
    'Verify user cannot log in with an incorrect username and incorrect password.',
    { tag: '@Regression' },
    async ({ homePage }) => {
      await test.step('Initiate Login with credentials.', async () => {
        await homePage.login(
          loginModuleTestData.wrong_username,
          loginModuleTestData.wrong_password
        );
      });

      await test.step('Validate error message.', async () => {
        await expect(homePage.invalidCredentialsErrorAlert).toHaveText(
          loginModuleTestData.invalid_credentials_error_text
        );
      });
    }
  );

  test(
    'Verify user cannot log in with out providing both username and password.',
    { tag: '@Regression' },
    async ({ homePage, commonUtils }) => {
      const correctUsername: string = commonUtils.decryptData(
        process.env.USER_NAME!
      );
      const correctPassword: string = commonUtils.decryptData(
        process.env.PASSWORD!
      );

      await test.step('Initiate Login without credentials.', async () => {
        // click log in button without providing username and password
        await homePage.loginButton.click();
      });

      await test.step('Validate error message.', async () => {
        await expect(
          homePage.mandatoryFieldValidationError.first()
        ).toBeVisible();
        await expect(
          homePage.mandatoryFieldValidationError.nth(1)
        ).toBeVisible();
      });

      await test.step('Handle field validation error by providing required input.', async () => {
        await homePage.usernameTextBox.fill(correctUsername);
        await expect(homePage.mandatoryFieldValidationError).toBeVisible();
        await homePage.passwordTextBox.fill(correctPassword);
        await expect(homePage.mandatoryFieldValidationError).not.toBeVisible();
      });
    }
  );

  test(
    'Verify user cannot log in by only providing username.',
    { tag: '@Regression' },
    async ({ homePage, commonUtils }) => {
      const correctUsername: string = commonUtils.decryptData(
        process.env.USER_NAME!
      );
      const correctPassword: string = commonUtils.decryptData(
        process.env.PASSWORD!
      );
      await test.step('Initiate Login with only username credentials.', async () => {
        await homePage.usernameTextBox.fill(correctUsername);
        await homePage.loginButton.click();
      });

      await test.step('Validate error message.', async () => {
        await expect(homePage.mandatoryFieldValidationError).toBeVisible();
      });

      await test.step('Handle field validation error by providing required input.', async () => {
        await homePage.passwordTextBox.fill(correctPassword);
        await expect(homePage.mandatoryFieldValidationError).not.toBeVisible();
      });
    }
  );

  test(
    'Verify user cannot log in by only providing password.',
    { tag: '@Regression' },
    async ({ homePage, commonUtils }) => {
      const correctUsername: string = commonUtils.decryptData(
        process.env.USER_NAME!
      );
      const correctPassword: string = commonUtils.decryptData(
        process.env.PASSWORD!
      );
      await test.step('Initiate Login with only password credentials.', async () => {
        await homePage.passwordTextBox.fill(correctPassword);
        await homePage.loginButton.click();
      });

      await test.step('Validate error message.', async () => {
        await expect(homePage.mandatoryFieldValidationError).toBeVisible();
      });

      await test.step('Handle field validation error by providing required input.', async () => {
        await homePage.usernameTextBox.fill(correctUsername);
        await expect(homePage.mandatoryFieldValidationError).not.toBeVisible();
      });
    }
  );
});
