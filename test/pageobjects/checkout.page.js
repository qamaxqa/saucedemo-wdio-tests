import { $, $$ } from '@wdio/globals';

class CheckoutPage {
    get firstNameInput() { return $('[data-test="firstName"]'); }
    get lastNameInput() { return $('[data-test="lastName"]'); }
    get postalCodeInput() { return $('[data-test="postalCode"]'); }
    get continueButton() { return $('[data-test="continue"]'); }
    get overviewTitle() { return $('[data-test="title"]'); }
    get overviewItems() { return $$('.cart_item'); }
    get finishButton() { return $('[data-test="finish"]'); }
    get completeHeader() { return $('[data-test="complete-header"]'); }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.waitForDisplayed();
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await this.continueButton.waitForClickable();
        await this.continueButton.click();
    }

    async findOverviewProduct(productName) {
        const items = await this.overviewItems;

        for (const item of items) {
            const name = await item.$('[data-test="inventory-item-name"]').getText();

            if (name === productName) {
                return item;
            }
        }

        return null;
    }

    async finish() {
        await this.finishButton.waitForClickable();
        await this.finishButton.click();
    }
}

export default new CheckoutPage();
