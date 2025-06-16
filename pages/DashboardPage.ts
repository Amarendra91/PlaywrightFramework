import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly userIconMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIconMenu = page
      .getByRole('banner')
      .getByRole('img', { name: 'profile picture' });
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout() {
    await this.userIconMenu.click();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toBeEnabled();
    await this.logoutButton.click();
  }
}
