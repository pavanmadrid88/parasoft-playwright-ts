import { test as base } from '@playwright/test';
import { UserRegistrationPage } from '../pages/UserRegistrationPage';
import { Constants } from '../data/constants';




export const userRegistrationFixture = base.extend<{ userRegistrationPage: UserRegistrationPage }>({
  userRegistrationPage: async ({ page }, use, testInfo) => {
    testInfo.setTimeout(60000);
    const userRegistrationPage = new UserRegistrationPage(page);
    let registrationStatus = Constants.UserRegistrationStatus.DEFAULT;
    let retryRegistration = true;

    do {
      await userRegistrationPage.goto();

      const randomSuffix = Math.floor(Math.random() * 100000);
      const uniqueUsername = `pavantest${randomSuffix}`;
      const uniquePassword: string = `password`;

      await userRegistrationPage.register(
        uniqueUsername,
        uniqueUsername,
        Constants.UserRegistrationData.ADDRESS,
        Constants.UserRegistrationData.CITY,
        Constants.UserRegistrationData.STATE,
        Constants.UserRegistrationData.ZIP,
        Constants.UserRegistrationData.PHONE_NUMBER,
        Constants.UserRegistrationData.SSN,
        uniqueUsername,
        uniquePassword
      );

      registrationStatus = await userRegistrationPage.isRegistrationSuccessful(uniqueUsername);

      if (registrationStatus === Constants.UserRegistrationStatus.PASS) {
        retryRegistration = false;
      } else if (registrationStatus === Constants.UserRegistrationStatus.USERNAME_ALREADY_REGISTERED) {
        retryRegistration = true;
      } else {
        retryRegistration = false;
      }

    } while (retryRegistration);

    await use(userRegistrationPage);
  },
});


