import { Locator, Page } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly addPimButton: Locator;
  readonly firstNameTextBox: Locator;
  readonly middleNameTextBox: Locator;
  readonly lastNameTextBox: Locator;
  readonly saveButton: Locator;
  readonly newEmployeeName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page
      .locator('.oxd-topbar-header-title')
      .filter({ has: page.getByRole('heading') });
    this.addPimButton = page.getByRole('button', { name: ' Add' });
    this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameTextBox = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.newEmployeeName = page
      .locator('.orangehrm-edit-employee-name')
      .filter({ has: page.getByRole('heading') });
  }

  /**
   *To add a new employee in PIM module
   * @param firstName
   * @param middleName
   * @param lastName
   */
  async addEmployee(firstName: string, middleName: string, lastName: string) {
    await this.addPimButton.click();
    await this.firstNameTextBox.fill(firstName);
    await this.middleNameTextBox.fill(middleName);
    await this.lastNameTextBox.fill(lastName);
    await this.saveButton.click();
  }
}
