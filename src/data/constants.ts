
export class Constants {
    static readonly accountCreatedSuccessfullyText = "Your account was created successfully. You are now logged in.";
    static readonly registrationUrl = "https://parabank.parasoft.com/parabank/register.htm";
    static readonly loginUrl = "https://parabank.parasoft.com/parabank/index.htm"
    static readonly usernameAlreadyExistsText = "This username already exists."

    //User Registration Status
    static readonly UserRegistrationStatus = {
        FAIL: "FAIL",
        USERNAME_ALREADY_REGISTERED: "USERNAME_ALREADY_REGISTERED",
        PASS: "PASS",
        DEFAULT: "DEFAULT"
    };

    //User Registration Data
    static readonly UserRegistrationData = {
        ADDRESS: "Playwright Street 101",
        CITY: "Playwright City",
        STATE: "Playwright State",
        ZIP: "61239",
        PHONE_NUMBER: "244244244",
        SSN: "1212"
    };

    //API Endpoints
    static readonly ApiEndPoints ={
        ACCOUNTS : "https://parabank.parasoft.com/parabank/services_proxy/bank/accounts"
    };

    //Bill Amount
    static readonly BillAmount = {
        $100: "100"
    };
}
