import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly cartItemName: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.cartItemName = page.locator('.cart_item_label a div');
        this.checkoutButton = page.locator('.checkout_button');
        this.continueShoppingButton = page.locator('.btn_secondary');
    }

    async getCartItemName(): Promise<string | null> {
        return await this.cartItemName.textContent();
    }

    async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeItem(productName: string) {
        const item = this.cartItems.filter({
            hasText: productName
        });
        await item.locator('button').click();
    }
}