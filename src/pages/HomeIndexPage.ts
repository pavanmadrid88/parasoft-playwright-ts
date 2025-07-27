import { Locator, Page } from "@playwright/test";
import { OpenAccountPage } from "./OpenAccountPage";
import { AccountsOverviewPage } from "./AccountsOverviewPage";
import { TransferFundsPage } from "./TransferFundsPage";
import { BillPayPage } from "./BillPayPage";
import { BasePage } from "./BasePage";


export class HomeIndexPage extends BasePage {

    private readonly homeIndexPage: Page;
    private readonly openNewAccountLink: Locator;
    private readonly accountsOverviewPageLink: Locator;
    private readonly transferFundsLink: Locator;
    private readonly billPayLink: Locator;
    private readonly atmServicesText: Locator;
    private readonly onlineServicesText: Locator;

    constructor(homeIndexPage: Page) {
        super(homeIndexPage);
        this.homeIndexPage = homeIndexPage;
        this.openNewAccountLink = homeIndexPage.locator("a[href*='openaccount']");
        this.accountsOverviewPageLink = homeIndexPage.locator("a[href*='overview']");
        this.transferFundsLink = homeIndexPage.locator("a[href*='transfer']");
        this.billPayLink = homeIndexPage.locator("a[href*='billpay']");
        this.atmServicesText = homeIndexPage.locator("text=ATM Services");
        this.onlineServicesText = homeIndexPage.locator("text=Online Services");

    }

    async isHomeIndexPageDisplayed() {
        const atmServicesPresent = await this.waitUtils.isElementInteractable(this.atmServicesText);
        const onlineServicesPresent = await this.waitUtils.isElementInteractable(this.onlineServicesText);
        return atmServicesPresent && onlineServicesPresent;
    }

    async clickOpenNewAccount() {
        await this.openNewAccountLink.click();
        const openNewAccountPage = new OpenAccountPage(this.homeIndexPage);
        return openNewAccountPage;
    }

    async clickAccountsOverviewPage() {
        await this.accountsOverviewPageLink.click();
        const accountsOverviewPage = new AccountsOverviewPage(this.homeIndexPage);
        return accountsOverviewPage;
    }

    async clickTransferFunds() {
        await this.transferFundsLink.click();
        const transferFundsPage = new TransferFundsPage(this.homeIndexPage);
        return transferFundsPage;
    }

    async clickBillPay() {
        await this.billPayLink.click();
        const billPayPage = new BillPayPage(this.homeIndexPage);
        return billPayPage;
    }


}