import { test as base } from '@playwright/test';
import { HomeIndexPage } from '../pages/HomeIndexPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';



export const accountCreationFixture = base.extend<{ openNewAccountPage: OpenAccountPage }>({
   openNewAccountPage: async ({ page }, use, testInfo) => {
      const homeIndexPage = new HomeIndexPage(page);
      const openNewAccountPage = await homeIndexPage.clickOpenNewAccount();

      // create new Savings account
      await openNewAccountPage.openNewAccount();
      await use(openNewAccountPage);
   },
});


