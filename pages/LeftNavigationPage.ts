import { Locator, Page } from '@playwright/test';

export class LeftNavigationPage {
  readonly page: Page;
  readonly pimLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimLink = page.getByRole('link', { name: 'PIM' });
  }

  /**
   * Navigate to PIM module
   */
  async openPimModule(): Promise<void> {
    this.pimLink.click();
  }
}
