# SauceDemo WebDriverIO

Final task for Automated Testing in JavaScript.

## Task description

"End-to-End" Flow

Focus: Happy path execution and checkout logic.

Launch URL: https://www.saucedemo.com/

UC-1 Checkout Flow:
- Login with standard_user.
- Add a specific product to the cart (parametrize the product name, e.g. "Sauce Labs Backpack").
- Navigate to the Cart and validate the item is present.
- Proceed to Checkout.
- Fill in the Information form (First Name, Last Name, Zip).
- Complete the checkout and validate the success message: "Thank you for your order!"

UC-2 Data Driven Login:
- Use a Data Provider to test login with:
  1. standard_user (Should pass).
  2. locked_out_user (Should fail with specific error message).

Technical Requirements:
- Tool: WebDriverIO.
- Browsers: Chrome, Edge (Run in Parallel).
- Pattern: Page Object Model (POM).
- Locators: CSS Selectors.
- Reporting: Allure Report (or similar HTML report).
- Documentation: README.md explaining how to run the tests and generate the report.

## Run

Node.js 20 is used for this project.

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

## Allure

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```
