
import { GlobalNavigationMenuSection } from "../../src/pages/GlobalNavigationMenuSection";
import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/CombinedFixture"





test('should verify the global navigation menu link items', async ({ page, userRegistrationPage }) => {

   const globalNavigationMenuSection = new GlobalNavigationMenuSection(page);

   //click on Home link
   const homePage = await globalNavigationMenuSection.clickHomeLink();
   expect(await homePage.isHomeIndexPageDisplayed()).toBeTruthy();

   //click on About Us link
   const aboutUsPage = await globalNavigationMenuSection.clickAboutUsLink();
   expect(await aboutUsPage.isAboutUsPageDisplayed()).toBeTruthy();

   //Click on services link
   const servicesPage = await globalNavigationMenuSection.clickServicesLink();
   expect(await servicesPage.isServicesPageDisplayed()).toBeTruthy();

   //Click on sitemap link
   const siteMapPage = await globalNavigationMenuSection.clickSiteMapLink();
   expect(await siteMapPage.isSiteMapPageDisplayed()).toBeTruthy();

   //Click on contact us link
   const contactUsPage = await globalNavigationMenuSection.clickContactUsLink();
   expect(await contactUsPage.isContactUsPageDisplayed()).toBeTruthy();

});
