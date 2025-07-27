import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class AccountsOverviewPage extends BasePage {

    private readonly accountsOverviewPage: Page;
    private readonly accountsOverviewText: Locator;
    private readonly accountIdTableLink: Locator;
    private readonly accountIdTableLinks: Locator;
    private readonly totalText: Locator;

    constructor(accountsOverviewPage: Page) {
        super(accountsOverviewPage);
        this.accountsOverviewPage = accountsOverviewPage;
        this.accountsOverviewText = accountsOverviewPage.locator("//h1[contains(text(),'Accounts Overview')]");
        this.accountIdTableLink = accountsOverviewPage.locator("//td/a[contains(@href,'activity')]");
        this.accountIdTableLinks = accountsOverviewPage.locator("td a[href*='activity.htm?id']");
        this.totalText = accountsOverviewPage.locator("//td//b[contains(text(),'Total')]");
    }

    async isAccountsOverviewPageDisplayed(accountId: string) {
        const isVisible = await this.waitUtils.isElementInteractable(this.accountsOverviewText,10000,2000);
        const urlMatches = this.accountsOverviewPage.url().toUpperCase().includes("OVERVIEW");
        const isAccountIdVisible = this.accountsOverviewPage.locator("//td/a[contains(@href,'" + accountId + "')]")
        return isVisible && urlMatches && isAccountIdVisible;
    }

    async getAccountIdDetails() {
        await this.waitUtils.isElementInteractable(this.totalText);
        const accountIdLinks = await this.accountIdTableLinks.elementHandles();
        const accountIdList: string[] = [];
        for (const element of accountIdLinks) {
            const text = await element.textContent();
            if (text?.trim()) {
                accountIdList.push(text.trim());
            }
        }
        return accountIdList;
    }



}