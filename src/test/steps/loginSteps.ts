import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
setDefaultTimeout(60 * 1000);
Given(/^I am on the login page$/, async () => {
	await pageFixture.page.goto('https://www.saucedemo.com/v1/');
});
When(/^I login with the valid credentials$/, async () => {
	await pageFixture.page.locator('[name="user-name"]').fill('standard_user');
	await pageFixture.page.locator('[name="password"]').fill('secret_sauce');
	await pageFixture.page.locator('[type="submit"]').click();
});
When(/^I login with the invalid credentials$/, async () => {
	await pageFixture.page.locator('[name="user-name"]').fill('invalid_user');
	await pageFixture.page.locator('[name="password"]').fill('secret_sauce');
	await pageFixture.page.locator('[type="submit"]').click();
});
When(/^I login without credentials$/, async () => {
	await pageFixture.page.locator('[type="submit"]').click();
});
Then(/^I should get the login failed "([^"]*)"$/, async (expectedErrorMessage) => {
	const errorMessageElement =  pageFixture.page.locator('h3[data-test="error"]');
	const actualErrorMessage = await errorMessageElement.textContent();
	expect(actualErrorMessage).toContain(expectedErrorMessage);
});
When(/^I clicked on the settings button$/, async () => {
	await pageFixture.page.locator('.bm-burger-button').click();
});
When(/^I clicked on the "([^"]*)" button$/, async (buttonName) => {
	await pageFixture.page.locator(`#${buttonName}_sidebar_link`).click();
});
Then(/^I route back to the login page$/, async () => {
	expect(pageFixture.page.url()).toBe('https://www.saucedemo.com/v1/index.html');
});
