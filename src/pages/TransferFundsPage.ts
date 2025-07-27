import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class TransferFundsPage extends BasePage {

    private readonly transferFundsPage: Page;
    private readonly transferFundsPageText: Locator;
    private readonly transferCompleteText: Locator;
    private readonly transferAmount: Locator;
    private readonly fromTransferAccountSelect: Locator;
    private readonly toTransferAccountSelect: Locator;
    private readonly transferButton: Locator

    constructor(transferFundsPage: Page) {
        super(transferFundsPage);
        this.transferFundsPage = transferFundsPage;
        this.transferFundsPageText = transferFundsPage.locator("//h1[contains(text(),'Transfer Funds')]");
        this.transferCompleteText = transferFundsPage.locator("//h1[contains(text(),'Transfer Complete!')]");
        this.transferAmount = transferFundsPage.locator("input#amount");
        this.fromTransferAccountSelect = transferFundsPage.locator("select#fromAccountId");
        this.toTransferAccountSelect = transferFundsPage.locator("select#toAccountId");
        this.transferButton = transferFundsPage.locator("input[type='submit'][value='Transfer']")
    }

    async isTransferFundsPageDisplayed() {
        //const transferFundsPageText = await this.transferFundsPageText.isVisible({ timeout: 10000 }); // Waits up to 10 seconds
        const transferFundsPageText = await this.waitUtils.isElementInteractable(this.transferFundsPageText);
        const url = this.transferFundsPage.url().toUpperCase().includes("TRANSFER");
        return transferFundsPageText && url;
    }

    async transferFunds(transferAmount: string, fromAccountId: string, toAccountId) {
        await this.transferAmount.fill(transferAmount);
        await this.fromTransferAccountSelect.selectOption(fromAccountId);
        await this.toTransferAccountSelect.selectOption(toAccountId);
        await this.waitUtils.isElementInteractable(this.transferButton);
        await this.transferButton.click();
        const transferCompleteTextVisible = await this.waitUtils.isElementInteractable(this.transferCompleteText, 10000, 2000);
        return transferCompleteTextVisible
    }

}