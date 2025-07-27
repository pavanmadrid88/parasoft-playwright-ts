import { expect, Locator, Page } from "@playwright/test";
import { Constants } from "../data/constants";
import { BasePage } from "./BasePage";


export class UserRegistrationPage extends BasePage {

    private readonly userRegistrationPage: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly addressInput: Locator;
    private readonly cityInput: Locator;
    private readonly stateInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly phoneNumberInput: Locator;
    private readonly ssnInput: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly registerButton: Locator;
    private credentials;

    constructor(userRegistrationPage: Page) {
        super(userRegistrationPage);
        this.userRegistrationPage = userRegistrationPage;
        this.firstNameInput = userRegistrationPage.locator("input#customer\\.firstName");
        this.lastNameInput = userRegistrationPage.locator("input#customer\\.lastName");
        this.addressInput = userRegistrationPage.locator("input#customer\\.address\\.street");
        this.cityInput = userRegistrationPage.locator("input#customer\\.address\\.city");
        this.stateInput = userRegistrationPage.locator("input#customer\\.address\\.state");
        this.zipCodeInput = userRegistrationPage.locator("input#customer\\.address\\.zipCode");
        this.phoneNumberInput = userRegistrationPage.locator("input#customer\\.phoneNumber");
        this.ssnInput = userRegistrationPage.locator("input#customer\\.ssn");
        this.userNameInput = userRegistrationPage.locator("input#customer\\.username");
        this.passwordInput = userRegistrationPage.locator("input#customer\\.password");
        this.confirmPasswordInput = userRegistrationPage.locator("input#repeatedPassword")
        this.registerButton = userRegistrationPage.locator("input[class = 'button'][value = 'Register']")
    }

    async goto() {
        await this.userRegistrationPage.goto(Constants.registrationUrl);

    }

    async register(firstName, lastName, address, city, state, zipcode, phoneNumber, ssn, userName, password) {

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipCodeInput.fill(zipcode);
        await this.phoneNumberInput.fill(phoneNumber);
        await this.ssnInput.fill(ssn);
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.waitUtils.isElementInteractable(this.registerButton);
        // await this.registerButton.waitFor({ state: 'visible', timeout: 10000 });
        // await this.userRegistrationPage.waitForTimeout(2000); // small delay before submit
        await this.registerButton.click()
        await this.setCredentials(userName, password)
    }

    async setCredentials(userName, password) {
        this.credentials = { "Username": userName, "Password": password }
    }

    async getRegisteredUsernDetails() {
        return this.credentials;
    }


    async isRegistrationSuccessful(userName) {
        let userRegistrationStatus = "FAIL"
        try {

            await expect(this.userRegistrationPage.locator('h1.title', { hasText: `Welcome ${userName}` })).toBeVisible();
            await expect(this.userRegistrationPage.getByText(Constants.accountCreatedSuccessfullyText)).toBeVisible();
            userRegistrationStatus = "PASS"

        } catch (error) {
            const existsMessage = this.userRegistrationPage.getByText(Constants.usernameAlreadyExistsText)
            if (await existsMessage.isVisible()) {
                userRegistrationStatus = "USERNAME_ALREADY_REGISTERED"
            } else {
                console.error(`Error occured while checking for succesfull user registration ${error}`)
            }

        }
        return userRegistrationStatus

    }

}