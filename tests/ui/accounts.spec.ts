
import { expect, request } from "@playwright/test";
import {test} from "../../src/fixtures/CombinedFixture"
import { HomeIndexPage } from "../../src/pages/HomeIndexPage";
import { Constants, DynamicData } from "../../src/data/constants";
import { triggerApiCall } from "../../src/utils/ApiUtils";




test('should verify the creation of new Savings account', async ({ page , userRegistrationPage,openNewAccountPage }) => {   
   const accountId = await openNewAccountPage.getAccountId();
   expect(accountId).toBeTruthy();   
   console.log("Newly created account ID:" + accountId)  

});


test('should verify the account overview page', async ({ page , userRegistrationPage,openNewAccountPage }) => {   
   const homeIndexPage = new HomeIndexPage(page);
   const accountId = await openNewAccountPage.getAccountId();
   expect(accountId).toBeTruthy();
   console.log("Newly created account ID:" + accountId)       

   const accountsOverviewPage = await homeIndexPage.clickAccountsOverviewPage();   
   expect(await accountsOverviewPage.isAccountsOverviewPageDisplayed(accountId)).toBeTruthy();   


});

test('should verify the transfer of funds from one account to other', async ({ page , userRegistrationPage,openNewAccountPage }) => {   
   const homeIndexPage = new HomeIndexPage(page);
   const accountsOverviewPage = await homeIndexPage.clickAccountsOverviewPage();   
   const accountIdList = await accountsOverviewPage.getAccountIdDetails();
   console.log("accountidlist:" + accountIdList)
   const accountId = await openNewAccountPage.getAccountId();   
   console.log("accountId:" + accountId)
   const toAccountId = accountIdList.find(id => id.trim() !== accountId.trim());
   expect(accountId && toAccountId).toBeTruthy();   
   console.log("Newly created account ID:" + accountId)  
   const transferFundsPage = await homeIndexPage.clickTransferFunds();   
   expect(await transferFundsPage.isTransferFundsPageDisplayed()).toBeTruthy();     
   expect(await transferFundsPage.transferFunds("1",accountId,toAccountId)).toBeTruthy();  

});


test.only('should verify the bill payment', async ({ page , userRegistrationPage,openNewAccountPage }) => {   
   const homeIndexPage = new HomeIndexPage(page);

   const cookies = await page.context().cookies();
   const jsessionCookie = cookies.find(c => c.name === 'JSESSIONID');
   const sessionHeader = `${jsessionCookie?.name}=${jsessionCookie?.value}`;
   console.log("Session header:" + sessionHeader);

   //get the  newly created account id
    const accountId = await openNewAccountPage.getAccountId();   
    console.log("accountId:" + accountId)
  
   expect(accountId).toBeTruthy();   
   console.log("Newly created account ID:" + accountId)  
  // DynamicData.billPaymentFromAccount = accountId;

   //bill payment
   const billPayPage = await homeIndexPage.clickBillPay();   
   expect(await billPayPage.isBillPayPageDisplayed()).toBeTruthy();  
   const billAmount = "100";
   //DynamicData.billPaymentFromAccount = billAmount.toString();
   await billPayPage.sendPayment(accountId,billAmount);
   expect(await billPayPage.isBillPaymentComplete()).toBeTruthy();

   //api validation
   const apiContext = await request.newContext({extraHTTPHeaders:{Cookie:sessionHeader}});
   const endpoint = `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${billAmount}?timeout=30000`;
   const result = await triggerApiCall(apiContext, 'GET', endpoint);
   console.log('API response:', result);
   const parsedResult = await JSON.parse(result);
   expect(parsedResult.id).toBe(accountId);
   
});

