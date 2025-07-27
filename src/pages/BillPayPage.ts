import { Locator, Page } from "@playwright/test";


export class BillPayPage{

    private readonly billPayPage: Page;
    private readonly billPayPageText: Locator;
    private readonly payeeNameInput: Locator;
    private readonly transferAmountInput: Locator;
    private readonly payeeAddressInput: Locator;
    private readonly payeeCityInput: Locator;
    private readonly payeeStateInput: Locator;
    private readonly payeeZipCodeInput: Locator;
    private readonly payeePhoneNumberInput: Locator;
    private readonly payeeAccountumberInput: Locator;
    private readonly payeeVerifyAccountumberInput: Locator;
    private readonly payeeAmountInput: Locator;
    private readonly fromAccountSelect: Locator;
    private readonly billPaymentCompleteText: Locator;
    private readonly sendPaymentButton: Locator;
    
    constructor(billPayPage: Page){
        this.billPayPage = billPayPage;    
        this.billPayPageText = billPayPage.locator("//h1[contains(text(),'Bill Payment Service')]");
        this.billPaymentCompleteText = billPayPage.locator("//h1[contains(text(),'Bill Payment Complete')]");
        this.payeeNameInput = billPayPage.locator("input[name='payee.name']");
        this.payeeAddressInput = billPayPage.locator("input[name='payee.address.street']");
        this.payeeCityInput = billPayPage.locator("input[name='payee.address.city']");
        this.payeeStateInput = billPayPage.locator("input[name='payee.address.state']");
        this.payeeZipCodeInput = billPayPage.locator("input[name='payee.address.zipCode']");
        this.payeePhoneNumberInput = billPayPage.locator("input[name='payee.phoneNumber']");
        this.payeeAccountumberInput = billPayPage.locator("input[name='payee.accountNumber']");
        this.payeeVerifyAccountumberInput = billPayPage.locator("input[name='verifyAccount']");
        this.payeeAmountInput = billPayPage.locator("input[name='amount']");
        this.fromAccountSelect =  billPayPage.locator("select[name='fromAccountId']");
        this.sendPaymentButton =  billPayPage.locator("input[type='button'][value='Send Payment']");
       
    }

    async isBillPayPageDisplayed() {        
        const billPayPageText = await this.billPayPageText.isVisible({ timeout: 10000 }); // Waits up to 10 seconds
        const url = this.billPayPage.url().toUpperCase().includes("BILLPAY");
        return billPayPageText && url;
    }

    async sendPayment(fromAccountId,billAmount){
        const randomSuffix = Math.floor(Math.random() * 100000);
        const payeeName = `pavantestpayee${randomSuffix}`;
        await this.payeeNameInput.fill(payeeName)

        const address = `pavantestaddress${randomSuffix}`; 
        await this.payeeAddressInput.fill(address)

        const city = `pavantestcity${randomSuffix}`; 
        await this.payeeCityInput.fill(city)

        const state = `pavanteststate${randomSuffix}`; 
        await this.payeeStateInput.fill(state)

        const zipCode = `pavantestzipcode${randomSuffix}`; 
        await this.payeeZipCodeInput.fill(zipCode)

        const phoneNumber = `pavantestphonenumber${randomSuffix}`; 
        await this.payeePhoneNumberInput.fill(phoneNumber)

        const accountNumber = `${randomSuffix}`; 
        await this.payeeAccountumberInput.fill(accountNumber)
        await this.payeeVerifyAccountumberInput.fill(accountNumber);

        await this.payeeAmountInput.fill(billAmount);

        await this.fromAccountSelect.selectOption(fromAccountId)

        await this.billPayPage.waitForTimeout(2000);

        await this.sendPaymentButton.click();

    }    

    async isBillPaymentComplete(){     
        //await this.billPayPage.waitForTimeout(2000)
        try {
            await this.billPaymentCompleteText.waitFor({ state: 'visible', timeout: 10000 });
            return true;
          } catch {
            return false;
          }
    }


}