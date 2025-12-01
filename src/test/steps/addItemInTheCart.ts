import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
import { PageManager } from '../../pages/PageManager';

setDefaultTimeout(60 * 1000);

let pageManager: PageManager;

When(/^I add "([^"]*)" in the cart$/, async (productName: string) => {
    pageManager = new PageManager(pageFixture.page);
    await pageManager.inventoryPage.addProductToCart(productName);
});

When(/^I go to the cart page$/, async () => {
    await pageManager.inventoryPage.goToCart();
});

Then(/^I validate the cart$/, async () => {
    const addedItem = await pageManager.cartPage.getCartItemName();
    expect(addedItem).toBe('Sauce Labs Backpack');
});