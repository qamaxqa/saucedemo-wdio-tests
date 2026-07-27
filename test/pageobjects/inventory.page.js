import { $, $$ } from '@wdio/globals';

class InventoryPage {
    get inventoryContainer() { return $('[data-test="inventory-container"]'); }
    get inventoryItems() { return $$('.inventory_item'); }
    get cartLink() { return $('[data-test="shopping-cart-link"]'); }
    get cartBadge() { return $('[data-test="shopping-cart-badge"]'); }

    async waitUntilLoaded() {
        await this.inventoryContainer.waitForDisplayed();
    }

    async findProductCard(productName) {
        await this.waitUntilLoaded();

        const items = await this.inventoryItems;

        for (const item of items) {
            const name = await item.$('[data-test="inventory-item-name"]').getText();

            if (name === productName) {
                return item;
            }
        }

        throw new Error(`Product "${productName}" was not found.`);
    }

    async addProductToCart(productName) {
        const productCard = await this.findProductCard(productName);
        const button = await productCard.$('button');

        await button.waitForClickable();
        await button.click();
    }

    async openCart() {
        await this.cartLink.waitForClickable();
        await this.cartLink.click();
    }
}

export default new InventoryPage();
