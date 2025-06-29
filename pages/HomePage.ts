import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly brand: Locator;
  readonly loginHeader: Locator;
  readonly usernameLabel: Locator;
  readonly usernameTextBox: Locator;
  readonly passwordLabel: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsErrorAlert: Locator;
  readonly mandatoryFieldValidationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brand = page.getByRole('img', { name: 'company-branding' });
    this.loginHeader = page.getByRole('heading', { name: 'Login' });
    this.usernameLabel = page.getByText('Username', { exact: true });
    this.usernameTextBox = page.getByRole('textbox', {
      name: 'Username',
    });
    this.passwordLabel = page.getByText('Password', { exact: true });
    this.passwordTextBox = page.getByRole('textbox', {
      name: 'Password',
    });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidCredentialsErrorAlert = page
      .getByRole('alert')
      .locator('div')
      .filter({ hasText: 'Invalid credentials' });
    this.mandatoryFieldValidationError = page.getByText('Required');
  }

  /**
   * Open OrangeHRM application URL in browser
   */
  async goToLoginPage() {
    await this.page.goto('/');
    await this.page.waitForURL(
      `${process.env.BASE_URL}/web/index.php/auth/login`
    );
  }

  /**
   * Login to OrangeHRM application with valid username and valid password
   * @param username
   * @param password
   */
  async login(username: string, password: string) {
    await this.usernameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
  }
}
