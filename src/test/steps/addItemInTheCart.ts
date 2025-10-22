import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
setDefaultTimeout(60 * 1000);
When(/^I add "([^"]*)" in the cart$/, async (productName) => {
	const products = pageFixture.page.locator('.inventory_item')
	const productElement = products.filter({
		hasText: 'Sauce Labs Backpack'
	})
	await productElement.locator('button').click();
});
When(/^I go to the cart page$/, async () => {
	await pageFixture.page.locator('[data-icon="shopping-cart"]').click();
});
Then(/^I validate the cart$/, async () => {
	const addedItem = await pageFixture.page.locator('.cart_item_label a div').textContent();
	expect(addedItem).toBe('Sauce Labs Backpack');
});
