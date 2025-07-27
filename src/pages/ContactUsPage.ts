import { Page } from "@playwright/test";


export class ContactUsPage{

    private readonly contactUsPage: Page;
    
    constructor(contactUsPage: Page){
        this.contactUsPage = contactUsPage;    
    }

    async isContactUsPageDisplayed() {
        const customerCareTextPresent = await this.contactUsPage.locator("//h1[text()='Customer Care']").isVisible({ timeout: 10000 });
        return customerCareTextPresent && this.contactUsPage.url().toUpperCase().includes("CONTACT");

    }
    


}