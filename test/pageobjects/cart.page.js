import { $, $$ } from '@wdio/globals';

class CartPage {
    get cartItems() { return $$('.cart_item'); }
    get checkoutButton() { return $('[data-test="checkout"]'); }

    async findProduct(productName) {
        const items = await this.cartItems;

        for (const item of items) {
            const name = await item.$('[data-test="inventory-item-name"]').getText();

            if (name === productName) {
                return item;
            }
        }

        return null;
    }

    async proceedToCheckout() {
        await this.checkoutButton.waitForClickable();
        await this.checkoutButton.click();
    }
}

export default new CartPage();
