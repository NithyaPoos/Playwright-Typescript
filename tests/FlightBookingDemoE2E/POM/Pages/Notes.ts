// 1) Tests   → assertions + scenario flow + data injection
//             Data-driven inputs, assertions, scenario flow
// 2) Page Objects → UI actions, element locators, reusable behaviors
//               BasePage class (common methods for all pages)
// 3) Data Files → Test data, environment data
// 4) Utilities → reusable helpers (sorting, waits, formatting, parsing, logging, etc.)
// 5) Config	Browser, retries, parallelism, reporters
/**
  If a locator is used once, keep it inline.
✔ If a locator is used multiple times, put it in the constructor.
✔ If a locator is complex or dynamic, put it in the constructor.
✔ If a locator is part of the page’s identity (e.g., table rows), put it in the constructor.

//testdata into test
=======================
Playwright uses loops, arrays, or test.describe() with fixtures to achieve data‑driven execution.
 * 
 */

/*
project/
│
├── pages/
│   ├── HomePage.ts
│   ├── ReservePage.ts
│   ├── PurchasePage.ts
│   └── ConfirmationPage.ts
│
├── data/
│   ├── models.ts
│   └── flightData.ts
│
├── utils/
│   ├── priceUtils.ts
│   ├── waitUtils.ts
│   └── logger.ts
│
├── tests/
│   └── flightBooking.spec.ts
│
└── playwright.config.ts

*/
/*
Allure-reports:
----------------
install
npm i -D allure-playwright

wire into playwright 
---------------------
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { getEnvConfig } from './config/env';

const env = getEnvConfig();

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: env.baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ]
});

A modular Playwright framework using Page Object Model. 
Each page has its own class, and common actions are abstracted into a BasePage and
Have used Playwright’s recommended locators like getByRole and getByPlaceholder to ensure stability. The tests are fully data‑driven using external JSON/TS files. I added utilities for reusable logic like price extraction and logging. Reporting is handled through Allure, and the entire suite runs in GitHub Actions CI/CD with artifacts uploaded for debugging.
This structure makes the framework scalable, maintainable, and easy to extend



Generate & open Allure report locally
--------------------------------------
npx playwright test
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report




=================================
Github actions CI/CD pipeline
==================================
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests (QA env)
        env:
          TEST_ENV: qa
        run: npx playwright test

      - name: Upload Playwright HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report

      - name: Upload Allure results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results

**
*/