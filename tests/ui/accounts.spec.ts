
import { expect, request } from "@playwright/test";
import { test } from "../../src/fixtures/CombinedFixture"
import { HomeIndexPage } from "../../src/pages/HomeIndexPage";
import { Constants } from "../../src/data/constants";
import { ApiUtils } from "../../src/utils/ApiUtils";




test('should verify the creation of new Savings account', async ({ page, userRegistrationPage, openNewAccountPage }) => {
   const accountId = await openNewAccountPage.getAccountId();
   expect(accountId).toBeTruthy();
});


test('should verify the account overview page', async ({ page, userRegistrationPage, openNewAccountPage }) => {
   const homeIndexPage = new HomeIndexPage(page);
   const accountId = await openNewAccountPage.getAccountId();
   expect(accountId).toBeTruthy();
   const accountsOverviewPage = await homeIndexPage.clickAccountsOverviewPage();
   expect(await accountsOverviewPage.isAccountsOverviewPageDisplayed(accountId)).toBeTruthy();


});

test('should verify the transfer of funds from one account to other', async ({ page, userRegistrationPage, openNewAccountPage }) => {
   const homeIndexPage = new HomeIndexPage(page);
   const accountsOverviewPage = await homeIndexPage.clickAccountsOverviewPage();
   const accountIdList = await accountsOverviewPage.getAccountIdDetails();
   const accountId = await openNewAccountPage.getAccountId();
   const toAccountId = accountIdList.find(id => id.trim() !== accountId.trim());
   expect(accountId && toAccountId).toBeTruthy();
   const transferFundsPage = await homeIndexPage.clickTransferFunds();
   expect(await transferFundsPage.isTransferFundsPageDisplayed()).toBeTruthy();
   expect(await transferFundsPage.transferFunds("1", accountId, toAccountId)).toBeTruthy();

});


test('should verify the bill payment', async ({ page, userRegistrationPage, openNewAccountPage }) => {
   const homeIndexPage = new HomeIndexPage(page);
   const cookies = await page.context().cookies();
   const jsessionCookie = cookies.find(c => c.name === 'JSESSIONID');
   const sessionHeader = `${jsessionCookie?.name}=${jsessionCookie?.value}`;

   //get the  newly created account id
   const accountId = await openNewAccountPage.getAccountId();
   expect(accountId).toBeTruthy();

   //bill payment
   const billPayPage = await homeIndexPage.clickBillPay();
   expect(await billPayPage.isBillPayPageDisplayed()).toBeTruthy();
   const billAmount = Constants.BillAmount.$100;
   await billPayPage.sendPayment(accountId, billAmount);
   expect(await billPayPage.isBillPaymentComplete()).toBeTruthy();

   //api validation
   const apiUtils = new ApiUtils();
   const apiContext = await request.newContext({ extraHTTPHeaders: { Cookie: sessionHeader } });
   const endpoint = `${Constants.ApiEndPoints.ACCOUNTS}/${accountId}/transactions/amount/${billAmount}?timeout=30000`;
   const result = await apiUtils.triggerApiCall(apiContext, 'GET', endpoint);
   const responseString: string = JSON.stringify(result["responseBody"]);
   const responseStatus: string = result["responseStatus"].toString();
   expect(responseString.includes(accountId.toString())).toBe(true);
   expect(responseStatus).toBe("200");

});

