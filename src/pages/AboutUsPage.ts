import { Page } from "@playwright/test";
import { Constants } from "../data/constants";
import { BasePage } from "./BasePage";


export class AboutUsPage extends BasePage{

    private readonly aboutUsPage: Page;

    constructor(aboutUsPage: Page) {
        super(aboutUsPage);
        this.aboutUsPage = aboutUsPage;
    }

    async isAboutUsPageDisplayed() {
        const paraSoftDemoWebsiteTextPresent = await this.aboutUsPage.locator("text=ParaSoft Demo Website").isVisible({ timeout: 10000 });
        return paraSoftDemoWebsiteTextPresent && this.aboutUsPage.url().toUpperCase().includes("ABOUT");
    }


}