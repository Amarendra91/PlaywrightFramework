import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly brand: Locator;
  readonly userNameLabel: Locator;
  readonly userNameTextBox: Locator;
  readonly passwordLabel: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brand = page.getByRole('img', { name: 'company-branding' });
    this.userNameLabel = page.getByText('Username', { exact: true });
    this.userNameTextBox = page.getByRole('textbox', {
      name: 'Username',
    });
    this.passwordLabel = page.getByText('Password', { exact: true });
    this.passwordTextBox = page.getByRole('textbox', {
      name: 'Password',
    });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Open OrangeHRM application URL in browser
   */
  async lunchOrangeHrm() {
    await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
  }

  /**
   * Login to OrangeHRM application
   * @param username
   * @param password
   */
  async loginToOrangeHrm(username: string, password: string) {
    await this.userNameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
  }
}
