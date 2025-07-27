import { Page, Locator } from '@playwright/test';
import { Constants } from '../data/constants';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{

    private readonly loginPage: Page;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(loginPage: Page){
        super(loginPage);
        this.loginPage = loginPage;
        this.userNameInput = loginPage.locator("input[name = 'username']");
        this.passwordInput = loginPage.locator("input[name = 'password']");
        this.loginButton = loginPage.locator("input[class='button'][value = 'Log In']")
    }

    async goto(){
        await this.loginPage.goto(Constants.loginUrl)
    }

    async login(username: string,password: string){
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }


}

