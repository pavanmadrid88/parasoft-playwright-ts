import { Locator, Page } from "@playwright/test";
import { HomeIndexPage } from "./HomeIndexPage";
import { AboutUsPage } from "./AboutUsPage";
import { ServicesPage } from "./ServicesPage";
import { SiteMapPage } from "./SiteMapPage";
import { ContactUsPage } from "./ContactUsPage";
import { BasePage } from "./BasePage";


export class GlobalNavigationMenuSection extends BasePage {

    private readonly globalNavigationMenuSection: Page;
    private readonly homeIndexLink: Locator;
    private readonly aboutUsLink: Locator;
    private readonly contactLink: Locator;
    private readonly locationsLink: Locator;
    private readonly servicesLink: Locator;
    private readonly productsLink: Locator;
    private readonly adminPageLink: Locator;
    private readonly forumLink: Locator;
    private readonly siteMapLink: Locator;

    constructor(globalNavigationMenuSection: Page) {
        super(globalNavigationMenuSection);
        this.globalNavigationMenuSection = globalNavigationMenuSection;
        this.homeIndexLink = globalNavigationMenuSection.getByRole('link', { name: 'Home', exact: true });
        this.aboutUsLink = globalNavigationMenuSection.locator("#headerPanel").getByRole("link", { name: "About Us" });
        this.contactLink = globalNavigationMenuSection.getByRole('link', { name: 'Contact Us', exact: true });
        this.servicesLink = globalNavigationMenuSection.locator("#headerPanel").getByRole('link', { name: 'Services', exact: true });
        this.productsLink = globalNavigationMenuSection.locator("#headerPanel").getByRole('link', { name: 'Products', exact: true });
        this.adminPageLink = globalNavigationMenuSection.getByRole('link', { name: 'Admins Page', exact: true });;
        this.locationsLink = globalNavigationMenuSection.locator("#headerPanel").getByRole('link', { name: 'Locations', exact: true });
        this.forumLink = globalNavigationMenuSection.getByRole('link', { name: 'Forum', exact: true });
        this.siteMapLink = globalNavigationMenuSection.getByRole('link', { name: 'Site Map', exact: true });
    }

    async clickHomeLink() {
        await this.homeIndexLink.click();
        return new HomeIndexPage(this.globalNavigationMenuSection);
    }

    async clickAboutUsLink() {
        await this.aboutUsLink.click();
        return new AboutUsPage(this.globalNavigationMenuSection);
    }

    async clickServicesLink() {
        await this.servicesLink.click();
        return new ServicesPage(this.globalNavigationMenuSection);
    }

    async clickProductsLink() {
        await this.productsLink.click();
    }

    async clickLocationsLink() {
        await this.locationsLink.click();
    }

    async clickForumsLink() {
        await this.forumLink.click();
    }

    async clickSiteMapLink() {
        await this.siteMapLink.click();
        return new SiteMapPage(this.globalNavigationMenuSection);
    }

    async clickContactUsLink() {
        await this.contactLink.click();
        return new ContactUsPage(this.globalNavigationMenuSection);
    }

    async clickAdminLink() {
        await this.adminPageLink.click();
    }

}