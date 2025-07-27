import { Locator } from "@playwright/test";

export class WaitUtils {

    async isElementInteractable(locator: Locator, timeout: number=10000,forceTimeout: number=0) {
        try {
            
            if (forceTimeout > 0) {
                await locator.page().waitForTimeout(forceTimeout);
            }

            const isVisible = await locator.isVisible();
            const isEnabled = await locator.isEnabled();

            return isVisible && isEnabled;
        } catch (error) {
            console.warn(`Element not interactable within ${timeout}ms`, error);
            return false;
        }
    }
}
