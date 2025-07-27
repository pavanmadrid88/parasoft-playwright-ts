# Playwright Test Automation Framework (TypeScript)

This repository contains a modular and scalable end-to-end test automation framework built on **Playwright + TypeScript**. It is Designed for both UI and API testing against the ParaBank application - https://parabank.parasoft.com/


## Features

- Page Object Model (POM) structure
- Hybrid UI + API orchestration
- Intelligent wait strategies with reusable `WaitUtils`
- Cookie/session-aware API flows
- Modular `Constants` and endpoint abstraction
- Test data chaining between flows 



## 🚀 Getting Started

```bash
npm install
npx playwright install
npx playwright test



### Running Tests via Jenkins
1. Ensure Jenkins is installed and running locally.
2. Clone this repo on your Jenkins server.
3. Create a Pipeline Job in Jenkins UI.
4. Point it to this repo and branch.
5. Trigger the build — it’ll run Playwright tests and generate reports.

**Pre-requisites:**
- Node.js installed
- Playwright browsers installed (auto-handled by pipeline)

