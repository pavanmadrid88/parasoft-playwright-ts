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

## 🧑‍💻 Getting Started Locally

Make sure [Node.js](https://nodejs.org/) is installed.

### Install and Run Tests

```bash
npm install               # Install dependencies
npx playwright install    # Download browser binaries
npx playwright test       # Run all specs in headless mode



### CI/CD integration - Running Tests via Jenkins

**Pre-requisites:**
- Node.js installed
- Jenkins server is installed

1. Ensure Jenkins is running locally.
2. Clone this repo on your Jenkins server.
3. Create a Pipeline Job in Jenkins UI.
4. Point it to this repo and branch (main).
5. Trigger the build — it’ll run Playwright tests and generate list report.
