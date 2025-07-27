// base/BasePage.ts
import { Page } from "@playwright/test";
import { WaitUtils } from "../utils/WaitUtils";
import { ApiUtils } from "../utils/ApiUtils";

export class BasePage {
    protected page: Page;
    protected waitUtils: WaitUtils;
    protected apiUtils: ApiUtils;

    constructor(page: Page) {
        this.page = page;
        this.waitUtils = new WaitUtils();
        this.apiUtils = new ApiUtils();
    }
}
