import { test, expect } from '../../fixtures/hooks-fixture';
import pimModuleTestData from '../../test-data/pim-module.json';

test.describe('Verify PIM page functionality.', async () => {
  test(
    '[PIM] Verify a new employee added successfully in PIM module.',
    { tag: '@Regression' },
    async ({ bypassLoginPage, leftNavPage, pimPage, page }) => {
      await test.step('Navigate to PIM page from left hand navigation.', async () => {
        await leftNavPage.openPimModule();
        await page.waitForURL('/web/index.php/pim/viewEmployeeList');
      });

      await test.step('Verify header title on PIM page.', async () => {
        await expect(pimPage.headerTitle).toContainText(
          pimModuleTestData.header_title
        );
      });

      await test.step('Add new Employee.', async () => {
        await pimPage.addEmployee(
          pimModuleTestData.first_name,
          pimModuleTestData.middle_name,
          pimModuleTestData.last_name
        );
      });

      await test.step('Verify employee added successfully.', async () => {
        await page.waitForURL(
          `${process.env.BASE_URL}/web/index.php/pim/viewPersonalDetails/empNumber/*`
        );
        await expect(pimPage.newEmployeeName).toHaveText(
          `${pimModuleTestData.first_name} ${pimModuleTestData.last_name}`
        );
      });
    }
  );
});
