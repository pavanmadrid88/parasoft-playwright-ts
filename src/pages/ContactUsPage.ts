import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ContactUsPage extends BasePage {

    private readonly contactUsPage: Page;
    private readonly customerCareText: Locator;

    constructor(contactUsPage: Page) {
        super(contactUsPage);
        this.contactUsPage = contactUsPage;
        this.customerCareText = contactUsPage.locator("//h1[text()='Customer Care']");
    }

    async isContactUsPageDisplayed() {
        const customerCareTextPresent = await this.waitUtils.isElementInteractable(this.customerCareText);
        return customerCareTextPresent && this.contactUsPage.url().toUpperCase().includes("CONTACT");
    }



}