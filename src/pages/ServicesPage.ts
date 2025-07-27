import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ServicesPage extends BasePage {

    private readonly servicesPage: Page;
    private readonly availableBookstoreSoapText: Locator;
    private readonly openApiLink: Locator;

    constructor(servicesPage: Page) {
        super(servicesPage);
        this.servicesPage = servicesPage;
        this.availableBookstoreSoapText = servicesPage.locator("//span[text()='Available Bookstore SOAP services:']");
        this.openApiLink = servicesPage.locator("a[href*='api-docs']");

    }

    async isServicesPageDisplayed() {
        const openApiLinkPresent = await this.waitUtils.isElementInteractable(this.openApiLink);
        const availableBookstoreSoapTextPresent = await this.waitUtils.isElementInteractable(this.availableBookstoreSoapText);
        return availableBookstoreSoapTextPresent && this.servicesPage.url().toUpperCase().includes("SERVICES");
    }

}