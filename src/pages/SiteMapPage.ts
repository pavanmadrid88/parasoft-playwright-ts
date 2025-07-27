import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SiteMapPage extends BasePage{

    private readonly siteMapPage: Page;
    private readonly solutionsText: Locator;
    
    constructor(siteMapPage: Page){
        super(siteMapPage);
        this.siteMapPage = siteMapPage;    
        this.solutionsText = siteMapPage.locator('#rightPanel').locator("text=Solutions");
    }

    async isSiteMapPageDisplayed() {
        //const solutionsTextPresent = await this.siteMapPage.locator('#rightPanel').locator("text=Solutions").isVisible({ timeout: 10000 });
        const solutionsTextPresent = await this.waitUtils.isElementInteractable(this.solutionsText);
        return solutionsTextPresent && this.siteMapPage.url().toUpperCase().includes("SITEMAP");
    }
    


}