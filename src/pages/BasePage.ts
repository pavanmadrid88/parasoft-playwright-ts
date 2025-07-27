// base/BasePage.ts
import { Page } from "@playwright/test";
import { WaitUtils } from "../utils/WaitUtils";

export class BasePage {
    protected page: Page;
    protected waitUtils: WaitUtils;

    constructor(page: Page) {
        this.page = page;
        this.waitUtils = new WaitUtils();
    }
}
