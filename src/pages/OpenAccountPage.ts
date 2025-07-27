import { Page, Locator } from '@playwright/test';
import { Constants } from '../data/constants';
import { BasePage } from './BasePage';

export class OpenAccountPage extends BasePage{

    private readonly openAccountPage: Page;
    private readonly accountTypeSelect: Locator;
    private readonly openNewAccountButton: Locator;
    private readonly newAccountId : Locator;
    private accountId : string;
    private readonly fromAccountIdSelect: Locator;
    

    constructor(openAccountPage: Page){
        super(openAccountPage);
        this.openAccountPage = openAccountPage;
        this.accountTypeSelect = openAccountPage.locator("select#type");
        this.openNewAccountButton = openAccountPage.locator("input[class='button'][value = 'Open New Account']");
        this.newAccountId = openAccountPage.locator("a#newAccountId");
        this.fromAccountIdSelect = openAccountPage.locator("select#fromAccountId");
    }

    async openNewAccount(){
        await this.accountTypeSelect.selectOption({ label: 'SAVINGS' });
        await this.waitUtils.isElementInteractable(this.fromAccountIdSelect,5000,2000);
        await this.waitUtils.isElementInteractable(this.openNewAccountButton);
        await this.openNewAccountButton.click();
        await this.waitUtils.isElementInteractable(this.newAccountId,5000,2000);
        const newAccountIdText = await this.newAccountId.innerText();
        this.accountId = newAccountIdText;    
    }

    async getAccountId(){
        return this.accountId;
    }


   



}

