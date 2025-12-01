import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { CartPage } from './CartPage';

export class PageManager {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly cartPage: CartPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
    }
}