# Playwright Test Automation Framework (TypeScript)

This repository contains a modular and scalable end-to-end test automation framework built on **Playwright + TypeScript**. It is Designed for both UI and API testing against the ParaBank application - https://parabank.parasoft.com/


## Features

- Page Object Model (POM) for UI test abstraction
- Hybrid orchestration for UI + API test flows
- Reusable intelligent wait strategies (`WaitUtils`)
- Cookie/session-aware API flows
- Modular `Constants` for Data abstraction
- Fixtures to set up test state dynamically
- Jenkins pipeline integration via `jenkinsfile`


---

## Getting Started Locally

Make sure [Node.js](https://nodejs.org/) is installed.

### Install and Run Tests

```bash
npm install               # Install dependencies
npx playwright install    # Download browser binaries
npx playwright test       # Run all specs in headless mode

### Run in Headed mode for debugging
```bash
npx playwright test --headed


### View HTML Report(in case of  Local execution)
npx playwright show-report


### CI/CD integration - Running Tests via Jenkins

**Pre-requisites:**
- Node.js installed on build agent
- Jenkins server is installed

1. Ensure Jenkins is running locally.
2. Open Jenkins UI → Create a Pipeline job.
3. In job configuration:
   - Select Pipeline script from SCM
   - Set repository URL - https://github.com/pavanmadrid88/parasoft-playwright-ts.git
   - Choose branch - main
   - Set Script Path to jenkinsfile
4. Trigger the build — it’ll run the tests and generate list report.
