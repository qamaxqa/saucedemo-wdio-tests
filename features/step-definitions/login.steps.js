import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, expect } from '@wdio/globals';
import LoginPage from '../../test/pageobjects/login.page.js';
import InventoryPage from '../../test/pageobjects/inventory.page.js';

Given('I open the SauceDemo login page', async () => {
    await LoginPage.open();
});

Given('I am logged in as {string}', async (username) => {
    await LoginPage.open();
    await LoginPage.login(username, 'secret_sauce');

    await InventoryPage.waitUntilLoaded();
    await expect(InventoryPage.inventoryContainer).toBeDisplayed();
    expect(await browser.getUrl()).toContain('inventory.html');
});

When(
    'I login with username {string} and password {string}',
    async (username, password) => {
        await LoginPage.login(username, password);
    }
);

Then(
    'login result should be {string} with message {string}',
    async (result, expectedMessage) => {
        if (result === 'success') {
            await InventoryPage.waitUntilLoaded();
            await expect(InventoryPage.inventoryContainer).toBeDisplayed();
            expect(await browser.getUrl()).toContain('inventory.html');
            return;
        }

        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText(expectedMessage);
        expect(await browser.getUrl()).not.toContain('inventory.html');
    }
);
