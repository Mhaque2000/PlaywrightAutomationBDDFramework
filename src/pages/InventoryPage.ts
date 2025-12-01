import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly settingsButton: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.settingsButton = page.locator('.bm-burger-button');
        this.cartIcon = page.locator('[data-icon="shopping-cart"]');
    }

    async addProductToCart(productName: string) {
        const productElement = this.inventoryItems.filter({
            hasText: productName
        });
        await productElement.locator('button').click();
    }

    async openSettings() {
        await this.settingsButton.click();
    }

    async clickSidebarLink(linkName: string) {
        await this.page.locator(`#${linkName}_sidebar_link`).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async logout() {
        await this.openSettings();
        await this.clickSidebarLink('logout');
    }
}