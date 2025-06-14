import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly brand: Locator;
  readonly userNameLabel: Locator;
  readonly userNameInput: Locator;
  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brand = page.getByRole('img', { name: 'company-branding' });
    this.userNameLabel = page.getByText('Username', { exact: true });
    this.userNameInput = page.getByRole('textbox', {
      name: 'Username',
    });
    this.passwordLabel = page.getByText('Password', { exact: true });
    this.passwordInput = page.getByRole('textbox', {
      name: 'Password',
    });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Open OrangeHRM application URL in browser
   */
  async lunchOrangeHrm() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
  }

  /**
   * Login to OrangeHRM application
   * @param username
   * @param password
   */
  async loginToOrangeHrm(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
