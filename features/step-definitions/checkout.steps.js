import { When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import InventoryPage from '../../test/pageobjects/inventory.page.js';
import CartPage from '../../test/pageobjects/cart.page.js';
import CheckoutPage from '../../test/pageobjects/checkout.page.js';

When('I add {string} to the cart', async (productName) => {
    await InventoryPage.addProductToCart(productName);
});

Then('the cart badge should contain {string}', async (expectedCount) => {
    await InventoryPage.cartBadge.waitForDisplayed();
    await expect(InventoryPage.cartBadge).toHaveText(expectedCount);
});

When('I open the cart', async () => {
    await InventoryPage.openCart();
    expect(await browser.getUrl()).toContain('cart.html');
});

Then('{string} should be present in the cart', async (productName) => {
    const item = await CartPage.findProduct(productName);

    expect(item).not.toBeNull();
    await expect(item).toBeDisplayed();
});

When('I proceed to checkout', async () => {
    await CartPage.proceedToCheckout();
    expect(await browser.getUrl()).toContain('checkout-step-one.html');
});

When(
    'I enter checkout information {string}, {string}, {string}',
    async (firstName, lastName, postalCode) => {
        await CheckoutPage.fillInformation(firstName, lastName, postalCode);
    }
);

Then('the checkout overview should be displayed', async () => {
    expect(await browser.getUrl()).toContain('checkout-step-two.html');
    await expect(CheckoutPage.overviewTitle).toHaveText('Checkout: Overview');
});

Then(
    '{string} should be present in the checkout overview',
    async (productName) => {
        const item = await CheckoutPage.findOverviewProduct(productName);

        expect(item).not.toBeNull();
        await expect(item).toBeDisplayed();
    }
);

When('I finish the checkout', async () => {
    await CheckoutPage.finish();
});

Then('I should see the message {string}', async (expectedMessage) => {
    await CheckoutPage.completeHeader.waitForDisplayed();
    await expect(CheckoutPage.completeHeader).toHaveText(expectedMessage);
    expect(await browser.getUrl()).toContain('checkout-complete.html');
});
